// Server-side mirror of src/data/products.js, authoritative source for
// price when building a Stripe Checkout session. Only `id` and
// `quantity` are taken from the client; everything else comes from here.
const products = [
  { id: 1,  name: 'Chef Bunny - Acrylic Pin',                    price: 7.99,  inStock: true },
  { id: 2,  name: 'Breakfast Club - Art Print',                price: 10, inStock: true },
  { id: 3,  name: 'Fluffy Egg - Acrylic Pin',                    price: 7.99, inStock: true },
  { id: 4,  name: 'Pastry Paradise - Art Print',               price: 10, inStock: true },
  { id: 5,  name: 'Sunny Side Up - Vinyl Sticker',                 price: 2.50,  inStock: true },
  { id: 6,  name: 'Seething Boiled Egg - Vinyl Sticker',           price: 2.50,  inStock: true },
  { id: 7,  name: 'Poached Egg - Acrylic Pin',                   price: 7.99,  inStock: true },
  { id: 8,  name: 'Fluffy Egg - Vinyl Sticker',                    price: 2.50,  inStock: true },
  { id: 9,  name: "I'm Baked Sticker Sheet",       price: 6.99, inStock: true },
  { id: 10, name: 'Poached Egg - Vinyl Sticker',                   price: 2.50,  inStock: true },
  { id: 11, name: '"Aligned" Bread Slices - Vinyl Sticker',        price: 5,  inStock: true },
  { id: 12, name: 'Baked Eggs - Vinyl Sticker',             price: 2.50,  inStock: true },
  { id: 13, name: 'Strawberry Pancake Stack - Acrylic Pin',      price: 8.99,  inStock: true },
  { id: 14, name: 'Deviled Egg Trio - Vinyl Sticker',              price: 2.50,  inStock: true },
  { id: 15, name: 'Fried Egg on Toast - Acrylic Pin',            price: 7.99,  inStock: true },
  { id: 16, name: "I'm Eggcellent Sticker Sheet",  price: 6.99, inStock: true },
  { id: 17, name: 'Toasted - Acrylic Pin',                       price: 7.99,  inStock: true },
  { id: 18, name: 'Fraudulent Muffin Society - Vinyl Sticker',     price: 5,  inStock: true },
];

module.exports = { products };
