import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import { query } from "./db"

// Session duration in seconds (7 days)
const SESSION_DURATION = 7 * 24 * 60 * 60

// Generate a secure random token
export function generateToken(length = 32) {
  return crypto.randomBytes(length).toString("hex")
}

// Hash a password
export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10)
}

// Verify a password
export async function verifyPassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword)
}

// Create a new user
export async function createUser(userData: {
  email: string
  password: string
  firstName?: string
  lastName?: string
}) {
  const { email, password, firstName, lastName } = userData

  // Check if user already exists
  const existingUser = await query("SELECT * FROM users WHERE email = $1", [email])

  if (existingUser.rows.length > 0) {
    throw new Error("User with this email already exists")
  }

  // Hash the password
  const passwordHash = await hashPassword(password)

  // Insert the new user
  const result = await query(
    "INSERT INTO users (email, password_hash, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING id, email, first_name, last_name, created_at",
    [email, passwordHash, firstName || null, lastName || null],
  )

  // Create default profile and subscription
  if (result.rows.length > 0) {
    const userId = result.rows[0].id

    // Create user profile
    await query("INSERT INTO user_profiles (user_id) VALUES ($1)", [userId])

    // Create free subscription
    await query("INSERT INTO subscriptions (user_id, plan_type, status) VALUES ($1, $2, $3)", [
      userId,
      "free",
      "active",
    ])
  }

  return result.rows[0]
}

// Get user by email
export async function getUserByEmail(email: string) {
  const result = await query("SELECT * FROM users WHERE email = $1", [email])

  return result.rows[0] || null
}

// Get user by ID
export async function getUserById(id: number) {
  const result = await query("SELECT * FROM users WHERE id = $1", [id])

  return result.rows[0] || null
}

// Create a session for a user
export async function createSession(userId: number) {
  const token = generateToken()
  const expiresAt = new Date(Date.now() + SESSION_DURATION * 1000)

  await query("INSERT INTO sessions (user_id, session_token, expires_at) VALUES ($1, $2, $3)", [
    userId,
    token,
    expiresAt,
  ])

  // Set the session cookie
  cookies().set({
    name: "session_token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  })

  return token
}

// Get session by token
export async function getSessionByToken(token: string) {
  const result = await query("SELECT * FROM sessions WHERE session_token = $1 AND expires_at > NOW()", [token])

  return result.rows[0] || null
}

// Delete a session
export async function deleteSession(token: string) {
  await query("DELETE FROM sessions WHERE session_token = $1", [token])

  cookies().delete("session_token")
}

// Get the current user from the session
export async function getCurrentUser() {
  const token = cookies().get("session_token")?.value

  if (!token) {
    return null
  }

  const session = await getSessionByToken(token)

  if (!session) {
    return null
  }

  const user = await getUserById(session.user_id)

  return user
}

// Check if the user is authenticated
export async function requireAuth() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return user
}

// Create a password reset token
export async function createPasswordResetToken(email: string) {
  const user = await getUserByEmail(email)

  if (!user) {
    // Don't reveal that the user doesn't exist
    return null
  }

  const token = generateToken()
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

  await query("INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)", [
    user.id,
    token,
    expiresAt,
  ])

  return { token, email }
}

// Verify a password reset token
export async function verifyPasswordResetToken(token: string) {
  const result = await query("SELECT * FROM password_reset_tokens WHERE token = $1 AND expires_at > NOW()", [token])

  return result.rows[0] || null
}

// Reset a password using a token
export async function resetPassword(token: string, newPassword: string) {
  const resetToken = await verifyPasswordResetToken(token)

  if (!resetToken) {
    throw new Error("Invalid or expired token")
  }

  const passwordHash = await hashPassword(newPassword)

  await query("UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2", [
    passwordHash,
    resetToken.user_id,
  ])

  // Delete the used token
  await query("DELETE FROM password_reset_tokens WHERE token = $1", [token])

  return true
}

// Update user password
export async function updatePassword(userId: number, currentPassword: string, newPassword: string) {
  const user = await getUserById(userId)

  if (!user) {
    throw new Error("User not found")
  }

  const isValid = await verifyPassword(currentPassword, user.password_hash)

  if (!isValid) {
    throw new Error("Current password is incorrect")
  }

  const passwordHash = await hashPassword(newPassword)

  await query("UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2", [passwordHash, userId])

  return true
}
