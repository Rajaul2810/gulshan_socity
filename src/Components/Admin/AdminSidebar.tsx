'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  HomeIcon,
  UsersIcon,
  CalendarDaysIcon,
  PhotoIcon,
  NewspaperIcon,
  TicketIcon,
  InboxIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightIcon,
  MapPinIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline'

interface NavItem {
  name: string
  href: string
  icon: React.ElementType
}

const AdminSidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navigation: NavItem[] = [
    { name: 'Dashboard', href: '/admin', icon: HomeIcon },
    { name: 'Members', href: '/admin/members', icon: UsersIcon },
    { name: 'Events', href: '/admin/events', icon: CalendarDaysIcon },
    { name: 'Gallery', href: '/admin/gallery', icon: PhotoIcon },
    { name: 'News', href: '/admin/news', icon: NewspaperIcon },
    { name: 'Car Stickers', href: '/admin/car-stickers', icon: TicketIcon },
    { name: 'Adopt a Road', href: '/admin/adopt-a-road', icon: MapPinIcon },
    { name: 'Adopt a Gate', href: '/admin/adopt-a-gate', icon: BuildingOfficeIcon },
    { name: 'Contact Messages', href: '/admin/contact-messages', icon: InboxIcon },
  ]

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin'
    }
    return pathname?.startsWith(href)
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          )}
        </button>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-40
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <Link href="/admin" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
                <HomeIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Admin Panel
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Gulshan Society
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${
                      active
                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-semibold'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <Link
              href="/"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            >
              <ArrowRightIcon className="w-5 h-5" />
              <span>Back to Site</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}

export default AdminSidebar

