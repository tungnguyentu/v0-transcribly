import Link from "next/link"
import { ArrowLeft, Download, FileAudio, FileVideo } from "lucide-react"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getTranscriptionById } from "@/app/actions/transcription-actions"
import { DashboardHeader } from "@/components/dashboard-header"
import { formatDistanceToNow } from "date-fns"

export default async function TranscriptionPage({ params }: { params: { id: string } }) {
  const result = await getTranscriptionById(params.id)

  if (result.error || !result.transcription) {
    notFound()
  }

  const transcription = result.transcription

  const getFileIcon = () => {
    const fileName = transcription.file_name.toLowerCase()
    if (
      fileName.endsWith(".mp3") ||
      fileName.endsWith(".wav") ||
      fileName.endsWith(".ogg") ||
      fileName.endsWith(".m4a")
    ) {
      return <FileAudio className="h-6 w-6 text-primary" />
    } else {
      return <FileVideo className="h-6 w-6 text-primary" />
    }
  }

  const getTimeAgo = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true })
    } catch (error) {
      return "Unknown time"
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

  // Function to create a downloadable file
  const getDownloadUrl = () => {
    const content = transcription.content || ""
    const extension = transcription.format || "txt"
    const fileName = transcription.file_name.split(".")[0] || "transcription"

    return `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <main className="flex-1">
        <div className="container py-8">
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Transcription Details</h1>
                <p className="text-muted-foreground">View and download your transcription</p>
              </div>
              <Button asChild>
                <Link href="/dashboard/history">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to History
                </Link>
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>File Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-md bg-primary/10 p-3">{getFileIcon()}</div>
                    <div>
                      <p className="font-medium">{transcription.file_name}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Duration:</span>
                      <span>{formatDuration(transcription.duration)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Language:</span>
                      <span>{transcription.language}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Format:</span>
                      <span>{transcription.format.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Created:</span>
                      <span>{getTimeAgo(transcription.created_at)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <a
                      href={getDownloadUrl()}
                      download={`${transcription.file_name.split(".")[0]}.${transcription.format}`}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download {transcription.format.toUpperCase()}
                    </a>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Transcription</CardTitle>
                  <CardDescription>The transcribed content of your media file</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border bg-muted/30 p-4">
                    <pre className="whitespace-pre-wrap text-sm font-mono">
                      {transcription.content || "No content available"}
                    </pre>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href={`/dashboard/transcription/${transcription.id}/edit`}>Edit Transcription</Link>
                  </Button>
                  <Button asChild>
                    <a
                      href={getDownloadUrl()}
                      download={`${transcription.file_name.split(".")[0]}.${transcription.format}`}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
