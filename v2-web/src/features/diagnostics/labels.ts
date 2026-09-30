import type { DiagnosticType, UsageMode } from "./types";

export const DIAGNOSTIC_LABELS: Record<DiagnosticType, string> = {
  face: "Diagnostic Visage",
  hair: "Diagnostic Cheveux",
  fragrance: "Profil Parfum",
};

export const USAGE_MODE_LABELS: Record<UsageMode, string> = {
  self: "Autonome",
  advisor: "Accompagne",
};

export const NEED_LABELS: Record<string, string> = {
  hydration: "Hydratation",
  comfort: "Confort",
  radiance: "Eclat",
  purity: "Purifier",
  anti_age: "Anti-age",
  sensitivity: "Apaiser",
  imperfections: "Imperfections",
  balance: "Equilibrer",
  nutrition: "Nutrition",
  repair: "Reparer",
  shine: "Brillance",
  softness: "Souplesse",
  strength: "Renforcer",
  breakage: "Casse",
  heat_protection: "Protection chaleur",
  anti_frizz: "Anti-frisottis",
  routine: "Routine",
  color_care: "Cheveux colores",
  maintenance: "Entretien",
  volume: "Volume",
  scalp_comfort: "Confort du cuir chevelu",
  curls: "Boucles",
  freshness: "Fraicheur",
  floral: "Floral",
  woody: "Boise",
  amber: "Ambre",
  gourmand: "Gourmand",
  vanilla: "Vanille",
  patchouli: "Patchouli",
  rose: "Rose",
  magnolia: "Magnolia",
  peach: "Peche",
  fruity: "Fruite",
  citrus: "Citron",
  light: "Legerete",
  sparkle: "Petillant",
  elegance: "Elegance",
  natural: "Naturel",
  easy: "Facile a porter",
  green: "Vegetal",
  intensity: "Intensite",
};

export function getNeedLabel(tag: string) {
  return NEED_LABELS[tag] ?? tag;
}
