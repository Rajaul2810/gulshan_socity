'use client'

import React, { useState, useEffect } from 'react'
import {
  TrashIcon,
  MagnifyingGlassIcon,
  InboxIcon,
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
  XMarkIcon,
  EyeIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'

interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  category: string
  message: string
  preferred_contact?: string
  created_at: string
  status: 'unread' | 'read' | 'replied'
}

const ContactMessagesPage = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/contact')
      const { data, error } = await response.json()

      if (error) throw new Error(error)
      setMessages(data || [])
    } catch (error) {
      console.error('Error fetching contact messages:', error)
      setErrorMessage('Failed to load contact messages')
    } finally {
      setLoading(false)
    }
  }

  const filteredMessages = messages.filter(
    (message) =>
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleViewMessage = async (message: ContactMessage) => {
    setSelectedMessage(message)
    setShowModal(true)
    
    // Mark as read if unread
    if (message.status === 'unread') {
      try {
        const response = await fetch(`/api/contact/${message.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'read' }),
        })

        const result = await response.json()

        if (result.error) {
          throw new Error(result.error)
        }

        // Update local state
        setMessages(
          messages.map((m) => (m.id === message.id ? { ...m, status: 'read' as const } : m))
        )
      } catch (error) {
        console.error('Error updating message status:', error)
      }
    }
  }

  const handleStatusUpdate = async (id: string, newStatus: 'unread' | 'read' | 'replied') => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      const result = await response.json()

      if (result.error) {
        throw new Error(result.error)
      }

      // Update local state
      setMessages(
        messages.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
      )

      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage({ ...selectedMessage, status: newStatus })
      }

      setSuccessMessage(`Message marked as ${newStatus}`)
      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
    } catch (error) {
      console.error('Error updating message status:', error)
      setErrorMessage('Failed to update message status')
      setTimeout(() => {
        setErrorMessage('')
      }, 3000)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedMessage(null)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return

    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
      })

      const result = await response.json()

      if (result.error) {
        throw new Error(result.error)
      }

      setSuccessMessage('Message deleted successfully!')
      await fetchMessages()

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
    } catch (error) {
      console.error('Error deleting message:', error)
      setErrorMessage(error instanceof Error ? error.message : 'Failed to delete message')
      setTimeout(() => {
        setErrorMessage('')
      }, 3000)
    }
  }

  const unreadCount = messages.filter((m) => m.status === 'unread').length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Contact Messages</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Manage inquiries and messages from visitors</p>
        </div>
        {unreadCount > 0 && (
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg">
            <InboxIcon className="w-5 h-5 mr-2" />
            <span className="font-semibold">{unreadCount} unread</span>
          </div>
        )}
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center space-x-3">
          <CheckCircleIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
          <p className="text-green-800 dark:text-green-300 font-medium">{successMessage}</p>
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
          placeholder="Search messages by name, email, subject, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading messages...</p>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="p-12 text-center">
            <InboxIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No messages found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm ? 'Try adjusting your search terms' : 'Contact messages will appear here'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                  message.status === 'unread' ? 'bg-primary-50/50 dark:bg-primary-900/10' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{message.subject}</h3>
                      {message.status === 'unread' && (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400">
                          New
                        </span>
                      )}
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          message.status === 'replied'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : message.status === 'read'
                            ? 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-400'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                        }`}
                      >
                        {message.status}
                      </span>
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                        {message.category}
                      </span>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <div className="flex items-center">
                        <UserIcon className="w-4 h-4 mr-2" />
                        {message.name}
                      </div>
                      <div className="flex items-center">
                        <EnvelopeIcon className="w-4 h-4 mr-2" />
                        {message.email}
                      </div>
                      {message.phone && (
                        <div className="flex items-center">
                          <PhoneIcon className="w-4 h-4 mr-2" />
                          {message.phone}
                        </div>
                      )}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-2 line-clamp-2">{message.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(message.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleViewMessage(message)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400"
                      title="View Message"
                    >
                      <EyeIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(message.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400"
                      title="Delete Message"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      {showModal && selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Message Details</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Subject</label>
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{selectedMessage.subject}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Name</label>
                  <p className="text-gray-900 dark:text-gray-100">{selectedMessage.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</label>
                  <p className="text-gray-900 dark:text-gray-100">{selectedMessage.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Phone</label>
                  <p className="text-gray-900 dark:text-gray-100">{selectedMessage.phone || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Category</label>
                  <p className="text-gray-900 dark:text-gray-100 capitalize">{selectedMessage.category}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Preferred Contact</label>
                  <p className="text-gray-900 dark:text-gray-100 capitalize">{selectedMessage.preferred_contact || 'email'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Date</label>
                  <p className="text-gray-900 dark:text-gray-100">{new Date(selectedMessage.created_at).toLocaleString()}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Message</label>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2">
                  {selectedMessage.status !== 'unread' && (
                    <button
                      onClick={() => handleStatusUpdate(selectedMessage.id, 'unread')}
                      className="px-3 py-2 text-xs bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-800 dark:text-blue-300 font-semibold rounded-lg transition-colors"
                    >
                      Mark as Unread
                    </button>
                  )}
                  {selectedMessage.status !== 'read' && (
                    <button
                      onClick={() => handleStatusUpdate(selectedMessage.id, 'read')}
                      className="px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-300 font-semibold rounded-lg transition-colors"
                    >
                      Mark as Read
                    </button>
                  )}
                  {selectedMessage.status !== 'replied' && (
                    <button
                      onClick={() => handleStatusUpdate(selectedMessage.id, 'replied')}
                      className="px-3 py-2 text-xs bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-800 dark:text-green-300 font-semibold rounded-lg transition-colors"
                    >
                      Mark as Replied
                    </button>
                  )}
                </div>
                <div className="flex space-x-3">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                    className="px-4 py-2 bg-primary hover:bg-primary-800 text-white font-semibold rounded-lg transition-colors"
                  >
                    Reply via Email
                  </a>
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ContactMessagesPage

