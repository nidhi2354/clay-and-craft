import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Section from "../components/common/Section";
import categories from "../data/categories";

const PAGES = [
  { name: "Home", href: "/" },
  { name: "Shop All Products", href: "/shop" },
  { name: "New Arrivals", href: "/new-arrivals" },
  { name: "Best Sellers", href: "/best-sellers" },
  { name: "Today's Deals", href: "/deals" },
  { name: "About Us", href: "/about" },
  { name: "Cart", href: "/cart" },
  { name: "Wishlist", href: "/wishlist" },
  { name: "My Account", href: "/account" },
];

const SUPPORT = [
  { name: "Track Order", href: "/track-order" },
  { name: "Returns & Refunds", href: "/returns" },
  { name: "Shipping Policy", href: "/shipping" },
  { name: "FAQ / Help Centre", href: "/faq" },
  { name: "Contact Us", href: "/about#contact" },
];

const LEGAL = [
  { name: "Terms & Conditions", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Sitemap", href: "/sitemap" },
];

const LinkColumn = ({ heading, links }) => (
  <div>
    <h2 className="text-xs font-bold uppercase tracking-wide text-ink-500">
      {heading}
    </h2>
    <ul className="mt-3 space-y-2">
      {links.map((link) => (
        <li key={link.href}>
          <Link to={link.href} className="text-sm text-ink-700 hover:text-navy-700">
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

/** "/sitemap" — every page and category route in one place, for visitors and crawlers. */
const Sitemap = () => (
  <Section tone="canvas">
    <nav
      aria-label="Breadcrumb"
      className="mb-4 flex items-center gap-1.5 text-xs text-ink-500"
    >
      <Link to="/" className="hover:text-navy-700">
        Home
      </Link>
      <ChevronRight size={13} aria-hidden="true" />
      <span className="font-medium text-ink-900">Sitemap</span>
    </nav>

    <h1 className="mb-6 font-display text-xl font-bold text-ink-900 sm:text-2xl">
      Sitemap
    </h1>

    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      <LinkColumn heading="Pages" links={PAGES} />
      <LinkColumn
        heading="Categories"
        links={categories.map((cat) => ({
          name: cat.name,
          href: `/category/${cat.slug}`,
        }))}
      />
      <LinkColumn heading="Support" links={SUPPORT} />
      <LinkColumn heading="Legal" links={LEGAL} />
    </div>
  </Section>
);

export default Sitemap;
