import { notFound } from "next/navigation";
import { QuestionnaireFlow } from "@/components/questionnaire/QuestionnaireFlow";
import { normalizeUsageMode } from "@/features/diagnostics/answers";
import { getDiagnosticConfig } from "@/features/diagnostics/questionnaire-config";

export default async function QuestionnairePage({
  params,
  searchParams,
}: PageProps<"/diagnostic/[type]/questionnaire">) {
  const [{ type }, search] = await Promise.all([params, searchParams]);
  const config = getDiagnosticConfig(type);

  if (!config) {
    notFound();
  }

  return (
    <QuestionnaireFlow
      config={config}
      diagnosticType={config.id}
      mode={normalizeUsageMode(search.mode)}
    />
  );
}
