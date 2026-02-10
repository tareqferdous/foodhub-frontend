import Category from "@/components/modules/Home/Category";
import Features from "@/components/modules/Home/Features";
import Hero from "@/components/modules/Home/Hero";
import Meals from "@/components/modules/Home/Meals";
import Providers from "@/components/modules/Home/Providers";
import { userService } from "@/service/user.service";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { data } = await userService.getSession();

  console.log("data", data);
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

