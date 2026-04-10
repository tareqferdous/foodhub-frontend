const steps = [
  {
    title: "Choose Your Meal",
    description:
      "Browse categories and restaurant menus based on your craving.",
  },
  {
    title: "Place Order Securely",
    description:
      "Checkout smoothly with clear address and payment confirmation.",
  },
  {
    title: "Track and Receive",
    description:
      "Follow live status updates until your meal reaches your doorstep.",
  },
];

export default function ServicesFlow() {
  return (
    <section id='services' className='py-16 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-10'>
          <h2 className='text-4xl font-bold font-display text-gray-900'>
            How Our Service Works
          </h2>
          <p className='text-gray-600 mt-3 text-lg'>
            A simple and reliable flow for customers and providers.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          {steps.map((step, index) => (
            <article
              key={step.title}
              className='rounded-2xl bg-white border border-gray-100 p-6 shadow-sm'>
              <span className='text-xs font-bold text-red-600 tracking-wide'>
                STEP {index + 1}
              </span>
              <h3 className='text-xl font-bold text-gray-900 mt-2'>
                {step.title}
              </h3>
              <p className='text-gray-600 mt-2 leading-relaxed'>
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
