"use client";

import { authClient } from "@/lib/auth.client";
import { ChevronDown, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DashboardTopbar() {
  const { data: session } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const user = session?.user as { name?: string; role?: string } | undefined;

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <header className='sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur'>
      <div className='flex h-14 md:h-16 items-center justify-between px-4 md:px-6'>
        <div className='hidden sm:block'>
          <h2 className='text-base font-semibold text-gray-900'>Dashboard</h2>
          <p className='text-xs text-gray-500'>Control panel</p>
        </div>

        <div className='relative'>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className='flex items-center gap-2 rounded-lg border border-gray-200 px-2 md:px-3 py-2 hover:bg-gray-50 text-sm md:text-base'>
            <span className='flex h-7 md:h-8 w-7 md:w-8 items-center justify-center rounded-full bg-red-50 text-red-600 shrink-0'>
              <User className='h-3 w-3 md:h-4 md:w-4' />
            </span>
            <div className='text-left hidden sm:block'>
              <p className='text-xs md:text-sm font-medium text-gray-900'>
                {user?.name ?? "User"}
              </p>
              <p className='text-xs text-gray-500'>
                {user?.role ?? "CUSTOMER"}
              </p>
            </div>
            <ChevronDown className='h-3 w-3 md:h-4 md:w-4 text-gray-500 hidden sm:block' />
          </button>

          {isOpen && (
            <div className='absolute right-0 mt-2 w-52 rounded-xl border border-gray-200 bg-white p-2 shadow-lg'>
              <Link
                href='/profile'
                className='block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50'>
                My Profile
              </Link>
              <Link
                href='/'
                className='block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50'>
                Home
              </Link>
              <button
                onClick={handleLogout}
                className='mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50'>
                <LogOut className='h-4 w-4' />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
