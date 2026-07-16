// Server-side mirror of src/data/products.js, authoritative source for
// price/weight when building a Stripe Checkout session. Only `id` and
// `quantity` are taken from the client; everything else comes from here.
const products = [
  { id: 1,  name: 'Chef Bunny',                    price: 5,  weight_oz: 2, inStock: true },
  { id: 2,  name: 'Breakfast Club',                price: 10, weight_oz: 2, inStock: true },
  { id: 3,  name: 'Fluffy Egg',                    price: 5, weight_oz: 2, inStock: true },
  { id: 4,  name: 'Pastry Paradise',               price: 10, weight_oz: 2, inStock: true },
  { id: 5,  name: 'Sunny Side Up',                 price: 3,  weight_oz: 1, inStock: true },
  { id: 6,  name: 'Seething Boiled Egg',           price: 3,  weight_oz: 1, inStock: true },
  { id: 7,  name: 'Poached Egg',                   price: 5,  weight_oz: 2, inStock: true },
  { id: 8,  name: 'Fluffy Egg',                    price: 5,  weight_oz: 1, inStock: true },
  { id: 9,  name: "I'm Baked Sticker Sheet",       price: 10, weight_oz: 1, inStock: true },
  { id: 10, name: 'Poached Egg',                   price: 3,  weight_oz: 1, inStock: true },
  { id: 11, name: '"Aligned" Bread Slices',        price: 5,  weight_oz: 2, inStock: true },
  { id: 12, name: 'Ramen Pot Sticker',             price: 5,  weight_oz: 1, inStock: true },
  { id: 13, name: 'Strawberry Pancake Stack',      price: 7,  weight_oz: 2, inStock: true },
  { id: 14, name: 'Deviled Egg Trio',              price: 3,  weight_oz: 1, inStock: true },
  { id: 15, name: 'Fried Egg on Toast',            price: 5,  weight_oz: 2, inStock: true },
  { id: 16, name: "I'm Eggcellent Sticker Sheet",  price: 10, weight_oz: 1, inStock: true },
  { id: 17, name: 'Toasted',                       price: 5,  weight_oz: 2, inStock: true },
  { id: 18, name: 'Fraudulent Muffin Society',     price: 7,  weight_oz: 2, inStock: true },
];

module.exports = { products };
