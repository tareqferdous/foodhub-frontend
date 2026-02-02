"use client";

import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import MealCard from "@/components/ui/MealCard";
import { categoryService } from "@/service/category.service";
import { mealService } from "@/service/meal.service";
import { Meal } from "@/types/meal.type";
import { getUniqueDietaryTypes } from "@/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function MealsPage() {
  // const categoriesResponse = await categoryService.getCategories();

  // const categories = categoriesResponse.data?.data || [];

  const searchParams = useSearchParams();
  const [meals, setMeals] = useState<{ meals: Meal[] }>({ meals: [] });
  const [categories, setCategories] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dietaryTypes = getUniqueDietaryTypes(meals?.meals || []);

  const cuisine = searchParams.get("cuisine") || undefined;
  const dietary = searchParams.get("dietary") || undefined;
  const minPrice = searchParams.get("minPrice") || undefined;
  const maxPrice = searchParams.get("maxPrice") || undefined;

  const fetchMeals = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await mealService.getMeals({
        cuisine,
        dietary,
        minPrice,
        maxPrice,
      });

      if (response && !response.error) {
        setMeals(response.data?.data || []);
      } else {
        setError(response?.error?.message || "Failed to load meals");
      }
    } catch (err) {
      console.error("Error fetching meals:", err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await categoryService.getCategories();

      if (response && !response.error) {
        setCategories(response.data?.data || []);
      } else {
        setError(response?.error?.message || "Failed to load categories");
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
    fetchCategories();
  }, [cuisine, dietary, minPrice, maxPrice]);

  // if (!mealsResponse || mealsResponse.error) {
  //   return (
  //     <div className='min-h-screen bg-neutral-50 dark:bg-neutral-900'>
  //       <div className='container-7xl py-20'>
  //         <div className='text-center'>
  //           <h1 className='text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-4'>
  //             Error Loading Meals
  //           </h1>
  //           <p className='text-neutral-600 dark:text-neutral-400'>
  //             {mealsResponse?.error?.message || "Something went wrong"}
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  //

  // Get active filters for display
  const activeFilters = {
    cuisine,
    dietary,
    minPrice,
    maxPrice,
  };

  console.log("meals", meals);

  return (
    <div className='bg-gray-50 min-h-screen'>
      <div className='max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6 flex flex-col lg:flex-row gap-4 lg:gap-6'>
        <Sidebar
          activeFilters={activeFilters}
          categories={categories}
          dietaryTypes={dietaryTypes}
        />

        <main className='flex-1 w-full'>
          <SearchBar />

          {/* All Available Meals */}
          {meals?.meals?.length === 0 ? (
            <div className='text-center py-20'>
              <div className='text-7xl mb-4'>🍽️</div>
              <h3 className='text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-2'>
                No meals found
              </h3>
              <p className='text-neutral-600 dark:text-neutral-400 mb-6'>
                Try adjusting your filters to see more results
              </p>
              <Link href='/meals'>
                <button className='btn btn-primary'>Clear Filters</button>
              </Link>
            </div>
          ) : (
            <section className='mb-6 sm:mb-8'>
              <div className='flex items-center gap-2 mb-3 sm:mb-4 px-2 sm:px-0'>
                <h2 className='text-xl sm:text-2xl font-bold'>
                  All Available Meals
                </h2>
                <span className='text-xl sm:text-2xl'>🍜</span>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-0'>
                {meals?.meals?.map((meal: Meal) => (
                  <MealCard key={meal.id} meal={meal} />
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
