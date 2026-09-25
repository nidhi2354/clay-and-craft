import { Outlet } from "react-router-dom";
import TopBar from "./components/layouts/TopBar";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import MobileBottomNav from "./components/layouts/MobileBottomNav";
import useScrollToTop from "./hooks/useScrollToTop";

/**
 * App shell — the layout every route renders inside. TopBar, Header,
 * Footer and the mobile nav are the same on every page; only the
 * <Outlet/> body changes as the route changes. See routes/AppRoutes.jsx
 * for the route list.
 */
const App = () => {
  useScrollToTop();

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-canvas">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-gold-400 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-navy-900"
      >
        Skip to content
      </a>

      <TopBar />
      <Header />

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <Footer />

      {/* Clears the fixed mobile bar so the footer is never hidden behind it */}
      <div aria-hidden="true" className="h-14 lg:hidden" />
      <MobileBottomNav />
    </div>
  );
};

export default App;
