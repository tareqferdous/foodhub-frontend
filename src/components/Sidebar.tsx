"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

interface Category {
  id: string;
  name: string;
}

interface MealFiltersProps {
  activeFilters: {
    cuisine?: string;
    dietary?: string;
    minPrice?: string;
    maxPrice?: string;
    search?: string;
  };
}

const dietaryOptions = [
  { value: "VEG", label: "Vegetarian", icon: "🥬" },
  { value: "NON_VEG", label: "Non-Vegetarian", icon: "🍗" },
  { value: "HALAL", label: "Halal", icon: "☪️" },
];

export default function Sidebar({
  activeFilters,
  categories,
  dietaryTypes,
}: MealFiltersProps & { categories: Category[]; dietaryTypes: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Local state for form inputs
  const [filters, setFilters] = useState({
    cuisine: activeFilters.cuisine || "",
    dietary: activeFilters.dietary || "",
    minPrice: activeFilters.minPrice || "",
    maxPrice: activeFilters.maxPrice || "",
    search: activeFilters.search || "",
  });

  const updateURL = (newFilters: typeof filters) => {
    const params = new URLSearchParams();

    // Add only non-empty filters to URL
    if (newFilters.cuisine) params.set("cuisine", newFilters.cuisine);
    if (newFilters.dietary) params.set("dietary", newFilters.dietary);
    if (newFilters.minPrice) params.set("minPrice", newFilters.minPrice);
    if (newFilters.maxPrice) params.set("maxPrice", newFilters.maxPrice);
    if (newFilters.search) params.set("search", newFilters.search);

    // Use startTransition for smoother updates
    startTransition(() => {
      router.push(`/meals?${params.toString()}`);
    });
  };

  const handleCuisineChange = (cuisine: string) => {
    const newCuisine = filters.cuisine === cuisine ? "" : cuisine;
    const newFilters = { ...filters, cuisine: newCuisine };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const handleDietaryChange = (dietary: string) => {
    const newDietary = filters.dietary === dietary ? "" : dietary;
    const newFilters = { ...filters, dietary: newDietary };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const handlePriceChange = () => {
    updateURL(filters);
  };

  const handleClearAllFilters = () => {
    const clearedFilters = {
      cuisine: "",
      dietary: "",
      minPrice: "",
      maxPrice: "",
      search: "",
    };
    setFilters(clearedFilters);
    startTransition(() => {
      router.push("/meals");
    });
  };

  const hasActiveFilters =
    filters.cuisine || filters.dietary || filters.minPrice || filters.maxPrice;

  return (
    <aside className='w-72 bg-white rounded-xl shadow-sm p-6 h-fit sticky top-24 hidden lg:block border border-gray-100'>
      {/* Header */}
      <div className='flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-100'>
        <div className='flex items-center gap-2'>
          <svg
            className='w-5 h-5 text-[#e10101]'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z'
            />
          </svg>
          <h2 className='text-xl font-bold text-gray-900'>Filters</h2>
        </div>
        {hasActiveFilters && (
          <span className='bg-[#e10101] text-white text-xs font-bold px-2 py-1 rounded-full'>
            {
              [
                filters.cuisine,
                filters.dietary,
                filters.minPrice || filters.maxPrice,
              ].filter(Boolean).length
            }
          </span>
        )}
      </div>

      <div className='space-y-6'>
        {/* Cuisines */}
        <div>
          <h3 className='flex items-center gap-2 font-semibold text-[#e10101] mb-4 text-sm uppercase tracking-wide'>
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
              />
            </svg>
            Cuisines
          </h3>
          <div className='space-y-2.5'>
            {categories.map((category) => (
              <label
                key={category.id}
                className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg transition-all hover:bg-gray-50 ${
                  filters.cuisine === category.name
                    ? "bg-red-50 border-2 border-[#e10101]"
                    : "border-2 border-transparent"
                }`}>
                <div className='relative'>
                  <input
                    type='checkbox'
                    name='cuisine'
                    value={category.name}
                    checked={filters.cuisine === category.name}
                    onChange={() => handleCuisineChange(category.name)}
                    disabled={isPending}
                    className='w-5 h-5 text-[#e10101] rounded border-gray-300 focus:ring-[#e10101] focus:ring-2 cursor-pointer'
                  />
                </div>
                <span
                  className={`text-sm font-medium capitalize flex-1 ${
                    filters.cuisine === category.name
                      ? "text-[#e10101]"
                      : "text-gray-700"
                  }`}>
                  {category.name.replace("-", " ")}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className='border-t border-gray-200'></div>

        {/* Dietary */}
        <div>
          <h3 className='flex items-center gap-2 font-semibold text-[#e10101] mb-4 text-sm uppercase tracking-wide'>
            <svg
              className='w-4 h-4'
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
            Dietary
          </h3>
          <div className='space-y-2.5'>
            {dietaryOptions.map((dietary) => (
              <label
                key={dietary.value}
                className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg transition-all hover:bg-gray-50 ${
                  filters.dietary === dietary.value
                    ? "bg-red-50 border-2 border-[#e10101]"
                    : "border-2 border-transparent"
                }`}>
                <div className='relative'>
                  <input
                    type='checkbox'
                    checked={filters.dietary === dietary.value}
                    onChange={() => handleDietaryChange(dietary.value)}
                    disabled={isPending}
                    className='w-5 h-5 text-[#e10101] rounded border-gray-300 focus:ring-[#e10101] focus:ring-2 cursor-pointer'
                  />
                </div>
                <span className='text-lg'>{dietary.icon}</span>
                <span
                  className={`text-sm font-medium flex-1 ${
                    filters.dietary === dietary.value
                      ? "text-[#e10101]"
                      : "text-gray-700"
                  }`}>
                  {dietary.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className='border-t border-gray-200'></div>

        {/* Price Range */}
        <div>
          <h3 className='flex items-center gap-2 font-semibold text-[#e10101] mb-4 text-sm uppercase tracking-wide'>
            <svg
              className='w-4 h-4'
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
            Price Range
          </h3>
          <div className='space-y-4'>
            <div className='grid grid-cols-2 gap-3'>
              <div>
                <label className='text-xs font-medium text-gray-600 mb-2 block'>
                  Min (৳)
                </label>
                <input
                  type='number'
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, minPrice: e.target.value })
                  }
                  placeholder='0'
                  className='w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-[#e10101] focus:ring-2 focus:ring-[#e10101]/20 outline-none transition-all text-sm'
                  min='0'
                />
              </div>
              <div>
                <label className='text-xs font-medium text-gray-600 mb-2 block'>
                  Max (৳)
                </label>
                <input
                  type='number'
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, maxPrice: e.target.value })
                  }
                  placeholder='1000'
                  className='w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-[#e10101] focus:ring-2 focus:ring-[#e10101]/20 outline-none transition-all text-sm'
                  min='0'
                />
              </div>
            </div>
            <button
              onClick={handlePriceChange}
              disabled={isPending || (!filters.minPrice && !filters.maxPrice)}
              className='w-full bg-[#e10101] hover:bg-[#c00000] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2'>
              {isPending ? (
                <>
                  <svg
                    className='animate-spin h-4 w-4 text-white'
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
                  Applying...
                </>
              ) : (
                <>
                  <svg
                    className='w-4 h-4'
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
                  Apply Price Filter
                </>
              )}
            </button>
          </div>
        </div>

        <div className='border-t border-gray-200'></div>

        {/* Clear All Filters */}
        <button
          onClick={handleClearAllFilters}
          disabled={!hasActiveFilters}
          className={`w-full border-2 border-[#e10101] text-[#e10101] hover:bg-[#e10101] hover:text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
            !hasActiveFilters ? "opacity-50 cursor-not-allowed" : ""
          }`}>
          <svg
            className='w-4 h-4'
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
          Clear All Filters
        </button>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className='mt-6 pt-6 border-t border-gray-200'>
          <p className='text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wide'>
            Active Filters
          </p>
          <div className='flex flex-wrap gap-2'>
            {filters.cuisine && (
              <span className='inline-flex items-center gap-1 bg-[#e10101] text-white text-xs font-medium px-3 py-1.5 rounded-full'>
                {filters.cuisine}
                <button
                  onClick={() => handleCuisineChange(filters.cuisine)}
                  className='hover:bg-white/20 rounded-full p-0.5 transition-colors'>
                  <svg
                    className='w-3 h-3'
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
                </button>
              </span>
            )}
            {filters.dietary && (
              <span className='inline-flex items-center gap-1 bg-[#e10101] text-white text-xs font-medium px-3 py-1.5 rounded-full'>
                {dietaryOptions.find((d) => d.value === filters.dietary)?.label}
                <button
                  onClick={() => handleDietaryChange(filters.dietary)}
                  className='hover:bg-white/20 rounded-full p-0.5 transition-colors'>
                  <svg
                    className='w-3 h-3'
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
                </button>
              </span>
            )}
            {(filters.minPrice || filters.maxPrice) && (
              <span className='inline-flex items-center gap-1 bg-[#e10101] text-white text-xs font-medium px-3 py-1.5 rounded-full'>
                ৳{filters.minPrice || 0} - ৳{filters.maxPrice || "∞"}
                <button
                  onClick={() => {
                    const newFilters = {
                      ...filters,
                      minPrice: "",
                      maxPrice: "",
                    };
                    setFilters(newFilters);
                    updateURL(newFilters);
                  }}
                  className='hover:bg-white/20 rounded-full p-0.5 transition-colors'>
                  <svg
                    className='w-3 h-3'
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
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}

