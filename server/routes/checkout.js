const express = require('express');
const router = express.Router();
const stripe = require('../stripeClient');
const { products } = require('../data/products');

const MAX_QUANTITY_PER_ITEM = 20;

// Orders with a merchandise subtotal (before tax/shipping) at or above this
// amount ship free, regardless of shipping tier or country.
const FREE_SHIPPING_THRESHOLD_CENTS = 4000;

// Artist-requested pause on Canada shipping. All the CA rate data, geo-hint
// ordering, and the webhook's rate/country mismatch check are left in place
// on purpose - flip this back to true to re-enable, no other changes needed.
const SHIP_TO_CANADA = false;

// Independent per-shape capacity for a Priority Mail Padded Flat Rate
// Envelope - prints/sticker sheets lie flat, pins nestle in the gaps around
// them, so up to PIN_CAPACITY pins AND up to FLAT_CAPACITY prints/sticker
// sheets fit *simultaneously* (measured against real bubble mailers - they
// don't compete for one shared budget). Only needs a Priority Mail Flat Rate
// Box ($24.80 vs $14.00) if either count is exceeded on its own. Adjust
// based on real packing experience.
const PIN_CAPACITY = 7;
const FLAT_CAPACITY = 10;

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
  const hasPackageItem = cartProducts.some(({ product }) => product.shippingClass === 'package');
  if (!hasPackageItem) return 'envelope';

  const countByType = (types) => cartProducts
    .filter(({ product }) => types.includes(product.materialType))
    .reduce((sum, { quantity }) => sum + quantity, 0);

  const pinCount = countByType(['pin', 'pin-holographic']);
  const flatCount = countByType(['print', 'sticker-sheet']);

  return (pinCount > PIN_CAPACITY || flatCount > FLAT_CAPACITY) ? 'box' : 'package';
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

// stripeProductId values in server/data/products.js point at persistent
// Products that only exist in the *live* Stripe account (created 2026-07-20
// so Parcelcraft can read shipping weight - see products.js for why). Test
// mode has no equivalent objects, so referencing them there would 400 with
// "No such product" and break local/CI testing entirely. Detect the mode
// from the key in use and fall back to the original inline product_data
// (an ephemeral, per-session Product) whenever we're not running live.
const IS_LIVE_MODE = (process.env.STRIPE_SECRET_KEY || '').startsWith('sk_live_');

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
          // Live mode: reference the persistent Stripe Product so Parcelcraft
          // can read its shipping weight. Test mode: fall back to the old
          // inline product_data, since the persistent Products don't exist
          // there - see IS_LIVE_MODE above.
          ...(IS_LIVE_MODE && product.stripeProductId
            ? { product: product.stripeProductId }
            : {
                product_data: {
                  name: product.name,
                  ...(product.image && {
                    images: [`${process.env.CLIENT_URL}${product.image}`],
                  }),
                },
              }),
          unit_amount: Math.round(product.price * 100),
          tax_behavior: 'exclusive',
        },
        quantity,
      });
      cartProducts.push({ product, quantity });
    }

    const tier = getShippingTier(cartProducts);
    const geoHint = getGeoCountryHint(req);
    // Both countries' options are included and selectable whenever Canada
    // shipping is on - geoHint only decides which is listed first (Stripe
    // preselects the first shipping_options entry). See getGeoCountryHint
    // for why we don't use it to restrict which countries/rates are offered.
    const availableCountries = SHIP_TO_CANADA ? ['US', 'CA'] : ['US'];
    const countryOrder = geoHint === 'CA'
      ? availableCountries.slice().reverse()
      : availableCountries;

    const subtotalCents = cartProducts
      .reduce((sum, { product, quantity }) => sum + Math.round(product.price * 100) * quantity, 0);
    const freeShipping = subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS;

    const shippingOptions = countryOrder.map(country => {
      const rate = SHIPPING_TIERS[country][tier];
      return {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: freeShipping ? 0 : rate.amount, currency: 'usd' },
          display_name: freeShipping ? `Free ${rate.display_name}` : rate.display_name,
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
        allowed_countries: availableCountries,
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
