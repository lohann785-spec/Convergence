import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-10-28.acacia',
})

// Plan pricing configuration
export const PLANS = {
  FREE: {
    id: 'free',
    name: 'Free',
    description: 'Pour essayer',
    price: 0,
    credits: 5,
    features: [
      '5 générations par semaine',
      'ChatGPT, Claude, Gemini',
      'Export en TSX/TS',
    ],
  },
  STARTER: {
    id: 'starter',
    name: 'Starter',
    description: 'Pour les développeurs',
    price: 29,
    credits: 100,
    features: [
      '100 générations par mois',
      'Tous les modèles IA',
      'Support prioritaire',
      'Stockage illimité',
    ],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID,
  },
  PRO: {
    id: 'pro',
    name: 'Pro',
    description: 'Pour les équipes',
    price: 79,
    credits: 500,
    features: [
      '500 générations par mois',
      'Accès API',
      'Support 24/7',
      'Analytics avancées',
      'Webhooks personnalisés',
    ],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
  },
  ENTERPRISE: {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Solution sur mesure',
    price: null,
    credits: null,
    features: [
      'Générations illimitées',
      'Infrastructure dédiée',
      'Support blanc',
      'SLA garantis',
      'Formation incluse',
    ],
  },
}

export type Plan = keyof typeof PLANS
