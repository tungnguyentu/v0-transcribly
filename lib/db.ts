import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

// Initialize the Neon SQL client
const sql = neon(process.env.DATABASE_URL!)

// Initialize drizzle with the SQL client
export const db = drizzle(sql)

// Helper function for direct SQL queries
export async function query(sqlQuery: string, params: any[] = []) {
  try {
    // Use the neon sql instance directly for parameterized queries
    return await sql.query(sqlQuery, params)
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}
