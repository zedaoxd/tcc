import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function getSupabaseInstanseClient() {
  const supabase = createClientComponentClient();
  return supabase;
}
