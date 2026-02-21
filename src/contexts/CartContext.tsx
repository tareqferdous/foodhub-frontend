"use client";

import { authClient } from "@/lib/auth.client";
import { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
  mealId: string;
  title: string;
  price: number;
  image?: string;
  providerId: string;
  providerName: string;
  quantity: number;
};

export interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeFromCart: (mealId: string) => void;
  updateQuantity: (mealId: string, qty: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  clearProviderCart: (providerId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id ?? "guest";

  // Unique storage key per user — prevents cart leaking between accounts
  const storageKey = `cart_${userId}`;

  const [items, setItems] = useState<CartItem[]>([]);

  /* Load cart from localStorage when userId changes (login/logout) */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      setItems(stored ? JSON.parse(stored) : []);
    } catch {
      localStorage.removeItem(storageKey);
      setItems([]);
    }
  }, [storageKey]);

  /* Persist cart whenever items change */
  useEffect(() => {
    if (items.length === 0) {
      localStorage.removeItem(storageKey);
    } else {
      localStorage.setItem(storageKey, JSON.stringify(items));
    }
  }, [items, storageKey]);

  const addToCart = (item: Omit<CartItem, "quantity">, qty: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.mealId === item.mealId);
      if (existing) {
        return prev.map((i) =>
          i.mealId === item.mealId ? { ...i, quantity: i.quantity + qty } : i,
        );
      }
      return [...prev, { ...item, quantity: qty }];
    });
  };

  const removeFromCart = (mealId: string) => {
    setItems((prev) => prev.filter((i) => i.mealId !== mealId));
  };

  const updateQuantity = (mealId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(mealId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.mealId === mealId ? { ...i, quantity: qty } : i)),
    );
  };

  const clearCart = () => setItems([]);

  const clearProviderCart = (providerId: string) => {
    setItems((prev) => prev.filter((item) => item.providerId !== providerId));
  };

  const getTotalItems = (): number =>
    items.reduce((total, item) => total + item.quantity, 0);

  const getTotalPrice = (): number =>
    items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        clearProviderCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
};
