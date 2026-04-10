import Link from "next/link";

const posts = [
  {
    title: "5 tips to order smarter during peak hours",
    description:
      "Avoid delays and get better deals with simple ordering strategies.",
  },
  {
    title: "How local providers can grow with FoodHub",
    description:
      "Practical steps restaurants can take to improve visibility and sales.",
  },
  {
    title: "Healthy meal picks from top categories",
    description:
      "Quick nutrition-friendly picks when you want balance and taste.",
  },
];

export default function BlogHighlights() {
  return (
    <section id='blogs' className='py-16 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-end justify-between mb-10'>
          <div>
            <h2 className='text-4xl font-bold font-display text-gray-900'>
              Blog Highlights
            </h2>
            <p className='text-gray-600 mt-3 text-lg'>
              Helpful reads for customers, teams, and provider partners.
            </p>
          </div>
          <Link href='/faq' className='btn-outline hidden md:inline-flex'>
            Read More
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          {posts.map((post) => (
            <article
              key={post.title}
              className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm'>
              <h3 className='text-xl font-bold text-gray-900'>{post.title}</h3>
              <p className='text-gray-600 mt-3 leading-relaxed'>
                {post.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
