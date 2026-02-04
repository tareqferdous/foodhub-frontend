import Category from "@/components/modules/Home/Category";
import Features from "@/components/modules/Home/Features";
import Hero from "@/components/modules/Home/Hero";
import Meals from "@/components/modules/Home/Meals";
import Providers from "@/components/modules/Home/Providers";

export default async function HomePage() {
  return (
    <div className='min-h-screen flex flex-col'>
      {/* Hero Section */}
      <Hero />

      {/* Categories */}
      <Category />

      {/* Features */}
      <Features />

      {/* Featured Meals */}
      <Meals />

      {/* Featured Providers */}
      <Providers />
    </div>
  );
}

