import art1 from '../assets/artwork/shop/shop_pin4.JPG';
import art2 from '../assets/artwork/shop/shop_art - 2.jpeg';
import art3 from '../assets/artwork/shop/shop_pin10.JPG';
import art4 from '../assets/artwork/shop/shop_art - 4.jpeg';
import art5 from '../assets/artwork/shop/shop_sticker1.JPG';
import art6 from '../assets/artwork/shop/shop_sticker2.JPG';
import art7 from '../assets/artwork/shop/shop_pin8.JPG';
import art8 from '../assets/artwork/shop/shop_sticker7.JPG';
import art9 from '../assets/artwork/shop/shop_stickersheet3.JPG';
import art10 from '../assets/artwork/shop/shop_sticker6.JPG';
import art11 from '../assets/artwork/shop/shop_art - 11.jpeg';
import art12 from '../assets/artwork/shop/shop_sticker5.JPG';
import art13 from '../assets/artwork/shop/shop_art - 13.jpeg';
import art14 from '../assets/artwork/shop/shop_sticker4.JPG';
import art15 from '../assets/artwork/shop/shop_art - 15.jpeg';
import art16 from '../assets/artwork/shop/shop_stickersheet2.JPG';
import art17 from '../assets/artwork/shop/shop_pin5.JPG';
import art18 from '../assets/artwork/shop/shop_art - 18.jpeg';
import art19 from '../assets/artwork/shop/shop_sticker9.JPG';
import art20 from '../assets/artwork/shop/shop_sticker8.JPG';
import art21 from '../assets/artwork/shop/shop_stickersheet1.JPG';
import art22 from '../assets/artwork/shop/shop_pin2.JPG';
import art23 from '../assets/artwork/shop/shop_pin12.JPG';
import art24 from '../assets/artwork/shop/shop_pin13.JPG';
import art26 from '../assets/artwork/shop/shop_pin11.JPG';
import art27 from '../assets/artwork/shop/shop_pin6.JPG';
import art28 from '../assets/artwork/shop/shop_pin1.JPG';
import art29 from '../assets/artwork/shop/shop_pin3.JPG';
import art30 from '../assets/artwork/shop/shop_notepad.JPG';
import art31 from '../assets/artwork/shop/shop_keychain5.JPG';
import art32 from '../assets/artwork/shop/shop_keychain6.JPG';
import art33 from '../assets/artwork/shop/shop_keychain3.JPG';
import art34 from '../assets/artwork/shop/shop_keychain2.JPG';
import art35 from '../assets/artwork/shop/shop_keychain7.JPG';
import art36 from '../assets/artwork/shop/shop_keychain1.JPG';
import art37 from '../assets/artwork/shop/shop_keychain4.JPG';

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
// package-vs-box decision in checkout.js: prints/sticker sheets lie flat and pins nestle in the gaps around them, so a padded envelope can fit its full capacity of each *independently* (measured: 10 prints AND 7 pins can coexist in the same mailer) rather than the two competing for one shared budget.
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

// Longer materials/care copy for the product modal and detail page, keyed by
// materialType since the same paragraph is reused across a handful of
// products rather than being unique per SKU (see FEEDBACK.md).
export const MATERIAL_DESCRIPTIONS = {
  'sticker-round': 'Die-cut vinyl sticker with a matte finish. This sticker has a UV protective laminate on top that ensures its year-round vibrant and glossy appearance, rain or shine! Due to their durable waterproof nature, these stickers make an ideal addition to anything from water bottles and laptops, to cute stationary decor.',
  'sticker-rect': '4 in x 2 in. vinyl matte sticker with an added layer of laminate, making them waterproof, weatherproof, and dishwasher-proof.',
  'sticker-sheet': '7 in x 5 in. kiss-cut sticker sheet with a glossy finish. Printed on thick, durable vinyl with a laminated weatherproof coating that protects the stickers from water, UV light, and scratches. Easy to peel and leaves no residue.',
  pin: 'Clear one-sided acrylic pin with die-cut edges. Scratch resistant, making it a perfect on the go accessory for anything and anywhere; keychains, handbags, backpacks, you name it! Suited for all ages, with long lasting wear and even longer lasting impressions.',
  'pin-holographic': 'Clear acrylic pin, one-sided with a star holographic finish and die-cut edges. Scratch resistant, making it a perfect on the go accessory for anything and anywhere; keychains, handbags, backpacks, you name it! Suited for all ages, with long lasting wear and even longer lasting impressions.',
  print: 'Single-sided printing with a pearlescent finish for an elevated design.',
  keychain: "Double-sided acrylic keychain that is weather and scratch resistant. Handbag in need of some flare? Then this cute keychain is for you! It’s gold-plated clasp and versatile designs make a stylish choice for all your charm needs, or a wonderful gift to a special someone!",
  'memo-pad': 'Actual colors of the memo pads may differ slightly from the product image.'
};

export const products = [
    {
    id: 4,
    name: 'Pastry Paradise',
    category: 'print',
    description: 'An assortment of some of your favorite pastries: milk bread, muffins, cream sandos, and more! Why pick a favorite when you can have them all in front of you?',
    price: 8.00,
    image: art4,
    dimensions: '5.5" x 5.5"',
    medium: 'Art print, pearlescent finish',
    materialType: 'print',
    inStock: true,
    dateAdded: '2026-07-18',
  },
  {
    id: 2,
    name: 'Breakfast Club',
    category: 'print',
    description: "A well rounded, balanced breakfast, hitting all the essentials in one print. Can’t forget the coffee.",
    price: 8.00,
    image: art2,
    dimensions: '5.5" x 5.5"',
    medium: 'Art print, pearlescent finish',
    materialType: 'print',
    inStock: true,
    dateAdded: '2026-07-18',
  },
    {
    id: 3,
    name: 'Sleepy Fluffy Egg',
    category: 'pin',
    description: "A relaxed yolk, enjoying a nice nap on a very nice and fluffy bed of well seasoned egg whites. I wonder what he’s dreaming about?",
    price: 6.00,
    image: art3,
    dimensions: '2.5"',
    medium: 'Acrylic pin',
    materialType: 'pin',
    inStock: true,
    dateAdded: '2026-07-18',
  },
    {
    id: 7,
    name: 'Cute Poached Egg',
    category: 'pin',
    description: "A dumbfounded poached egg, questioning how it arrived in such a situation as this. At least it’s well-seasoned.",
    price: 6.00,
    image: art7,
    dimensions: '2.5"',
    medium: 'Acrylic pin',
    materialType: 'pin',
    inStock: true,
    dateAdded: '2026-07-18',
  },
  {
    id: 15,
    name: 'Japanese Mayo Egg Toast',
    category: 'pin',
    description: 'A perfectly perky, sunny-side up egg to start the day. Happy, tasty, and so darn delicious!',
    price: 6.00,
    image: art15,
    dimensions: '2.5"',
    medium: 'Acrylic pin',
    materialType: 'pin',
    inStock: true,
    dateAdded: '2026-07-18',
  },
    {
    id: 28,
    name: 'Sausage Toast Pin',
    category: 'pin',
    description: 'A delicious and happy way to start the day! I mean just look at how happy those sausages are!',
    price: 6.00,
    image: art28,
    cardImagePosition: 'center 57%',
    dimensions: '2.5"',
    medium: 'Pin',
    materialType: 'pin',
    inStock: true,
    dateAdded: '2026-08-15',
  },
  {
    id: 29,
    name: 'Pizza Toast',
    category: 'pin',
    description: "Can it still be called a Supreme Pizza if it’s missing a few toppings?",
    price: 6.00,
    image: art29,
    cardImagePosition: 'center 58%',
    dimensions: '2.5"',
    medium: 'Pin',
    materialType: 'pin',
    inStock: true,
    dateAdded: '2026-08-15',
  },
  {
    id: 17,
    name: 'Toasted',
    category: 'pin',
    description: "A plump, golden brown slice of toast. You could say he’s looking quite….toasty.",
    price: 6.00,
    image: art17,
    dimensions: '2.5"',
    medium: 'Acrylic pin',
    materialType: 'pin',
    inStock: true,
    dateAdded: '2026-07-18',
  },
  {
    id: 27,
    name: 'Salted Almond Bread Roll',
    category: 'pin',
    description: 'A delightfully sweet and salty snack for your palette :)',
    price: 6.00,
    image: art27,
    dimensions: '2.5"',
    medium: 'Pin',
    materialType: 'pin',
    inStock: true,
    dateAdded: '2026-08-15',
  },
  {
    id: 26,
    name: 'Blueberry Muffin',
    category: 'pin',
    description: "I mean what’s there to say? It's a muffin, it’s a snack, and it’s cute! Yessiree, that is a blueberry muffin alright!",
    price: 6.00,
    image: art26,
    dimensions: '2.5"',
    medium: 'Pin',
    materialType: 'pin',
    inStock: true,
    dateAdded: '2026-08-15',
  },
  {
    id: 13,
    name: 'Strawberry Stacked Pancakes',
    category: 'pin',
    description: 'A towering stack of thick fluffy pancakes swimming in sweet, delicious strawberry syrup and topped with sliced strawberries, confectionary stars, butter hearts, and sparkling happiness!',
    price: 8.00,
    image: art13,
    dimensions: '2.5"',
    medium: 'Pearlescent pin',
    materialType: 'pin-holographic',
    inStock: true,
    dateAdded: '2026-07-18',
  },
    {
    id: 1,
    name: 'Chef Bunny',
    category: 'pin',
    description: 'A cheerful bunny chef serving up a sweet, fluffy pancake topped with some fresh berries, cream, maple syrup, and homemade butter. Enjoy!',
    price: 6.00,
    image: art1,
    dimensions: '2.5"',
    medium: 'Acrylic pin',
    materialType: 'pin',
    inStock: true,
    dateAdded: '2026-07-18',
  },
    {
    id: 22,
    name: 'Bunny Coffee',
    category: 'pin',
    description: '“You look like you could use a friend.”',
    price: 6.00,
    image: art22,
    dimensions: '2.5"',
    medium: 'Pin',
    materialType: 'pin',
    inStock: true,
    dateAdded: '2026-08-15',
  },
  {
    id: 23,
    name: 'Bleugh Coffee',
    category: 'pin',
    description: "It’s too much coffee for one mug!",
    price: 6.00,
    image: art23,
    dimensions: '2.5"',
    medium: 'Pin',
    materialType: 'pin',
    inStock: true,
    dateAdded: '2026-08-15',
  },
  {
    id: 24,
    name: 'Flustered Coffee',
    category: 'pin',
    description: "The mug is blushing! Perhaps it heard something funny?",
    price: 6.00,
    image: art24,
    dimensions: '2.5"',
    medium: 'Pin',
    materialType: 'pin',
    inStock: true,
    dateAdded: '2026-08-15',
  },
  {
    id: 5,
    name: 'Sunny Side-Up',
    category: 'vinyl sticker',
    description: 'Cozy, perfectly cooked sunny side-up egg. The most egg there is. That is one very, very delightful egg!',
    price: 1.50,
    image: art5,
    dimensions: '2"',
    medium: 'Die-cut vinyl sticker',
    materialType: 'sticker-round',
    inStock: true,
    dateAdded: '2026-07-18',
  },
  {
    id: 6,
    name: 'Seething Soft-Boiled Egg',
    category: 'vinyl sticker',
    description: "This one is just the OPPOSITE of delightful. It’s more than just seething. It’s annoyed, it’s grumpy, it’s very judgmental. Perhaps it's because the goblet fits a bit too snug for its liking?",
    price: 1.50,
    image: art6,
    dimensions: '2"',
    medium: 'Die-cut vinyl sticker',
    materialType: 'sticker-round',
    inStock: true,
    dateAdded: '2026-07-18',
  },
  {
    id: 8,
    name: 'Sleepy Fluffy Egg',
    category: 'vinyl sticker',
    description: "A relaxed yolk, enjoying a nice nap on a very nice and fluffy bed of well seasoned egg whites. I wonder what he’s dreaming about?",
    price: 1.50,
    image: art8,
    dimensions: '2"',
    medium: 'Die-cut vinyl sticker',
    materialType: 'sticker-round',
    inStock: true,
    dateAdded: '2026-07-18',
  },
  {
    id: 10,
    name: 'Cute Poached Egg',
    category: 'vinyl sticker',
    description: "A dumbfounded poached egg, questioning how it arrived in such a situation as this. At least it’s well-seasoned.",
    price: 1.50,
    image: art10,
    dimensions: '2"',
    medium: 'Die-cut vinyl sticker',
    materialType: 'sticker-round',
    inStock: true,
    dateAdded: '2026-07-18',
  },
  {
    id: 12,
    name: 'Baked Eggs',
    category: 'vinyl sticker',
    description: 'Freshly baked eggs right out of the oven. Perfectly-baked, yet fluffy and runny. Think it’s a little crowded in there?',
    price: 1.50,
    image: art12,
    dimensions: '2"',
    medium: 'Die-cut vinyl sticker',
    materialType: 'sticker-round',
    inStock: true,
    dateAdded: '2026-07-18',
  },
  {
    id: 14,
    name: 'The Deviled Eggs',
    category: 'vinyl sticker',
    description: "It’s the most devilish trio there is! Three devils, three peas in a pod, inseparable, chaotic, and mischievous!",
    price: 1.50,
    image: art14,
    dimensions: '2"',
    medium: 'Die-cut vinyl sticker',
    materialType: 'sticker-round',
    inStock: true,
    dateAdded: '2026-07-18',
  },
    {
    id: 19,
    name: 'Bleugh Coffee',
    category: 'vinyl sticker',
    description: 'It’s too much coffee for one mug!',
    price: 1.50,
    image: art19,
    cardImagePosition: 'center 64%',
    dimensions: '2"',
    medium: 'Die-cut vinyl sticker',
    materialType: 'sticker-round',
    inStock: true,
    dateAdded: '2026-08-15',
  },
  {
    id: 20,
    name: 'Flustered Coffee',
    category: 'vinyl sticker',
    description: 'The mug is blushing! Perhaps it heard something funny?',
    price: 1.50,
    image: art20,
    cardImagePosition: 'center 62%',
    dimensions: '2"',
    medium: 'Die-cut vinyl sticker',
    materialType: 'sticker-round',
    inStock: true,
    dateAdded: '2026-08-15',
  },
  {
    id: 11,
    name: '"Aligned" Bread Slices',
    category: 'rectangular sticker',
    description: "Close enough to the saying?…well, at least they're trying to do their best.",
    price: 5.00,
    image: art11,
    dimensions: '4" x 2"',
    medium: 'Vinyl matte sticker',
    materialType: 'sticker-rect',
    inStock: true,
    dateAdded: '2026-07-18',
  },
  {
    id: 18,
    name: 'Fraudulent Muffin Society',
    category: 'rectangular sticker',
    description: "Something’s not right here…you could say there’s an imposter among them?",
    price: 5.00,
    image: art18,
    dimensions: '4" x 2"',
    medium: 'Vinyl matte sticker',
    materialType: 'sticker-rect',
    inStock: true,
    dateAdded: '2026-07-18',
  },
  {
    id: 9,
    name: "I'm Baked Sticker Sheet",
    category: 'sticker sheet',
    description: 'An assortment of tasty pastry friends that will make your mouth water at the sight of them. Try not to eat them!',
    price: 7.00,
    image: art9,
    dimensions: '7" x 5"',
    medium: 'Sticker sheet',
    materialType: 'sticker-sheet',
    inStock: true,
    dateAdded: '2026-07-18',
  },
  {
    id: 16,
    name: "I'm Eggcellent Sticker Sheet",
    category: 'sticker sheet',
    description: 'All your adorable egg friends in one sheet, and a few new extra friends to make it a party!',
    price: 7.00,
    image: art16,
    dimensions: '7" x 5"',
    medium: 'Sticker sheet',
    materialType: 'sticker-sheet',
    inStock: true,
    dateAdded: '2026-07-18',
  },
  {
    id: 21,
    name: "I'm Parched Sticker Sheet",
    category: 'sticker sheet',
    description: 'It’s a group of cute and cozy drinks! Would this technically be considered a tasting?',
    price: 7.00,
    image: art21,
    dimensions: '7" x 5"',
    medium: 'Sticker sheet',
    materialType: 'sticker-sheet',
    inStock: true,
    dateAdded: '2026-08-15',
  },
  // {
  //   id: 25,
  //   name: 'Marinated Eggs',
  //   category: 'pin',
  //   description: 'An egg’s speciality tan consists of soy sauce, chopped chilies, spring onions, and sesame oil. Be careful to not get them too tanned!',
  //   price: 6.00,
  //   dimensions: '2"',
  //   medium: 'Pin',
  //   materialType: 'pin',
  //   inStock: true,
  //   dateAdded: '2026-08-15',
  // },
  {
    id: 30,
    name: 'Breakfast Memo Pads',
    category: 'memo pad',
    description: 'These adorable notepads have a light sticky adhesive, making it perfect for delicate surfaces without leaving any traces of it behind, or lifting something up with it! Annotating papers? Notes for your notebook? Journaling? Grocery lists? Quick reminders? This memo pad is just right for you!',
    price: 5.00,
    image: art30,
    dimensions: '3.25" x 3.25"',
    medium: 'Memo pad',
    materialType: 'memo-pad',
    inStock: true,
    dateAdded: '2026-08-15',
  },
  {
    id: 31,
    name: 'Fluffy Egg',
    category: 'keychain',
    description: 'A relaxed yolk, enjoying a nice nap on a very nice and fluffy bed of well seasoned egg whites. I wonder what he’s dreaming about?',
    price: 7.00,
    image: art31,
    dimensions: '2"',
    medium: 'Keychain',
    materialType: 'keychain',
    inStock: true,
    dateAdded: '2026-08-15',
  },
  {
    id: 32,
    name: 'Bunny Coffee',
    category: 'keychain',
    description: '“You look like you could use a friend.”',
    price: 7.00,
    image: art32,
    dimensions: '2"',
    medium: 'Keychain',
    materialType: 'keychain',
    inStock: true,
    dateAdded: '2026-08-15',
  },
  {
    id: 33,
    name: 'Bleugh Coffee',
    category: 'keychain',
    description: "It’s too much coffee for one mug!",
    price: 7.00,
    image: art33,
    dimensions: '2"',
    medium: 'Keychain',
    materialType: 'keychain',
    inStock: true,
    dateAdded: '2026-08-15',
  },
  {
    id: 34,
    name: 'Flustered Coffee',
    category: 'keychain',
    description: "The mug is blushing! Perhaps it heard something funny?",
    price: 7.00,
    image: art34,
    dimensions: '2"',
    medium: 'Keychain',
    materialType: 'keychain',
    inStock: true,
    dateAdded: '2026-08-15',
  },
  {
    id: 35,
    name: 'Chef Bunny',
    category: 'keychain',
    description: 'A cheerful bunny chef serving up a sweet, fluffy pancake topped with some fresh berries, cream, maple syrup, and homemade butter. Enjoy!',
    price: 7.00,
    image: art35,
    dimensions: '2"',
    medium: 'Keychain',
    materialType: 'keychain',
    inStock: true,
    dateAdded: '2026-08-15',
  },
  {
    id: 36,
    name: 'Cute Poached Egg',
    category: 'keychain',
    description: "A dumbfounded poached egg, questioning how it arrived in such a situation as this. At least it’s well-seasoned.",
    price: 7.00,
    image: art36,
    dimensions: '2"',
    medium: 'Keychain',
    materialType: 'keychain',
    inStock: true,
    dateAdded: '2026-08-15',
  },
  {
    id: 37,
    name: 'Blueberry Muffin',
    category: 'keychain',
    description: "I mean what’s there to say? It's a muffin, it’s a snack, and it’s cute! Yessiree, that is a blueberry muffin alright!",
    price: 7.00,
    image: art37,
    dimensions: '2"',
    medium: 'Keychain',
    materialType: 'keychain',
    inStock: true,
    dateAdded: '2026-08-15',
  }
];

// How long a product shows the "New" badge/filter after its dateAdded,
// rather than a per-product flag that has to be manually turned off later.
export const NEW_ITEM_WINDOW_DAYS = 28;

export function isNewProduct(product) {
  if (!product.dateAdded) return false;
  const addedTime = new Date(product.dateAdded).getTime();
  return Date.now() - addedTime < NEW_ITEM_WINDOW_DAYS * 24 * 60 * 60 * 1000;
}
