"use client";

import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

interface OrderItem {
  id: string;
  orderId: string;
  mealId: string;
  price: string;
  quantity: number;
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  mealId: string;
  orderId: string;
  createdAt: string;
}

interface Order {
  id: string;
  customerId: string;
  providerId: string;
  totalPrice: string;
  deliveryAddress: string;
  status: "PLACED" | "DELIVERED" | "CANCELLED";
  createdAt: string;
  items: OrderItem[];
  reviews: Review[];
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/admin/orders`,
          {
            credentials: "include",
          },
        );

        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            setOrders(result.data);
          }
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: string) => {
    return `৳${parseFloat(amount).toLocaleString("en-BD")}`;
  };

  const getStatusBadge = (status: Order["status"]) => {
    const config = {
      PLACED: {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        border: "border-yellow-300",
        label: "Placed",
      },

      DELIVERED: {
        bg: "bg-green-100",
        text: "text-green-700",
        border: "border-green-300",
        label: "Delivered",
      },
      CANCELLED: {
        bg: "bg-red-100",
        text: "text-red-700",
        border: "border-red-300",
        label: "Cancelled",
      },
    };

    const statusConfig = config[status];
    return (
      <span
        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.text} border ${statusConfig.border}`}>
        {statusConfig.label}
      </span>
    );
  };

  const renderStars = (rating: number) => {
    return (
      <div className='flex gap-1'>
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
            fill='currentColor'
            viewBox='0 0 20 20'>
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
          </svg>
        ))}
      </div>
    );
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

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-rose-50'>
      <div className='relative z-10 max-w-7xl mx-auto px-6 py-12'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-[#e10101] to-red-900 bg-clip-text text-transparent mb-2'>
            All Orders
          </h1>
          <p className='text-gray-600'>Total {orders.length} orders</p>
        </div>

        {/* Orders List */}
        <div className='space-y-6'>
          {orders.length === 0 ? (
            <div className='bg-white rounded-3xl shadow-lg p-12 text-center'>
              <div className='text-6xl mb-4'>📦</div>
              <h3 className='text-xl font-bold text-gray-900 mb-2'>
                No Orders
              </h3>
              <p className='text-gray-600'>No orders found in the system</p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className='bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow'>
                <div className='p-6'>
                  {/* Order Header */}
                  <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4'>
                    <div>
                      <div className='flex items-center gap-3 mb-2'>
                        <h3 className='text-lg font-bold text-gray-900'>
                          Order #{order.id.slice(0, 8)}
                        </h3>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className='flex items-center gap-2 text-sm text-gray-600'>
                        <svg
                          className='w-4 h-4'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                          />
                        </svg>
                        <span>{formatDate(order.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Info Grid */}
                  <div className='grid md:grid-cols-2 gap-4 mb-4'>
                    {/* Customer & Provider IDs */}
                    <div className='bg-gray-50 rounded-xl p-4 space-y-2'>
                      <div>
                        <p className='text-xs text-gray-500 mb-1'>
                          Customer ID
                        </p>
                        <p className='text-sm font-mono text-gray-900 break-all'>
                          {order.customerId}
                        </p>
                      </div>
                      <div>
                        <p className='text-xs text-gray-500 mb-1'>
                          Provider ID
                        </p>
                        <p className='text-sm font-mono text-gray-900 break-all'>
                          {order.providerId}
                        </p>
                      </div>
                    </div>

                    {/* Delivery Address */}
                    <div className='bg-gray-50 rounded-xl p-4'>
                      <p className='text-xs text-gray-500 mb-2'>
                        Delivery Address
                      </p>
                      <div className='flex items-start gap-2'>
                        <svg
                          className='w-4 h-4 mt-0.5 text-gray-600'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'>
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
                        <p className='text-sm text-gray-900'>
                          {order.deliveryAddress}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className='mb-4'>
                    <p className='text-sm font-semibold text-gray-700 mb-3'>
                      Order Items ({order.items.length})
                    </p>
                    <div className='space-y-2'>
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className='flex items-center justify-between p-3 bg-gray-50 rounded-xl'>
                          <div className='flex-1'>
                            <p className='text-sm font-mono text-gray-600'>
                              Meal ID: {item.mealId.slice(0, 8)}...
                            </p>
                            <p className='text-xs text-gray-500'>
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <p className='font-semibold text-gray-900'>
                            {formatCurrency(item.price)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total */}
                  <div className='pt-4 border-t border-gray-200 flex items-center justify-between'>
                    <span className='font-bold text-gray-900 text-lg'>
                      Total Amount:
                    </span>
                    <span className='font-bold text-[#e10101] text-2xl'>
                      {formatCurrency(order.totalPrice)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
