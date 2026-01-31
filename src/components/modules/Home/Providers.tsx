import ProviderCard from "@/components/ui/ProviderCard";
import Link from "next/link";

const Providers = () => {
  const featuredProviders = [
    {
      id: "1",
      name: "Spice Garden",
      description:
        "Authentic Indian cuisine with traditional recipes and modern flavors",
      logo: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200",
      coverImage:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500",
      rating: 4.8,
      totalReviews: 342,
      cuisine: ["Indian", "Asian", "Curry"],
      deliveryTime: "25-35",
      minOrder: 15,
    },
    {
      id: "2",
      name: "Pizza Palace",
      description: "Wood-fired pizzas and Italian classics made with love",
      logo: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200",
      coverImage:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500",
      rating: 4.6,
      totalReviews: 289,
      cuisine: ["Italian", "Pizza", "Pasta"],
      deliveryTime: "20-30",
      minOrder: 12,
    },
    {
      id: "3",
      name: "Burger House",
      description: "Gourmet burgers and American comfort food",
      logo: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200",
      coverImage:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500",
      rating: 4.7,
      totalReviews: 456,
      cuisine: ["American", "Burgers", "Fast Food"],
      deliveryTime: "15-25",
      minOrder: 10,
    },
  ];
  return (
    <section className='py-16 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between mb-10'>
          <div>
            <h2 className='text-4xl font-bold font-display text-gray-900 mb-3'>
              Top Restaurants
            </h2>
            <p className='text-gray-600 text-lg'>
              Best rated restaurants in your area
            </p>
          </div>
          <Link href='/providers' className='btn-outline hidden md:inline-flex'>
            View All Restaurants
          </Link>
        </div>

        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {featuredProviders.map((provider) => (
            <ProviderCard key={provider.id} {...provider} />
          ))}
        </div>

        <div className='text-center mt-8 md:hidden'>
          <Link href='/providers' className='btn-primary'>
            View All Restaurants
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Providers;
