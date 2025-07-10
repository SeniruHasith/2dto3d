"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Navigation from "./navigation"
import AnimatedBackground from "./animated-background"

interface ClientWrapperProps {
  children: React.ReactNode
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
        />
        <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-blue-400 rounded" />
                <span className="text-xl font-bold text-white">Neural3D</span>
              </div>
            </div>
          </div>
        </nav>
        <div className="relative z-10">{children}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <Navigation />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
