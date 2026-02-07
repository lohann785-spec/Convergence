# 🚀 GUIDE COMPLET VERCEL - CONVERGENCE SAAS

## ✅ ÉTAPE 1: PRÉREQUIS (À FAIRE MAINTENANT)

### 1.1 Créer un compte GitHub
- Aller sur https://github.com/join
- Compléter les infos
- Vérifier l'email

### 1.2 Créer un compte Vercel
- Aller sur https://vercel.com/sign-up
- Connecter votre compte GitHub

### 1.3 Préparer une base de données PostgreSQL

**Option A: Neon (Recommandé - Gratuit)**
```
1. Aller sur https://neon.tech
2. S'inscrire gratuitement
3. Créer un projet
4. Copier la connection string (elle commence par postgresql://)
   → Exemple: postgresql://user:password@ep-abc123.region.neon.tech/convergence
```

**Option B: Supabase**
```
1. Aller sur https://supabase.com
2. Créer un projet gratuit
3. Attendre que la DB se crée (~2 min)
4. Aller à "Settings → Database"
5. Copier "Connection string" (Pool Mode)
```

**Option C: Railway**
```
1. Aller sur https://railway.app
2. Créer un projet
3. Ajouter PostgreSQL plugin
4. Copier DATABASE_URL from "Variables"
```

### 1.4 Préparer OpenAI API
```
1. Aller sur https://platform.openai.com/api-keys
2. S'inscrire si nécessaire
3. Créer une nouvelle clé API
4. Copier et stocker de manière sécurisée
   → Format: sk-proj-xxxxxxxxxxxxxxxx...
```

### 1.5 Générer NEXTAUTH_SECRET (DÉJÀ FAIT)
```
✅ NEXTAUTH_SECRET = d3abce97ca9f16264bb3ed373a0d16d017b6a998e40946ba55f0c6a76e51b62c
```

---

## ✅ ÉTAPE 2: CRÉER UN REPOSITORY GITHUB

### Via GitHub Web (Recommandé)
```
1. Aller sur https://github.com/new
2. Repository name: convergence
3. Choix: Public (pour Vercel gratuit)
4. Créer le repository (NE PAS initialiser avec README)
5. Copier la URL: https://github.com/VOTRE_USERNAME/convergence.git
```

### Via Terminal (Alternative)
```bash
# Remplacer VOTRE_USERNAME par votre username GitHub
git remote add origin https://github.com/VOTRE_USERNAME/convergence.git
git branch -M main
git push -u origin main
```

---

## ✅ ÉTAPE 3: DÉPLOYER SUR VERCEL

### Option A: Via Dashboard Vercel (Plus facile)
```
1. Aller sur https://vercel.com/dashboard
2. Cliquer "Add New..." → "Project"
3. Connecter votre repo GitHub
   - Chercher "convergence"
   - Cliquer "Import"
4. Aller à "Environment Variables"
5. Ajouter les 6 variables (voir ÉTAPE 4 ci-dessous)
6. Cliquer "Deploy"
```

### Option B: Via Vercel CLI
```bash
npm i -g vercel
vercel login
vercel
# Suivre les prompts
# À la fin, ajouter les env vars quand demandé
```

---

## ✅ ÉTAPE 4: CONFIGURER LES VARIABLES D'ENVIRONNEMENT

**Sur Vercel Dashboard:**
1. Aller à votre projet
2. Aller à **Settings → Environment Variables**
3. Ajouter EXACTEMENT ces 6 variables:

### Variable 1: DATABASE_URL
```
Key: DATABASE_URL
Value: [Votre connection string Neon/Supabase/Railway]
Environments: Production, Preview, Development
```

### Variable 2: DATABASE_URL_UNPOOLED
```
Key: DATABASE_URL_UNPOOLED
Value: [MÊME que DATABASE_URL - utilisé par Prisma migrations]
Environments: Production, Preview, Development
```

### Variable 3: OPENAI_API_KEY
```
Key: OPENAI_API_KEY
Value: sk-proj-xxxxx... [Votre clé OpenAI]
Environments: Production, Preview, Development
```

### Variable 4: NEXTAUTH_SECRET
```
Key: NEXTAUTH_SECRET
Value: d3abce97ca9f16264bb3ed373a0d16d017b6a998e40946ba55f0c6a76e51b62c
Environments: Production, Preview, Development
```

### Variable 5: NEXTAUTH_URL
```
Key: NEXTAUTH_URL
Value: https://votre-domain.vercel.app
       OU si vous avez un custom domain: https://convergence.votre-domaine.com
Environments: Production, Preview
```

### Variable 6: OPENAI_MODEL
```
Key: OPENAI_MODEL
Value: gpt-4-turbo
Environments: Production, Preview, Development
```

**⚠️ IMPORTANT: Cliquer "Save" après chaque variable!**

---

## ✅ ÉTAPE 5: DÉPLOYER LE PROJET

### Après avoir ajouté les env vars:
1. Aller à l'onglet **"Deployments"**
2. Cliquer **"Redeploy"** (bleu)
3. Attendre ~3-5 minutes

**Pendant la build:**
- On verra "Building..."
- Puis "Initializing..."
- Enfin "Running Checks"
- Si ✅ = succès!

**En cas d'erreur:**
- Cliquer sur la build → "Logs"
- Chercher le message d'erreur
- Voir section DÉPANNAGE ci-dessous

---

## ✅ ÉTAPE 6: EXÉCUTER LES MIGRATIONS PRISMA

### APRÈS la première build réussie:

**Option A: Via Vercel CLI**
```bash
vercel env pull
npx prisma migrate deploy
```

**Option B: Via Vercel Dashboard**
```
1. Aller à "Settings → Git"
2. Dans "Deploy Hooks", créer un hook:
   - URL: https://vercel.com/api/crons/...
3. Ou attendre que le système exécute automatically (si configured)
```

**Option C: Manuelle (si les 2 autres échouent)**
```bash
# Sur votre machine
DATABASE_URL="votre-connection-string" npx prisma migrate deploy
```

---

## ✅ ÉTAPE 7: TESTER L'APPLICATION

### Après déploiement réussi:
```
1. Aller sur https://votre-project.vercel.app
2. Cliquer "Sign Up"
3. Créer un compte (email fictif ok: test@test.com)
4. Aller au Dashboard
5. Tester "Generate Code" → devrait appeler OpenAI
6. Voir le code généré
```

---

## 🔐 CHECKLIST DE SÉCURITÉ

**Avant le déploiement:**
- [ ] NEXTAUTH_SECRET n'est pas en git (utilisé .env.local)
- [ ] OPENAI_API_KEY n'est pas en git
- [ ] DATABASE_URL n'est pas en git
- [ ] .gitignore contient .env.local
- [ ] Les env vars sont dans Vercel, pas dans le code

**Après le déploiement:**
- [ ] Tester signup/login fonctionne
- [ ] Tester génération de code
- [ ] Vérifier dans Vercel Logs qu'il n'y a pas d'erreurs
- [ ] Tester depuis un 2e appareil/navigateur

---

## 🐛 DÉPANNAGE

### "Build failed - Prisma error"
**Problème:** DATABASE_URL invalide ou vide
**Solution:**
```
1. Aller à Vercel Settings → Environment Variables
2. Vérifier DATABASE_URL est exacte
3. Redeploy
```

### "Database connection refused"
**Problème:** La DB n'est pas accessible depuis Vercel
**Solution:**
```
1. Vérifier que Neon/Supabase/Railway accepte les connections publiques
2. Neon: Vérifier dans "IP Whitelist" que 0.0.0.0/0 est autorisé
3. Récupérer une nouvelle connection string
4. Mettre à jour Vercel env vars
```

### "OpenAI API error - Invalid API key"
**Problème:** OPENAI_API_KEY incorrect
**Solution:**
```
1. Aller sur https://platform.openai.com/api-keys
2. Vérifier la clé fonctionne localement: curl https://api.openai.com/v1/models -H "Authorization: Bearer YOUR_KEY"
3. Copier la clé complète (parfois manque des caractères)
4. Mettre à jour Vercel
```

### "Generation timeout - Function execution timed out"
**Problème:** OpenAI prend trop longtemps ou la fonction Vercel a limité le temps
**Solution:**
```
1. Vérifier votre quota OpenAI (https://platform.openai.com/account/billing/overview)
2. Si limite atteinte, recharger credits
3. Vérifier que gpt-4-turbo est disponible pour votre compte
4. Alternative: utiliser gpt-3.5-turbo (moins cher, plus rapide)
```

### "Prisma migration failed"
**Problème:** Base de données n'est pas en sync avec le schema
**Solution:**
```bash
# Sur machine locale avec DATABASE_URL correct:
npx prisma db push

# Ou si migrations existent:
npx prisma migrate deploy
```

### "Environment variables not loading"
**Problème:** Les variables ne sont pas visibles dans les logs
**Solution:**
```
1. Vérifier que vous n'avez pas mis le scope sur une branche spécifique
2. Aller à Vercel Settings → Environment Variables
3. S'assurer "Production", "Preview", "Development" sont cochés
4. Redeploy (surtout si vous avez juste ajouté les vars)
```

---

## 📊 COMMANDS UTILES

```bash
# Développement local
pnpm dev              # Démarrer server http://localhost:3000

# Build
pnpm build            # Builder prod localement

# Base de données
npx prisma studio    # UI Prisma pour voir les données
npx prisma db push   # Syncer schema
npx prisma migrate dev --name init  # Créer une migration

# Vercel
vercel logs           # Voir les logs en temps réel
vercel env pull       # Télécharger les env vars localement
vercel link           # Connecter le repo courant à Vercel

# Git
git status            # Voir les changements
git add .             # Ajouter tous les fichiers
git commit -m "msg"   # Faire un commit
git push              # Pousser sur GitHub
```

---

## 📞 RESSOURCES UTILES

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **OpenAI API:** https://platform.openai.com/docs
- **Neon Docs:** https://neon.tech/docs

---

## 🎯 PROCHAINES ÉTAPES (OPTIONNEL)

1. **Ajouter Stripe** pour les paiements
2. **Ajouter email verification** avec SendGrid/Resend
3. **Ajouter monitoring** avec Sentry/LogRocket
4. **Custom domain** - connecter votre domaine à Vercel
5. **Rate limiting** - protéger les API routes

---

## ✨ RÉSUMÉ RAPIDE

```
┌─────────────────────────────────────────────────┐
│  1. Créer repo GitHub                           │
│  2. Créer Vercel account                        │
│  3. Préparer DB PostgreSQL + OpenAI key         │
│  4. Connecter repo à Vercel                     │
│  5. Ajouter 6 env vars                          │
│  6. Deploy!                                      │
│  7. Tester l'app                                │
└─────────────────────────────────────────────────┘
```

**Vous êtes 95% prêt! Il vous manque juste les credentials (DB + OpenAI) et un repo GitHub.**

---

**Besoin d'aide? Relire le section DÉPANNAGE ou contacter support Vercel.**

**BONNE CHANCE! 🚀**
