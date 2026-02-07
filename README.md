# Convergence - Application Full-Stack Fonctionnelle

Une plateforme Next.js pour générer des applications mobiles et full-stack avec l'IA.

## 🚀 Démarrage Rapide

### 1. Installation des dépendances
```bash
pnpm install
```

### 2. Configuration de la base de données

```bash
# Générer le client Prisma
pnpm prisma:generate

# Créer et migrer la base de données
pnpm prisma:migrate
```

La base de données SQLite sera créée dans le dossier `prisma/` automatiquement.

### 3. Configuration des variables d'environnement

Un fichier `.env.local` a été créé avec les configurations par défaut :
- `DATABASE_URL`: Chemin vers la base de données SQLite
- `NEXTAUTH_SECRET`: Clé secrète pour l'authentification (À changer en production)
- `NEXTAUTH_URL`: URL de l'application

### 4. Démarrer le serveur de développement

```bash
pnpm dev
```

L'application sera accessible sur `http://localhost:3000`

## 📋 Fonctionnalités Implémentées

### ✅ Authentification
- Inscription et connexion avec email/mot de passe
- Stockage sécurisé des mots de passe avec bcrypt
- Gestion de session avec localStorage
- Redirection automatique des utilisateurs non authentifiés

### ✅ Génération de Code IA
- API pour générer du code mobile (React Native)
- API pour générer du code full-stack (Next.js)
- Système de crédits pour limiter l'utilisation
- Sauvegarde des applications générées

### ✅ Gestion des Utilisateurs
- Profils utilisateurs avec paramètres personnalisables
- Gestion des crédits par plan
- Mise à jour des préférences (thème, langue, notifications, etc.)

### ✅ Dashboard
- Interface de chat pour la génération d'apps
- Aperçu en temps réel des applications générées
- Gestion des projets
- Barre latérale avec navigation

### ✅ Systèmes de Plans
- **FREE**: 5 crédits/semaine
- **STARTER**: 50 crédits/mois
- **PRO**: 500 crédits/mois
- **ENTERPRISE**: 5000 crédits/mois

## 📁 Structure du Projet

```
├── app/
│   ├── api/              # Routes API Next.js
│   │   ├── auth/         # Authentification
│   │   ├── generate-code/# Génération de code
│   │   ├── projects/     # Gestion des projets
│   │   └── user/         # Données utilisateur
│   ├── auth/             # Page de connexion/inscription
│   ├── dashboard/        # Dashboard principal
│   ├── account/          # Paramètres du compte
│   ├── pricing/          # Page de tarification
│   └── layout.tsx        # Layout principal
├── components/           # Composants React
│   ├── ui/              # Composants shadcn/ui
│   ├── chat-interface.tsx
│   ├── app-preview.tsx
│   └── ...
├── lib/
│   ├── auth.ts          # Fonctions d'authentification
│   ├── auth-context.tsx # Contexte d'authentification
│   ├── prisma.ts        # Client Prisma
│   └── utils.ts         # Utilitaires
├── hooks/
│   ├── use-auth.ts      # Hook d'authentification
│   └── use-mobile.tsx   # Hook responsivité
├── prisma/
│   └── schema.prisma    # Schéma de base de données
└── .env.local           # Variables d'environnement
```

## 🗄️ Base de Données

### Modèles Prisma

- **User**: Utilisateurs avec profil et préférences
- **Project**: Projets sauvegardés
- **ChatMessage**: Messages du chat
- **GeneratedApp**: Applications générées par l'IA

### Exécuter des commandes Prisma

```bash
# Ouvrir Prisma Studio (interface graphique)
pnpm prisma studio

# Voir les migrations
pnpm prisma migrate status
```

## 🔧 API Routes

### Authentification

- `POST /api/auth/signup` - Créer un compte
- `POST /api/auth/login` - Se connecter

### Génération de Code

- `POST /api/generate-code` - Générer une application

### Utilisateur

- `GET /api/user?userId=...` - Récupérer les données utilisateur
- `PUT /api/user` - Mettre à jour les données utilisateur

### Projets

- `GET /api/projects?userId=...` - Lister les projets
- `POST /api/projects` - Créer un projet

## 🔐 Sécurité

- Mots de passe hashés avec bcrypt
- Variables d'environnement pour les configurations sensibles
- Validation des entrées utilisateur
- CORS configuré pour les API

## 🚀 Déploiement

### Sur Vercel

```bash
# Deployer avec Vercel (recommandé)
vercel deploy
```

Ne pas oublier de :
1. Configurer les variables d'environnement sur Vercel
2. Mettre à jour `NEXTAUTH_SECRET` avec une valeur sécurisée
3. Utiliser PostgreSQL ou MySQL en production (au lieu de SQLite)

### Changer la base de données en production

Dans `prisma/schema.prisma`, remplacer :
```prisma
datasource db {
  provider = "postgresql" // ou "mysql"
  url      = env("DATABASE_URL")
}
```

## 📱 Pages de l'Application

- `/` - Accueil (redirection dashboard si connecté)
- `/auth` - Authentification (connexion/inscription)
- `/dashboard` - Dashboard principal
- `/account` - Paramètres du compte
- `/pricing` - Page de tarification

## 🎨 Thème et Styling

- Tailwind CSS pour le styling
- Shadcn/ui pour les composants
- Support du mode sombre (par défaut)
- Animation avec Tailwind CSS Animate

## 🛠️ Technologies Utilisées

- **Framework**: Next.js 16
- **Runtime**: React 19
- **Langage**: TypeScript
- **ORM**: Prisma
- **Base de données**: SQLite (dev), PostgreSQL (production)
- **Authentication**: Custom auth avec JWT et bcrypt
- **Styling**: Tailwind CSS + shadcn/ui
- **Icons**: Lucide React

## 📝 Notes de Développement

### Accéder à la base de données

```bash
# Via Prisma Studio
pnpm prisma studio

# Puis ouvrir http://localhost:5555
```

### Ajouter une nouvelle table

1. Modifier `prisma/schema.prisma`
2. Créer une migration: `pnpm prisma migrate dev --name descriptive_name`
3. Prisma générera les types TypeScript automatiquement

### Développement continu

L'application recharge automatiquement lors des modifications grâce à Next.js Hot Reload.

## ⚠️ Limitation Actuelle

La génération de code est actuellement simulée (mock). Pour intégrer une IA réelle :

1. Intégrer OpenAI, Claude, ou une autre API LLM
2. Ajouter des prompts optimisés pour la génération de code
3. Implémenter un système de queue pour les requêtes asynchrones
4. Ajouter un cache pour optimiser les coûts

## 📚 Ressources

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Prisma](https://www.prisma.io/docs)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [Documentation shadcn/ui](https://ui.shadcn.com)

## 🤝 Support

Pour toute question ou problème, consultez :
- La documentation du projet
- Les issues GitHub
- Les discussions de la communauté

---

**Convergence** - Créez vos applications avec l'IA 🚀
