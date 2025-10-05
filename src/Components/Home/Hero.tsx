'use client'

import React from 'react'
import Link from 'next/link'
import { 
  ArrowRightIcon, 
  HeartIcon, 
  UsersIcon, 
  HandRaisedIcon,
  SparklesIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

const Hero = () => {
  const stats = [
    { number: '500+', label: 'Active Members' },
    { number: '50+', label: 'Community Events' },
    { number: '15+', label: 'Years of Service' },
    { number: '100%', label: 'Community Focus' }
  ]

  const features = [
    'Community Support Programs',
    'Educational Resources',
    'Health & Wellness Initiatives',
    'Cultural Events & Celebrations'
  ]

  return (
    <section className="relative h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Pattern - Line Grid */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23000000' stroke-width='0.5'%3E%3Cpath d='M0 0h40v40H0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="absolute inset-0 dark:block hidden" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23ffffff' stroke-width='0.3'%3E%3Cpath d='M0 0h40v40H0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Blurry Color Corners */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-purple-400/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-green-400/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-pink-400/20 to-transparent rounded-full blur-3xl"></div>
      
      {/* Additional subtle corner blurs */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-br from-blue-300/10 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-gradient-to-tl from-purple-300/10 to-transparent rounded-full blur-2xl"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 dark:bg-purple-800 rounded-full opacity-30 animate-bounce"></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-green-200 dark:bg-green-800 rounded-full opacity-25 animate-pulse"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Content */}
          <div className="text-center lg:text-left space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium">
              <SparklesIcon className="w-4 h-4" />
              <span>Building Stronger Communities Together</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-blue-300">
                  Gulshan Society
                </span>
                <br />
                <span className="text-gray-900 dark:text-gray-100">
                  Connecting Hearts,
                </span>
                <br />
                <span className="text-gray-900 dark:text-gray-100">
                  Building Futures
                </span>
              </h1>
              
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Join our vibrant community where neighbors become family 
                and together we create a brighter tomorrow.
              </p>
            </div>

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-2 max-w-lg mx-auto lg:mx-0">
              {features.slice(0, 3).map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link 
                href="/membership-form"
                className="group inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <span>Join Our Community</span>
                <ArrowRightIcon className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              
              <Link 
                href="/about/story"
                className="group inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 text-gray-900 dark:text-gray-100 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <span>Learn More</span>
              </Link>
            </div>
          </div>

          {/* Right Column - Visual Elements */}
          <div className="relative">
            {/* Main Card */}
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 transform rotate-0 hover:rotate-2 transition-transform duration-500">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <HeartIcon className="w-12 h-12 text-white" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Community Impact
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  {stats.slice(0, 4).map((stat, index) => (
                    <div key={index} className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                        {stat.number}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                  <UsersIcon className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium">Growing Community Since 2008</span>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-green-400 to-blue-500 text-white p-3 rounded-xl shadow-lg transform -rotate-6 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center space-x-2">
                <HandRaisedIcon className="w-5 h-5" />
                <div>
                  <div className="font-semibold text-sm">Join Events</div>
                  <div className="text-xs opacity-90">Monthly gatherings</div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-xl shadow-lg transform rotate-6 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center space-x-2">
                <HeartIcon className="w-5 h-5" />
                <div>
                  <div className="font-semibold text-sm">Support</div>
                  <div className="text-xs opacity-90">Help those in need</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 mt-1 text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 border-2 border-gray-400 dark:border-gray-500 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-gray-400 dark:bg-gray-500 rounded-full mt-1.5 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero