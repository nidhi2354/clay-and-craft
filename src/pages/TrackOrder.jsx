import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, PackageSearch } from "lucide-react";
import Section from "../components/common/Section";
import Button from "../components/common/Button";
import FormField from "../components/common/FormField";
import * as orderService from "../services/orderService";

/**
 * "/track-order" — looks an order id up via orderService.getOrder (the
 * same lookup OrderConfirmation falls back to on a direct visit) and,
 * once found, sends the visitor straight to that page rather than
 * duplicating the order-summary markup here.
 */
const TrackOrder = () => {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = orderId.trim().toUpperCase();
    if (!id) return;

    setIsSearching(true);
    setError("");

    const found = await orderService.getOrder(id);
    setIsSearching(false);

    if (found) navigate(`/order-confirmation/${found.id}`);
    else setError(`No order found with ID "${id}" — check it and try again.`);
  };

  return (
    <Section tone="canvas" className="min-h-[60vh]">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-4 flex items-center gap-1.5 text-xs text-ink-500"
      >
        <Link to="/" className="hover:text-navy-700">
          Home
        </Link>
        <ChevronRight size={13} aria-hidden="true" />
        <span className="font-medium text-ink-900">Track Order</span>
      </nav>

      <div className="mx-auto max-w-md">
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-navy-50 text-navy-500">
            <PackageSearch size={26} aria-hidden="true" />
          </span>
          <h1 className="text-xl font-bold text-ink-900 sm:text-2xl">
            Track Your Order
          </h1>
          <p className="max-w-sm text-sm text-ink-500">
            Enter the order ID from your confirmation page or email to see
            its status.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-4 space-y-3.5 rounded-2xl border border-line bg-surface p-4 sm:p-5"
        >
          <FormField
            label="Order ID"
            placeholder="e.g. ZV12345678"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
          />

          {error && (
            <p className="rounded-lg bg-danger/10 px-3 py-2 text-xs font-medium text-danger">
              {error}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            size="md"
            fullWidth
            disabled={isSearching}
          >
            {isSearching ? "Searching…" : "Track Order"}
          </Button>
        </form>
      </div>
    </Section>
  );
};

export default TrackOrder;
