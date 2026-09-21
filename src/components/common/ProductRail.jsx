import ProductCard from "./ProductCard";

/**
 * Responsive product container shared by every catalogue section.
 *
 * Mobile  — a horizontal snap rail, so a long list never turns the page
 *           into an endless column of cards.
 * Desktop — a plain grid at `cols` columns.
 *
 * Doing this once here means adding a new section is a data change,
 * not another hand-written responsive layout.
 */
/**
 * Column counts are kept identical at md and lg so a five-item row never
 * wraps to a lone orphan card on tablet.
 */
const COLS = {
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-3 lg:grid-cols-6",
};

const ProductRail = ({ products, cols = 5, tone = "default" }) => {
  if (!products?.length) {
    return (
      <p className="rounded-2xl border border-dashed border-line bg-surface py-12 text-center text-sm text-ink-500">
        Nothing here just yet — check back soon.
      </p>
    );
  }

  return (
    <>
      {/* Mobile / tablet: swipeable rail */}
      <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 md:hidden">
        {products.map((product) => (
          <li
            key={product.id}
            className="w-[44vw] min-w-[150px] max-w-[190px] shrink-0 snap-start"
          >
            <ProductCard product={product} tone={tone} compact />
          </li>
        ))}
      </ul>

      {/* Desktop: grid */}
      <ul
        className={`hidden gap-4 md:grid lg:gap-5 ${COLS[cols] ?? COLS[5]}`}
      >
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} tone={tone} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductRail;
