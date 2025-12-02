import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

// GET all car stickers
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')

    let query = supabaseServer
      .from('car_stickers')
      .select('*')
      .order('created_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({ data, error: null })
  } catch (error) {
    console.error('Error fetching car stickers:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to fetch car stickers' },
      { status: 500 }
    )
  }
}

// POST create new car sticker
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { car_number, owner_name, phone, house_number, road_number, issue_date, expiry_date, status } = body

    // Validate required fields
    if (!car_number || !owner_name || !phone || !house_number || !road_number || !issue_date) {
      return NextResponse.json(
        { data: null, error: 'Missing required fields: car_number, owner_name, phone, house_number, road_number, and issue_date are required' },
        { status: 400 }
      )
    }

    // Default to 'pending' status for public submissions if not provided
    const finalStatus = status || 'pending'

    // Validate status
    if (!['active', 'expired', 'pending'].includes(finalStatus)) {
      return NextResponse.json(
        { data: null, error: 'Status must be either "active", "expired", or "pending"' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseServer
      .from('car_stickers')
      .insert({
        car_number,
        owner_name,
        phone,
        house_number,
        road_number,
        issue_date,
        expiry_date: expiry_date || null,
        status: finalStatus,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data, error: null }, { status: 201 })
  } catch (error) {
    console.error('Error creating car sticker:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to create car sticker' },
      { status: 500 }
    )
  }
}

