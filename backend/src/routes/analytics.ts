import { Router } from 'express';
import { db } from '../db';
import { generateCertificatePDF } from '../services/pdfGenerator';
import { AiOrchestrator } from '../services/aiOrchestrator';

const router = Router();

// Super Admin Platform Analytics
router.get('/superadmin', async (req, res) => {
  try {
    const totalUsers: any = await db.prepare('SELECT COUNT(*) as count FROM users WHERE role = "user"').get();
    const totalAdmins: any = await db.prepare('SELECT COUNT(*) as count FROM users WHERE role = "admin"').get();
    const totalSessions: any = await db.prepare('SELECT COUNT(*) as count FROM sessions').get();
    const completedSessions: any = await db.prepare('SELECT COUNT(*) as count FROM sessions WHERE status = "completed"').get();
    const totalDecisions: any = await db.prepare('SELECT COUNT(*) as count FROM player_decisions').get();

    const preAssessmentAvg: any = await db.prepare('SELECT AVG(CAST(score AS FLOAT) / total_questions * 100) as avg FROM user_assessment_responses WHERE assessment_type = "pre"').get();
    const postAssessmentAvg: any = await db.prepare('SELECT AVG(CAST(score AS FLOAT) / total_questions * 100) as avg FROM user_assessment_responses WHERE assessment_type = "post"').get();

    // Investment card choice breakdown
    const cardStats = await db.prepare(`
      SELECT ic.title, ic.category, COUNT(pd.id) as pick_count
      FROM investment_cards ic
      LEFT JOIN player_decisions pd ON ic.id = pd.card_id AND pd.action = 'invest'
      GROUP BY ic.id
      ORDER BY pick_count DESC
    `).all();

    // Recent sessions
    const recentSessions = await db.prepare(`
      SELECT s.*, u.name as creator_name, u.company
      FROM sessions s
      LEFT JOIN users u ON s.creator_id = u.id
      ORDER BY s.created_at DESC
      LIMIT 10
    `).all();

    res.json({
      metrics: {
        totalUsers: totalUsers.count,
        totalAdmins: totalAdmins.count,
        totalSessions: totalSessions.count,
        completedSessions: completedSessions.count,
        completionRate: totalSessions.count > 0 ? Math.round((completedSessions.count / totalSessions.count) * 100) : 0,
        totalDecisions: totalDecisions.count,
        preQuizAverage: Math.round(preAssessmentAvg.avg || 0),
        postQuizAverage: Math.round(postAssessmentAvg.avg || 0),
        knowledgeGain: Math.round((postAssessmentAvg.avg || 0) - (preAssessmentAvg.avg || 0))
      },
      cardStats,
      recentSessions
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Institutional Admin Session Analytics
router.get('/admin/:adminId', async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const adminSessions = await db.prepare('SELECT * FROM sessions WHERE creator_id = ? ORDER BY created_at DESC').all(adminId);

    const sessionIds = adminSessions.map((s: any) => s.id);
    let totalParticipants = 0;
    if (sessionIds.length > 0) {
      const placeholders = sessionIds.map(() => '?').join(',');
      const countRes: any = await db.prepare(`SELECT COUNT(DISTINCT user_id) as count FROM session_players WHERE session_id IN (${placeholders}) AND is_bot = 0`).get(...sessionIds);
      totalParticipants = countRes.count;
    }

    res.json({
      totalSessions: adminSessions.length,
      totalParticipants,
      sessions: adminSessions
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Download CSV of Session Results
router.get('/export/csv/:sessionId', async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    const session: any = await db.prepare('SELECT * FROM sessions WHERE id = ?').get(sessionId);
    if (!session) return res.status(404).json({ error: 'Session not found' });

    const players = await db.prepare('SELECT * FROM session_players WHERE session_id = ? ORDER BY points DESC').all(sessionId);

    let csv = 'Player Name,Is Bot,Archetype,Final Points,Brand Equity,Inclusion Score,Talent Retained\n';
    players.forEach((p: any) => {
      csv += `"${p.player_name}",${p.is_bot ? 'Yes' : 'No'},"${p.bot_archetype || 'Human'}",${p.points},${p.brand_equity},${p.inclusion_score},${p.talent_retained}\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=Inclusive_Tycoon_Session_${session.code}.csv`);
    res.status(200).send(csv);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Download PDF Certificate
router.get('/certificate/:sessionId/:userId', async (req, res) => {
  try {
    const { sessionId, userId } = req.params;
    const player: any = await db.prepare('SELECT * FROM session_players WHERE session_id = ? AND (user_id = ? OR id = ?)').get(sessionId, userId, userId);
    const user: any = await db.prepare('SELECT * FROM users WHERE id = ?').get(userId);

    if (!player) return res.status(404).json({ error: 'Player data not found for this session.' });

    const decisions = await db.prepare('SELECT * FROM player_decisions WHERE session_id = ? AND player_id = ?').all(sessionId, player.id);
    const debrief = AiOrchestrator.generateEndGameDebrief(player, decisions);

    const pdfBuffer = await generateCertificatePDF({
      playerName: player.player_name || (user ? user.name : 'Participant'),
      company: user ? user.company : '',
      score: player.points,
      inclusionScore: player.inclusion_score,
      brandEquity: player.brand_equity,
      personaTitle: debrief.personaTitle,
      completedAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="Certificate_${player.player_name.replace(/\s+/g, '_')}.pdf"`);
    res.send(pdfBuffer);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
