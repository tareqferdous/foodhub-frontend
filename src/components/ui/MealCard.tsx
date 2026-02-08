"use client";

import { useCart } from "@/contexts/CartContext";
import { Meal } from "@/types/meal.type";
import Image from "next/image";
import Link from "next/link";

export default function MealCard({ meal }: { meal: Meal }) {
  const { addToCart } = useCart();

  console.log("meal", meal);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking Add to Cart
    addToCart({
      mealId: meal.id,
      title: meal.title,
      price: Number(meal.price),
      image: meal.image,
      providerId: meal.providerId,
      providerName: meal?.provider.restaurantName,
    });
  };

  // Calculate average rating if reviews exist
  const averageRating = meal.reviews?.length
    ? (
        meal.reviews.reduce((sum, review) => sum + review.rating, 0) /
        meal.reviews.length
      ).toFixed(1)
    : null;

  return (
    <div className='bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group h-full flex flex-col border border-gray-100 hover:border-[#e10101]/20'>
      <Link href={`/meals/${meal.id}`} className='flex-1 flex flex-col'>
        {/* Image Container */}
        <div className='relative h-56 overflow-hidden bg-gray-100'>
          <Image
            src={
              meal.image ||
              "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=250&fit=crop"
            }
            alt={meal.title}
            fill
            className='object-cover group-hover:scale-110 transition-transform duration-700'
          />

          {/* Overlay gradient */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

          {/* Badges */}
          <div className='absolute top-3 left-3 flex flex-col gap-2'>
            {meal.category && (
              <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/95 backdrop-blur-sm text-gray-900 shadow-lg'>
                {meal.category.name}
              </span>
            )}
            {meal.dietaryType && (
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${
                  meal.dietaryType === "VEG"
                    ? "bg-green-500/95 text-white"
                    : meal.dietaryType === "NON_VEG"
                      ? "bg-red-500/95 text-white"
                      : "bg-yellow-500/95 text-white"
                }`}>
                {meal.dietaryType === "VEG"
                  ? "🥬 Veg"
                  : meal.dietaryType === "NON_VEG"
                    ? "🍗 Non-Veg"
                    : "☪️ Halal"}
              </span>
            )}
          </div>

          {/* Availability badge */}
          {!meal.isAvailable && (
            <div className='absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center'>
              <span className='bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm'>
                Currently Unavailable
              </span>
            </div>
          )}

          {/* Rating Badge */}
          {averageRating && Number(averageRating) >= 4.0 && (
            <div className='absolute top-3 right-3'>
              <span className='inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#e10101] text-white shadow-lg'>
                <svg
                  className='w-3.5 h-3.5'
                  fill='currentColor'
                  viewBox='0 0 20 20'>
                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                </svg>
                {averageRating}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className='p-5 flex-1 flex flex-col'>
          {/* Title & Description */}
          <div className='flex-1'>
            <h3 className='font-bold text-lg text-gray-900 group-hover:text-[#e10101] transition-colors line-clamp-1 mb-2'>
              {meal.title}
            </h3>
            <p className='text-sm text-gray-600 line-clamp-2 leading-relaxed'>
              {meal.description}
            </p>
          </div>

          {/* Provider */}
          <div className='flex items-center mt-3 pt-3 border-t border-gray-100'>
            <div className='w-8 h-8 bg-gradient-to-br from-[#e10101] to-[#c00000] rounded-full flex items-center justify-center mr-2 flex-shrink-0'>
              <svg
                className='w-4 h-4 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                />
              </svg>
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-xs text-gray-500'>From</p>
              <p className='text-sm font-semibold text-gray-900 truncate'>
                {meal.provider.restaurantName}
              </p>
            </div>
          </div>

          {/* Reviews Summary */}
          {meal.reviews && meal.reviews.length > 0 && (
            <div className='flex items-center gap-3 mt-3 text-sm text-gray-600'>
              <div className='flex items-center gap-1'>
                <svg
                  className='w-4 h-4 text-yellow-400 fill-yellow-400'
                  viewBox='0 0 20 20'>
                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                </svg>
                <span className='font-semibold text-gray-900'>
                  {averageRating}
                </span>
              </div>
              <span className='text-gray-400'>•</span>
              <span>
                {meal.reviews.length}{" "}
                {meal.reviews.length === 1 ? "review" : "reviews"}
              </span>
            </div>
          )}

          {/* Price & Add to Cart */}
          <div className='flex items-center justify-between gap-3 mt-4 pt-4 border-t border-gray-100'>
            <div>
              <p className='text-xs text-gray-500 mb-0.5'>Price</p>
              <p className='text-2xl font-bold text-[#e10101]'>৳{meal.price}</p>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!meal.isAvailable}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 shadow-sm ${
                meal.isAvailable
                  ? "bg-[#e10101] hover:bg-[#c00000] text-white hover:shadow-lg hover:-translate-y-0.5"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}>
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                />
              </svg>
              Add
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
