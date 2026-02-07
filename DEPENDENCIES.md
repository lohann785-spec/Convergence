# 📦 Stack Technologique

## Versions Installées

### Runtime & Framework
- **Node.js**: v18+ (recommandé v20+)
- **Next.js**: 16.1.6
- **React**: 19
- **TypeScript**: 5.7.3

### Backend & Base de Données
- **Prisma**: 5.7.1 (ORM)
- **SQLite**: Built-in (dev)
- **bcryptjs**: 2.4.3 (Password hashing)

### Frontend
- **Tailwind CSS**: 3.4.17
- **Shadcn/ui**: Latest (Component library)
- **Lucide React**: 0.544.0 (Icons)
- **Recharts**: 2.15.0 (Charts)

### Utilitaires
- **date-fns**: 4.1.0 (Date manipulation)
- **zod**: 3.24.1 (Schema validation)
- **react-hook-form**: 7.54.1 (Form management)
- **sonner**: 1.7.1 (Toast notifications)

---

## Dépendances Production

```json
{
  "@hookform/resolvers": "^3.9.1",
  "@prisma/client": "^5.7.1",
  "@radix-ui/*": "Latest versions",
  "autoprefixer": "^10.4.20",
  "bcryptjs": "^2.4.3",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "cmdk": "1.1.1",
  "date-fns": "4.1.0",
  "embla-carousel-react": "8.5.1",
  "input-otp": "1.4.1",
  "jsonwebtoken": "^9.1.2",
  "lucide-react": "^0.544.0",
  "next": "16.1.6",
  "next-auth": "^5.0.0",
  "next-themes": "^0.4.6",
  "react": "^19",
  "react-day-picker": "8.10.1",
  "react-dom": "^19",
  "react-hook-form": "^7.54.1",
  "react-resizable-panels": "^2.1.7",
  "recharts": "2.15.0",
  "sonner": "^1.7.1",
  "tailwind-merge": "^2.5.5",
  "tailwindcss-animate": "^1.0.7",
  "vaul": "^1.1.2",
  "zod": "^3.24.1"
}
```

---

## Dépendances Développement

```json
{
  "@tailwindcss/postcss": "^4.1.13",
  "@types/bcryptjs": "^2.4.6",
  "@types/jsonwebtoken": "^9.0.5",
  "@types/node": "^22",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "postcss": "^8.5",
  "prisma": "^5.7.1",
  "tailwindcss": "^3.4.17",
  "typescript": "5.7.3"
}
```

---

## Configuration NPM Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev"
  }
}
```

---

## Commandes Essentielles

```bash
# Développement
pnpm dev                    # Démarrer serveur local
pnpm build                  # Builder pour production
pnpm start                  # Lancer version production

# Base de données
pnpm prisma studio         # Voir/éditer la DB visuellement
pnpm prisma generate       # Générer types Prisma
pnpm prisma migrate dev    # Créer nouvelle migration
pnpm prisma migrate reset  # Réinitialiser DB
pnpm prisma validate       # Valider schema.prisma

# Linting & Type checking
pnpm lint                   # Linter le code
pnpm tsc --noEmit          # Vérifier les types

# Installation
pnpm install               # Installer toutes les dépendances
pnpm add <package>        # Ajouter une dépendance
pnpm remove <package>     # Supprimer une dépendance
```

---

## Composants Shadcn/ui Installés

- ✅ accordion
- ✅ alert
- ✅ alert-dialog
- ✅ aspect-ratio
- ✅ avatar
- ✅ badge
- ✅ breadcrumb
- ✅ button
- ✅ calendar
- ✅ card
- ✅ carousel
- ✅ chart
- ✅ checkbox
- ✅ collapsible
- ✅ command
- ✅ context-menu
- ✅ dialog
- ✅ drawer
- ✅ dropdown-menu
- ✅ form
- ✅ hover-card
- ✅ input
- ✅ input-otp
- ✅ label
- ✅ menubar
- ✅ navigation-menu
- ✅ pagination
- ✅ popover
- ✅ progress
- ✅ radio-group
- ✅ resizable
- ✅ scroll-area
- ✅ select
- ✅ separator
- ✅ sheet
- ✅ skeleton
- ✅ slider
- ✅ sonner (toasts)
- ✅ switch
- ✅ table
- ✅ tabs
- ✅ textarea
- ✅ toast
- ✅ toaster
- ✅ toggle
- ✅ toggle-group
- ✅ tooltip

---

## Ports Utilisés

- **3000**: Next.js dev server (pnpm dev)
- **5555**: Prisma Studio (pnpm prisma studio)
- **3001**: Alternative port (PORT=3001 pnpm dev)

---

## Variables d'Environnement

```bash
# .env.local
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Production (.env.production)
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="production-secret-key"
NEXTAUTH_URL="https://your-domain.com"
```

---

## Système d'Exploitation

- ✅ Windows (testé)
- ✅ macOS
- ✅ Linux

---

## Browsers Supportés

- ✅ Chrome/Edge (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)

---

## Taille du Projet

| Catégorie | Taille |
|-----------|--------|
| node_modules | ~1.2GB |
| Build (.next) | ~200MB |
| Source code | ~50MB |
| Database (dev) | ~5MB |

---

## Performance

- **First Paint**: < 1s
- **Interactive**: < 2s
- **API Response**: < 500ms (local)
- **Build Time**: ~30-60s

---

## Mises à Jour Recommandées

À faire régulièrement:

```bash
# Vérifier les updates
pnpm outdated

# Mettre à jour les dépendances minor/patch
pnpm update

# Mettre à jour Prisma
pnpm add @prisma/client@latest prisma@latest

# Mettre à jour Next.js
pnpm add next@latest
```

---

## Dépannage de Dépendances

```bash
# Installer les dépendances manquantes
pnpm install

# Nettoyer le cache pnpm
pnpm store prune

# Réinstaller complètement
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Vérifier les duplicates
pnpm list --depth=0
```

---

**Stack moderne, performant et maintenable! 🚀**
