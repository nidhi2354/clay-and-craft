import { Link } from "react-router-dom";
import { ChevronRight, Heart } from "lucide-react";
import Section from "../components/common/Section";
import Button from "../components/common/Button";
import ProductCard from "../components/common/ProductCard";
import { useWishlist } from "../context/WishlistContext";

/**
 * "/wishlist" — reads entirely off WishlistContext. Reuses ProductCard
 * as-is: its heart button already calls toggleItem, so unheart-ing a
 * product here removes it from the grid the same way it would add it
 * from any other page — one behaviour, not a second remove control.
 */
const Wishlist = () => {
  const { items, totalItems, clearWishlist } = useWishlist();

  if (items.length === 0) {
    return (
      <Section tone="canvas" className="min-h-[60vh]">
        <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-navy-50 text-navy-400">
            <Heart size={28} aria-hidden="true" />
          </span>

          <h1 className="text-xl font-bold text-ink-900 sm:text-2xl">
            Your wishlist is empty
          </h1>

          <p className="max-w-sm text-sm text-ink-500">
            Tap the heart on any product to save it here for later.
          </p>

          <Button href="/shop" variant="primary" size="md" className="mt-2">
            Explore Products
          </Button>
        </div>
      </Section>
    );
  }

  return (
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
        <span className="font-medium text-ink-900">Wishlist</span>
      </nav>

      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-xl font-bold text-ink-900 sm:text-2xl">
            My Wishlist
          </h1>
          <p className="mt-1 text-xs text-ink-500 sm:text-sm">
            {totalItems} product{totalItems === 1 ? "" : "s"} saved
          </p>
        </div>

        <button
          type="button"
          onClick={clearWishlist}
          className="text-xs font-semibold text-ink-500 transition-colors hover:text-danger"
        >
          Clear wishlist
        </button>
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-5">
        {items.map((product) => (
          <li key={product.id}>
            <ProductCard
              product={product}
              tone={product.artisan ? "clay" : "default"}
            />
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default Wishlist;
