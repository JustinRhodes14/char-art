// Single source of truth for the free-shipping cutoff shown on the Cart
// page and the Shop banner. Keep in sync with FREE_SHIPPING_THRESHOLD_CENTS
// in server/routes/checkout.js, which is what actually grants it.
export const FREE_SHIPPING_THRESHOLD = 40;
