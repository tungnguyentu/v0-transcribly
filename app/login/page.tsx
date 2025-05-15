"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Headphones, CheckCircle } from "lucide-react"
import { loginUser } from "../actions/auth-actions"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { SiteHeader } from "@/components/site-header"

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Check for message parameter when the component mounts
  useEffect(() => {
    const message = searchParams.get("message")
    if (message) {
      setSuccess(decodeURIComponent(message))
    }
  }, [searchParams])

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const result = await loginUser(formData)

      if (result?.error) {
        setError(result.error)
        setIsLoading(false)
      } else if (result?.success && result?.redirectTo) {
        // Handle successful login with success message
        setSuccess("Login successful! Redirecting to dashboard...")

        // Set a delay before redirecting to show the success message
        // and allow the cookie to be properly set
        setTimeout(() => {
          router.push(result.redirectTo)
        }, 500)
      }
    } catch (err: any) {
      // Check if this is a redirect error (which is not a real error)
      if (err.message && (err.message.includes("NEXT_REDIRECT") || err.message.includes("Navigation cancelled"))) {
        // This is a redirect, not an actual error
        console.log("Redirect detected in error handler")
        return // Let Next.js handle the redirect
      }

      setError("An unexpected error occurred. Please try again.")
      console.error("Login error:", err)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader showAuth={false} />

      <div className="flex flex-1 items-center justify-center p-4 bg-gradient-to-b from-background to-accent/20">
        <Card className="mx-auto w-full max-w-md shadow-lg animate-fade-in">
          <CardHeader className="space-y-2 text-center">
            <div className="flex justify-center">
              <div className="flex items-center gap-2">
                <div className="rounded-md bg-primary p-1">
                  <Headphones className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">Transcribly</span>
              </div>
            </div>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>Enter your email and password to access your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive" className="animate-slide-in">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert
                variant="default"
                className="bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800 animate-slide-in"
              >
                <CheckCircle className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
            <form action={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input id="password" name="password" type="password" required className="bg-background" />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
