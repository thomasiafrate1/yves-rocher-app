import Image from "next/image";
import { JourneyCard } from "@/components/diagnostics/JourneyCard";
import { diagnosticConfigs } from "@/features/diagnostics/questionnaire-config";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f1e7] text-[#263420]">
      <section className="relative overflow-hidden px-5 py-7 sm:px-8 lg:px-12">
        <div className="absolute inset-0 -z-10 opacity-45">
          <Image src="/images/fond.png" alt="" fill priority sizes="100vw" className="object-cover" />
        </div>
        <div className="mx-auto max-w-7xl">
          <header className="flex items-center justify-between gap-6">
            <Image
              src="/images/logo_yves_rocher.png"
              alt="Yves Rocher"
              width={132}
              height={132}
              priority
              className="h-20 w-20 rounded-full object-contain sm:h-24 sm:w-24"
            />
            <p className="max-w-xs text-right text-xs font-semibold uppercase tracking-[0.24em] text-[#6a5636] sm:text-sm">
              Experience boutique
            </p>
          </header>

          <div className="grid gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:py-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#8b6f45]">
                Recommandation beaute
              </p>
              <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.02em] text-[#24351f] sm:text-7xl lg:text-8xl">
                Trouver le bon rituel, simplement.
              </h1>
            </div>
            <p className="max-w-2xl text-xl leading-9 text-[#5f5a51] lg:justify-self-end">
              Choisissez un parcours, repondez a quelques questions et obtenez un profil avec des
              recommandations produits. L&apos;interface est pensee pour une cliente en autonomie ou
              accompagnee par une conseillere.
            </p>
          </div>

          <div className="grid gap-5 pb-10 md:grid-cols-3">
            {diagnosticConfigs.map((config) => (
              <JourneyCard key={config.id} config={config} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
