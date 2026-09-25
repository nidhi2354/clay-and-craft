import { Link } from "react-router-dom";

/**
 * Renders a router <Link> for internal paths ("/shop", "/#new-arrivals")
 * and a plain <a> for pure hash anchors ("#top", which resolves against
 * whatever page is current — the header renders on every page, so
 * "#top" always finds its target) and external URLs (mailto:, tel:,
 * wa.me, http…).
 *
 * Centralises the internal-vs-hash check used across the nav lists so
 * every part of the site treats an href the same way — see Button and
 * MobileBottomNav for the same rule applied inline where a plain <a>
 * wouldn't fit as cleanly.
 */
const SmartLink = ({ href, children, ...rest }) => {
  const isInternal = href?.startsWith("/");
  const Tag = isInternal ? Link : "a";
  const hrefProp = isInternal ? { to: href } : { href };

  return (
    <Tag {...hrefProp} {...rest}>
      {children}
    </Tag>
  );
};

export default SmartLink;
