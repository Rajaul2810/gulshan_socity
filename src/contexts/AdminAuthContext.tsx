'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { isAdminAuthenticated, setAdminAuthenticated, validateAdminCredentials } from '@/lib/admin-auth'

interface AdminAuthContextType {
  isAuthenticated: boolean
  isHydrated: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null)

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsAuthenticated(isAdminAuthenticated())
    setIsHydrated(true)
  }, [])

  const login = useCallback((email: string, password: string) => {
    const valid = validateAdminCredentials(email, password)
    if (valid) {
      setAdminAuthenticated(true)
      setIsAuthenticated(true)
    }
    return valid
  }, [])

  const logout = useCallback(() => {
    setAdminAuthenticated(false)
    setIsAuthenticated(false)
  }, [])

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, isHydrated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider')
  return ctx
}
