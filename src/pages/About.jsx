import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Headset,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import Section from "../components/common/Section";
import Button from "../components/common/Button";
import FormField from "../components/common/FormField";
import { site } from "../data/site";
import { trustBadges } from "../data/content";
import * as contactService from "../services/contactService";
import { useToast } from "../context/ToastContext";

const ICONS = {
  truck: Truck,
  shield: ShieldCheck,
  refresh: RefreshCw,
  badge: BadgeCheck,
  headset: Headset,
};

const EMPTY_FORM = { name: "", email: "", phone: "", message: "" };

const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  `${site.address.line1}, ${site.address.line2}`,
)}&output=embed`;

/**
 * "/about" — brand story, the pottery studio, why-shop-with-us and a
 * real contact form + map. Doubles as the "Contact Us" destination
 * (footerNav points its Contact Us link here too), so it's built to
 * answer both "who are you" and "how do I reach you".
 */
const About = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [isSending, setIsSending] = useState(false);
  const { showToast } = useToast();

  const updateField = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    await contactService.submitInquiry(form);

    setIsSending(false);
    setForm(EMPTY_FORM);
    showToast("Message sent — we'll get back to you soon");
  };

  return (
    <>
      {/* Hero */}
      <Section tone="canvas" className="pt-6 sm:pt-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-navy-500">
            About Us
          </p>
          <h1 className="font-display text-2xl font-bold leading-tight text-ink-900 sm:text-3xl lg:text-4xl">
            Genuine products, honest prices, and a pottery studio we're
            proud of
          </h1>
          <p className="mt-4 text-sm leading-7 text-ink-500 sm:text-base">
            {site.name} is a {site.address.short.split(",")[0]}-based online
            store bringing toys, sports gear, gifts, watches, fashion,
            electronics and more to homes across India — alongside a
            flagship range of handmade pottery, shaped and glazed in our
            own studio.
          </p>
        </div>
      </Section>

      {/* Our Story */}
      <Section tone="surface">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <h2 className="font-display text-xl font-bold text-ink-900 sm:text-2xl">
              Our Story
            </h2>
            <p className="mt-4 text-sm leading-7 text-ink-600 sm:text-base">
              {site.name} started with a simple idea: shopping online
              shouldn't mean guessing whether a product is genuine, or
              whether it'll actually turn up. We check every listing
              before it reaches the catalogue, and we ship fast — most
              orders leave within a day.
            </p>
            <p className="mt-4 text-sm leading-7 text-ink-600 sm:text-base">
              Today that means ten categories under one roof, from toys
              and sports gear to electronics and home decor — plus a
              range no one else carries: pottery thrown and glazed by
              hand, right here in {site.address.short.split(",")[0]}.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80"
                alt="One of the genuine, checked products we ship"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Pottery studio */}
      <Section tone="clay">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:order-2 lg:col-span-5">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=80"
                alt="A potter shaping a clay vessel on the wheel"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="lg:order-1 lg:col-span-7">
            <h2 className="font-display text-xl font-bold text-clay-800 sm:text-2xl">
              The Pottery Studio
            </h2>
            <p className="mt-4 text-sm leading-7 text-clay-700/85 sm:text-base">
              Every vase, planter, mug and plate in our Handmade Pottery
              range is wheel-thrown and glazed by hand in our own studio
              — small marks, slight variations, no two pieces ever quite
              the same. It's the one part of the store where the maker's
              hand is still visible in the finished piece.
            </p>
            <Button href="/category/pottery" variant="clay" size="md" className="mt-5">
              Explore the Collection
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Section>

      {/* Why shop with us */}
      <Section tone="canvas">
        <h2 className="mb-6 text-center font-display text-xl font-bold text-ink-900 sm:text-2xl">
          Why Shop With Us
        </h2>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {trustBadges.map((badge) => {
            const Icon = ICONS[badge.icon] ?? BadgeCheck;

            return (
              <li
                key={badge.id}
                className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-surface p-5 text-center transition-colors hover:border-gold-300"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold-100 text-gold-700">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <p className="text-sm font-bold text-ink-900">{badge.title}</p>
                <p className="text-xs text-ink-500">{badge.description}</p>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Visit + contact */}
      <Section tone="surface" id="contact">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Address + map */}
          <div>
            <h2 className="font-display text-xl font-bold text-ink-900 sm:text-2xl">
              Visit or Reach Us
            </h2>

            <div className="mt-4 space-y-3 text-sm text-ink-700">
              <p className="flex items-start gap-2.5">
                <MapPin size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-gold-600" />
                {site.address.line1}, {site.address.line2}
              </p>

              <a
                href={site.phoneHref}
                className="flex items-center gap-2.5 transition-colors hover:text-navy-700"
              >
                <Phone size={16} aria-hidden="true" className="shrink-0 text-gold-600" />
                {site.phone}
              </a>

              <a
                href={site.emailHref}
                className="flex items-center gap-2.5 break-all transition-colors hover:text-navy-700"
              >
                <Mail size={16} aria-hidden="true" className="shrink-0 text-gold-600" />
                {site.email}
              </a>
            </div>

            <Button href={site.whatsappHref} variant="outline" size="md" className="mt-4">
              Chat on WhatsApp
            </Button>

            <div className="mt-5 overflow-hidden rounded-2xl border border-line">
              <iframe
                title="Store location"
                src={mapEmbedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-64 w-full"
              />
            </div>
          </div>

          {/* Contact form */}
          <div className="rounded-2xl border border-line bg-surface p-4 sm:p-5">
            <h2 className="text-sm font-bold text-ink-900">Send Us a Message</h2>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
              <FormField
                label="Full Name"
                value={form.name}
                onChange={updateField("name")}
                required
              />
              <FormField
                label="Email"
                type="email"
                value={form.email}
                onChange={updateField("email")}
                required
              />
              <FormField
                label="Phone (optional)"
                type="tel"
                value={form.phone}
                onChange={updateField("phone")}
              />
              <FormField
                label="Message"
                as="textarea"
                rows={4}
                value={form.message}
                onChange={updateField("message")}
                required
              />

              <Button
                type="submit"
                variant="primary"
                size="md"
                fullWidth
                disabled={isSending}
              >
                {isSending ? "Sending…" : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </Section>
    </>
  );
};

export default About;
