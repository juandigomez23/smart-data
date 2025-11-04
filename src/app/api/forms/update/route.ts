import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();

  const file = body.file || body.filename;
  const config = body.config;
  const generateSchema = body.generateSchema !== false; 

    if (!file || !config) {
      return NextResponse.json({ success: false, error: "Missing filename or config" }, { status: 400 });
    }

    const safeName = path.basename(String(file)).replace(/\.ts$/, "");
    const formsDir = path.join(process.cwd(), "src/config/forms");
    const filePath = path.join(formsDir, `${safeName}.ts`);

    
  

    
    const exportName =
      safeName
        .split("-")
        .map((part, i) => (i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
        .join("") + "Form";

   
   
    let wrote = false
    try {
      const existing = await fs.readFile(filePath, 'utf-8')

      
      const exportRegex = new RegExp(`export\\s+const\\s+${exportName}\\s*:\\s*FormConfig\\s*=`, 'm')
      const m = existing.match(exportRegex)
      if (m && m.index != null) {
        const after = existing.slice(m.index + m[0].length)
        const objStart = after.indexOf('{')
        if (objStart >= 0) {
          const objAbsoluteStart = m.index + m[0].length + objStart
         
          let i = objAbsoluteStart
          let depth = 0
          let foundEnd = -1
          while (i < existing.length) {
            const ch = existing[i]
            if (ch === '{') depth++
            else if (ch === '}') {
              depth--
              if (depth === 0) {
                foundEnd = i
                break
              }
            }
            i++
          }

          if (foundEnd > objAbsoluteStart) {
            const objectText = existing.slice(objAbsoluteStart, foundEnd + 1)
        
            const fieldsRegex = /fields\s*:\s*\[/m
            const fm = objectText.match(fieldsRegex)
            if (fm && fm.index != null) {
              const fieldsStartInObj = fm.index + fm[0].length - 1 
              const absoluteFieldsStart = objAbsoluteStart + fieldsStartInObj

            
              let j = absoluteFieldsStart
              let bdep = 0
              let fieldsEnd = -1
              while (j < existing.length) {
                const ch2 = existing[j]
                if (ch2 === '[') bdep++
                else if (ch2 === ']') {
                  bdep--
                  if (bdep === 0) {
                    fieldsEnd = j
                    break
                  }
                }
                j++
              }

              if (fieldsEnd > absoluteFieldsStart) {
               
                
                const rawFields = config.fields || []

                const innerStart = absoluteFieldsStart + 1
                const innerEnd = fieldsEnd
                const innerText = existing.slice(innerStart, innerEnd)

               
                const itemsText: string[] = []
                let pos = 0
                while (pos < innerText.length) {
                 
                  while (pos < innerText.length && (innerText[pos].trim() === '' || innerText[pos] === ',')) pos++
                  if (pos >= innerText.length) break
                  if (innerText[pos] === '{') {
                    let depth = 0
                    const start = pos
                    let end = -1
                    while (pos < innerText.length) {
                      const ch = innerText[pos]
                      if (ch === '{') depth++
                      else if (ch === '}') {
                        depth--
                        if (depth === 0) { end = pos; pos++; break }
                      }
                      pos++
                    }
                    if (end >= 0) {
                      const item = innerText.slice(start, end + 1)
                      itemsText.push(item)
                      continue
                    } else {
                      break
                    }
                  } else {
                   
                    const nextComma = innerText.indexOf(',', pos)
                    if (nextComma === -1) break
                    pos = nextComma + 1
                  }
                }

                const nameRegexInline = /name\s*:\s*(?:"([^"]+)"|'([^']+)'|([A-Za-z0-9_]+))/
                const existingMap = new Map<string, string>()
                for (const it of itemsText) {
                  const m = it.match(nameRegexInline)
                  if (m) {
                    const found = m[1] || m[2] || m[3]
                    if (found) existingMap.set(String(found), it)
                  }
                }

             
                const lineStart = existing.lastIndexOf('\n', absoluteFieldsStart) + 1
                const indentMatch = existing.slice(lineStart, absoluteFieldsStart).match(/^(\s*)/)
                const baseIndent = indentMatch ? indentMatch[1] : ''

                
                const pieces: string[] = []
                for (const rf of (rawFields as unknown[])) {
                  const obj = rf as Record<string, unknown>
                  if (!obj || obj.name == null) continue
                  const name = String(obj.name)

                  const hasOptions = Array.isArray(obj.options)

                  if (existingMap.has(name)) {
                    const existingText = existingMap.get(name) as string

                    if (hasOptions && existingText) {
                     
                     
                      const optMatchIdx = existingText.search(/options\s*:/)
                      if (optMatchIdx >= 0) {
                        const bracketIdx = existingText.indexOf('[', optMatchIdx)
                        if (bracketIdx >= 0) {
                          
                          let p = bracketIdx
                          let bdepth = 0
                          let endIdx = -1
                          while (p < existingText.length) {
                            const ch = existingText[p]
                            if (ch === '[') bdepth++
                            else if (ch === ']') {
                              bdepth--
                              if (bdepth === 0) { endIdx = p; break }
                            }
                            p++
                          }

                          if (endIdx >= 0) {
                            
                            const newOptionsRaw = JSON.stringify(obj.options, null, 2)

                           
                            const lineStart = existingText.lastIndexOf('\n', bracketIdx) + 1
                            const optIndentMatch = existingText.slice(lineStart, bracketIdx).match(/^(\s*)/)
                            const optBaseIndent = optIndentMatch ? optIndentMatch[1] : ''

        
                            const newOptionsIndented = newOptionsRaw
                              .split('\n')
                              .map((L, i) => (i === 0 ? optBaseIndent + L : optBaseIndent + L))
                              .join('\n')

                            const replacedItem = existingText.slice(0, bracketIdx) + newOptionsIndented + existingText.slice(endIdx + 1)
                            pieces.push(replacedItem)
                            existingMap.delete(name)
                            continue
                          }
                        }
                      }

                    }

                    pieces.push(existingText)
                    existingMap.delete(name)
                    continue
                  }

                  const s = JSON.stringify(obj, null, 2)
                  const indented = s.split('\n').map((L, i) => (i === 0 ? baseIndent + '  ' + L : baseIndent + '  ' + L)).join('\n')
                  pieces.push(indented)
                }

                for (const rem of existingMap.values()) {
                  pieces.push(rem)
                }


                const joined = pieces.map(p => p.replace(/\s*$/, '') + ',').join('\n')
                const newInner = '\n' + joined + '\n' + baseIndent

                const replaced = existing.slice(0, innerStart) + newInner + existing.slice(innerEnd)

      
                const addedNames = (rawFields as unknown[]).reduce<string[]>((acc, f) => {
                  const name = f && (f as Record<string, unknown>).name ? String((f as Record<string, unknown>).name) : null
                  if (name && !existingMap.has(name)) acc.push(name)
                  return acc
                }, [])

                function removeNestedFields(text: string, namesToRemove: string[]) {
                  if (!namesToRemove || namesToRemove.length === 0) return text
                  let out = text
                  let searchFrom = 0
                  while (true) {
                    const cfIdx = out.indexOf('conditionalFields', searchFrom)
                    if (cfIdx === -1) break
                    const bracketIdx = out.indexOf('[', cfIdx)
                    if (bracketIdx === -1) break
                   
                    let p = bracketIdx
                    let bdepth = 0
                    let endIdx = -1
                    while (p < out.length) {
                      const ch = out[p]
                      if (ch === '[') bdepth++
                      else if (ch === ']') {
                        bdepth--
                        if (bdepth === 0) { endIdx = p; break }
                      }
                      p++
                    }
                    if (endIdx === -1) break

                    const innerS = bracketIdx + 1
                    const innerE = endIdx
                    const inner = out.slice(innerS, innerE)

                   
                    const pieces2: string[] = []
                    let ip = 0
                    while (ip < inner.length) {
                      while (ip < inner.length && (inner[ip].trim() === '' || inner[ip] === ',')) ip++
                      if (ip >= inner.length) break
                      if (inner[ip] === '{') {
                        let depth2 = 0
                        const start2 = ip
                        let end2 = -1
                        while (ip < inner.length) {
                          const ch2 = inner[ip]
                          if (ch2 === '{') depth2++
                          else if (ch2 === '}') {
                            depth2--
                            if (depth2 === 0) { end2 = ip; ip++; break }
                          }
                          ip++
                        }
                        if (end2 >= 0) {
                          const item2 = inner.slice(start2, end2 + 1)
                          const m2 = item2.match(nameRegexInline)
                          const itemName = m2 ? (m2[1] || m2[2] || m2[3]) : null
                          if (!itemName || !namesToRemove.includes(String(itemName))) {
                            pieces2.push(item2)
                          }
                          continue
                        } else break
                      } else {
                        const nc = inner.indexOf(',', ip)
                        if (nc === -1) break
                        ip = nc + 1
                      }
                    }

                   
                    const lineStart2 = out.lastIndexOf('\n', innerS) + 1
                    const indentMatch2 = out.slice(lineStart2, innerS).match(/^(\s*)/)
                    const baseIndent2 = indentMatch2 ? indentMatch2[1] : ''
                    const joined2 = pieces2.map(p => p.replace(/\s*$/, '') + ',').join('\n')
                    const newInner2 = '\n' + joined2 + '\n' + baseIndent2

                    out = out.slice(0, innerS) + newInner2 + out.slice(innerE)
                    searchFrom = innerS + newInner2.length
                  }
                  return out
                }

                const finalText = removeNestedFields(replaced, addedNames)

               
                const tmpTs = filePath + '.tmp'
                await fs.writeFile(tmpTs, finalText, 'utf-8')
                await fs.rename(tmpTs, filePath)
                if (process.env.NODE_ENV === 'development') {
                  console.info('Wrote TS file (partial update):', filePath)
                }
                wrote = true
              }
            }
          }
        }
      }
    } catch (err) {
     
      console.error('Partial update failed, falling back to full write', err)
    }

    if (!wrote) {
      const newContent = `import { FormConfig } from "@/components/formgenerator"\n\nexport const ${exportName}: FormConfig = ${JSON.stringify(config, null, 2)}\n`
      try {
        const tmpTs = filePath + '.tmp'
        await fs.writeFile(tmpTs, newContent, 'utf-8')
        await fs.rename(tmpTs, filePath)
        if (process.env.NODE_ENV === 'development') {
          console.info('Wrote TS file (full rewrite):', filePath)
        }
      } catch (err) {
        console.error('Failed to write TS file', err)
        return NextResponse.json({ success: false, error: 'Failed to write TS file' }, { status: 500 })
      }
    }

   
  

    
    function escapeRegex(s: string) {
      return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    }

  
    try {
      const patches = (body && (body.schemaPatches)) as Record<string, unknown> | undefined
      if (patches) {
        const toSet = Array.isArray(patches.setRequired) ? patches.setRequired.map(String) : []
        const toUnset = Array.isArray(patches.unsetRequired) ? patches.unsetRequired.map(String) : []
        if (toSet.length || toUnset.length) {
          const schemaPath = path.join(formsDir, `${safeName}-schema.ts`)
          try {
            let schemaText = await fs.readFile(schemaPath, 'utf-8')

            for (const name of toSet) {
              const re = new RegExp(`(\\b${escapeRegex(name)}\\b\\s*:\\s*)([^,]+)(,)`, 'g')
              schemaText = schemaText.replace(re, (m, p1, expr, p3) => {
                // if already has min() assume required
                if (/\\.min\\s*\(/.test(expr)) return m
                if (/z\\.array\\s*\(/.test(expr)) return `${p1}z.array(z.string()).min(1, "Campo obligatorio")${p3}`
                return `${p1}z.string().min(1, "Campo obligatorio")${p3}`
              })
            }

            for (const name of toUnset) {
              const re = new RegExp(`(\\b${escapeRegex(name)}\\b\\s*:\\s*)([^,]+)(,)`, 'g')
              schemaText = schemaText.replace(re, (m, p1, expr, p3) => {
                if (/\\.min\\s*\(/.test(expr)) {
                  if (/z\\.array\\s*\(/.test(expr)) return `${p1}z.array(z.string()).optional()${p3}`
                  return `${p1}z.string().optional()${p3}`
                }
                return m
              })
            }

            await fs.writeFile(schemaPath, schemaText, 'utf-8')
          } catch (err) {
            console.error('Schema patch apply failed', err)
          }
        }
      }
    } catch (err) {
      console.error('Schema patches processing error', err)
    }

    if (generateSchema) {
      try {
      const schemaName = `${safeName}-schema.ts`;
      const schemaPath = path.join(formsDir, schemaName);

   
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

      
  const typeLines: string[] = []
  const schemaLines: string[] = []
  typeLines.push(`export type ${exportName}Data = {`)
  
  schemaLines.push(`export const ${exportName}Schema = z.object({`)

      for (const [name, info] of seen.entries()) {
       
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

     

      await fs.writeFile(schemaPath, schemaContent, 'utf-8')
      } catch (err) {
        
        console.error('Schema generation error', err)
      }
    }

  return NextResponse.json({ success: true, wroteTs: wrote });
  } catch (error) {
    console.error("Update error:", error);
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
