"use client";

import { useEffect, useState } from "react";

interface OverviewItem {
  title: string;
  value: number | string;
  note: string;
}

interface ChartPoint {
  label: string;
  value: number;
}

interface DashboardOrderRow {
  id: string;
  status: string;
  totalPrice: number;
  createdAt: string;
  providerName: string;
}

interface CustomerDashboardData {
  overview: {
    totalOrders: number;
    activeOrders: number;
    deliveredOrders: number;
    totalSpent: number;
  };
  monthlyOrders: ChartPoint[];
  statusDistribution: ChartPoint[];
  recentOrders: DashboardOrderRow[];
}

const maxFrom = (points: ChartPoint[]) =>
  points.length ? Math.max(...points.map((point) => point.value), 1) : 1;

export default function CustomerDashboardPage() {
  const [data, setData] = useState<CustomerDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/profile/dashboard", {
          credentials: "include",
        });

        if (!response.ok) return;

        const result = await response.json();
        if (result.success) {
          setData(result.data);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className='min-h-[70vh] flex items-center justify-center'>
        <div className='h-14 w-14 rounded-full border-4 border-red-500 border-t-transparent animate-spin' />
      </div>
    );
  }

  if (!data) {
    return (
      <div className='p-8'>
        <h2 className='text-xl font-semibold text-gray-800'>
          Unable to load dashboard.
        </h2>
      </div>
    );
  }

  const overviewItems: OverviewItem[] = [
    {
      title: "Total Orders",
      value: data.overview.totalOrders,
      note: "All time",
    },
    {
      title: "Active Orders",
      value: data.overview.activeOrders,
      note: "Pending delivery",
    },
    {
      title: "Delivered",
      value: data.overview.deliveredOrders,
      note: "Completed",
    },
    {
      title: "Total Spent",
      value: `Tk ${Number(data.overview.totalSpent).toLocaleString("en-BD")}`,
      note: "Delivered orders",
    },
  ];

  const monthlyMax = maxFrom(data.monthlyOrders);

  return (
    <section className='px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10'>
      <div className='mb-8'>
        <h1 className='text-2xl md:text-3xl font-bold text-gray-900'>
          Your Dashboard
        </h1>
        <p className='text-sm md:text-base text-gray-600 mt-1'>
          Your order activity and spending insights
        </p>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4'>
        {overviewItems.map((item) => (
          <article
            key={item.title}
            className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm'>
            <p className='text-sm text-gray-500'>{item.title}</p>
            <h3 className='mt-2 text-2xl font-bold text-gray-900'>
              {item.value}
            </h3>
            <p className='mt-1 text-xs text-gray-400'>{item.note}</p>
          </article>
        ))}
      </div>

      <div className='mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3'>
        <article className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm xl:col-span-2'>
          <h2 className='text-lg font-semibold text-gray-900'>
            Monthly Orders
          </h2>
          <div className='mt-6 grid grid-cols-6 gap-3'>
            {data.monthlyOrders.map((point) => (
              <div
                key={point.label}
                className='flex flex-col items-center gap-2'>
                <div className='flex h-36 items-end'>
                  <div
                    className='w-7 rounded-t-md bg-linear-to-t from-red-500 to-orange-400'
                    style={{
                      height: `${Math.max((point.value / monthlyMax) * 100, 8)}%`,
                    }}
                  />
                </div>
                <p className='text-xs text-gray-500'>{point.label}</p>
              </div>
            ))}
          </div>
        </article>

        <article className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm'>
          <h2 className='text-lg font-semibold text-gray-900'>Order Status</h2>
          <div className='mt-5 space-y-3'>
            {data.statusDistribution.map((item) => (
              <div key={item.label}>
                <div className='mb-1 flex items-center justify-between text-sm'>
                  <span className='text-gray-600'>{item.label}</span>
                  <span className='font-semibold text-gray-900'>
                    {item.value}
                  </span>
                </div>
                <div className='h-2 rounded-full bg-gray-100'>
                  <div
                    className='h-2 rounded-full bg-linear-to-r from-red-500 to-orange-500'
                    style={{
                      width: `${
                        data.overview.totalOrders
                          ? (item.value / data.overview.totalOrders) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>

      <article className='mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm'>
        <h2 className='text-lg font-semibold text-gray-900'>Recent Orders</h2>
        <div className='mt-4 overflow-x-auto'>
          <table className='min-w-full text-sm'>
            <thead>
              <tr className='border-b border-gray-200 text-left text-gray-500 bg-gray-50'>
                <th className='py-2 md:py-3 px-3 md:px-4 font-semibold text-xs md:text-sm'>
                  Order ID
                </th>
                <th className='py-2 md:py-3 px-3 md:px-4 font-semibold text-xs md:text-sm hidden sm:table-cell'>
                  Restaurant
                </th>
                <th className='py-2 md:py-3 px-3 md:px-4 font-semibold text-xs md:text-sm'>
                  Status
                </th>
                <th className='py-2 md:py-3 px-3 md:px-4 font-semibold text-xs md:text-sm hidden md:table-cell'>
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {data.recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className='border-b border-gray-100 hover:bg-gray-50'>
                  <td className='py-2 md:py-3 px-3 md:px-4 font-medium text-gray-900 text-xs md:text-sm'>
                    #{order.id.slice(0, 8)}
                  </td>
                  <td className='py-2 md:py-3 px-3 md:px-4 hidden sm:table-cell text-xs md:text-sm text-gray-700'>
                    {order.providerName}
                  </td>
                  <td className='py-2 md:py-3 px-3 md:px-4'>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        order.status === "DELIVERED"
                          ? "bg-green-50 text-green-700"
                          : order.status === "PENDING"
                            ? "bg-yellow-50 text-yellow-700"
                            : "bg-red-50 text-red-700"
                      }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className='py-2 md:py-3 px-3 md:px-4 hidden md:table-cell font-semibold text-gray-900 text-xs md:text-sm'>
                    Tk {Number(order.totalPrice).toLocaleString("en-BD")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
}
