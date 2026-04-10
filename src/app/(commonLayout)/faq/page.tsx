import { ChevronDown, HelpCircle, LifeBuoy } from "lucide-react";

const faqs = [
  {
    question: "How do I place an order on FoodHub?",
    answer:
      "Go to the Meals page, add items to your cart, then complete checkout with your delivery details. You can track order status in real time from My Orders.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "FoodHub supports common online payment options and cash-on-delivery based on provider availability in your area.",
  },
  {
    question: "How long does delivery usually take?",
    answer:
      "Delivery time depends on provider preparation and distance. Most orders are delivered within 30-60 minutes during regular hours.",
  },
  {
    question: "Can I cancel my order after placing it?",
    answer:
      "Yes, cancellation is possible before the provider starts preparing your meal. Once preparation starts, cancellation policy may vary.",
  },
  {
    question: "How do I become a FoodHub provider?",
    answer:
      "Use the Become a Partner option from the footer and complete provider registration. Our team reviews applications and contacts eligible businesses.",
  },
  {
    question: "Where can I get help for a failed or delayed order?",
    answer:
      "Use the Contact page and include your order ID. Priority support is provided for delivery delays, missing items, and payment issues.",
  },
];

export default function FaqPage() {
  return (
    <main className='min-h-screen bg-gradient-to-b from-rose-50 via-white to-amber-50/70'>
      <section className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
        <div className='text-center'>
          <p className='inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-rose-700 ring-1 ring-rose-100 shadow-sm'>
            <HelpCircle className='h-4 w-4' />
            Frequently Asked Questions
          </p>
          <h1 className='mt-6 text-4xl md:text-5xl font-extrabold text-gray-900'>
            Everything you need to know
          </h1>
          <p className='mt-4 text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto'>
            Quick answers for customers and providers using FoodHub. If you do
            not find what you need, reach out through our support page.
          </p>
        </div>

        <div className='mt-12 space-y-4'>
          {faqs.map((item, index) => (
            <details
              key={item.question}
              className='group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm open:border-rose-200 open:bg-rose-50/40'>
              <summary className='list-none cursor-pointer flex items-center justify-between gap-5'>
                <span className='text-left text-base md:text-lg font-semibold text-gray-900'>
                  {index + 1}. {item.question}
                </span>
                <ChevronDown className='h-5 w-5 text-gray-500 transition-transform duration-200 group-open:rotate-180' />
              </summary>
              <p className='mt-4 text-sm md:text-base text-gray-700 leading-relaxed'>
                {item.answer}
              </p>
            </details>
          ))}
        </div>

        <div className='mt-12 rounded-3xl border border-amber-100 bg-gradient-to-r from-amber-50 to-rose-50 p-7 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
          <div className='flex items-start gap-3'>
            <div className='h-10 w-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center'>
              <LifeBuoy className='h-5 w-5' />
            </div>
            <div>
              <h2 className='text-lg font-bold text-gray-900'>
                Still need help?
              </h2>
              <p className='text-sm text-gray-700 mt-1'>
                Contact our support team for order issues, payment questions, or
                provider onboarding assistance.
              </p>
            </div>
          </div>
          <a
            href='/contact'
            className='btn-primary inline-flex items-center justify-center'>
            Go to Contact
          </a>
        </div>
      </section>
    </main>
  );
}
