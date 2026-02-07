# 🚀 GUIDE OLLAMA - LLM LOCAL GRATUIT

## ✅ POURQUOI OLLAMA?

- ✅ **GRATUIT** - Pas de clé API, pas de frais
- ✅ **LOCAL** - Tourne sur votre machine
- ✅ **RAPIDE** - Pas de latence réseau
- ✅ **PRIVÉ** - Les données ne quittent pas votre PC
- ✅ **HORS-LIGNE** - Fonctionne sans internet après le téléchargement

## 📥 INSTALLATION (5 MIN)

### 1. Télécharger Ollama

Aller sur: **https://ollama.ai** (ou https://ollama.com)

Télécharger pour votre OS:
- **Windows** → ollama-windows.exe
- **Mac** → ollama-mac.zip
- **Linux** → curl script

### 2. Installer et lancer

```bash
# Sur Windows:
# 1. Double-cliquer l'installateur
# 2. Ollama démarre automatiquement

# Vérifier que ça marche:
curl http://localhost:11434/api/tags
```

### 3. Télécharger un modèle

Choisir 1 modèle (3-5 GB chacun):

```bash
# Mistral (Recommandé - très bon rapport qualité/vitesse)
ollama pull mistral

# Ou Llama2 (Plus lent, meilleure qualité)
ollama pull llama2

# Ou Neural-Chat (Optimisé pour conversations)
ollama pull neural-chat

# Ou Orca-Mini (Petit, rapide)
ollama pull orca-mini
```

## ✅ VÉRIFIER QUE ÇA MARCHE

```bash
# Test simple
curl -X POST http://localhost:11434/api/generate -H "Content-Type: application/json" -d '{
  "model": "mistral",
  "prompt": "Bonjour, comment allez-vous?",
  "stream": false
}'

# Devrait répondre avec du texte généré
```

## 🔧 CONFIGURER L'APP

**Local (.env.local)** - Déjà configuré! ✅

```
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=mistral
```

**Vercel (optionnel)**

Si vous voulez utiliser Ollama en production sur Vercel:
```
OLLAMA_URL=https://your-ollama-server.com
OLLAMA_MODEL=mistral
```

(Vous devriez héberger Ollama sur votre serveur ou Docker)

## 🚀 DÉMARRER L'APP

```bash
# 1. S'assurer que Ollama tourne
ollama serve

# 2. Dans un autre terminal
cd convergence-saa-s-app
pnpm dev

# 3. Ouvrir http://localhost:3000
# 4. Tester "Generate Code"
```

## 📊 PERFORMANCE

| Modèle | Taille | Qualité | Vitesse | RAM |
|--------|--------|---------|---------|-----|
| mistral | 4.1 GB | Très bon | Rapide | 8 GB |
| llama2 | 3.8 GB | Excellent | Moyen | 12 GB |
| neural-chat | 4.1 GB | Bon | Rapide | 8 GB |
| orca-mini | 1.3 GB | Bon | Très rapide | 4 GB |

**Ma recommandation:** Commencer avec `mistral` (bon équilibre qualité/vitesse)

## 💾 ESPACE DISQUE

- Mistral: ~4 GB
- Llama2: ~4 GB
- Orca-mini: ~1.3 GB

**Total avec app:** ~5-6 GB

## ⚠️ ERREURS COURANTES

### "Connection refused on localhost:11434"
```
Solution: Ollama n'est pas lancé
→ Ouvrir terminal et taper: ollama serve
```

### "Model not found: mistral"
```
Solution: Le modèle n'est pas téléchargé
→ ollama pull mistral
→ Attendre le téléchargement (~5 min)
```

### "Response too slow" ou timeout
```
Solution: Votre PC est trop lent
→ Utiliser orca-mini (plus petit, plus rapide)
→ Ou utiliser Groq API (gratuit, cloud)
```

### "Out of memory"
```
Solution: Pas assez de RAM
→ Fermer autres apps
→ Ou utiliser Groq API gratuitement
```

## 🔄 CHANGER DE MODÈLE

```bash
# 1. Télécharger nouveau modèle
ollama pull llama2

# 2. Éditer .env.local
OLLAMA_MODEL=llama2

# 3. Redémarrer l'app
# pnpm dev
```

## 📚 MODÈLES DISPONIBLES

```bash
# Télécharger plusieurs modèles
ollama pull mistral
ollama pull llama2
ollama pull neural-chat
ollama pull orca-mini

# Voir les modèles téléchargés
ollama list

# Supprimer un modèle
ollama rm mistral
```

## 🌐 ALTERNATIVE: GROQ (Gratuit sur Cloud)

Si Ollama est trop lent ou que votre PC n'a pas assez de ressources:

```bash
# 1. Aller sur https://console.groq.com
# 2. Créer un compte
# 3. Créer une clé API
# 4. Utiliser groq-sdk (plus rapide que OpenAI!)

npm install groq-sdk
```

Puis changer le code pour utiliser Groq:

```typescript
import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

const message = await groq.messages.create({
  model: 'mixtral-8x7b-32768',
  messages: [{ role: 'user', content: prompt }],
})
```

**Groq:**
- ✅ Gratuit (limites gen/mois)
- ✅ Super rapide (cloud)
- ✅ Pas d'installation
- ❌ Nécessite internet

## 🎯 RECOMMANDATION FINALE

**Pour développement local:** Ollama + Mistral
**Pour production gratuit:** Groq API
**Pour vraiment pas cher:** OpenAI (plus flexible, mais paie $)

## 📞 SUPPORT

- **Ollama Docs:** https://github.com/ollama/ollama
- **Ollama Web UI:** https://github.com/open-webui/open-webui
- **Groq Docs:** https://console.groq.com/docs

---

**C'est bon! Ollama est 100% gratuit et fonctionne hors-ligne. À vous de jouer! 🚀**
