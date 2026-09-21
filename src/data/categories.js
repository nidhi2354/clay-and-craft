/**
 * Storefront categories. Shape matches what the category API will return:
 * { id, name, slug, image, blurb, tone, subcategories }
 *
 * `tone` drives the tile's tint so the grid reads as a set rather than
 * eight unrelated photos. Values map to token ramps in index.css.
 */
const categories = [
  {
    id: 1,
    name: "Toys",
    slug: "toys",
    blurb: "Fun for every age",
    tone: "amber",
    image:
      "https://images.unsplash.com/photo-1558877385-81a1c7e67d72?auto=format&fit=crop&w=600&q=80",
    subcategories: ["Soft Toys", "Remote Control", "Puzzles", "Board Games"],
  },
  {
    id: 2,
    name: "Sports",
    slug: "sports",
    blurb: "Gear up and play",
    tone: "sky",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80",
    subcategories: ["Cricket", "Badminton", "Football", "Fitness"],
  },
  {
    id: 3,
    name: "Gifts",
    slug: "gifts",
    blurb: "Made to be unwrapped",
    tone: "rose",
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80",
    subcategories: ["Birthday", "Anniversary", "Festival", "Personalised"],
  },
  {
    id: 4,
    name: "Watches",
    slug: "watches",
    blurb: "Classic to smart",
    tone: "slate",
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80",
    subcategories: ["Smart Watches", "Analog", "Digital", "Kids"],
  },
  {
    id: 5,
    name: "Fashion",
    slug: "fashion",
    blurb: "Everyday essentials",
    tone: "violet",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
    subcategories: ["Men", "Women", "Bags", "Sunglasses"],
  },
  {
    id: 6,
    name: "Stationery",
    slug: "stationery",
    blurb: "Work, study, create",
    tone: "teal",
    image:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=600&q=80",
    subcategories: ["Notebooks", "Pens", "Art Supplies", "Office"],
  },
  {
    id: 7,
    name: "Electronics",
    slug: "electronics",
    blurb: "Tech that keeps up",
    tone: "indigo",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    subcategories: ["Headphones", "Speakers", "Chargers", "Smart Home"],
  },
  {
    id: 8,
    name: "Computer Accessories",
    slug: "computer-accessories",
    blurb: "Build your setup",
    tone: "sky",
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80",
    subcategories: ["Keyboards", "Mice", "Monitors", "Storage"],
  },
  {
    id: 9,
    name: "Home & Decor",
    slug: "home-decor",
    blurb: "Warmth for your space",
    tone: "amber",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
    subcategories: ["Lighting", "Wall Art", "Cushions", "Storage"],
  },
  {
    id: 10,
    name: "Handmade Pottery",
    slug: "pottery",
    blurb: "Shaped by hand, never repeated",
    tone: "clay",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=600&q=80",
    subcategories: ["Vases", "Planters", "Mugs & Cups", "Tableware"],
  },
];

/** Tiles shown in the compact "Shop by Category" strip on the home page. */
export const getFeaturedCategories = (limit = 8) => categories.slice(0, limit);

export default categories;
