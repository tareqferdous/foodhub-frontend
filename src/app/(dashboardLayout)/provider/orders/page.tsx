"use client";

import ProviderOrderCard from "@/components/modules/provider/ProviderOrderCard";
import { Order } from "@/types/orderTypes";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProviderOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/orders/provider`,
          {
            credentials: "include",
          },
        );

        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            setOrders(result.data as Order[]);
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
    return new Date(dateString).toLocaleDateString("en-BD", {
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

  const handleStatusUpdate = async (
    orderId: string,
    newStatus: Order["status"],
  ) => {
    const toastId = toast.loading("Updating status...");
    try {
      const response = await fetch(
        `/api/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status: newStatus }),
        },
      );

      if (response.ok) {
        toast.success("Status updated successfully", { id: toastId });
        setOrders(
          orders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order,
          ),
        );
      } else {
        toast.error("Failed to update status", { id: toastId });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status", { id: toastId });
    }
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

  console.log("order", orders);

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-rose-50'>
      {/* Main Content */}

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
                No Orders Found
              </h3>
              <p className='text-gray-600'>No orders have been placed yet</p>
            </div>
          ) : (
            orders.map((order) => (
              <ProviderOrderCard
                key={order.id}
                order={order}
                formatDate={formatDate}
                handleStatusUpdate={handleStatusUpdate}
                formatCurrency={formatCurrency}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
