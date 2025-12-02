'use client'

import React, { useState, useEffect } from 'react'
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  TicketIcon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'

interface CarSticker {
  id: string
  car_number: string
  owner_name: string
  phone: string
  house_number: string
  road_number: string
  issue_date: string
  expiry_date?: string
  status: 'active' | 'expired' | 'pending'
  created_at?: string
  updated_at?: string
}

const CarStickersPage = () => {
  const [stickers, setStickers] = useState<CarSticker[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingSticker, setEditingSticker] = useState<CarSticker | null>(null)
  const [formData, setFormData] = useState({
    carNumber: '',
    ownerName: '',
    phone: '',
    houseNumber: '',
    roadNumber: '',
    issueDate: new Date().toISOString().split('T')[0],
    expiryDate: '',
    status: 'pending' as 'active' | 'expired' | 'pending',
  })
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    fetchCarStickers()
  }, [])

  const fetchCarStickers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/car-stickers')
      const { data, error } = await response.json()

      if (error) throw new Error(error)
      setStickers(data || [])
    } catch (error) {
      console.error('Error fetching car stickers:', error)
      setErrorMessage('Failed to load car stickers')
    } finally {
      setLoading(false)
    }
  }

  const filteredStickers = stickers.filter(
    (sticker) =>
      sticker.car_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sticker.owner_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sticker.phone.includes(searchTerm)
  )

  const handleOpenModal = (sticker?: CarSticker) => {
    if (sticker) {
      setEditingSticker(sticker)
      setFormData({
        carNumber: sticker.car_number,
        ownerName: sticker.owner_name,
        phone: sticker.phone,
        houseNumber: sticker.house_number,
        roadNumber: sticker.road_number,
        issueDate: sticker.issue_date,
        expiryDate: sticker.expiry_date || '',
        status: sticker.status,
      })
    } else {
      setEditingSticker(null)
      setFormData({
        carNumber: '',
        ownerName: '',
        phone: '',
        houseNumber: '',
        roadNumber: '',
        issueDate: new Date().toISOString().split('T')[0],
        expiryDate: '',
        status: 'pending',
      })
    }
    setShowModal(true)
    setErrorMessage('')
    setSuccessMessage('')
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingSticker(null)
    setErrorMessage('')
    setSuccessMessage('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const stickerData = {
        car_number: formData.carNumber,
        owner_name: formData.ownerName,
        phone: formData.phone,
        house_number: formData.houseNumber,
        road_number: formData.roadNumber,
        issue_date: formData.issueDate,
        expiry_date: formData.expiryDate || null,
        status: formData.status,
      }

      let response
      if (editingSticker) {
        response = await fetch(`/api/car-stickers/${editingSticker.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(stickerData),
        })
      } else {
        response = await fetch('/api/car-stickers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(stickerData),
        })
      }

      const result = await response.json()

      if (result.error) {
        setErrorMessage(result.error)
        return
      }

      if (response.ok) {
        setSuccessMessage(editingSticker ? 'Car sticker updated successfully!' : 'Car sticker created successfully!')
        await fetchCarStickers()
        setTimeout(() => {
          handleCloseModal()
          setSuccessMessage('')
        }, 1500)
      }
    } catch (error) {
      console.error('Error saving car sticker:', error)
      setErrorMessage(error instanceof Error ? error.message : 'Failed to save car sticker')
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this car sticker record? This action cannot be undone.')) {
      setErrorMessage('')
      try {
        const response = await fetch(`/api/car-stickers/${id}`, {
          method: 'DELETE',
        })
        const result = await response.json()

        if (result.error) {
          setErrorMessage(result.error)
          return
        }

        if (response.ok) {
          setSuccessMessage('Car sticker deleted successfully!')
          await fetchCarStickers()
          setTimeout(() => setSuccessMessage(''), 2000)
        }
      } catch (error) {
        console.error('Error deleting car sticker:', error)
        setErrorMessage(error instanceof Error ? error.message : 'Failed to delete car sticker')
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Car Stickers Management</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Manage car sticker registrations</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary-800 text-white font-semibold rounded-lg shadow-sm transition-colors duration-200"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Car Sticker
        </button>
      </div>

      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by car number, owner name, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
        />
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

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading car stickers...</p>
          </div>
        ) : filteredStickers.length === 0 ? (
          <div className="p-12 text-center">
            <TicketIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No car stickers found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first car sticker'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => handleOpenModal()}
                className="inline-flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary-800 text-white font-semibold rounded-lg"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Add Car Sticker
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Car Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Issue Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Expiry Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredStickers.map((sticker) => (
                  <tr key={sticker.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{sticker.car_number}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-100">{sticker.owner_name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{sticker.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-100">
                        House {sticker.house_number}, Road {sticker.road_number}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {new Date(sticker.issue_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {sticker.expiry_date ? new Date(sticker.expiry_date).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          sticker.status === 'active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : sticker.status === 'expired'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}
                      >
                        {sticker.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleOpenModal(sticker)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(sticker.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {editingSticker ? 'Edit Car Sticker' : 'Add New Car Sticker'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Car Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.carNumber}
                    onChange={(e) => setFormData({ ...formData, carNumber: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Owner Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">House Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.houseNumber}
                    onChange={(e) => setFormData({ ...formData, houseNumber: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Road Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.roadNumber}
                    onChange={(e) => setFormData({ ...formData, roadNumber: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status *</label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as 'active' | 'expired' | 'pending' })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                  >
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Issue Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.issueDate}
                    onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Expiry Date</label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                  />
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
                <button type="submit" className="px-4 py-2 bg-primary hover:bg-primary-800 text-white font-semibold rounded-lg">
                  {editingSticker ? 'Update Sticker' : 'Add Sticker'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default CarStickersPage

