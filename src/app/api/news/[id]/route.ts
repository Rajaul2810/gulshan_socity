import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

// GET single news article
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const { data, error } = await supabaseServer
      .from('news')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    if (!data) {
      return NextResponse.json(
        { data: null, error: 'News article not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data, error: null })
  } catch (error) {
    console.error('Error fetching news article:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to fetch news article' },
      { status: 500 }
    )
  }
}

// PATCH update news article
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { title, description, image, source, date, news_link, status } = body

    // Validate status if provided
    if (status && status !== 'draft' && status !== 'published') {
      return NextResponse.json(
        { data: null, error: 'Status must be either "draft" or "published"' },
        { status: 400 }
      )
    }

    const updateData: {
      title?: string
      description?: string
      image?: string
      source?: string
      date?: string
      news_link?: string
      status?: 'draft' | 'published'
    } = {}
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (image !== undefined) updateData.image = image
    if (source !== undefined) updateData.source = source
    if (date !== undefined) updateData.date = date
    if (news_link !== undefined) updateData.news_link = news_link
    if (status !== undefined) updateData.status = status

    const { data, error } = await supabaseServer
      .from('news')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    if (!data) {
      return NextResponse.json(
        { data: null, error: 'News article not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data, error: null })
  } catch (error) {
    console.error('Error updating news article:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to update news article' },
      { status: 500 }
    )
  }
}

// DELETE news article
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // First, get the article to check if it has an image
    const { data: articleData, error: fetchError } = await supabaseServer
      .from('news')
      .select('image')
      .eq('id', id)
      .single()

    if (fetchError) throw fetchError

    // Delete the article
    const { error } = await supabaseServer
      .from('news')
      .delete()
      .eq('id', id)

    if (error) throw error

    // Delete image from storage if it exists
    if (articleData?.image) {
      try {
        const imagePath = articleData.image.split('/').pop()
        if (imagePath) {
          await supabaseServer.storage
            .from('news-images')
            .remove([imagePath])
        }
      } catch (storageError) {
        console.error('Error deleting image from storage:', storageError)
        // Don't fail the request if image deletion fails
      }
    }

    return NextResponse.json({ data: { id }, error: null })
  } catch (error) {
    console.error('Error deleting news article:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to delete news article' },
      { status: 500 }
    )
  }
}

