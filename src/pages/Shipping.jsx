import PolicyPage from "../components/common/PolicyPage";
import { site } from "../data/site";

const SECTIONS = [
  {
    heading: "1. Delivery Areas",
    body: "We currently deliver across India, to both serviceable pincodes in metro cities and most towns. Delivery availability and timelines are confirmed at checkout based on your pincode.",
  },
  {
    heading: "2. Shipping Charges",
    body: `Orders above ₹${site.freeShippingAbove} ship free. Orders below that ship for a flat ₹49, added at checkout.`,
  },
  {
    heading: "3. Processing Time",
    body: "Most orders are packed and handed to our delivery partner within 24 hours of being placed, excluding Sundays and public holidays.",
  },
  {
    heading: "4. Delivery Timelines",
    body: "Metro cities typically receive orders within 2–4 business days; other locations within 4–7 business days. Handmade pottery is packed with extra padding and may take a day longer to ship safely.",
  },
  {
    heading: "5. Order Tracking",
    body: "Once your order ships, you can check its status any time from the Track Order page using the order ID from your confirmation.",
  },
  {
    heading: "6. Delays",
    body: `Weather, regional holidays or courier disruptions can occasionally delay delivery beyond the estimate. If your order is significantly delayed, reach out to us at ${site.email} and we'll look into it.`,
  },
];

/** "/shipping" — static policy content, linked from the Footer's Customer Service group. */
const Shipping = () => <PolicyPage title="Shipping Policy" sections={SECTIONS} />;

export default Shipping;
