const API_URL =
  typeof window === "undefined" ? process.env.NEXT_PUBLIC_API_URL : "/api";

const createReview = async (data: {
  mealId: string;
  orderId: string;
  rating: number;
  comment?: string;
}) => {
  const res = await fetch(`${API_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to create review");
  }

  return result;
};

const getMealReviews = async (mealId: string) => {
  const res = await fetch(
    `${API_URL}/reviews/meals/${mealId}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Failed to load reviews");
  }

  return res.json();
};

export const reviewService = {
  createReview,
  getMealReviews,
};
