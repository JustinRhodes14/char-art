const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
  }

  res.json({ received: true });
});

module.exports = router;
