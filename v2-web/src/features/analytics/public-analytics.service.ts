import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { DiagnosticConfig, DiagnosticType, SelectedAnswers, UsageMode } from "@/features/diagnostics/types";
import type {
  CompleteDiagnosticPayload,
  DiagnosticAnswerPayload,
  DiagnosticSession,
  RecommendationPayload,
} from "./types";
import { toDatabaseUsageMode } from "./types";

export function createLocalDiagnosticSession(): DiagnosticSession {
  return {
    id: crypto.randomUUID(),
    publicToken: crypto.randomUUID(),
  };
}

export function buildAnswerPayload(
  config: DiagnosticConfig,
  answers: SelectedAnswers,
): DiagnosticAnswerPayload[] {
  return config.questions.flatMap((question) => {
    const optionId = answers[question.id];
    const option = question.options.find((candidate) => candidate.id === optionId);

    if (!option) {
      return [];
    }

    return [
      {
        question_id: question.id,
        option_id: option.id,
        option_label: option.label,
      },
    ];
  });
}

export function buildRecommendationPayload(
  recommendations: CompleteDiagnosticPayload["recommendations"],
): RecommendationPayload[] {
  return recommendations.map((recommendation, index) => ({
    product_id: recommendation.product.id,
    rank: index + 1,
    reason: recommendation.reasons.join(" | "),
  }));
}

export async function createStartedDiagnostic(options: {
  diagnosticType: DiagnosticType;
  mode: UsageMode;
}): Promise<DiagnosticSession | null> {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    return null;
  }

  const session = createLocalDiagnosticSession();
  const { error } = await supabase.from("diagnostics").insert({
    id: session.id,
    public_token: session.publicToken,
    diagnostic_type: options.diagnosticType,
    usage_mode: toDatabaseUsageMode(options.mode),
  });

  if (error) {
    console.warn("Diagnostic analytics start failed:", error.message);
    return null;
  }

  return session;
}

export async function markDiagnosticAbandoned(session: DiagnosticSession | null) {
  const supabase = getSupabaseBrowserClient();

  if (!supabase || !session) {
    return;
  }

  const { error } = await supabase.rpc("mark_public_diagnostic_abandoned", {
    p_diagnostic_id: session.id,
    p_public_token: session.publicToken,
  });

  if (error) {
    console.warn("Diagnostic analytics abandoned failed:", error.message);
  }
}

export async function completeDiagnosticAnalytics(payload: CompleteDiagnosticPayload) {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    return;
  }

  const { error } = await supabase.rpc("complete_public_diagnostic", {
    p_diagnostic_id: payload.id,
    p_public_token: payload.publicToken,
    p_profile: payload.result.profile.id,
    p_scores: payload.result.scores,
    p_needs: payload.result.secondaryNeeds,
    p_recommendation_tags: payload.result.recommendationTags,
    p_answers: buildAnswerPayload(payload.config, payload.answers),
    p_recommendations: buildRecommendationPayload(payload.recommendations),
  });

  if (error) {
    console.warn("Diagnostic analytics completion failed:", error.message);
  }
}
