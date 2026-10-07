import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { initDatabase } from './db';
import { seedData } from './db/seed';
import authRoutes from './routes/auth';
import sessionRoutes from './routes/sessions';
import cardRoutes from './routes/cards';
import assessmentRoutes from './routes/assessments';
import analyticsRoutes from './routes/analytics';
import aiRoutes from './routes/ai';
import { setupSocketHandler } from './socket/gameHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Initialize Database & Seed
async function startServer() {
  await initDatabase();
  await seedData();

  // REST Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/sessions', sessionRoutes);
  app.use('/api/cards', cardRoutes);
  app.use('/api/assessments', assessmentRoutes);
  app.use('/api/analytics', analyticsRoutes);
  app.use('/api/ai', aiRoutes);

  // Health Check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'CII CWL Inclusive Tycoon API Server',
      version: '1.0.0',
      timestamp: new Date().toISOString()
    });
  });

  // Setup HTTP & Socket.io Server
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  setupSocketHandler(io);

  server.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 CII Inclusive Tycoon Backend running on port ${PORT}`);
    console.log(`====================================================`);
  });
}

startServer().catch(console.error);
