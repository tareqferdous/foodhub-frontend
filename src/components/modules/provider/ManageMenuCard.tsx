import { Edit, Eye, EyeOff, Trash2 } from "lucide-react";
import Image from "next/image";

type DietaryType = "VEG" | "NON_VEG" | "HALAL";

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

interface ManageMenuCardProps {
  menuItems: Meal[];
  handleEdit: (item: Meal) => void;
  handleDelete: (id: string) => void;
}

const ManageMenuCard = ({
  menuItems,
  handleEdit,
  handleDelete,
}: ManageMenuCardProps) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
      {menuItems.map((item) => (
        <div key={item.id} className='card overflow-hidden group'>
          {/* Image */}
          <div className='relative h-48'>
            <Image
              src={
                item.image ||
                "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300"
              }
              alt={item.title}
              fill
              className='object-cover'
            />
            <div className='absolute top-3 right-3 flex gap-2'>
              {!item.isAvailable && (
                <span className='badge bg-red-600 text-white'>Unavailable</span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className='p-4 space-y-3'>
            <div>
              <h3 className='font-bold text-lg text-gray-900 mb-1'>
                {item.title}
              </h3>
              <p className='text-sm text-gray-600 line-clamp-2'>
                {item.description}
              </p>
            </div>

            <div className='flex items-center justify-between text-sm text-gray-600'>
              <span className='badge bg-gray-100 text-gray-700'>
                {item.dietaryType}
              </span>
            </div>

            <div className='flex items-center justify-between pt-3 border-t border-gray-100'>
              <div className='text-xl font-bold text-primary-600'>
                BDT{item.price}
              </div>
              {item.category && (
                <div className='text-sm text-gray-600'>
                  {item.category.name}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className='grid grid-cols-3 gap-2 pt-3 border-t border-gray-100'>
              <button
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
  );
};

export default ManageMenuCard;
