'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  CalendarDaysIcon,
  MapPinIcon,
  ClockIcon,
  UsersIcon,
  TrophyIcon,
  SparklesIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'

interface Event {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  attendees: number
  image: string
  category: string
  status: 'upcoming' | 'completed'
  highlights?: string[]
}

const Events = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming')

  const upcomingEvents: Event[] = [
    {
      id: 1,
      title: 'Community Cultural Festival',
      description: 'Join us for a vibrant celebration of our diverse community culture with food, music, and traditional performances.',
      date: '2024-02-15',
      time: '6:00 PM - 10:00 PM',
      location: 'Gulshan Community Center',
      attendees: 150,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop',
      category: 'Cultural',
      status: 'upcoming' as const
    },
    {
      id: 2,
      title: 'Health & Wellness Workshop',
      description: 'Learn about healthy living practices, nutrition, and fitness routines from certified health professionals.',
      date: '2024-02-22',
      time: '10:00 AM - 2:00 PM',
      location: 'Gulshan Health Center',
      attendees: 80,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop',
      category: 'Health',
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Tech Meetup & Networking',
      description: 'Connect with fellow tech enthusiasts, share knowledge, and explore the latest technology trends.',
      date: '2024-03-01',
      time: '7:00 PM - 9:00 PM',
      location: 'Gulshan Innovation Hub',
      attendees: 60,
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&h=300&fit=crop',
      category: 'Technology',
      status: 'upcoming'
    }
  ]

  const completedEvents: Event[] = [
    {
      id: 4,
      title: 'Annual Community Meeting',
      description: 'Our yearly gathering to discuss community development, upcoming projects, and member feedback.',
      date: '2024-01-20',
      time: '2:00 PM - 5:00 PM',
      location: 'Gulshan Community Center',
      attendees: 200,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&h=300&fit=crop',
      category: 'Community',
      status: 'completed',
      highlights: ['New playground approved', 'Security system upgrade', 'Member feedback collected']
    },
    {
      id: 5,
      title: 'Children\'s Art Exhibition',
      description: 'Showcasing creative artworks by our talented young community members.',
      date: '2024-01-10',
      time: '11:00 AM - 4:00 PM',
      location: 'Gulshan Art Gallery',
      attendees: 120,
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=300&fit=crop',
      category: 'Art',
      status: 'completed',
      highlights: ['50+ artworks displayed', 'Young artist awards', 'Community appreciation']
    },
    {
      id: 6,
      title: 'Winter Sports Tournament',
      description: 'Friendly competition featuring cricket, football, and badminton matches.',
      date: '2024-01-05',
      time: '9:00 AM - 6:00 PM',
      location: 'Gulshan Sports Complex',
      attendees: 180,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop',
      category: 'Sports',
      status: 'completed',
      highlights: ['Cricket champions crowned', 'Football tournament completed', 'Badminton finals held']
    }
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Cultural': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      'Health': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      'Technology': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'Community': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      'Art': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
      'Sports': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
    }
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
  }

  const events = activeTab === 'upcoming' ? upcomingEvents : completedEvents

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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {events.map((event) => (
            <div 
              key={event.id}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              {/* Event Image */}
              <div className="relative h-48 overflow-hidden">
                <Image 
                  src={event.image} 
                  alt={event.title}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(event.category)}`}>
                    {event.category}
                  </span>
                </div>
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
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
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
                  
                  <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                    <UsersIcon className="w-4 h-4 text-purple-500" />
                    <span>{event.attendees} attendees</span>
                  </div>
                </div>

                {/* Event Highlights for Completed Events */}
                {event.status === 'completed' && 'highlights' in event && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Event Highlights:</h4>
                    <div className="space-y-1">
                      {event.highlights?.map((highlight: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                          <CheckCircleIcon className="w-3 h-3 text-green-500 flex-shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                {/* <div className="flex space-x-3">
                  {event.status === 'upcoming' ? (
                    <button className="flex-1 bg-primary hover:bg-primary-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group/btn">
                      <span>Register Now</span>
                      <ArrowRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>
                  ) : (
                    <button className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group/btn">
                      <EyeIcon className="w-4 h-4" />
                      <span>View Gallery</span>
                    </button>
                  )}
                </div> */}
              </div>
            </div>
          ))}
        </div>

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
                href="/events/create"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary hover:bg-primary-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <SparklesIcon className="mr-2 w-4 h-4" />
                <span>Propose Event</span>
              </Link>
              <Link 
                href="/events"
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