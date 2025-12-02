import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

// GET single gallery item
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const { data, error } = await supabaseServer
      .from('gallery')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    if (!data) {
      return NextResponse.json(
        { data: null, error: 'Gallery item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data, error: null })
  } catch (error) {
    console.error('Error fetching gallery item:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to fetch gallery item' },
      { status: 500 }
    )
  }
}

// PATCH update gallery item
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { title, type, image, video_link, date, tag } = body

    // Validate type if provided
    if (type && type !== 'image' && type !== 'video') {
      return NextResponse.json(
        { data: null, error: 'Type must be either "image" or "video"' },
        { status: 400 }
      )
    }

    // Validate tag if provided
    if (tag !== undefined && tag !== null && tag !== '' && !['Cultural', 'Health', 'Technology', 'Community', 'Art', 'Sports'].includes(tag)) {
      return NextResponse.json(
        { data: null, error: 'Invalid tag value' },
        { status: 400 }
      )
    }

    const updateData: { title?: string; type?: 'image' | 'video'; image?: string; video_link?: string; date?: string; tag?: string | null } = {}
    if (title !== undefined) updateData.title = title
    if (type !== undefined) updateData.type = type
    if (image !== undefined) updateData.image = image
    if (video_link !== undefined) updateData.video_link = video_link
    if (date !== undefined) updateData.date = date
    if (tag !== undefined) updateData.tag = tag || null

    const { data, error } = await supabaseServer
      .from('gallery')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    if (!data) {
      return NextResponse.json(
        { data: null, error: 'Gallery item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data, error: null })
  } catch (error) {
    console.error('Error updating gallery item:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to update gallery item' },
      { status: 500 }
    )
  }
}

// DELETE gallery item
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // First, get the item to check if it has an image
    const { data: itemData, error: fetchError } = await supabaseServer
      .from('gallery')
      .select('image, type')
      .eq('id', id)
      .single()

    if (fetchError) throw fetchError

    // Delete the item
    const { error } = await supabaseServer
      .from('gallery')
      .delete()
      .eq('id', id)

    if (error) throw error

    // Delete image from storage if it exists
    if (itemData?.image && itemData.type === 'image') {
      try {
        const imagePath = itemData.image.split('/').pop()
        if (imagePath) {
          await supabaseServer.storage
            .from('gallery-images')
            .remove([imagePath])
        }
      } catch (storageError) {
        console.error('Error deleting image from storage:', storageError)
        // Don't fail the request if image deletion fails
      }
    }

    return NextResponse.json({ data: { id }, error: null })
  } catch (error) {
    console.error('Error deleting gallery item:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to delete gallery item' },
      { status: 500 }
    )
  }
}

