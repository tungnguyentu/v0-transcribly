import { put, del, list } from "@vercel/blob"
import { nanoid } from "nanoid"

// Define allowed file types
const ALLOWED_FILE_TYPES = [
  // Audio
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/ogg",
  "audio/x-m4a",
  "audio/webm",
  // Video
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "video/x-msvideo",
  "video/mpeg",
]

// Maximum file size (500MB)
const MAX_FILE_SIZE = 500 * 1024 * 1024

export type FileValidationResult = {
  valid: boolean
  error?: string
}

export function validateFile(file: File): FileValidationResult {
  if (!file) {
    return { valid: false, error: "No file provided" }
  }

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: "File type not supported. Please upload an audio or video file.",
    }
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: "File too large. Maximum size is 500MB.",
    }
  }

  return { valid: true }
}

export async function uploadFile(file: File, userId: string) {
  // Generate a unique filename
  const fileExtension = file.name.split(".").pop() || ""
  const uniqueFilename = `${nanoid()}.${fileExtension}`
  const path = `uploads/${userId}/${uniqueFilename}`

  // Upload to Vercel Blob
  const blob = await put(path, file, {
    access: "private",
    multipart: true,
  })

  return {
    url: blob.url,
    path: path,
    filename: file.name,
    contentType: file.type,
    size: file.size,
  }
}

export async function deleteFile(path: string) {
  await del(path)
}

export async function listUserFiles(userId: string) {
  const { blobs } = await list({
    prefix: `uploads/${userId}/`,
  })

  return blobs
}
