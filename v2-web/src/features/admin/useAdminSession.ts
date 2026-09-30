"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSupabaseBrowserClient, hasSupabaseEnv } from "@/lib/supabase/client";

type AdminSessionState = {
  isLoading: boolean;
  isConfigured: boolean;
  isAuthenticated: boolean;
};

export function useAdminSession() {
  const router = useRouter();
  const [state, setState] = useState<AdminSessionState>(() => {
    const isConfigured = hasSupabaseEnv();

    return {
      isLoading: isConfigured,
      isConfigured,
      isAuthenticated: false,
    };
  });

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      const isAuthenticated = Boolean(data.session);
      setState({ isLoading: false, isConfigured: true, isAuthenticated });

      if (!isAuthenticated) {
        router.replace("/admin/login");
      }
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      const isAuthenticated = Boolean(session);
      setState({ isLoading: false, isConfigured: true, isAuthenticated });

      if (!isAuthenticated) {
        router.replace("/admin/login");
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, [router]);

  return state;
}
