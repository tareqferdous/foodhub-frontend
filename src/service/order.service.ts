const API_URL =
  typeof window === "undefined" ? process.env.NEXT_PUBLIC_API_URL : "/api";

export const orderService = {
  getMyOrders: async () => {
    try {
      const res = await fetch(`${API_URL}/orders/me`, {
        credentials: "include",
        cache: "no-store",
      });

      if (!res.ok) {
        return { data: null, error: { message: "Failed to fetch orders" } };
      }

      const json = await res.json();
      return { data: json.data, error: null };
    } catch (err) {
      console.error("[orderService.getMyOrders]", err);
      return {
        data: null,
        error: {
          message:
            err instanceof Error ? err.message : "Something went wrong",
        },
      };
    }
  },

  getOrderById: async (orderId: string) => {
    try {
      const res = await fetch(`${API_URL}/orders/${orderId}`, {
        credentials: "include",
        cache: "no-store",
      });

      if (!res.ok) {
        return { data: null, error: { message: "Order not found" } };
      }

      const json = await res.json();
      return { data: json.data, error: null };
    } catch (err) {
      console.error("[orderService.getOrderById]", err);
      return {
        data: null,
        error: {
          message:
            err instanceof Error ? err.message : "Something went wrong",
        },
      };
    }
  },
};
