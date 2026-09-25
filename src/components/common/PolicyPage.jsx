import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Section from "./Section";

/**
 * Shared shell for static legal/policy content (Terms, Privacy, Returns,
 * Shipping) — a breadcrumb, a heading and a list of heading/body
 * sections. Keeps the markup in one place since these pages differ only
 * in their copy.
 */
const PolicyPage = ({ title, updated = "Last updated: January 2026", sections }) => (
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
      <span className="font-medium text-ink-900">{title}</span>
    </nav>

    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-xl font-bold text-ink-900 sm:text-2xl">
        {title}
      </h1>
      <p className="mt-2 text-xs text-ink-500">{updated}</p>

      <div className="mt-6 space-y-6">
        {sections.map((section) => (
          <div key={section.heading}>
            <h2 className="text-sm font-bold text-ink-900">
              {section.heading}
            </h2>
            <p className="mt-1.5 text-sm leading-6 text-ink-600">
              {section.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

export default PolicyPage;
