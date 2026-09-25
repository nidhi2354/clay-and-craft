import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as wishlistService from "../services/wishlistService";
import { getProductById } from "../data/products";

const WishlistContext = createContext(null);

/** App-wide wishlist state — same wrap-the-service pattern as CartContext. */
export const WishlistProvider = ({ children }) => {
  const [ids, setIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    wishlistService.getWishlist().then((stored) => {
      setIds(stored);
      setIsLoading(false);
    });
  }, []);

  const toggleItem = useCallback(async (productId) => {
    setIds(await wishlistService.toggleWishlist(productId));
  }, []);

  const removeItem = useCallback(async (productId) => {
    setIds(await wishlistService.removeFromWishlist(productId));
  }, []);

  const clearWishlist = useCallback(async () => {
    setIds(await wishlistService.clearWishlist());
  }, []);

  const isWishlisted = useCallback((productId) => ids.includes(productId), [ids]);

  const items = useMemo(() => ids.map(getProductById).filter(Boolean), [ids]);

  const value = {
    items,
    isLoading,
    totalItems: items.length,
    toggleItem,
    removeItem,
    clearWishlist,
    isWishlisted,
  };

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
};
