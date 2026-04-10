"use client";

import {
  Bike,
  CheckCircle2,
  ChefHat,
  ClipboardCheck,
  PackageCheck,
} from "lucide-react";
import { useState } from "react";

type OrderStep = {
  id: number;
  title: string;
  eta: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

const orderSteps: OrderStep[] = [
  {
    id: 1,
    title: "Order Placed",
    eta: "0 min",
    description: "Customer confirms cart and delivery details.",
    icon: ClipboardCheck,
  },
  {
    id: 2,
    title: "Provider Accepts",
    eta: "3-5 min",
    description: "Restaurant accepts and starts preparing your meal.",
    icon: CheckCircle2,
  },
  {
    id: 3,
    title: "Preparing",
    eta: "10-18 min",
    description: "Kitchen team cooks and packs your order carefully.",
    icon: ChefHat,
  },
  {
    id: 4,
    title: "Out for Delivery",
    eta: "20-28 min",
    description: "Rider picks up and heads to your location.",
    icon: Bike,
  },
  {
    id: 5,
    title: "Delivered",
    eta: "30 min",
    description: "Order arrives fresh at your doorstep.",
    icon: PackageCheck,
  },
];

export default function LiveOrderJourney() {
  const [activeStepId, setActiveStepId] = useState(1);

  return (
    <section
      id='live-journey'
      className='py-16 bg-gradient-to-b from-rose-50/60 to-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-10'>
          <h2 className='text-4xl font-bold font-display text-gray-900'>
            Live Order Journey
          </h2>
          <p className='text-gray-600 mt-3 text-lg'>
            Track every order stage from checkout to doorstep delivery.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-5 gap-6'>
          <div className='lg:col-span-3 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm'>
            <div className='space-y-3'>
              {orderSteps.map((step) => {
                const Icon = step.icon;
                const isActive = step.id === activeStepId;
                const isCompleted = step.id < activeStepId;

                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStepId(step.id)}
                    className={`w-full text-left rounded-2xl border p-4 transition ${
                      isActive
                        ? "border-red-300 bg-red-50"
                        : isCompleted
                          ? "border-green-200 bg-green-50"
                          : "border-gray-100 bg-white hover:border-red-200"
                    }`}>
                    <div className='flex items-start gap-3'>
                      <div
                        className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                          isActive
                            ? "bg-red-100 text-red-600"
                            : isCompleted
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-100 text-gray-500"
                        }`}>
                        <Icon className='w-5 h-5' />
                      </div>

                      <div className='flex-1'>
                        <div className='flex items-center justify-between gap-3'>
                          <h3 className='font-semibold text-gray-900'>
                            {step.title}
                          </h3>
                          <span className='text-xs font-semibold rounded-full px-3 py-1 bg-gray-100 text-gray-600'>
                            ETA {step.eta}
                          </span>
                        </div>
                        <p className='mt-1 text-sm text-gray-600'>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className='lg:col-span-2 space-y-4'>
            <article className='rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-rose-50 p-5'>
              <h3 className='text-lg font-bold text-gray-900'>For Customers</h3>
              <ul className='mt-3 text-sm text-gray-700 space-y-2'>
                <li>Transparent order status with clear ETA.</li>
                <li>Less uncertainty during busy meal hours.</li>
                <li>Faster support when delays happen.</li>
              </ul>
            </article>

            <article className='rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5'>
              <h3 className='text-lg font-bold text-gray-900'>For Providers</h3>
              <ul className='mt-3 text-sm text-gray-700 space-y-2'>
                <li>Better kitchen-to-delivery coordination.</li>
                <li>Reduced cancellation from status clarity.</li>
                <li>Improved customer trust and repeat orders.</li>
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
