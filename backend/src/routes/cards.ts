import { Router } from 'express';
import { db } from '../db';

const router = Router();

// Get Investment Cards
router.get('/investment', async (req, res) => {
  try {
    const cards = await db.prepare('SELECT * FROM investment_cards ORDER BY cost ASC').all();
    res.json({ cards });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Get Event Cards
router.get('/event', async (req, res) => {
  try {
    const cards = await db.prepare('SELECT * FROM event_cards').all();
    res.json({ cards });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Create Investment Card (Admin / Super Admin)
router.post('/investment', async (req, res) => {
  try {
    const { title, category, cost, yield_points, equity_impact, inclusion_impact, talent_impact, description, real_world_case, learning_insight } = req.body;

    if (!title || !cost || !description) {
      return res.status(400).json({ error: 'Title, cost, and description are required.' });
    }

    const cardId = 'inv_' + Date.now();
    await db.prepare(`
      INSERT INTO investment_cards 
      (id, title, category, cost, yield_points, equity_impact, inclusion_impact, talent_impact, description, real_world_case, learning_insight)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      cardId,
      title,
      category || 'policy',
      Number(cost),
      Number(yield_points || 150),
      Number(equity_impact || 10),
      Number(inclusion_impact || 15),
      Number(talent_impact || 15),
      description,
      real_world_case || 'Industry benchmark data.',
      learning_insight || 'Key corporate learning takeaway.'
    );

    res.status(201).json({ message: 'Investment card created successfully', cardId });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Investment Card (Admin / Super Admin)
router.delete('/investment/:id', async (req, res) => {
  try {
    const cardId = req.params.id;
    await db.prepare('DELETE FROM investment_cards WHERE id = ?').run(cardId);
    res.json({ message: 'Card deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
