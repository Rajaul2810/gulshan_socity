'use client'

import React from 'react'
import Link from 'next/link'
import { 
  HomeIcon,
  ArrowLeftIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  MapIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'

const NotFound = () => {
  const quickLinks = [
    { name: 'Home', href: '/', icon: <HomeIcon className="w-5 h-5" /> },
      { name: 'Services', href: '/services', icon: <MagnifyingGlassIcon className="w-5 h-5" /> },
    { name: 'Events', href: '/events', icon: <MapIcon className="w-5 h-5" /> },
    { name: 'Media', href: '/media', icon: <MagnifyingGlassIcon className="w-5 h-5" /> },
    { name: 'Contact', href: '/contact', icon: <PhoneIcon className="w-5 h-5" /> }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* 404 Illustration */}
        <div className="mb-12">
          <div className="relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-10 blur-3xl transform scale-150"></div>
            
            {/* Main 404 Display */}
            <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center mb-8">
                <div className="bg-gradient-to-r from-red-500 to-orange-500 p-4 rounded-2xl">
                  <ExclamationTriangleIcon className="w-16 h-16 text-white" />
                </div>
              </div>
              
              <h1 className="text-8xl sm:text-9xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                404
              </h1>
              
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Page Not Found
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been moved, 
                deleted, or you entered the wrong URL. Don&apos;t worry, let&apos;s get you back on track!
              </p>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Quick Navigation
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-2xl mx-auto">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="group bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                    {link.icon}
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {link.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <HomeIcon className="mr-2 w-5 h-5" />
            <span>Go Home</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 text-gray-900 dark:text-gray-100 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <ArrowLeftIcon className="mr-2 w-5 h-5" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Help Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Need Help?
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            If you continue to experience issues or can&apos;t find what you&apos;re looking for, 
            our support team is here to help you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+8801712345678"
              className="inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <PhoneIcon className="mr-2 w-4 h-4" />
              <span>Call Us</span>
            </a>
            
            <a
              href="mailto:info@gulshansociety.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <EnvelopeIcon className="mr-2 w-4 h-4" />
              <span>Email Us</span>
            </a>
          </div>
        </div>

        {/* Fun Facts */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Fun fact: The number 404 comes from the room number where the original web servers 
            at CERN were located. The room was used to house the web&apos;s central database!
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotFound
