import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

// GET single event
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const { data, error } = await supabaseServer
      .from('events')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    if (!data) {
      return NextResponse.json(
        { data: null, error: 'Event not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data, error: null })
  } catch (error) {
    console.error('Error fetching event:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to fetch event' },
      { status: 500 }
    )
  }
}

// PATCH update event
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { title, description, date, time, location, image, tag, highlights, status } = body

    // Validate status if provided
    if (status && status !== 'upcoming' && status !== 'completed') {
      return NextResponse.json(
        { data: null, error: 'Status must be either "upcoming" or "completed"' },
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

    const updateData: { title?: string; description?: string; date?: string; time?: string; location?: string; image?: string; tag?: string | null; highlights?: string[] | null; status?: 'upcoming' | 'completed' } = {}
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (date !== undefined) updateData.date = date
    if (time !== undefined) updateData.time = time
    if (location !== undefined) updateData.location = location
    if (image !== undefined) updateData.image = image
    if (tag !== undefined) updateData.tag = tag || null
    if (highlights !== undefined) updateData.highlights = highlights && highlights.length > 0 ? highlights : null
    if (status !== undefined) updateData.status = status

    const { data, error } = await supabaseServer
      .from('events')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    if (!data) {
      return NextResponse.json(
        { data: null, error: 'Event not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data, error: null })
  } catch (error) {
    console.error('Error updating event:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to update event' },
      { status: 500 }
    )
  }
}

// DELETE event
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // First, get the event to check if it has an image
    const { data: eventData, error: fetchError } = await supabaseServer
      .from('events')
      .select('image')
      .eq('id', id)
      .single()

    if (fetchError) throw fetchError

    // Delete the event
    const { error } = await supabaseServer
      .from('events')
      .delete()
      .eq('id', id)

    if (error) throw error

    // Delete image from storage if it exists
    if (eventData?.image) {
      try {
        const imagePath = eventData.image.split('/').pop()
        if (imagePath) {
          await supabaseServer.storage
            .from('events-images')
            .remove([imagePath])
        }
      } catch (storageError) {
        console.error('Error deleting image from storage:', storageError)
        // Don't fail the request if image deletion fails
      }
    }

    return NextResponse.json({ data: { id }, error: null })
  } catch (error) {
    console.error('Error deleting event:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to delete event' },
      { status: 500 }
    )
  }
}

