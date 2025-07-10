import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ taskId: string }> }) {
  try {
    // Await params before destructuring
    const { taskId } = await params

    const response = await fetch(`https://api.meshy.ai/openapi/v1/image-to-3d/${taskId}`, {
      headers: {
        Authorization: `Bearer ${process.env.MESHY_API_KEY}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Meshy API error: ${response.statusText}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error checking status:", error)
    return NextResponse.json({ error: "Failed to check conversion status" }, { status: 500 })
  }
}