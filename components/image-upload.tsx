"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, X, ImageIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ImageUploadProps {
  onImageSelect: (file: File) => void
  disabled?: boolean
}

export default function ImageUpload({ onImageSelect, disabled }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = () => setPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    multiple: false,
    disabled,
  })

  const handleConvert = () => {
    if (selectedFile) {
      onImageSelect(selectedFile)
    }
  }

  const clearSelection = () => {
    setPreview(null)
    setSelectedFile(null)
  }

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {preview ? (
            <div className="relative">
              <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-64 object-cover" />
              <Button
                variant="outline"
                size="sm"
                className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm"
                onClick={clearSelection}
                disabled={disabled}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div
              {...getRootProps()}
              className={`
                border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200
                ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"}
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center space-y-4">
                <div
                  className={`
                  p-4 rounded-full transition-colors duration-200
                  ${isDragActive ? "bg-blue-100" : "bg-gray-100"}
                `}
                >
                  {isDragActive ? (
                    <Upload className="h-8 w-8 text-blue-500" />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-gray-500" />
                  )}
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    {isDragActive ? "Drop your image here" : "Upload an image"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Drag & drop or click to select • PNG, JPG, JPEG, WebP</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedFile && (
        <Button onClick={handleConvert} disabled={disabled} className="w-full" size="lg">
          Convert to 3D Model
        </Button>
      )}
    </div>
  )
}
