'use client'

import React, { useState, useEffect } from 'react'
import {
  UsersIcon,
  CalendarDaysIcon,
  PhotoIcon,
  NewspaperIcon,
  TicketIcon,
  InboxIcon,
  MegaphoneIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

interface DashboardStats {
  members: number
  events: number
  news: number
  notices: number
  gallery: number
  car_stickers: number
  contact_messages: number
}

const defaultStats: DashboardStats = {
  members: 0,
  events: 0,
  news: 0,
  notices: 0,
  gallery: 0,
  car_stickers: 0,
  contact_messages: 0,
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>(defaultStats)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function fetchStats() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('/api/admin/stats')
        const json = await res.json()
        if (cancelled) return
        if (json.error) throw new Error(json.error)
        setStats(json.data || defaultStats)
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Failed to load stats')
          setStats(defaultStats)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchStats()
    return () => { cancelled = true }
  }, [])

  const statCards = [
    {
      name: 'Total Members',
      value: stats.members,
      icon: UsersIcon,
      href: '/admin/members',
      color: 'bg-blue-500',
    },
    {
      name: 'Events',
      value: stats.events,
      icon: CalendarDaysIcon,
      href: '/admin/events',
      color: 'bg-green-500',
    },
    {
      name: 'Gallery Items',
      value: stats.gallery,
      icon: PhotoIcon,
      href: '/admin/gallery',
      color: 'bg-purple-500',
    },
    {
      name: 'News Articles',
      value: stats.news,
      icon: NewspaperIcon,
      href: '/admin/news',
      color: 'bg-orange-500',
    },
    {
      name: 'Notices',
      value: stats.notices,
      icon: MegaphoneIcon,
      href: '/admin/notices',
      color: 'bg-amber-500',
    },
    {
      name: 'Car Stickers',
      value: stats.car_stickers,
      icon: TicketIcon,
      href: '/admin/car-stickers',
      color: 'bg-pink-500',
    },
    {
      name: 'Contact Messages',
      value: stats.contact_messages,
      icon: InboxIcon,
      href: '/admin/contact-messages',
      color: 'bg-indigo-500',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Welcome to the Gulshan Society admin panel
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.name}
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {loading ? '—' : stat.value}
                </p>
              </div>
              <div
                className={`${stat.color} p-4 rounded-xl text-white group-hover:scale-110 transition-transform duration-200`}
              >
                <stat.icon className="w-8 h-8" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/admin/members?action=add"
            className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 text-center"
          >
            <UsersIcon className="w-6 h-6 mx-auto mb-2 text-gray-400" />
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Add New Member
            </p>
          </Link>
          <Link
            href="/admin/events?action=add"
            className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 text-center"
          >
            <CalendarDaysIcon className="w-6 h-6 mx-auto mb-2 text-gray-400" />
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Create Event
            </p>
          </Link>
          <Link
            href="/admin/news?action=add"
            className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 text-center"
          >
            <NewspaperIcon className="w-6 h-6 mx-auto mb-2 text-gray-400" />
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Add News Article
            </p>
          </Link>
          <Link
            href="/admin/notices?action=add"
            className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 text-center"
          >
            <MegaphoneIcon className="w-6 h-6 mx-auto mb-2 text-gray-400" />
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Add Notice
            </p>
          </Link>
          <Link
            href="/admin/car-stickers?action=add"
            className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 text-center"
          >
            <TicketIcon className="w-6 h-6 mx-auto mb-2 text-gray-400" />
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Add Car Sticker
            </p>
          </Link>
          
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

