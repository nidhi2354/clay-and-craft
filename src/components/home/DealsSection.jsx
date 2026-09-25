import { useMemo } from "react";
import { Zap } from "lucide-react";
import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";
import ProductCard from "../common/ProductCard";
import useCountdown from "../../hooks/useCountdown";
import { getDeals } from "../../data/products";

/**
 * Today's Deals — a dark panel with a live countdown and the four
 * steepest discounts.
 *
 * The deadline is midnight tonight in the visitor's own timezone, so
 * the timer is genuinely counting to something rather than showing a
 * decorative frozen "12 : 45 : 30".
 */
const endOfToday = () => {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d.getTime();
};

const DealsSection = () => {
  const deadline = useMemo(() => endOfToday(), []);
  const { hours, minutes, seconds, isOver } = useCountdown(deadline);
  const deals = getDeals(4);

  const units = [
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  return (
    <Section id="deals">
      <div className="overflow-hidden rounded-2xl bg-navy-800">
        <div className="flex flex-col gap-4 p-4 sm:p-5 lg:p-6">
          {/* Header row */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <SectionHeading
              icon={Zap}
              tone="light"
              title="Today's Deals"
              subtitle={
                isOver
                  ? "Today's offers have ended — new deals drop at midnight."
                  : "Limited time offers — don't miss out!"
              }
              linkLabel="View All Deals"
              linkHref="/deals"
              className="mb-0 flex-1"
            />
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden text-xs font-medium uppercase tracking-wider text-white/50 sm:inline">
              Ends in
            </span>

            <div
              className="flex items-center gap-1.5 sm:gap-2"
              role="timer"
              aria-live="off"
              aria-label={`Offer ends in ${hours} hours ${minutes} minutes`}
            >
              {units.map((unit, i) => (
                <div key={unit.label} className="flex items-center gap-1.5 sm:gap-2">
                  <div className="grid min-w-14 place-items-center rounded-lg bg-gold-400 px-2 py-1.5 sm:min-w-16 sm:py-2">
                    <span className="font-display text-base font-bold leading-none text-navy-900 tabular-nums sm:text-lg">
                      {unit.value}
                    </span>
                    <span className="mt-0.5 text-[9px] font-semibold uppercase text-navy-900/70">
                      {unit.label}
                    </span>
                  </div>

                  {i < units.length - 1 && (
                    <span aria-hidden="true" className="font-bold text-white/40">
                      :
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Deal products — cards sit on a light plate against the dark panel */}
          <ul className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4 lg:gap-4">
            {deals.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} compact />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
};

export default DealsSection;
