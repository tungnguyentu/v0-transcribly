import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { query } from "@/lib/db"
import { uploadFile, validateFile } from "@/lib/storage"
import { transcribeAudio, type TranscriptionOptions } from "@/lib/transcription"

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()

    // Get the file from the form data
    const file = formData.get("file") as File
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate the file
    const validation = validateFile(file)
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    // Check if user has enough minutes left
    const profileResult = await query("SELECT minutes_used, minutes_limit FROM user_profiles WHERE user_id = $1", [
      user.id,
    ])

    if (!profileResult || profileResult.length === 0) {
      return NextResponse.json({ error: "User profile not found" }, { status: 404 })
    }

    const { minutes_used, minutes_limit } = profileResult[0]

    // Estimate file duration (in a real app, you'd analyze the file)
    // For now, we'll use a simple heuristic based on file size
    const estimatedMinutes = Math.ceil(file.size / (1024 * 1024 * 2)) // Roughly 2MB per minute

    if (minutes_used + estimatedMinutes > minutes_limit) {
      return NextResponse.json(
        {
          error: "You don't have enough minutes left in your plan. Please upgrade to continue.",
          minutesNeeded: estimatedMinutes,
          minutesLeft: minutes_limit - minutes_used,
        },
        { status: 403 },
      )
    }

    // Upload the file using our mock storage
    const uploadResult = await uploadFile(file, user.id.toString())

    // Get transcription options from form data
    const language = (formData.get("language") as string) || "en-US"
    const outputFormat = (formData.get("outputFormat") as "srt" | "vtt" | "txt") || "srt"
    const speakerDiarization = formData.get("speakerDiarization") === "on"
    const autoPunctuation = formData.get("autoPunctuation") === "on"
    const autoTimestamps = formData.get("autoTimestamps") === "on"

    const options: TranscriptionOptions = {
      language,
      outputFormat,
      speakerDiarization,
      autoPunctuation,
      autoTimestamps,
    }

    // Start the transcription process
    const { transcriptionId } = await transcribeAudio(uploadResult.url, uploadResult.filename, user.id, options)

    return NextResponse.json({
      success: true,
      message: "File uploaded and transcription started",
      transcriptionId,
    })
  } catch (error: any) {
    console.error("Error in POST /api/transcriptions/upload:", error)
    return NextResponse.json({ error: error.message || "Failed to upload and transcribe file" }, { status: 500 })
  }
}
