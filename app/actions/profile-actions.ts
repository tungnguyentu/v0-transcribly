"use server"

import { getCurrentUser } from "@/lib/auth"
import { query } from "@/lib/db"

// Get user profile
export async function getUserProfile() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return { error: "Not authenticated" }
    }

    const profileResult = await query("SELECT * FROM user_profiles WHERE user_id = $1", [user.id])

    const profile = profileResult.rows[0] || null

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        createdAt: user.created_at,
      },
      profile,
    }
  } catch (error: any) {
    return { error: error.message || "Failed to get user profile" }
  }
}

// Update user profile
export async function updateUserProfile(formData: FormData) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return { error: "Not authenticated" }
    }

    const firstName = formData.get("first-name") as string
    const lastName = formData.get("last-name") as string
    const email = formData.get("email") as string

    // Update user information
    await query("UPDATE users SET first_name = $1, last_name = $2, email = $3, updated_at = NOW() WHERE id = $4", [
      firstName,
      lastName,
      email,
      user.id,
    ])

    // Get notification preferences
    const emailNotifications = formData.get("email-notifications") === "on"
    const marketingEmails = formData.get("marketing-emails") === "on"

    // Update notification preferences
    await query(
      `UPDATE user_profiles 
       SET notification_preferences = $1, updated_at = NOW() 
       WHERE user_id = $2`,
      [JSON.stringify({ email: emailNotifications, marketing: marketingEmails }), user.id],
    )

    return { success: true, message: "Profile updated successfully" }
  } catch (error: any) {
    return { error: error.message || "Failed to update profile" }
  }
}

// Get user subscription
export async function getUserSubscription() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return { error: "Not authenticated" }
    }

    const subscriptionResult = await query("SELECT * FROM subscriptions WHERE user_id = $1", [user.id])

    const subscription = subscriptionResult.rows[0] || null

    return { subscription }
  } catch (error: any) {
    return { error: error.message || "Failed to get subscription" }
  }
}

// Get billing history
export async function getBillingHistory() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return { error: "Not authenticated" }
    }

    const billingResult = await query("SELECT * FROM billing_history WHERE user_id = $1 ORDER BY created_at DESC", [
      user.id,
    ])

    const billingHistory = billingResult.rows || []

    return { billingHistory }
  } catch (error: any) {
    return { error: error.message || "Failed to get billing history" }
  }
}
