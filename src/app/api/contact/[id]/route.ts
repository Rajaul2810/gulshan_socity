import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

// GET single contact message
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const { data, error } = await supabaseServer
      .from('contact_messages')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    if (!data) {
      return NextResponse.json(
        { data: null, error: 'Contact message not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data, error: null })
  } catch (error) {
    console.error('Error fetching contact message:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to fetch contact message' },
      { status: 500 }
    )
  }
}

// PATCH update contact message (mainly for status updates)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status } = body

    // Validate status if provided
    if (status && !['unread', 'read', 'replied'].includes(status)) {
      return NextResponse.json(
        { data: null, error: 'Status must be either "unread", "read", or "replied"' },
        { status: 400 }
      )
    }

    const updateData: { status?: 'unread' | 'read' | 'replied' } = {}
    if (status !== undefined) updateData.status = status

    const { data, error } = await supabaseServer
      .from('contact_messages')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    if (!data) {
      return NextResponse.json(
        { data: null, error: 'Contact message not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data, error: null })
  } catch (error) {
    console.error('Error updating contact message:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to update contact message' },
      { status: 500 }
    )
  }
}

// DELETE contact message
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const { error } = await supabaseServer
      .from('contact_messages')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ data: { id }, error: null })
  } catch (error) {
    console.error('Error deleting contact message:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to delete contact message' },
      { status: 500 }
    )
  }
}

