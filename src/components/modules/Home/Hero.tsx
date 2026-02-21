import { Flame, Play, Star, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  const videoUrl = "#features"; // Replace with your video link later

  return (
    <section
      className='relative overflow-hidden py-16 mt-8 px-6 lg:px-20'
      style={{ height: "calc(100vh - 100px)" }}>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12'>
          {/* Left Content */}
          <div className='flex-1 space-y-4 lg:space-y-6 z-10 order-2 lg:order-1'>
            {/* Badge */}
            <div className='inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium'>
              More than Faster
              <TrendingUp className='w-4 h-4' />
            </div>

            {/* Heading */}
            <h1 className='text-5xl lg:text-6xl font-bold leading-normal'>
              Fast, Fresh
              <br />& Right{" "}
              <span className='text-gray-900  font-serif'>To Your Door</span>
            </h1>
            {/* Description */}
            <p className='text-gray-600 text-lg max-w-md'>
              Our job is to filling your tummy with delicious food and with fast
              and free delivery
            </p>

            {/* Buttons */}
            <div className='flex flex-wrap gap-4 pt-4'>
              <Link href='/meals'>
                <button className='btn-outline text-red-600 px-8 py-3.5 rounded-full font-semibold transition-all duration-200 shadow-lg shadow-red-200 cursor-pointer'>
                  Get Started
                </button>
              </Link>
              <Link href='https://drive.google.com/file/d/1xlY3Gy5slJsYXCQw1dD_dZZhn3w8DAxJ/view?usp=sharing' target='_blank'>
                <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-3.5 rounded-full font-semibold flex items-center gap-2 transition-all duration-200 shadow-lg shadow-yellow-200 cursor-pointer'>
                  <Play className='w-5 h-5 fill-current' />
                  Watch Video
                </button>
              </Link>
            </div>
          </div>

          {/* Right Image Section */}
          <div className='shrink-0 flex items-center justify-center order-1 lg:order-2'>
            {/* Decorative Elements */}
            <div className='absolute top-4 right-4 sm:top-8 sm:right-8 lg:top-12 lg:right-16 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-yellow-400 rounded-2xl rotate-12 flex items-center justify-center shadow-xl z-20'>
              <Flame className='w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white' />
            </div>

            {/* Main Food Image Container */}
            <div className='relative w-112.5 h-112.5 bg-linear-to-br from-gray-900 to-black rounded-full shadow-2xl'>
              {/* Food Bowl Image - Replace with actual image */}
              <div className='absolute inset-0 rounded-full overflow-hidden flex items-center justify-center'>
                <div className='w-full h-full bg-linear-to-br from-orange-400 via-red-500 to-green-500 rounded-full opacity-30'></div>
                <div className='absolute inset-2 bg-white rounded-full flex items-center justify-center text-gray-400'>
                  <div className='absolute inset-0 rounded-full overflow-hidden'>
                    <Image
                      src='https://images.unsplash.com/photo-1700835880331-c90ecb937e8d?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                      alt='Delicious Salad Bowl'
                      width={450}
                      height={450}
                      className='w-full h-full object-cover'
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Chef Card */}

              {/* Italian Pizza Card */}
              <div className='absolute bottom-8 -right-6 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-3 z-30'>
                <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-orange-300 to-orange-500 flex items-center justify-center'>
                  🍕
                </div>
                <div>
                  <p className='font-semibold text-sm text-gray-900'>
                    Italian Pizza
                  </p>
                  <div className='flex items-center gap-1'>
                    <Star className='w-3 h-3 text-yellow-400 fill-current' />
                    <Star className='w-3 h-3 text-yellow-400 fill-current' />
                    <Star className='w-3 h-3 text-yellow-400 fill-current' />
                    <Star className='w-3 h-3 text-gray-300 fill-current' />
                    <Star className='w-3 h-3 text-gray-300 fill-current' />
                  </div>
                </div>
                <div className='font-bold text-gray-900'>₹7.49</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
