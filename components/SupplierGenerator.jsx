'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

function generateCode(len = 8) {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let out = '';
  for (let i = 0; i < len; i++) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return out;
}

export default function SupplierGenerator({ open, onClose }) {
  const [name, setName] = useState('');
  const [generated, setGenerated] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  async function handleCreate(e) {
    e.preventDefault();
    setError('');
    if (!name.trim()) {
      setError('Enter a supplier name.');
      return;
    }
    setBusy(true);
    try {
      let code = generateCode(8);
      let { data, error: insErr } = await supabase
        .from('suppliers')
        .insert({ name: name.trim(), code })
        .select()
        .single();
      if (insErr && insErr.code === '23505') {
        code = generateCode(8);
        ({ data, error: insErr } = await supabase
          .from('suppliers')
          .insert({ name: name.trim(), code })
          .select()
          .single());
      }
      if (insErr) throw insErr;
      const origin =
        typeof window !== 'undefined' ? window.location.origin : '';
      setGenerated({
        name: data.name,
        code: data.code,
        link: `${origin}/supplier/${data.code}`,
      });
      setName('');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Could not create supplier.');
    } finally {
      setBusy(false);
    }
  }

  async function copyLink() {
    if (!generated?.link) return;
    try {
      await navigator.clipboard.writeText(generated.link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  }

  function reset() {
    setGenerated(null);
    setError('');
  }

  function handleClose() {
    reset();
    onClose?.();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center animate-overlayIn"
      style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(10px)' }}
      onClick={handleClose}
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
              Admin
            </p>
            <h2
              className="display-md text-ink mt-1"
              style={{ fontSize: 30 }}
            >
              New supplier
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-canvas3 hover:bg-[#e8e8ed] flex items-center justify-center text-ink2 transition-colors"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M6 6 L18 18 M6 18 L18 6" />
            </svg>
          </button>
        </div>

        {!generated ? (
          <form onSubmit={handleCreate} className="flex flex-col gap-4">
            <input
              className="field"
              placeholder="Supplier name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {error && (
              <p className="text-bad text-sm font-medium">{error}</p>
            )}
            <button
              type="submit"
              disabled={busy}
              className="btn btn-accent btn-lg w-full mt-2 disabled:opacity-60"
            >
              {busy ? 'Generating…' : 'Generate private link'}
            </button>
          </form>
        ) : (
          <div>
            <p className="text-xs font-semibold text-muted2 uppercase tracking-wide">
              Supplier
            </p>
            <p className="text-2xl font-semibold text-ink mt-1 mb-6 tracking-tight">
              {generated.name}
            </p>

            <p className="text-xs font-semibold text-muted2 uppercase tracking-wide mb-2">
              Private link
            </p>
            <div
              className="bg-canvas3 p-4 break-all text-accent text-sm font-medium"
              style={{ borderRadius: 14 }}
            >
              {generated.link}
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={copyLink}
                className="btn btn-accent btn-lg flex-1"
              >
                {copied ? '✓ Copied' : 'Copy link'}
              </button>
              <button
                onClick={reset}
                className="btn btn-ghost btn-lg"
              >
                + New
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
