import { Router } from 'express';
import { db } from '../db';
import { AiOrchestrator } from '../services/aiOrchestrator';

const router = Router();

function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Create Session
router.post('/create', (req, res) => {
  try {
    const { creatorId, playerName, mode = 'single', numBots = 3, maxTurns = 10 } = req.body;

    if (!creatorId || !playerName) {
      return res.status(400).json({ error: 'creatorId and playerName are required.' });
    }

    const sessionId = 'ses_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
    let code = generateRoomCode();

    // Ensure unique room code
    while (db.prepare('SELECT id FROM sessions WHERE code = ?').get(code)) {
      code = generateRoomCode();
    }

    db.prepare(`
      INSERT INTO sessions (id, code, creator_id, mode, status, current_turn, max_turns)
      VALUES (?, ?, ?, ?, 'waiting', 1, ?)
    `).run(sessionId, code, creatorId, mode, maxTurns);

    // Add Human Player
    const player1Id = 'ply_' + Date.now() + '_1';
    db.prepare(`
      INSERT INTO session_players (id, session_id, user_id, is_bot, player_name, points, brand_equity, inclusion_score, talent_retained)
      VALUES (?, ?, ?, 0, ?, 1000, 50, 50, 70)
    `).run(player1Id, sessionId, creatorId, playerName);

    // If Single Player or filling with AI Bots
    if (mode === 'single' || numBots > 0) {
      const archetypes = [
        { name: 'Traditionalist CEO', type: 'Traditionalist' },
        { name: 'Profit-First CEO', type: 'Profit-First' },
        { name: 'DEI-Pioneer CEO', type: 'DEI-Pioneer' },
        { name: 'Balanced CEO', type: 'Balanced-Strategist' }
      ];

      const countToSpawn = mode === 'single' ? Math.max(numBots, 3) : numBots;

      for (let i = 0; i < Math.min(countToSpawn, 5); i++) {
        const arch = archetypes[i % archetypes.length];
        const botId = `ply_bot_${Date.now()}_${i + 1}`;
        db.prepare(`
          INSERT INTO session_players (id, session_id, user_id, is_bot, bot_archetype, player_name, points, brand_equity, inclusion_score, talent_retained)
          VALUES (?, ?, NULL, 1, ?, ?, 1000, 50, 50, 70)
        `).run(botId, sessionId, arch.type, `${arch.name} (${arch.type})`);
      }

      // Automatically set session to active if single player
      if (mode === 'single') {
        db.prepare("UPDATE sessions SET status = 'active' WHERE id = ?").run(sessionId);
      }
    }

    const session: any = db.prepare('SELECT * FROM sessions WHERE id = ?').get(sessionId);
    const players = db.prepare('SELECT * FROM session_players WHERE session_id = ?').all(sessionId);

    res.status(201).json({ session, players, roomCode: code });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to create session' });
  }
});

// Join Session by Code
router.post('/join', (req, res) => {
  try {
    const { code, userId, playerName } = req.body;

    if (!code || !playerName) {
      return res.status(400).json({ error: 'Room code and player name are required.' });
    }

    const session: any = db.prepare('SELECT * FROM sessions WHERE code = ?').get(code.toUpperCase());
    if (!session) {
      return res.status(404).json({ error: 'Session code not found.' });
    }

    if (session.status === 'completed') {
      return res.status(400).json({ error: 'Session has already finished.' });
    }

    // Check existing player
    const existingPlayer = db.prepare('SELECT * FROM session_players WHERE session_id = ? AND user_id = ?').get(session.id, userId);

    if (!existingPlayer) {
      const playerId = 'ply_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
      db.prepare(`
        INSERT INTO session_players (id, session_id, user_id, is_bot, player_name, points, brand_equity, inclusion_score, talent_retained)
        VALUES (?, ?, ?, 0, ?, 1000, 50, 50, 70)
      `).run(playerId, session.id, userId || null, playerName);
    }

    const players = db.prepare('SELECT * FROM session_players WHERE session_id = ?').all(session.id);

    res.json({ session, players });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to join session' });
  }
});

// Get Session State
router.get('/:id', (req, res) => {
  try {
    const sessionId = req.params.id;
    const session: any = db.prepare('SELECT * FROM sessions WHERE id = ?').get(sessionId);
    if (!session) return res.status(404).json({ error: 'Session not found' });

    const players = db.prepare('SELECT * FROM session_players WHERE session_id = ? ORDER BY points DESC').all(sessionId);
    const decisions = db.prepare('SELECT * FROM player_decisions WHERE session_id = ? ORDER BY turn_number ASC').all(sessionId);

    res.json({ session, players, decisions });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Get User's Past Sessions
router.get('/user/:userId', (req, res) => {
  try {
    const userId = req.params.userId;
    const sessions = db.prepare(`
      SELECT DISTINCT s.*, sp.points, sp.inclusion_score, sp.brand_equity
      FROM sessions s
      JOIN session_players sp ON s.id = sp.session_id
      WHERE sp.user_id = ?
      ORDER BY s.created_at DESC
    `).all(userId);

    res.json({ sessions });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
