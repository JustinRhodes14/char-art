// Server-side mirror of src/data/products.js — the authoritative source for
// price/weight when building a Stripe Checkout session. Never trust price or
// weight values sent by the client; only `id` and `quantity` are taken from
// the request and looked up here.
const products = [
  { id: 1, name: 'Sunset Dreams', price: 250, weight_oz: 8, inStock: true, image: '/assets/artwork/sunset-dreams.jpg' },
  { id: 2, name: 'Urban Energy', price: 180, weight_oz: 6, inStock: true, image: '/assets/artwork/urban-energy.jpg' },
  { id: 3, name: "Nature's Whisper", price: 120, weight_oz: 4, inStock: true, image: '/assets/artwork/natures-whisper.jpg' },
  { id: 4, name: 'Serenity', price: 200, weight_oz: 6, inStock: true, image: '/assets/artwork/serenity.jpg' },
  { id: 5, name: 'Digital Harmony', price: 150, weight_oz: 2, inStock: true, image: '/assets/artwork/digital-harmony.jpg' },
  { id: 6, name: 'Emotional Echoes', price: 300, weight_oz: 10, inStock: false, image: '/assets/artwork/emotional-echoes.jpg' },
];

module.exports = { products };
