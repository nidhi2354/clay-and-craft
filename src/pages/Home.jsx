import HeroSlider from "../components/home/HeroSlider";
import CategoryGrid from "../components/home/CategoryGrid";
import TopPicks from "../components/home/TopPicks";
import PromoBanners from "../components/home/PromoBanners";
import BestSellers from "../components/home/BestSellers";
import DealsSection from "../components/home/DealsSection";
import PotterySpotlight from "../components/home/PotterySpotlight";
import NewArrivals from "../components/home/NewArrivals";
import SpecialCollection from "../components/home/SpecialCollection";
import TrustBadges from "../components/home/TrustBadges";
import Reviews from "../components/home/Reviews";

/**
 * Home page composition.
 *
 * Section order is deliberate: browse (categories) → buy (top picks)
 * → explore (promos) → urgency (deals) → the pottery story, which
 * lands right after the loudest block so the change of pace registers
 * → then the long tail and social proof.
 */
const Home = () => (
  <>
    <HeroSlider />
    <CategoryGrid />
    <TopPicks />
    <PromoBanners />
    <BestSellers />
    <DealsSection />
    <PotterySpotlight />
    <NewArrivals />
    <SpecialCollection />
    <TrustBadges />
    <Reviews />
  </>
);

export default Home;
