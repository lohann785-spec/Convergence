"use client"

import { useState } from "react"
import { 
  X, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Code, 
  Eye, 
  Download, 
  Share2,
  RotateCcw,
  ExternalLink,
  Copy,
  Check
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AppPreviewProps {
  app: {
    name: string
    code: string
    type: "mobile" | "fullstack"
  }
  onClose: () => void
}

type ViewMode = "preview" | "code"
type DeviceType = "mobile" | "tablet" | "desktop"

export function AppPreview({ app, onClose }: AppPreviewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("preview")
  const [device, setDevice] = useState<DeviceType>(app.type === "mobile" ? "mobile" : "desktop")
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(app.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const deviceSizes = {
    mobile: "w-[375px] h-[667px]",
    tablet: "w-[768px] h-[1024px] scale-[0.6] origin-top",
    desktop: "w-full h-full",
  }

  return (
    <div className="h-full flex flex-col bg-black">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
            {app.type === "mobile" ? (
              <Smartphone className="w-4 h-4" />
            ) : (
              <Monitor className="w-4 h-4" />
            )}
          </div>
          <div>
            <h3 className="font-medium text-sm">{app.name}</h3>
            <p className="text-xs text-white/50">{app.type === "mobile" ? "Application Mobile" : "Application Full-Stack"}</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-white/10">
        {/* View Toggle */}
        <div className="flex items-center bg-white/5 rounded-lg p-1">
          <button
            onClick={() => setViewMode("preview")}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors",
              viewMode === "preview" ? "bg-white text-black" : "text-white/60 hover:text-white"
            )}
          >
            <Eye className="w-4 h-4" />
            Aperçu
          </button>
          <button
            onClick={() => setViewMode("code")}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors",
              viewMode === "code" ? "bg-white text-black" : "text-white/60 hover:text-white"
            )}
          >
            <Code className="w-4 h-4" />
            Code
          </button>
        </div>

        {/* Device Selector (only in preview mode) */}
        {viewMode === "preview" && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setDevice("mobile")}
              className={cn(
                "p-2 rounded-lg transition-colors",
                device === "mobile" ? "bg-white/20" : "hover:bg-white/10"
              )}
            >
              <Smartphone className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDevice("tablet")}
              className={cn(
                "p-2 rounded-lg transition-colors",
                device === "tablet" ? "bg-white/20" : "hover:bg-white/10"
              )}
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDevice("desktop")}
              className={cn(
                "p-2 rounded-lg transition-colors",
                device === "desktop" ? "bg-white/20" : "hover:bg-white/10"
              )}
            >
              <Monitor className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-1">
          {viewMode === "code" && (
            <button
              onClick={copyCode}
              className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded-lg text-sm transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copié!" : "Copier"}
            </button>
          )}
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <RotateCcw className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-hidden p-4">
        {viewMode === "preview" ? (
          <div className="h-full flex items-center justify-center">
            <div 
              className={cn(
                "bg-white/5 rounded-2xl border border-white/10 overflow-hidden",
                device === "mobile" && "rounded-[40px] border-[8px] border-white/20",
                device === "tablet" && "rounded-[24px] border-[6px] border-white/20",
                deviceSizes[device]
              )}
            >
              {/* Mock App UI */}
              <div className="h-full bg-black">
                {/* Status Bar */}
                {device === "mobile" && (
                  <div className="flex items-center justify-between px-6 py-2 bg-black">
                    <span className="text-xs">9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-2 bg-white/50 rounded-sm" />
                      <div className="w-2 h-2 bg-white/50 rounded-full" />
                    </div>
                  </div>
                )}
                
                {/* App Content */}
                <div className="p-6">
                  <div className="mb-6">
                    <h1 className="text-xl font-bold mb-2">{app.name}</h1>
                    <div className="h-2 bg-white/10 rounded w-3/4" />
                  </div>
                  
                  {/* Mock Cards */}
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div 
                        key={i}
                        className="p-4 bg-white/5 rounded-xl border border-white/10"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-white/20 rounded-full" />
                          <div className="flex-1">
                            <div className="h-3 bg-white/20 rounded w-1/2 mb-1" />
                            <div className="h-2 bg-white/10 rounded w-1/3" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-2 bg-white/10 rounded" />
                          <div className="h-2 bg-white/10 rounded w-5/6" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Nav (Mobile) */}
                {device === "mobile" && (
                  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around py-4 bg-black/80 backdrop-blur border-t border-white/10">
                    {["Accueil", "Recherche", "Profil", "Menu"].map((item, i) => (
                      <div key={item} className="flex flex-col items-center gap-1">
                        <div className={cn(
                          "w-6 h-6 rounded-full",
                          i === 0 ? "bg-white" : "bg-white/20"
                        )} />
                        <span className={cn(
                          "text-[10px]",
                          i === 0 ? "text-white" : "text-white/50"
                        )}>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full overflow-auto">
            <pre className="p-4 bg-white/5 rounded-xl border border-white/10 text-sm font-mono text-white/80 overflow-x-auto">
              <code>{app.code}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white text-black rounded-xl font-medium hover:bg-white/90 transition-colors">
            <Download className="w-5 h-5" />
            Télécharger le projet
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 rounded-xl font-medium hover:bg-white/20 transition-colors">
            <Share2 className="w-5 h-5" />
            Partager
          </button>
        </div>
      </div>
    </div>
  )
}
