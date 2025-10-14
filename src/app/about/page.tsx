'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  BookOpenIcon,
  ClockIcon,
  HeartIcon,
  ArrowRightIcon,
  TrophyIcon,
  CalendarDaysIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline'

const About = () => {
  const activities = [
    {
      title: 'Community Development',
      description: 'Building stronger neighborhoods through collaborative projects and initiatives.',
      icon: HeartIcon,
      stats: '25+ Projects'
    },
    {
      title: 'Cultural Events',
      description: 'Celebrating diversity and fostering cultural understanding in our community.',
      icon: CalendarDaysIcon,
      stats: '50+ Events'
    },
    {
      title: 'Educational Programs',
      description: 'Providing learning opportunities and skill development for all ages.',
      icon: BookOpenIcon,
      stats: '15+ Programs'
    },
    {
      title: 'Health & Wellness',
      description: 'Promoting healthy living and wellness initiatives for community members.',
      icon: HeartIcon,
      stats: '10+ Initiatives'
    }
  ]

  const achievements = [
    {
      year: '2008',
      title: 'Foundation',
      description: 'Gulshan Society was established with a vision to create a vibrant community.'
    },
    {
      year: '2012',
      title: 'Community Center',
      description: 'Opened our first community center to serve as a hub for activities.'
    },
    {
      year: '2018',
      title: 'Digital Transformation',
      description: 'Launched online services and digital platforms for better member engagement.'
    },
    {
      year: '2024',
      title: 'Modern Facilities',
      description: 'Completed major infrastructure upgrades and modern amenities.'
    }
  ]

  const team = [
    {
      name: 'Dr. Ahmed Hassan',
      position: 'President',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      description: 'Leading our community with 15+ years of experience in community development.'
    },
    {
      name: 'Fatima Rahman',
      position: 'Vice President',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      description: 'Passionate about community welfare and member engagement initiatives.'
    },
    {
      name: 'Mohammad Ali',
      position: 'Secretary',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      description: 'Ensuring smooth operations and maintaining community records.'
    }
  ]

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
              
              <Link 
                href="/about/history"
                className="inline-flex items-center justify-center px-8 py-3 bg-white border-2 border-primary hover:border-primary-800 text-primary hover:text-primary-800 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <ClockIcon className="mr-2 w-4 h-4" />
                <span>Our History</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-primary">Activities</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the diverse range of activities and initiatives that make our community vibrant and connected.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {activities.map((activity, index) => {
              const IconComponent = activity.icon
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-200">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {activity.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {activity.description}
                  </p>
                  
                  <div className="text-primary font-semibold text-sm">
                    {activity.stats}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-primary">Journey</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Key milestones in our community&apos;s growth and development over the years.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-200"></div>
            
            <div className="space-y-12">
              {achievements.map((achievement, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-1/2 px-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                      <div className="text-primary font-bold text-2xl mb-2">
                        {achievement.year}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {achievement.title}
                      </h3>
                      <p className="text-gray-600">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="w-8 h-8 bg-primary rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10">
                    <TrophyIcon className="w-4 h-4 text-white" />
                  </div>
                  
                  <div className="w-1/2 px-8"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Leadership <span className="text-primary">Team</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated leaders who guide our community with vision and commitment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-200">
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <Image 
                    src={member.image}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover rounded-full border-4 border-primary-100"
                  />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                
                <div className="text-primary font-semibold mb-3">
                  {member.position}
                </div>
                
                <p className="text-gray-600 text-sm">
                  {member.description}
                </p>
              </div>
            ))}
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
              href="/services/membership-form"
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
