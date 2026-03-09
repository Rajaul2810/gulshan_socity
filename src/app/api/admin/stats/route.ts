import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!supabaseUrl) {
      return NextResponse.json(
        { data: null, error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const tables = [
      { key: 'members', table: 'members' },
      { key: 'events', table: 'events' },
      { key: 'news', table: 'news' },
      { key: 'notices', table: 'notices' },
      { key: 'gallery', table: 'gallery' },
      { key: 'car_stickers', table: 'car_stickers' },
      { key: 'contact_messages', table: 'contact_messages' },
    ] as const

    const counts: Record<string, number> = {}

    await Promise.all(
      tables.map(async ({ key, table }) => {
        try {
          const { count, error } = await supabaseServer
            .from(table)
            .select('*', { count: 'exact', head: true })
          if (error) {
            counts[key] = 0
            return
          }
          counts[key] = count ?? 0
        } catch {
          counts[key] = 0
        }
      })
    )

    return NextResponse.json({
      data: {
        members: counts.members ?? 0,
        events: counts.events ?? 0,
        news: counts.news ?? 0,
        notices: counts.notices ?? 0,
        gallery: counts.gallery ?? 0,
        car_stickers: counts.car_stickers ?? 0,
        contact_messages: counts.contact_messages ?? 0,
      },
      error: null,
    })
  } catch (error) {
    console.error('Admin stats error:', error)
    return NextResponse.json(
      { data: null, error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
