import { describe, expect, it } from "vitest";
import { faceDiagnosticConfig } from "../questionnaire-config/face";
import { fragranceDiagnosticConfig } from "../questionnaire-config/fragrance";
import { hairDiagnosticConfig } from "../questionnaire-config/hair";
import type { DiagnosticConfig, Product, SelectedAnswers } from "../types";
import {
  evaluateDiagnostic,
  rankProducts,
  resolveProfile,
  resolveRecommendationTags,
  scoreDiagnostic,
} from "./scoring";

describe("diagnostic scoring engine", () => {
  it("detects the strongest profile from selected answers", () => {
    const answers: SelectedAnswers = {
      after_cleanse: "tight",
      shine_timing: "never",
      dry_zones: "very_often",
      imperfections: "never",
      texture: "fine",
      reactivity: "rare",
      main_need: "hydrate",
    };

    const scoredDiagnostic = scoreDiagnostic(faceDiagnosticConfig, answers);
    const profile = resolveProfile(faceDiagnosticConfig, scoredDiagnostic);

    expect(profile.id).toBe("dry_skin");
    expect(scoredDiagnostic.scores.dry_skin).toBeGreaterThan(
      scoredDiagnostic.scores.oily_skin,
    );
  });

  it("applies answer weights to profile scores and needs", () => {
    const config: DiagnosticConfig = {
      id: "face",
      title: "Test",
      shortTitle: "Test",
      eyebrow: "Test",
      introductionTitle: "Test",
      introduction: "Test",
      resultTitle: "Test",
      visual: { image: "/test.png", alt: "Test" },
      profiles: [
        {
          id: "a",
          name: "A",
          shortName: "A",
          summary: "A",
          explanation: "A",
        },
        {
          id: "b",
          name: "B",
          shortName: "B",
          summary: "B",
          explanation: "B",
        },
      ],
      questions: [
        {
          id: "q1",
          title: "Question",
          options: [
            {
              id: "answer",
              label: "Answer",
              scores: { a: 2 },
              needs: ["hydration"],
              weight: 1.5,
            },
          ],
        },
      ],
    };

    const scoredDiagnostic = scoreDiagnostic(config, { q1: "answer" });

    expect(scoredDiagnostic.scores.a).toBe(3);
    expect(scoredDiagnostic.secondaryNeeds[0]).toEqual({
      tag: "hydration",
      score: 1.5,
    });
  });

  it("returns recommendation tags from the profile and strongest needs", () => {
    const result = evaluateDiagnostic(faceDiagnosticConfig, {
      after_cleanse: "very_shiny",
      shine_timing: "wake_up",
      dry_zones: "never",
      imperfections: "daily",
      texture: "dilated",
      reactivity: "no",
      main_need: "mattify",
    });

    expect(result.profile.id).toBe("oily_skin");
    expect(resolveRecommendationTags(result.profile, result)).toEqual(
      expect.arrayContaining(["oily_skin", "purity", "balance"]),
    );
  });

  it("ranks compatible products and exposes readable reasons", () => {
    const result = evaluateDiagnostic(faceDiagnosticConfig, {
      after_cleanse: "very_shiny",
      shine_timing: "morning",
      dry_zones: "never",
      imperfections: "regularly",
      texture: "visible_t_zone",
      reactivity: "no",
      main_need: "mattify",
    });

    const products: Product[] = [
      {
        id: "wrong-universe",
        nom: "Wrong",
        description: "Wrong",
        univers: "hair",
        categorie: "Demo",
        image: "/demo.png",
        profilsCompatibles: ["oily_skin"],
        besoinsCibles: ["purity"],
        priorite: 100,
      },
      {
        id: "face-purity",
        nom: "Purity",
        description: "Purity",
        univers: "face",
        categorie: "Demo",
        image: "/demo.png",
        profilsCompatibles: ["oily_skin"],
        besoinsCibles: ["purity", "balance"],
        priorite: 90,
      },
      {
        id: "face-comfort",
        nom: "Comfort",
        description: "Comfort",
        univers: "face",
        categorie: "Demo",
        image: "/demo.png",
        profilsCompatibles: ["dry_skin"],
        besoinsCibles: ["comfort"],
        priorite: 95,
      },
    ];

    const rankedProducts = rankProducts(products, faceDiagnosticConfig, result, 2);

    expect(rankedProducts).toHaveLength(1);
    expect(rankedProducts[0].product.id).toBe("face-purity");
    expect(rankedProducts[0].reasons.join(" ")).toContain("profil grasse");
  });

  it("detects a dry hair profile", () => {
    const result = evaluateDiagnostic(hairDiagnosticConfig, {
      hair_condition: "dry_rough_lengths",
      main_hair_need: "nourish_soften",
      wash_frequency: "once_week",
      drying_method: "gentle_towel",
      heat_tools: "never",
      hair_routine: "shampoo_conditioner",
      damage_level_origin: "dry_ends",
    });

    expect(result.profile.id).toBe("dry_hair");
    expect(result.scores.dry_hair).toBeGreaterThan(result.scores.damaged_hair);
    expect(result.recommendationTags).toEqual(
      expect.arrayContaining(["dry_hair", "nutrition", "softness"]),
    );
  });

  it("detects a damaged hair profile from combined weakening signals", () => {
    const result = evaluateDiagnostic(hairDiagnosticConfig, {
      hair_condition: "fragile_breaking",
      main_hair_need: "repair_strengthen",
      wash_frequency: "two_three_week",
      drying_method: "blow_dry",
      heat_tools: "weekly",
      hair_routine: "shampoo_only",
      damage_level_origin: "color_bleach_damage",
    });

    expect(result.profile.id).toBe("damaged_hair");
    expect(result.scores.damaged_hair).toBeGreaterThan(result.scores.dry_hair);
    expect(result.recommendationTags).toEqual(
      expect.arrayContaining(["damaged_hair", "repair", "strength"]),
    );
  });

  it("detects an oily roots hair profile", () => {
    const result = evaluateDiagnostic(hairDiagnosticConfig, {
      hair_condition: "oily_roots_flat",
      main_hair_need: "purify_roots",
      wash_frequency: "every_day",
      drying_method: "air_dry",
      heat_tools: "never",
      hair_routine: "scalp_care",
      damage_level_origin: "little_damage",
    });

    expect(result.profile.id).toBe("oily_roots");
    expect(result.scores.oily_roots).toBeGreaterThan(result.scores.dry_hair);
    expect(result.recommendationTags).toEqual(
      expect.arrayContaining(["oily_roots", "freshness", "balance"]),
    );
  });

  it("detects a fresh fragrance profile", () => {
    const result = evaluateDiagnostic(fragranceDiagnosticConfig, {
      fragrance_family: "fresh_family",
      favorite_note: "lemon",
      personality: "sporty",
      wearing_context: "daily_easy",
      wearing_frequency: "daily",
      fragrance_intensity: "discreet",
    });

    expect(result.profile.id).toBe("fresh");
    expect(result.scores.fresh).toBeGreaterThan(result.scores.floral);
    expect(result.recommendationTags).toEqual(
      expect.arrayContaining(["fresh", "freshness", "citrus"]),
    );
  });

  it("detects a floral fragrance profile", () => {
    const result = evaluateDiagnostic(fragranceDiagnosticConfig, {
      fragrance_family: "floral_family",
      favorite_note: "rose",
      personality: "feminine",
      wearing_context: "work_soft",
      wearing_frequency: "occasionally",
      fragrance_intensity: "soft",
    });

    expect(result.profile.id).toBe("floral");
    expect(result.scores.floral).toBeGreaterThan(result.scores.fresh);
    expect(result.recommendationTags).toEqual(
      expect.arrayContaining(["floral", "rose", "softness"]),
    );
  });

  it("detects an amber gourmand fragrance profile", () => {
    const result = evaluateDiagnostic(fragranceDiagnosticConfig, {
      fragrance_family: "amber_family",
      favorite_note: "vanilla",
      personality: "gourmand",
      wearing_context: "cocoon",
      wearing_frequency: "signature",
      fragrance_intensity: "enveloping",
    });

    expect(result.profile.id).toBe("amber_gourmand");
    expect(result.scores.amber_gourmand).toBeGreaterThan(result.scores.woody);
    expect(result.recommendationTags).toEqual(
      expect.arrayContaining(["amber_gourmand", "vanilla", "gourmand"]),
    );
  });

  it("resolves tied profile scores with the profile order", () => {
    const config: DiagnosticConfig = {
      id: "face",
      title: "Tie test",
      shortTitle: "Tie",
      eyebrow: "Tie",
      introductionTitle: "Tie",
      introduction: "Tie",
      resultTitle: "Tie",
      visual: { image: "/test.png", alt: "Tie" },
      profiles: [
        {
          id: "first_profile",
          name: "First",
          shortName: "First",
          summary: "First",
          explanation: "First",
        },
        {
          id: "second_profile",
          name: "Second",
          shortName: "Second",
          summary: "Second",
          explanation: "Second",
        },
      ],
      questions: [
        {
          id: "q1",
          title: "Question",
          options: [
            {
              id: "tie",
              label: "Tie",
              scores: { second_profile: 2, first_profile: 2 },
              needs: ["balance"],
            },
          ],
        },
      ],
    };

    const result = evaluateDiagnostic(config, { q1: "tie" });

    expect(result.profile.id).toBe("first_profile");
  });
});
