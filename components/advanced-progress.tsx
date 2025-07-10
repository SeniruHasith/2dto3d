"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Loader2, Brain, Cpu, Sparkles, Zap } from "lucide-react"
import FloatingCard from "./floating-card"

interface AdvancedProgressProps {
  status: "PENDING" | "IN_PROGRESS" | "SUCCEEDED" | "FAILED"
  progress: number
}

const stages = [
  { id: 1, name: "Neural Analysis", icon: Brain, description: "Analyzing image structure and depth" },
  { id: 2, name: "3D Reconstruction", icon: Cpu, description: "Generating 3D geometry from 2D data" },
  { id: 3, name: "Texture Mapping", icon: Sparkles, description: "Applying realistic textures and materials" },
  { id: 4, name: "Model Optimization", icon: Zap, description: "Optimizing for web and download formats" },
]

export default function AdvancedProgress({ status, progress }: AdvancedProgressProps) {
  const [currentStage, setCurrentStage] = useState(0)
  const [completedStages, setCompletedStages] = useState<number[]>([])

  useEffect(() => {
    const stageProgress = Math.floor((progress / 100) * stages.length)
    setCurrentStage(stageProgress)
    setCompletedStages(Array.from({ length: stageProgress }, (_, i) => i))
  }, [progress])

  return (
    <FloatingCard>
      <div className="space-y-8">
        <div className="text-center">
          <motion.div
            animate={{ rotate: status === "IN_PROGRESS" ? 360 : 0 }}
            transition={{
              duration: 2,
              repeat: status === "IN_PROGRESS" ? Number.POSITIVE_INFINITY : 0,
              ease: "linear",
            }}
            className="inline-block mb-4"
          >
            {status === "SUCCEEDED" ? (
              <CheckCircle className="h-12 w-12 text-green-400" />
            ) : (
              <Loader2 className="h-12 w-12 text-blue-400" />
            )}
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-2">AI Model Processing</h3>
          <p className="text-blue-100">
            {status === "SUCCEEDED"
              ? "Your 3D model has been generated successfully!"
              : "Our neural network is transforming your image..."}
          </p>
        </div>

        {/* Overall Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-blue-100">
            <span>Overall Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            <motion.div
              className="absolute inset-y-0 left-0 bg-white/30 rounded-full"
              animate={{
                x: [`${Math.max(0, progress - 10)}%`, `${progress}%`],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: status === "IN_PROGRESS" ? Number.POSITIVE_INFINITY : 0,
                ease: "easeInOut",
              }}
              style={{ width: "10%" }}
            />
          </div>
        </div>

        {/* Stage Indicators */}
        <div className="space-y-4">
          {stages.map((stage, index) => {
            const isCompleted = completedStages.includes(index)
            const isCurrent = currentStage === index && status === "IN_PROGRESS"
            const isUpcoming = index > currentStage

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  flex items-center space-x-4 p-4 rounded-xl transition-all duration-300
                  ${isCompleted ? "bg-green-500/20 border border-green-500/30" : ""}
                  ${isCurrent ? "bg-blue-500/20 border border-blue-500/30" : ""}
                  ${isUpcoming ? "bg-white/5 border border-white/10" : ""}
                `}
              >
                <div
                  className={`
                  flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                  ${isCompleted ? "bg-green-500" : ""}
                  ${isCurrent ? "bg-blue-500" : ""}
                  ${isUpcoming ? "bg-white/20" : ""}
                `}
                >
                  <AnimatePresence mode="wait">
                    {isCompleted ? (
                      <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <CheckCircle className="h-5 w-5 text-white" />
                      </motion.div>
                    ) : isCurrent ? (
                      <motion.div
                        key="loading"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <stage.icon className="h-5 w-5 text-white" />
                      </motion.div>
                    ) : (
                      <stage.icon className={`h-5 w-5 ${isUpcoming ? "text-white/50" : "text-white"}`} />
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex-1">
                  <h4 className={`font-semibold ${isUpcoming ? "text-white/50" : "text-white"}`}>{stage.name}</h4>
                  <p className={`text-sm ${isUpcoming ? "text-white/30" : "text-blue-100"}`}>{stage.description}</p>
                </div>

                {isCurrent && (
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    className="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full"
                  />
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Processing Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">AI</div>
            <div className="text-xs text-blue-100">Neural Network</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">4K</div>
            <div className="text-xs text-blue-100">Resolution</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">PBR</div>
            <div className="text-xs text-blue-100">Materials</div>
          </div>
        </div>
      </div>
    </FloatingCard>
  )
}
