const express = require('express');
const router = express.Router();
const stripe = require('../stripeClient');
const { products } = require('../data/products');

const MAX_QUANTITY_PER_ITEM = 20;

// Number of 'package'-class items (pins, prints, sticker sheets - anything
// that can't go in a padded envelope) at which an order outgrows a Priority
// Mail Padded Flat Rate Envelope and needs a Priority Mail Flat Rate Box
// instead. Adjust based on real packing experience.
const BOX_ITEM_THRESHOLD = 3;

// USPS retail rates, Notice 123 effective 2026-07-12, origin ZIP 07204 (NJ).
// Every rate below is flat regardless of destination zone/province, which
// matters because Stripe's hosted Checkout page can't dynamically
// recalculate shipping_options once the customer enters their address
// (that requires the embedded/Elements integration, a much bigger change -
// see https://docs.stripe.com/payments/checkout/custom-shipping-options).
// Domestic Ground Advantage would be cheaper for nearby zones but is
// genuinely zone-dependent ($7.90-$9.45 for a light package from NJ), so any
// single flat number for it is a guess that overcharges some customers and
// undercharges others - the flat-rate products avoid that entirely.
const SHIPPING_TIERS = {
  US: {
    envelope: {
      // First-Class Mail Letter (stamped), 1 oz.
      amount: 82,
      display_name: 'US Shipping',
      delivery_estimate: {
        minimum: { unit: 'business_day', value: 3 },
        maximum: { unit: 'business_day', value: 5 },
      },
    },
    package: {
      // Priority Mail Padded Flat Rate Envelope.
      amount: 1400,
      display_name: 'US Shipping',
      delivery_estimate: {
        minimum: { unit: 'business_day', value: 1 },
        maximum: { unit: 'business_day', value: 3 },
      },
    },
    box: {
      // Priority Mail Medium Flat Rate Box.
      amount: 2480,
      display_name: 'US Shipping',
      delivery_estimate: {
        minimum: { unit: 'business_day', value: 1 },
        maximum: { unit: 'business_day', value: 3 },
      },
    },
  },
  CA: {
    envelope: {
      // First-Class Mail International Letter, 1 oz, to Canada.
      amount: 175,
      display_name: 'Canada Shipping',
      // USPS doesn't guarantee a delivery window for this service; this is
      // a rough real-world estimate, not an SLA.
      delivery_estimate: {
        minimum: { unit: 'business_day', value: 7 },
        maximum: { unit: 'business_day', value: 21 },
      },
    },
    package: {
      // Priority Mail International Flat Rate Envelope, to Canada.
      amount: 3265,
      display_name: 'Canada Shipping',
      delivery_estimate: {
        minimum: { unit: 'business_day', value: 6 },
        maximum: { unit: 'business_day', value: 10 },
      },
    },
    box: {
      // Priority Mail International Medium Flat Rate Box, to Canada.
      amount: 6180,
      display_name: 'Canada Shipping',
      delivery_estimate: {
        minimum: { unit: 'business_day', value: 6 },
        maximum: { unit: 'business_day', value: 10 },
      },
    },
  },
};

function getShippingTier(cartProducts) {
  const packageItemCount = cartProducts
    .filter(({ product }) => product.shippingClass === 'package')
    .reduce((sum, { quantity }) => sum + quantity, 0);

  if (packageItemCount === 0) return 'envelope';
  if (packageItemCount >= BOX_ITEM_THRESHOLD) return 'box';
  return 'package';
}

// Vercel sets this from the request's IP address - no API call or dependency
// needed. It's a browsing-location guess, not the actual ship-to address
// (e.g. a US customer can still ship a gift to Canada), so it only decides
// which labeled option is listed/preselected first - both are always shown
// and either is always selectable.
function getGeoCountryHint(req) {
  const country = req.headers['x-vercel-ip-country'];
  return country === 'CA' ? 'CA' : 'US';
}

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
    const cartProducts = [];
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
      cartProducts.push({ product, quantity });
    }

    const tier = getShippingTier(cartProducts);
    const geoHint = getGeoCountryHint(req);
    // Both countries' options are always included and selectable - geoHint
    // only decides which one is listed first (Stripe preselects the first
    // shipping_options entry). See getGeoCountryHint for why we don't use
    // it to restrict which countries/rates are offered.
    const countryOrder = geoHint === 'CA' ? ['CA', 'US'] : ['US', 'CA'];
    const shippingOptions = countryOrder.map(country => {
      const rate = SHIPPING_TIERS[country][tier];
      return {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: rate.amount, currency: 'usd' },
          display_name: rate.display_name,
          delivery_estimate: rate.delivery_estimate,
          metadata: { country },
        },
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',

      automatic_tax: { enabled: true },

      // Stripe collects the shipping address, no need for a separate address form
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },

      shipping_options: shippingOptions,

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
