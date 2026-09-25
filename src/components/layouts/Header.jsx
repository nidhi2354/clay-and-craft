import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  Flame,
  Gift,
  Heart,
  LayoutGrid,
  MapPin,
  Menu,
  Mic,
  Search,
  ShoppingCart,
  Sparkles,
  User,
  X,
} from "lucide-react";
import Logo from "../common/Logo";
import SmartLink from "../common/SmartLink";
import categories from "../../data/categories";
import { mainNav, site } from "../../data/site";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

// Quick suggestions chips matching UI reference
const SUGGESTIONS = [
  { label: "Under ₹500", icon: null },
  { label: "For Gym", icon: Sparkles },
  { label: "Gift Ideas", icon: Gift },
  { label: "Trending", icon: Flame },
];

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const catRef = useRef(null);
  const navigate = useNavigate();
  const { totalItems: cartCount } = useCart();
  const { totalItems: wishlistCount } = useWishlist();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    navigate(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
    setDrawerOpen(false);
  };

  /* Close category dropdown on outside click or Escape key */
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

  /* Lock body scroll while drawer is open */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  // Search input bar with Mic icon
  const searchField = (id, className = "") => (
    <form
      role="search"
      onSubmit={handleSearchSubmit}
      className={`relative ${className}`}
    >
      <label htmlFor={id} className="sr-only">
        What are you looking for?
      </label>

      {/* Search Icon */}
      <Search
        size={17}
        aria-hidden="true"
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
      />

      {/* Input Field */}
      <input
        id={id}
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="What are you looking for?"
        className="h-10 w-full rounded-full border border-slate-700 bg-slate-900/80 pl-10 pr-20 text-xs text-white placeholder:text-gray-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 sm:text-sm"
      />

      {/* Mic Button & Search Button */}
      <div className="absolute right-1 top-1/2 flex -translate-y-1/2 items-center gap-1">
        <button
          type="button"
          aria-label="Voice Search"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400/10 text-amber-400 hover:bg-amber-400/20"
        >
          <Mic size={15} />
        </button>
        <button
          type="submit"
          aria-label="Search"
          className="flex h-8 items-center gap-1 rounded-full bg-amber-400 px-3 text-xs font-bold text-slate-950 transition-colors hover:bg-amber-300"
        >
          <Search size={13} />
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>
    </form>
  );

  const iconLink = (Icon, label, count, href = "#") => (
    <SmartLink
      href={href}
      aria-label={count ? `${label}, ${count} items` : label}
      className="relative grid h-9 w-9 place-items-center rounded-full text-gray-200 transition-colors hover:bg-white/10 hover:text-white"
    >
      <Icon size={19} aria-hidden="true" />

      {count > 0 && (
        <span
          aria-hidden="true"
          className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-amber-400 px-1 text-[9px] font-bold text-slate-950"
        >
          {count}
        </span>
      )}
    </SmartLink>
  );

  return (
    <header id="top" className="sticky top-0 z-50 bg-[#0B132B]">
      {/* ---------------- Main Top Bar ---------------- */}
      <div className="border-b border-slate-800">
        <div className="mx-auto flex h-14 max-w-[1280px] items-center gap-2 px-3 sm:h-16 sm:px-6 lg:gap-6 lg:px-8">
          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white hover:bg-white/10 lg:hidden"
          >
            <Menu size={20} />
          </button>

          {/* Logo */}
          <Logo variant="light" />

          {/* Desktop Search Bar */}
          {searchField("site-search", "hidden min-w-0 flex-1 lg:block")}

          {/* Desktop Delivery Pin */}
          <div className="hidden shrink-0 items-center gap-2 text-xs text-slate-300 xl:flex">
            <MapPin size={16} className="text-amber-400" />
            <span className="leading-tight">
              Deliver to
              <br />
              <strong className="font-semibold text-white">
                {site.address.short}
              </strong>
            </span>
          </div>

          {/* Action Icons */}
          <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
            {iconLink(Heart, "Wishlist", wishlistCount, "/wishlist")}
            {iconLink(ShoppingCart, "Shopping cart", cartCount, "/cart")}
            {iconLink(User, "Account", 0, "/account")}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="px-3 pb-2 lg:hidden">
          {searchField("site-search-mobile")}
        </div>

        {/* Suggestion Chips */}
        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto px-3 pb-3 pt-1 text-xs sm:px-6 lg:px-8">
          {SUGGESTIONS.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <button
                key={idx}
                type="button"
                className="flex shrink-0 items-center gap-1.5 rounded-md border border-slate-700/80 bg-slate-800/60 px-2.5 py-1 text-[11px] font-medium text-slate-300 transition-colors hover:border-amber-400/50 hover:bg-slate-800 hover:text-amber-400"
              >
                {IconComp && <IconComp size={12} className="text-amber-400" />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ---------------- Desktop Navigation Row ---------------- */}
      <div className="hidden border-b border-slate-800 bg-slate-900 shadow-sm lg:block">
        <div className="mx-auto flex h-11 max-w-[1280px] items-stretch gap-2 px-6 lg:px-8">
          {/* Category Dropdown */}
          <div ref={catRef} className="relative flex items-stretch">
            <button
              type="button"
              onClick={() => setCatOpen((o) => !o)}
              className="flex items-center gap-2 rounded-t-lg bg-amber-400 px-4 text-xs font-bold text-slate-950 transition-colors hover:bg-amber-300"
            >
              <LayoutGrid size={15} />
              All Categories
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${catOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            {catOpen && (
              <div
                id="category-menu"
                className="absolute left-0 top-full z-50 w-72 overflow-hidden rounded-b-xl border border-slate-700 bg-slate-900 py-1.5 shadow-xl"
              >
                {categories.map((cat) => (
                  <SmartLink
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    onClick={() => setCatOpen(false)}
                    className="group flex items-center gap-3 px-4 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800 hover:text-amber-400"
                  >
                    <img
                      src={cat.image}
                      alt=""
                      className="h-6 w-6 rounded-md object-cover"
                    />
                    <span className="flex-1 truncate">{cat.name}</span>
                    <ChevronRight size={13} className="text-slate-500" />
                  </SmartLink>
                ))}
              </div>
            )}
          </div>

          {/* Main Links */}
          <nav aria-label="Main" className="flex items-stretch gap-1">
            {mainNav.map((link) => (
              <SmartLink
                key={link.name}
                href={link.href}
                className="flex items-center border-b-2 border-transparent px-3 text-xs font-medium text-slate-300 hover:border-amber-400 hover:text-white"
              >
                {link.name}
              </SmartLink>
            ))}
          </nav>
        </div>
      </div>

      {/* ---------------- Mobile Sidebar Drawer ---------------- */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
          />

          <nav className="absolute inset-y-0 left-0 flex w-[82vw] max-w-sm flex-col bg-slate-900 text-white shadow-2xl">
            <div className="flex h-14 items-center justify-between border-b border-slate-800 px-4">
              <Logo variant="light" showTagline={false} />
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-full hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <SmartLink
                      href={`/category/${cat.slug}`}
                      onClick={() => setDrawerOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-slate-800"
                    >
                      <img
                        src={cat.image}
                        alt=""
                        className="h-7 w-7 rounded-md object-cover"
                      />
                      <span>{cat.name}</span>
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;