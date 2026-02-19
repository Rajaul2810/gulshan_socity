import { importZone3Members } from '../src/lib/utils/importZone3Members'

async function main() {
  console.log('Starting Zone 3 member import...')
  
  const result = await importZone3Members()
  
  console.log('\n=== Import Results ===')
  console.log(`Success: ${result.success}`)
  console.log(`Imported: ${result.imported} members`)
  console.log(`Skipped: ${result.skipped} members`)
  
  if (result.errors.length > 0) {
    console.log(`\nErrors (${result.errors.length}):`)
    result.errors.forEach((error, index) => {
      console.log(`${index + 1}. ${error}`)
    })
  }
  
  process.exit(result.success ? 0 : 1)
}

main().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
