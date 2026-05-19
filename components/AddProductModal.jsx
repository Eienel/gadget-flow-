'use client';

import { useEffect, useRef, useState } from 'react';
import { supabase, PRODUCT_BUCKET } from '@/lib/supabase';

export default function AddProductModal({ open, onClose, supplierId }) {
  const [name, setName] = useState('');
  const [specs, setSpecs] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const fileInput = useRef(null);

  useEffect(() => {
    if (!open) {
      setName('');
      setSpecs('');
      setPrice('');
      setQuantity(1);
      setFile(null);
      setPreview(null);
      setError('');
      setSubmitting(false);
    }
  }, [open]);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape' && open) onClose?.();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  async function uploadImage(f) {
    const ext = f.name.split('.').pop() || 'jpg';
    const path = `${supplierId || 'unknown'}/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from(PRODUCT_BUCKET)
      .upload(path, f, { cacheControl: '3600', upsert: false });
    if (upErr) throw upErr;
    const { data } = supabase.storage.from(PRODUCT_BUCKET).getPublicUrl(path);
    return data.publicUrl;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!name.trim() || !price) {
      setError('Name and price are required.');
      return;
    }
    if (!supplierId) {
      setError('Missing supplier. Reload the page.');
      return;
    }
    setSubmitting(true);
    try {
      let imageUrl = null;
      if (file) imageUrl = await uploadImage(file);
      const qty = Math.max(1, Number(quantity) || 1);
      const { error: insErr } = await supabase.from('products').insert({
        name: name.trim(),
        specs: specs.trim() || null,
        price: Number(price),
        image_url: imageUrl,
        quantity: qty,
        sold_count: 0,
        status: 'available',
        supplier_id: supplierId,
      });
      if (insErr) throw insErr;
      onClose?.();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center animate-overlayIn"
      style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <div
        className="w-full md:max-w-lg bg-canvas border border-line animate-modalIn"
        style={{
          borderRadius: 28,
          padding: 32,
          boxShadow: '0 30px 90px -10px rgba(0,0,0,0.25)',
          margin: 16,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-7">
          <div>
            <p className="text-xs font-semibold text-accent tracking-wide uppercase">
              New
            </p>
            <h2
              className="display-md text-ink mt-1"
              style={{ fontSize: 30 }}
            >
              Post a product
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-canvas3 hover:bg-[#e8e8ed] flex items-center justify-center text-ink2 transition-colors"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M6 6 L18 18 M6 18 L18 6" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Drop zone */}
          <div
            className="dropzone"
            onClick={() => fileInput.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const f = e.dataTransfer.files?.[0];
              if (f && f.type.startsWith('image/')) setFile(f);
            }}
          >
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center px-6">
                <div className="text-ink font-semibold text-base">
                  Drop image here
                </div>
                <div className="text-muted text-sm mt-1">
                  or click to upload
                </div>
              </div>
            )}
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>

          <input
            className="field"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="field"
            placeholder="Specs · 128GB · Space Black · Sealed"
            value={specs}
            onChange={(e) => setSpecs(e.target.value)}
          />
          <input
            className="field"
            placeholder="Price (₦)"
            type="number"
            inputMode="numeric"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          {/* Quantity stepper */}
          <div
            className="flex items-center justify-between bg-canvas3 px-4 py-3"
            style={{ borderRadius: 14 }}
          >
            <div>
              <p className="text-sm font-medium text-ink">Quantity in stock</p>
              <p className="text-xs text-muted2 mt-0.5">How many units you have</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-full bg-white border border-line text-ink font-semibold hover:bg-canvas2 active:scale-95 transition"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="text-base font-semibold text-ink min-w-[28px] text-center tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-9 h-9 rounded-full bg-white border border-line text-ink font-semibold hover:bg-canvas2 active:scale-95 transition"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {error && (
            <p className="text-bad text-sm font-medium mt-1">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-accent btn-lg w-full mt-3 disabled:opacity-60"
          >
            {submitting ? 'Publishing…' : 'Publish product'}
          </button>
        </form>
      </div>
    </div>
  );
}
