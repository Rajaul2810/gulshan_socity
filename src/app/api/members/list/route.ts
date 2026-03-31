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

    const pageSize = 1000
    let from = 0
    const allRows: Record<string, unknown>[] = []

    while (true) {
      const { data, error } = await query.range(from, from + pageSize - 1)
      if (error) throw error

      if (!data || data.length === 0) break
      allRows.push(...data)

      if (data.length < pageSize) break
      from += pageSize
    }

    return NextResponse.json({ data: allRows, error: null })
  } catch (error) {
    console.error('Error fetching members:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to fetch members' },
      { status: 500 }
    )
  }
}

