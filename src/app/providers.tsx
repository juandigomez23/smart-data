// app/session-provider.tsx
"use client"

import { ReactNode } from "react"
import { SessionProvider } from "next-auth/react"

interface Props {
  children: ReactNode
}

export default function CustomSessionProvider({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>
}
