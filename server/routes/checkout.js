const express = require('express');
const router = express.Router();
const https = require('https');
const tls = require('tls');
const fs = require('fs');
const path = require('path');
const { products } = require('../data/products');

// On macOS, Node's CA list is missing the legacy root that api.stripe.com's
// chain cross-signs through. Pass a custom agent with the extended CA list.
// The cert file may not be present on Linux/Vercel (where it isn't needed).
const certPath = path.join(__dirname, '../certs/aaa-certificate-services-root.pem');
const ca = fs.existsSync(certPath)
  ? [...tls.rootCertificates, fs.readFileSync(certPath, 'utf8')]
  : tls.rootCertificates;
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  httpAgent: new https.Agent({ ca }),
});

const MAX_QUANTITY_PER_ITEM = 20;

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Only `id` and `quantity` come from the client. Price, name, and
    // stock status are always re-derived from the server's own catalog so a
    // tampered request body can't change what gets charged.
    const lineItems = [];
    for (const requested of items) {
      const product = products.find(p => p.id === requested.id);
      const quantity = Number(requested.quantity);

      if (!product) {
        return res.status(400).json({ error: `Unknown product id: ${requested.id}` });
      }
      if (!product.inStock) {
        return res.status(400).json({ error: `${product.name} is out of stock` });
      }
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY_PER_ITEM) {
        return res.status(400).json({ error: `Invalid quantity for ${product.name}` });
      }

      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            ...(product.image && {
              images: [`${process.env.CLIENT_URL}${product.image}`],
            }),
          },
          unit_amount: Math.round(product.price * 100),
          tax_behavior: 'exclusive',
        },
        quantity,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',

      automatic_tax: { enabled: true },

      // Stripe collects the shipping address, no need for a separate address form
      shipping_address_collection: {
        allowed_countries: ['US'],
      },

      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 399, currency: 'usd' },
            display_name: 'Standard Shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 5 },
              maximum: { unit: 'business_day', value: 7 },
            },
          },
        },
      ],

success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error.message);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

module.exports = router;
