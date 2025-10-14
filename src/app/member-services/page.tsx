'use client'

import React from 'react'
import Link from 'next/link'
import { 
  CogIcon,
  HeartIcon,
  UserGroupIcon,
  AcademicCapIcon,
  CalendarDaysIcon,
  ShieldCheckIcon,
  GiftIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CheckCircleIcon,
  StarIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

const MemberServices = () => {
  const services = [
    {
      title: 'Priority Support',
      description: 'Get priority access to all community services and support channels.',
      icon: ShieldCheckIcon,
      features: ['24/7 emergency support', 'Priority maintenance requests', 'Dedicated support team'],
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Exclusive Events',
      description: 'Access to members-only events, workshops, and community gatherings.',
      icon: CalendarDaysIcon,
      features: ['Monthly member meetups', 'Exclusive workshops', 'Cultural events', 'Annual member gala'],
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Educational Programs',
      description: 'Free access to educational workshops, skill development, and learning programs.',
      icon: AcademicCapIcon,
      features: ['Skill development workshops', 'Language classes', 'Technology training', 'Professional development'],
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Health & Wellness',
      description: 'Comprehensive health and wellness programs for all members.',
      icon: HeartIcon,
      features: ['Health checkups', 'Fitness programs', 'Mental health support', 'Nutrition counseling'],
      color: 'bg-red-100 text-red-600'
    },
    {
      title: 'Member Discounts',
      description: 'Exclusive discounts and offers from partner businesses and services.',
      icon: GiftIcon,
      features: ['Restaurant discounts', 'Shopping deals', 'Service discounts', 'Travel offers'],
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      title: 'Community Network',
      description: 'Connect with fellow members and build lasting relationships.',
      icon: UserGroupIcon,
      features: ['Member directory', 'Networking events', 'Interest groups', 'Mentorship programs'],
      color: 'bg-indigo-100 text-indigo-600'
    }
  ]

  const benefits = [
    {
      title: 'No Registration Fees',
      description: 'All member services are included in your membership at no additional cost.',
      icon: CheckCircleIcon
    },
    {
      title: 'Family Coverage',
      description: 'All services extend to your immediate family members.',
      icon: UserGroupIcon
    },
    {
      title: 'Lifetime Access',
      description: 'Once a member, always a member with lifetime access to all services.',
      icon: StarIcon
    },
    {
      title: 'Regular Updates',
      description: 'Stay informed with regular updates about new services and opportunities.',
      icon: SparklesIcon
    }
  ]

  const contactInfo = [
    {
      title: 'Member Services Hotline',
      phone: '+880 1711 234567',
      hours: '24/7 Available',
      icon: PhoneIcon
    },
    {
      title: 'Email Support',
      email: 'members@gulshansociety.org',
      hours: 'Response within 24 hours',
      icon: EnvelopeIcon
    },
    {
      title: 'Visit Our Office',
      address: 'Community Center, Road 7, Gulshan',
      hours: '9 AM - 6 PM (Mon-Fri)',
      icon: MapPinIcon
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-50 via-white to-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <CogIcon className="w-4 h-4" />
              <span>Member Services</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Exclusive <span className="text-primary">Member Benefits</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover the comprehensive range of services and benefits available exclusively 
              to our valued community members.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-primary">Services</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive services designed to enhance your community experience and quality of life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-200">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`p-3 rounded-xl ${service.color}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {service.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-primary">Member Services</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the advantages of being part of our exclusive member community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Get in <span className="text-primary">Touch</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our member services team is here to help you make the most of your membership.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {contactInfo.map((contact, index) => {
              const IconComponent = contact.icon
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-200">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {contact.title}
                  </h3>
                  
                  {contact.phone && (
                    <p className="text-primary font-semibold mb-1">
                      {contact.phone}
                    </p>
                  )}
                  
                  {contact.email && (
                    <p className="text-primary font-semibold mb-1">
                      {contact.email}
                    </p>
                  )}
                  
                  {contact.address && (
                    <p className="text-gray-600 mb-2">
                      {contact.address}
                    </p>
                  )}
                  
                  <p className="text-sm text-gray-500">
                    {contact.hours}
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
            Ready to Access Member Services?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join our community today and start enjoying all the exclusive benefits and services.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/services/membership-form"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <UserGroupIcon className="mr-2 w-4 h-4" />
              <span>Join Now</span>
            </Link>
            
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-primary font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <PhoneIcon className="mr-2 w-4 h-4" />
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MemberServices
