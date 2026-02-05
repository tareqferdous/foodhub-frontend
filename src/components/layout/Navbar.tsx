"use client";

import { authClient } from "@/lib/auth.client";
import { ChevronDown, Menu, ShoppingCart, User, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const session = authClient.useSession();

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const isLoggedIn = !!session?.data?.user && session?.data?.user;
  const userRole = isLoggedIn?.role || "CUSTOMER";
  const cartItemsCount = 3;

  return (
    <nav className='bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <Link href='/' className='flex items-center space-x-2'>
            <div className='text-2xl font-bold text-gradient font-display'>
              🍽️ FoodHub
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-8'>
            <Link
              href='/meals'
              className='text-gray-700 hover:text-primary-600 font-medium transition'>
              Browse Meals
            </Link>
            <Link
              href='/providers'
              className='text-gray-700 hover:text-primary-600 font-medium transition'>
              Restaurants
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className='hidden md:flex items-center space-x-4'>
            {isLoggedIn ? (
              <>
                {userRole === "CUSTOMER" && (
                  <Link
                    href='/cart'
                    className='relative p-2 text-gray-700 hover:text-primary-600 transition'>
                    <ShoppingCart className='w-6 h-6' />
                    {cartItemsCount > 0 && (
                      <span className='absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold'>
                        {cartItemsCount}
                      </span>
                    )}
                  </Link>
                )}

                <div className='relative'>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className='flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition'>
                    <div className='w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center'>
                      <User className='w-5 h-5 text-primary-600' />
                    </div>
                    <ChevronDown className='w-4 h-4 text-gray-600' />
                  </button>

                  {isUserMenuOpen && (
                    <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 animate-scale-in'>
                      <Link
                        href='/profile'
                        className='block px-4 py-2 text-gray-700 hover:bg-gray-50'>
                        Profile
                      </Link>
                      {userRole === "CUSTOMER" && (
                        <Link
                          href='/orders'
                          className='block px-4 py-2 text-gray-700 hover:bg-gray-50'>
                          My Orders
                        </Link>
                      )}
                      {userRole === "PROVIDER" && (
                        <>
                          <Link
                            href='/provider/dashboard'
                            className='block px-4 py-2 text-gray-700 hover:bg-gray-50'>
                            Dashboard
                          </Link>
                          <Link
                            href='/provider/menu'
                            className='block px-4 py-2 text-gray-700 hover:bg-gray-50'>
                            My Menu
                          </Link>
                        </>
                      )}
                      {userRole === "ADMIN" && (
                        <Link
                          href='/admin'
                          className='block px-4 py-2 text-gray-700 hover:bg-gray-50'>
                          Admin Panel
                        </Link>
                      )}
                      <hr className='my-2' />
                      <button
                        onClick={handleLogout}
                        className='block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50'>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href='/login' className='btn-outline py-2'>
                  Login
                </Link>
                <Link href='/register' className='btn-primary py-2'>
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='md:hidden p-2 text-gray-700 hover:text-primary-600'>
            {isMobileMenuOpen ? (
              <X className='w-6 h-6' />
            ) : (
              <Menu className='w-6 h-6' />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className='md:hidden py-4 animate-slide-in border-t border-gray-100'>
            <div className='flex flex-col space-y-4'>
              <Link
                href='/meals'
                className='text-gray-700 hover:text-primary-600 font-medium'>
                Browse Meals
              </Link>
              <Link
                href='/providers'
                className='text-gray-700 hover:text-primary-600 font-medium'>
                Restaurants
              </Link>
              <Link
                href='/about'
                className='text-gray-700 hover:text-primary-600 font-medium'>
                About
              </Link>

              {isLoggedIn ? (
                <>
                  <hr className='border-gray-200' />
                  <Link
                    href='/profile'
                    className='text-gray-700 hover:text-primary-600 font-medium'>
                    Profile
                  </Link>
                  {userRole === "customer" && (
                    <>
                      <Link
                        href='/cart'
                        className='text-gray-700 hover:text-primary-600 font-medium flex items-center justify-between'>
                        Cart
                        {cartItemsCount > 0 && (
                          <span className='bg-primary-600 text-white text-xs rounded-full px-2 py-1'>
                            {cartItemsCount}
                          </span>
                        )}
                      </Link>
                      <Link
                        href='/orders'
                        className='text-gray-700 hover:text-primary-600 font-medium'>
                        My Orders
                      </Link>
                    </>
                  )}
                  <button className='text-left text-red-600 hover:text-red-700 font-medium'>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <hr className='border-gray-200' />
                  <Link
                    href='/login'
                    className='btn-secondary w-full text-center'>
                    Login
                  </Link>
                  <Link
                    href='/register'
                    className='btn-primary w-full text-center'>
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
