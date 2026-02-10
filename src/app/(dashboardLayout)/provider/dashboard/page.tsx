"use client";

import { authClient } from "@/lib/auth.client";
import { useEffect, useState } from "react";

interface Meal {
  id: string;
  title: string;
  description: string | null;
  price: string;
  image: string;
  dietaryType: "VEG" | "NON_VEG" | "HALAL";
  categoryId: string;
  providerId: string;
  isAvailable: boolean;
  createdAt: string;
  category?: {
    id: string;
    name: string;
    createdAt: string;
  };
  _count?: {
    orderItems: number;
  };
}

interface Order {
  id: string;
  customerId: string;
  providerId: string;
  totalPrice: string;
  deliveryAddress: string;
  status: "PLACED" | "DELIVERED" | "CANCELLED";
  createdAt: string;
}

interface Provider {
  id: string;
  restaurantName: string;
  meals?: Meal[];
  orders?: Order[];
}

interface Stats {
  activeMeals: number;
  pendingOrders: number;
  deliveredOrders: number;
  totalRevenue: string;
}

interface DashboardData {
  provider: Provider;
  stats: Stats;
}

export default function ProviderDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { data: session } = authClient.useSession();

  console.log("session", session?.session.token);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboard = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/providers/dashboard`,
          {
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            setData(result.data);
          }
        }
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-rose-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-16 h-16 border-4 border-[#e10101] border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-gray-600'>Loading...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-rose-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='text-5xl mb-4'>⚠️</div>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>
            Failed to load dashboard data
          </h2>
          <p className='text-gray-600'>Please try again later</p>
        </div>
      </div>
    );
  }

  console.log("data", data);

  return (
    <div>
      {/* Background decorative elements */}
      <div className='fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20'>
        <div className='absolute top-20 right-20 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse' />
        <div className='absolute bottom-20 left-20 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000' />
      </div>

      <div className='relative z-10 max-w-7xl mx-auto px-6 py-12'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-[#e10101] to-red-900 bg-clip-text text-transparent mb-2'>
            Dashboard
          </h1>
          <p className='text-gray-600'>{data.provider.restaurantName}</p>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          {/* Total Orders */}
          <div className='bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
            <div className='p-6'>
              <div className='flex items-center justify-between mb-4'>
                <div className='w-14 h-14 bg-gradient-to-br from-[#e10101] to-red-600 rounded-2xl flex items-center justify-center'>
                  <svg
                    className='w-7 h-7 text-white'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
                    />
                  </svg>
                </div>
              </div>
              <h3 className='text-gray-500 text-sm font-medium mb-1'>
                Total Orders
              </h3>
              <p className='text-3xl font-bold text-gray-900'>
                {data?.provider?.orders?.length}
              </p>
            </div>
          </div>

          {/* Prnding Orders */}
          <div className='bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
            <div className='p-6'>
              <div className='flex items-center justify-between mb-4'>
                <div className='w-14 h-14 bg-gradient-to-br from-[#e10101] to-red-600 rounded-2xl flex items-center justify-center'>
                  <svg
                    className='w-7 h-7 text-white'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
                    />
                  </svg>
                </div>
              </div>
              <h3 className='text-gray-500 text-sm font-medium mb-1'>
                Pending Orders
              </h3>
              <p className='text-3xl font-bold text-gray-900'>
                {data?.stats?.pendingOrders}
              </p>
            </div>
          </div>

          <div className='bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
            <div className='p-6'>
              <div className='flex items-center justify-between mb-4'>
                <div className='w-14 h-14 bg-gradient-to-br from-[#e10101] to-red-600 rounded-2xl flex items-center justify-center'>
                  <svg
                    className='w-7 h-7 text-white'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
                    />
                  </svg>
                </div>
              </div>
              <h3 className='text-gray-500 text-sm font-medium mb-1'>
                Delivered Orders
              </h3>
              <p className='text-3xl font-bold text-gray-900'>
                {data?.stats?.deliveredOrders}
              </p>
            </div>
          </div>

          {/* Total Meals */}
          <div className='bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
            <div className='p-6'>
              <div className='flex items-center justify-between mb-4'>
                <div className='w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center'>
                  <svg
                    className='w-7 h-7 text-white'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                    />
                  </svg>
                </div>
              </div>
              <h3 className='text-gray-500 text-sm font-medium mb-1'>
                Total Meals
              </h3>
              <p className='text-3xl font-bold text-gray-900'>
                {data?.provider?.meals?.length}
              </p>
            </div>
          </div>

          {/* Total Active Meals */}
          <div className='bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
            <div className='p-6'>
              <div className='flex items-center justify-between mb-4'>
                <div className='w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center'>
                  <svg
                    className='w-7 h-7 text-white'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                    />
                  </svg>
                </div>
              </div>
              <h3 className='text-gray-500 text-sm font-medium mb-1'>
                Total Active Meals
              </h3>
              <p className='text-3xl font-bold text-gray-900'>
                {data?.stats?.activeMeals}
              </p>
            </div>
          </div>

          {/* Total Revenue */}
          <div className='bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
            <div className='p-6'>
              <div className='flex items-center justify-between mb-4'>
                <div className='w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center'>
                  <svg
                    className='w-7 h-7 text-white'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                    />
                  </svg>
                </div>
              </div>
              <h3 className='text-gray-500 text-sm font-medium mb-1'>
                Total Sells
              </h3>
              <p className='text-3xl font-bold text-gray-900'>
                {data?.stats?.totalRevenue}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
