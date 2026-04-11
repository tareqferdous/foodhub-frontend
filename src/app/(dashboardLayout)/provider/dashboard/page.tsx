"use client";

import { DollarSign, ShoppingBag, Store, UtensilsCrossed } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface ChartPoint {
  label: string;
  value: number;
}

interface ProviderDashboardData {
  provider: {
    id: string;
    restaurantName: string;
  };
  stats: {
    activeMeals: number;
    pendingOrders: number;
    deliveredOrders: number;
    totalRevenue: number;
  };
  charts: {
    monthlyOrders: ChartPoint[];
    monthlyRevenue: ChartPoint[];
    orderStatus: ChartPoint[];
    mealAvailability: ChartPoint[];
  };
  recentOrders: {
    id: string;
    customerName: string;
    status: string;
    totalPrice: number;
    createdAt: string;
  }[];
  topMeals: {
    id: string;
    title: string;
    category: string;
    price: number;
    isAvailable: boolean;
    totalOrders: number;
  }[];
}

const maxValue = (points: ChartPoint[]) =>
  points.length ? Math.max(...points.map((point) => point.value), 1) : 1;

const Donut = ({ points, title }: { points: ChartPoint[]; title: string }) => {
  const total = points.reduce((sum, item) => sum + item.value, 0);
  const gradient = useMemo(() => {
    const colors = ["#ef4444", "#f97316", "#10b981", "#0ea5e9"];
    let cursor = 0;

    return points
      .map((item, index) => {
        const start = cursor;
        const ratio = total ? (item.value / total) * 100 : 0;
        cursor += ratio;
        return `${colors[index % colors.length]} ${start}% ${cursor}%`;
      })
      .join(", ");
  }, [points, total]);

  return (
    <article className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm'>
      <h3 className='text-base font-semibold text-gray-900'>{title}</h3>
      <div className='mt-4 flex items-center gap-5'>
        <div
          className='h-28 w-28 rounded-full'
          style={{ background: `conic-gradient(${gradient})` }}>
          <div className='m-auto mt-4 flex h-20 w-20 items-center justify-center rounded-full bg-white text-sm font-semibold text-gray-700'>
            {total}
          </div>
        </div>
        <div className='space-y-2'>
          {points.map((item) => (
            <p key={item.label} className='text-sm text-gray-700'>
              <span className='font-semibold'>{item.label}:</span> {item.value}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
};

export default function ProviderDashboard() {
  const [data, setData] = useState<ProviderDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/providers/dashboard", {
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
      <div className='p-8 text-red-600'>Failed to load provider dashboard.</div>
    );
  }

  const orderChartMax = maxValue(data.charts.monthlyOrders);
  const revenueChartMax = maxValue(data.charts.monthlyRevenue);

  return (
    <section className='px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10'>
      <div className='mb-8'>
        <h1 className='text-2xl md:text-3xl font-bold text-gray-900'>
          Provider Dashboard
        </h1>
        <p className='text-sm md:text-base text-gray-600 mt-1'>
          {data.provider.restaurantName}
        </p>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4'>
        <article className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm'>
          <p className='text-sm text-gray-500'>Total Revenue</p>
          <h3 className='mt-2 text-2xl font-bold text-gray-900'>
            Tk {Number(data.stats.totalRevenue).toLocaleString("en-BD")}
          </h3>
          <div className='mt-2 inline-flex rounded-xl bg-red-50 p-2 text-red-600'>
            <DollarSign className='h-4 w-4' />
          </div>
        </article>
        <article className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm'>
          <p className='text-sm text-gray-500'>Pending Orders</p>
          <h3 className='mt-2 text-2xl font-bold text-gray-900'>
            {data.stats.pendingOrders}
          </h3>
          <div className='mt-2 inline-flex rounded-xl bg-orange-50 p-2 text-orange-600'>
            <ShoppingBag className='h-4 w-4' />
          </div>
        </article>
        <article className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm'>
          <p className='text-sm text-gray-500'>Delivered Orders</p>
          <h3 className='mt-2 text-2xl font-bold text-gray-900'>
            {data.stats.deliveredOrders}
          </h3>
          <div className='mt-2 inline-flex rounded-xl bg-emerald-50 p-2 text-emerald-600'>
            <Store className='h-4 w-4' />
          </div>
        </article>
        <article className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm'>
          <p className='text-sm text-gray-500'>Active Meals</p>
          <h3 className='mt-2 text-2xl font-bold text-gray-900'>
            {data.stats.activeMeals}
          </h3>
          <div className='mt-2 inline-flex rounded-xl bg-blue-50 p-2 text-blue-600'>
            <UtensilsCrossed className='h-4 w-4' />
          </div>
        </article>
      </div>

      <div className='mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3'>
        <article className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm xl:col-span-2'>
          <h3 className='text-lg font-semibold text-gray-900'>
            Orders by Month (Bar)
          </h3>
          <div className='mt-5 grid grid-cols-6 gap-3'>
            {data.charts.monthlyOrders.map((point) => (
              <div
                key={point.label}
                className='flex flex-col items-center gap-2'>
                <div className='flex h-36 items-end'>
                  <div
                    className='w-7 rounded-t-md bg-linear-to-t from-red-500 to-orange-400'
                    style={{
                      height: `${Math.max((point.value / orderChartMax) * 100, 8)}%`,
                    }}
                  />
                </div>
                <p className='text-xs text-gray-500'>{point.label}</p>
              </div>
            ))}
          </div>
        </article>

        <Donut points={data.charts.orderStatus} title='Order Status (Donut)' />
      </div>

      <div className='mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3'>
        <article className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm xl:col-span-2'>
          <h3 className='text-lg font-semibold text-gray-900'>
            Revenue Trend (Line)
          </h3>
          <svg viewBox='0 0 600 220' className='mt-4 h-56 w-full'>
            {data.charts.monthlyRevenue.map((point, index) => {
              if (index === 0) return null;

              const prev = data.charts.monthlyRevenue[index - 1];
              const x1 =
                ((index - 1) / (data.charts.monthlyRevenue.length - 1)) * 560 +
                20;
              const y1 = 180 - (prev.value / revenueChartMax) * 140;
              const x2 =
                (index / (data.charts.monthlyRevenue.length - 1)) * 560 + 20;
              const y2 = 180 - (point.value / revenueChartMax) * 140;

              return (
                <line
                  key={`${point.label}-line`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke='#ef4444'
                  strokeWidth='3'
                />
              );
            })}
            {data.charts.monthlyRevenue.map((point, index) => {
              const x =
                (index / (data.charts.monthlyRevenue.length - 1)) * 560 + 20;
              const y = 180 - (point.value / revenueChartMax) * 140;
              return (
                <g key={point.label}>
                  <circle cx={x} cy={y} r='4' fill='#ef4444' />
                  <text
                    x={x}
                    y='205'
                    textAnchor='middle'
                    className='fill-gray-500 text-[11px]'>
                    {point.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </article>

        <Donut
          points={data.charts.mealAvailability}
          title='Meal Availability (Pie/Donut)'
        />
      </div>

      <div className='mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2'>
        <article className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm'>
          <h3 className='text-lg font-semibold text-gray-900'>
            Recent Orders (Dynamic Table)
          </h3>
          <div className='mt-4 overflow-x-auto'>
            <table className='min-w-full text-sm'>
              <thead>
                <tr className='border-b border-gray-200 text-left text-gray-500'>
                  <th className='py-3 pr-4'>Order</th>
                  <th className='py-3 pr-4'>Customer</th>
                  <th className='py-3 pr-4'>Status</th>
                  <th className='py-3 pr-4'>Amount</th>
                </tr>
              </thead>
              <tbody>
                {data.recentOrders.map((order) => (
                  <tr key={order.id} className='border-b border-gray-100'>
                    <td className='py-3 pr-4 font-medium text-gray-900'>
                      #{order.id.slice(0, 8)}
                    </td>
                    <td className='py-3 pr-4 text-gray-700'>
                      {order.customerName}
                    </td>
                    <td className='py-3 pr-4 text-gray-700'>{order.status}</td>
                    <td className='py-3 pr-4 text-gray-700'>
                      Tk {order.totalPrice.toLocaleString("en-BD")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm'>
          <h3 className='text-lg font-semibold text-gray-900'>
            Top Meals (Dynamic Table)
          </h3>
          <div className='mt-4 overflow-x-auto'>
            <table className='min-w-full text-sm'>
              <thead>
                <tr className='border-b border-gray-200 text-left text-gray-500'>
                  <th className='py-3 pr-4'>Meal</th>
                  <th className='py-3 pr-4'>Category</th>
                  <th className='py-3 pr-4'>Orders</th>
                  <th className='py-3 pr-4'>Price</th>
                </tr>
              </thead>
              <tbody>
                {data.topMeals.map((meal) => (
                  <tr key={meal.id} className='border-b border-gray-100'>
                    <td className='py-3 pr-4 font-medium text-gray-900'>
                      {meal.title}
                    </td>
                    <td className='py-3 pr-4 text-gray-700'>{meal.category}</td>
                    <td className='py-3 pr-4 text-gray-700'>
                      {meal.totalOrders}
                    </td>
                    <td className='py-3 pr-4 text-gray-700'>
                      Tk {meal.price.toLocaleString("en-BD")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </section>
  );
}
