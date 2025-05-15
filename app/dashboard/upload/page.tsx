import Link from "next/link"
import { ArrowLeft, FileAudio, FileVideo, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function UploadPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
              </svg>
              <span className="text-xl font-bold">Transcribly</span>
            </Link>
          </div>
          <nav className="hidden gap-6 md:flex">
            <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
              Dashboard
            </Link>
            <Link href="/dashboard/history" className="text-sm font-medium transition-colors hover:text-primary">
              History
            </Link>
            <Link href="/dashboard/settings" className="text-sm font-medium transition-colors hover:text-primary">
              Settings
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <span className="text-sm font-medium">JD</span>
              </div>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-8">
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Upload Media</h1>
                <p className="text-muted-foreground">Upload your audio or video files for transcription</p>
              </div>
              <Button asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
            </div>

            <Tabs defaultValue="upload" className="space-y-4">
              <TabsList>
                <TabsTrigger value="upload">Upload File</TabsTrigger>
                <TabsTrigger value="url">From URL</TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Upload Media File</CardTitle>
                    <CardDescription>Upload your audio or video file for transcription</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-10">
                      <div className="rounded-full bg-primary/10 p-4">
                        <Upload className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex flex-col items-center gap-1 text-center">
                        <p className="text-sm font-medium">Drag and drop your files here or click to browse</p>
                        <p className="text-xs text-muted-foreground">
                          Supports MP3, WAV, MP4, MOV and other common formats (max 500MB)
                        </p>
                      </div>
                      <Button>Select Files</Button>
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select defaultValue="en-US">
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
                        <Select defaultValue="srt">
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
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Start Transcription</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recently Uploaded</CardTitle>
                    <CardDescription>Your recently uploaded files</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg border">
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-4">
                            <div className="rounded-md bg-primary/10 p-2">
                              <FileVideo className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Product Demo.mp4</p>
                              <p className="text-xs text-muted-foreground">12 minutes • Uploaded 2 hours ago</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                              Processing
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border">
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-4">
                            <div className="rounded-md bg-primary/10 p-2">
                              <FileAudio className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Podcast Episode 42.mp3</p>
                              <p className="text-xs text-muted-foreground">28 minutes • Uploaded 1 day ago</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-600">
                              Completed
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="url" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Transcribe from URL</CardTitle>
                    <CardDescription>Enter a URL to an audio or video file for transcription</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="media-url">Media URL</Label>
                        <Input id="media-url" placeholder="https://example.com/video.mp4" />
                        <p className="text-xs text-muted-foreground">Enter a direct link to an audio or video file</p>
                      </div>

                      <Separator className="my-2" />

                      <div className="space-y-2">
                        <Label htmlFor="url-language">Language</Label>
                        <Select defaultValue="en-US">
                          <SelectTrigger id="url-language">
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
                        <Label htmlFor="url-output-format">Output Format</Label>
                        <Select defaultValue="srt">
                          <SelectTrigger id="url-output-format">
                            <SelectValue placeholder="Select output format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="srt">SRT (SubRip Text)</SelectItem>
                            <SelectItem value="vtt">VTT (Web Video Text Tracks)</SelectItem>
                            <SelectItem value="txt">Plain Text</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Start Transcription</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
