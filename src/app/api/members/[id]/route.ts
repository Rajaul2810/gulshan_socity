import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

// GET single member
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const { data, error } = await supabaseServer
      .from('members')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    if (!data) {
      return NextResponse.json(
        { data: null, error: 'Member not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data, error: null })
  } catch (error) {
    console.error('Error fetching member:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to fetch member' },
      { status: 500 }
    )
  }
}

// PATCH update member
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    // Validate status if provided
    if (body.status && !['active', 'inactive', 'suspended'].includes(body.status)) {
      return NextResponse.json(
        { data: null, error: 'Invalid status value' },
        { status: 400 }
      )
    }

    // Validate zone if provided
    if (body.zone && !['Zone 1', 'Zone 2', 'Zone 3', 'Zone 4', 'Zone 5', 'Zone 6'].includes(body.zone)) {
      return NextResponse.json(
        { data: null, error: 'Invalid zone value' },
        { status: 400 }
      )
    }

    // Validate membership_type if provided
    if (body.membership_type && !['Life', 'Affiliate', 'Associate', 'Corporate'].includes(body.membership_type)) {
      return NextResponse.json(
        { data: null, error: 'Invalid membership_type value' },
        { status: 400 }
      )
    }

    // Check if membership_number is being updated and if it already exists
    if (body.membership_number) {
      const { data: existingMember } = await supabaseServer
        .from('members')
        .select('id')
        .eq('membership_number', body.membership_number)
        .neq('id', id)
        .single()

      if (existingMember) {
        return NextResponse.json(
          { data: null, error: 'Membership number already exists' },
          { status: 400 }
        )
      }
    }

    // Get existing member to check for photo_url
    const { data: existingMemberData } = await supabaseServer
      .from('members')
      .select('photo_url')
      .eq('id', id)
      .single()

    // If photo_url is being updated and old photo exists, delete it from storage
    if (body.photo_url && existingMemberData?.photo_url && body.photo_url !== existingMemberData.photo_url) {
      try {
        // Extract file path from URL
        const oldPhotoUrl = existingMemberData.photo_url
        const urlParts = oldPhotoUrl.split('/member-photos/')
        if (urlParts.length > 1) {
          const filePath = `member-photos/${urlParts[1]}`
          await supabaseServer.storage
            .from('member-photos')
            .remove([filePath])
        }
      } catch (error) {
        console.error('Error deleting old photo:', error)
        // Don't fail the update if photo deletion fails
      }
    }

    // Update member
    const { data, error } = await supabaseServer
      .from('members')
      .update(body)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    if (!data) {
      return NextResponse.json(
        { data: null, error: 'Member not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data, error: null })
  } catch (error) {
    console.error('Error updating member:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to update member' },
      { status: 500 }
    )
  }
}

// DELETE member
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Get member data to delete photo
    const { data: memberData } = await supabaseServer
      .from('members')
      .select('photo_url')
      .eq('id', id)
      .single()

    // Delete photo from storage if exists
    if (memberData?.photo_url) {
      try {
        const urlParts = memberData.photo_url.split('/member-photos/')
        if (urlParts.length > 1) {
          const filePath = `member-photos/${urlParts[1]}`
          await supabaseServer.storage
            .from('member-photos')
            .remove([filePath])
        }
      } catch (error) {
        console.error('Error deleting photo:', error)
        // Continue with member deletion even if photo deletion fails
      }
    }

    // Delete member
    const { error } = await supabaseServer
      .from('members')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ data: { success: true }, error: null })
  } catch (error) {
    console.error('Error deleting member:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to delete member' },
      { status: 500 }
    )
  }
}

