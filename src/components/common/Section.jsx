/**
 * Page section wrapper — owns the max width, the horizontal gutter and
 * the vertical rhythm so no section has to repeat them. Every home-page
 * block is wrapped in this, which is what keeps the page aligned at
 * every breakpoint.
 */
const TONES = {
  canvas: "bg-canvas",
  surface: "bg-surface",
  navy: "bg-navy-800",
  clay: "bg-clay-100",
  none: "",
};

const Section = ({
  id,
  tone = "canvas",
  className = "",
  innerClassName = "",
  children,
}) => (
  <section
    id={id}
    className={`scroll-mt-28 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12 ${
      TONES[tone] ?? TONES.canvas
    } ${className}`}
  >
    <div className={`mx-auto w-full max-w-[1280px] ${innerClassName}`}>
      {children}
    </div>
  </section>
);

export default Section;
