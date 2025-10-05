'use client'

import React from 'react'
import Link from 'next/link'
import { 
  UserPlusIcon,
  TruckIcon,
  HomeIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

const Services = () => {
  const services = [
    {
      id: 'membership',
      title: 'Membership Registration',
      description: 'Join our community and become part of the Gulshan Society family. Enjoy exclusive benefits, community events, and member-only services.',
      icon: UserPlusIcon,
      features: [
        'Community Access',
        'Event Invitations',
        'Member Discounts',
        'Support Network'
      ],
      buttonText: 'Join Now',
      buttonLink: '/membership-form',
      color: 'blue',
      bgGradient: 'from-blue-500 to-blue-600',
      lightGradient: 'from-blue-50 to-blue-100',
      darkGradient: 'from-blue-900/20 to-blue-800/20'
    },
    {
      id: 'car-registration',
      title: 'Car Registration',
      description: 'Register your vehicle with Gulshan Society for parking permits, security access, and community vehicle management services.',
      icon: TruckIcon,
      features: [
        'Parking Permits',
        'Security Access',
        'Vehicle Tracking',
        'Community Safety'
      ],
      buttonText: 'Register Vehicle',
      buttonLink: '/car-registration',
      color: 'green',
      bgGradient: 'from-green-500 to-green-600',
      lightGradient: 'from-green-50 to-green-100',
      darkGradient: 'from-green-900/20 to-green-800/20'
    },
    {
      id: 'house-registration',
      title: 'House Registration',
      description: 'Register your residence for official community records, utility connections, and access to residential services and facilities.',
      icon: HomeIcon,
      features: [
        'Utility Connections',
        'Property Records',
        'Maintenance Services',
        'Residential Benefits'
      ],
      buttonText: 'Register House',
      buttonLink: '/house-registration',
      color: 'purple',
      bgGradient: 'from-purple-500 to-purple-600',
      lightGradient: 'from-purple-50 to-purple-100',
      darkGradient: 'from-purple-900/20 to-purple-800/20'
    }
  ]

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        icon: 'text-blue-600 dark:text-blue-400',
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        button: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800',
        accent: 'bg-blue-500'
      },
      green: {
        icon: 'text-green-600 dark:text-green-400',
        bg: 'bg-green-100 dark:bg-green-900/30',
        button: 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800',
        accent: 'bg-green-500'
      },
      purple: {
        icon: 'text-purple-600 dark:text-purple-400',
        bg: 'bg-purple-100 dark:bg-purple-900/30',
        button: 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800',
        accent: 'bg-purple-500'
      }
    }
    return colorMap[color as keyof typeof colorMap]
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <DocumentTextIcon className="w-4 h-4" />
            <span>Community Services</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Essential <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Community Services</span>
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Access our comprehensive range of community services designed to make your life in Gulshan Society convenient and secure.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon
            const colorClasses = getColorClasses(service.color)
            
            return (
              <div 
                key={service.id}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.lightGradient} dark:bg-gradient-to-br dark:${service.darkGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative p-8">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${colorClasses.bg} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 ${colorClasses.icon}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Link 
                    href={service.buttonLink}
                    className={`group/btn inline-flex items-center justify-center w-full px-6 py-3 ${colorClasses.button} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}
                  >
                    <span>{service.buttonText}</span>
                    <ArrowRightIcon className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>

                {/* Bottom Accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${colorClasses.accent} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <ShieldCheckIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Need Help with Registration?
              </h3>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Our community support team is here to assist you with any registration process. 
              Get personalized help and guidance for all your community service needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <span>Get Support</span>
                <ArrowRightIcon className="ml-2 w-4 h-4" />
              </Link>
              
              <Link 
                href="/services"
                className="inline-flex items-center justify-center px-8 py-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 text-gray-900 dark:text-gray-100 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <ClockIcon className="mr-2 w-4 h-4" />
                <span>View All Services</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services