import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

// GET single car sticker
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const { data, error } = await supabaseServer
      .from('car_stickers')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    if (!data) {
      return NextResponse.json(
        { data: null, error: 'Car sticker not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data, error: null })
  } catch (error) {
    console.error('Error fetching car sticker:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to fetch car sticker' },
      { status: 500 }
    )
  }
}

// PATCH update car sticker
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    // Validate status if provided
    if (body.status && !['active', 'expired', 'pending'].includes(body.status)) {
      return NextResponse.json(
        { data: null, error: 'Invalid status value' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseServer
      .from('car_stickers')
      .update(body)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    if (!data) {
      return NextResponse.json(
        { data: null, error: 'Car sticker not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data, error: null })
  } catch (error) {
    console.error('Error updating car sticker:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to update car sticker' },
      { status: 500 }
    )
  }
}

// DELETE car sticker
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const { error } = await supabaseServer
      .from('car_stickers')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ data: { success: true }, error: null })
  } catch (error) {
    console.error('Error deleting car sticker:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to delete car sticker' },
      { status: 500 }
    )
  }
}

