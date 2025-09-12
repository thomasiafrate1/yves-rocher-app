// scripts/importProduits.ts
import { db } from "@/lib/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";

const produits = [
  {
    id: "grand_soin_hydratation_intense_01",
    nom: "Grand Soin Hydration Intense",
    description:
      "Dès la première application, le Grand Soin Hydratation Intense laisse la peau intensément hydratée, fraîche et éclatante.",
    typePeau: "seche",
    texture: "crème fondante",
    parfum: true,
    naturel: true,
    moment: ["Jour"],
    problemes: ["deshydratation"],
    photoLocal: "grand_soin_hydratation_intense_01.png",
  },
  {
    id: "nettoyant_solide_hydratant_01",
    nom: "Nettoyant Solide Hydratant",
    description:
      "Ce Nettoyant Solide Hydratant élimine en douceur les impuretés du visage sans dessécher la peau.",
    typePeau: "seche",
    texture: "mousse crémeuse",
    parfum: true,
    naturel: true,
    moment: ["Nuit"],
    problemes: ["impuretés"],
    photoLocal: "nettoyant_solide_hydratant_01.png",
  },
  {
    id: "bb_creme_sublimatrice_6_en_1",
    nom: "BB Crème Sublimatrice 6 en 1",
    description:
      "Cette BB Crème hydrate la peau immédiatement pendant 24h* et unifie parfaitement le teint.",
    typePeau: "seche",
    texture: "légère",
    parfum: true,
    naturel: true,
    moment: ["Jour"],
    problemes: ["deshydratation"],
    photoLocal: "bb_creme_sublimatrice_6_en_1.png",
  },
  {
    id: "contour_des_yeux_illuminateur_anti_cernes_01",
    nom: "Contour des Yeux Illuminateur Anti Cernes",
    description:
      "Immédiatement, le contour de l'oeil est hydraté et repulpé, le regard défatigué. Cernes, poches et ridules sont estompés.",
    typePeau: "seche",
    texture: "fluide",
    parfum: true,
    naturel: true,
    moment: ["Nuit"],
    problemes: ["deshydratation"],
    photoLocal: "contour_des_yeux_illuminateur_anti_cernes_01.png",
  },
  {
    id: "eau_micellaire_lactee_apaisante_01",
    nom: "Eau Micellaire Lactée Apaisante",
    description:
      "Cette Eau Micellaire Lactée Apaisante élimine en douceur les impuretés et le maquillage du visage et des yeux sans dessécher la peau.",
    typePeau: "grasse",
    texture: "douce",
    parfum: true,
    naturel: true,
    moment: ["Jour", "Nuit"],
    problemes: ["impuretés"],
    photoLocal: "eau_micellaire_lactee_apaisante_01.png",
  },
  {
    id: "gel_nettoyant_purifiant_01",
    nom: "Gel Nettoyant Purifiant",
    description:
      "Ce Gel Nettoyant Purifiant élimine en douceur les impuretés du visage sans dessécher la peau.",
    typePeau: "grasse",
    texture: "gel frais",
    parfum: true,
    naturel: true,
    moment: ["Jour"],
    problemes: ["impuretés"],
    photoLocal: "gel_nettoyant_purifiant_01.png",
  },
  {
    id: "serum_anti_imperfections_01",
    nom: "Sérum Anti-Imperfections",
    description:
      "Le Sérum Anti-Imperfections Sebo Active Clear réduit les imperfections : pores, points noirs et boutons, pour une peau purifiée.",
    typePeau: "grasse",
    texture: "fluide léger",
    parfum: true,
    naturel: true,
    moment: ["Nuit"],
    problemes: ["imperfections"],
    photoLocal: "serum_anti_imperfections_01.png",
  },
  {
    id: "mousse_lactee_nettoyante_illuminatrice_01",
    nom: "Mousse Lactée Nettoyante Illuminatrice",
    description:
      "La Graine Blanche Botanique est un actif d’une grande pureté au pouvoir naturellement éclaircissant.",
    typePeau: "grasse",
    texture: "mousseux",
    parfum: true,
    naturel: true,
    moment: ["Jour", "Nuit"],
    problemes: ["impuretés"],
    photoLocal: "mousse_lactee_nettoyante_illuminatrice_01.png",
  },
  {
    id: "serum_activateur_eclat_01",
    nom: "Sérum Activateur Eclat",
    description:
      "Le Sérum Activateur Éclat, apporte immédiatement +78% d'éclat à votre visage.",
    typePeau: "mixte",
    texture: "fluide",
    parfum: true,
    naturel: true,
    moment: ["Jour"],
    problemes: ["imperfections"],
    photoLocal: "serum_activateur_eclat_01.png",
  },
  {
    id: "huile_recuperatrice_eclat_nuit_01",
    nom: "Huile Récupératrice Eclat Nuit",
    description:
      "Grâce à l'Huile Récupératrice Éclat Nuit, vos traits sont défatigués.",
    typePeau: "mixte",
    texture: "huile",
    parfum: true,
    naturel: true,
    moment: ["Nuit"],
    problemes: ["fatigue"],
    photoLocal: "huile_recuperatrice_eclat_nuit_01.png",
  },
  {
    id: "creme_anti_rides_repulpante_01",
    nom: "Crème Anti-Rides Repulpante",
    description:
      "La Crème Anti-Rides Repulpante Lift Pro-Collagène réduit et lisse les rides, pour une peau rebondie et hydratée.",
    typePeau: "mixte",
    texture: "crème fine",
    parfum: true,
    naturel: true,
    moment: ["Nuit"],
    problemes: ["imperfections"],
    photoLocal: "creme_anti_rides_repulpante_01.png",
  },
  {
    id: "creme_correctrice_sublimatrice_01",
    nom: "Crème correctrice sublimatrice",
    description:
      "Immédiatement la peau est soyeuse, lissée, éclatante. Jour après jour, les rides sont réduites, la peau est plus ferme. Dès un mois, la peau est revitalisée et renforcée.",
    typePeau: "mixte",
    texture: "crème fondante",
    parfum: true,
    naturel: true,
    moment: ["Jour"],
    problemes: ["imperfections"],
    photoLocal: "creme_correctrice_sublimatrice_01.png",
  },
  {
    id: "grand_soin_anti_rides_intense_01",
    nom: "Grand Soin Anti-Rides Intense",
    description:
      "Le Grand Soin Anti-Rides Intense Lift Pro-Collagène est notre soin le plus complet, spécifiquement formulé pour un double usage en crème de jour et crème de nuit.",
    typePeau: "sensible",
    texture: "crème fondante",
    parfum: true,
    naturel: true,
    moment: ["Jour", "Nuit"],
    problemes: ["rides"],
    photoLocal: "grand_soin_anti_rides_intense_01.png",
  },
  {
    id: "gel_frais_defatigant_hydratant_01",
    nom: "Gel Frais Défatigant Hydratant",
    description:
      "Ce gel frais hydrate et illumine le contour de l’œil. Les poches paraissent réduites.",
    typePeau: "sensible",
    texture: "gel frais",
    parfum: true,
    naturel: true,
    moment: ["Jour"],
    problemes: ["imperfections"],
    photoLocal: "gel_frais_defatigant_hydratant_01.png",
  },
  {
    id: "creme_douceur_visage_&_corps_la_gacilly_01",
    nom: "Crème douceur visage & corps La Gacilly",
    description:
      "Enrichie en Camomille aux propriétés adoucissantes et protectrices, cette Crème Douceur Visage et Corps laisse la peau douce et confortable.",
    typePeau: "sensible",
    texture: "baume fondante",
    parfum: true,
    naturel: true,
    moment: ["Jour", "Nuit"],
    problemes: ["allergies"],
    photoLocal: "creme_douceur_visage_&_corps_la_gacilly_01.png",
  },
  {
    id: "baume_confort_nourrissant_01",
    nom: "Le Baume Confort Nourrissant",
    description:
      "Ce Baume Confort Nourrissant adapté aux peaux sensibles et sèches nourrit, hydrate et apaise les tiraillements, picotements et autres sensations d’inconfort.",
    typePeau: "sensible",
    texture: "légère",
    parfum: true,
    naturel: true,
    moment: ["Nuit"],
    problemes: ["peaux sensibles"],
    photoLocal: "baume_confort_nourrissant_01.png",
  },
  {
    id: "demaquillant_express_yeux_pur_bleuet_01",
    nom: "Démaquillant Express Yeux Pur Bleuet",
    description:
      "Ce Démaquillant Express Yeux élimine efficacement toutes traces de maquillage même résistant à l'eau et prend soin des cils grâce à sa formule bi-phasée.",
    typePeau: "normale",
    texture: "bi-phasé sans effet gras",
    parfum: true,
    naturel: true,
    moment: ["Jour", "Nuit"],
    problemes: ["impuretés"],
    photoLocal: "demaquillant_express_yeux_pur_bleuet_01.png",
  },
  {
    id: "grand_soin_regenerant_01",
    nom: "Grand Soin Régénérant",
    description:
      "Immédiatement, la peau est plus souple, confortable et les rides lissées. Dès 1 mois, elle est nourrie et apparaît intensément régénérée.",
    typePeau: "normale",
    texture: "crème fondante",
    parfum: true,
    naturel: true,
    moment: ["Jour", "Nuit"],
    problemes: ["rides"],
    photoLocal: "grand_soin_regenerant_01.png",
  },
  {
    id: "concentre_bi_phase_recuperateur_01",
    nom: "Le concentré Bi-Phase Récupérateur",
    description:
      "Jour après jour, au réveil le teint est lumineux, les traits apparaissent lissés et les rides sont moins visibles. La peau est plus ferme, régénérée et réparée.",
    typePeau: "normale",
    texture: "bi-phase",
    parfum: true,
    naturel: true,
    moment: ["Nuit"],
    problemes: ["rides"],
    photoLocal: "concentre_bi_phase_recuperateur_01.png",
  },
  {
    id: "gel_nettoyant_purifiant_pure_menthe_01",
    nom: "Gel Nettoyant Purifiant Pure Menthe",
    description:
      "Ce Gel Nettoyant Purifiant élimine en douceur les impuretés du visage sans dessécher la peau.",
    typePeau: "normale",
    texture: "gel frais",
    parfum: true,
    naturel: true,
    moment: ["Jour"],
    problemes: ["impuretés"],
    photoLocal: "gel_nettoyant_purifiant_pure_menthe_01.png",
  },
];

export async function importerProduits() {
  try {
    for (const produit of produits) {
      const ref = doc(db, "produits", produit.id);
      await setDoc(ref, produit);
      console.log(`✅ Produit ajouté : ${produit.id}`);
    }
    console.log("🎉 Tous les produits ont été importés avec succès !");
  } catch (error) {
    console.error("❌ Erreur pendant l'import :", error);
  }
}
