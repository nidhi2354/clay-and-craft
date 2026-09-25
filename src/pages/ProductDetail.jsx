import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronRight,
  Heart,
  Minus,
  Plus,
  RefreshCw,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";
import Section from "../components/common/Section";
import StarRating from "../components/common/StarRating";
import ProductRail from "../components/common/ProductRail";
import Button from "../components/common/Button";
import NotFound from "./NotFound";
import {
  formatPrice,
  getDiscount,
  getProductBySlug,
  getRelatedProducts,
} from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";


const ProductDetail = () => {
  const { slug } = useParams();
  const product = getProductBySlug(slug);

  return product ? <ProductDetailView product={product} /> : <NotFound />;
};

const ProductDetailView = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem, isInCart } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const { showToast } = useToast();

  const discount = getDiscount(product);
  const related = getRelatedProducts(product, 5);
  const isPottery = Boolean(product.artisan);
  const wishlisted = isWishlisted(product.id);
  const outOfStock = product.stock <= 0;
  const lowStock = !outOfStock && product.stock <= 10;

  const decreaseQty = () => setQuantity((q) => Math.max(1, q - 1));
  const increaseQty = () => setQuantity((q) => Math.min(product.stock, q + 1));

  const handleAddToCart = () => {
    addItem(product.id, quantity);
    showToast(
      quantity > 1
        ? `Added ${quantity} × "${product.name}" to cart`
        : `Added "${product.name}" to cart`,
    );
  };

  const handleToggleWishlist = () => {
    toggleItem(product.id);
    showToast(
      wishlisted ? `Removed "${product.name}" from wishlist` : `Added "${product.name}" to wishlist`,
    );
  };

  return (
    <>
      <Section tone="canvas">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex items-center gap-1.5 text-xs text-ink-500"
        >
          <Link to="/" className="shrink-0 hover:text-navy-700">
            Home
          </Link>
          <ChevronRight size={13} aria-hidden="true" className="shrink-0" />
          <span className="truncate">{product.category}</span>
          <ChevronRight size={13} aria-hidden="true" className="shrink-0" />
          <span className="truncate font-medium text-ink-900">
            {product.name}
          </span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Image */}
          <div
            className={`overflow-hidden rounded-2xl ${isPottery ? "bg-clay-100" : "bg-navy-50"
              }`}
          >
            <img
              src={product.image}
              alt={product.name}
              className="aspect-square w-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">
                {product.category}
              </p>
              <h1 className="mt-1 font-display text-xl font-bold leading-tight text-ink-900 sm:text-2xl lg:text-3xl">
                {product.name}
              </h1>
            </div>

            {isPottery ? (
              <p className="text-sm font-medium text-clay-600">
                {product.artisan}
              </p>
            ) : (
              <StarRating
                value={product.rating}
                count={product.ratingCount}
                size={16}
              />
            )}

            <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
              <span className="text-2xl font-bold text-ink-900 sm:text-3xl">
                {formatPrice(product.price)}
              </span>

              {product.mrp > product.price && (
                <>
                  <span className="text-base text-ink-400 line-through">
                    {formatPrice(product.mrp)}
                  </span>
                  <span className="text-sm font-semibold text-success">
                    {discount}% off
                  </span>
                </>
              )}
            </div>

            <p className="text-sm leading-6 text-ink-500">
              {product.description}
            </p>

            <p
              className={`text-xs font-semibold ${outOfStock
                ? "text-danger"
                : lowStock
                  ? "text-clay-600"
                  : "text-success"
                }`}
            >
              {outOfStock
                ? "Out of stock"
                : lowStock
                  ? `Only ${product.stock} left in stock`
                  : "In stock"}
            </p>

            {/* Quantity + actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center rounded-full border border-line">
                <button
                  type="button"
                  onClick={decreaseQty}
                  disabled={outOfStock || quantity <= 1}
                  aria-label="Decrease quantity"
                  className="grid h-11 w-11 place-items-center text-ink-700 transition-colors hover:text-navy-700 disabled:opacity-40"
                >
                  <Minus size={15} aria-hidden="true" />
                </button>

                <span className="w-8 text-center text-sm font-bold tabular-nums">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQty}
                  disabled={outOfStock || quantity >= product.stock}
                  aria-label="Increase quantity"
                  className="grid h-11 w-11 place-items-center text-ink-700 transition-colors hover:text-navy-700 disabled:opacity-40"
                >
                  <Plus size={15} aria-hidden="true" />
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={outOfStock}
                variant={isPottery ? "clay" : "primary"}
                size="lg"
                className="flex-1 sm:flex-none"
              >
                <ShoppingCart size={17} aria-hidden="true" />
                {outOfStock
                  ? "Out of Stock"
                  : isInCart(product.id)
                    ? "Add More to Cart"
                    : "Add to Cart"}
              </Button>

              <button
                type="button"
                onClick={handleToggleWishlist}
                aria-label={
                  wishlisted
                    ? `Remove ${product.name} from wishlist`
                    : `Add ${product.name} to wishlist`
                }
                aria-pressed={wishlisted}
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border transition-colors ${wishlisted
                  ? "border-danger/40 bg-danger/5 text-danger"
                  : "border-line text-ink-500 hover:border-danger/40 hover:text-danger"
                  }`}
              >
                <Heart
                  size={19}
                  aria-hidden="true"
                  fill={wishlisted ? "currentColor" : "none"}
                />
              </button>
            </div>

            {/* Trust strip */}
            <ul className="mt-2 grid grid-cols-1 gap-2.5 border-t border-line pt-4 sm:grid-cols-3">
              <li className="flex items-center gap-2 text-xs text-ink-500">
                <Truck size={15} aria-hidden="true" className="shrink-0 text-gold-600" />
                Fast delivery across India
              </li>
              <li className="flex items-center gap-2 text-xs text-ink-500">
                <ShieldCheck size={15} aria-hidden="true" className="shrink-0 text-gold-600" />
                Secure payments
              </li>
              <li className="flex items-center gap-2 text-xs text-ink-500">
                <RefreshCw size={15} aria-hidden="true" className="shrink-0 text-gold-600" />
                7-day easy returns
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Related products */}
      <Section tone="surface">
        <h2 className="mb-5 font-display text-lg font-bold text-ink-900 sm:text-xl">
          You may also like
        </h2>
        <ProductRail products={related} cols={5} tone={isPottery ? "clay" : "default"} />
      </Section>
    </>
  );
};

export default ProductDetail;
