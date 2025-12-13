import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

// GET all news articles
export async function GET(request: NextRequest) {
  try {
    // Validate Supabase configuration
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!supabaseUrl) {
      console.error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
      return NextResponse.json(
        { data: null, error: 'Server configuration error: Missing Supabase URL. Please check your .env.local file.' },
        { status: 500 }
      )
    }

    // Validate URL format
    if (!supabaseUrl.includes('supabase.co') && !supabaseUrl.includes('supabase')) {
      console.error('Invalid Supabase URL format:', supabaseUrl)
      return NextResponse.json(
        { data: null, error: 'Invalid Supabase URL format. Please verify your NEXT_PUBLIC_SUPABASE_URL in .env.local' },
        { status: 500 }
      )
    }

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

    if (error) {
      console.error('Supabase query error:', error)
      // Provide more specific error messages
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { data: null, error: 'News table not found. Please ensure the database is properly set up.' },
          { status: 500 }
        )
      } else if (error.message?.includes('JWT') || error.message?.includes('auth')) {
        return NextResponse.json(
          { data: null, error: 'Authentication error. Please check your Supabase API keys in .env.local' },
          { status: 500 }
        )
      }
      throw error
    }

    return NextResponse.json({ data: data || [], error: null })
  } catch (error) {
    console.error('Error fetching news:', error)
    
    // Check for DNS/network errors
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorString = errorMessage.toLowerCase()
    
    let userFriendlyError = 'Failed to fetch news. Please check your connection and try again.'
    
    if (errorString.includes('enotfound') || errorString.includes('getaddrinfo') || errorString.includes('dns')) {
      userFriendlyError = 'Cannot connect to Supabase. Please verify your NEXT_PUBLIC_SUPABASE_URL in .env.local is correct and your Supabase project is active.'
    } else if (errorString.includes('fetch failed') || errorString.includes('network')) {
      userFriendlyError = 'Network error. Please check your internet connection and verify your Supabase project URL is correct.'
    } else if (errorString.includes('timeout')) {
      userFriendlyError = 'Connection timeout. Please check your network connection and try again.'
    }
    
    return NextResponse.json(
      { 
        data: null, 
        error: userFriendlyError 
      },
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

