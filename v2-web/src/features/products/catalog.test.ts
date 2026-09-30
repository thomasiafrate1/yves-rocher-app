import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { hairDiagnosticConfig } from "../diagnostics/questionnaire-config/hair";
import { fragranceDiagnosticConfig } from "../diagnostics/questionnaire-config/fragrance";
import { rankProducts } from "../diagnostics/scoring/scoring";
import type { DiagnosticConfig, DiagnosticResult } from "../diagnostics/types";
import { productsCatalog } from "./catalog";
import { hairFragranceProducts } from "./hair-fragrance";

function resultFor(config: DiagnosticConfig, profileId: string, tags: string[] = []): DiagnosticResult {
  const profile = config.profiles.find(({ id }) => id === profileId)!;
  return { profile, scores: { [profileId]: 10 }, secondaryNeeds: [], directRecommendationTags: [], answeredQuestionCount: 1, recommendationTags: [profileId, ...tags] };
}

describe("real hair and fragrance catalog", () => {
  it("has unique references and actual local JPEGs for each sourced product", () => {
    expect(new Set(productsCatalog.map(({ id }) => id)).size).toBe(productsCatalog.length);
    expect(productsCatalog.some(({ isTemporaryDemo }) => isTemporaryDemo)).toBe(false);
    for (const product of hairFragranceProducts) {
      const bytes = readFileSync(path.join(process.cwd(), "public", product.image));
      expect([...bytes.subarray(0, 3)]).toEqual([255, 216, 255]);
      expect(product.sourceUrl).toContain(`/p/${product.reference}`);
      expect(product.priceEur).toBeGreaterThan(0);
      expect(product.usageAdvice.length).toBeGreaterThan(10);
      expect(product.priceCheckedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  for (const config of [hairDiagnosticConfig, fragranceDiagnosticConfig]) {
    for (const profile of config.profiles) {
      it(`covers ${config.id}/${profile.id} without a product from another universe`, () => {
        const recommendations = rankProducts(productsCatalog, config, resultFor(config, profile.id));
        expect(recommendations.length).toBeGreaterThan(0);
        expect(recommendations.every(({ product }) => product.univers === config.id)).toBe(true);
        expect(recommendations.length).toBeLessThanOrEqual(config.id === "hair" ? 4 : 2);
      });
    }
  }

  it("keeps one shampoo and one rinse-off treatment despite overlapping needs", () => {
    const ranked = rankProducts(productsCatalog, hairDiagnosticConfig, resultFor(hairDiagnosticConfig, "damaged_hair", ["repair", "breakage", "nutrition", "softness", "heat_protection", "curls"]));
    const slots = ranked.map(({ product }) => product.routine!.slot);
    expect(new Set(slots).size).toBe(slots.length);
    expect(ranked.filter(({ product }) => product.routine?.slot === "shampoo").map(({ product }) => product.reference)).toEqual(["94625"]);
    const orders = ranked.map(({ product }) => product.routine!.order);
    expect(orders).toEqual([...orders].sort((a, b) => a - b));
  });

  it("places scalp serum before shampoo, including when scalp comfort is secondary", () => {
    for (const profile of ["sensitive_scalp", "oily_roots"]) {
      const ranked = rankProducts(productsCatalog, hairDiagnosticConfig, resultFor(hairDiagnosticConfig, profile, ["scalp_comfort"]));
      expect(ranked[0].product.reference).toBe("95725");
      expect(ranked[1].product.routine?.slot).toBe("shampoo");
    }
  });

  it("does not fill a fresh perfume selection with unrelated perfumes sharing generic needs", () => {
    const ranked = rankProducts(productsCatalog, fragranceDiagnosticConfig, resultFor(fragranceDiagnosticConfig, "fresh", ["intensity", "floral", "elegance", "gourmand"]));
    expect(ranked.map(({ product }) => product.reference)).toEqual(["90154"]);
  });

  it("describes woody suggestions as patchouli explorations and excludes the withdrawn perfume", () => {
    const ranked = rankProducts(productsCatalog, fragranceDiagnosticConfig, resultFor(fragranceDiagnosticConfig, "woody", ["patchouli"]));
    expect(ranked).toHaveLength(2);
    expect(ranked.every(({ reasons }) => reasons.some((reason) => reason.includes("patchouli")))).toBe(true);
    expect(ranked.some(({ product }) => product.nom.includes("Ocre") || product.reference === "62903")).toBe(false);
  });

  it("honors caller limits", () => {
    for (const config of [hairDiagnosticConfig, fragranceDiagnosticConfig]) {
      expect(rankProducts(productsCatalog, config, resultFor(config, config.profiles[0].id), 0)).toEqual([]);
      expect(rankProducts(productsCatalog, config, resultFor(config, config.profiles[0].id), 1)).toHaveLength(1);
    }
  });
});
