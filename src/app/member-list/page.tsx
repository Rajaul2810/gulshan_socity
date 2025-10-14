'use client'

import React, { useState } from 'react'
import Image from 'next/image'
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
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('name')

  const members = [
    {
      id: 1,
      name: 'Dr. Ahmed Hassan',
      email: 'ahmed.hassan@email.com',
      phone: '+880 1711 234567',
      address: 'House 15, Road 7, Gulshan',
      joinDate: '2020-03-15',
      status: 'active',
      membershipType: 'Life Member',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      achievements: ['Community Service Award 2023', 'Event Organizer of the Year']
    },
    {
      id: 2,
      name: 'Fatima Rahman',
      email: 'fatima.rahman@email.com',
      phone: '+880 1712 345678',
      address: 'House 22, Road 5, Gulshan',
      joinDate: '2019-07-20',
      status: 'active',
      membershipType: 'Regular Member',
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      achievements: ['Volunteer of the Year 2022']
    },
    {
      id: 3,
      name: 'Mohammad Ali',
      email: 'mohammad.ali@email.com',
      phone: '+880 1713 456789',
      address: 'House 8, Road 12, Gulshan',
      joinDate: '2021-01-10',
      status: 'active',
      membershipType: 'Regular Member',
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      achievements: []
    },
    {
      id: 4,
      name: 'Ayesha Khan',
      email: 'ayesha.khan@email.com',
      phone: '+880 1714 567890',
      address: 'House 30, Road 3, Gulshan',
      joinDate: '2018-11-05',
      status: 'active',
      membershipType: 'Life Member',
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      achievements: ['Cultural Event Coordinator', 'Community Health Advocate']
    },
    {
      id: 5,
      name: 'Karim Ahmed',
      email: 'karim.ahmed@email.com',
      phone: '+880 1715 678901',
      address: 'House 45, Road 8, Gulshan',
      joinDate: '2022-06-15',
      status: 'pending',
      membershipType: 'Regular Member',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      achievements: []
    },
    {
      id: 6,
      name: 'Nusrat Begum',
      email: 'nusrat.begum@email.com',
      phone: '+880 1716 789012',
      address: 'House 12, Road 15, Gulshan',
      joinDate: '2020-09-30',
      status: 'active',
      membershipType: 'Regular Member',
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      achievements: ['Education Committee Member']
    }
  ]

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.phone.includes(searchTerm)
    
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

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
      case 'Life Member':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
          <StarIcon className="w-3 h-3 mr-1" />
          Life Member
        </span>
      case 'Regular Member':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          Regular Member
        </span>
      default:
        return null
    }
  }

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

            {/* Status Filter */}
            <div className="flex gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
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
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredMembers.length} of {members.length} members
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-200">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="relative">
                    <Image 
                      src={member.profileImage}
                      alt={member.name}
                      width={60}
                      height={60}
                      className="w-15 h-15 object-cover rounded-full border-2 border-primary-100"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {getStatusBadge(member.status)}
                      {getMembershipTypeBadge(member.membershipType)}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{member.email}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <PhoneIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{member.phone}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MapPinIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{member.address}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <CalendarDaysIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Joined {new Date(member.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {member.achievements.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Achievements</h4>
                    <div className="space-y-1">
                      {member.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <StarIcon className="w-3 h-3 text-yellow-500 flex-shrink-0" />
                          <span className="text-xs text-gray-600">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="w-full bg-primary hover:bg-primary-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <UserCircleIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No members found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
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
              <div className="text-3xl font-bold text-primary mb-2">800+</div>
              <div className="text-gray-600">Total Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-gray-600">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <div className="text-gray-600">Years of Service</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-gray-600">Life Members</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MemberList
