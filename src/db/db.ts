// src/config/db.ts

import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  ssl: {
    rejectUnauthorized: false // needed for AWS RDS unless you're using a certificate
  }

});

// Optional: Test connection when the server starts
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Database connected at:", res?.rows[0]?.now);
  }
});

export default pool;
