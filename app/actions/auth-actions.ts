"use server"

import { redirect } from "next/navigation"
import {
  createUser,
  getUserByEmail,
  verifyPassword,
  createSession,
  deleteSession,
  createPasswordResetToken,
  resetPassword,
  updatePassword,
  getCurrentUser,
} from "@/lib/auth"

// Register a new user
export async function registerUser(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirm-password") as string
    const firstName = formData.get("first-name") as string
    const lastName = formData.get("last-name") as string

    // Validate inputs
    if (!email || !password || !confirmPassword) {
      return { error: "All fields are required" }
    }

    if (password !== confirmPassword) {
      return { error: "Passwords do not match" }
    }

    // Create the user
    const user = await createUser({
      email,
      password,
      firstName,
      lastName,
    })

    if (!user) {
      return { error: "Failed to create user" }
    }

    // After signup, direct user to login page instead of creating a session
    return { 
      success: true, 
      redirectTo: "/login",
      message: "Account created successfully! Please login with your credentials."
    }
  } catch (error: any) {
    return { error: error.message || "Failed to register user" }
  }
}

// Login a user
export async function loginUser(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // Validate inputs
    if (!email || !password) {
      return { error: "Email and password are required" }
    }

    // Get the user
    const user = await getUserByEmail(email)

    if (!user) {
      return { error: "Invalid email or password" }
    }

    // Verify the password
    const isValid = await verifyPassword(password, user.password_hash)

    if (!isValid) {
      return { error: "Invalid email or password" }
    }

    // Create a session - this already sets the cookie on the server side
    // but we'll return the token to the client in case we need it
    const sessionToken = await createSession(user.id)

    // Return success with the session token
    return { 
      success: true, 
      redirectTo: "/dashboard",
      // Session details to help the client if needed
      session: {
        token: sessionToken,
        userId: user.id,
        // Set the expiry to match what's set in auth.ts
        expiresAt: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)).toISOString()
      } 
    }
  } catch (error: any) {
    return { error: error.message || "Failed to login" }
  }
}

// Logout a user
export async function logoutUser() {
  try {
    await deleteSession("session_token")
    return { success: true, redirectTo: "/login" }
  } catch (error: any) {
    return { error: error.message || "Failed to logout" }
  }
}

// Request password reset
export async function requestPasswordReset(formData: FormData) {
  try {
    const email = formData.get("email") as string

    if (!email) {
      return { error: "Email is required" }
    }

    const result = await createPasswordResetToken(email)

    // In a real app, you would send an email with the reset link
    // For now, we'll just return success

    return { success: true, message: "If an account with that email exists, a password reset link has been sent." }
  } catch (error: any) {
    return { error: error.message || "Failed to request password reset" }
  }
}

// Reset password with token
export async function resetPasswordWithToken(formData: FormData) {
  try {
    const token = formData.get("token") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirm-password") as string

    if (!token || !password || !confirmPassword) {
      return { error: "All fields are required" }
    }

    if (password !== confirmPassword) {
      return { error: "Passwords do not match" }
    }

    await resetPassword(token, password)

    return { success: true, message: "Password has been reset successfully" }
  } catch (error: any) {
    return { error: error.message || "Failed to reset password" }
  }
}

// Update user password
export async function updateUserPassword(formData: FormData) {
  try {
    const currentPassword = formData.get("current-password") as string
    const newPassword = formData.get("new-password") as string
    const confirmPassword = formData.get("confirm-password") as string

    if (!currentPassword || !newPassword || !confirmPassword) {
      return { error: "All fields are required" }
    }

    if (newPassword !== confirmPassword) {
      return { error: "New passwords do not match" }
    }

    const user = await getCurrentUser()

    if (!user) {
      return { error: "You must be logged in to update your password" }
    }

    await updatePassword(user.id, currentPassword, newPassword)

    return { success: true, message: "Password updated successfully" }
  } catch (error: any) {
    return { error: error.message || "Failed to update password" }
  }
}
