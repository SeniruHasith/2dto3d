"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download, Eye, Share2, Heart, Star, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import FloatingCard from "./floating-card"
import AdvancedModelViewer from "./advanced-model-viewer"

interface AdvancedResultsProps {
  modelUrls: {
    glb: string
    fbx: string
    obj: string
    usdz: string
  }
  thumbnailUrl?: string
  textureUrls?: Array<{
    base_color: string
    metallic: string
    normal: string
    roughness: string
  }>
}

export default function AdvancedResults({ modelUrls, thumbnailUrl, textureUrls }: AdvancedResultsProps) {
  const [showViewer, setShowViewer] = useState(false)
  const [liked, setLiked] = useState(false)

  const downloadModel = (url: string, format: string) => {
    const link = document.createElement("a")
    link.href = url
    link.download = `ai-generated-model.${format}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const formatSizes = {
    glb: "2.4 MB",
    fbx: "3.1 MB",
    obj: "1.8 MB",
    usdz: "2.7 MB",
  }

  return (
    <div className="space-y-8">
      {/* Success Header */}
      <FloatingCard>
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="inline-block"
          >
            <div className="relative">
              <Sparkles className="h-16 w-16 text-yellow-400 mx-auto" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute inset-0"
              >
                <Star className="h-4 w-4 text-yellow-300 absolute -top-2 left-1/2 transform -translate-x-1/2" />
              </motion.div>
            </div>
          </motion.div>

          <div>
            <h2 className="text-3xl font-bold text-white mb-2">3D Model Generated Successfully!</h2>
            <p className="text-blue-100">
              Our advanced AI neural network has transformed your 2D image into a stunning 3D model
            </p>
          </div>

          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setLiked(!liked)}
              className={`
                bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300
                ${liked ? "bg-red-500/20 border-red-500/30 text-red-300" : ""}
              `}
            >
              <Heart className={`h-4 w-4 mr-2 ${liked ? "fill-current" : ""}`} />
              {liked ? "Liked" : "Like"}
            </Button>
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </FloatingCard>

      {/* Thumbnail Preview */}
      {thumbnailUrl && (
        <FloatingCard>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Model Preview</h3>
            <div className="relative group">
              <img
                src={thumbnailUrl || "/placeholder.svg"}
                alt="3D Model Thumbnail"
                className="w-full h-64 object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              <Button
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 opacity-0 group-hover:opacity-100 transition-all duration-300"
                onClick={() => setShowViewer(!showViewer)}
              >
                <Eye className="h-6 w-6 text-white" />
              </Button>
            </div>
          </div>
        </FloatingCard>
      )}

      {/* 3D Viewer */}
      {showViewer && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
          <AdvancedModelViewer modelUrl={modelUrls.glb} thumbnailUrl={thumbnailUrl} />
        </motion.div>
      )}

      {/* Download Options */}
      <FloatingCard>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">Download Your 3D Model</h3>
              <p className="text-blue-100 text-sm">Available in multiple industry-standard formats</p>
            </div>
            <Button
              onClick={() => setShowViewer(!showViewer)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Eye className="h-4 w-4 mr-2" />
              {showViewer ? "Hide" : "View"} 3D Model
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(modelUrls).map(([format, url]) => (
              <motion.div
                key={format}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-white uppercase">{format}</h4>
                    <p className="text-sm text-blue-100">
                      {format === "glb" && "Web-optimized, includes textures"}
                      {format === "fbx" && "Industry standard, animation support"}
                      {format === "obj" && "Universal format, widely compatible"}
                      {format === "usdz" && "Apple AR Quick Look compatible"}
                    </p>
                    <p className="text-xs text-blue-200 mt-1">
                      Size: {formatSizes[format as keyof typeof formatSizes]}
                    </p>
                  </div>
                  <Button
                    onClick={() => downloadModel(url, format)}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </FloatingCard>

      {/* Technical Details */}
      {textureUrls && textureUrls.length > 0 && (
        <FloatingCard>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Technical Specifications</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-blue-400">PBR</div>
                <div className="text-xs text-blue-100">Materials</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-purple-400">4K</div>
                <div className="text-xs text-blue-100">Textures</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-400">UV</div>
                <div className="text-xs text-blue-100">Mapped</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-yellow-400">AI</div>
                <div className="text-xs text-blue-100">Generated</div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-white">Included Texture Maps:</h4>
              <div className="flex flex-wrap gap-2">
                {["Base Color", "Metallic", "Normal", "Roughness"].map((texture) => (
                  <span
                    key={texture}
                    className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-white/20 px-3 py-1 rounded-full text-sm text-white"
                  >
                    {texture}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FloatingCard>
      )}
    </div>
  )
}
