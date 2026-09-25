import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Section from "../components/common/Section";
import Button from "../components/common/Button";
import FormField from "../components/common/FormField";
import { formatPrice } from "../data/products";
import { site } from "../data/site";
import { useCart } from "../context/CartContext";
import * as orderService from "../services/orderService";

const EMPTY_ADDRESS = {
  fullName: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
};

/** ₹49 flat rate below the free-shipping threshold, matching the banner copy in TopBar/announcements. */
const SHIPPING_FEE = 49;

/**
 * "/checkout" — a real address + payment form that ends in a genuine
 * `orderService.placeOrder` call, not a dead end. Online payment is
 * shown but disabled rather than faked, since wiring an actual gateway
 * is a backend concern; Cash on Delivery needs no gateway, so it's the
 * one live option today.
 */
const Checkout = () => {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState(EMPTY_ADDRESS);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Nothing to check out — send them back rather than showing an empty
  // form. Skipped once an order is being placed: clearCart() below makes
  // `items` empty too, and without this guard that would fire this same
  // redirect and race the confirmation navigate that submit already
  // triggered.
  if (items.length === 0 && !isPlacingOrder) return <Navigate to="/cart" replace />;

  const shippingFee = totalPrice >= site.freeShippingAbove ? 0 : SHIPPING_FEE;
  const orderTotal = totalPrice + shippingFee;

  const updateField = (field) => (e) =>
    setAddress((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPlacingOrder(true);

    const order = await orderService.placeOrder({
      items: items.map(({ product, quantity }) => ({
        productId: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity,
      })),
      address,
      paymentMethod,
      shippingFee,
      totalPrice: orderTotal,
    });

    navigate(`/order-confirmation/${order.id}`, { state: { order } });
    clearCart();
  };

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
        <Link to="/cart" className="hover:text-navy-700">
          Cart
        </Link>
        <ChevronRight size={13} aria-hidden="true" />
        <span className="font-medium text-ink-900">Checkout</span>
      </nav>

      <h1 className="mb-6 font-display text-xl font-bold text-ink-900 sm:text-2xl">
        Checkout
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start lg:gap-8"
      >
        {/* Address + payment */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-line bg-surface p-4 sm:p-5">
            <h2 className="text-sm font-bold text-ink-900">Delivery Address</h2>

            <div className="mt-4 grid gap-3.5 sm:grid-cols-2">
              <FormField
                label="Full Name"
                value={address.fullName}
                onChange={updateField("fullName")}
                required
                className="sm:col-span-2"
              />
              <FormField
                label="Phone Number"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]{10}"
                title="10-digit mobile number"
                value={address.phone}
                onChange={updateField("phone")}
                required
              />
              <FormField
                label="Pincode"
                inputMode="numeric"
                pattern="[0-9]{6}"
                title="6-digit pincode"
                value={address.pincode}
                onChange={updateField("pincode")}
                required
              />
              <FormField
                label="Address Line 1"
                value={address.line1}
                onChange={updateField("line1")}
                required
                className="sm:col-span-2"
              />
              <FormField
                label="Address Line 2 (optional)"
                value={address.line2}
                onChange={updateField("line2")}
                className="sm:col-span-2"
              />
              <FormField
                label="City"
                value={address.city}
                onChange={updateField("city")}
                required
              />
              <FormField
                label="State"
                value={address.state}
                onChange={updateField("state")}
                required
              />
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-4 sm:p-5">
            <h2 className="text-sm font-bold text-ink-900">Payment Method</h2>

            <div className="mt-4 space-y-2.5">
              <label className="flex items-center gap-3 rounded-xl border border-navy-300 bg-navy-50 p-3 text-sm font-medium text-ink-900">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="h-4 w-4 accent-navy-700"
                />
                Cash on Delivery
              </label>

              <label className="flex cursor-not-allowed items-center gap-3 rounded-xl border border-line p-3 text-sm text-ink-400">
                <input type="radio" name="payment" disabled className="h-4 w-4" />
                Online Payment (UPI / Card) — coming soon
              </label>
            </div>
          </div>
        </div>

        {/* Order summary */}
        <aside className="rounded-2xl border border-line bg-surface p-4 sm:p-5 lg:sticky lg:top-24">
          <h2 className="text-sm font-bold text-ink-900">Order Summary</h2>

          <ul className="mt-4 max-h-64 space-y-3 overflow-y-auto pr-1">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="flex items-center gap-3">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-navy-50">
                  <img
                    src={product.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="clamp-2 text-xs font-semibold text-ink-900">
                    {product.name}
                  </p>
                  <p className="text-[11px] text-ink-500">Qty {quantity}</p>
                </div>
                <span className="shrink-0 text-xs font-bold text-ink-900">
                  {formatPrice(product.price * quantity)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
            <div className="flex items-center justify-between text-ink-500">
              <dt>
                Subtotal ({totalItems} item{totalItems === 1 ? "" : "s"})
              </dt>
              <dd className="font-medium text-ink-900">{formatPrice(totalPrice)}</dd>
            </div>
            <div className="flex items-center justify-between text-ink-500">
              <dt>Shipping</dt>
              <dd className={`font-medium ${shippingFee === 0 ? "text-success" : "text-ink-900"}`}>
                {shippingFee === 0 ? "Free" : formatPrice(shippingFee)}
              </dd>
            </div>
          </dl>

          <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
            <span className="text-sm font-bold text-ink-900">Total</span>
            <span className="text-lg font-bold text-ink-900">
              {formatPrice(orderTotal)}
            </span>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={isPlacingOrder}
            className="mt-4"
          >
            {isPlacingOrder ? "Placing Order…" : "Place Order"}
          </Button>
        </aside>
      </form>
    </Section>
  );
};


export default Checkout;
