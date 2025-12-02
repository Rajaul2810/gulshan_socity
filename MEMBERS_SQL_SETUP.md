# Members Management - Supabase SQL Setup

This document contains all SQL queries needed to set up the members management system in Supabase.

## 1. Create Storage Bucket for Member Photos

First, create a storage bucket for member photos:

```sql
-- Create storage bucket for member photos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'member-photos',
  'member-photos',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;
```

## 2. Storage Bucket Policies

Set up policies for the storage bucket:

```sql
-- Allow public read access to member photos
CREATE POLICY "Public read access for member photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'member-photos');

-- Allow authenticated users to upload member photos
CREATE POLICY "Authenticated users can upload member photos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'member-photos' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to update member photos
CREATE POLICY "Authenticated users can update member photos"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'member-photos' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to delete member photos
CREATE POLICY "Authenticated users can delete member photos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'member-photos' 
  AND auth.role() = 'authenticated'
);
```

## 3. Members Table

Create the table for members:

```sql
-- Create members table
CREATE TABLE IF NOT EXISTS members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  -- Membership Information
  membership_number VARCHAR(50) UNIQUE NOT NULL,
  membership_type VARCHAR(20) CHECK (membership_type IN ('Life', 'Affiliate', 'Associate', 'Corporate')),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  membership_date DATE DEFAULT CURRENT_DATE,
  zone VARCHAR(20) CHECK (zone IN ('Zone 1', 'Zone 2', 'Zone 3', 'Zone 4', 'Zone 5', 'Zone 6')),
  
  -- Personal Information
  name VARCHAR(255) NOT NULL,
  name_bangla VARCHAR(255),
  gender VARCHAR(1) CHECK (gender IN ('M', 'F')),
  date_of_birth DATE,
  blood_group VARCHAR(10),
  spouse_name VARCHAR(255),
  father_name VARCHAR(255),
  mother_name VARCHAR(255),
  profession VARCHAR(255),
  
  -- Contact Information
  email VARCHAR(255),
  mobile VARCHAR(20),
  office_tel VARCHAR(20),
  residence_tel VARCHAR(20),
  residence_address TEXT,
  
  -- Professional Information
  organization VARCHAR(255),
  designation VARCHAR(255),
  
  -- Property Information
  property_owner VARCHAR(255),
  property_schedule VARCHAR(255),
  relationship_to_property VARCHAR(20) CHECK (relationship_to_property IN ('Self', 'Father', 'Mother', 'Spouse', 'Son', 'Daughter', 'Brother', 'Sister', 'Other')),
  
  -- Proposer & Seconder Information
  proposer_name VARCHAR(255),
  proposer_membership_no VARCHAR(50),
  seconder_name VARCHAR(255),
  seconder_membership_no VARCHAR(50),
  
  -- Children Information (JSON)
  children JSONB DEFAULT '[]'::jsonb,
  
  -- Documents (URLs from storage)
  photo_url TEXT,
  
  -- Reference to application
  application_id UUID REFERENCES membership_applications(id) ON DELETE SET NULL,
  
  -- Additional Info
  notes TEXT
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_members_membership_number ON members(membership_number);
CREATE INDEX IF NOT EXISTS idx_members_status ON members(status);
CREATE INDEX IF NOT EXISTS idx_members_email ON members(email);
CREATE INDEX IF NOT EXISTS idx_members_membership_type ON members(membership_type);
CREATE INDEX IF NOT EXISTS idx_members_zone ON members(zone);
CREATE INDEX IF NOT EXISTS idx_members_application_id ON members(application_id);
CREATE INDEX IF NOT EXISTS idx_members_created_at ON members(created_at DESC);

-- Enable Row Level Security
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
```

## 4. Row Level Security (RLS) Policies

Set up RLS policies for the members table:

```sql
-- Allow public read access to active members
CREATE POLICY "Public read access for active members"
ON members FOR SELECT
USING (status = 'active');

-- Allow authenticated users to read all members
CREATE POLICY "Authenticated users can read all members"
ON members FOR SELECT
USING (auth.role() = 'authenticated');

-- Allow authenticated users to insert members
CREATE POLICY "Authenticated users can insert members"
ON members FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update members
CREATE POLICY "Authenticated users can update members"
ON members FOR UPDATE
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to delete members
CREATE POLICY "Authenticated users can delete members"
ON members FOR DELETE
USING (auth.role() = 'authenticated');
```

## 5. Update Trigger

Create a trigger to automatically update the `updated_at` timestamp:

```sql
-- Create or replace function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for members table
CREATE TRIGGER update_members_updated_at
BEFORE UPDATE ON members
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
```

## 6. Migration Script (if table already exists)

If the `members` table already exists and you need to add missing columns:

```sql
-- Add missing columns if they don't exist
DO $$ 
BEGIN
    -- Add zone column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'members' AND column_name = 'zone') THEN
        ALTER TABLE members ADD COLUMN zone VARCHAR(20) CHECK (zone IN ('Zone 1', 'Zone 2', 'Zone 3', 'Zone 4', 'Zone 5', 'Zone 6'));
    END IF;
    
    -- Add name_bangla column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'members' AND column_name = 'name_bangla') THEN
        ALTER TABLE members ADD COLUMN name_bangla VARCHAR(255);
    END IF;
    
    -- Add proposer fields if they don't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'members' AND column_name = 'proposer_name') THEN
        ALTER TABLE members ADD COLUMN proposer_name VARCHAR(255);
        ALTER TABLE members ADD COLUMN proposer_membership_no VARCHAR(50);
        ALTER TABLE members ADD COLUMN seconder_name VARCHAR(255);
        ALTER TABLE members ADD COLUMN seconder_membership_no VARCHAR(50);
    END IF;
    
    -- Add children column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'members' AND column_name = 'children') THEN
        ALTER TABLE members ADD COLUMN children JSONB DEFAULT '[]'::jsonb;
    END IF;
END $$;
```

## 7. Verification Queries

Run these queries to verify the setup:

```sql
-- Check if table exists
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name = 'members'
);

-- Check if storage bucket exists
SELECT * FROM storage.buckets WHERE id = 'member-photos';

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'members';

-- Check indexes
SELECT indexname, indexdef 
FROM pg_indexes 
WHERE tablename = 'members';
```

## Notes

- The `members` table stores all approved members with their complete information
- Member photos are stored in the `member-photos` storage bucket
- The `application_id` field links members to their original membership application
- All timestamps are stored in UTC
- RLS policies ensure that only authenticated users can modify member data
- Public users can only view active members

