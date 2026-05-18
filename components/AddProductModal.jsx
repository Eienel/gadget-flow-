'use client';

import { useEffect, useRef, useState } from 'react';
import { supabase, PRODUCT_BUCKET } from '@/lib/supabase';

export default function AddProductModal({ open, onClose, supplierId }) {
  const [name, setName] = useState('');
  const [specs, setSpecs] = useState('');
  const [price, setPrice] = useState('');
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
      const { error: insErr } = await supabase.from('products').insert({
        name: name.trim(),
        specs: specs.trim() || null,
        price: Number(price),
        image_url: imageUrl,
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
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="w-full md:max-w-md bg-surface border border-border animate-modalIn"
        style={{ borderRadius: 12, padding: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="display-serif text-offwhite" style={{ fontSize: 26 }}>
            New Product
          </h2>
          <button
            onClick={onClose}
            className="label-mono text-offwhite/50 hover:text-offwhite"
            style={{ fontSize: 10 }}
          >
            ✕ CLOSE
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
          {/* Drop zone */}
          <div
            className="dropzone mb-4"
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
              <div className="text-center">
                <div
                  className="display-serif text-offwhite/60"
                  style={{ fontSize: 18 }}
                >
                  Drop image
                </div>
                <div
                  className="label-mono text-offwhite/40 mt-1"
                  style={{ fontSize: 9 }}
                >
                  OR CLICK TO UPLOAD
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
            className="line-input"
            placeholder="PRODUCT NAME"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="line-input"
            placeholder="SPECS · 128GB / SPACE BLACK / SEALED"
            value={specs}
            onChange={(e) => setSpecs(e.target.value)}
          />
          <input
            className="line-input"
            placeholder="PRICE (NGN)"
            type="number"
            inputMode="numeric"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          {error && (
            <p
              className="label-mono text-bad mt-3"
              style={{ fontSize: 10 }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full label-mono bg-gold text-bg disabled:opacity-50"
            style={{
              padding: '14px 16px',
              fontSize: 11,
              borderRadius: 0,
              letterSpacing: '0.2em',
            }}
          >
            {submitting ? 'UPLOADING…' : 'PUBLISH PRODUCT'}
          </button>
        </form>
      </div>
    </div>
  );
}
