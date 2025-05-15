"use client"

import useSWR, { useSWRConfig } from "swr"
import { useState } from "react"

// Types
export interface Transcription {
  id: string
  file_name: string
  file_url: string
  status: string
  language: string
  format: string
  duration?: number
  created_at: string
  updated_at: string
  error?: string
  content?: string
}

export interface TranscriptionStats {
  minutesUsed: number
  minutesLimit: number
  completedCount: number
  percentageUsed: number
}

// API endpoints
const API_ENDPOINTS = {
  TRANSCRIPTIONS: "/api/transcriptions",
  TRANSCRIPTION: (id: string) => `/api/transcriptions/${id}`,
  STATS: "/api/transcriptions/stats",
}

// Hook for fetching all transcriptions
export function useTranscriptions(limit?: number) {
  const url = limit ? `${API_ENDPOINTS.TRANSCRIPTIONS}?limit=${limit}` : API_ENDPOINTS.TRANSCRIPTIONS

  const { data, error, isLoading, isValidating, mutate } = useSWR<{ transcriptions: Transcription[] }>(url)

  return {
    transcriptions: data?.transcriptions || [],
    isLoading,
    isError: error,
    isValidating,
    mutate,
  }
}

// Hook for fetching a single transcription
export function useTranscription(id: string) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<{ transcription: Transcription }>(
    id ? API_ENDPOINTS.TRANSCRIPTION(id) : null,
  )

  return {
    transcription: data?.transcription,
    isLoading,
    isError: error,
    isValidating,
    mutate,
  }
}

// Hook for fetching transcription stats
export function useTranscriptionStats() {
  const { data, error, isLoading, isValidating, mutate } = useSWR<{ stats: TranscriptionStats }>(API_ENDPOINTS.STATS)

  return {
    stats: data?.stats,
    isLoading,
    isError: error,
    isValidating,
    mutate,
  }
}

// Hook for uploading and transcribing a file with optimistic updates
export function useUploadTranscription() {
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const { mutate } = useSWRConfig()

  const upload = async (formData: FormData) => {
    setIsUploading(true)
    setProgress(0)
    setError(null)

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(progressInterval)
            return 95
          }
          return prev + 5
        })
      }, 300)

      const response = await fetch("/api/transcriptions/upload", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)
      setProgress(100)

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to upload file")
      }

      // Optimistically update the transcriptions list
      mutate(API_ENDPOINTS.TRANSCRIPTIONS)
      // Update stats
      mutate(API_ENDPOINTS.STATS)

      return result
    } catch (err: any) {
      setError(err.message || "An error occurred during upload")
      throw err
    } finally {
      setIsUploading(false)
    }
  }

  return {
    upload,
    isUploading,
    progress,
    error,
  }
}

// Hook for deleting a transcription with optimistic updates
export function useDeleteTranscription() {
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { mutate } = useSWRConfig()

  const deleteTranscription = async (id: string) => {
    setIsDeleting(true)
    setError(null)

    try {
      const response = await fetch(API_ENDPOINTS.TRANSCRIPTION(id), {
        method: "DELETE",
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete transcription")
      }

      // Optimistically update the transcriptions list
      mutate(API_ENDPOINTS.TRANSCRIPTIONS)
      // Update stats
      mutate(API_ENDPOINTS.STATS)

      return result
    } catch (err: any) {
      setError(err.message || "An error occurred during deletion")
      throw err
    } finally {
      setIsDeleting(false)
    }
  }

  return {
    deleteTranscription,
    isDeleting,
    error,
  }
}
