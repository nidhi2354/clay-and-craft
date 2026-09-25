import { Flame } from "lucide-react";
import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";
import ProductRail from "../common/ProductRail";
import { getTopPicks } from "../../data/products";

/** Handpicked row directly under the category strip — the store's shop window. */
const TopPicks = () => (
  <Section id="top-picks">
    <SectionHeading
      icon={Flame}
      title="Today's Top Picks"
      subtitle="Handpicked just for you"
      linkHref="/shop"
    />

    <ProductRail products={getTopPicks(5)} cols={5} />
  </Section>
);

export default TopPicks;
