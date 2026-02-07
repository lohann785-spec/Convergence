"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ParticleNetwork } from "@/components/particle-network"
import { 
  Check, 
  ArrowLeft, 
  Zap, 
  Sparkles, 
  Crown, 
  Building2,
  Infinity
} from "lucide-react"
import { cn } from "@/lib/utils"

const plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    credits: "5.00",
    creditsLabel: "crédits / semaine",
    icon: Zap,
    description: "Pour découvrir Convergence et créer vos premiers prototypes.",
    popular: false,
    features: [
      "5.00 crédits / semaine",
      "Applications mobile & web",
      "Prévisualisation en temps réel",
      "Export du code source",
      "1 projet sauvegardé",
      "Modèle IA standard",
    ],
    limitations: [
      "Pas d'accès aux modèles avancés",
      "Pas de support prioritaire",
      "Pas de déploiement intégré",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    price: 9,
    credits: "30.00",
    creditsLabel: "crédits / semaine",
    icon: Sparkles,
    description: "Pour les développeurs individuels qui veulent aller plus loin.",
    popular: false,
    features: [
      "30.00 crédits / semaine",
      "Tout du plan Free",
      "5 projets sauvegardés",
      "Modèles IA intermédiaires",
      "Historique des conversations",
      "Thèmes personnalisables",
      "Export multi-format",
      "Support par email",
    ],
    limitations: [
      "Pas de déploiement intégré",
      "Pas de collaboration",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 29,
    credits: "500.00",
    creditsLabel: "crédits / mois",
    icon: Crown,
    description: "Pour les professionnels et les équipes ambitieuses.",
    popular: true,
    features: [
      "500.00 crédits / mois",
      "Tout du plan Starter",
      "Projets illimités",
      "Tous les modèles IA (GPT-4, Claude, Gemini)",
      "Déploiement intégré (Vercel, Netlify)",
      "Domaine personnalisé",
      "Collaboration d'équipe (3 membres)",
      "Support prioritaire",
      "API access",
      "Personnalisation avancée du profil",
      "Statistiques d'utilisation",
    ],
    limitations: [],
  },
  {
    id: "business",
    name: "Business",
    price: 79,
    credits: "Illimités",
    creditsLabel: "",
    icon: Building2,
    description: "Pour les entreprises avec des besoins à grande échelle.",
    popular: false,
    features: [
      "Crédits illimités",
      "Tout du plan Pro",
      "Membres d'équipe illimités",
      "Modèles IA exclusifs fine-tunés",
      "SLA garanti 99.9%",
      "Déploiement on-premise disponible",
      "Single Sign-On (SSO)",
      "Audit logs",
      "Manager de compte dédié",
      "Formation personnalisée",
      "Personnalisation complète (branding, thème)",
      "API illimitée avec rate limits élevés",
      "Webhooks & intégrations avancées",
    ],
    limitations: [],
  },
]

export default function PricingPage() {
  const router = useRouter()
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const getPrice = (price: number) => {
    if (price === 0) return 0
    return billingCycle === "yearly" ? Math.round(price * 0.8) : price
  }

  return (
    <div className="relative min-h-screen bg-black text-white">
      <ParticleNetwork />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 p-6 border-b border-white/10">
          <button
            onClick={() => router.push("/")}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <img
              src="/images/actual-design2-this-is-what-we-publish-removebg-preview.png"
              alt="Convergence"
              className="h-8 w-auto"
            />
          </div>
        </div>

        {/* Hero */}
        <div className="text-center py-16 px-6">
          <h1 className="text-4xl font-bold mb-4 text-balance">
            Choisissez votre plan
          </h1>
          <p className="text-white/60 max-w-xl mx-auto mb-8 leading-relaxed">
            Des crédits flexibles qui s&apos;adaptent à votre usage. Plus votre requête est complexe, plus elle consomme de crédits - un système intelligent qui optimise vos ressources.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={cn(
              "text-sm transition-colors",
              billingCycle === "monthly" ? "text-white" : "text-white/40"
            )}>Mensuel</span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              className="relative w-14 h-7 bg-white/10 rounded-full border border-white/20 transition-colors"
            >
              <div className={cn(
                "absolute top-0.5 w-6 h-6 bg-white rounded-full transition-transform",
                billingCycle === "yearly" ? "translate-x-7" : "translate-x-0.5"
              )} />
            </button>
            <span className={cn(
              "text-sm transition-colors",
              billingCycle === "yearly" ? "text-white" : "text-white/40"
            )}>
              Annuel
              <span className="ml-2 text-xs px-2 py-0.5 bg-white/10 rounded-full">
                -20%
              </span>
            </span>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => {
              const Icon = plan.icon
              const price = getPrice(plan.price)

              return (
                <div
                  key={plan.id}
                  className={cn(
                    "relative flex flex-col rounded-2xl border backdrop-blur-sm transition-all duration-300",
                    plan.popular 
                      ? "bg-white/[0.08] border-white/30 scale-[1.02]" 
                      : "bg-white/[0.03] border-white/10 hover:border-white/20",
                    selectedPlan === plan.id && "border-white ring-1 ring-white/30"
                  )}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 bg-white text-black text-xs font-semibold rounded-full">
                        Le plus populaire
                      </span>
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-1">
                    {/* Plan Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center",
                        plan.popular ? "bg-white text-black" : "bg-white/10"
                      )}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-semibold">{plan.name}</h3>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold">
                          {price === 0 ? "Gratuit" : `${price}\u20AC`}
                        </span>
                        {price > 0 && (
                          <span className="text-white/40 text-sm">/mois</span>
                        )}
                      </div>
                      {billingCycle === "yearly" && plan.price > 0 && (
                        <div className="text-xs text-white/40 mt-1">
                          <span className="line-through">{plan.price}\u20AC</span>
                          <span className="ml-2">facturé annuellement</span>
                        </div>
                      )}
                    </div>

                    {/* Credits Badge */}
                    <div className="flex items-center gap-2 mb-4 p-3 bg-white/5 rounded-xl border border-white/10">
                      {plan.id === "business" ? (
                        <Infinity className="w-5 h-5 text-white/80" />
                      ) : (
                        <Zap className="w-5 h-5 text-white/80" />
                      )}
                      <div>
                        <span className="font-semibold text-sm">{plan.credits}</span>
                        {plan.creditsLabel && (
                          <span className="text-white/50 text-xs ml-1">{plan.creditsLabel}</span>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-white/50 mb-6 leading-relaxed">{plan.description}</p>

                    {/* Features */}
                    <div className="flex-1 space-y-3 mb-6">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-white/70 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-white/80">{feature}</span>
                        </div>
                      ))}
                      {plan.limitations.map((limitation) => (
                        <div key={limitation} className="flex items-start gap-2 opacity-40">
                          <span className="w-4 h-4 flex items-center justify-center text-xs mt-0.5 flex-shrink-0">x</span>
                          <span className="text-sm line-through">{limitation}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => setSelectedPlan(plan.id)}
                      className={cn(
                        "w-full py-3 rounded-xl font-medium text-sm transition-all",
                        plan.popular
                          ? "bg-white text-black hover:bg-white/90"
                          : plan.id === "business"
                            ? "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                            : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                      )}
                    >
                      {plan.price === 0 ? "Commencer gratuitement" : plan.id === "business" ? "Contacter les ventes" : "S'abonner"}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Credit Explanation */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Comment fonctionnent les crédits ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-semibold mb-2">Consommation intelligente</h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  Chaque requête consomme des crédits proportionnellement à sa complexité. Une modification simple : ~0.25 crédits. Une app complète : ~3.50 crédits.
                </p>
              </div>
              <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-semibold mb-2">IA de modération</h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  Notre IA évalue la complexité de chaque demande en temps réel pour calculer le coût exact en crédits, avec des valeurs décimales précises.
                </p>
              </div>
              <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                  <Crown className="w-5 h-5" />
                </div>
                <h3 className="font-semibold mb-2">Renouvellement automatique</h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  Vos crédits se réinitialisent selon votre plan : chaque semaine (Free & Starter) ou chaque mois (Pro). Pas de report.
                </p>
              </div>
            </div>

            {/* Credit Examples Table */}
            <div className="mt-12 p-6 bg-white/[0.03] rounded-2xl border border-white/10">
              <h3 className="font-semibold mb-4">Exemples de consommation</h3>
              <div className="space-y-3">
                {[
                  { action: "Correction de bug / petite modification", credits: "0.15 - 0.75" },
                  { action: "Ajout d'une fonctionnalité simple", credits: "0.75 - 2.00" },
                  { action: "Création d'un écran / page complète", credits: "2.00 - 4.00" },
                  { action: "Génération d'une application complète", credits: "4.00 - 7.00" },
                  { action: "Application complexe multi-écrans", credits: "7.00 - 12.00" },
                  { action: "Refonte complète d'architecture", credits: "10.00 - 15.00" },
                ].map((item) => (
                  <div key={item.action} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <span className="text-sm text-white/70">{item.action}</span>
                    <span className="text-sm font-mono text-white/90">{item.credits} crédits</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
