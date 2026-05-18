-- GadgetFlow schema
-- Run this in Supabase SQL Editor.

create extension if not exists "pgcrypto";

-- Suppliers ------------------------------------------------------------------
create table if not exists public.suppliers (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  code        text not null unique,
  is_admin    boolean not null default false,
  created_at  timestamptz not null default now()
);

-- For existing installs created before the is_admin column existed:
alter table public.suppliers
  add column if not exists is_admin boolean not null default false;

-- Products -------------------------------------------------------------------
create table if not exists public.products (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  specs        text,
  price        numeric not null default 0,
  image_url    text,
  status       text not null default 'available'
                check (status in ('available','sold')),
  supplier_id  uuid references public.suppliers(id) on delete cascade,
  created_at   timestamptz not null default now()
);

create index if not exists products_supplier_id_idx on public.products(supplier_id);
create index if not exists products_status_idx      on public.products(status);
create index if not exists products_created_at_idx  on public.products(created_at desc);

-- Realtime -------------------------------------------------------------------
alter publication supabase_realtime add table public.products;

-- Row Level Security ---------------------------------------------------------
alter table public.suppliers enable row level security;
alter table public.products  enable row level security;

drop policy if exists "public_read_suppliers"   on public.suppliers;
drop policy if exists "public_insert_suppliers" on public.suppliers;
drop policy if exists "public_read_products"    on public.products;
drop policy if exists "public_insert_products"  on public.products;
drop policy if exists "public_update_products"  on public.products;
drop policy if exists "public_delete_products"  on public.products;

create policy "public_read_suppliers"
  on public.suppliers for select
  using (true);

create policy "public_insert_suppliers"
  on public.suppliers for insert
  with check (true);

create policy "public_read_products"
  on public.products for select
  using (true);

create policy "public_insert_products"
  on public.products for insert
  with check (true);

create policy "public_update_products"
  on public.products for update
  using (true)
  with check (true);

create policy "public_delete_products"
  on public.products for delete
  using (true);

-- Storage bucket -------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

drop policy if exists "product_images_read"   on storage.objects;
drop policy if exists "product_images_write"  on storage.objects;
drop policy if exists "product_images_update" on storage.objects;
drop policy if exists "product_images_delete" on storage.objects;

create policy "product_images_read"
  on storage.objects for select
  using (bucket_id = 'product-images');

create policy "product_images_write"
  on storage.objects for insert
  with check (bucket_id = 'product-images');

create policy "product_images_update"
  on storage.objects for update
  using (bucket_id = 'product-images')
  with check (bucket_id = 'product-images');

create policy "product_images_delete"
  on storage.objects for delete
  using (bucket_id = 'product-images');

-- Seed admin supplier --------------------------------------------------------
-- Code is random and only used as a URL slug. Admin access is determined
-- by the is_admin flag, not by comparing the code string in client JS.
insert into public.suppliers (name, code, is_admin)
values ('Admin', 'P75L2G2KY9C57XD2LNFL', true)
on conflict (code) do update set is_admin = true;
