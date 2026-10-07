export type Role = 'user' | 'admin' | 'superadmin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  age?: number;
  company?: string;
  country?: string;
}

export interface Session {
  id: string;
  code: string;
  creator_id: string;
  mode: 'single' | 'multi';
  status: 'waiting' | 'active' | 'completed';
  current_turn: number;
  max_turns: number;
  turn_timer_sec: number;
  created_at: string;
}

export interface Player {
  id: string;
  session_id: string;
  user_id?: string;
  is_bot: number;
  bot_archetype?: string;
  player_name: string;
  points: number;
  brand_equity: number;
  inclusion_score: number;
  talent_retained: number;
  turn_completed: number;
}

export interface InvestmentCard {
  id: string;
  title: string;
  category: 'hiring' | 'retention' | 'promotion' | 'policy' | 'pay_parity' | 'leadership';
  cost: number;
  yield_points: number;
  equity_impact: number;
  inclusion_impact: number;
  talent_impact: number;
  description: string;
  real_world_case: string;
  learning_insight: string;
}

export interface EventCard {
  id: string;
  title: string;
  category: 'opportunity' | 'scandal' | 'market' | 'policy_change' | 'talent_war';
  points_effect: number;
  equity_effect: number;
  inclusion_effect: number;
  narrative: string;
  takeaway: string;
}

export interface PlayerDecision {
  id: string;
  session_id: string;
  player_id: string;
  turn_number: number;
  card_id: string;
  action: 'invest' | 'pass';
  points_spent: number;
  points_earned: number;
  ai_feedback: string;
  created_at: string;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correct_option: number;
  explanation: string;
  category: string;
}

export interface AiDebrief {
  personaTitle: string;
  summary: string;
  strengths: string[];
  blindspots: string[];
  actionableSteps: string[];
}
