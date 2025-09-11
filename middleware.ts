import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if this is an admin route (but not the login page or auth API)
  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    !request.nextUrl.pathname.endsWith("/admin") &&
    !request.nextUrl.pathname.startsWith("/api/admin/auth")
  ) {
    // Check for admin token cookie
    const adminToken = request.cookies.get("adminToken");

    if (!adminToken) {
      // Redirect to admin login if no token
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
