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
  { id: 1,  name: 'Chef Bunny - Acrylic Pin',                    price: 6.50,  inStock: true, shippingClass: 'package', materialType: 'pin', stripeProductId: 'prod_UuyekQfcr8U0Gp' },
  { id: 2,  name: 'Breakfast Club - Art Print',                price: 7.99, inStock: true, shippingClass: 'package', materialType: 'print', stripeProductId: 'prod_UuyeWxdUMH1Ek3' },
  { id: 3,  name: 'Sleepy Fluffy Egg - Acrylic Pin',                    price: 6.50, inStock: true, shippingClass: 'package', materialType: 'pin', stripeProductId: 'prod_UuyeOmTq7cpvAD' },
  { id: 4,  name: 'Pastry Paradise - Art Print',               price: 7.99, inStock: true, shippingClass: 'package', materialType: 'print', stripeProductId: 'prod_UuyebnC4pndPca' },
  { id: 5,  name: 'Sunny Side-Up - Vinyl Sticker',                 price: 1.50,  inStock: true, shippingClass: 'envelope', stripeProductId: 'prod_UuyfpGCr5TqKIc' },
  { id: 6,  name: 'Seething Soft-Boiled Egg - Vinyl Sticker',           price: 1.50,  inStock: true, shippingClass: 'envelope', stripeProductId: 'prod_Uuyf8r37YfDVbz' },
  { id: 7,  name: 'Cute Poached Egg - Acrylic Pin',                   price: 6.50,  inStock: true, shippingClass: 'package', materialType: 'pin', stripeProductId: 'prod_UuyfrGGYak0fGQ' },
  { id: 8,  name: 'Sleepy Fluffy Egg - Vinyl Sticker',                    price: 1.50,  inStock: true, shippingClass: 'envelope', stripeProductId: 'prod_UuyfjAG1Rah84V' },
  { id: 9,  name: "I'm Baked Sticker Sheet",       price: 7.50, inStock: true, shippingClass: 'package', materialType: 'sticker-sheet', stripeProductId: 'prod_UuyfTaQnAfTS0Q' },
  { id: 10, name: 'Cute Poached Egg - Vinyl Sticker',                   price: 1.50,  inStock: true, shippingClass: 'envelope', stripeProductId: 'prod_UuyfSY4hm0JToZ' },
  { id: 11, name: '"Aligned" Bread Slices - Vinyl Sticker',        price: 4.99,  inStock: true, shippingClass: 'envelope', stripeProductId: 'prod_UuyfpGekdblXdX' },
  { id: 12, name: 'Baked Eggs - Vinyl Sticker',             price: 1.50,  inStock: true, shippingClass: 'envelope', stripeProductId: 'prod_UuyfpTOk68scUm' },
  { id: 13, name: 'Strawberry Stacked Pancakes - Acrylic Pin',      price: 7.99,  inStock: true, shippingClass: 'package', materialType: 'pin-holographic', stripeProductId: 'prod_Uuyf2kwQf014pS' },
  { id: 14, name: 'The Deviled Eggs - Vinyl Sticker',              price: 1.50,  inStock: true, shippingClass: 'envelope', stripeProductId: 'prod_Uuyg4Bbu5E46A0' },
  { id: 15, name: 'Japanese Mayo Egg Toast - Acrylic Pin',            price: 6.50,  inStock: true, shippingClass: 'package', materialType: 'pin', stripeProductId: 'prod_UuygDWunttoYBk' },
  { id: 16, name: "I'm Eggcellent Sticker Sheet",  price: 7.50, inStock: true, shippingClass: 'package', materialType: 'sticker-sheet', stripeProductId: 'prod_UuygD3HzZ17at2' },
  { id: 17, name: 'Toasted - Acrylic Pin',                       price: 6.50,  inStock: true, shippingClass: 'package', materialType: 'pin', stripeProductId: 'prod_UuygjUvtJgLgQm' },
  { id: 18, name: 'Fraudulent Muffin Society - Vinyl Sticker',     price: 4.99,  inStock: true, shippingClass: 'envelope', stripeProductId: 'prod_UuygJfCgZCXkhD' },
];

module.exports = { products };
