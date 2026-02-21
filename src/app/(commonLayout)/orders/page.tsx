"use client";

import { orderService } from "@/service/order.service";
import Link from "next/link";
import { useEffect, useState } from "react";

type Provider = {
  id: string;
  restaurantName: string;
};

type Meal = {
  id: string;
  title: string;
  image?: string;
};

type OrderItem = {
  id: string;
  orderId: string;
  mealId: string;
  price: string;
  quantity: number;
  meal: Meal;
};

type OrderStatus = "PLACED" | "DELIVERED" | "CANCELLED";

type Order = {
  id: string;
  customerId: string;
  providerId: string;
  totalPrice: string;
  deliveryAddress: string;
  status: OrderStatus;
  createdAt: string;

  provider: Provider;
  items: OrderItem[];
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    orderService.getMyOrders().then((res) => {
      if (res.error || !res.data) {
        setError(res.error?.message || "Failed to load orders");
      } else {
        setOrders(res.data);
      }
      setLoading(false);
    });
  }, []);


  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#e10101] mb-4'></div>
          <p className='text-gray-600'>Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4'>
        <div className='text-center max-w-md'>
          <div className='text-6xl mb-4'>⚠️</div>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>
            Could not load orders
          </h2>
          <p className='text-gray-600 mb-6'>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className='inline-block bg-[#e10101] hover:bg-[#c00000] text-white font-semibold px-6 py-3 rounded-lg transition-colors'>
            Try Again
          </button>
        </div>
      </div>
    );
  }


  if (orders.length === 0) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4'>
        <div className='text-center max-w-md'>
          <div className='w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6'>
            <svg
              className='w-12 h-12 text-[#e10101]'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
              />
            </svg>
          </div>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>
            No orders yet
          </h2>
          <p className='text-gray-600 mb-6'>
            Start ordering your favorite meals!
          </p>
          <Link
            href='/'
            className='inline-block bg-[#e10101] hover:bg-[#c00000] text-white font-semibold px-6 py-3 rounded-lg transition-colors'>
            Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-[#e10101]'>My Orders</h1>
          <p className='mt-2 text-sm text-gray-600'>
            Track and manage your food orders
          </p>
        </div>

        {/* Orders List */}
        <div className='space-y-4'>
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className='block bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border-2 border-transparent hover:border-[#e10101]/20'>
              <div className='p-6'>
                <div className='flex justify-between items-start mb-4'>
                  {/* Restaurant Info */}
                  <div className='flex-1'>
                    <div className='flex items-center mb-2'>
                      <div className='w-10 h-10 bg-gradient-to-br from-[#e10101] to-[#c00000] rounded-lg flex items-center justify-center mr-3'>
                        <svg
                          className='w-6 h-6 text-white'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className='font-bold text-lg text-gray-900'>
                          {order.provider.restaurantName}
                        </h3>
                        <div className='flex items-center text-sm text-gray-500 mt-1'>
                          <svg
                            className='w-4 h-4 mr-1'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                            />
                          </svg>
                          {new Date(order.createdAt).toDateString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className='ml-4'>
                    <StatusBadge status={order.status} />
                  </div>
                </div>

                {/* Price and Arrow */}
                <div className='flex justify-between items-center pt-4 border-t border-gray-100'>
                  <div>
                    <p className='text-sm text-gray-600 mb-1'>Total Amount</p>
                    <p className='text-2xl font-bold text-[#e10101]'>
                      ৳ {order.totalPrice}
                    </p>
                  </div>
                  <svg
                    className='w-6 h-6 text-gray-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 5l7 7-7 7'
                    />
                  </svg>
                </div>
              </div>

              {/* Status Timeline Indicator */}
              <div className='h-1 bg-gray-100'>
                <div
                  className={`h-full transition-all ${order.status === "DELIVERED"
                    ? "bg-green-500 w-full"
                    : "bg-red-500 w-full"
                    }`}></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Order Summary Stats */}
        <div className='mt-8 bg-white rounded-xl shadow-sm p-6'>
          <h3 className='font-semibold text-gray-900 mb-4'>Order Summary</h3>
          <div className='grid grid-cols-3 gap-4'>
            <div className='text-center'>
              <p className='text-2xl font-bold text-[#e10101]'>
                {orders.length}
              </p>
              <p className='text-sm text-gray-600 mt-1'>Total Orders</p>
            </div>
            <div className='text-center border-l border-r border-gray-200'>
              <p className='text-2xl font-bold text-green-600'>
                {orders.filter((o) => o.status === "DELIVERED").length}
              </p>
              <p className='text-sm text-gray-600 mt-1'>Delivered</p>
            </div>
            <div className='text-center'>
              <p className='text-2xl font-bold text-yellow-600'>
                {orders.filter((o) => o.status === "PLACED").length}
              </p>
              <p className='text-sm text-gray-600 mt-1'>In Progress</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig = {
    DELIVERED: {
      bg: "bg-green-50",
      text: "text-green-700",
      border: "border-green-200",
      icon: (
        <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
          <path
            fillRule='evenodd'
            d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
            clipRule='evenodd'
          />
        </svg>
      ),
    },
    CANCELLED: {
      bg: "bg-red-50",
      text: "text-red-700",
      border: "border-red-200",
      icon: (
        <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
          <path
            fillRule='evenodd'
            d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
            clipRule='evenodd'
          />
        </svg>
      ),
    },
    PLACED: {
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      border: "border-yellow-200",
      icon: (
        <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
          <path
            fillRule='evenodd'
            d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'
            clipRule='evenodd'
          />
        </svg>
      ),
    },
  };

  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.PLACED;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border-2 ${config.bg} ${config.text} ${config.border}`}>
      {config.icon}
      {status}
    </span>
  );
};
