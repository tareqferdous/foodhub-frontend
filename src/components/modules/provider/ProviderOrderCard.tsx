import { Order, OrderStatus } from "@/types/orderTypes";

type ProviderOrderCardProps = {
  order: Order;
  handleStatusUpdate: (id: string, status: OrderStatus) => Promise<void>;
  formatDate: (date: string) => string;
  formatCurrency: (value: string) => string;
};

const getStatusBadge = (status: Order["status"]) => {
  const config = {
    PLACED: {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      border: "border-yellow-300",
      label: "PLACED",
    },
    DELIVERED: {
      bg: "bg-green-100",
      text: "text-green-700",
      border: "border-green-300",
      label: "DELIVERED",
    },
    CANCELLED: {
      bg: "bg-red-100",
      text: "text-red-700",
      border: "border-red-300",
      label: "CANCELLED",
    },
  };

  const statusConfig = config[status];
  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.text} border ${statusConfig.border}`}>
      {statusConfig.label}
    </span>
  );
};

const ProviderOrderCard = ({
  order,
  formatDate,
  handleStatusUpdate,
  formatCurrency,
}: ProviderOrderCardProps) => {
  return (
    <div className='bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow'>
      <div className='p-6'>
        {/* Order Header */}
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6'>
          <div>
            <div className='flex items-center gap-3 mb-2'>
              <h3 className='text-lg font-bold text-gray-900'>
                #{order.id.slice(0, 8)}
              </h3>
              {getStatusBadge(order.status)}
            </div>
            <div className='flex items-center gap-2 text-sm text-gray-600'>
              <svg
                className='w-4 h-4'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              <span>{formatDate(order.createdAt)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex gap-2'>
            {order.status === "PLACED" && (
              <>
                <button
                  onClick={() => handleStatusUpdate(order.id, "DELIVERED")}
                  className='bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2 rounded-xl font-semibold hover:shadow-lg transition-all text-sm'>
                  Confirm
                </button>
                <button
                  onClick={() => handleStatusUpdate(order.id, "CANCELLED")}
                  className='bg-white border-2 border-red-200 text-red-600 px-5 py-2 rounded-xl font-semibold hover:bg-red-50 transition-all text-sm'>
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        {/* Customer Info */}
        <div className='bg-gray-50 rounded-xl p-4 mb-4'>
          <div className='flex items-center gap-2 mb-2'>
            <svg
              className='w-4 h-4 text-gray-600'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
              />
            </svg>
            <span className='font-semibold text-gray-900'>
              {order.customer.name}
            </span>
            <span className='text-gray-500 text-sm'>
              ({order.customer.email})
            </span>
          </div>
          <div className='flex items-start gap-2 text-sm text-gray-600'>
            <svg
              className='w-4 h-4 mt-0.5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
              />
            </svg>
            <span>{order.deliveryAddress}</span>
          </div>
        </div>

        {/* Order Items */}
        <div className='space-y-3 mb-4'>
          {order.items.map((item) => (
            <div
              key={item.id}
              className='flex items-center gap-4 p-3 bg-gray-50 rounded-xl'>
              <img
                src={item.meal.image}
                alt={item.meal.title}
                className='w-16 h-16 rounded-lg object-cover'
              />
              <div className='flex-1'>
                <h4 className='font-semibold text-gray-900'>
                  {item.meal.title}
                </h4>
                <p className='text-xs text-gray-500 line-clamp-1'>
                  {item.meal.description}
                </p>
                <div className='flex items-center gap-2 mt-1'>
                  <span className='text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium'>
                    {item.meal.dietaryType}
                  </span>
                  <span className='text-xs text-gray-600'>
                    x{item.quantity}
                  </span>
                </div>
              </div>
              <div className='text-right'>
                <p className='font-bold text-gray-900'>
                  {formatCurrency(item.price)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className='pt-4 border-t border-gray-200 flex items-center justify-between'>
          <span className='font-bold text-gray-900 text-lg'>Total</span>
          <span className='font-bold text-[#e10101] text-2xl'>
            {formatCurrency(order.totalPrice)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProviderOrderCard;
