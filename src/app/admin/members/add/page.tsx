'use client'

import { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import MembershipForm from '@/app/membership-form/page'

function AdminAddMemberPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const applicationId = searchParams.get('applicationId')
  const isAdmin = true

  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <button
          onClick={() => router.back()}
          className="mb-4 text-primary hover:text-primary-800 dark:text-primary-400 flex items-center space-x-2"
        >
          <span>← Back to Members</span>
        </button>
      </div>
      <MembershipForm isAdmin={isAdmin} applicationId={applicationId || undefined} />
    </div>
  )
}

export default function AdminAddMemberPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen py-8 dark:bg-gray-900 bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    }>
      <AdminAddMemberPageContent />
    </Suspense>
  )
}

