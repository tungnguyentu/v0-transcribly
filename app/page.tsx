import Link from "next/link"
import { ArrowRight, FileAudio, FileVideo, Languages, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="hero-section">
          <div className="container py-24 md:py-32">
            <div className="grid gap-10 md:grid-cols-2 md:gap-16">
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-4">
                  <h1 className="animate-fade-in">Transform Audio & Video into Perfect Subtitles</h1>
                  <p className="text-xl text-muted-foreground animate-fade-in opacity-0 [animation-delay:200ms]">
                    Upload your media files and get accurate SRT subtitles in minutes. Save time and reach a wider
                    audience.
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row animate-fade-in opacity-0 [animation-delay:400ms]">
                  <Button asChild size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link href="/signup">
                      Start Transcribing
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center animate-fade-in opacity-0 [animation-delay:600ms]">
                <div className="relative h-[350px] w-full max-w-[500px] overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 p-4 shadow-xl">
                  <div className="absolute left-4 top-4 right-4 h-8 rounded-md bg-background/80 backdrop-blur" />
                  <div className="absolute left-4 top-16 right-4 h-40 rounded-md bg-background/80 backdrop-blur" />
                  <div className="absolute left-4 top-60 right-4 h-16 rounded-md bg-background/80 backdrop-blur" />
                  <div className="absolute bottom-4 left-4 right-4 h-10 rounded-md bg-primary/20 backdrop-blur" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="container py-20 md:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Powerful Transcription Features
            </h2>
            <p className="max-w-[85%] text-xl text-muted-foreground">
              Everything you need to convert your audio and video files into perfect subtitles
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-3">
            <div className="group card-hover flex flex-col items-center gap-4 rounded-lg border p-6 text-center">
              <div className="feature-icon-container">
                <FileAudio className="feature-icon" />
              </div>
              <h3 className="text-xl font-bold">Audio Transcription</h3>
              <p className="text-muted-foreground">
                Upload MP3, WAV, M4A, and other audio formats for accurate transcription
              </p>
            </div>

            <div className="group card-hover flex flex-col items-center gap-4 rounded-lg border p-6 text-center">
              <div className="feature-icon-container">
                <FileVideo className="feature-icon" />
              </div>
              <h3 className="text-xl font-bold">Video Transcription</h3>
              <p className="text-muted-foreground">Support for MP4, MOV, AVI and other popular video formats</p>
            </div>

            <div className="group card-hover flex flex-col items-center gap-4 rounded-lg border p-6 text-center">
              <div className="feature-icon-container">
                <Languages className="feature-icon" />
              </div>
              <h3 className="text-xl font-bold">Multiple Languages</h3>
              <p className="text-muted-foreground">Transcribe content in over 30 languages with high accuracy</p>
            </div>

            <div className="group card-hover flex flex-col items-center gap-4 rounded-lg border p-6 text-center">
              <div className="feature-icon-container">
                <Sparkles className="feature-icon" />
              </div>
              <h3 className="text-xl font-bold">AI-Powered</h3>
              <p className="text-muted-foreground">
                Advanced AI models ensure high-quality transcriptions with minimal errors
              </p>
            </div>

            <div className="group card-hover flex flex-col items-center gap-4 rounded-lg border p-6 text-center">
              <div className="feature-icon-container">
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
                  className="feature-icon"
                >
                  <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />
                  <path d="M12 8v4l3 3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Fast Processing</h3>
              <p className="text-muted-foreground">Get your SRT files in minutes, not hours, even for longer content</p>
            </div>

            <div className="group card-hover flex flex-col items-center gap-4 rounded-lg border p-6 text-center">
              <div className="feature-icon-container">
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
                  className="feature-icon"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">SRT Format</h3>
              <p className="text-muted-foreground">
                Industry-standard SRT files compatible with all major video platforms
              </p>
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-accent py-20 md:py-32">
          <div className="container">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">Simple, Transparent Pricing</h2>
              <p className="max-w-[85%] text-xl text-muted-foreground">
                Choose the plan that works best for your transcription needs
              </p>
            </div>

            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-3">
              <div className="card-hover flex flex-col rounded-lg border bg-card p-8 shadow-sm">
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold">Free</h3>
                  <p className="text-muted-foreground">Perfect for trying out the service</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>
                <ul className="mt-8 space-y-3 text-sm">
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
                <div className="mt-auto pt-8">
                  <Button asChild className="w-full" variant="outline">
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </div>
              </div>

              <div className="card-hover relative flex flex-col rounded-lg border-2 border-primary bg-card p-8 shadow-md">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Popular
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold">Pro</h3>
                  <p className="text-muted-foreground">For content creators and small teams</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">$19</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>
                <ul className="mt-8 space-y-3 text-sm">
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
                <div className="mt-auto pt-8">
                  <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link href="/signup">Subscribe</Link>
                  </Button>
                </div>
              </div>

              <div className="card-hover flex flex-col rounded-lg border bg-card p-8 shadow-sm">
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold">Enterprise</h3>
                  <p className="text-muted-foreground">For businesses with high volume needs</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">Custom</span>
                  </div>
                </div>
                <ul className="mt-8 space-y-3 text-sm">
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
                    <span>Unlimited transcription</span>
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
                    <span>Highest accuracy</span>
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
                    <span>All supported languages</span>
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
                    <span>Dedicated support</span>
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
                    <span>API access</span>
                  </li>
                </ul>
                <div className="mt-auto pt-8">
                  <Button asChild className="w-full" variant="outline">
                    <Link href="/contact">Contact Sales</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-background to-accent/30 py-20 md:py-32">
          <div className="container">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
              <p className="max-w-[85%] text-xl text-muted-foreground">
                Join thousands of content creators who trust Transcribly for their subtitle needs
              </p>
              <Button asChild size="lg" className="mt-8 gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/signup">
                  Start Transcribing Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
