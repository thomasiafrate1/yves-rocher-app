import type { DiagnosticConfig } from "../types";

export const fragranceDiagnosticConfig: DiagnosticConfig = {
  id: "fragrance",
  title: "Profil Parfum",
  shortTitle: "Parfum",
  eyebrow: "Preference olfactive",
  introductionTitle: "Trouver votre univers parfum",
  introduction:
    "Quelques questions pour rapprocher vos envies olfactives d'une famille de parfum, d'une intensite et d'un contexte de port.",
  resultTitle: "Votre profil parfum",
  visual: {
    image: "/images/products/serum_activateur_eclat_01.png",
    alt: "Flacon de parfum",
  },
  profiles: [
    {
      id: "fresh",
      name: "Frais",
      shortName: "Frais",
      summary: "Vous aimez les parfums lumineux, nets et faciles a porter.",
      explanation:
        "Ce profil privilegie les notes fraiches, zestes, propres ou legeres, avec une sensation vive et naturelle.",
    },
    {
      id: "floral",
      name: "Floral",
      shortName: "Floral",
      summary: "Vous recherchez un parfum feminin, delicat et harmonieux.",
      explanation:
        "Ce profil oriente vers des bouquets floraux, des notes de rose ou de magnolia et une presence douce mais reconnaissable.",
    },
    {
      id: "woody",
      name: "Boise",
      shortName: "Boise",
      summary: "Vous preferez les parfums structures, elegants et profonds.",
      explanation:
        "Ce profil met en avant les notes boisees, le patchouli et les sillages sophistiques qui gardent de la presence.",
    },
    {
      id: "amber_gourmand",
      name: "Ambre gourmand",
      shortName: "Ambre gourmand",
      summary: "Vous aimez les parfums enveloppants, doux et sensoriels.",
      explanation:
        "Ce profil rapproche les notes ambrees, vanillees ou reconfortantes d'une signature chaleureuse et plus presente.",
    },
    {
      id: "fruity",
      name: "Fruite",
      shortName: "Fruite",
      summary: "Vous etes attiree par les parfums juteux, lumineux et spontanement joyeux.",
      explanation:
        "Ce profil valorise les notes de peche, les accents fruites et les compositions petillantes faciles a adopter.",
    },
  ],
  questions: [
    {
      id: "fragrance_family",
      title: "Quelle famille de parfum recherchez-vous ?",
      options: [
        {
          id: "fresh_family",
          label: "Fraiche",
          scores: { fresh: 4, fruity: 0.5 },
          needs: ["freshness", "citrus", "light"],
          weight: 1.25,
        },
        {
          id: "floral_family",
          label: "Fleurie",
          scores: { floral: 4 },
          needs: ["floral", "rose", "magnolia"],
          weight: 1.25,
        },
        {
          id: "woody_family",
          label: "Boisee",
          scores: { woody: 4, amber_gourmand: 0.5 },
          needs: ["woody", "patchouli", "elegance"],
          weight: 1.25,
        },
        {
          id: "amber_family",
          label: "Ambree",
          scores: { amber_gourmand: 4, woody: 0.5 },
          needs: ["amber", "vanilla", "gourmand", "intensity"],
          weight: 1.25,
        },
        {
          id: "fruity_family",
          label: "Fruitee",
          scores: { fruity: 4, fresh: 0.5 },
          needs: ["fruity", "peach", "sparkle"],
          weight: 1.25,
        },
      ],
    },
    {
      id: "favorite_note",
      title: "Quelle senteur vous attire le plus ?",
      options: [
        {
          id: "lemon",
          label: "Citron",
          scores: { fresh: 3.5, fruity: 0.4 },
          needs: ["citrus", "freshness", "light"],
          weight: 1.2,
        },
        {
          id: "rose",
          label: "Rose",
          scores: { floral: 3.5 },
          needs: ["rose", "floral"],
          weight: 1.2,
        },
        {
          id: "patchouli",
          label: "Patchouli",
          scores: { woody: 3.3, amber_gourmand: 0.7 },
          needs: ["patchouli", "woody", "intensity"],
          weight: 1.2,
        },
        {
          id: "vanilla",
          label: "Vanille",
          scores: { amber_gourmand: 3.5 },
          needs: ["vanilla", "gourmand", "amber", "comfort"],
          weight: 1.2,
        },
        {
          id: "magnolia",
          label: "Magnolia",
          scores: { floral: 3.2, fresh: 0.5 },
          needs: ["magnolia", "floral", "freshness"],
          weight: 1.2,
        },
        {
          id: "peach",
          label: "Peche",
          scores: { fruity: 3.5, floral: 0.4 },
          needs: ["peach", "fruity", "softness"],
          weight: 1.2,
        },
      ],
    },
    {
      id: "personality",
      title: "Quelle facette vous correspond le mieux ?",
      options: [
        {
          id: "sporty",
          label: "Sportive",
          scores: { fresh: 1.4 },
          needs: ["freshness", "light"],
        },
        {
          id: "gourmand",
          label: "Gourmande",
          scores: { amber_gourmand: 1.4, fruity: 0.6 },
          needs: ["gourmand", "vanilla", "comfort"],
        },
        {
          id: "feminine",
          label: "Feminine",
          scores: { floral: 1.4 },
          needs: ["floral", "softness"],
        },
        {
          id: "natural",
          label: "Naturelle",
          scores: { fresh: 0.8, floral: 0.5, woody: 0.3 },
          needs: ["natural", "freshness"],
        },
        {
          id: "sophisticated",
          label: "Sophistiquee",
          scores: { woody: 1.3, amber_gourmand: 0.8 },
          needs: ["elegance", "intensity", "woody"],
        },
      ],
    },
    {
      id: "wearing_context",
      title: "Dans quel contexte souhaitez-vous porter ce parfum ?",
      options: [
        {
          id: "daily_easy",
          label: "Au quotidien, facilement",
          scores: { fresh: 1, floral: 0.6 },
          needs: ["easy", "freshness"],
        },
        {
          id: "work_soft",
          label: "Au travail ou dans un contexte discret",
          scores: { floral: 1, fresh: 0.4, woody: 0.2 },
          needs: ["softness", "elegance"],
        },
        {
          id: "evening",
          label: "Le soir",
          scores: { woody: 1.3, amber_gourmand: 1.1 },
          needs: ["intensity", "elegance"],
        },
        {
          id: "special_event",
          label: "Pour une occasion particuliere",
          scores: { floral: 0.8, woody: 0.8, amber_gourmand: 0.8 },
          needs: ["elegance", "intensity"],
        },
        {
          id: "sunny_escape",
          label: "En vacances ou pour une sensation solaire",
          scores: { fruity: 1.4, fresh: 0.8 },
          needs: ["fruity", "peach", "freshness"],
        },
        {
          id: "cocoon",
          label: "Pour un moment cocon",
          scores: { amber_gourmand: 1.3, floral: 0.3 },
          needs: ["comfort", "gourmand", "vanilla"],
        },
      ],
    },
    {
      id: "wearing_frequency",
      title: "A quelle frequence vous parfumez-vous ?",
      options: [
        {
          id: "occasionally",
          label: "Occasionnellement",
          scores: { floral: 0.5, fresh: 0.3 },
          needs: ["softness"],
        },
        {
          id: "daily",
          label: "Tous les jours",
          scores: { fresh: 0.8, floral: 0.5 },
          needs: ["easy", "freshness"],
        },
        {
          id: "several_times_day",
          label: "Plusieurs fois par jour",
          scores: { fresh: 0.8, fruity: 0.6 },
          needs: ["freshness", "light"],
        },
        {
          id: "signature",
          label: "Je cherche un parfum signature",
          scores: { woody: 0.8, amber_gourmand: 0.8 },
          needs: ["intensity", "elegance"],
        },
      ],
    },
    {
      id: "fragrance_intensity",
      title: "Quelle presence souhaitez-vous ?",
      options: [
        {
          id: "discreet",
          label: "Tres legere",
          scores: { fresh: 1.5, floral: 0.8 },
          needs: ["light", "freshness"],
        },
        {
          id: "soft",
          label: "Douce et proche de la peau",
          scores: { floral: 1.2, fresh: 0.6 },
          needs: ["softness", "floral"],
        },
        {
          id: "balanced",
          label: "Equilibree",
          scores: { floral: 0.6, woody: 0.6, fruity: 0.6 },
          needs: ["easy"],
        },
        {
          id: "present",
          label: "Presente",
          scores: { woody: 1.2, amber_gourmand: 1.1 },
          needs: ["intensity", "elegance"],
        },
        {
          id: "enveloping",
          label: "Enveloppante et marquee",
          scores: { amber_gourmand: 1.6, woody: 0.9 },
          needs: ["intensity", "comfort", "amber"],
        },
      ],
    },
  ],
};
