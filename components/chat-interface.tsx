"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Sparkles, Smartphone, Globe, Loader2, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  isGenerating?: boolean
  creditsUsed?: number
}

interface ChatInterfaceProps {
  onAppGenerated: (app: { name: string; code: string; type: "mobile" | "fullstack" }) => void
  isGenerating: boolean
  setIsGenerating: (value: boolean) => void
  userId?: string
}

// Simulate credit cost estimation based on message complexity
function estimateCreditCost(message: string): number {
  const wordCount = message.split(/\s+/).length
  const hasComplexKeywords = /complet|full|entire|clone|copie|application|multi|dashboard|e-commerce|réseau social/i.test(message)
  const hasSimpleKeywords = /modifier|bug|fix|couleur|texte|bouton|petite|simple/i.test(message)
  
  let baseCost = 0.75
  
  if (hasSimpleKeywords) {
    baseCost = 0.20 + Math.random() * 0.55
  } else if (hasComplexKeywords) {
    baseCost = 4.00 + Math.random() * 3.0
  } else if (wordCount > 50) {
    baseCost = 2.50 + Math.random() * 2.5
  } else if (wordCount > 20) {
    baseCost = 1.00 + Math.random() * 1.5
  } else {
    baseCost = 0.35 + Math.random() * 0.65
  }
  
  return Math.round(baseCost * 100) / 100
}

// Estimate before sending (preview)
function previewCreditCost(message: string): string {
  if (!message.trim()) return ""
  const wordCount = message.split(/\s+/).length
  const hasComplex = /complet|full|clone|application|multi|dashboard|e-commerce|réseau/i.test(message)
  const hasSimple = /modifier|bug|fix|couleur|texte|bouton|simple/i.test(message)
  
  if (hasSimple) return "~0.20 - 0.75"
  if (hasComplex) return "~4.00 - 7.00"
  if (wordCount > 50) return "~2.50 - 5.00"
  if (wordCount > 20) return "~1.00 - 2.50"
  return "~0.35 - 1.00"
}

export function ChatInterface({ onAppGenerated, isGenerating, setIsGenerating, userId }: ChatInterfaceProps) {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [appType, setAppType] = useState<"mobile" | "fullstack">("mobile")
  const [aiProvider, setAiProvider] = useState<string>("openrouter") // ChatGPT par défaut
  const [aiModel, setAiModel] = useState<string>("openai/gpt-4-turbo-preview")
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Preview estimated credits for current input
  const creditPreview = previewCreditCost(input)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isGenerating) return

    const currentUserId = userId || user?.id
    if (!currentUserId) {
      setError("Veuillez vous connecter d'abord")
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsGenerating(true)
    setError(null)

    // Create assistant message placeholder
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
      timestamp: new Date(),
      isGenerating: true,
    }

    setMessages((prev) => [...prev, assistantMessage])

    try {
      // Call the API to generate code
      const response = await fetch('/api/generate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: userMessage.content,
          type: appType,
          userId: currentUserId,
          provider: aiProvider,
          model: aiModel,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Erreur lors de la génération')
      }

      const data = await response.json()

      // Simulate AI response with typing effect
      const aiResponse = `✨ Votre application ${appType === "mobile" ? "mobile" : "full-stack"} a été générée avec succès !\n\nDe description : "${userMessage.content}"\n\nJe viens de créer une application avec :\n• Interface utilisateur moderne\n• Architecture optimisée\n• Code prêt pour la production\n\nCrédits utilisés : ${data.app.creditsRemaining ? `${(user?.creditsTotal || 0) - data.app.creditsRemaining}` : 'N/A'}`

      let currentText = ""
      for (let i = 0; i < aiResponse.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 15))
        currentText += aiResponse[i]
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessage.id ? { ...msg, content: currentText } : msg
          )
        )
      }

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessage.id
            ? { 
                ...msg, 
                isGenerating: false,
              }
            : msg
        )
      )

      // Trigger preview with generated code
      onAppGenerated({
        name: data.app.name,
        code: data.app.code,
        type: appType,
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue'
      setError(errorMessage)
      setMessages((prev) => 
        prev.filter(msg => msg.id !== assistantMessage.id)
      )
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-8">
            {/* Logo centered */}
            <div className="mb-8">
              <img
                src="/images/actual-design2-this-is-what-we-publish-removebg-preview.png"
                alt="Convergence"
                className="h-24 w-auto opacity-80"
              />
            </div>
            
            <h1 className="text-3xl font-light text-white/90 mb-2 text-center text-balance">
              Que voulez-vous créer ?
            </h1>
            <p className="text-white/50 text-center max-w-md mb-8 leading-relaxed">
              Décrivez votre application et je la générerai pour vous en quelques secondes
            </p>

            {/* App Type Selector */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setAppType("mobile")}
                className={cn(
                  "flex items-center gap-3 px-6 py-4 rounded-xl border transition-all",
                  appType === "mobile"
                    ? "bg-white text-black border-white"
                    : "bg-white/5 border-white/20 hover:bg-white/10"
                )}
              >
                <Smartphone className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">App Mobile</div>
                  <div className={cn("text-xs", appType === "mobile" ? "text-black/60" : "text-white/50")}>
                    iOS & Android
                  </div>
                </div>
              </button>
              <button
                onClick={() => setAppType("fullstack")}
                className={cn(
                  "flex items-center gap-3 px-6 py-4 rounded-xl border transition-all",
                  appType === "fullstack"
                    ? "bg-white text-black border-white"
                    : "bg-white/5 border-white/20 hover:bg-white/10"
                )}
              >
                <Globe className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Full-Stack</div>
                  <div className={cn("text-xs", appType === "fullstack" ? "text-black/60" : "text-white/50")}>
                    Web App Complete
                  </div>
                </div>
              </button>
            </div>

            {/* AI Provider Selector */}
            <div className="flex gap-4 mb-8 flex-wrap justify-center">
              <button
                onClick={() => {
                  setAiProvider('openrouter')
                  setAiModel('openai/gpt-4-turbo-preview')
                }}
                className={cn(
                  "px-4 py-2 rounded-full text-sm border transition-all",
                  aiProvider === 'openrouter' && aiModel === 'openai/gpt-4-turbo-preview'
                    ? "bg-blue-500 border-blue-500 text-white"
                    : "bg-white/5 border-white/20 hover:bg-white/10"
                )}
              >
                🤖 ChatGPT-4
              </button>
              <button
                onClick={() => {
                  setAiProvider('openrouter')
                  setAiModel('anthropic/claude-3-opus')
                }}
                className={cn(
                  "px-4 py-2 rounded-full text-sm border transition-all",
                  aiProvider === 'openrouter' && aiModel === 'anthropic/claude-3-opus'
                    ? "bg-amber-500 border-amber-500 text-white"
                    : "bg-white/5 border-white/20 hover:bg-white/10"
                )}
              >
                🤕 Claude 3
              </button>
              <button
                onClick={() => {
                  setAiProvider('openrouter')
                  setAiModel('google/gemini-pro')
                }}
                className={cn(
                  "px-4 py-2 rounded-full text-sm border transition-all",
                  aiProvider === 'openrouter' && aiModel === 'google/gemini-pro'
                    ? "bg-purple-500 border-purple-500 text-white"
                    : "bg-white/5 border-white/20 hover:bg-white/10"
                )}
              >
                ✨ Gemini
              </button>
            </div>

            {/* Suggestions */}
            <div className="flex flex-wrap gap-2 justify-center max-w-2xl">
              {[
                "Une app de gestion de tâches",
                "Un clone d'Instagram",
                "Dashboard e-commerce",
                "App de réservation",
                "Réseau social",
                "Plateforme de cours en ligne",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInput(suggestion)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-4",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}
                <div className="max-w-[70%]">
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-3",
                      message.role === "user"
                        ? "bg-white text-black"
                        : "bg-white/5 border border-white/10"
                    )}
                  >
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                    {message.isGenerating && (
                      <div className="flex items-center gap-2 mt-2 text-white/50">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-xs">Génération en cours...</span>
                      </div>
                    )}
                  </div>
                  {/* Credit cost badge under assistant messages */}
                  {message.role === "assistant" && message.creditsUsed && !message.isGenerating && (
                    <div className="flex items-center gap-1.5 mt-1.5 ml-1">
                      <Zap className="w-3 h-3 text-white/30" />
                      <span className="text-[11px] text-white/30 font-mono">
                        -{message.creditsUsed.toFixed(2)} crédits
                      </span>
                    </div>
                  )}
                </div>
                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <span className="text-black text-sm font-medium">A</span>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/10">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl p-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Décrivez l'application que vous souhaitez créer..."
              className="flex-1 bg-transparent px-4 py-3 text-white placeholder:text-white/40 focus:outline-none"
              disabled={isGenerating}
            />
            <button
              type="submit"
              disabled={!input.trim() || isGenerating}
              className={cn(
                "p-3 rounded-xl transition-all",
                input.trim() && !isGenerating
                  ? "bg-white text-black hover:bg-white/90"
                  : "bg-white/10 text-white/30 cursor-not-allowed"
              )}
            >
              {isGenerating ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="flex items-center justify-between mt-2 px-2">
            <div className="flex items-center gap-4 text-xs text-white/40">
              <span>
                Type: <span className="text-white/60">{appType === "mobile" ? "Mobile" : "Full-Stack"}</span>
              </span>
              <span>
                IA: <span className="text-white/60">
                  {aiModel.includes('openai') ? 'ChatGPT-4' :
                   aiModel.includes('claude') ? 'Claude 3' :
                   aiModel.includes('gemini') ? 'Gemini' : 'IA'}
                </span>
              </span>
              {creditPreview && (
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  <span className="text-white/50 font-mono">{creditPreview} crédits</span>
                </span>
              )}
            </div>
            <span className="text-xs text-white/40">
              Convergence AI
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}

function generateMockCode(description: string, type: "mobile" | "fullstack"): string {
  if (type === "mobile") {
    return `import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// ${description}

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mon Application</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>
          Bienvenue dans votre nouvelle application!
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});`
  }
  
  return `// ${description}
import { NextResponse } from 'next/server'

// API Route
export async function GET() {
  return NextResponse.json({ 
    message: 'Bienvenue dans votre application!' 
  })
}

// Page Component
export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white">
      <header className="p-6 border-b border-white/10">
        <h1 className="text-2xl font-bold">Mon Application</h1>
      </header>
      <section className="p-6">
        <p>Votre application full-stack est prête!</p>
      </section>
    </main>
  )
}`
}
