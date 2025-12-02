'use client'

import React from 'react'
import {
  UsersIcon,
  CalendarDaysIcon,
  PhotoIcon,
  NewspaperIcon,
  TicketIcon,
  InboxIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

const AdminDashboard = () => {
  const stats = [
    {
      name: 'Total Members',
      value: '0',
      icon: UsersIcon,
      href: '/admin/members',
      color: 'bg-blue-500',
    },
    {
      name: 'Upcoming Events',
      value: '0',
      icon: CalendarDaysIcon,
      href: '/admin/events',
      color: 'bg-green-500',
    },
    {
      name: 'Gallery Items',
      value: '0',
      icon: PhotoIcon,
      href: '/admin/gallery',
      color: 'bg-purple-500',
    },
    {
      name: 'News Articles',
      value: '0',
      icon: NewspaperIcon,
      href: '/admin/news',
      color: 'bg-orange-500',
    },
    {
      name: 'Car Stickers',
      value: '0',
      icon: TicketIcon,
      href: '/admin/car-stickers',
      color: 'bg-pink-500',
    },
    {
      name: 'Contact Messages',
      value: '0',
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
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
                  {stat.value}
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
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

