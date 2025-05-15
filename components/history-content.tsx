"use client"

import Link from "next/link"
import { ArrowLeft, FileAudio, Search, Upload } from "lucide-react"
import { useState } from "react"
import { useTranscriptions } from "@/hooks/use-transcriptions"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TranscriptionItem } from "@/components/transcription-item"

export function HistoryContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState("newest")

  const { transcriptions, isLoading, mutate } = useTranscriptions(50)

  const hasTranscriptions = transcriptions.length > 0

  // Filter transcriptions by type and search term
  const filteredTranscriptions = transcriptions.filter((t) => {
    return t.file_name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const audioTranscriptions = filteredTranscriptions.filter((t) => {
    const fileName = t.file_name.toLowerCase()
    return (
      fileName.endsWith(".mp3") || fileName.endsWith(".wav") || fileName.endsWith(".ogg") || fileName.endsWith(".m4a")
    )
  })

  const videoTranscriptions = filteredTranscriptions.filter((t) => {
    const fileName = t.file_name.toLowerCase()
    return (
      fileName.endsWith(".mp4") || fileName.endsWith(".mov") || fileName.endsWith(".avi") || fileName.endsWith(".webm")
    )
  })

  // Sort transcriptions based on sort order
  const sortTranscriptions = (transcriptions: any[]) => {
    return [...transcriptions].sort((a, b) => {
      switch (sortOrder) {
        case "oldest":
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        case "name-asc":
          return a.file_name.localeCompare(b.file_name)
        case "name-desc":
          return b.file_name.localeCompare(a.file_name)
        case "duration":
          return (b.duration || 0) - (a.duration || 0)
        case "newest":
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      }
    })
  }

  const sortedAllTranscriptions = sortTranscriptions(filteredTranscriptions)
  const sortedAudioTranscriptions = sortTranscriptions(audioTranscriptions)
  const sortedVideoTranscriptions = sortTranscriptions(videoTranscriptions)

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Transcription History</h1>
          <p className="text-muted-foreground">View and manage all your transcription files</p>
        </div>
        <Button asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Transcriptions</CardTitle>
          <CardDescription>Browse and search through your transcription history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search transcriptions..."
                  className="w-full pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest first</SelectItem>
                    <SelectItem value="oldest">Oldest first</SelectItem>
                    <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                    <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="audio">Audio</TabsTrigger>
                <TabsTrigger value="video">Video</TabsTrigger>
              </TabsList>

              {hasTranscriptions ? (
                <>
                  <TabsContent value="all" className="space-y-4 pt-4">
                    {sortedAllTranscriptions.length > 0 ? (
                      sortedAllTranscriptions.map((transcription) => (
                        <TranscriptionItem
                          key={transcription.id}
                          transcription={transcription}
                          onDelete={() => mutate()}
                        />
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="rounded-full bg-muted p-6 mb-4">
                          <FileAudio className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium mb-1">No matching transcriptions</h3>
                        <p className="text-sm text-muted-foreground mb-4">Try adjusting your search or filters</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="audio" className="space-y-4 pt-4">
                    {sortedAudioTranscriptions.length > 0 ? (
                      sortedAudioTranscriptions.map((transcription) => (
                        <TranscriptionItem
                          key={transcription.id}
                          transcription={transcription}
                          onDelete={() => mutate()}
                        />
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="rounded-full bg-muted p-6 mb-4">
                          <FileAudio className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium mb-1">No audio transcriptions</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          You haven't created any audio transcriptions yet
                        </p>
                        <Button asChild>
                          <Link href="/dashboard/upload">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Audio
                          </Link>
                        </Button>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="video" className="space-y-4 pt-4">
                    {sortedVideoTranscriptions.length > 0 ? (
                      sortedVideoTranscriptions.map((transcription) => (
                        <TranscriptionItem
                          key={transcription.id}
                          transcription={transcription}
                          onDelete={() => mutate()}
                        />
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="rounded-full bg-muted p-6 mb-4">
                          <FileAudio className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium mb-1">No video transcriptions</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          You haven't created any video transcriptions yet
                        </p>
                        <Button asChild>
                          <Link href="/dashboard/upload">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Video
                          </Link>
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                </>
              ) : (
                <TabsContent value="all" className="space-y-4 pt-4">
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-muted p-6 mb-4">
                      <FileAudio className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">No transcription history</h3>
                    <p className="text-sm text-muted-foreground mb-4">You haven't created any transcriptions yet</p>
                    <Button asChild>
                      <Link href="/dashboard/upload">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Media
                      </Link>
                    </Button>
                  </div>
                </TabsContent>
              )}
            </Tabs>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {filteredTranscriptions.length > 0
                  ? `Showing ${filteredTranscriptions.length} transcription${filteredTranscriptions.length !== 1 ? "s" : ""}`
                  : "No transcriptions to display"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
