import { AdminAuthProvider } from '@/contexts/AdminAuthContext'
import AdminAuthGuard from '@/Components/Admin/AdminAuthGuard'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminAuthProvider>
      <AdminAuthGuard>
        {children}
      </AdminAuthGuard>
    </AdminAuthProvider>
  )
}

