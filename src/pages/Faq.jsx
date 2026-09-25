import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight, HelpCircle } from "lucide-react";
import Section from "../components/common/Section";
import Button from "../components/common/Button";
import { site } from "../data/site";

const FAQS = [
  {
    question: "How do I track my order?",
    answer:
      "Go to the Track Order page and enter the order ID from your confirmation page or email. It'll show you the order's current status.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Cash on Delivery is available on every order today. Online payment (UPI/Card) is coming soon.",
  },
  {
    question: "What's your return policy?",
    answer:
      "Most items can be returned within 7 days of delivery if unused and in original packaging. See the Returns & Refunds page for the full policy, including the pottery-specific note on natural variation.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Metro cities: 2–4 business days. Other locations: 4–7 business days. Full details are on the Shipping Policy page.",
  },
  {
    question: "Is Cash on Delivery available everywhere?",
    answer:
      "COD is available on most serviceable pincodes across India. Availability is confirmed automatically at checkout.",
  },
  {
    question: "Are the pottery pieces really handmade?",
    answer:
      "Yes — every piece in the Handmade Pottery range is wheel-thrown and glazed by hand in our Mokama studio, so no two pieces are ever quite identical.",
  },
  {
    question: "How do I create an account?",
    answer:
      "Tap the account icon in the header, or go to the Account page, and switch to the Sign Up tab.",
  },
  {
    question: "Can I change or cancel my order after placing it?",
    answer:
      `Orders are processed quickly, so reach out to us as soon as possible at ${site.email} or ${site.phone} and we'll do our best to help before it ships.`,
  },
];

const FaqItem = ({ faq, isOpen, onToggle }) => (
  <div className="border-b border-line">
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      className="flex w-full items-center justify-between gap-4 py-4 text-left"
    >
      <span className="text-sm font-semibold text-ink-900">{faq.question}</span>
      <ChevronDown
        size={17}
        aria-hidden="true"
        className={`shrink-0 text-ink-400 transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>

    {isOpen && (
      <p className="pb-4 text-sm leading-6 text-ink-600">{faq.answer}</p>
    )}
  </div>
);

/**
 * "/faq" — also where the Footer's "Help Centre" link lands, since the
 * two overlap almost entirely: answers to common questions, plus a way
 * to reach a real person for anything else.
 */
const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Section tone="canvas">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-4 flex items-center gap-1.5 text-xs text-ink-500"
      >
        <Link to="/" className="hover:text-navy-700">
          Home
        </Link>
        <ChevronRight size={13} aria-hidden="true" />
        <span className="font-medium text-ink-900">FAQ</span>
      </nav>

      <div className="mx-auto max-w-2xl">
        <div className="flex flex-col items-center gap-2 pb-6 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-navy-50 text-navy-500">
            <HelpCircle size={26} aria-hidden="true" />
          </span>
          <h1 className="font-display text-xl font-bold text-ink-900 sm:text-2xl">
            Frequently Asked Questions
          </h1>
          <p className="max-w-sm text-sm text-ink-500">
            Answers to the questions we get asked the most.
          </p>
        </div>

        <div className="rounded-2xl border border-line bg-surface px-4 sm:px-5">
          {FAQS.map((faq, index) => (
            <FaqItem
              key={faq.question}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-line py-6 text-center">
          <p className="text-sm text-ink-600">
            Still need help? Our team is happy to answer directly.
          </p>
          <Button href="/about#contact" variant="outline" size="md">
            Contact Us
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default Faq;
