import { NextResponse } from "next/server"

import fs from "fs"
import path from "path"
import { runInNewContext } from "vm"

// Try to parse the TypeScript file using ts-morph if available. If not
// installed, fall back to dynamic import. Using ts-morph lets us extract the
// exported object literal without relying on Node's module cache.
export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const fileParam = url.searchParams.get("file")
    if (!fileParam) return NextResponse.json({ error: "missing file param" }, { status: 400 })

    const base = String(fileParam).replace(/\.ts$/, "")
    const dir = path.join(process.cwd(), "src", "config", "forms")
    const fp = path.join(dir, `${base}.ts`)

    if (!fs.existsSync(fp)) return NextResponse.json({ error: "file not found" }, { status: 404 })

    // Prefer AST-based extraction when ts-morph is available.
    try {
      const tm = await import("ts-morph")
      const { Project } = tm
      const proj = new Project({ tsConfigFilePath: undefined })
      const src = proj.addSourceFileAtPath(fp)

      // find exported variable with a `fields` property inside the initializer
      const exports = src.getVariableStatements().filter(vs => vs.isExported())
      for (const vs of exports) {
        const decl = vs.getDeclarations()[0]
        if (!decl) continue
        const init = decl.getInitializer()
        if (!init) continue
        const txt = init.getText()
        // Heuristic: initializer should contain `fields:`
        if (txt.includes("fields")) {
          // Evaluate the object literal safely in a VM context. Wrap in
          // parentheses to ensure object literal is parsed.
          try {
            const obj = runInNewContext(`(${txt})`, {}, { timeout: 1000 })
            return NextResponse.json({ config: obj }, { headers: { 'Cache-Control': 'no-cache, must-revalidate' } })
          } catch (e) {
            console.error('VM evaluation failed for', fp, e)
            break
          }
        }
      }
    } catch {
      // ts-morph not available or parsing failed; fall back to dynamic import
      // (this may hit module cache issues in some environments)
    }

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

      return NextResponse.json({ config: exported }, { headers: { 'Cache-Control': 'no-cache, must-revalidate' } })
    } catch {
      // As a last resort, return the raw TS content so the editor can show it
      const content = fs.readFileSync(fp, "utf8")
      return NextResponse.json({ raw: content }, { headers: { 'Cache-Control': 'no-cache, must-revalidate' } })
    }
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
