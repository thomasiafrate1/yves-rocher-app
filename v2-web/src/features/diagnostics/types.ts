export type DiagnosticType = "face" | "hair" | "fragrance";

export type UsageMode = "self" | "advisor";

export type ScoreMap = Record<string, number>;

export type AnswerOption = {
  id: string;
  label: string;
  description?: string;
  scores?: ScoreMap;
  needs?: string[];
  recommendationTags?: string[];
  weight?: number;
};

export type DiagnosticQuestion = {
  id: string;
  title: string;
  helper?: string;
  options: AnswerOption[];
};

export type ProfileDefinition = {
  id: string;
  name: string;
  shortName: string;
  summary: string;
  explanation: string;
};

export type DiagnosticConfig = {
  id: DiagnosticType;
  title: string;
  shortTitle: string;
  eyebrow: string;
  introductionTitle: string;
  introduction: string;
  resultTitle: string;
  visual: {
    image: string;
    alt: string;
  };
  isTemporaryDemo?: boolean;
  profiles: ProfileDefinition[];
  questions: DiagnosticQuestion[];
};

export type SelectedAnswers = Record<string, string>;

export type NeedScore = {
  tag: string;
  score: number;
};

export type ScoredDiagnostic = {
  scores: ScoreMap;
  secondaryNeeds: NeedScore[];
  directRecommendationTags: NeedScore[];
  answeredQuestionCount: number;
};

export type DiagnosticResult = ScoredDiagnostic & {
  profile: ProfileDefinition;
  recommendationTags: string[];
};

export type Product = {
  id: string;
  nom: string;
  description: string;
  univers: DiagnosticType;
  categorie: string;
  image: string;
  profilsCompatibles: string[];
  besoinsCibles: string[];
  priorite: number;
  isTemporaryDemo?: boolean;
};

export type RankedProduct = {
  product: Product;
  score: number;
  reasons: string[];
};
