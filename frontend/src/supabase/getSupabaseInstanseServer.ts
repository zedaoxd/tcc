import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export function getSupabaseInstanseServer() {
  const supabase = createServerComponentClient({ cookies });
  return supabase;
}
