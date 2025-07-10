"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Loader2, CheckCircle, XCircle } from "lucide-react"

interface ProgressIndicatorProps {
  status: "PENDING" | "IN_PROGRESS" | "SUCCEEDED" | "FAILED"
  progress: number
}

export default function ProgressIndicator({ status, progress }: ProgressIndicatorProps) {
  const getStatusIcon = () => {
    switch (status) {
      case "SUCCEEDED":
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case "FAILED":
        return <XCircle className="h-6 w-6 text-red-500" />
      default:
        return <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "PENDING":
        return "Initializing conversion..."
      case "IN_PROGRESS":
        return "Converting image to 3D model..."
      case "SUCCEEDED":
        return "Conversion completed successfully!"
      case "FAILED":
        return "Conversion failed"
      default:
        return "Processing..."
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {getStatusIcon()}
          <span>Conversion Progress</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={progress} className="w-full" />
        <p className="text-sm text-gray-600">{getStatusText()}</p>
        <p className="text-xs text-gray-500">{progress}% complete</p>
      </CardContent>
    </Card>
  )
}
