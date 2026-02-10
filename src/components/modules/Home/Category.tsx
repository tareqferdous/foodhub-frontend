"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
  createdAt: string;
}

// Emoji and gradient mapping for common category names
const categoryStyles: { [key: string]: { emoji: string; gradient: string } } = {
  pizza: { emoji: "🍕", gradient: "from-red-400 to-pink-500" },
  burger: { emoji: "🍔", gradient: "from-orange-400 to-amber-500" },
  sushi: { emoji: "🍣", gradient: "from-blue-400 to-cyan-500" },
  curry: { emoji: "🍛", gradient: "from-orange-500 to-red-500" },
  pasta: { emoji: "🍝", gradient: "from-yellow-400 to-orange-500" },
  salad: { emoji: "🥗", gradient: "from-green-400 to-emerald-500" },
  dessert: { emoji: "🍰", gradient: "from-purple-400 to-pink-500" },
  coffee: { emoji: "☕", gradient: "from-amber-400 to-orange-500" },
  biryani: { emoji: "🍚", gradient: "from-yellow-500 to-red-500" },
  chinese: { emoji: "🥡", gradient: "from-red-500 to-pink-500" },
  sandwich: { emoji: "🥪", gradient: "from-green-500 to-teal-500" },
  noodles: { emoji: "🍜", gradient: "from-orange-400 to-red-500" },
  rice: { emoji: "🍛", gradient: "from-amber-400 to-yellow-500" },
  chicken: { emoji: "🍗", gradient: "from-orange-500 to-red-500" },
  soup: { emoji: "🍲", gradient: "from-orange-400 to-amber-500" },
  seafood: { emoji: "🦐", gradient: "from-blue-500 to-cyan-500" },
  vegetarian: { emoji: "🥬", gradient: "from-green-500 to-emerald-500" },
  juice: { emoji: "🧃", gradient: "from-orange-400 to-pink-500" },
  snacks: { emoji: "🍿", gradient: "from-yellow-400 to-orange-400" },
  drinks: { emoji: "🥤", gradient: "from-blue-400 to-purple-500" },
};

// Default fallback for unknown categories
const defaultStyle = { emoji: "🍽️", gradient: "from-gray-400 to-slate-500" };

const Category = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`,
          {
            credentials: "include",
          },
        );

        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            setCategories(result.data);
          }
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const getCategoryStyle = (name: string) => {
    const lowerName = name.toLowerCase();
    return categoryStyles[lowerName] || defaultStyle;
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    router.push(`/meals?cuisine=${categoryName}`);
  };
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

        {categories.length === 0 ? (
          <div className='text-center py-12'>
            <div className='text-5xl mb-4'>📂</div>
            <p className='text-gray-600'>কোনো ক্যাটাগরি পাওয়া যায়নি</p>
          </div>
        ) : (
          <>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
              {categories.map((category) => {
                const style = getCategoryStyle(category.name);
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.name)}
                    className={`group relative overflow-hidden rounded-3xl p-6 transition-all duration-300 ${
                      selectedCategory === category.name
                        ? "scale-105 shadow-2xl"
                        : "hover:scale-105 hover:shadow-xl"
                    }`}>
                    {/* Gradient Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-90 group-hover:opacity-100 transition-opacity`}></div>

                    {/* Content */}
                    <div className='relative z-10 flex flex-col items-center justify-center space-y-3'>
                      {/* Emoji */}
                      <div className='text-5xl transform group-hover:scale-110 transition-transform duration-300'>
                        {style.emoji}
                      </div>

                      {/* Category Name */}
                      <div className='text-center'>
                        <p className='text-white font-bold text-lg drop-shadow-lg'>
                          {category.name}
                        </p>
                      </div>
                    </div>

                    {/* Selection Ring */}
                    {selectedCategory === category.id && (
                      <div className='absolute inset-0 border-4 border-white rounded-3xl animate-pulse'></div>
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4'>
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
        </div> */}
      </div>
    </section>
  );
};

export default Category;
