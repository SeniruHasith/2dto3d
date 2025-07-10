"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  Html,
  ContactShadows,
  Float,
} from "@react-three/drei";
import { motion } from "framer-motion";
import { Move3D } from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingCard from "./floating-card";

interface AdvancedModelViewerProps {
  modelUrl: string;
  thumbnailUrl?: string;
}

function Model({ url }: { url: string }) {
  try {
    const { scene } = useGLTF(url);
    return (
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <primitive object={scene} scale={2} />
      </Float>
    );
  } catch (error) {
    return (
      <Html center>
        <div className="text-white bg-red-500/20 px-4 py-2 rounded-lg">
          <p>Error loading 3D model</p>
          <p className="text-sm opacity-80">
            Please check if the URL is accessible
          </p>
        </div>
      </Html>
    );
  }
}

function ModelWithPreload({ url }: { url: string }) {
  useGLTF.preload(url);
  return <Model url={url} />;
}

function LoadingSpinner() {
  return (
    <Html center>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="flex items-center justify-center"
      >
        <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full" />
      </motion.div>
    </Html>
  );
}

export default function AdvancedModelViewer({
  modelUrl,
  thumbnailUrl,
}: AdvancedModelViewerProps) {
  const [controlsEnabled, setControlsEnabled] = useState(true);

  return (
    <FloatingCard className="overflow-hidden">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">3D Model Preview</h3>
            <p className="text-blue-100 text-sm">
              Interactive 3D visualization powered by our AI
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => setControlsEnabled(!controlsEnabled)}
            >
              <Move3D className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <pointLight position={[-10, -10, -5]} intensity={0.5} />

            <Suspense fallback={<LoadingSpinner />}>
              <ModelWithPreload url={modelUrl} />
              <ContactShadows
                position={[0, -2, 0]}
                opacity={0.4}
                scale={10}
                blur={2}
                far={4}
              />
              <Environment preset="city" />
            </Suspense>

            <OrbitControls
              enabled={controlsEnabled}
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              autoRotate={!controlsEnabled}
              autoRotateSpeed={2}
            />
          </Canvas>

          {/* Control Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-center">
            <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2">
              <span className="text-white text-xs">
                {controlsEnabled
                  ? "Drag to rotate • Scroll to zoom"
                  : "Auto-rotating"}
              </span>
            </div>
          </div>
        </div>

        {/* Model Stats */}
        <div className="grid grid-cols-4 gap-4 p-4 bg-white/5 rounded-xl">
          <div className="text-center">
            <div className="text-lg font-bold text-white">GLB</div>
            <div className="text-xs text-blue-100">Format</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white">PBR</div>
            <div className="text-xs text-blue-100">Materials</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white">4K</div>
            <div className="text-xs text-blue-100">Textures</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white">Web</div>
            <div className="text-xs text-blue-100">Optimized</div>
          </div>
        </div>
      </div>
    </FloatingCard>
  );
}
