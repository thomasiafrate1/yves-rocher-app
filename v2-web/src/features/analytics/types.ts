import type {
  DiagnosticConfig,
  DiagnosticResult,
  DiagnosticType,
  RankedProduct,
  SelectedAnswers,
  UsageMode,
} from "@/features/diagnostics/types";

export type DatabaseUsageMode = "autonomous" | "advisor";

export type DatabaseDiagnosticStatus = "started" | "completed" | "abandoned";

export type DiagnosticSession = {
  id: string;
  publicToken: string;
};

export type DiagnosticAnswerPayload = {
  question_id: string;
  option_id: string;
  option_label: string;
};

export type RecommendationPayload = {
  product_id: string;
  rank: number;
  reason: string;
};

export type CompleteDiagnosticPayload = DiagnosticSession & {
  config: DiagnosticConfig;
  answers: SelectedAnswers;
  result: DiagnosticResult;
  recommendations: RankedProduct[];
};

export type AdminDiagnosticRow = {
  id: string;
  diagnostic_type: DiagnosticType;
  usage_mode: DatabaseUsageMode;
  started_at: string;
  completed_at: string | null;
  status: DatabaseDiagnosticStatus;
};

export type AdminDiagnosticResultRow = {
  diagnostic_id: string;
  profile: string;
  scores: Record<string, number>;
  needs: { tag: string; score: number }[];
  recommendation_tags: string[];
};

export type AdminRecommendationRow = {
  id: string;
  diagnostic_id: string;
  product_id: string;
  rank: number;
  reason: string;
};

export type AdminConversionRow = {
  id: string;
  diagnostic_id: string;
  product_id: string;
  converted_at: string;
  quantity: number | null;
  amount: number | null;
};

export type AdminDiagnosticAnswerRow = {
  id: string;
  diagnostic_id: string;
  question_id: string;
  option_id: string;
  option_label: string;
};

export function toDatabaseUsageMode(mode: UsageMode): DatabaseUsageMode {
  return mode === "advisor" ? "advisor" : "autonomous";
}
