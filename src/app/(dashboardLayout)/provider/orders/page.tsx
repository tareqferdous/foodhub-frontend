"use client";

import {
  CheckCircle,
  Clock,
  MapPin,
  Package,
  Phone,
  Truck,
  XCircle,
} from "lucide-react";
import { useState } from "react";

type Order = (typeof orders)[number];

// Mock data
const orders = [
  {
    id: "ORD-001",
    customer: {
      name: "John Doe",
      phone: "+880 1234-567890",
      address: "123 Main Street, Dhaka 1212",
    },
    items: [
      {
        name: "Chicken Tikka Masala",
        quantity: 2,
        price: 12.99,
        image:
          "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=100",
      },
      {
        name: "Garlic Naan",
        quantity: 3,
        price: 2.99,
        image:
          "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=100",
      },
    ],
    total: 34.95,
    status: "pending",
    paymentMethod: "Cash on Delivery",
    notes: "Please add extra spicy",
    createdAt: "2024-01-30T10:30:00",
    estimatedTime: 25,
  },
  {
    id: "ORD-002",
    customer: {
      name: "Sarah Smith",
      phone: "+880 1234-567891",
      address: "456 Oak Avenue, Dhaka 1215",
    },
    items: [
      {
        name: "Margherita Pizza",
        quantity: 1,
        price: 10.99,
        image:
          "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=100",
      },
    ],
    total: 13.98,
    status: "preparing",
    paymentMethod: "Cash on Delivery",
    notes: "",
    createdAt: "2024-01-30T10:15:00",
    estimatedTime: 20,
  },
  {
    id: "ORD-003",
    customer: {
      name: "Mike Chen",
      phone: "+880 1234-567892",
      address: "789 Park Road, Dhaka 1220",
    },
    items: [
      {
        name: "Pad Thai Noodles",
        quantity: 2,
        price: 11.99,
        image:
          "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=100",
      },
      {
        name: "Spring Rolls",
        quantity: 1,
        price: 5.99,
        image:
          "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=100",
      },
    ],
    total: 32.96,
    status: "delivering",
    paymentMethod: "Cash on Delivery",
    notes: "Ring doorbell twice",
    createdAt: "2024-01-30T09:45:00",
    estimatedTime: 15,
  },
];

const statusOptions = [
  {
    value: "pending",
    label: "Pending",
    icon: Clock,
    color: "text-yellow-600",
    bg: "bg-yellow-100",
  },
  {
    value: "preparing",
    label: "Preparing",
    icon: Package,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    value: "delivering",
    label: "Out for Delivery",
    icon: Truck,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    value: "completed",
    label: "Completed",
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    value: "cancelled",
    label: "Cancelled",
    icon: XCircle,
    color: "text-red-600",
    bg: "bg-red-100",
  },
];

export default function ProviderOrdersPage() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    console.log("Updating order", orderId, "to", newStatus);
    // API call here
  };

  const getStatusInfo = (status: string) => {
    return statusOptions.find((s) => s.value === status) || statusOptions[0];
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-white border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <h1 className='text-3xl font-bold text-gray-900 font-display'>
            Orders Management
          </h1>
          <p className='text-gray-600 mt-1'>
            {filteredOrders.length} orders to manage
          </p>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Filter Tabs */}
        <div className='flex gap-2 mb-6 overflow-x-auto pb-2'>
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-6 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
              filterStatus === "all"
                ? "bg-primary-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}>
            All Orders ({orders.length})
          </button>
          {statusOptions
            .filter((s) => s.value !== "completed" && s.value !== "cancelled")
            .map((status) => (
              <button
                key={status.value}
                onClick={() => setFilterStatus(status.value)}
                className={`px-6 py-2 rounded-lg font-semibold whitespace-nowrap transition flex items-center gap-2 ${
                  filterStatus === status.value
                    ? "bg-primary-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}>
                <status.icon className='w-4 h-4' />
                {status.label} (
                {orders.filter((o) => o.status === status.value).length})
              </button>
            ))}
        </div>

        {/* Orders List */}
        <div className='space-y-4'>
          {filteredOrders.map((order) => {
            const statusInfo = getStatusInfo(order.status);
            const StatusIcon = statusInfo.icon;

            return (
              <div key={order.id} className='card p-6'>
                <div className='flex flex-col lg:flex-row gap-6'>
                  {/* Order Info */}
                  <div className='flex-1 space-y-4'>
                    {/* Header */}
                    <div className='flex items-start justify-between'>
                      <div>
                        <div className='flex items-center gap-3 mb-2'>
                          <h3 className='text-xl font-bold text-gray-900'>
                            {order.id}
                          </h3>
                          <span
                            className={`badge ${statusInfo.bg} ${statusInfo.color} flex items-center gap-1`}>
                            <StatusIcon className='w-4 h-4' />
                            {statusInfo.label}
                          </span>
                        </div>
                        <div className='text-sm text-gray-600'>
                          {new Date(order.createdAt).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          <span className='mx-2'>•</span>
                          Est. {order.estimatedTime} min
                        </div>
                      </div>
                      <div className='text-right'>
                        <div className='text-2xl font-bold text-primary-600'>
                          ${order.total.toFixed(2)}
                        </div>
                        <div className='text-sm text-gray-600'>
                          {order.paymentMethod}
                        </div>
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className='bg-gray-50 rounded-lg p-4 space-y-2'>
                      <div className='flex items-center gap-2 text-gray-900 font-semibold'>
                        <span>👤</span>
                        {order.customer.name}
                      </div>
                      <div className='flex items-start gap-2 text-sm text-gray-600'>
                        <Phone className='w-4 h-4 mt-0.5 flex-shrink-0' />
                        <a
                          href={`tel:${order.customer.phone}`}
                          className='hover:text-primary-600'>
                          {order.customer.phone}
                        </a>
                      </div>
                      <div className='flex items-start gap-2 text-sm text-gray-600'>
                        <MapPin className='w-4 h-4 mt-0.5 flex-shrink-0' />
                        <span>{order.customer.address}</span>
                      </div>
                      {order.notes && (
                        <div className='pt-2 border-t border-gray-200'>
                          <div className='text-xs text-gray-500 mb-1'>
                            Special Instructions:
                          </div>
                          <div className='text-sm text-gray-700 italic'>
                            {order.notes}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Order Items */}
                    <div className='space-y-3'>
                      <div className='font-semibold text-gray-900'>
                        Order Items:
                      </div>
                      {order.items.map((item, index) => (
                        <div key={index} className='flex items-center gap-4'>
                          <img
                            src={item.image}
                            alt={item.name}
                            className='w-16 h-16 rounded-lg object-cover'
                          />
                          <div className='flex-1'>
                            <div className='font-medium text-gray-900'>
                              {item.name}
                            </div>
                            <div className='text-sm text-gray-600'>
                              Qty: {item.quantity}
                            </div>
                          </div>
                          <div className='font-semibold text-gray-900'>
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className='lg:w-64 flex-shrink-0'>
                    <div className='card p-4 bg-gray-50 space-y-3'>
                      <div className='font-semibold text-gray-900 mb-3'>
                        Update Status
                      </div>

                      {order.status === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              updateOrderStatus(order.id, "preparing")
                            }
                            className='btn-primary w-full flex items-center justify-center gap-2'>
                            <Package className='w-4 h-4' />
                            Accept & Start Preparing
                          </button>
                          <button
                            onClick={() =>
                              updateOrderStatus(order.id, "cancelled")
                            }
                            className='btn-secondary w-full text-red-600 border-red-200 hover:bg-red-50'>
                            Reject Order
                          </button>
                        </>
                      )}

                      {order.status === "preparing" && (
                        <button
                          onClick={() =>
                            updateOrderStatus(order.id, "delivering")
                          }
                          className='btn-primary w-full flex items-center justify-center gap-2'>
                          <Truck className='w-4 h-4' />
                          Mark as Out for Delivery
                        </button>
                      )}

                      {order.status === "delivering" && (
                        <button
                          onClick={() =>
                            updateOrderStatus(order.id, "completed")
                          }
                          className='btn-primary w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700'>
                          <CheckCircle className='w-4 h-4' />
                          Mark as Completed
                        </button>
                      )}

                      {(order.status === "completed" ||
                        order.status === "cancelled") && (
                        <div
                          className={`p-4 rounded-lg ${statusInfo.bg} ${statusInfo.color} text-center`}>
                          <StatusIcon className='w-8 h-8 mx-auto mb-2' />
                          <div className='font-semibold'>
                            {statusInfo.label}
                          </div>
                        </div>
                      )}

                      {/* Additional Actions */}
                      <div className='pt-3 border-t border-gray-200 space-y-2'>
                        <button className='w-full px-4 py-2 text-sm bg-white border-2 border-gray-200 rounded-lg hover:border-primary-600 transition'>
                          Print Receipt
                        </button>
                        <button className='w-full px-4 py-2 text-sm bg-white border-2 border-gray-200 rounded-lg hover:border-primary-600 transition'>
                          Contact Customer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className='card p-12 text-center'>
            <Package className='w-16 h-16 text-gray-300 mx-auto mb-4' />
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>
              No orders found
            </h3>
            <p className='text-gray-600'>
              {filterStatus === "all"
                ? "You don't have any orders yet"
                : `No ${filterStatus} orders at the moment`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
