import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

// POST create new membership application
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Extract all form fields
    const membershipType = formData.get('membershipType') as string
    const declaration = formData.get('declaration') === 'true'
    const proposerName = formData.get('proposerName') as string
    const proposerMembershipNo = formData.get('proposerMembershipNo') as string
    const seconderName = formData.get('seconderName') as string
    const seconderMembershipNo = formData.get('seconderMembershipNo') as string
    
    // Personal Information
    const name = formData.get('name') as string
    const nameBangla = formData.get('nameBangla') as string
    const fatherName = formData.get('fatherName') as string
    const motherName = formData.get('motherName') as string
    const spouseName = formData.get('spouseName') as string
    const dob = formData.get('dob') as string
    const gender = formData.get('gender') as string
    const bloodGroup = formData.get('bloodGroup') as string
    const profession = formData.get('profession') as string
    
    // Contact Information
    const email = formData.get('email') as string
    const mobile = formData.get('mobile') as string
    const officeTel = formData.get('officeTel') as string
    const residenceTel = formData.get('residenceTel') as string
    
    // Professional Information
    const designation = formData.get('designation') as string
    const organization = formData.get('organization') as string
    const residenceAddress = formData.get('residenceAddress') as string
    
    // Property Information
    const propertyOwner = formData.get('propertyOwner') as string
    const propertySchedule = formData.get('propertySchedule') as string
    const relationship = formData.get('relationship') as string
    
    // Children
    const childrenStr = formData.get('children') as string
    let children = []
    try {
      children = childrenStr ? JSON.parse(childrenStr) : []
    } catch {
      children = []
    }

    // Validate required fields
    if (!name || !membershipType || !declaration) {
      return NextResponse.json(
        { data: null, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Handle file uploads (only images)
    const uploadFile = async (file: File, folder: string): Promise<string | null> => {
      if (!file) return null
      
      // Only accept image files
      if (!file.type.startsWith('image/')) {
        console.warn(`File ${file.name} is not an image, skipping upload`)
        return null
      }

      try {
        const timestamp = Date.now()
        const randomString = Math.random().toString(36).substring(2, 15)
        const fileExt = file.name.split('.').pop()
        const fileName = `${folder}/${timestamp}-${randomString}.${fileExt}`

        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const { error: uploadError } = await supabaseServer.storage
          .from('membership-documents')
          .upload(fileName, buffer, {
            contentType: file.type,
            upsert: false,
          })

        if (uploadError) {
          console.error(`Error uploading ${folder}:`, uploadError)
          return null
        }

        const { data: urlData } = supabaseServer.storage
          .from('membership-documents')
          .getPublicUrl(fileName)

        return urlData.publicUrl
      } catch (error) {
        console.error(`Error uploading ${folder}:`, error)
        return null
      }
    }

    // Upload only image files
    const photoUrl = formData.get('photo') instanceof File 
      ? await uploadFile(formData.get('photo') as File, 'photos')
      : null

    // Note: NID, tax receipt, lease agreement, trade license, TIN/BIN are not uploaded
    // as per requirement - only images are stored

    // Insert application into database
    const { data, error } = await supabaseServer
      .from('membership_applications')
      .insert({
        membership_type: membershipType,
        status: 'pending',
        name,
        name_bangla: nameBangla || null,
        gender: gender === 'Male' ? 'M' : gender === 'Female' ? 'F' : null,
        date_of_birth: dob || null,
        blood_group: bloodGroup || null,
        spouse_name: spouseName || null,
        father_name: fatherName || null,
        mother_name: motherName || null,
        profession: profession || null,
        email: email || null,
        mobile: mobile || null,
        office_tel: officeTel || null,
        residence_tel: residenceTel || null,
        residence_address: residenceAddress || null,
        organization: organization || null,
        designation: designation || null,
        property_owner: propertyOwner || null,
        property_schedule: propertySchedule || null,
        relationship_to_property: relationship || null,
        proposer_name: proposerName || null,
        proposer_membership_no: proposerMembershipNo || null,
        seconder_name: seconderName || null,
        seconder_membership_no: seconderMembershipNo || null,
        photo_url: photoUrl,
        children: children.length > 0 ? children : null,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data, error: null }, { status: 201 })
  } catch (error) {
    console.error('Error creating membership application:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to create membership application' },
      { status: 500 }
    )
  }
}

// GET all membership applications
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')

    let query = supabaseServer
      .from('membership_applications')
      .select('*')
      .order('created_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({ data, error: null })
  } catch (error) {
    console.error('Error fetching membership applications:', error)
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to fetch membership applications' },
      { status: 500 }
    )
  }
}

