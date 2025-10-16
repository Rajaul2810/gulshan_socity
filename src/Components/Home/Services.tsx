'use client'

import React from 'react'
import { 
  HomeIcon,
  HeartIcon,
  UserGroupIcon,
  InformationCircleIcon,
  ShieldCheckIcon,
  HandRaisedIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

const Services = () => {
  const services = [
    {
      id: 'property-advocacy',
      title: 'Property Advocacy',
      description: 'Providing support and guidance on property-related matters for residents in Gulshan Model town.',
      icon: HomeIcon,
      color: 'primary'
    },
    {
      id: 'liability-initiatives',
      title: 'Liability Initiatives',
      description: 'Implementing projects and programs to enhance the overall livability and quality of life for residents.',
      icon: HeartIcon,
      color: 'primary'
    },
    {
      id: 'community-engagement',
      title: 'Community Engagement',
      description: 'Organizing social and cultural activities to foster fellowship and inclusivity among members.',
      icon: UserGroupIcon,
      color: 'primary'
    },
    {
      id: 'member-support',
      title: 'Member Support',
      description: 'Offering resources, information, and assistance to members in addressing their specific needs and concerns.',
      icon: InformationCircleIcon,
      color: 'primary'
    },
    {
      id: 'security-safety',
      title: 'Security & Safety',
      description: 'Collaborating with relevant stakeholders to ensure the safety and security of the neighborhood.',
      icon: ShieldCheckIcon,
      color: 'primary'
    },
    {
      id: 'fraternity-peace',
      title: 'Fraternity & Peace',
      description: 'Promoting a sense of unity, harmony, and peaceful coexistence among residents in Gulshan Model Town.',
      icon: HandRaisedIcon,
      color: 'primary'
    }
  ]

  const getColorClasses = (color: string) => {
    const colorMap = {
      primary: {
        icon: 'text-primary',
        bg: 'bg-primary-100',
        button: 'bg-primary hover:bg-primary-800',
        accent: 'bg-primary-500'
      }
    }
    return colorMap[color as keyof typeof colorMap]
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <SparklesIcon className="w-4 h-4" />
            <span>Our Services</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Our <span className="text-primary">Services</span>
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Gulshan Society offers advocacy, coordination, and leadership for property, habitat, and livability. 
            We promote fellowship through social, cultural, and advocacy activities, striving for continuous 
            improvement to ensure a peaceful and secure environment for residents of Gulshan Model town.
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
                className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-800"
              >
                {/* Content */}
                <div className="relative p-8">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${colorClasses.bg} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 ${colorClasses.icon}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${colorClasses.accent} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default Services