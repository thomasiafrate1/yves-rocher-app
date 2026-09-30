import { faceDiagnosticConfig } from "./face";
import { fragranceDiagnosticConfig } from "./fragrance";
import { hairDiagnosticConfig } from "./hair";
import type { DiagnosticConfig, DiagnosticType } from "../types";

export const diagnosticConfigs = [
  faceDiagnosticConfig,
  hairDiagnosticConfig,
  fragranceDiagnosticConfig,
] satisfies DiagnosticConfig[];

export function getDiagnosticConfig(type: string): DiagnosticConfig | undefined {
  return diagnosticConfigs.find((config) => config.id === type);
}

export function isDiagnosticType(type: string): type is DiagnosticType {
  return diagnosticConfigs.some((config) => config.id === type);
}
