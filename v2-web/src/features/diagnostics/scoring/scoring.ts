import { getNeedLabel } from "../labels";
import type {
  DiagnosticConfig,
  DiagnosticResult,
  Product,
  ProfileDefinition,
  RankedProduct,
  ScoredDiagnostic,
  SelectedAnswers,
} from "../types";

function sortNeedScores(entries: Record<string, number>) {
  return Object.entries(entries)
    .map(([tag, score]) => ({ tag, score }))
    .sort((a, b) => b.score - a.score || a.tag.localeCompare(b.tag));
}

export function scoreDiagnostic(
  config: DiagnosticConfig,
  answers: SelectedAnswers,
): ScoredDiagnostic {
  const scores = Object.fromEntries(config.profiles.map((profile) => [profile.id, 0]));
  const needScores: Record<string, number> = {};
  const directTagScores: Record<string, number> = {};
  let answeredQuestionCount = 0;

  for (const question of config.questions) {
    const optionId = answers[question.id];
    const option = question.options.find((candidate) => candidate.id === optionId);

    if (!option) {
      continue;
    }

    answeredQuestionCount += 1;
    const weight = option.weight ?? 1;

    for (const [profileId, score] of Object.entries(option.scores ?? {})) {
      scores[profileId] = (scores[profileId] ?? 0) + score * weight;
    }

    for (const need of option.needs ?? []) {
      needScores[need] = (needScores[need] ?? 0) + weight;
    }

    for (const tag of option.recommendationTags ?? []) {
      directTagScores[tag] = (directTagScores[tag] ?? 0) + weight;
    }
  }

  return {
    scores,
    secondaryNeeds: sortNeedScores(needScores),
    directRecommendationTags: sortNeedScores(directTagScores),
    answeredQuestionCount,
  };
}

export function resolveProfile(
  config: DiagnosticConfig,
  scoredDiagnostic: ScoredDiagnostic,
): ProfileDefinition {
  return [...config.profiles].sort((a, b) => {
    const scoreDiff = (scoredDiagnostic.scores[b.id] ?? 0) - (scoredDiagnostic.scores[a.id] ?? 0);

    if (scoreDiff !== 0) {
      return scoreDiff;
    }

    return config.profiles.indexOf(a) - config.profiles.indexOf(b);
  })[0];
}

export function resolveRecommendationTags(
  profile: ProfileDefinition,
  scoredDiagnostic: ScoredDiagnostic,
  maxNeeds = 4,
) {
  const needs = scoredDiagnostic.secondaryNeeds.slice(0, maxNeeds).map((need) => need.tag);
  const directTags = scoredDiagnostic.directRecommendationTags.map((tag) => tag.tag);

  return Array.from(new Set([profile.id, ...needs, ...directTags]));
}

function buildReasons(product: Product, result: DiagnosticResult) {
  const reasons: string[] = [];
  const matchingNeeds = product.besoinsCibles.filter((need) =>
    result.recommendationTags.includes(need),
  );

  if (product.profilsCompatibles.includes(result.profile.id)) {
    reasons.push(`Adapte au profil ${result.profile.shortName.toLowerCase()}`);
  }

  if (matchingNeeds.length > 0) {
    reasons.push(`Cible ${matchingNeeds.slice(0, 2).map(getNeedLabel).join(" et ").toLowerCase()}`);
  }

  if (product.isTemporaryDemo) {
    reasons.push("Produit de demonstration temporaire");
  }

  return reasons.length > 0 ? reasons : ["Complement pertinent pour ce parcours"];
}

export function rankProducts(
  products: Product[],
  config: DiagnosticConfig,
  result: DiagnosticResult,
  limit = 4,
): RankedProduct[] {
  return products
    .filter((product) => product.univers === config.id)
    .map((product) => {
      const profileMatch = product.profilsCompatibles.includes(result.profile.id) ? 10 : 0;
      const needMatchCount = product.besoinsCibles.filter((need) =>
        result.recommendationTags.includes(need),
      ).length;
      const relevanceScore = profileMatch + needMatchCount * 4;
      const score = relevanceScore > 0 ? relevanceScore + product.priorite / 100 : 0;

      return {
        product,
        score,
        reasons: buildReasons(product, result),
      };
    })
    .filter((ranked) => ranked.score > 0)
    .sort((a, b) => b.score - a.score || b.product.priorite - a.product.priorite)
    .slice(0, limit);
}

export function evaluateDiagnostic(
  config: DiagnosticConfig,
  answers: SelectedAnswers,
): DiagnosticResult {
  const scoredDiagnostic = scoreDiagnostic(config, answers);
  const profile = resolveProfile(config, scoredDiagnostic);
  const recommendationTags = resolveRecommendationTags(profile, scoredDiagnostic);

  return {
    ...scoredDiagnostic,
    profile,
    recommendationTags,
  };
}
