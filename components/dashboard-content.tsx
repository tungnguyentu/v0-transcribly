"use client"

import Link from "next/link"
import { FileAudio, Plus, Upload } from "lucide-react"
import { useTranscriptions, useTranscriptionStats } from "@/hooks/use-transcriptions"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TranscriptionItem } from "@/components/transcription-item"

export function DashboardContent() {
  const { stats } = useTranscriptionStats()
  const { transcriptions, isLoading } = useTranscriptions(3) // Get 3 most recent transcriptions

  const hasTranscriptions = transcriptions.length > 0

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Upload your media files and get accurate SRT subtitles in minutes.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transcription Minutes Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.minutesUsed || 0}/{stats?.minutesLimit || 0}
            </div>
            <p className="text-xs text-muted-foreground">{stats?.percentageUsed || 0}% of your monthly quota</p>
            <Progress value={stats?.percentageUsed || 0} className="mt-2" />
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Transcriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.completedCount || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.completedCount === 0
                ? "No transcriptions yet"
                : `${stats?.completedCount} transcription${stats?.completedCount !== 1 ? "s" : ""} completed`}
            </p>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Basic</div>
            <p className="text-xs text-muted-foreground">{stats?.minutesLimit || 0} minutes monthly limit</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/billing">Upgrade Plan</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Upload Media</CardTitle>
            <CardDescription>Upload your audio or video files to generate SRT subtitles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed bg-muted/30 p-10 transition-colors hover:bg-muted/50">
              <div className="rounded-full bg-primary/10 p-4">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <p className="text-sm font-medium">Drag and drop your files here or click to browse</p>
                <p className="text-xs text-muted-foreground">
                  Supports MP3, WAV, MP4, MOV and other common formats (max 500MB)
                </p>
              </div>
              <Button className="gap-2" asChild>
                <Link href="/dashboard/upload">
                  <Plus className="h-4 w-4" />
                  Select Files
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Recent Transcriptions</CardTitle>
            <CardDescription>Your recently processed media files</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="audio">Audio</TabsTrigger>
                <TabsTrigger value="video">Video</TabsTrigger>
              </TabsList>

              {hasTranscriptions ? (
                <TabsContent value="all" className="space-y-4">
                  {transcriptions.map((transcription) => (
                    <TranscriptionItem key={transcription.id} transcription={transcription} />
                  ))}
                </TabsContent>
              ) : (
                <TabsContent value="all" className="space-y-4">
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="rounded-full bg-muted p-6 mb-4">
                      <FileAudio className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">No transcriptions yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Upload your first audio or video file to get started
                    </p>
                    <Button asChild>
                      <Link href="/dashboard/upload">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Media
                      </Link>
                    </Button>
                  </div>
                </TabsContent>
              )}

              <TabsContent value="audio" className="space-y-4">
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="rounded-full bg-muted p-6 mb-4">
                    <FileAudio className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">No audio transcriptions yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">Upload your first audio file to get started</p>
                  <Button asChild>
                    <Link href="/dashboard/upload">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Audio
                    </Link>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="video" className="space-y-4">
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="rounded-full bg-muted p-6 mb-4">
                    <FileAudio className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">No video transcriptions yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">Upload your first video file to get started</p>
                  <Button asChild>
                    <Link href="/dashboard/upload">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Video
                    </Link>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/dashboard/history">View All Transcriptions</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
