'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import PhoneMockup from '@/components/PhoneMockup';

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'available', label: 'Live' },
  { key: 'sold', label: 'Sold' },
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

  const liveCount = products.filter((p) => p.status === 'available').length;

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-30 glass-strong">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-base font-semibold text-ink tracking-tight">
              GadgetFlow
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <span className="hidden md:inline-flex items-center gap-2 text-xs font-medium text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-ok animate-pulse" />
              {liveCount} live now
            </span>
            <Link
              href="/supplier/ADMIN-SECRET-2025"
              className="text-sm font-medium text-ink hover:text-accent transition-colors"
            >
              Admin
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* white smoke wisps */}
        <div className="smoke-layer" />

        {/* gradient orbs */}
        <div
          className="orb animate-floatA"
          style={{
            width: 560,
            height: 560,
            top: -160,
            left: -160,
            background:
              'radial-gradient(circle, #5ac8fa 0%, #0071e3 60%, transparent 70%)',
          }}
        />
        <div
          className="orb animate-floatB"
          style={{
            width: 520,
            height: 520,
            top: -100,
            right: -120,
            background:
              'radial-gradient(circle, #ff8fab 0%, #bd66ff 55%, transparent 70%)',
          }}
        />
        <div
          className="orb"
          style={{
            width: 440,
            height: 440,
            bottom: -180,
            left: '40%',
            background:
              'radial-gradient(circle, #ffd60a 0%, #ff9f0a 50%, transparent 70%)',
            opacity: 0.32,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-24 lg:pt-32 pb-20 lg:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 relative z-10">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-accent bg-white/70 backdrop-blur px-3 py-1.5 rounded-full border border-line">
                <span className="w-1.5 h-1.5 rounded-full bg-ok animate-pulse" />
                LIVE · UPDATED IN REAL TIME
              </span>

              <h1 className="display-xxl mt-6">
                Stock.
                <br />
                <span className="text-gradient">Beautifully live.</span>
              </h1>

              <p className="text-xl md:text-2xl text-muted mt-6 max-w-xl font-normal leading-snug tracking-tight">
                Share your link. Post your products. Let every buyer
                know what&apos;s left — the second it happens.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#catalog" className="btn btn-primary btn-lg">
                  Browse stock →
                </a>
                <Link
                  href="/supplier/ADMIN-SECRET-2025"
                  className="btn btn-ghost btn-lg"
                >
                  Open admin
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
              <PhoneMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Feature row */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20 border-t border-line">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: 'Real-time, always.',
              desc: 'Mark a product sold and every viewer sees it instantly. No refresh.',
            },
            {
              title: 'Private supplier links.',
              desc: 'Each reseller gets a unique URL. Their stock, their dashboard, their inventory.',
            },
            {
              title: 'WhatsApp-first.',
              desc: 'Every card ships with a one-tap share. Pre-filled message. Price, status, link.',
            },
          ].map((f, i) => (
            <div key={i}>
              <h3
                className="display-md text-ink"
                style={{ fontSize: 26 }}
              >
                {f.title}
              </h3>
              <p className="text-muted text-base mt-3 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Catalog header */}
      <section
        id="catalog"
        className="max-w-7xl mx-auto px-6 lg:px-10 pt-8 pb-8 border-t border-line"
      >
        <div className="flex items-end justify-between flex-wrap gap-6 mb-8">
          <div>
            <p className="text-xs font-semibold text-accent tracking-wide uppercase">
              The catalog
            </p>
            <h2
              className="display-lg text-ink mt-2"
              style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}
            >
              Available right now.
            </h2>
          </div>

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
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-32">
        {loading ? (
          <p className="text-muted text-center py-24 text-base font-medium">
            Loading stock…
          </p>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 bg-canvas2 border border-line rounded-3xl">
            <p
              className="display-md text-ink"
              style={{ fontSize: 28 }}
            >
              Nothing here yet.
            </p>
            <p className="text-muted mt-3">Check back soon.</p>
          </div>
        ) : (
          <div className="product-grid">
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

      <footer className="border-t border-line bg-canvas2">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 flex flex-col md:flex-row justify-between gap-4 text-sm text-muted">
          <span>© {new Date().getFullYear()} GadgetFlow. Live stock for resellers.</span>
          <span>Built for the WhatsApp generation.</span>
        </div>
      </footer>
    </>
  );
}
