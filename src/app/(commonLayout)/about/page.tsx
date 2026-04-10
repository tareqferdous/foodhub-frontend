import {
  Handshake,
  Rocket,
  ShieldCheck,
  Store,
  Timer,
  Utensils,
} from "lucide-react";
import Link from "next/link";

const highlights = [
  {
    title: "Fast Delivery Promise",
    description:
      "Live order flow and optimized provider routes help meals reach customers while still fresh.",
    icon: Timer,
  },
  {
    title: "Trusted Provider Network",
    description:
      "Every provider is reviewed before onboarding to keep service quality high and consistent.",
    icon: Store,
  },
  {
    title: "Secure Ordering",
    description:
      "Safe checkout patterns, clear order tracking, and transparent status updates at every stage.",
    icon: ShieldCheck,
  },
];

const stats = [
  { label: "Meals Delivered", value: "35K+" },
  { label: "Active Customers", value: "12K+" },
  { label: "Restaurant Partners", value: "180+" },
  { label: "Dhaka Areas Covered", value: "45+" },
];

const workflow = [
  {
    title: "Discover",
    description:
      "Customers browse meals by category, rating, and provider location in one unified listing.",
  },
  {
    title: "Order & Track",
    description:
      "From cart to checkout, every order includes clear status updates so users know what is happening.",
  },
  {
    title: "Deliver & Support",
    description:
      "Fast handoff and responsive support help resolve delivery, payment, and quality issues quickly.",
  },
];

export default function AboutPage() {
  return (
    <main className='min-h-screen bg-gradient-to-b from-rose-50 via-white to-orange-50'>
      <section className='relative overflow-hidden'>
        <div className='absolute inset-0 pointer-events-none'>
          <div className='absolute -top-14 -left-16 h-56 w-56 rounded-full bg-rose-200/50 blur-3xl' />
          <div className='absolute top-16 right-0 h-64 w-64 rounded-full bg-orange-200/60 blur-3xl' />
        </div>

        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16'>
          <div className='max-w-3xl'>
            <p className='inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-rose-700 shadow-sm ring-1 ring-rose-100'>
              <Utensils className='h-4 w-4' />
              Our Story
            </p>
            <h1 className='mt-4 text-4xl md:text-5xl font-extrabold leading-tight text-gray-900'>
              We built FoodHub to make local food delivery smarter and more
              human.
            </h1>
            <p className='mt-4 text-lg text-gray-600 leading-relaxed'>
              FoodHub connects busy customers with quality local kitchens
              through a smooth ordering experience. We are focused on reliable
              delivery, transparent tracking, and helping neighborhood providers
              grow.
            </p>

            <div className='mt-7 flex flex-wrap gap-3'>
              <Link href='/meals' className='btn-primary'>
                Explore Meals
              </Link>
              <Link href='/providers' className='btn-outline'>
                Meet Providers
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14'>
        <div className='rounded-3xl bg-white border border-gray-100 shadow-sm p-7 md:p-10'>
          <div className='max-w-2xl'>
            <h2 className='text-3xl font-bold text-gray-900'>
              What makes us different
            </h2>
            <p className='mt-3 text-gray-600 leading-relaxed'>
              We are not only a food listing platform. FoodHub is designed as a
              full delivery ecosystem where customers, providers, and support
              teams stay connected in real time.
            </p>
          </div>

          <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-5'>
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className='rounded-2xl border border-gray-100 bg-gradient-to-b from-white to-rose-50 p-6'>
                  <div className='h-11 w-11 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center'>
                    <Icon className='h-5 w-5' />
                  </div>
                  <h3 className='mt-4 text-lg font-semibold text-gray-900'>
                    {item.title}
                  </h3>
                  <p className='mt-2 text-sm text-gray-600 leading-relaxed'>
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14'>
        <div className='rounded-3xl border border-amber-100 bg-gradient-to-r from-amber-50 to-rose-50 p-7 md:p-9'>
          <h2 className='text-2xl md:text-3xl font-bold text-gray-900'>
            How FoodHub works
          </h2>
          <p className='mt-2 text-gray-600 leading-relaxed max-w-2xl'>
            Our platform is designed to keep ordering simple for customers while
            giving providers reliable tools to manage demand and delivery.
          </p>

          <div className='mt-6 grid grid-cols-1 md:grid-cols-3 gap-4'>
            {workflow.map((item, index) => (
              <article
                key={item.title}
                className='rounded-2xl bg-white/90 border border-white p-5'>
                <p className='text-xs font-bold tracking-wide text-rose-600'>
                  STEP {index + 1}
                </p>
                <h3 className='mt-2 text-lg font-semibold text-gray-900'>
                  {item.title}
                </h3>
                <p className='mt-2 text-sm text-gray-700 leading-relaxed'>
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='rounded-3xl border border-gray-100 bg-white p-7 shadow-sm'>
            <div className='h-11 w-11 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center'>
              <Rocket className='h-5 w-5' />
            </div>
            <h3 className='mt-4 text-2xl font-bold text-gray-900'>
              Our Mission
            </h3>
            <p className='mt-3 text-gray-600 leading-relaxed'>
              Empower local food businesses with digital tools while giving
              customers a fast and delightful ordering experience.
            </p>
          </div>

          <div className='rounded-3xl border border-gray-100 bg-white p-7 shadow-sm'>
            <div className='h-11 w-11 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center'>
              <Handshake className='h-5 w-5' />
            </div>
            <h3 className='mt-4 text-2xl font-bold text-gray-900'>
              Our Promise
            </h3>
            <p className='mt-3 text-gray-600 leading-relaxed'>
              We stay committed to quality, delivery reliability, and clear
              communication for every order across the platform.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
