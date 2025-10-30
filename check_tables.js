const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL || 'postgresql://postgres@localhost:5499/smart-data' });

(async () => {
  try {
    const tables = await pool.query(`
      SELECT table_schema, table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);

    console.log('tables:', tables.rows.map(r => r.table_name));

    const cols = await pool.query(`
      SELECT column_name, data_type, udt_name, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'formularios'
      ORDER BY ordinal_position;
    `);

    console.log('formularios columns:', cols.rows);
  } catch (err) {
    console.error('Error checking tables:', err);
    process.exit(2);
  } finally {
    await pool.end();
  }
})();
