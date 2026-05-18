'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

function formatPrice(value) {
  const n = Number(value || 0);
  return n.toLocaleString('en-NG', { maximumFractionDigits: 0 });
}

function buildWhatsAppMessage(product, siteUrl) {
  const statusLine =
    product.status === 'available' ? 'Status: ✅ In Stock' : 'Status: ❌ Sold';
  const lines = [
    `*${product.name}*`,
    product.specs || '',
    `Price: ₦${formatPrice(product.price)}`,
    statusLine,
    '',
    `View full catalog: ${siteUrl}`,
  ];
  return lines.filter(Boolean).join('\n');
}

export default function ProductCard({
  product,
  index = 0,
  canEdit = false,
  showSupplierBadge = false,
}) {
  const [busy, setBusy] = useState(false);
  const isSold = product.status === 'sold';

  const siteUrl =
    typeof window !== 'undefined' ? window.location.origin : '';
  const waHref = `https://wa.me/?text=${encodeURIComponent(
    buildWhatsAppMessage(product, siteUrl)
  )}`;

  async function toggleStatus() {
    if (!canEdit || busy) return;
    setBusy(true);
    const next = isSold ? 'available' : 'sold';
    const { error } = await supabase
      .from('products')
      .update({ status: next })
      .eq('id', product.id);
    if (error) console.error(error);
    setBusy(false);
  }

  const supplierName =
    product.suppliers?.name ||
    product.supplier_name ||
    null;

  return (
    <article
      className="bg-surface border border-border animate-riseIn"
      style={{
        borderRadius: 12,
        animationDelay: `${Math.min(index, 12) * 60}ms`,
      }}
    >
      <div className="relative card-img-wrap">
        <div
          className={`relative w-full ${isSold ? 'sold-fade' : ''}`}
          style={{ aspectRatio: '3 / 4', background: '#0a0a0a' }}
        >
          {product.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image_url}
              alt={product.name}
              className="card-img w-full h-full object-cover block"
              style={{ borderRadius: 0 }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center label-mono text-offwhite/30 text-[10px]">
              NO IMAGE
            </div>
          )}
        </div>

        {showSupplierBadge && supplierName && (
          <span
            className="absolute top-3 left-3 label-mono"
            style={{
              fontSize: 9,
              background: 'rgba(5,5,5,0.85)',
              color: '#f0ece4',
              padding: '6px 10px',
              border: '1px solid #1c1c1c',
              borderRadius: 999,
              backdropFilter: 'blur(6px)',
            }}
          >
            {supplierName}
          </span>
        )}

        <span
          className="absolute top-3 right-3 label-mono flex items-center gap-1.5"
          style={{
            fontSize: 9,
            background: 'rgba(5,5,5,0.85)',
            color: isSold ? '#f87171' : '#4ade80',
            padding: '6px 10px',
            border: '1px solid #1c1c1c',
            borderRadius: 999,
            backdropFilter: 'blur(6px)',
          }}
        >
          <span style={{ fontSize: 8 }}>●</span>
          {isSold ? 'SOLD' : 'AVAILABLE'}
        </span>
      </div>

      <div className={`p-5 ${isSold ? 'sold-fade' : ''}`}>
        <h3
          className="display-serif text-offwhite"
          style={{ fontSize: 20, lineHeight: 1.2 }}
        >
          {product.name}
        </h3>

        {product.specs && (
          <p
            className="label-mono text-offwhite/50 mt-2"
            style={{ fontSize: 10 }}
          >
            {product.specs}
          </p>
        )}

        <div
          className="label-mono text-gold mt-4"
          style={{ fontSize: 22, letterSpacing: '0.04em' }}
        >
          ₦{formatPrice(product.price)}
        </div>

        <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
          {canEdit ? (
            <button
              onClick={toggleStatus}
              disabled={busy}
              className="label-mono text-offwhite/80 hover:text-gold transition-colors disabled:opacity-50"
              style={{ fontSize: 10 }}
            >
              {busy ? '...' : isSold ? '↺ Mark Available' : '✓ Mark Sold'}
            </button>
          ) : (
            <span className="label-mono text-offwhite/40" style={{ fontSize: 10 }}>
              {isSold ? 'No longer available' : 'In stock'}
            </span>
          )}

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on WhatsApp"
            className="text-offwhite/70 hover:text-ok transition-colors"
            title="Share on WhatsApp"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20.5 3.5A11.94 11.94 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.6 5.99L0 24l6.18-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.5-8.5zM12 21.82a9.81 9.81 0 0 1-5-1.37l-.36-.21-3.67.96.98-3.58-.23-.37A9.83 9.83 0 1 1 21.82 12 9.82 9.82 0 0 1 12 21.82zm5.39-7.36c-.3-.15-1.75-.86-2.02-.96s-.47-.15-.67.15-.77.96-.94 1.16-.35.22-.65.07a8.07 8.07 0 0 1-2.37-1.46 8.94 8.94 0 0 1-1.64-2.05c-.17-.3 0-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01a1.1 1.1 0 0 0-.8.37 3.35 3.35 0 0 0-1.05 2.5c0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.08 1.75-.71 2-1.39.25-.69.25-1.27.18-1.39-.08-.13-.28-.2-.58-.35z" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}
