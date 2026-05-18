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
  { key: 'all', label: 'All' },
  { key: 'available', label: 'Live' },
  { key: 'sold', label: 'Sold' },
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

  const liveCount = products.filter((p) => p.status === 'available').length;
  const soldCount = products.filter((p) => p.status === 'sold').length;

  // --- BLOCKED STATE ---
  if (checked && !supplier) {
    return (
      <main className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div
          className="orb"
          style={{
            width: 500,
            height: 500,
            top: -120,
            right: -120,
            background: 'radial-gradient(circle, #ff8fab 0%, transparent 70%)',
            opacity: 0.4,
          }}
        />
        <div
          className="orb"
          style={{
            width: 500,
            height: 500,
            bottom: -120,
            left: -120,
            background: 'radial-gradient(circle, #5ac8fa 0%, transparent 70%)',
            opacity: 0.3,
          }}
        />
        <div className="relative z-10 max-w-md text-center">
          <span className="inline-block text-xs font-semibold text-bad bg-white/70 backdrop-blur px-3 py-1.5 rounded-full border border-line">
            ACCESS DENIED
          </span>
          <h1
            className="display-xl mt-6 text-ink"
            style={{ fontSize: 'clamp(36px, 6vw, 56px)' }}
          >
            This link isn&apos;t valid.
          </h1>
          <p className="text-muted text-lg mt-5">Contact your admin.</p>
          <Link href="/" className="btn btn-primary btn-lg mt-10">
            ← Back to catalog
          </Link>
        </div>
      </main>
    );
  }

  if (!checked) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-muted text-sm font-medium">Authenticating…</p>
      </main>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-30 glass-strong">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-14 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <span className="text-base font-semibold text-ink tracking-tight truncate">
              GadgetFlow
            </span>
            <span className="hidden sm:inline text-xs text-muted2 truncate">
              · {isAdmin ? 'Admin' : supplier.name}
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={() => setGenOpen(true)}
                className="btn btn-ghost"
              >
                + Supplier
              </button>
            )}
            <button
              onClick={() => setAddOpen(true)}
              className="btn btn-accent"
            >
              + Add product
            </button>
          </div>
        </div>
      </header>

      {/* Hero / Identity */}
      <section className="relative overflow-hidden">
        <div className="smoke-layer" />
        <div
          className="orb animate-floatA"
          style={{
            width: 480,
            height: 480,
            top: -120,
            left: -120,
            background:
              'radial-gradient(circle, #5ac8fa 0%, #0071e3 60%, transparent 70%)',
            opacity: 0.35,
          }}
        />
        <div
          className="orb animate-floatB"
          style={{
            width: 440,
            height: 440,
            top: -100,
            right: -100,
            background:
              'radial-gradient(circle, #bd66ff 0%, #ff8fab 60%, transparent 70%)',
            opacity: 0.32,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-16 lg:pt-24 pb-10">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-accent bg-white/70 backdrop-blur px-3 py-1.5 rounded-full border border-line">
            {isAdmin ? 'ADMIN DASHBOARD' : 'SUPPLIER DASHBOARD'}
          </span>

          <h1
            className="display-xl mt-6"
            style={{ fontSize: 'clamp(40px, 7vw, 84px)' }}
          >
            {supplier.name}.
          </h1>

          <p className="text-muted text-lg lg:text-xl mt-4 max-w-2xl tracking-tight">
            {isAdmin
              ? 'You see everything. All stock across every supplier. Real-time.'
              : 'Your private inventory. Only you can post here. Only buyers see your live stock.'}
          </p>

          {/* Stats */}
          <div className="mt-10 flex gap-3 flex-wrap">
            <div className="card !p-5 min-w-[140px]">
              <p className="text-xs font-semibold text-muted2 uppercase tracking-wide">
                Total
              </p>
              <p className="display-md text-ink mt-1" style={{ fontSize: 32 }}>
                {products.length}
              </p>
            </div>
            <div className="card !p-5 min-w-[140px]">
              <p className="text-xs font-semibold text-ok uppercase tracking-wide flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-ok animate-pulse" />
                Live
              </p>
              <p className="display-md text-ink mt-1" style={{ fontSize: 32 }}>
                {liveCount}
              </p>
            </div>
            <div className="card !p-5 min-w-[140px]">
              <p className="text-xs font-semibold text-muted2 uppercase tracking-wide">
                Sold
              </p>
              <p className="display-md text-ink mt-1" style={{ fontSize: 32 }}>
                {soldCount}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-6 pb-8 border-t border-line">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-1 bg-canvas3 p-1 rounded-full">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setFilter(t.key)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === t.key
                    ? 'bg-white text-ink shadow-sm'
                    : 'text-muted hover:text-ink'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <span className="text-muted text-sm font-medium">
            {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
          </span>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-32">
        {loading ? (
          <p className="text-muted text-center py-24 text-base font-medium">
            Loading…
          </p>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 bg-canvas2 border border-line rounded-3xl">
            <p
              className="display-md text-ink"
              style={{ fontSize: 28 }}
            >
              No products yet.
            </p>
            <p className="text-muted mt-3">
              Tap <span className="font-semibold text-ink">+ Add product</span> to post your first item.
            </p>
            <button
              onClick={() => setAddOpen(true)}
              className="btn btn-accent btn-lg mt-8"
            >
              + Add product
            </button>
          </div>
        ) : (
          <div className="product-grid">
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
