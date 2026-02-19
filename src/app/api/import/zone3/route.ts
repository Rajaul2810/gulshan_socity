import { NextRequest, NextResponse } from 'next/server'
import { importZone3Members } from '@/lib/utils/importZone3Members'

export async function POST(request: NextRequest) {
  try {
    const result = await importZone3Members()
    
    return NextResponse.json({
      success: result.success,
      message: `Import completed. ${result.imported} members imported, ${result.skipped} skipped.`,
      data: {
        imported: result.imported,
        skipped: result.skipped,
        errors: result.errors
      }
    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to import members',
        error: errorMessage
      },
      { status: 500 }
    )
  }
}
