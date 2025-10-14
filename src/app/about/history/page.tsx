'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ClockIcon,
  TrophyIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  GlobeAltIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'

const History = () => {
  const timeline = [
    {
      year: '2008',
      title: 'Foundation',
      description: 'Gulshan Society was established by a group of visionary community leaders who recognized the need for a unified organization to serve the growing residential area.',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop',
      achievements: ['Initial 50 founding members', 'First community center established', 'Basic services launched']
    },
    {
      year: '2010',
      title: 'First Major Project',
      description: 'Completed our first major infrastructure project - the community playground and recreational facilities.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      achievements: ['Playground construction', 'Recreational facilities', 'Member count: 150']
    },
    {
      year: '2012',
      title: 'Digital Transformation',
      description: 'Launched our first website and digital services, making it easier for members to access information and services.',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop',
      achievements: ['Website launch', 'Online registration system', 'Digital communication']
    },
    {
      year: '2015',
      title: 'Expansion Phase',
      description: 'Expanded our services to include health programs, educational initiatives, and cultural events.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      achievements: ['Health programs launched', 'Educational initiatives', 'Cultural events series']
    },
    {
      year: '2018',
      title: 'Modern Facilities',
      description: 'Completed major renovation and expansion of community facilities, including a new multipurpose hall and upgraded security systems.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      achievements: ['Multipurpose hall construction', 'Security system upgrade', 'Member count: 500+']
    },
    {
      year: '2020',
      title: 'COVID-19 Response',
      description: 'Implemented comprehensive support programs during the pandemic, including food distribution, health monitoring, and virtual events.',
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop',
      achievements: ['Emergency support programs', 'Virtual event platform', 'Community health initiatives']
    },
    {
      year: '2022',
      title: 'Sustainability Initiative',
      description: 'Launched our green community program, focusing on environmental sustainability and eco-friendly practices.',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
      achievements: ['Solar panel installation', 'Waste management program', 'Green spaces development']
    },
    {
      year: '2024',
      title: 'Digital Innovation',
      description: 'Introduced advanced digital services, mobile app, and AI-powered community management systems.',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop',
      achievements: ['Mobile app launch', 'AI community management', 'Member count: 800+']
    }
  ]

  const milestones = [
    {
      number: '800+',
      label: 'Active Members',
      icon: UserGroupIcon
    },
    {
      number: '50+',
      label: 'Community Events',
      icon: CalendarDaysIcon
    },
    {
      number: '15+',
      label: 'Years of Service',
      icon: ClockIcon
    },
    {
      number: '25+',
      label: 'Major Projects',
      icon: TrophyIcon
    }
  ]

  const founders = [
    {
      name: 'Dr. Mohammad Rahman',
      role: 'Founding President',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      quote: 'Our vision was to create a community where everyone feels valued and connected.'
    },
    {
      name: 'Fatima Begum',
      role: 'Founding Secretary',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      quote: 'We believed in the power of community to transform lives and create lasting bonds.'
    },
    {
      name: 'Ahmed Hassan',
      role: 'Founding Treasurer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      quote: 'Financial transparency and community trust were our guiding principles.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-50 via-white to-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <ClockIcon className="w-4 h-4" />
              <span>Our History</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-primary">Journey</span> Through Time
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              From humble beginnings to becoming a thriving community organization, 
              discover the milestones that shaped our society over the years.
            </p>
          </div>
        </div>
      </section>

      {/* Milestones Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => {
              const IconComponent = milestone.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {milestone.number}
                  </div>
                  <div className="text-gray-600">
                    {milestone.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-primary">Timeline</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Key moments and achievements that have defined our community&apos;s growth and development.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-200"></div>
            
            <div className="space-y-12">
              {timeline.map((event, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-1/2 px-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="text-primary font-bold text-2xl">
                          {event.year}
                        </div>
                        <div className="text-lg font-semibold text-gray-900">
                          {event.title}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4">
                        {event.description}
                      </p>
                      
                      <div className="space-y-2">
                        {event.achievements.map((achievement, achievementIndex) => (
                          <div key={achievementIndex} className="flex items-center space-x-2">
                            <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-8 h-8 bg-primary rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10">
                    <TrophyIcon className="w-4 h-4 text-white" />
                  </div>
                  
                  <div className="w-1/2 px-8">
                    <div className="relative">
                      <Image 
                        src={event.image}
                        alt={event.title}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover rounded-xl shadow-lg"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-primary">Founders</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The visionary leaders who laid the foundation for our community&apos;s success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <Image 
                    src={founder.image}
                    alt={founder.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover rounded-full border-4 border-primary-100"
                  />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {founder.name}
                </h3>
                
                <div className="text-primary font-semibold mb-4">
                  {founder.role}
                </div>
                
                <blockquote className="text-gray-600 italic">
                  &quot;{founder.quote}&quot;
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Looking to the <span className="text-primary-200">Future</span>
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            As we continue to grow and evolve, our commitment to serving our community 
            remains unwavering. We look forward to many more years of progress and prosperity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/about/mission"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <GlobeAltIcon className="mr-2 w-4 h-4" />
              <span>Our Mission</span>
            </Link>
            
            <Link 
              href="/services/membership-form"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-primary font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <UserGroupIcon className="mr-2 w-4 h-4" />
              <span>Join Our Community</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default History
