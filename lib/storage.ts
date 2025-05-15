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

// Mock implementation that doesn't actually store files but returns a URL
export async function uploadFile(file: File, userId: string) {
  // Generate a unique filename
  const fileExtension = file.name.split(".").pop() || ""
  const uniqueFilename = `${nanoid()}.${fileExtension}`
  const path = `uploads/${userId}/${uniqueFilename}`

  // Instead of uploading to Blob, we'll create a mock URL
  // In a real implementation, you would store the file in a database or file system
  const mockUrl = `/api/files/${path}`

  return {
    url: mockUrl,
    path: path,
    filename: file.name,
    contentType: file.type,
    size: file.size,
  }
}

export async function deleteFile(path: string) {
  // Mock implementation - no actual deletion needed
  console.log(`Mock deletion of file: ${path}`)
  return true
}

export async function listUserFiles(userId: string) {
  // Mock implementation that returns an empty array
  // In a real implementation, you would query your database for files
  return []
}
