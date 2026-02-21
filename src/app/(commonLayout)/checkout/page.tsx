"use client";

import { useCart } from "@/contexts/CartContext";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "sonner";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const providerId = searchParams.get("providerId");
  const router = useRouter();

  const { items, clearProviderCart } = useCart();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const providerItems = items.filter((item) => item.providerId === providerId);

  const totalPrice = providerItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Show success screen immediately after order — prevents "No items" flash
  if (isRedirecting) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='bg-white p-8 rounded-xl shadow-sm text-center max-w-sm'>
          <div className='w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4'>
            <svg
              className='w-8 h-8 text-green-500'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M5 13l4 4L19 7'
              />
            </svg>
          </div>
          <h2 className='text-xl font-bold text-gray-900 mb-1'>Order Placed!</h2>
          <p className='text-gray-500 text-sm'>Redirecting to your order...</p>
          <div className='mt-4 w-8 h-8 border-2 border-gray-200 border-t-[#e10101] rounded-full animate-spin mx-auto' />
        </div>
      </div>
    );
  }

  // Show success screen immediately after order — prevents "No items" flash
  if (isRedirecting) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='bg-white p-8 rounded-xl shadow-sm text-center max-w-sm'>
          <div className='w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4'>
            <svg
              className='w-8 h-8 text-green-500'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M5 13l4 4L19 7'
              />
            </svg>
          </div>
          <h2 className='text-xl font-bold text-gray-900 mb-1'>Order Placed!</h2>
          <p className='text-gray-500 text-sm'>
            Redirecting to your order...
          </p>
          <div className='mt-4 w-8 h-8 border-2 border-gray-200 border-t-[#e10101] rounded-full animate-spin mx-auto' />
        </div>
      </div>
    );
  }

  if (!providerId || providerItems.length === 0) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='bg-white p-8 rounded-xl shadow-sm text-center'>
          <div className='w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4'>
            <svg
              className='w-8 h-8 text-[#e10101]'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </div>
          <p className='text-gray-600 text-lg'>No items in checkout</p>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    const toastId = toast.loading("Placing your order...");
    try {
      setLoading(true);

      const res = await fetch(`/api/orders`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          providerId,
          deliveryAddress: address,
          items: providerItems.map((item) => ({
            mealId: item.mealId,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Order failed", { id: toastId });
        throw new Error(data.message || "Order failed");
      }
      toast.success("Order placed successfully!", {
        id: toastId
      });
      setIsRedirecting(true);
      router.push(`/orders/${data.data.id}`);
      clearProviderCart(providerId);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "An error occurred", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>Checkout</h1>
          <p className='mt-2 text-sm text-gray-600'>
            Complete your order details below
          </p>
        </div>

        <div className='space-y-6'>
          {/* Order Summary Card */}
          <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
            <div className='bg-gradient-to-r from-[#e10101] to-[#c00000] px-6 py-4'>
              <h2 className='text-lg font-semibold text-white'>
                Order Summary
              </h2>
            </div>

            <div className='p-6 space-y-4'>
              {providerItems.map((item, index) => (
                <div key={item.mealId}>
                  <div className='flex justify-between items-start'>
                    <div className='flex-1'>
                      <h3 className='font-medium text-gray-900'>
                        {item.title}
                      </h3>
                      <p className='text-sm text-gray-500 mt-1'>
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className='text-right ml-4'>
                      <p className='font-semibold text-gray-900'>
                        ৳{item.price * item.quantity}
                      </p>
                      <p className='text-xs text-gray-500 mt-1'>
                        ৳{item.price} each
                      </p>
                    </div>
                  </div>
                  {index < providerItems.length - 1 && (
                    <div className='border-b border-gray-100 mt-4'></div>
                  )}
                </div>
              ))}

              <div className='border-t-2 border-gray-200 pt-4 mt-4'>
                <div className='flex justify-between items-center'>
                  <span className='text-lg font-bold text-gray-900'>Total</span>
                  <span className='text-2xl font-bold text-[#e10101]'>
                    ৳{totalPrice}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Address Card */}
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
                    d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                </svg>
                Delivery Address
              </h2>
            </div>

            <div className='p-6'>
              <textarea
                placeholder='Enter your complete delivery address (House/Flat, Street, Area, Landmark)'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className='w-full border-2 border-gray-200 rounded-lg p-4 focus:border-[#e10101] focus:ring-2 focus:ring-[#e10101]/20 transition-all outline-none resize-none'
                rows={4}
              />
              {!address && (
                <p className='mt-2 text-xs text-gray-500 flex items-center'>
                  <svg
                    className='w-4 h-4 mr-1'
                    fill='currentColor'
                    viewBox='0 0 20 20'>
                    <path
                      fillRule='evenodd'
                      d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                      clipRule='evenodd'
                    />
                  </svg>
                  Please enter your delivery address to proceed
                </p>
              )}
            </div>
          </div>

          {/* Payment Method Card */}
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
                    d='M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z'
                  />
                </svg>
                Payment Method
              </h2>
            </div>

            <div className='p-6'>
              <div className='flex items-center justify-between bg-gray-50 rounded-lg p-4 border-2 border-[#e10101]'>
                <div className='flex items-center'>
                  <div className='w-10 h-10 bg-[#e10101] rounded-full flex items-center justify-center mr-3'>
                    <svg
                      className='w-6 h-6 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                  </div>
                  <div>
                    <p className='font-semibold text-gray-900'>
                      Cash on Delivery
                    </p>
                    <p className='text-sm text-gray-600'>
                      Pay when you receive your order
                    </p>
                  </div>
                </div>
                <svg
                  className='w-6 h-6 text-[#e10101]'
                  fill='currentColor'
                  viewBox='0 0 20 20'>
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            disabled={loading || !address}
            className='w-full bg-[#e10101] hover:bg-[#c00000] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2'>
            {loading ? (
              <>
                <svg
                  className='animate-spin h-5 w-5 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'>
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                </svg>
                <span>Placing Order...</span>
              </>
            ) : (
              <>
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 13l4 4L19 7'
                  />
                </svg>
                <span>Place Order</span>
              </>
            )}
          </button>

          {/* Security Notice */}
          <div className='text-center text-sm text-gray-500 flex items-center justify-center space-x-2'>
            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
              <path
                fillRule='evenodd'
                d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                clipRule='evenodd'
              />
            </svg>
            <span>Your order information is secure and encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading fallback component
function CheckoutLoadingFallback() {
  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto'>
        <div className='mb-8'>
          <div className='h-9 bg-gray-200 rounded w-48 animate-pulse'></div>
          <div className='h-5 bg-gray-200 rounded w-64 mt-2 animate-pulse'></div>
        </div>
        <div className='space-y-6'>
          <div className='bg-white rounded-xl shadow-sm h-64 animate-pulse'></div>
          <div className='bg-white rounded-xl shadow-sm h-48 animate-pulse'></div>
          <div className='bg-white rounded-xl shadow-sm h-32 animate-pulse'></div>
        </div>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
const CheckoutPage = () => {
  return (
    <Suspense fallback={<CheckoutLoadingFallback />}>
      <CheckoutContent />
    </Suspense>
  );
};

export default CheckoutPage;
