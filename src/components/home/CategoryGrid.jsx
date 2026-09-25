import { LayoutGrid } from "lucide-react";
import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";
import SmartLink from "../common/SmartLink";
import categories from "../../data/categories";

/**
 * "Shop by Category" tiles.
 *
 * Each tile gets a soft tinted plate behind the product cut-out so the
 * row reads as one designed set instead of ten unrelated photographs —
 * the tints come from the token ramps, never from the images.
 */
const TINTS = {
  amber: "bg-gold-100",
  sky: "bg-sky-100",
  rose: "bg-rose-100",
  slate: "bg-slate-200",
  violet: "bg-violet-100",
  teal: "bg-teal-100",
  indigo: "bg-indigo-100",
  clay: "bg-clay-200",
};

const CategoryGrid = () => (
  <Section id="categories" tone="surface">
    <SectionHeading
      icon={LayoutGrid}
      title="Shop by Category"
      subtitle="Find what you love, all in one place."
      linkLabel="View All"
      linkHref="/shop"
    />

    <ul className="grid grid-cols-4 gap-2.5 sm:grid-cols-5 sm:gap-4 lg:grid-cols-10 lg:gap-3">
      {categories.map((cat) => (
        <li key={cat.id}>
          <SmartLink
            href={`/category/${cat.slug}`}
            className="group flex flex-col items-center gap-2 text-center"
          >
            <span
              className={`relative grid aspect-square w-full place-items-center overflow-hidden rounded-xl transition-all duration-300 ease-soft group-hover:-translate-y-1 group-hover:shadow-lg ${
                TINTS[cat.tone] ?? TINTS.amber
              }`}
            >
              <img
                src={cat.image}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover mix-blend-multiply transition-transform duration-500 ease-soft group-hover:scale-110"
              />

              {cat.featured && (
                <span className="absolute inset-x-0 bottom-0 bg-clay-700/90 py-0.5 text-[8px] font-bold uppercase tracking-wide text-white">
                  Special
                </span>
              )}
            </span>

            {/* Two-line clamp, not truncate — "Computer Accessories" must
                stay readable in a ten-column row. */}
            <span className="clamp-2 w-full text-[11px] font-semibold leading-tight text-ink-700 transition-colors group-hover:text-navy-700 sm:text-xs">
              {cat.name}
            </span>
          </SmartLink>
        </li>
      ))}
    </ul>
  </Section>
);

export default CategoryGrid;
