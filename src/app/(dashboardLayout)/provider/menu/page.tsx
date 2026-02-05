"use client";

import ManageMenuCard from "@/components/modules/provider/ManageMenuCard";
import MenuAddEditModal from "@/components/modules/provider/MenuAddEditModal";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type MenuItem = {
  id: string;
  title: string;
  description?: string;
  price: number;
  categoryId: string;
  image?: string;
  isAvailable: boolean;
  dietaryType?: string;
};

export default function ManageMenuPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [data, setData] = useState<any>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    categoryId: "",
    image: "",
    dietaryType: "",
  });

  const fetchProvider = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/providers/dashboard",
        {
          credentials: "include",
        },
      );

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setData(result?.data?.provider);
        }
      }
    } catch (error) {
      console.error("Error fetching dashboard:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/categories");
      if (response.ok) {
        const result = await response.json();
        setCategories(result.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchProvider();
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading(
      editingItem ? "Updating item..." : "Creating item...",
    );

    // editing existing item
    const payload = {
      title: formData.title,
      description: formData.description,
      price: Number(formData.price),
      categoryId: formData.categoryId,
      image: formData.image,
      ...(editingItem && { id: editingItem.id }),
    };

    try {
      const response = await fetch(`http://localhost:5000/api/meals`, {
        method: editingItem ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(editingItem ? payload : formData),
      });

      if (!response.ok) {
        toast.error("Error creating item. Please try again.", { id: toastId });
        return;
      }

      toast.success(
        editingItem
          ? "Item updated successfully!"
          : "Item created successfully!",
        {
          id: toastId,
          duration: 1500,
        },
      );
    } catch (error) {
      toast.error("Error creating item. Please try again.", { id: toastId });
    }
    fetchProvider();
    setShowAddModal(false);
    setEditingItem(null);
    // Reset form
    setFormData({
      title: "",
      description: "",
      price: "",
      categoryId: "",
      image: "",
      dietaryType: "",
    });
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || "",
      price: String(item.price),
      categoryId: item.categoryId,
      image: item.image || "",
      dietaryType: item.dietaryType || "",
    });
    setShowAddModal(true);
  };

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting item...");
    try {
      const response = await fetch(`http://localhost:5000/api/meals/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        toast.success("Item deleted successfully!", { id: toastId });
        fetchProvider();
      }
    } catch (error) {
      toast.error("Error deleting item. Please try again.", { id: toastId });
    }
  };

  const toggleAvailability = (id: string) => {
    console.log("Toggling availability:", id);
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-white border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900 font-display'>
                Manage Menu
              </h1>
              <p className='text-gray-600 mt-1'>
                {data?.meals.length} items in menu
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className='btn-primary flex items-center gap-2'>
              <Plus className='w-5 h-5' />
              Add New Item
            </button>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Menu Items Grid */}
        <ManageMenuCard
          menuItems={data?.meals || []}
          toggleAvailability={toggleAvailability}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />

        {/* Empty State */}
        {data?.meals.length === 0 && (
          <div className='text-center py-12'>
            <div className='text-gray-400 mb-4'>
              <Search className='w-16 h-16 mx-auto' />
            </div>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>
              No items found
            </h3>
            <p className='text-gray-600'>
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <MenuAddEditModal
          editingItem={editingItem}
          setEditingItem={setEditingItem}
          setShowAddModal={setShowAddModal}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          categories={categories}
        />
      )}
    </div>
  );
}
