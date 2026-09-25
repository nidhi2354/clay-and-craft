import { Sparkles } from "lucide-react";
import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";
import ProductRail from "../common/ProductRail";
import { getNewArrivals } from "../../data/products";

const NewArrivals = () => (
  <Section id="new-arrivals">
    <SectionHeading
      icon={Sparkles}
      title="New Arrivals"
      subtitle="Fresh styles, new choices"
      linkHref="/new-arrivals"
    />

    <ProductRail products={getNewArrivals(5)} cols={5} />
  </Section>
);

export default NewArrivals;
