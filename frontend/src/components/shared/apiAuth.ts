"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const apiAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
});

export const useApiAuth = () => {
  const { data: session } = useSession();

  useEffect(() => {
    const requestIntercep = apiAuth.interceptors.request.use((config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${session?.token}`;
      }

      return config;
    });

    return () => {
      apiAuth.interceptors.request.eject(requestIntercep);
    };
  }, [session?.token]);

  return apiAuth;
};
