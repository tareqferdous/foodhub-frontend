import Link from "next/link";

const faqs = [
  {
    q: "How long does delivery usually take?",
    a: "Most orders are delivered within 30-60 minutes depending on distance and demand.",
  },
  {
    q: "Can I track my order in real time?",
    a: "Yes, FoodHub provides live status tracking from confirmation to delivery.",
  },
  {
    q: "How do providers join FoodHub?",
    a: "Restaurants can register as partners and complete onboarding through provider registration.",
  },
];

export default function FaqPreview() {
  return (
    <section id='home-faq' className='py-16 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10'>
          <div>
            <h2 className='text-4xl font-bold font-display text-gray-900'>
              FAQ
            </h2>
            <p className='text-gray-600 mt-3 text-lg'>
              Quick answers to common customer and provider questions.
            </p>
          </div>
          <Link href='/faq' className='btn-primary w-fit'>
            View Full FAQ
          </Link>
        </div>

        <div className='space-y-4'>
          {faqs.map((item) => (
            <details
              key={item.q}
              className='rounded-2xl border border-gray-100 bg-gray-50 p-5'>
              <summary className='cursor-pointer font-semibold text-gray-900'>
                {item.q}
              </summary>
              <p className='mt-3 text-gray-600 leading-relaxed'>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
