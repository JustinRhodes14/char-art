// Single source of truth for the shipping delivery-time sentence, shown on
// the Shipping Policy page and on every product's policy notes. Keep this
// wording in sync with the actual USPS tiers in server/routes/checkout.js.
export const SHIPPING_BLURB =
  'Free shipping on orders of $40 or more. Once shipped, delivery typically takes ' +
  '3-5 business days for stickers sent via First-Class Mail, or 2-5 business days ' +
  'for pins, prints, and sticker sheets sent via USPS Ground Advantage - a faster ' +
  '1-3 business day Priority Mail option is also available at checkout for an extra fee.';
