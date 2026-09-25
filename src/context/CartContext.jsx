import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as cartService from "../services/cartService";
import { getProductById } from "../data/products";

const CartContext = createContext(null);

/**
 * App-wide cart state. Wraps cartService (see its header comment) so
 * components never touch localStorage — or, later, the API — directly.
 * They call addItem/updateQuantity/removeItem and read `items` back.
 *
 * `items` here is enriched with the full product record (via
 * getProductById), so a cart row is `{ productId, quantity, product }`
 * and components don't each have to re-join it against the catalogue.
 */
export const CartProvider = ({ children }) => {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    cartService.getCart().then((stored) => {
      setRows(stored);
      setIsLoading(false);
    });
  }, []);

  const addItem = useCallback(async (productId, quantity = 1) => {
    setRows(await cartService.addToCart(productId, quantity));
  }, []);

  const updateQuantity = useCallback(async (productId, quantity) => {
    setRows(await cartService.updateCartQuantity(productId, quantity));
  }, []);

  const removeItem = useCallback(async (productId) => {
    setRows(await cartService.removeFromCart(productId));
  }, []);

  const clearCart = useCallback(async () => {
    setRows(await cartService.clearCart());
  }, []);

  const isInCart = useCallback(
    (productId) => rows.some((row) => row.productId === productId),
    [rows],
  );

  const items = useMemo(
    () =>
      rows
        .map((row) => {
          const product = getProductById(row.productId);
          return product ? { ...row, product } : null;
        })
        .filter(Boolean),
    [rows],
  );

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items],
  );

  const value = {
    items,
    isLoading,
    totalItems,
    totalPrice,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};
