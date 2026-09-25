/**
 * Single source of truth for brand + business details.
 * Header, Footer and metadata all read from here, so the client's
 * contact information is changed in exactly one place.
 */
export const site = {
  name: "Zivonix",
  tagline: "Shop Smarter. Live Better.",
  domain: "zivonix.com",

  director: "Sintu Kumar",
  phone: "+91 98357 80960",
  phoneHref: "tel:+919835780960",
  whatsappHref: "https://wa.me/919835780960",
  email: "sintu4102@gmail.com",
  emailHref: "mailto:sintu4102@gmail.com",

  address: {
    line1: "Main Road, Mokama",
    line2: "Patna, Bihar 803302",
    short: "Mokama, Bihar 803302",
  },

  freeShippingAbove: 499,
};

export const socialLinks = [
  { label: "Facebook", href: "#", symbol: "f" },
  { label: "Instagram", href: "#", symbol: "ig" },
  { label: "WhatsApp", href: site.whatsappHref, symbol: "wa" },
  { label: "YouTube", href: "#", symbol: "yt" },
  { label: "Pinterest", href: "#", symbol: "p" },
];

export const mainNav = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "New Arrivals", href: "/new-arrivals" },
  { name: "Best Sellers", href: "/best-sellers" },
  { name: "Deals", href: "/deals" },
  { name: "Pottery", href: "/category/pottery", highlight: true },
  { name: "About Us", href: "/about" },
];

export const footerNav = [
  {
    heading: "Quick Links",
    links: [
      { name: "Home", href: "/" },
      { name: "Shop", href: "/shop" },
      { name: "Best Sellers", href: "/best-sellers" },
      { name: "New Arrivals", href: "/new-arrivals" },
      { name: "Today's Deals", href: "/deals" },
      { name: "Pottery Studio", href: "/category/pottery" },
    ],
  },
  {
    heading: "Customer Service",
    links: [
      { name: "Track Order", href: "/track-order" },
      { name: "Returns & Refunds", href: "/returns" },
      { name: "Shipping Policy", href: "/shipping" },
      { name: "FAQ", href: "/faq" },
      { name: "Contact Us", href: "/about#contact" },
      { name: "Help Centre", href: "/faq" },
    ],
  },
];
