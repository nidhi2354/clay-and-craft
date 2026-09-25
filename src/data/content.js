/**
 * Editorial content for the home page: hero slides, promo cards,
 * the curated collection grid, trust badges and testimonials.
 * Kept apart from the catalogue so marketing copy can change
 * without touching product data.
 */

export const heroSlides = [
  {
    id: 1,
    eyebrow: "Toys · Sports · Gifts · Gadgets & More",
    title: "Big Dreams,",
    titleAccent: "Bigger Savings",
    offer: "Up to 50% off",
    description:
      "Thousands of genuine products across ten categories — delivered to your door.",
    cta: { label: "Shop Now", href: "/shop" },
    image:
      "https://images.unsplash.com/photo-1509386175345-24d4e16ae35f?auto=format&fit=crop&w=1600&q=80",
    theme: "navy",
  },
  {
    id: 2,
    eyebrow: "Handmade Pottery Studio",
    title: "Shaped by Hand,",
    titleAccent: "Never Repeated",
    offer: "New collection live",
    description:
      "Wheel-thrown vases, planters and tableware made in our Mokama studio.",
    cta: { label: "Explore Pottery", href: "/category/pottery" },
    image:
      "https://images.unsplash.com/photo-1633931763852-46bbf1c22961?auto=format&fit=crop&w=1600&q=80",
    theme: "clay",
  },
  {
    id: 3,
    eyebrow: "Electronics & Smart Gadgets",
    title: "Tech That",
    titleAccent: "Keeps Up",
    offer: "From ₹499",
    description:
      "Headphones, earbuds, smart watches and desk setups at honest prices.",
    cta: { label: "Shop Electronics", href: "/category/electronics" },
    image:
      "https://images.unsplash.com/photo-1559327875-12005444b626?auto=format&fit=crop&w=1600&q=80",
    theme: "indigo",
  },
];

export const promoCards = [
  {
    id: 1,
    icon: "crown",
    title: "Best Sellers",
    subtitle: "Most loved products",
    href: "/best-sellers",
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    tone: "navy",
    badge: "#1 Best Seller",
  },
  {
    id: 2,
    icon: "sparkles",
    title: "Unique Finds",
    subtitle: "Products you won't see everywhere",
    href: "/category/pottery",
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
    tone: "clay",
    badge: "Handmade Pottery",
  },
  {
    id: 3,
    icon: "zap",
    title: "New Arrivals",
    subtitle: "Fresh styles, new choices",
    href: "/new-arrivals",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
    tone: "brand",
    badge: "New",
  },
];

export const specialCollections = [
  {
    id: 1,
    title: "Gifts for Kids",
    href: "/category/toys",
    image:
      "https://images.unsplash.com/photo-1558877385-81a1c7e67d72?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "Birthday Gifts",
    href: "/category/gifts",
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    title: "Festival Collection",
    href: "/category/gifts",
    image:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    title: "Sports Collection",
    href: "/category/sports",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    title: "Handmade Collection",
    href: "/category/pottery",
    image:
      "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    title: "Tech Collection",
    href: "/category/electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
  },
];

export const trustBadges = [
  {
    id: 1,
    icon: "truck",
    title: "Fast & Safe Delivery",
    description: "Across India",
  },
  {
    id: 2,
    icon: "shield",
    title: "Secure Payments",
    description: "100% protected",
  },
  {
    id: 3,
    icon: "refresh",
    title: "Easy Returns",
    description: "Hassle free",
  },
  {
    id: 4,
    icon: "badge",
    title: "Genuine Products",
    description: "Trusted quality",
  },
  {
    id: 5,
    icon: "headset",
    title: "24/7 Support",
    description: "We're always here",
  },
];

export const reviews = [
  {
    id: 1,
    name: "Rohit S.",
    location: "Patna, Bihar",
    rating: 5,
    avatar: "https://i.pravatar.cc/120?img=12",
    title: "Amazing quality and fast delivery!",
    body: "The RC car for my son is exactly as shown in the photos. Packed well and reached in two days.",
  },
  {
    id: 2,
    name: "Ananya P.",
    location: "Ranchi, Jharkhand",
    rating: 5,
    avatar: "https://i.pravatar.cc/120?img=47",
    title: "Best website for gifts and unique items",
    body: "I ordered the handmade tea cup set. Every cup is slightly different and the glaze is beautiful. Loved the pottery collection.",
  },
  {
    id: 3,
    name: "Amit K.",
    location: "Mokama, Bihar",
    rating: 5,
    avatar: "https://i.pravatar.cc/120?img=33",
    title: "Great prices and genuine products",
    body: "Bought a smart watch and a backpack. Both genuine, both cheaper than the market rate here. Will shop again.",
  },
];

export const announcements = [
  "Free delivery on orders above ₹499",
  "Handmade pottery — new collection live now",
  "Easy 7-day returns on every order",
];
