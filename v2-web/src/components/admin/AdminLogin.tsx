"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      setError("Supabase n'est pas configure.");
      setIsLoading(false);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setIsLoading(false);
      return;
    }

    router.replace("/admin");
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#f7f1e7] px-5 text-[#263420]">
      <section className="w-full max-w-md rounded-[2rem] border border-stone-200 bg-[#fffaf1] p-8 shadow-[0_24px_90px_rgba(50,44,33,0.10)]">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8b6f45]">
          Administration
        </p>
        <h1 className="mt-4 text-4xl font-semibold">Connexion</h1>
        <form className="mt-8 grid gap-5" onSubmit={submitLogin}>
          <label className="grid gap-2 text-sm font-semibold text-[#53613f]">
            Email admin
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="rounded-2xl border border-[#d8c9b1] bg-white px-4 py-3 text-base text-[#24351f] outline-none focus:border-[#314b2c]"
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[#53613f]">
            Mot de passe
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="rounded-2xl border border-[#d8c9b1] bg-white px-4 py-3 text-base text-[#24351f] outline-none focus:border-[#314b2c]"
              required
            />
          </label>
          {error ? (
            <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-full bg-[#314b2c] px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#fff8e8] disabled:opacity-50"
          >
            {isLoading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </section>
    </main>
  );
}
