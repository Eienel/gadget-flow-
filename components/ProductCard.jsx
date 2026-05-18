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
    product.suppliers?.name || product.supplier_name || null;

  return (
    <article
      className="card animate-riseIn p-3"
      style={{ animationDelay: `${Math.min(index, 12) * 60}ms` }}
    >
      {/* Image */}
      <div className="relative">
        <div
          className={`img-wrap relative w-full ${isSold ? 'sold-fade' : ''}`}
          style={{ aspectRatio: '4 / 5', background: '#f5f5f7' }}
        >
          {product.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover block"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted2 text-sm font-medium">
              No image
            </div>
          )}
        </div>

        {/* Supplier pill (top-left) */}
        {showSupplierBadge && supplierName && (
          <span className="pill pill-supplier absolute top-3 left-3">
            {supplierName}
          </span>
        )}

        {/* Status pill (top-right) */}
        <span
          className={`absolute top-3 right-3 pill ${
            isSold ? 'pill-sold' : 'pill-available'
          }`}
        >
          <span
            className="pill-dot"
            style={{
              background: isSold ? '#b3261e' : '#0a7d2c',
            }}
          />
          {isSold ? 'Sold' : 'Live'}
        </span>
      </div>

      {/* Body */}
      <div className={`px-2 pt-5 pb-3 ${isSold ? 'sold-fade' : ''}`}>
        <h3
          className="text-ink font-semibold tracking-tight leading-tight"
          style={{ fontSize: 20, letterSpacing: '-0.02em' }}
        >
          {product.name}
        </h3>

        {product.specs && (
          <p className="text-muted text-sm mt-1.5 leading-snug">
            {product.specs}
          </p>
        )}

        <div className="mt-4 flex items-baseline gap-1">
          <span
            className="text-ink font-bold"
            style={{ fontSize: 28, letterSpacing: '-0.03em' }}
          >
            ₦{formatPrice(product.price)}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-5 pt-4 border-t border-line flex items-center justify-between gap-2">
          {canEdit ? (
            <button
              onClick={toggleStatus}
              disabled={busy}
              className={`btn ${
                isSold ? 'btn-ghost' : 'btn-primary'
              } disabled:opacity-50`}
              style={{ fontSize: 13, padding: '8px 16px' }}
            >
              {busy
                ? '...'
                : isSold
                ? '↺ Mark available'
                : '✓ Mark sold'}
            </button>
          ) : (
            <span className="text-muted text-sm font-medium">
              {isSold ? 'No longer available' : 'In stock'}
            </span>
          )}

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on WhatsApp"
            title="Share on WhatsApp"
            className="w-9 h-9 rounded-full bg-canvas3 hover:bg-[#e8f7ee] flex items-center justify-center transition-colors group"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-muted group-hover:text-[#25d366] transition-colors"
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
