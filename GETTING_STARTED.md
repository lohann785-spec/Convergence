# 🚀 Guide Complet: Convergence App

## Démarrage Rapide en 5 Minutes

### 1️⃣ Installation
```bash
cd "c:\Users\basti\Desktop\convergence-saa-s-app (1)"
pnpm install
```

### 2️⃣ Configuration Base de Données
```bash
# Générer le client Prisma
pnpm prisma generate

# Créer la DB et appliquer les migrations
pnpm prisma migrate deploy
```

### 3️⃣ Lancer l'app
```bash
pnpm dev
```

Ouvrir: **http://localhost:3000**

---

## 📱 Tests de Fonctionnalité

### Test 1: Créer un compte

1. Aller à `http://localhost:3000/auth`
2. Cliquer sur "S'inscrire"
3. Remplir:
   - **Nom**: Jean Dupont
   - **Email**: jean@example.com
   - **Mot de passe**: TestPass123!
4. Cliquer "S'inscrire"
5. Devrait rediriger vers `/dashboard`

### Test 2: Se connecter

1. Aller à `http://localhost:3000/auth`
2. Mode "Se connecter" (par défaut)
3. Remplir:
   - **Email**: jean@example.com
   - **Mot de passe**: TestPass123!
4. Cliquer "Se connecter"
5. Devrait afficher le dashboard

### Test 3: Générer une app

1. Depuis le dashboard
2. Dans le chat, taper: "Crée-moi une app todo mobile"
3. Sélectionner "Mobile" comme type
4. Cliquer le bouton d'envoi (avion)
5. L'app devrait être générée et affichée en prévisualisation

### Test 4: Gestion des crédits

1. Une génération coûte ~1.5 crédits
2. Plan FREE: 5 crédits/semaine
3. Vérifier dans `/account` que les crédits diminuent
4. Après 3-4 générations, l'app devrait refuser (crédits insuffisants)

---

## 🗄️ Base de Données

### Voir les données

```bash
# Ouvrir Prisma Studio (interface graphique)
pnpm prisma studio
```

Puis ouvrir: **http://localhost:5555**

### Réinitialiser la DB

```bash
# Supprimer et recréer
pnpm prisma migrate reset

# Ou simplement supprimer le fichier
rm prisma/dev.db
pnpm prisma migrate deploy
```

---

## 📂 Structure du Projet

```
app/
├── api/                    # API Routes
│   ├── auth/
│   │   ├── login/route.ts   # POST /api/auth/login
│   │   └── signup/route.ts  # POST /api/auth/signup
│   ├── generate-code/      # POST /api/generate-code
│   ├── projects/           # GET/POST /api/projects
│   └── user/               # GET/PUT /api/user
├── auth/page.tsx           # Page de connexion
├── dashboard/page.tsx      # Page principale
├── account/page.tsx        # Paramètres
├── pricing/page.tsx        # Tarification
└── layout.tsx              # Layout global

components/
├── chat-interface.tsx      # Chat de génération
├── app-preview.tsx         # Aperçu du code
├── sidebar.tsx             # Menu latéral
├── particle-network.tsx    # Fond animé
└── ui/                     # Composants shadcn/ui

lib/
├── auth.ts                 # Fonctions auth
├── auth-context.tsx        # Context React
├── prisma.ts               # Client Prisma
└── utils.ts                # Utilitaires

hooks/
├── use-auth.ts             # Hook auth
└── use-mobile.tsx          # Hook responsive

prisma/
├── schema.prisma           # Schéma DB
└── migrations/             # Historique des migrations
```

---

## 🔌 API Endpoints

### Authentification

**POST /api/auth/signup**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "John Doe"
}
```

**POST /api/auth/login**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

### Génération de Code

**POST /api/generate-code**
```json
{
  "userId": "user-id-here",
  "description": "Crée une app todo",
  "type": "mobile"  // ou "fullstack"
}
```

Réponse:
```json
{
  "app": {
    "id": "app-id",
    "name": "Generated App",
    "code": "...code généré...",
    "type": "mobile"
  },
  "creditsRemaining": 3.5
}
```

### Utilisateur

**GET /api/user?userId=user-id-here**

**PUT /api/user**
```json
{
  "userId": "user-id-here",
  "name": "New Name",
  "theme": "dark",
  "language": "en"
}
```

---

## 🛠️ Commandes Utiles

### Prisma
```bash
pnpm prisma studio          # Voir/éditer la DB visuellement
pnpm prisma generate        # Générer le client TypeScript
pnpm prisma migrate dev     # Créer une nouvelle migration
pnpm prisma migrate deploy  # Appliquer les migrations
pnpm prisma migrate reset   # Réinitialiser la BD
```

### Next.js
```bash
pnpm dev          # Démarrer en développement
pnpm build        # Compiler pour production
pnpm start        # Démarrer la version production
pnpm lint         # Vérifier la qualité du code
```

---

## 🔍 Dépannage

### Erreur: "Database cannot be created"

```bash
# Créer le dossier prisma si nécessaire
mkdir -p prisma

# Puis migrer
pnpm prisma migrate deploy
```

### Erreur: "Cannot find module @prisma/client"

```bash
# Régénérer le client
pnpm prisma generate

# Réinstaller si nécessaire
pnpm install
```

### Port 3000 déjà utilisé

```bash
# Utiliser un autre port
PORT=3001 pnpm dev
```

### Problèmes de connexion

Vérifier `.env.local` :
```
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="dev-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

---

## 📊 Flux de Données

```
User
  ↓
Auth Page (/auth)
  ↓
API (signup/login)
  ↓
Prisma → SQLite DB
  ↓
Dashboard (/dashboard)
  ↓
Chat Interface
  ↓
API (generate-code)
  ↓
Prisma → Save GeneratedApp
  ↓
App Preview + Code Display
```

---

## 🎓 Améliorations Futures

1. **IA Réelle**
   - Intégrer OpenAI ou Claude
   - Prompts optimisés pour le code

2. **Authentification**
   - OAuth (Google, GitHub)
   - 2FA (authentification double facteur)

3. **Base de Données**
   - PostgreSQL en production
   - Backup automatique

4. **Performance**
   - Cache des générations
   - Queue de tâches (Redis)
   - CDN pour les assets

5. **Monétisation**
   - Stripe pour les paiements
   - Webhooks pour les événements

---

## 📞 Support

Problèmes fréquents avec solutions:

| Problème | Solution |
|----------|----------|
| DB vide après migration | `pnpm prisma migrate reset` |
| Crédits ne décrémentent pas | Vérifier `/api/generate-code` |
| Authentification cassée | Vérifier `use-auth.ts` et localStorage |
| API ne répond pas | Vérifier `pages/api/` et logs du terminal |

---

**Prêt à développer!** 🚀
