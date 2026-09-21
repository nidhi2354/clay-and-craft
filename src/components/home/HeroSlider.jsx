import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "../../data/content";

/**
 * Auto-advancing hero carousel.
 *
 * Autoplay pauses on hover and on keyboard focus, and is skipped
 * entirely for visitors who ask for reduced motion — an advert that
 * moves on its own is the first thing to disable for them.
 */
const THEMES = {
  navy: "from-navy-900/95 via-navy-800/85 to-navy-700/40",
  clay: "from-clay-800/95 via-clay-700/85 to-clay-600/40",
  indigo: "from-navy-950/95 via-navy-900/85 to-brand-600/40",
};

const AUTOPLAY_MS = 5500;

const HeroSlider = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = heroSlides.length;
  const touchStartX = useRef(null);

  const go = useCallback((n) => setIndex(((n % count) + count) % count), [count]);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [next, paused, index]);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) (delta < 0 ? next : prev)();
    touchStartX.current = null;
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured offers"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="bg-canvas px-4 pt-4 sm:px-6 lg:px-8 lg:pt-6"
    >
      <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-2xl">
        <div className="relative aspect-[16/11] sm:aspect-[21/9] lg:aspect-[64/21]">
          {heroSlides.map((slide, i) => (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== index}
              className={`absolute inset-0 transition-opacity duration-700 ease-soft ${
                i === index
                  ? "opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
            >
              <img
                src={slide.image}
                alt=""
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                decoding="async"
                className="h-full w-full object-cover"
              />

              <div
                className={`absolute inset-0 bg-gradient-to-r ${
                  THEMES[slide.theme] ?? THEMES.navy
                }`}
              />

              {/* Copy */}
              <div className="absolute inset-0 flex items-center">
                <div className="w-full max-w-xl px-5 py-6 sm:px-9 lg:px-14">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-300 sm:mb-3 sm:text-xs">
                    {slide.eyebrow}
                  </p>

                  <h2 className="font-display text-2xl font-bold leading-[1.1] text-white sm:text-4xl lg:text-5xl">
                    {slide.title}
                    <span className="block text-gold-400">
                      {slide.titleAccent}
                    </span>
                  </h2>

                  <p className="mt-2.5 hidden max-w-md text-sm leading-6 text-white/75 sm:block">
                    {slide.description}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-3 sm:mt-6">
                    <span className="rounded-lg bg-gold-400 px-3 py-1.5 text-xs font-bold text-navy-900 sm:px-4 sm:py-2 sm:text-sm">
                      {slide.offer}
                    </span>

                    <a
                      href={slide.cta.href}
                      className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-navy-900 transition-colors hover:bg-gold-300 sm:px-6 sm:py-2.5 sm:text-sm"
                    >
                      {slide.cta.label}
                      <ArrowRight
                        size={15}
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows — pointer devices only */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-navy-800 shadow-md backdrop-blur transition-colors hover:bg-white sm:grid lg:left-4 lg:h-10 lg:w-10"
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="absolute right-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-navy-800 shadow-md backdrop-blur transition-colors hover:bg-white sm:grid lg:right-4 lg:h-10 lg:w-10"
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>

        {/* Dots */}
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2 lg:bottom-5">
          {heroSlides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-6 bg-gold-400"
                  : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
