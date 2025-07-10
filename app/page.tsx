"use client";
import { motion } from "framer-motion";
import {
  Zap,
  Brain,
  Sparkles,
  Box,
  Images,
  ChevronDown,
  Users,
  Code,
  Shield,
} from "lucide-react";
import ClientWrapper from "@/components/client-wrapper";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <ClientWrapper>
      {/* Hero Section */}
      <div className="min-h-screen relative flex items-center justify-center">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-16 pt-16"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="inline-block mb-6"
            >
              <div className="relative">
                <Brain className="h-20 w-20 text-[#F0A500] mx-auto" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute inset-0 bg-[#F0A500]/20 rounded-full blur-xl"
                />
              </div>
            </motion.div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-gradient-custom">Neural 3D</span>
              <br />
              <span className="text-[#F4F4F4]">Generator</span>
            </h1>

            <p className="text-xl text-[#F4F4F4]/80 mb-8 max-w-2xl mx-auto">
              Transform your 2D images into stunning 3D models using our
              advanced AI technology. Experience the future of 3D content
              creation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push("/model")}
                className="bg-gradient-custom hover-gradient text-[#1A1C20] px-8 py-6 text-lg font-bold"
              >
                <Box className="mr-2 h-5 w-5" />
                Start Converting
              </Button>
              <Button
                onClick={() => router.push("/gallery")}
                className="bg-[#F4F4F4]/10 hover:bg-[#F4F4F4]/20 text-[#F4F4F4] px-8 py-6 text-lg"
              >
                <Images className="mr-2 h-5 w-5" />
                View Gallery
              </Button>
            </div>
          </motion.div>
        </div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="h-8 w-8 text-[#F0A500]" />
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-[#1A1C20]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="text-gradient-custom">Key Features</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center p-8 rounded-2xl card-gradient border border-[#F0A500]/20"
            >
              <Zap className="h-12 w-12 text-[#F0A500] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#F4F4F4] mb-2">
                Instant Conversion
              </h3>
              <p className="text-[#F4F4F4]/70">
                Transform your 2D images into 3D models in seconds using our
                advanced AI technology.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center p-8 rounded-2xl card-gradient border border-[#F0A500]/20"
            >
              <Brain className="h-12 w-12 text-[#CF7500] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#F4F4F4] mb-2">
                Neural Network
              </h3>
              <p className="text-[#F4F4F4]/70">
                Powered by state-of-the-art deep learning models for accurate 3D
                reconstruction.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center p-8 rounded-2xl card-gradient border border-[#F0A500]/20"
            >
              <Sparkles className="h-12 w-12 text-[#F0A500] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#F4F4F4] mb-2">
                High Quality
              </h3>
              <p className="text-[#F4F4F4]/70">
                Generate detailed 3D models with high-quality textures and
                materials.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-24 bg-[#1A1C20]/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-8">
              <span className="text-gradient-custom">About Neural3D</span>
            </h2>
            <p className="text-xl text-[#F4F4F4]/80 mb-12">
              Neural3D is at the forefront of AI-powered 3D content creation.
              Our platform combines cutting-edge neural networks with
              user-friendly interfaces to make 3D modeling accessible to
              everyone.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl card-gradient border border-[#F0A500]/20">
                <Users className="h-10 w-10 text-[#F0A500] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#F4F4F4] mb-2">
                  For Everyone
                </h3>
                <p className="text-[#F4F4F4]/70">
                  Whether you're a professional or beginner, our tools are
                  designed for you
                </p>
              </div>
              <div className="p-6 rounded-2xl card-gradient border border-[#F0A500]/20">
                <Code className="h-10 w-10 text-[#F0A500] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#F4F4F4] mb-2">
                  Advanced Tech
                </h3>
                <p className="text-[#F4F4F4]/70">
                  Built on state-of-the-art machine learning algorithms
                </p>
              </div>
              <div className="p-6 rounded-2xl card-gradient border border-[#F0A500]/20">
                <Shield className="h-10 w-10 text-[#F0A500] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#F4F4F4] mb-2">
                  Secure & Fast
                </h3>
                <p className="text-[#F4F4F4]/70">
                  Your content is processed securely and delivered quickly
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-24 bg-[#1A1C20]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-center mb-16">
              <span className="text-gradient-custom">How It Works</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="relative">
                <div className="p-6 rounded-2xl card-gradient border border-[#F0A500]/20">
                  <div className="bg-[#F0A500] w-10 h-10 rounded-full flex items-center justify-center text-[#1A1C20] font-bold mb-4">
                    1
                  </div>
                  <h3 className="text-lg font-bold text-[#F4F4F4] mb-2">
                    Upload Image
                  </h3>
                  <p className="text-[#F4F4F4]/70">
                    Upload your 2D image that you want to convert to 3D
                  </p>
                </div>
                <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-[#F0A500] to-transparent transform -translate-y-1/2" />
              </div>
              <div className="relative">
                <div className="p-6 rounded-2xl card-gradient border border-[#F0A500]/20">
                  <div className="bg-[#F0A500] w-10 h-10 rounded-full flex items-center justify-center text-[#1A1C20] font-bold mb-4">
                    2
                  </div>
                  <h3 className="text-lg font-bold text-[#F4F4F4] mb-2">
                    AI Processing
                  </h3>
                  <p className="text-[#F4F4F4]/70">
                    Our neural network analyzes and processes your image
                  </p>
                </div>
                <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-[#F0A500] to-transparent transform -translate-y-1/2" />
              </div>
              <div className="relative">
                <div className="p-6 rounded-2xl card-gradient border border-[#F0A500]/20">
                  <div className="bg-[#F0A500] w-10 h-10 rounded-full flex items-center justify-center text-[#1A1C20] font-bold mb-4">
                    3
                  </div>
                  <h3 className="text-lg font-bold text-[#F4F4F4] mb-2">
                    3D Generation
                  </h3>
                  <p className="text-[#F4F4F4]/70">
                    The system generates a detailed 3D model with textures
                  </p>
                </div>
                <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-[#F0A500] to-transparent transform -translate-y-1/2" />
              </div>
              <div className="p-6 rounded-2xl card-gradient border border-[#F0A500]/20">
                <div className="bg-[#F0A500] w-10 h-10 rounded-full flex items-center justify-center text-[#1A1C20] font-bold mb-4">
                  4
                </div>
                <h3 className="text-lg font-bold text-[#F4F4F4] mb-2">
                  Download
                </h3>
                <p className="text-[#F4F4F4]/70">
                  Download your 3D model in various formats
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="py-24 bg-[#1A1C20]/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-center mb-16">
              <span className="text-gradient-custom">Use Cases</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl card-gradient border border-[#F0A500]/20">
                <h3 className="text-xl font-bold text-[#F4F4F4] mb-4">
                  E-commerce
                </h3>
                <p className="text-[#F4F4F4]/70 mb-4">
                  Create interactive 3D product visualizations for your online
                  store. Enhance customer experience with 360° product views.
                </p>
                <ul className="list-disc list-inside text-[#F4F4F4]/70">
                  <li>Product showcases</li>
                  <li>Virtual try-ons</li>
                  <li>Interactive catalogs</li>
                </ul>
              </div>
              <div className="p-8 rounded-2xl card-gradient border border-[#F0A500]/20">
                <h3 className="text-xl font-bold text-[#F4F4F4] mb-4">
                  Gaming & VR
                </h3>
                <p className="text-[#F4F4F4]/70 mb-4">
                  Quickly generate 3D assets for games and virtual reality
                  experiences. Perfect for indie developers and small studios.
                </p>
                <ul className="list-disc list-inside text-[#F4F4F4]/70">
                  <li>Game assets</li>
                  <li>VR environments</li>
                  <li>Character models</li>
                </ul>
              </div>
              <div className="p-8 rounded-2xl card-gradient border border-[#F0A500]/20">
                <h3 className="text-xl font-bold text-[#F4F4F4] mb-4">
                  Architecture
                </h3>
                <p className="text-[#F4F4F4]/70 mb-4">
                  Transform architectural drawings and photos into 3D models.
                  Ideal for visualization and planning.
                </p>
                <ul className="list-disc list-inside text-[#F4F4F4]/70">
                  <li>Building models</li>
                  <li>Interior visualization</li>
                  <li>Landscape design</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 bg-[#1A1C20]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-center mb-16">
              <span className="text-gradient-custom">
                Frequently Asked Questions
              </span>
            </h2>
            <div className="space-y-6">
              <div className="p-6 rounded-2xl card-gradient border border-[#F0A500]/20">
                <h3 className="text-xl font-bold text-[#F4F4F4] mb-2">
                  What type of images work best?
                </h3>
                <p className="text-[#F4F4F4]/70">
                  High-resolution images with good lighting and clear subjects
                  work best. We recommend using images with minimal background
                  clutter and good contrast.
                </p>
              </div>
              <div className="p-6 rounded-2xl card-gradient border border-[#F0A500]/20">
                <h3 className="text-xl font-bold text-[#F4F4F4] mb-2">
                  How long does the conversion take?
                </h3>
                <p className="text-[#F4F4F4]/70">
                  Most conversions are completed within 2-5 minutes, depending
                  on the image complexity and server load. Larger or more
                  detailed images may take longer.
                </p>
              </div>
              <div className="p-6 rounded-2xl card-gradient border border-[#F0A500]/20">
                <h3 className="text-xl font-bold text-[#F4F4F4] mb-2">
                  What 3D file formats do you support?
                </h3>
                <p className="text-[#F4F4F4]/70">
                  We support common 3D file formats including .obj, .fbx, and
                  .glb. You can choose your preferred format during the download
                  process.
                </p>
              </div>
              <div className="p-6 rounded-2xl card-gradient border border-[#F0A500]/20">
                <h3 className="text-xl font-bold text-[#F4F4F4] mb-2">
                  Can I edit the 3D models after conversion?
                </h3>
                <p className="text-[#F4F4F4]/70">
                  Yes, the generated 3D models can be imported into popular 3D
                  modeling software like Blender, Maya, or 3ds Max for further
                  editing and refinement.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-[#1A1C20]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center bg-gradient-to-r from-[#F0A500]/20 to-[#CF7500]/20 p-12 rounded-3xl border border-[#F0A500]/30"
          >
            <h2 className="text-4xl font-bold mb-6 text-[#F4F4F4]">
              Ready to Transform Your Images?
            </h2>
            <p className="text-xl text-[#F4F4F4]/80 mb-8">
              Start creating stunning 3D models from your images today.
            </p>
            <Button
              onClick={() => router.push("/model")}
              className="bg-gradient-custom hover-gradient text-[#1A1C20] px-8 py-6 text-lg font-bold"
            >
              <Box className="mr-2 h-5 w-5" />
              Get Started Now
            </Button>
          </motion.div>
        </div>
      </div>
    </ClientWrapper>
  );
}
