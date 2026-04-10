import AddToCartButton from "@/components/modules/customer/AddToCartButton";
import ShareMealButton from "@/components/modules/customer/ShareMealButton";
import { mealService } from "@/service/meal.service";
import { Meal } from "@/types/meal.type";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Review = {
  id: string;
  rating: number;
  comment: string;
  mealId: string;
  orderId: string;
  createdAt: string;
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1200&h=900&fit=crop";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const MealDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { data: mealResponse, error } = await mealService.getMealById(id);

  if (error || !mealResponse?.data) {
    notFound();
  }

  const meal = mealResponse.data;
  const {
    provider,
    category,
    title,
    description,
    dietaryType,
    image,
    price,
    reviews = [],
  } = meal;

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (sum: number, review: Review) => sum + review.rating,
            0,
          ) / reviews.length
        ).toFixed(1)
      : null;

  const relatedResponse = await mealService.getMeals({
    cuisine: category?.name,
    limit: "4",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const relatedMeals: Meal[] = (relatedResponse?.data?.data?.meals || [])
    .filter((item: Meal) => item.id !== id)
    .slice(0, 3);

  const providerName = provider?.restaurantName || "FoodHub Kitchen";
  const displayImage = image || FALLBACK_IMAGE;

  return (
    <div className='min-h-screen bg-[#F4F1EC]'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12'>
        <nav className='mb-6 flex items-center gap-2 text-sm'>
          <Link
            href='/'
            className='text-neutral-500 hover:text-neutral-900 transition-colors'>
            Home
          </Link>
          <span className='text-neutral-300'>/</span>
          <Link
            href='/meals'
            className='text-neutral-500 hover:text-neutral-900 transition-colors'>
            Meals
          </Link>
          <span className='text-neutral-300'>/</span>
          <span className='text-neutral-900 truncate'>{title}</span>
        </nav>

        <div className='grid lg:grid-cols-12 items-start gap-8 lg:gap-10'>
          <section className='lg:col-span-7 space-y-4'>
            <div className='relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm'>
              <Image
                src={displayImage}
                alt={title}
                fill
                className='object-cover'
                priority
              />
            </div>

            <div className='grid grid-cols-3 gap-3'>
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className='relative h-24 sm:h-28 rounded-xl overflow-hidden border border-gray-100 bg-white'>
                  <Image
                    src={displayImage}
                    alt={`${title} preview ${index + 1}`}
                    fill
                    className='object-cover'
                  />
                </div>
              ))}
            </div>
          </section>

          <section className='lg:col-span-5 lg:sticky lg:top-24 space-y-4'>
            <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5 lg:p-6'>
              <p className='text-sm uppercase tracking-wider text-gray-500 mb-2'>
                {providerName}
              </p>
              <h1 className='text-3xl lg:text-5xl font-semibold text-gray-900 leading-tight mb-4'>
                {title}
              </h1>

              <div className='flex flex-wrap items-center gap-2 mb-6'>
                {category?.name && (
                  <span className='px-3 py-1 text-xs font-semibold rounded-full bg-red-50 text-red-700 border border-red-100'>
                    {category.name}
                  </span>
                )}
                {dietaryType && (
                  <span className='px-3 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100'>
                    {dietaryType}
                  </span>
                )}
                {avgRating && (
                  <span className='inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-amber-50 text-amber-700 border border-amber-100'>
                    <Star className='w-3.5 h-3.5 fill-amber-500 text-amber-500' />
                    {avgRating} ({reviews.length})
                  </span>
                )}
              </div>

              <div className='mb-6'>
                <p className='text-sm text-gray-500 mb-1'>Price</p>
                <p className='text-5xl font-bold text-gray-900'>
                  ৳ {Number(price).toFixed(2)}
                </p>
              </div>

              <div className='grid sm:grid-cols-2 gap-3'>
                <AddToCartButton
                  mealId={id}
                  price={Number(price)}
                  title={title}
                  image={displayImage}
                  providerName={providerName}
                  providerId={provider?.id || ""}
                />
                <ShareMealButton title={title} />
              </div>
            </div>

            <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5 lg:p-6'>
              <h2 className='text-lg font-semibold text-gray-900 mb-2'>
                Overview / Description
              </h2>
              <p className='text-gray-700 leading-relaxed text-sm'>
                {description ||
                  "No additional description is available for this meal right now."}
              </p>
            </div>

            <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5 lg:p-6'>
              <h2 className='text-lg font-semibold text-gray-900 mb-3'>
                Key Information / Specs / Rules
              </h2>
              <div className='grid grid-cols-2 gap-3'>
                <div className='rounded-xl bg-gray-50 p-3'>
                  <p className='text-[11px] uppercase tracking-wide text-gray-500 mb-1'>
                    Category
                  </p>
                  <p className='font-medium text-gray-900 text-sm'>
                    {category?.name || "N/A"}
                  </p>
                </div>
                <div className='rounded-xl bg-gray-50 p-3'>
                  <p className='text-[11px] uppercase tracking-wide text-gray-500 mb-1'>
                    Dietary
                  </p>
                  <p className='font-medium text-gray-900 text-sm'>
                    {dietaryType || "N/A"}
                  </p>
                </div>
                <div className='rounded-xl bg-gray-50 p-3'>
                  <p className='text-[11px] uppercase tracking-wide text-gray-500 mb-1'>
                    Provider
                  </p>
                  <p className='font-medium text-gray-900 text-sm'>
                    {providerName}
                  </p>
                </div>
                <div className='rounded-xl bg-gray-50 p-3'>
                  <p className='text-[11px] uppercase tracking-wide text-gray-500 mb-1'>
                    Reviews
                  </p>
                  <p className='font-medium text-gray-900 text-sm'>
                    {reviews.length}
                  </p>
                </div>
              </div>
              <ul className='mt-4 text-sm text-gray-600 space-y-1'>
                <li>Prices may vary by provider availability.</li>
                <li>Check dietary details if you have restrictions.</li>
                <li>Order acceptance depends on provider capacity.</li>
              </ul>
            </div>
          </section>
        </div>

        <div className='mt-8 grid lg:grid-cols-12 gap-6'>
          <section className='lg:col-span-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6'>
            <h2 className='text-xl font-semibold text-gray-900 mb-4'>
              Rating / Reviews / Feedback
            </h2>

            {avgRating ? (
              <div className='mb-5 flex items-center gap-3'>
                <span className='text-3xl font-bold text-gray-900'>
                  {avgRating}
                </span>
                <div className='flex items-center gap-1'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(Number(avgRating))
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className='text-sm text-gray-500'>
                  ({reviews.length} reviews)
                </span>
              </div>
            ) : (
              <p className='text-sm text-gray-500 mb-5'>No rating yet.</p>
            )}

            <div className='space-y-4'>
              {reviews.length > 0 ? (
                reviews.map((review: Review) => (
                  <div
                    key={review.id}
                    className='rounded-xl border border-gray-100 p-4'>
                    <div className='flex items-start justify-between mb-2'>
                      <div className='text-sm text-gray-500'>
                        {formatDate(review.createdAt)}
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
                    <p className='text-gray-700 text-sm'>
                      {review.comment || "No comment"}
                    </p>
                  </div>
                ))
              ) : (
                <p className='text-gray-600 text-sm'>No reviews yet.</p>
              )}
            </div>
          </section>

          <section className='lg:col-span-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-6'>
            <h2 className='text-xl font-semibold text-gray-900 mb-4'>
              Related / Suggested Items
            </h2>

            {relatedMeals.length > 0 ? (
              <div className='space-y-3'>
                {relatedMeals.map((relatedMeal) => (
                  <Link
                    key={relatedMeal.id}
                    href={`/meals/${relatedMeal.id}`}
                    className='flex items-center gap-3 rounded-xl border border-gray-100 p-2 hover:shadow-sm transition-shadow'>
                    <div className='relative h-16 w-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0'>
                      <Image
                        src={relatedMeal.image || FALLBACK_IMAGE}
                        alt={relatedMeal.title}
                        fill
                        className='object-cover'
                      />
                    </div>
                    <div className='min-w-0'>
                      <h3 className='font-semibold text-gray-900 text-sm truncate'>
                        {relatedMeal.title}
                      </h3>
                      <p className='text-xs text-gray-500 truncate'>
                        {relatedMeal.category?.name || category?.name || "Meal"}
                      </p>
                      <p className='text-[#e10101] font-semibold text-sm mt-1'>
                        ৳ {Number(relatedMeal.price).toFixed(2)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className='text-sm text-gray-600'>
                No related meals found right now.
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default MealDetails;
