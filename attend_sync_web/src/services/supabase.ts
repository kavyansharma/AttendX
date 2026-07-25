import { createClient } from '@supabase/supabase-js';

// Environment variables
const metaEnv = (import.meta as any).env || {};
const supabaseUrl = metaEnv.VITE_SUPABASE_URL || 'https://demo-attendx.supabase.co';
const supabaseAnonKey = metaEnv.VITE_SUPABASE_ANON_KEY || 'demo-anon-key-placeholder';

export const isSupabaseConfigured = Boolean(
  metaEnv.VITE_SUPABASE_URL && metaEnv.VITE_SUPABASE_ANON_KEY
);

// Never expose service role key in client code
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
