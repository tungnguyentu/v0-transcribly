"use server"

import { revalidatePath } from "next/cache"
import { getCurrentUser } from "@/lib/auth"
import { query } from "@/lib/db"
import { uploadFile, validateFile } from "@/lib/storage"
import { transcribeAudio, type TranscriptionOptions } from "@/lib/transcription"

export async function uploadAndTranscribe(formData: FormData) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { error: "You must be logged in to upload files" }
    }

    // Get the file from the form data
    const file = formData.get("file") as File
    if (!file) {
      return { error: "No file provided" }
    }

    // Validate the file
    const validation = validateFile(file)
    if (!validation.valid) {
      return { error: validation.error }
    }

    // Check if user has enough minutes left
    const profileResult = await query("SELECT minutes_used, minutes_limit FROM user_profiles WHERE user_id = $1", [
      user.id,
    ])

    if (!profileResult || profileResult.length === 0) {
      return { error: "User profile not found" }
    }

    const { minutes_used, minutes_limit } = profileResult[0]

    // Estimate file duration (in a real app, you'd analyze the file)
    // For now, we'll use a simple heuristic based on file size
    const estimatedMinutes = Math.ceil(file.size / (1024 * 1024 * 2)) // Roughly 2MB per minute

    if (minutes_used + estimatedMinutes > minutes_limit) {
      return {
        error: "You don't have enough minutes left in your plan. Please upgrade to continue.",
        minutesNeeded: estimatedMinutes,
        minutesLeft: minutes_limit - minutes_used,
      }
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

    // Revalidate the dashboard and history pages
    revalidatePath("/dashboard")
    revalidatePath("/dashboard/history")

    return {
      success: true,
      message: "File uploaded and transcription started",
      transcriptionId,
    }
  } catch (error: any) {
    console.error("Error in uploadAndTranscribe:", error)
    return { error: error.message || "Failed to upload and transcribe file" }
  }
}

export async function getTranscriptions(limit = 10, offset = 0) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { error: "You must be logged in to view transcriptions" }
    }

    const transcriptionsResult = await query(
      `SELECT id, file_name, file_url, status, language, format, duration, created_at, updated_at, error
       FROM transcriptions
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT $2 OFFSET $3`,
      [user.id, limit, offset],
    )

    return { transcriptions: transcriptionsResult || [] }
  } catch (error: any) {
    console.error("Error in getTranscriptions:", error)
    return { error: error.message || "Failed to get transcriptions" }
  }
}

export async function getTranscriptionById(id: string) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { error: "You must be logged in to view transcriptions" }
    }

    const transcriptionResult = await query(
      `SELECT id, file_name, file_url, content, status, language, format, duration, created_at, updated_at, error
       FROM transcriptions
       WHERE id = $1 AND user_id = $2`,
      [id, user.id],
    )

    if (!transcriptionResult || transcriptionResult.length === 0) {
      return { error: "Transcription not found" }
    }

    return { transcription: transcriptionResult[0] }
  } catch (error: any) {
    console.error("Error in getTranscriptionById:", error)
    return { error: error.message || "Failed to get transcription" }
  }
}

export async function deleteTranscription(id: string) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { error: "You must be logged in to delete transcriptions" }
    }

    // Get the transcription to check ownership
    const transcriptionResult = await query("SELECT id FROM transcriptions WHERE id = $1 AND user_id = $2", [
      id,
      user.id,
    ])

    if (!transcriptionResult || transcriptionResult.length === 0) {
      return { error: "Transcription not found or you don't have permission to delete it" }
    }

    // Delete the transcription
    await query("DELETE FROM transcriptions WHERE id = $1", [id])

    // Revalidate the dashboard and history pages
    revalidatePath("/dashboard")
    revalidatePath("/dashboard/history")

    return { success: true, message: "Transcription deleted successfully" }
  } catch (error: any) {
    console.error("Error in deleteTranscription:", error)
    return { error: error.message || "Failed to delete transcription" }
  }
}

export async function getUserTranscriptionStats() {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { error: "You must be logged in to view stats" }
    }

    // Get user profile with minutes used and limit
    const profileResult = await query("SELECT minutes_used, minutes_limit FROM user_profiles WHERE user_id = $1", [
      user.id,
    ])

    if (!profileResult || profileResult.length === 0) {
      return { error: "User profile not found" }
    }

    const { minutes_used, minutes_limit } = profileResult[0]

    // Get count of completed transcriptions
    const countResult = await query(
      "SELECT COUNT(*) as count FROM transcriptions WHERE user_id = $1 AND status = 'completed'",
      [user.id],
    )

    const completedCount = countResult[0]?.count || 0

    return {
      minutesUsed: minutes_used || 0,
      minutesLimit: minutes_limit || 0,
      completedCount,
      percentageUsed: minutes_limit > 0 ? Math.round((minutes_used / minutes_limit) * 100) : 0,
    }
  } catch (error: any) {
    console.error("Error in getUserTranscriptionStats:", error)
    return { error: error.message || "Failed to get user stats" }
  }
}
