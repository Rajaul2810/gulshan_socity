-- Run in Supabase SQL Editor so long addresses are not limited by VARCHAR length.
-- Safe if the column is already TEXT (no-op in practice).

ALTER TABLE public.members
  ALTER COLUMN residence_address TYPE TEXT USING residence_address::TEXT;

ALTER TABLE public.membership_applications
  ALTER COLUMN residence_address TYPE TEXT USING residence_address::TEXT;
