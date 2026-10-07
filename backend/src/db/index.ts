import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'inclusive_tycoon.db');
export const db = new Database(dbPath);

// Enable WAL mode & foreign keys
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      age INTEGER,
      company TEXT,
      country TEXT,
      role TEXT NOT NULL DEFAULT 'user', -- 'user' | 'admin' | 'superadmin'
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      code TEXT UNIQUE NOT NULL,
      creator_id TEXT NOT NULL,
      mode TEXT NOT NULL, -- 'single' | 'multi'
      status TEXT NOT NULL DEFAULT 'waiting', -- 'waiting' | 'active' | 'completed'
      current_turn INTEGER DEFAULT 1,
      max_turns INTEGER DEFAULT 10,
      turn_timer_sec INTEGER DEFAULT 60,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS session_players (
      id TEXT PRIMARY KEY,
      session_id TEXT NOT NULL,
      user_id TEXT,
      is_bot INTEGER DEFAULT 0,
      bot_archetype TEXT,
      player_name TEXT NOT NULL,
      points INTEGER DEFAULT 1000,
      brand_equity INTEGER DEFAULT 50,
      inclusion_score INTEGER DEFAULT 50,
      talent_retained INTEGER DEFAULT 70,
      turn_completed INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS investment_cards (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL, -- 'hiring' | 'retention' | 'promotion' | 'policy' | 'pay_parity' | 'leadership'
      cost INTEGER NOT NULL,
      yield_points INTEGER NOT NULL,
      equity_impact INTEGER NOT NULL,
      inclusion_impact INTEGER NOT NULL,
      talent_impact INTEGER NOT NULL,
      description TEXT NOT NULL,
      real_world_case TEXT NOT NULL,
      learning_insight TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS event_cards (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL, -- 'opportunity' | 'scandal' | 'market' | 'policy_change' | 'talent_war'
      points_effect INTEGER NOT NULL,
      equity_effect INTEGER NOT NULL,
      inclusion_effect INTEGER NOT NULL,
      narrative TEXT NOT NULL,
      takeaway TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS player_decisions (
      id TEXT PRIMARY KEY,
      session_id TEXT NOT NULL,
      player_id TEXT NOT NULL,
      turn_number INTEGER NOT NULL,
      card_id TEXT NOT NULL,
      action TEXT NOT NULL, -- 'invest' | 'pass'
      points_spent INTEGER NOT NULL,
      points_earned INTEGER NOT NULL,
      ai_feedback TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE,
      FOREIGN KEY (player_id) REFERENCES session_players(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS assessments (
      id TEXT PRIMARY KEY,
      question TEXT NOT NULL,
      options TEXT NOT NULL, -- JSON string array
      correct_option INTEGER NOT NULL,
      explanation TEXT NOT NULL,
      category TEXT NOT NULL -- 'pre' | 'post' | 'both'
    );

    CREATE TABLE IF NOT EXISTS user_assessment_responses (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      session_id TEXT,
      assessment_type TEXT NOT NULL, -- 'pre' | 'post'
      score INTEGER NOT NULL,
      total_questions INTEGER NOT NULL,
      answers_json TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS session_feedback (
      id TEXT PRIMARY KEY,
      session_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      rating INTEGER NOT NULL,
      comments TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  console.log('Database tables initialized successfully.');
}
