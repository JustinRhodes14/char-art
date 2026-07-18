// Server-side mirror of src/data/products.js, authoritative source for
// price when building a Stripe Checkout session. Only `id` and
// `quantity` are taken from the client; everything else comes from here.
//
// shippingClass drives which USPS shipping tier applies (see checkout.js):
// - 'envelope': flat, flexible, fits a standard stamped envelope (stickers)
// - 'package':  rigid (pins) or oversized (prints, sticker sheets) - must
//               ship as a parcel, can't go via First-Class Mail Letter rate
const products = [
  { id: 1,  name: 'Chef Bunny - Acrylic Pin',                    price: 7.99,  inStock: true, shippingClass: 'package' },
  { id: 2,  name: 'Breakfast Club - Art Print',                price: 10, inStock: true, shippingClass: 'package' },
  { id: 3,  name: 'Fluffy Egg - Acrylic Pin',                    price: 7.99, inStock: true, shippingClass: 'package' },
  { id: 4,  name: 'Pastry Paradise - Art Print',               price: 10, inStock: true, shippingClass: 'package' },
  { id: 5,  name: 'Sunny Side Up - Vinyl Sticker',                 price: 2.50,  inStock: true, shippingClass: 'envelope' },
  { id: 6,  name: 'Seething Boiled Egg - Vinyl Sticker',           price: 2.50,  inStock: true, shippingClass: 'envelope' },
  { id: 7,  name: 'Poached Egg - Acrylic Pin',                   price: 7.99,  inStock: true, shippingClass: 'package' },
  { id: 8,  name: 'Fluffy Egg - Vinyl Sticker',                    price: 2.50,  inStock: true, shippingClass: 'envelope' },
  { id: 9,  name: "I'm Baked Sticker Sheet",       price: 6.99, inStock: true, shippingClass: 'package' },
  { id: 10, name: 'Poached Egg - Vinyl Sticker',                   price: 2.50,  inStock: true, shippingClass: 'envelope' },
  { id: 11, name: '"Aligned" Bread Slices - Vinyl Sticker',        price: 5,  inStock: true, shippingClass: 'envelope' },
  { id: 12, name: 'Baked Eggs - Vinyl Sticker',             price: 2.50,  inStock: true, shippingClass: 'envelope' },
  { id: 13, name: 'Strawberry Pancake Stack - Acrylic Pin',      price: 8.99,  inStock: true, shippingClass: 'package' },
  { id: 14, name: 'Deviled Egg Trio - Vinyl Sticker',              price: 2.50,  inStock: true, shippingClass: 'envelope' },
  { id: 15, name: 'Fried Egg on Toast - Acrylic Pin',            price: 7.99,  inStock: true, shippingClass: 'package' },
  { id: 16, name: "I'm Eggcellent Sticker Sheet",  price: 6.99, inStock: true, shippingClass: 'package' },
  { id: 17, name: 'Toasted - Acrylic Pin',                       price: 7.99,  inStock: true, shippingClass: 'package' },
  { id: 18, name: 'Fraudulent Muffin Society - Vinyl Sticker',     price: 5,  inStock: true, shippingClass: 'envelope' },
];

module.exports = { products };
