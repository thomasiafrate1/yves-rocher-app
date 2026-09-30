import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type {
  AdminConversionRow,
  AdminDiagnosticAnswerRow,
  AdminDiagnosticResultRow,
  AdminDiagnosticRow,
  AdminRecommendationRow,
} from "@/features/analytics/types";

export type AdminAnalyticsData = {
  diagnostics: AdminDiagnosticRow[];
  results: AdminDiagnosticResultRow[];
  answers: AdminDiagnosticAnswerRow[];
  recommendations: AdminRecommendationRow[];
  conversions: AdminConversionRow[];
};

async function fetchTable<T>(tableName: string, select = "*") {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { data, error } = await supabase.from(tableName).select(select);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as T[];
}

export async function loadAdminAnalyticsData(): Promise<AdminAnalyticsData> {
  const [diagnostics, results, answers, recommendations, conversions] = await Promise.all([
    fetchTable<AdminDiagnosticRow>("diagnostics", "id, diagnostic_type, usage_mode, started_at, completed_at, status"),
    fetchTable<AdminDiagnosticResultRow>(
      "diagnostic_results",
      "diagnostic_id, profile, scores, needs, recommendation_tags",
    ),
    fetchTable<AdminDiagnosticAnswerRow>(
      "diagnostic_answers",
      "id, diagnostic_id, question_id, option_id, option_label",
    ),
    fetchTable<AdminRecommendationRow>(
      "recommendations",
      "id, diagnostic_id, product_id, rank, reason",
    ),
    fetchTable<AdminConversionRow>(
      "conversions",
      "id, diagnostic_id, product_id, converted_at, quantity, amount",
    ),
  ]);

  return {
    diagnostics,
    results,
    answers,
    recommendations,
    conversions,
  };
}

export async function createConversion(input: {
  diagnosticId: string;
  productId: string;
  quantity?: number | null;
  amount?: number | null;
}) {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { error } = await supabase.from("conversions").insert({
    diagnostic_id: input.diagnosticId,
    product_id: input.productId,
    converted_at: new Date().toISOString(),
    quantity: input.quantity || null,
    amount: input.amount || null,
  });

  if (error) {
    throw new Error(error.message);
  }
}
