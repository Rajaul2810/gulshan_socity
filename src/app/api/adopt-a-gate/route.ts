import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

// GET all adopt a gate registrations
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')

    let query = supabaseServer
      .from('adopt_a_gate')
      .select('*')
      .order('created_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({ data, error: null })
  } catch (error) {
    console.error('Error fetching adopt a gate registrations:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to fetch adopt a gate registrations' },
      { status: 500 }
    )
  }
}

// POST create new adopt a gate registration
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      adopter_type,
      name,
      address,
      resident_type,
      is_member,
      membership_number,
      gate_road_number,
      gulshan_area,
      adoption_start_date,
      adoption_end_date,
      mobile,
      email,
      terms_accepted,
      status,
      payment_amount,
    } = body

    // Validate required fields
    if (!adopter_type || !name || !address || !gate_road_number || !adoption_start_date || !adoption_end_date || !mobile || !terms_accepted) {
      return NextResponse.json(
        { data: null, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate adopter_type
    if (!['Personal', 'Commercial', 'Family'].includes(adopter_type)) {
      return NextResponse.json(
        { data: null, error: 'Invalid adopter type' },
        { status: 400 }
      )
    }

    // Validate terms_accepted
    if (!terms_accepted) {
      return NextResponse.json(
        { data: null, error: 'You must accept the terms and conditions' },
        { status: 400 }
      )
    }

    // Default to 'pending' status for public submissions if not provided
    const finalStatus = status || 'pending'

    // Validate status
    if (!['pending', 'approved', 'rejected', 'active', 'expired'].includes(finalStatus)) {
      return NextResponse.json(
        { data: null, error: 'Invalid status value' },
        { status: 400 }
      )
    }

    // Fixed payment amount: Tk. 3,00,000/- for two-year duration
    const calculatedPaymentAmount = payment_amount || 300000.00

    const { data, error } = await supabaseServer
      .from('adopt_a_gate')
      .insert({
        adopter_type,
        name,
        address,
        resident_type: resident_type || null,
        is_member: is_member || false,
        membership_number: membership_number || null,
        gate_road_number,
        gulshan_area: gulshan_area || null,
        adoption_start_date,
        adoption_end_date,
        mobile,
        email: email || null,
        terms_accepted,
        status: finalStatus,
        payment_amount: calculatedPaymentAmount,
        payment_status: 'pending',
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data, error: null }, { status: 201 })
  } catch (error) {
    console.error('Error creating adopt a gate registration:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to create adopt a gate registration' },
      { status: 500 }
    )
  }
}

