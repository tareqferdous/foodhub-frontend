export interface Category {
  id: string;
  name: string;
  createdAt: string; // ISO date string
}

export interface Review {
  id: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
  userId: string;
}

export type DietaryType = "HALAL" | "VEGETARIAN" | "VEGAN";

export interface Meal {
  id: string;
  title: string;
  description: string | null;
  price: string;
  image: string | undefined;
  isAvailable: boolean;
  dietaryType: DietaryType;
  providerId: string;
  provider?: {
    restaurantName: string;
  };
  categoryId: string;
  category: Category;

  reviews: Review[];

  createdAt: string;
}
