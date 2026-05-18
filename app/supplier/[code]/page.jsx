'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import AddProductModal from '@/components/AddProductModal';
import SupplierGenerator from '@/components/SupplierGenerator';

const ADMIN_CODE = 'ADMIN-SECRET-2025';

const TABS = [
  { key: 'all', label: 'ALL' },
  { key: 'available', label: 'AVAILABLE' },
  { key: 'sold', label: 'SOLD' },
];

export default function SupplierPage() {
  const params = useParams();
  const code = params?.code;

  const [supplier, setSupplier] = useState(null);
  const [checked, setChecked] = useState(false);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [genOpen, setGenOpen] = useState(false);

  const isAdmin = code === ADMIN_CODE;

  // 1. Validate supplier code
  useEffect(() => {
    let active = true;
    async function check() {
      if (!code) return;
      const { data } = await supabase
        .from('suppliers')
        .select('*')
        .eq('code', code)
        .maybeSingle();
      if (!active) return;
      setSupplier(data || null);
      setChecked(true);
    }
    check();
    return () => {
      active = false;
    };
  }, [code]);

  // 2. Load products + realtime
  useEffect(() => {
    if (!supplier) return;
    let active = true;

    async function load() {
      let query = supabase
        .from('products')
        .select('*, suppliers(name)')
        .order('created_at', { ascending: false });
      if (!isAdmin) query = query.eq('supplier_id', supplier.id);
      const { data, error } = await query;
      if (!active) return;
      if (error) console.error(error);
      setProducts(data || []);
      setLoading(false);
    }
    load();

    const channel = supabase
      .channel(`supplier-${supplier.id}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        () => load()
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, [supplier, isAdmin]);

  const filtered = useMemo(() => {
    if (filter === 'all') return products;
    return products.filter((p) => p.status === filter);
  }, [products, filter]);

  // --- BLOCKED STATE ---
  if (checked && !supplier) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <span
            className="label-mono text-bad"
            style={{ fontSize: 10 }}
          >
            ◈ ACCESS DENIED
          </span>
          <h1
            className="display-serif text-offwhite mt-5"
            style={{ fontSize: 48, lineHeight: 1, fontStyle: 'italic' }}
          >
            This link is not valid.
          </h1>
          <p
            className="label-mono text-offwhite/50 mt-6"
            style={{ fontSize: 11, lineHeight: 1.8 }}
          >
            Contact your admin.
          </p>
          <Link
            href="/"
            className="inline-block mt-10 label-mono border border-border text-offwhite/70 hover:text-gold hover:border-gold transition-colors"
            style={{ padding: '12px 20px', fontSize: 10 }}
          >
            ← BACK TO CATALOG
          </Link>
        </div>
      </main>
    );
  }

  // --- INITIAL LOADER ---
  if (!checked) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p
          className="label-mono text-offwhite/40"
          style={{ fontSize: 11 }}
        >
          AUTHENTICATING…
        </p>
      </main>
    );
  }

  return (
    <>
      {/* Header */}
      <header
        className="sticky top-0 z-30 border-b border-border"
        style={{ background: 'rgba(5,5,5,0.85)', backdropFilter: 'blur(10px)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between gap-4">
          <Link href="/" className="flex flex-col min-w-0">
            <span
              className="display-serif text-offwhite truncate"
              style={{ fontSize: 22 }}
            >
              ◈ GadgetFlow
            </span>
            <span
              className="label-mono text-offwhite/40 mt-0.5"
              style={{ fontSize: 9 }}
            >
              LIVE STOCK · UPDATED IN REAL TIME
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <button
                onClick={() => setGenOpen(true)}
                className="label-mono border border-border text-offwhite/70 hover:text-gold hover:border-gold transition-colors"
                style={{ padding: '11px 16px', fontSize: 10 }}
              >
                + NEW SUPPLIER
              </button>
            )}
            <button
              onClick={() => setAddOpen(true)}
              className="label-mono bg-gold text-bg"
              style={{
                padding: '12px 18px',
                fontSize: 10,
                letterSpacing: '0.18em',
                borderRadius: 0,
              }}
            >
              + ADD PRODUCT
            </button>
          </div>
        </div>
      </header>

      {/* Identity bar */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-10 pb-6">
        <span
          className="label-mono text-gold"
          style={{ fontSize: 10 }}
        >
          {isAdmin ? '◈ ADMIN DASHBOARD' : '◈ SUPPLIER DASHBOARD'}
        </span>
        <h1
          className="display-serif text-offwhite mt-4"
          style={{
            fontSize: 'clamp(36px, 6vw, 64px)',
            lineHeight: 1,
            fontStyle: 'italic',
          }}
        >
          {supplier.name}
        </h1>
        <p
          className="label-mono text-offwhite/40 mt-4"
          style={{ fontSize: 10 }}
        >
          {isAdmin
            ? 'VIEWING ALL STOCK ACROSS SUPPLIERS'
            : 'YOUR PRIVATE STOCK · ONLY YOU SEE THIS'}
        </p>
      </section>

      {/* Filter tabs */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-8">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex gap-6">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setFilter(t.key)}
                className={`label-mono transition-colors ${
                  filter === t.key
                    ? 'text-gold'
                    : 'text-offwhite/40 hover:text-offwhite/70'
                }`}
                style={{ fontSize: 11 }}
              >
                {t.label}
              </button>
            ))}
          </div>
          <span
            className="label-mono text-offwhite/40"
            style={{ fontSize: 10 }}
          >
            {filtered.length} {filtered.length === 1 ? 'ITEM' : 'ITEMS'}
          </span>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
        {loading ? (
          <p
            className="label-mono text-offwhite/40 text-center py-20"
            style={{ fontSize: 11 }}
          >
            LOADING STOCK…
          </p>
        ) : filtered.length === 0 ? (
          <div
            className="text-center py-24 border border-border"
            style={{ borderRadius: 12 }}
          >
            <p
              className="display-serif text-offwhite/60"
              style={{ fontSize: 28 }}
            >
              No products yet.
            </p>
            <p
              className="label-mono text-offwhite/40 mt-3"
              style={{ fontSize: 10 }}
            >
              TAP + ADD PRODUCT TO POST YOUR FIRST ITEM
            </p>
          </div>
        ) : (
          <div className="masonry">
            {filtered.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                index={i}
                canEdit={true}
                showSupplierBadge={isAdmin}
              />
            ))}
          </div>
        )}
      </section>

      <AddProductModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        supplierId={supplier.id}
      />

      {isAdmin && (
        <SupplierGenerator
          open={genOpen}
          onClose={() => setGenOpen(false)}
        />
      )}
    </>
  );
}
