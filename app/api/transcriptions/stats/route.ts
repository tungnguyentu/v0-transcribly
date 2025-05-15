import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { query } from "@/lib/db"

// Cache configuration
export const dynamic = "force-dynamic" // Default to dynamic to ensure fresh data
export const revalidate = 60 // Revalidate every 60 seconds

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user profile with minutes used and limit
    const profileResult = await query("SELECT minutes_used, minutes_limit FROM user_profiles WHERE user_id = $1", [
      user.id,
    ])

    if (!profileResult || profileResult.length === 0) {
      return NextResponse.json({ error: "User profile not found" }, { status: 404 })
    }

    const { minutes_used, minutes_limit } = profileResult[0]

    // Get count of completed transcriptions
    const countResult = await query(
      "SELECT COUNT(*) as count FROM transcriptions WHERE user_id = $1 AND status = 'completed'",
      [user.id],
    )

    const completedCount = countResult[0]?.count || 0

    const stats = {
      minutesUsed: minutes_used || 0,
      minutesLimit: minutes_limit || 0,
      completedCount,
      percentageUsed: minutes_limit > 0 ? Math.round((minutes_used / minutes_limit) * 100) : 0,
    }

    return NextResponse.json({ stats })
  } catch (error: any) {
    console.error("Error in GET /api/transcriptions/stats:", error)
    return NextResponse.json({ error: error.message || "Failed to get user stats" }, { status: 500 })
  }
}
