/** Strip email/phone contact PII from public member API responses. */
const SENSITIVE_MEMBER_KEYS = [
  'email',
  'mobile',
  'office_tel',
  'phone',
] as const

export function stripMemberContactPii(member: unknown): Record<string, unknown> {
  const cleaned = { ...(member as Record<string, unknown>) }
  for (const key of SENSITIVE_MEMBER_KEYS) {
    delete cleaned[key]
  }
  return cleaned
}

export function stripMembersContactPii(members: unknown[]): Record<string, unknown>[] {
  return members.map(stripMemberContactPii)
}
