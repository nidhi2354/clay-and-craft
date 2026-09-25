/**
 * Labelled form control shared by every form on the site (Checkout,
 * the About page's contact form, …) so inputs and textareas look and
 * behave identically wherever they appear.
 *
 * @param {"input"|"textarea"} as  Element to render — pass "textarea" for a message box.
 */
const FormField = ({ label, as = "input", className = "", ...rest }) => {
  const Tag = as;
  const fieldClasses = `w-full rounded-lg border border-line bg-canvas px-3 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-navy-300 ${
    Tag === "textarea" ? "py-2" : "h-10"
  }`;

  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-medium text-ink-700">{label}</span>
      <Tag {...rest} className={fieldClasses} />
    </label>
  );
};

export default FormField;
