"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ParticleNetwork } from "@/components/particle-network"
import { ChatInterface } from "@/components/chat-interface"
import { Sidebar } from "@/components/sidebar"
import { AppPreview } from "@/components/app-preview"
import { useAuth } from "@/hooks/use-auth"

export default function DashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [generatedApp, setGeneratedApp] = useState<{
    name: string
    code: string
    type: "mobile" | "fullstack"
  } | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="relative min-h-screen bg-black text-white flex items-center justify-center">
        <ParticleNetwork />
        <div className="relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border border-white/20 border-t-white"></div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <ParticleNetwork />
      
      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        />

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Chat Section */}
          <div className={`flex-1 flex flex-col transition-all duration-300 ${
            generatedApp ? "w-1/2" : "w-full"
          }`}>
            <ChatInterface 
              userId={user?.id}
              onAppGenerated={(app) => setGeneratedApp(app)}
              isGenerating={isGenerating}
              setIsGenerating={setIsGenerating}
            />
          </div>

          {/* Preview Section */}
          {generatedApp && (
            <div className="w-1/2 border-l border-white/10">
              <AppPreview 
                app={generatedApp} 
                onClose={() => setGeneratedApp(null)} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
