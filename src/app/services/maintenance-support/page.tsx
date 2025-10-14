'use client'

import React, { useState } from 'react'
import { 
  BookmarkIcon,
  WrenchScrewdriverIcon,
  PhoneIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  HomeIcon,
  BoltIcon,
  ShieldCheckIcon,
  MapPinIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'

const MaintenanceSupport = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    { id: 'all', name: 'All Services', icon: HomeIcon },
    { id: 'electrical', name: 'Electrical', icon: BoltIcon },
    { id: 'plumbing', name: 'Plumbing', icon: WrenchScrewdriverIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
    { id: 'cleaning', name: 'Cleaning', icon: HomeIcon },
    { id: 'landscaping', name: 'Landscaping', icon: HomeIcon }
  ]

  const services = [
    {
      id: 1,
      title: 'Electrical Repairs',
      description: 'Professional electrical repairs and installations for your home.',
      category: 'electrical',
      icon: BoltIcon,
      price: 'Starting from ৳500',
      duration: '2-4 hours',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Plumbing Services',
      description: 'Complete plumbing solutions including repairs, installations, and maintenance.',
      category: 'plumbing',
      icon: WrenchScrewdriverIcon,
      price: 'Starting from ৳300',
      duration: '1-3 hours',
      priority: 'high'
    },
    {
      id: 3,
      title: 'Security System Maintenance',
      description: 'Regular maintenance and upgrades for your home security systems.',
      category: 'security',
      icon: ShieldCheckIcon,
      price: 'Starting from ৳800',
      duration: '3-6 hours',
      priority: 'medium'
    },
    {
      id: 4,
      title: 'Deep Cleaning',
      description: 'Comprehensive cleaning services for your entire home.',
      category: 'cleaning',
      icon: HomeIcon,
      price: 'Starting from ৳1,200',
      duration: '4-8 hours',
      priority: 'low'
    },
    {
      id: 5,
      title: 'Garden Maintenance',
      description: 'Professional landscaping and garden maintenance services.',
      category: 'landscaping',
      icon: HomeIcon,
      price: 'Starting from ৳600',
      duration: '2-5 hours',
      priority: 'low'
    },
    {
      id: 6,
      title: 'Emergency Repairs',
      description: '24/7 emergency repair services for urgent maintenance issues.',
      category: 'electrical',
      icon: ExclamationTriangleIcon,
      price: 'Starting from ৳1,000',
      duration: '1-2 hours',
      priority: 'urgent'
    }
  ]

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory)

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <ExclamationTriangleIcon className="w-3 h-3 mr-1" />
          Urgent
        </span>
      case 'high':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
          High Priority
        </span>
      case 'medium':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          Medium Priority
        </span>
      case 'low':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Low Priority
        </span>
      default:
        return null
    }
  }

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      alert('Your maintenance request has been submitted successfully!')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-50 via-white to-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookmarkIcon className="w-4 h-4" />
              <span>Maintenance Support</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Professional <span className="text-primary">Maintenance</span> Services
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Keep your home in perfect condition with our comprehensive maintenance 
              and repair services. Professional, reliable, and affordable solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-primary">Services</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our wide range of professional maintenance services.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:text-primary hover:shadow-md border border-gray-200'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{category.name}</span>
                </button>
              )
            })}
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => {
              const IconComponent = service.icon
              return (
                <div key={service.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-200">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="p-3 bg-primary-100 rounded-xl">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {service.title}
                      </h3>
                      {getPriorityBadge(service.priority)}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Price:</span>
                      <span className="text-sm font-semibold text-primary">{service.price}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Duration:</span>
                      <span className="text-sm font-semibold text-gray-900">{service.duration}</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-primary hover:bg-primary-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                    Request Service
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Request Form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Request <span className="text-primary">Maintenance</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Submit your maintenance request and we&apos;ll get back to you within 24 hours.
            </p>
          </div>

          <form onSubmit={handleRequestSubmit} className="bg-gray-50 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                  placeholder="Enter your email address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Type *
                </label>
                <select
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                >
                  <option value="">Select service type</option>
                  <option value="electrical">Electrical</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="security">Security</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="landscaping">Landscaping</option>
                  <option value="emergency">Emergency</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                placeholder="Enter your full address"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description of Issue *
              </label>
              <textarea
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                placeholder="Describe the maintenance issue or service you need"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Date & Time
              </label>
              <input
                type="datetime-local"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary-800 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <CheckCircleIcon className="w-5 h-5" />
                  <span>Submit Request</span>
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Need <span className="text-primary-200">Immediate</span> Help?
            </h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              For urgent maintenance issues, contact our emergency support team.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl mb-4">
                <PhoneIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Emergency Hotline</h3>
              <p className="text-primary-100 font-semibold text-xl">+880 1711 234567</p>
              <p className="text-primary-200 text-sm">24/7 Available</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl mb-4">
                <EnvelopeIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Email Support</h3>
              <p className="text-primary-100 font-semibold">maintenance@gulshansociety.org</p>
              <p className="text-primary-200 text-sm">Response within 2 hours</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl mb-4">
                <MapPinIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Visit Our Office</h3>
              <p className="text-primary-100">Community Center, Road 7</p>
              <p className="text-primary-200 text-sm">9 AM - 6 PM (Mon-Fri)</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MaintenanceSupport
