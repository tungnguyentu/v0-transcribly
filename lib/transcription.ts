import { nanoid } from "nanoid"
import { query } from "@/lib/db"

export type TranscriptionOptions = {
  language: string
  outputFormat: "srt" | "vtt" | "txt"
  speakerDiarization?: boolean
  autoPunctuation?: boolean
  autoTimestamps?: boolean
}

export async function transcribeAudio(
  fileUrl: string,
  fileName: string,
  userId: number,
  options: TranscriptionOptions,
) {
  try {
    // Create a new transcription record in the database
    const transcriptionId = nanoid()

    await query(
      `INSERT INTO transcriptions 
       (id, user_id, file_name, file_url, status, language, format) 
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [transcriptionId, userId, fileName, fileUrl, "processing", options.language, options.outputFormat],
    )

    // In a real implementation, you would start an actual transcription process here
    // For now, we'll simulate a transcription by updating the record after a delay
    simulateTranscription(transcriptionId, userId, options)

    return { transcriptionId }
  } catch (error) {
    console.error("Error in transcribeAudio:", error)
    throw error
  }
}

// This function simulates a transcription process
async function simulateTranscription(transcriptionId: string, userId: number, options: TranscriptionOptions) {
  try {
    // Wait for a few seconds to simulate processing
    await new Promise((resolve) => setTimeout(resolve, 5000))

    // Generate mock transcription content based on options
    const content = generateMockTranscription(options)

    // Update the transcription record with the mock content
    await query(
      `UPDATE transcriptions 
       SET status = $1, content = $2, duration = $3, updated_at = NOW() 
       WHERE id = $4`,
      ["completed", content, Math.floor(Math.random() * 300) + 60, transcriptionId],
    )

    // Update the user's minutes used
    const duration = Math.floor(Math.random() * 5) + 1 // 1-5 minutes
    await query(
      `UPDATE user_profiles 
       SET minutes_used = minutes_used + $1 
       WHERE user_id = $2`,
      [duration, userId],
    )
  } catch (error) {
    console.error("Error in simulateTranscription:", error)

    // Update the transcription record with the error
    await query(
      `UPDATE transcriptions 
       SET status = $1, error = $2, updated_at = NOW() 
       WHERE id = $3`,
      ["failed", (error as Error).message, transcriptionId],
    )
  }
}

// Generate mock transcription content
function generateMockTranscription(options: TranscriptionOptions): string {
  const sentences = [
    "Hello and welcome to this presentation.",
    "Today we're going to discuss some important topics.",
    "First, let's talk about the main points.",
    "As you can see from the data, there's a clear trend.",
    "In conclusion, these findings have significant implications.",
    "Thank you for your attention.",
  ]

  if (options.outputFormat === "txt") {
    return sentences.join(" ")
  }

  if (options.outputFormat === "srt") {
    return sentences
      .map((sentence, index) => {
        const startTime = formatSrtTime(index * 5)
        const endTime = formatSrtTime(index * 5 + 4)
        const speaker = options.speakerDiarization ? `[Speaker ${(index % 2) + 1}]: ` : ""

        return `${index + 1}\n${startTime} --> ${endTime}\n${speaker}${sentence}\n`
      })
      .join("\n")
  }

  if (options.outputFormat === "vtt") {
    let vtt = "WEBVTT\n\n"

    vtt += sentences
      .map((sentence, index) => {
        const startTime = formatVttTime(index * 5)
        const endTime = formatVttTime(index * 5 + 4)
        const speaker = options.speakerDiarization ? `[Speaker ${(index % 2) + 1}]: ` : ""

        return `${index + 1}\n${startTime} --> ${endTime}\n${speaker}${sentence}\n`
      })
      .join("\n")

    return vtt
  }

  return "Transcription content"
}

function formatSrtTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)
  const millis = Math.floor((seconds % 1) * 1000)

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")},${String(millis).padStart(3, "0")}`
}

function formatVttTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)
  const millis = Math.floor((seconds % 1) * 1000)

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${String(millis).padStart(3, "0")}`
}
