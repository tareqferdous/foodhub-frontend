"use client";

import { Edit2, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
  createdAt: string;
}

interface ApiResponse {
  success: boolean;
  data: Category[];
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`,
        {
          credentials: "include",
        },
      );
      const result: ApiResponse = await response.json();
      if (result.success) {
        setCategories(result.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setCategoryName(category.name);
    } else {
      setEditingCategory(null);
      setCategoryName("");
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setCategoryName("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    setSubmitting(true);
    try {
      const url = editingCategory
        ? `${process.env.NEXT_PUBLIC_API_URL}/admin/categories/${editingCategory.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/categories`;
      const method = editingCategory ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryName }),
      });

      if (response.ok) {
        await fetchCategories();
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error saving category:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/categories/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (response.ok) {
        await fetchCategories();
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='bg-white border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900 font-display'>
                Categories
              </h1>
              <p className='text-gray-600 mt-1'>
                Manage categories for your menu items
              </p>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className='btn-primary flex items-center gap-2'>
              <Plus className='w-5 h-5' />
              Add Category
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Categories List */}
        <div className='bg-white rounded-lg shadow'>
          {loading ? (
            <div className='p-8 text-center'>
              <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#e10101] border-r-transparent'></div>
              <p className='mt-2 text-gray-500'>Loading categories...</p>
            </div>
          ) : categories.length === 0 ? (
            <div className='p-8 text-center'>
              <p className='text-gray-500'>
                {searchTerm
                  ? "No categories found matching your search."
                  : "No categories yet. Create your first one!"}
              </p>
            </div>
          ) : (
            <div className='overflow-hidden'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Name
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Created At
                    </th>
                    <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {categories.map((category) => (
                    <tr
                      key={category.id}
                      className='hover:bg-gray-50 transition-colors'>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm font-medium text-gray-900'>
                          {category.name}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-500'>
                          {formatDate(category.createdAt)}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                        <button
                          onClick={() => handleOpenModal(category)}
                          className='text-[#e10101] hover:text-[#c10101] mr-4 inline-flex items-center'>
                          <Edit2 className='w-4 h-4 mr-1' />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className='text-red-600 hover:text-red-900 inline-flex items-center'>
                          <Trash2 className='w-4 h-4 mr-1' />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className='mt-4 text-sm text-gray-500'>
          Showing {categories.length} of {categories.length} categories
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in'>
          <div className='bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in'>
            <div className='sticky top-0 bg-white border-b border-gray-200 px-6 py-4'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='text-xl font-bold text-gray-900'>
                  {editingCategory ? "Edit Category" : "Add Category"}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className='text-gray-400 hover:text-gray-600'>
                  <X className='w-5 h-5' />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                  <label
                    htmlFor='categoryName'
                    className='block text-sm font-medium text-gray-700 mb-2'>
                    Category Name
                  </label>
                  <input
                    id='categoryName'
                    type='text'
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder='Enter category name'
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e10101] focus:border-transparent'
                    required
                    autoFocus
                  />
                </div>

                <div className='flex justify-end gap-3'>
                  <button
                    type='button'
                    onClick={handleCloseModal}
                    className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors'>
                    Cancel
                  </button>
                  <button
                    type='submit'
                    disabled={submitting || !categoryName.trim()}
                    className='px-4 py-2 text-sm font-medium text-white bg-[#e10101] rounded-lg hover:bg-[#c10101] transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
                    {submitting
                      ? "Saving..."
                      : editingCategory
                        ? "Update"
                        : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
