-- An official may carry a primary position plus one secondary and one tertiary designation.
alter table public.officials
  add column if not exists secondary_designation text not null default '',
  add column if not exists tertiary_designation text not null default '';

-- The earlier barangay-level designation columns are intentionally retained
-- so existing values are not discarded. The application no longer reads or
-- writes them; new designation data belongs to public.officials.
