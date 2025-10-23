import type { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import pool from "@/lib/db";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    // Google corporate login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      async profile(profile: { email: string; name?: string }) {
        const email = profile.email;
        const name = profile.name || "";
        const domain = email.split("@")[1];

        if (domain !== "bambubpo.com") {
          throw new Error("Solo se permiten correos @bambubpo.com");
        }

        const existingUser = await pool.query(
          `SELECT id, nombre, email, rol FROM asesores WHERE email = $1 LIMIT 1`,
          [email]
        );

        if (existingUser.rows.length === 0) {
          const result = await pool.query(
            `INSERT INTO asesores (nombre, email, rol, updated_at)
             VALUES ($1, $2, 'asesor', NOW())
             RETURNING id, nombre, email, rol`,
            [name, email]
          );

          const row = result.rows[0];
          return {
            id: String(row.id),
            name: row.nombre ?? name,
            email: row.email,
            role: row.rol ?? 'asesor',
          };
        }

        const u = existingUser.rows[0];
        return {
          id: String(u.id),
          name: u.nombre,
          email: u.email,
          role: u.rol ?? 'asesor',
        };
      },
    }),

    // Credentials login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Usuario", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const res = await pool.query(
          `SELECT * FROM asesores WHERE email = $1 LIMIT 1`,
          [credentials.username]
        );

        if (res.rows.length === 0) return null;
        const user = res.rows[0];

        if (!user.password) return null;

        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) return null;

        return {
          id: String(user.id),
          name: user.nombre,
          email: user.email,
          role: user.rol ?? 'asesor',
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: { id: string; role?: string } }): Promise<JWT> {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT & { id?: string; role?: string } }): Promise<Session> {
      if (token) {
        if (!session.user) session.user = { id: token.id ? (token.id as string) : "", name: "", email: "" };
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },

    async redirect({ url, baseUrl }: { url: string; baseUrl: string }): Promise<string> {
      if (url && url.startsWith("/")) return `${baseUrl}${url}`;
      return `${baseUrl}/login`;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
