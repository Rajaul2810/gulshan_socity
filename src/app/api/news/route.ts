import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

// GET all news articles
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')

    let query = supabaseServer
      .from('news')
      .select('*')
      .order('date', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({ data, error: null })
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to fetch news' },
      { status: 500 }
    )
  }
}

// POST create new news article
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, image, source, date, news_link, status } = body

    // Validate required fields
    if (!title || !description || !source || !date || !status) {
      return NextResponse.json(
        { data: null, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate status
    if (status !== 'draft' && status !== 'published') {
      return NextResponse.json(
        { data: null, error: 'Status must be either "draft" or "published"' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseServer
      .from('news')
      .insert({
        title,
        description,
        image: image || null,
        source,
        date,
        news_link: news_link || null,
        status,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data, error: null }, { status: 201 })
  } catch (error) {
    console.error('Error creating news article:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to create news article' },
      { status: 500 }
    )
  }
}

