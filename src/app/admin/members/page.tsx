'use client'

import React, { useState, useEffect } from 'react'
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  XMarkIcon,
  CheckCircleIcon,
  EyeIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'

interface Member {
  id: string
  membership_number: string
  membership_type: string
  zone: string
  name: string
  email?: string
  mobile?: string
  property_schedule?: string
  membership_date: string
  status: 'active' | 'inactive' | 'suspended'
  photo_url?: string
  created_at?: string
  updated_at?: string
  [key: string]: string | number | 'active' | 'inactive' | 'suspended' | undefined
}

interface MembershipApplication {
  id: string
  membership_type: string
  status: 'pending' | 'under_review' | 'approved' | 'rejected'
  name: string
  name_bangla?: string
  email?: string
  mobile?: string
  membership_number?: string
  zone?: string
  created_at: string
}

const MembersPage = () => {
  const [members, setMembers] = useState<Member[]>([])
  const [applications, setApplications] = useState<MembershipApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingMember, setEditingMember] = useState<Member | null>(null)
  const [formData, setFormData] = useState({
    membership_number: '',
    membership_type: '',
    zone: '',
    name: '',
    email: '',
    mobile: '',
    houseNumber: '',
    roadNumber: '',
    membership_date: new Date().toISOString().split('T')[0],
    status: 'active' as 'active' | 'inactive' | 'suspended',
  })
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    fetchMembers()
    fetchApplications()
  }, [])

  const fetchMembers = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/members/list')
      const { data } = await res.json()
      setMembers(data || [])
    } catch (error) {
      console.error('Error fetching members:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchApplications = async () => {
    try {
      const res = await fetch('/api/membership?status=pending')
      const { data, error } = await res.json()
      if (error) throw new Error(error)
      setApplications(data || [])
    } catch (error) {
      console.error('Error fetching applications:', error)
      setErrorMessage('Failed to load membership applications')
    }
  }

  const filteredMembers = members.filter(
    (member) =>
      member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.mobile?.includes(searchTerm) ||
      member.membership_number?.includes(searchTerm)
  )

  const handleOpenModal = (member?: Member) => {
    if (member) {
      setEditingMember(member)
      const propertyParts = member.property_schedule?.split(',') || []
      setFormData({
        membership_number: member.membership_number || '',
        membership_type: member.membership_type || '',
        zone: member.zone || '',
        name: member.name || '',
        email: member.email || '',
        mobile: member.mobile || '',
        houseNumber: propertyParts[0] || '',
        roadNumber: propertyParts[1] || '',
        membership_date: member.membership_date?.split('T')[0] || new Date().toISOString().split('T')[0],
        status: member.status || 'active',
      })
    } else {
      setEditingMember(null)
      setFormData({
        membership_number: '',
        membership_type: '',
        zone: '',
        name: '',
        email: '',
        mobile: '',
        houseNumber: '',
        roadNumber: '',
        membership_date: new Date().toISOString().split('T')[0],
        status: 'active',
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingMember(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')
    
    try {
      const propertySchedule = formData.houseNumber || formData.roadNumber
        ? `${formData.houseNumber || ''},${formData.roadNumber || ''}`.replace(/^,|,$/g, '')
        : null

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { houseNumber, roadNumber, ...formDataWithoutProperty } = formData
      const memberData = {
        ...formDataWithoutProperty,
        membership_date: formData.membership_date,
        property_schedule: propertySchedule,
      }

      let response
      if (editingMember) {
        response = await fetch(`/api/members/${editingMember.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(memberData),
        })
      } else {
        response = await fetch('/api/members', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(memberData),
        })
      }

      const result = await response.json()

      if (result.error) {
        setErrorMessage(result.error)
        return
      }

      if (response.ok) {
        setSuccessMessage(editingMember ? 'Member updated successfully!' : 'Member created successfully!')
        await fetchMembers()
        setTimeout(() => {
          handleCloseModal()
          setSuccessMessage('')
        }, 1500)
      }
    } catch (error) {
      console.error('Error saving member:', error)
      setErrorMessage(error instanceof Error ? error.message : 'Failed to save member')
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this member? This action cannot be undone.')) {
      setErrorMessage('')
      try {
        const res = await fetch(`/api/members/${id}`, {
          method: 'DELETE',
        })
        const result = await res.json()
        
        if (result.error) {
          setErrorMessage(result.error)
          return
        }

        if (res.ok) {
          setSuccessMessage('Member deleted successfully!')
          await fetchMembers()
          setTimeout(() => setSuccessMessage(''), 2000)
        }
      } catch (error) {
        console.error('Error deleting member:', error)
        setErrorMessage(error instanceof Error ? error.message : 'Failed to delete member')
      }
    }
  }

  const handleViewApplication = (application: MembershipApplication) => {
    // Navigate to the full form page for review and approval
    window.location.href = `/admin/members/add?applicationId=${application.id}&admin=true`
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Members Management
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage society members and their information
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {applications.length > 0 && (
            <div className="inline-flex items-center px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-lg">
              <span className="font-semibold">{applications.length} pending applications</span>
            </div>
          )}
          <button
            onClick={() => window.location.href = '/admin/members/add'}
            className="inline-flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary-800 text-white font-semibold rounded-lg shadow-sm transition-colors duration-200"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Member
          </button>
        </div>
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

      {/* Pending Applications Section */}
      {applications.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Pending Membership Applications</h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {applications.map((application) => (
              <div key={application.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{application.name}</h3>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                        {application.status}
                      </span>
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                        {application.membership_type}
                      </span>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {application.email && (
                        <div className="flex items-center">
                          <EnvelopeIcon className="w-4 h-4 mr-2" />
                          {application.email}
                        </div>
                      )}
                      {application.mobile && (
                        <div className="flex items-center">
                          <PhoneIcon className="w-4 h-4 mr-2" />
                          {application.mobile}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Applied: {new Date(application.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => window.location.href = `/admin/members/add?applicationId=${application.id}&admin=true`}
                      className="px-4 py-2 bg-primary hover:bg-primary-800 text-white font-semibold rounded-lg text-sm"
                    >
                      Review & Approve
                    </button>
                    <button
                      onClick={() => handleViewApplication(application)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400"
                      title="View Details"
                    >
                      <EyeIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search members by name, email, phone, or membership number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading members...</p>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="p-12 text-center">
            <UserIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No members found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm
                ? 'Try adjusting your search terms'
                : 'Get started by adding your first member'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => window.location.href = '/admin/members/add'}
                className="inline-flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary-800 text-white font-semibold rounded-lg"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Add Member
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Member
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Membership Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Zone
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
                {filteredMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mr-3">
                          <UserIcon className="w-5 h-5 text-primary-700 dark:text-primary-300" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {member.name}
                          </div>
                          {member.membership_type && (
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {member.membership_type}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {member.membership_number || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-100 space-y-1">
                        {member.email && (
                          <div className="flex items-center">
                            <EnvelopeIcon className="w-4 h-4 mr-2 text-gray-400" />
                            {member.email}
                          </div>
                        )}
                        {member.mobile && (
                          <div className="flex items-center">
                            <PhoneIcon className="w-4 h-4 mr-2 text-gray-400" />
                            {member.mobile}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-100">
                        {member.zone || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          member.status === 'active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : member.status === 'suspended'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleOpenModal(member)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(member.id)}
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

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {editingMember ? 'Edit Member' : 'Add New Member'}
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
                    Membership Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.membership_number}
                    onChange={(e) =>
                      setFormData({ ...formData, membership_number: e.target.value })
                    }
                    placeholder="Enter membership number"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Zone *
                  </label>
                  <select
                    required
                    value={formData.zone}
                    onChange={(e) =>
                      setFormData({ ...formData, zone: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select Zone</option>
                    <option value="Zone 1">Zone 1</option>
                    <option value="Zone 2">Zone 2</option>
                    <option value="Zone 3">Zone 3</option>
                    <option value="Zone 4">Zone 4</option>
                    <option value="Zone 5">Zone 5</option>
                    <option value="Zone 6">Zone 6</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Membership Type *
                  </label>
                  <select
                    required
                    value={formData.membership_type}
                    onChange={(e) =>
                      setFormData({ ...formData, membership_type: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select Type</option>
                    <option value="Life">Life</option>
                    <option value="Affiliate">Affiliate</option>
                    <option value="Associate">Associate</option>
                    <option value="Corporate">Corporate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
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
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mobile
                  </label>
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    House Number
                  </label>
                  <input
                    type="text"
                    value={formData.houseNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, houseNumber: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Road Number
                  </label>
                  <input
                    type="text"
                    value={formData.roadNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, roadNumber: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Membership Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.membership_date}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        membership_date: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as 'active' | 'inactive' | 'suspended',
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
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
                  {editingMember ? 'Update Member' : 'Add Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default MembersPage
