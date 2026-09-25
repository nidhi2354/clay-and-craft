import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import StarRating from "./StarRating";
import { formatPrice, getDiscount } from "../../data/products";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useToast } from "../../context/ToastContext";

/**
 * The single product tile. Top Picks, Best Sellers, New Arrivals, Deals
 * and the Pottery spotlight all render this, so the card markup lives
 * in exactly one place.
 *
 * @param {object}  product   A record from the products dataset.
 * @param {"default"|"clay"} tone  Warm accent for the pottery range.
 * @param {boolean} compact   Denser padding for horizontal mobile rails.
 */
const TONES = {
  default: {
    cta: "bg-gold-400 text-navy-900 hover:bg-gold-300",
    badge: "bg-gold-400 text-navy-900",
    frame: "border-line hover:border-navy-200",
    imgBg: "bg-navy-50",
  },
  clay: {
    cta: "bg-clay-600 text-white hover:bg-clay-500",
    badge: "bg-clay-600 text-white",
    frame: "border-clay-200 hover:border-clay-300",
    imgBg: "bg-clay-100",
  },
};

const ProductCard = ({ product, tone = "default", compact = false }) => {
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const { showToast } = useToast();

  const t = TONES[tone] ?? TONES.default;
  const discount = getDiscount(product);
  const href = `/product/${product.slug}`;
  const lowStock = product.stock > 0 && product.stock <= 10;
  const outOfStock = product.stock <= 0;
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addItem(product.id, 1);
    showToast(`Added "${product.name}" to cart`);
  };

  const handleToggleWishlist = () => {
    toggleItem(product.id);
    showToast(
      wishlisted ? `Removed "${product.name}" from wishlist` : `Added "${product.name}" to wishlist`,
    );
  };

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-surface transition-all duration-200 ease-soft hover:shadow-lg ${t.frame}`}
    >
      {/* Image */}
      <div className={`relative aspect-square overflow-hidden ${t.imgBg}`}>
        <Link to={href} tabIndex={-1} aria-hidden="true">
          <img
            src={product.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 ease-soft group-hover:scale-105"
          />
        </Link>

        {discount > 0 && (
          <span
            className={`absolute left-2 top-2 rounded-md px-1.5 py-0.5 text-[10px] font-bold ${t.badge}`}
          >
            {discount}% OFF
          </span>
        )}

        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={
            wishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          aria-pressed={wishlisted}
          className={`absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-white/90 shadow-sm backdrop-blur transition-colors ${
            wishlisted ? "text-danger" : "text-ink-500 hover:text-danger"
          }`}
        >
          <Heart size={14} aria-hidden="true" fill={wishlisted ? "currentColor" : "none"} />
        </button>

        {lowStock && (
          <span className="absolute bottom-2 left-2 rounded-md bg-navy-900/80 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur">
            Only {product.stock} left
          </span>
        )}
      </div>

      {/* Details */}
      <div
        className={`flex flex-1 flex-col ${compact ? "gap-1.5 p-2.5" : "gap-2 p-3"}`}
      >
        <h3 className="clamp-2 min-h-8 text-xs font-semibold leading-4 text-ink-900 sm:text-[13px] sm:leading-5">
          <Link to={href} className="transition-colors hover:text-brand-500">
            {product.name}
          </Link>
        </h3>

        {product.artisan ? (
          <p className="truncate text-[10px] font-medium text-clay-600">
            {product.artisan}
          </p>
        ) : (
          <StarRating
            value={product.rating}
            count={product.ratingCount}
            size={12}
          />
        )}

        <div className="mt-auto flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
          <span className="text-sm font-bold text-ink-900 sm:text-base">
            {formatPrice(product.price)}
          </span>

          {product.mrp > product.price && (
            <>
              <span className="text-[11px] text-ink-400 line-through">
                {formatPrice(product.mrp)}
              </span>
              <span className="text-[11px] font-semibold text-success">
                {discount}% off
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-1.5 pt-0.5">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={outOfStock}
            className={`flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg text-[11px] font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:text-xs ${t.cta}`}
          >
            <ShoppingCart size={13} aria-hidden="true" />
            {outOfStock ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
