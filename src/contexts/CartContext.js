import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI } from '../utils/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  // Get total cart item count
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Fetch cart items when authenticated
  useEffect(() => {
    const fetchCart = async () => {
      if (isAuthenticated) {
        try {
          setLoading(true);
          const items = await cartAPI.getAll();
          setCartItems(items);
        } catch (error) {
          console.error('Failed to fetch cart:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setCartItems([]);
      }
    };

    fetchCart();
  }, [isAuthenticated]);

  // Refresh cart items
  const refreshCart = async () => {
    if (isAuthenticated) {
      try {
        const items = await cartAPI.getAll();
        setCartItems(items);
      } catch (error) {
        console.error('Failed to refresh cart:', error);
      }
    }
  };

  // Add item to cart
  const addItem = async (productId, quantity = 1) => {
    try {
      setLoading(true);
      const newItem = await cartAPI.addItem(productId, quantity);

      // Update local state optimistically
      const existing = cartItems.find(item => item.product_id === productId);
      if (existing) {
        // Backend handles quantity increase, so update accordingly
        setCartItems(prev => prev.map(item =>
          item.product_id === productId ? newItem : item
        ));
      } else {
        setCartItems(prev => [...prev, newItem]);
      }

      return newItem;
    } catch (error) {
      // Refresh cart on error to sync with backend
      await refreshCart();
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update item quantity
  const updateItem = async (cartId, quantity) => {
    try {
      setLoading(true);
      const updatedItem = await cartAPI.updateItem(cartId, quantity);

      // Update local state
      setCartItems(prev =>
        prev.map(item =>
          item.id === cartId ? { ...item, quantity } : item
        )
      );

      return updatedItem;
    } catch (error) {
      await refreshCart();
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeItem = async (cartId) => {
    try {
      setLoading(true);
      await cartAPI.removeItem(cartId);

      // Update local state
      setCartItems(prev => prev.filter(item => item.id !== cartId));
    } catch (error) {
      await refreshCart();
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get cart total
  const getCartTotal = () => {
    const subtotal = cartItems.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);

    const shipping = subtotal > 1000 ? 0 : 149.99;
    const total = subtotal + shipping;

    return { subtotal, shipping, total };
  };

  const value = {
    cartItems,
    cartItemCount,
    loading,
    addItem,
    updateItem,
    removeItem,
    refreshCart,
    getCartTotal,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
