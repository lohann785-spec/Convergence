# 🆘 Troubleshooting & FAQ

## Erreurs Courantes et Solutions

### 🔴 "Error: Cannot find module 'next'"

**Solution:**
```bash
pnpm install
# ou
npm install
# ou
yarn install
```

---

### 🔴 "Prisma Client not found"

**Solution:**
```bash
# Régénérer le client Prisma
pnpm prisma generate

# Réinstaller si nécessaire
rm -rf node_modules .pnpm-store
pnpm install
```

---

### 🔴 "Error: ENOENT: no such file or directory 'prisma/dev.db'"

**Solution:**
```bash
# Les migrations créent la DB automatiquement
pnpm prisma migrate deploy

# Si ça ne marche pas:
mkdir -p prisma
pnpm prisma migrate deploy
```

---

### 🔴 "Port 3000 already in use"

**Solution:**
```bash
# Utiliser un autre port
PORT=3001 pnpm dev

# Ou arrêter le processus utilisant 3000:
# Windows: netstat -ano | findstr :3000
# Mac/Linux: lsof -i :3000
```

---

### 🔴 "Login/Signup ne fonctionne pas"

**Vérifier:**

1. **Base de données vide?**
   ```bash
   pnpm prisma studio
   # Vérifier qu'il y a des users dans la table User
   ```

2. **API ne répond pas?**
   - Vérifier les logs du terminal
   - Vérifier que l'app est en développement mode

3. **Erreur 500?**
   ```bash
   # Vérifier les logs
   pnpm dev  # Chercher les erreurs dans le output
   ```

---

### 🔴 "Crédits ne décrémentent pas"

**Vérifier:**

1. **Est-ce que l'utilisateur a des crédits?**
   ```bash
   pnpm prisma studio
   # Vérifier creditsTotal > creditsUsed
   ```

2. **La génération réussit?**
   - Vérifier le message d'erreur dans le chat
   - Vérifier les logs du serveur

3. **Reset les crédits:**
   ```bash
   pnpm prisma db push
   # Puis réessayer
   ```

---

### 🔴 "Cannot find module '@/components/...'"

**Vérifier:**
1. Le fichier existe dans `components/`
2. L'import path est correct (case-sensitive sur Linux/Mac)
3. `tsconfig.json` a les alias corrects

**Solution:**
```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

### 🔴 "Erreur: NEXT_PUBLIC_ non défini"

**Cause:** Variables d'environnement non rechargées

**Solution:**
```bash
# Redémarrer le serveur
# Ctrl+C pour arrêter, puis:
pnpm dev
```

---

### 🔴 "TypeError: Cannot read property 'user' of undefined"

**Cause:** Hook utilisé hors d'un Provider

**Solution:**
```tsx
// Vérifier que AuthProvider enveloppe le composant

// app/layout.tsx
<AuthProvider>
  {children}
</AuthProvider>
```

---

### 🔴 "Prisma migration échoue"

**Solution:**
```bash
# Réinitialiser complètement
pnpm prisma migrate reset

# Ou manuellement:
# 1. Supprimer prisma/dev.db
# 2. Supprimer prisma/migrations/* (sauf init)
# 3. Réappliquer:
pnpm prisma migrate deploy
```

---

### 🔴 "Build fails: 'types/prisma/index.d.ts' not found"

**Solution:**
```bash
pnpm prisma generate
pnpm build
```

---

## ❓ Questions Fréquentes

### Q: Où sont stockés les données?
**R:** Dans `prisma/dev.db` (SQLite). En production, utiliser PostgreSQL.

### Q: Comment ajouter une colonne?
**R:** 
```bash
# 1. Modifier prisma/schema.prisma
# 2. Créer une migration:
pnpm prisma migrate dev --name add_column_name
```

### Q: Comment réinitialiser complètement?
**R:**
```bash
# Supprimer la DB
rm prisma/dev.db

# Recréer:
pnpm prisma migrate deploy

# Vérifier:
pnpm prisma studio
```

### Q: L'app est lente?
**R:**
- Vérifier les requêtes DB avec Prisma Studio
- Ajouter des indexes si nécessaire
- Utiliser le caching

### Q: Comment déployer?
**R:** Voir `README.md` section Déploiement

---

## 🔧 Commandes d'Urgence

```bash
# Tout réinitialiser
rm -rf .next prisma/dev.db node_modules
pnpm install
pnpm prisma generate
pnpm prisma migrate deploy
pnpm dev

# Regarder les logs en détail
pnpm dev 2>&1 | tee app.log

# Vérifier la syntaxe Prisma
pnpm prisma validate

# Générer les types Prisma
pnpm prisma generate --generator client
```

---

## 📞 Support

Si rien ne fonctionne:

1. **Lire les logs du terminal** - Le message est généralement là
2. **Vérifier `.env.local`** - Variables d'environnement valides?
3. **Réinitialiser completement** - Voir "Commandes d'Urgence"
4. **Vérifier la documentation**:
   - [Docs Next.js](https://nextjs.org/docs)
   - [Docs Prisma](https://www.prisma.io/docs)
   - [README.md](./README.md)
   - [GETTING_STARTED.md](./GETTING_STARTED.md)

---

## 🎯 Checklist de Santé

- [ ] `pnpm dev` démarre sans erreur
- [ ] App accessible sur http://localhost:3000
- [ ] Signup/Login marchent
- [ ] Dashboard s'affiche après login
- [ ] Chat marche (test avec "Bonjour")
- [ ] Crédits décrémentent
- [ ] `pnpm prisma studio` ouvre correctement
- [ ] Pas d'erreurs TypeScript: `pnpm tsc --noEmit`

---

**Besoin d'aide? Réappliquez ces solutions! 🚀**
