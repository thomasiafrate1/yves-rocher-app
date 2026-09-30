import Image from "next/image";
import Link from "next/link";
import { getNeedLabel, USAGE_MODE_LABELS } from "@/features/diagnostics/labels";
import type {
  DiagnosticConfig,
  DiagnosticResult,
  RankedProduct,
  UsageMode,
} from "@/features/diagnostics/types";

type ResultViewProps = {
  config: DiagnosticConfig;
  result: DiagnosticResult;
  recommendations: RankedProduct[];
  mode: UsageMode;
};

export function ResultView({ config, result, recommendations, mode }: ResultViewProps) {
  const topNeeds = result.secondaryNeeds.slice(0, 4);
  const priceDates = [...new Set(recommendations.flatMap(({ product }) =>
    product.priceCheckedAt ? [product.priceCheckedAt] : [],
  ))].sort().map((date) => date.split("-").reverse().join("/"));

  return (
    <main className="min-h-screen bg-[#f7f1e7] px-5 py-5 text-[#263420] sm:px-8 lg:px-12">
      <section className="mx-auto grid min-h-[calc(100vh-2.5rem)] w-full max-w-7xl overflow-hidden rounded-[2rem] border border-stone-200 bg-[#fffaf1] shadow-[0_24px_90px_rgba(50,44,33,0.10)] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative min-h-[320px] bg-[#ede1cf] lg:min-h-full">
          <Image
            src={config.visual.image}
            alt={config.visual.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-contain p-12 sm:p-16"
            priority
          />
          <div className="absolute left-6 top-6 rounded-full bg-[#fffaf1]/90 px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#6a5636] backdrop-blur">
            {USAGE_MODE_LABELS[mode]}
          </div>
          {config.isTemporaryDemo ? (
            <div className="absolute bottom-6 left-6 right-6 rounded-[1.25rem] bg-[#fffaf1]/90 p-5 text-sm leading-6 text-[#6e5738] backdrop-blur">
              Parcours de demonstration temporaire, non valide metier.
            </div>
          ) : null}
        </div>

        <div className="p-6 sm:p-9 lg:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8b6f45]">
            {config.resultTitle}
          </p>
          <h1 className="mt-5 text-5xl font-semibold leading-[1.02] text-[#24351f] sm:text-6xl">
            {result.profile.name}
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-[#5f5a51]">
            {result.profile.summary}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[#746d62]">
            {result.profile.explanation}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {topNeeds.map((need) => (
              <span
                key={need.tag}
                className="rounded-full border border-[#d6c6aa] bg-[#f7eddc] px-5 py-3 text-sm font-semibold text-[#5b6a43]"
              >
                {getNeedLabel(need.tag)}
              </span>
            ))}
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-[#24351f]">
              {config.id === "hair" ? "Votre routine, dans l’ordre" : config.id === "fragrance" ? "Vos parfums à découvrir" : "Recommandations produits"}
            </h2>
            {config.id === "hair" ? (
              <p className="mt-2 text-sm leading-6 text-[#6e695f]">Une sélection de gestes à adapter à votre routine. Le masque et l’après-shampooing sont proposés comme alternatives.</p>
            ) : null}
            {recommendations.some(({ product }) => product.priceEur !== undefined) ? (
              <p className="mt-2 text-sm leading-6 text-[#6e695f]">Prix web indicatifs{priceDates.length ? ` — relevés du ${priceDates.join(", ")}` : ""}. Les prix et offres en boutique peuvent différer.</p>
            ) : null}
            <div className="mt-5 grid gap-4">
              {recommendations.map(({ product, reasons }, index) => (
                <article
                  key={product.id}
                  className="grid grid-cols-[72px_minmax(0,1fr)] gap-4 rounded-[1.5rem] border border-[#e3d7c4] bg-white/70 p-4 sm:grid-cols-[132px_minmax(0,1fr)] sm:p-5"
                >
                  <div className="relative aspect-square overflow-hidden rounded-[1.1rem] bg-white">
                    <Image
                      src={product.image}
                      alt={product.nom}
                      fill
                      sizes="(max-width: 639px) 72px, 132px"
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b6f45]">
                      {product.routine ? `${index + 1}. ${product.routine.label}` : product.categorie}
                    </p>
                    <h3 className="mt-2 text-base font-semibold leading-tight text-[#24351f] sm:text-xl">
                      {product.nom}
                    </h3>
                    {product.size ? <p className="mt-2 text-sm text-[#6e695f]">{product.size} · Réf. {product.reference}</p> : null}
                    {product.priceEur !== undefined ? (
                      <p className="mt-2 text-sm font-semibold text-[#24351f]">
                        {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(product.priceEur)}
                        <span className="font-normal text-[#6e695f]"> · prix web indicatif</span>
                      </p>
                    ) : null}
                  </div>
                  <div className="col-span-2 min-w-0">
                    <p className="text-sm leading-6 text-[#6e695f]">{product.description}</p>
                    {product.olfactoryNotes ? <p className="mt-2 text-sm text-[#6e695f]">Notes : {product.olfactoryNotes.join(" · ")}</p> : null}
                    <p className="mt-3 text-sm font-semibold text-[#53613f]">
                      {reasons.join(" | ")}
                    </p>
                    {product.usageAdvice ? (
                      <div className="mt-3 rounded-xl bg-[#f7f1e7] p-3 text-sm leading-6 text-[#53613f]">
                        <p className="font-semibold">{product.univers === "fragrance" ? "Pour le découvrir" : "Conseil d’utilisation"}</p>
                        <p>{product.usageAdvice}</p>
                      </div>
                    ) : null}
                    {product.precautions ? (
                      <details className="mt-3 text-sm leading-6 text-[#6e695f]">
                        <summary className="cursor-pointer py-2">Précautions d’utilisation</summary>
                        <p>{product.precautions}</p>
                      </details>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href={`/diagnostic/${config.id}/questionnaire`}
              className="rounded-full bg-[#314b2c] px-8 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-[#fff8e8] shadow-[0_14px_34px_rgba(47,74,45,0.22)] transition hover:bg-[#24391f]"
            >
              Recommencer
            </Link>
            <Link
              href="/"
              className="rounded-full border border-[#cfc4ad] px-8 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-[#53613f] transition hover:border-[#53613f]"
            >
              Autre diagnostic
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
