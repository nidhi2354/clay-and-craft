import { Link } from "react-router-dom";
import { site } from "../../data/site";

/**
 * Zivonix wordmark. The "Z" bolt sits in a rounded square so the mark
 * also works as a standalone favicon / app icon.
 *
 * @param {"light"|"dark"} variant  Colour of the text beside the mark.
 * @param {boolean} showTagline     Hide on tight mobile headers.
 */
const Logo = ({ variant = "dark", showTagline = true, className = "" }) => {
  const isLight = variant === "light";

  return (
    <Link
      to="/"
      aria-label={`${site.name} — home`}
      className={`flex shrink-0 items-center gap-2.5 ${className}`}
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-sm sm:h-10 sm:w-10">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-5 w-5 sm:h-6 sm:w-6"
          fill="none"
        >
          <path
            d="M13.6 2.2 5.1 12.5c-.5.6-.1 1.5.7 1.5h4.3l-1.7 7.8c-.2.8.9 1.3 1.4.6l8.5-10.3c.5-.6.1-1.5-.7-1.5h-4.3l1.7-7.8c.2-.8-.9-1.3-1.4-.6Z"
            fill="#fff"
          />
        </svg>
      </span>

      <span className="min-w-0 leading-none">
        <span
          className={`block font-display text-lg font-bold tracking-tight sm:text-xl ${
            isLight ? "text-white" : "text-ink-900"
          }`}
        >
          ZIVONIX
        </span>

        {showTagline && (
          <span
            className={`mt-0.5 hidden text-[9px] font-medium tracking-[0.14em] uppercase sm:block ${
              isLight ? "text-white/60" : "text-ink-500"
            }`}
          >
            Shop Smarter · Live Better
          </span>
        )}
      </span>
    </Link>
  );
};

export default Logo;
