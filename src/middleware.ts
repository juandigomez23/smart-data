import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token

    if (req.nextUrl.pathname.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    if (req.nextUrl.pathname.startsWith("/asesor") && token?.role !== "asesor") {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    if (req.nextUrl.pathname.startsWith("/auditor") && token?.role !== "auditor") {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // solo usuarios logueados
    },
  }
)

export const config = {
  matcher: ["/admin/:path*", "/asesor/:path*", "/auditor/:path*"],
}
