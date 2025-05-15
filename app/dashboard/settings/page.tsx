"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, CreditCard, HelpCircle, Languages, User, Headphones } from "lucide-react"
import { getUserProfile, updateUserProfile } from "@/app/actions/profile-actions"
import { updateUserPassword } from "@/app/actions/auth-actions"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SettingsPage() {
  const [profileData, setProfileData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [profileError, setProfileError] = useState<string | null>(null)
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  // Helper function to safely get notification preference
  const getNotificationPreference = (preferenceName: string): boolean => {
    try {
      const preferences = profileData?.profile?.notification_preferences
      if (!preferences) return false

      // If it's already an object, use it directly
      if (typeof preferences === "object") {
        return preferences[preferenceName] || false
      }

      // If it's a string, try to parse it
      if (typeof preferences === "string") {
        return JSON.parse(preferences)[preferenceName] || false
      }

      return false
    } catch (error) {
      console.error("Error parsing notification preferences:", error)
      return false
    }
  }

  useEffect(() => {
    async function loadProfile() {
      try {
        const result = await getUserProfile()
        if (result.error) {
          setProfileError(result.error)
        } else {
          setProfileData(result)
        }
      } catch (error) {
        setProfileError("Failed to load profile data")
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  async function handleProfileUpdate(formData: FormData) {
    setIsUpdating(true)
    setProfileError(null)
    setProfileSuccess(null)

    try {
      const result = await updateUserProfile(formData)

      if (result?.error) {
        setProfileError(result.error)
      } else if (result?.success) {
        setProfileSuccess(result.message)
        // Refresh profile data
        const updatedProfile = await getUserProfile()
        if (!updatedProfile.error) {
          setProfileData(updatedProfile)
        }
      }
    } catch (error) {
      setProfileError("An unexpected error occurred")
    } finally {
      setIsUpdating(false)
    }
  }

  async function handlePasswordUpdate(formData: FormData) {
    setIsUpdating(true)
    setPasswordError(null)
    setPasswordSuccess(null)

    try {
      const result = await updateUserPassword(formData)

      if (result?.error) {
        setPasswordError(result.error)
      } else if (result?.success) {
        setPasswordSuccess(result.message)
        // Clear password fields
        const form = document.getElementById("password-form") as HTMLFormElement
        if (form) form.reset()
      }
    } catch (error) {
      setPasswordError("An unexpected error occurred")
    } finally {
      setIsUpdating(false)
    }
  }

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
              className="relative px-1 py-2 text-sm font-medium transition-colors hover:text-primary text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary"
            >
              Settings
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/logout">
              <Button variant="ghost" size="sm">
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-8">
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your account settings and preferences</p>
              </div>
              <Button asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
            </div>

            {loading ? (
              <div className="flex justify-center py-8">
                <p>Loading your profile...</p>
              </div>
            ) : (
              <Tabs defaultValue="account" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="account" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Account</span>
                  </TabsTrigger>
                  <TabsTrigger value="billing" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Billing</span>
                  </TabsTrigger>
                  <TabsTrigger value="transcription" className="flex items-center gap-2">
                    <Languages className="h-4 w-4" />
                    <span>Transcription</span>
                  </TabsTrigger>
                  <TabsTrigger value="help" className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4" />
                    <span>Help</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="account" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Information</CardTitle>
                      <CardDescription>Update your account details and preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {profileError && (
                        <Alert variant="destructive">
                          <AlertDescription>{profileError}</AlertDescription>
                        </Alert>
                      )}
                      {profileSuccess && (
                        <Alert>
                          <AlertDescription>{profileSuccess}</AlertDescription>
                        </Alert>
                      )}
                      <form action={handleProfileUpdate} className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="first-name">First name</Label>
                            <Input
                              id="first-name"
                              name="first-name"
                              defaultValue={profileData?.user?.firstName || ""}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="last-name">Last name</Label>
                            <Input id="last-name" name="last-name" defaultValue={profileData?.user?.lastName || ""} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" name="email" type="email" defaultValue={profileData?.user?.email || ""} />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="email-notifications">Email notifications</Label>
                            <p className="text-sm text-muted-foreground">
                              Receive email notifications when your transcriptions are complete
                            </p>
                          </div>
                          <Switch
                            id="email-notifications"
                            name="email-notifications"
                            defaultChecked={getNotificationPreference("email")}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="marketing-emails">Marketing emails</Label>
                            <p className="text-sm text-muted-foreground">
                              Receive emails about new features and special offers
                            </p>
                          </div>
                          <Switch
                            id="marketing-emails"
                            name="marketing-emails"
                            defaultChecked={getNotificationPreference("marketing")}
                          />
                        </div>
                        <Button type="submit" disabled={isUpdating}>
                          {isUpdating ? "Saving..." : "Save Changes"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Change Password</CardTitle>
                      <CardDescription>Update your password</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {passwordError && (
                        <Alert variant="destructive">
                          <AlertDescription>{passwordError}</AlertDescription>
                        </Alert>
                      )}
                      {passwordSuccess && (
                        <Alert>
                          <AlertDescription>{passwordSuccess}</AlertDescription>
                        </Alert>
                      )}
                      <form id="password-form" action={handlePasswordUpdate} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current password</Label>
                          <Input id="current-password" name="current-password" type="password" required />
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="new-password">New password</Label>
                            <Input id="new-password" name="new-password" type="password" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm password</Label>
                            <Input id="confirm-password" name="confirm-password" type="password" required />
                          </div>
                        </div>
                        <Button type="submit" disabled={isUpdating}>
                          {isUpdating ? "Updating..." : "Update Password"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="billing" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Subscription Plan</CardTitle>
                      <CardDescription>Manage your subscription and billing details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">Basic Plan</p>
                            <p className="text-sm text-muted-foreground">
                              Free • 10 minutes of transcription per month
                            </p>
                          </div>
                          <div className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                            Active
                          </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="space-y-1">
                          <p className="text-sm">No billing information</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Change Plan</Label>
                        <RadioGroup defaultValue="basic">
                          <div className="flex items-center space-x-2 rounded-lg border border-primary bg-primary/5 p-4">
                            <RadioGroupItem value="basic" id="basic" />
                            <Label htmlFor="basic" className="flex flex-col">
                              <span>Basic Plan</span>
                              <span className="text-sm font-normal text-muted-foreground">
                                10 minutes of transcription per month
                              </span>
                            </Label>
                            <div className="ml-auto font-medium">$0/month</div>
                          </div>
                          <div className="flex items-center space-x-2 rounded-lg border p-4">
                            <RadioGroupItem value="pro" id="pro" />
                            <Label htmlFor="pro" className="flex flex-col">
                              <span>Pro Plan</span>
                              <span className="text-sm font-normal text-muted-foreground">
                                5 hours of transcription per month
                              </span>
                            </Label>
                            <div className="ml-auto font-medium">$19/month</div>
                          </div>
                        </RadioGroup>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start gap-2 sm:flex-row sm:justify-between">
                      <Button variant="outline">Update Payment Method</Button>
                      <Button>Update Subscription</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Billing History</CardTitle>
                      <CardDescription>View your past invoices and payment history</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                          <p className="text-sm text-muted-foreground">No billing history available</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="transcription" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Transcription Settings</CardTitle>
                      <CardDescription>Configure your transcription preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="default-language">Default Language</Label>
                        <Select defaultValue="en-US">
                          <SelectTrigger id="default-language">
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
                        <Label htmlFor="accuracy-level">Accuracy Level</Label>
                        <Select defaultValue="high">
                          <SelectTrigger id="accuracy-level">
                            <SelectValue placeholder="Select accuracy level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="highest">Highest</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          Higher accuracy levels may take longer to process
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="speaker-diarization">Speaker Diarization</Label>
                          <p className="text-sm text-muted-foreground">
                            Identify and label different speakers in the transcript
                          </p>
                        </div>
                        <Switch id="speaker-diarization" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="auto-punctuation">Automatic Punctuation</Label>
                          <p className="text-sm text-muted-foreground">
                            Add punctuation marks automatically to the transcript
                          </p>
                        </div>
                        <Switch id="auto-punctuation" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="auto-timestamps">Automatic Timestamps</Label>
                          <p className="text-sm text-muted-foreground">
                            Add timestamps to the transcript at regular intervals
                          </p>
                        </div>
                        <Switch id="auto-timestamps" defaultChecked />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Save Settings</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="help" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Help & Support</CardTitle>
                      <CardDescription>Get help with using Transcribly</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <h3 className="text-lg font-medium">Documentation</h3>
                        <p className="text-sm text-muted-foreground">
                          Browse our comprehensive documentation to learn how to use Transcribly effectively.
                        </p>
                        <Button variant="link" className="px-0">
                          View Documentation
                        </Button>
                      </div>

                      <div className="rounded-lg border p-4">
                        <h3 className="text-lg font-medium">Frequently Asked Questions</h3>
                        <p className="text-sm text-muted-foreground">
                          Find answers to common questions about our service.
                        </p>
                        <Button variant="link" className="px-0">
                          View FAQs
                        </Button>
                      </div>

                      <div className="rounded-lg border p-4">
                        <h3 className="text-lg font-medium">Contact Support</h3>
                        <p className="text-sm text-muted-foreground">
                          Need help? Our support team is available to assist you.
                        </p>
                        <Button variant="link" className="px-0">
                          Contact Support
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
