# Adopt a Gate Management - Supabase SQL Setup

This document contains all SQL queries needed to set up the Adopt a Gate management system in Supabase.

## 1. Adopt a Gate Table

Create the table for Adopt a Gate registrations:

```sql
-- Create adopt_a_gate table
CREATE TABLE IF NOT EXISTS adopt_a_gate (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  -- Adopter Information
  adopter_type VARCHAR(20) NOT NULL CHECK (adopter_type IN ('Personal', 'Commercial', 'Family')),
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  resident_type VARCHAR(20) CHECK (resident_type IN ('Permanent', 'Tenant')),
  is_member BOOLEAN DEFAULT false,
  membership_number VARCHAR(50),
  
  -- Gate Information
  gate_road_number VARCHAR(50) NOT NULL,
  gulshan_area VARCHAR(10) CHECK (gulshan_area IN ('Gulshan 1', 'Gulshan 2')),
  
  -- Adoption Period
  adoption_start_date DATE NOT NULL,
  adoption_end_date DATE NOT NULL,
  
  -- Contact Information
  mobile VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  
  -- Terms and Conditions
  terms_accepted BOOLEAN DEFAULT false NOT NULL,
  
  -- Admin Fields
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'active', 'expired')),
  approved_by VARCHAR(255),
  approved_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  
  -- Payment Information
  payment_amount DECIMAL(10, 2),
  payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'overdue')),
  payment_date DATE,
  payment_receipt_number VARCHAR(100),
  
  -- Advertisement Information
  advertisement_approved BOOLEAN DEFAULT false,
  advertisement_details TEXT
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_adopt_a_gate_status ON adopt_a_gate(status);
CREATE INDEX IF NOT EXISTS idx_adopt_a_gate_adopter_type ON adopt_a_gate(adopter_type);
CREATE INDEX IF NOT EXISTS idx_adopt_a_gate_gate_road_number ON adopt_a_gate(gate_road_number);
CREATE INDEX IF NOT EXISTS idx_adopt_a_gate_gulshan_area ON adopt_a_gate(gulshan_area);
CREATE INDEX IF NOT EXISTS idx_adopt_a_gate_payment_status ON adopt_a_gate(payment_status);
CREATE INDEX IF NOT EXISTS idx_adopt_a_gate_created_at ON adopt_a_gate(created_at DESC);

-- Enable Row Level Security
ALTER TABLE adopt_a_gate ENABLE ROW LEVEL SECURITY;
```

## 2. Row Level Security (RLS) Policies

Set up RLS policies for the adopt_a_gate table:

```sql
-- Allow public read access to active adoptions
CREATE POLICY "Public read access for active adoptions"
ON adopt_a_gate FOR SELECT
USING (status = 'active');

-- Allow authenticated users to read all adoptions
CREATE POLICY "Authenticated users can read all adoptions"
ON adopt_a_gate FOR SELECT
USING (auth.role() = 'authenticated');

-- Allow public users to insert adoptions with pending status
CREATE POLICY "Public can insert pending adoptions"
ON adopt_a_gate FOR INSERT
TO public
WITH CHECK (status = 'pending' AND terms_accepted = true);

-- Allow authenticated users to insert adoptions with any status
CREATE POLICY "Authenticated users can insert adoptions"
ON adopt_a_gate FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update adoptions
CREATE POLICY "Authenticated users can update adoptions"
ON adopt_a_gate FOR UPDATE
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to delete adoptions
CREATE POLICY "Authenticated users can delete adoptions"
ON adopt_a_gate FOR DELETE
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
DROP TRIGGER IF EXISTS update_adopt_a_gate_updated_at ON adopt_a_gate;
CREATE TRIGGER update_adopt_a_gate_updated_at
    BEFORE UPDATE ON adopt_a_gate
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

## 4. Complete Setup Script (Run All at Once)

Here's a complete script you can run in Supabase SQL Editor:

```sql
-- =====================================================
-- ADOPT A GATE MANAGEMENT - COMPLETE SETUP
-- =====================================================

-- Step 1: Create Adopt a Gate Table
CREATE TABLE IF NOT EXISTS adopt_a_gate (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  -- Adopter Information
  adopter_type VARCHAR(20) NOT NULL CHECK (adopter_type IN ('Personal', 'Commercial', 'Family')),
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  resident_type VARCHAR(20) CHECK (resident_type IN ('Permanent', 'Tenant')),
  is_member BOOLEAN DEFAULT false,
  membership_number VARCHAR(50),
  
  -- Gate Information
  gate_road_number VARCHAR(50) NOT NULL,
  gulshan_area VARCHAR(10) CHECK (gulshan_area IN ('Gulshan 1', 'Gulshan 2')),
  
  -- Adoption Period
  adoption_start_date DATE NOT NULL,
  adoption_end_date DATE NOT NULL,
  
  -- Contact Information
  mobile VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  
  -- Terms and Conditions
  terms_accepted BOOLEAN DEFAULT false NOT NULL,
  
  -- Admin Fields
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'active', 'expired')),
  approved_by VARCHAR(255),
  approved_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  
  -- Payment Information
  payment_amount DECIMAL(10, 2),
  payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'overdue')),
  payment_date DATE,
  payment_receipt_number VARCHAR(100),
  
  -- Advertisement Information
  advertisement_approved BOOLEAN DEFAULT false,
  advertisement_details TEXT
);

-- Step 2: Create Indexes
CREATE INDEX IF NOT EXISTS idx_adopt_a_gate_status ON adopt_a_gate(status);
CREATE INDEX IF NOT EXISTS idx_adopt_a_gate_adopter_type ON adopt_a_gate(adopter_type);
CREATE INDEX IF NOT EXISTS idx_adopt_a_gate_gate_road_number ON adopt_a_gate(gate_road_number);
CREATE INDEX IF NOT EXISTS idx_adopt_a_gate_gulshan_area ON adopt_a_gate(gulshan_area);
CREATE INDEX IF NOT EXISTS idx_adopt_a_gate_payment_status ON adopt_a_gate(payment_status);
CREATE INDEX IF NOT EXISTS idx_adopt_a_gate_created_at ON adopt_a_gate(created_at DESC);

-- Step 3: Enable Row Level Security
ALTER TABLE adopt_a_gate ENABLE ROW LEVEL SECURITY;

-- Step 4: Drop existing policies if they exist
DROP POLICY IF EXISTS "Public read access for active adoptions" ON adopt_a_gate;
DROP POLICY IF EXISTS "Authenticated users can read all adoptions" ON adopt_a_gate;
DROP POLICY IF EXISTS "Public can insert pending adoptions" ON adopt_a_gate;
DROP POLICY IF EXISTS "Authenticated users can insert adoptions" ON adopt_a_gate;
DROP POLICY IF EXISTS "Authenticated users can update adoptions" ON adopt_a_gate;
DROP POLICY IF EXISTS "Authenticated users can delete adoptions" ON adopt_a_gate;

-- Step 5: Create RLS Policies
-- Allow public read access to active adoptions
CREATE POLICY "Public read access for active adoptions"
ON adopt_a_gate FOR SELECT
USING (status = 'active');

-- Allow authenticated users to read all adoptions
CREATE POLICY "Authenticated users can read all adoptions"
ON adopt_a_gate FOR SELECT
USING (auth.role() = 'authenticated');

-- Allow public users to insert adoptions with pending status
CREATE POLICY "Public can insert pending adoptions"
ON adopt_a_gate FOR INSERT
TO public
WITH CHECK (status = 'pending' AND terms_accepted = true);

-- Allow authenticated users to insert adoptions with any status
CREATE POLICY "Authenticated users can insert adoptions"
ON adopt_a_gate FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update adoptions
CREATE POLICY "Authenticated users can update adoptions"
ON adopt_a_gate FOR UPDATE
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to delete adoptions
CREATE POLICY "Authenticated users can delete adoptions"
ON adopt_a_gate FOR DELETE
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
DROP TRIGGER IF EXISTS update_adopt_a_gate_updated_at ON adopt_a_gate;
CREATE TRIGGER update_adopt_a_gate_updated_at
    BEFORE UPDATE ON adopt_a_gate
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
  AND table_name = 'adopt_a_gate'
ORDER BY ordinal_position;

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Adopt a Gate table setup completed successfully!';
END $$;
```

## 5. Verification Queries

Run these queries to verify the setup:

```sql
-- Check if table exists
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name = 'adopt_a_gate'
);

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'adopt_a_gate';

-- Check indexes
SELECT indexname, indexdef 
FROM pg_indexes 
WHERE tablename = 'adopt_a_gate';

-- Check table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'adopt_a_gate'
ORDER BY ordinal_position;
```

## Notes

- The `adopt_a_gate` table stores all gate adoption registrations
- Status values: `pending`, `approved`, `rejected`, `active`, `expired`
- Payment amount: Fixed at Tk. 3,00,000/- for two-year duration
- Adopter types: `Personal`, `Commercial`, `Family`
- Public users can only submit with `pending` status and must accept terms
- All timestamps are stored in UTC
- RLS policies ensure proper access control
- Advertisement approval field for M.S. plate advertisements

