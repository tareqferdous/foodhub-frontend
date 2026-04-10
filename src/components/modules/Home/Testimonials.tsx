const testimonials = [
  {
    name: "Nafisa Rahman",
    role: "Regular Customer",
    quote:
      "FoodHub made late-night ordering super easy. Delivery is fast and order tracking is accurate.",
  },
  {
    name: "Siam Hossain",
    role: "Office Team Lead",
    quote:
      "We use FoodHub for team lunch orders. The combo offers and provider variety are really good.",
  },
  {
    name: "Chef Adnan",
    role: "Provider Partner",
    quote:
      "As a restaurant partner, the dashboard and order flow helped us increase repeat customers.",
  },
];

export default function Testimonials() {
  return (
    <section id='testimonials' className='py-16 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-10'>
          <h2 className='text-4xl font-bold font-display text-gray-900'>
            What People Say
          </h2>
          <p className='text-gray-600 mt-3 text-lg'>
            Feedback from customers and provider partners.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          {testimonials.map((item) => (
            <article
              key={item.name}
              className='rounded-2xl border border-gray-100 bg-gradient-to-b from-white to-rose-50 p-6 shadow-sm'>
              <p className='text-gray-700 leading-relaxed'>"{item.quote}"</p>
              <div className='mt-5'>
                <p className='font-bold text-gray-900'>{item.name}</p>
                <p className='text-sm text-gray-600'>{item.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
