const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getCategories = async () => {
  try {
    const res = await fetch(`${API_URL}/categories`);
    const data = await res.json();
    if (!data.success) {
      throw new Error("Failed to fetch categories");
    }
    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};

export const categoryService = {
  getCategories,
};
