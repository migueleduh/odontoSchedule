import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Princípio Fail-Fast: garantimos que o código avise claramente se faltar configuração
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Faltam variáveis de ambiente do Supabase no arquivo .env!");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);