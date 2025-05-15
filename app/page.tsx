import Link from "next/link"
import { ArrowRight, FileAudio, FileVideo, Headphones, Languages, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-gradient-to-r from-primary to-primary/80 p-2">
              <Headphones className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Transcribly
            </span>
          </div>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="#features"
              className="relative px-1 py-2 text-sm font-medium transition-colors hover:text-primary text-foreground/70 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="relative px-1 py-2 text-sm font-medium transition-colors hover:text-primary text-foreground/70 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="relative px-1 py-2 text-sm font-medium transition-colors hover:text-primary text-foreground/70 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden text-sm font-medium transition-colors hover:text-primary md:block">
              Login
            </Link>
            <Button
              asChild
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            >
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-24 md:py-32">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Transform Audio & Video into Perfect Subtitles
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  Upload your media files and get accurate SRT subtitles in minutes. Save time and reach a wider
                  audience.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href="/signup">
                    Start Transcribing
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[500px]">
                <div className="absolute -z-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-4">
                    <div className="rounded-lg border bg-card p-4 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="rounded-md bg-primary/10 p-2">
                          <FileAudio className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Podcast.mp3</p>
                          <p className="text-xs text-muted-foreground">28 min • Completed</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="rounded-md bg-primary/10 p-2">
                          <FileVideo className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Tutorial.mp4</p>
                          <p className="text-xs text-muted-foreground">5 min • Processing</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="rounded-lg border bg-card p-4 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="rounded-md bg-primary/10 p-2">
                          <FileVideo className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Demo.mp4</p>
                          <p className="text-xs text-muted-foreground">12 min • Completed</p>
                        </div>
                      </div>
                    </div>
                    <div className="h-full rounded-lg border bg-card p-4 shadow-sm">
                      <div className="flex h-full flex-col justify-between">
                        <div className="flex items-center gap-3">
                          <div className="rounded-md bg-primary/10 p-2">
                            <Languages className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Transcription</p>
                            <p className="text-xs text-muted-foreground">Multiple languages</p>
                          </div>
                        </div>
                        <div className="mt-4 h-2 w-full rounded-full bg-muted">
                          <div className="h-2 w-3/4 rounded-full bg-primary"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="container py-20 md:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Powerful Transcription Features
            </h2>
            <p className="max-w-[85%] text-muted-foreground md:text-xl">
              Everything you need to convert your audio and video files into perfect subtitles
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-3">
            <div className="flex flex-col items-center gap-2 rounded-lg border p-6 text-center shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <FileAudio className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Audio Transcription</h3>
              <p className="text-sm text-muted-foreground">
                Upload MP3, WAV, M4A, and other audio formats for accurate transcription
              </p>
            </div>

            <div className="flex flex-col items-center gap-2 rounded-lg border p-6 text-center shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <FileVideo className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Video Transcription</h3>
              <p className="text-muted-foreground">Support for MP4, MOV, AVI and other popular video formats</p>
            </div>

            <div className="flex flex-col items-center gap-2 rounded-lg border p-6 text-center shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Languages className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Multiple Languages</h3>
              <p className="text-sm text-muted-foreground">
                Transcribe content in over 30 languages with high accuracy
              </p>
            </div>

            <div className="flex flex-col items-center gap-2 rounded-lg border p-6 text-center shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">AI-Powered</h3>
              <p className="text-sm text-muted-foreground">
                Advanced AI models ensure high-quality transcriptions with minimal errors
              </p>
            </div>

            <div className="flex flex-col items-center gap-2 rounded-lg border p-6 text-center shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
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
                  <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />
                  <path d="M12 8v4l3 3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Fast Processing</h3>
              <p className="text-sm text-muted-foreground">
                Get your SRT files in minutes, not hours, even for longer content
              </p>
            </div>

            <div className="flex flex-col items-center gap-2 rounded-lg border p-6 text-center shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
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
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">SRT Format</h3>
              <p className="text-sm text-muted-foreground">
                Industry-standard SRT files compatible with all major video platforms
              </p>
            </div>
          </div>
        </section>

        <section id="pricing" className="container py-20 md:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">Simple, Transparent Pricing</h2>
            <p className="max-w-[85%] text-muted-foreground md:text-xl">
              Choose the plan that works best for your transcription needs
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2">
            <div className="flex flex-col rounded-lg border p-6 shadow-sm">
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-bold">Basic</h3>
                <p className="text-sm text-muted-foreground">Perfect for trying out the service</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
              <ul className="mt-6 space-y-2 text-sm">
                <li className="flex items-center gap-2">
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
                    className="h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>10 minutes of transcription per month</span>
                </li>
                <li className="flex items-center gap-2">
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
                    className="h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Standard accuracy</span>
                </li>
                <li className="flex items-center gap-2">
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
                    className="h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>5 supported languages</span>
                </li>
              </ul>
              <div className="mt-auto pt-6">
                <Button asChild className="w-full" variant="outline">
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            </div>

            <div className="flex flex-col rounded-lg border border-primary p-6 shadow-md">
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-bold">Pro</h3>
                <p className="text-sm text-muted-foreground">For content creators and small teams</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$19</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
              <ul className="mt-6 space-y-2 text-sm">
                <li className="flex items-center gap-2">
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
                    className="h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>5 hours of transcription per month</span>
                </li>
                <li className="flex items-center gap-2">
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
                    className="h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>High accuracy</span>
                </li>
                <li className="flex items-center gap-2">
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
                    className="h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>20 supported languages</span>
                </li>
                <li className="flex items-center gap-2">
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
                    className="h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Priority processing</span>
                </li>
              </ul>
              <div className="mt-auto pt-6">
                <Button asChild className="w-full">
                  <Link href="/signup">Subscribe</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted/50 py-20 md:py-24">
          <div className="container">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
              <p className="max-w-[85%] text-muted-foreground md:text-xl">
                Join thousands of content creators who trust Transcribly for their subtitle needs
              </p>
              <Button asChild size="lg" className="mt-4">
                <Link href="/signup">
                  Start Transcribing Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 md:py-12">
        <div className="container flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Headphones className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">Transcribly</span>
            </div>
            <p className="text-sm text-muted-foreground">Transform audio and video into perfect subtitles</p>
          </div>
          <div className="grid grid-cols-2 gap-12 sm:grid-cols-3 md:gap-8">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">Product</h3>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#features" className="transition-colors hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="transition-colors hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="transition-colors hover:text-foreground">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">Company</h3>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="transition-colors hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="transition-colors hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="transition-colors hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">Legal</h3>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/privacy" className="transition-colors hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="transition-colors hover:text-foreground">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container mt-8 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Transcribly. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
