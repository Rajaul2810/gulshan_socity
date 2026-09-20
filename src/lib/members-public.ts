/** Fields safe to expose on public member list APIs. Excludes email/phone contact PII. */
export const PUBLIC_MEMBER_COLUMNS = [
  'id',
  'membership_number',
  'membership_type',
  'zone',
  'name',
  'name_bangla',
  'residence_address',
  'property_schedule',
  'membership_date',
  'status',
  'photo_url',
  'created_at',
  'updated_at',
].join(', ')

const SENSITIVE_MEMBER_KEYS = [
  'email',
  'mobile',
  'office_tel',
  'phone',
] as const

export function stripMemberContactPii<T extends Record<string, unknown>>(
  member: T
): Omit<T, (typeof SENSITIVE_MEMBER_KEYS)[number]> {
  const cleaned = { ...member }
  for (const key of SENSITIVE_MEMBER_KEYS) {
    delete cleaned[key]
  }
  return cleaned
}

export function stripMembersContactPii<T extends Record<string, unknown>>(
  members: T[]
): Array<Omit<T, (typeof SENSITIVE_MEMBER_KEYS)[number]>> {
  return members.map(stripMemberContactPii)
}
