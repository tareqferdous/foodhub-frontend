import Link from "next/link";

const Category = () => {
  const categories = [
    { name: "Pizza", icon: "🍕", color: "from-red-400 to-red-500" },
    { name: "Burger", icon: "🍔", color: "from-yellow-400 to-orange-500" },
    { name: "Sushi", icon: "🍣", color: "from-blue-400 to-cyan-500" },
    { name: "Curry", icon: "🍛", color: "from-orange-400 to-red-500" },
    { name: "Pasta", icon: "🍝", color: "from-yellow-400 to-red-500" },
    { name: "Salad", icon: "🥗", color: "from-green-400 to-green-500" },
    { name: "Dessert", icon: "🍰", color: "from-pink-400 to-purple-500" },
    { name: "Coffee", icon: "☕", color: "from-brown-400 to-amber-600" },
  ];
  return (
    <section className='py-16 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-10'>
          <h2 className='text-4xl font-bold font-display text-gray-900 mb-3'>
            Browse by Category
          </h2>
          <p className='text-gray-600 text-lg'>
            Find exactly what you are craving
          </p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4'>
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/meals?category=${category.name.toLowerCase()}`}
              className='group'>
              <div className='card p-6 text-center hover:scale-105 transition-transform cursor-pointer'>
                <div
                  className={`w-16 h-16 mx-auto mb-3 rounded-full bg-linear-to-br ${category.color} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <div className='font-semibold text-gray-900 group-hover:text-primary-600 transition'>
                  {category.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
