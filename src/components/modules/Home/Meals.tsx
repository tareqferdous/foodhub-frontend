import MealCard from "@/components/ui/MealCard";
import Link from "next/link";

const Meals = () => {
  const featuredMeals = [
    {
      id: "1",
      name: "Chicken Tikka Masala",
      description:
        "Creamy tomato curry with tender chicken pieces and aromatic spices",
      price: 12.99,
      image:
        "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500",
      provider: "Spice Garden",
      rating: 4.8,
      prepTime: 25,
      category: "Indian",
    },
    {
      id: "2",
      name: "Margherita Pizza",
      description:
        "Classic Italian pizza with fresh mozzarella, tomatoes, and basil",
      price: 10.99,
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500",
      provider: "Pizza Palace",
      rating: 4.6,
      prepTime: 20,
      category: "Italian",
    },
    {
      id: "3",
      name: "Beef Burger Deluxe",
      description:
        "Juicy beef patty with cheese, lettuce, tomato, and special sauce",
      price: 8.99,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
      provider: "Burger House",
      rating: 4.7,
      prepTime: 15,
      category: "American",
    },
    {
      id: "4",
      name: "Pad Thai Noodles",
      description:
        "Stir-fried rice noodles with shrimp, tofu, peanuts, and tamarind sauce",
      price: 11.99,
      image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=500",
      provider: "Thai Express",
      rating: 4.9,
      prepTime: 30,
      category: "Thai",
    },
  ];
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
          {featuredMeals.map((meal) => (
            <MealCard key={meal.id} {...meal} />
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
