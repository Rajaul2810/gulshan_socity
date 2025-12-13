'use client'

import { useState, useEffect, useCallback } from 'react'

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

      // Build API URL with status query parameter if provided
      const apiUrl = status 
        ? `/api/news?status=${encodeURIComponent(status)}`
        : '/api/news'

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to fetch news' }))
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (result.error) {
        throw new Error(result.error)
      }

      setArticles(result.data || [])
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to fetch news. Please check your connection and try again.'
      setError(errorMessage)
      console.error('Error fetching news:', err)
      // Set empty array on error to prevent UI crashes
      setArticles([])
    } finally {
      setLoading(false)
    }
  }, [status])

  useEffect(() => {
    fetchNews()
  }, [fetchNews])

  return { articles, loading, error, refetch: fetchNews }
}

