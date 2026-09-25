import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Section from "./Section";
import ProductCard from "./ProductCard";

/**
 * Full-catalogue listing shared by New Arrivals, Best Sellers and Deals —
 * each is the same shape (breadcrumb, heading, product grid), just a
 * different tag selector and icon. The home page sections showing a
 * short rail of the same products are separate components; this is
 * where their "See All" link lands.
 */
const CatalogueListing = ({ icon: Icon, title, subtitle, products }) => (
  <Section tone="canvas">
    {/* Breadcrumb */}
    <nav
      aria-label="Breadcrumb"
      className="mb-4 flex items-center gap-1.5 text-xs text-ink-500"
    >
      <Link to="/" className="hover:text-navy-700">
        Home
      </Link>
      <ChevronRight size={13} aria-hidden="true" />
      <span className="font-medium text-ink-900">{title}</span>
    </nav>

    <div className="mb-6">
      <h1 className="flex items-center gap-2 font-display text-xl font-bold text-ink-900 sm:text-2xl">
        {Icon && (
          <Icon size={22} className="text-gold-500" aria-hidden="true" />
        )}
        {title}
      </h1>
      <p className="mt-1 text-xs text-ink-500 sm:text-sm">
        {subtitle} · {products.length} product{products.length === 1 ? "" : "s"}
      </p>
    </div>

    {products.length ? (
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard
              product={product}
              tone={product.artisan ? "clay" : "default"}
            />
          </li>
        ))}
      </ul>
    ) : (
      <p className="rounded-2xl border border-dashed border-line bg-surface py-16 text-center text-sm text-ink-500">
        Nothing here just yet — check back soon.
      </p>
    )}
  </Section>
);

export default CatalogueListing;
