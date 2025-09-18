import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const { pathname } = req.nextUrl

    if (!token) return

    if (pathname.startsWith("/admin") && token.role !== "admin") {
      return NextResponse.redirect(new URL("/denied", req.url))
    }

    if (pathname.startsWith("/asesor") && token.role !== "asesor") {
      return NextResponse.redirect(new URL("/denied", req.url))
    }

    if (pathname.startsWith("/auditor") && token.role !== "auditor") {
      return NextResponse.redirect(new URL("/denied", req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: ["/admin/:path*", "/asesor/:path*", "/auditor/:path*"],
}
