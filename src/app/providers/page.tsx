import ProviderCard from "@/components/ui/ProviderCard";
import { providerService } from "@/service/provider.service";

interface Provider {
  id: string;
  restaurantName: string;
  description?: string;
  address?: string;
  phone: string;
  meals?: string[];
}

// Generate unique gradient for each provider
export const getProviderGradient = (index: number) => {
  const gradients = [
    "from-[#e10101] via-red-600 to-rose-600",
    "from-[#e10101] via-orange-500 to-amber-500",
    "from-red-600 via-[#e10101] to-pink-500",
    "from-[#e10101] via-red-500 to-orange-600",
    "from-rose-600 via-[#e10101] to-red-700",
    "from-[#e10101] via-rose-500 to-pink-600",
    "from-orange-600 via-[#e10101] to-red-500",
    "from-red-700 via-[#e10101] to-rose-500",
  ];

  return gradients[index % gradients.length];
};

export default async function AllProviders() {
  const providers = await providerService.getAllProviders();
  const sampleProviders = providers?.data?.data || [];

  return (
    <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='flex items-center justify-between py-10'>
        <div>
          <h2 className='text-4xl font-bold font-display text-gray-900 mb-3'>
            All Providers
          </h2>
          <p className='text-gray-600 text-lg'>
            Best rated restaurants in your area
          </p>
        </div>
        <div>
          <h3 className='text-xl font-bold'>
            Number of Providers: {sampleProviders.length}
          </h3>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-5'>
        {sampleProviders.map((provider, index) => {
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
    </main>
  );
}
