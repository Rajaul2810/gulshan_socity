'use client'

import React from 'react'
import Link from 'next/link'
import { 
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  HeartIcon,
  UserGroupIcon,
  HomeIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  PhotoIcon,
  VideoCameraIcon,
  NewspaperIcon,
  ArrowRightIcon,
  ArrowUpIcon
} from '@heroicons/react/24/outline'
import Image from 'next/image'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <Image src="/Gulshan-Society-Logo.webp" alt="Gulshan Society" width={100} height={100} />
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Building a vibrant, connected community where neighbors become friends and 
              every member feels at home. Join us in creating lasting memories together.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPinIcon className="w-5 h-5 text-blue-400" />
                <span className="text-sm">Gulshan Block 6, Dhaka 1212, Bangladesh</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <PhoneIcon className="w-5 h-5 text-blue-400" />
                <span className="text-sm">+880 1712 345 678</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <EnvelopeIcon className="w-5 h-5 text-blue-400" />
                <span className="text-sm">info@gulshansociety.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <ClockIcon className="w-5 h-5 text-blue-400" />
                <span className="text-sm">Office: 9:00 AM - 5:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/about" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/services" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  <span>Our Services</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/services/membership-form" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  <span>Membership</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/event-page" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  <span>Events</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/media-page" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  <span>Media Gallery</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/services/membership-form" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <UserGroupIcon className="w-4 h-4" />
                  <span>Membership Registration</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/services/car-registration" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <DocumentTextIcon className="w-4 h-4" />
                  <span>Car Registration</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/services/house-registration" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <HomeIcon className="w-4 h-4" />
                  <span>House Registration</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/services/maintenance-support" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <HeartIcon className="w-4 h-4" />
                  <span>Maintenance Support</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/services/security-services" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <HeartIcon className="w-4 h-4" />
                  <span>Security Services</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/services/utility-management" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <HeartIcon className="w-4 h-4" />
                  <span>Utility Management</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Community & Media */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Community</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/event-page" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <CalendarDaysIcon className="w-4 h-4" />
                  <span>Upcoming Events</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/media-page" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <PhotoIcon className="w-4 h-4" />
                  <span>Photo Gallery</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/media-page" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <VideoCameraIcon className="w-4 h-4" />
                  <span>Video Gallery</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/media-page" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <NewspaperIcon className="w-4 h-4" />
                  <span>Community News</span>
                </Link>
              </li>
            </ul>

            {/* Social Media */}
            <div className="mt-8">
              <h5 className="text-md font-semibold text-white mb-4">Follow Us</h5>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="bg-gray-800 hover:bg-blue-600 p-3 rounded-xl transition-all duration-300 transform hover:-translate-y-1"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="bg-gray-800 hover:bg-blue-400 p-3 rounded-xl transition-all duration-300 transform hover:-translate-y-1"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="bg-gray-800 hover:bg-pink-600 p-3 rounded-xl transition-all duration-300 transform hover:-translate-y-1"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781h-1.829v1.829h1.829v-1.829zm-3.658 3.658c-.807 0-1.463-.656-1.463-1.463s.656-1.463 1.463-1.463 1.463.656 1.463 1.463-.656 1.463-1.463 1.463z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="bg-gray-800 hover:bg-red-600 p-3 rounded-xl transition-all duration-300 transform hover:-translate-y-1"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-gray-400 text-sm">
              <span>© 2024 Gulshan Society. All rights reserved.</span>
              <span>•</span>
              <Link href="/privacy" className="hover:text-blue-400 transition-colors duration-300">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-blue-400 transition-colors duration-300">
                Terms of Service
              </Link>
            </div>
            
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className="text-sm text-gray-300">Back to Top</span>
              <ArrowUpIcon className="w-4 h-4 text-gray-300" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer