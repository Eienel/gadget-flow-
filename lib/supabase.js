import { createClient } from '@supabase/supabase-js';

export const PRODUCT_BUCKET = 'product-images';

let _client = null;

function getClient() {
  if (!_client) {
    _client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        auth: { persistSession: false },
        realtime: { params: { eventsPerSecond: 10 } },
      }
    );
  }
  return _client;
}

// Lazy proxy — defers createClient until first method/property access.
// This prevents the "supabaseUrl is required" error during SSR/build
// when env vars are not yet available.
export const supabase = new Proxy(
  {},
  {
    get(_, prop) {
      const c = getClient();
      const val = c[prop];
      return typeof val === 'function' ? val.bind(c) : val;
    },
  }
);
