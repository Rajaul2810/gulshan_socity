import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = (formData.get('folder') as string) || null

    if (!file) {
      return NextResponse.json(
        { data: null, error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type - images and PDFs
    const isValidFile = file.type.startsWith('image/') || file.type === 'application/pdf'
    if (!isValidFile) {
      return NextResponse.json(
        { data: null, error: 'Only image files (JPG, PNG) and PDF files are allowed' },
        { status: 400 }
      )
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { data: null, error: 'File size exceeds 5MB limit' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExt = file.name.split('.').pop()
    
    // Determine folder - use provided folder, or default based on file type
    const targetFolder = folder || (file.type === 'application/pdf' ? 'documents' : 'photos')
    const fileName = `${targetFolder}/${timestamp}-${randomString}.${fileExt}`

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabaseServer.storage
      .from('membership-documents')
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) throw uploadError

    // Get public URL
    const { data: urlData } = supabaseServer.storage
      .from('membership-documents')
      .getPublicUrl(fileName)

    return NextResponse.json({
      data: {
        url: urlData.publicUrl,
        path: uploadData.path,
      },
      error: null,
    })
  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to upload image' },
      { status: 500 }
    )
  }
}

