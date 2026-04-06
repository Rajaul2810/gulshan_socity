import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { data, error: err } = await supabaseServer
      .from('notices')
      .select('*')
      .eq('id', id)
      .single()

    if (err || !data) {
      return NextResponse.json(
        { data: null, error: 'Notice not found' },
        { status: 404 }
      )
    }
    return NextResponse.json({ data, error: null })
  } catch (error) {
    return NextResponse.json(
      { data: null, error: 'Failed to fetch notice' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const {
      title,
      description,
      short_description,
      category,
      priority,
      publish_date,
      expiry_date,
      attachment_url,
      attachment_name,
      status,
      is_pinned,
      sort_order,
    } = body

    const updates: Record<string, unknown> = {}
    if (title !== undefined) updates.title = title
    if (description !== undefined) updates.description = description
    if (short_description !== undefined) updates.short_description = short_description
    if (category !== undefined) updates.category = category
    if (priority !== undefined) updates.priority = priority
    if (publish_date !== undefined) updates.publish_date = publish_date
    if (expiry_date !== undefined) updates.expiry_date = expiry_date
    if (attachment_url !== undefined) updates.attachment_url = attachment_url
    if (attachment_name !== undefined) updates.attachment_name = attachment_name
    if (status !== undefined) updates.status = status
    if (is_pinned !== undefined) updates.is_pinned = is_pinned
    if (sort_order !== undefined) {
      const n = Number(sort_order)
      if (Number.isFinite(n)) updates.sort_order = Math.trunc(n)
    }

    const { data, error } = await supabaseServer
      .from('notices')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ data, error: null })
  } catch (error) {
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to update notice' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { error } = await supabaseServer.from('notices').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ data: { success: true }, error: null })
  } catch (error) {
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to delete notice' },
      { status: 500 }
    )
  }
}
