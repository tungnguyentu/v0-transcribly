"use client"
import { FileAudio, FileVideo, Trash2, MoreHorizontal, ExternalLink, Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useDeleteTranscription } from "@/hooks/use-transcriptions"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

interface TranscriptionItemProps {
  transcription: {
    id: string
    file_name: string
    file_url: string
    status: string
    created_at: string
    updated_at: string
    format: string
    duration?: number
    error?: string
  }
  onDelete?: () => void
}

export function TranscriptionItem({ transcription, onDelete }: TranscriptionItemProps) {
  const { deleteTranscription, isDeleting } = useDeleteTranscription()
  const router = useRouter()
  const { toast } = useToast()

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this transcription?")) {
      try {
        await deleteTranscription(transcription.id)
        toast({
          title: "Transcription deleted",
          description: "The transcription has been deleted successfully.",
        })
        if (onDelete) onDelete()
      } catch (error) {
        console.error("Error deleting transcription:", error)
        toast({
          title: "Error",
          description: "Failed to delete transcription. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const getFileIcon = () => {
    const fileName = transcription.file_name.toLowerCase()
    if (
      fileName.endsWith(".mp3") ||
      fileName.endsWith(".wav") ||
      fileName.endsWith(".ogg") ||
      fileName.endsWith(".m4a")
    ) {
      return <FileAudio className="h-5 w-5 text-primary" />
    } else {
      return <FileVideo className="h-5 w-5 text-primary" />
    }
  }

  const getStatusBadge = () => {
    switch (transcription.status) {
      case "completed":
        return (
          <div className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-600 dark:bg-green-900/20 dark:text-green-400">
            Completed
          </div>
        )
      case "processing":
        return (
          <div className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
            Processing
          </div>
        )
      case "failed":
        return (
          <div className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-600 dark:bg-red-900/20 dark:text-red-400">
            Failed
          </div>
        )
      default:
        return (
          <div className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
            {transcription.status}
          </div>
        )
    }
  }

  const formatDuration = (minutes?: number) => {
    if (!minutes) return "Unknown duration"

    if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? "s" : ""}`
    }

    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60

    if (remainingMinutes === 0) {
      return `${hours} hour${hours !== 1 ? "s" : ""}`
    }

    return `${hours} hour${hours !== 1 ? "s" : ""} ${remainingMinutes} minute${remainingMinutes !== 1 ? "s" : ""}`
  }

  const getTimeAgo = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true })
    } catch (error) {
      return "Unknown time"
    }
  }

  return (
    <div className="rounded-lg border bg-card transition-colors hover:bg-muted/10">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <div className="rounded-md bg-primary/10 p-2">{getFileIcon()}</div>
          <div>
            <p className="font-medium">{transcription.file_name}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{formatDuration(transcription.duration)}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {getTimeAgo(transcription.created_at)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge()}

          {transcription.status === "completed" && (
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/transcription/${transcription.id}`} prefetch={true}>
                View
              </Link>
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {transcription.status === "completed" && (
                <>
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/transcription/${transcription.id}`} prefetch={true}>
                      View Details
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/transcription/${transcription.id}/edit`} prefetch={true}>
                      Edit Subtitles
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href={transcription.file_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open Original File
                    </a>
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuItem onClick={handleDelete} disabled={isDeleting} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
