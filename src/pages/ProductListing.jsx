import { useEffect, useMemo, useState } from "react";
import { ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Section from "../components/common/Section";
import ProductCard from "../components/common/ProductCard";
import NotFound from "./NotFound";
import categories from "../data/categories";
import allProducts, {
  PRICE_BANDS,
  SORT_OPTIONS,
  filterByPriceBand,
  getProductsByCategory,
  sortProducts,
} from "../data/products";

/**
 * Product listing — serves both "/shop" (all products) and
 * "/category/:slug" (one category). The URL is the source of truth for
 * every filter: price band and sort live in the query string
 * (`?price=…&sort=…`), category lives in the route param. That mirrors
 * a real `GET /products?category=…&price=…&sort=…` request, so wiring
 * this page to an API later is a matter of replacing the three
 * selector calls below with one fetch built from the same params.
 */
const ProductListing = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const activeCategory = slug ? categories.find((c) => c.slug === slug) : null;
  const priceBandId = searchParams.get("price") ?? "";
  const sortId = searchParams.get("sort") ?? "popularity";

  const results = useMemo(() => {
    const base = slug ? getProductsByCategory(slug) : allProducts;
    return sortProducts(filterByPriceBand(base, priceBandId), sortId);
  }, [slug, priceBandId, sortId]);

  /* Lock body scroll while the mobile filter drawer is open */
  useEffect(() => {
    document.body.style.overflow = filtersOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [filtersOpen]);

  // A slug is in the URL but doesn't match any known category.
  if (slug && !activeCategory) return <NotFound />;

  const setParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  };

  const clearFilters = () => setSearchParams(sortId === "popularity" ? {} : { sort: sortId });

  const title = activeCategory ? activeCategory.name : "All Products";
  const isPottery = activeCategory?.slug === "pottery";

  const filterPanel = (
    <>
      <nav aria-label="Categories">
        <h3 className="text-xs font-bold uppercase tracking-wide text-ink-500">
          Category
        </h3>
        <ul className="mt-3 space-y-1">
          <li>
            <Link
              to="/shop"
              onClick={() => setFiltersOpen(false)}
              className={`block rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
                !activeCategory
                  ? "bg-navy-50 font-semibold text-navy-800"
                  : "text-ink-700 hover:bg-navy-50"
              }`}
            >
              All Products
            </Link>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link
                to={`/category/${cat.slug}`}
                onClick={() => setFiltersOpen(false)}
                className={`block rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
                  activeCategory?.slug === cat.slug
                    ? "bg-navy-50 font-semibold text-navy-800"
                    : "text-ink-700 hover:bg-navy-50"
                }`}
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-6 border-t border-line pt-5">
        <h3 className="text-xs font-bold uppercase tracking-wide text-ink-500">
          Price
        </h3>
        <ul className="mt-3 space-y-1">
          {PRICE_BANDS.map((band) => (
            <li key={band.id}>
              <button
                type="button"
                onClick={() =>
                  setParam("price", priceBandId === band.id ? "" : band.id)
                }
                aria-pressed={priceBandId === band.id}
                className={`block w-full rounded-lg px-2.5 py-1.5 text-left text-sm transition-colors ${
                  priceBandId === band.id
                    ? "bg-gold-100 font-semibold text-navy-800"
                    : "text-ink-700 hover:bg-navy-50"
                }`}
              >
                {band.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {(priceBandId || activeCategory) && (
        <button
          type="button"
          onClick={clearFilters}
          className="mt-5 text-xs font-semibold text-navy-600 hover:text-navy-800"
        >
          Clear all filters
        </button>
      )}
    </>
  );

  return (
    <Section tone="canvas">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-xs text-ink-500">
        <Link to="/" className="hover:text-navy-700">
          Home
        </Link>
        <ChevronRight size={13} aria-hidden="true" />
        <Link to="/shop" className="hover:text-navy-700">
          Shop
        </Link>
        {activeCategory && (
          <>
            <ChevronRight size={13} aria-hidden="true" />
            <span className="font-medium text-ink-900">{activeCategory.name}</span>
          </>
        )}
      </nav>

      {/* Header row */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-xl font-bold text-ink-900 sm:text-2xl">
            {title}
          </h1>
          <p className="mt-1 text-xs text-ink-500 sm:text-sm">
            {results.length} product{results.length === 1 ? "" : "s"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="flex h-9 items-center gap-1.5 rounded-full border border-line px-3.5 text-xs font-semibold text-ink-700 lg:hidden"
          >
            <SlidersHorizontal size={14} aria-hidden="true" />
            Filters
          </button>

          <label className="flex items-center gap-2 text-xs text-ink-500">
            <span className="hidden sm:inline">Sort by</span>
            <select
              value={sortId}
              onChange={(e) => setParam("sort", e.target.value)}
              className="h-9 rounded-full border border-line bg-surface px-3 text-xs font-semibold text-ink-900 outline-none focus:border-navy-300"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[220px_1fr]">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">{filterPanel}</aside>

        {/* Mobile filter drawer */}
        {filtersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              aria-label="Close filters"
              onClick={() => setFiltersOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <div className="absolute inset-y-0 left-0 w-[82vw] max-w-xs overflow-y-auto bg-surface p-4 shadow-2xl">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-bold text-ink-900">Filters</h2>
                <button
                  type="button"
                  aria-label="Close filters"
                  onClick={() => setFiltersOpen(false)}
                  className="grid h-8 w-8 place-items-center rounded-full hover:bg-navy-50"
                >
                  <X size={17} aria-hidden="true" />
                </button>
              </div>
              {filterPanel}
            </div>
          </div>
        )}

        {/* Results */}
        {results.length ? (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
            {results.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} tone={isPottery ? "clay" : "default"} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-2xl border border-dashed border-line bg-surface py-16 text-center text-sm text-ink-500">
            No products match these filters — try clearing them.
          </p>
        )}
      </div>
    </Section>
  );
};

export default ProductListing;
