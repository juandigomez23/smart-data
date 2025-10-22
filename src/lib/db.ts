import pkg from "pg";
const { Pool } = pkg;

// Prefer DATABASE_URL from environment so Prisma and raw SQL share the same DB.
// Fall back to the previous hard-coded config if DATABASE_URL is not set.
const databaseUrl = process.env.DATABASE_URL;

const pool = databaseUrl
    ? new Pool({ connectionString: databaseUrl })
    : new Pool({
            user: "postgres",
            host: "coolify.bambubpo.com",
            database: "postgres",
            password: "zhpzTxg20ObfYiMaJkZfoOgNMPKPC1OMTOGfButOfR2t6oAvHsXt2bneUswcMNQt",
            port: 5499,
        });

export default pool;