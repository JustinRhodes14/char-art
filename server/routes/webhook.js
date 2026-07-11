const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createShippingLabel } = require('../services/shipping');

// Stripe retries webhooks that don't get a timely 200 response. Without this
// guard a retry would purchase a second shipping label for the same order.
// In-memory only — fine for a single-process deploy, not for multiple instances.
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

    // Only create a label when payment is confirmed
    if (session.payment_status !== 'paid') {
      return res.json({ received: true });
    }

    if (processedSessions.has(session.id)) {
      return res.json({ received: true });
    }
    processedSessions.add(session.id);

    const shippingDetails = session.shipping_details;
    const customerDetails = session.customer_details;

    // Stripe puts the address in shipping_details when it's separate from billing,
    // but some API versions/configurations land it in customer_details.address instead.
    const address = shippingDetails?.address ?? customerDetails?.address;
    const recipientName = shippingDetails?.name ?? customerDetails?.name;

    if (!address || !customerDetails?.email) {
      console.warn('Order missing shipping/customer details, skipping label creation');
      return res.json({ received: true });
    }

    // Reconstruct cart items from metadata to calculate total weight
    let totalWeightOz = 3; // fallback minimum
    try {
      const items = JSON.parse(session.metadata?.items || '[]');
      totalWeightOz = Math.max(
        1,
        items.reduce((sum, item) => sum + item.weight_oz * item.quantity, 0)
      );
    } catch {
      console.warn('Could not parse items metadata, using default weight');
    }

    try {
      const label = await createShippingLabel({
        toName: recipientName,
        toStreet1: address.line1,
        toStreet2: address.line2 || '',
        toCity: address.city,
        toState: address.state,
        toZip: address.postal_code,
        toCountry: address.country,
        toEmail: customerDetails.email,
        totalWeightOz,
      });

      console.log('Shipping label created:', {
        orderId: session.id,
        carrier: label.carrier,
        service: label.service,
        cost: `$${label.cost}`,
        tracking: label.trackingNumber,
        labelUrl: label.labelUrl,
      });
    } catch (err) {
      // Label failure shouldn't fail the webhook — payment already succeeded
      console.error('Shippo label creation failed:', err.message);
    }
  }

  res.json({ received: true });
});

module.exports = router;
