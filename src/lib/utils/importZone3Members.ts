import { supabaseServer } from '../supabase/server'
import { parseZone3CSV } from './csvParser'
import fs from 'fs'
import path from 'path'

function normalizeMembershipType(membershipNo: string): string {
  if (membershipNo.startsWith('3L-')) return 'Life'
  if (membershipNo.startsWith('3G-')) return 'Affiliate'
  if (membershipNo.startsWith('3A-')) return 'Associate'
  if (membershipNo.startsWith('3S-')) return 'Affiliate'
  return 'Life'
}

function normalizeRelationship(relationship: string): string {
  const rel = relationship?.trim() || ''
  if (!rel || rel === 'N/A' || rel === 'unk.') return 'Other'
  
  const relLower = rel.toLowerCase()
  if (relLower.includes('self')) return 'Self'
  if (relLower.includes('spouse')) return 'Spouse'
  if (relLower.includes('father')) return 'Father'
  if (relLower.includes('mother')) return 'Mother'
  if (relLower.includes('son')) return 'Son'
  if (relLower.includes('daughter')) return 'Daughter'
  if (relLower.includes('brother')) return 'Brother'
  if (relLower.includes('sister')) return 'Sister'
  
  return 'Other'
}

function parseDate(dateStr: string): string | null {
  if (!dateStr || !dateStr.trim()) return null
  
  const cleaned = dateStr.trim()
  
  const formats = [
    /(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{4})/i,
    /(\d{1,2})\/(\d{1,2})\/(\d{4})/,
    /(\d{1,2})-(\d{1,2})-(\d{4})/,
    /(\d{4})-(\d{1,2})-(\d{1,2})/
  ]
  
  const months: { [key: string]: string } = {
    'jan': '01', 'feb': '02', 'mar': '03', 'apr': '04',
    'may': '05', 'jun': '06', 'jul': '07', 'aug': '08',
    'sep': '09', 'oct': '10', 'nov': '11', 'dec': '12'
  }
  
  for (const format of formats) {
    const match = cleaned.match(format)
    if (match) {
      if (format === formats[0]) {
        const day = match[1].padStart(2, '0')
        const month = months[match[2].toLowerCase()] || '01'
        const year = match[3]
        return `${year}-${month}-${day}`
      } else if (format === formats[1] || format === formats[2]) {
        const day = match[1].padStart(2, '0')
        const month = match[2].padStart(2, '0')
        const year = match[3]
        return `${year}-${month}-${day}`
      } else if (format === formats[3]) {
        return cleaned
      }
    }
  }
  
  return null
}

function cleanPhoneNumber(phone: string): string {
  if (!phone) return ''
  return phone.replace(/\s+/g, ' ').trim()
}

function cleanEmail(email: string): string {
  if (!email) return ''
  return email.trim().toLowerCase()
}

export async function importZone3Members(): Promise<{
  success: boolean
  imported: number
  errors: string[]
  skipped: number
}> {
  const errors: string[] = []
  let imported = 0
  let skipped = 0
  
  try {
    const csvPath = path.join(process.cwd(), 'src/lib/data/Zone-6.csv')
    const csvContent = fs.readFileSync(csvPath, 'utf-8')
    
    const members = parseZone3CSV(csvContent)
    
    console.log(`Found ${members.length} members to import`)
    
    for (const member of members) {
      try {
        if (!member.membershipNo || !member.name) {
          skipped++
          continue
        }
        
        const membershipType = normalizeMembershipType(member.membershipNo)
        const relationship = normalizeRelationship(member.relationshipToProperty)
        const dateOfBirth = parseDate(member.dateOfBirth)
        
        const memberData = {
          membership_number: member.membershipNo.trim(),
          membership_type: membershipType,
          zone: 'Zone 6',
          status: 'active',
          name: member.name.trim(),
          email: cleanEmail(member.email),
          mobile: cleanPhoneNumber(member.mobile),
          office_tel: cleanPhoneNumber(member.telOffice.replace(/Expired.*/i, '').trim()),
          residence_tel: cleanPhoneNumber(member.telResidence.replace(/Expired.*/i, '').trim()),
          residence_address: member.address.trim(),
          spouse_name: member.spouse.trim() || null,
          property_owner: member.propertyOwner.trim() || null,
          property_schedule: member.propertyAddress.trim() || null,
          relationship_to_property: relationship,
          designation: member.designation.trim() || null,
          organization: member.organization.trim() || null,
          date_of_birth: dateOfBirth,
          blood_group: member.bloodGroup.trim() || null
        }
        
        const { error } = await supabaseServer
          .from('members')
          .upsert(memberData, {
            onConflict: 'membership_number',
            ignoreDuplicates: false
          })
        
        if (error) {
          errors.push(`Error importing ${member.membershipNo} (${member.name}): ${error.message}`)
          console.error(`Error importing ${member.membershipNo}:`, error)
        } else {
          imported++
          console.log(`Imported: ${member.membershipNo} - ${member.name}`)
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        errors.push(`Error processing ${member.membershipNo}: ${errorMessage}`)
        console.error(`Error processing ${member.membershipNo}:`, error)
      }
    }
    
    return {
      success: errors.length === 0,
      imported,
      errors,
      skipped
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return {
      success: false,
      imported,
      errors: [`Failed to import: ${errorMessage}`],
      skipped
    }
  }
}
