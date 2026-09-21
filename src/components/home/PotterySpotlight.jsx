import { ArrowRight, Flame, Hand, Leaf, Sparkles } from "lucide-react";
import Section from "../common/Section";
import ProductRail from "../common/ProductRail";
import Button from "../common/Button";
import { getPottery } from "../../data/products";
import { site } from "../../data/site";

/**
 * Handmade Pottery — the client's flagship range, so it gets the only
 * full-bleed section on the page and its own warm clay palette. Sitting
 * between the navy Deals panel and the rest of the store, the colour
 * shift alone signals "this part is different".
 *
 * Product cards render with tone="clay" so even the buttons change
 * character inside this band.
 */
const craftPoints = [
  { icon: Hand, label: "Wheel-thrown by hand" },
  { icon: Leaf, label: "Natural local clay" },
  { icon: Sparkles, label: "No two pieces alike" },
];

const PotterySpotlight = () => {
  const pottery = getPottery(6);

  return (
    <Section id="pottery" tone="clay" className="relative overflow-hidden">
      {/* Soft decorative wash — purely atmospheric */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-clay-200/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-clay-300/40 blur-3xl"
      />

      <div className="relative">
        {/* Editorial header */}
        <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-clay-600 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
              <Flame size={12} aria-hidden="true" />
              Our Signature Range
            </p>

            <h2 className="font-display text-2xl font-bold leading-tight text-clay-800 sm:text-3xl lg:text-4xl">
              Handmade Pottery,
              <span className="block font-medium italic text-clay-600">
                shaped in Mokama
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-clay-700/85 sm:text-base">
              Every vase, planter and mug here is thrown on the wheel and
              glazed by hand in our own studio. Small marks, slight
              variations, no two pieces ever quite the same — that is the
              point, not a flaw.
            </p>

            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2.5">
              {craftPoints.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 text-xs font-medium text-clay-700 sm:text-sm"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-clay-600/15 text-clay-700">
                    <Icon size={13} aria-hidden="true" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="#pottery" variant="clay" size="md">
                Shop the Collection
                <ArrowRight size={16} aria-hidden="true" />
              </Button>

              <Button href={site.whatsappHref} variant="outline" size="md">
                Ask about custom orders
              </Button>
            </div>
          </div>

          {/* Studio image */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg lg:aspect-[5/4]">
              <img
                src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=80"
                alt="A potter shaping a clay vessel on the wheel"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-clay-800/50 via-transparent to-transparent"
              />

              <div className="absolute bottom-3 left-3 rounded-xl bg-white/90 px-3.5 py-2 backdrop-blur">
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-clay-600">
                  Our Studio
                </p>
                <p className="mt-0.5 text-xs font-semibold text-clay-800">
                  Main Road, Mokama
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pottery products */}
        <div className="mt-8 border-t border-clay-300/50 pt-7 sm:mt-10 sm:pt-8">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h3 className="font-display text-base font-bold text-clay-800 sm:text-lg">
              From the pottery studio
            </h3>

            <a
              href="#pottery"
              className="group flex shrink-0 items-center gap-1 text-xs font-semibold text-clay-600 transition-colors hover:text-clay-800 sm:text-sm"
            >
              See All
              <ArrowRight
                size={15}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
          </div>

          <ProductRail products={pottery} cols={6} tone="clay" />
        </div>
      </div>
    </Section>
  );
};

export default PotterySpotlight;
