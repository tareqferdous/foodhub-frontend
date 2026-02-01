import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import MealCard from "@/components/ui/MealCard";
import { mealService } from "@/service/meal.service";
import { Meal } from "@/types/meal.type";

export default async function MealsPage() {
  const meals = await mealService.getMeals();

  if (!meals || meals.error) {
    return <div>Error loading meals</div>;
  }

  return (
    <div className='bg-gray-50 min-h-screen'>
      <div className='max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6 flex flex-col lg:flex-row gap-4 lg:gap-6'>
        <Sidebar />

        <main className='flex-1 w-full'>
          <SearchBar />

          {/* All Available Meals */}
          <section className='mb-6 sm:mb-8'>
            <div className='flex items-center gap-2 mb-3 sm:mb-4 px-2 sm:px-0'>
              <h2 className='text-xl sm:text-2xl font-bold'>
                All Available Meals
              </h2>
              <span className='text-xl sm:text-2xl'>🍜</span>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-0'>
              {meals?.data?.data?.meals.map((meal: Meal) => (
                <MealCard key={meal.id} meal={meal} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
