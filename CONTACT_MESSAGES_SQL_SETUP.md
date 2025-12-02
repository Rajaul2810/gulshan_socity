# Contact Messages - Supabase SQL Setup

This document contains all SQL queries needed to set up the contact messages system in Supabase.

## 1. Contact Messages Table

Create the table for contact messages:

```sql
-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  preferred_contact VARCHAR(20) DEFAULT 'email',
  status VARCHAR(20) NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index on status for faster queries
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);

-- Create index on email for searching
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);

-- Enable Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
```

## 2. Row Level Security (RLS) Policies

Set up RLS policies for the contact_messages table:

```sql
-- Allow public to insert contact messages (for contact form)
CREATE POLICY "Public can insert contact messages"
ON contact_messages FOR INSERT
WITH CHECK (true);

-- Allow authenticated users to read all contact messages
CREATE POLICY "Authenticated users can read contact messages"
ON contact_messages FOR SELECT
USING (auth.role() = 'authenticated');

-- Allow authenticated users to update contact messages
CREATE POLICY "Authenticated users can update contact messages"
ON contact_messages FOR UPDATE
USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete contact messages
CREATE POLICY "Authenticated users can delete contact messages"
ON contact_messages FOR DELETE
USING (auth.role() = 'authenticated');
```

## 3. Update Trigger for updated_at

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
DROP TRIGGER IF EXISTS update_contact_messages_updated_at ON contact_messages;
CREATE TRIGGER update_contact_messages_updated_at
    BEFORE UPDATE ON contact_messages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

## 4. Complete Setup Script (Run All at Once)

Here's a complete script you can run in Supabase SQL Editor:

```sql
-- =====================================================
-- CONTACT MESSAGES - COMPLETE SETUP
-- =====================================================

-- Step 1: Create Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  preferred_contact VARCHAR(20) DEFAULT 'email',
  status VARCHAR(20) NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Step 2: Create Indexes
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);

-- Step 3: Enable Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Step 4: Create RLS Policies
DROP POLICY IF EXISTS "Public can insert contact messages" ON contact_messages;
CREATE POLICY "Public can insert contact messages"
ON contact_messages FOR INSERT
WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can read contact messages" ON contact_messages;
CREATE POLICY "Authenticated users can read contact messages"
ON contact_messages FOR SELECT
USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users can update contact messages" ON contact_messages;
CREATE POLICY "Authenticated users can update contact messages"
ON contact_messages FOR UPDATE
USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users can delete contact messages" ON contact_messages;
CREATE POLICY "Authenticated users can delete contact messages"
ON contact_messages FOR DELETE
USING (auth.role() = 'authenticated');

-- Step 5: Create Update Trigger Function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 6: Create Update Trigger
DROP TRIGGER IF EXISTS update_contact_messages_updated_at ON contact_messages;
CREATE TRIGGER update_contact_messages_updated_at
    BEFORE UPDATE ON contact_messages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

## 5. Verification Queries

Run these queries to verify the setup:

```sql
-- Check if table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_name = 'contact_messages'
);

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'contact_messages';

-- Check policies
SELECT * FROM pg_policies 
WHERE tablename = 'contact_messages';

-- Test insert (should work without auth - public can insert)
INSERT INTO contact_messages (name, email, subject, category, message)
VALUES ('Test User', 'test@example.com', 'Test Subject', 'general', 'This is a test message')
RETURNING id;
```

## 6. Important Notes

1. **Public Insert**: Anyone can submit contact messages through the contact form (no authentication required)
2. **Authenticated Read/Update/Delete**: Only authenticated users (admins) can read, update, or delete messages
3. **Status Values**: Only 'unread', 'read', and 'replied' are allowed
4. **Categories**: general, membership, maintenance, security, billing, complaint, suggestion, other
5. **Preferred Contact**: email, phone, either
6. **Auto Status**: New messages are automatically set to 'unread' status
7. **Timestamps**: created_at and updated_at are automatically managed

## 7. Troubleshooting

### Issue: Cannot insert contact message
- Verify public insert policy exists
- Check all required fields are provided (name, email, subject, category, message)
- Verify email format is valid

### Issue: Cannot read/update/delete messages (admin)
- Verify RLS policies allow authenticated operations
- Check user is authenticated
- Verify user has authenticated role

### Issue: Status update not working
- Verify status value is one of: 'unread', 'read', 'replied'
- Check RLS policy allows authenticated updates

