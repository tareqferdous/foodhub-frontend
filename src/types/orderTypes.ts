type Meal = {
  id: string;
  title: string;
  description?: string | null;
  price: string; // because API returns string
  image: string;
  dietaryType?: string;
  categoryId?: string;
  providerId?: string;
  isAvailable?: boolean;
  createdAt?: string;
};

type OrderItem = {
  id: string;
  orderId?: string;
  mealId?: string;
  price: string; // API returns string
  quantity: number;
  meal: Meal;
};

type Customer = {
  id: string;
  name: string;
  email: string;
};

export type OrderStatus = "PLACED" | "DELIVERED" | "CANCELLED";

export type Order = {
  id: string;
  customerId: string;
  providerId: string;
  totalPrice: string;
  deliveryAddress: string;
  status: OrderStatus;
  createdAt: string;
  items: OrderItem[];
  customer: Customer;
};
