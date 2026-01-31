import { Clock, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProviderCardProps {
  id: string;
  name: string;
  description: string;
  logo: string;
  coverImage: string;
  rating?: number;
  totalReviews?: number;
  cuisine?: string[];
  deliveryTime?: string;
  minOrder?: number;
}

export default function ProviderCard({
  id,
  name,
  description,
  logo,
  coverImage,
  rating = 4.5,
  totalReviews = 100,
  cuisine = [],
  deliveryTime = "30-40",
  minOrder = 10,
}: ProviderCardProps) {
  return (
    <Link href={`/providers/${id}`}>
      <div className='bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg group cursor-pointer h-full'>
        {/* Cover Image */}
        <div className='relative h-32 overflow-hidden'>
          <Image
            src={coverImage}
            alt={name}
            fill
            className='object-cover group-hover:scale-110 transition-transform duration-500'
          />
          <div className='absolute inset-0 bg-linear-to-t from-black/50 to-transparent'></div>
        </div>

        {/* Logo */}
        <div className='relative px-4'>
          <div className='absolute -top-10 left-4'>
            <div className='w-20 h-20 rounded-xl border-4 border-white shadow-lg overflow-hidden bg-white'>
              <Image
                src={logo}
                alt={`${name} logo`}
                width={80}
                height={80}
                className='object-cover'
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='p-4 pt-12 space-y-3'>
          <div>
            <h3 className='font-bold text-xl text-gray-900 group-hover:text-primary-600 transition'>
              {name}
            </h3>
            <p className='text-sm text-gray-600 mt-1 line-clamp-2'>
              {description}
            </p>
          </div>

          {cuisine.length > 0 && (
            <div className='flex flex-wrap gap-2'>
              {cuisine.slice(0, 3).map((item, index) => (
                <span key={index} className='badge bg-gray-100 text-gray-700'>
                  {item}
                </span>
              ))}
              {cuisine.length > 3 && (
                <span className='badge bg-gray-100 text-gray-700'>
                  +{cuisine.length - 3} more
                </span>
              )}
            </div>
          )}

          <div className='flex items-center justify-between pt-2 border-t border-gray-100'>
            <div className='flex items-center space-x-1'>
              <Star className='w-4 h-4 text-yellow-400 fill-yellow-400' />
              <span className='font-semibold text-sm'>{rating}</span>
              <span className='text-gray-500 text-sm'>({totalReviews})</span>
            </div>
            <div className='flex items-center space-x-1 text-sm text-gray-600'>
              <Clock className='w-4 h-4' />
              <span>{deliveryTime} min</span>
            </div>
          </div>

          <div className='text-sm text-gray-500'>
            Min. order:{" "}
            <span className='font-semibold text-gray-900'>${minOrder}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
