"use client";

import ReviewForm from "@/components/modules/order/CreateReview";
import { orderService } from "@/service/order.service";
import { useParams, useRouter } from "next/navigation";
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

export default function OrderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    orderService.getOrderById(id as string).then((res) => {
      if (res.error || !res.data) {
        setError(res.error?.message || "Order not found");
      } else {
        setOrder(res.data);
      }
      setLoading(false);
    });
  }, [id]);


  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#e10101] mb-4'></div>
          <p className='text-gray-600'>Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4'>
        <div className='text-center max-w-md'>
          <div className='text-6xl mb-4'>⚠️</div>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>
            {error ? "Something went wrong" : "Order not found"}
          </h2>
          <p className='text-gray-600 mb-6'>
            {error || "This order doesn't exist or you don't have access to it."}
          </p>
          <button
            onClick={() => router.push("/orders")}
            className='inline-block bg-[#e10101] hover:bg-[#c00000] text-white font-semibold px-6 py-3 rounded-lg transition-colors'>
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto'>
        {/* Header with Back Button */}
        <div className='mb-8 flex items-center'>
          <button
            onClick={() => router.back()}
            className='mr-4 p-2 hover:bg-white rounded-lg transition-colors'>
            <svg
              className='w-6 h-6 text-gray-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>
          <div>
            <h1 className='text-3xl font-bold text-[#e10101]'>Order Details</h1>
            <p className='mt-1 text-sm text-gray-600'>Order ID: #{id}</p>
          </div>
        </div>

        <div className='space-y-6'>
          {/* Order Status Card */}
          <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
            <div className='bg-gradient-to-r from-[#e10101] to-[#c00000] px-6 py-4'>
              <h2 className='text-lg font-semibold text-white'>
                Order Information
              </h2>
            </div>

            <div className='p-6 space-y-4'>
              {/* Provider */}
              <div className='flex items-start'>
                <div className='w-12 h-12 bg-gradient-to-br from-[#e10101] to-[#c00000] rounded-lg flex items-center justify-center mr-4 flex-shrink-0'>
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
                <div className='flex-1'>
                  <p className='text-sm text-gray-600 mb-1'>Restaurant</p>
                  <p className='text-lg font-semibold text-gray-900'>
                    {order.provider.restaurantName}
                  </p>
                </div>
              </div>

              <div className='border-t border-gray-100 pt-4'></div>

              {/* Status */}
              <div className='flex items-start'>
                <div className='w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0'>
                  <svg
                    className='w-6 h-6 text-[#e10101]'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </div>
                <div className='flex-1'>
                  <p className='text-sm text-gray-600 mb-2'>Order Status</p>
                  <StatusBadge status={order.status} />
                </div>
              </div>

              <div className='border-t border-gray-100 pt-4'></div>

              {/* Delivery Address */}
              <div className='flex items-start'>
                <div className='w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0'>
                  <svg
                    className='w-6 h-6 text-[#e10101]'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                </div>
                <div className='flex-1'>
                  <p className='text-sm text-gray-600 mb-1'>Delivery Address</p>
                  <p className='text-base text-gray-900'>
                    {order.deliveryAddress}
                  </p>
                </div>
              </div>

              <div className='border-t border-gray-100 pt-4'></div>

              {/* Order Date */}
              <div className='flex items-start'>
                <div className='w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0'>
                  <svg
                    className='w-6 h-6 text-[#e10101]'
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
                </div>
                <div className='flex-1'>
                  <p className='text-sm text-gray-600 mb-1'>Order Date</p>
                  <p className='text-base text-gray-900'>
                    {new Date(order.createdAt).toLocaleString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items Card */}
          <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
            <div className='px-6 py-4 border-b border-gray-100'>
              <h2 className='text-lg font-semibold text-gray-900'>
                Order Items
              </h2>
            </div>

            <div className='p-6'>
              <div className='space-y-4'>
                {order.items.map((item, index) => (
                  <div key={item.id}>
                    <div className='flex justify-between items-start'>
                      <div className='flex-1'>
                        <h3 className='font-medium text-gray-900'>
                          {item.meal.title}
                        </h3>
                        <p className='text-sm text-gray-500 mt-1'>
                          Quantity: {item.quantity} × ৳
                          {Number(item.price) / item.quantity}
                        </p>
                      </div>
                      <div className='text-right ml-4'>
                        <p className='font-semibold text-gray-900'>
                          ৳{item.price}
                        </p>
                      </div>
                    </div>
                    {index < order.items.length - 1 && (
                      <div className='border-b border-gray-100 mt-4'></div>
                    )}
                  </div>
                ))}
              </div>

              <div className='border-t-2 border-gray-200 pt-4 mt-6'>
                <div className='flex justify-between items-center'>
                  <span className='text-lg font-bold text-gray-900'>
                    Total Amount
                  </span>
                  <span className='text-2xl font-bold text-[#e10101]'>
                    ৳{order.totalPrice}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Review Section - Only show if delivered */}
          {order.status === "DELIVERED" && (
            <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
              <div className='px-6 py-4 border-b border-gray-100'>
                <h2 className='text-lg font-semibold text-gray-900 flex items-center'>
                  <svg
                    className='w-5 h-5 text-[#e10101] mr-2'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                    />
                  </svg>
                  Rate Your Meals
                </h2>
              </div>

              <div className='p-6 space-y-6'>
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className='border border-gray-200 rounded-lg p-4'>
                    <h3 className='font-medium text-gray-900 mb-4'>
                      {item.meal.title}
                    </h3>
                    <ReviewForm mealId={item.meal.id} orderId={order.id} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Help Section */}
          <div className='bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 text-center'>
            <p className='text-gray-600 mb-2'>Need help with your order?</p>
            <button className='text-[#e10101] hover:text-[#c00000] font-semibold transition-colors'>
              Contact Support
            </button>
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
        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
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
        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
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
        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
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
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border-2 ${config.bg} ${config.text} ${config.border}`}>
      {config.icon}
      {status}
    </span>
  );
};
