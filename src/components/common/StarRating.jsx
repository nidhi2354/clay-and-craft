import { Star } from "lucide-react";

/**
 * Five-star rating with a half-star step, plus an optional review count.
 * The visual stars are decorative — the accessible value is announced
 * once through aria-label so a screen reader hears "Rated 4.6 out of 5"
 * rather than five separate icons.
 */
const StarRating = ({ value = 0, count, size = 13, className = "" }) => (
  <span
    className={`flex items-center gap-1 ${className}`}
    aria-label={`Rated ${value} out of 5${
      count ? ` from ${count} reviews` : ""
    }`}
  >
    <span aria-hidden="true" className="flex items-center gap-px">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = value >= i + 1;
        const half = !filled && value > i;

        return (
          <span key={i} className="relative inline-flex">
            <Star size={size} className="text-ink-400/50" />

            {(filled || half) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: half ? `${(value - i) * 100}%` : "100%" }}
              >
                <Star
                  size={size}
                  className="fill-gold-400 text-gold-400"
                />
              </span>
            )}
          </span>
        );
      })}
    </span>

    {count != null && (
      <span aria-hidden="true" className="text-[11px] text-ink-500">
        ({count})
      </span>
    )}
  </span>
);

export default StarRating;
