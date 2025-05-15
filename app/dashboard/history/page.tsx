import Link from "next/link"
import { ArrowLeft, ArrowRight, FileAudio, FileVideo, MoreHorizontal, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HistoryPage() {
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
            <Link href="/dashboard/history" className="text-sm font-medium text-primary">
              History
            </Link>
            <Link href="/dashboard/settings" className="text-sm font-medium transition-colors hover:text-primary">
              Settings
            </Link>
          </nav>
          <div className="flex items-center gap-4">
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
                      <Input type="search" placeholder="Search transcriptions..." className="w-full pl-8" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Select defaultValue="newest">
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
                    <TabsContent value="all" className="space-y-4 pt-4">
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

                      <div className="rounded-lg border">
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-4">
                            <div className="rounded-md bg-primary/10 p-2">
                              <FileAudio className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Interview Recording.wav</p>
                              <p className="text-xs text-muted-foreground">45 minutes • Completed 1 week ago</p>
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
                              <p className="font-medium">Marketing Video.mp4</p>
                              <p className="text-xs text-muted-foreground">8 minutes • Completed 2 weeks ago</p>
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

                    <TabsContent value="audio" className="space-y-4 pt-4">
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
                              <FileAudio className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Interview Recording.wav</p>
                              <p className="text-xs text-muted-foreground">45 minutes • Completed 1 week ago</p>
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

                    <TabsContent value="video" className="space-y-4 pt-4">
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

                      <div className="rounded-lg border">
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-4">
                            <div className="rounded-md bg-primary/10 p-2">
                              <FileVideo className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Marketing Video.mp4</p>
                              <p className="text-xs text-muted-foreground">8 minutes • Completed 2 weeks ago</p>
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

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Showing 5 of 12 transcriptions</div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" disabled>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Previous
                      </Button>
                      <Button variant="outline" size="sm">
                        Next
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
