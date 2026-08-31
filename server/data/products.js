// Server-side mirror of src/data/products.js, authoritative source for
// price when building a Stripe Checkout session. Only `id` and
// `quantity` are taken from the client; everything else comes from here.
//
// shippingClass drives which USPS shipping tier applies (see checkout.js):
// - 'envelope': flat, flexible, fits a standard stamped envelope (stickers)
// - 'package':  rigid (pins) or oversized (prints, sticker sheets) - must
//               ship as a parcel, can't go via First-Class Mail Letter rate
//
// materialType (only set for 'package'-class items) drives the
// package-vs-box decision in checkout.js: prints/sticker sheets lie flat
// and pins nestle in the gaps around them, so a padded envelope can fit its
// full capacity of each *independently* (measured: 10 prints AND 7 pins can
// coexist in the same mailer) rather than the two competing for one shared
// budget.
//
// stripeProductId points at a real, persistent Stripe Product (created
// 2026-07-20, live mode) carrying name/image/package_dimensions/shippable.
// checkout.js references these via price_data.product instead of inline
// price_data.product_data - inline product_data creates a fresh, ad-hoc
// Product per Checkout Session that Stripe immediately locks/archives to
// preserve an immutable record of what was charged, which meant Parcelcraft
// could never attach shipping weight to a purchased item. These persistent
// Products stay normal and editable going forward, so weight/dimensions can
// be corrected in the Dashboard any time without touching this file.
const products = [
  { id: 1,  name: 'Chef Bunny - Acrylic Pin',                    price: 6.00,  inStock: true, shippingClass: 'package', materialType: 'pin', stripeProductId: 'prod_UuyekQfcr8U0Gp' },
  { id: 2,  name: 'Breakfast Club - Art Print',                price: 8.00, inStock: true, shippingClass: 'package', materialType: 'print', stripeProductId: 'prod_UuyeWxdUMH1Ek3' },
  { id: 3,  name: 'Sleepy Fluffy Egg - Acrylic Pin',                    price: 6.00, inStock: true, shippingClass: 'package', materialType: 'pin', stripeProductId: 'prod_UuyeOmTq7cpvAD' },
  { id: 4,  name: 'Pastry Paradise - Art Print',               price: 8.00, inStock: true, shippingClass: 'package', materialType: 'print', stripeProductId: 'prod_UuyebnC4pndPca' },
  { id: 5,  name: 'Sunny Side-Up - Vinyl Sticker',                 price: 1.50,  inStock: true, shippingClass: 'envelope', stripeProductId: 'prod_UuyfpGCr5TqKIc' },
  { id: 6,  name: 'Seething Soft-Boiled Egg - Vinyl Sticker',           price: 1.50,  inStock: true, shippingClass: 'envelope', stripeProductId: 'prod_Uuyf8r37YfDVbz' },
  { id: 7,  name: 'Cute Poached Egg - Acrylic Pin',                   price: 6.00,  inStock: true, shippingClass: 'package', materialType: 'pin', stripeProductId: 'prod_UuyfrGGYak0fGQ' },
  { id: 8,  name: 'Sleepy Fluffy Egg - Vinyl Sticker',                    price: 1.50,  inStock: true, shippingClass: 'envelope', stripeProductId: 'prod_UuyfjAG1Rah84V' },
  { id: 9,  name: "I'm Baked Sticker Sheet",       price: 7.00, inStock: true, shippingClass: 'package', materialType: 'sticker-sheet', stripeProductId: 'prod_UuyfTaQnAfTS0Q' },
  { id: 10, name: 'Cute Poached Egg - Vinyl Sticker',                   price: 1.50,  inStock: true, shippingClass: 'envelope', stripeProductId: 'prod_UuyfSY4hm0JToZ' },
  { id: 11, name: '"Aligned" Bread Slices - Vinyl Sticker',        price: 5.00,  inStock: true, shippingClass: 'envelope', stripeProductId: 'prod_UuyfpGekdblXdX' },
  { id: 12, name: 'Baked Eggs - Vinyl Sticker',             price: 1.50,  inStock: true, shippingClass: 'envelope', stripeProductId: 'prod_UuyfpTOk68scUm' },
  { id: 13, name: 'Strawberry Stacked Pancakes - Acrylic Pin',      price: 8.00,  inStock: true, shippingClass: 'package', materialType: 'pin-holographic', stripeProductId: 'prod_Uuyf2kwQf014pS' },
  { id: 14, name: 'The Deviled Eggs - Vinyl Sticker',              price: 1.50,  inStock: true, shippingClass: 'envelope', stripeProductId: 'prod_Uuyg4Bbu5E46A0' },
  { id: 15, name: 'Japanese Mayo Egg Toast - Acrylic Pin',            price: 6.00,  inStock: true, shippingClass: 'package', materialType: 'pin', stripeProductId: 'prod_UuygDWunttoYBk' },
  { id: 16, name: "I'm Eggcellent Sticker Sheet",  price: 7.00, inStock: true, shippingClass: 'package', materialType: 'sticker-sheet', stripeProductId: 'prod_UuygD3HzZ17at2' },
  { id: 17, name: 'Toasted - Acrylic Pin',                       price: 6.00,  inStock: true, shippingClass: 'package', materialType: 'pin', stripeProductId: 'prod_UuygjUvtJgLgQm' },
  { id: 18, name: 'Fraudulent Muffin Society - Vinyl Sticker',     price: 5.00,  inStock: true, shippingClass: 'envelope', stripeProductId: 'prod_UuygJfCgZCXkhD' },
  { id: 19, name: 'Bleugh Coffee - Vinyl Sticker',                 price: 1.50,  inStock: true, shippingClass: 'envelope', stripeProductId: 'prod_V55qrBifMF6wqg' },
  { id: 20, name: 'Flustered Coffee - Vinyl Sticker',              price: 1.50,  inStock: true, shippingClass: 'envelope', stripeProductId: 'prod_V55qFUP0idN0ME' },
  { id: 21, name: "I'm Parched Sticker Sheet",                     price: 7.00,  inStock: true, shippingClass: 'package', materialType: 'sticker-sheet', stripeProductId: 'prod_V55quZfCJTGrIc' },
  { id: 22, name: 'Bunny Coffee - Acrylic Pin',                    price: 6.00,  inStock: true, shippingClass: 'package', materialType: 'pin', stripeProductId: 'prod_V55qnjUJcqSViJ' },
  { id: 23, name: 'Bleugh Coffee - Acrylic Pin',                   price: 6.00,  inStock: true, shippingClass: 'package', materialType: 'pin', stripeProductId: 'prod_V55qnctaoqDMlK' },
  { id: 24, name: 'Flustered Coffee - Acrylic Pin',                price: 6.00,  inStock: true, shippingClass: 'package', materialType: 'pin', stripeProductId: 'prod_V55qHoaTEgQlhQ' },
  // { id: 25, name: 'Marinated Eggs - Acrylic Pin',                  price: 6.00,  inStock: true, shippingClass: 'package', materialType: 'pin' },
  { id: 26, name: 'Blueberry Muffin - Acrylic Pin',                price: 6.00,  inStock: true, shippingClass: 'package', materialType: 'pin', stripeProductId: 'prod_V55q2PSUjfKuIn' },
  { id: 27, name: 'Salted Almond Bread Roll - Acrylic Pin',        price: 6.00,  inStock: true, shippingClass: 'package', materialType: 'pin', stripeProductId: 'prod_V55qpI2spU6xgD' },
  { id: 28, name: 'Sausage Toast - Acrylic Pin',                   price: 6.00,  inStock: true, shippingClass: 'package', materialType: 'pin', stripeProductId: 'prod_V55ruqITkS5eVR' },
  { id: 29, name: 'Pizza Toast - Acrylic Pin',                     price: 6.00,  inStock: true, shippingClass: 'package', materialType: 'pin', stripeProductId: 'prod_V55rf9Wxj2f6Aa' },
  { id: 30, name: 'Coffee & Pastries Memo Pad',                    price: 5.00,  inStock: true, shippingClass: 'package', materialType: 'memo-pad', stripeProductId: 'prod_V55rLWZuPeVjg8' },
  { id: 31, name: 'Fluffy Egg - Keychain',                         price: 7.00,  inStock: true, shippingClass: 'package', materialType: 'keychain', stripeProductId: 'prod_V55rKE6pf7JJXG' },
  { id: 32, name: 'Bunny Coffee - Keychain',                       price: 7.00,  inStock: true, shippingClass: 'package', materialType: 'keychain', stripeProductId: 'prod_V55rJrDOnuilpV' },
  { id: 33, name: 'Bleugh Coffee - Keychain',                      price: 7.00,  inStock: true, shippingClass: 'package', materialType: 'keychain', stripeProductId: 'prod_V55r46g30fV7gU' },
  { id: 34, name: 'Flustered Coffee - Keychain',                   price: 7.00,  inStock: true, shippingClass: 'package', materialType: 'keychain', stripeProductId: 'prod_V55rsVLgekrYpx' },
  { id: 35, name: 'Chef Bunny - Keychain',                         price: 7.00,  inStock: true, shippingClass: 'package', materialType: 'keychain', stripeProductId: 'prod_V55r6WQanuA1Am' },
  { id: 36, name: 'Cute Poached Egg - Keychain',                   price: 7.00,  inStock: true, shippingClass: 'package', materialType: 'keychain', stripeProductId: 'prod_V55r6rSB3wBTUF' },
  { id: 37, name: 'Blueberry Muffin - Keychain',                   price: 7.00,  inStock: true, shippingClass: 'package', materialType: 'keychain', stripeProductId: 'prod_V55rCgAaInfIth' },
  { id: 38, name: 'Egg, Toast, and Coffee Memo Pad',               price: 5.00,  inStock: true, shippingClass: 'package', materialType: 'memo-pad', stripeProductId: 'prod_VAhY6KN7yX5MPZ' },
];

module.exports = { products };
