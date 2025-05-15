import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Headphones } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FileUpload } from "@/components/file-upload"

export default function UploadPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="flex items-center gap-2 transition-opacity hover:opacity-90">
              <div className="rounded-full bg-gradient-to-r from-primary to-primary/80 p-2">
                <Headphones className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                Transcribly
              </span>
            </Link>
          </div>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="/dashboard"
              className="relative px-1 py-2 text-sm font-medium transition-colors hover:text-primary text-foreground/70 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/history"
              className="relative px-1 py-2 text-sm font-medium transition-colors hover:text-primary text-foreground/70 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              History
            </Link>
            <Link
              href="/dashboard/settings"
              className="relative px-1 py-2 text-sm font-medium transition-colors hover:text-primary text-foreground/70 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              Settings
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full overflow-hidden border">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
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

            <FileUpload />
          </div>
        </div>
      </main>
    </div>
  )
}
