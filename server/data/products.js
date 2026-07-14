// Server-side mirror of src/data/products.js — authoritative source for
// price/weight when building a Stripe Checkout session. Only `id` and
// `quantity` are taken from the client; everything else comes from here.
const products = [
  { id: 1,  name: 'Bunny Chef Charm',            price: 14, weight_oz: 2, inStock: true },
  { id: 2,  name: 'Breakfast Club Print',         price: 15, weight_oz: 2, inStock: true },
  { id: 3,  name: 'Okayu Egg Charm',              price: 14, weight_oz: 2, inStock: true },
  { id: 4,  name: 'Bakery Friends Print',         price: 15, weight_oz: 2, inStock: true },
  { id: 5,  name: 'Sunny Side Up Sticker',        price: 4,  weight_oz: 1, inStock: true },
  { id: 6,  name: 'Grumpy Boiled Egg Sticker',    price: 4,  weight_oz: 1, inStock: true },
  { id: 7,  name: 'Egg on Toast Charm',           price: 14, weight_oz: 2, inStock: true },
  { id: 8,  name: 'Congee Dreams Sticker',        price: 5,  weight_oz: 1, inStock: true },
  { id: 9,  name: "I'm Baked Sticker Sheet",      price: 9,  weight_oz: 1, inStock: true },
  { id: 10, name: 'Tamago Gohan Sticker',         price: 5,  weight_oz: 1, inStock: true },
  { id: 11, name: 'Bread Slices Print',           price: 10, weight_oz: 2, inStock: true },
  { id: 12, name: 'Ramen Pot Sticker',            price: 5,  weight_oz: 1, inStock: true },
  { id: 13, name: 'Strawberry Pancake Charm',     price: 15, weight_oz: 2, inStock: true },
  { id: 14, name: 'Deviled Egg Trio Sticker',     price: 5,  weight_oz: 1, inStock: true },
  { id: 15, name: 'Noodle Egg Charm',             price: 14, weight_oz: 2, inStock: true },
  { id: 16, name: "I'm Eggcellent Sticker Sheet", price: 9,  weight_oz: 1, inStock: true },
  { id: 17, name: 'Toasty Charm',                 price: 12, weight_oz: 2, inStock: true },
  { id: 18, name: 'Muffin Society Print',         price: 15, weight_oz: 2, inStock: true },
];

module.exports = { products };
