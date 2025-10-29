import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const file = body.file || body.filename;
    const config = body.config;

    if (!file || !config) {
      return NextResponse.json({ success: false, error: "Missing filename or config" }, { status: 400 });
    }

    const safeName = path.basename(String(file)).replace(/\.ts$/, "");
    const formsDir = path.join(process.cwd(), "src/config/forms");
    const filePath = path.join(formsDir, `${safeName}.ts`);

    
    try {
      const existing = await fs.readFile(filePath, "utf-8");
      const backupsDir = path.join(formsDir, "backups");
      await fs.mkdir(backupsDir, { recursive: true });
      const ts = new Date().toISOString().replace(/[:.]/g, "-");
      await fs.writeFile(path.join(backupsDir, `${safeName}.backup.${ts}.ts`), existing, "utf-8");
    } catch {
      
    }

    
    const exportName =
      safeName
        .split("-")
        .map((part, i) => (i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
        .join("") + "Form";

   
    const newContent = `import { FormConfig } from "@/components/formgenerator"

export const ${exportName}: FormConfig = ${JSON.stringify(config, null, 2)}
`;

    await fs.writeFile(filePath, newContent, "utf-8");

    // Also generate a basic zod schema file next to the form config so server-side
    // validation can be kept in sync with editor toggles. We collect all unique
    // field names (including nested conditional fields) and mark them required if
    // the corresponding field has `required: true` in the config.
    try {
      const schemaName = `${safeName}-schema.ts`;
      const schemaPath = path.join(formsDir, schemaName);

      // collect fields recursively
      const seen = new Map<string, { required: boolean; type?: string }>()
      function walkFields(arr: unknown[] | undefined) {
        if (!arr) return
        for (const item of arr) {
          const f = item as Record<string, unknown>
          if (!f || f.name == null) continue
          const fname = String(f.name)
          const isRequired = !!(f.required as boolean)
          const ftype = typeof f.type === 'string' ? String(f.type) : undefined
          const prev = seen.get(fname)
          if (!prev) seen.set(fname, { required: isRequired, type: ftype })
          else if (isRequired) prev.required = true

          const conds = f.conditionalFields as unknown[] | undefined
          if (Array.isArray(conds)) {
            for (const cond of conds) {
              const c = cond as Record<string, unknown>
              const nested = c.fields as unknown[] | undefined
              walkFields(nested)
            }
          }
        }
      }

      const cfgFields = (config as Record<string, unknown>)['fields'] as unknown[] | undefined
      walkFields(cfgFields)

      // Build TypeScript type and zod schema
      const typeLines: string[] = []
      const schemaLines: string[] = []
      typeLines.push(`export type ${exportName}Data = {`)
      schemaLines.push(`import { z } from "zod"`) 
      schemaLines.push(`export const ${exportName}Schema = z.object({`)

      for (const [name, info] of seen.entries()) {
        // simple heuristic: checkboxes -> array, others -> string
        const isArray = info.type === 'checkbox'
        if (isArray) {
          typeLines.push(`  ${name}: string[];`)
          if (info.required) schemaLines.push(`  ${name}: z.array(z.string()).min(1, "Campo obligatorio"),`)
          else schemaLines.push(`  ${name}: z.array(z.string()).optional(),`)
        } else {
          typeLines.push(`  ${name}: string;`)
          if (info.required) schemaLines.push(`  ${name}: z.string().min(1, "Campo obligatorio"),`)
          else schemaLines.push(`  ${name}: z.string().optional(),`)
        }
      }

      typeLines.push(`}`)
      schemaLines.push(`})`)

      const schemaContent = `import { z } from "zod"

${typeLines.join('\n')}

${schemaLines.join('\n')}
`

      // backup existing schema if present
      try {
        const existingSchema = await fs.readFile(schemaPath, 'utf-8')
        const backupsDir = path.join(formsDir, 'backups')
        await fs.mkdir(backupsDir, { recursive: true })
        const ts = new Date().toISOString().replace(/[:.]/g, '-')
        await fs.writeFile(path.join(backupsDir, `${safeName}.schema.backup.${ts}.ts`), existingSchema, 'utf-8')
      } catch {
        // ignore if no existing schema
      }

      await fs.writeFile(schemaPath, schemaContent, 'utf-8')
    } catch (err) {
      // don't fail the whole update if schema generation fails; log and continue
      console.error('Schema generation error', err)
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update error:", error);
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
