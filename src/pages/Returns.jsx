import PolicyPage from "../components/common/PolicyPage";
import { site } from "../data/site";

const SECTIONS = [
  {
    heading: "1. Return Window",
    body: "Most items can be returned within 7 days of delivery, provided they're unused, undamaged and in their original packaging with all tags and accessories.",
  },
  {
    heading: "2. Handmade Pottery",
    body: "Every piece in our Handmade Pottery range is wheel-thrown and glazed by hand — small marks, slight variations in shape and glaze are part of the craft, not a defect, and aren't grounds for return on their own. Pottery is still eligible for return if it arrives damaged or cracked.",
  },
  {
    heading: "3. How to Start a Return",
    body: `Write to us at ${site.email} or ${site.phone} with your order ID and the reason for return. We'll share pickup or drop-off instructions within 24 hours.`,
  },
  {
    heading: "4. Refunds",
    body: "Once the returned item is received and inspected, refunds are processed within 5–7 business days to the original payment method. Cash on Delivery orders are refunded via bank transfer or UPI.",
  },
  {
    heading: "5. Non-Returnable Items",
    body: "For hygiene reasons, innerwear, personal care items and any product marked \"non-returnable\" on its product page cannot be returned unless received damaged or defective.",
  },
  {
    heading: "6. Damaged or Wrong Item",
    body: "If an item arrives damaged, defective or different from what you ordered, contact us within 48 hours of delivery with photos — we'll arrange a free replacement or full refund, no return shipping cost to you.",
  },
];

/** "/returns" — static policy content, linked from the Footer's Customer Service group. */
const Returns = () => <PolicyPage title="Returns & Refunds" sections={SECTIONS} />;

export default Returns;
