import { Router } from 'express';
import { db } from '../db';

const router = Router();

// Get Quiz Questions (Pre / Post / Both)
router.get('/', async (req, res) => {
  try {
    const type = (req.query.type as string) || 'both';
    let questions;

    if (type === 'both') {
      questions = await db.prepare('SELECT * FROM assessments').all();
    } else {
      questions = await db.prepare('SELECT * FROM assessments WHERE category = ? OR category = "both"').all(type);
    }

    const formatted = questions.map((q: any) => ({
      ...q,
      options: JSON.parse(q.options)
    }));

    res.json({ questions: formatted });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Submit User Quiz Response
router.post('/submit', async (req, res) => {
  try {
    const { userId, sessionId, assessmentType, answers } = req.body;
    // answers = [{ questionId: string, selectedOption: number }]

    if (!userId || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: 'userId and valid answers array are required.' });
    }

    let score = 0;
    const totalQuestions = answers.length;

    for (const ans of answers) {
      const q: any = await db.prepare('SELECT correct_option FROM assessments WHERE id = ?').get(ans.questionId);
      if (q && q.correct_option === ans.selectedOption) {
        score++;
      }
    }

    const responseId = 'res_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
    await db.prepare(`
      INSERT INTO user_assessment_responses (id, user_id, session_id, assessment_type, score, total_questions, answers_json)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(responseId, userId, sessionId || null, assessmentType || 'pre', score, totalQuestions, JSON.stringify(answers));

    res.status(201).json({
      message: 'Assessment submitted successfully',
      score,
      totalQuestions,
      percentage: Math.round((score / totalQuestions) * 100)
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Get User Assessment History
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const responses = await db.prepare('SELECT * FROM user_assessment_responses WHERE user_id = ? ORDER BY created_at DESC').all(userId);
    res.json({ responses });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
