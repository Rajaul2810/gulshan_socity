'use client'

import { useState, useEffect, useCallback } from 'react'

export type NoticeCategory =
  | 'Security Notice'
  | 'Maintenance Notice'
  | 'Event Notice'
  | 'Meeting Notice'
  | 'Emergency Notice'
  | 'General Announcement'

export type NoticePriority = 'normal' | 'important'

export interface Notice {
  id: string
  title: string
  description: string
  short_description: string | null
  category: NoticeCategory
  priority: NoticePriority
  publish_date: string
  expiry_date: string | null
  attachment_url: string | null
  attachment_name: string | null
  status: string
  is_pinned: boolean
  sort_order?: number
  created_at?: string
  updated_at?: string
}

interface UseNoticesOptions {
  category?: NoticeCategory | ''
  priority?: NoticePriority | ''
  limit?: number
  status?: 'active' | 'inactive'
}

export function useNotices(options: UseNoticesOptions = {}) {
  const { category = '', priority = '', limit, status = 'active' } = options
  const [notices, setNotices] = useState<Notice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchNotices = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const params = new URLSearchParams()
      if (status) params.set('status', status)
      if (category) params.set('category', category)
      if (priority) params.set('priority', priority)
      if (limit) params.set('limit', String(limit))
      const url = `/api/notices?${params.toString()}`
      const res = await fetch(url)
      const json = await res.json()
      if (json.error) throw new Error(json.error)
      setNotices(json.data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load notices')
      setNotices([])
    } finally {
      setLoading(false)
    }
  }, [status, category, priority, limit])

  useEffect(() => {
    fetchNotices()
  }, [fetchNotices])

  return { notices, loading, error, refetch: fetchNotices }
}

export function useNotice(id: string | null) {
  const [notice, setNotice] = useState<Notice | null>(null)
  const [loading, setLoading] = useState(!!id)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setNotice(null)
      setLoading(false)
      return
    }
    let cancelled = false
    setLoading(true)
    setError(null)
    fetch(`/api/notices/${id}`)
      .then((res) => res.json())
      .then((json) => {
        if (cancelled) return
        if (json.error) throw new Error(json.error)
        setNotice(json.data)
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load notice')
          setNotice(null)
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [id])

  return { notice, loading, error }
}
