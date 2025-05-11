// src/contexts/CartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { getCart, addToCart, removeFromCart } from "../services/cartService";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();

  // Load cart when user logs in
  useEffect(() => {
    const fetchCart = async () => {
      if (isLoggedIn) {
        setLoading(true);
        const response = await getCart();
        if (response.success) {
          setCart(response.cartData);
        }
        setLoading(false);
      } else {
        setCart({});
        setLoading(false);
      }
    };

    fetchCart();
  }, [isLoggedIn]);

  // Add item to cart
  const addItem = async (itemId) => {
    if (!isLoggedIn) return { success: false, message: "Please login first" };

    const response = await addToCart(itemId);
    if (response.success) {
      // Update local cart state
      setCart((prevCart) => {
        const newCart = { ...prevCart };
        newCart[itemId] = (newCart[itemId] || 0) + 1;
        return newCart;
      });
    }
    return response;
  };

  // Remove item from cart
  const removeItem = async (itemId) => {
    if (!isLoggedIn) return { success: false, message: "Please login first" };

    const response = await removeFromCart(itemId);
    if (response.success) {
      // Update local cart state
      setCart((prevCart) => {
        const newCart = { ...prevCart };
        if (newCart[itemId] && newCart[itemId] > 0) {
          newCart[itemId] -= 1;
          if (newCart[itemId] === 0) {
            delete newCart[itemId];
          }
        }
        return newCart;
      });
    }
    return response;
  };

  // Clear cart (useful after placing an order)
  const clearCart = () => {
    setCart({});
  };

  // Calculate total items in cart
  const getCartItemsCount = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  const value = {
    cart,
    addItem,
    removeItem,
    clearCart,
    getCartItemsCount,
    loading,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
