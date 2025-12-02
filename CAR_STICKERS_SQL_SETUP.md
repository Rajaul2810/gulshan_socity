# Car Stickers Management - Supabase SQL Setup

This document contains all SQL queries needed to set up the car stickers management system in Supabase.

## 1. Car Stickers Table

Create the table for car stickers:

```sql
-- Create car_stickers table
CREATE TABLE IF NOT EXISTS car_stickers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  car_number VARCHAR(50) NOT NULL,
  owner_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  house_number VARCHAR(50) NOT NULL,
  road_number VARCHAR(50) NOT NULL,
  issue_date DATE NOT NULL,
  expiry_date DATE,
  status VARCHAR(20) NOT NULL CHECK (status IN ('active', 'expired', 'pending')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_car_stickers_status ON car_stickers(status);
CREATE INDEX IF NOT EXISTS idx_car_stickers_car_number ON car_stickers(car_number);
CREATE INDEX IF NOT EXISTS idx_car_stickers_owner_name ON car_stickers(owner_name);
CREATE INDEX IF NOT EXISTS idx_car_stickers_issue_date ON car_stickers(issue_date);
CREATE INDEX IF NOT EXISTS idx_car_stickers_expiry_date ON car_stickers(expiry_date);
CREATE INDEX IF NOT EXISTS idx_car_stickers_created_at ON car_stickers(created_at DESC);

-- Enable Row Level Security
ALTER TABLE car_stickers ENABLE ROW LEVEL SECURITY;
```

## 2. Row Level Security (RLS) Policies

Set up RLS policies for the car_stickers table:

```sql
-- Allow public read access to active car stickers
CREATE POLICY "Public read access for active car stickers"
ON car_stickers FOR SELECT
USING (status = 'active');

-- Allow authenticated users to read all car stickers
CREATE POLICY "Authenticated users can read all car stickers"
ON car_stickers FOR SELECT
USING (auth.role() = 'authenticated');

-- Allow authenticated users to insert car stickers
CREATE POLICY "Authenticated users can insert car stickers"
ON car_stickers FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update car stickers
CREATE POLICY "Authenticated users can update car stickers"
ON car_stickers FOR UPDATE
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to delete car stickers
CREATE POLICY "Authenticated users can delete car stickers"
ON car_stickers FOR DELETE
USING (auth.role() = 'authenticated');
```

## 3. Update Trigger for updated_at

```sql
-- Create function to update updated_at timestamp (if not exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_car_stickers_updated_at ON car_stickers;
CREATE TRIGGER update_car_stickers_updated_at
    BEFORE UPDATE ON car_stickers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

## 4. Complete Setup Script (Run All at Once)

Here's a complete script you can run in Supabase SQL Editor:

```sql
-- =====================================================
-- CAR STICKERS MANAGEMENT - COMPLETE SETUP
-- =====================================================

-- Step 1: Create Car Stickers Table
CREATE TABLE IF NOT EXISTS car_stickers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  car_number VARCHAR(50) NOT NULL,
  owner_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  house_number VARCHAR(50) NOT NULL,
  road_number VARCHAR(50) NOT NULL,
  issue_date DATE NOT NULL,
  expiry_date DATE,
  status VARCHAR(20) NOT NULL CHECK (status IN ('active', 'expired', 'pending')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Step 2: Create Indexes
CREATE INDEX IF NOT EXISTS idx_car_stickers_status ON car_stickers(status);
CREATE INDEX IF NOT EXISTS idx_car_stickers_car_number ON car_stickers(car_number);
CREATE INDEX IF NOT EXISTS idx_car_stickers_owner_name ON car_stickers(owner_name);
CREATE INDEX IF NOT EXISTS idx_car_stickers_issue_date ON car_stickers(issue_date);
CREATE INDEX IF NOT EXISTS idx_car_stickers_expiry_date ON car_stickers(expiry_date);
CREATE INDEX IF NOT EXISTS idx_car_stickers_created_at ON car_stickers(created_at DESC);

-- Step 3: Enable Row Level Security
ALTER TABLE car_stickers ENABLE ROW LEVEL SECURITY;

-- Step 4: Drop existing policies if they exist
DROP POLICY IF EXISTS "Public read access for active car stickers" ON car_stickers;
DROP POLICY IF EXISTS "Authenticated users can read all car stickers" ON car_stickers;
DROP POLICY IF EXISTS "Public can insert pending car stickers" ON car_stickers;
DROP POLICY IF EXISTS "Authenticated users can insert car stickers" ON car_stickers;
DROP POLICY IF EXISTS "Authenticated users can update car stickers" ON car_stickers;
DROP POLICY IF EXISTS "Authenticated users can delete car stickers" ON car_stickers;

-- Step 5: Create RLS Policies
-- Allow public read access to active car stickers
CREATE POLICY "Public read access for active car stickers"
ON car_stickers FOR SELECT
USING (status = 'active');

-- Allow authenticated users to read all car stickers
CREATE POLICY "Authenticated users can read all car stickers"
ON car_stickers FOR SELECT
USING (auth.role() = 'authenticated');

-- Allow public users to insert car stickers with pending status
CREATE POLICY "Public can insert pending car stickers"
ON car_stickers FOR INSERT
TO public
WITH CHECK (status = 'pending');

-- Allow authenticated users to insert car stickers with any status
CREATE POLICY "Authenticated users can insert car stickers"
ON car_stickers FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update car stickers
CREATE POLICY "Authenticated users can update car stickers"
ON car_stickers FOR UPDATE
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to delete car stickers
CREATE POLICY "Authenticated users can delete car stickers"
ON car_stickers FOR DELETE
USING (auth.role() = 'authenticated');

-- Step 6: Create/Update Trigger Function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 7: Create Trigger
DROP TRIGGER IF EXISTS update_car_stickers_updated_at ON car_stickers;
CREATE TRIGGER update_car_stickers_updated_at
    BEFORE UPDATE ON car_stickers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Step 8: Verify table creation
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'car_stickers'
ORDER BY ordinal_position;

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Car stickers table setup completed successfully!';
END $$;
```

## 5. Verification Queries

Run these queries to verify the setup:

```sql
-- Check if table exists
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name = 'car_stickers'
);

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'car_stickers';

-- Check indexes
SELECT indexname, indexdef 
FROM pg_indexes 
WHERE tablename = 'car_stickers';

-- Check table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'car_stickers'
ORDER BY ordinal_position;
```

## Notes

- The `car_stickers` table stores all car sticker registrations
- Status values: `active`, `expired`, `pending`
- `expiry_date` is optional (can be NULL)
- All timestamps are stored in UTC
- RLS policies ensure that only authenticated users can modify car sticker data
- Public users can only view active car stickers

