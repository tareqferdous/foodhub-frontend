export type OrderStatus = "PLACED" | "DELIVERED" | "CANCELLED";

export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  meal: {
    id: string;
    title: string;
    image?: string;
  };
}

export interface Order {
  id: string;
  totalPrice: number;
  status: OrderStatus;
  deliveryAddress: string;
  createdAt: string;
  items: OrderItem[];
  provider: {
    id: string;
    restaurantName: string;
  };
}
