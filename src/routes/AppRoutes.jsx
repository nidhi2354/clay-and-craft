import { Route, Routes } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import ProductListing from "../pages/ProductListing";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import NewArrivals from "../pages/NewArrivals";
import BestSellers from "../pages/BestSellers";
import Deals from "../pages/Deals";
import Checkout from "../pages/Checkout";
import OrderConfirmation from "../pages/OrderConfirmation";
import About from "../pages/About";
import Account from "../pages/Account";
import Search from "../pages/Search";
import Terms from "../pages/Terms";
import Privacy from "../pages/Privacy";
import Sitemap from "../pages/Sitemap";
import TrackOrder from "../pages/TrackOrder";
import Returns from "../pages/Returns";
import Shipping from "../pages/Shipping";
import Faq from "../pages/Faq";
import NotFound from "../pages/NotFound";


const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="product/:slug" element={<ProductDetail />} />
      <Route path="shop" element={<ProductListing />} />
      <Route path="category/:slug" element={<ProductListing />} />
      <Route path="cart" element={<Cart />} />
      <Route path="wishlist" element={<Wishlist />} />
      <Route path="new-arrivals" element={<NewArrivals />} />
      <Route path="best-sellers" element={<BestSellers />} />
      <Route path="deals" element={<Deals />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="order-confirmation/:orderId" element={<OrderConfirmation />} />
      <Route path="about" element={<About />} />
      <Route path="account" element={<Account />} />
      <Route path="search" element={<Search />} />
      <Route path="terms" element={<Terms />} />
      <Route path="privacy" element={<Privacy />} />
      <Route path="sitemap" element={<Sitemap />} />
      <Route path="track-order" element={<TrackOrder />} />
      <Route path="returns" element={<Returns />} />
      <Route path="shipping" element={<Shipping />} />
      <Route path="faq" element={<Faq />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default AppRoutes;
