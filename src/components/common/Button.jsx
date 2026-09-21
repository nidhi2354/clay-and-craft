/**
 * The one button in the system. Renders as <a> when given an href,
 * otherwise as <button>, so a CTA never loses its link semantics.
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
  const Tag = as ?? (href ? "a" : "button");

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

  return (
    <Tag
      href={href}
      className={classes}
      {...(Tag === "button" ? { type: rest.type ?? "button" } : null)}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Button;
