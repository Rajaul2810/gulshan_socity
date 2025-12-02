'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'

export interface GalleryItem {
  id: string
  title: string
  type: 'image' | 'video'
  image?: string
  video_link?: string
  date: string
  tag?: 'Cultural' | 'Health' | 'Technology' | 'Community' | 'Art' | 'Sports'
  created_at?: string
  updated_at?: string
}

export const useGallery = (type?: 'image' | 'video') => {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchGallery = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase
        .from('gallery')
        .select('*')
        .order('date', { ascending: false })

      if (type) {
        query = query.eq('type', type)
      }

      const { data, error: fetchError } = await query

      if (fetchError) throw fetchError

      setItems(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch gallery items')
      console.error('Error fetching gallery:', err)
    } finally {
      setLoading(false)
    }
  }, [type])

  useEffect(() => {
    fetchGallery()
  }, [fetchGallery])

  return { items, loading, error, refetch: fetchGallery }
}

