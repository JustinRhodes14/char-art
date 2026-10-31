import { products } from './products';

// Copy for the "Fresh from the Kitchen" gallery on the Home and Shop pages.
// Each slide pulls its photo and the blurb beside the carousel from the
// product it links to, so editing a product in products.js updates the
// gallery too.
export const GALLERY_HEADING = 'Fresh from the Kitchen';
export const GALLERY_INTRO =
  'Our latest products, fresh off the stove!'
export const GALLERY_SIGNOFF = 'served warm, with love ♡';

// productId: which product the slide shows and links to
// caption:   short handwritten-style label on the photo
// position:  optional object-position, for photos that crop awkwardly
const SLIDES = [
  { productId: 39, caption: 'a whole pan of baked eggs' },
  { productId: 40, caption: 'sunny side-up, all lined up', position: 'center center' },
  { productId: 25, caption: 'marinated & a little spicy' },
  { productId: 3, caption: 'fluffy egg nap time' },
  { productId: 7, caption: 'poached to perfection' },
  { productId: 15, caption: 'mayo egg toast for everyone' },
  { productId: 28, caption: 'sausage hot off the stove' },
  { productId: 29, caption: 'pizza toast.' },
  { productId: 17, caption: 'brought our sun-toasting oil' },
  { productId: 27, caption: 'salty & sweet' },
  { productId: 26, caption: 'muffin to see here' },
  { productId: 30, caption: 'sweet...' },
  { productId: 38, caption: '...or savory?' },
];

export const gallerySlides = SLIDES
  .map(slide => ({ ...slide, product: products.find(p => p.id === slide.productId) }))
  .filter(slide => slide.product && slide.product.image);
