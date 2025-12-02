import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

// GET all contact messages
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')

    let query = supabaseServer
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({ data, error: null })
  } catch (error) {
    console.error('Error fetching contact messages:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to fetch contact messages' },
      { status: 500 }
    )
  }
}

// POST create new contact message
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, category, message, preferredContact } = body

    // Validate required fields
    if (!name || !email || !subject || !category || !message) {
      return NextResponse.json(
        { data: null, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { data: null, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseServer
      .from('contact_messages')
      .insert({
        name,
        email,
        phone: phone || null,
        subject,
        category,
        message,
        preferred_contact: preferredContact || 'email',
        status: 'unread',
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data, error: null }, { status: 201 })
  } catch (error) {
    console.error('Error creating contact message:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to create contact message' },
      { status: 500 }
    )
  }
}

