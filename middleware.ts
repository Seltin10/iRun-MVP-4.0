import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public routes that don't require authentication
  const publicRoutes = ["/login", "/signup", "/"]

  // Check if the current route is public
  const isPublicRoute = publicRoutes.includes(pathname)

  // Get the session cookie
  const sessionCookie = request.cookies.get("user_session")

  // If trying to access protected route without session, redirect to login
  if (!isPublicRoute && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If trying to access login/signup with session, redirect to dashboard
  if ((pathname === "/login" || pathname === "/signup") && sessionCookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
