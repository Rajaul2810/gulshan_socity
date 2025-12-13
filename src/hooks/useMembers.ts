'use client'

import { useState, useEffect, useCallback } from 'react'

export interface Member {
  id: string
  membership_number: string
  membership_type: 'Life' | 'Affiliate' | 'Associate' | 'Corporate'
  zone?: string
  name: string
  name_bangla?: string
  email?: string
  mobile?: string
  residence_address?: string
  property_schedule?: string
  membership_date: string
  status: 'active' | 'inactive' | 'suspended'
  photo_url?: string
  created_at?: string
  updated_at?: string
}

export const useMembers = (filters?: {
  status?: 'active' | 'inactive' | 'suspended'
  zone?: string
  membership_type?: 'Life' | 'Affiliate' | 'Associate' | 'Corporate'
}) => {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMembers = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Build API URL with query parameters
      const params = new URLSearchParams()
      if (filters?.status) {
        params.append('status', filters.status)
      }
      if (filters?.zone) {
        params.append('zone', filters.zone)
      }
      if (filters?.membership_type) {
        params.append('membership_type', filters.membership_type)
      }

      const apiUrl = params.toString() 
        ? `/api/members/list?${params.toString()}`
        : '/api/members/list'

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to fetch members' }))
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (result.error) {
        throw new Error(result.error)
      }

      setMembers(result.data || [])
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to fetch members. Please check your connection and try again.'
      setError(errorMessage)
      console.error('Error fetching members:', err)
      // Set empty array on error to prevent UI crashes
      setMembers([])
    } finally {
      setLoading(false)
    }
  }, [filters?.status, filters?.zone, filters?.membership_type])

  useEffect(() => {
    fetchMembers()
  }, [fetchMembers])

  return { members, loading, error, refetch: fetchMembers }
}

