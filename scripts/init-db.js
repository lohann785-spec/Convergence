#!/usr/bin/env node

/**
 * Script d'initialisation de la base de données
 * Exécutez: node scripts/init-db.js
 */

const fs = require('fs')
const path = require('path')

console.log('🚀 Initialisation de la base de données Convergence...\n')

// Vérifier que .env.local existe
const envFile = path.join(__dirname, '../.env.local')
if (!fs.existsSync(envFile)) {
  console.error('❌ Erreur: .env.local n\'existe pas')
  console.log('📝 Créez .env.local avec :')
  console.log('DATABASE_URL="file:./prisma/dev.db"')
  process.exit(1)
}

console.log('✅ .env.local trouvé')

// Les commandes à exécuter
const commands = [
  {
    cmd: 'pnpm prisma generate',
    desc: 'Génération du client Prisma',
  },
  {
    cmd: 'pnpm prisma migrate deploy',
    desc: 'Déploiement des migrations',
  },
]

console.log('\n📋 Étapes à suivre:\n')
commands.forEach((item, i) => {
  console.log(`${i + 1}. ${item.desc}`)
  console.log(`   ${item.cmd}\n`)
})

console.log('💡 Ou exécutez directement:')
console.log('pnpm prisma migrate dev --name init\n')

console.log('✨ Après l\'initialisation:')
console.log('- Vérifiez la DB: pnpm prisma studio')
console.log('- Démarrez le dev: pnpm dev')
