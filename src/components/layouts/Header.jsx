import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Heart,
  LayoutGrid,
  MapPin,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import Logo from "../common/Logo";
import categories from "../../data/categories";
import { mainNav, site } from "../../data/site";

/**
 * Sticky site header.
 *
 * Desktop — logo, search, account/wishlist/cart actions, then a nav row
 *           with the "All Categories" mega-dropdown on the left.
 * Mobile  — a compact bar (logo + icons), a permanently visible search
 *           field, and a slide-in drawer for navigation.
 *
 * Cart and wishlist counts are hard-coded until state lands; they read
 * from one place here so wiring a store later is a single change.
 */
const CART_COUNT = 2;
const WISHLIST_COUNT = 1;

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);
  const catRef = useRef(null);

  /* Close the category dropdown on outside click or Escape. */
  useEffect(() => {
    if (!catOpen) return;

    const onClick = (e) => {
      if (catRef.current && !catRef.current.contains(e.target)) {
        setCatOpen(false);
      }
    };
    const onKey = (e) => e.key === "Escape" && setCatOpen(false);

    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [catOpen]);

  /* Lock body scroll while the mobile drawer is open. */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const searchField = (id, className = "") => (
    <form
      role="search"
      onSubmit={(e) => e.preventDefault()}
      className={`relative ${className}`}
    >
      <label htmlFor={id} className="sr-only">
        Search products
      </label>

      <Search
        size={17}
        aria-hidden="true"
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400"
      />

      <input
        id={id}
        type="search"
        placeholder="Search for toys, sports, gifts, gadgets…"
        className="h-10 w-full rounded-full border border-line bg-surface pl-10 pr-24 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-gold-400 sm:h-11"
      />

      <button
        type="submit"
        className="absolute right-1 top-1/2 flex h-8 -translate-y-1/2 items-center gap-1.5 rounded-full bg-gold-400 px-4 text-xs font-bold text-navy-900 transition-colors hover:bg-gold-300 sm:h-9"
      >
        <Search size={14} aria-hidden="true" />
        <span className="hidden sm:inline">Search</span>
      </button>
    </form>
  );

  const iconLink = (Icon, label, count, href = "#") => (
    <a
      href={href}
      aria-label={count ? `${label}, ${count} items` : label}
      className="relative grid h-10 w-10 place-items-center rounded-full text-white/85 transition-colors hover:bg-white/10 hover:text-white"
    >
      <Icon size={20} aria-hidden="true" />

      {count > 0 && (
        <span
          aria-hidden="true"
          className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-gold-400 px-1 text-[9px] font-bold text-navy-900"
        >
          {count}
        </span>
      )}
    </a>
  );

  return (
    <header id="top" className="sticky top-0 z-50">
      {/* ---------------- Main bar ---------------- */}
      <div className="bg-navy-800">
        <div className="mx-auto flex h-14 max-w-[1280px] items-center gap-3 px-4 sm:h-16 sm:px-6 lg:gap-6 lg:px-8">
          {/* Mobile menu */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            <Menu size={22} aria-hidden="true" />
          </button>

          <Logo variant="light" />

          {/* Desktop search */}
          {searchField("site-search", "hidden min-w-0 flex-1 lg:block")}

          {/* Desktop delivery pin */}
          <div className="hidden shrink-0 items-center gap-2 text-xs text-white/70 xl:flex">
            <MapPin size={16} aria-hidden="true" className="text-gold-400" />
            <span className="leading-tight">
              Deliver to
              <br />
              <strong className="font-semibold text-white">
                {site.address.short}
              </strong>
            </span>
          </div>

          {/* Actions */}
          <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1">
            <a
              href="#"
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm text-white/85 transition-colors hover:bg-white/10 hover:text-white lg:flex"
            >
              <User size={19} aria-hidden="true" />
              <span className="whitespace-nowrap font-medium">Login</span>
            </a>

            {iconLink(Heart, "Wishlist", WISHLIST_COUNT)}
            {iconLink(ShoppingCart, "Shopping cart", CART_COUNT)}
          </div>
        </div>

        {/* Mobile search — always visible */}
        <div className="px-4 pb-3 sm:px-6 lg:hidden">
          {searchField("site-search-mobile")}
        </div>
      </div>

      {/* ---------------- Desktop nav row ---------------- */}
      <div className="hidden border-b border-line bg-surface shadow-sm lg:block">
        <div className="mx-auto flex h-12 max-w-[1280px] items-stretch gap-2 px-6 lg:px-8">
          {/* All Categories dropdown */}
          <div ref={catRef} className="relative flex items-stretch">
            <button
              type="button"
              onClick={() => setCatOpen((o) => !o)}
              aria-expanded={catOpen}
              aria-controls="category-menu"
              className="flex items-center gap-2 rounded-t-lg bg-gold-400 px-4 text-sm font-bold text-navy-900 transition-colors hover:bg-gold-300"
            >
              <LayoutGrid size={17} aria-hidden="true" />
              All Categories
              <ChevronDown
                size={15}
                aria-hidden="true"
                className={`transition-transform duration-200 ${
                  catOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {catOpen && (
              <div
                id="category-menu"
                className="absolute left-0 top-full z-50 w-72 overflow-hidden rounded-b-xl border border-line bg-surface py-1.5 shadow-xl"
              >
                {categories.map((cat) => (
                  <a
                    key={cat.id}
                    href={cat.slug === "pottery" ? "#pottery" : "#categories"}
                    onClick={() => setCatOpen(false)}
                    className={`group flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                      cat.featured
                        ? "font-semibold text-clay-700 hover:bg-clay-100"
                        : "text-ink-700 hover:bg-navy-50 hover:text-navy-700"
                    }`}
                  >
                    <img
                      src={cat.image}
                      alt=""
                      loading="lazy"
                      className="h-7 w-7 shrink-0 rounded-md object-cover"
                    />
                    <span className="flex-1 truncate">{cat.name}</span>

                    {cat.featured && (
                      <span className="rounded-full bg-clay-600 px-1.5 py-0.5 text-[9px] font-bold text-white">
                        SPECIAL
                      </span>
                    )}

                    <ChevronRight
                      size={14}
                      aria-hidden="true"
                      className="shrink-0 text-ink-400 transition-transform group-hover:translate-x-0.5"
                    />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Primary nav */}
          <nav aria-label="Main" className="flex items-stretch gap-1">
            {mainNav.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`flex items-center border-b-2 px-3 text-sm font-medium transition-colors ${
                  link.highlight
                    ? "border-transparent text-clay-600 hover:border-clay-500 hover:text-clay-700"
                    : "border-transparent text-ink-700 hover:border-gold-400 hover:text-navy-700"
                }`}
              >
                {link.name}
                {link.highlight && (
                  <span className="ml-1.5 rounded-full bg-clay-100 px-1.5 py-0.5 text-[9px] font-bold uppercase text-clay-700">
                    New
                  </span>
                )}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* ---------------- Mobile drawer ---------------- */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm"
          />

          <nav
            aria-label="Mobile"
            className="absolute inset-y-0 left-0 flex w-[84vw] max-w-sm flex-col bg-surface shadow-2xl"
          >
            <div className="flex h-14 shrink-0 items-center justify-between gap-3 bg-navy-800 px-4">
              <Logo variant="light" showTagline={false} />

              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
                className="grid h-9 w-9 place-items-center rounded-full text-white transition-colors hover:bg-white/10"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain">
              {/* Account */}
              <a
                href="#"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-3 border-b border-line bg-navy-50 px-4 py-3.5 text-sm font-semibold text-navy-800"
              >
                <User size={18} aria-hidden="true" />
                Login / Sign Up
              </a>

              {/* Pages */}
              <ul className="border-b border-line py-1">
                {mainNav.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={() => setDrawerOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 text-sm font-medium ${
                        link.highlight ? "text-clay-700" : "text-ink-700"
                      }`}
                    >
                      {link.name}
                      {link.highlight && (
                        <span className="rounded-full bg-clay-100 px-2 py-0.5 text-[9px] font-bold uppercase text-clay-700">
                          Special
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Categories — expandable */}
              <p className="px-4 pb-1 pt-4 text-[11px] font-bold uppercase tracking-wider text-ink-400">
                Shop by Category
              </p>

              <ul className="pb-4">
                {categories.map((cat) => {
                  const expanded = openGroup === cat.id;

                  return (
                    <li key={cat.id} className="border-b border-line/60">
                      <button
                        type="button"
                        onClick={() => setOpenGroup(expanded ? null : cat.id)}
                        aria-expanded={expanded}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left"
                      >
                        <img
                          src={cat.image}
                          alt=""
                          loading="lazy"
                          className="h-8 w-8 shrink-0 rounded-lg object-cover"
                        />

                        <span
                          className={`flex-1 truncate text-sm ${
                            cat.featured
                              ? "font-semibold text-clay-700"
                              : "font-medium text-ink-700"
                          }`}
                        >
                          {cat.name}
                        </span>

                        <ChevronDown
                          size={16}
                          aria-hidden="true"
                          className={`shrink-0 text-ink-400 transition-transform duration-200 ${
                            expanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {expanded && (
                        <ul className="bg-canvas pb-2">
                          {cat.subcategories.map((sub) => (
                            <li key={sub}>
                              <a
                                href="#categories"
                                onClick={() => setDrawerOpen(false)}
                                className="block py-2 pl-[3.75rem] pr-4 text-[13px] text-ink-500"
                              >
                                {sub}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Drawer footer */}
            <div className="shrink-0 border-t border-line bg-canvas px-4 py-3 text-xs text-ink-500">
              <p className="flex items-center gap-2">
                <MapPin size={14} aria-hidden="true" className="text-clay-500" />
                Deliver to {site.address.short}
              </p>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
