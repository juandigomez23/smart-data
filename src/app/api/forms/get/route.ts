import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const fileParam = url.searchParams.get("file")
    if (!fileParam) return NextResponse.json({ error: "missing file param" }, { status: 400 })

    // Normalizamos: si viene con o sin extension -> base sin extension
    const base = String(fileParam).replace(/\.ts$/, "")

    try {
      const mod = await import(`@/config/forms/${base}`)
      const exported = Object.values(mod).find((v) => {
        if (!v || typeof v !== "object") return false
        const candidate = v as Record<string, unknown>
        return Array.isArray(candidate["fields"])
      })

      if (!exported) {
        return NextResponse.json({ error: "form not found" }, { status: 404 })
      }

      return NextResponse.json({ config: exported })
    } catch {
      
      const dir = path.join(process.cwd(), "src", "config", "forms")
      const fp = path.join(dir, `${base}.ts`)
      if (!fs.existsSync(fp)) return NextResponse.json({ error: "file not found" }, { status: 404 })

      const content = fs.readFileSync(fp, "utf8")
      return NextResponse.json({ raw: content })
    }
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
