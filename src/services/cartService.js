const STORAGE_KEY = "zivonix_cart";

const read = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const write = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage unavailable (private mode, quota) — cart just won't persist.
  }
};

/**
 * Cart persistence layer.
 *
 * Every function returns a Promise, even though today it only reads
 * and writes localStorage synchronously. That's deliberate: when the
 * real backend is ready, each function body becomes a `fetch` call
 * and nothing above this file — CartContext, the pages, the
 * components — has to change, because the shape (a Promise of cart
 * rows) stays exactly the same.
 *
 * A cart row is `{ productId, quantity }`. Product details (name,
 * price, image) are looked up from the catalogue when rendering,
 * exactly like a real cart API would only ever store the reference.
 */
export const getCart = async () => read();

export const addToCart = async (productId, quantity = 1) => {
  const items = read();
  const existing = items.find((item) => item.productId === productId);

  const next = existing
    ? items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      )
    : [...items, { productId, quantity }];

  write(next);
  return next;
};

/** Setting quantity to 0 or below removes the row, same as removeFromCart. */
export const updateCartQuantity = async (productId, quantity) => {
  const items = read();
  const next =
    quantity <= 0
      ? items.filter((item) => item.productId !== productId)
      : items.map((item) =>
          item.productId === productId ? { ...item, quantity } : item,
        );

  write(next);
  return next;
};

export const removeFromCart = async (productId) => {
  const next = read().filter((item) => item.productId !== productId);
  write(next);
  return next;
};

export const clearCart = async () => {
  write([]);
  return [];
};
