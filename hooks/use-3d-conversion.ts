"use client"

import { useState, useCallback } from "react"

interface ConversionTask {
  id: string
  status: "PENDING" | "IN_PROGRESS" | "SUCCEEDED" | "FAILED"
  progress: number
  model_urls?: {
    glb: string
    fbx: string
    obj: string
    usdz: string
  }
  thumbnail_url?: string
  texture_urls?: Array<{
    base_color: string
    metallic: string
    normal: string
    roughness: string
  }>
}

export function use3DConversion() {
  const [isConverting, setIsConverting] = useState(false)
  const [currentTask, setCurrentTask] = useState<ConversionTask | null>(null)
  const [error, setError] = useState<string | null>(null)

  const convertImage = useCallback(async (imageFile: File) => {
    setIsConverting(true)
    setError(null)
    setCurrentTask(null)

    try {
      // Convert image to base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(imageFile)
      })

      // Start conversion
      const response = await fetch("/api/convert-to-3d", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageData: base64 }),
      })

      if (!response.ok) {
        throw new Error("Failed to start conversion")
      }

      const { result: taskId } = await response.json()

      // Poll for status
      const pollStatus = async () => {
        const statusResponse = await fetch(`/api/check-status/${taskId}`)
        if (!statusResponse.ok) {
          throw new Error("Failed to check status")
        }

        const taskData = await statusResponse.json()
        setCurrentTask(taskData)

        if (taskData.status === "SUCCEEDED") {
          setIsConverting(false)
        } else if (taskData.status === "FAILED") {
          setError("Conversion failed")
          setIsConverting(false)
        } else {
          setTimeout(pollStatus, 2000) // Poll every 2 seconds
        }
      }

      pollStatus()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setIsConverting(false)
    }
  }, [])

  return {
    isConverting,
    currentTask,
    error,
    convertImage,
  }
}
