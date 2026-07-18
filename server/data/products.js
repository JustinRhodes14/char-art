// Server-side mirror of src/data/products.js, authoritative source for
// price when building a Stripe Checkout session. Only `id` and
// `quantity` are taken from the client; everything else comes from here.
//
// shippingClass drives which USPS shipping tier applies (see checkout.js):
// - 'envelope': flat, flexible, fits a standard stamped envelope (stickers)
// - 'package':  rigid (pins) or oversized (prints, sticker sheets) - must
//               ship as a parcel, can't go via First-Class Mail Letter rate
//
// shippingWeight is how much of a padded envelope's capacity one unit takes
// up (not literal ounces) - pins are rigid/3-dimensional and only fit 2-3
// snugly, prints and sticker sheets are flat and fit ~10, so a pin is
// weighted ~3x a print. Stickers don't count against capacity at all.
const products = [
  { id: 1,  name: 'Chef Bunny - Acrylic Pin',                    price: 5.99,  inStock: true, shippingClass: 'package', shippingWeight: 3 },
  { id: 2,  name: 'Breakfast Club - Art Print',                price: 7.99, inStock: true, shippingClass: 'package', shippingWeight: 1 },
  { id: 3,  name: 'Fluffy Egg - Acrylic Pin',                    price: 5.99, inStock: true, shippingClass: 'package', shippingWeight: 3 },
  { id: 4,  name: 'Pastry Paradise - Art Print',               price: 7.99, inStock: true, shippingClass: 'package', shippingWeight: 1 },
  { id: 5,  name: 'Sunny Side Up - Vinyl Sticker',                 price: 1.50,  inStock: true, shippingClass: 'envelope', shippingWeight: 0 },
  { id: 6,  name: 'Seething Boiled Egg - Vinyl Sticker',           price: 1.50,  inStock: true, shippingClass: 'envelope', shippingWeight: 0 },
  { id: 7,  name: 'Poached Egg - Acrylic Pin',                   price: 5.99,  inStock: true, shippingClass: 'package', shippingWeight: 3 },
  { id: 8,  name: 'Fluffy Egg - Vinyl Sticker',                    price: 1.50,  inStock: true, shippingClass: 'envelope', shippingWeight: 0 },
  { id: 9,  name: "I'm Baked Sticker Sheet",       price: 7.50, inStock: true, shippingClass: 'package', shippingWeight: 1 },
  { id: 10, name: 'Poached Egg - Vinyl Sticker',                   price: 1.50,  inStock: true, shippingClass: 'envelope', shippingWeight: 0 },
  { id: 11, name: '"Aligned" Bread Slices - Vinyl Sticker',        price: 4.99,  inStock: true, shippingClass: 'envelope', shippingWeight: 0 },
  { id: 12, name: 'Baked Eggs - Vinyl Sticker',             price: 1.50,  inStock: true, shippingClass: 'envelope', shippingWeight: 0 },
  { id: 13, name: 'Strawberry Pancake Stack - Acrylic Pin',      price: 7.99,  inStock: true, shippingClass: 'package', shippingWeight: 3 },
  { id: 14, name: 'Deviled Egg Trio - Vinyl Sticker',              price: 1.50,  inStock: true, shippingClass: 'envelope', shippingWeight: 0 },
  { id: 15, name: 'Fried Egg on Toast - Acrylic Pin',            price: 5.99,  inStock: true, shippingClass: 'package', shippingWeight: 3 },
  { id: 16, name: "I'm Eggcellent Sticker Sheet",  price: 7.50, inStock: true, shippingClass: 'package', shippingWeight: 1 },
  { id: 17, name: 'Toasted - Acrylic Pin',                       price: 5.99,  inStock: true, shippingClass: 'package', shippingWeight: 3 },
  { id: 18, name: 'Fraudulent Muffin Society - Vinyl Sticker',     price: 4.99,  inStock: true, shippingClass: 'envelope', shippingWeight: 0 },
];

module.exports = { products };
