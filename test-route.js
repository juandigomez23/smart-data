// test-route.js
import pool from './src/lib/db.ts'

async function testQueries() {
  try {
    console.log("1. Probando SELECT básico...")
    const basic = await pool.query('SELECT * FROM public.formularios LIMIT 1')
    console.log("✅ SELECT básico funciona:", basic.rows.length, "filas")

    console.log("2. Probando estructura de tabla...")
    const structure = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'formularios'
      ORDER BY ordinal_position
    `)
    console.log("📋 Estructura de la tabla:")
    structure.rows.forEach(col => {
      console.log(`   - ${col.column_name} (${col.data_type})`)
    })

  } catch (error) {
    console.error("❌ Error en test:", error)
  } finally {
    await pool.end()
  }
}

testQueries()