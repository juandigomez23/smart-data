import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Usuario", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (credentials?.username === "admin" && credentials.password === "123") {
          return { id: "1", username: "admin", role: "admin", email: "admin@empresa.com" }
        }
        if (credentials?.username === "asesor" && credentials.password === "123") {
          return { id: "2", username: "asesor", role: "asesor", email: "asesor@empresa.com" }
        }
        if (credentials?.username === "auditor" && credentials.password === "123") {
          return { id: "3", username: "auditor", role: "auditor", email: "auditor@empresa.com" }
        }
        return null
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          username: token.username as string,
          role: token.role as "admin" | "asesor" | "auditor"
        }
      }
      return session
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
