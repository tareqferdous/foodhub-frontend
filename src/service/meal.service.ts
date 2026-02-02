const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

interface GetMealsParams {
  cuisine?: string;
  dietary?: string;
  minPrice?: string;
  maxPrice?: string;
}

export const mealService = {
  getMeals: async function (params?: GetMealsParams, options?: ServiceOptions) {
    try {
      const url = new URL(`${API_URL}/meals`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      config.next = { ...config.next, tags: ["meals"] };

      const res = await fetch(url.toString(), config);

      // Check if response is ok
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        return { data: data, error: null };
      } else {
        return {
          data: null,
          error: { message: data.message || "Failed to fetch meals" },
        };
      }
    } catch (err) {
      console.error("Error in getMeals:", err);
      return {
        data: null,
        error: {
          message: err instanceof Error ? err.message : "Something Went Wrong",
        },
      };
    }
  },

  getMealById: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/meals/${id}`);

      const data = await res.json();
      console.log("data", data);

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
