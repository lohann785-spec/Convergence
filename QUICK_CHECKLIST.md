# ⚡ QUICK CHECKLIST - À FAIRE MAINTENANT

## 🔧 AVANT VERCEL

- [ ] **Créer compte GitHub** → https://github.com/join
- [ ] **Créer repo GitHub** nommé `convergence`
  - Public
  - Ne pas initialiser avec README
- [ ] **Push le code sur GitHub**
  ```bash
  git remote add origin https://github.com/VOTRE_USERNAME/convergence.git
  git branch -M main
  git push -u origin main
  ```

## 💾 DATABASE (Choisir 1)

- [ ] **Neon** (Recommandé)
  - https://neon.tech
  - Copier connection string

- [ ] **Supabase**
  - https://supabase.com
  - Connection string → Settings → Database

- [ ] **Railway**
  - https://railway.app
  - DATABASE_URL from Variables

## 🔑 API KEYS

- [ ] **OpenAI API Key**
  - https://platform.openai.com/api-keys
  - Copier clé complète (commence par `sk-proj-`)

## 🚀 VERCEL

- [ ] Aller sur https://vercel.com/dashboard
- [ ] Import Project → Sélectionner `convergence`
- [ ] Aller à **Settings → Environment Variables**
- [ ] Ajouter ces 6 variables:

| Key | Value | Notes |
|-----|-------|-------|
| `DATABASE_URL` | Votre connection string | De Neon/Supabase/Railway |
| `DATABASE_URL_UNPOOLED` | MÊME que DATABASE_URL | Pour Prisma |
| `OPENAI_API_KEY` | sk-proj-xxx... | Votre clé OpenAI |
| `NEXTAUTH_SECRET` | `d3abce97ca9f16264bb3ed373a0d16d017b6a998e40946ba55f0c6a76e51b62c` | Déjà généré ✅ |
| `NEXTAUTH_URL` | `https://votreapp.vercel.app` | Ou custom domain |
| `OPENAI_MODEL` | `gpt-4-turbo` | Ou gpt-3.5-turbo si budget limité |

- [ ] **Redeploy** → Aller à Deployments → Redeploy
- [ ] Attendre que la build réussisse (~3-5 min)

## ✅ POST-DEPLOY

- [ ] Ouvrir https://votreapp.vercel.app
- [ ] Tester Sign Up
- [ ] Tester Generate Code
- [ ] Vérifier les logs si erreur

## 🎉 DONE!

Si tout fonctionne → **Votre SaaS est live!**

---

**💡 Besoin d'aide? Lire `VERCEL_GUIDE_COMPLET.md` pour plus de détails.**
