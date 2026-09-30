"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useAdminSession } from "@/features/admin/useAdminSession";

type AdminShellProps = {
  children: ReactNode;
  title: string;
  subtitle?: string;
};

export function AdminShell({ children, title, subtitle }: AdminShellProps) {
  const router = useRouter();
  const session = useAdminSession();

  async function signOut() {
    const supabase = getSupabaseBrowserClient();
    await supabase?.auth.signOut();
    router.replace("/admin/login");
  }

  if (!session.isConfigured) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f7f1e7] px-5 text-[#263420]">
        <section className="max-w-xl rounded-[2rem] border border-stone-200 bg-[#fffaf1] p-8 shadow-[0_24px_90px_rgba(50,44,33,0.10)]">
          <h1 className="text-3xl font-semibold">Supabase non configure</h1>
          <p className="mt-4 leading-7 text-[#6e695f]">
            Ajoutez `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`
            dans `.env.local`.
          </p>
        </section>
      </main>
    );
  }

  if (session.isLoading || !session.isAuthenticated) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f7f1e7] text-[#263420]">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b6f45]">
          Chargement admin
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f1e7] px-5 py-6 text-[#263420] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-6 border-b border-[#ddcfb9] pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8b6f45]">
              Administration
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-[#24351f] sm:text-5xl">{title}</h1>
            {subtitle ? <p className="mt-3 text-lg text-[#6e695f]">{subtitle}</p> : null}
          </div>
          <nav className="flex flex-wrap gap-3">
            <Link className="rounded-full border border-[#cfc4ad] px-5 py-3 text-sm font-semibold" href="/admin">
              Dashboard
            </Link>
            <Link className="rounded-full border border-[#cfc4ad] px-5 py-3 text-sm font-semibold" href="/admin/diagnostics">
              Historique
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="rounded-full bg-[#314b2c] px-5 py-3 text-sm font-semibold text-[#fff8e8]"
            >
              Deconnexion
            </button>
          </nav>
        </header>
        <div className="py-8">{children}</div>
      </div>
    </main>
  );
}
