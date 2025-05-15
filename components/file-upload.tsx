"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, FileAudio, FileVideo, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { uploadAndTranscribe } from "@/app/actions/transcription-actions"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const [language, setLanguage] = useState("en-US")
  const [outputFormat, setOutputFormat] = useState("srt")
  const [speakerDiarization, setSpeakerDiarization] = useState(true)
  const [autoPunctuation, setAutoPunctuation] = useState(true)
  const [autoTimestamps, setAutoTimestamps] = useState(true)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (selectedFile: File) => {
    setError(null)
    setSuccess(null)

    // Basic validation
    const allowedTypes = [
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

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("File type not supported. Please upload an audio or video file.")
      return
    }

    if (selectedFile.size > 500 * 1024 * 1024) {
      // 500MB
      setError("File too large. Maximum size is 500MB.")
      return
    }

    setFile(selectedFile)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0])
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async () => {
    if (!file) {
      setError("Please select a file to upload")
      return
    }

    setIsUploading(true)
    setUploadProgress(0)
    setError(null)
    setSuccess(null)

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) {
            clearInterval(progressInterval)
            return 95
          }
          return prev + 5
        })
      }, 300)

      // Create form data
      const formData = new FormData()
      formData.append("file", file)
      formData.append("language", language)
      formData.append("outputFormat", outputFormat)

      if (speakerDiarization) formData.append("speakerDiarization", "on")
      if (autoPunctuation) formData.append("autoPunctuation", "on")
      if (autoTimestamps) formData.append("autoTimestamps", "on")

      // Upload and transcribe
      const result = await uploadAndTranscribe(formData)

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (result.error) {
        setError(result.error)
      } else {
        setSuccess(result.message || "File uploaded successfully! Transcription in progress.")

        // Reset form after successful upload
        setTimeout(() => {
          setFile(null)
          if (fileInputRef.current) {
            fileInputRef.current.value = ""
          }

          // Redirect to dashboard after a short delay
          setTimeout(() => {
            router.push("/dashboard")
            router.refresh()
          }, 1500)
        }, 1000)
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during upload")
    } finally {
      setIsUploading(false)
    }
  }

  const getFileIcon = () => {
    if (!file) return null

    if (file.type.startsWith("audio/")) {
      return <FileAudio className="h-8 w-8 text-primary" />
    } else if (file.type.startsWith("video/")) {
      return <FileVideo className="h-8 w-8 text-primary" />
    }

    return null
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardContent className="pt-6">
          <div
            className={`flex flex-col items-center justify-center gap-4 rounded-lg border ${
              isDragging ? "border-primary bg-primary/5" : "border-dashed"
            } p-10 transition-colors`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {!file ? (
              <>
                <div className="rounded-full bg-primary/10 p-4">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <p className="font-medium">Drag and drop your files here or click to browse</p>
                  <p className="text-xs text-muted-foreground">
                    Supports MP3, WAV, MP4, MOV and other common formats (max 500MB)
                  </p>
                </div>
                <Button onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
                  Select File
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="audio/*,video/*"
                  className="hidden"
                  onChange={handleFileInputChange}
                  disabled={isUploading}
                />
              </>
            ) : (
              <div className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-md bg-primary/10 p-3">{getFileIcon()}</div>
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={handleRemoveFile} disabled={isUploading}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {isUploading && (
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between text-xs">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-US">English (US)</SelectItem>
                  <SelectItem value="en-GB">English (UK)</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="ja">Japanese</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="output-format">Output Format</Label>
              <Select value={outputFormat} onValueChange={setOutputFormat}>
                <SelectTrigger id="output-format">
                  <SelectValue placeholder="Select output format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="srt">SRT (SubRip Text)</SelectItem>
                  <SelectItem value="vtt">VTT (Web Video Text Tracks)</SelectItem>
                  <SelectItem value="txt">Plain Text</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="speaker-diarization">Speaker Diarization</Label>
                <p className="text-sm text-muted-foreground">Identify and label different speakers</p>
              </div>
              <Switch id="speaker-diarization" checked={speakerDiarization} onCheckedChange={setSpeakerDiarization} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-punctuation">Automatic Punctuation</Label>
                <p className="text-sm text-muted-foreground">Add punctuation marks automatically</p>
              </div>
              <Switch id="auto-punctuation" checked={autoPunctuation} onCheckedChange={setAutoPunctuation} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-timestamps">Automatic Timestamps</Label>
                <p className="text-sm text-muted-foreground">Add timestamps at regular intervals</p>
              </div>
              <Switch id="auto-timestamps" checked={autoTimestamps} onCheckedChange={setAutoTimestamps} />
            </div>

            <Button className="w-full mt-4" onClick={handleSubmit} disabled={!file || isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Start Transcription"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
