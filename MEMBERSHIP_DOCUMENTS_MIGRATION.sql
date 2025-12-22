-- ============================================
-- Membership Documents Migration
-- This migration ensures all document fields exist in the database
-- Run this in Supabase SQL Editor if fields are missing
-- ============================================

-- Check and add document URL columns if they don't exist
DO $$ 
BEGIN
    -- Add nid_url if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'membership_applications' 
        AND column_name = 'nid_url'
    ) THEN
        ALTER TABLE membership_applications ADD COLUMN nid_url TEXT;
    END IF;

    -- Add tax_receipt_url if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'membership_applications' 
        AND column_name = 'tax_receipt_url'
    ) THEN
        ALTER TABLE membership_applications ADD COLUMN tax_receipt_url TEXT;
    END IF;

    -- Add lease_agreement_url if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'membership_applications' 
        AND column_name = 'lease_agreement_url'
    ) THEN
        ALTER TABLE membership_applications ADD COLUMN lease_agreement_url TEXT;
    END IF;

    -- Add trade_license_url if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'membership_applications' 
        AND column_name = 'trade_license_url'
    ) THEN
        ALTER TABLE membership_applications ADD COLUMN trade_license_url TEXT;
    END IF;

    -- Add tin_bin_certificate_url if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'membership_applications' 
        AND column_name = 'tin_bin_certificate_url'
    ) THEN
        ALTER TABLE membership_applications ADD COLUMN tin_bin_certificate_url TEXT;
    END IF;
END $$;

-- Ensure storage bucket allows PDF files
-- Update the storage bucket to accept PDFs if not already configured
UPDATE storage.buckets 
SET allowed_mime_types = ARRAY[
    'image/jpeg', 
    'image/jpg', 
    'image/png', 
    'image/webp', 
    'application/pdf'
]
WHERE id = 'membership-documents';

-- Note: If the bucket doesn't exist, create it first:
-- INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
-- VALUES (
--   'membership-documents',
--   'membership-documents',
--   true,
--   5242880, -- 5MB limit
--   ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf']
-- )
-- ON CONFLICT (id) DO NOTHING;

-- ============================================
-- Document Requirements Summary:
-- ============================================
-- 1. Photograph PP Size (2 Copies) - Required for ALL
--    - Field: photo_url
--    - Accepts: Images (JPG, PNG)
--
-- 2. Photo Copy of NID Card - Required for ALL
--    - Field: nid_url
--    - Accepts: Images or PDF
--
-- 3. Photo Copy of Most Recent Holding Tax Receipt of DNCC 
--    or Registered Sale Deed or Share Documents Certificate - Required for ALL
--    - Field: tax_receipt_url
--    - Accepts: Images or PDF
--
-- 4. For Associate Membership: Photo Copy of Valid Lease Agreement 
--    or Most Recent Rental Money Receipt - Required for ASSOCIATE
--    - Field: lease_agreement_url
--    - Accepts: Images or PDF
--
-- 5. For Corporate Membership:
--    a) Photo Copy of Trade License / RJSC / Corporation Certificate - Required for CORPORATE
--       - Field: trade_license_url
--       - Accepts: Images or PDF
--    b) Photo Copy of TIN / BIN Certificate - Required for CORPORATE
--       - Field: tin_bin_certificate_url
--       - Accepts: Images or PDF
--    c) Valid Lease Agreement / Proof of Ownership - Required for CORPORATE
--       - Field: lease_agreement_url
--       - Accepts: Images or PDF
-- ============================================

