# 🚀 DÉPLOIEMENT SUR VERCEL

## ✅ PRÉREQUIS

1. **Compte Vercel** - https://vercel.com
2. **Compte PostgreSQL** - Neon, Supabase, Railway, ou autre
3. **Clé API OpenAI** - https://platform.openai.com/api-keys
4. **Repository GitHub** - Code sur GitHub

---

## 📋 ÉTAPE 1: Préparer la Base de Données

### Option 1: Neon (Recommandé - Gratuit)
```
1. Aller sur https://neon.tech
2. Créer un projet
3. Copier la connection string PostgreSQL
4. Garder pour plus tard
```

### Option 2: Supabase
```
1. Aller sur https://supabase.com
2. Créer un projet
3. Copier DATABASE_URL
4. Garder pour plus tard
```

### Option 3: Railway
```
1. Aller sur https://railway.app
2. Créer une DB PostgreSQL
3. Copier la connection string
4. Garder pour plus tard
```

---

## 📋 ÉTAPE 2: Préparer OpenAI

1. Aller sur https://platform.openai.com/api-keys
2. Créer une nouvelle clé API
3. Copier la clé
4. **NE PAS partager cette clé!**

---

## 📋 ÉTAPE 3: Pousser le Code sur GitHub

```bash
git init
git add .
git commit -m "Initial commit - Convergence SaaS"
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/convergence.git
git push -u origin main
```

---

## 📋 ÉTAPE 4: Déployer sur Vercel

### Via CLI (Recommandé)
```bash
npm i -g vercel
vercel login
vercel
```

### Via Dashboard
1. Aller sur https://vercel.com/dashboard
2. Cliquer "New Project"
3. Connecter votre repo GitHub
4. Cliquer "Import"

---

## 📋 ÉTAPE 5: Configurer les Variables d'Environnement

**Sur Vercel Dashboard:**

1. Aller à **Settings → Environment Variables**
2. Ajouter ces variables:

```
DATABASE_URL = [Votre connection string PostgreSQL]
DATABASE_URL_UNPOOLED = [Même que DATABASE_URL]
NEXTAUTH_SECRET = [Générer avec: openssl rand -hex 32]
NEXTAUTH_URL = https://votre-domain.vercel.app
OPENAI_API_KEY = [Votre clé OpenAI]
OPENAI_MODEL = gpt-4
NEXT_PUBLIC_APP_URL = https://votre-domain.vercel.app
```

### Générer NEXTAUTH_SECRET:
```bash
openssl rand -hex 32
```

---

## 📋 ÉTAPE 6: Première Migration

Après le déploiement initial, migrer la DB:

```bash
vercel env pull
npx prisma migrate deploy
```

Ou sur le dashboard Vercel, aller à **Deployments** et voir les logs.

---

## 📋 ÉTAPE 7: Tester l'App

1. Ouvrir https://votre-project.vercel.app/auth
2. Créer un compte
3. Générer une app (ça devrait appeler OpenAI!)
4. Vérifier que ça marche

---

## 🔐 SÉCURITÉ IMPORTANT

**NE JAMAIS mettre ces variables dans le code:**
- `NEXTAUTH_SECRET`
- `OPENAI_API_KEY`
- `DATABASE_URL`

**TOUJOURS** les mettre dans les **Environment Variables de Vercel**.

---

## 🐛 DÉPANNAGE VERCEL

### "Build failed"
```
- Vérifier les logs
- Vérifier que PostgreSQL connection string est correcte
- Vérifier que toutes les env vars sont présentes
```

### "Database connection error"
```
- Vérifier DATABASE_URL
- Vérifier que la DB est accessible depuis internet
- Vérifier les firewall rules
```

### "OpenAI error"
```
- Vérifier OPENAI_API_KEY
- Vérifier que la clé est valide
- Vérifier le quota/balance OpenAI
```

### "Prisma error"
```
vercel env pull
npx prisma generate
npx prisma migrate deploy
```

---

## 📊 NEXT STEPS

1. ✅ Configurer PostgreSQL
2. ✅ Configurer OpenAI
3. ✅ Pousser sur GitHub
4. ✅ Déployer sur Vercel
5. ⏭️ Ajouter Stripe pour les paiements
6. ⏭️ Ajouter custom domain
7. ⏭️ Ajouter monitoring

---

## 📞 AIDE

**Besoin d'aide?**
- Docs Vercel: https://vercel.com/docs
- Docs Next.js: https://nextjs.org/docs
- Docs Prisma: https://www.prisma.io/docs

---

**Bon déploiement! 🚀**
