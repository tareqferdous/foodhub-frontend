interface User {
  id: string;
  name: string;
  email: string;
  emailVerified?: boolean;
  status?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

interface ProviderProfile {
  id: string;
  userId: string;
  restaurantName: string;
  description?: string;
  address?: string;
  phone?: string;
  totalMeals?: number;
  totalOrders?: number;
}

interface UserInfoProps {
  currentRole: string;
  user: User;
  providerProfile: ProviderProfile | null;
  formatDate: (date: string | Date) => string;
}

const UserInfo = ({
  currentRole,
  user,
  providerProfile,
  formatDate,
}: UserInfoProps) => {
  return (
    <div className='p-6 pt-4 space-y-4'>
      <div className='text-center pb-4 border-b border-gray-100'>
        {currentRole === "PROVIDER" && providerProfile ? (
          <>
            <h2 className='text-2xl font-bold text-gray-900 mb-1'>
              {providerProfile.restaurantName}
            </h2>
            <p className='text-sm text-gray-500 mb-1'>{user.name}</p>
            <p className='text-xs text-gray-400'>{user.email}</p>
          </>
        ) : (
          <>
            <h2 className='text-2xl font-bold text-gray-900 mb-1'>
              {user.name}
            </h2>
            <p className='text-sm text-gray-500'>{user.email}</p>
          </>
        )}
      </div>

      {/* Provider Stats */}
      {currentRole === "PROVIDER" && providerProfile && (
        <div className='grid grid-cols-2 gap-3 pb-4 border-b border-gray-100'>
          <div className='text-center p-3 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-red-100'>
            <div className='text-2xl font-bold text-[#e10101]'>
              {providerProfile.totalMeals || 0}
            </div>
            <div className='text-xs text-gray-600 font-medium'>Meals</div>
          </div>
          <div className='text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100'>
            <div className='text-2xl font-bold text-green-600'>
              {providerProfile.totalOrders || 0}
            </div>
            <div className='text-xs text-gray-600 font-medium'>Orders</div>
          </div>
        </div>
      )}

      {/* Status Badges */}
      <div className='space-y-3'>
        <div className='flex items-center justify-between p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200'>
          <span className='text-sm font-medium text-gray-700'>
            Email Verified
          </span>
          {user.emailVerified ? (
            <div className='flex items-center gap-2 text-green-600'>
              <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='text-sm font-semibold'>Verified</span>
            </div>
          ) : (
            <span className='text-sm font-semibold text-orange-600'>
              Unverified
            </span>
          )}
        </div>

        <div className='flex items-center justify-between p-3 bg-gradient-to-br from-red-50 to-rose-50 rounded-xl border border-red-200'>
          <span className='text-sm font-medium text-gray-700'>Status</span>
          <span className='px-3 py-1 bg-gradient-to-r from-[#e10101] to-red-600 text-white text-xs font-bold rounded-full'>
            {user.status}
          </span>
        </div>
      </div>

      {/* Dates */}
      <div className='pt-4 space-y-2 text-sm'>
        <div className='flex items-center gap-2 text-gray-600'>
          <svg
            className='w-4 h-4'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
            />
          </svg>
          <span>Joined: {formatDate(user.createdAt)}</span>
        </div>
        <div className='flex items-center gap-2 text-gray-600'>
          <svg
            className='w-4 h-4'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
            />
          </svg>
          <span>Updated: {formatDate(user.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
