'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  HomeIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  StarIcon,
  HeartIcon,
  UserIcon,
  KeyIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline'

const HouseRegistration = () => {
  const [formData, setFormData] = useState({
    ownerName: '',
    email: '',
    phone: '',
    currentAddress: '',
    houseNumber: '',
    block: '',
    floor: '',
    unitType: 'apartment',
    bedrooms: '',
    bathrooms: '',
    squareFootage: '',
    purchaseDate: '',
    ownershipType: 'owner',
    coOwnerName: '',
    coOwnerPhone: '',
    coOwnerEmail: '',
    tenantName: '',
    tenantPhone: '',
    tenantEmail: '',
    tenantId: '',
    emergencyContact: '',
    emergencyPhone: '',
    termsAccepted: false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const benefits = [
    {
      icon: <KeyIcon className="w-8 h-8" />,
      title: "Property Ownership",
      description: "Official recognition as a property owner with full legal documentation support."
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      title: "Security & Access",
      description: "Secure access control, visitor management, and 24/7 security monitoring."
    },
    {
      icon: <WrenchScrewdriverIcon className="w-8 h-8" />,
      title: "Maintenance Services",
      description: "Priority access to maintenance services, repairs, and property improvements."
    },
    {
      icon: <DocumentTextIcon className="w-8 h-8" />,
      title: "Legal Documentation",
      description: "Complete assistance with property documentation, transfers, and legal procedures."
    },
    {
      icon: <UserIcon className="w-8 h-8" />,
      title: "Tenant Management",
      description: "Tools and support for managing tenants, rent collection, and property leasing."
    },
    {
      icon: <HeartIcon className="w-8 h-8" />,
      title: "Community Benefits",
      description: "Access to all community amenities, events, and exclusive member services."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-6">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-300"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <HomeIcon className="w-4 h-4" />
              <span>Property Registration</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Register Your <span className="text-yellow-300">Property</span>
            </h1>
            
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Complete your property registration with Gulshan Society and enjoy secure 
              ownership, maintenance services, and exclusive community benefits.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Benefits Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Registration Benefits
              </h2>
              
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl text-white">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-2xl border border-purple-200 dark:border-purple-800">
                <div className="flex items-center space-x-3 mb-4">
                  <CheckCircleIcon className="w-8 h-8 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Required Documents
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center space-x-2">
                    <StarIcon className="w-4 h-4 text-yellow-500" />
                    <span>Property deed/ownership certificate</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <StarIcon className="w-4 h-4 text-yellow-500" />
                    <span>National ID card copy</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <StarIcon className="w-4 h-4 text-yellow-500" />
                    <span>Recent utility bills</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <StarIcon className="w-4 h-4 text-yellow-500" />
                    <span>Property tax receipts</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Property Registration Form
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Owner Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Owner Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Current Address *
                      </label>
                      <input
                        type="text"
                        name="currentAddress"
                        value={formData.currentAddress}
                        onChange={handleInputChange}
                        required
                        placeholder="Current residential address"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>
                </div>

                {/* Property Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Property Information
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        House Number *
                      </label>
                      <input
                        type="text"
                        name="houseNumber"
                        value={formData.houseNumber}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., 123"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Block *
                      </label>
                      <input
                        type="text"
                        name="block"
                        value={formData.block}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., A, B, C"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Floor *
                      </label>
                      <input
                        type="text"
                        name="floor"
                        value={formData.floor}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., 2nd Floor"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Unit Type *
                      </label>
                      <select
                        name="unitType"
                        value={formData.unitType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      >
                        <option value="apartment">Apartment</option>
                        <option value="duplex">Duplex</option>
                        <option value="penthouse">Penthouse</option>
                        <option value="studio">Studio</option>
                        <option value="townhouse">Townhouse</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Bedrooms *
                      </label>
                      <input
                        type="number"
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleInputChange}
                        required
                        min="1"
                        max="10"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Bathrooms *
                      </label>
                      <input
                        type="number"
                        name="bathrooms"
                        value={formData.bathrooms}
                        onChange={handleInputChange}
                        required
                        min="1"
                        max="10"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Square Footage *
                    </label>
                    <input
                      type="number"
                      name="squareFootage"
                      value={formData.squareFootage}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 1200"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>

                {/* Ownership Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Ownership Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Ownership Type *
                      </label>
                      <select
                        name="ownershipType"
                        value={formData.ownershipType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      >
                        <option value="owner">Owner</option>
                        <option value="co-owner">Co-Owner</option>
                        <option value="landlord">Landlord</option>
                        <option value="inherited">Inherited</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Purchase Date
                      </label>
                      <input
                        type="date"
                        name="purchaseDate"
                        value={formData.purchaseDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>
                </div>

                {/* Co-Owner Information */}
                {(formData.ownershipType === 'co-owner' || formData.ownershipType === 'landlord') && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      {formData.ownershipType === 'co-owner' ? 'Co-Owner Information' : 'Tenant Information'}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {formData.ownershipType === 'co-owner' ? 'Co-Owner Name' : 'Tenant Name'} *
                        </label>
                        <input
                          type="text"
                          name={formData.ownershipType === 'co-owner' ? 'coOwnerName' : 'tenantName'}
                          value={formData.ownershipType === 'co-owner' ? formData.coOwnerName : formData.tenantName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {formData.ownershipType === 'co-owner' ? 'Co-Owner Phone' : 'Tenant Phone'} *
                        </label>
                        <input
                          type="tel"
                          name={formData.ownershipType === 'co-owner' ? 'coOwnerPhone' : 'tenantPhone'}
                          value={formData.ownershipType === 'co-owner' ? formData.coOwnerPhone : formData.tenantPhone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {formData.ownershipType === 'co-owner' ? 'Co-Owner Email' : 'Tenant Email'} *
                      </label>
                      <input
                        type="email"
                        name={formData.ownershipType === 'co-owner' ? 'coOwnerEmail' : 'tenantEmail'}
                        value={formData.ownershipType === 'co-owner' ? formData.coOwnerEmail : formData.tenantEmail}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    {formData.ownershipType === 'landlord' && (
                      <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Tenant ID Number
                        </label>
                        <input
                          type="text"
                          name="tenantId"
                          value={formData.tenantId}
                          onChange={handleInputChange}
                          placeholder="National ID or Passport Number"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Emergency Contact */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Emergency Contact
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Emergency Contact Name
                      </label>
                      <input
                        type="text"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Emergency Contact Phone
                      </label>
                      <input
                        type="tel"
                        name="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleInputChange}
                      required
                      className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      <p>
                        I agree to the <Link href="/terms" className="text-purple-600 hover:text-purple-700 underline">Terms and Conditions</Link> and 
                        <Link href="/privacy" className="text-purple-600 hover:text-purple-700 underline"> Privacy Policy</Link> of Gulshan Society. 
                        I understand that my property registration will be reviewed and approved based on society guidelines and property verification.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    <span>Submit Registration</span>
                    <ArrowRightIcon className="w-5 h-5" />
                  </button>
                  <Link
                    href="/services"
                    className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-semibold py-4 px-8 rounded-xl transition-all duration-300 text-center"
                  >
                    View All Services
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HouseRegistration