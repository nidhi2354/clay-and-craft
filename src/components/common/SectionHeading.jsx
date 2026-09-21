import { ArrowRight } from "lucide-react";

/**
 * Section header used by every home-page block.
 *
 * Left-aligned title + optional "See All" link by default; pass
 * align="center" for the full-width editorial blocks. `icon` renders
 * the small leading glyph (🔥 Today's Top Picks) as a lucide node.
 *
 * `tone` switches the accent so the Pottery spotlight can run warm
 * while the rest of the store runs navy/gold.
 */
const TONES = {
  default: { icon: "text-gold-500", link: "text-navy-600 hover:text-navy-800" },
  clay: { icon: "text-clay-500", link: "text-clay-600 hover:text-clay-800" },
  light: { icon: "text-gold-300", link: "text-white/80 hover:text-white" },
};

const SectionHeading = ({
  icon: Icon,
  title,
  subtitle,
  linkLabel = "See All",
  linkHref,
  align = "left",
  tone = "default",
  className = "",
}) => {
  const t = TONES[tone] ?? TONES.default;
  const onDark = tone === "light";

  if (align === "center") {
    return (
      <div className={`mx-auto mb-8 max-w-2xl text-center sm:mb-10 ${className}`}>
        <h2
          className={`flex items-center justify-center gap-2 text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl ${
            onDark ? "text-white" : "text-ink-900"
          }`}
        >
          {Icon && <Icon size={22} className={t.icon} aria-hidden="true" />}
          {title}
        </h2>

        {subtitle && (
          <p
            className={`mt-2 text-sm ${onDark ? "text-white/65" : "text-ink-500"}`}
          >
            {subtitle}
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      className={`mb-5 flex items-end justify-between gap-4 sm:mb-6 ${className}`}
    >
      <div className="min-w-0">
        <h2
          className={`flex items-center gap-2 text-lg font-bold tracking-tight sm:text-xl lg:text-2xl ${
            onDark ? "text-white" : "text-ink-900"
          }`}
        >
          {Icon && (
            <Icon
              size={20}
              className={`${t.icon} shrink-0`}
              aria-hidden="true"
            />
          )}
          <span className="truncate">{title}</span>
        </h2>

        {subtitle && (
          <p
            className={`mt-1 text-xs sm:text-sm ${
              onDark ? "text-white/60" : "text-ink-500"
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>

      {linkHref && (
        <a
          href={linkHref}
          className={`group flex shrink-0 items-center gap-1 text-xs font-semibold transition-colors sm:text-sm ${t.link}`}
        >
          {linkLabel}
          <ArrowRight
            size={15}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </a>
      )}
    </div>
  );
};

export default SectionHeading;
