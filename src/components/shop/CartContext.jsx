import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("bru-cart");
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load cart", e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("bru-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1, grindOption = null) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.grindOption === grindOption
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        toast.success("Updated cart");
        return updated;
      }

      toast.success("Added to cart");
      return [...prev, { product, quantity, grindOption }];
    });
  };

  const updateQuantity = (productId, grindOption, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, grindOption);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.grindOption === grindOption
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (productId, grindOption) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.grindOption === grindOption)
      )
    );
    toast.success("Removed from cart");
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}