// Import your improved MealCard component
import MealCard from "@/components/ui/MealCard";
import { providerService } from "@/service/provider.service";
import { notFound } from "next/navigation";

interface Meal {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string | null;
  category: {
    id: string;
    name: string;
  };
  dietaryType: string;
  isAvailable: boolean;
  providerId: string;
  provider: {
    restaurantName: string;
  };
  reviews: any[];
  createdAt: string;
}

interface Provider {
  id: string;
  restaurantName: string;
  description?: string;
  address?: string;
  phone: string;
  meals?: Meal[];
  orders?: any[];
  createdAt: string;
}

export default async function ProviderDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: provider, error } = await providerService.getProviderById(id);

  const providerInfo: Provider = provider?.data;

  if (error || !providerInfo) {
    notFound();
  }

  const initial = providerInfo.restaurantName.charAt(0).toUpperCase();

  // Calculate stats
  const totalMeals = providerInfo.meals?.length || 0;
  const availableMeals =
    providerInfo.meals?.filter((m) => m.isAvailable).length || 0;
  const totalOrders = providerInfo.orders?.length || 0;

  console.log("providerInfo.meals", providerInfo.meals);

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <div className='bg-white border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Header with gradient background */}
          <div className='relative h-48 sm:h-64 bg-gradient-to-br from-[#e10101] via-[#c00000] to-[#a00000] rounded-b-3xl overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8'>
            {/* Decorative elements */}
            <div className='absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2' />
            <div className='absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2' />

            {/* Large initial in background */}
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='text-[180px] sm:text-[220px] font-bold text-white/10 select-none leading-none'>
                {initial}
              </div>
            </div>
          </div>

          {/* Provider Info Card - Overlapping header */}
          <div className='relative -mt-20 sm:-mt-24 pb-8'>
            <div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8'>
              <div className='flex flex-col sm:flex-row gap-6'>
                {/* Restaurant Icon */}
                <div className='w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#e10101] to-[#c00000] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg'>
                  <span className='text-3xl sm:text-4xl font-bold text-white'>
                    {initial}
                  </span>
                </div>

                {/* Restaurant Details */}
                <div className='flex-1 min-w-0'>
                  <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2'>
                    {providerInfo.restaurantName}
                  </h1>
                  {providerInfo.description && (
                    <p className='text-gray-600 text-sm sm:text-base leading-relaxed mb-4'>
                      {providerInfo.description}
                    </p>
                  )}

                  {/* Contact Info */}
                  <div className='flex flex-wrap gap-4 text-sm'>
                    {providerInfo.address && (
                      <div className='flex items-center gap-2 text-gray-700'>
                        <svg
                          className='w-5 h-5 text-[#e10101] flex-shrink-0'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                          />
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                          />
                        </svg>
                        <span className='truncate'>{providerInfo.address}</span>
                      </div>
                    )}
                    <div className='flex items-center gap-2 text-gray-700'>
                      <svg
                        className='w-5 h-5 text-[#e10101] flex-shrink-0'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                        />
                      </svg>
                      <a
                        href={`tel:${providerInfo.phone}`}
                        className='hover:text-[#e10101] transition-colors font-medium'>
                        {providerInfo.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className='flex sm:flex-col gap-3 sm:gap-4'>
                  <div className='bg-gradient-to-br from-[#e10101] to-[#c00000] rounded-xl p-4 text-white text-center min-w-[100px] shadow-lg'>
                    <p className='text-2xl sm:text-3xl font-bold'>
                      {totalMeals}
                    </p>
                    <p className='text-xs sm:text-sm opacity-90 mt-1'>
                      Total Meals
                    </p>
                  </div>
                  <div className='bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white text-center min-w-[100px] shadow-lg'>
                    <p className='text-2xl sm:text-3xl font-bold'>
                      {availableMeals}
                    </p>
                    <p className='text-xs sm:text-sm opacity-90 mt-1'>
                      Available
                    </p>
                  </div>
                  {totalOrders > 0 && (
                    <div className='bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white text-center min-w-[100px] shadow-lg'>
                      <p className='text-2xl sm:text-3xl font-bold'>
                        {totalOrders}
                      </p>
                      <p className='text-xs sm:text-sm opacity-90 mt-1'>
                        Orders
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meals Section */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
        {/* Section Header */}
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h2 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-2'>
              Our Menu
            </h2>
            <p className='text-gray-600 text-sm sm:text-base'>
              {availableMeals} of {totalMeals} meals currently available
            </p>
          </div>

          {/* Filter buttons could go here */}
          <div className='hidden sm:flex gap-2 bg-white rounded-lg p-1 shadow-sm border border-gray-200'>
            <button className='px-4 py-2 rounded-md text-sm font-semibold bg-[#e10101] text-white'>
              All
            </button>
            <button className='px-4 py-2 rounded-md text-sm font-semibold text-gray-600 hover:text-gray-900'>
              Available
            </button>
          </div>
        </div>

        {/* Meals Grid */}
        {!providerInfo.meals || providerInfo.meals.length === 0 ? (
          <div className='text-center py-16'>
            <div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg
                className='w-10 h-10 text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
                />
              </svg>
            </div>
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>
              No meals available yet
            </h3>
            <p className='text-gray-600'>
              This restaurant has not added any meals to their menu.
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {providerInfo.meals.map((meal) => (
              <MealCard
                key={meal.id}
                meal={{
                  ...meal,
                  image: meal.image ?? undefined,
                  provider: {
                    restaurantName: providerInfo.restaurantName,
                  },
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Additional Info Section (Optional) */}
      {providerInfo.description && (
        <div className='bg-white border-t border-gray-200 mt-12'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
            <div className='max-w-3xl'>
              <h3 className='text-xl font-bold text-gray-900 mb-4'>About Us</h3>
              <p className='text-gray-600 leading-relaxed'>
                {providerInfo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
