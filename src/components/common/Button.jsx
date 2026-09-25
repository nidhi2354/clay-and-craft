import { Link } from "react-router-dom";

/**
 * The one button in the system. Renders as a router <Link> for internal
 * paths ("/cart"), a plain <a> for hash anchors and external links
 * (mailto:, tel:, wa.me, "#section"), or a <button> when there's no
 * href — so a CTA never loses its link semantics, and internal links
 * navigate client-side instead of reloading the page.
 *
 * Variants map to the token ramps in index.css — no component
 * should ever hand-roll a background colour.
 */
const VARIANTS = {
  primary:
    "bg-gold-400 text-navy-900 hover:bg-gold-300 active:bg-gold-500 shadow-sm",
  navy: "bg-navy-700 text-white hover:bg-navy-600 active:bg-navy-800 shadow-sm",
  clay: "bg-clay-600 text-white hover:bg-clay-500 active:bg-clay-700 shadow-sm",
  light: "bg-white text-navy-800 hover:bg-navy-50 active:bg-navy-100 shadow-sm",
  outline:
    "border border-line bg-white text-ink-900 hover:border-navy-300 hover:bg-navy-50",
  ghostLight:
    "border border-white/30 text-white hover:bg-white/10 active:bg-white/15",
};

const SIZES = {
  sm: "h-9 px-4 text-xs gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-12 px-7 text-sm gap-2 sm:h-13 sm:px-8 sm:text-base",
};

const Button = ({
  as,
  href,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  children,
  ...rest
}) => {
  const isInternal = href?.startsWith("/");
  const Tag = as ?? (isInternal ? Link : href ? "a" : "button");

  const classes = [
    "inline-flex items-center justify-center rounded-full font-semibold",
    "transition-all duration-200 ease-soft",
    "disabled:cursor-not-allowed disabled:opacity-50",
    VARIANTS[variant] ?? VARIANTS.primary,
    SIZES[size] ?? SIZES.md,
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const hrefProp = Tag === Link ? { to: href } : { href };

  return (
    <Tag
      {...hrefProp}
      className={classes}
      {...(Tag === "button" ? { type: rest.type ?? "button" } : null)}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Button;
