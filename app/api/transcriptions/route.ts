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

    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const offset = Number.parseInt(searchParams.get("offset") || "0")
    const search = searchParams.get("search") || ""
    const sort = searchParams.get("sort") || "newest"

    // Build the query based on parameters
    let orderBy = "created_at DESC"
    if (sort === "oldest") orderBy = "created_at ASC"
    else if (sort === "name-asc") orderBy = "file_name ASC"
    else if (sort === "name-desc") orderBy = "file_name DESC"
    else if (sort === "duration") orderBy = "duration DESC NULLS LAST"

    let sqlQuery = `
      SELECT id, file_name, file_url, status, language, format, duration, created_at, updated_at, error
      FROM transcriptions
      WHERE user_id = $1
    `

    const queryParams = [user.id]

    // Add search condition if provided
    if (search) {
      sqlQuery += ` AND file_name ILIKE $${queryParams.length + 1}`
      queryParams.push(`%${search}%`)
    }

    // Add order by, limit and offset
    sqlQuery += ` ORDER BY ${orderBy} LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`
    queryParams.push(limit, offset)

    const transcriptionsResult = await query(sqlQuery, queryParams)

    return NextResponse.json({ transcriptions: transcriptionsResult || [] })
  } catch (error: any) {
    console.error("Error in GET /api/transcriptions:", error)
    return NextResponse.json({ error: error.message || "Failed to get transcriptions" }, { status: 500 })
  }
}
