import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import authOptions from "@/lib/authOptions";

const handler = NextAuth(authOptions as unknown as NextAuthOptions);

export { handler as GET, handler as POST };
