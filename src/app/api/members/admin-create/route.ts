import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

// POST create member directly (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      membership_number,
      membership_type,
      zone,
      name,
      name_bangla,
      father_name,
      mother_name,
      spouse_name,
      date_of_birth,
      gender,
      blood_group,
      profession,
      email,
      mobile,
      office_tel,
      residence_tel,
      designation,
      organization,
      residence_address,
      property_owner,
      property_schedule,
      relationship_to_property,
      proposer_name,
      proposer_membership_no,
      seconder_name,
      seconder_membership_no,
      children,
      photo_url,
      status,
      membership_date,
    } = body

    // Validate required fields
    if (!membership_number || !membership_type || !zone || !name) {
      return NextResponse.json(
        { data: null, error: 'Missing required fields: membership_number, membership_type, zone, and name are required' },
        { status: 400 }
      )
    }

    // Check if membership number already exists
    const { data: existingMember } = await supabaseServer
      .from('members')
      .select('id')
      .eq('membership_number', membership_number)
      .single()

    if (existingMember) {
      return NextResponse.json(
        { data: null, error: 'Membership number already exists' },
        { status: 400 }
      )
    }

    // Create member record
    const { data, error } = await supabaseServer
      .from('members')
      .insert({
        membership_number,
        membership_type,
        zone,
        name,
        name_bangla: name_bangla || null,
        father_name: father_name || null,
        mother_name: mother_name || null,
        spouse_name: spouse_name || null,
        date_of_birth: date_of_birth || null,
        gender: gender || null,
        blood_group: blood_group || null,
        profession: profession || null,
        email: email || null,
        mobile: mobile || null,
        office_tel: office_tel || null,
        residence_tel: residence_tel || null,
        designation: designation || null,
        organization: organization || null,
        residence_address: residence_address || null,
        property_owner: property_owner || null,
        property_schedule: property_schedule || null,
        relationship_to_property: relationship_to_property || null,
        proposer_name: proposer_name || null,
        proposer_membership_no: proposer_membership_no || null,
        seconder_name: seconder_name || null,
        seconder_membership_no: seconder_membership_no || null,
        children: children && children.length > 0 ? children : null,
        photo_url: photo_url || null,
        status: status || 'active',
        membership_date: membership_date || new Date().toISOString().split('T')[0],
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data, error: null }, { status: 201 })
  } catch (error) {
    console.error('Error creating member:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to create member' },
      { status: 500 }
    )
  }
}

