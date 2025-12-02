# News Management - Supabase SQL Setup

This document contains all SQL queries needed to set up the news management system in Supabase.

## 1. Create Storage Bucket for News Images

First, create a storage bucket for news images:

```sql
-- Create storage bucket for news images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'news-images',
  'news-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;
```

## 2. Storage Bucket Policies

Set up policies for the storage bucket:

```sql
-- Allow public read access to news images
CREATE POLICY "Public read access for news images"
ON storage.objects FOR SELECT
USING (bucket_id = 'news-images');

-- Allow authenticated users to upload news images
CREATE POLICY "Authenticated users can upload news images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'news-images' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to update news images
CREATE POLICY "Authenticated users can update news images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'news-images' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to delete news images
CREATE POLICY "Authenticated users can delete news images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'news-images' 
  AND auth.role() = 'authenticated'
);
```

## 3. News Table

Create the table for news articles:

```sql
-- Create news table
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image TEXT,
  source VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  news_link TEXT,
  status VARCHAR(20) NOT NULL CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index on status for faster queries
CREATE INDEX IF NOT EXISTS idx_news_status ON news(status);

-- Create index on date for sorting
CREATE INDEX IF NOT EXISTS idx_news_date ON news(date);

-- Enable Row Level Security
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
```

## 4. Row Level Security (RLS) Policies

Set up RLS policies for the news table:

```sql
-- Allow public read access to published news
CREATE POLICY "Public read access for published news"
ON news FOR SELECT
USING (status = 'published');

-- Allow authenticated users to read all news
CREATE POLICY "Authenticated users can read all news"
ON news FOR SELECT
USING (auth.role() = 'authenticated');

-- Allow authenticated users to insert news
CREATE POLICY "Authenticated users can insert news"
ON news FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update news
CREATE POLICY "Authenticated users can update news"
ON news FOR UPDATE
USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete news
CREATE POLICY "Authenticated users can delete news"
ON news FOR DELETE
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
DROP TRIGGER IF EXISTS update_news_updated_at ON news;
CREATE TRIGGER update_news_updated_at
    BEFORE UPDATE ON news
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

## 6. Complete Setup Script (Run All at Once)

Here's a complete script you can run in Supabase SQL Editor:

```sql
-- =====================================================
-- NEWS MANAGEMENT - COMPLETE SETUP
-- =====================================================

-- Step 1: Create Storage Bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'news-images',
  'news-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Step 2: Create News Table
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image TEXT,
  source VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  news_link TEXT,
  status VARCHAR(20) NOT NULL CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Step 3: Create Indexes
CREATE INDEX IF NOT EXISTS idx_news_status ON news(status);
CREATE INDEX IF NOT EXISTS idx_news_date ON news(date);

-- Step 4: Enable Row Level Security
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Step 5: Create RLS Policies for News Table
DROP POLICY IF EXISTS "Public read access for published news" ON news;
CREATE POLICY "Public read access for published news"
ON news FOR SELECT
USING (status = 'published');

DROP POLICY IF EXISTS "Authenticated users can read all news" ON news;
CREATE POLICY "Authenticated users can read all news"
ON news FOR SELECT
USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users can insert news" ON news;
CREATE POLICY "Authenticated users can insert news"
ON news FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users can update news" ON news;
CREATE POLICY "Authenticated users can update news"
ON news FOR UPDATE
USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users can delete news" ON news;
CREATE POLICY "Authenticated users can delete news"
ON news FOR DELETE
USING (auth.role() = 'authenticated');

-- Step 6: Create Storage Policies
DROP POLICY IF EXISTS "Public read access for news images" ON storage.objects;
CREATE POLICY "Public read access for news images"
ON storage.objects FOR SELECT
USING (bucket_id = 'news-images');

DROP POLICY IF EXISTS "Authenticated users can upload news images" ON storage.objects;
CREATE POLICY "Authenticated users can upload news images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'news-images' 
  AND auth.role() = 'authenticated'
);

DROP POLICY IF EXISTS "Authenticated users can update news images" ON storage.objects;
CREATE POLICY "Authenticated users can update news images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'news-images' 
  AND auth.role() = 'authenticated'
);

DROP POLICY IF EXISTS "Authenticated users can delete news images" ON storage.objects;
CREATE POLICY "Authenticated users can delete news images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'news-images' 
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
DROP TRIGGER IF EXISTS update_news_updated_at ON news;
CREATE TRIGGER update_news_updated_at
    BEFORE UPDATE ON news
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

## 7. Verification Queries

Run these queries to verify the setup:

```sql
-- Check if table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_name = 'news'
);

-- Check if bucket exists
SELECT * FROM storage.buckets WHERE id = 'news-images';

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'news';

-- Check policies
SELECT * FROM pg_policies 
WHERE tablename = 'news';

-- Test insert (should work with authenticated user)
INSERT INTO news (title, description, source, date, status)
VALUES ('Test News', 'This is a test news article', 'Test Source', CURRENT_DATE, 'draft')
RETURNING id;
```

## 8. File Structure in Storage

Files will be organized in the storage bucket as follows:
```
news-images/
  └── [timestamp]-[random].jpg/png/webp
```

## 9. Important Notes

1. **File Size Limit**: Maximum 5MB per image
2. **Allowed File Types**: JPEG, JPG, PNG, WebP
3. **Public Access**: News images are publicly readable
4. **Status Values**: Only 'draft' and 'published' are allowed
5. **Authentication**: Only authenticated users can create, update, or delete news
6. **Public Read**: Only published news articles are publicly readable
7. **Authenticated Read**: Authenticated users can read all news (including drafts)

## 10. Troubleshooting

### Issue: File upload fails
- Check bucket exists: `SELECT * FROM storage.buckets WHERE id = 'news-images'`
- Verify policies allow authenticated uploads
- Check file size is under 5MB
- Verify file type is allowed

### Issue: Cannot insert/update/delete news
- Verify RLS policies allow authenticated operations
- Check user is authenticated
- Verify all required fields are provided

### Issue: Cannot read published news
- Verify public read policy exists for published news
- Check RLS is enabled but public read policy is active

