import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDiagnosticConfig } from "@/features/diagnostics/questionnaire-config";

export default async function DiagnosticIntroPage({ params }: PageProps<"/diagnostic/[type]">) {
  const { type } = await params;
  const config = getDiagnosticConfig(type);

  if (!config) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f7f1e7] px-5 py-5 text-[#263420] sm:px-8 lg:px-12">
      <section className="mx-auto grid min-h-[calc(100vh-2.5rem)] w-full max-w-7xl overflow-hidden rounded-[2rem] border border-stone-200 bg-[#fffaf1] shadow-[0_24px_90px_rgba(50,44,33,0.10)] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative min-h-[300px] bg-[#ede1cf] lg:min-h-full">
          <Image
            src={config.visual.image}
            alt={config.visual.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-contain p-12 sm:p-16"
            priority
          />
          {config.isTemporaryDemo ? (
            <div className="absolute left-6 top-6 rounded-full bg-[#fffaf1]/90 px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#6a5636] backdrop-blur">
              Demo temporaire
            </div>
          ) : null}
        </div>

        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
          <Link
            href="/"
            className="mb-10 w-fit rounded-full border border-[#cfc4ad] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#53613f] transition hover:border-[#53613f]"
          >
            Accueil
          </Link>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8b6f45]">
            {config.eyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[1.02] text-[#24351f] sm:text-7xl">
            {config.introductionTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-[#5f5a51]">{config.introduction}</p>

          {config.isTemporaryDemo ? (
            <p className="mt-6 max-w-2xl rounded-[1.25rem] border border-[#decaa9] bg-[#f6ead6] p-5 text-sm leading-7 text-[#6e5738]">
              Ce questionnaire est une donnee de demonstration temporaire et ne doit pas etre
              considere comme valide metier.
            </p>
          ) : null}

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Link
              href={`/diagnostic/${config.id}/questionnaire?mode=self`}
              className="rounded-[1.5rem] bg-[#314b2c] p-7 text-[#fff8e8] shadow-[0_14px_34px_rgba(47,74,45,0.22)] transition hover:bg-[#24391f]"
            >
              <span className="block text-sm font-semibold uppercase tracking-[0.22em] opacity-80">
                Mode autonome
              </span>
              <span className="mt-4 block text-2xl font-semibold">Cliente seule</span>
            </Link>
            <Link
              href={`/diagnostic/${config.id}/questionnaire?mode=advisor`}
              className="rounded-[1.5rem] border border-[#d8c9b1] bg-white/70 p-7 text-[#263420] transition hover:border-[#8ea06e] hover:bg-[#fbf5e9]"
            >
              <span className="block text-sm font-semibold uppercase tracking-[0.22em] text-[#8b6f45]">
                Mode accompagne
              </span>
              <span className="mt-4 block text-2xl font-semibold">Avec conseillere</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
