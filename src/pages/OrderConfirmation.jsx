import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import Section from "../components/common/Section";
import Button from "../components/common/Button";
import NotFound from "./NotFound";
import { formatPrice } from "../data/products";
import * as orderService from "../services/orderService";

/**
 * "/order-confirmation/:orderId" — reads the order from router state
 * when it arrives straight from Checkout (instant, no flash), and
 * falls back to orderService.getOrder for a direct visit or a page
 * refresh, exactly like a real `GET /orders/:id` would be the only
 * path once there's a backend.
 */
const OrderConfirmation = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(location.state?.order ?? null);
  const [isLoading, setIsLoading] = useState(!location.state?.order);

  useEffect(() => {
    if (order) return;

    let isCurrent = true;
    orderService.getOrder(orderId).then((found) => {
      if (!isCurrent) return;
      setOrder(found ?? null);
      setIsLoading(false);
    });

    return () => {
      isCurrent = false;
    };
  }, [orderId, order]);

  if (isLoading) {
    return (
      <Section tone="canvas" className="min-h-[50vh]">
        <p className="py-16 text-center text-sm text-ink-500">
          Loading your order…
        </p>
      </Section>
    );
  }

  if (!order) return <NotFound />;

  return (
    <Section tone="canvas" className="min-h-[60vh]">
      <div className="mx-auto max-w-xl">
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-success/10 text-success">
            <CheckCircle2 size={30} aria-hidden="true" />
          </span>

          <h1 className="text-xl font-bold text-ink-900 sm:text-2xl">
            Order placed!
          </h1>

          <p className="text-sm text-ink-500">
            Thank you — your order{" "}
            <span className="font-semibold text-ink-900">#{order.id}</span> has
            been confirmed.
            {order.paymentMethod === "cod" &&
              " Please keep the amount ready for cash on delivery."}
          </p>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-4 sm:p-5">
          <h2 className="text-sm font-bold text-ink-900">Order Summary</h2>

          <ul className="mt-4 space-y-3">
            {order.items.map((item) => (
              <li key={item.productId} className="flex items-center gap-3">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-navy-50">
                  <img
                    src={item.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="clamp-2 text-xs font-semibold text-ink-900">
                    {item.name}
                  </p>
                  <p className="text-[11px] text-ink-500">Qty {item.quantity}</p>
                </div>
                <span className="shrink-0 text-xs font-bold text-ink-900">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
            <span className="text-sm font-bold text-ink-900">Total Paid</span>
            <span className="text-lg font-bold text-ink-900">
              {formatPrice(order.totalPrice)}
            </span>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-line bg-surface p-4 sm:p-5">
          <h2 className="text-sm font-bold text-ink-900">Delivering To</h2>
          <address className="mt-2 text-sm not-italic leading-6 text-ink-700">
            {order.address.fullName}
            <br />
            {order.address.line1}
            {order.address.line2 && `, ${order.address.line2}`}
            <br />
            {order.address.city}, {order.address.state} — {order.address.pincode}
            <br />
            {order.address.phone}
          </address>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href="/shop" variant="primary" size="md">
            Continue Shopping
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default OrderConfirmation;
