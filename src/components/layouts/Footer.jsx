import { Mail, MapPin, Phone, Send } from "lucide-react";
import Logo from "../common/Logo";
import categories from "../../data/categories";
import { footerNav, site, socialLinks } from "../../data/site";

/**
 * Site footer. Brand column, link columns, a shop-by-category list,
 * newsletter signup and the legal strip.
 *
 * All contact details come from data/site.js, so the client's phone,
 * email or address changes in exactly one file.
 */
const Footer = () => (
  <footer id="about" className="scroll-mt-28 bg-navy-900 text-white">
    <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        {/* Brand + contact */}
        <div className="lg:col-span-4">
          <Logo variant="light" />

          <p className="mt-4 max-w-sm text-sm leading-6 text-white/60">
            {site.name} brings toys, sports gear, gifts, gadgets and handmade
            pottery together in one trusted store — genuine products, honest
            prices, delivered across India.
          </p>

          <address className="mt-5 space-y-2.5 text-sm not-italic">
            <p className="flex items-start gap-2.5 text-white/70">
              <MapPin
                size={16}
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-gold-400"
              />
              <span>
                {site.address.line1}
                <br />
                {site.address.line2}
              </span>
            </p>

            <p className="flex items-center gap-2.5">
              <Phone
                size={16}
                aria-hidden="true"
                className="shrink-0 text-gold-400"
              />
              <a
                href={site.phoneHref}
                className="text-white/70 transition-colors hover:text-gold-300"
              >
                {site.phone}
              </a>
            </p>

            <p className="flex items-center gap-2.5">
              <Mail
                size={16}
                aria-hidden="true"
                className="shrink-0 text-gold-400"
              />
              <a
                href={site.emailHref}
                className="break-all text-white/70 transition-colors hover:text-gold-300"
              >
                {site.email}
              </a>
            </p>
          </address>

          <p className="mt-4 text-xs text-white/40">
            Director · {site.director}
          </p>

          {/* Social */}
          <ul className="mt-5 flex flex-wrap gap-2">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-xs font-bold uppercase text-white/70 transition-colors hover:border-gold-400 hover:bg-gold-400 hover:text-navy-900"
                >
                  <span aria-hidden="true">{social.symbol}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Link columns */}
        {footerNav.map((group) => (
          <nav
            key={group.heading}
            aria-label={group.heading}
            className="lg:col-span-2"
          >
            <h3 className="text-sm font-bold text-white">{group.heading}</h3>

            <ul className="mt-4 space-y-2.5">
              {group.links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-gold-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        {/* Categories */}
        <nav aria-label="Shop categories" className="lg:col-span-2">
          <h3 className="text-sm font-bold text-white">Categories</h3>

          <ul className="mt-4 space-y-2.5">
            {categories.slice(0, 6).map((cat) => (
              <li key={cat.id}>
                <a
                  href={cat.slug === "pottery" ? "#pottery" : "#categories"}
                  className={`text-sm transition-colors hover:text-gold-300 ${
                    cat.featured ? "font-medium text-clay-300" : "text-white/60"
                  }`}
                >
                  {cat.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Newsletter */}
        <div className="sm:col-span-2 lg:col-span-2">
          <h3 className="text-sm font-bold text-white">Stay in the loop</h3>

          <p className="mt-3 text-sm leading-6 text-white/60">
            Offers, new arrivals and pottery drops — straight to your inbox.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-4 space-y-2.5"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>

            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Enter your email"
              className="h-10 w-full rounded-lg border border-white/15 bg-white/5 px-3.5 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-gold-400"
            />

            <button
              type="submit"
              className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-gold-400 text-sm font-bold text-navy-900 transition-colors hover:bg-gold-300"
            >
              <Send size={15} aria-hidden="true" />
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Legal strip */}
      <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center sm:flex-row sm:text-left">
        <p className="text-xs text-white/45">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>

        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/45">
          {["Terms & Conditions", "Privacy Policy", "Sitemap"].map((item) => (
            <li key={item}>
              <a href="#" className="transition-colors hover:text-gold-300">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
