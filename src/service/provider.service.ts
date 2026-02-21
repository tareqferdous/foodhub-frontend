const API_URL =
  typeof window === "undefined" ? process.env.NEXT_PUBLIC_API_URL : "/api";

const getAllProviders = async () => {
  try {
    const res = await fetch(`${API_URL}/providers`);
    const data = await res.json();
    if (!data.success) {
      throw new Error("Failed to fetch providers");
    }
    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};

const getProviderById = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/providers/${id}`);
    const data = await res.json();
    if (!data.success) {
      throw new Error("Failed to fetch provider");
    }
    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};

export const providerService = {
  getAllProviders,
  getProviderById,
};
