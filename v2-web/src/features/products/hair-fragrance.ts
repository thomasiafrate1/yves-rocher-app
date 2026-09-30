import type { Product } from "@/features/diagnostics/types";

// Données relevées sur yves-rocher.fr. Prix web indicatifs, à valider en boutique.
// Sources et limites de la sélection : docs/catalogue-cheveux-parfums.md.
type SourcedProduct = Product & Required<
  Pick<Product, "reference" | "size" | "priceEur" | "sourceUrl" | "usageAdvice">
>;

const hairBase = "https://www.yves-rocher.fr/cheveux/soin-cheveux/";
const perfumeBase = "https://www.yves-rocher.fr/parfum/parfum-femme/eau-de-parfum-femme/";
const shampoo = { slot: "shampoo", order: 1, label: "Laver" } as const;
const rinse = { slot: "rinse", order: 2, label: "Soigner et rincer" } as const;
const leaveIn = { slot: "leave-in", order: 3, label: "Soin sans rinçage" } as const;
const washAdvice = "Sur cheveux mouillés, masser puis rincer soigneusement.";
const maskAdvice = "Sur les longueurs et pointes lavées et essorées, laisser poser 3 à 5 minutes puis rincer.";
const wheatPrecautions = "Contient des protéines de blé. Éviter les yeux et se laver les mains après utilisation. Suivre les précautions du flacon.";
const perfumeAdvice = "À découvrir sur une touche en boutique, puis sur la peau pour apprécier son évolution.";
const perfumePrecautions = "Inflammable. Éviter les yeux et la peau irritée. Tenir hors de portée des enfants.";

const entries: Omit<SourcedProduct, "id" | "image" | "priceCheckedAt">[] = [
  {
    reference: "35236", nom: "Shampooing Crème Ultra-Nourrissant Sans Sulfate",
    description: "Un shampooing nourrissant pour assouplir les cheveux secs à très secs.",
    univers: "hair", categorie: "Shampooing", size: "250 ml", priceEur: 7.90,
    profilsCompatibles: ["dry_hair"], besoinsCibles: ["nutrition", "softness"], priorite: 98,
    sourceUrl: `${hairBase}shampooing/shampooing-creme-ultra-nourrissant-sans-sulfate/p/35236`,
    usageAdvice: washAdvice, routine: shampoo,
  },
  {
    reference: "37395", nom: "Masque Ultra-Nourrissant",
    description: "Un masque pour nourrir et démêler les longueurs sèches à très sèches.",
    univers: "hair", categorie: "Masque", size: "200 ml", priceEur: 11.90,
    profilsCompatibles: ["dry_hair"], besoinsCibles: ["nutrition", "softness", "shine"],
    secondaryMatchTags: ["nutrition"], priorite: 94,
    sourceUrl: `${hairBase}masque-cheveux/masque-ultra-nourrissant/p/37395`,
    usageAdvice: maskAdvice, routine: rinse,
  },
  {
    reference: "94625", nom: "Shampooing Reconstituant",
    description: "Nettoie les cheveux abîmés et accompagne une routine contre la casse.",
    univers: "hair", categorie: "Shampooing", size: "300 ml", priceEur: 5.99,
    profilsCompatibles: ["damaged_hair"], besoinsCibles: ["repair", "strength", "breakage"], priorite: 98,
    sourceUrl: `${hairBase}shampooing/shampooing-reconstituant/p/94625`,
    usageAdvice: "Utiliser selon les indications du flacon et rincer soigneusement après le lavage.",
    precautions: wheatPrecautions, routine: shampoo,
  },
  {
    reference: "95128", nom: "Après-Shampooing Anti-Casse",
    description: "Démêle et lisse les cheveux abîmés tout en aidant à limiter la casse.",
    univers: "hair", categorie: "Après-shampooing", size: "200 ml", priceEur: 6.50,
    profilsCompatibles: ["damaged_hair"], besoinsCibles: ["repair", "strength", "breakage", "softness"],
    secondaryMatchTags: ["breakage"], priorite: 95,
    sourceUrl: `${hairBase}apres-shampoing/apres-shampooing-anti-casse/p/95128`,
    usageAdvice: "Après le shampooing, utiliser selon les indications du flacon puis rincer soigneusement.",
    precautions: wheatPrecautions, routine: rinse,
  },
  {
    reference: "95467", nom: "Masque Réparateur",
    description: "Un soin à rincer pour renforcer les longueurs abîmées et améliorer leur souplesse.",
    univers: "hair", categorie: "Masque", size: "200 ml", priceEur: 12.90,
    profilsCompatibles: ["damaged_hair"], besoinsCibles: ["repair", "strength", "breakage", "nutrition"],
    secondaryMatchTags: ["repair"], priorite: 94,
    sourceUrl: `${hairBase}masque-cheveux/masque-reparateur/p/95467`,
    usageAdvice: maskAdvice, precautions: wheatPrecautions, routine: rinse,
  },
  {
    reference: "96007", nom: "Sérum Thermoprotecteur Restructurant",
    description: "Un soin sans rinçage pour les cheveux abîmés exposés aux appareils chauffants.",
    univers: "hair", categorie: "Sérum sans rinçage", size: "100 ml", priceEur: 12.90,
    profilsCompatibles: ["damaged_hair"], besoinsCibles: ["repair", "heat_protection", "breakage"],
    secondaryMatchTags: ["heat_protection"], priorite: 93,
    sourceUrl: `${hairBase}soin-sans-rincage/serum-thermoprotecteur-restructurant/p/96007`,
    usageAdvice: "Appliquer avant l’utilisation d’un appareil chauffant. Ne pas rincer. Suivre le dosage indiqué sur le flacon.",
    precautions: wheatPrecautions, routine: leaveIn,
  },
  {
    reference: "91373", nom: "Shampooing Détoxifiant",
    description: "Nettoie et purifie les cheveux normaux à gras pour des racines plus légères.",
    univers: "hair", categorie: "Shampooing", size: "300 ml", priceEur: 5.90,
    profilsCompatibles: ["oily_roots"], besoinsCibles: ["freshness", "balance"], priorite: 98,
    sourceUrl: `${hairBase}shampooing/shampooing-detoxifiant/p/91373`,
    usageAdvice: washAdvice, routine: shampoo,
  },
  {
    reference: "98076", nom: "Shampooing Définissant",
    description: "Nettoie les cheveux bouclés et aide à dessiner leurs boucles.",
    univers: "hair", categorie: "Shampooing", size: "300 ml", priceEur: 5.90,
    profilsCompatibles: ["curly_hair"], besoinsCibles: ["curls", "anti_frizz"], priorite: 98,
    sourceUrl: `${hairBase}shampooing/shampooing-definissant/p/98076`,
    usageAdvice: washAdvice, routine: shampoo,
  },
  {
    reference: "98778", nom: "Après-Shampooing Définissant",
    description: "Nourrit et démêle les cheveux bouclés pour faciliter la définition des boucles.",
    univers: "hair", categorie: "Après-shampooing", size: "200 ml", priceEur: 6.90,
    profilsCompatibles: ["curly_hair"], besoinsCibles: ["curls", "anti_frizz", "nutrition", "softness"],
    secondaryMatchTags: ["curls"], priorite: 96,
    sourceUrl: `${hairBase}apres-shampoing/apres-shampooing-definissant/p/98778`,
    usageAdvice: "Appliquer sur les longueurs mouillées et essorées. Laisser poser 1 minute, puis rincer.", routine: rinse,
  },
  {
    reference: "99729", nom: "Crème Définissante",
    description: "Dessine les boucles et aide à maîtriser les frisottis, sans rinçage.",
    univers: "hair", categorie: "Crème sans rinçage", size: "150 ml", priceEur: 11.90,
    profilsCompatibles: ["curly_hair"], besoinsCibles: ["curls", "anti_frizz"],
    secondaryMatchTags: ["curls"], priorite: 94,
    sourceUrl: `${hairBase}soin-sans-rincage/creme-definissante/p/99729`,
    usageAdvice: "Agiter avant utilisation. Appliquer sur cheveux humides ou secs. Ne pas rincer.", routine: leaveIn,
  },
  {
    reference: "90159", nom: "Shampooing Doux",
    description: "Un lavage doux pour assouplir les cheveux normaux à secs et faciliter le coiffage.",
    univers: "hair", categorie: "Shampooing", size: "300 ml", priceEur: 5.90,
    profilsCompatibles: ["dry_hair", "sensitive_scalp"], besoinsCibles: ["softness", "shine"], priorite: 80,
    sourceUrl: "https://www.yves-rocher.fr/cheveux/besoin/shampooing-sans-sulfate/shampooing-doux/p/90159",
    usageAdvice: washAdvice, routine: shampoo,
  },
  {
    reference: "95725", nom: "Équilibre — Sérum Cuir Chevelu",
    description: "Un soin avant lavage pour hydrater et apaiser le cuir chevelu, adapté à tous les types de cheveux.",
    univers: "hair", categorie: "Sérum cuir chevelu", size: "50 ml", priceEur: 19.90,
    profilsCompatibles: ["sensitive_scalp"], besoinsCibles: ["scalp_comfort", "sensitivity", "comfort"],
    secondaryMatchTags: ["scalp_comfort", "sensitivity"], priorite: 98,
    sourceUrl: `${hairBase}masque-cheveux/equilibre-serum-cuir-chevelu/p/95725`,
    usageAdvice: "Sur cuir chevelu sec, appliquer une demi-pipette raie par raie pour couvrir le cuir chevelu. Masser, laisser poser quelques heures ou une nuit, puis faire le shampooing.",
    routine: { slot: "scalp", order: 0, label: "Avant le shampooing" },
  },
  {
    reference: "90154", nom: "Sel d’Azur — Eau de Parfum",
    description: "Une composition fraîche d’agrumes, accompagnée d’une note de cèdre. Intensité équilibrée.",
    univers: "fragrance", categorie: "Hespéridé frais", size: "100 ml", priceEur: 34.99,
    profilsCompatibles: ["fresh"], besoinsCibles: ["freshness", "citrus"], priorite: 98,
    olfactoryNotes: ["Citron", "Pamplemousse", "Cèdre"],
    sourceUrl: `${perfumeBase}sel-d-azur-eau-de-parfum/p/90154`,
    usageAdvice: perfumeAdvice, precautions: perfumePrecautions,
  },
  {
    reference: "30466", nom: "Comme Une Évidence — Eau de Parfum",
    description: "Un parfum chypré associant rose, bergamote et patchouli. Une piste florale au fond boisé, d’intensité équilibrée.",
    univers: "fragrance", categorie: "Chypré", size: "50 ml", priceEur: 35.50,
    profilsCompatibles: ["floral", "woody"], besoinsCibles: ["floral", "rose", "patchouli", "elegance"], priorite: 98,
    olfactoryNotes: ["Bergamote", "Rose", "Patchouli"],
    sourceUrl: `${perfumeBase}comme-une-evidence-eau-de-parfum/p/30466`,
    usageAdvice: perfumeAdvice, precautions: perfumePrecautions,
  },
  {
    reference: "92464", nom: "Cuir de Nuit — Eau de Parfum",
    description: "Un accord ambré et vanillé, aux facettes de cacao et de café. Intensité remarquée.",
    univers: "fragrance", categorie: "Ambré vanillé", size: "30 ml", priceEur: 18.99,
    profilsCompatibles: ["amber_gourmand"], besoinsCibles: ["amber", "vanilla", "gourmand", "intensity"], priorite: 98,
    olfactoryNotes: ["Vanille", "Cacao", "Café"],
    sourceUrl: `${perfumeBase}cuir-de-nuit-eau-de-parfum/p/92464`,
    usageAdvice: perfumeAdvice, precautions: perfumePrecautions,
  },
  {
    reference: "30137", nom: "L’Évidence — Eau de Parfum",
    description: "Un parfum néo-chypré autour de la pêche, du magnolia et du patchouli. Intensité équilibrée.",
    univers: "fragrance", categorie: "Néo-chypré", size: "100 ml", priceEur: 49.90,
    profilsCompatibles: ["fruity", "floral", "woody"], besoinsCibles: ["fruity", "peach", "magnolia", "floral", "patchouli"], priorite: 94,
    olfactoryNotes: ["Pêche", "Magnolia", "Patchouli"],
    sourceUrl: `${perfumeBase}l-evidence-eau-de-parfum/p/30137`,
    usageAdvice: perfumeAdvice, precautions: perfumePrecautions,
  },
  {
    reference: "62903", nom: "Bouquet Ambré — Eau de Parfum",
    description: "Un bouquet d’iris enveloppé d’encens, éclairé par l’orange amère. Un ambré floral d’intensité remarquée.",
    univers: "fragrance", categorie: "Ambré floral", size: "100 ml", priceEur: 34.99,
    profilsCompatibles: ["amber_gourmand", "floral"], besoinsCibles: ["amber", "floral", "intensity"], priorite: 90,
    olfactoryNotes: ["Orange amère", "Iris", "Encens"],
    sourceUrl: `${perfumeBase}bouquet-ambre-eau-de-parfum/p/62903`,
    usageAdvice: perfumeAdvice, precautions: perfumePrecautions,
  },
];

export const hairFragranceProducts: SourcedProduct[] = entries.map((product) => ({
  ...product,
  id: `yr-${product.reference}`,
  image: `/images/products/yr-${product.reference}.jpg`,
  priceCheckedAt: "2026-09-30",
}));
