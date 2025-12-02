'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  image?: string
  tag?: 'Cultural' | 'Health' | 'Technology' | 'Community' | 'Art' | 'Sports'
  highlights?: string[]
  status: 'upcoming' | 'completed'
  created_at?: string
  updated_at?: string
}

export const useEvents = (status?: 'upcoming' | 'completed') => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true })

      if (status) {
        query = query.eq('status', status)
      }

      const { data, error: fetchError } = await query

      if (fetchError) throw fetchError

      setEvents(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch events')
      console.error('Error fetching events:', err)
    } finally {
      setLoading(false)
    }
  }, [status])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  return { events, loading, error, refetch: fetchEvents }
}

