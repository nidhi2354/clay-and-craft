import { Sparkles } from "lucide-react";
import CatalogueListing from "../components/common/CatalogueListing";
import { getNewArrivals } from "../data/products";

/** "/new-arrivals" — every product tagged "new", not just the home-page rail. */
const NewArrivals = () => (
  <CatalogueListing
    icon={Sparkles}
    title="New Arrivals"
    subtitle="Fresh styles, new choices"
    products={getNewArrivals(Infinity)}
  />
);

export default NewArrivals;
