import { Crown } from "lucide-react";
import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";
import ProductRail from "../common/ProductRail";
import { getBestSellers } from "../../data/products";

const BestSellers = () => (
  <Section id="best-sellers" tone="surface">
    <SectionHeading
      icon={Crown}
      title="Best Sellers"
      subtitle="Most loved by our customers"
      linkHref="/best-sellers"
    />

    <ProductRail products={getBestSellers(5)} cols={5} />
  </Section>
);

export default BestSellers;
