import { Router } from 'express';
import { AiOrchestrator, DecisionContext } from '../services/aiOrchestrator';
import { db } from '../db';

const router = Router();

// Evaluate Real-Time Turn Decision
router.post('/evaluate-decision', (req, res) => {
  try {
    const ctx: DecisionContext = req.body;
    const advice = AiOrchestrator.evaluateDecision(ctx);
    res.json({ advice });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// End Game Comprehensive AI Debrief
router.post('/debrief', (req, res) => {
  try {
    const { sessionId, playerId } = req.body;

    if (!sessionId || !playerId) {
      return res.status(400).json({ error: 'sessionId and playerId are required.' });
    }

    const player: any = db.prepare('SELECT * FROM session_players WHERE session_id = ? AND id = ?').get(sessionId, playerId);
    if (!player) return res.status(404).json({ error: 'Player record not found.' });

    const decisions = db.prepare('SELECT * FROM player_decisions WHERE session_id = ? AND player_id = ?').all(sessionId, playerId);

    const debrief = AiOrchestrator.generateEndGameDebrief(player, decisions);
    res.json({ debrief });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
