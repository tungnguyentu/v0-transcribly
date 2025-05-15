import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define which routes require authentication
const protectedRoutes = ["/dashboard", "/dashboard/history", "/dashboard/settings", "/dashboard/upload"]

// Define which routes are only for non-authenticated users
const authRoutes = ["/login", "/signup", "/forgot-password", "/reset-password"]

export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("session_token")?.value
  const isAuthenticated = !!sessionToken
  const path = request.nextUrl.pathname

  // Check if the route requires authentication
  const isProtectedRoute = protectedRoutes.some((route) => path === route || path.startsWith(`${route}/`))

  // Check if the route is for non-authenticated users only
  const isAuthRoute = authRoutes.some((route) => path === route || path.startsWith(`${route}/`))

  // Redirect authenticated users away from auth routes
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Redirect non-authenticated users away from protected routes
  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Allow the request to proceed
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
