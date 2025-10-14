'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  TruckIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  StarIcon,
  HeartIcon,
  ClockIcon,
  UserIcon,
  IdentificationIcon
} from '@heroicons/react/24/outline'

const CarRegistration = () => {
  const [formData, setFormData] = useState({
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    vehicleType: 'car',
    make: '',
    model: '',
    year: '',
    color: '',
    licensePlate: '',
    engineNumber: '',
    chassisNumber: '',
    registrationNumber: '',
    insuranceNumber: '',
    insuranceExpiry: '',
    parkingSpace: '',
    additionalDrivers: '',
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
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      title: "Secure Parking",
      description: "Designated parking spaces with 24/7 security monitoring and CCTV coverage."
    },
    {
      icon: <DocumentTextIcon className="w-8 h-8" />,
      title: "Documentation Support",
      description: "Complete assistance with vehicle registration and legal documentation processes."
    },
    {
      icon: <HeartIcon className="w-8 h-8" />,
      title: "Maintenance Services",
      description: "Access to on-site vehicle maintenance and repair services at discounted rates."
    },
    {
      icon: <ClockIcon className="w-8 h-8" />,
      title: "Priority Access",
      description: "Priority entry and exit privileges during peak hours and special events."
    },
    {
      icon: <UserIcon className="w-8 h-8" />,
      title: "Guest Vehicle Pass",
      description: "Temporary passes for guest vehicles with proper authorization and security."
    },
    {
      icon: <IdentificationIcon className="w-8 h-8" />,
      title: "Vehicle Identification",
      description: "Official society vehicle ID cards for easy identification and access control."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
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
              <TruckIcon className="w-4 h-4" />
              <span>Vehicle Registration</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Register Your <span className="text-yellow-300">Vehicle</span>
            </h1>
            
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Get your vehicle registered with Gulshan Society and enjoy secure parking, 
              maintenance services, and exclusive member benefits.
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
                      <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-xl text-white">
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

              <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-2xl border border-green-200 dark:border-green-800">
                <div className="flex items-center space-x-3 mb-4">
                  <CheckCircleIcon className="w-8 h-8 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Registration Requirements
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center space-x-2">
                    <StarIcon className="w-4 h-4 text-yellow-500" />
                    <span>Valid vehicle registration certificate</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <StarIcon className="w-4 h-4 text-yellow-500" />
                    <span>Current insurance documentation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <StarIcon className="w-4 h-4 text-yellow-500" />
                    <span>Valid driving license</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <StarIcon className="w-4 h-4 text-yellow-500" />
                    <span>Society membership verification</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Vehicle Registration Form
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
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
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
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
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
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Society Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        placeholder="House/Flat Number, Block"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>
                </div>

                {/* Vehicle Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Vehicle Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Vehicle Type *
                      </label>
                      <select
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      >
                        <option value="car">Car</option>
                        <option value="motorcycle">Motorcycle</option>
                        <option value="bicycle">Bicycle</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Make *
                      </label>
                      <input
                        type="text"
                        name="make"
                        value={formData.make}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., Toyota, Honda"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Model *
                      </label>
                      <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., Corolla, Civic"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Year *
                      </label>
                      <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        required
                        min="1900"
                        max="2024"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Color *
                      </label>
                      <input
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., Red, Blue"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>
                </div>

                {/* Vehicle Documentation */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Vehicle Documentation
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        License Plate Number *
                      </label>
                      <input
                        type="text"
                        name="licensePlate"
                        value={formData.licensePlate}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., DHA-1234"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Registration Number *
                      </label>
                      <input
                        type="text"
                        name="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={handleInputChange}
                        required
                        placeholder="Vehicle registration number"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Engine Number
                      </label>
                      <input
                        type="text"
                        name="engineNumber"
                        value={formData.engineNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Chassis Number
                      </label>
                      <input
                        type="text"
                        name="chassisNumber"
                        value={formData.chassisNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>
                </div>

                {/* Insurance Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Insurance Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Insurance Policy Number
                      </label>
                      <input
                        type="text"
                        name="insuranceNumber"
                        value={formData.insuranceNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Insurance Expiry Date
                      </label>
                      <input
                        type="date"
                        name="insuranceExpiry"
                        value={formData.insuranceExpiry}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Additional Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Preferred Parking Space
                      </label>
                      <input
                        type="text"
                        name="parkingSpace"
                        value={formData.parkingSpace}
                        onChange={handleInputChange}
                        placeholder="e.g., Block A, Level 2"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Additional Drivers
                      </label>
                      <input
                        type="text"
                        name="additionalDrivers"
                        value={formData.additionalDrivers}
                        onChange={handleInputChange}
                        placeholder="Names of other drivers"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>
                </div>

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
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
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
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
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
                      className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      <p>
                        I agree to the <Link href="/terms" className="text-green-600 hover:text-green-700 underline">Terms and Conditions</Link> and 
                        <Link href="/privacy" className="text-green-600 hover:text-green-700 underline"> Privacy Policy</Link> of Gulshan Society. 
                        I understand that my vehicle registration will be reviewed and approved based on society guidelines and parking availability.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
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

export default CarRegistration