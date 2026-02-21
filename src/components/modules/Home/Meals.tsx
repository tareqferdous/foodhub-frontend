import MealCard from "@/components/ui/MealCard";
import { mealService } from "@/service/meal.service";
import { Meal } from "@/types/meal.type";
import Link from "next/link";

const Meals = async () => {
  const meals = await mealService.getMeals();

  if (!meals || meals.error) {
    return <div>Error loading meals</div>;
  }
  return (
    <section className='py-16 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between mb-10'>
          <div>
            <h2 className='text-4xl font-bold font-display text-gray-900 mb-3'>
              Popular Dishes
            </h2>
            <p className='text-gray-600 text-lg'>
              Most ordered meals this week
            </p>
          </div>
          <Link href='/meals' className='btn-outline hidden md:inline-flex'>
            View All Meals
          </Link>
        </div>

        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {meals?.data?.data?.meals.slice(0, 4).map((meal: Meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </div>

        <div className='text-center mt-8 md:hidden'>
          <Link href='/meals' className='btn-primary'>
            View All Meals
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Meals;
