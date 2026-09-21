import { useEffect, useState } from "react";
import { Phone, Truck } from "lucide-react";
import { announcements } from "../../data/content";
import { site } from "../../data/site";

/**
 * Thin utility strip above the header. Desktop only — on mobile the
 * space is better spent on the search bar, and the same offers are
 * repeated inside the hero.
 *
 * The announcement rotates on a timer rather than a marquee so it stays
 * readable and pauses correctly for reduced-motion users.
 */
const TopBar = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % announcements.length),
      4000,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hidden border-b border-white/10 bg-navy-900 text-white md:block">
      <div className="mx-auto flex h-9 max-w-[1280px] items-center justify-between gap-6 px-6 text-xs lg:px-8">
        <p
          aria-live="polite"
          className="flex min-w-0 items-center gap-2 text-white/75"
        >
          <Truck size={14} aria-hidden="true" className="shrink-0 text-gold-400" />
          <span className="truncate">{announcements[index]}</span>
        </p>

        <div className="flex shrink-0 items-center gap-5">
          <a
            href={site.phoneHref}
            className="flex items-center gap-1.5 text-white/75 transition-colors hover:text-gold-300"
          >
            <Phone size={13} aria-hidden="true" />
            {site.phone}
          </a>

          <span aria-hidden="true" className="h-3 w-px bg-white/20" />

          <a href="#" className="text-white/75 transition-colors hover:text-gold-300">
            Track Order
          </a>
          <a href="#" className="text-white/75 transition-colors hover:text-gold-300">
            Help
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
