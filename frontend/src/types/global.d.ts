declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
      NEXT_PUBLIC_SUPABASE_STORAGE_HOSTNAME: string;
      NEXT_PUBLIC_BACKEND_API_URL: string;
    }
  }
}

export {};
