import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { query } from "@/lib/db"

export async function GET(request: NextRequest) {
  const sessionToken = cookies().get("session_token")?.value

  if (sessionToken) {
    // Delete the session from the database
    await query("DELETE FROM sessions WHERE session_token = $1", [sessionToken])

    // Delete the session cookie
    cookies().delete("session_token")
  }

  // Redirect to login page
  return NextResponse.redirect(new URL("/login", request.url))
}
