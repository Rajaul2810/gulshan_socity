-- ============================================
-- Membership Applications Table Setup
-- Run this in Supabase SQL Editor
-- ============================================

-- Step 1: Create the membership_applications table
CREATE TABLE IF NOT EXISTS public.membership_applications (
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

-- Step 2: Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_membership_applications_status ON public.membership_applications(status);
CREATE INDEX IF NOT EXISTS idx_membership_applications_membership_type ON public.membership_applications(membership_type);
CREATE INDEX IF NOT EXISTS idx_membership_applications_email ON public.membership_applications(email);
CREATE INDEX IF NOT EXISTS idx_membership_applications_mobile ON public.membership_applications(mobile);
CREATE INDEX IF NOT EXISTS idx_membership_applications_membership_number ON public.membership_applications(membership_number);
CREATE INDEX IF NOT EXISTS idx_membership_applications_created_at ON public.membership_applications(created_at DESC);

-- Step 3: Enable Row Level Security
ALTER TABLE public.membership_applications ENABLE ROW LEVEL SECURITY;

-- Step 4: Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Anyone can submit membership application" ON public.membership_applications;
DROP POLICY IF EXISTS "Authenticated users can view all applications" ON public.membership_applications;
DROP POLICY IF EXISTS "Authenticated users can update all applications" ON public.membership_applications;
DROP POLICY IF EXISTS "Authenticated users can delete applications" ON public.membership_applications;
DROP POLICY IF EXISTS "Public can insert applications" ON public.membership_applications;

-- Step 5: Create RLS Policies
-- Allow anyone (including anonymous users) to submit applications
CREATE POLICY "Public can insert applications"
ON public.membership_applications
FOR INSERT
TO public
WITH CHECK (true);

-- Allow authenticated users to view all applications
CREATE POLICY "Authenticated users can view all applications"
ON public.membership_applications
FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users to update all applications
CREATE POLICY "Authenticated users can update all applications"
ON public.membership_applications
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow authenticated users to delete applications
CREATE POLICY "Authenticated users can delete applications"
ON public.membership_applications
FOR DELETE
TO authenticated
USING (true);

-- Step 6: Create/Update Trigger Function for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 7: Create trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_membership_applications_updated_at ON public.membership_applications;

CREATE TRIGGER update_membership_applications_updated_at
BEFORE UPDATE ON public.membership_applications
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Step 8: Verify table creation
SELECT 
  table_name,
  column_name,
  data_type
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'membership_applications'
ORDER BY ordinal_position;

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Membership applications table setup completed successfully!';
END $$;

