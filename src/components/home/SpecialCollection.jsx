import { Crown } from "lucide-react";
import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";
import { specialCollections } from "../../data/content";

/**
 * Curated collection tiles — six themed entry points (gifting,
 * festivals, sports, handmade, tech) for shoppers who arrive with an
 * occasion in mind rather than a product.
 */
const SpecialCollection = () => (
  <Section id="collections" tone="surface">
    <SectionHeading
      icon={Crown}
      title="Special Collection"
      subtitle="Curated for your lifestyle"
      linkHref="#collections"
    />

    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
      {specialCollections.map((item) => (
        <li key={item.id}>
          <a
            href={item.href}
            className="group relative block aspect-[4/3] overflow-hidden rounded-xl sm:aspect-square"
          >
            <img
              src={item.image}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 ease-soft group-hover:scale-110"
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-900/25 to-transparent transition-opacity duration-300 group-hover:from-navy-950/90"
            />

            <h3 className="absolute inset-x-0 bottom-0 p-2.5 text-[11px] font-bold leading-tight text-white sm:p-3 sm:text-xs">
              {item.title}
            </h3>
          </a>
        </li>
      ))}
    </ul>
  </Section>
);

export default SpecialCollection;
