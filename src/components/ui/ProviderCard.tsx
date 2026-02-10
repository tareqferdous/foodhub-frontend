import { Meal } from "@/types/meal.type";
import Link from "next/link";

// export interface ProviderCardProps {
//   provider: {
//     id: string;
//     restaurantName: string;
//     description?: string;
//     address?: string;
//     phone: string;
//     meals?: string[];
//   };
// }

export type ProviderCardProps = {
  provider: {
    id: string;
    restaurantName: string;
    description?: string;
    address?: string;
    phone: string;
    meals?: Meal[];
  };
  gradient: string;
  initial: string;
};

export default function ProviderCard({
  provider,
  gradient,
  initial,
}: ProviderCardProps & { gradient: string; initial: string }) {
  return (
    <Link
      key={provider.id}
      href={`/providers/${provider.id}`}
      className='group block animate-fade-in-up'>
      <div className='h-full bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100'>
        {/* Gradient Header with Initial */}
        <div
          className={`relative h-24 bg-gradient-to-br ${gradient} overflow-hidden`}>
          {/* Abstract decorative circles */}
          <div className='absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2' />
          <div className='absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2' />

          {/* Large watermark initial */}
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='text-7xl font-bold text-white/20 select-none'>
              {initial}
            </div>
          </div>

          {/* Restaurant Initial Badge */}
          <div className='absolute bottom-4 left-4 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
            <span
              className={`text-3xl font-bold bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}>
              {initial}
            </span>
          </div>

          {/* Meals Count Badge */}
          {provider.meals && provider.meals.length > 0 && (
            <div className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg'>
              <span className='text-sm font-semibold text-gray-800'>
                {provider.meals.length} meals
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className='py-3 px-6 space-y-4'>
          {/* Restaurant Name */}
          <div>
            <h3 className='text-2xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#e10101] group-hover:to-red-600 group-hover:bg-clip-text transition-all duration-300'>
              {provider.restaurantName}
            </h3>
            {provider.description && (
              <p className='text-gray-600 text-sm leading-relaxed line-clamp-2'>
                {provider.description}
              </p>
            )}
          </div>

          {/* Contact Info */}
          <div className='space-y-3 pt-2'>
            {provider.address && (
              <div className='flex items-start gap-3'>
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} p-0.5 flex-shrink-0`}>
                  <div className='w-full h-full bg-white rounded-[10px] flex items-center justify-center'>
                    <svg
                      className='w-5 h-5 text-gray-700'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'>
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
                  </div>
                </div>
                <div className='flex-1 pt-1'>
                  <p className='text-xs text-gray-500 mb-0.5'>Address</p>
                  <p className='text-sm text-gray-800 font-medium'>
                    {provider.address}
                  </p>
                </div>
              </div>
            )}

            <div className='flex items-start gap-3'>
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} p-0.5 flex-shrink-0`}>
                <div className='w-full h-full bg-white rounded-[10px] flex items-center justify-center'>
                  <svg
                    className='w-5 h-5 text-gray-700'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                    />
                  </svg>
                </div>
              </div>
              <div className='flex-1 pt-1'>
                <p className='text-xs text-gray-500 mb-0.5'>Phone</p>
                <p className='text-sm text-gray-800 font-medium'>
                  {provider.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Meals Preview */}
          {provider.meals && provider.meals.length > 0 && (
            <div className='pt-2 border-t border-gray-100'>
              <p className='text-xs text-gray-500 mb-3'>Popular Meal</p>
              <div className='flex flex-wrap gap-2'>
                {provider.meals.slice(0, 1).map((meal, idx) => (
                  <span
                    key={idx}
                    className='inline-flex items-center px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-xs font-medium border border-gray-200'>
                    {meal.title}
                  </span>
                ))}
                {provider.meals.length > 1 && (
                  <span className='inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium'>
                    +{provider.meals.length - 1} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
