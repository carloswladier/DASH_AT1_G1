import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Get from build environment (Vite) or localStorage
const getEnv = (key: string) => {
  return (import.meta as any).env?.[key] || localStorage.getItem(key) || '';
};

const supabaseUrl = getEnv('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY');

let supabaseClient: SupabaseClient | null = null;

export const getSupabase = () => {
  const url = getEnv('VITE_SUPABASE_URL');
  const key = getEnv('VITE_SUPABASE_ANON_KEY');

  if (!url || !key) {
    throw new Error('Supabase URL or Anon Key is missing. Please configure them in the Settings panel.');
  }
  
  if (!supabaseClient) {
    supabaseClient = createClient(url, key);
  }
  
  return supabaseClient;
};

// For backward compatibility
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;
