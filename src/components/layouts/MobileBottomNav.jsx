import { Home, LayoutGrid, ShoppingCart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";

/**
 * Fixed bottom navigation — mobile only, matching the app-style bar in
 * the client's reference. The page reserves space for it via a spacer
 * in App so the footer is never hidden behind it.
 *
 * `pb-[env(safe-area-inset-bottom)]` keeps the bar clear of the iOS
 * home indicator.
 */
const MobileBottomNav = () => {
  const { pathname } = useLocation();
  const { totalItems: cartCount } = useCart();

  const items = [
    { name: "Home", href: "/", icon: Home, active: pathname === "/" },
    { name: "Shop", href: "/shop", icon: LayoutGrid, active: pathname === "/shop" },
    {
      name: "Cart",
      href: "/cart",
      icon: ShoppingCart,
      count: cartCount,
      active: pathname === "/cart",
    },
    { name: "Me", href: "/account", icon: User, active: pathname === "/account" },
  ];

  return (
    <nav
      aria-label="Quick navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-2px_12px_rgba(15,23,42,0.06)] backdrop-blur lg:hidden"
    >
      <ul className="mx-auto flex max-w-md">
        {items.map(({ name, href, icon: Icon, count, active }) => {
          const Tag = href.startsWith("/") ? Link : "a";
          const hrefProp = Tag === Link ? { to: href } : { href };

          return (
            <li key={name} className="flex-1">
              <Tag
                {...hrefProp}
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
              </Tag>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MobileBottomNav;
