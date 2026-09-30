import type { DiagnosticConfig } from "../types";

export const hairDiagnosticConfig: DiagnosticConfig = {
  id: "hair",
  title: "Diagnostic Cheveux",
  shortTitle: "Cheveux",
  eyebrow: "Soin capillaire",
  introductionTitle: "Comprendre les besoins de vos cheveux",
  introduction:
    "Quelques questions pour identifier l'etat des cheveux, le confort du cuir chevelu et les gestes qui influencent la routine.",
  resultTitle: "Votre profil cheveux",
  visual: {
    image: "/images/products/yr-98076.jpg",
    alt: "Shampooing Définissant Yves Rocher",
  },
  profiles: [
    {
      id: "dry_hair",
      name: "Cheveux secs",
      shortName: "Secs",
      summary: "Vos longueurs recherchent de la nutrition, de la souplesse et du confort.",
      explanation:
        "Ce profil oriente vers une routine nourrissante, des textures enveloppantes et des gestes qui aident a retrouver douceur et brillance.",
    },
    {
      id: "oily_roots",
      name: "Racines grasses",
      shortName: "Racines grasses",
      summary: "Vos racines regraissent vite et demandent de la fraicheur sans alourdir les longueurs.",
      explanation:
        "Ce profil privilegie des soins legers, une sensation de propre durable et un meilleur equilibre au niveau des racines.",
    },
    {
      id: "damaged_hair",
      name: "Cheveux fragilises",
      shortName: "Fragilises",
      summary: "Vos cheveux semblent sensibilises et ont besoin d'etre renforces et proteges.",
      explanation:
        "Ce profil tient compte de la casse, de la chaleur, des colorations ou de la decoloration, avec une priorite donnee a la reparation progressive.",
    },
    {
      id: "curly_hair",
      name: "Cheveux boucles",
      shortName: "Boucles",
      summary: "Vos boucles gagnent a etre definies, nourries et protegees des frisottis.",
      explanation:
        "Ce profil met l'accent sur la definition, la nutrition et des gestes doux pour preserver la forme naturelle de la boucle.",
    },
    {
      id: "sensitive_scalp",
      name: "Cuir chevelu sensible",
      shortName: "Sensible",
      summary: "Votre cuir chevelu demande une routine douce et apaisante.",
      explanation:
        "Ce profil prend en compte les sensations d'inconfort, de picotement, de tiraillement ou de reaction apres certains soins.",
    },
  ],
  questions: [
    {
      id: "hair_condition",
      title: "Quel est le type ou l'etat actuel de vos cheveux ?",
      options: [
        {
          id: "dry_rough_lengths",
          label: "Longueurs seches, ternes ou reches",
          scores: { dry_hair: 3, damaged_hair: 0.5 },
          needs: ["nutrition", "shine", "softness"],
        },
        {
          id: "oily_roots_flat",
          label: "Racines vite grasses, cheveux plats",
          scores: { oily_roots: 3 },
          needs: ["freshness", "balance", "volume"],
        },
        {
          id: "fragile_breaking",
          label: "Cheveux cassants ou fragilises",
          scores: { damaged_hair: 2.5, dry_hair: 0.5 },
          needs: ["repair", "strength", "breakage"],
        },
        {
          id: "curly_frizzy",
          label: "Cheveux ondules, boucles ou sujets aux frisottis",
          scores: { curly_hair: 3, dry_hair: 0.8 },
          needs: ["curls", "anti_frizz", "nutrition"],
        },
        {
          id: "sensitive_scalp_discomfort",
          label: "Cuir chevelu inconfortable",
          scores: { sensitive_scalp: 3 },
          needs: ["scalp_comfort", "sensitivity", "comfort"],
        },
      ],
    },
    {
      id: "main_hair_need",
      title: "Quel est votre besoin principal aujourd'hui ?",
      options: [
        {
          id: "nourish_soften",
          label: "Nourrir et apporter de la souplesse",
          scores: { dry_hair: 3, curly_hair: 1 },
          needs: ["nutrition", "softness", "shine"],
          weight: 1.1,
        },
        {
          id: "purify_roots",
          label: "Purifier les racines et retrouver de la legerete",
          scores: { oily_roots: 3 },
          needs: ["freshness", "balance", "volume"],
          weight: 1.1,
        },
        {
          id: "repair_strengthen",
          label: "Reparer et renforcer",
          scores: { damaged_hair: 3 },
          needs: ["repair", "strength", "breakage"],
          weight: 1.1,
        },
        {
          id: "define_curls",
          label: "Definir les boucles et limiter les frisottis",
          scores: { curly_hair: 3, dry_hair: 0.5 },
          needs: ["curls", "anti_frizz", "nutrition"],
          weight: 1.1,
        },
        {
          id: "soothe_scalp",
          label: "Apaiser le cuir chevelu",
          scores: { sensitive_scalp: 3 },
          needs: ["scalp_comfort", "sensitivity", "comfort"],
          weight: 1.1,
        },
      ],
    },
    {
      id: "wash_frequency",
      title: "A quelle frequence lavez-vous vos cheveux ?",
      options: [
        {
          id: "every_day",
          label: "Tous les jours ou presque",
          scores: { oily_roots: 2.4, sensitive_scalp: 0.4 },
          needs: ["freshness", "balance"],
        },
        {
          id: "every_two_days",
          label: "Tous les deux jours",
          scores: { oily_roots: 1.6 },
          needs: ["freshness", "balance"],
        },
        {
          id: "two_three_week",
          label: "Deux a trois fois par semaine",
          scores: { dry_hair: 0.8, curly_hair: 0.5, damaged_hair: 0.3 },
          needs: ["softness"],
        },
        {
          id: "once_week",
          label: "Une fois par semaine ou moins",
          scores: { dry_hair: 1.6, curly_hair: 1 },
          needs: ["nutrition", "curls"],
        },
        {
          id: "after_discomfort",
          label: "Des que le cuir chevelu devient inconfortable",
          scores: { sensitive_scalp: 1.5, oily_roots: 0.7 },
          needs: ["scalp_comfort", "balance"],
        },
      ],
    },
    {
      id: "drying_method",
      title: "Comment seche-t-on vos cheveux le plus souvent ?",
      options: [
        {
          id: "air_dry",
          label: "A l'air libre",
          scores: { curly_hair: 0.8, dry_hair: 0.3 },
          needs: ["softness"],
        },
        {
          id: "gentle_towel",
          label: "Avec une serviette, sans trop frotter",
          scores: { sensitive_scalp: 0.5, dry_hair: 0.5 },
          needs: ["softness", "comfort"],
        },
        {
          id: "towel_rubbing",
          label: "En frottant avec une serviette",
          scores: { damaged_hair: 1.4, curly_hair: 0.5 },
          needs: ["repair", "anti_frizz", "breakage"],
        },
        {
          id: "blow_dry",
          label: "Au seche-cheveux ou en brushing",
          scores: { damaged_hair: 1.7, dry_hair: 0.6 },
          needs: ["heat_protection", "repair"],
        },
        {
          id: "diffuser_low_heat",
          label: "Au diffuseur ou a chaleur douce",
          scores: { curly_hair: 1.5, damaged_hair: 0.3 },
          needs: ["curls", "heat_protection", "anti_frizz"],
        },
      ],
    },
    {
      id: "heat_tools",
      title: "Utilisez-vous des appareils chauffants ?",
      options: [
        {
          id: "never",
          label: "Jamais ou tres rarement",
          scores: { curly_hair: 0.4, sensitive_scalp: 0.3 },
          needs: ["softness"],
        },
        {
          id: "occasionally",
          label: "Occasionnellement",
          scores: { damaged_hair: 1.2, dry_hair: 0.4 },
          needs: ["heat_protection", "repair"],
        },
        {
          id: "weekly",
          label: "Plusieurs fois par semaine",
          scores: { damaged_hair: 2, dry_hair: 0.5 },
          needs: ["heat_protection", "repair", "shine"],
        },
        {
          id: "very_often",
          label: "Presque tous les jours",
          scores: { damaged_hair: 2.7, dry_hair: 0.7 },
          needs: ["heat_protection", "repair", "breakage"],
          weight: 1.05,
        },
        {
          id: "always_protected",
          label: "Oui, avec un soin protecteur",
          scores: { damaged_hair: 1.3 },
          needs: ["heat_protection", "shine"],
        },
      ],
    },
    {
      id: "hair_routine",
      title: "Quelle routine capillaire vous ressemble le plus ?",
      options: [
        {
          id: "shampoo_only",
          label: "Shampoing uniquement",
          scores: { dry_hair: 1, damaged_hair: 1, sensitive_scalp: 0.3 },
          needs: ["nutrition", "repair", "routine"],
        },
        {
          id: "shampoo_conditioner",
          label: "Shampoing et apres-shampoing",
          scores: { dry_hair: 1 },
          needs: ["softness", "nutrition"],
        },
        {
          id: "mask_oil_weekly",
          label: "Masque ou huile une fois par semaine",
          scores: { dry_hair: 1, curly_hair: 0.8, damaged_hair: 0.5 },
          needs: ["nutrition", "shine", "repair"],
        },
        {
          id: "scalp_care",
          label: "Soin cible pour le cuir chevelu",
          scores: { sensitive_scalp: 1.7, oily_roots: 0.7 },
          needs: ["scalp_comfort", "balance"],
        },
        {
          id: "curl_styling",
          label: "Soin coiffant ou definition des boucles",
          scores: { curly_hair: 2 },
          needs: ["curls", "anti_frizz", "nutrition"],
        },
      ],
    },
    {
      id: "damage_level_origin",
      title: "Vos cheveux sont-ils abimes ou fragilises ?",
      helper: "Cette question precise le niveau et l'origine de la sensibilisation.",
      options: [
        {
          id: "little_damage",
          label: "Peu ou pas abimes",
          scores: { dry_hair: 0.3, sensitive_scalp: 0.3 },
          needs: ["maintenance"],
        },
        {
          id: "dry_ends",
          label: "Pointes seches ou fourchues",
          scores: { dry_hair: 2, damaged_hair: 1 },
          needs: ["nutrition", "shine", "repair"],
        },
        {
          id: "heat_damage",
          label: "Abimes par la chaleur ou les brushings",
          scores: { damaged_hair: 2.8, dry_hair: 0.5 },
          needs: ["repair", "heat_protection", "breakage"],
        },
        {
          id: "color_bleach_damage",
          label: "Fragilises par coloration ou decoloration",
          scores: { damaged_hair: 3, dry_hair: 0.8 },
          needs: ["repair", "color_care", "strength", "shine"],
        },
        {
          id: "severe_multiple_damage",
          label: "Tres abimes, cassants, avec plusieurs causes",
          scores: { damaged_hair: 3.2, dry_hair: 1 },
          needs: ["repair", "strength", "breakage", "nutrition"],
          weight: 1.05,
        },
      ],
    },
  ],
};
