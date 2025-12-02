'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  CalendarDaysIcon,
  XMarkIcon,
  PhotoIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  image?: string
  tag?: 'Cultural' | 'Health' | 'Technology' | 'Community' | 'Art' | 'Sports'
  highlights?: string[]
  status: 'upcoming' | 'completed'
}

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    image: '',
    tag: '' as '' | 'Cultural' | 'Health' | 'Technology' | 'Community' | 'Art' | 'Sports',
    highlights: [] as string[],
    status: 'upcoming' as 'upcoming' | 'completed',
  })
  const [highlightInput, setHighlightInput] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [uploading, setUploading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/events')
      const { data, error } = await response.json()

      if (error) throw new Error(error)
      setEvents(data || [])
    } catch (error) {
      console.error('Error fetching events:', error)
      setErrorMessage('Failed to load events')
    } finally {
      setLoading(false)
    }
  }

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOpenModal = (event?: Event) => {
    if (event) {
      setEditingEvent(event)
      setFormData({
        title: event.title,
        description: event.description,
        date: event.date,
        time: event.time,
        location: event.location,
        image: event.image || '',
        tag: event.tag || '',
        highlights: event.highlights || [],
        status: event.status,
      })
      setImagePreview(event.image || '')
    } else {
      setEditingEvent(null)
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        image: '',
        tag: '',
        highlights: [],
        status: 'upcoming',
      })
      setImagePreview('')
    }
    setImageFile(null)
    setHighlightInput('')
    setErrorMessage('')
    setSuccessMessage('')
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingEvent(null)
    setImageFile(null)
    setImagePreview('')
    setHighlightInput('')
    setErrorMessage('')
    setSuccessMessage('')
  }

  const addHighlight = () => {
    if (highlightInput.trim()) {
      setFormData({
        ...formData,
        highlights: [...formData.highlights, highlightInput.trim()],
      })
      setHighlightInput('')
    }
  }

  const removeHighlight = (index: number) => {
    setFormData({
      ...formData,
      highlights: formData.highlights.filter((_, i) => i !== index),
    })
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

        const uploadResponse = await fetch('/api/events/upload', {
          method: 'POST',
          body: uploadFormData,
        })

        const uploadResult = await uploadResponse.json()

        if (uploadResult.error) {
          throw new Error(uploadResult.error)
        }

        imageUrl = uploadResult.data.url

        // Note: Old images are kept in storage for now
        // They can be cleaned up manually or via a scheduled job
      }

      const eventData = {
        ...formData,
        image: imageUrl,
      }

      let response
      if (editingEvent) {
        // Update event
        response = await fetch(`/api/events/${editingEvent.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventData),
        })
      } else {
        // Create event
        response = await fetch('/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventData),
        })
      }

      const result = await response.json()

      if (result.error) {
        throw new Error(result.error)
      }

      // Create success message with agenda
      const agenda = editingEvent
        ? [
            `✓ Event "${formData.title}" updated successfully`,
            `✓ Date: ${new Date(formData.date).toLocaleDateString()}`,
            `✓ Time: ${formData.time}`,
            `✓ Location: ${formData.location}`,
            formData.tag ? `✓ Tag: ${formData.tag}` : null,
            `✓ Status: ${formData.status}`,
            formData.status === 'completed' && formData.highlights.length > 0
              ? `✓ Highlights: ${formData.highlights.length} item(s) added`
              : null,
          ].filter(Boolean)
        : [
            `✓ Event "${formData.title}" created successfully`,
            `✓ Date: ${new Date(formData.date).toLocaleDateString()}`,
            `✓ Time: ${formData.time}`,
            `✓ Location: ${formData.location}`,
            formData.tag ? `✓ Tag: ${formData.tag}` : null,
            `✓ Status: ${formData.status}`,
            formData.status === 'completed' && formData.highlights.length > 0
              ? `✓ Highlights: ${formData.highlights.length} item(s) added`
              : null,
          ].filter(Boolean)

      setSuccessMessage(agenda.join('\n'))

      // Refresh events list
      await fetchEvents()

      // Close modal after a short delay
      setTimeout(() => {
        handleCloseModal()
      }, 2000)
    } catch (error) {
      console.error('Error saving event:', error)
      setErrorMessage(error instanceof Error ? error.message : 'Failed to save event')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return

    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
      })

      const result = await response.json()

      if (result.error) {
        throw new Error(result.error)
      }

      setSuccessMessage('Event deleted successfully!')
      await fetchEvents()

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
    } catch (error) {
      console.error('Error deleting event:', error)
      setErrorMessage(error instanceof Error ? error.message : 'Failed to delete event')
      setTimeout(() => {
        setErrorMessage('')
      }, 3000)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Events Management</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Manage society events and activities</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary-800 text-white font-semibold rounded-lg shadow-sm transition-colors duration-200"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Event
        </button>
      </div>

      {/* Success Message with Agenda */}
      {successMessage && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <CheckCircleIcon className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-green-800 dark:text-green-300 font-semibold mb-2">Event Update Summary</h3>
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
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading events...</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="p-12 text-center">
            <CalendarDaysIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No events found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first event'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => handleOpenModal()}
                className="inline-flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary-800 text-white font-semibold rounded-lg"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Add Event
              </button>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600"
              >
                {event.image ? (
                  <div className="h-48 bg-gray-200 dark:bg-gray-600 overflow-hidden relative">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                    <PhotoIcon className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{event.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{event.description}</p>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                    <p>Time: {event.time}</p>
                    <p>Location: {event.location}</p>
                    {event.tag && (
                      <p>
                        Tag: <span className="font-semibold">{event.tag}</span>
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {event.tag && (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                          {event.tag}
                        </span>
                      )}
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          event.status === 'upcoming'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {event.status}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleOpenModal(event)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(event.id)} className="text-red-600 hover:text-red-900 dark:text-red-400">
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
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
                {editingEvent ? 'Edit Event' : 'Add New Event'}
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
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                />
              </div>
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time *</label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location *</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Event Image
                </label>
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tag</label>
                <select
                  value={formData.tag}
                  onChange={(e) =>
                    setFormData({ ...formData, tag: e.target.value as typeof formData.tag })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a tag</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Health">Health</option>
                  <option value="Technology">Technology</option>
                  <option value="Community">Community</option>
                  <option value="Art">Art</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>
              {formData.status === 'completed' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Event Highlights
                  </label>
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={highlightInput}
                        onChange={(e) => setHighlightInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            addHighlight()
                          }
                        }}
                        placeholder="Enter a highlight and press Enter or click Add"
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                      />
                      <button
                        type="button"
                        onClick={addHighlight}
                        className="px-4 py-2 bg-primary hover:bg-primary-800 text-white font-semibold rounded-lg"
                      >
                        Add
                      </button>
                    </div>
                    {formData.highlights.length > 0 && (
                      <div className="space-y-2">
                        {formData.highlights.map((highlight, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-lg"
                          >
                            <span className="text-sm text-gray-900 dark:text-gray-100">{highlight}</span>
                            <button
                              type="button"
                              onClick={() => removeHighlight(index)}
                              className="text-red-600 hover:text-red-800 dark:text-red-400"
                            >
                              <XMarkIcon className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-gray-500">Add highlights that will be shown for completed events</p>
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status *</label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value as 'upcoming' | 'completed' })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
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
                  {uploading ? 'Saving...' : editingEvent ? 'Update Event' : 'Add Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default EventsPage

