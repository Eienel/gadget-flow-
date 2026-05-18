-- GadgetFlow migration — admin via DB flag (run once in SQL Editor)
--
-- Before: admin was identified by comparing the URL code to a string
-- baked into the client JS bundle ('ADMIN-SECRET-2025'). Anyone could
-- inspect-source and find it.
--
-- After: an `is_admin` boolean on the suppliers table determines admin
-- access. The admin's code becomes just another random string with no
-- special meaning in client code.
--
-- This script is idempotent — safe to run more than once.

-- 1. Add the flag column.
alter table public.suppliers
  add column if not exists is_admin boolean not null default false;

-- 2. Rotate the original seeded admin (if it still exists) to the new
--    strong code and mark it as admin.
update public.suppliers
   set code = 'P75L2G2KY9C57XD2LNFL',
       is_admin = true
 where code = 'ADMIN-SECRET-2025';

-- 3. Ensure an admin row with the new code exists. If a row with that
--    code is already present, just re-affirm is_admin = true.
insert into public.suppliers (name, code, is_admin)
values ('Admin', 'P75L2G2KY9C57XD2LNFL', true)
on conflict (code) do update set is_admin = true;
