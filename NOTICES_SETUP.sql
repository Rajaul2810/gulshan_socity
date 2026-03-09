-- Notices table for Gulshan Society Notice Board
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS notices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,

  title TEXT NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT,
  category TEXT NOT NULL CHECK (category IN (
    'Security Notice',
    'Maintenance Notice',
    'Event Notice',
    'Meeting Notice',
    'Emergency Notice',
    'General Announcement'
  )),
  priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('normal', 'important')),
  publish_date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  expiry_date TIMESTAMP WITH TIME ZONE,
  attachment_url TEXT,
  attachment_name TEXT,
  created_by UUID,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  is_pinned BOOLEAN DEFAULT false
);

CREATE INDEX IF NOT EXISTS idx_notices_status ON notices(status);
CREATE INDEX IF NOT EXISTS idx_notices_publish_date ON notices(publish_date DESC);
CREATE INDEX IF NOT EXISTS idx_notices_category ON notices(category);
CREATE INDEX IF NOT EXISTS idx_notices_priority ON notices(priority);
CREATE INDEX IF NOT EXISTS idx_notices_is_pinned ON notices(is_pinned) WHERE is_pinned = true;

-- Update trigger
CREATE OR REPLACE FUNCTION update_notices_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_notices_updated_at ON notices;
CREATE TRIGGER update_notices_updated_at
  BEFORE UPDATE ON notices
  FOR EACH ROW EXECUTE FUNCTION update_notices_updated_at();

-- RLS (optional - enable if you use auth)
-- ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Public can read active notices" ON notices FOR SELECT USING (status = 'active');

-- Storage: Create a bucket named "notice-attachments" in Supabase Dashboard (Storage -> New bucket).
-- Set it to Public so notice attachment URLs work. Then run this SQL.
