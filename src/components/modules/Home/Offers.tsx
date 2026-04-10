import Link from "next/link";

const offers = [
  {
    title: "Free Delivery Friday",
    description:
      "Get free delivery on selected restaurants every Friday evening.",
    tag: "Weekly Offer",
  },
  {
    title: "Combo Deals Under ৳499",
    description: "Curated meal combos for budget-friendly group orders.",
    tag: "Popular",
  },
  {
    title: "First Order Bonus",
    description: "New users receive instant discount on their first checkout.",
    tag: "New User",
  },
];

export default function Offers() {
  return (
    <section id='offers' className='py-16 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-end justify-between mb-10'>
          <div>
            <h2 className='text-4xl font-bold font-display text-gray-900'>
              Special Offers
            </h2>
            <p className='text-gray-600 mt-3 text-lg'>
              Save more on your favorite meals every week.
            </p>
          </div>
          <Link href='/meals' className='btn-outline hidden md:inline-flex'>
            Grab Deals
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          {offers.map((offer) => (
            <article
              key={offer.title}
              className='rounded-3xl p-6 border border-red-100 bg-gradient-to-br from-rose-50 via-white to-orange-50 shadow-sm'>
              <span className='inline-flex rounded-full px-3 py-1 text-xs font-semibold bg-red-100 text-red-700'>
                {offer.tag}
              </span>
              <h3 className='mt-4 text-xl font-bold text-gray-900'>
                {offer.title}
              </h3>
              <p className='mt-2 text-gray-600 leading-relaxed'>
                {offer.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
