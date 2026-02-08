import { Roles } from "@/constants/roles";
import { adminMenu } from "@/routes/adminRoutes";
import { providerMenu } from "@/routes/providerRoutes";
import { SidebarMenuItem } from "@/types/route.types";
import Link from "next/link";

const DashboardSidebar = ({ user }: { user: { role: string } }) => {
  let routes: SidebarMenuItem[] = [];

  switch (user.role) {
    case Roles.admin:
      routes = adminMenu;
      break;
    case Roles.provider:
      routes = providerMenu;
      break;
    default:
      routes = [];
      break;
  }

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
          {routes.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className='flex items-center gap-3 px-4 py-3 text-gray-900 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-100 font-semibold'>
              <item.icon size={20} className='text-[#e10101]' />

              <span>{item.label}</span>
            </Link>
          ))}
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
