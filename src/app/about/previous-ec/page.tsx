'use client'

import React from 'react'
import { 
  UserGroupIcon,
  CalendarDaysIcon,
  TrophyIcon,
  HeartIcon,
  SparklesIcon,
  BuildingOffice2Icon,
  ClockIcon
} from '@heroicons/react/24/outline'

const PreviousEC = () => {

  const achievements = [
    {
      title: 'Community Growth',
      description: 'Member count increased from 200 to 800+ over the years',
      icon: UserGroupIcon,
      value: '300%'
    },
    {
      title: 'Infrastructure',
      description: 'Major facility upgrades and new construction projects',
      icon: BuildingOffice2Icon,
      value: '15+'
    },
    {
      title: 'Events Organized',
      description: 'Community events, workshops, and cultural programs',
      icon: CalendarDaysIcon,
      value: '200+'
    },
    {
      title: 'Years of Service',
      description: 'Dedicated leadership and community service',
      icon: ClockIcon,
      value: '15+'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-50 via-white to-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <UserGroupIcon className="w-4 h-4" />
              <span>Previous Executive Committees</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Honoring Our <span className="text-primary">Leaders</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Meet the dedicated leaders who have guided our community through the years, 
              building the foundation for our success and growth.
            </p>
          </div>
        </div>
      </section>

      {/* Term Selection */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Select <span className="text-primary">Term</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose a term to view the executive committee members and their contributions.
            </p>
          </div>

          {/* Executive Committee */}
          <div className="text-center" >
            <p className="text-gray-600">No data found</p>
          </div>
        </div>
      </section>

      {/* Achievements Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Collective <span className="text-primary">Achievements</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The cumulative impact of our executive committees over the years.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {achievement.value}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 mb-2">
                    {achievement.title}
                  </div>
                  <div className="text-sm text-gray-600">
                    {achievement.description}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Building a <span className="text-primary">Legacy</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Each executive committee has contributed to building a stronger, more connected community. 
                Their dedication and vision have shaped our society into what it is today.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                From infrastructure development to community engagement, from digital transformation 
                to crisis management, our leaders have consistently worked towards the betterment 
                of our community.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <TrophyIcon className="w-6 h-6 text-primary" />
                  <span className="text-gray-700">Consistent community growth</span>
                </div>
                <div className="flex items-center space-x-3">
                  <HeartIcon className="w-6 h-6 text-primary" />
                  <span className="text-gray-700">Member welfare initiatives</span>
                </div>
                <div className="flex items-center space-x-3">
                  <SparklesIcon className="w-6 h-6 text-primary" />
                  <span className="text-gray-700">Innovation and modernization</span>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-50 rounded-2xl p-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-6">
                  <UserGroupIcon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Leadership Excellence
                </h3>
                <p className="text-gray-600">
                  Our executive committees have consistently demonstrated leadership excellence, 
                  guiding our community through challenges and opportunities with wisdom and dedication.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Continue the Legacy
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join our community and be part of the next chapter in our story of growth and success.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/services/membership-form"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <UserGroupIcon className="mr-2 w-4 h-4" />
              <span>Join Our Community</span>
            </a>
            
            <a 
              href="/about"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-primary font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <span>Learn More About Us</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PreviousEC
