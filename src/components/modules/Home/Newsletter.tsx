export default function Newsletter() {
  return (
    <section id='newsletter' className='bg-gray-50 py-14 md:py-16'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='overflow-hidden rounded-3xl bg-linear-to-r from-[#e10101] via-red-600 to-[#c00000] px-6 py-12 text-center shadow-xl sm:px-10 md:py-14'>
          <h2 className='text-3xl font-bold text-white md:text-4xl'>
            Get Weekly Offers and Food Updates
          </h2>
          <p className='mx-auto mt-3 max-w-2xl text-base text-red-50 md:text-lg'>
            Subscribe to receive new discounts, featured restaurants, and meal
            recommendations.
          </p>

          <form className='mx-auto mt-8 flex w-full max-w-2xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-center'>
            <input
              type='email'
              placeholder='Enter your email address'
              className='w-full rounded-xl border border-white/35 bg-white/95 px-4 py-3 text-gray-900 placeholder:text-gray-500 outline-none focus:border-white focus:ring-2 focus:ring-white/60'
            />
            <button
              type='button'
              className='rounded-xl bg-white px-6 py-3 font-semibold text-[#c00000] transition hover:bg-red-50'>
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
