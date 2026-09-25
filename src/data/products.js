/**
 * Product catalogue — the single source of truth the UI renders from.
 *
 * When the backend is ready, replace the `products` array with the API
 * response and keep the selectors below. Every component reads the same
 * shape, so no component needs to change:
 *
 *   {
 *     id, name, slug, price, mrp, image, category, categorySlug,
 *     rating, ratingCount, tags[], stock
 *   }
 *
 * `tags` drives placement: "best-seller" | "new" | "deal" | "pottery".
 * A product can carry more than one.
 */
const IMG = {
  rcCar:
    "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=700&q=80",
  shoes:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
  blocks:
    "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=700&q=80",
  smartWatch:
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=700&q=80",
  sunglasses:
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80",
  headphones:
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",
  football:
    "https://images.unsplash.com/photo-1614632537190-23e4146777db?auto=format&fit=crop&w=700&q=80",
  backpack:
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80",
  earbuds:
    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=700&q=80",
  keyboard:
    "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=700&q=80",
  racket:
    "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=700&q=80",
  giftBox:
    "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=700&q=80",
  notebook:
    "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=700&q=80",
  lamp: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=700&q=80",

  // Pottery — the spotlight range
  potteryVase:
    "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=700&q=80",
  potteryPlanter:
    "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=700&q=80",
  potteryMug:
    "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=700&q=80",
  potteryBowl:
    "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=700&q=80",
  potteryWheel:
    "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=700&q=80",
  potteryCups:
    "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=700&q=80",
};

const products = [
  {
    id: 1,
    name: "RC Rally Car with Remote Control",
    slug: "rc-rally-car-remote-control",
    price: 499,
    mrp: 799,
    image: IMG.rcCar,
    category: "Toys",
    categorySlug: "toys",
    rating: 4.6,
    ratingCount: 128,
    tags: ["best-seller", "deal"],
    stock: 24,
    description:
      "A rugged remote-control rally car built for indoor and outdoor play, with responsive steering and a rechargeable battery.",
  },
  {
    id: 2,
    name: "Sports Running Shoes — Lightweight Mesh",
    slug: "sports-running-shoes",
    price: 1199,
    mrp: 1999,
    image: IMG.shoes,
    category: "Sports",
    categorySlug: "sports",
    rating: 4.5,
    ratingCount: 96,
    tags: ["best-seller"],
    stock: 12,
    description:
      "Lightweight mesh running shoes with a cushioned sole, built for daily runs and all-day comfort.",
  },
  {
    id: 3,
    name: "Building Blocks Set (100 Pieces)",
    slug: "building-blocks-100-pcs",
    price: 699,
    mrp: 999,
    image: IMG.blocks,
    category: "Toys",
    categorySlug: "toys",
    rating: 4.7,
    ratingCount: 215,
    tags: ["best-seller", "deal"],
    stock: 40,
    description:
      "A 100-piece building block set that snaps together with leading brands, great for open-ended imaginative play.",
  },
  {
    id: 4,
    name: "Smart Watch with Fitness Tracking",
    slug: "smart-watch-fitness",
    price: 1999,
    mrp: 3499,
    image: IMG.smartWatch,
    category: "Watches",
    categorySlug: "watches",
    rating: 4.4,
    ratingCount: 142,
    tags: ["best-seller", "new", "deal"],
    stock: 8,
    description:
      "Track steps, heart rate and sleep, and get call and message alerts on your wrist, with up to 7 days of battery life.",
  },
  {
    id: 5,
    name: "Polarized Sunglasses — UV400",
    slug: "polarized-sunglasses-uv400",
    price: 799,
    mrp: 1499,
    image: IMG.sunglasses,
    category: "Fashion",
    categorySlug: "fashion",
    rating: 4.3,
    ratingCount: 88,
    tags: ["best-seller", "deal"],
    stock: 31,
    description:
      "UV400-rated polarized lenses cut glare and protect your eyes, in a lightweight frame built for all-day wear.",
  },
  {
    id: 6,
    name: "Over-Ear Wireless Headphones",
    slug: "over-ear-wireless-headphones",
    price: 999,
    mrp: 2999,
    image: IMG.headphones,
    category: "Electronics",
    categorySlug: "electronics",
    rating: 4.5,
    ratingCount: 302,
    tags: ["deal", "new"],
    stock: 17,
    description:
      "Over-ear wireless headphones with deep bass, a padded headband and up to 20 hours of playback.",
  },
  {
    id: 7,
    name: "Match Football — Size 5",
    slug: "match-football-size-5",
    price: 399,
    mrp: 699,
    image: IMG.football,
    category: "Sports",
    categorySlug: "sports",
    rating: 4.2,
    ratingCount: 64,
    tags: ["deal"],
    stock: 55,
    description:
      "Official size 5 match football with a durable stitched cover, suited for turf and grass grounds alike.",
  },
  {
    id: 8,
    name: "Travel Backpack 30L — Water Resistant",
    slug: "travel-backpack-30l",
    price: 799,
    mrp: 1499,
    image: IMG.backpack,
    category: "Fashion",
    categorySlug: "fashion",
    rating: 4.6,
    ratingCount: 174,
    tags: ["best-seller", "deal"],
    stock: 22,
    description:
      "A 30-litre water-resistant backpack with a padded laptop sleeve, built for daily commutes and weekend trips.",
  },
  {
    id: 9,
    name: "True Wireless Earbuds with Charging Case",
    slug: "true-wireless-earbuds",
    price: 1299,
    mrp: 2499,
    image: IMG.earbuds,
    category: "Electronics",
    categorySlug: "electronics",
    rating: 4.4,
    ratingCount: 210,
    tags: ["new"],
    stock: 19,
    description:
      "True wireless earbuds with a compact charging case, touch controls and clear call quality.",
  },
  {
    id: 10,
    name: "Mechanical Keyboard — RGB Backlit",
    slug: "mechanical-keyboard-rgb",
    price: 2299,
    mrp: 3299,
    image: IMG.keyboard,
    category: "Computer Accessories",
    categorySlug: "computer-accessories",
    rating: 4.7,
    ratingCount: 91,
    tags: ["new"],
    stock: 7,
    description:
      "A mechanical keyboard with per-key RGB backlighting and tactile switches, built for gaming and long typing sessions.",
  },
  {
    id: 11,
    name: "Badminton Racket Pair with Cover",
    slug: "badminton-racket-pair",
    price: 899,
    mrp: 1399,
    image: IMG.racket,
    category: "Sports",
    categorySlug: "sports",
    rating: 4.3,
    ratingCount: 58,
    tags: ["new"],
    stock: 33,
    description:
      "A pair of lightweight badminton rackets with a carry cover, ready for casual games or practice.",
  },
  {
    id: 12,
    name: "Premium Gift Hamper Box",
    slug: "premium-gift-hamper-box",
    price: 1099,
    mrp: 1599,
    image: IMG.giftBox,
    category: "Gifts",
    categorySlug: "gifts",
    rating: 4.8,
    ratingCount: 137,
    tags: ["best-seller"],
    stock: 15,
    description:
      "A curated gift hamper in premium packaging, ready to hand over for birthdays, anniversaries and festivals.",
  },
  {
    id: 13,
    name: "Hardbound Notebook Set (Pack of 3)",
    slug: "hardbound-notebook-set",
    price: 349,
    mrp: 549,
    image: IMG.notebook,
    category: "Stationery",
    categorySlug: "stationery",
    rating: 4.4,
    ratingCount: 76,
    tags: ["new"],
    stock: 60,
    description:
      "A pack of 3 hardbound notebooks with smooth, bleed-resistant paper for daily notes and journaling.",
  },
  {
    id: 14,
    name: "Warm LED Table Lamp",
    slug: "warm-led-table-lamp",
    price: 849,
    mrp: 1299,
    image: IMG.lamp,
    category: "Home & Decor",
    categorySlug: "home-decor",
    rating: 4.5,
    ratingCount: 103,
    tags: ["deal"],
    stock: 26,
    description:
      "A warm-white LED table lamp with a soft, even glow, suited for a study desk or bedside table.",
  },

  /* ---- Handmade Pottery — the spotlight range ---- */
  {
    id: 15,
    name: "Hand-Thrown Ceramic Vase",
    slug: "hand-thrown-ceramic-vase",
    price: 899,
    mrp: 1199,
    image: IMG.potteryVase,
    category: "Handmade Pottery",
    categorySlug: "pottery",
    rating: 4.8,
    ratingCount: 64,
    tags: ["pottery", "best-seller"],
    stock: 9,
    artisan: "Wheel-thrown in Mokama",
    description:
      "Thrown on the wheel and finished by hand in our Mokama studio — every vase carries its own subtle shape and glaze variation.",
  },
  {
    id: 16,
    name: "Terracotta Planter — Natural Finish",
    slug: "terracotta-planter-natural",
    price: 649,
    mrp: 899,
    image: IMG.potteryPlanter,
    category: "Handmade Pottery",
    categorySlug: "pottery",
    rating: 4.7,
    ratingCount: 82,
    tags: ["pottery", "deal"],
    stock: 28,
    artisan: "Natural clay, unglazed",
    description:
      "Unglazed natural clay planter that lets roots breathe, hand-shaped with a raw, earthy finish.",
  },
  {
    id: 17,
    name: "Handmade Stoneware Coffee Mug",
    slug: "handmade-stoneware-coffee-mug",
    price: 499,
    mrp: 699,
    image: IMG.potteryMug,
    category: "Handmade Pottery",
    categorySlug: "pottery",
    rating: 4.9,
    ratingCount: 151,
    tags: ["pottery", "best-seller"],
    stock: 41,
    artisan: "Food-safe glaze",
    description:
      "A food-safe glazed stoneware mug, hand-thrown and finished in-house — no two mugs glaze exactly alike.",
  },
  {
    id: 18,
    name: "Glazed Ceramic Serving Bowl",
    slug: "glazed-ceramic-serving-bowl",
    price: 749,
    mrp: 999,
    image: IMG.potteryBowl,
    category: "Handmade Pottery",
    categorySlug: "pottery",
    rating: 4.6,
    ratingCount: 47,
    tags: ["pottery", "new"],
    stock: 14,
    artisan: "Glazed by hand",
    description:
      "A hand-glazed ceramic serving bowl, wheel-thrown and finished with a smooth, food-safe glaze.",
  },
  {
    id: 19,
    name: "Speckled Stoneware Dinner Plate",
    slug: "speckled-stoneware-dinner-plate",
    price: 599,
    mrp: 799,
    image: IMG.potteryWheel,
    category: "Handmade Pottery",
    categorySlug: "pottery",
    rating: 4.7,
    ratingCount: 39,
    tags: ["pottery", "new"],
    stock: 20,
    artisan: "Oven and microwave safe",
    description:
      "A speckled stoneware dinner plate, oven and microwave safe, with the subtle texture only hand glazing gives.",
  },
  {
    id: 20,
    name: "Matte Glaze Tea Cup Set of 4",
    slug: "matte-glaze-tea-cup-set",
    price: 1299,
    mrp: 1699,
    image: IMG.potteryCups,
    category: "Handmade Pottery",
    categorySlug: "pottery",
    rating: 4.8,
    ratingCount: 58,
    tags: ["pottery", "best-seller", "deal"],
    stock: 11,
    artisan: "No two cups alike",
    description:
      "A set of 4 matte-glaze tea cups, each hand-thrown so no two cups in the set are quite alike.",
  },
];

/* ---------------- Derived values ---------------- */

/** Percentage saved, or 0 when the product is not discounted. */
export const getDiscount = (product) =>
  product.mrp && product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

/** Rupees formatted the Indian way — ₹1,299 rather than ₹1299. */
export const formatPrice = (value) =>
  `₹${new Intl.NumberFormat("en-IN").format(value)}`;

/* ------ Selectors: swap for API calls without touching a component ------ */

const byTag = (tag) => (p) => p.tags.includes(tag);

/** Single product lookups — what a `GET /products/:id` or `/:slug` returns. */
export const getProductById = (id) => products.find((p) => p.id === id);
export const getProductBySlug = (slug) => products.find((p) => p.slug === slug);

/**
 * Products to show alongside a product detail page. Prefers the same
 * category; when a category is too small on its own (e.g. Watches has
 * only one product today), it's topped up with other products so the
 * rail never looks sparse.
 */
export const getRelatedProducts = (product, limit = 5) => {
  const sameCategory = products.filter(
    (p) => p.id !== product.id && p.categorySlug === product.categorySlug,
  );

  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);

  const fillers = products.filter(
    (p) => p.id !== product.id && p.categorySlug !== product.categorySlug,
  );

  return [...sameCategory, ...fillers].slice(0, limit);
};

export const getTopPicks = (limit = 5) =>
  [...products]
    .sort((a, b) => b.rating * b.ratingCount - a.rating * a.ratingCount)
    .slice(0, limit);

export const getBestSellers = (limit = 8) =>
  products.filter(byTag("best-seller")).slice(0, limit);

export const getNewArrivals = (limit = 8) =>
  products.filter(byTag("new")).slice(0, limit);

export const getPottery = (limit = 6) =>
  products.filter(byTag("pottery")).slice(0, limit);

export const getDeals = (limit = 8) =>
  products
    .filter(byTag("deal"))
    .sort((a, b) => getDiscount(b) - getDiscount(a))
    .slice(0, limit);

/* ---- Shop / Category listing: filters + sort ----
 * Kept as small composable functions — `GET /products?category=…&price=…
 * &sort=…` maps one-to-one to getProductsByCategory + filterByPriceBand
 * + sortProducts, so swapping the client-side array for an API response
 * later means the listing page barely changes. */

/** All products in a category — what a `GET /products?category=:slug` returns. */
export const getProductsByCategory = (categorySlug) =>
  products.filter((p) => p.categorySlug === categorySlug);

/** Price bands shown as filter chips. `max: Infinity` means "and above". */
export const PRICE_BANDS = [
  { id: "under-500", label: "Under ₹500", min: 0, max: 499 },
  { id: "500-1000", label: "₹500 – ₹1,000", min: 500, max: 1000 },
  { id: "1000-2000", label: "₹1,000 – ₹2,000", min: 1000, max: 2000 },
  { id: "above-2000", label: "Above ₹2,000", min: 2001, max: Infinity },
];

/** Filters a product list down to one price band. Unknown id = no-op. */
export const filterByPriceBand = (list, bandId) => {
  const band = PRICE_BANDS.find((b) => b.id === bandId);
  return band ? list.filter((p) => p.price >= band.min && p.price <= band.max) : list;
};

export const SORT_OPTIONS = [
  { id: "popularity", label: "Popularity" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Customer Rating" },
];

/** Sorts a copy of the list — never mutates what's passed in. */
export const sortProducts = (list, sortId) => {
  switch (sortId) {
    case "price-asc":
      return [...list].sort((a, b) => a.price - b.price);
    case "price-desc":
      return [...list].sort((a, b) => b.price - a.price);
    case "rating":
      return [...list].sort((a, b) => b.rating - a.rating);
    case "popularity":
    default:
      return [...list].sort(
        (a, b) => b.rating * b.ratingCount - a.rating * a.ratingCount,
      );
  }
};

export default products;
