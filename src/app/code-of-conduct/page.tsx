'use client'

import React from 'react'
import Link from 'next/link'
import { 
  DocumentCheckIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  HeartIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

const CodeOfConduct = () => {
  const principles = [
    {
      title: 'Respect & Dignity',
      description: 'Treat all community members with respect, dignity, and kindness regardless of background, beliefs, or status.',
      icon: HeartIcon,
      color: 'bg-red-100 text-red-600'
    },
    {
      title: 'Community Responsibility',
      description: 'Take responsibility for maintaining a clean, safe, and harmonious living environment for all residents.',
      icon: UserGroupIcon,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Safety & Security',
      description: 'Follow all security protocols, respect community safety measures, and report any concerns promptly.',
      icon: ShieldCheckIcon,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Compliance',
      description: 'Adhere to all local laws, community guidelines, and building regulations at all times.',
      icon: DocumentCheckIcon,
      color: 'bg-purple-100 text-purple-600'
    }
  ]

  const guidelines = [
    {
      category: 'General Conduct',
      items: [
        'Maintain peace and harmony within the community',
        'Respect neighbors\' privacy and property',
        'Use common areas responsibly and leave them clean',
        'Follow noise regulations, especially during quiet hours',
        'Participate constructively in community activities'
      ]
    },
    {
      category: 'Property & Facilities',
      items: [
        'Maintain your property in good condition',
        'Obtain necessary approvals before major renovations',
        'Use community facilities responsibly and as intended',
        'Report maintenance issues promptly',
        'Respect shared spaces and common areas'
      ]
    },
    {
      category: 'Safety & Security',
      items: [
        'Follow all security protocols and guidelines',
        'Display valid car stickers and identification when required',
        'Report suspicious activities to security or authorities',
        'Cooperate with security personnel and community police',
        'Ensure visitors follow community security measures'
      ]
    },
    {
      category: 'Communication',
      items: [
        'Communicate respectfully with all community members',
        'Raise concerns through proper channels and procedures',
        'Participate in community meetings and discussions',
        'Share important information that affects the community',
        'Resolve conflicts through dialogue and mediation'
      ]
    },
    {
      category: 'Environment',
      items: [
        'Dispose of waste properly and follow waste management rules',
        'Maintain cleanliness of surroundings and common areas',
        'Respect green spaces and parks',
        'Follow environmental guidelines and conservation measures',
        'Report environmental concerns or violations'
      ]
    },
    {
      category: 'Membership Responsibilities',
      items: [
        'Pay membership dues and fees on time',
        'Attend general meetings when possible',
        'Participate in community decision-making processes',
        'Support community initiatives and programs',
        'Maintain accurate membership information'
      ]
    }
  ]

  const violations = [
    {
      title: 'Minor Violations',
      description: 'First-time minor infractions may result in a warning and educational discussion.',
      icon: InformationCircleIcon,
      examples: [
        'Improper waste disposal',
        'Noise during quiet hours',
        'Unauthorized use of common areas'
      ]
    },
    {
      title: 'Serious Violations',
      description: 'Repeated violations or serious misconduct may result in formal warnings and penalties.',
      icon: ExclamationTriangleIcon,
      examples: [
        'Repeated non-compliance with regulations',
        'Damage to community property',
        'Disrespectful behavior toward neighbors or staff'
      ]
    },
    {
      title: 'Severe Violations',
      description: 'Legal violations or threats to community safety may result in immediate action and legal consequences.',
      icon: ShieldCheckIcon,
      examples: [
        'Criminal activities',
        'Threats to community safety',
        'Violation of local laws or regulations'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <section className="relative py-20 bg-gradient-to-br from-primary-50 via-white to-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <DocumentCheckIcon className="w-4 h-4" />
              <span>Code of Conduct</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Community <span className="text-primary">Guidelines</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              These guidelines ensure a respectful, safe, and harmonious living environment 
              for all members and residents of Gulshan Society community.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Core <span className="text-primary">Principles</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The fundamental values that guide our community behavior and interactions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {principles.map((principle, index) => {
              const IconComponent = principle.icon
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-200">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${principle.color} rounded-2xl mb-4`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {principle.title}
                  </h3>
                  <p className="text-gray-600">
                    {principle.description}
                  </p>
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
              Community <span className="text-primary">Guidelines</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Specific guidelines and expectations for all community members and residents.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guidelines.map((guideline, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <CheckCircleIcon className="w-6 h-6 text-primary mr-2" />
                  {guideline.category}
                </h3>
                <ul className="space-y-3">
                  {guideline.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Violation <span className="text-primary">Consequences</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Understanding the consequences of code violations and the enforcement process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {violations.map((violation, index) => {
              const IconComponent = violation.icon
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {violation.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {violation.description}
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Examples:</p>
                    {violation.examples.map((example, exampleIndex) => (
                      <div key={exampleIndex} className="flex items-start space-x-2">
                        <span className="text-gray-400 mt-1">-</span>
                        <span className="text-sm text-gray-600">{example}</span>
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
          <div className="bg-primary-50 rounded-2xl p-8 border border-primary-200">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Questions or Concerns?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                If you have questions about the code of conduct or need to report a concern, 
                please contact our office through the following channels.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <span>Contact Us</span>
                <ArrowRightIcon className="ml-2 w-4 h-4" />
              </Link>
              
              <Link 
                href="/member-services"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <span>Member Services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CodeOfConduct