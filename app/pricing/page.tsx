"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"
import { PLANS } from "@/lib/stripe"
import Link from "next/link"

export const dynamic = 'force-dynamic'

const PRICING_PLANS = [
  {
    ...PLANS.FREE,
    highlighted: false,
    cta: "Commencer gratuitement",
  },
  {
    ...PLANS.STARTER,
    highlighted: true,
    cta: "Commencer maintenant",
  },
  {
    ...PLANS.PRO,
    highlighted: false,
    cta: "Commencer maintenant",
  },
  {
    ...PLANS.ENTERPRISE,
    highlighted: false,
    cta: "Contacter le support",
  },
]

export default function PricingPage() {
  const { data: session = null, status = 'unauthenticated' } = useSession() || {}
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handlePlanSelect = async (planId: string) => {
    if (!session) {
      router.push("/auth?callbackUrl=/pricing")
      return
    }

    setLoading(planId)
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId.toUpperCase() }),
      })

      const data = await response.json()

      if (data.success && planId === "free") {
        router.push("/dashboard")
      } else if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-black pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            Plans & Tarification
          </h1>
          <p className="text-xl text-white/60 mb-8">
            Choisissez le plan qui vous convient
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {PRICING_PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={`relative p-6 rounded-2xl border transition-all ${
                plan.highlighted
                  ? "border-white bg-white/10 scale-105"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-1 rounded-full text-xs font-bold text-white">
                  POPULAIRE
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-white mb-2">
                {plan.name}
              </h3>
              <p className="text-sm text-white/60 mb-6">{plan.description}</p>

              {/* Price */}
              <div className="mb-6">
                {plan.price !== null ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">
                      ${plan.price}
                    </span>
                    <span className="text-white/60">/mois</span>
                  </div>
                ) : (
                  <div className="text-2xl font-bold text-white">
                    Sur devis
                  </div>
                )}
              </div>

              {/* Credits */}
              {plan.credits && (
                <div className="mb-6 p-3 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-sm text-white/60">Générations/mois</p>
                  <p className="text-2xl font-bold text-white">{plan.credits}</p>
                </div>
              )}

              {/* CTA Button */}
              <Button
                onClick={() => handlePlanSelect(plan.id)}
                disabled={loading === plan.id}
                className={`w-full mb-6 transition-all ${
                  plan.highlighted
                    ? "bg-white text-black hover:bg-white/90"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                }`}
              >
                {loading === plan.id ? "Chargement..." : plan.cta}
              </Button>

              {/* Features */}
              <div className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white/80">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Questions fréquentes
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "Puis-je changer de plan ?",
                a: "Oui, vous pouvez changer de plan à tout moment. Les crédits non utilisés seront conservés.",
              },
              {
                q: "Comment fonctionnent les crédits ?",
                a: "Chaque génération coûte des crédits : 1 pour mobile, 2 pour fullstack. Les crédits se réinitialisent chaque mois.",
              },
              {
                q: "Que se passe-t-il à la fin du mois ?",
                a: "Votre abonnement se renouvelle automatiquement et vos crédits sont réinitialisés.",
              },
              {
                q: "Comment contacter le support ?",
                a: "Contactez-nous à support@convergence.ai pour toute question.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-4 bg-white/5 border border-white/10 rounded-lg"
              >
                <h4 className="text-white font-semibold mb-2">{item.q}</h4>
                <p className="text-white/60 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <Link href="/dashboard">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Retour au dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
