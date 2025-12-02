import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

// GET all gallery items
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type')

    let query = supabaseServer
      .from('gallery')
      .select('*')
      .order('date', { ascending: false })

    if (type) {
      query = query.eq('type', type)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({ data, error: null })
  } catch (error) {
    console.error('Error fetching gallery items:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to fetch gallery items' },
      { status: 500 }
    )
  }
}

// POST create new gallery item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, type, image, video_link, date, tag } = body

    // Validate required fields
    if (!title || !type || !date) {
      return NextResponse.json(
        { data: null, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate type
    if (type !== 'image' && type !== 'video') {
      return NextResponse.json(
        { data: null, error: 'Type must be either "image" or "video"' },
        { status: 400 }
      )
    }

    // Validate type-specific fields
    if (type === 'image' && !image) {
      return NextResponse.json(
        { data: null, error: 'Image is required for image type' },
        { status: 400 }
      )
    }

    if (type === 'video' && !video_link) {
      return NextResponse.json(
        { data: null, error: 'Video link is required for video type' },
        { status: 400 }
      )
    }

    // Validate tag if provided
    if (tag && !['Cultural', 'Health', 'Technology', 'Community', 'Art', 'Sports'].includes(tag)) {
      return NextResponse.json(
        { data: null, error: 'Invalid tag value' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseServer
      .from('gallery')
      .insert({
        title,
        type,
        image: type === 'image' ? image : null,
        video_link: type === 'video' ? video_link : null,
        date,
        tag: tag || null,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data, error: null }, { status: 201 })
  } catch (error) {
    console.error('Error creating gallery item:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to create gallery item' },
      { status: 500 }
    )
  }
}

