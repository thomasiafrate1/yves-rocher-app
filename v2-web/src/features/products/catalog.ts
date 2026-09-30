import { hairFragranceProducts } from "./hair-fragrance";
import type { Product } from "@/features/diagnostics/types";

// Catalogue local V2. Les produits visage reutilisent les assets de la V1.
export const productsCatalog: Product[] = [
  {
    id: "face-hydration-care",
    nom: "Grand Soin Hydratation Intense",
    description:
      "Un soin enveloppant pour aider la peau a retrouver confort, souplesse et hydratation durable.",
    univers: "face",
    categorie: "Soin visage",
    image: "/images/products/grand_soin_hydratation_intension_01.png",
    profilsCompatibles: ["dry_skin", "normal_skin"],
    besoinsCibles: ["hydration", "comfort", "radiance"],
    priorite: 98,
  },
  {
    id: "face-soft-cleanser",
    nom: "Nettoyant Solide Hydratant",
    description:
      "Une base de routine douce pour nettoyer sans accentuer les sensations d'inconfort.",
    univers: "face",
    categorie: "Nettoyant",
    image: "/images/products/nettoyant_solide_hydratant_01.png",
    profilsCompatibles: ["dry_skin", "sensitive_skin"],
    besoinsCibles: ["hydration", "comfort", "sensitivity"],
    priorite: 88,
  },
  {
    id: "face-purifying-gel",
    nom: "Gel Nettoyant Purifiant",
    description:
      "Un geste frais pour aider a purifier la peau et limiter l'exces de brillance.",
    univers: "face",
    categorie: "Nettoyant",
    image: "/images/products/gel_nettoyant_purifiant_01.png",
    profilsCompatibles: ["oily_skin", "combination_skin"],
    besoinsCibles: ["purity", "balance", "imperfections"],
    priorite: 96,
  },
  {
    id: "face-anti-imperfections",
    nom: "Serum Anti-Imperfections",
    description:
      "Un serum cible pour accompagner les peaux sujettes aux imperfections et aux pores visibles.",
    univers: "face",
    categorie: "Serum",
    image: "/images/products/serum_anti_perfections_01.png",
    profilsCompatibles: ["oily_skin", "combination_skin"],
    besoinsCibles: ["imperfections", "purity", "balance"],
    priorite: 92,
  },
  {
    id: "face-radiance-serum",
    nom: "Serum Activateur Eclat",
    description:
      "Une texture legere pour raviver l'eclat et accompagner les peaux en recherche d'uniformite.",
    univers: "face",
    categorie: "Serum",
    image: "/images/products/serum_activateur_eclat_01.png",
    profilsCompatibles: ["normal_skin", "combination_skin"],
    besoinsCibles: ["radiance", "hydration"],
    priorite: 86,
  },
  {
    id: "face-soothing-balm",
    nom: "Baume Confort Nourrissant",
    description:
      "Un soin reconfortant pour les peaux sensibles ou seches en recherche d'apaisement.",
    univers: "face",
    categorie: "Baume",
    image: "/images/products/baume_confort_nourrissant_01.png",
    profilsCompatibles: ["sensitive_skin", "dry_skin"],
    besoinsCibles: ["sensitivity", "comfort", "nutrition"],
    priorite: 94,
  },
  {
    id: "face-night-oil",
    nom: "Huile Recuperatrice Eclat Nuit",
    description:
      "Un soin de nuit sensoriel pour soutenir l'eclat et le confort des peaux en manque de vitalite.",
    univers: "face",
    categorie: "Soin nuit",
    image: "/images/products/huile_recuperatrice_eclat_nuit_01.png",
    profilsCompatibles: ["dry_skin", "combination_skin", "normal_skin"],
    besoinsCibles: ["radiance", "nutrition", "anti_age"],
    priorite: 82,
  },
  {
    id: "face-anti-age-care",
    nom: "Grand Soin Anti-Rides Intense",
    description:
      "Un soin complet pour accompagner les besoins de fermete, de nutrition et de confort.",
    univers: "face",
    categorie: "Soin anti-age",
    image: "/images/products/grand_soin_anti_rides_intense_01.png",
    profilsCompatibles: ["normal_skin", "dry_skin", "sensitive_skin"],
    besoinsCibles: ["anti_age", "nutrition", "comfort"],
    priorite: 84,
  },
  ...hairFragranceProducts,
];
