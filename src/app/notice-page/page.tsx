'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  MegaphoneIcon,
  MagnifyingGlassIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  ArrowRightIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline'
import { useNotices, Notice, NoticeCategory, NoticePriority } from '@/hooks/useNotices'

const CATEGORIES: { value: '' | NoticeCategory; label: string }[] = [
  { value: '', label: 'All' },
  { value: 'Security Notice', label: 'Security' },
  { value: 'Maintenance Notice', label: 'Maintenance' },
  { value: 'Event Notice', label: 'Events' },
  { value: 'Meeting Notice', label: 'Meeting' },
  { value: 'Emergency Notice', label: 'Emergency' },
  { value: 'General Announcement', label: 'General' },
]

const PRIORITIES = [
  { value: '', label: 'All' },
  { value: 'important', label: 'Important' },
  { value: 'normal', label: 'General' },
]

function getCategoryBadgeClass(category: NoticeCategory): string {
  const map: Record<NoticeCategory, string> = {
    'Security Notice': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    'Maintenance Notice': 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
    'Event Notice': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200',
    'Meeting Notice': 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200',
    'Emergency Notice': 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200',
    'General Announcement': 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200',
  }
  return map[category] || 'bg-gray-100 text-gray-800'
}

function formatDate(dateString: string) {
  try {
    const d = new Date(dateString)
    if (isNaN(d.getTime())) return '—'
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return '—'
  }
}

function NoticeCard({ notice }: { notice: Notice }) {
  const summary = notice.short_description || notice.description.slice(0, 120) + (notice.description.length > 120 ? '...' : '')
  const categoryLabel = notice.category.replace(' Notice', '').replace(' Announcement', '')
  return (
    <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryBadgeClass(notice.category)}`}>
            {categoryLabel}
          </span>
          {notice.priority === 'important' && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200">
              Important
            </span>
          )}
          {notice.is_pinned && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/15 text-primary">
              Pinned
            </span>
          )}
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {notice.title}
        </h2>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <CalendarDaysIcon className="w-4 h-4 mr-1.5 flex-shrink-0" />
          <span>{formatDate(notice.publish_date)}</span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
          {summary}
        </p>
        <Link
          href={`/notice-page/${notice.id}`}
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 px-4 rounded-xl transition-colors text-sm"
        >
          Read More
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>
    </article>
  )
}

export default function NoticePage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<'' | NoticeCategory>('')
  const [priority, setPriority] = useState<'' | NoticePriority>('')
  const { notices, loading, error } = useNotices({
    category: category || undefined,
    priority: priority || undefined,
    status: 'active',
  })

  const filtered = useMemo(() => {
    if (!search.trim()) return notices
    const q = search.toLowerCase()
    return notices.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        (n.short_description && n.short_description.toLowerCase().includes(q)) ||
        n.description.toLowerCase().includes(q) ||
        n.category.toLowerCase().includes(q)
    )
  }, [notices, search])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <section className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <MegaphoneIcon className="w-4 h-4" />
              <span>Notice Board</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Society <span className="text-primary">Notices</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Important announcements, maintenance updates, and community notices.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search notices..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <FunnelIcon className="w-5 h-5 text-gray-500 sm:hidden" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as '' | NoticeCategory)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value || 'all'} value={c.value}>{c.label}</option>
              ))}
            </select>
            <select
              value={priority}
              onChange={(e) => setPriority((e.target.value || '') as '' | NoticePriority)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
            >
              {PRIORITIES.map((p) => (
                <option key={p.value || 'all'} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent" />
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
            <p className="text-red-800 dark:text-red-200 font-medium">{error}</p>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
            <DocumentTextIcon className="w-14 h-14 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No notices found</h2>
            <p className="text-gray-600 dark:text-gray-400">Try changing filters or search.</p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Showing {filtered.length} notice{filtered.length !== 1 ? 's' : ''}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((notice) => (
                <NoticeCard key={notice.id} notice={notice} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  )
}
