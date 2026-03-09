'use client'

import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminLoginModal from './AdminLoginModal'
import { useAdminAuth } from '@/contexts/AdminAuthContext'

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isHydrated, login } = useAdminAuth()

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AdminLoginModal onLogin={login} />
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar />
      <main className="lg:ml-64 min-h-screen">
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
