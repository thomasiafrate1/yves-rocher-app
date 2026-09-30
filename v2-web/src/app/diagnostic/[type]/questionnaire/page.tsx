import { notFound } from "next/navigation";
import { QuestionnaireFlow } from "@/components/questionnaire/QuestionnaireFlow";
import { getDiagnosticConfig } from "@/features/diagnostics/questionnaire-config";

export default async function QuestionnairePage({
  params,
}: PageProps<"/diagnostic/[type]/questionnaire">) {
  const { type } = await params;
  const config = getDiagnosticConfig(type);

  if (!config) {
    notFound();
  }

  return (
    <QuestionnaireFlow
      config={config}
      diagnosticType={config.id}
      mode="self"
    />
  );
}
