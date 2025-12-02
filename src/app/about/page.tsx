'use client'

import React from 'react'
import Link from 'next/link'
import { 
  BookOpenIcon,
  // ClockIcon,
  ArrowRightIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline'
import { regularActivitiesData } from '@/lib/regularActivitiesData'

const About = () => {
 

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-50 via-white to-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpenIcon className="w-4 h-4" />
              <span>About Gulshan Society</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Building <span className="text-primary">Stronger Communities</span> Together
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              For over 15 years, Gulshan Society has been dedicated to fostering a vibrant, 
              inclusive community where neighbors become family and together we create a brighter future.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/about/mission"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary hover:bg-primary-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <span>Our Mission</span>
                <ArrowRightIcon className="ml-2 w-4 h-4" />
              </Link>
              
              {/* <Link 
                href="/about/history"
                className="inline-flex items-center justify-center px-8 py-3 bg-white border-2 border-primary hover:border-primary-800 text-primary hover:text-primary-800 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <ClockIcon className="mr-2 w-4 h-4" />
                <span>Our History</span>
              </Link> */}
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            গুলশান সোসাইটির <span className="text-primary">নিয়মিত কার্যক্রম</span>
            </h2>
            <p className="text-lg text-gray-600">
            গুলশানকে একটি নিরাপদ ও পরিচ্ছন্ন এলাকায় পরিণত করা, ট্রাফিক-ব্যবস্থাকে সহনীয় পর্যায়ে রাখা, বিদ্যুত-পানি-গ্যাসের নিরবচ্ছিন্ন সরবরাহ নিশ্চিত করা, অধিবাসীদের হয়রানিমুক্ত জীবনযাপন নিশ্চিত করা ইত্যাদির লক্ষ্যে ঢাকা উত্তর সিটি কর্পোরেশন, ঢাকা মেট্রোপলিটন পুলিশ, রাজউক, ডেসকো, ওয়াসা, তিতাস ও অন্যান্য কর্তৃপক্ষের সাথে গুলশান সোসাইটি অধিবাসীদের পক্ষে সার্বক্ষণিক ভাবে যোগাযোগ বজায় রাখছে এবং পাবলিক-প্রাইভেট পার্টনারশিপের আওতায় বিভিন্ন প্রয়োজনীয় পদক্ষেপ গ্রহণ করেছে।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {regularActivitiesData.map((activity, index) => {
              const IconComponent = activity.icon
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-200">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {activity.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {activity.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Join Our Community
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Become part of our vibrant community and help us build a better future together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/membership-form"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <UserPlusIcon className="mr-2 w-4 h-4" />
              <span>Join Now</span>
            </Link>
            
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-primary font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
