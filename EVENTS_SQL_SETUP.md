# Events Management - Supabase SQL Setup

This document contains all SQL queries needed to set up the events management system in Supabase.

## 1. Create Storage Bucket for Event Images

First, create a storage bucket for event images:

```sql
-- Create storage bucket for event images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'events-images',
  'events-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;
```

## 2. Storage Bucket Policies

Set up policies for the storage bucket:

```sql
-- Allow public read access to event images
CREATE POLICY "Public read access for event images"
ON storage.objects FOR SELECT
USING (bucket_id = 'events-images');

-- Allow authenticated users to upload event images
CREATE POLICY "Authenticated users can upload event images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'events-images' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to update event images
CREATE POLICY "Authenticated users can update event images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'events-images' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to delete event images
CREATE POLICY "Authenticated users can delete event images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'events-images' 
  AND auth.role() = 'authenticated'
);
```

## 3. Events Table

Create the table for events:

```sql
-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  time VARCHAR(50) NOT NULL,
  location VARCHAR(255) NOT NULL,
  image TEXT,
  tag VARCHAR(50) CHECK (tag IN ('Cultural', 'Health', 'Technology', 'Community', 'Art', 'Sports')),
  highlights TEXT[], -- Array of strings for event highlights
  status VARCHAR(20) NOT NULL CHECK (status IN ('upcoming', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index on status for faster queries
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);

-- Create index on date for sorting
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
```

## 4. Row Level Security (RLS) Policies

Set up RLS policies for the events table:

```sql
-- Allow public read access to events
CREATE POLICY "Public read access for events"
ON events FOR SELECT
USING (true);

-- Allow authenticated users to insert events
CREATE POLICY "Authenticated users can insert events"
ON events FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update events
CREATE POLICY "Authenticated users can update events"
ON events FOR UPDATE
USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete events
CREATE POLICY "Authenticated users can delete events"
ON events FOR DELETE
USING (auth.role() = 'authenticated');
```

## 5. Update Trigger for updated_at

```sql
-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_events_updated_at ON events;
CREATE TRIGGER update_events_updated_at
    BEFORE UPDATE ON events
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

## 6. Complete Setup Script (Run All at Once)

Here's a complete script you can run in Supabase SQL Editor:

```sql
-- =====================================================
-- EVENTS MANAGEMENT - COMPLETE SETUP
-- =====================================================

-- Step 1: Create Storage Bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'events-images',
  'events-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Step 2: Create Events Table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  time VARCHAR(50) NOT NULL,
  location VARCHAR(255) NOT NULL,
  image TEXT,
  tag VARCHAR(50) CHECK (tag IN ('Cultural', 'Health', 'Technology', 'Community', 'Art', 'Sports')),
  highlights TEXT[], -- Array of strings for event highlights
  status VARCHAR(20) NOT NULL CHECK (status IN ('upcoming', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Step 3: Create Indexes
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);

-- Step 4: Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Step 5: Create RLS Policies for Events Table
DROP POLICY IF EXISTS "Public read access for events" ON events;
CREATE POLICY "Public read access for events"
ON events FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert events" ON events;
CREATE POLICY "Authenticated users can insert events"
ON events FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users can update events" ON events;
CREATE POLICY "Authenticated users can update events"
ON events FOR UPDATE
USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users can delete events" ON events;
CREATE POLICY "Authenticated users can delete events"
ON events FOR DELETE
USING (auth.role() = 'authenticated');

-- Step 6: Create Storage Policies
DROP POLICY IF EXISTS "Public read access for event images" ON storage.objects;
CREATE POLICY "Public read access for event images"
ON storage.objects FOR SELECT
USING (bucket_id = 'events-images');

DROP POLICY IF EXISTS "Authenticated users can upload event images" ON storage.objects;
CREATE POLICY "Authenticated users can upload event images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'events-images' 
  AND auth.role() = 'authenticated'
);

DROP POLICY IF EXISTS "Authenticated users can update event images" ON storage.objects;
CREATE POLICY "Authenticated users can update event images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'events-images' 
  AND auth.role() = 'authenticated'
);

DROP POLICY IF EXISTS "Authenticated users can delete event images" ON storage.objects;
CREATE POLICY "Authenticated users can delete event images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'events-images' 
  AND auth.role() = 'authenticated'
);

-- Step 7: Create Update Trigger Function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 8: Create Update Trigger
DROP TRIGGER IF EXISTS update_events_updated_at ON events;
CREATE TRIGGER update_events_updated_at
    BEFORE UPDATE ON events
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

## 7. Migration Script (For Existing Tables)

If you already have an events table, run this migration to add the new fields:

```sql
-- Add tag column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'events' AND column_name = 'tag'
  ) THEN
    ALTER TABLE events ADD COLUMN tag VARCHAR(50) CHECK (tag IN ('Cultural', 'Health', 'Technology', 'Community', 'Art', 'Sports'));
  END IF;
END $$;

-- Add highlights column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'events' AND column_name = 'highlights'
  ) THEN
    ALTER TABLE events ADD COLUMN highlights TEXT[];
  END IF;
END $$;
```

## 8. Verification Queries

Run these queries to verify the setup:

```sql
-- Check if table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_name = 'events'
);

-- Check if bucket exists
SELECT * FROM storage.buckets WHERE id = 'events-images';

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'events';

-- Check policies
SELECT * FROM pg_policies 
WHERE tablename = 'events';

-- Test insert (should work with authenticated user)
INSERT INTO events (title, description, date, time, location, status)
VALUES ('Test Event', 'This is a test event', CURRENT_DATE, '10:00 AM', 'Test Location', 'upcoming')
RETURNING id;
```

## 9. File Structure in Storage

Files will be organized in the storage bucket as follows:
```
events-images/
  └── [timestamp]-[random].jpg/png/webp
```

## 10. Important Notes

1. **File Size Limit**: Maximum 5MB per image
2. **Allowed File Types**: JPEG, JPG, PNG, WebP
3. **Public Access**: Event images are publicly readable
4. **Status Values**: Only 'upcoming' and 'completed' are allowed
5. **Authentication**: Only authenticated users can create, update, or delete events
6. **Public Read**: Anyone can read events (for public display)

## 11. Troubleshooting

### Issue: File upload fails
- Check bucket exists: `SELECT * FROM storage.buckets WHERE id = 'events-images'`
- Verify policies allow authenticated uploads
- Check file size is under 5MB
- Verify file type is allowed

### Issue: Cannot insert/update/delete event
- Verify RLS policies allow authenticated operations
- Check user is authenticated
- Verify all required fields are provided

### Issue: Cannot read events
- Verify public read policy exists
- Check RLS is enabled but public read policy is active

