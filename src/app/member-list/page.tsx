'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import { useMembers } from '@/hooks/useMembers'
import { Member } from '@/hooks/useMembers'
import { 
  UserGroupIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  StarIcon
} from '@heroicons/react/24/outline'

const MemberList = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'suspended'>('all')
  const [filterZone, setFilterZone] = useState<string>('all')
  const [sortBy, setSortBy] = useState('name')

  // Build filters for the hook
  const filters = useMemo(() => {
    const hookFilters: {
      status?: 'active' | 'inactive' | 'suspended'
      zone?: string
    } = {}
    
    if (filterStatus !== 'all') {
      hookFilters.status = filterStatus
    }
    
    if (filterZone !== 'all') {
      hookFilters.zone = filterZone
    }
    
    return hookFilters
  }, [filterStatus, filterZone])

  const { members, loading, error } = useMembers(filters)

  // Client-side filtering for search and sorting
  const filteredMembers = useMemo(() => {
    const filtered = members.filter(member => {
      const matchesSearch = searchTerm === '' || 
        member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.mobile?.includes(searchTerm) ||
        member.membership_number?.toLowerCase().includes(searchTerm.toLowerCase())
      
      return matchesSearch
    })

    // Sort members
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.name || '').localeCompare(b.name || '')
        case 'joinDate':
          return new Date(b.membership_date || '').getTime() - new Date(a.membership_date || '').getTime()
        case 'membershipType':
          return (a.membership_type || '').localeCompare(b.membership_type || '')
        default:
          return 0
      }
    })

    return filtered
  }, [members, searchTerm, sortBy])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircleIcon className="w-3 h-3 mr-1" />
          Active
        </span>
      case 'pending':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          Pending
        </span>
      case 'inactive':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          Inactive
        </span>
      default:
        return null
    }
  }

  const getMembershipTypeBadge = (type: string) => {
    switch (type) {
      case 'Life':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
          <StarIcon className="w-3 h-3 mr-1" />
          Life Member
        </span>
      case 'Affiliate':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          Affiliate
        </span>
      case 'Associate':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Associate
        </span>
      case 'Corporate':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          Corporate
        </span>
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {type || 'Member'}
        </span>
    }
  }

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

  // Get unique zones from members
  const availableZones = useMemo(() => {
    const zones = new Set<string>()
    members.forEach(member => {
      if (member.zone) {
        zones.add(member.zone)
      }
    })
    return Array.from(zones).sort()
  }, [members])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <UserGroupIcon className="w-4 h-4" />
              <span>Member Directory</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-primary">Community</span> Members
            </h1>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Connect with fellow community members and discover the diverse network 
              that makes our society strong and vibrant.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4 flex-wrap">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive' | 'suspended')}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>

              <select
                value={filterZone}
                onChange={(e) => setFilterZone(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
              >
                <option value="all">All Zones</option>
                {availableZones.map(zone => (
                  <option key={zone} value={zone}>{zone}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
              >
                <option value="name">Sort by Name</option>
                <option value="joinDate">Sort by Join Date</option>
                <option value="membershipType">Sort by Membership Type</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Members Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center mb-12">
              <p className="text-red-800 dark:text-red-300 font-medium mb-2">Unable to load members</p>
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Members List */}
          {!loading && !error && (
            <>
              <div className="mb-6">
                <p className="text-gray-600">
                  Showing {filteredMembers.length} of {members.length} members
                </p>
              </div>

              {filteredMembers.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMembers.map((member: Member) => (
                    <div key={member.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-200">
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="relative">
                          {member.photo_url ? (
                            <Image 
                              src={member.photo_url}
                              alt={member.name}
                              width={60}
                              height={60}
                              className="w-15 h-15 object-cover rounded-full border-2 border-primary-100"
                            />
                          ) : (
                            <div className="w-15 h-15 bg-gray-200 rounded-full border-2 border-primary-100 flex items-center justify-center">
                              <UserCircleIcon className="w-8 h-8 text-gray-400" />
                            </div>
                          )}
                          {member.status === 'active' && (
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">
                            {member.name}
                          </h3>
                          {member.membership_number && (
                            <p className="text-xs text-gray-500 mb-2">ID: {member.membership_number}</p>
                          )}
                          <div className="flex flex-wrap gap-2 mb-2">
                            {getStatusBadge(member.status)}
                            {getMembershipTypeBadge(member.membership_type)}
                            {member.zone && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {member.zone}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {member.email && (
                          <div className="flex items-center space-x-3">
                            <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{member.email}</span>
                          </div>
                        )}
                        
                        {member.mobile && (
                          <div className="flex items-center space-x-3">
                            <PhoneIcon className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{member.mobile}</span>
                          </div>
                        )}
                        
                        {member.residence_address && (
                          <div className="flex items-center space-x-3">
                            <MapPinIcon className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{member.residence_address}</span>
                          </div>
                        )}
                        
                        {member.membership_date && (
                          <div className="flex items-center space-x-3">
                            <CalendarDaysIcon className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              Joined {formatDate(member.membership_date)}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <button className="w-full bg-primary hover:bg-primary-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                          View Profile
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <UserCircleIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No members found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Stats Section */}
      {!loading && !error && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Community <span className="text-primary">Statistics</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our growing community in numbers and achievements.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{members.length}</div>
                <div className="text-gray-600">Total Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {members.length > 0 
                    ? Math.round((members.filter(m => m.status === 'active').length / members.length) * 100)
                    : 0}%
                </div>
                <div className="text-gray-600">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {new Set(members.map(m => m.zone).filter(Boolean)).size}
                </div>
                <div className="text-gray-600">Zones</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {members.filter(m => m.membership_type === 'Life').length}
                </div>
                <div className="text-gray-600">Life Members</div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default MemberList
