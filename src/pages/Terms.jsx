import PolicyPage from "../components/common/PolicyPage";
import { site } from "../data/site";

const SECTIONS = [
  {
    heading: "1. Acceptance of Terms",
    body: `By accessing or using ${site.domain}, you agree to be bound by these Terms & Conditions and our Privacy Policy. If you do not agree, please do not use the site.`,
  },
  {
    heading: "2. Products & Pricing",
    body: "All products listed are subject to availability. Prices are shown in Indian Rupees (INR) and include applicable taxes unless stated otherwise. We reserve the right to correct pricing errors at any time before an order is confirmed.",
  },
  {
    heading: "3. Orders & Payment",
    body: "An order is confirmed once payment is received or, for Cash on Delivery, once it is placed. We reserve the right to cancel any order suspected of fraud or error.",
  },
  {
    heading: "4. Shipping & Delivery",
    body: `Orders above ₹${site.freeShippingAbove} ship free; a flat shipping fee applies below that threshold. Delivery timelines are estimates and may vary by location.`,
  },
  {
    heading: "5. Returns & Refunds",
    body: "Most items are eligible for return within 7 days of delivery, provided they are unused and in original packaging. Handmade pottery may show natural variation in shape, glaze and colour, and this is not grounds for return on its own.",
  },
  {
    heading: "6. Limitation of Liability",
    body: `${site.name} is not liable for indirect or consequential loss arising from the use of this site or its products, to the extent permitted by law.`,
  },
  {
    heading: "7. Governing Law",
    body: `These terms are governed by the laws of India, and any disputes are subject to the jurisdiction of the courts nearest to ${site.address.short}.`,
  },
  {
    heading: "8. Contact",
    body: `Questions about these terms? Reach us at ${site.email} or ${site.phone}.`,
  },
];

/** "/terms" — static legal content, linked from the Footer's legal strip. */
const Terms = () => <PolicyPage title="Terms & Conditions" sections={SECTIONS} />;

export default Terms;
