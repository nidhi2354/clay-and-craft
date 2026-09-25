import { Crown } from "lucide-react";
import CatalogueListing from "../components/common/CatalogueListing";
import { getBestSellers } from "../data/products";

/** "/best-sellers" — every product tagged "best-seller", not just the home-page rail. */
const BestSellers = () => (
  <CatalogueListing
    icon={Crown}
    title="Best Sellers"
    subtitle="Most loved by our customers"
    products={getBestSellers(Infinity)}
  />
);

export default BestSellers;
