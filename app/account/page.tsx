"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ParticleNetwork } from "@/components/particle-network"
import {
  ArrowLeft,
  User,
  CreditCard,
  Palette,
  Bell,
  Shield,
  Zap,
  Crown,
  Camera,
  Save,
  ChevronRight,
  Infinity,
  Globe,
  Search,
} from "lucide-react"
import { cn } from "@/lib/utils"

type Tab = "profile" | "subscription" | "appearance" | "language" | "notifications" | "security"

const planDetails: Record<string, {
  name: string
  credits: string
  period: string
  price: number
  color: string
}> = {
  free: { name: "Free", credits: "5.00", period: "semaine", price: 0, color: "bg-white/10" },
  starter: { name: "Starter", credits: "30.00", period: "semaine", price: 9, color: "bg-white/20" },
  pro: { name: "Pro", credits: "500.00", period: "mois", price: 29, color: "bg-white text-black" },
  business: { name: "Business", credits: "Illimités", period: "", price: 79, color: "bg-white text-black" },
}

const languages = [
  { code: "fr", label: "Francais", flag: "FR" },
  { code: "en", label: "English", flag: "GB" },
  { code: "es", label: "Espanol", flag: "ES" },
  { code: "de", label: "Deutsch", flag: "DE" },
  { code: "it", label: "Italiano", flag: "IT" },
  { code: "pt", label: "Portugues", flag: "PT" },
  { code: "pt-br", label: "Portugues (Brasil)", flag: "BR" },
  { code: "nl", label: "Nederlands", flag: "NL" },
  { code: "pl", label: "Polski", flag: "PL" },
  { code: "ru", label: "Russkiy", flag: "RU" },
  { code: "uk", label: "Ukrainska", flag: "UA" },
  { code: "tr", label: "Turkce", flag: "TR" },
  { code: "ar", label: "Al-Arabiyyah", flag: "SA" },
  { code: "zh", label: "Zhongwen (Jianti)", flag: "CN" },
  { code: "zh-tw", label: "Zhongwen (Fanti)", flag: "TW" },
  { code: "ja", label: "Nihongo", flag: "JP" },
  { code: "ko", label: "Hangugeo", flag: "KR" },
  { code: "hi", label: "Hindi", flag: "IN" },
  { code: "bn", label: "Bangla", flag: "BD" },
  { code: "th", label: "Phasa Thai", flag: "TH" },
  { code: "vi", label: "Tieng Viet", flag: "VN" },
  { code: "id", label: "Bahasa Indonesia", flag: "ID" },
  { code: "ms", label: "Bahasa Melayu", flag: "MY" },
  { code: "sv", label: "Svenska", flag: "SE" },
  { code: "no", label: "Norsk", flag: "NO" },
  { code: "da", label: "Dansk", flag: "DK" },
  { code: "fi", label: "Suomi", flag: "FI" },
  { code: "cs", label: "Cestina", flag: "CZ" },
  { code: "ro", label: "Romana", flag: "RO" },
  { code: "hu", label: "Magyar", flag: "HU" },
  { code: "el", label: "Ellinika", flag: "GR" },
  { code: "he", label: "Ivrit", flag: "IL" },
  { code: "sw", label: "Kiswahili", flag: "KE" },
  { code: "ca", label: "Catala", flag: "ES" },
  { code: "eu", label: "Euskara", flag: "ES" },
  { code: "gl", label: "Galego", flag: "ES" },
  { code: "hr", label: "Hrvatski", flag: "HR" },
  { code: "sk", label: "Slovencina", flag: "SK" },
  { code: "bg", label: "Bulgarski", flag: "BG" },
  { code: "sr", label: "Srpski", flag: "RS" },
  { code: "lt", label: "Lietuviu", flag: "LT" },
  { code: "lv", label: "Latviesu", flag: "LV" },
  { code: "et", label: "Eesti", flag: "EE" },
  { code: "fil", label: "Filipino", flag: "PH" },
  { code: "fa", label: "Farsi", flag: "IR" },
  { code: "ur", label: "Urdu", flag: "PK" },
  { code: "ta", label: "Tamil", flag: "IN" },
  { code: "te", label: "Telugu", flag: "IN" },
  { code: "ml", label: "Malayalam", flag: "IN" },
]

export default function AccountPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>("profile")
  const [currentPlan] = useState("pro")
  const [creditsUsed] = useState(127.35)
  const [creditsTotal] = useState(500.0)

  // Profile state
  const [displayName, setDisplayName] = useState("Alexandre Dupont")
  const [email] = useState("alexandre@convergence.dev")
  const [bio, setBio] = useState("Développeur full-stack passionné par l'IA.")
  const [avatarInitial] = useState("A")
  const [saved, setSaved] = useState(false)

  // Appearance state
  const [selectedTheme, setSelectedTheme] = useState("dark")
  const [accentColor, setAccentColor] = useState("white")
  const [fontSize, setFontSize] = useState("medium")
  const [codeFont, setCodeFont] = useState("mono")
  const [animatedBg, setAnimatedBg] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState("fr")
  const [languageSearch, setLanguageSearch] = useState("")

  // Notification state
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [creditAlerts, setCreditAlerts] = useState(true)
  const [weeklyReport, setWeeklyReport] = useState(false)
  const [newFeatures, setNewFeatures] = useState(true)

  const plan = planDetails[currentPlan]
  const creditPercent = (creditsUsed / creditsTotal) * 100

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "profile", label: "Profil", icon: User },
    { id: "subscription", label: "Abonnement", icon: CreditCard },
    { id: "appearance", label: "Apparence", icon: Palette },
    { id: "language", label: "Langue", icon: Globe },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Sécurité", icon: Shield },
  ]

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
            <span className="text-white/40">/</span>
            <span className="font-medium">Mon Compte</span>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex gap-8">
            {/* Sidebar Tabs */}
            <div className="w-56 flex-shrink-0">
              <div className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all",
                        activeTab === tab.id
                          ? "bg-white/10 text-white font-medium"
                          : "text-white/50 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Profil</h2>
                    <p className="text-white/50 text-sm">Personnalisez votre profil et vos informations.</p>
                  </div>

                  {/* Avatar */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center text-2xl font-bold border border-white/20">
                        {avatarInitial}
                      </div>
                      <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center hover:bg-white/90 transition-colors">
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <h3 className="font-semibold">{displayName}</h3>
                      <p className="text-sm text-white/50">{email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded-full font-medium",
                          plan.color
                        )}>
                          {plan.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70">Nom d&apos;affichage</label>
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70">Email</label>
                      <input
                        type="email"
                        value={email}
                        disabled
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/50 cursor-not-allowed"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70">Bio</label>
                      <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors resize-none"
                      />
                    </div>

                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-medium hover:bg-white/90 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      {saved ? "Sauvegardé !" : "Sauvegarder"}
                    </button>
                  </div>
                </div>
              )}

              {/* Subscription Tab */}
              {activeTab === "subscription" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Abonnement</h2>
                    <p className="text-white/50 text-sm">Gérez votre plan et suivez vos crédits.</p>
                  </div>

                  {/* Current Plan Card */}
                  <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center">
                          <Crown className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Plan {plan.name}</h3>
                          <p className="text-sm text-white/50">
                            {plan.price > 0 ? `${plan.price}\u20AC / mois` : "Gratuit"}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => router.push("/pricing")}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl text-sm hover:bg-white/20 transition-colors"
                      >
                        Changer de plan
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Credits Usage */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/60">
                          Crédits utilisés {plan.period === "mois" ? "ce mois" : "cette semaine"}
                        </span>
                        <span className="font-mono font-medium">
                          {currentPlan === "business" ? (
                            <span className="flex items-center gap-1">
                              <Infinity className="w-4 h-4" /> Illimités
                            </span>
                          ) : (
                            `${creditsUsed.toFixed(2)} / ${creditsTotal.toFixed(2)}`
                          )}
                        </span>
                      </div>
                      {currentPlan !== "business" && (
                        <>
                          <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                            <div
                              className={cn(
                                "h-full rounded-full transition-all duration-500",
                                creditPercent > 80 ? "bg-white/90" : "bg-white/60"
                              )}
                              style={{ width: `${Math.min(creditPercent, 100)}%` }}
                            />
                          </div>
                          <p className="text-xs text-white/40">
                            {(creditsTotal - creditsUsed).toFixed(2)} crédits restants - renouvellement {plan.period === "mois" ? "dans 18 jours" : "dans 4 jours"}
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Usage History */}
                  <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/10">
                    <h3 className="font-semibold mb-4">Historique récent</h3>
                    <div className="space-y-3">
                      {[
                        { action: "App e-commerce générée", credits: -4.75, time: "Il y a 2h" },
                        { action: "Modification écran login", credits: -0.35, time: "Il y a 5h" },
                        { action: "Dashboard analytics créé", credits: -3.20, time: "Hier" },
                        { action: "Correction de bugs", credits: -0.15, time: "Hier" },
                        { action: "Ajout d'authentification", credits: -1.80, time: "Il y a 2 jours" },
                      ].map((item) => (
                        <div key={`${item.action}-${item.time}`} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                          <div>
                            <span className="text-sm">{item.action}</span>
                            <span className="text-xs text-white/40 ml-3">{item.time}</span>
                          </div>
                          <span className="text-sm font-mono text-white/70">{item.credits.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Tab */}
              {activeTab === "appearance" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Apparence</h2>
                    <p className="text-white/50 text-sm">Personnalisez l&apos;interface de Convergence.</p>
                  </div>

                  {/* Theme */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-white/70">Thème</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: "dark", label: "Sombre", preview: "bg-black" },
                        { id: "midnight", label: "Minuit", preview: "bg-[#0a0a1a]" },
                        { id: "abyss", label: "Abyssal", preview: "bg-[#050510]" },
                      ].map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => setSelectedTheme(theme.id)}
                          className={cn(
                            "p-4 rounded-xl border transition-all",
                            selectedTheme === theme.id
                              ? "border-white/40 bg-white/10"
                              : "border-white/10 hover:border-white/20"
                          )}
                        >
                          <div className={cn("w-full h-16 rounded-lg mb-3 border border-white/10", theme.preview)}>
                            <div className="p-2 space-y-1">
                              <div className="h-1.5 bg-white/30 rounded w-3/4" />
                              <div className="h-1 bg-white/15 rounded w-1/2" />
                            </div>
                          </div>
                          <span className="text-sm">{theme.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Accent Color */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-white/70">Couleur d&apos;accent</label>
                    <div className="flex gap-3">
                      {[
                        { id: "white", color: "bg-white" },
                        { id: "gray", color: "bg-gray-400" },
                        { id: "silver", color: "bg-gray-300" },
                        { id: "slate", color: "bg-slate-400" },
                        { id: "zinc", color: "bg-zinc-400" },
                      ].map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setAccentColor(c.id)}
                          className={cn(
                            "w-10 h-10 rounded-full transition-all",
                            c.color,
                            accentColor === c.id && "ring-2 ring-offset-2 ring-offset-black ring-white/50"
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Font Size */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-white/70">Taille de police</label>
                    <div className="flex gap-3">
                      {[
                        { id: "small", label: "Petit" },
                        { id: "medium", label: "Moyen" },
                        { id: "large", label: "Grand" },
                      ].map((size) => (
                        <button
                          key={size.id}
                          onClick={() => setFontSize(size.id)}
                          className={cn(
                            "px-4 py-2 rounded-lg text-sm transition-all border",
                            fontSize === size.id
                              ? "bg-white text-black border-white"
                              : "bg-white/5 border-white/10 hover:bg-white/10"
                          )}
                        >
                          {size.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Code Font */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-white/70">Police de code</label>
                    <div className="flex gap-3">
                      {[
                        { id: "mono", label: "Mono", family: "font-mono" },
                        { id: "fira", label: "Fira Code", family: "font-mono" },
                        { id: "jetbrains", label: "JetBrains", family: "font-mono" },
                      ].map((font) => (
                        <button
                          key={font.id}
                          onClick={() => setCodeFont(font.id)}
                          className={cn(
                            "px-4 py-2 rounded-lg text-sm transition-all border",
                            font.family,
                            codeFont === font.id
                              ? "bg-white text-black border-white"
                              : "bg-white/5 border-white/10 hover:bg-white/10"
                          )}
                        >
                          {font.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Animated Background */}
                  <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl border border-white/10">
                    <div>
                      <div className="font-medium text-sm">Fond animé (particules)</div>
                      <div className="text-xs text-white/40 mt-0.5">Afficher les particules de connexion en arrière-plan</div>
                    </div>
                    <button
                      onClick={() => setAnimatedBg(!animatedBg)}
                      className={cn(
                        "relative w-12 h-6 rounded-full transition-colors",
                        animatedBg ? "bg-white" : "bg-white/20"
                      )}
                    >
                      <div className={cn(
                        "absolute top-0.5 w-5 h-5 rounded-full transition-all",
                        animatedBg ? "translate-x-6 bg-black" : "translate-x-0.5 bg-white/50"
                      )} />
                    </button>
                  </div>

                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-medium hover:bg-white/90 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    {saved ? "Sauvegardé !" : "Sauvegarder"}
                  </button>
                </div>
              )}

              {/* Language Tab */}
              {activeTab === "language" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Langue</h2>
                    <p className="text-white/50 text-sm">
                      Choisissez la langue de l&apos;interface de Convergence.
                    </p>
                  </div>

                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      value={languageSearch}
                      onChange={(e) => setLanguageSearch(e.target.value)}
                      placeholder="Rechercher une langue..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>

                  {/* Current Language */}
                  <div className="p-4 bg-white/[0.06] rounded-xl border border-white/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-sm font-bold">
                          {languages.find(l => l.code === selectedLanguage)?.flag}
                        </div>
                        <div>
                          <div className="font-medium text-sm">
                            {languages.find(l => l.code === selectedLanguage)?.label}
                          </div>
                          <div className="text-xs text-white/40">Langue actuelle</div>
                        </div>
                      </div>
                      <div className="w-3 h-3 rounded-full bg-white" />
                    </div>
                  </div>

                  {/* Language Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[420px] overflow-y-auto pr-1 custom-scrollbar">
                    {languages
                      .filter(l =>
                        l.label.toLowerCase().includes(languageSearch.toLowerCase()) ||
                        l.code.toLowerCase().includes(languageSearch.toLowerCase())
                      )
                      .map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => setSelectedLanguage(lang.code)}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-xl border transition-all text-left",
                            selectedLanguage === lang.code
                              ? "bg-white/10 border-white/30"
                              : "bg-white/[0.02] border-white/5 hover:bg-white/5 hover:border-white/15"
                          )}
                        >
                          <div className={cn(
                            "w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0",
                            selectedLanguage === lang.code ? "bg-white text-black" : "bg-white/10 text-white/70"
                          )}>
                            {lang.flag}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">{lang.label}</div>
                            <div className="text-[11px] text-white/30 uppercase">{lang.code}</div>
                          </div>
                          {selectedLanguage === lang.code && (
                            <div className="w-2 h-2 rounded-full bg-white flex-shrink-0" />
                          )}
                        </button>
                      ))}
                  </div>

                  {languages.filter(l =>
                    l.label.toLowerCase().includes(languageSearch.toLowerCase()) ||
                    l.code.toLowerCase().includes(languageSearch.toLowerCase())
                  ).length === 0 && (
                    <div className="text-center py-8 text-white/30 text-sm">
                      Aucune langue ne correspond a votre recherche
                    </div>
                  )}

                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-medium hover:bg-white/90 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    {saved ? "Sauvegarde !" : "Sauvegarder"}
                  </button>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Notifications</h2>
                    <p className="text-white/50 text-sm">Configurez vos préférences de notification.</p>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        label: "Notifications par email",
                        desc: "Recevoir des mises à jour par email",
                        value: emailNotifs,
                        setter: setEmailNotifs,
                      },
                      {
                        label: "Alertes de crédits",
                        desc: "Notification quand vos crédits sont faibles (< 20%)",
                        value: creditAlerts,
                        setter: setCreditAlerts,
                      },
                      {
                        label: "Rapport hebdomadaire",
                        desc: "Résumé de votre utilisation chaque semaine",
                        value: weeklyReport,
                        setter: setWeeklyReport,
                      },
                      {
                        label: "Nouvelles fonctionnalités",
                        desc: "Être informé des nouveautés de Convergence",
                        value: newFeatures,
                        setter: setNewFeatures,
                      },
                    ].map((notif) => (
                      <div
                        key={notif.label}
                        className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl border border-white/10"
                      >
                        <div>
                          <div className="font-medium text-sm">{notif.label}</div>
                          <div className="text-xs text-white/40 mt-0.5">{notif.desc}</div>
                        </div>
                        <button
                          onClick={() => notif.setter(!notif.value)}
                          className={cn(
                            "relative w-12 h-6 rounded-full transition-colors",
                            notif.value ? "bg-white" : "bg-white/20"
                          )}
                        >
                          <div className={cn(
                            "absolute top-0.5 w-5 h-5 rounded-full transition-all",
                            notif.value ? "translate-x-6 bg-black" : "translate-x-0.5 bg-white/50"
                          )} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Sécurité</h2>
                    <p className="text-white/50 text-sm">Protégez votre compte Convergence.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/10">
                      <h3 className="font-semibold mb-4">Changer le mot de passe</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm text-white/70">Mot de passe actuel</label>
                          <input
                            type="password"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-white/70">Nouveau mot de passe</label>
                          <input
                            type="password"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-white/70">Confirmer</label>
                          <input
                            type="password"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                          />
                        </div>
                        <button className="px-6 py-3 bg-white text-black rounded-xl font-medium hover:bg-white/90 transition-colors">
                          Mettre à jour
                        </button>
                      </div>
                    </div>

                    <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">Authentification à deux facteurs</h3>
                          <p className="text-sm text-white/50 mt-1">Ajoutez une couche de sécurité supplémentaire</p>
                        </div>
                        <button className="px-4 py-2 bg-white/10 rounded-xl text-sm hover:bg-white/20 transition-colors">
                          Activer
                        </button>
                      </div>
                    </div>

                    <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/10">
                      <h3 className="font-semibold mb-4">Sessions actives</h3>
                      <div className="space-y-3">
                        {[
                          { device: "Chrome - MacOS", location: "Paris, France", current: true },
                          { device: "Safari - iPhone", location: "Paris, France", current: false },
                        ].map((session) => (
                          <div key={session.device} className="flex items-center justify-between py-2">
                            <div>
                              <span className="text-sm">{session.device}</span>
                              <span className="text-xs text-white/40 ml-2">{session.location}</span>
                            </div>
                            {session.current ? (
                              <span className="text-xs px-2 py-1 bg-white/10 rounded-full">Session actuelle</span>
                            ) : (
                              <button className="text-xs text-white/50 hover:text-white transition-colors">
                                Révoquer
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 bg-white/[0.03] rounded-2xl border border-destructive/30">
                      <h3 className="font-semibold text-destructive">Zone dangereuse</h3>
                      <p className="text-sm text-white/50 mt-1 mb-4">Actions irréversibles sur votre compte</p>
                      <button className="px-4 py-2 bg-destructive/10 text-destructive border border-destructive/30 rounded-xl text-sm hover:bg-destructive/20 transition-colors">
                        Supprimer mon compte
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
