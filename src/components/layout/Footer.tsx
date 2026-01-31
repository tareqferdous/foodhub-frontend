import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className='bg-gray-900 text-gray-300 mt-auto'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* About Section */}
          <div className='space-y-4'>
            <div className='text-2xl font-bold text-white font-display'>
              🍽️ FoodHub
            </div>
            <p className='text-sm leading-relaxed'>
              Order your favorite meals from the best restaurants in town. Fast
              delivery, great food, happy customers.
            </p>
            <div className='flex space-x-4'>
              <a
                href='#'
                className='w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition'>
                <Facebook className='w-5 h-5' />
              </a>
              <a
                href='#'
                className='w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition'>
                <Twitter className='w-5 h-5' />
              </a>
              <a
                href='#'
                className='w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition'>
                <Instagram className='w-5 h-5' />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-white font-semibold mb-4'>Quick Links</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  href='/meals'
                  className='hover:text-primary-400 transition'>
                  Browse Meals
                </Link>
              </li>
              <li>
                <Link
                  href='/providers'
                  className='hover:text-primary-400 transition'>
                  Restaurants
                </Link>
              </li>
              <li>
                <Link
                  href='/about'
                  className='hover:text-primary-400 transition'>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='hover:text-primary-400 transition'>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* For Business */}
          <div>
            <h3 className='text-white font-semibold mb-4'>For Business</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  href='/register?role=provider'
                  className='hover:text-primary-400 transition'>
                  Become a Partner
                </Link>
              </li>
              <li>
                <Link
                  href='/provider/login'
                  className='hover:text-primary-400 transition'>
                  Partner Login
                </Link>
              </li>
              <li>
                <Link
                  href='/terms'
                  className='hover:text-primary-400 transition'>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href='/privacy'
                  className='hover:text-primary-400 transition'>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className='text-white font-semibold mb-4'>Contact Us</h3>
            <ul className='space-y-3 text-sm'>
              <li className='flex items-start space-x-3'>
                <MapPin className='w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5' />
                <span>123 Food Street, Dhaka 1212, Bangladesh</span>
              </li>
              <li className='flex items-center space-x-3'>
                <Phone className='w-5 h-5 text-primary-400 flex-shrink-0' />
                <span>+880 1234-567890</span>
              </li>
              <li className='flex items-center space-x-3'>
                <Mail className='w-5 h-5 text-primary-400 flex-shrink-0' />
                <span>support@foodhub.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className='border-t border-gray-800 mt-8 pt-8 text-center text-sm'>
          <p>&copy; {new Date().getFullYear()} FoodHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
