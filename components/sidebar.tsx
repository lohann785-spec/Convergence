"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  MessageSquare, 
  FolderOpen, 
  Settings, 
  Plus, 
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Globe,
  Clock,
  Trash2,
  Zap,
  Crown,
  ChevronUp,
  CreditCard,
  User,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Project {
  id: string
  name: string
  type: "mobile" | "fullstack"
  createdAt: Date
}

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"chats" | "projects" | "settings">("chats")
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [projects] = useState<Project[]>([
    { id: "1", name: "E-commerce App", type: "mobile", createdAt: new Date() },
    { id: "2", name: "Dashboard SaaS", type: "fullstack", createdAt: new Date() },
    { id: "3", name: "Social Media App", type: "mobile", createdAt: new Date() },
  ])

  // Simulated user data
  const currentPlan = "pro"
  const creditsUsed = 127.35
  const creditsTotal = 500.00
  const creditsPeriod = "mois"
  const creditsPercent = (creditsUsed / creditsTotal) * 100

  return (
    <div className={cn(
      "relative flex flex-col bg-black/50 backdrop-blur-xl border-r border-white/10 transition-all duration-300",
      isOpen ? "w-72" : "w-16"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        {isOpen && (
          <div className="flex items-center gap-3">
            <img 
              src="/images/actual-design2-this-is-what-we-publish-removebg-preview.png"
              alt="Convergence"
              className="h-8 w-auto"
            />
          </div>
        )}
        <button 
          onClick={onToggle}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
      </div>

      {/* Credits Bar (compact, always visible when open) */}
      {isOpen && (
        <div className="px-4 pt-4 pb-2">
          <div className="p-3 bg-white/[0.03] rounded-xl border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-white/60" />
                <span className="text-xs font-medium text-white/70">Crédits</span>
              </div>
              <span className="text-xs font-mono text-white/90">
                {creditsUsed.toFixed(2)} / {creditsTotal.toFixed(2)}
              </span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  creditsPercent > 80 ? "bg-white/90" : "bg-white/50"
                )}
                style={{ width: `${Math.min(creditsPercent, 100)}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-[10px] text-white/30">
                {(creditsTotal - creditsUsed).toFixed(2)} restants
              </span>
              <span className="text-[10px] text-white/30">
                Renouvellement {creditsPeriod === "mois" ? "dans 18j" : "dans 4j"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* New Project Button */}
      <div className="px-4 pb-2 pt-1">
        <button className={cn(
          "w-full flex items-center gap-3 px-4 py-3 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-colors",
          !isOpen && "justify-center px-0"
        )}>
          <Plus className="w-5 h-5" />
          {isOpen && <span>Nouveau Projet</span>}
        </button>
      </div>

      {/* Tabs */}
      {isOpen && (
        <div className="flex border-b border-white/10">
          <button 
            onClick={() => setActiveTab("chats")}
            className={cn(
              "flex-1 py-3 text-sm font-medium transition-colors",
              activeTab === "chats" ? "text-white border-b-2 border-white" : "text-white/50 hover:text-white"
            )}
          >
            Chats
          </button>
          <button 
            onClick={() => setActiveTab("projects")}
            className={cn(
              "flex-1 py-3 text-sm font-medium transition-colors",
              activeTab === "projects" ? "text-white border-b-2 border-white" : "text-white/50 hover:text-white"
            )}
          >
            Projets
          </button>
          <button 
            onClick={() => setActiveTab("settings")}
            className={cn(
              "flex-1 py-3 text-sm font-medium transition-colors",
              activeTab === "settings" ? "text-white border-b-2 border-white" : "text-white/50 hover:text-white"
            )}
          >
            Config
          </button>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {!isOpen ? (
          <div className="flex flex-col gap-4">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Crédits">
              <Zap className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Chats">
              <MessageSquare className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Projets">
              <FolderOpen className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Config">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        ) : activeTab === "chats" ? (
          <div className="space-y-2">
            <div className="text-xs text-white/40 uppercase tracking-wider mb-3">Conversations récentes</div>
            {["App de fitness", "Dashboard analytics", "Clone Twitter"].map((chat, i) => (
              <button 
                key={i}
                className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg transition-colors text-left group"
              >
                <MessageSquare className="w-4 h-4 text-white/50" />
                <span className="flex-1 truncate text-sm">{chat}</span>
                <Trash2 className="w-4 h-4 text-white/30 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-400" />
              </button>
            ))}
          </div>
        ) : activeTab === "projects" ? (
          <div className="space-y-2">
            <div className="text-xs text-white/40 uppercase tracking-wider mb-3">Mes Projets</div>
            {projects.map((project) => (
              <button 
                key={project.id}
                className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg transition-colors text-left"
              >
                {project.type === "mobile" ? (
                  <Smartphone className="w-4 h-4 text-white/50" />
                ) : (
                  <Globe className="w-4 h-4 text-white/50" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="truncate text-sm">{project.name}</div>
                  <div className="flex items-center gap-1 text-xs text-white/40">
                    <Clock className="w-3 h-3" />
                    <span>Aujourd&apos;hui</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-xs text-white/40 uppercase tracking-wider mb-3">Paramètres</div>
            <div className="space-y-3">
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="text-sm font-medium mb-1">Modèle IA</div>
                <select className="w-full bg-black/50 border border-white/20 rounded px-3 py-2 text-sm">
                  <option>GPT-4 Turbo</option>
                  <option>Claude 3 Opus</option>
                  <option>Gemini Pro</option>
                </select>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="text-sm font-medium mb-1">Langue</div>
                <select className="w-full bg-black/50 border border-white/20 rounded px-3 py-2 text-sm">
                  <option>Francais</option>
                  <option>English</option>
                  <option>Espanol</option>
                  <option>Deutsch</option>
                  <option>Italiano</option>
                  <option>Portugues</option>
                  <option>Nihongo</option>
                  <option>Zhongwen</option>
                  <option>Hangugeo</option>
                  <option>Russkiy</option>
                  <option>Al-Arabiyyah</option>
                  <option>Hindi</option>
                  <option>Turkce</option>
                  <option>Polski</option>
                  <option>Nederlands</option>
                  <option>Svenska</option>
                </select>
                <button
                  onClick={() => router.push("/account")}
                  className="w-full mt-2 text-xs text-white/40 hover:text-white/60 transition-colors text-center"
                >
                  Voir toutes les langues
                </button>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="text-sm font-medium mb-2">Thème</div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-white text-black rounded text-sm font-medium">Sombre</button>
                  <button className="flex-1 py-2 bg-white/10 rounded text-sm">Clair</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer with User + Plan */}
      {isOpen && (
        <div className="p-4 border-t border-white/10">
          {/* User Menu (popup above) */}
          {showUserMenu && (
            <div className="mb-2 p-2 bg-black/90 border border-white/10 rounded-xl backdrop-blur-xl">
              <button
                onClick={() => { router.push("/account"); setShowUserMenu(false) }}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors text-left"
              >
                <User className="w-4 h-4 text-white/60" />
                <span className="text-sm">Mon Profil</span>
              </button>
              <button
                onClick={() => { router.push("/pricing"); setShowUserMenu(false) }}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors text-left"
              >
                <CreditCard className="w-4 h-4 text-white/60" />
                <span className="text-sm">Gérer l&apos;abonnement</span>
              </button>
              <button
                onClick={() => { router.push("/account"); setShowUserMenu(false) }}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors text-left"
              >
                <Settings className="w-4 h-4 text-white/60" />
                <span className="text-sm">Paramètres</span>
              </button>
              <div className="border-t border-white/10 my-1" />
              <button
                onClick={() => { router.push("/auth"); setShowUserMenu(false) }}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-red-500/10 rounded-lg transition-colors text-left"
              >
                <LogOut className="w-4 h-4 text-red-400/70" />
                <span className="text-sm text-red-400/70">Se déconnecter</span>
              </button>
            </div>
          )}

          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">A</span>
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm font-medium">Alexandre</div>
              <div className="flex items-center gap-1.5">
                <Crown className="w-3 h-3 text-white/50" />
                <span className="text-xs text-white/50">Plan {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}</span>
              </div>
            </div>
            <ChevronUp className={cn(
              "w-4 h-4 text-white/40 transition-transform",
              showUserMenu && "rotate-180"
            )} />
          </button>
        </div>
      )}

      {/* Collapsed footer */}
      {!isOpen && (
        <div className="p-2 border-t border-white/10">
          <button
            onClick={() => router.push("/account")}
            className="w-full p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center"
            title="Mon Compte"
          >
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">A</span>
            </div>
          </button>
        </div>
      )}
    </div>
  )
}
