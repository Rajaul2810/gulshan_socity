import { supabase } from '@/lib/supabase/client'
import {
  MEMBERSHIP_MAX_IMAGE_BYTES,
  MEMBERSHIP_MAX_PDF_BYTES,
} from '@/lib/membership-limits'

export { MEMBERSHIP_MAX_IMAGE_BYTES, MEMBERSHIP_MAX_PDF_BYTES }

export function maxBytesForMembershipFile(file: File): number {
  return file.type === 'application/pdf' ? MEMBERSHIP_MAX_PDF_BYTES : MEMBERSHIP_MAX_IMAGE_BYTES
}

export function membershipFileErrorMessage(file: File): string | null {
  const max = maxBytesForMembershipFile(file)
  if (file.size <= max) return null
  return file.type === 'application/pdf'
    ? 'This PDF is too large. Maximum size is 20MB.'
    : 'This image is too large. Maximum size is 5MB.'
}

export async function uploadMembershipFile(
  file: File,
  folder: string
): Promise<{ url: string } | { error: string }> {
  const msg = membershipFileErrorMessage(file)
  if (msg) return { error: msg }

  const isImage = file.type.startsWith('image/')
  const isPdf = file.type === 'application/pdf'
  if (!isImage && !isPdf) {
    return { error: 'Please upload an image (JPG, PNG) or a PDF file.' }
  }

  const ext =
    file.name.split('.').pop()?.toLowerCase() ||
    (isPdf ? 'pdf' : file.type === 'image/png' ? 'png' : 'jpg')

  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const signRes = await fetch('/api/membership/upload-sign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      folder,
      contentType: file.type,
      fileSize: file.size,
      path,
    }),
  })

  let signJson: { data?: { path: string; token: string; publicUrl: string }; error?: string }
  try {
    signJson = await signRes.json()
  } catch {
    return { error: 'Could not start upload. Please try again.' }
  }

  if (!signRes.ok || signJson.error || !signJson.data) {
    return {
      error:
        signJson.error ||
        (signRes.status >= 500
          ? 'Upload service is temporarily unavailable. Please try again.'
          : 'Could not start upload. Please try again.'),
    }
  }

  const { path: storagePath, token, publicUrl } = signJson.data

  const { error: upErr } = await supabase.storage
    .from('membership-documents')
    .uploadToSignedUrl(storagePath, token, file, {
      contentType: file.type,
      upsert: false,
    })

  if (upErr) {
    return {
      error:
        upErr.message ||
        'Upload failed. Check your connection and try again.',
    }
  }

  return { url: publicUrl }
}
