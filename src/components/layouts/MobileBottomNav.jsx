import { Home, LayoutGrid, ShoppingCart, User } from "lucide-react";

/**
 * Fixed bottom navigation — mobile only, matching the app-style bar in
 * the client's reference. The page reserves space for it via a spacer
 * in App so the footer is never hidden behind it.
 *
 * `pb-[env(safe-area-inset-bottom)]` keeps the bar clear of the iOS
 * home indicator.
 */
const items = [
  { name: "Home", href: "#top", icon: Home, active: true },
  { name: "Shop", href: "#categories", icon: LayoutGrid },
  { name: "Cart", href: "#", icon: ShoppingCart, count: 2 },
  { name: "Me", href: "#", icon: User },
];

const MobileBottomNav = () => (
  <nav
    aria-label="Quick navigation"
    className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-2px_12px_rgba(15,23,42,0.06)] backdrop-blur lg:hidden"
  >
    <ul className="mx-auto flex max-w-md">
      {items.map(({ name, href, icon: Icon, count, active }) => (
        <li key={name} className="flex-1">
          <a
            href={href}
            aria-current={active ? "page" : undefined}
            className={`relative flex flex-col items-center gap-0.5 py-2 text-[10px] font-medium transition-colors ${
              active ? "text-navy-700" : "text-ink-500 hover:text-navy-600"
            }`}
          >
            <span className="relative">
              <Icon size={21} aria-hidden="true" strokeWidth={active ? 2.2 : 1.8} />

              {count > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute -right-2 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-gold-400 px-1 text-[9px] font-bold text-navy-900"
                >
                  {count}
                </span>
              )}
            </span>

            {name}

            {active && (
              <span
                aria-hidden="true"
                className="absolute inset-x-5 top-0 h-0.5 rounded-full bg-gold-400"
              />
            )}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

export default MobileBottomNav;
