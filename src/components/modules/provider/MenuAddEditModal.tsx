import { X } from "lucide-react";

type DietaryType = "HALAL" | "VEG" | "NON_VEG";

interface Category {
  id: string;
  name: string;
  createdAt: string;
}

interface Meal {
  id: string;
  title: string;
  description: string | null;
  price: string;
  image?: string;
  dietaryType: DietaryType;
  categoryId: string;
  providerId: string;
  isAvailable: boolean;
  createdAt: string;
  category?: {
    id: string;
    name: string;
    createdAt: string;
  };
  _count?: {
    orderItems: number;
  };
}

export interface MenuFormData {
  title: string;
  description: string;
  price: string;
  categoryId: string;
  image: string;
  dietaryType?: DietaryType;
}

interface MenuAddEditModalProps {
  editingItem: Meal | null;
  setEditingItem: React.Dispatch<React.SetStateAction<Meal | null>>;
  formData: MenuFormData;
  setFormData: React.Dispatch<React.SetStateAction<MenuFormData>>;
  handleSubmit: (e: React.FormEvent) => void;
  setShowAddModal: (open: boolean) => void;
  categories: Category[];
}

const MenuAddEditModal = ({
  editingItem,
  setEditingItem,
  setShowAddModal,
  formData,
  setFormData,
  handleSubmit,
  categories,
}: MenuAddEditModalProps) => {
  return (
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
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className='w-full text-gray-700 rounded-md border px-3 py-2 text-sm
                    transition-all duration-200
                    placeholder:text-gray-400
                    focus:outline-none focus:ring-2'
                placeholder='e.g., Chicken Tikka Masala'
              />
            </div>

            {/* Description */}
            <div className='md:col-span-2'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Description
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className='w-full text-gray-700 rounded-md border px-3 py-2 text-sm
                    transition-all duration-200
                    placeholder:text-gray-400
                    focus:outline-none focus:ring-2'
                rows={3}
                placeholder='Describe your dish...'
              />
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
                className='w-full text-gray-700 rounded-md border px-3 py-2 text-sm
                    transition-all duration-200
                    placeholder:text-gray-400
                    focus:outline-none focus:ring-2'
                placeholder='https://...'
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
                className='w-full text-gray-700 rounded-md border px-3 py-2 text-sm
                    transition-all duration-200
                    placeholder:text-gray-400
                    focus:outline-none focus:ring-2'
                placeholder='12.99'
              />
            </div>

            {/* Category */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Category *
              </label>
              <select
                required
                value={formData.categoryId}
                onChange={(e) =>
                  setFormData({ ...formData, categoryId: e.target.value })
                }
                className='w-full text-gray-700 rounded-md border px-3 py-2 text-sm
                    transition-all duration-200
                    placeholder:text-gray-400
                    focus:outline-none focus:ring-2'>
                <option value=''>Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Dietary Options */}
            <div className='md:col-span-2'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Dietary Option *
              </label>
              <select
                required
                value={formData.dietaryType || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dietaryType: e.target.value as DietaryType,
                  })
                }
                className='w-full text-gray-700 rounded-md border px-3 py-2 text-sm
                    transition-all duration-200
                    placeholder:text-gray-400
                    focus:outline-none focus:ring-2'>
                <option value=''>Select dietary option</option>
                {["HALAL", "VEG", "NON_VEG"].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
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
  );
};

export default MenuAddEditModal;
