'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import PhoneMockup from '@/components/PhoneMockup';

const TABS = [
  { key: 'all', label: 'ALL' },
  { key: 'available', label: 'AVAILABLE' },
  { key: 'sold', label: 'SOLD' },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      const { data, error } = await supabase
        .from('products')
        .select('*, suppliers(name)')
        .order('created_at', { ascending: false });
      if (!active) return;
      if (error) console.error(error);
      setProducts(data || []);
      setLoading(false);
    }
    load();

    const channel = supabase
      .channel('public-products')
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
  }, []);

  const filtered = useMemo(() => {
    if (filter === 'all') return products;
    return products.filter((p) => p.status === filter);
  }, [products, filter]);

  return (
    <>
      {/* Header */}
      <header
        className="sticky top-0 z-30 border-b border-border"
        style={{ background: 'rgba(5,5,5,0.85)', backdropFilter: 'blur(10px)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
          <Link href="/" className="flex flex-col">
            <span
              className="display-serif text-offwhite"
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
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-12 lg:pt-24 lg:pb-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 relative z-10">
            <span
              className="label-mono text-gold"
              style={{ fontSize: 10 }}
            >
              ◈ EST. 2025 · LAGOS
            </span>
            <h1
              className="display-serif text-offwhite mt-5"
              style={{
                fontSize: 'clamp(48px, 8vw, 96px)',
                lineHeight: 0.95,
                fontStyle: 'italic',
              }}
            >
              Your Stock.
              <br />
              Always Live.
            </h1>
            <p
              className="label-mono text-offwhite/50 mt-6 max-w-md"
              style={{ fontSize: 11, lineHeight: 1.8 }}
            >
              Share your link. Post your products. Let buyers
              know what&apos;s left.
            </p>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <PhoneMockup />
          </div>
        </div>
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
          <div className="text-center py-24 border border-border" style={{ borderRadius: 12 }}>
            <p
              className="display-serif text-offwhite/60"
              style={{ fontSize: 28 }}
            >
              Nothing here yet.
            </p>
            <p
              className="label-mono text-offwhite/40 mt-3"
              style={{ fontSize: 10 }}
            >
              CHECK BACK SOON
            </p>
          </div>
        ) : (
          <div className="masonry">
            {filtered.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                index={i}
                canEdit={false}
                showSupplierBadge={true}
              />
            ))}
          </div>
        )}
      </section>

      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 flex flex-col md:flex-row justify-between gap-3">
          <span
            className="label-mono text-offwhite/40"
            style={{ fontSize: 9 }}
          >
            © {new Date().getFullYear()} GADGETFLOW · ALL STOCK LIVE
          </span>
          <span
            className="label-mono text-offwhite/40"
            style={{ fontSize: 9 }}
          >
            BUILT FOR RESELLERS
          </span>
        </div>
      </footer>
    </>
  );
}
