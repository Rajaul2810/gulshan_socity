'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'

export interface AdoptAGate {
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

export const useAdoptAGate = (status?: 'pending' | 'approved' | 'rejected' | 'active' | 'expired') => {
  const [registrations, setRegistrations] = useState<AdoptAGate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRegistrations = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase
        .from('adopt_a_gate')
        .select('*')
        .order('created_at', { ascending: false })

      if (status) {
        query = query.eq('status', status)
      }

      const { data, error: fetchError } = await query

      if (fetchError) throw fetchError

      setRegistrations(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch adopt a gate registrations')
      console.error('Error fetching adopt a gate registrations:', err)
    } finally {
      setLoading(false)
    }
  }, [status])

  useEffect(() => {
    fetchRegistrations()
  }, [fetchRegistrations])

  return { registrations, loading, error, refetch: fetchRegistrations }
}

