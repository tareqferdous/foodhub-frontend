import { mealService } from "@/service/meal.service";
import { reviewService } from "@/service/review.service";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MealDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { data: meal } = await mealService.getMealById(id);
  const mealReviews = await reviewService.getMealReviews(id);

  const {
    provider,
    category,
    title,
    description,
    dietaryType,
    image,
    price,
    reviews,
  } = meal.data;

  const quantity = 1;

  return (
    <>
      <div className='min-h-screen bg-[#FAF7F2] relative overflow-hidden'>
        {/* Decorative background elements */}
        <div className='absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-amber-200/20 to-orange-300/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2' />
        <div className='absolute bottom-0 left-0 w-96 h-96 bg-linear-to-tr from-rose-200/20 to-amber-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2' />

        <div className='relative max-w-7xl mx-auto px-6 py-12 lg:py-20'>
          {/* Breadcrumb */}
          <nav className='mb-8 flex items-center gap-2 text-sm'>
            <Link
              href='/'
              className='text-neutral-500 hover:text-neutral-900 transition-colors font-light tracking-wide'>
              Home
            </Link>
            <span className='text-neutral-300'>/</span>
            <Link
              href='/meals'
              className='text-neutral-500 hover:text-neutral-900 transition-colors font-light tracking-wide'>
              Meals
            </Link>
            <span className='text-neutral-300'>/</span>
            <span className='text-neutral-900 font-light tracking-wide'>
              {title}
            </span>
          </nav>

          <div className='grid lg:grid-cols-2 gap-16 lg:gap-20'>
            {/* Image Section */}
            <div className='relative group'>
              <div className='absolute inset-0 bg-linear-to-br from-amber-400/20 to-rose-400/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700 -z-10' />
              <div className='relative aspect-square rounded-3xl overflow-hidden shadow-2xl border border-white/50'>
                <Image
                  src={
                    image ||
                    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800"
                  }
                  alt={title}
                  fill
                  className='object-cover transition-transform duration-700 group-hover:scale-105'
                />

                {/* Floating badge */}
                <div className='absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-5 py-2 rounded-full shadow-lg border border-amber-100'>
                  <span className='text-sm font-light tracking-wider text-neutral-800'>
                    {category.name}
                  </span>
                </div>
              </div>

              {/* Decorative corner accent */}
              <div className='absolute -bottom-4 -left-4 w-32 h-32 bg-linear-to-br from-amber-300 to-orange-400 rounded-2xl opacity-10 -z-20 rotate-12' />
            </div>

            {/* Content Section */}
            <div className='flex flex-col justify-center space-y-8'>
              {/* Provider tag */}
              <div className='inline-flex items-center gap-2 self-start'>
                <div className='w-2 h-2 bg-amber-500 rounded-full animate-pulse' />
                <span className='text-sm font-light tracking-[0.2em] uppercase text-neutral-600'>
                  {provider.name}
                </span>
              </div>

              {/* Title */}
              <div>
                <h1 className='text-5xl lg:text-6xl font-light text-neutral-900 mb-4 leading-tight tracking-tight'>
                  {title}
                </h1>
                <div className='flex items-center gap-3'>
                  <span className='inline-block px-4 py-1.5 bg-linear-to-r from-emerald-50 to-teal-50 text-emerald-700 rounded-full text-xs font-medium tracking-wide border border-emerald-100'>
                    {dietaryType.name}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className='text-lg text-neutral-600 leading-relaxed font-light max-w-xl'>
                {description}
              </p>

              {/* Divider */}
              <div className='w-full h-px bg-linear-to-r from-transparent via-neutral-200 to-transparent' />

              {/* Price and quantity */}
              <div className='flex items-end gap-8'>
                <div>
                  <span className='block text-sm font-light tracking-wider text-neutral-500 mb-2 uppercase'>
                    Price
                  </span>
                  <div className='flex items-baseline gap-2'>
                    <span className='text-5xl font-light text-neutral-900'>
                      {Number(price).toFixed(2)}
                    </span>
                    <span className='text-neutral-400 font-light'>
                      per serving
                    </span>
                  </div>
                </div>

                <div>
                  <span className='block text-sm font-light tracking-wider text-neutral-500 mb-3 uppercase'>
                    Quantity
                  </span>
                  <div className='flex items-center gap-3 bg-white rounded-2xl border border-neutral-200 p-1.5 shadow-sm'>
                    <button className='w-10 h-10 flex items-center justify-center rounded-xl hover:bg-neutral-50 transition-colors text-neutral-700'>
                      <svg
                        className='w-4 h-4'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M20 12H4'
                        />
                      </svg>
                    </button>
                    <span className='w-12 text-center font-light text-lg text-neutral-900'>
                      {quantity}
                    </span>
                    <button className='w-10 h-10 flex items-center justify-center rounded-xl hover:bg-neutral-50 transition-colors text-neutral-700'>
                      <svg
                        className='w-4 h-4'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M12 4v16m8-8H4'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className='flex items-baseline gap-3 pt-4'>
                <span className='text-sm font-light tracking-wider text-neutral-500 uppercase'>
                  Total
                </span>
                <span className='text-3xl font-light text-neutral-900'>
                  ${(price * quantity).toFixed(2)}
                </span>
              </div>

              {/* Action buttons */}

              <button className='btn-primary w-full flex items-center justify-center gap-2'>
                <ShoppingCart className='w-5 h-5' />
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className='mt-12 max-w-7xl px-6'>
          <h2 className='text-2xl font-bold mb-6'>Customer Reviews</h2>
          <div className='space-y-4'>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className='card p-6'>
                  <div className='flex items-start justify-between mb-3'>
                    <div>
                      <div className='font-semibold'>{review.userName}</div>
                      <div className='text-sm text-gray-500'>{review.date}</div>
                    </div>
                    <div className='flex items-center gap-1'>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className='text-gray-700'>{review.comment}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MealDetails;
