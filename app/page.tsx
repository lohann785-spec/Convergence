"use client"

import { useState } from "react"
import { ParticleNetwork } from "@/components/particle-network"
import { ChatInterface } from "@/components/chat-interface"
import { Sidebar } from "@/components/sidebar"
import { AppPreview } from "@/components/app-preview"

export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [generatedApp, setGeneratedApp] = useState<{
    name: string
    code: string
    type: "mobile" | "fullstack"
  } | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

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
