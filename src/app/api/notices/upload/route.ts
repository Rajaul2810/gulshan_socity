import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

const BUCKET = 'notice-attachments'
const MAX_IMAGE = 5 * 1024 * 1024   // 5MB
const MAX_PDF = 10 * 1024 * 1024  // 10MB
const ALLOWED_IMAGE = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const ALLOWED_PDF = ['application/pdf']

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    if (!file) {
      return NextResponse.json(
        { data: null, error: 'No file provided' },
        { status: 400 }
      )
    }

    const isPdf = ALLOWED_PDF.includes(file.type)
    const isImage = ALLOWED_IMAGE.includes(file.type)
    if (!isPdf && !isImage) {
      return NextResponse.json(
        { data: null, error: 'Only PDF and images (JPEG, PNG, WebP) are allowed.' },
        { status: 400 }
      )
    }

    const maxSize = isPdf ? MAX_PDF : MAX_IMAGE
    if (file.size > maxSize) {
      return NextResponse.json(
        { data: null, error: isPdf ? 'PDF must be under 10MB' : 'Image must be under 5MB' },
        { status: 400 }
      )
    }

    const ext = file.name.split('.').pop() || (isPdf ? 'pdf' : 'jpg')
    const fileName = `notices/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { data: uploadData, error: uploadError } = await supabaseServer.storage
      .from(BUCKET)
      .upload(fileName, buffer, { contentType: file.type, upsert: false })

    if (uploadError) throw uploadError

    const { data: urlData } = supabaseServer.storage.from(BUCKET).getPublicUrl(uploadData.path)

    return NextResponse.json({
      data: {
        url: urlData.publicUrl,
        path: uploadData.path,
        name: file.name,
      },
      error: null,
    })
  } catch (error) {
    console.error('Notice upload error:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    )
  }
}
