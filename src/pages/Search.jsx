import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronRight, Search as SearchIcon } from "lucide-react";
import Section from "../components/common/Section";
import ProductCard from "../components/common/ProductCard";
import allProducts from "../data/products";

/**
 * "/search?q=…" — the Header's search bar navigates here on submit.
 * The query string is the source of truth (same rule as ProductListing),
 * so a refined search from the input on this page just replaces `q`
 * rather than keeping separate local state.
 */
const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [draft, setDraft] = useState(query);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q),
    );
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = draft.trim();
    setSearchParams(next ? { q: next } : {});
  };

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
        <span className="font-medium text-ink-900">Search</span>
      </nav>

      <form
        role="search"
        onSubmit={handleSubmit}
        className="relative mb-6 max-w-md"
      >
        <label htmlFor="search-page-input" className="sr-only">
          Search products
        </label>
        <SearchIcon
          size={16}
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400"
        />
        <input
          id="search-page-input"
          type="search"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Search products…"
          className="h-11 w-full rounded-full border border-line bg-surface pl-10 pr-4 text-sm text-ink-900 outline-none focus:border-navy-300"
        />
      </form>

      {query && (
        <p className="mb-5 text-sm text-ink-500">
          {results.length} result{results.length === 1 ? "" : "s"} for{" "}
          <span className="font-semibold text-ink-900">"{query}"</span>
        </p>
      )}

      {!query ? (
        <p className="rounded-2xl border border-dashed border-line bg-surface py-16 text-center text-sm text-ink-500">
          Type something above to search our catalogue.
        </p>
      ) : results.length ? (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
          {results.map((product) => (
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
          No products match "{query}" — try a different search.
        </p>
      )}
    </Section>
  );
};

export default Search;
