import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

// GET all members
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const zone = searchParams.get('zone')
    const membershipType = searchParams.get('membership_type')

    let query = supabaseServer
      .from('members')
      .select('*')
      .order('created_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    if (zone) {
      query = query.eq('zone', zone)
    }

    if (membershipType) {
      query = query.eq('membership_type', membershipType)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({ data, error: null })
  } catch (error) {
    console.error('Error fetching members:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to fetch members' },
      { status: 500 }
    )
  }
}

// POST create new member
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      membership_number,
      membership_type,
      zone,
      name,
      email,
      mobile,
      property_schedule,
      membership_date,
      status,
    } = body

    // Validate required fields
    if (!membership_number || !membership_type || !zone || !name) {
      return NextResponse.json(
        { data: null, error: 'Missing required fields: membership_number, membership_type, zone, and name are required' },
        { status: 400 }
      )
    }

    // Check if membership number already exists
    const { data: existingMember } = await supabaseServer
      .from('members')
      .select('id')
      .eq('membership_number', membership_number)
      .single()

    if (existingMember) {
      return NextResponse.json(
        { data: null, error: 'Membership number already exists' },
        { status: 400 }
      )
    }

    // Insert member
    const { data, error } = await supabaseServer
      .from('members')
      .insert({
        membership_number,
        membership_type,
        zone,
        name,
        email: email || null,
        mobile: mobile || null,
        property_schedule: property_schedule || null,
        membership_date: membership_date || new Date().toISOString().split('T')[0],
        status: status || 'active',
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data, error: null }, { status: 201 })
  } catch (error) {
    console.error('Error creating member:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to create member' },
      { status: 500 }
    )
  }
}

