'use client'

import React from 'react'
import Link from 'next/link'
import { 
  UserIcon,
  BuildingOffice2Icon,
  HomeIcon,
  CalendarDaysIcon,
  InformationCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CheckCircleIcon,
  HeartIcon,
  SparklesIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

const NonMemberServices = () => {
  const services = [
    {
      title: 'Public Parks & Recreation',
      description: 'Access to beautifully maintained parks and recreational spaces in Gulshan area.',
      icon: HomeIcon,
      features: [
        'গুলশান সোসাইটি লেক পার্ক (Lake Park)',
        'বিচারপতি শাহাবুদ্দিন আহমেদ পার্ক (Justice Shahabuddin Ahmed Park)',
        'শহীদ ডাঃ ফজলে রাব্বী পার্ক (Shaheed Dr. Fazle Rabbi Park)',
        'Clean and safe recreational areas',
        'Children\'s play areas and facilities'
      ],
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Community Information',
      description: 'General information about Gulshan area, facilities, and community services.',
      icon: InformationCircleIcon,
      features: [
        'Area information and guidelines',
        'Community event announcements',
        'Local facilities directory',
        'Safety and security updates',
        'Public service information'
      ],
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Cultural Events',
      description: 'Participate in public cultural events and celebrations organized by Gulshan Society.',
      icon: CalendarDaysIcon,
      features: [
        'পহেলা বৈশাখ (Bengali New Year) celebrations',
        'জাতীয় দিবস (National Day) observances',
        'Public cultural programs',
        'Community festivals',
        'Exhibition and art events'
      ],
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Public Services Support',
      description: 'Information and guidance regarding public services and utilities in Gulshan area.',
      icon: BuildingOffice2Icon,
      features: [
        'Utility service information',
        'Local authority contacts',
        'Public transport information',
        'Area maintenance updates',
        'Community safety information'
      ],
      color: 'bg-yellow-100 text-yellow-600'
    }
  ]

  const benefits = [
    {
      title: 'Free Access',
      description: 'All non-member services are available at no cost to the general public.',
      icon: CheckCircleIcon
    },
    {
      title: 'Community Support',
      description: 'Get information and support for general community-related inquiries.',
      icon: HeartIcon
    },
    {
      title: 'Regular Updates',
      description: 'Stay informed about public events and community initiatives.',
      icon: SparklesIcon
    },
    {
      title: 'Easy Access',
      description: 'Contact us through multiple channels for your convenience.',
      icon: PhoneIcon
    }
  ]

  const contactInfo = [
    {
      title: 'General Inquiry',
      phone: '+88-02-9881375',
      email: 'gulshansociety@gmail.com',
      hours: '9 AM - 6 PM (Mon-Fri)',
      icon: PhoneIcon
    },
    {
      title: 'Email Support',
      email: 'gulshansociety@gmail.com',
      hours: 'Response within 48 hours',
      icon: EnvelopeIcon
    },
    {
      title: 'Visit Our Office',
      address: 'House# 7/B, Flat# A1, Road# 103, Gulshan-2, Dhaka-1212',
      hours: '9 AM - 6 PM (Mon-Fri)',
      icon: MapPinIcon
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <section className="relative py-20 bg-gradient-to-br from-primary-50 via-white to-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <UserIcon className="w-4 h-4" />
              <span>Non-Member Services</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Community <span className="text-primary">Services</span> for Everyone
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Explore the range of public services and facilities available to all residents 
              and visitors in the Gulshan community, regardless of membership status.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Available <span className="text-primary">Services</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Public services and facilities that enhance the quality of life in Gulshan community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
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

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-primary">Our Services</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Benefits of using our community services and facilities.
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

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Get in <span className="text-primary">Touch</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Contact us for information about public services and general community inquiries.
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
                    <p className="text-gray-600 mb-2 text-sm">
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

      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Interested in Membership?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Become a member to access exclusive benefits and priority services in the Gulshan community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/membership-form"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <span>Join as Member</span>
              <ArrowRightIcon className="ml-2 w-4 h-4" />
            </Link>
            
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-primary font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <span>Learn More</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default NonMemberServices