import { supabase } from '@/lib/supabase/client'
import {
  NOTICE_MAX_IMAGE_BYTES,
  NOTICE_MAX_PDF_BYTES,
} from '@/lib/notice-limits'

const ALLOWED_IMAGE = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export function isValidNoticeAttachmentType(file: File): boolean {
  return (
    file.type === 'application/pdf' || ALLOWED_IMAGE.includes(file.type)
  )
}

export function noticeFileErrorMessage(file: File): string | null {
  const isPdf = file.type === 'application/pdf'
  const isImage = ALLOWED_IMAGE.includes(file.type)
  if (!isPdf && !isImage) return null
  const max = isPdf ? NOTICE_MAX_PDF_BYTES : NOTICE_MAX_IMAGE_BYTES
  if (file.size <= max) return null
  return isPdf
    ? 'PDF must be 20MB or smaller.'
    : 'Image must be 5MB or smaller.'
}

export async function uploadNoticeAttachment(
  file: File
): Promise<{ url: string; name: string } | { error: string }> {
  const sizeMsg = noticeFileErrorMessage(file)
  if (sizeMsg) return { error: sizeMsg }

  const isPdf = file.type === 'application/pdf'
  if (!isPdf && !ALLOWED_IMAGE.includes(file.type)) {
    return { error: 'Only PDF and images (JPEG, PNG, WebP) are allowed.' }
  }

  const ext =
    file.name.split('.').pop()?.toLowerCase() ||
    (isPdf ? 'pdf' : 'jpg')
  const path = `notices/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const signRes = await fetch('/api/notices/upload-sign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      path,
      contentType: file.type,
      fileSize: file.size,
    }),
  })

  let signJson: {
    data?: { path: string; token: string; publicUrl: string }
    error?: string
  }
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
    .from('notice-attachments')
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

  return { url: publicUrl, name: file.name }
}
