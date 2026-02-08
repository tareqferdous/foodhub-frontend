// types/cart.ts
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
}
