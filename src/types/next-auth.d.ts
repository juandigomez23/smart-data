import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import { JWT as DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      username: string
      role: "admin" | "asesor" | "auditor"
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    id: string
    username: string
    role: "admin" | "asesor" | "auditor"
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string
    username: string
    role: "admin" | "asesor" | "auditor"
  }
}
