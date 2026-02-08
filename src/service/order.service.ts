const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const orderService = {
  getMyOrders: async () => {
    const res = await fetch(`${API_URL}/orders/me`, {
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch orders");

    return res.json();
  },

  getOrderById: async (orderId: string) => {
    const res = await fetch(`${API_URL}/orders/${orderId}`, {
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch order");

    return res.json();
  },
};
