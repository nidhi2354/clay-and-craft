import { ArrowRight, Crown, Sparkles, Zap } from "lucide-react";
import Section from "../common/Section";
import SmartLink from "../common/SmartLink";
import { promoCards } from "../../data/content";

/**
 * Three wide promo cards between the product rows — Best Sellers,
 * Unique Finds (the pottery teaser) and New Arrivals.
 *
 * Icon and tone are named in the data, resolved to components here, so
 * marketing can reorder or retitle the cards without touching JSX.
 */
const ICONS = { crown: Crown, sparkles: Sparkles, zap: Zap };

const TONES = {
  navy: {
    overlay: "from-navy-900/95 via-navy-800/75 to-navy-700/25",
    badge: "bg-gold-400 text-navy-900",
    icon: "text-gold-400",
  },
  clay: {
    overlay: "from-clay-800/95 via-clay-700/75 to-clay-500/25",
    badge: "bg-clay-100 text-clay-800",
    icon: "text-clay-200",
  },
  brand: {
    overlay: "from-brand-600/95 via-brand-500/75 to-brand-400/25",
    badge: "bg-white text-brand-600",
    icon: "text-white",
  },
};

const PromoBanners = () => (
  <Section>
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
      {promoCards.map((card) => {
        const Icon = ICONS[card.icon] ?? Crown;
        const t = TONES[card.tone] ?? TONES.navy;

        return (
          <li key={card.id}>
            <SmartLink
              href={card.href}
              className="group relative block aspect-[16/7] overflow-hidden rounded-2xl sm:aspect-[16/8]"
            >
              <img
                src={card.image}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 ease-soft group-hover:scale-105"
              />

              <div
                className={`absolute inset-0 bg-gradient-to-r ${t.overlay}`}
              />

              <div className="absolute inset-0 flex flex-col justify-center gap-1 p-4 sm:p-5">
                <p
                  className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider ${t.icon}`}
                >
                  <Icon size={13} aria-hidden="true" />
                  {card.badge}
                </p>

                <h3 className="font-display text-lg font-bold text-white sm:text-xl">
                  {card.title}
                </h3>

                <p className="max-w-[60%] text-[11px] leading-4 text-white/70 sm:text-xs">
                  {card.subtitle}
                </p>

                <span
                  className={`mt-2 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold transition-transform duration-200 group-hover:translate-x-0.5 ${t.badge}`}
                >
                  View All
                  <ArrowRight size={12} aria-hidden="true" />
                </span>
              </div>
            </SmartLink>
          </li>
        );
      })}
    </ul>
  </Section>
);

export default PromoBanners;
