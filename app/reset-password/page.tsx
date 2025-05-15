"use client"

import { useState } from "react"
import Link from "next/link"
import { Headphones } from "lucide-react"
import { resetPasswordWithToken } from "../actions/auth-actions"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token?: string }
}) {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const token = searchParams.token

  if (!token) {
    return (
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1 items-center justify-center p-4">
          <Card className="mx-auto w-full max-w-md">
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-2xl">Invalid Reset Link</CardTitle>
              <CardDescription>The password reset link is invalid or has expired.</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center">
              <Button asChild>
                <Link href="/forgot-password">Request New Reset Link</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    // Add the token to the form data
    formData.append("token", token)

    try {
      const result = await resetPasswordWithToken(formData)

      if (result?.error) {
        setError(result.error)
      } else if (result?.success) {
        setSuccess(result.message)
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 items-center justify-center p-4">
        <Card className="mx-auto w-full max-w-md">
          <CardHeader className="space-y-2 text-center">
            <div className="flex justify-center">
              <div className="flex items-center gap-2">
                <Headphones className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Transcribly</span>
              </div>
            </div>
            <CardTitle className="text-2xl">Create new password</CardTitle>
            <CardDescription>Enter a new password for your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success ? (
              <div className="space-y-4">
                <Alert>
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
                <Button asChild className="w-full">
                  <Link href="/login">Go to Login</Link>
                </Button>
              </div>
            ) : (
              <form action={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <Input id="password" name="password" type="password" required />
                  <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" name="confirm-password" type="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Resetting..." : "Reset Password"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
