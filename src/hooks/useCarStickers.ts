'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'

export interface CarSticker {
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

export const useCarStickers = (status?: 'active' | 'expired' | 'pending') => {
  const [stickers, setStickers] = useState<CarSticker[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCarStickers = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase
        .from('car_stickers')
        .select('*')
        .order('created_at', { ascending: false })

      if (status) {
        query = query.eq('status', status)
      }

      const { data, error: fetchError } = await query

      if (fetchError) throw fetchError

      setStickers(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch car stickers')
      console.error('Error fetching car stickers:', err)
    } finally {
      setLoading(false)
    }
  }, [status])

  useEffect(() => {
    fetchCarStickers()
  }, [fetchCarStickers])

  return { stickers, loading, error, refetch: fetchCarStickers }
}

