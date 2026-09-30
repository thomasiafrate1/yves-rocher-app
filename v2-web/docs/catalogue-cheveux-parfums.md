# Catalogue cheveux et parfums

Relevé du 30 septembre 2026 sur les fiches officielles Yves Rocher France.
17 références intégrées : 12 cheveux et 5 parfums. Avec les 8 références visage existantes, le catalogue local contient 25 produits.

Les photos originales sont enregistrées dans `public/images/products/yr-REFERENCE.jpg` et ne dépendent pas du site Yves Rocher pendant la consultation. Les URL des photos sont conservées dans [product-image-sources.json](./product-image-sources.json). Les liens des fiches, prix, contenances et conseils sont dans [hair-fragrance.ts](../src/features/products/hair-fragrance.ts).

## Sélection

| Référence | Produit | Contenance | Prix web relevé | Usage principal |
| --- | --- | --- | --- | --- |
| 35236 | Shampooing Crème Ultra-Nourrissant Sans Sulfate | 250 ml | 7,90 € | Cheveux secs |
| 37395 | Masque Ultra-Nourrissant | 200 ml | 11,90 € | Longueurs sèches |
| 94625 | Shampooing Reconstituant | 300 ml | 5,99 € | Cheveux fragilisés |
| 95128 | Après-Shampooing Anti-Casse | 200 ml | 6,50 € | Casse, démêlage |
| 95467 | Masque Réparateur | 200 ml | 12,90 € | Longueurs abîmées |
| 96007 | Sérum Thermoprotecteur Restructurant | 100 ml | 12,90 € | Avant les appareils chauffants |
| 91373 | Shampooing Détoxifiant | 300 ml | 5,90 € | Racines grasses |
| 98076 | Shampooing Définissant | 300 ml | 5,90 € | Boucles |
| 98778 | Après-Shampooing Définissant | 200 ml | 6,90 € | Boucles, démêlage |
| 99729 | Crème Définissante | 150 ml | 11,90 € | Boucles, sans rinçage |
| 90159 | Shampooing Doux | 300 ml | 5,90 € | Cheveux normaux à secs |
| 95725 | Équilibre — Sérum Cuir Chevelu | 50 ml | 19,90 € | Confort, avant shampooing |
| 90154 | Sel d’Azur | 100 ml | 34,99 € | Frais, agrumes |
| 30466 | Comme Une Évidence | 50 ml | 35,50 € | Rose, patchouli |
| 92464 | Cuir de Nuit | 30 ml | 18,99 € | Ambré, vanillé |
| 30137 | L’Évidence | 100 ml | 49,90 € | Pêche, magnolia, patchouli |
| 62903 | Bouquet Ambré | 100 ml | 34,99 € | Ambré floral |

Ce sont des références à faire correspondre à l’assortiment de la boutique, pas des quantités à commander. Aucun stock local n’est connu ni simulé.

## Règles de recommandation

- Visage : catalogue et classement existants conservés.
- Cheveux : au plus un produit par geste, dans l’ordre avant-shampooing → shampooing → soin à rincer → soin sans rinçage. Le masque et l’après-shampooing sont des alternatives. Les besoins secondaires peuvent ajouter un soin ciblé mais ne déclenchent pas un shampooing pour un autre profil.
- Parfum : une ou deux propositions compatibles avec le profil. Les familles officielles et notes restent affichées ; l’affectation aux profils du questionnaire est un choix éditorial à valider en boutique.
- Le profil boisé explore Comme Une Évidence et L’Évidence pour leur patchouli. Ce sont des chyprés, pas des parfums classés officiellement dans une famille purement boisée. Le résultat présente explicitement cette piste.
- Le shampooing Doux complète la routine du cuir chevelu sensible pour le lavage ; sa fiche vise les cheveux normaux à secs et ne revendique pas un traitement de la sensibilité. Le soin apaisant est le sérum Équilibre.

## Points à valider avec la patronne

1. **Assortiment et prix boutique.** Les tarifs affichés sont des prix web, parfois promotionnels, datés et indicatifs. Les références 35236 et 37395 étaient indisponibles en ligne lors du relevé ; cela ne renseigne pas leur disponibilité dans la boutique. Confirmer leur présence ou choisir leurs remplaçants avant mise en service.
2. **Choix olfactifs.** Voile d’Ocre a été retiré du catalogue officiel et n’est pas intégré. Bouquet Ambré est un ambré floral, pas son équivalent boisé. Valider les propositions autour du patchouli et compléter avec une référence boisée de la boutique si nécessaire.
3. **Conseils.** Les bénéfices et modes d’emploi sont reformulés. Pour les références 94625 et 95128, la fiche consultée ne donnait pas de durée de pose détaillée ; le texte renvoie au flacon. Aucun dosage ni temps manquant n’a été inventé. Le conseil de découverte des parfums sur touche est éditorial. Les précautions de l’emballage font référence.

## Maintenance

Modifier les références dans `src/features/products/hair-fragrance.ts`, mettre à jour `priceCheckedAt` à chaque nouveau relevé, conserver les sources et remplacer la photo locale si le conditionnement change. Le format retenu pour L’Évidence est le 100 ml décrit dans le corps de la fiche 30137 (le titre indexé mentionnait parfois 50 ml).

Les anciens identifiants de démonstration restent uniquement dans `legacy-names.ts` pour la lecture des statistiques historiques. Aucun remplacement d’identifiant dans Supabase et aucune migration ne sont nécessaires.
