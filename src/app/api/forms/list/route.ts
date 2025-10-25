import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    const dir = path.join(process.cwd(), "src", "config", "forms")
    const files = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".ts") && f !== "index.ts" && !f.endsWith("-schema.ts"))

    const result: Array<{ filename: string; title?: string }> = []

    for (const file of files) {
      const base = file.replace(/\.ts$/, "")
      try {
        const mod = await import(`@/config/forms/${base}`)
        const exported = Object.values(mod).find((v) => {
          if (!v || typeof v !== "object") return false
          const candidate = v as Record<string, unknown>
          return Array.isArray(candidate["fields"])
        })
        const title =
          exported && typeof exported === "object" && "title" in exported
            ? (exported as { title: string }).title
            : base
        
        result.push({ filename: file, title })
      } catch (err) {
        
        void err;
        result.push({ filename: file, title: base })
      }
    }

    return NextResponse.json({ files: result })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
