-- Run once in Supabase SQL Editor if you already have the notices table
ALTER TABLE notices
  ADD COLUMN IF NOT EXISTS sort_order INTEGER NOT NULL DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_notices_sort_order ON notices(sort_order);
