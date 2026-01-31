import { Clock, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface MealCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  provider: string;
  rating?: number;
  prepTime?: number;
  category?: string;
}

export default function MealCard({
  id,
  name,
  description,
  price,
  image,
  provider,
  rating = 4.5,
  prepTime = 30,
  category,
}: MealCardProps) {
  return (
    <Link href={`/meals/${id}`}>
      <div className='bg-white rounded-xl shadow-md overflow-hidden group cursor-pointer h-full'>
        {/* Image */}
        <div className='relative h-48 overflow-hidden'>
          <Image
            src={image}
            alt={name}
            fill
            className='object-cover group-hover:scale-110 transition-transform duration-500'
          />
          {category && (
            <div className='absolute top-3 left-3'>
              <span className='badge bg-white text-gray-900 shadow-md'>
                {category}
              </span>
            </div>
          )}
          {rating >= 4.5 && (
            <div className='absolute top-3 right-3'>
              <span className='badge bg-primary-600 text-white shadow-md'>
                ⭐ Popular
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className='p-4 space-y-3'>
          <div>
            <h3 className='font-bold text-lg text-gray-900 group-hover:text-primary-600 transition line-clamp-1'>
              {name}
            </h3>
            <p className='text-sm text-gray-600 mt-1 line-clamp-2'>
              {description}
            </p>
          </div>

          <div className='text-sm text-gray-500 font-medium'>by {provider}</div>

          <div className='flex items-center justify-between pt-2 border-t border-gray-100'>
            <div className='flex items-center space-x-4 text-sm text-gray-600'>
              <div className='flex items-center space-x-1'>
                <Star className='w-4 h-4 text-yellow-400 fill-yellow-400' />
                <span className='font-semibold'>{rating}</span>
              </div>
              <div className='flex items-center space-x-1'>
                <Clock className='w-4 h-4' />
                <span>{prepTime} min</span>
              </div>
            </div>
            <div className='text-lg font-bold text-primary-600'>${price}</div>
          </div>

          <button className='w-full btn-primary py-2  transition-opacity'>
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
