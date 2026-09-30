"use client";

import { useEffect, useRef } from "react";
import { completeDiagnosticAnalytics } from "@/features/analytics/public-analytics.service";
import type {
  DiagnosticConfig,
  DiagnosticResult,
  RankedProduct,
  SelectedAnswers,
} from "@/features/diagnostics/types";

type PersistDiagnosticResultProps = {
  diagnosticId?: string;
  diagnosticToken?: string;
  config: DiagnosticConfig;
  answers: SelectedAnswers;
  result: DiagnosticResult;
  recommendations: RankedProduct[];
};

export function PersistDiagnosticResult({
  diagnosticId,
  diagnosticToken,
  config,
  answers,
  result,
  recommendations,
}: PersistDiagnosticResultProps) {
  const hasPersisted = useRef(false);

  useEffect(() => {
    if (hasPersisted.current || !diagnosticId || !diagnosticToken) {
      return;
    }

    hasPersisted.current = true;
    void completeDiagnosticAnalytics({
      id: diagnosticId,
      publicToken: diagnosticToken,
      config,
      answers,
      result,
      recommendations,
    });
  }, [answers, config, diagnosticId, diagnosticToken, recommendations, result]);

  return null;
}
