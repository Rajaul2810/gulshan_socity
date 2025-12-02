import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

// GET all events
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')

    let query = supabaseServer
      .from('events')
      .select('*')
      .order('date', { ascending: true })

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({ data, error: null })
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to fetch events' },
      { status: 500 }
    )
  }
}

// POST create new event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, date, time, location, image, tag, highlights, status } = body

    // Validate required fields
    if (!title || !description || !date || !time || !location || !status) {
      return NextResponse.json(
        { data: null, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate status
    if (status !== 'upcoming' && status !== 'completed') {
      return NextResponse.json(
        { data: null, error: 'Status must be either "upcoming" or "completed"' },
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
      .from('events')
      .insert({
        title,
        description,
        date,
        time,
        location,
        image: image || null,
        tag: tag || null,
        highlights: highlights && highlights.length > 0 ? highlights : null,
        status,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data, error: null }, { status: 201 })
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to create event' },
      { status: 500 }
    )
  }
}

