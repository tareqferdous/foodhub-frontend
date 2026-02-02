"use client";

import Link from "next/link";
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
  { value: "VEG", label: "Vegetarian" },
  { value: "NON_VEG", label: "Non-Vegetarian" },
  { value: "HALAL", label: "Halal" },
];

export default function Sidebar({
  activeFilters,
  categories,
  dietaryTypes,
}: MealFiltersProps & { categories: Category[]; dietaryTypes: string[] }) {
  const [mealType, setMealType] = useState("");
  const [deliveryTime, setDeliveryTime] = useState(0);

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

  return (
    <aside className='w-64 bg-white rounded-lg p-6 h-fit sticky top-24 hidden lg:block'>
      <h2 className='text-xl font-bold mb-6 text-gray-700'>Filters</h2>

      {/* Cuisines */}
      <div className='mb-6'>
        <h3 className='font-semibold mb-3 '>Cuisines</h3>
        <div className='space-y-2'>
          {categories.map((category) => (
            <label
              key={category.id}
              className='flex items-center gap-2 cursor-pointer text-gray-700'>
              <input
                type='checkbox'
                name='cuisine'
                value={category.name}
                checked={filters.cuisine === category.name}
                onChange={() => handleCuisineChange(category.name)}
                disabled={isPending}
                className='w-4 h-4 text-red-600 accent-red-600'
              />
              <span className='text-sm capitalize'>
                {category.name.replace("-", " ")}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Dietary */}
      <div>
        <h3 className='font-semibold mb-3 '>Dietary</h3>
        <div className='space-y-2'>
          {dietaryOptions.map((dietary) => (
            <label
              key={dietary.value}
              className='flex items-center gap-2 cursor-pointer text-gray-700'>
              <input
                type='checkbox'
                checked={filters.dietary === dietary.value}
                onChange={() => handleDietaryChange(dietary.value)}
                disabled={isPending}
                className='w-4 h-4 text-red-600 accent-red-600'
              />
              <span className='text-sm'>{dietary.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className='mb-6'>
        <h4 className='font-semibold text-sm text-neutral-700 dark:text-neutral-300 mb-3'>
          Price Range
        </h4>
        <div className='grid grid-cols-2 gap-3 mb-3'>
          <div>
            <label className='text-xs text-neutral-600 dark:text-neutral-400 mb-1 block'>
              Min ($)
            </label>
            <input
              type='number'
              value={filters.minPrice}
              onChange={(e) =>
                setFilters({ ...filters, minPrice: e.target.value })
              }
              placeholder='0'
              className='input w-full'
              min='0'
            />
          </div>
          <div>
            <label className='text-xs text-neutral-600 dark:text-neutral-400 mb-1 block'>
              Max ($)
            </label>
            <input
              type='number'
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters({ ...filters, maxPrice: e.target.value })
              }
              placeholder='50'
              className='input w-full'
              min='0'
            />
          </div>
        </div>
        <button
          onClick={handlePriceChange}
          disabled={isPending || (!filters.minPrice && !filters.maxPrice)}
          className='btn btn-primary btn-sm w-full disabled:opacity-50 disabled:cursor-not-allowed'>
          {isPending ? "Applying..." : "Apply Price Filter"}
        </button>
      </div>

      <div className='divider' />

      {/* Clear All Filters */}
      <Link
        href='/meals'
        className='btn btn-outline w-full disabled:opacity-50 disabled:cursor-not-allowed'>
        Clear All Filters
      </Link>
    </aside>
  );
}

