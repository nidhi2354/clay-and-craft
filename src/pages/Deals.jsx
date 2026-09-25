import { Zap } from "lucide-react";
import CatalogueListing from "../components/common/CatalogueListing";
import { getDeals } from "../data/products";

/** "/deals" — every product tagged "deal", not just the home-page rail. */
const Deals = () => (
  <CatalogueListing
    icon={Zap}
    title="Today's Deals"
    subtitle="Limited time offers — don't miss out!"
    products={getDeals(Infinity)}
  />
);

export default Deals;
