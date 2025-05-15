import Link from "next/link"
import { FileAudio, FileVideo, MoreHorizontal, Plus, Settings, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
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
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <span className="text-sm font-medium">JD</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/dashboard/profile" className="flex w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/dashboard/settings" className="flex w-full">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/logout" className="flex w-full">
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-8">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Upload your media files and get accurate SRT subtitles in minutes.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Transcription Minutes Used</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45/300</div>
                  <p className="text-xs text-muted-foreground">15% of your monthly quota</p>
                  <Progress value={15} className="mt-2" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed Transcriptions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+3 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Pro</div>
                  <p className="text-xs text-muted-foreground">5 hours monthly limit</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/dashboard/billing">Manage Subscription</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Media</CardTitle>
                  <CardDescription>Upload your audio or video files to generate SRT subtitles</CardDescription>
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
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Select Files
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
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
                    <TabsContent value="all" className="space-y-4">
                      <div className="rounded-lg border">
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-4">
                            <div className="rounded-md bg-primary/10 p-2">
                              <FileVideo className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Product Demo.mp4</p>
                              <p className="text-xs text-muted-foreground">12 minutes • Completed 2 hours ago</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              Download SRT
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">More</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Subtitles</DropdownMenuItem>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
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
                              <p className="text-xs text-muted-foreground">28 minutes • Completed 1 day ago</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              Download SRT
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">More</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Subtitles</DropdownMenuItem>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border">
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-4">
                            <div className="rounded-md bg-primary/10 p-2">
                              <FileVideo className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Tutorial Video.mp4</p>
                              <p className="text-xs text-muted-foreground">5 minutes • Completed 3 days ago</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              Download SRT
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">More</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Subtitles</DropdownMenuItem>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="audio" className="space-y-4">
                      <div className="rounded-lg border">
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-4">
                            <div className="rounded-md bg-primary/10 p-2">
                              <FileAudio className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Podcast Episode 42.mp3</p>
                              <p className="text-xs text-muted-foreground">28 minutes • Completed 1 day ago</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              Download SRT
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">More</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Subtitles</DropdownMenuItem>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="video" className="space-y-4">
                      <div className="rounded-lg border">
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-4">
                            <div className="rounded-md bg-primary/10 p-2">
                              <FileVideo className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Product Demo.mp4</p>
                              <p className="text-xs text-muted-foreground">12 minutes • Completed 2 hours ago</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              Download SRT
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">More</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Subtitles</DropdownMenuItem>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border">
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-4">
                            <div className="rounded-md bg-primary/10 p-2">
                              <FileVideo className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Tutorial Video.mp4</p>
                              <p className="text-xs text-muted-foreground">5 minutes • Completed 3 days ago</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              Download SRT
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">More</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Subtitles</DropdownMenuItem>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
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
        </div>
      </main>
    </div>
  )
}
