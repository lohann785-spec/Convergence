"use client"

import React from "react"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ParticleNetwork } from "@/components/particle-network"
import {
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"

type AuthMode = "login" | "signup"

interface PasswordStrength {
  score: number
  label: string
  color: string
}

function getPasswordStrength(password: string): PasswordStrength {
  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 1) return { score, label: "Faible", color: "bg-red-500" }
  if (score <= 2) return { score, label: "Moyen", color: "bg-orange-500" }
  if (score <= 3) return { score, label: "Bon", color: "bg-yellow-500" }
  if (score <= 4) return { score, label: "Fort", color: "bg-green-400" }
  return { score, label: "Excellent", color: "bg-green-300" }
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  )
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
    </svg>
  )
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
    </svg>
  )
}

export default function AuthPage() {
  const router = useRouter()
  const [mode, setMode] = useState<AuthMode>("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState<string | null>(null)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [rememberMe, setRememberMe] = useState(false)

  const passwordStrength = getPasswordStrength(password)

  const validate = useCallback((): boolean => {
    const newErrors: Record<string, string> = {}

    if (!email.trim()) {
      newErrors.email = "L'email est requis"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Format d'email invalide"
    }

    if (!password) {
      newErrors.password = "Le mot de passe est requis"
    } else if (mode === "signup" && password.length < 8) {
      newErrors.password = "8 caracteres minimum"
    }

    if (mode === "signup") {
      if (!name.trim()) {
        newErrors.name = "Le nom est requis"
      }
      if (password !== confirmPassword) {
        newErrors.confirmPassword = "Les mots de passe ne correspondent pas"
      }
      if (!acceptTerms) {
        newErrors.terms = "Vous devez accepter les conditions"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [email, password, confirmPassword, name, acceptTerms, mode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1800))
    setIsLoading(false)
    router.push("/")
  }

  const handleOAuth = async (provider: string) => {
    setOauthLoading(provider)
    // Simulate OAuth redirect
    await new Promise(resolve => setTimeout(resolve, 1500))
    setOauthLoading(null)
    router.push("/")
  }

  const switchMode = () => {
    setMode(mode === "login" ? "signup" : "login")
    setErrors({})
    setPassword("")
    setConfirmPassword("")
  }

  return (
    <div className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      <ParticleNetwork />

      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="/images/actual-design2-this-is-what-we-publish-removebg-preview.png"
            alt="Convergence"
            className="h-12 w-auto mb-4"
          />
          <h1 className="text-2xl font-bold tracking-tight text-balance text-center">
            {mode === "login" ? "Content de vous revoir" : "Rejoignez Convergence"}
          </h1>
          <p className="text-white/40 text-sm mt-2 text-center text-pretty">
            {mode === "login"
              ? "Connectez-vous pour continuer a creer vos applications."
              : "Creez un compte et commencez a generer vos apps avec l'IA."}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-2xl p-6">
          {/* OAuth Buttons */}
          <div className="space-y-2.5 mb-6">
            <button
              onClick={() => handleOAuth("google")}
              disabled={!!oauthLoading}
              className={cn(
                "w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border transition-all font-medium text-sm",
                oauthLoading === "google"
                  ? "bg-white/10 border-white/20 cursor-wait"
                  : "bg-white text-black border-white/20 hover:bg-white/90"
              )}
            >
              {oauthLoading === "google" ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <GoogleIcon className="w-5 h-5" />
                  Continuer avec Google
                </>
              )}
            </button>

            <div className="grid grid-cols-3 gap-2.5">
              <button
                onClick={() => handleOAuth("github")}
                disabled={!!oauthLoading}
                className={cn(
                  "flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/10 transition-all text-sm",
                  oauthLoading === "github"
                    ? "bg-white/10 cursor-wait"
                    : "bg-white/[0.04] hover:bg-white/10"
                )}
              >
                {oauthLoading === "github" ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <GithubIcon className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={() => handleOAuth("apple")}
                disabled={!!oauthLoading}
                className={cn(
                  "flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/10 transition-all text-sm",
                  oauthLoading === "apple"
                    ? "bg-white/10 cursor-wait"
                    : "bg-white/[0.04] hover:bg-white/10"
                )}
              >
                {oauthLoading === "apple" ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <AppleIcon className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={() => handleOAuth("discord")}
                disabled={!!oauthLoading}
                className={cn(
                  "flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/10 transition-all text-sm",
                  oauthLoading === "discord"
                    ? "bg-white/10 cursor-wait"
                    : "bg-white/[0.04] hover:bg-white/10"
                )}
              >
                {oauthLoading === "discord" ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <DiscordIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-black/80 px-4 text-xs text-white/30 uppercase tracking-wider">
                ou par email
              </span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name (signup only) */}
            {mode === "signup" && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-1.5">
                  Nom complet
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setErrors(prev => ({ ...prev, name: "" })) }}
                  placeholder="John Doe"
                  className={cn(
                    "w-full bg-white/[0.04] border rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none transition-colors",
                    errors.name ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-white/30"
                  )}
                />
                {errors.name && (
                  <p className="flex items-center gap-1.5 mt-1.5 text-xs text-red-400">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </p>
                )}
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-1.5">
                Adresse email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: "" })) }}
                placeholder="vous@exemple.com"
                className={cn(
                  "w-full bg-white/[0.04] border rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none transition-colors",
                  errors.email ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-white/30"
                )}
              />
              {errors.email && (
                <p className="flex items-center gap-1.5 mt-1.5 text-xs text-red-400">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-white/70">
                  Mot de passe
                </label>
                {mode === "login" && (
                  <button type="button" className="text-xs text-white/40 hover:text-white/70 transition-colors">
                    Mot de passe oublie ?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: "" })) }}
                  placeholder="Entrez votre mot de passe"
                  className={cn(
                    "w-full bg-white/[0.04] border rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder:text-white/20 focus:outline-none transition-colors",
                    errors.password ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-white/30"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="flex items-center gap-1.5 mt-1.5 text-xs text-red-400">
                  <AlertCircle className="w-3 h-3" />
                  {errors.password}
                </p>
              )}
              {/* Password strength */}
              {mode === "signup" && password.length > 0 && (
                <div className="mt-2.5">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={cn(
                          "h-1 flex-1 rounded-full transition-all",
                          level <= passwordStrength.score ? passwordStrength.color : "bg-white/10"
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-[11px] text-white/40">
                    Securite : <span className="text-white/60">{passwordStrength.label}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password (signup only) */}
            {mode === "signup" && (
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-white/70 mb-1.5">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); setErrors(prev => ({ ...prev, confirmPassword: "" })) }}
                    placeholder="Confirmez votre mot de passe"
                    className={cn(
                      "w-full bg-white/[0.04] border rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder:text-white/20 focus:outline-none transition-colors",
                      errors.confirmPassword ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-white/30"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="flex items-center gap-1.5 mt-1.5 text-xs text-red-400">
                    <AlertCircle className="w-3 h-3" />
                    {errors.confirmPassword}
                  </p>
                )}
                {confirmPassword && password === confirmPassword && !errors.confirmPassword && (
                  <p className="flex items-center gap-1.5 mt-1.5 text-xs text-green-400">
                    <Check className="w-3 h-3" />
                    Les mots de passe correspondent
                  </p>
                )}
              </div>
            )}

            {/* Remember / Terms */}
            {mode === "login" ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setRememberMe(!rememberMe)}
                  className={cn(
                    "w-4 h-4 rounded border flex items-center justify-center transition-all flex-shrink-0",
                    rememberMe ? "bg-white border-white" : "border-white/20 bg-transparent hover:border-white/40"
                  )}
                >
                  {rememberMe && <Check className="w-3 h-3 text-black" />}
                </button>
                <span className="text-xs text-white/50">Se souvenir de moi</span>
              </div>
            ) : (
              <div>
                <div className="flex items-start gap-2">
                  <button
                    type="button"
                    onClick={() => { setAcceptTerms(!acceptTerms); setErrors(prev => ({ ...prev, terms: "" })) }}
                    className={cn(
                      "w-4 h-4 rounded border flex items-center justify-center transition-all flex-shrink-0 mt-0.5",
                      acceptTerms ? "bg-white border-white" : errors.terms ? "border-red-500/50" : "border-white/20 bg-transparent hover:border-white/40"
                    )}
                  >
                    {acceptTerms && <Check className="w-3 h-3 text-black" />}
                  </button>
                  <span className="text-xs text-white/50 leading-relaxed">
                    {"J'accepte les "}
                    <button type="button" className="text-white/80 hover:text-white underline underline-offset-2 transition-colors">
                      conditions d&apos;utilisation
                    </button>
                    {" et la "}
                    <button type="button" className="text-white/80 hover:text-white underline underline-offset-2 transition-colors">
                      politique de confidentialite
                    </button>
                  </span>
                </div>
                {errors.terms && (
                  <p className="flex items-center gap-1.5 mt-1.5 text-xs text-red-400 ml-6">
                    <AlertCircle className="w-3 h-3" />
                    {errors.terms}
                  </p>
                )}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-sm transition-all",
                isLoading
                  ? "bg-white/80 text-black cursor-wait"
                  : "bg-white text-black hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              )}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {mode === "login" ? "Se connecter" : "Creer mon compte"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Switch mode */}
        <div className="text-center mt-6">
          <p className="text-sm text-white/40">
            {mode === "login" ? "Pas encore de compte ?" : "Vous avez deja un compte ?"}
            <button
              onClick={switchMode}
              className="ml-2 text-white font-medium hover:underline underline-offset-4 transition-colors"
            >
              {mode === "login" ? "S'inscrire" : "Se connecter"}
            </button>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-[11px] text-white/20">
            En continuant, vous acceptez nos conditions d&apos;utilisation.
          </p>
          <div className="flex items-center justify-center gap-4 mt-3">
            <button className="text-[11px] text-white/20 hover:text-white/50 transition-colors">
              Aide
            </button>
            <span className="text-white/10">|</span>
            <button className="text-[11px] text-white/20 hover:text-white/50 transition-colors">
              Confidentialite
            </button>
            <span className="text-white/10">|</span>
            <button className="text-[11px] text-white/20 hover:text-white/50 transition-colors">
              Conditions
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
