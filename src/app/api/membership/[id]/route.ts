import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

// GET single membership application
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const { data, error } = await supabaseServer
      .from('membership_applications')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    if (!data) {
      return NextResponse.json(
        { data: null, error: 'Membership application not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data, error: null })
  } catch (error) {
    console.error('Error fetching membership application:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to fetch membership application' },
      { status: 500 }
    )
  }
}

// PATCH update membership application (for approval)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { membership_number, zone, status } = body

    // Validate status if provided
    if (status && !['pending', 'under_review', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { data: null, error: 'Invalid status value' },
        { status: 400 }
      )
    }

    // Validate zone if provided
    if (zone && !['Zone 1', 'Zone 2', 'Zone 3', 'Zone 4', 'Zone 5', 'Zone 6'].includes(zone)) {
      return NextResponse.json(
        { data: null, error: 'Invalid zone value' },
        { status: 400 }
      )
    }

    const updateData: { membership_number?: string | null; zone?: string | null; status?: 'pending' | 'under_review' | 'approved' | 'rejected'; approved_date?: string } = {}
    if (membership_number !== undefined) updateData.membership_number = membership_number || null
    if (zone !== undefined) updateData.zone = zone || null
    if (status !== undefined) {
      updateData.status = status
      if (status === 'approved') {
        updateData.approved_date = new Date().toISOString()
      }
    }

    const { data, error } = await supabaseServer
      .from('membership_applications')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    if (!data) {
      return NextResponse.json(
        { data: null, error: 'Membership application not found' },
        { status: 404 }
      )
    }

    // If approved, create member record
    if (status === 'approved' && membership_number && zone) {
      try {
        // Get the application data
        const { data: applicationData } = await supabaseServer
          .from('membership_applications')
          .select('*')
          .eq('id', id)
          .single()

        if (applicationData) {
          // Create member record
          const { error: memberError } = await supabaseServer
            .from('members')
            .insert({
              membership_number: membership_number,
              membership_type: applicationData.membership_type,
              zone: zone,
              name: applicationData.name,
              email: applicationData.email,
              mobile: applicationData.mobile,
              property_schedule: applicationData.property_schedule,
              membership_date: new Date().toISOString().split('T')[0],
              status: 'active',
              application_id: id,
            })

          if (memberError) {
            console.error('Error creating member:', memberError)
            // Don't fail the request, just log the error
          }
        }
      } catch (memberError) {
        console.error('Error creating member record:', memberError)
        // Don't fail the request
      }
    }

    return NextResponse.json({ data, error: null })
  } catch (error) {
    console.error('Error updating membership application:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to update membership application' },
      { status: 500 }
    )
  }
}

