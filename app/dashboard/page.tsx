import Link from "next/link"
import { FileAudio, FileVideo, MoreHorizontal, Plus, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <main className="flex-1">
        <div className="container py-8 md:py-12">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Upload your media files and get accurate SRT subtitles in minutes.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="dashboard-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Transcription Minutes Used</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45/300</div>
                  <p className="text-xs text-muted-foreground">15% of your monthly quota</p>
                  <Progress value={15} className="mt-2" />
                </CardContent>
              </Card>
              <Card className="dashboard-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed Transcriptions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+3 from last month</p>
                </CardContent>
              </Card>
              <Card className="dashboard-card">
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
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Select Files
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
                    <TabsContent value="all" className="space-y-4">
                      <div className="rounded-lg border bg-card transition-colors hover:bg-muted/10">
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

                      <div className="rounded-lg border bg-card transition-colors hover:bg-muted/10">
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

                      <div className="rounded-lg border bg-card transition-colors hover:bg-muted/10">
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
                      <div className="rounded-lg border bg-card transition-colors hover:bg-muted/10">
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
                      <div className="rounded-lg border bg-card transition-colors hover:bg-muted/10">
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

                      <div className="rounded-lg border bg-card transition-colors hover:bg-muted/10">
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
