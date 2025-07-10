"use client"

import { type ReactNode, useState, useEffect } from "react"
import { motion } from "framer-motion"

interface FloatingCardProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function FloatingCard({ children, className = "", delay = 0 }: FloatingCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        className={`
          relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl
          shadow-2xl transition-all duration-500
          ${className}
        `}
      >
        <div className="relative z-10 p-8">{children}</div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ y: -10, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`
        relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl
        shadow-2xl hover:shadow-3xl transition-all duration-500
        before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br 
        before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100
        before:transition-opacity before:duration-500
        ${className}
      `}
    >
      <div className="relative z-10 p-8">{children}</div>
      <motion.div
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/20 to-purple-600/20"
        animate={{
          opacity: isHovered ? 0.3 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}
