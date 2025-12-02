import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

// GET all members (alias for /api/members)
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

