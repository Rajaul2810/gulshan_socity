'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useEvents } from '@/hooks/useEvents'
import { 
  CalendarDaysIcon,
  MapPinIcon,
  ClockIcon,
  TrophyIcon,
  SparklesIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'

const Events = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming')
  const { events: upcomingEvents, loading: upcomingLoading } = useEvents('upcoming')
  const { events: completedEvents, loading: completedLoading } = useEvents('completed')

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const getCategoryColor = (tag: string) => {
    const colors: { [key: string]: string } = {
      'Cultural': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      'Health': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      'Technology': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'Community': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      'Art': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
      'Sports': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
    }
    return colors[tag] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
  }

  const events = activeTab === 'upcoming' ? upcomingEvents : completedEvents
  const loading = activeTab === 'upcoming' ? upcomingLoading : completedLoading

  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <CalendarDaysIcon className="w-4 h-4" />
            <span>Community Events</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Upcoming & <span className="text-primary">Past Events</span>
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Stay connected with our community through exciting events, workshops, and gatherings that bring neighbors together.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-2 flex space-x-2">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 border border-gray-200 dark:border-gray-700 ${
                activeTab === 'upcoming'
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:text-primary'
              }`}
            >
              <SparklesIcon className="w-5 h-5" />
              <span>Upcoming Events</span>
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 border border-gray-200 dark:border-gray-700 ${
                activeTab === 'completed'
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:text-primary'
              }`}
            >
              <TrophyIcon className="w-5 h-5" />
              <span>Completed Events</span>
            </button>
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading events...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12">
            <CalendarDaysIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              No {activeTab === 'upcoming' ? 'upcoming' : 'completed'} events at the moment.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {events.map((event) => (
              <div 
                key={event.id}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                {/* Event Image */}
                <div className="relative h-48 overflow-hidden">
                  {event.image ? (
                    <Image 
                      src={event.image} 
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                      <CalendarDaysIcon className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  {event.tag && (
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(event.tag)}`}>
                        {event.tag}
                      </span>
                    </div>
                  )}
                  {event.status === 'completed' && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                        <CheckCircleIcon className="w-4 h-4" />
                        <span>Completed</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Event Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors duration-300">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed line-clamp-3">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                      <CalendarDaysIcon className="w-4 h-4 text-blue-500" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                      <ClockIcon className="w-4 h-4 text-green-500" />
                      <span>{event.time}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                      <MapPinIcon className="w-4 h-4 text-red-500" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  {/* Event Highlights for Completed Events */}
                  {event.status === 'completed' && event.highlights && event.highlights.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Event Highlights:</h4>
                      <div className="space-y-1">
                        {event.highlights.map((highlight: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                            <CheckCircleIcon className="w-3 h-3 text-green-500 flex-shrink-0" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Want to Organize an Event?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Have an idea for a community event? We&apos;d love to help you bring it to life. 
              Contact our events team to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary hover:bg-primary-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <SparklesIcon className="mr-2 w-4 h-4" />
                <span>Contact Us</span>
              </Link>
              <Link 
                href="/event-page"
                className="inline-flex items-center justify-center px-8 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:border-primary text-gray-900 dark:text-gray-100 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <CalendarDaysIcon className="mr-2 w-4 h-4" />
                <span>View All Events</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Events