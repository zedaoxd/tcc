declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BACKEND_API_URL: string;
      NEXT_PUBLIC_SUPABASE_STORAGE_HOSTNAME: string;

      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;

      BACKEND_CONTAINER: string;
      BACKEND_PORT: string;
    }
  }
}

export {};
