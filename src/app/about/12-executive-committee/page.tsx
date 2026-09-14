import React from 'react'
import {
  UserGroupIcon,
  MapPinIcon,
  ShieldCheckIcon,
  StarIcon,
} from '@heroicons/react/24/outline'
import { gulshanSocietyCommittees } from '@/lib/data/committee'

// const formatContact = (value: string | string[] | null | undefined) => {
//   if (!value) return null
//   return Array.isArray(value) ? value.filter(Boolean).join(', ') : value
// }

const isOfficeBearer = (designation: string) => {
  const role = designation.toLowerCase()
  return (
    role.includes('president') ||
    role.includes('secretary') ||
    role.includes('treasurer')
  )
}

const ExecutiveCommittee = () => {
  const committee = gulshanSocietyCommittees.find(
    (c) => c.committee_term === '12th Executive Committee'
  )

  const members = committee?.members ?? []
  const president = members.find((m) => m.designation === 'President')
  const officers = members.filter(
    (m) => m.designation !== 'President' && isOfficeBearer(m.designation)
  )
  const otherMembers = members.filter((m) => !isOfficeBearer(m.designation))

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.12),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.15),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/15 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-white/20">
              <ShieldCheckIcon className="w-4 h-4" />
              <span>Main Governing Body · 2026–2028</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 tracking-tight">
              12th Executive Committee
            </h1>

            <p className="text-lg sm:text-xl text-white/85 max-w-2xl leading-relaxed">
              The elected leadership of Gulshan Society — guiding civic services,
              community welfare, and the day-to-day stewardship of our neighbourhood.
            </p>

            <div className="mt-8 flex flex-wrap gap-6 text-white/90">
              <div>
                <div className="text-3xl font-bold text-white">{members.length}</div>
                <div className="text-sm uppercase tracking-wide text-white/70">Members</div>
              </div>
              <div className="w-px bg-white/25" />
              <div>
                <div className="text-3xl font-bold text-white">{officers.length + (president ? 1 : 0)}</div>
                <div className="text-sm uppercase tracking-wide text-white/70">Office Bearers</div>
              </div>
              <div className="w-px bg-white/25" />
              <div>
                <div className="text-3xl font-bold text-white">6</div>
                <div className="text-sm uppercase tracking-wide text-white/70">Zones</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {president && (
        <section className="relative -mt-10 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl shadow-2xl border border-primary/15 overflow-hidden">
              <div className="grid lg:grid-cols-[280px_1fr]">
                <div className="bg-gradient-to-br from-primary to-primary-800 p-8 flex flex-col items-center justify-center text-center text-white">
                  <div className="w-28 h-28 rounded-full bg-white/15 border-4 border-white/30 flex items-center justify-center mb-4">
                    <span className="text-4xl font-bold">
                      {president.name.charAt(0)}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
                    <StarIcon className="w-3.5 h-3.5" />
                    President
                  </div>
                  <p className="text-sm text-white/70">{president.membership_no}</p>
                </div>

                <div className="p-8 sm:p-10">
                  <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                    Head of the Executive Committee
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                    {president.name}
                  </h2>

                  <div className="space-y-3 max-w-2xl">
                    {president.address && (
                      <div className="flex items-start gap-3 text-gray-600">
                        <MapPinIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-base leading-relaxed">{president.address}</p>
                      </div>
                    )}
                    {/* {formatContact(president.mobile) && (
                      <div className="flex items-start gap-3 text-gray-600">
                        <PhoneIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-base">{formatContact(president.mobile)}</p>
                      </div>
                    )}
                    {formatContact(president.email) && (
                      <div className="flex items-start gap-3 text-gray-600">
                        <EnvelopeIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-base break-all">{formatContact(president.email)}</p>
                      </div>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {officers.length > 0 && (
        <section className="py-12 bg-gradient-to-b from-primary-50/60 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <UserGroupIcon className="w-6 h-6 text-primary" />
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Office Bearers
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {officers.map((member, index) => (
                <article
                  key={`${member.membership_no}-${index}`}
                  className="group relative bg-white rounded-2xl border border-primary/20 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-primary-600 to-primary-800" />
                  <div className="p-6 pt-7">
                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-primary/25 flex-shrink-0">
                        {member.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <span className="inline-block mb-2 px-2.5 py-1 rounded-md bg-primary-100 text-primary text-xs font-bold uppercase tracking-wide">
                          {member.designation}
                        </span>
                        <h4 className="text-lg font-bold text-gray-900 leading-snug">
                          {member.name}
                        </h4>
                        {member.membership_no && (
                          <p className="text-xs text-gray-500 mt-1">{member.membership_no}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2.5 border-t border-gray-100 pt-4">
                      {member.address && (
                        <div className="flex items-start gap-2 text-gray-600">
                          <MapPinIcon className="w-4 h-4 text-primary/70 flex-shrink-0 mt-0.5" />
                          <p className="text-sm leading-relaxed">{member.address}</p>
                        </div>
                      )}
                      {/* {formatContact(member.mobile) && (
                        <div className="flex items-start gap-2 text-gray-600">
                          <PhoneIcon className="w-4 h-4 text-primary/70 flex-shrink-0 mt-0.5" />
                          <p className="text-sm">{formatContact(member.mobile)}</p>
                        </div>
                      )}
                      {formatContact(member.email) && (
                        <div className="flex items-start gap-2 text-gray-600">
                          <EnvelopeIcon className="w-4 h-4 text-primary/70 flex-shrink-0 mt-0.5" />
                          <p className="text-sm break-all">{formatContact(member.email)}</p>
                        </div>
                      )} */}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {otherMembers.length > 0 && (
        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Executive Members &amp; Zonal Chairmen
              </h3>
              <p className="text-gray-600">
                Representing the society across Gulshan&apos;s six zones.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {otherMembers.map((member, index) => (
                <article
                  key={`${member.membership_no}-${index}`}
                  className="bg-gray-50 hover:bg-white rounded-2xl border border-gray-200 hover:border-primary/30 p-5 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary-100 text-primary flex items-center justify-center font-bold flex-shrink-0">
                      {member.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-0.5">
                        {member.designation}
                      </p>
                      <h4 className="font-bold text-gray-900 leading-snug">
                        {member.name}
                      </h4>
                    </div>
                  </div>

                  {member.address && (
                    <div className="flex items-start gap-2 text-gray-600 mb-2">
                      <MapPinIcon className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm leading-relaxed">{member.address}</p>
                    </div>
                  )}
                  {/* {formatContact(member.mobile) && (
                    <div className="flex items-start gap-2 text-gray-600 mb-2">
                      <PhoneIcon className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">{formatContact(member.mobile)}</p>
                    </div>
                  )}
                  {formatContact(member.email) && (
                    <div className="flex items-start gap-2 text-gray-600">
                      <EnvelopeIcon className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm break-all">{formatContact(member.email)}</p>
                    </div>
                  )} */}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {!committee && (
        <section className="py-20 text-center">
          <p className="text-gray-600">12th Executive Committee data is not available.</p>
        </section>
      )}
    </div>
  )
}

export default ExecutiveCommittee
