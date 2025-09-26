import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import pool from "@/lib/db"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Usuario/Correo", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) return null

        // 🔹 Admin fijo
        if (credentials.username === "admin" && credentials.password === "123") {
          return { id: "1", username: "admin", email: "admin@empresa.com", role: "admin" }
        }

        // 🔹 Auditor fijo
        if (credentials.username === "auditor" && credentials.password === "123") {
          return { id: "2", username: "auditor", email: "auditor@empresa.com", role: "auditor" }
        }

        // 🔹 Asesores en BD
        try {
          const result = await pool.query(
            `SELECT id, nombre, email, rol, estado 
             FROM asesores 
             WHERE email = $1 LIMIT 1`,
            [credentials.username]
          )

          const asesor = result.rows[0]
          if (!asesor) return null
          if (credentials.password !== "123") return null

          return {
            id: asesor.id,
            username: asesor.nombre,
            email: asesor.email,
            role: asesor.rol || "asesor",
            estado: asesor.estado,
          }
        } catch (error) {
          console.error("❌ Error en authorize:", error)
          return null
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.email = user.email
        token.role = user.role
        token.estado = user.estado
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id,
          username: token.username,
          email: token.email,
          role: token.role,
          estado: token.estado,
        }
      }
      return session
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
