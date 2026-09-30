# Déploiement Vercel

## Réglages du projet

Importer le dépôt GitHub avec les derniers changements validés et poussés, puis sélectionner :

| Paramètre | Valeur |
| --- | --- |
| Root Directory | `v2-web` |
| Framework Preset | Next.js |
| Install Command | `npm ci` |
| Build Command | `npm run build -- --webpack` |
| Output Directory | Valeur par défaut de Next.js |

La commande Webpack correspond à la compilation validée localement. Le projet utilise des routes dynamiques ; ne pas choisir un export HTML statique. `npm run dev` sert uniquement au développement.

L’utilisation en boutique est commerciale. L’offre Hobby de Vercel est réservée à l’usage personnel non commercial : choisir une offre adaptée avant l’utilisation en boutique. [Conditions Vercel](https://vercel.com/docs/plans/hobby).

## Supabase

Conserver le projet Supabase existant et configurer ces deux variables dans Vercel avant compilation :

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-cle-publique-anon
```

Ne jamais utiliser la clé `service_role`. Ces variables sont intégrées au code navigateur : toute modification nécessite un redéploiement.

En local, copier `.env.example` vers `.env.local`, renseigner les valeurs puis redémarrer `npm run dev`. Le fichier `.env.local` est ignoré par Git.

## Vérification après déploiement

1. Ouvrir les trois parcours sur l’URL HTTPS depuis un téléphone et une tablette.
2. Tester le compte personnel existant sur `/admin/login`, puis la déconnexion.
3. En navigation privée, vérifier que les données administratives ne sont pas lisibles sans connexion. Leur protection dépend des règles RLS Supabase, pas seulement de la redirection de l’interface.
4. Les règles SQL locales autorisent la lecture aux utilisateurs authentifiés. Pour un unique compte personnel, vérifier que les inscriptions publiques sont désactivées et que seuls les comptes autorisés existent dans Supabase Auth.
5. Effectuer un diagnostic test et vérifier sa remontée dans l’administration si les statistiques sont conservées. Le code actuel enregistre réponses et recommandations sans demander l’identité de la cliente ; ce n’est pas une absence totale de données enregistrées.

La présence des migrations dans le dépôt ne prouve pas leur application sur la base distante. Ne pas réexécuter les migrations sur la base déjà configurée sans vérifier son état.

## État de préparation

La compilation Webpack, le lint et les 30 tests ont été validés lors de l’intégration du catalogue. La préparation du déploiement n’a détecté ni fichier d’environnement local ni variables Supabase dans le processus courant. La connexion réelle et le compte personnel restent à vérifier sur l’environnement configuré. Aucun déploiement n’a encore été effectué par cette préparation.

Sources : [monorepos Vercel](https://vercel.com/docs/monorepos), [variables Vercel](https://vercel.com/docs/environment-variables).
