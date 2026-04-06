import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!supabaseUrl) {
      return NextResponse.json(
        { data: null, error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const priority = searchParams.get('priority')
    const limit = searchParams.get('limit')
    const statusParam = searchParams.get('status')

    let query = supabaseServer
      .from('notices')
      .select('*')
      .order('is_pinned', { ascending: false })
      .order('sort_order', { ascending: true })
      .order('publish_date', { ascending: false })

    if (statusParam === 'active' || statusParam === 'inactive') {
      query = query.eq('status', statusParam)
    }
    if (category) query = query.eq('category', category)
    if (priority) query = query.eq('priority', priority)
    if (limit) query = query.limit(parseInt(limit, 10))

    const { data, error } = await query

    if (error) {
      console.error('Notices fetch error:', error)
      return NextResponse.json(
        { data: null, error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: data || [], error: null })
  } catch (error) {
    console.error('Error fetching notices:', error)
    return NextResponse.json(
      { data: null, error: 'Failed to fetch notices' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      short_description,
      category,
      priority = 'normal',
      publish_date,
      expiry_date,
      attachment_url,
      attachment_name,
      status = 'active',
      is_pinned = false,
    } = body

    if (!title || !description || !category) {
      return NextResponse.json(
        { data: null, error: 'Title, description and category are required' },
        { status: 400 }
      )
    }

    const validCategories = [
      'Security Notice',
      'Maintenance Notice',
      'Event Notice',
      'Meeting Notice',
      'Emergency Notice',
      'General Announcement',
    ]
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { data: null, error: 'Invalid category' },
        { status: 400 }
      )
    }

    const { data: maxRows } = await supabaseServer
      .from('notices')
      .select('sort_order')
      .order('sort_order', { ascending: false })
      .limit(1)
    const nextSort =
      maxRows && maxRows.length > 0 && typeof maxRows[0].sort_order === 'number'
        ? maxRows[0].sort_order + 1
        : 0

    const { data, error } = await supabaseServer
      .from('notices')
      .insert({
        title,
        description,
        short_description: short_description || null,
        category,
        priority: priority === 'important' ? 'important' : 'normal',
        publish_date: publish_date || new Date().toISOString(),
        expiry_date: expiry_date || null,
        attachment_url: attachment_url || null,
        attachment_name: attachment_name || null,
        status: status === 'inactive' ? 'inactive' : 'active',
        is_pinned: !!is_pinned,
        sort_order: nextSort,
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ data, error: null }, { status: 201 })
  } catch (error) {
    console.error('Error creating notice:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to create notice' },
      { status: 500 }
    )
  }
}
