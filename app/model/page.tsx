"use client";

import { motion } from "framer-motion";
import { Box, Sparkles } from "lucide-react";
import ClientWrapper from "@/components/client-wrapper";
import AdvancedImageUpload from "@/components/advanced-image-upload";
import AdvancedProgress from "@/components/advanced-progress";
import AdvancedResults from "@/components/advanced-results";
import { use3DConversion } from "@/hooks/use-3d-conversion";
import AnimatedBackground from "@/components/animated-background";

export default function ModelPage() {
  const { isConverting, currentTask, error, convertImage } = use3DConversion();

  const handleImageSelect = (file: File) => {
    convertImage(file);
  };

  return (
    <ClientWrapper>
      <AnimatedBackground />
      <div className="container relative mx-auto px-4 py-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16 pt-8"
        >
          <motion.div
            className="inline-flex gap-4 mb-6"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Box className="h-16 w-16 text-[#F0A500] mx-auto" />
            <Sparkles className="h-8 w-8 text-[#F0A500]/60 animate-pulse" />
          </motion.div>

          <motion.h1
            className="text-5xl font-bold bg-gradient-to-r from-[#F0A500] to-[#FFD700] bg-clip-text text-transparent mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            2D to 3D Converter
          </motion.h1>
          <p className="text-[#F4F4F4]/80 max-w-2xl mx-auto text-lg leading-relaxed">
            Transform your 2D images into stunning 3D models using our advanced
            AI technology. Upload any image and watch it come to life in three
            dimensions.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-12">
          <motion.div
            className="card-gradient border border-[#F0A500]/20 rounded-2xl p-8 backdrop-blur-sm bg-black/30"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <AdvancedImageUpload
              onImageSelect={handleImageSelect}
              disabled={isConverting}
            />
          </motion.div>

          {(isConverting || currentTask) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="card-gradient border border-[#F0A500]/20 rounded-2xl p-8 backdrop-blur-sm bg-black/30"
            >
              <AdvancedProgress
                status={currentTask?.status || "PENDING"}
                progress={currentTask?.progress || 0}
              />
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-red-500 bg-red-500/10 p-6 rounded-lg backdrop-blur-sm border border-red-500/20"
            >
              {error}
            </motion.div>
          )}

          {currentTask?.status === "SUCCEEDED" && currentTask.model_urls && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="card-gradient border border-[#F0A500]/20 rounded-2xl p-8 backdrop-blur-sm bg-black/30"
            >
              <AdvancedResults
                modelUrls={currentTask.model_urls}
                thumbnailUrl={currentTask.thumbnail_url}
                textureUrls={currentTask.texture_urls}
              />
            </motion.div>
          )}
        </div>
      </div>
    </ClientWrapper>
  );
}
