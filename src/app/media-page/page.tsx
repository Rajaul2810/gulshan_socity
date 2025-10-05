'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  PhotoIcon,
  VideoCameraIcon,
  NewspaperIcon,
  ArrowRightIcon,
  CalendarDaysIcon,
  EyeIcon,
  PlayIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline'

interface MediaItem {
  id: number
  title: string
  description?: string
  image?: string
  date: string
  category: string
  views?: number
}

interface VideoItem extends MediaItem {
  duration: string
  thumbnail: string
  image: string
}

interface NewsItem extends MediaItem {
  author: string
  excerpt: string
}

const MediaPage = () => {
  const [activeTab, setActiveTab] = useState<'photos' | 'videos' | 'news'>('photos')

  const photos: MediaItem[] = [
    {
      id: 1,
      title: 'Community Cultural Festival 2024',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      date: '2024-01-15',
      category: 'Events',
      views: 245
    },
    {
      id: 2,
      title: 'Children Art Exhibition',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
      date: '2024-01-10',
      category: 'Art',
      views: 189
    },
    {
      id: 3,
      title: 'Sports Tournament Winners',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      date: '2024-01-05',
      category: 'Sports',
      views: 312
    },
    {
      id: 4,
      title: 'Community Garden Project',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
      date: '2023-12-28',
      category: 'Community',
      views: 156
    },
    {
      id: 5,
      title: 'Winter Festival Celebration',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop',
      date: '2023-12-20',
      category: 'Festival',
      views: 278
    },
    {
      id: 6,
      title: 'Health Workshop Session',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      date: '2023-12-15',
      category: 'Health',
      views: 134
    }
  ]

  const videos: VideoItem[] = [
    {
      id: 1,
      title: 'Community Annual Meeting Highlights',
      description: 'Watch the highlights from our annual community meeting where we discussed upcoming projects and member feedback.',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&h=300&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&h=300&fit=crop',
      duration: '12:34',
      date: '2024-01-20',
      category: 'Community',
      views: 456
    },
    {
      id: 2,
      title: 'Gulshan Society Welcome Video',
      description: 'Get to know our vibrant community and what makes Gulshan Society special.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop',
      duration: '8:45',
      date: '2024-01-10',
      category: 'Welcome',
      views: 623
    },
    {
      id: 3,
      title: 'Sports Tournament Final Match',
      description: 'Relive the excitement of our annual sports tournament final match.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop',
      duration: '15:22',
      date: '2024-01-05',
      category: 'Sports',
      views: 389
    }
  ]

  const news: NewsItem[] = [
    {
      id: 1,
      title: 'New Community Center Opens Its Doors',
      description: 'The state-of-the-art community center is now open for all residents.',
      excerpt: 'After months of planning and construction, our new community center is finally ready to serve the Gulshan Society members.',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=250&fit=crop',
      date: '2024-01-25',
      category: 'Announcement',
      author: 'Community Board',
      views: 567
    },
    {
      id: 2,
      title: 'Security System Upgrade Completed',
      description: 'Enhanced security measures now in place for better community safety.',
      excerpt: 'Our community now benefits from upgraded security systems including CCTV cameras and access control.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
      date: '2024-01-22',
      category: 'Security',
      author: 'Security Team',
      views: 423
    },
    {
      id: 3,
      title: 'Environmental Initiative Launched',
      description: 'New recycling program and green energy initiatives announced.',
      excerpt: 'Join us in making Gulshan Society more environmentally friendly with our new recycling and sustainability programs.',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=250&fit=crop',
      date: '2024-01-18',
      category: 'Environment',
      author: 'Green Committee',
      views: 298
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
          <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <PhotoIcon className="w-4 h-4" />
            <span>Community Media</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Community <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Gallery & News</span>
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
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <PhotoIcon className="w-5 h-5" />
              <span>Photos</span>
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeTab === 'videos'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <VideoCameraIcon className="w-5 h-5" />
              <span>Videos</span>
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeTab === 'news'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <NewspaperIcon className="w-5 h-5" />
              <span>News</span>
            </button>
          </div>
        </div>

        {/* Content Based on Active Tab */}
        {activeTab === 'photos' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {photos.map((photo) => (
              <div 
                key={photo.id}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={photo.image || '/placeholder.jpg'} 
                    alt={photo.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(photo.category)}`}>
                      {photo.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 flex items-center space-x-1 text-white text-sm">
                    <EyeIcon className="w-4 h-4" />
                    <span>{photo.views}</span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {photo.title}
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

        {activeTab === 'videos' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {videos.map((video) => (
              <div 
                key={video.id}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src={video.thumbnail} 
                    alt={video.title}
                    width={500}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 dark:bg-gray-800/90 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                      <PlayIcon className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(video.category)}`}>
                      {video.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm font-semibold">
                    {video.duration}
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center space-x-1 text-white text-sm">
                    <EyeIcon className="w-4 h-4" />
                    <span>{video.views}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                    {video.description}
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <CalendarDaysIcon className="w-4 h-4" />
                    <span>{formatDate(video.date)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'news' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {news.map((article) => (
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
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(article.category)}`}>
                      {article.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 flex items-center space-x-1 text-white text-sm">
                    <EyeIcon className="w-4 h-4" />
                    <span>{article.views}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-2">
                      <CalendarDaysIcon className="w-4 h-4" />
                      <span>{formatDate(article.date)}</span>
                    </div>
                    <span className="text-xs">By {article.author}</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group/btn">
                    <span>Read More</span>
                    <ArrowTopRightOnSquareIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
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
                href="/media/submit"
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <PhotoIcon className="mr-2 w-4 h-4" />
                <span>Submit Content</span>
              </Link>
              <Link 
                href="/media"
                className="inline-flex items-center justify-center px-8 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 text-gray-900 dark:text-gray-100 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
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

export default MediaPage