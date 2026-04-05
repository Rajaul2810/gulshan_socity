import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'
import {
  MEMBERSHIP_MAX_IMAGE_BYTES,
  MEMBERSHIP_MAX_PDF_BYTES,
} from '@/lib/membership-limits'

const BUCKET = 'membership-documents'
const ALLOWED_FOLDERS = new Set([
  'photos',
  'nid',
  'tax-receipts',
  'lease-agreements',
  'trade-licenses',
  'certificates',
  'documents',
])

function isSafePath(path: string, folder: string): boolean {
  if (!path || path.includes('..')) return false
  const parts = path.split('/')
  if (parts.length !== 2 || parts[0] !== folder) return false
  return /^[a-zA-Z0-9._-]+$/.test(parts[1])
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const folder = typeof body.folder === 'string' ? body.folder : ''
    const contentType = typeof body.contentType === 'string' ? body.contentType : ''
    const fileSize = typeof body.fileSize === 'number' ? body.fileSize : NaN
    const path = typeof body.path === 'string' ? body.path : ''

    if (!ALLOWED_FOLDERS.has(folder)) {
      return NextResponse.json(
        { data: null, error: 'Invalid upload folder.' },
        { status: 400 }
      )
    }

    const isPdf = contentType === 'application/pdf'
    const isImage = contentType.startsWith('image/')
    if (!isPdf && !isImage) {
      return NextResponse.json(
        { data: null, error: 'Only images and PDF files are allowed.' },
        { status: 400 }
      )
    }

    const maxSize = isPdf ? MEMBERSHIP_MAX_PDF_BYTES : MEMBERSHIP_MAX_IMAGE_BYTES
    if (!Number.isFinite(fileSize) || fileSize <= 0 || fileSize > maxSize) {
      return NextResponse.json(
        {
          data: null,
          error: isPdf
            ? 'PDF must be 20MB or smaller.'
            : 'Image must be 5MB or smaller.',
        },
        { status: 400 }
      )
    }

    if (!isSafePath(path, folder)) {
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
    console.error('upload-sign:', e)
    return NextResponse.json(
      { data: null, error: 'Could not start upload.' },
      { status: 500 }
    )
  }
}
