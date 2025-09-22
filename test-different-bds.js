// test-different-dbs.js
import pkg from 'pg';
const { Pool } = pkg;

// Prueba con diferentes nombres de base de datos
const dbConfigs = [
  { database: "postgres", desc: "postgres (estándar)" },
  { database: "smart-data", desc: "smart-data" },
  { database: "smart_data", desc: "smart_data" },
];

async function testAllDBs() {
  for (const config of dbConfigs) {
    console.log(`\n🔍 Probando base de datos: ${config.desc}`);
    
    const pool = new Pool({
      user: "postgres",
      host: "localhost",
      database: config.database,
      password: "zhpzTxg20ObfYiMaJkZfoOgNMPKPC1OMTOGfButOfR2t6oAvHsXt2bneUswcMNQt",
      port: 5499,
    });

    try {
      const dbInfo = await pool.query('SELECT current_database() as db');
      console.log(`📍 Conectado a: ${dbInfo.rows[0].db}`);
      
      // Verificar si existe formularios
      const tables = await pool.query(`
        SELECT table_schema, table_name 
        FROM information_schema.tables 
        WHERE table_name = 'formularios'
      `);
      
      if (tables.rows.length > 0) {
        console.log(`✅ FORMULARIOS ENCONTRADO en: ${tables.rows[0].table_schema}.${tables.rows[0].table_name}`);
        
        // Probar acceso
        const test = await pool.query('SELECT * FROM formularios LIMIT 1');
        console.log(`📊 Filas en tabla: ${test.rows.length}`);
      } else {
        console.log(`❌ No se encontró formularios en esta BD`);
      }
      
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    } finally {
      await pool.end();
    }
  }
}

testAllDBs();