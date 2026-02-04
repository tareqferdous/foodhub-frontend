"use client";

import { Edit, Eye, EyeOff, Plus, Search, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// Mock data
const menuItems = [
  {
    id: "1",
    name: "Chicken Tikka Masala",
    description: "Creamy tomato curry with tender chicken pieces",
    price: 12.99,
    category: "Indian",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300",
    isAvailable: true,
    prepTime: 25,
    orders: 45,
  },
  {
    id: "2",
    name: "Margherita Pizza",
    description: "Classic Italian pizza with mozzarella and basil",
    price: 10.99,
    category: "Italian",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300",
    isAvailable: true,
    prepTime: 20,
    orders: 38,
  },
  {
    id: "3",
    name: "Pad Thai Noodles",
    description: "Stir-fried rice noodles with shrimp and peanuts",
    price: 11.99,
    category: "Thai",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=300",
    isAvailable: false,
    prepTime: 30,
    orders: 32,
  },
];

const categories = ["All", "Indian", "Italian", "Thai", "Chinese", "American"];

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isAvailable: boolean;
  prepTime: number;
  orders: number;
};

export default function ManageMenuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    prepTime: "",
    image: "",
    ingredients: "",
    dietary: [] as string[],
  });

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving item:", formData);
    setShowAddModal(false);
    setEditingItem(null);
    // Reset form
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      prepTime: "",
      image: "",
      ingredients: "",
      dietary: [],
    });
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      prepTime: item.prepTime.toString(),
      image: item.image,
      ingredients: "",
      dietary: [],
    });
    setShowAddModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      console.log("Deleting item:", id);
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
                {filteredItems.length} items in menu
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
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredItems.map((item) => (
            <div key={item.id} className='card overflow-hidden group'>
              {/* Image */}
              <div className='relative h-48'>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className='object-cover'
                />
                <div className='absolute top-3 right-3 flex gap-2'>
                  {!item.isAvailable && (
                    <span className='badge bg-red-600 text-white'>
                      Unavailable
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className='p-4 space-y-3'>
                <div>
                  <h3 className='font-bold text-lg text-gray-900 mb-1'>
                    {item.name}
                  </h3>
                  <p className='text-sm text-gray-600 line-clamp-2'>
                    {item.description}
                  </p>
                </div>

                <div className='flex items-center justify-between text-sm text-gray-600'>
                  <span className='badge bg-gray-100 text-gray-700'>
                    {item.category}
                  </span>
                  <span>{item.prepTime} min</span>
                </div>

                <div className='flex items-center justify-between pt-3 border-t border-gray-100'>
                  <div className='text-xl font-bold text-primary-600'>
                    ${item.price}
                  </div>
                  <div className='text-sm text-gray-600'>
                    {item.orders} orders
                  </div>
                </div>

                {/* Actions */}
                <div className='grid grid-cols-3 gap-2 pt-3 border-t border-gray-100'>
                  <button
                    onClick={() => toggleAvailability(item.id)}
                    className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
                      item.isAvailable
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}>
                    {item.isAvailable ? (
                      <Eye className='w-4 h-4' />
                    ) : (
                      <EyeOff className='w-4 h-4' />
                    )}
                    {item.isAvailable ? "Active" : "Hidden"}
                  </button>
                  <button
                    onClick={() => handleEdit(item)}
                    className='flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition'>
                    <Edit className='w-4 h-4' />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className='flex items-center justify-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition'>
                    <Trash2 className='w-4 h-4' />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
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
        <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in'>
          <div className='bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in'>
            <div className='sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between'>
              <h2 className='text-2xl font-bold text-gray-900'>
                {editingItem ? "Edit Menu Item" : "Add New Item"}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingItem(null);
                }}
                className='text-gray-400 hover:text-gray-600'>
                <X className='w-6 h-6' />
              </button>
            </div>

            <form onSubmit={handleSubmit} className='p-6 space-y-6'>
              <div className='grid md:grid-cols-2 gap-6'>
                {/* Name */}
                <div className='md:col-span-2'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Item Name *
                  </label>
                  <input
                    type='text'
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className='input-field'
                    placeholder='e.g., Chicken Tikka Masala'
                  />
                </div>

                {/* Description */}
                <div className='md:col-span-2'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Description *
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className='input-field'
                    rows={3}
                    placeholder='Describe your dish...'
                  />
                </div>

                {/* Price */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Price ($) *
                  </label>
                  <input
                    type='number'
                    step='0.01'
                    required
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className='input-field'
                    placeholder='12.99'
                  />
                </div>

                {/* Prep Time */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Prep Time (min) *
                  </label>
                  <input
                    type='number'
                    required
                    value={formData.prepTime}
                    onChange={(e) =>
                      setFormData({ ...formData, prepTime: e.target.value })
                    }
                    className='input-field'
                    placeholder='25'
                  />
                </div>

                {/* Category */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className='input-field'>
                    <option value=''>Select category</option>
                    {categories
                      .filter((c) => c !== "All")
                      .map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Image URL */}
                <div className='md:col-span-2'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Image URL *
                  </label>
                  <input
                    type='url'
                    required
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className='input-field'
                    placeholder='https://...'
                  />
                </div>

                {/* Ingredients */}
                <div className='md:col-span-2'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Ingredients (comma-separated)
                  </label>
                  <input
                    type='text'
                    value={formData.ingredients}
                    onChange={(e) =>
                      setFormData({ ...formData, ingredients: e.target.value })
                    }
                    className='input-field'
                    placeholder='Chicken, Tomatoes, Cream, Spices'
                  />
                </div>

                {/* Dietary Options */}
                <div className='md:col-span-2'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Dietary Options
                  </label>
                  <div className='flex flex-wrap gap-3'>
                    {[
                      "Vegetarian",
                      "Vegan",
                      "Gluten-Free",
                      "Halal",
                      "Spicy",
                    ].map((option) => (
                      <label
                        key={option}
                        className='flex items-center gap-2 cursor-pointer'>
                        <input
                          type='checkbox'
                          className='w-4 h-4 text-primary-600 rounded'
                        />
                        <span className='text-sm text-gray-700'>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className='flex gap-4 pt-6 border-t border-gray-200'>
                <button
                  type='button'
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingItem(null);
                  }}
                  className='btn-secondary flex-1'>
                  Cancel
                </button>
                <button type='submit' className='btn-primary flex-1'>
                  {editingItem ? "Save Changes" : "Add Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
