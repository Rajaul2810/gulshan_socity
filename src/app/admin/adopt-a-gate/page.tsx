'use client'

import React, { useState, useEffect } from 'react'
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
} from '@heroicons/react/24/outline'

interface AdoptAGate {
  id: string
  adopter_type: 'Personal' | 'Commercial' | 'Family'
  name: string
  address: string
  resident_type?: 'Permanent' | 'Tenant'
  is_member: boolean
  membership_number?: string
  gate_road_number: string
  gulshan_area?: 'Gulshan 1' | 'Gulshan 2'
  adoption_start_date: string
  adoption_end_date: string
  mobile: string
  email?: string
  terms_accepted: boolean
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'expired'
  approved_by?: string
  approved_date?: string
  notes?: string
  payment_amount?: number
  payment_status?: 'pending' | 'paid' | 'overdue'
  payment_date?: string
  payment_receipt_number?: string
  advertisement_approved?: boolean
  advertisement_details?: string
  created_at?: string
  updated_at?: string
}

const AdoptAGatePage = () => {
  const [registrations, setRegistrations] = useState<AdoptAGate[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [editingRegistration, setEditingRegistration] = useState<AdoptAGate | null>(null)
  const [viewingRegistration, setViewingRegistration] = useState<AdoptAGate | null>(null)
  const [formData, setFormData] = useState({
    adopterType: '',
    name: '',
    address: '',
    residentType: '',
    isMember: false,
    membershipNumber: '',
    gateRoadNumber: '',
    gulshanArea: '',
    adoptionStartDate: '',
    adoptionEndDate: '',
    mobile: '',
    email: '',
    status: 'pending' as 'pending' | 'approved' | 'rejected' | 'active' | 'expired',
    approvedBy: '',
    notes: '',
    paymentAmount: '',
    paymentStatus: 'pending' as 'pending' | 'paid' | 'overdue',
    paymentDate: '',
    paymentReceiptNumber: '',
    advertisementApproved: false,
    advertisementDetails: '',
  })
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    fetchRegistrations()
  }, [])

  const fetchRegistrations = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/adopt-a-gate')
      const { data, error } = await response.json()

      if (error) throw new Error(error)
      setRegistrations(data || [])
    } catch (error) {
      console.error('Error fetching adopt a gate registrations:', error)
      setErrorMessage('Failed to load registrations')
    } finally {
      setLoading(false)
    }
  }

  const filteredRegistrations = registrations.filter(
    (reg) =>
      reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.gate_road_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.mobile.includes(searchTerm) ||
      reg.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOpenModal = (registration?: AdoptAGate) => {
    if (registration) {
      setEditingRegistration(registration)
      setFormData({
        adopterType: registration.adopter_type,
        name: registration.name,
        address: registration.address,
        residentType: registration.resident_type || '',
        isMember: registration.is_member,
        membershipNumber: registration.membership_number || '',
        gateRoadNumber: registration.gate_road_number,
        gulshanArea: registration.gulshan_area || '',
        adoptionStartDate: registration.adoption_start_date,
        adoptionEndDate: registration.adoption_end_date,
        mobile: registration.mobile,
        email: registration.email || '',
        status: registration.status,
        approvedBy: registration.approved_by || '',
        notes: registration.notes || '',
        paymentAmount: registration.payment_amount?.toString() || '',
        paymentStatus: registration.payment_status || 'pending',
        paymentDate: registration.payment_date || '',
        paymentReceiptNumber: registration.payment_receipt_number || '',
        advertisementApproved: registration.advertisement_approved || false,
        advertisementDetails: registration.advertisement_details || '',
      })
    } else {
      setEditingRegistration(null)
      setFormData({
        adopterType: '',
        name: '',
        address: '',
        residentType: '',
        isMember: false,
        membershipNumber: '',
        gateRoadNumber: '',
        gulshanArea: '',
        adoptionStartDate: '',
        adoptionEndDate: '',
        mobile: '',
        email: '',
        status: 'pending',
        approvedBy: '',
        notes: '',
        paymentAmount: '',
        paymentStatus: 'pending',
        paymentDate: '',
        paymentReceiptNumber: '',
        advertisementApproved: false,
        advertisementDetails: '',
      })
    }
    setShowModal(true)
    setErrorMessage('')
    setSuccessMessage('')
  }

  const handleViewRegistration = (registration: AdoptAGate) => {
    setViewingRegistration(registration)
    setShowViewModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setShowViewModal(false)
    setEditingRegistration(null)
    setViewingRegistration(null)
    setErrorMessage('')
    setSuccessMessage('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const registrationData = {
        adopter_type: formData.adopterType,
        name: formData.name,
        address: formData.address,
        resident_type: formData.residentType || null,
        is_member: formData.isMember,
        membership_number: formData.isMember ? formData.membershipNumber : null,
        gate_road_number: formData.gateRoadNumber,
        gulshan_area: formData.gulshanArea || null,
        adoption_start_date: formData.adoptionStartDate,
        adoption_end_date: formData.adoptionEndDate,
        mobile: formData.mobile,
        email: formData.email || null,
        terms_accepted: true,
        status: formData.status,
        approved_by: formData.approvedBy || null,
        notes: formData.notes || null,
        payment_amount: formData.paymentAmount ? parseFloat(formData.paymentAmount) : 300000.00,
        payment_status: formData.paymentStatus,
        payment_date: formData.paymentDate || null,
        payment_receipt_number: formData.paymentReceiptNumber || null,
        advertisement_approved: formData.advertisementApproved,
        advertisement_details: formData.advertisementDetails || null,
      }

      // If status is approved, set approved_date
      if (formData.status === 'approved' && !editingRegistration) {
        (registrationData as unknown as { approved_date: string }).approved_date = new Date().toISOString()
      }

      let response
      if (editingRegistration) {
        response = await fetch(`/api/adopt-a-gate/${editingRegistration.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(registrationData),
        })
      } else {
        response = await fetch('/api/adopt-a-gate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(registrationData),
        })
      }

      const result = await response.json()

      if (result.error) {
        setErrorMessage(result.error)
        return
      }

      if (response.ok) {
        setSuccessMessage(editingRegistration ? 'Registration updated successfully!' : 'Registration created successfully!')
        await fetchRegistrations()
        setTimeout(() => {
          handleCloseModal()
          setSuccessMessage('')
        }, 1500)
      }
    } catch (error) {
      console.error('Error saving registration:', error)
      setErrorMessage(error instanceof Error ? error.message : 'Failed to save registration')
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this registration? This action cannot be undone.')) {
      setErrorMessage('')
      try {
        const response = await fetch(`/api/adopt-a-gate/${id}`, {
          method: 'DELETE',
        })
        const result = await response.json()

        if (result.error) {
          setErrorMessage(result.error)
          return
        }

        if (response.ok) {
          setSuccessMessage('Registration deleted successfully!')
          await fetchRegistrations()
          setTimeout(() => setSuccessMessage(''), 2000)
        }
      } catch (error) {
        console.error('Error deleting registration:', error)
        setErrorMessage(error instanceof Error ? error.message : 'Failed to delete registration')
      }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'approved':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'expired':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
    }
  }

  const getPaymentStatusColor = (status?: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Adopt a Gate Management
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage gate adoption registrations and approvals
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary-800 text-white font-semibold rounded-lg shadow-sm transition-colors duration-200"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Registration
        </button>
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
          placeholder="Search by name, gate road number, mobile, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading registrations...</p>
          </div>
        ) : filteredRegistrations.length === 0 ? (
          <div className="p-12 text-center">
            <MapPinIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No registrations found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm
                ? 'Try adjusting your search terms'
                : 'Get started by adding your first registration'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => handleOpenModal()}
                className="inline-flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary-800 text-white font-semibold rounded-lg"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Add Registration
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Adopter
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Gate Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Period
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredRegistrations.map((reg) => (
                  <tr
                    key={reg.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {reg.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {reg.adopter_type}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-100">
                        Gate Road {reg.gate_road_number}
                      </div>
                      {reg.gulshan_area && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {reg.gulshan_area}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-100">
                        {new Date(reg.adoption_start_date).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        to {new Date(reg.adoption_end_date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-100">
                        {reg.mobile}
                      </div>
                      {reg.email && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {reg.email}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(reg.status)}`}
                      >
                        {reg.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-100">
                        {reg.payment_amount ? `Tk. ${reg.payment_amount.toLocaleString()}` : 'N/A'}
                      </div>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${getPaymentStatusColor(reg.payment_status)}`}
                      >
                        {reg.payment_status || 'pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleViewRegistration(reg)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400"
                          title="View Details"
                        >
                          <EyeIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleOpenModal(reg)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(reg.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
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

      {/* View Modal */}
      {showViewModal && viewingRegistration && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Registration Details
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Adopter Type
                  </label>
                  <p className="text-sm text-gray-900 dark:text-gray-100">{viewingRegistration.adopter_type}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Name
                  </label>
                  <p className="text-sm text-gray-900 dark:text-gray-100">{viewingRegistration.name}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Address
                  </label>
                  <p className="text-sm text-gray-900 dark:text-gray-100">{viewingRegistration.address}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Resident Type
                  </label>
                  <p className="text-sm text-gray-900 dark:text-gray-100">{viewingRegistration.resident_type || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Member of Gulshan Society
                  </label>
                  <p className="text-sm text-gray-900 dark:text-gray-100">{viewingRegistration.is_member ? 'Yes' : 'No'}</p>
                </div>
                {viewingRegistration.is_member && (
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Membership Number
                    </label>
                    <p className="text-sm text-gray-900 dark:text-gray-100">{viewingRegistration.membership_number || 'N/A'}</p>
                  </div>
                )}
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Gate Road Number
                  </label>
                  <p className="text-sm text-gray-900 dark:text-gray-100">{viewingRegistration.gate_road_number}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Gulshan Area
                  </label>
                  <p className="text-sm text-gray-900 dark:text-gray-100">{viewingRegistration.gulshan_area || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Start Date
                  </label>
                  <p className="text-sm text-gray-900 dark:text-gray-100">
                    {new Date(viewingRegistration.adoption_start_date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    End Date
                  </label>
                  <p className="text-sm text-gray-900 dark:text-gray-100">
                    {new Date(viewingRegistration.adoption_end_date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Mobile
                  </label>
                  <p className="text-sm text-gray-900 dark:text-gray-100">{viewingRegistration.mobile}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Email
                  </label>
                  <p className="text-sm text-gray-900 dark:text-gray-100">{viewingRegistration.email || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Status
                  </label>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(viewingRegistration.status)}`}
                  >
                    {viewingRegistration.status}
                  </span>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Payment Status
                  </label>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(viewingRegistration.payment_status)}`}
                  >
                    {viewingRegistration.payment_status || 'pending'}
                  </span>
                </div>
                {viewingRegistration.payment_amount && (
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Payment Amount
                    </label>
                    <p className="text-sm text-gray-900 dark:text-gray-100">
                      Tk. {viewingRegistration.payment_amount.toLocaleString()}
                    </p>
                  </div>
                )}
                {viewingRegistration.advertisement_approved && (
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Advertisement Approved
                    </label>
                    <p className="text-sm text-gray-900 dark:text-gray-100">Yes</p>
                  </div>
                )}
                {viewingRegistration.advertisement_details && (
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Advertisement Details
                    </label>
                    <p className="text-sm text-gray-900 dark:text-gray-100">{viewingRegistration.advertisement_details}</p>
                  </div>
                )}
                {viewingRegistration.approved_by && (
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Approved By
                    </label>
                    <p className="text-sm text-gray-900 dark:text-gray-100">{viewingRegistration.approved_by}</p>
                  </div>
                )}
                {viewingRegistration.notes && (
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Notes
                    </label>
                    <p className="text-sm text-gray-900 dark:text-gray-100">{viewingRegistration.notes}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-primary hover:bg-primary-800 text-white font-semibold rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {editingRegistration ? 'Edit Registration' : 'Add New Registration'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Adopter Type *
                  </label>
                  <select
                    value={formData.adopterType}
                    onChange={(e) => setFormData({ ...formData, adopterType: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select Type</option>
                    <option value="Personal">Personal</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Family">Family</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Address *
                  </label>
                  <textarea
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Resident Type
                  </label>
                  <select
                    value={formData.residentType}
                    onChange={(e) => setFormData({ ...formData, residentType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select Type</option>
                    <option value="Permanent">Permanent</option>
                    <option value="Tenant">Tenant</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Is Member
                  </label>
                  <select
                    value={formData.isMember ? 'yes' : 'no'}
                    onChange={(e) => setFormData({ ...formData, isMember: e.target.value === 'yes', membershipNumber: e.target.value === 'no' ? '' : formData.membershipNumber })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
                {formData.isMember && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Membership Number
                    </label>
                    <input
                      type="text"
                      value={formData.membershipNumber}
                      onChange={(e) => setFormData({ ...formData, membershipNumber: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Gate Road Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.gateRoadNumber}
                    onChange={(e) => setFormData({ ...formData, gateRoadNumber: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Gulshan Area
                  </label>
                  <select
                    value={formData.gulshanArea}
                    onChange={(e) => setFormData({ ...formData, gulshanArea: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select Area</option>
                    <option value="Gulshan 1">Gulshan 1</option>
                    <option value="Gulshan 2">Gulshan 2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.adoptionStartDate}
                    onChange={(e) => setFormData({ ...formData, adoptionStartDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    End Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.adoptionEndDate}
                    onChange={(e) => setFormData({ ...formData, adoptionEndDate: e.target.value })}
                    min={formData.adoptionStartDate}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'pending' | 'approved' | 'rejected' | 'active' | 'expired' })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="active">Active</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Payment Status
                  </label>
                  <select
                    value={formData.paymentStatus}
                    onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value as 'pending' | 'paid' | 'overdue' })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Payment Amount
                  </label>
                  <input
                    type="number"
                    value={formData.paymentAmount}
                    onChange={(e) => setFormData({ ...formData, paymentAmount: e.target.value })}
                    placeholder="Tk. 3,00,000 (default)"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Default: Tk. 3,00,000/- for two-year duration
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Payment Date
                  </label>
                  <input
                    type="date"
                    value={formData.paymentDate}
                    onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Payment Receipt Number
                  </label>
                  <input
                    type="text"
                    value={formData.paymentReceiptNumber}
                    onChange={(e) => setFormData({ ...formData, paymentReceiptNumber: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Advertisement Approved
                  </label>
                  <select
                    value={formData.advertisementApproved ? 'yes' : 'no'}
                    onChange={(e) => setFormData({ ...formData, advertisementApproved: e.target.value === 'yes' })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Approved By
                  </label>
                  <input
                    type="text"
                    value={formData.approvedBy}
                    onChange={(e) => setFormData({ ...formData, approvedBy: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Advertisement Details
                  </label>
                  <textarea
                    value={formData.advertisementDetails}
                    onChange={(e) => setFormData({ ...formData, advertisementDetails: e.target.value })}
                    rows={3}
                    placeholder="Details about M.S. plate advertisement"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary hover:bg-primary-800 text-white font-semibold rounded-lg transition-colors"
                >
                  {editingRegistration ? 'Update Registration' : 'Add Registration'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdoptAGatePage

