import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'
import {
  NOTICE_MAX_IMAGE_BYTES,
  NOTICE_MAX_PDF_BYTES,
} from '@/lib/notice-limits'

const BUCKET = 'notice-attachments'
const ALLOWED_IMAGE = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]
const ALLOWED_PDF = ['application/pdf']

function isSafePath(path: string): boolean {
  if (!path || path.includes('..')) return false
  const parts = path.split('/')
  if (parts.length !== 2 || parts[0] !== 'notices') return false
  return /^[a-zA-Z0-9._-]+$/.test(parts[1])
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const path = typeof body.path === 'string' ? body.path : ''
    const contentType = typeof body.contentType === 'string' ? body.contentType : ''
    const fileSize = typeof body.fileSize === 'number' ? body.fileSize : NaN

    const isPdf = ALLOWED_PDF.includes(contentType)
    const isImage = ALLOWED_IMAGE.includes(contentType)
    if (!isPdf && !isImage) {
      return NextResponse.json(
        { data: null, error: 'Only PDF and images (JPEG, PNG, WebP) are allowed.' },
        { status: 400 }
      )
    }

    const maxSize = isPdf ? NOTICE_MAX_PDF_BYTES : NOTICE_MAX_IMAGE_BYTES
    if (!Number.isFinite(fileSize) || fileSize <= 0 || fileSize > maxSize) {
      return NextResponse.json(
        {
          data: null,
          error: isPdf ? 'PDF must be 20MB or smaller.' : 'Image must be 5MB or smaller.',
        },
        { status: 400 }
      )
    }

    if (!isSafePath(path)) {
      return NextResponse.json(
        { data: null, error: 'Invalid file path.' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseServer.storage
      .from(BUCKET)
      .createSignedUploadUrl(path, { upsert: false })

    if (error || !data) {
      return NextResponse.json(
        { data: null, error: error?.message || 'Could not create upload.' },
        { status: 500 }
      )
    }

    const { data: urlData } = supabaseServer.storage
      .from(BUCKET)
      .getPublicUrl(data.path)

    return NextResponse.json({
      data: {
        path: data.path,
        token: data.token,
        signedUrl: data.signedUrl,
        publicUrl: urlData.publicUrl,
      },
      error: null,
    })
  } catch (e) {
    console.error('notices/upload-sign:', e)
    return NextResponse.json(
      { data: null, error: 'Could not start upload.' },
      { status: 500 }
    )
  }
}
