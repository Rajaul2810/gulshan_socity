import React from 'react'
import Image from 'next/image'
import {
  UserGroupIcon,
  MapPinIcon,
  ShieldCheckIcon,
  StarIcon,
} from '@heroicons/react/24/outline'
import { gulshanSocietyCommittees } from '@/lib/data/committee'
import { getEc12Photo } from '@/lib/data/ec12-photos'

const isOfficeBearer = (designation: string) => {
  const role = designation.toLowerCase()
  return (
    role.includes('president') ||
    role.includes('secretary') ||
    role.includes('treasurer')
  )
}

const Avatar = ({
  src,
  name,
  size = 'md',
}: {
  src: string | null
  name: string
  size?: 'md' | 'lg' | 'xl'
}) => {
  const box = {
    md: 'w-16 h-16 sm:w-[72px] sm:h-[72px] text-xl',
    lg: 'w-20 h-20 sm:w-24 sm:h-24 text-2xl',
    xl: 'w-28 h-28 sm:w-36 sm:h-36 text-4xl',
  }[size]

  return (
    <div
      className={`relative ${box} rounded-full overflow-hidden bg-primary-100 flex-shrink-0 ring-4 ring-white shadow-md`}
    >
      {src ? (
        <Image
          src={src}
          alt={name}
          fill
          sizes="144px"
          className="object-cover object-top"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center font-bold text-primary">
          {name.charAt(0)}
        </div>
      )}
    </div>
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
  const presidentPhoto = president ? getEc12Photo(president.membership_no) : null

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.12),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.15),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
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
        <section className="relative -mt-8 pb-6">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl border border-primary/15 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-primary via-primary-600 to-primary-800" />
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 text-center sm:text-left">
                <div className="relative flex-shrink-0">
                  <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-primary to-primary-800 opacity-90" />
                  <Avatar src={presidentPhoto} name={president.name} size="xl" />
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-primary text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md whitespace-nowrap">
                    <StarIcon className="w-3 h-3" />
                    President
                  </div>
                </div>

                <div className="flex-1 min-w-0 pt-2 sm:pt-1">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                    Head of the Executive Committee
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 leading-snug">
                    {president.name}
                  </h2>
                  <p className="text-xs text-gray-500 mb-3">{president.membership_no}</p>

                  {president.address && (
                    <div className="flex items-start gap-2 text-gray-600 justify-center sm:justify-start">
                      <MapPinIcon className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm leading-relaxed">{president.address}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {officers.length > 0 && (
        <section className="py-10 bg-gradient-to-b from-primary-50/50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <UserGroupIcon className="w-6 h-6 text-primary" />
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Office Bearers
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {officers.map((member, index) => {
                const photo = getEc12Photo(member.membership_no)
                return (
                  <article
                    key={`${member.membership_no}-${index}`}
                    className="bg-white rounded-xl border border-primary/15 shadow-sm hover:shadow-md transition-shadow duration-300 p-4 sm:p-5"
                  >
                    <div className="flex items-start gap-3.5">
                      <Avatar src={photo} name={member.name} size="lg" />
                      <div className="min-w-0 flex-1 pt-0.5">
                        <span className="inline-block mb-1.5 px-2 py-0.5 rounded bg-primary-100 text-primary text-[11px] font-bold uppercase tracking-wide">
                          {member.designation}
                        </span>
                        <h4 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                          {member.name}
                        </h4>
                        {member.membership_no && (
                          <p className="text-xs text-gray-500 mt-0.5">{member.membership_no}</p>
                        )}
                      </div>
                    </div>

                    {member.address && (
                      <div className="flex items-start gap-2 text-gray-600 border-t border-gray-100 mt-3.5 pt-3.5">
                        <MapPinIcon className="w-4 h-4 text-primary/60 flex-shrink-0 mt-0.5" />
                        <p className="text-sm leading-relaxed">{member.address}</p>
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {otherMembers.length > 0 && (
        <section className="py-10 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                Executive Members &amp; Zonal Chairmen
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Representing the society across Gulshan&apos;s six zones.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {otherMembers.map((member, index) => {
                const photo = getEc12Photo(member.membership_no)
                return (
                  <article
                    key={`${member.membership_no}-${index}`}
                    className="bg-gray-50 hover:bg-white rounded-xl border border-gray-200 hover:border-primary/25 p-4 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar src={photo} name={member.name} size="md" />
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold text-primary uppercase tracking-wide mb-0.5">
                          {member.designation}
                        </p>
                        <h4 className="font-bold text-gray-900 leading-snug text-sm sm:text-base">
                          {member.name}
                        </h4>
                      </div>
                    </div>

                    {member.address && (
                      <div className="flex items-start gap-2 text-gray-600">
                        <MapPinIcon className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm leading-relaxed line-clamp-2">{member.address}</p>
                      </div>
                    )}
                  </article>
                )
              })}
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
