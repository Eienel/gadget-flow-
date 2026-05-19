-- GadgetFlow migration: stock quantity tracking
-- Run once in Supabase SQL Editor. Idempotent.
--
-- Adds:
--   products.quantity   - how many units the supplier still has
--   products.sold_count - how many have been sold so far
--
-- The existing `status` column stays in sync ('available' when
-- quantity > 0, 'sold' when quantity = 0) so all current filters
-- keep working.

alter table public.products
  add column if not exists quantity   int not null default 1,
  add column if not exists sold_count int not null default 0;

-- Backfill: rows already marked sold were 1-of-1.
-- (Only touches rows that still look like fresh defaults so re-runs are safe.)
update public.products
   set quantity = 0, sold_count = 1
 where status = 'sold' and sold_count = 0 and quantity = 1;

-- Sanity constraints (idempotent)
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'products_quantity_nonneg') then
    alter table public.products add constraint products_quantity_nonneg check (quantity >= 0);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'products_sold_nonneg') then
    alter table public.products add constraint products_sold_nonneg check (sold_count >= 0);
  end if;
end $$;
