// final-smart-data-test.js
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "coolify.bambubpo.com",
  database: "postgres",
  password: "zhpzTxg20ObfYiMaJkZfoOgNMPKPC1OMTOGfButOfR2t6oAvHsXt2bneUswcMNQt",
  port: 5499,
});

async function testSmartData() {
  try {
    console.log("🔍 Conectando a smart-data...");
    console.log("📍 Host: coolify.bambubpo.com:5499");
    
    const info = await pool.query('SELECT version(), current_database() as db');
    console.log("✅ Conectado a:", info.rows[0].db);
    console.log("📋 Servidor:", info.rows[0].version.split(',')[0]);
    
    // Verificar tabla formularios
    const tables = await pool.query(`
      SELECT table_schema, table_name 
      FROM information_schema.tables 
      WHERE table_name = 'formularios'
    `);
    
    console.log("✅ FORMULARIOS encontrado en:", tables.rows[0].table_schema);
    
    // Probar SELECT
    const result = await pool.query('SELECT * FROM public.formularios');
    console.log("🎯 SELECT exitoso. Filas:", result.rows.length);
    
    if (result.rows.length > 0) {
      console.log("📝 Datos de ejemplo:", result.rows[0]);
    }
    
    console.log("\n🎉 ¡CONEXIÓN EXITOSA! Tu API debería funcionar ahora.");
    
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.log("💡 Verifica:");
    console.log("   - Tu conexión a internet");
    console.log("   - Que el servidor esté activo");
    console.log("   - Que no haya firewall bloqueando");
  } finally {
    await pool.end();
  }
}

testSmartData();