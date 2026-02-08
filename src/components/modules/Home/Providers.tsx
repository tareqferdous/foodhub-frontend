import { getProviderGradient } from "@/app/(commonLayout)/providers/page";
import ProviderCard from "@/components/ui/ProviderCard";
import { providerService } from "@/service/provider.service";
import Link from "next/link";

const Providers = async () => {
  const providers = await providerService.getAllProviders();
  const providersList = providers?.data?.data || [];

  console.log("providers", providers);
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

        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {providersList.map((provider, index) => {
            const gradient = getProviderGradient(index);
            const initial = provider.restaurantName.charAt(0).toUpperCase();

            return (
              <ProviderCard
                key={provider.id}
                provider={provider}
                gradient={gradient}
                initial={initial}
              />
            );
          })}
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
