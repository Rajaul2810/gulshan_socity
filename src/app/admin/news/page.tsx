'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  NewspaperIcon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'

interface NewsArticle {
  id: string
  title: string
  description: string
  image?: string
  source: string
  date: string
  news_link?: string
  status: 'draft' | 'published'
}

const NewsPage = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    source: '',
    date: new Date().toISOString().split('T')[0],
    news_link: '',
    image: '',
    status: 'draft' as 'draft' | 'published',
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [uploading, setUploading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/news')
      const { data, error } = await response.json()

      if (error) throw new Error(error)
      setArticles(data || [])
    } catch (error) {
      console.error('Error fetching news:', error)
      setErrorMessage('Failed to load news articles')
    } finally {
      setLoading(false)
    }
  }

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOpenModal = (article?: NewsArticle) => {
    if (article) {
      setEditingArticle(article)
      setFormData({
        title: article.title,
        description: article.description,
        source: article.source,
        date: article.date,
        news_link: article.news_link || '',
        image: article.image || '',
        status: article.status,
      })
      setImagePreview(article.image || '')
    } else {
      setEditingArticle(null)
      setFormData({
        title: '',
        description: '',
        source: '',
        date: new Date().toISOString().split('T')[0],
        news_link: '',
        image: '',
        status: 'draft',
      })
      setImagePreview('')
    }
    setImageFile(null)
    setErrorMessage('')
    setSuccessMessage('')
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingArticle(null)
    setImageFile(null)
    setImagePreview('')
    setErrorMessage('')
    setSuccessMessage('')
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrorMessage('Please select a valid image file')
        return
      }
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('Image size must be less than 5MB')
        return
      }
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      setErrorMessage('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      let imageUrl = formData.image

      // Upload image if a new file is selected
      if (imageFile) {
        const uploadFormData = new FormData()
        uploadFormData.append('file', imageFile)

        const uploadResponse = await fetch('/api/news/upload', {
          method: 'POST',
          body: uploadFormData,
        })

        const uploadResult = await uploadResponse.json()

        if (uploadResult.error) {
          throw new Error(uploadResult.error)
        }

        imageUrl = uploadResult.data.url
      }

      const articleData = {
        ...formData,
        image: imageUrl,
      }

      let response
      if (editingArticle) {
        // Update article
        response = await fetch(`/api/news/${editingArticle.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(articleData),
        })
      } else {
        // Create article
        response = await fetch('/api/news', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(articleData),
        })
      }

      const result = await response.json()

      if (result.error) {
        throw new Error(result.error)
      }

      // Create success message with agenda
      const agenda = editingArticle
        ? [
            `✓ News article "${formData.title}" updated successfully`,
            `✓ Source: ${formData.source}`,
            `✓ Date: ${new Date(formData.date).toLocaleDateString()}`,
            `✓ Status: ${formData.status}`,
          ]
        : [
            `✓ News article "${formData.title}" created successfully`,
            `✓ Source: ${formData.source}`,
            `✓ Date: ${new Date(formData.date).toLocaleDateString()}`,
            `✓ Status: ${formData.status}`,
          ]

      setSuccessMessage(agenda.join('\n'))

      // Refresh news list
      await fetchNews()

      // Close modal after a short delay
      setTimeout(() => {
        handleCloseModal()
      }, 2000)
    } catch (error) {
      console.error('Error saving news article:', error)
      setErrorMessage(error instanceof Error ? error.message : 'Failed to save news article')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this news article?')) return

    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'DELETE',
      })

      const result = await response.json()

      if (result.error) {
        throw new Error(result.error)
      }

      setSuccessMessage('News article deleted successfully!')
      await fetchNews()

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
    } catch (error) {
      console.error('Error deleting news article:', error)
      setErrorMessage(error instanceof Error ? error.message : 'Failed to delete news article')
      setTimeout(() => {
        setErrorMessage('')
      }, 3000)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">News Management</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Manage news articles and updates</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary-800 text-white font-semibold rounded-lg shadow-sm transition-colors duration-200"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add News
        </button>
      </div>

      {/* Success Message with Agenda */}
      {successMessage && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <CheckCircleIcon className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-green-800 dark:text-green-300 font-semibold mb-2">News Update Summary</h3>
              <div className="space-y-1">
                {successMessage.split('\n').map((line, index) => (
                  <p key={index} className="text-green-700 dark:text-green-400 text-sm">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center space-x-3">
          <ExclamationTriangleIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
          <p className="text-red-800 dark:text-red-300 font-medium">{errorMessage}</p>
        </div>
      )}

      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search news articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading news articles...</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="p-12 text-center">
            <NewspaperIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No news articles found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first news article'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => handleOpenModal()}
                className="inline-flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary-800 text-white font-semibold rounded-lg"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Add News
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredArticles.map((article) => (
              <div key={article.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  {article.image && (
                    <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{article.title}</h3>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full flex-shrink-0 ${
                          article.status === 'published'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {article.status}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">{article.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
                      <span>Source: {article.source}</span>
                      <span>•</span>
                      <span>{new Date(article.date).toLocaleDateString()}</span>
                      {article.news_link && (
                        <>
                          <span>•</span>
                          <a
                            href={article.news_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                          >
                            View Link
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
                    <button
                      onClick={() => handleOpenModal(article)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDelete(article.id)} className="text-red-600 hover:text-red-900 dark:text-red-400">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {editingArticle ? 'Edit News Article' : 'Add New News Article'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description *</label>
                <textarea
                  required
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter the news article description..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Source *</label>
                  <input
                    type="text"
                    required
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    placeholder="e.g., BBC News, CNN, etc."
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">News Link</label>
                <input
                  type="url"
                  value={formData.news_link}
                  onChange={(e) => setFormData({ ...formData, news_link: e.target.value })}
                  placeholder="https://example.com/news-article"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                />
                <p className="mt-1 text-xs text-gray-500">Optional: Link to the original news article</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image</label>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                />
                <p className="mt-1 text-xs text-gray-500">Max file size: 5MB. Supported formats: JPEG, PNG, WebP</p>
                {imagePreview && (
                  <div className="mt-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                    />
                  </div>
                )}
                {!imagePreview && formData.image && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current image:</p>
                    <div className="relative w-full h-48 rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
                      <Image
                        src={formData.image}
                        alt="Current"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status *</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-4 py-2 bg-primary hover:bg-primary-800 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? 'Saving...' : editingArticle ? 'Update Article' : 'Add Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default NewsPage

