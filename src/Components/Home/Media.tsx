'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  PhotoIcon,
  VideoCameraIcon,
  ArrowRightIcon,
  CalendarDaysIcon,
  EyeIcon,
  PlayIcon,
} from '@heroicons/react/24/outline'
import { useGallery } from '@/hooks/useGallery'
import { GalleryItem } from '@/hooks/useGallery'

const Media = () => {
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos')

  const { items : photoItems, loading : photoLoading, error : photoError } = useGallery('image')
  const { items : videoItems, loading : videoLoading, error : videoError } = useGallery('video')

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        return 'Invalid Date'
      }
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })
    } catch {
      return 'Invalid Date'
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Events': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      'Art': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
      'Sports': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      'Community': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      'Festival': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      'Health': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      'Welcome': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'Announcement': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
      'Security': 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
      'Environment': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
    }
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <PhotoIcon className="w-4 h-4" />
            <span>Community Media</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Community <span className="text-gradient-primary">Gallery</span>
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our community through photos and videos.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-2 flex space-x-2">
            <button
              onClick={() => setActiveTab('photos')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeTab === 'photos'
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:text-primary'
              }`}
            >
              <PhotoIcon className="w-5 h-5" />
              <span>Photos</span>
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeTab === 'videos'
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:text-primary'
              }`}
            >
              <VideoCameraIcon className="w-5 h-5" />
              <span>Videos</span>
            </button>
          </div>
        </div>

        {/* Content Based on Active Tab */}
        {activeTab === 'photos' && (
          <>
            {/* Loading State */}
            {photoLoading && (
              <div className="flex items-center justify-center py-12 mb-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            )}

            {/* Error State */}
            {photoError && !photoLoading && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center mb-12">
                <p className="text-red-800 dark:text-red-300 font-medium mb-2">Unable to load photos</p>
                <p className="text-red-600 dark:text-red-400 text-sm">{photoError}</p>
              </div>
            )}

            {/* Photos Grid */}
            {!photoLoading && !photoError && photoItems.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {photoItems.map((photo : GalleryItem) => (
                  <div 
                    key={photo.id}
                    className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <Image 
                        src={photo.image || '/placeholder.jpg'} 
                        alt={photo.title || 'Photo'}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(photo.tag || '')}`}>
                          {photo.tag || 'Photo'}
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4 flex items-center space-x-1 text-white text-sm">
                        <EyeIcon className="w-4 h-4" />
                        <span>{formatDate(photo.date)}</span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors duration-300">
                        {photo.title || 'Photo'}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <CalendarDaysIcon className="w-4 h-4" />
                        <span>{formatDate(photo.date)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!photoLoading && !photoError && photoItems.length === 0 && (
              <div className="text-center py-12 mb-12">
                <PhotoIcon className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 text-lg font-medium mb-2">No photos available</p>
                <p className="text-gray-500 dark:text-gray-500 text-sm">Check back later for new community photos.</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'videos' && (
          <>
            {/* Loading State */}
            {videoLoading && (
              <div className="flex items-center justify-center py-12 mb-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            )}

            {/* Error State */}
            {videoError && !videoLoading && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center mb-12">
                <p className="text-red-800 dark:text-red-300 font-medium mb-2">Unable to load videos</p>
                <p className="text-red-600 dark:text-red-400 text-sm">{videoError}</p>
              </div>
            )}

            {/* Videos Grid */}
            {!videoLoading && !videoError && videoItems.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {videoItems.map((video : GalleryItem) => (
                  <div 
                    key={video.id}
                    className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image 
                        src={video.image || '/placeholder.jpg'} 
                        alt={video.title || 'Video'}
                        width={500}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/90 dark:bg-gray-800/90 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                          <PlayIcon className="w-8 h-8 text-primary" />
                        </div>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(video.tag || '')}`}>
                          {video.tag || 'Video'}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 flex items-center space-x-1 text-white text-sm">
                        <EyeIcon className="w-4 h-4" />
                        <span>{formatDate(video.date)}</span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors duration-300">
                        {video.title || 'Video'}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <CalendarDaysIcon className="w-4 h-4" />
                        <span>{formatDate(video.date)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!videoLoading && !videoError && videoItems.length === 0 && (
              <div className="text-center py-12 mb-12">
                <VideoCameraIcon className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 text-lg font-medium mb-2">No videos available</p>
                <p className="text-gray-500 dark:text-gray-500 text-sm">Check back later for new community videos.</p>
              </div>
            )}
          </>
        )}
      

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Share Your Community Moments
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Have photos, videos, or news to share with the community? 
              We&apos;d love to feature your content in our media gallery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <PhotoIcon className="mr-2 w-4 h-4" />
                <span>Contact Us</span>
              </Link>
              <Link 
                href="/media"
                className="inline-flex items-center justify-center px-8 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:border-primary text-gray-900 dark:text-gray-100 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <ArrowRightIcon className="mr-2 w-4 h-4" />
                <span>View All Media</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Media