import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import MealCard from "@/components/ui/MealCard";
import { mealService } from "@/service/meal.service";

const homeFlavors = [
  {
    id: 1,
    name: "Bhorta Express - Gulshan",
    cuisine: "🍚Bengali",
    rating: 3.8,
    reviews: 100,
    deliveryTime: "20 - 35 min",
    price: 52,
    discount: 60,
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=250&fit=crop",
    hasFoodi: true,
    description: "Authentic Bengali cuisine",
    provider: "Bhorta Express",
  },
  {
    id: 2,
    name: "Molla Bhorta House - ...",
    cuisine: "🍚Bengali",
    rating: 4.0,
    reviews: 100,
    deliveryTime: "20 - 35 min",
    price: 52,
    discount: 60,
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=250&fit=crop",
    hasFoodi: true,
    description: "Traditional Bengali dishes",
    provider: "Molla Bhorta House",
  },
  {
    id: 3,
    name: "Sweet Freeze",
    cuisine: "🍦Ice Cream",
    rating: 5.0,
    reviews: 1,
    deliveryTime: "10 - 25 min",
    price: 42,
    image:
      "https://images.unsplash.com/photo-1497534547324-0ebb3f052e88?w=400&h=250&fit=crop",
    hasFoodi: true,
    description: "Premium ice cream flavors",
    provider: "Sweet Freeze",
  },
];

const newOnFoodi = [
  {
    id: 1,
    name: "Tehari Khan Gulshan - a...",
    cuisine: "🍚Biryani",
    rating: 3.8,
    reviews: 20,
    deliveryTime: "20 - 35 min",
    price: 52,
    discount: 20,
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=250&fit=crop",
    hasFoodi: true,
    description: "Delicious biryani varieties",
    provider: "Tehari Khan",
  },
  {
    id: 2,
    name: "Cafe Sao Paulo - Gulshan",
    cuisine: "🥡Chinese",
    rating: 0,
    reviews: 0,
    deliveryTime: "5 - 20 min",
    price: 42,
    discount: 15,
    image:
      "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=400&h=250&fit=crop",
    hasFoodi: true,
    description: "Authentic Chinese cuisine",
    provider: "Cafe Sao Paulo",
  },
  {
    id: 3,
    name: "Lapostrophe",
    cuisine: "☕Coffee & Tea",
    rating: 0,
    reviews: 0,
    deliveryTime: "15 - 30 min",
    price: 47,
    discount: 15,
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=250&fit=crop",
    hasFoodi: true,
    description: "Premium coffee and tea",
    provider: "Lapostrophe",
  },
];

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
              {homeFlavors.map((meal) => (
                <MealCard key={meal.id} {...meal} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
