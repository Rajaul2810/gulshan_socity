'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  PhotoIcon,
  VideoCameraIcon,
  NewspaperIcon,
  CalendarDaysIcon,
  EyeIcon,
  PlayIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline'
import { useGallery } from '@/hooks/useGallery'
import { useNews } from '@/hooks/useNews'
import { GalleryItem } from '@/hooks/useGallery'
import { NewsArticle } from '@/hooks/useNews'





const MediaPage = () => {
  const [activeTab, setActiveTab] = useState<'photos' | 'videos' | 'news'>('photos')

  const { items : photoItems, loading : photoLoading, error : photoError } = useGallery('image')
  const { items : videoItems, loading : videoLoading, error : videoError } = useGallery('video')
  const { articles : newsArticles, loading : newsLoading, error : newsError } = useNews('published')

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
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <PhotoIcon className="w-4 h-4" />
            <span>Community Media</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Community <span className="text-primary">Gallery & News</span>
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our community through photos, videos, and stay updated with the latest news and announcements.
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
                  : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
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
                  : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
              }`}
            >
              <VideoCameraIcon className="w-5 h-5" />
              <span>Videos</span>
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeTab === 'news'
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
              }`}
            >
              <NewspaperIcon className="w-5 h-5" />
              <span>News</span>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {activeTab === 'photos' && photoLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Error State */}
        {activeTab === 'photos' && photoError && !photoLoading && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
            <p className="text-red-800 dark:text-red-300 font-medium mb-2">Unable to load photos</p>
            <p className="text-red-600 dark:text-red-400 text-sm">{photoError}</p>
          </div>
        )}
        
        {/* Loading State */}
        {activeTab === 'videos' && videoLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Error State */}
        {activeTab === 'videos' && videoError && !videoLoading && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
            <p className="text-red-800 dark:text-red-300 font-medium mb-2">Unable to load videos</p>
            <p className="text-red-600 dark:text-red-400 text-sm">{videoError}</p>
          </div>
        )}
        
        {/* Loading State */}
        {activeTab === 'news' && newsLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Error State */}
        {activeTab === 'news' && newsError && !newsLoading && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
            <p className="text-red-800 dark:text-red-300 font-medium mb-2">Unable to load news</p>
            <p className="text-red-600 dark:text-red-400 text-sm">{newsError}</p>
          </div>
        )}
        
        {/* Content Based on Active Tab */}
        {activeTab === 'photos' && !photoLoading && !photoError && (
          <>
            {photoItems.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {photoItems.map((photo : GalleryItem) => (
                  <div 
                    key={photo.id}
                    className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
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
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
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
            ) : (
              <div className="text-center py-12 mb-12">
                <PhotoIcon className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 text-lg font-medium mb-2">No photos available</p>
                <p className="text-gray-500 dark:text-gray-500 text-sm">Check back later for new community photos.</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'videos' && !videoLoading && !videoError && (
          <>
            {videoItems.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {videoItems.map((video : GalleryItem) => (
                  <div 
                    key={video.id}
                    className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
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
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300">
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
            ) : (
              <div className="text-center py-12 mb-12">
                <VideoCameraIcon className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 text-lg font-medium mb-2">No videos available</p>
                <p className="text-gray-500 dark:text-gray-500 text-sm">Check back later for new community videos.</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'news' && !newsLoading && !newsError && (
          <>
            {newsArticles.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {newsArticles.map((article : NewsArticle) => (
                  <div 
                    key={article.id}
                    className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image 
                        src={article.image || '/placeholder.jpg'} 
                        alt={article.title}
                        width={400}
                        height={250}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(article.source)}`}>
                          {article.source}
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4 flex items-center space-x-1 text-white text-sm">
                        <EyeIcon className="w-4 h-4" />
                        <span>{formatDate(article.date)}</span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed line-clamp-3">
                        {article.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                        <div className="flex items-center space-x-2">
                          <CalendarDaysIcon className="w-4 h-4" />
                          <span>{formatDate(article.date)}</span>
                        </div>
                        <span className="text-xs">By {article.source}</span>
                      </div>
                      {article.news_link ? (
                        <Link 
                          href={article.news_link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group/btn"
                        >
                          <span>Read More</span>
                          <ArrowTopRightOnSquareIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </Link>
                      ) : (
                        <div className="w-full bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 font-semibold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 cursor-not-allowed">
                          <span>No Link Available</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 mb-12">
                <NewspaperIcon className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 text-lg font-medium mb-2">No news articles available</p>
                <p className="text-gray-500 dark:text-gray-500 text-sm">Check back later for new community news and announcements.</p>
              </div>
            )}
          </>
        )}

      </div>
    </section>
  )
}

export default MediaPage