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

export type DietaryType = "HALAL" | "VEGETARIAN" | "HALAL";

export interface Meal {
  id: string;
  title: string;
  description: string | null;
  price: string;
  image?: string | undefined;
  isAvailable: boolean;
  dietaryType?: string;
  providerId: string;
  provider?: {
    restaurantName: string;
  };
  categoryId?: string;
  category?: {
    id: string;
    name: string;
  };

  reviews?: Review[];

  createdAt: string;
}

export interface ManageMenuItem {
  id: string;
  title: string;
  description: string | null;
  price: string;
  categoryId: string;
  providerId: string;
  image?: string;
  dietaryType?: DietaryType;
  isAvailable: boolean;
  createdAt: string;
}
