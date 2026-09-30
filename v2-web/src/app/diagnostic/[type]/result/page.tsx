import Link from "next/link";
import { notFound } from "next/navigation";
import { PersistDiagnosticResult } from "@/components/results/PersistDiagnosticResult";
import { ResultView } from "@/components/results/ResultView";
import {
  isDiagnosticComplete,
  parseAnswersParam,
} from "@/features/diagnostics/answers";
import { getDiagnosticConfig } from "@/features/diagnostics/questionnaire-config";
import { evaluateDiagnostic, rankProducts } from "@/features/diagnostics/scoring/scoring";
import { productsCatalog } from "@/features/products/catalog";

export default async function ResultPage({
  params,
  searchParams,
}: PageProps<"/diagnostic/[type]/result">) {
  const [{ type }, search] = await Promise.all([params, searchParams]);
  const config = getDiagnosticConfig(type);

  if (!config) {
    notFound();
  }

  const answers = parseAnswersParam(search.answers);
  const mode = "self";
  const diagnosticId =
    typeof search.diagnosticId === "string" ? search.diagnosticId : undefined;
  const diagnosticToken =
    typeof search.diagnosticToken === "string" ? search.diagnosticToken : undefined;

  if (!isDiagnosticComplete(config, answers)) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f7f1e7] px-5 text-[#263420]">
        <section className="max-w-xl rounded-[2rem] border border-stone-200 bg-[#fffaf1] p-8 text-center shadow-[0_24px_90px_rgba(50,44,33,0.10)] sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8b6f45]">
            Resultat indisponible
          </p>
          <h1 className="mt-5 text-4xl font-semibold text-[#24351f]">
            Le questionnaire n&apos;est pas complet.
          </h1>
          <p className="mt-5 text-lg leading-8 text-[#6e695f]">
            Relancez le diagnostic pour obtenir un profil et des recommandations coherentes.
          </p>
          <Link
            href={`/diagnostic/${config.id}/questionnaire`}
            className="mt-8 inline-flex rounded-full bg-[#314b2c] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#fff8e8]"
          >
            Recommencer
          </Link>
        </section>
      </main>
    );
  }

  const result = evaluateDiagnostic(config, answers);
  const recommendations = rankProducts(productsCatalog, config, result, 4);

  return (
    <>
      <PersistDiagnosticResult
        diagnosticId={diagnosticId}
        diagnosticToken={diagnosticToken}
        config={config}
        answers={answers}
        result={result}
        recommendations={recommendations}
      />
      <ResultView config={config} result={result} recommendations={recommendations} mode={mode} />
    </>
  );
}
