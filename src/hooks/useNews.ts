'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'

export interface NewsArticle {
  id: string
  title: string
  description: string
  image?: string
  source: string
  date: string
  news_link?: string
  status: 'draft' | 'published'
  created_at?: string
  updated_at?: string
}

export const useNews = (status?: 'draft' | 'published') => {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase
        .from('news')
        .select('*')
        .order('date', { ascending: false })

      if (status) {
        query = query.eq('status', status)
      }

      const { data, error: fetchError } = await query

      if (fetchError) throw fetchError

      setArticles(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch news')
      console.error('Error fetching news:', err)
    } finally {
      setLoading(false)
    }
  }, [status])

  useEffect(() => {
    fetchNews()
  }, [fetchNews])

  return { articles, loading, error, refetch: fetchNews }
}

