# Membership Application Form - Supabase SQL Setup

This document contains all SQL queries needed to set up the membership application form in Supabase.

## 1. Create Storage Bucket for Documents

First, create a storage bucket for membership documents:

```sql
-- Create storage bucket for membership documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'membership-documents',
  'membership-documents',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf']
)
ON CONFLICT (id) DO NOTHING;
```

## 2. Storage Bucket Policies

Set up policies for the storage bucket:

```sql
-- Allow public read access to documents
CREATE POLICY "Public read access for membership documents"
ON storage.objects FOR SELECT
USING (bucket_id = 'membership-documents');

-- Allow authenticated users to upload documents
CREATE POLICY "Authenticated users can upload documents"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'membership-documents' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to update their own documents
CREATE POLICY "Authenticated users can update documents"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'membership-documents' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to delete their own documents
CREATE POLICY "Authenticated users can delete documents"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'membership-documents' 
  AND auth.role() = 'authenticated'
);
```

## 3. Membership Applications Table

Create the table for membership applications (if not already exists):

```sql
-- Create membership_applications table
CREATE TABLE IF NOT EXISTS membership_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  -- Membership Type & Declaration
  membership_type TEXT CHECK (membership_type IN ('Life', 'Affiliate', 'Associate', 'Corporate')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected')),
  
  -- Personal Information
  name TEXT NOT NULL,
  name_bangla TEXT,
  gender TEXT CHECK (gender IN ('M', 'F')),
  date_of_birth DATE,
  blood_group TEXT,
  spouse_name TEXT,
  father_name TEXT,
  mother_name TEXT,
  profession TEXT,
  
  -- Contact Information
  email TEXT,
  mobile TEXT,
  office_tel TEXT,
  residence_tel TEXT,
  residence_address TEXT,
  
  -- Professional Information
  organization TEXT,
  designation TEXT,
  
  -- Property Information
  property_owner TEXT,
  property_schedule TEXT,
  relationship_to_property TEXT CHECK (relationship_to_property IN ('Self', 'Father', 'Mother', 'Spouse', 'Son', 'Daughter', 'Brother', 'Sister', 'Other')),
  
  -- Proposer & Seconder Information
  proposer_name TEXT,
  proposer_membership_no TEXT,
  seconder_name TEXT,
  seconder_membership_no TEXT,
  
  -- Admin Fields (filled by admin)
  membership_number TEXT UNIQUE,
  zone TEXT CHECK (zone IN ('Zone 1', 'Zone 2', 'Zone 3', 'Zone 4', 'Zone 5', 'Zone 6')),
  zonal_chairman TEXT,
  chairman_membership_committee TEXT,
  ec_meeting_no TEXT,
  ec_meeting_date DATE,
  approved_by TEXT,
  approved_date TIMESTAMP WITH TIME ZONE,
  
  -- Documents (URLs from storage)
  photo_url TEXT,
  nid_url TEXT,
  tax_receipt_url TEXT,
  lease_agreement_url TEXT,
  trade_license_url TEXT,
  tin_bin_certificate_url TEXT,
  
  -- Children Information (JSON)
  children JSONB DEFAULT '[]'::jsonb,
  
  -- Additional Info
  application_date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  notes TEXT
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_membership_applications_status ON membership_applications(status);
CREATE INDEX IF NOT EXISTS idx_membership_applications_membership_type ON membership_applications(membership_type);
CREATE INDEX IF NOT EXISTS idx_membership_applications_email ON membership_applications(email);
CREATE INDEX IF NOT EXISTS idx_membership_applications_mobile ON membership_applications(mobile);
CREATE INDEX IF NOT EXISTS idx_membership_applications_created_at ON membership_applications(created_at DESC);
```

## 4. Enable Row Level Security (RLS)

```sql
-- Enable RLS on membership_applications table
ALTER TABLE membership_applications ENABLE ROW LEVEL SECURITY;
```

## 5. RLS Policies for Membership Applications

```sql
-- Allow anyone to insert (submit applications)
CREATE POLICY "Anyone can submit membership application"
ON membership_applications
FOR INSERT
TO public
WITH CHECK (true);

-- Allow authenticated users (admins) to view all applications
CREATE POLICY "Authenticated users can view all applications"
ON membership_applications
FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users (admins) to update all applications
CREATE POLICY "Authenticated users can update all applications"
ON membership_applications
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow authenticated users (admins) to delete applications
CREATE POLICY "Authenticated users can delete applications"
ON membership_applications
FOR DELETE
TO authenticated
USING (true);

-- Allow users to view their own application by email or mobile
CREATE POLICY "Users can view their own application"
ON membership_applications
FOR SELECT
TO public
USING (
  auth.email() = email OR 
  auth.jwt() ->> 'phone' = mobile
);
```

## 6. Update Trigger for updated_at

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
DROP TRIGGER IF EXISTS update_membership_applications_updated_at ON membership_applications;
CREATE TRIGGER update_membership_applications_updated_at
    BEFORE UPDATE ON membership_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

## 7. Complete Setup Script (Run All at Once)

Here's a complete script you can run in Supabase SQL Editor:

```sql
-- =====================================================
-- MEMBERSHIP APPLICATION FORM - COMPLETE SETUP
-- =====================================================

-- Step 1: Create Storage Bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'membership-documents',
  'membership-documents',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- Step 2: Create Membership Applications Table
CREATE TABLE IF NOT EXISTS membership_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  -- Membership Type & Declaration
  membership_type TEXT CHECK (membership_type IN ('Life', 'Affiliate', 'Associate', 'Corporate')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected')),
  
  -- Personal Information
  name TEXT NOT NULL,
  name_bangla TEXT,
  gender TEXT CHECK (gender IN ('M', 'F')),
  date_of_birth DATE,
  blood_group TEXT,
  spouse_name TEXT,
  father_name TEXT,
  mother_name TEXT,
  profession TEXT,
  
  -- Contact Information
  email TEXT,
  mobile TEXT,
  office_tel TEXT,
  residence_tel TEXT,
  residence_address TEXT,
  
  -- Professional Information
  organization TEXT,
  designation TEXT,
  
  -- Property Information
  property_owner TEXT,
  property_schedule TEXT,
  relationship_to_property TEXT CHECK (relationship_to_property IN ('Self', 'Father', 'Mother', 'Spouse', 'Son', 'Daughter', 'Brother', 'Sister', 'Other')),
  
  -- Proposer & Seconder Information
  proposer_name TEXT,
  proposer_membership_no TEXT,
  seconder_name TEXT,
  seconder_membership_no TEXT,
  
  -- Admin Fields (filled by admin during approval)
  membership_number TEXT UNIQUE,
  zone TEXT CHECK (zone IN ('Zone 1', 'Zone 2', 'Zone 3', 'Zone 4', 'Zone 5', 'Zone 6')),
  zonal_chairman TEXT,
  chairman_membership_committee TEXT,
  ec_meeting_no TEXT,
  ec_meeting_date DATE,
  approved_by TEXT,
  approved_date TIMESTAMP WITH TIME ZONE,
  
  -- Documents (URLs from storage)
  photo_url TEXT,
  nid_url TEXT,
  tax_receipt_url TEXT,
  lease_agreement_url TEXT,
  trade_license_url TEXT,
  tin_bin_certificate_url TEXT,
  
  -- Children Information (JSON)
  children JSONB DEFAULT '[]'::jsonb,
  
  -- Additional Info
  application_date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  notes TEXT
);

-- Step 3: Create Indexes
CREATE INDEX IF NOT EXISTS idx_membership_applications_status ON membership_applications(status);
CREATE INDEX IF NOT EXISTS idx_membership_applications_membership_type ON membership_applications(membership_type);
CREATE INDEX IF NOT EXISTS idx_membership_applications_email ON membership_applications(email);
CREATE INDEX IF NOT EXISTS idx_membership_applications_mobile ON membership_applications(mobile);
CREATE INDEX IF NOT EXISTS idx_membership_applications_created_at ON membership_applications(created_at DESC);

-- Step 4: Enable RLS
ALTER TABLE membership_applications ENABLE ROW LEVEL SECURITY;

-- Step 5: Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can submit membership application" ON membership_applications;
DROP POLICY IF EXISTS "Authenticated users can view all applications" ON membership_applications;
DROP POLICY IF EXISTS "Authenticated users can update all applications" ON membership_applications;
DROP POLICY IF EXISTS "Authenticated users can delete applications" ON membership_applications;
DROP POLICY IF EXISTS "Users can view their own application" ON membership_applications;

-- Step 6: Create RLS Policies
CREATE POLICY "Anyone can submit membership application"
ON membership_applications
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Authenticated users can view all applications"
ON membership_applications
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can update all applications"
ON membership_applications
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete applications"
ON membership_applications
FOR DELETE
TO authenticated
USING (true);

-- Step 7: Create/Update Trigger Function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 8: Create Trigger
DROP TRIGGER IF EXISTS update_membership_applications_updated_at ON membership_applications;
CREATE TRIGGER update_membership_applications_updated_at
    BEFORE UPDATE ON membership_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Step 9: Storage Bucket Policies
DROP POLICY IF EXISTS "Public read access for membership documents" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload documents" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update documents" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete documents" ON storage.objects;

CREATE POLICY "Public read access for membership documents"
ON storage.objects FOR SELECT
USING (bucket_id = 'membership-documents');

CREATE POLICY "Authenticated users can upload documents"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'membership-documents' 
  AND (auth.role() = 'authenticated' OR auth.role() = 'anon')
);

CREATE POLICY "Authenticated users can update documents"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'membership-documents' 
  AND (auth.role() = 'authenticated' OR auth.role() = 'anon')
);

CREATE POLICY "Authenticated users can delete documents"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'membership-documents' 
  AND auth.role() = 'authenticated'
);

-- =====================================================
-- SETUP COMPLETE!
-- =====================================================
-- 
-- Next Steps:
-- 1. Verify the bucket is created in Storage section
-- 2. Test file upload from the form
-- 3. Test application submission
-- 4. Check RLS policies are working correctly
```

## 8. Verification Queries

After running the setup, verify everything is working:

```sql
-- Check if table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_name = 'membership_applications'
);

-- Check if bucket exists
SELECT * FROM storage.buckets WHERE id = 'membership-documents';

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'membership_applications';

-- Check policies
SELECT * FROM pg_policies 
WHERE tablename = 'membership_applications';

-- Test insert (should work without auth)
INSERT INTO membership_applications (name, email, mobile, membership_type)
VALUES ('Test User', 'test@example.com', '1234567890', 'Life')
RETURNING id;
```

## 9. File Structure in Storage

Files will be organized in the storage bucket as follows:
```
membership-documents/
  ├── photos/
  │   └── [timestamp]-[random].jpg
  ├── nid/
  │   └── [timestamp]-[random].pdf
  ├── tax-receipts/
  │   └── [timestamp]-[random].pdf
  ├── lease-agreements/
  │   └── [timestamp]-[random].pdf
  ├── trade-licenses/
  │   └── [timestamp]-[random].pdf
  └── certificates/
      └── [timestamp]-[random].pdf
```

## 10. Important Notes

1. **File Size Limit**: Maximum 5MB per file
2. **Allowed File Types**: JPEG, JPG, PNG, WebP, PDF
3. **Public Access**: Documents are publicly readable (you can make them private if needed)
4. **Anonymous Uploads**: The form allows anonymous users to upload files
5. **Zone Field**: This field is filled by admin during approval, not by users
6. **Membership Number**: Also filled by admin during approval

## 11. Troubleshooting

### Issue: File upload fails
- Check bucket exists: `SELECT * FROM storage.buckets WHERE id = 'membership-documents'`
- Verify policies allow anonymous uploads
- Check file size is under 5MB
- Verify file type is allowed

### Issue: Cannot insert application
- Verify RLS policies allow public inserts
- Check all required fields are provided
- Verify constraint checks (gender, membership_type, etc.)

### Issue: Cannot view applications as admin
- Ensure you're authenticated in Supabase
- Check RLS policy for authenticated users exists
- Verify your user role is 'authenticated'

---

**Run the complete setup script in Supabase SQL Editor to set everything up at once!**

