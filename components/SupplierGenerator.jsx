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
      // ensure uniqueness — retry once on collision
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
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
      onClick={handleClose}
    >
      <div
        className="w-full md:max-w-md bg-surface border border-border animate-modalIn"
        style={{ borderRadius: 12, padding: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="display-serif text-offwhite" style={{ fontSize: 26 }}>
            New Supplier
          </h2>
          <button
            onClick={handleClose}
            className="label-mono text-offwhite/50 hover:text-offwhite"
            style={{ fontSize: 10 }}
          >
            ✕ CLOSE
          </button>
        </div>

        {!generated ? (
          <form onSubmit={handleCreate} className="flex flex-col gap-1">
            <input
              className="line-input"
              placeholder="SUPPLIER NAME"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              disabled={busy}
              className="mt-6 w-full label-mono bg-gold text-bg disabled:opacity-50"
              style={{
                padding: '14px 16px',
                fontSize: 11,
                borderRadius: 0,
                letterSpacing: '0.2em',
              }}
            >
              {busy ? 'GENERATING…' : 'GENERATE LINK'}
            </button>
          </form>
        ) : (
          <div>
            <p
              className="label-mono text-offwhite/40 mb-2"
              style={{ fontSize: 9 }}
            >
              SUPPLIER
            </p>
            <p
              className="display-serif text-offwhite mb-6"
              style={{ fontSize: 22 }}
            >
              {generated.name}
            </p>

            <p
              className="label-mono text-offwhite/40 mb-2"
              style={{ fontSize: 9 }}
            >
              PRIVATE LINK
            </p>
            <div
              className="border border-border bg-bg p-3 break-all label-mono text-gold"
              style={{ fontSize: 11 }}
            >
              {generated.link}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={copyLink}
                className="flex-1 label-mono bg-gold text-bg"
                style={{
                  padding: '14px 16px',
                  fontSize: 11,
                  borderRadius: 0,
                  letterSpacing: '0.2em',
                }}
              >
                {copied ? '✓ COPIED' : 'COPY LINK'}
              </button>
              <button
                onClick={reset}
                className="label-mono border border-border text-offwhite/70 hover:text-offwhite"
                style={{
                  padding: '14px 16px',
                  fontSize: 11,
                  letterSpacing: '0.2em',
                }}
              >
                + NEW
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
