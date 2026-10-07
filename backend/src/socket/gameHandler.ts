import { Server, Socket } from 'socket.io';
import { db } from '../db';
import { AiOrchestrator } from '../services/aiOrchestrator';

export function setupSocketHandler(io: Server) {
  io.on('connection', (socket: Socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // Join Game Room
    socket.on('join_game', ({ sessionId, playerId }) => {
      socket.join(sessionId);
      console.log(`Player ${playerId} joined session ${sessionId}`);

      const players = db.prepare('SELECT * FROM session_players WHERE session_id = ? ORDER BY points DESC').all(sessionId);
      const session = db.prepare('SELECT * FROM sessions WHERE id = ?').get(sessionId);

      io.to(sessionId).emit('session_updated', { session, players });
    });

    // Start Game
    socket.on('start_game', ({ sessionId }) => {
      db.prepare("UPDATE sessions SET status = 'active', current_turn = 1 WHERE id = ?").run(sessionId);
      
      const session = db.prepare('SELECT * FROM sessions WHERE id = ?').get(sessionId);
      const players = db.prepare('SELECT * FROM session_players WHERE session_id = ? ORDER BY points DESC').all(sessionId);

      io.to(sessionId).emit('game_started', { session, players });
    });

    // Make Player Turn Move
    socket.on('make_turn', ({ sessionId, playerId, cardId, action }) => {
      try {
        const session: any = db.prepare('SELECT * FROM sessions WHERE id = ?').get(sessionId);
        if (!session || session.status === 'completed') return;

        const player: any = db.prepare('SELECT * FROM session_players WHERE session_id = ? AND id = ?').get(sessionId, playerId);
        if (!player) return;

        const card: any = cardId ? db.prepare('SELECT * FROM investment_cards WHERE id = ?').get(cardId) : null;

        let pointsSpent = 0;
        let pointsEarned = 0;
        let equityGain = 0;
        let inclusionGain = 0;
        let talentGain = 0;

        if (action === 'invest' && card) {
          if (player.points < card.cost) {
            socket.emit('error', { message: 'Insufficient points to invest in this card.' });
            return;
          }

          pointsSpent = card.cost;
          pointsEarned = card.yield_points;
          equityGain = card.equity_impact;
          inclusionGain = card.inclusion_impact;
          talentGain = card.talent_impact;
        }

        const newPoints = Math.max(0, player.points - pointsSpent + pointsEarned);
        const newEquity = Math.min(100, Math.max(0, player.brand_equity + equityGain));
        const newInclusion = Math.min(100, Math.max(0, player.inclusion_score + inclusionGain));
        const newTalent = Math.min(100, Math.max(0, player.talent_retained + talentGain));

        // Evaluate dynamic AI Feedback
        const aiAdvice = AiOrchestrator.evaluateDecision({
          playerName: player.player_name,
          cardTitle: card ? card.title : 'No Card',
          category: card ? card.category : 'pass',
          action,
          cost: pointsSpent,
          points: newPoints,
          brandEquity: newEquity,
          inclusionScore: newInclusion,
          talentRetained: newTalent,
          turnNumber: session.current_turn
        });

        // Record Decision
        db.prepare(`
          INSERT INTO player_decisions (id, session_id, player_id, turn_number, card_id, action, points_spent, points_earned, ai_feedback)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
          'dec_' + Date.now() + '_' + Math.random().toString(36).substring(2, 5),
          sessionId,
          playerId,
          session.current_turn,
          cardId || 'pass',
          action,
          pointsSpent,
          pointsEarned,
          aiAdvice
        );

        // Update Player stats
        db.prepare(`
          UPDATE session_players
          SET points = ?, brand_equity = ?, inclusion_score = ?, talent_retained = ?, turn_completed = ?
          WHERE id = ?
        `).run(newPoints, newEquity, newInclusion, newTalent, session.current_turn, playerId);

        // Execute Bot Moves for AI Bots in session
        const botPlayers = db.prepare('SELECT * FROM session_players WHERE session_id = ? AND is_bot = 1').all(sessionId);
        const availableCards = db.prepare('SELECT * FROM investment_cards').all();

        for (const bot of botPlayers as any[]) {
          const botDecision = AiOrchestrator.makeBotMove({
            botName: bot.player_name,
            archetype: bot.bot_archetype || 'Balanced-Strategist',
            currentPoints: bot.points,
            brandEquity: bot.brand_equity,
            inclusionScore: bot.inclusion_score,
            availableCards,
            turnNumber: session.current_turn
          });

          let bSpent = 0;
          let bEarned = 0;
          let bEquity = 0;
          let bInclusion = 0;
          let bTalent = 0;

          if (botDecision.action === 'invest' && botDecision.cardId) {
            const bCard: any = availableCards.find((c: any) => c.id === botDecision.cardId);
            if (bCard) {
              bSpent = bCard.cost;
              bEarned = bCard.yield_points;
              bEquity = bCard.equity_impact;
              bInclusion = bCard.inclusion_impact;
              bTalent = bCard.talent_impact;
            }
          }

          const botPoints = Math.max(0, bot.points - bSpent + bEarned);
          const botEq = Math.min(100, Math.max(0, bot.brand_equity + bEquity));
          const botInc = Math.min(100, Math.max(0, bot.inclusion_score + bInclusion));
          const botTal = Math.min(100, Math.max(0, bot.talent_retained + bTalent));

          db.prepare(`
            UPDATE session_players
            SET points = ?, brand_equity = ?, inclusion_score = ?, talent_retained = ?, turn_completed = ?
            WHERE id = ?
          `).run(botPoints, botEq, botInc, botTal, session.current_turn, bot.id);
        }

        // Check Event Card trigger (Chance card luck element!)
        let drawnEventCard = null;
        if (Math.random() < 0.45) { // 45% chance per turn for a market event
          const eventCards = db.prepare('SELECT * FROM event_cards').all();
          if (eventCards.length > 0) {
            drawnEventCard = eventCards[Math.floor(Math.random() * eventCards.length)];
            // Apply event impact to human player
            const evt: any = drawnEventCard;
            const evtPoints = Math.max(0, newPoints + evt.points_effect);
            const evtEquity = Math.min(100, Math.max(0, newEquity + evt.equity_effect));
            const evtInclusion = Math.min(100, Math.max(0, newInclusion + evt.inclusion_effect));

            db.prepare(`
              UPDATE session_players
              SET points = ?, brand_equity = ?, inclusion_score = ?
              WHERE id = ?
            `).run(evtPoints, evtEquity, evtInclusion, playerId);
          }
        }

        // Advance Turn or End Game
        const nextTurn = session.current_turn + 1;
        let isGameFinished = false;

        if (nextTurn > session.max_turns) {
          db.prepare("UPDATE sessions SET status = 'completed' WHERE id = ?").run(sessionId);
          isGameFinished = true;
        } else {
          db.prepare('UPDATE sessions SET current_turn = ? WHERE id = ?').run(nextTurn, sessionId);
        }

        // Fetch updated state
        const updatedSession = db.prepare('SELECT * FROM sessions WHERE id = ?').get(sessionId);
        const updatedPlayers = db.prepare('SELECT * FROM session_players WHERE session_id = ? ORDER BY points DESC').all(sessionId);
        const recentDecisions = db.prepare('SELECT * FROM player_decisions WHERE session_id = ? ORDER BY turn_number DESC LIMIT 10').all(sessionId);

        io.to(sessionId).emit('turn_completed', {
          session: updatedSession,
          players: updatedPlayers,
          aiAdvice,
          eventCard: drawnEventCard,
          isGameFinished,
          recentDecisions
        });

      } catch (err: any) {
        console.error('Socket make_turn error:', err);
        socket.emit('error', { message: err.message || 'Turn execution failed' });
      }
    });

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
}
