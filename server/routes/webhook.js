const express = require('express');
const router = express.Router();
const stripe = require('../stripeClient');

// Stripe retries webhooks that don't get a timely 200 response. De-dupe
// in memory so a retry doesn't trigger duplicate processing.
// In-memory only - fine for a single-process deploy, not for multiple instances.
const processedSessions = new Set();

router.post('/', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    if (session.payment_status !== 'paid') {
      return res.json({ received: true });
    }

    if (processedSessions.has(session.id)) {
      return res.json({ received: true });
    }
    processedSessions.add(session.id);

    console.log('Order completed:', {
      orderId: session.id,
      customer: session.customer_details?.email,
      amount: `$${(session.amount_total / 100).toFixed(2)}`,
    });

    // Both a US and a Canada shipping option are always shown (see
    // checkout.js) and the customer can pick either regardless of the
    // address they enter - so it's possible to pick the wrong one (e.g. a
    // US-priced rate with a Canadian shipping address). Flag that here so
    // it gets caught before a label is manually created, rather than relying
    // on catching it by eye in the Dashboard.
    try {
      const shippingCountry = session.collected_information?.shipping_details?.address?.country;
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ['shipping_cost.shipping_rate'],
      });
      const ratedCountry = fullSession.shipping_cost?.shipping_rate?.metadata?.country;

      if (shippingCountry && ratedCountry && shippingCountry !== ratedCountry) {
        console.warn('Shipping rate/country mismatch - verify price before shipping:', {
          orderId: session.id,
          shippingAddressCountry: shippingCountry,
          selectedRateCountry: ratedCountry,
        });
      }
    } catch (err) {
      console.error('Failed to verify shipping rate/country match:', err.message);
    }
  }

  res.json({ received: true });
});

module.exports = router;
