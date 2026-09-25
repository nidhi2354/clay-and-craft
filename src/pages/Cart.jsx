import { Link } from "react-router-dom";
import { ChevronRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Section from "../components/common/Section";
import Button from "../components/common/Button";
import { formatPrice } from "../data/products";
import { site } from "../data/site";
import { useCart } from "../context/CartContext";

/**
 * "/cart" — reads entirely off CartContext, so it needs no data
 * fetching of its own. Quantity changes and removals go straight
 * through updateQuantity/removeItem, same as the quantity stepper on
 * the product detail page.
 */
const Cart = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } =
    useCart();

  if (items.length === 0) {
    return (
      <Section tone="canvas" className="min-h-[60vh]">
        <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-navy-50 text-navy-400">
            <ShoppingBag size={28} aria-hidden="true" />
          </span>

          <h1 className="text-xl font-bold text-ink-900 sm:text-2xl">
            Your cart is empty
          </h1>

          <p className="max-w-sm text-sm text-ink-500">
            Looks like you haven't added anything yet. Start exploring and
            find something you'll love.
          </p>

          <Button href="/shop" variant="primary" size="md" className="mt-2">
            Start Shopping
          </Button>
        </div>
      </Section>
    );
  }

  const amountToFreeShipping = Math.max(0, site.freeShippingAbove - totalPrice);

  return (
    <Section tone="canvas">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-4 flex items-center gap-1.5 text-xs text-ink-500"
      >
        <Link to="/" className="hover:text-navy-700">
          Home
        </Link>
        <ChevronRight size={13} aria-hidden="true" />
        <span className="font-medium text-ink-900">Cart</span>
      </nav>

      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-xl font-bold text-ink-900 sm:text-2xl">
          Shopping Cart
        </h1>

        <button
          type="button"
          onClick={clearCart}
          className="text-xs font-semibold text-ink-500 transition-colors hover:text-danger"
        >
          Clear cart
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start lg:gap-8">
        {/* Line items */}
        <ul className="space-y-3">
          {items.map(({ product, quantity }) => {
            const lineTotal = product.price * quantity;

            return (
              <li
                key={product.id}
                className="flex gap-3 rounded-2xl border border-line bg-surface p-3 sm:gap-4 sm:p-4"
              >
                <Link
                  to={`/product/${product.slug}`}
                  className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-navy-50 sm:h-24 sm:w-24"
                >
                  <img
                    src={product.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </Link>

                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      to={`/product/${product.slug}`}
                      className="clamp-2 text-sm font-semibold text-ink-900 transition-colors hover:text-brand-500 sm:text-[15px]"
                    >
                      {product.name}
                    </Link>

                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      aria-label={`Remove ${product.name} from cart`}
                      className="shrink-0 text-ink-400 transition-colors hover:text-danger"
                    >
                      <Trash2 size={16} aria-hidden="true" />
                    </button>
                  </div>

                  <p className="text-xs text-ink-500">
                    {formatPrice(product.price)} each
                  </p>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1">
                    <div className="flex items-center rounded-full border border-line">
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        aria-label={`Decrease quantity of ${product.name}`}
                        className="grid h-8 w-8 place-items-center text-ink-700 transition-colors hover:text-navy-700"
                      >
                        <Minus size={13} aria-hidden="true" />
                      </button>

                      <span className="w-7 text-center text-xs font-bold tabular-nums">
                        {quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            product.id,
                            Math.min(product.stock, quantity + 1),
                          )
                        }
                        disabled={quantity >= product.stock}
                        aria-label={`Increase quantity of ${product.name}`}
                        className="grid h-8 w-8 place-items-center text-ink-700 transition-colors hover:text-navy-700 disabled:opacity-40"
                      >
                        <Plus size={13} aria-hidden="true" />
                      </button>
                    </div>

                    <span className="text-sm font-bold text-ink-900">
                      {formatPrice(lineTotal)}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Order summary */}
        <aside className="rounded-2xl border border-line bg-surface p-4 sm:p-5 lg:sticky lg:top-24">
          <h2 className="text-sm font-bold text-ink-900">Order Summary</h2>

          <dl className="mt-4 space-y-2.5 text-sm">
            <div className="flex items-center justify-between text-ink-500">
              <dt>
                Subtotal ({totalItems} item{totalItems === 1 ? "" : "s"})
              </dt>
              <dd className="font-medium text-ink-900">
                {formatPrice(totalPrice)}
              </dd>
            </div>

            <div className="flex items-center justify-between text-ink-500">
              <dt>Shipping</dt>
              <dd className="font-medium text-success">
                {amountToFreeShipping === 0 ? "Free" : "Calculated at checkout"}
              </dd>
            </div>
          </dl>

          {amountToFreeShipping > 0 && (
            <p className="mt-3 rounded-lg bg-gold-50 px-3 py-2 text-[11px] font-medium text-gold-700">
              Add {formatPrice(amountToFreeShipping)} more for free delivery
            </p>
          )}

          <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
            <span className="text-sm font-bold text-ink-900">Total</span>
            <span className="text-lg font-bold text-ink-900">
              {formatPrice(totalPrice)}
            </span>
          </div>

          <Button href="/checkout" variant="primary" size="lg" fullWidth className="mt-4">
            Proceed to Checkout
          </Button>

          <Link
            to="/shop"
            className="mt-3 block text-center text-xs font-semibold text-navy-600 transition-colors hover:text-navy-800"
          >
            Continue Shopping
          </Link>
        </aside>
      </div>
    </Section>
  );
};

export default Cart;
