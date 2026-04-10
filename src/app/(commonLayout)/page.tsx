import Category from "@/components/modules/Home/Category";
import FaqPreview from "@/components/modules/Home/FaqPreview";
import Features from "@/components/modules/Home/Features";
import Hero from "@/components/modules/Home/Hero";
import LiveOrderJourney from "@/components/modules/Home/LiveOrderJourney";
import Meals from "@/components/modules/Home/Meals";
import Newsletter from "@/components/modules/Home/Newsletter";
import Providers from "@/components/modules/Home/Providers";
import ServicesFlow from "@/components/modules/Home/ServicesFlow";
import { userService } from "@/service/user.service";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  await userService.getSession();

  return (
    <div className='min-h-screen flex flex-col'>
      <Hero />
      <Category />
      <Features />
      <ServicesFlow />
      <LiveOrderJourney />
      <Meals />
      <Providers />
      <FaqPreview />
      <Newsletter />
    </div>
  );
}

