"use client";

import {
  Ban,
  ChartColumnStacked,
  DollarSign,
  ShoppingBag,
  UsersRound,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

interface AdminData {
  users: {
    total: number;
    customers: number;
    providers: number;
    suspended: number;
  };
  meals: {
    total: number;
    active: number;
  };
  categories: number;
  orders: {
    total: number;
    pending: number;
    delivered: number;
    cancelled: number;
  };
  revenue: number;
}

export default function AdminDashboard() {
  const [data, setData] = useState<AdminData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchAdminData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/admin`,
          {
            credentials: "include",
          },
        );

        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            setData(result.data);
          }
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const formatCurrency = (amount: number) => {
    return `৳${amount.toLocaleString("en-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

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
            Failed to Load Data
          </h2>
          <p className='text-gray-600'>Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-rose-50'>
      {/* Background decorative elements */}
      <div className='fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20'>
        <div className='absolute top-20 right-20 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse' />
        <div className='absolute bottom-20 left-20 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000' />
      </div>

      <div className='relative z-10 max-w-7xl mx-auto px-6 py-12'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-[#e10101] to-red-900 bg-clip-text text-transparent mb-2'>
            Admin Dashboard
          </h1>
          <p className='text-gray-600'>System Overview & Management</p>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
          {/* Total Revenue */}
          <div className='bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 lg:col-span-3'>
            <div className='p-6'>
              <div className='flex items-center justify-between mb-4'>
                <div className='w-14 h-14 bg-gradient-to-br from-[#e10101] to-red-600 rounded-2xl flex items-center justify-center'>
                  <DollarSign className='w-7 h-7 text-white' />
                </div>
              </div>
              <h3 className='text-gray-500 text-sm font-medium mb-1'>
                Total Revenue
              </h3>
              <p className='text-4xl font-bold text-[#e10101]'>
                {formatCurrency(data.revenue)}
              </p>
            </div>
          </div>

          {/* Total Users */}
          <div className='bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
            <div className='p-6'>
              <div className='flex items-center justify-between mb-4'>
                <div className='w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center'>
                  <UsersRound className='w-7 h-7 text-white' />
                </div>
              </div>
              <h3 className='text-gray-500 text-sm font-medium mb-1'>
                Total Users
              </h3>
              <p className='text-3xl font-bold text-gray-900 mb-3'>
                {data.users.total}
              </p>
              <div className='flex gap-3 text-xs'>
                <span className='px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium'>
                  {data.users.customers} Customers
                </span>
                <span className='px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-medium'>
                  {data.users.providers} Providers
                </span>
              </div>
            </div>
          </div>

          {/* Total Orders */}
          <div className='bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
            <div className='p-6'>
              <div className='flex items-center justify-between mb-4'>
                <div className='w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center'>
                  <ShoppingBag className='w-7 h-7 text-white' />
                </div>
              </div>
              <h3 className='text-gray-500 text-sm font-medium mb-1'>
                Total Orders
              </h3>
              <p className='text-3xl font-bold text-gray-900 mb-3'>
                {data.orders.total}
              </p>
              <div className='flex gap-2 text-xs'>
                <span className='px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full font-medium'>
                  {data.orders.pending} Pending
                </span>
                <span className='px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium'>
                  {data.orders.delivered} Done
                </span>
              </div>
            </div>
          </div>

          {/* Total Meals */}
          <div className='bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
            <div className='p-6'>
              <div className='flex items-center justify-between mb-4'>
                <div className='w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center'>
                  <UtensilsCrossed className='w-7 h-7 text-white' />
                </div>
              </div>
              <h3 className='text-gray-500 text-sm font-medium mb-1'>
                Total Meals
              </h3>
              <p className='text-3xl font-bold text-gray-900 mb-3'>
                {data.meals.total}
              </p>
              <div className='flex gap-2 text-xs'>
                <span className='px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium'>
                  {data.meals.active} Active
                </span>
                <span className='px-2 py-1 bg-gray-100 text-gray-700 rounded-full font-medium'>
                  {data.meals.total - data.meals.active} Inactive
                </span>
              </div>
            </div>
          </div>

          {/* Suspended Users */}
          <div className='bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
            <div className='p-6'>
              <div className='flex items-center justify-between mb-4'>
                <div className='w-14 h-14 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center'>
                  <Ban className='w-7 h-7 text-white' />
                </div>
              </div>
              <h3 className='text-gray-500 text-sm font-medium mb-1'>
                Suspended Users
              </h3>
              <p className='text-3xl font-bold text-red-600'>
                {data.users.suspended}
              </p>
            </div>
          </div>

          {/* Categories */}
          <div className='bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
            <div className='p-6'>
              <div className='flex items-center justify-between mb-4'>
                <div className='w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center'>
                  <ChartColumnStacked className='w-7 h-7 text-white' />
                </div>
              </div>
              <h3 className='text-gray-500 text-sm font-medium mb-1'>
                Categories
              </h3>
              <p className='text-3xl font-bold text-gray-900'>
                {data.categories}
              </p>
            </div>
          </div>

          {/* Cancelled Orders */}
          <div className='bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
            <div className='p-6'>
              <div className='flex items-center justify-between mb-4'>
                <div className='w-14 h-14 bg-gradient-to-br from-gray-500 to-slate-600 rounded-2xl flex items-center justify-center'>
                  <X className='w-7 h-7 text-white' />
                </div>
              </div>
              <h3 className='text-gray-500 text-sm font-medium mb-1'>
                Cancelled Orders
              </h3>
              <p className='text-3xl font-bold text-gray-900'>
                {data.orders.cancelled}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
