import {
  BadgeCheck,
  Headset,
  RefreshCw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import Section from "../common/Section";
import { trustBadges } from "../../data/content";

/**
 * "Why Shop With Us" reassurance strip.
 *
 * Scrolls horizontally on phones rather than stacking into five tall
 * rows — these are supporting reassurance, not content worth a screen
 * of vertical space.
 */
const ICONS = {
  truck: Truck,
  shield: ShieldCheck,
  refresh: RefreshCw,
  badge: BadgeCheck,
  headset: Headset,
};

const TrustBadges = () => (
  <Section>
    <h2 className="mb-4 font-display text-base font-bold text-ink-900 sm:text-lg">
      Why Shop With Us?
    </h2>

    <ul className="no-scrollbar -mx-4 flex snap-x gap-2.5 overflow-x-auto px-4 pb-1 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-3 lg:overflow-visible lg:px-0">
      {trustBadges.map((badge) => {
        const Icon = ICONS[badge.icon] ?? BadgeCheck;

        return (
          <li
            key={badge.id}
            className="flex w-[62vw] min-w-[200px] shrink-0 snap-start items-center gap-3 rounded-xl border border-line bg-surface p-3 transition-colors hover:border-gold-300 lg:w-auto lg:min-w-0"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gold-100 text-gold-700">
              <Icon size={19} aria-hidden="true" />
            </span>

            <span className="min-w-0">
              <span className="block truncate text-xs font-bold text-ink-900 sm:text-[13px]">
                {badge.title}
              </span>
              <span className="block truncate text-[11px] text-ink-500">
                {badge.description}
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  </Section>
);

export default TrustBadges;
