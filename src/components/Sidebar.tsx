"use client";

import { useState } from "react";

export default function Sidebar() {
  const [mealType, setMealType] = useState("");
  const [deliveryTime, setDeliveryTime] = useState(0);

  return (
    <aside className='w-64 bg-white rounded-lg p-6 h-fit sticky top-24 hidden lg:block'>
      <h2 className='text-xl font-bold mb-6 text-gray-700'>Filters</h2>

      {/* Meal Type */}
      <div className='mb-6'>
        <h3 className='font-semibold mb-3 '>Meal Type</h3>
        <div className='space-y-2'>
          {["breakfast", "lunch", "evening-snacks", "dinner"].map((meal) => (
            <label
              key={meal}
              className='flex items-center gap-2 cursor-pointer text-gray-700'>
              <input
                type='radio'
                name='meal'
                value={meal}
                checked={mealType === meal}
                onChange={(e) => setMealType(e.target.value)}
                className='w-4 h-4 text-red-600 accent-red-600'
              />
              <span className='text-sm capitalize'>
                {meal.replace("-", " ")}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Delivery Time */}
      <div className='mb-6'>
        <div className='flex items-center justify-between mb-3'>
          <h3 className='font-semibold '>Price</h3>
          <span className='text-xs text-gray-500'>(0 - 120 min)</span>
        </div>
        <input
          type='range'
          min='0'
          max='120'
          value={deliveryTime}
          onChange={(e) => setDeliveryTime(parseInt(e.target.value))}
          className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600'
        />
        <div className='text-xs text-gray-500 mt-1 text-center'>
          {deliveryTime} min
        </div>
      </div>

      {/* Cuisines */}
      <div>
        <h3 className='font-semibold mb-3 '>Cuisines</h3>
        <div className='space-y-2'>
          {["Burger", "Biryani", "Pizza", "Chicken"].map((cuisine) => (
            <label
              key={cuisine}
              className='flex items-center gap-2 cursor-pointer text-gray-700'>
              <input
                type='checkbox'
                className='w-4 h-4 text-gray-700 rounded '
              />
              <span className='text-sm'>{cuisine}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}

