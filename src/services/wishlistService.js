const STORAGE_KEY = "zivonix_wishlist";

const read = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const write = (ids) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // localStorage unavailable — wishlist just won't persist.
  }
};

/**
 * Wishlist persistence layer — same Promise-based shape as
 * cartService, for the same reason: swap the body for a `fetch` call
 * later and nothing that calls this file needs to change.
 *
 * Stored as a plain array of product ids.
 */
export const getWishlist = async () => read();

export const toggleWishlist = async (productId) => {
  const ids = read();
  const next = ids.includes(productId)
    ? ids.filter((id) => id !== productId)
    : [...ids, productId];

  write(next);
  return next;
};

export const removeFromWishlist = async (productId) => {
  const next = read().filter((id) => id !== productId);
  write(next);
  return next;
};

export const clearWishlist = async () => {
  write([]);
  return [];
};
