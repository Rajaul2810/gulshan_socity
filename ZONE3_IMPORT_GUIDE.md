# Zone 3 Member Import Guide

This guide explains how to import all Zone 3 members from the CSV file into your database.

## Files Created

1. **`src/lib/utils/csvParser.ts`** - CSV parser that handles multi-line entries
2. **`src/lib/utils/importZone3Members.ts`** - Main import function that maps CSV data to database
3. **`src/app/api/import/zone3/route.ts`** - API endpoint for importing
4. **`scripts/import-zone3.ts`** - Standalone script for importing

## How to Import

### Method 1: Using API Endpoint (Recommended)

1. Make sure your Supabase environment variables are set in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

2. Start your development server:
   ```bash
   npm run dev
   ```

3. Call the API endpoint:
   ```bash
   curl -X POST http://localhost:3000/api/import/zone3
   ```
   
   Or use a tool like Postman or your browser's fetch console:
   ```javascript
   fetch('/api/import/zone3', { method: 'POST' })
     .then(res => res.json())
     .then(data => console.log(data))
   ```

### Method 2: Using Standalone Script

1. Install tsx (if not already installed):
   ```bash
   npm install -D tsx
   ```

2. Run the script:
   ```bash
   npx tsx scripts/import-zone3.ts
   ```

## What Gets Imported

The script will:
- Parse the `Zone-3.csv` file
- Map CSV columns to database fields:
  - **Membership Number** → `membership_number` (unique)
  - **Name** → `name`
  - **Address** → `residence_address`
  - **Tel-Office** → `office_tel`
  - **Tel-Residence** → `residence_tel`
  - **Mobile** → `mobile`
  - **Email** → `email`
  - **Spouse** → `spouse_name`
  - **Property Address** → `property_schedule`
  - **Owner of Property** → `property_owner`
  - **Relationship** → `relationship_to_property` (normalized)
  - **Designation** → `designation`
  - **Organization** → `organization`
  - **Date of Birth** → `date_of_birth` (parsed)
  - **Blood Group** → `blood_group`
- Set default values:
  - `zone`: "Zone 3"
  - `status`: "active"
  - `membership_type`: Determined from membership number prefix (3L = Life, 3G/3S = Affiliate, 3A = Associate)

## Data Normalization

The import script automatically:
- **Membership Type**: Extracted from membership number prefix
  - `3L-` → Life Member
  - `3G-` or `3S-` → Affiliate Member
  - `3A-` → Associate Member
- **Relationship**: Normalized to match database enum values
  - "Self", "Spouse", "Father", "Mother", "Son", "Daughter", "Brother", "Sister", "Other"
- **Phone Numbers**: Cleaned (removes "Expired" text, normalizes spaces)
- **Email**: Lowercased and trimmed
- **Dates**: Parsed from various formats (DD MMM YYYY, DD/MM/YYYY, etc.)

## Handling Duplicates

The script uses `upsert` with `membership_number` as the conflict key. This means:
- If a member with the same membership number exists, it will be updated
- If not, a new member will be inserted

## Error Handling

The script will:
- Continue importing even if some records fail
- Collect all errors and report them at the end
- Skip records without membership numbers or names
- Log progress to console

## Expected Output

After running the import, you should see:
```
Starting Zone 3 member import...
Found 367 members to import
Imported: 3L-01012 - Shaikh Fazlur Rahman
Imported: 3L-01013 - Dr. Zaidi Sattar
...

=== Import Results ===
Success: true
Imported: 367 members
Skipped: 0 members
```

## Troubleshooting

### "Cannot find module" errors
- Make sure you're running from the project root
- Check that all files are in the correct locations

### Database connection errors
- Verify your Supabase credentials in `.env.local`
- Check that the `members` table exists in your database
- Ensure Row Level Security policies allow inserts

### CSV parsing errors
- The CSV file should be at `src/lib/data/Zone-3.csv`
- Check that the file encoding is UTF-8
- Verify the CSV structure matches the expected format

### Import errors
- Check the error messages in the output
- Common issues:
  - Missing required fields
  - Invalid date formats
  - Database constraint violations

## Next Steps

After importing:
1. Verify the data in your Supabase dashboard
2. Check the member list page to see imported members
3. Review any errors and fix data issues if needed
4. Consider importing other zones using similar scripts
