"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, ImageIcon, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingCard from "./floating-card";

interface AdvancedImageUploadProps {
  onImageSelect: (file: File) => void;
  disabled?: boolean;
}

export default function AdvancedImageUpload({
  onImageSelect,
  disabled,
}: AdvancedImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    multiple: false,
    disabled,
  });

  const handleConvert = () => {
    if (selectedFile) {
      onImageSelect(selectedFile);
    }
  };

  const clearSelection = () => {
    setPreview(null);
    setSelectedFile(null);
  };

  return (
    <FloatingCard className="overflow-hidden">
      <div className="space-y-6">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="inline-block mb-4"
          >
            <Sparkles className="h-8 w-8 text-blue-400" />
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-2">
            AI-Powered 3D Generation
          </h3>
          <p className="text-blue-100">
            Upload your 2D image and watch our custom neural network transform
            it
          </p>
        </div>

        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={preview || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-2 hover:bg-white/30 transition-colors"
                  onClick={clearSelection}
                  disabled={disabled}
                >
                  <X className="h-4 w-4 text-white" />
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div
                {...getRootProps()}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`
                  relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer 
                  transition-all duration-500 group overflow-hidden
                  ${
                    isDragActive
                      ? "border-blue-400 bg-blue-500/20"
                      : "border-white/30 hover:border-blue-400/50 hover:bg-white/5"
                  }
                  ${disabled ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                <input {...getInputProps()} />

                {/* Animated background effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10"
                  animate={{
                    opacity: isHovered || isDragActive ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative z-10 flex flex-col items-center space-y-6">
                  <motion.div
                    animate={{
                      y: isDragActive ? -10 : 0,
                      scale: isDragActive ? 1.1 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`
                      p-6 rounded-full transition-all duration-300
                      ${
                        isDragActive
                          ? "bg-blue-500/30"
                          : "bg-white/10 group-hover:bg-white/20"
                      }
                    `}
                  >
                    {isDragActive ? (
                      <Upload className="h-12 w-12 text-blue-400" />
                    ) : (
                      <ImageIcon className="h-12 w-12 text-white/70 group-hover:text-white" />
                    )}
                  </motion.div>

                  <div>
                    <motion.h4
                      animate={{ color: isDragActive ? "#60a5fa" : "#ffffff" }}
                      className="text-xl font-semibold mb-2"
                    >
                      {isDragActive
                        ? "Drop your image here"
                        : "Upload Image for 3D Conversion"}
                    </motion.h4>
                    <p className="text-blue-100/80 text-sm">
                      Drag & drop or click to select • PNG, JPG, JPEG, WebP
                    </p>
                    <p className="text-blue-200/60 text-xs mt-2">
                      Our AI model supports high-resolution images up to 10MB
                    </p>
                  </div>
                </div>

                {/* Floating particles effect */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-blue-400/50 rounded-full"
                      initial={{ x: 0, y: 0 }}
                      animate={{
                        x: [0, Math.random() * 100],
                        y: [0, Math.random() * 100],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.5,
                      }}
                      style={{
                        left: "0%",
                        top: "0%",
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {selectedFile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center"
          >
            <Button
              onClick={handleConvert}
              disabled={disabled}
              className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              size="lg"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>Generate 3D Model</span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </Button>
          </motion.div>
        )}
      </div>
    </FloatingCard>
  );
}
