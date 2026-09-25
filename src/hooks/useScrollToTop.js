import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to the top of the page on every route change, or to the
 * hash target when the URL carries one.
 *
 * A browser does this automatically on a full page load, but a
 * client-side route change (react-router) does not — without this, a
 * visitor who scrolls down on the homepage and then clicks through to
 * a product page lands in the middle of it instead of at the top.
 *
 * The hash case also covers navigating from another page straight to
 * a homepage section (e.g. a "New Arrivals" nav link pointing at
 * "/#new-arrivals" from the Shop page) — the route swap renders Home
 * first, so the target id is already in the DOM by the time this runs.
 */
const useScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
};

export default useScrollToTop;
