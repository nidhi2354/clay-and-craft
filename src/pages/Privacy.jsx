import PolicyPage from "../components/common/PolicyPage";
import { site } from "../data/site";

const SECTIONS = [
  {
    heading: "1. Information We Collect",
    body: "We collect the details you give us directly — name, email, phone, delivery address — when you place an order, create an account, or send us a message through the contact form. We also store your cart and wishlist locally in your browser so they persist between visits.",
  },
  {
    heading: "2. How We Use Your Information",
    body: "Your information is used to process orders, deliver products, respond to enquiries, and improve the site. We do not sell your personal information to third parties.",
  },
  {
    heading: "3. Cookies & Local Storage",
    body: "This site uses your browser's local storage to remember your cart, wishlist and login session on this device. No third-party tracking cookies are used.",
  },
  {
    heading: "4. Data Sharing",
    body: "We share order details only with the parties needed to fulfil it — for example, a delivery partner — and never for marketing by unrelated third parties.",
  },
  {
    heading: "5. Data Security",
    body: "We take reasonable technical measures to protect your information, but no method of storage or transmission over the internet is 100% secure.",
  },
  {
    heading: "6. Your Rights",
    body: `You can request a copy of, correction to, or deletion of your personal information at any time by writing to ${site.email}.`,
  },
  {
    heading: "7. Changes to This Policy",
    body: "We may update this policy from time to time. Continued use of the site after a change means you accept the revised policy.",
  },
  {
    heading: "8. Contact",
    body: `Questions about your privacy? Reach us at ${site.email} or ${site.phone}.`,
  },
];

/** "/privacy" — static legal content, linked from the Footer's legal strip. */
const Privacy = () => <PolicyPage title="Privacy Policy" sections={SECTIONS} />;

export default Privacy;
