import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { query } from "./db"

export type TranscriptionOptions = {
  language?: string
  outputFormat?: "srt" | "vtt" | "txt"
  speakerDiarization?: boolean
  autoPunctuation?: boolean
  autoTimestamps?: boolean
}

export type TranscriptionResult = {
  id: string
  text: string
  format: string
  duration: number
  completed: boolean
  error?: string
}

export async function transcribeAudio(
  fileUrl: string,
  fileName: string,
  userId: number,
  options: TranscriptionOptions = {},
) {
  try {
    // Insert a pending transcription record
    const insertResult = await query(
      `INSERT INTO transcriptions 
       (user_id, file_name, file_url, status, language, format, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, NOW()) 
       RETURNING id`,
      [userId, fileName, fileUrl, "processing", options.language || "en-US", options.outputFormat || "srt"],
    )

    const transcriptionId = insertResult[0].id

    // Start the transcription process asynchronously
    processTranscription(transcriptionId, fileUrl, options).catch((error) => {
      console.error("Transcription error:", error)
      // Update the transcription record with the error
      query(
        `UPDATE transcriptions 
         SET status = 'failed', error = $1, updated_at = NOW() 
         WHERE id = $2`,
        [error.message, transcriptionId],
      )
    })

    return { transcriptionId }
  } catch (error) {
    console.error("Error starting transcription:", error)
    throw error
  }
}

async function processTranscription(transcriptionId: string, fileUrl: string, options: TranscriptionOptions) {
  try {
    // Update minutes used for the user
    await updateMinutesUsed(transcriptionId)

    // For audio files, use OpenAI's Whisper model via the AI SDK
    const prompt = `Transcribe the following audio file. ${
      options.language ? `The language is ${options.language}.` : ""
    } ${options.speakerDiarization ? "Please identify different speakers." : ""} ${
      options.autoPunctuation ? "Include proper punctuation." : ""
    } ${options.autoTimestamps ? "Include timestamps at regular intervals." : ""}`

    // Use AI SDK to transcribe the audio
    const { text } = await generateText({
      model: openai("whisper-1"),
      prompt: prompt,
      audio: fileUrl,
    })

    // Format the transcription based on the requested output format
    const formattedText = formatTranscription(text, options.outputFormat || "srt")

    // Update the transcription record with the result
    await query(
      `UPDATE transcriptions 
       SET status = 'completed', content = $1, updated_at = NOW() 
       WHERE id = $2`,
      [formattedText, transcriptionId],
    )

    return { success: true, transcriptionId }
  } catch (error) {
    console.error("Error processing transcription:", error)

    // Update the transcription record with the error
    await query(
      `UPDATE transcriptions 
       SET status = 'failed', error = $1, updated_at = NOW() 
       WHERE id = $2`,
      [error.message, transcriptionId],
    )

    throw error
  }
}

function formatTranscription(text: string, format: string): string {
  // Basic implementation - in a real app, you'd have more sophisticated formatting
  switch (format) {
    case "srt":
      return convertToSRT(text)
    case "vtt":
      return convertToVTT(text)
    case "txt":
    default:
      return text
  }
}

function convertToSRT(text: string): string {
  // Simple SRT conversion - in a real app, this would be more sophisticated
  const lines = text.split("\n")
  let srt = ""

  lines.forEach((line, index) => {
    if (line.trim()) {
      const startTime = formatSRTTime(index * 5) // 5 seconds per line as a placeholder
      const endTime = formatSRTTime(index * 5 + 4)

      srt += `${index + 1}\n`
      srt += `${startTime} --> ${endTime}\n`
      srt += `${line}\n\n`
    }
  })

  return srt
}

function convertToVTT(text: string): string {
  // Simple VTT conversion
  const lines = text.split("\n")
  let vtt = "WEBVTT\n\n"

  lines.forEach((line, index) => {
    if (line.trim()) {
      const startTime = formatVTTTime(index * 5)
      const endTime = formatVTTTime(index * 5 + 4)

      vtt += `${index + 1}\n`
      vtt += `${startTime} --> ${endTime}\n`
      vtt += `${line}\n\n`
    }
  })

  return vtt
}

function formatSRTTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)
  const ms = Math.floor((seconds % 1) * 1000)

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")},${String(ms).padStart(3, "0")}`
}

function formatVTTTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)
  const ms = Math.floor((seconds % 1) * 1000)

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${String(ms).padStart(3, "0")}`
}

async function updateMinutesUsed(transcriptionId: string) {
  // Get the transcription details
  const transcriptionResult = await query("SELECT user_id, file_url FROM transcriptions WHERE id = $1", [
    transcriptionId,
  ])

  if (!transcriptionResult || transcriptionResult.length === 0) {
    return
  }

  const userId = transcriptionResult[0].user_id

  // In a real implementation, you would calculate the actual duration of the audio/video
  // For now, we'll use a placeholder value of 5 minutes
  const durationMinutes = 5

  // Update the user's usage
  await query(
    `UPDATE user_profiles 
     SET minutes_used = minutes_used + $1, updated_at = NOW() 
     WHERE user_id = $2`,
    [durationMinutes, userId],
  )
}
