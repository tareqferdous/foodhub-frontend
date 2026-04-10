export default function Newsletter() {
  return (
    <section
      id='newsletter'
      className='py-16 bg-gradient-to-r from-red-600 to-orange-500'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        <h2 className='text-3xl md:text-4xl font-bold text-white'>
          Get Weekly Offers and Food Updates
        </h2>
        <p className='text-red-50 mt-3 text-lg'>
          Subscribe to receive new discounts, featured restaurants, and meal
          recommendations.
        </p>

        <form className='mt-7 flex flex-col sm:flex-row gap-3 justify-center'>
          <input
            type='email'
            placeholder='Enter your email address'
            className='w-full sm:w-[360px] rounded-xl border border-white/30 bg-white px-4 py-3 text-gray-900 outline-none'
          />
          <button
            type='button'
            className='rounded-xl bg-gray-900 text-white px-6 py-3 font-semibold hover:bg-black transition'>
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
