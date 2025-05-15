import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { query } from "@/lib/db"

// Cache configuration
export const dynamic = "force-dynamic" // Default to dynamic to ensure fresh data
export const revalidate = 60 // Revalidate every 60 seconds

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    const transcriptionResult = await query(
      `SELECT id, file_name, file_url, content, status, language, format, duration, created_at, updated_at, error
       FROM transcriptions
       WHERE id = $1 AND user_id = $2`,
      [id, user.id],
    )

    if (!transcriptionResult || transcriptionResult.length === 0) {
      return NextResponse.json({ error: "Transcription not found" }, { status: 404 })
    }

    return NextResponse.json({ transcription: transcriptionResult[0] })
  } catch (error: any) {
    console.error(`Error in GET /api/transcriptions/${params.id}:`, error)
    return NextResponse.json({ error: error.message || "Failed to get transcription" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    // Check if transcription exists and belongs to user
    const transcriptionResult = await query("SELECT id FROM transcriptions WHERE id = $1 AND user_id = $2", [
      id,
      user.id,
    ])

    if (!transcriptionResult || transcriptionResult.length === 0) {
      return NextResponse.json(
        { error: "Transcription not found or you don't have permission to delete it" },
        { status: 404 },
      )
    }

    // Delete the transcription
    await query("DELETE FROM transcriptions WHERE id = $1", [id])

    return NextResponse.json({ success: true, message: "Transcription deleted successfully" })
  } catch (error: any) {
    console.error(`Error in DELETE /api/transcriptions/${params.id}:`, error)
    return NextResponse.json({ error: error.message || "Failed to delete transcription" }, { status: 500 })
  }
}
