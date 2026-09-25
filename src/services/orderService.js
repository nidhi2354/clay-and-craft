const STORAGE_KEY = "zivonix_orders";

const read = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const write = (orders) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch {
    // localStorage unavailable — order still returns to the caller,
    // it just won't be found again after a refresh.
  }
};

/** Short, readable order number — not a security token, just a reference. */
const generateOrderId = () => `ZV${Date.now().toString().slice(-8)}`;

/**
 * Order persistence layer — same Promise-based shape as cartService and
 * wishlistService (see their header comments). `placeOrder` today only
 * stamps an id and timestamp and writes to localStorage; swap the body
 * for a `POST /orders` call later and Checkout/OrderConfirmation don't
 * have to change, because they only ever deal with the Order shape
 * this function returns.
 */
export const placeOrder = async ({ items, address, paymentMethod, totalPrice }) => {
  const order = {
    id: generateOrderId(),
    items,
    address,
    paymentMethod,
    totalPrice,
    placedAt: new Date().toISOString(),
    status: "confirmed",
  };

  write([order, ...read()]);
  return order;
};

/** What a `GET /orders/:id` would return — used when reloading the confirmation page. */
export const getOrder = async (orderId) => read().find((o) => o.id === orderId);
