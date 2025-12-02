import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

// GET single adopt a road registration
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const { data, error } = await supabaseServer
      .from('adopt_a_road')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    if (!data) {
      return NextResponse.json(
        { data: null, error: 'Adopt a road registration not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data, error: null })
  } catch (error) {
    console.error('Error fetching adopt a road registration:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to fetch adopt a road registration' },
      { status: 500 }
    )
  }
}

// PATCH update adopt a road registration
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    // Validate status if provided
    if (body.status && !['pending', 'approved', 'rejected', 'active', 'expired'].includes(body.status)) {
      return NextResponse.json(
        { data: null, error: 'Invalid status value' },
        { status: 400 }
      )
    }

    // Validate payment_status if provided
    if (body.payment_status && !['pending', 'paid', 'overdue'].includes(body.payment_status)) {
      return NextResponse.json(
        { data: null, error: 'Invalid payment_status value' },
        { status: 400 }
      )
    }

    // If status is being updated to 'approved', set approved_date
    if (body.status === 'approved' && !body.approved_date) {
      body.approved_date = new Date().toISOString()
    }

    const { data, error } = await supabaseServer
      .from('adopt_a_road')
      .update(body)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    if (!data) {
      return NextResponse.json(
        { data: null, error: 'Adopt a road registration not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data, error: null })
  } catch (error) {
    console.error('Error updating adopt a road registration:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to update adopt a road registration' },
      { status: 500 }
    )
  }
}

// DELETE adopt a road registration
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const { error } = await supabaseServer
      .from('adopt_a_road')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ data: { success: true }, error: null })
  } catch (error) {
    console.error('Error deleting adopt a road registration:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to delete adopt a road registration' },
      { status: 500 }
    )
  }
}

