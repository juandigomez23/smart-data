import { DefaultSession, DefaultUser } from "next-auth";
import { Channel } from "@prisma/client";

export type Role = "admin" | "asesor" | string;

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string;
      role?: Role;
      email?: string;
      image?: string | null;
      operations?: Channel[];
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    name?: string;
    role?: Role;
    estado?: string;
    pais?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uid?: string;
    role?: Role;
    avatar?: string | null;
    name?: string;
    operations?: Channel[];
    email?: string;
  }
}
