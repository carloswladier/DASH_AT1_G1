import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Get from build environment (Vite) or localStorage
const getEnv = (key: string) => {
  // Try import.meta.env first (baked in at build time)
  const buildVal = (import.meta as any).env?.[key];
  if (buildVal && buildVal !== '') return buildVal;
  
  // Fallback to localStorage (set manually in Settings)
  return localStorage.getItem(key) || '';
};

let supabaseClient: SupabaseClient | null = null;

export const getSupabase = () => {
  const url = getEnv('VITE_SUPABASE_URL');
  const key = getEnv('VITE_SUPABASE_ANON_KEY');

  if (!url || !key) {
    return null;
  }
  
  // Create client if it doesn't exist or if keys changed (though we usually reload on change)
  if (!supabaseClient) {
    supabaseClient = createClient(url, key);
  }
  
  return supabaseClient;
};

// Export the instance for backward compatibility
export const supabase = getSupabase();
