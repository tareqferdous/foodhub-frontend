import Image from "next/image";

const Features = () => {
  return (
    <section className='bg-gray-50 pt-10 pb-20 px-6'>
      <div className='max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
          <div className='flex flex-col items-center text-center group'>
            <div className='flex items-center justify-center w-56 h-44 mb-6'>
              <Image
                src='https://foodibd.com/_next/static/media/delivery.be81f682.svg'
                alt='Wide Range of Meals'
                width={180}
                height={140}
                className='object-contain'
              />
            </div>
            <h3 className='text-xl font-bold text-gray-900 mb-3'>
              Super fast Delivery
            </h3>
            <p className='text-gray-500 text-sm leading-relaxed max-w-xs'>
              Faster than your cravings can blink. Experience the super-fast
              delivery and get fresh food.
            </p>
          </div>

          <div className='flex flex-col items-center text-center group'>
            <div className='flex items-center justify-center w-56 h-44 mb-6'>
              <Image
                src='https://foodibd.com/_next/static/media/location.bf59f976.svg'
                alt='Wide Range of Meals'
                width={100}
                height={100}
                className='object-contain'
              />
            </div>
            <h3 className='text-xl font-bold text-gray-900 mb-3'>
              Live Order Tracking
            </h3>
            <p className='text-gray-500 text-sm leading-relaxed max-w-xs'>
              Track your order while it is delivered to your doorstep from the
              restaurant.
            </p>
          </div>

          <div className='flex flex-col items-center text-center group'>
            <div className='flex items-center justify-center w-56 h-44 mb-6'>
              <Image
                src='https://foodibd.com/_next/static/media/mobile.73da0fee.svg'
                alt='Wide Range of Meals'
                width={120}
                height={120}
                className='object-contain'
              />
            </div>
            <h3 className='text-xl font-bold text-gray-900 mb-3'>
              Your Favorite Restaurants
            </h3>
            <p className='text-gray-500 text-sm leading-relaxed max-w-xs'>
              Find the best and nearest top your favorite restaurants from your
              selected location.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
