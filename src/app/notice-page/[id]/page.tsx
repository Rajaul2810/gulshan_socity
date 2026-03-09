'use client'

import React from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  DocumentArrowDownIcon,
} from '@heroicons/react/24/outline'
import { useNotice } from '@/hooks/useNotices'

function formatDate(dateString: string) {
  try {
    const d = new Date(dateString)
    if (isNaN(d.getTime())) return '—'
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return '—'
  }
}

function getCategoryBadgeClass(category: string): string {
  const map: Record<string, string> = {
    'Security Notice': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    'Maintenance Notice': 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
    'Event Notice': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200',
    'Meeting Notice': 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200',
    'Emergency Notice': 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200',
    'General Announcement': 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200',
  }
  return map[category] || 'bg-gray-100 text-gray-800'
}

export default function NoticeDetailPage() {
  const params = useParams()
  const id = typeof params?.id === 'string' ? params.id : null
  const { notice, loading, error } = useNotice(id)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  if (error || !notice) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <DocumentTextIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Notice not found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error || 'The notice may have been removed.'}</p>
          <Link
            href="/notice-page"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold py-2.5 px-4 rounded-xl hover:bg-primary/90"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Notices
          </Link>
        </div>
      </div>
    )
  }

  const categoryLabel = notice.category.replace(' Notice', '').replace(' Announcement', '')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/notice-page"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary mb-6 text-sm font-medium"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to Notices
        </Link>

        <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryBadgeClass(notice.category)}`}>
                {categoryLabel}
              </span>
              {notice.priority === 'important' && (
                <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200">
                  Important
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {notice.title}
            </h1>

            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
              <CalendarDaysIcon className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>Published {formatDate(notice.publish_date)}</span>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none">
              <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                {notice.description}
              </div>
            </div>

            {notice.attachment_url && (
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Attachment</h3>
                <a
                  href={notice.attachment_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-medium py-2.5 px-4 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <DocumentArrowDownIcon className="w-5 h-5" />
                  {notice.attachment_name || 'Download attachment'}
                </a>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  )
}
