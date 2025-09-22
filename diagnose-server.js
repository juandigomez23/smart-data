// diagnose-server.js
import pkg from 'pg';
const { Pool } = pkg;

// Prueba diferentes configuraciones del servidor smart-data
const configs = [
  { host: "localhost", port: 5499, desc: "localhost:5499" },
  { host: "localhost", port: 5499, desc: "localhost:5499" },
  { host: "127.0.0.1", port: 5499, desc: "127.0.0.1:5499" },
];

async function diagnoseServers() {
  for (const config of configs) {
    console.log(`\n🔍 Probando servidor: ${config.desc}`);
    
    const pool = new Pool({
      user: "postgres",
      host: config.host,
      database: "postgres",
      password: "zhpzTxg20ObfYiMaJkZfoOgNMPKPC1OMTOGfButOfR2t6oAvHsXt2bneUswcMNQt",
      port: config.port,
    });

    try {
      const info = await pool.query('SELECT version(), current_database() as db');
      console.log(`✅ Conectado a: ${info.rows[0].db}`);
      console.log(`📋 Servidor: ${info.rows[0].version.split(',')[0]}`);
      
      // Verificar tabla formularios
      const tables = await pool.query(`
        SELECT table_schema, table_name 
        FROM information_schema.tables 
        WHERE table_name = 'formularios'
      `);
      
      if (tables.rows.length > 0) {
        console.log(`🎯 FORMULARIOS ENCONTRADO en: ${tables.rows[0].table_schema}.${tables.rows[0].table_name}`);
        
        // Probar acceso
        const test = await pool.query('SELECT * FROM formularios LIMIT 1');
        console.log(`📊 Filas: ${test.rows.length}`);
        
        if (test.rows.length > 0) {
          console.log("📝 Datos:", test.rows[0]);
        }
      } else {
        console.log("❌ No se encontró formularios");
      }
      
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    } finally {
      await pool.end();
    }
  }
}

diagnoseServers();