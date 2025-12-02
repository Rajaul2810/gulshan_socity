# Supabase Setup Guide

## Installation

Install the Supabase client library:

```bash
npm install @supabase/supabase-js
```

## Environment Variables

Create a `.env.local` file in the root directory with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Database Schema

Run these SQL commands in your Supabase SQL Editor:

```sql
-- Create membership_applications table
CREATE TABLE membership_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  -- Application Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'under_review')),
  
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
  organization TEXT,
  designation TEXT,
  
  -- Property Information
  property_owner TEXT,
  property_schedule TEXT,
  relationship_to_property TEXT CHECK (relationship_to_property IN ('Self', 'Father', 'Mother', 'Spouse', 'Son', 'Daughter', 'Brother', 'Sister', 'Other')),
  
  -- Membership Details
  membership_type TEXT CHECK (membership_type IN ('Life', 'Affiliate', 'Associate', 'Corporate')),
  membership_number TEXT UNIQUE,
  
  -- Proposer/Seconder
  proposer_name TEXT,
  proposer_signature TEXT,
  proposer_membership_no TEXT,
  seconder_name TEXT,
  seconder_signature TEXT,
  seconder_membership_no TEXT,
  
  -- Admin Fields
  zone TEXT CHECK (zone IN ('Zone 1', 'Zone 2', 'Zone 3', 'Zone 4', 'Zone 5', 'Zone 6')),
  zonal_chairman TEXT,
  chairman_membership_committee TEXT,
  ec_meeting_no TEXT,
  ec_meeting_date DATE,
  approved_by TEXT,
  approved_date TIMESTAMP WITH TIME ZONE,
  
  -- Documents
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
CREATE INDEX idx_membership_applications_status ON membership_applications(status);
CREATE INDEX idx_membership_applications_membership_number ON membership_applications(membership_number);
CREATE INDEX idx_membership_applications_email ON membership_applications(email);
CREATE INDEX idx_membership_applications_created_at ON membership_applications(created_at DESC);

-- Enable Row Level Security
ALTER TABLE membership_applications ENABLE ROW LEVEL SECURITY;

-- Policy: Users can insert their own applications
CREATE POLICY "Users can insert their own applications"
  ON membership_applications
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Users can view their own applications
CREATE POLICY "Users can view their own applications"
  ON membership_applications
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Admins can do everything
CREATE POLICY "Admins can manage all applications"
  ON membership_applications
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create storage buckets for documents
INSERT INTO storage.buckets (id, name, public) VALUES ('membership-documents', 'membership-documents', false);

-- Storage policies
CREATE POLICY "Users can upload documents"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'membership-documents');

CREATE POLICY "Users can view their own documents"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'membership-documents');

-- Update trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_membership_applications_updated_at BEFORE UPDATE
    ON membership_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create members table (for approved members)
CREATE TABLE members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  -- Membership Information
  membership_number TEXT UNIQUE NOT NULL,
  membership_type TEXT CHECK (membership_type IN ('Life', 'Affiliate', 'Associate', 'Corporate')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  membership_date DATE DEFAULT CURRENT_DATE,
  
  -- Personal Information (sync from application)
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
  organization TEXT,
  designation TEXT,
  
  -- Property Information
  property_owner TEXT,
  property_schedule TEXT,
  relationship_to_property TEXT CHECK (relationship_to_property IN ('Self', 'Father', 'Mother', 'Spouse', 'Son', 'Daughter', 'Brother', 'Sister', 'Other')),
  
  -- Children Information
  children JSONB DEFAULT '[]'::jsonb,
  
  -- Admin Fields
  zone TEXT CHECK (zone IN ('Zone 1', 'Zone 2', 'Zone 3', 'Zone 4', 'Zone 5', 'Zone 6')),
  zonal_chairman TEXT,
  chairman_membership_committee TEXT,
  ec_meeting_no TEXT,
  ec_meeting_date DATE,
  approved_by TEXT,
  approved_date TIMESTAMP WITH TIME ZONE,
  
  -- Reference to application
  application_id UUID REFERENCES membership_applications(id) ON DELETE SET NULL,
  
  -- Documents (copied from application)
  photo_url TEXT,
  nid_url TEXT,
  tax_receipt_url TEXT,
  
  -- Additional Info
  notes TEXT
);

-- Create indexes for members table
CREATE INDEX idx_members_membership_number ON members(membership_number);
CREATE INDEX idx_members_status ON members(status);
CREATE INDEX idx_members_email ON members(email);
CREATE INDEX idx_members_membership_type ON members(membership_type);
CREATE INDEX idx_members_application_id ON members(application_id);
CREATE INDEX idx_members_created_at ON members(created_at DESC);

-- Enable Row Level Security for members
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view active members (or restrict as needed)
CREATE POLICY "Members are viewable by everyone"
  ON members
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Only admins can insert members
CREATE POLICY "Admins can insert members"
  ON members
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Only admins can update members
CREATE POLICY "Admins can update members"
  ON members
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Only admins can delete members
CREATE POLICY "Admins can delete members"
  ON members
  FOR DELETE
  TO authenticated
  USING (true);

-- Update trigger for members updated_at
CREATE TRIGGER update_members_updated_at BEFORE UPDATE
    ON members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create member when application is approved
CREATE OR REPLACE FUNCTION create_member_on_approval()
RETURNS TRIGGER AS $$
BEGIN
    -- Only create member if status changed to 'approved' and membership_number is set
    IF NEW.status = 'approved' AND NEW.membership_number IS NOT NULL AND 
       (OLD.status IS NULL OR OLD.status != 'approved') THEN
        
        -- Check if member already exists
        IF NOT EXISTS (SELECT 1 FROM members WHERE membership_number = NEW.membership_number) THEN
            
            INSERT INTO members (
                membership_number,
                membership_type,
                name,
                name_bangla,
                gender,
                date_of_birth,
                blood_group,
                spouse_name,
                father_name,
                mother_name,
                profession,
                email,
                mobile,
                office_tel,
                residence_tel,
                residence_address,
                organization,
                designation,
                property_owner,
                property_schedule,
                relationship_to_property,
                children,
                zone,
                zonal_chairman,
                chairman_membership_committee,
                ec_meeting_no,
                ec_meeting_date,
                approved_by,
                approved_date,
                application_id,
                photo_url,
                nid_url,
                tax_receipt_url,
                membership_date,
                status
            )
            VALUES (
                NEW.membership_number,
                NEW.membership_type,
                NEW.name,
                NEW.name_bangla,
                NEW.gender,
                NEW.date_of_birth,
                NEW.blood_group,
                NEW.spouse_name,
                NEW.father_name,
                NEW.mother_name,
                NEW.profession,
                NEW.email,
                NEW.mobile,
                NEW.office_tel,
                NEW.residence_tel,
                NEW.residence_address,
                NEW.organization,
                NEW.designation,
                NEW.property_owner,
                NEW.property_schedule,
                NEW.relationship_to_property,
                NEW.children,
                NEW.zone,
                NEW.zonal_chairman,
                NEW.chairman_membership_committee,
                NEW.ec_meeting_no,
                NEW.ec_meeting_date,
                NEW.approved_by,
                NEW.approved_date,
                NEW.id,
                NEW.photo_url,
                NEW.nid_url,
                NEW.tax_receipt_url,
                COALESCE(NEW.approved_date::date, CURRENT_DATE),
                'active'
            );
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-create member when application is approved
CREATE TRIGGER create_member_when_approved
    AFTER UPDATE ON membership_applications
    FOR EACH ROW
    WHEN (NEW.status = 'approved' AND NEW.membership_number IS NOT NULL)
    EXECUTE FUNCTION create_member_on_approval();

-- Function to generate unique membership number (optional helper)
CREATE OR REPLACE FUNCTION generate_membership_number(member_type TEXT)
RETURNS TEXT AS $$
DECLARE
    prefix TEXT;
    year_part TEXT;
    sequence_num INTEGER;
    new_number TEXT;
BEGIN
    -- Set prefix based on membership type
    prefix := CASE 
        WHEN member_type = 'Life' THEN 'GS-L'
        WHEN member_type = 'Affiliate' THEN 'GS-A'
        WHEN member_type = 'Associate' THEN 'GS-AS'
        WHEN member_type = 'Corporate' THEN 'GS-C'
        ELSE 'GS'
    END;
    
    -- Get year
    year_part := TO_CHAR(CURRENT_DATE, 'YY');
    
    -- Get next sequence number for this type and year
    SELECT COALESCE(MAX(CAST(SUBSTRING(membership_number FROM LENGTH(prefix || year_part || '-') + 1) AS INTEGER)), 0) + 1
    INTO sequence_num
    FROM members
    WHERE membership_number LIKE prefix || year_part || '-%';
    
    -- Format: GS-L-24-0001
    new_number := prefix || '-' || year_part || '-' || LPAD(sequence_num::TEXT, 4, '0');
    
    RETURN new_number;
END;
$$ LANGUAGE plpgsql;
```

## How It Works

### Workflow Overview

1. **User Submits Application**
   - User fills out the membership form at `/membership-form`
   - Application is saved to `membership_applications` table with status `pending`
   - Files are uploaded to Supabase Storage

2. **Admin Reviews Application**
   - Admin views applications at `/admin/membership-applications`
   - Admin can filter by status (pending, under_review, approved, rejected)
   - Admin can search by name, email, phone, or membership number

3. **Admin Approves Application**
   - Admin clicks "Approve" on an application
   - Admin fills in required fields:
     - **Membership Number** (required) - can use "Auto Generate" button
     - **Membership Type** (required)
     - Zonal Chairman (optional)
     - Chairman Membership Committee (optional)
     - EC Meeting Number (optional)
     - EC Meeting Date (optional)
     - Approved By (optional)
   - Admin clicks "Confirm Approval"

4. **Automatic Member Creation**
   - When an application is approved with a membership number, a **trigger automatically creates a member record** in the `members` table
   - All data from the application is copied to the member record
   - The member gets status `active` by default
   - The `application_id` field links the member back to the original application

### Membership Number Format

### Membership Number Assignment

**Manual Entry Only**: Admin must manually enter the membership number when:
- Approving an application from `/admin/membership-applications`
- Adding a member directly from `/admin/members`

**No Auto-Generation**: Membership numbers are always manually entered by admin
- Format is flexible and can follow any convention
- Examples: `GS-L-24-1234`, `12345`, `GS-2024-001`, `MEM-2024-001`, etc.
- Membership number is required for approval and member creation

### Zone Assignment

**Required Field**: Admin must select a zone from dropdown when:
- Approving an application
- Adding a member directly

**Available Zones**: Zone 1, Zone 2, Zone 3, Zone 4, Zone 5, Zone 6
- Zone is a required field in both approval and member creation forms

### Database Relationships

- `membership_applications` table stores all submitted applications
- `members` table stores only approved members (auto-created via trigger)
- `members.application_id` links back to `membership_applications.id`
- Both tables have `membership_number` field, but only members table has it as UNIQUE and NOT NULL

### Important Notes

1. **Membership Number is Required**: An application cannot be approved without a membership number
2. **Automatic Member Creation**: No manual step needed - the trigger handles member creation automatically
3. **Data Sync**: All personal information, contact details, and documents are automatically copied from application to member
4. **Status Management**: 
   - Applications have status: `pending`, `under_review`, `approved`, `rejected`
   - Members have status: `active`, `inactive`, `suspended`
5. **Member Management**: Approved members can be managed from `/admin/members` page

### Testing the Workflow

1. Submit a test application through the form
2. Go to `/admin/membership-applications`
3. Click "View" on an application
4. Click "Approve"
5. Fill in membership number (or use "Auto Generate")
6. Fill in membership type
7. Click "Confirm Approval"
8. Check the `members` table in Supabase - a new member record should be created automatically!

## Additional Functions

### Generate Membership Number (SQL Function)

You can also call the SQL function directly:

```sql
SELECT generate_membership_number('Life');
-- Returns: GS-L-24-0001 (or next sequential number)
```

This function:
- Takes membership type as parameter
- Returns a formatted membership number
- Ensures sequential numbering per type per year
- Format: `[PREFIX]-[YEAR]-[SEQUENCE]`

