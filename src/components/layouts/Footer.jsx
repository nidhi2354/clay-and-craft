import { Mail, MapPin, Phone, Send } from "lucide-react";
import Logo from "../common/Logo";
import SmartLink from "../common/SmartLink";
import categories from "../../data/categories";
import { footerNav, site, socialLinks } from "../../data/site";

const LEGAL_LINKS = [
  { name: "Terms & Conditions", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Sitemap", href: "/sitemap" },
];

const Footer = () => (
  <footer id="about" className="scroll-mt-28 bg-navy-900 text-white">
    <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 sm:py-9 lg:px-8 lg:py-10">
      <div className="grid gap-7 lg:grid-cols-12 lg:gap-8">
        {/* Brand + contact */}
        <div className="lg:col-span-4">
          <Logo variant="light" />

          <p className="mt-3 max-w-sm text-sm leading-6 text-white/60">
            Toys, sports gear, gifts, gadgets and handmade pottery — genuine
            products at honest prices, delivered across India.
          </p>

          <address className="mt-4 space-y-2 text-sm not-italic">
            <p className="flex items-start gap-2.5 text-white/70">
              <MapPin
                size={15}
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-gold-400"
              />
              <span>
                {site.address.line1}, {site.address.line2}
              </span>
            </p>

            <p className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <a
                href={site.phoneHref}
                className="flex items-center gap-2 text-white/70 transition-colors hover:text-gold-300"
              >
                <Phone
                  size={15}
                  aria-hidden="true"
                  className="shrink-0 text-gold-400"
                />
                {site.phone}
              </a>

              <a
                href={site.emailHref}
                className="flex items-center gap-2 break-all text-white/70 transition-colors hover:text-gold-300"
              >
                <Mail
                  size={15}
                  aria-hidden="true"
                  className="shrink-0 text-gold-400"
                />
                {site.email}
              </a>
            </p>
          </address>

          {/* Social */}
          <ul className="mt-4 flex flex-wrap gap-2">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  className="grid h-8 w-8 place-items-center rounded-full border border-white/15 text-xs font-bold uppercase text-white/70 transition-colors hover:border-gold-400 hover:bg-gold-400 hover:text-navy-900"
                >
                  <span aria-hidden="true">{social.symbol}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Link columns — 3-up on mobile, part of the 12-col grid on desktop */}
        <div className="grid grid-cols-3 gap-4 lg:contents">
          {footerNav.map((group) => (
            <nav
              key={group.heading}
              aria-label={group.heading}
              className="lg:col-span-2"
            >
              <h3 className="text-sm font-bold text-white">{group.heading}</h3>

              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <SmartLink
                      href={link.href}
                      className="text-[13px] text-white/60 transition-colors hover:text-gold-300 sm:text-sm"
                    >
                      {link.name}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Categories */}
          <nav aria-label="Shop categories" className="lg:col-span-2">
            <h3 className="text-sm font-bold text-white">Categories</h3>

            <ul className="mt-3 space-y-2">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <SmartLink
                    href={`/category/${cat.slug}`}
                    className={`text-[13px] transition-colors hover:text-gold-300 sm:text-sm ${cat.featured ? "font-medium text-clay-300" : "text-white/60"
                      }`}
                  >
                    {cat.name}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Newsletter */}
        <div className="lg:col-span-2">
          <h3 className="text-sm font-bold text-white">Stay in the loop</h3>

          <p className="mt-2 text-sm leading-6 text-white/60">
            Offers and new arrivals, straight to your inbox.
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="mt-3 flex gap-2">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>

            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Your email"
              className="h-10 min-w-0 flex-1 rounded-lg border border-white/15 bg-white/5 px-3.5 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-gold-400"
            />

            <button
              type="submit"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gold-400 text-navy-900 transition-colors hover:bg-gold-300"
            >
              <Send size={15} aria-hidden="true" />
              <span className="sr-only">Subscribe</span>
            </button>
          </form>
        </div>
      </div>

      {/* Legal strip */}
      <div className="mt-7 flex flex-col items-center justify-between gap-2.5 border-t border-white/10 pt-5 text-center sm:flex-row sm:text-left">
        <p className="text-xs text-white/45">
          © {new Date().getFullYear()} {site.name}. All rights reserved. ·
          Director {site.director}
        </p>

        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/45">
          {LEGAL_LINKS.map((item) => (
            <li key={item.href}>
              <SmartLink href={item.href} className="transition-colors hover:text-gold-300">
                {item.name}
              </SmartLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
