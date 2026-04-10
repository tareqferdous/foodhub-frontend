"use client";

import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import MealCard from "@/components/ui/MealCard";
import { categoryService } from "@/service/category.service";
import { mealService } from "@/service/meal.service";
import { Category, Meal } from "@/types/meal.type";
import { getUniqueDietaryTypes } from "@/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";

const DEFAULT_LIMIT = 9;

type MealsResponse = {
  meals: Meal[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    sortBy?: string;
    sortOrder?: string;
  };
};

const sortOptions = [
  { value: "createdAt-desc", label: "Latest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "title-asc", label: "Name: A to Z" },
];

function getPageNumbers(currentPage: number, totalPages: number) {
  const pages = new Set<number>();

  pages.add(1);
  pages.add(totalPages);
  pages.add(currentPage - 1);
  pages.add(currentPage);
  pages.add(currentPage + 1);

  return [...pages]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);
}

function MealsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [mealsResponse, setMealsResponse] = useState<MealsResponse>({
    meals: [],
    pagination: {
      total: 0,
      page: 1,
      limit: DEFAULT_LIMIT,
      totalPages: 0,
    },
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cuisine = searchParams.get("cuisine") || undefined;
  const dietary = searchParams.get("dietary") || undefined;
  const minPrice = searchParams.get("minPrice") || undefined;
  const maxPrice = searchParams.get("maxPrice") || undefined;
  const search = searchParams.get("search") || "";
  const page = Math.max(1, Number(searchParams.get("page") || "1") || 1);
  const limit = Math.max(
    1,
    Number(searchParams.get("limit") || String(DEFAULT_LIMIT)) || DEFAULT_LIMIT,
  );
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const sortOrder = searchParams.get("sortOrder") === "asc" ? "asc" : "desc";
  const [searchInput, setSearchInput] = useState(search);

  const dietaryTypes = useMemo(
    () => getUniqueDietaryTypes(mealsResponse.meals || []),
    [mealsResponse.meals],
  );

  const activeFilters = {
    cuisine,
    dietary,
    minPrice,
    maxPrice,
    search,
  };

  const updateQuery = (
    updates: Record<string, string | null | undefined>,
    options?: { replace?: boolean },
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    const nextUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;
    if (options?.replace) {
      router.replace(nextUrl);
      return;
    }

    router.push(nextUrl);
  };

  const fetchMeals = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await mealService.getMeals({
        cuisine,
        dietary,
        minPrice,
        maxPrice,
        search: search || undefined,
        page: String(page),
        limit: String(limit),
        sortBy,
        sortOrder,
      });

      if (response && !response.error) {
        setMealsResponse(
          (response.data?.data as MealsResponse) || {
            meals: [],
            pagination: {
              total: 0,
              page,
              limit,
              totalPages: 0,
            },
          },
        );
      } else {
        setError(response?.error?.message || "Failed to load meals");
      }
    } catch (err) {
      console.error("Error fetching meals:", err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getCategories();

      if (response && !response.error) {
        setCategories(response.data?.data || []);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMeals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    cuisine,
    dietary,
    minPrice,
    maxPrice,
    search,
    page,
    limit,
    sortBy,
    sortOrder,
  ]);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  useEffect(() => {
    if (searchInput === search) {
      return;
    }

    const timeoutId = setTimeout(() => {
      updateQuery({ search: searchInput, page: "1" }, { replace: true });
    }, 400);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput, search]);

  const pagination = mealsResponse.pagination;
  const totalMeals = pagination.total;
  const totalPages = pagination.totalPages;
  const startItem =
    totalMeals === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1;
  const endItem = Math.min(pagination.page * pagination.limit, totalMeals);
  const pageNumbers =
    totalPages > 0 ? getPageNumbers(pagination.page, totalPages) : [];

  if (loading) {
    return (
      <div className='bg-gray-50 min-h-screen'>
        <div className='max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6 flex flex-col lg:flex-row gap-4 lg:gap-6'>
          <div className='w-full lg:w-72 bg-white rounded-lg shadow-sm p-4 h-96 animate-pulse'></div>

          <main className='flex-1 w-full'>
            <div className='bg-white rounded-lg shadow-sm h-20 mb-6 animate-pulse'></div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className='bg-white rounded-lg shadow-sm h-80 animate-pulse'></div>
              ))}
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-gray-50 min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='text-7xl mb-4'>⚠️</div>
          <h3 className='text-2xl font-bold text-red-600 mb-2'>Error</h3>
          <p className='text-gray-600 mb-6'>{error}</p>
          <button
            onClick={() => {
              fetchMeals();
              fetchCategories();
            }}
            className='btn btn-primary'>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-gray-50 min-h-screen'>
      <div className='max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6 flex flex-col lg:flex-row gap-4 lg:gap-6'>
        <Sidebar activeFilters={activeFilters} categories={categories} />

        <main className='flex-1 w-full'>
          <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 mb-6 space-y-4'>
            <SearchBar value={searchInput} onChange={setSearchInput} />

            <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
              <div>
                <h2 className='text-xl sm:text-2xl font-bold text-gray-900'>
                  All Available Meals
                </h2>
                <p className='text-sm text-gray-600 mt-1'>
                  {totalMeals > 0
                    ? `Showing ${startItem}-${endItem} of ${totalMeals} meals`
                    : "No meals matched your current search and filters"}
                </p>
              </div>

              <div className='flex flex-col sm:flex-row gap-3 sm:items-center'>
                <label className='text-sm font-medium text-gray-700'>
                  Sort by
                </label>
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [nextSortBy, nextSortOrder] =
                      e.target.value.split("-");
                    updateQuery({
                      sortBy: nextSortBy,
                      sortOrder: nextSortOrder,
                      page: "1",
                    });
                  }}
                  className='w-full sm:w-56 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-[#e10101] focus:ring-2 focus:ring-[#e10101]/20 outline-none transition-all text-sm bg-white'>
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {mealsResponse.meals.length === 0 ? (
            <div className='text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100'>
              <div className='text-7xl mb-4'>🍽️</div>
              <h3 className='text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-2'>
                No meals found
              </h3>
              <p className='text-neutral-600 dark:text-neutral-400 mb-6'>
                Try adjusting your filters or search to see more results
              </p>
              <button
                onClick={() => router.push("/meals")}
                className='btn btn-primary'>
                Clear Filters
              </button>
            </div>
          ) : (
            <section className='mb-6 sm:mb-8'>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-0'>
                {mealsResponse.meals.map((meal: Meal) => (
                  <MealCard key={meal.id} meal={meal} />
                ))}
              </div>
            </section>
          )}

          {totalPages > 1 && (
            <div className='mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5'>
              <p className='text-sm text-gray-600'>
                Page {pagination.page} of {totalPages}
              </p>

              <div className='flex flex-wrap items-center gap-2'>
                <button
                  disabled={pagination.page <= 1}
                  onClick={() =>
                    updateQuery({ page: String(pagination.page - 1) })
                  }
                  className='px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#e10101] hover:text-[#e10101]'>
                  Previous
                </button>

                {pageNumbers.map((pageNumber, index) => {
                  const previousPage = pageNumbers[index - 1];
                  const showGap = previousPage && pageNumber - previousPage > 1;

                  return (
                    <span key={pageNumber} className='flex items-center gap-2'>
                      {showGap && (
                        <span className='px-2 text-gray-400'>...</span>
                      )}
                      <button
                        onClick={() =>
                          updateQuery({ page: String(pageNumber) })
                        }
                        className={`h-10 min-w-10 px-3 rounded-lg border text-sm font-medium transition-colors ${
                          pagination.page === pageNumber
                            ? "bg-[#e10101] text-white border-[#e10101]"
                            : "border-gray-200 text-gray-700 hover:border-[#e10101] hover:text-[#e10101]"
                        }`}>
                        {pageNumber}
                      </button>
                    </span>
                  );
                })}

                <button
                  disabled={pagination.page >= totalPages}
                  onClick={() =>
                    updateQuery({ page: String(pagination.page + 1) })
                  }
                  className='px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#e10101] hover:text-[#e10101]'>
                  Next
                </button>
              </div>
            </div>
          )}

          {dietaryTypes.length > 0 && (
            <div className='mt-6 text-sm text-gray-500'>
              Available dietary types: {dietaryTypes.join(", ")}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function MealsLoadingFallback() {
  return (
    <div className='bg-gray-50 min-h-screen'>
      <div className='max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6 flex flex-col lg:flex-row gap-4 lg:gap-6'>
        <div className='w-full lg:w-72 bg-white rounded-lg shadow-sm p-4 h-96 animate-pulse'></div>

        <main className='flex-1 w-full'>
          <div className='bg-white rounded-lg shadow-sm h-20 mb-6 animate-pulse'></div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className='bg-white rounded-lg shadow-sm h-80 animate-pulse'></div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function MealsPage() {
  return (
    <Suspense fallback={<MealsLoadingFallback />}>
      <MealsContent />
    </Suspense>
  );
}
