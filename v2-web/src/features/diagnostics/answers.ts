import type { DiagnosticConfig, SelectedAnswers } from "./types";

export function parseAnswersParam(value: string | string[] | undefined): SelectedAnswers {
  if (!value || Array.isArray(value)) {
    return {};
  }

  try {
    const parsed = JSON.parse(value);

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }

    return Object.fromEntries(
      Object.entries(parsed).filter(
        ([questionId, optionId]) => typeof questionId === "string" && typeof optionId === "string",
      ),
    ) as SelectedAnswers;
  } catch {
    return {};
  }
}

export function isDiagnosticComplete(config: DiagnosticConfig, answers: SelectedAnswers) {
  return config.questions.every((question) => Boolean(answers[question.id]));
}
