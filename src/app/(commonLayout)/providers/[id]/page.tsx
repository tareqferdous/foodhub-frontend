import MealCard from "@/components/ui/MealCard";
import { providerService } from "@/service/provider.service";

interface Meal {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  dietaryType: string;
}

interface Provider {
  id: string;
  restaurantName: string;
  description?: string;
  address?: string;
  phone: string;
  meals?: Meal[];
}

// Sample data - replace with your actual data
const sampleProvider: Provider = {
  id: "1",
  restaurantName: "Bella Italia",
  description:
    "Authentic Italian cuisine prepared by master chefs with fresh ingredients imported directly from Italy. We pride ourselves on traditional recipes passed down through generations.",
  address: "Dhanmondi 27, Dhaka 1209",
  phone: "+880 1712-345678",
  meals: [
    {
      id: "1",
      title: "Pasta Carbonara",
      description: "Creamy pasta with bacon, eggs, and parmesan cheese",
      price: 450,
      category: "Main Course",
      dietaryType: "Non-Veg",
    },
    {
      id: "2",
      title: "Margherita Pizza",
      description:
        "Classic pizza with tomato sauce, mozzarella, and fresh basil",
      price: 650,
      category: "Pizza",
      dietaryType: "Vegetarian",
    },
    {
      id: "3",
      title: "Risotto ai Funghi",
      description: "Creamy mushroom risotto with white wine and parmesan",
      price: 550,
      category: "Main Course",
      dietaryType: "Vegetarian",
    },
    {
      id: "4",
      title: "Tiramisu",
      description: "Classic Italian dessert with coffee-soaked ladyfingers",
      price: 320,
      category: "Dessert",
      dietaryType: "Vegetarian",
    },
    {
      id: "5",
      title: "Lasagna Bolognese",
      description: "Layers of pasta with meat sauce and béchamel",
      price: 580,
      category: "Main Course",
      dietaryType: "Non-Veg",
    },
    {
      id: "6",
      title: "Caprese Salad",
      description: "Fresh mozzarella, tomatoes, and basil with olive oil",
      price: 380,
      category: "Appetizer",
      dietaryType: "Vegetarian",
    },
  ],
};

export default async function ProviderDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: provider } = await providerService.getProviderById(id);

  const providerInfo = provider?.data;

  const initial = providerInfo.restaurantName.charAt(0).toUpperCase();

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-rose-50'>
      <div className='fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20'>
        <div className='absolute top-10 right-10 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse' />
        <div className='absolute bottom-10 left-10 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000' />
      </div>

      <div className='relative z-10'>
        <div className='max-w-7xl mx-auto px-6 py-12'>
          <div className='bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100'>
            <div className='relative h-64 bg-gradient-to-br from-[#e10101] via-red-600 to-rose-600 overflow-hidden'>
              <div className='absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2' />
              <div className='absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2' />

              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='text-[200px] font-bold text-white/10 select-none leading-none'>
                  {initial}
                </div>
              </div>

              <div className='absolute bottom-8 left-8'>
                <div className='w-24 h-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center'>
                  <span className='text-5xl font-bold bg-gradient-to-br from-[#e10101] to-red-600 bg-clip-text text-transparent'>
                    {initial}
                  </span>
                </div>
              </div>
            </div>

            <div className='p-8 lg:p-12'>
              <div className='grid lg:grid-cols-2 gap-8'>
                <div className='space-y-6'>
                  <div>
                    <h1 className='text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
                      {providerInfo.restaurantName}
                    </h1>
                    {providerInfo.description && (
                      <p className='text-lg text-gray-600 leading-relaxed'>
                        {providerInfo.description}
                      </p>
                    )}
                  </div>

                  {/* <div className='flex gap-6 pt-4'>
                    <div className='text-center'>
                      <div className='text-3xl font-bold text-[#e10101] mb-1'>
                        {provider.meals?.length || 0}
                      </div>
                      <div className='text-sm text-gray-500'>খাবার</div>
                    </div>
                    <div className='w-px bg-gray-200' />
                    <div className='text-center'>
                      <div className='text-3xl font-bold text-[#e10101] mb-1'>
                        {categories.length - 1}
                      </div>
                      <div className='text-sm text-gray-500'>ক্যাটাগরি</div>
                    </div>
                    <div className='w-px bg-gray-200' />
                    <div className='text-center'>
                      <div className='text-3xl font-bold text-[#e10101] mb-1'>
                        4.8
                      </div>
                      <div className='text-sm text-gray-500'>রেটিং</div>
                    </div>
                  </div> */}
                </div>

                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                    যোগাযোগের তথ্য
                  </h3>

                  {providerInfo.address && (
                    <div className='flex items-start gap-4 p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border border-red-100'>
                      <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-[#e10101] to-red-600 p-0.5 flex-shrink-0'>
                        <div className='w-full h-full bg-white rounded-[11px] flex items-center justify-center'>
                          <svg
                            className='w-6 h-6 text-[#e10101]'
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
                        <p className='text-xs text-gray-500 mb-1 font-medium'>
                          ঠিকানা
                        </p>
                        <p className='text-gray-900 font-medium'>
                          {providerInfo.address}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className='flex items-start gap-4 p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border border-red-100'>
                    <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-[#e10101] to-red-600 p-0.5 flex-shrink-0'>
                      <div className='w-full h-full bg-white rounded-[11px] flex items-center justify-center'>
                        <svg
                          className='w-6 h-6 text-[#e10101]'
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
                      <p className='text-xs text-gray-500 mb-1 font-medium'>
                        ফোন
                      </p>
                      <a
                        href={`tel:${providerInfo.phone}`}
                        className='text-gray-900 font-medium hover:text-[#e10101] transition-colors'>
                        {providerInfo.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-12'>
            <div className='flex items-center justify-between mb-8'>
              <h2 className='text-3xl font-bold text-gray-900'>আমাদের খাবার</h2>

              <div></div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {providerInfo.meals?.map((meal, index) => (
                <div key={meal.id}>
                  <MealCard meal={meal} />{" "}
                  {/* <Link
                    key={meal.id}
                    href={`/meals/${meal.id}`}
                    className='group'
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                    }}>
                    <div className='h-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100'>
                      <div className='relative h-32 bg-gradient-to-br from-[#e10101] via-red-600 to-rose-600 overflow-hidden'>
                        <div className='absolute inset-0 flex items-center justify-center'>
                          <div className='text-6xl font-bold text-white/20 select-none'>
                            {meal.title.charAt(0).toUpperCase()}
                          </div>
                        </div>

                        <div className='absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full'>
                          <span className='text-xs font-semibold text-gray-800'>
                            {meal.category}
                          </span>
                        </div>

                        <div className='absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-green-200'>
                          <span className='text-xs font-medium text-green-700'>
                            {meal.dietaryType}
                          </span>
                        </div>
                      </div>

                      <div className='p-5 space-y-3'>
                        <div>
                          <h3 className='text-xl font-bold text-gray-900 mb-2 group-hover:text-[#e10101] transition-colors'>
                            {meal.title}
                          </h3>
                          <p className='text-sm text-gray-600 leading-relaxed line-clamp-2'>
                            {meal.description}
                          </p>
                        </div>

                        <div className='flex items-center justify-between pt-3 border-t border-gray-100'>
                          <div>
                            <p className='text-xs text-gray-500 mb-1'>মূল্য</p>
                            <p className='text-2xl font-bold text-[#e10101]'>
                              ৳{meal.price}
                            </p>
                          </div>
                          <button className='bg-gradient-to-r from-[#e10101] to-red-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:scale-105 active:scale-100 transition-all duration-300 text-sm'>
                            অর্ডার করুন
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
