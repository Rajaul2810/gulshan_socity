# Gallery Management - Supabase SQL Setup

This document contains all SQL queries needed to set up the gallery management system in Supabase.

## 1. Create Storage Bucket for Gallery Images

First, create a storage bucket for gallery images:

```sql
-- Create storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'gallery-images',
  'gallery-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;
```

## 2. Storage Bucket Policies

Set up policies for the storage bucket:

```sql
-- Allow public read access to gallery images
CREATE POLICY "Public read access for gallery images"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery-images');

-- Allow authenticated users to upload gallery images
CREATE POLICY "Authenticated users can upload gallery images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'gallery-images' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to update gallery images
CREATE POLICY "Authenticated users can update gallery images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'gallery-images' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to delete gallery images
CREATE POLICY "Authenticated users can delete gallery images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'gallery-images' 
  AND auth.role() = 'authenticated'
);
```

## 3. Gallery Table

Create the table for gallery items:

```sql
-- Create gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  type VARCHAR(10) NOT NULL CHECK (type IN ('image', 'video')),
  image TEXT,
  video_link TEXT,
  date DATE NOT NULL,
  tag VARCHAR(50) CHECK (tag IN ('Cultural', 'Health', 'Technology', 'Community', 'Art', 'Sports')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  CONSTRAINT check_image_video CHECK (
    (type = 'image' AND image IS NOT NULL) OR 
    (type = 'video' AND video_link IS NOT NULL)
  )
);

-- Create index on type for faster queries
CREATE INDEX IF NOT EXISTS idx_gallery_type ON gallery(type);

-- Create index on date for sorting
CREATE INDEX IF NOT EXISTS idx_gallery_date ON gallery(date);

-- Create index on tag for filtering
CREATE INDEX IF NOT EXISTS idx_gallery_tag ON gallery(tag);

-- Enable Row Level Security
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
```

## 4. Row Level Security (RLS) Policies

Set up RLS policies for the gallery table:

```sql
-- Allow public read access to gallery items
CREATE POLICY "Public read access for gallery"
ON gallery FOR SELECT
USING (true);

-- Allow authenticated users to insert gallery items
CREATE POLICY "Authenticated users can insert gallery"
ON gallery FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update gallery items
CREATE POLICY "Authenticated users can update gallery"
ON gallery FOR UPDATE
USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete gallery items
CREATE POLICY "Authenticated users can delete gallery"
ON gallery FOR DELETE
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
DROP TRIGGER IF EXISTS update_gallery_updated_at ON gallery;
CREATE TRIGGER update_gallery_updated_at
    BEFORE UPDATE ON gallery
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

## 6. Complete Setup Script (Run All at Once)

Here's a complete script you can run in Supabase SQL Editor:

```sql
-- =====================================================
-- GALLERY MANAGEMENT - COMPLETE SETUP
-- =====================================================

-- Step 1: Create Storage Bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'gallery-images',
  'gallery-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Step 2: Create Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  type VARCHAR(10) NOT NULL CHECK (type IN ('image', 'video')),
  image TEXT,
  video_link TEXT,
  date DATE NOT NULL,
  tag VARCHAR(50) CHECK (tag IN ('Cultural', 'Health', 'Technology', 'Community', 'Art', 'Sports')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  CONSTRAINT check_image_video CHECK (
    (type = 'image' AND image IS NOT NULL) OR 
    (type = 'video' AND video_link IS NOT NULL)
  )
);

-- Step 3: Create Indexes
CREATE INDEX IF NOT EXISTS idx_gallery_type ON gallery(type);
CREATE INDEX IF NOT EXISTS idx_gallery_date ON gallery(date);
CREATE INDEX IF NOT EXISTS idx_gallery_tag ON gallery(tag);

-- Step 4: Enable Row Level Security
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Step 5: Create RLS Policies for Gallery Table
DROP POLICY IF EXISTS "Public read access for gallery" ON gallery;
CREATE POLICY "Public read access for gallery"
ON gallery FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert gallery" ON gallery;
CREATE POLICY "Authenticated users can insert gallery"
ON gallery FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users can update gallery" ON gallery;
CREATE POLICY "Authenticated users can update gallery"
ON gallery FOR UPDATE
USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users can delete gallery" ON gallery;
CREATE POLICY "Authenticated users can delete gallery"
ON gallery FOR DELETE
USING (auth.role() = 'authenticated');

-- Step 6: Create Storage Policies
DROP POLICY IF EXISTS "Public read access for gallery images" ON storage.objects;
CREATE POLICY "Public read access for gallery images"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery-images');

DROP POLICY IF EXISTS "Authenticated users can upload gallery images" ON storage.objects;
CREATE POLICY "Authenticated users can upload gallery images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'gallery-images' 
  AND auth.role() = 'authenticated'
);

DROP POLICY IF EXISTS "Authenticated users can update gallery images" ON storage.objects;
CREATE POLICY "Authenticated users can update gallery images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'gallery-images' 
  AND auth.role() = 'authenticated'
);

DROP POLICY IF EXISTS "Authenticated users can delete gallery images" ON storage.objects;
CREATE POLICY "Authenticated users can delete gallery images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'gallery-images' 
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
DROP TRIGGER IF EXISTS update_gallery_updated_at ON gallery;
CREATE TRIGGER update_gallery_updated_at
    BEFORE UPDATE ON gallery
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

## 7. Verification Queries

Run these queries to verify the setup:

```sql
-- Check if table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_name = 'gallery'
);

-- Check if bucket exists
SELECT * FROM storage.buckets WHERE id = 'gallery-images';

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'gallery';

-- Check policies
SELECT * FROM pg_policies 
WHERE tablename = 'gallery';

-- Test insert image (should work with authenticated user)
INSERT INTO gallery (title, type, image, date)
VALUES ('Test Image', 'image', 'https://example.com/image.jpg', CURRENT_DATE)
RETURNING id;

-- Test insert video (should work with authenticated user)
INSERT INTO gallery (title, type, video_link, date)
VALUES ('Test Video', 'video', 'https://www.youtube.com/watch?v=test', CURRENT_DATE)
RETURNING id;
```

## 8. File Structure in Storage

Files will be organized in the storage bucket as follows:
```
gallery-images/
  └── [timestamp]-[random].jpg/png/webp
```

## 9. Important Notes

1. **File Size Limit**: Maximum 5MB per image
2. **Allowed File Types**: JPEG, JPG, PNG, WebP
3. **Public Access**: Gallery images are publicly readable
4. **Type Values**: Only 'image' and 'video' are allowed
5. **Tag Values**: Cultural, Health, Technology, Community, Art, Sports (same as events)
6. **Validation**: 
   - Image type requires `image` field to be NOT NULL
   - Video type requires `video_link` field to be NOT NULL
7. **Authentication**: Only authenticated users can create, update, or delete gallery items
8. **Public Read**: Anyone can read gallery items (for public display)

## 10. Troubleshooting

### Issue: File upload fails
- Check bucket exists: `SELECT * FROM storage.buckets WHERE id = 'gallery-images'`
- Verify policies allow authenticated uploads
- Check file size is under 5MB
- Verify file type is allowed

### Issue: Cannot insert/update/delete gallery item
- Verify RLS policies allow authenticated operations
- Check user is authenticated
- Verify all required fields are provided
- For images: ensure `image` field is provided
- For videos: ensure `video_link` field is provided

### Issue: Cannot read gallery items
- Verify public read policy exists
- Check RLS is enabled but public read policy is active

