'use client'

import React, { useState } from 'react'
import {
  MapPinIcon,
  UserCircleIcon,
  BuildingOffice2Icon,
} from '@heroicons/react/24/outline'
import { zonalCommittees } from '@/lib/data/committee'

const shortZoneName = (term: string) => {
  const match = term.match(/Zone-(\d+)/i)
  return match ? `Zone ${match[1]}` : term.replace(/\s*\(2026-2028\)\s*$/, '').trim()
}

const ZonalCommittees = () => {
  const [selectedTerm, setSelectedTerm] = useState<string | null>(
    zonalCommittees.length > 0 ? zonalCommittees[0].committee_term : null
  )

  const selectedCommittee = zonalCommittees.find(
    (committee) => committee.committee_term === selectedTerm
  )

  return (
    <div className="min-h-screen bg-white">
      <section className="relative py-20 bg-gradient-to-br from-primary-50 via-white to-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BuildingOffice2Icon className="w-4 h-4" />
              <span>Zonal Committees (2026–2028)</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-primary">Zonal Committees</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Meet the members serving across Gulshan Society&apos;s six zones,
              supporting local coordination and community activities.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Select a <span className="text-primary">Zone</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose a zone to view its chairman, officers, and committee members.
            </p>
          </div>

          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              {zonalCommittees.map((committee) => (
                <button
                  key={committee.committee_term}
                  onClick={() => setSelectedTerm(committee.committee_term)}
                  className={`min-w-[110px] px-5 py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${
                    selectedTerm === committee.committee_term
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {shortZoneName(committee.committee_term)}
                </button>
              ))}
            </div>
          </div>

          {selectedCommittee && (
            <div>
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {selectedCommittee.committee_term}
                </h3>
                <p className="text-gray-600">
                  {selectedCommittee.members.length} Members
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedCommittee.members.map((member, index) => (
                  <div
                    key={`${member.membership_no}-${index}`}
                    className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-primary-300"
                  >
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center">
                          <UserCircleIcon className="w-8 h-8 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-bold text-gray-900 mb-1">
                          {member.name}
                        </h4>
                        <p className="text-sm font-semibold text-primary mb-1">
                          {member.designation}
                        </p>
                        {member.membership_no && (
                          <p className="text-xs text-gray-500">
                            {member.membership_no}
                          </p>
                        )}
                      </div>
                    </div>

                    {member.address && (
                      <div className="flex items-start space-x-2 text-gray-600">
                        <MapPinIcon className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm leading-relaxed">{member.address}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {!selectedCommittee && (
            <div className="text-center py-12">
              <p className="text-gray-600">No zonal committee data available</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default ZonalCommittees
