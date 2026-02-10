import { Meal } from "@/types/meal.type";

export function getUniqueDietaryTypes(meals: Meal[]) {
  return Array.from(new Set(meals.map((meal) => meal.dietaryType)));
}
