-- GadgetFlow schema
-- Run this in Supabase SQL Editor.

create extension if not exists "pgcrypto";

-- Suppliers ------------------------------------------------------------------
create table if not exists public.suppliers (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  code        text not null unique,
  created_at  timestamptz not null default now()
);

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
insert into public.suppliers (name, code)
values ('Admin', 'ADMIN-SECRET-2025')
on conflict (code) do nothing;
