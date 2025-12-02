'use client'

import { usePathname } from 'next/navigation'
import Navber from '@/Components/Layout/Navber'
import Footer from '@/Components/Layout/Footer'

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  if (isAdminRoute) {
    return <>{children}</>
  }

  return (
    <>
      <Navber />
      {children}
      <Footer />
    </>
  )
}

