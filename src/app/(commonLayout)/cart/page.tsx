"use client";

import { useCart } from "@/contexts/CartContext";
import { groupByProvider } from "@/utils/groupProvider";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getTotalPrice,
  } = useCart();

  const grouped = groupByProvider(items);

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-rose-50 py-12'>
        <div className='flex-1 flex items-center justify-center py-16'>
          <div className='text-center space-y-6 max-w-md'>
            <div className='w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto shadow-xl border-4 border-gray-100'>
              <ShoppingBag className='w-16 h-16 text-gray-400' />
            </div>
            <h2 className='text-3xl font-bold bg-gradient-to-r from-gray-900 via-[#e10101] to-red-900 bg-clip-text text-transparent'>
              Your cart is empty
            </h2>
            <p className='text-gray-600'>
              Add delicious meals to your cart and come back!
            </p>
            <Link
              href='/meals'
              className='inline-flex items-center gap-2 bg-gradient-to-r from-[#e10101] to-red-600 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-lg hover:scale-105 active:scale-100 transition-all duration-300'>
              View Meals
              <ArrowRight className='w-5 h-5' />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const cartGroups = Object.values(grouped);
  const totalAmount = getTotalPrice();

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-rose-50 py-12'>
      <div className='max-w-6xl mx-auto px-6'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-[#e10101] to-red-900 bg-clip-text text-transparent mb-2'>
            Your Cart
          </h1>
          <p className='text-gray-600'>
            {cartGroups.length} restaurants, {getTotalItems()} items
          </p>
        </div>

        {/* Cart Groups */}
        <div className='space-y-6 mb-8'>
          {cartGroups.map((group: any, index: number) => {
            const subtotal = group.items.reduce(
              (sum: number, item: any) => sum + item.price * item.quantity,
              0,
            );

            return (
              <div
                key={group.providerId}
                className='bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100'>
                {/* Provider Header */}
                <div className='bg-gradient-to-r from-[#e10101] to-red-600 px-6 py-4'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <h2 className='text-2xl font-bold text-white mb-1'>
                        {group.providerName}
                      </h2>
                      <p className='text-white/80 text-sm'>
                        Order #{index + 1}
                      </p>
                    </div>
                    <div className='text-right'>
                      <p className='text-white/80 text-sm'>Subtotal</p>
                      <p className='text-2xl font-bold text-white'>
                        ৳{subtotal.toLocaleString("en-BD")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className='p-6 space-y-4'>
                  {group.items.map((item: any) => (
                    <div
                      key={item.mealId}
                      className='flex gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors'>
                      {/* Item Image */}
                      {item.image && (
                        <div className='w-24 h-24 flex-shrink-0'>
                          <img
                            src={item.image}
                            alt={item.title}
                            className='w-full h-full object-cover rounded-xl'
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://via.placeholder.com/96";
                            }}
                          />
                        </div>
                      )}

                      {/* Item Details */}
                      <div className='flex-1'>
                        <h3 className='text-lg font-bold text-gray-900 mb-1'>
                          {item.title}
                        </h3>
                        <div className='flex items-center gap-3'>
                          <p className='text-[#e10101] font-bold text-xl'>
                            ৳{item.price}
                          </p>
                          <span className='text-gray-400'>×</span>
                          <p className='text-gray-600'>{item.quantity}</p>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className='flex flex-col items-center justify-center gap-3'>
                        <div className='flex items-center gap-2 bg-white rounded-xl border-2 border-gray-200 px-2 py-1'>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.mealId,
                                Math.max(1, item.quantity - 1),
                              )
                            }
                            className='w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-bold'>
                            -
                          </button>
                          <span className='w-8 text-center font-bold text-gray-900'>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.mealId, item.quantity + 1)
                            }
                            className='w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-bold'>
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.mealId)}
                          className='text-red-600 hover:text-red-700 font-semibold text-sm hover:underline'>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Provider Footer */}
                <div className='border-t border-gray-200 px-6 py-4 bg-gray-50'>
                  <div className='flex items-center justify-between'>
                    <Link
                      href='/meals'
                      className='text-gray-600 hover:text-gray-900 font-semibold text-sm'>
                      + Add more from {group.providerName}
                    </Link>
                    <Link
                      href={`/checkout?providerId=${group.providerId}`}
                      className='bg-gradient-to-r from-[#e10101] to-red-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 active:scale-100 transition-all duration-300'>
                      Checkout - ৳{subtotal.toLocaleString("en-BD")}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total Summary Card */}
        <div className='bg-white rounded-3xl shadow-xl p-6 border-2 border-[#e10101]'>
          <div className='flex items-center justify-between mb-6'>
            <div>
              <h3 className='text-2xl font-bold text-gray-900'>Total Amount</h3>
              <p className='text-gray-600 text-sm mt-1'>
                {cartGroups.length} separate orders will be placed
              </p>
            </div>
            <div className='text-right'>
              <p className='text-4xl font-bold text-[#e10101]'>
                ৳{totalAmount.toLocaleString("en-BD")}
              </p>
            </div>
          </div>

          {/* Order Breakdown */}
          <div className='space-y-3 mb-6 pt-6 border-t border-gray-200'>
            {cartGroups.map((group: any, index: number) => {
              const subtotal = group.items.reduce(
                (sum: number, item: any) => sum + item.price * item.quantity,
                0,
              );
              return (
                <div
                  key={group.providerId}
                  className='flex items-center justify-between text-sm'>
                  <div className='flex items-center gap-2'>
                    <span className='w-6 h-6 bg-gradient-to-r from-[#e10101] to-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold'>
                      {index + 1}
                    </span>
                    <span className='text-gray-700 font-medium'>
                      {group.providerName}
                    </span>
                  </div>
                  <span className='font-bold text-gray-900'>
                    ৳{subtotal.toLocaleString("en-BD")}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className='flex gap-4'>
            <Link
              href='/meals'
              className='flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 rounded-xl transition-colors text-center'>
              Continue Shopping
            </Link>
            <button
              onClick={() => {
                // Navigate to first provider checkout or show multi-checkout modal
                if (cartGroups.length === 1) {
                  window.location.href = `/checkout?providerId=${cartGroups[0].providerId}`;
                } else {
                  alert(
                    `You have ${cartGroups.length} separate orders. Please checkout each order individually.`,
                  );
                }
              }}
              className='flex-1 bg-gradient-to-r from-[#e10101] to-red-600 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:scale-105 active:scale-100 transition-all duration-300'>
              Proceed to Checkout
            </button>
          </div>
        </div>

        {/* Info Card */}
        {cartGroups.length > 1 && (
          <div className='mt-6 bg-blue-50 border-2 border-blue-200 rounded-2xl p-4'>
            <div className='flex gap-3'>
              <svg
                className='w-6 h-6 text-blue-600 flex-shrink-0'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              <div className='flex-1'>
                <h4 className='font-bold text-blue-900 mb-1'>
                  Multiple Orders
                </h4>
                <p className='text-sm text-blue-800'>
                  You have items from {cartGroups.length} different restaurants.
                  Each restaurant will be a separate order with its own
                  checkout.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
