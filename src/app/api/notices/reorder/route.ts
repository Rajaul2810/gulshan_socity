import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const orderedIds = body?.orderedIds
    if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
      return NextResponse.json(
        { data: null, error: 'orderedIds must be a non-empty array' },
        { status: 400 }
      )
    }
    const ids = orderedIds.filter(
      (id: unknown): id is string => typeof id === 'string' && id.length > 0
    )
    if (ids.length !== orderedIds.length || new Set(ids).size !== ids.length) {
      return NextResponse.json(
        { data: null, error: 'Invalid or duplicate ids' },
        { status: 400 }
      )
    }

    const updates = ids.map((id, index) =>
      supabaseServer.from('notices').update({ sort_order: index }).eq('id', id)
    )
    const results = await Promise.all(updates)
    const failed = results.find((r) => r.error)
    if (failed?.error) throw failed.error

    return NextResponse.json({ data: { ok: true }, error: null })
  } catch (error) {
    console.error('Reorder notices:', error)
    return NextResponse.json(
      {
        data: null,
        error:
          error instanceof Error ? error.message : 'Failed to reorder notices',
      },
      { status: 500 }
    )
  }
}
