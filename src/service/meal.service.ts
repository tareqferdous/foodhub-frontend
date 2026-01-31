const API_URL = process.env.API_URL;

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

interface GetMealsParams {
  isFeatured?: boolean;
  search?: string;
  page?: string;
  limit?: string;
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

      const data = await res.json();

      if (data.success) {
        return { data: data, error: null };
      }
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
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
