import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // 🔒 No hay token -> redirigir al login
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const role = token.role || "asesor";

    // 🔹 Control de acceso a zonas
    // Solo admin/owner pueden entrar al panel admin
    if (pathname.startsWith("/admin") && !["admin", "owner"].includes(role)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // 🔹 Si el asesor intenta acceder al dashboard de admin
    if (pathname.startsWith("/dashboard") && ["admin", "owner"].includes(role)) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    // Si todo está bien, seguir
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Requiere token
    },
  }
);

// 🔍 Rutas protegidas
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/formularios/:path*", // ejemplo: proteger formularios también
  ],
};
