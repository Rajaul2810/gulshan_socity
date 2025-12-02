'use client'

import React, { useState, useEffect } from 'react'
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  PhotoIcon,
  XMarkIcon,
  VideoCameraIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'

interface GalleryItem {
  id: string
  title: string
  type: 'image' | 'video'
  image?: string
  video_link?: string
  date: string
  tag?: 'Cultural' | 'Health' | 'Technology' | 'Community' | 'Art' | 'Sports'
}

const GalleryPage = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState<'image' | 'video'>('image')
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    type: 'image' as 'image' | 'video',
    image: '',
    video_link: '',
    date: new Date().toISOString().split('T')[0],
    tag: '' as '' | 'Cultural' | 'Health' | 'Technology' | 'Community' | 'Art' | 'Sports',
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [uploading, setUploading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const tags = ['Cultural', 'Health', 'Technology', 'Community', 'Art', 'Sports']

  useEffect(() => {
    fetchGallery()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection])

  const fetchGallery = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/gallery?type=${activeSection}`)
      const { data, error } = await response.json()

      if (error) throw new Error(error)
      setGalleryItems(data || [])
    } catch (error) {
      console.error('Error fetching gallery items:', error)
      setErrorMessage('Failed to load gallery items')
    } finally {
      setLoading(false)
    }
  }

  const filteredItems = galleryItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.tag && item.tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleOpenModal = (item?: GalleryItem) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        title: item.title,
        type: item.type,
        image: item.image || '',
        video_link: item.video_link || '',
        date: item.date,
        tag: item.tag || '',
      })
      setImagePreview(item.image || '')
      setActiveSection(item.type)
    } else {
      setEditingItem(null)
      setFormData({
        title: '',
        type: activeSection,
        image: '',
        video_link: '',
        date: new Date().toISOString().split('T')[0],
        tag: '',
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
    setEditingItem(null)
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

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return ''
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    const videoId = match && match[2].length === 11 ? match[2] : null
    return videoId ? `https://www.youtube.com/embed/${videoId}` : ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      let imageUrl = formData.image

      // Upload image if a new file is selected and type is image
      if (formData.type === 'image' && imageFile) {
        const uploadFormData = new FormData()
        uploadFormData.append('file', imageFile)

        const uploadResponse = await fetch('/api/gallery/upload', {
          method: 'POST',
          body: uploadFormData,
        })

        const uploadResult = await uploadResponse.json()

        if (uploadResult.error) {
          throw new Error(uploadResult.error)
        }

        imageUrl = uploadResult.data.url
      }

      // Validate video link if type is video
      if (formData.type === 'video' && !formData.video_link) {
        throw new Error('Video link is required for video type')
      }

      const itemData = {
        title: formData.title,
        type: formData.type,
        image: formData.type === 'image' ? imageUrl : null,
        video_link: formData.type === 'video' ? formData.video_link : null,
        date: formData.date,
        tag: formData.tag || null,
      }

      let response
      if (editingItem) {
        // Update item
        response = await fetch(`/api/gallery/${editingItem.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(itemData),
        })
      } else {
        // Create item
        response = await fetch('/api/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(itemData),
        })
      }

      const result = await response.json()

      if (result.error) {
        throw new Error(result.error)
      }

      // Create success message with agenda
      const agenda = editingItem
        ? [
            `✓ Gallery item "${formData.title}" updated successfully`,
            `✓ Type: ${formData.type}`,
            `✓ Date: ${new Date(formData.date).toLocaleDateString()}`,
            formData.tag ? `✓ Tag: ${formData.tag}` : null,
          ].filter(Boolean)
        : [
            `✓ Gallery item "${formData.title}" created successfully`,
            `✓ Type: ${formData.type}`,
            `✓ Date: ${new Date(formData.date).toLocaleDateString()}`,
            formData.tag ? `✓ Tag: ${formData.tag}` : null,
          ].filter(Boolean)

      setSuccessMessage(agenda.join('\n'))

      // Refresh gallery list
      await fetchGallery()

      // Close modal after a short delay
      setTimeout(() => {
        handleCloseModal()
      }, 2000)
    } catch (error) {
      console.error('Error saving gallery item:', error)
      setErrorMessage(error instanceof Error ? error.message : 'Failed to save gallery item')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) return

    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
      })

      const result = await response.json()

      if (result.error) {
        throw new Error(result.error)
      }

      setSuccessMessage('Gallery item deleted successfully!')
      await fetchGallery()

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
    } catch (error) {
      console.error('Error deleting gallery item:', error)
      setErrorMessage(error instanceof Error ? error.message : 'Failed to delete gallery item')
      setTimeout(() => {
        setErrorMessage('')
      }, 3000)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Gallery Management</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Manage photo gallery and videos</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary-800 text-white font-semibold rounded-lg shadow-sm transition-colors duration-200"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add {activeSection === 'image' ? 'Image' : 'Video'}
        </button>
      </div>

      {/* Section Tabs */}
      <div className="flex space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        <button
          onClick={() => {
            setActiveSection('image')
            fetchGallery()
          }}
          className={`flex-1 px-4 py-2 rounded-md font-semibold transition-colors ${
            activeSection === 'image'
              ? 'bg-white dark:bg-gray-700 text-primary shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <PhotoIcon className="w-5 h-5" />
            <span>Images</span>
          </div>
        </button>
        <button
          onClick={() => {
            setActiveSection('video')
            fetchGallery()
          }}
          className={`flex-1 px-4 py-2 rounded-md font-semibold transition-colors ${
            activeSection === 'video'
              ? 'bg-white dark:bg-gray-700 text-primary shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <VideoCameraIcon className="w-5 h-5" />
            <span>Videos</span>
          </div>
        </button>
      </div>

      {/* Success Message with Agenda */}
      {successMessage && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <CheckCircleIcon className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-green-800 dark:text-green-300 font-semibold mb-2">Gallery Update Summary</h3>
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
          placeholder="Search gallery..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading gallery items...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-12 text-center">
            <PhotoIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No {activeSection === 'image' ? 'images' : 'videos'} found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm ? 'Try adjusting your search terms' : `Get started by adding your first ${activeSection === 'image' ? 'image' : 'video'}`}
            </p>
            {!searchTerm && (
              <button
                onClick={() => handleOpenModal()}
                className="inline-flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary-800 text-white font-semibold rounded-lg"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Add {activeSection === 'image' ? 'Image' : 'Video'}
              </button>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 group"
              >
                <div className="h-48 bg-gray-200 dark:bg-gray-600 flex items-center justify-center relative">
                  {item.type === 'image' ? (
                    item.image ? (
                      <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
                    ) : (
                      <PhotoIcon className="w-12 h-12 text-gray-400" />
                    )
                  ) : (
                    item.video_link ? (
                      <iframe
                        src={getYouTubeEmbedUrl(item.video_link)}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <VideoCameraIcon className="w-12 h-12 text-gray-400" />
                    )
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="p-2 bg-white rounded-lg text-blue-600 hover:bg-blue-50"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 bg-white rounded-lg text-red-600 hover:bg-red-50"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{item.title}</h3>
                    {item.tag && (
                      <span className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {editingItem ? 'Edit Gallery Item' : 'Add New Gallery Item'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type *</label>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, type: 'image', video_link: '' })
                    }}
                    className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                      formData.type === 'image'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <PhotoIcon className="w-5 h-5" />
                      <span>Image</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, type: 'video', image: '' })
                      setImageFile(null)
                      setImagePreview('')
                    }}
                    className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                      formData.type === 'video'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <VideoCameraIcon className="w-5 h-5" />
                      <span>Video</span>
                    </div>
                  </button>
                </div>
              </div>
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
              {formData.type === 'image' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image *</label>
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
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">YouTube Video Link *</label>
                  <input
                    type="url"
                    required
                    value={formData.video_link}
                    onChange={(e) => setFormData({ ...formData, video_link: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                  />
                  <p className="mt-1 text-xs text-gray-500">Enter a YouTube video URL</p>
                  {formData.video_link && getYouTubeEmbedUrl(formData.video_link) && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Preview:</p>
                      <div className="relative w-full h-48 rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
                        <iframe
                          src={getYouTubeEmbedUrl(formData.video_link)}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-4">
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tag</label>
                  <select
                    value={formData.tag}
                    onChange={(e) =>
                      setFormData({ ...formData, tag: e.target.value as typeof formData.tag })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select a tag</option>
                    {tags.map((tag) => (
                      <option key={tag} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select>
                </div>
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
                  {uploading ? 'Saving...' : editingItem ? 'Update Item' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default GalleryPage

