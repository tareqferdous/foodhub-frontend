"use client";

import MealCard from "@/components/ui/MealCard";
import { authClient } from "@/lib/auth.client";
import { mealService } from "@/service/meal.service";
import { Meal } from "@/types/meal.type";
import { useEffect, useState } from "react";

export default function RecommendedMeals() {
  const session = authClient.useSession();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const user = session.data?.user as { role?: string } | undefined;

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!user || user.role !== "CUSTOMER") return;

      setIsLoading(true);
      const response = await mealService.getRecommendedMeals();

      if (response.data?.data) {
        setMeals(response.data.data as Meal[]);
      }

      setIsLoading(false);
    };

    fetchRecommendations();
  }, [user]);

  if (!user || user.role !== "CUSTOMER") {
    return null;
  }

  if (!isLoading && meals.length === 0) {
    return null;
  }

  return (
    <section className='py-14 bg-orange-50/40'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-10'>
          <h2 className='text-3xl md:text-4xl font-bold font-display text-gray-900 mb-3'>
            Recommended For You
          </h2>
          <p className='text-gray-600 text-base md:text-lg'>
            Based on your order history and preferences
          </p>
        </div>

        {isLoading ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className='h-80 rounded-xl bg-white border border-gray-100 animate-pulse'
              />
            ))}
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {meals.slice(0, 4).map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
