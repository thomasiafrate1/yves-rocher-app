import { describe, expect, it } from "vitest";
import { faceDiagnosticConfig } from "@/features/diagnostics/questionnaire-config/face";
import { evaluateDiagnostic, rankProducts } from "@/features/diagnostics/scoring/scoring";
import { productsCatalog } from "@/features/products/catalog";
import {
  buildAnswerPayload,
  buildRecommendationPayload,
} from "./public-analytics.service";
import { toDatabaseUsageMode } from "./types";

describe("public analytics payloads", () => {
  it("maps public usage modes to database values", () => {
    expect(toDatabaseUsageMode("self")).toBe("autonomous");
    expect(toDatabaseUsageMode("advisor")).toBe("advisor");
  });

  it("builds anonymized answer payloads", () => {
    const payload = buildAnswerPayload(faceDiagnosticConfig, {
      after_cleanse: "tight",
      shine_timing: "never",
    });

    expect(payload).toEqual([
      {
        question_id: "after_cleanse",
        option_id: "tight",
        option_label: "Tiraillements",
      },
      {
        question_id: "shine_timing",
        option_id: "never",
        option_label: "Rarement ou jamais",
      },
    ]);
  });

  it("builds recommendation payloads with stable ranks", () => {
    const result = evaluateDiagnostic(faceDiagnosticConfig, {
      after_cleanse: "tight",
      shine_timing: "never",
      dry_zones: "very_often",
      imperfections: "never",
      texture: "fine",
      reactivity: "rare",
      main_need: "hydrate",
    });
    const recommendations = rankProducts(productsCatalog, faceDiagnosticConfig, result, 2);

    expect(buildRecommendationPayload(recommendations)).toEqual(
      recommendations.map((recommendation, index) => ({
        product_id: recommendation.product.id,
        rank: index + 1,
        reason: recommendation.reasons.join(" | "),
      })),
    );
  });
});
