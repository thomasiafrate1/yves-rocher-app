import type { DiagnosticConfig } from "../types";

// Version initiale inspiree de la V1. A valider avec les equipes metier avant production.
export const faceDiagnosticConfig: DiagnosticConfig = {
  id: "face",
  title: "Diagnostic Visage",
  shortTitle: "Visage",
  eyebrow: "Soin de la peau",
  introductionTitle: "Comprendre les besoins de votre peau",
  introduction:
    "Un parcours court pour identifier le profil de peau dominant, les besoins secondaires et une routine de soins adaptee.",
  resultTitle: "Votre profil visage",
  visual: {
    image: "/images/products/grand_soin_hydratation_intension_01.png",
    alt: "Soin visage hydratant",
  },
  profiles: [
    {
      id: "dry_skin",
      name: "Peau seche",
      shortName: "Seche",
      summary: "Votre peau recherche du confort, de la nutrition et une hydratation durable.",
      explanation:
        "Les sensations de tiraillement et les zones de secheresse indiquent une peau qui beneficie d'une routine enveloppante et protectrice.",
    },
    {
      id: "normal_skin",
      name: "Peau normale",
      shortName: "Normale",
      summary: "Votre peau est plutot equilibree et gagne a conserver son confort naturel.",
      explanation:
        "Le profil normal invite a privilegier des soins quotidiens simples, lumineux et protecteurs, sans surcharger la peau.",
    },
    {
      id: "combination_skin",
      name: "Peau mixte",
      shortName: "Mixte",
      summary: "Votre peau alterne entre confort et brillance, souvent sur la zone T.",
      explanation:
        "Une routine equilibree aide a hydrater les zones seches tout en regulant les zones qui brillent plus vite.",
    },
    {
      id: "oily_skin",
      name: "Peau grasse",
      shortName: "Grasse",
      summary: "Votre peau a tendance a briller et peut presenter des pores visibles ou imperfections.",
      explanation:
        "Les soins purifiants, frais et non agressifs aident a matifier sans desequilibrer davantage la peau.",
    },
    {
      id: "sensitive_skin",
      name: "Peau sensible",
      shortName: "Sensible",
      summary: "Votre peau reagit facilement et a besoin de douceur, de confort et d'apaisement.",
      explanation:
        "Les rougeurs ou echauffements orientent vers des textures rassurantes et une routine courte, respectueuse de la sensibilite cutanee.",
    },
  ],
  questions: [
    {
      id: "after_cleanse",
      title: "Quelle sensation ressentez-vous apres le nettoyage ?",
      helper: "Choisissez la sensation la plus frequente.",
      options: [
        {
          id: "tight",
          label: "Tiraillements",
          scores: { dry_skin: 3, sensitive_skin: 1 },
          needs: ["hydration", "comfort"],
        },
        {
          id: "comfortable",
          label: "Douce et confortable",
          scores: { normal_skin: 3 },
          needs: ["radiance"],
        },
        {
          id: "slightly_oily",
          label: "Legerement grasse sur la zone T",
          scores: { combination_skin: 3 },
          needs: ["balance"],
        },
        {
          id: "very_shiny",
          label: "Tres brillante",
          scores: { oily_skin: 3 },
          needs: ["purity", "balance"],
        },
      ],
    },
    {
      id: "shine_timing",
      title: "A quel moment votre peau devient-elle brillante ?",
      options: [
        {
          id: "never",
          label: "Rarement ou jamais",
          scores: { dry_skin: 1, normal_skin: 2 },
          needs: ["comfort"],
        },
        {
          id: "evening",
          label: "Plutot en fin de journee",
          scores: { combination_skin: 2, normal_skin: 1 },
          needs: ["balance"],
        },
        {
          id: "morning",
          label: "Des la matinee",
          scores: { oily_skin: 3 },
          needs: ["purity"],
        },
        {
          id: "wake_up",
          label: "Des le reveil",
          scores: { oily_skin: 3 },
          needs: ["purity", "balance"],
          weight: 1.2,
        },
      ],
    },
    {
      id: "dry_zones",
      title: "Ressentez-vous des zones seches ou inconfortables ?",
      options: [
        {
          id: "never",
          label: "Jamais",
          scores: { oily_skin: 2, normal_skin: 1 },
          needs: ["balance"],
        },
        {
          id: "rarely",
          label: "Rarement",
          scores: { normal_skin: 2 },
          needs: ["radiance"],
        },
        {
          id: "often_t_zone",
          label: "Oui, par zones",
          scores: { combination_skin: 3 },
          needs: ["hydration", "balance"],
        },
        {
          id: "very_often",
          label: "Tres souvent",
          scores: { dry_skin: 3, sensitive_skin: 1 },
          needs: ["hydration", "comfort"],
          weight: 1.2,
        },
      ],
    },
    {
      id: "imperfections",
      title: "Avez-vous tendance a avoir des imperfections ?",
      options: [
        {
          id: "never",
          label: "Non, rarement",
          scores: { normal_skin: 1 },
          needs: ["radiance"],
        },
        {
          id: "sometimes",
          label: "Parfois",
          scores: { combination_skin: 1 },
          needs: ["imperfections"],
        },
        {
          id: "regularly",
          label: "Regulierement",
          scores: { oily_skin: 2, combination_skin: 1 },
          needs: ["imperfections", "purity"],
        },
        {
          id: "daily",
          label: "Tres souvent",
          scores: { oily_skin: 3 },
          needs: ["imperfections", "purity"],
          weight: 1.2,
        },
      ],
    },
    {
      id: "texture",
      title: "Comment decririez-vous votre grain de peau ?",
      options: [
        {
          id: "fine",
          label: "Fin et uniforme",
          scores: { normal_skin: 3 },
          needs: ["radiance"],
        },
        {
          id: "slightly_visible",
          label: "Legerement visible",
          scores: { combination_skin: 2 },
          needs: ["balance"],
        },
        {
          id: "visible_t_zone",
          label: "Pores visibles sur la zone T",
          scores: { combination_skin: 2, oily_skin: 1 },
          needs: ["purity", "balance"],
        },
        {
          id: "dilated",
          label: "Pores visibles sur l'ensemble du visage",
          scores: { oily_skin: 3 },
          needs: ["purity", "imperfections"],
        },
      ],
    },
    {
      id: "reactivity",
      title: "Votre peau reagit-elle facilement ?",
      helper: "Rougeurs, picotements, echauffements ou inconfort.",
      options: [
        {
          id: "no",
          label: "Non",
          scores: { normal_skin: 2, oily_skin: 1 },
          needs: ["radiance"],
        },
        {
          id: "rare",
          label: "Tres rarement",
          scores: { normal_skin: 2 },
          needs: ["comfort"],
        },
        {
          id: "sometimes",
          label: "Oui, parfois",
          scores: { combination_skin: 1, sensitive_skin: 2 },
          needs: ["sensitivity"],
        },
        {
          id: "often",
          label: "Oui, tres souvent",
          scores: { sensitive_skin: 4 },
          needs: ["sensitivity", "comfort"],
          weight: 1.2,
        },
      ],
    },
    {
      id: "main_need",
      title: "Quel est votre besoin principal aujourd'hui ?",
      options: [
        {
          id: "hydrate",
          label: "Hydrater et apaiser",
          scores: { dry_skin: 1, sensitive_skin: 1 },
          needs: ["hydration", "comfort"],
        },
        {
          id: "mattify",
          label: "Matifier et purifier",
          scores: { oily_skin: 1, combination_skin: 1 },
          needs: ["purity", "balance"],
        },
        {
          id: "radiance",
          label: "Eclat et uniformite",
          scores: { normal_skin: 1, combination_skin: 1 },
          needs: ["radiance"],
        },
        {
          id: "anti_age",
          label: "Anti-age et fermete",
          scores: { dry_skin: 1, normal_skin: 1 },
          needs: ["anti_age", "nutrition"],
        },
      ],
    },
  ],
};
