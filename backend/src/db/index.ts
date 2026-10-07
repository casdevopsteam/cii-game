import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL is not set in environment variables");
  process.exit(1);
}

export const pool = new Pool({
  connectionString,
});

// Test connection
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

function convertSql(sql: string) {
  let i = 1;
  return sql.replace(/\?/g, () => `$${i++}`);
}

export const db = {
  prepare: (sql: string) => {
    const pgSql = convertSql(sql);
    return {
      get: async (...params: any[]) => {
        const res = await pool.query(pgSql, params);
        return res.rows[0];
      },
      all: async (...params: any[]) => {
        const res = await pool.query(pgSql, params);
        return res.rows;
      },
      run: async (...params: any[]) => {
        const res = await pool.query(pgSql, params);
        return { changes: res.rowCount, lastInsertRowid: null };
      }
    };
  },
  query: pool.query.bind(pool)
};

export async function initDatabase() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'user',
        age INTEGER,
        company TEXT,
        country TEXT DEFAULT 'India',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        player_name TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'active',
        current_turn INTEGER DEFAULT 1,
        max_turns INTEGER DEFAULT 12,
        metrics JSONB NOT NULL,
        events_history JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS investment_cards (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        cost INTEGER NOT NULL,
        yield_points INTEGER NOT NULL,
        equity_impact INTEGER NOT NULL,
        inclusion_impact INTEGER NOT NULL,
        talent_impact INTEGER NOT NULL,
        description TEXT,
        real_world_case TEXT,
        learning_insight TEXT
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS event_cards (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        points_effect INTEGER NOT NULL,
        equity_effect INTEGER NOT NULL,
        inclusion_effect INTEGER NOT NULL,
        narrative TEXT,
        takeaway TEXT
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS assessments (
        id TEXT PRIMARY KEY,
        question TEXT NOT NULL,
        options TEXT NOT NULL,
        correct_option INTEGER NOT NULL,
        explanation TEXT,
        category TEXT
      );
    `);
    
    console.log("Database initialized successfully.");
  } catch (err) {
    console.error("Database initialization failed:", err);
    throw err;
  } finally {
    client.release();
  }
}
