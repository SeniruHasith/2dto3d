"use client";

import { motion } from "framer-motion";
import { Images as GalleryIcon } from "lucide-react";
import ClientWrapper from "@/components/client-wrapper";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AdvancedModelViewer from "@/components/advanced-model-viewer";

interface GalleryItem {
  id: number;
  title: string;
  thumbnailUrl: string;
  modelUrl: string;
  createdAt: string;
}

// This would typically come from your API/database
const DUMMY_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: "Sample Model 1",
    thumbnailUrl: "/placeholder.jpg",
    modelUrl: "/sample-model-1.glb",
    createdAt: "2024-03-20",
  },
  {
    id: 2,
    title: "Sample Model 2",
    thumbnailUrl: "/placeholder.jpg",
    modelUrl: "/sample-model-2.glb",
    createdAt: "2024-03-19",
  },
];

export default function GalleryPage() {
  const [selectedModel, setSelectedModel] = useState<GalleryItem | null>(null);

  return (
    <ClientWrapper>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16 pt-8"
        >
          <motion.div
            className="inline-block mb-6"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <GalleryIcon className="h-16 w-16 text-[#F0A500] mx-auto" />
          </motion.div>

          <h1 className="text-4xl font-bold text-[#F4F4F4] mb-4">
            3D Model Gallery
          </h1>
          <p className="text-[#F4F4F4]/80 max-w-2xl mx-auto">
            Explore our collection of AI-generated 3D models. View and interact
            with models created by our community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DUMMY_GALLERY_ITEMS.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="overflow-hidden card-gradient border border-[#F0A500]/20">
                <div className="aspect-square relative">
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C20] via-[#1A1C20]/50 to-transparent opacity-0 hover:opacity-100 transition-all duration-300 flex items-end justify-center p-6">
                    <Button
                      onClick={() => setSelectedModel(item)}
                      className="bg-[#F0A500] hover:bg-[#CF7500] text-[#1A1C20] font-medium"
                    >
                      View Model
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#F4F4F4]">
                    {item.title}
                  </h3>
                  <p className="text-[#F4F4F4]/60 text-sm">
                    Created {item.createdAt}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {selectedModel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#1A1C20]/90 backdrop-blur-lg z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-5xl">
              <div className="card-gradient border border-[#F0A500]/20 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-[#F4F4F4] mb-4">
                  {selectedModel.title}
                </h2>
                <AdvancedModelViewer
                  modelUrl={selectedModel.modelUrl}
                  thumbnailUrl={selectedModel.thumbnailUrl}
                />
                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={() => setSelectedModel(null)}
                    className="bg-[#F0A500] hover:bg-[#CF7500] text-[#1A1C20] font-medium"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </ClientWrapper>
  );
}
