'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'

export interface AdoptARoad {
  id: string
  adopter_type: 'Person' | 'Corporate' | 'Family'
  name: string
  address: string
  resident_type?: 'Permanent' | 'Tenant'
  is_member: boolean
  membership_number?: string
  road_number: string
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
  created_at?: string
  updated_at?: string
}

export const useAdoptARoad = (status?: 'pending' | 'approved' | 'rejected' | 'active' | 'expired') => {
  const [registrations, setRegistrations] = useState<AdoptARoad[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRegistrations = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase
        .from('adopt_a_road')
        .select('*')
        .order('created_at', { ascending: false })

      if (status) {
        query = query.eq('status', status)
      }

      const { data, error: fetchError } = await query

      if (fetchError) throw fetchError

      setRegistrations(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch adopt a road registrations')
      console.error('Error fetching adopt a road registrations:', err)
    } finally {
      setLoading(false)
    }
  }, [status])

  useEffect(() => {
    fetchRegistrations()
  }, [fetchRegistrations])

  return { registrations, loading, error, refetch: fetchRegistrations }
}

