-- Restore the optional barangay-level designation fields used by forms.
alter table public.barangays
  add column if not exists secondary_designation text not null default '',
  add column if not exists tertiary_designation text not null default '';
