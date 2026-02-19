export interface Zone3Member {
  slNo: string
  membershipNo: string
  name: string
  address: string
  telOffice: string
  telResidence: string
  mobile: string
  email: string
  spouse: string
  propertyAddress: string
  propertyOwner: string
  relationshipToProperty: string
  designation: string
  organization: string
  dateOfBirth: string
  bloodGroup: string
}

export function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    const nextChar = line[i + 1]
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  
  result.push(current.trim())
  return result
}

export function parseZone3CSV(csvContent: string): Zone3Member[] {
  const members: Zone3Member[] = []
  const lines = csvContent.split('\n')
  
  let currentRow = ''
  let inQuotes = false
  
  for (let i = 3; i < lines.length; i++) {
    const line = lines[i]
    
    if (!line.trim() && !inQuotes) {
      continue
    }
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j]
      const nextChar = line[j + 1]
      
      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          currentRow += '"'
          j++
        } else {
          inQuotes = !inQuotes
          currentRow += char
        }
      } else {
        currentRow += char
      }
    }
    
    if (!inQuotes) {
      const columns = parseCSVLine(currentRow)
      
      if (columns.length >= 3 && columns[0] && !isNaN(Number(columns[0]))) {
        const member: Zone3Member = {
          slNo: columns[0] || '',
          membershipNo: columns[1] || '',
          name: columns[2] || '',
          address: columns[3] || '',
          telOffice: columns[4] || '',
          telResidence: columns[5] || '',
          mobile: columns[6] || '',
          email: columns[7] || '',
          spouse: columns[8] || '',
          propertyAddress: columns[9] || '',
          propertyOwner: columns[10] || '',
          relationshipToProperty: columns[11] || '',
          designation: columns[12] || '',
          organization: columns[13] || '',
          dateOfBirth: columns[14] || '',
          bloodGroup: columns[15] || ''
        }
        
        if (member.membershipNo && member.membershipNo.trim()) {
          members.push(member)
        }
      }
      
      currentRow = ''
    } else {
      currentRow += '\n'
    }
  }
  
  if (currentRow && !inQuotes) {
    const columns = parseCSVLine(currentRow)
    if (columns.length >= 3 && columns[0] && !isNaN(Number(columns[0]))) {
      const member: Zone3Member = {
        slNo: columns[0] || '',
        membershipNo: columns[1] || '',
        name: columns[2] || '',
        address: columns[3] || '',
        telOffice: columns[4] || '',
        telResidence: columns[5] || '',
        mobile: columns[6] || '',
        email: columns[7] || '',
        spouse: columns[8] || '',
        propertyAddress: columns[9] || '',
        propertyOwner: columns[10] || '',
        relationshipToProperty: columns[11] || '',
        designation: columns[12] || '',
        organization: columns[13] || '',
        dateOfBirth: columns[14] || '',
        bloodGroup: columns[15] || ''
      }
      
      if (member.membershipNo && member.membershipNo.trim()) {
        members.push(member)
      }
    }
  }
  
  return members
}
