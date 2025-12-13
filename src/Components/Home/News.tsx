'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { 
  PhotoIcon,
  CalendarDaysIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline'
import { useNews } from '@/hooks/useNews'
import { NewsArticle } from '@/hooks/useNews'
import Link from 'next/link'

// News Article Card Component
const NewsArticleCard = ({ article, formatDate, getCategoryColor }: { 
  article: NewsArticle
  formatDate: (date: string) => string
  getCategoryColor: (category: string) => string
}) => {
  const [imageError, setImageError] = useState(false)

  return (
    <div 
      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
        {!imageError ? (
          <Image 
            src={article.image || '/placeholder.jpg'} 
            alt={article.title}
            width={400}
            height={250}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <PhotoIcon className="w-12 h-12 text-gray-400 dark:text-gray-500" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(article.source)}`}>
            {article.source}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-primary transition-colors duration-300">
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
  )
}




const News = () => {

  const { articles : newsArticles, loading, error } = useNews('published')


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
            <span>News</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Recent <span className="text-primary"> News</span>
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Stay updated with the latest news and announcements.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
            <p className="text-red-800 dark:text-red-300 font-medium mb-2">Unable to load news</p>
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* News Articles */}
        {!loading && !error && newsArticles.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {newsArticles.map((article : NewsArticle) => (
              <NewsArticleCard
                key={article.id}
                article={article}
                formatDate={formatDate}
                getCategoryColor={getCategoryColor}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && newsArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No news articles available at the moment.</p>
          </div>
        )}

      </div>
    </section>
  )
}

export default News