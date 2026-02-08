import { DietaryType, Meal } from "@/types/meal.type";

export function getUniqueDietaryTypes(meals: Meal[]): DietaryType[] {
  return Array.from(new Set(meals.map((meal) => meal.dietaryType)));
}
