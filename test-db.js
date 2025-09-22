import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "zhpzTxg20ObfYiMaJkZfoOgNMPKPC1OMTOGfButOfR2t6oAvHsXt2bneUswcMNQt",
  port: 5499,
});

async function testConnection() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ Conexión exitosa:", res.rows[0]);
  } catch (err) {
    console.error("❌ Error al conectar:", err);
  } finally {
    await pool.end();
  }
}

testConnection();
