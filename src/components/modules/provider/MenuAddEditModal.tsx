import { Image as ImageIcon, Loader2, Upload, X } from "lucide-react";
import { useState } from "react";

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
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select an image file");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setUploadError("Image size should be less than 2MB");
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const formDataImg = new FormData();
      formDataImg.append("image", file);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formDataImg,
        },
      );

      const data = await response.json();

      if (data.success) {
        setFormData({ ...formData, image: data.data.url });
        setUploadError(null);
      } else {
        setUploadError("Failed to upload image. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

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

            {/* Image Upload */}
            <div className='md:col-span-2'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Image *
              </label>

              {/* Image Preview */}
              {formData.image && (
                <div className='mb-4 relative group'>
                  <img
                    src={formData.image}
                    alt='Preview'
                    className='w-full h-48 object-cover rounded-lg border-2 border-gray-200'
                  />
                  <button
                    type='button'
                    onClick={() => setFormData({ ...formData, image: "" })}
                    className='absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-200
                             hover:bg-red-600'>
                    <X className='w-4 h-4' />
                  </button>
                </div>
              )}

              {/* Upload Button */}
              <div className='relative'>
                <input
                  type='file'
                  id='image-upload'
                  accept='image/*'
                  onChange={handleImageUpload}
                  className='hidden'
                  disabled={uploading}
                />
                <label
                  htmlFor='image-upload'
                  className={`
                    flex items-center justify-center gap-2 w-full
                    px-4 py-3 rounded-lg border-2 border-dashed
                    transition-all duration-200 cursor-pointer
                    ${
                      uploading
                        ? "border-gray-300 bg-gray-50 cursor-not-allowed"
                        : "border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                    }
                  `}>
                  {uploading ? (
                    <>
                      <Loader2 className='w-5 h-5 text-blue-500 animate-spin' />
                      <span className='text-sm font-medium text-gray-600'>
                        Uploading...
                      </span>
                    </>
                  ) : formData.image ? (
                    <>
                      <ImageIcon className='w-5 h-5 text-green-500' />
                      <span className='text-sm font-medium text-gray-700'>
                        Change Image
                      </span>
                    </>
                  ) : (
                    <>
                      <Upload className='w-5 h-5 text-gray-400' />
                      <span className='text-sm font-medium text-gray-600'>
                        Click to upload image
                      </span>
                    </>
                  )}
                </label>
              </div>

              {/* Error Message */}
              {uploadError && (
                <p className='mt-2 text-sm text-red-600 flex items-center gap-1'>
                  <span className='inline-block w-1 h-1 rounded-full bg-red-600'></span>
                  {uploadError}
                </p>
              )}

              {/* Helper Text */}
              <p className='mt-2 text-xs text-gray-500'>
                Supported: JPG, PNG, GIF (Max 2MB)
              </p>
            </div>

            {/* Price */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Price (BDT) *
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
            <button
              type='submit'
              className='btn-primary flex-1'
              disabled={uploading || !formData.image}>
              {editingItem ? "Save Changes" : "Add Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuAddEditModal;
