// Single source of truth for the shipping delivery-time sentence, shown on
// the Shipping Policy page and on every product's policy notes. Keep this
// wording in sync with the actual USPS tiers in server/routes/checkout.js.
export const SHIPPING_BLURB =
  'Free shipping on orders of $40 or more. Once shipped, delivery typically takes ' +
  '1-3 business days for orders sent via Priority Mail, or 3-5 business days ' +
  'for lightweight orders sent via First-Class Mail.';
