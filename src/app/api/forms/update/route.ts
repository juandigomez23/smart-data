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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update error:", error);
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
