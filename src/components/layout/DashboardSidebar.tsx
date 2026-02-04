import Link from "next/link";

const DashboardSidebar = () => {
  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full lg:translate-x-0`}>
      <div className='h-full px-3 py-4 overflow-y-auto bg-white border-r border-gray-200 shadow-xl'>
        {/* Logo/Brand */}
        <div className='mb-8 px-3 py-4 border-b border-gray-200'>
          <Link href='/' className='flex items-center space-x-2'>
            <div className='text-2xl font-bold text-gradient font-display'>
              🍽️ FoodHub
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className='space-y-2'>
          {/* Dashboard */}
          <Link
            href='/provider/dashboard'
            className='flex items-center gap-3 px-4 py-3 text-gray-900 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-100 font-semibold'>
            <svg
              className='w-5 h-5 text-[#e10101]'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
              />
            </svg>
            <span>Dashboard</span>
          </Link>

          {/* Orders */}
          <Link
            href='/provider/orders'
            className='flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors'>
            <svg
              className='w-5 h-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
              />
            </svg>
            <span>Orders</span>
          </Link>

          {/* Meals */}
          <Link
            href='/provider/menu'
            className='flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors'>
            <svg
              className='w-5 h-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 6v6m0 0v6m0-6h6m-6 0H6'
              />
            </svg>
            <span>Meal Management</span>
          </Link>

          {/* Profile */}
          <Link
            href='/profile'
            className='flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors'>
            <svg
              className='w-5 h-5'
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
            <span>Profile</span>
          </Link>

          {/* Divider */}
          <div className='pt-4 pb-2'>
            <div className='h-px bg-gray-200'></div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
