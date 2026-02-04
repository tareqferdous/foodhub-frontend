import DashboardSidebar from "@/components/layout/DashboardSidebar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "../../app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FoodHub - Order Your Favorite Meals",
  description:
    "Browse menus from various food providers, place orders, and track delivery status",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-rose-50'>
          <DashboardSidebar />

          <div className='lg:ml-64'>{children}</div>
          <Toaster richColors position='top-right' />
        </div>
      </body>
    </html>
  );
}
