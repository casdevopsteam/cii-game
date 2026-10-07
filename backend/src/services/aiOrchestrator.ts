export interface DecisionContext {
  playerName: string;
  cardTitle: string;
  category: string;
  action: 'invest' | 'pass';
  cost: number;
  points: number;
  brandEquity: number;
  inclusionScore: number;
  talentRetained: number;
  turnNumber: number;
}

export interface BotDecisionInput {
  botName: string;
  archetype: string;
  currentPoints: number;
  brandEquity: number;
  inclusionScore: number;
  availableCards: any[];
  turnNumber: number;
}

export class AiOrchestrator {
  /**
   * Generates dynamic real-time AI advice for a player's decision
   */
  public static evaluateDecision(ctx: DecisionContext): string {
    const { action, cardTitle, category, cost, inclusionScore, brandEquity, points, turnNumber } = ctx;

    if (action === 'pass') {
      if (inclusionScore < 40) {
        return `⚠️ Passing on "${cardTitle}" conserves ${cost} pts short-term, but your Inclusion Score is critically low (${inclusionScore}/100). Delaying DEI investments risks severe talent attrition in upcoming turns.`;
      }
      return `💡 You passed on "${cardTitle}". Conserving capital brings your cash reserves to ${points} pts for strategic flexibility in Turn ${turnNumber + 1}.`;
    }

    // Invest action
    let insight = `✅ Investment in "${cardTitle}" logged. `;

    if (category === 'pay_parity' || category === 'retention') {
      insight += `Closing pay equity & support gaps builds organizational trust. Expect immediate gains in talent retention (+${ctx.talentRetained + 5}%).`;
    } else if (category === 'leadership' || category === 'hiring') {
      insight += `Expanding diverse talent pipelines boosts innovation capacity and strengthens your employer brand equity (${brandEquity}/100).`;
    } else {
      insight += `Embedding inclusive workplace policies establishes your enterprise as a progressive market leader.`;
    }

    if (points < 200) {
      insight += ` ⚠️ Warning: Low remaining capital (${points} pts). Ensure cash reserves for unforeseen chance events!`;
    }

    return insight;
  }

  /**
   * Evaluates AI Bot choices based on dynamic corporate archetypes
   */
  public static makeBotMove(input: BotDecisionInput): { cardId: string; action: 'invest' | 'pass'; reasoning: string } {
    const { archetype, currentPoints, availableCards, brandEquity, inclusionScore } = input;

    if (!availableCards || availableCards.length === 0) {
      return { cardId: '', action: 'pass', reasoning: 'No available cards to choose.' };
    }

    let selectedCard = availableCards[0];

    if (archetype === 'DEI-Pioneer') {
      // Pick highest inclusion impact
      selectedCard = [...availableCards].sort((a, b) => b.inclusion_impact - a.inclusion_impact)[0];
    } else if (archetype === 'Profit-First') {
      // Pick highest yield
      selectedCard = [...availableCards].sort((a, b) => b.yield_points - a.yield_points)[0];
    } else if (archetype === 'Traditionalist') {
      // Pick lowest cost or pass
      selectedCard = [...availableCards].sort((a, b) => a.cost - b.cost)[0];
    } else {
      // Balanced Strategist - Best ratio of yield + inclusion to cost
      selectedCard = [...availableCards].sort((a, b) => {
        const scoreA = (a.yield_points + a.inclusion_impact * 2) / Math.max(a.cost, 1);
        const scoreB = (b.yield_points + b.inclusion_impact * 2) / Math.max(b.cost, 1);
        return scoreB - scoreA;
      })[0];
    }

    if (currentPoints < selectedCard.cost) {
      return {
        cardId: selectedCard.id,
        action: 'pass',
        reasoning: `${input.botName} (${archetype}) lacked funds (${currentPoints} pts available vs ${selectedCard.cost} required) and chose to pass.`
      };
    }

    // Traditionalist passes if cost > 120
    if (archetype === 'Traditionalist' && selectedCard.cost > 120 && Math.random() > 0.4) {
      return {
        cardId: selectedCard.id,
        action: 'pass',
        reasoning: `${input.botName} (${archetype}) deemed the investment cost too high and decided to hold cash.`
      };
    }

    return {
      cardId: selectedCard.id,
      action: 'invest',
      reasoning: `${input.botName} (${archetype}) invested ${selectedCard.cost} pts in "${selectedCard.title}" aligned with their core corporate strategy.`
    };
  }

  /**
   * Generates a comprehensive End-of-Game AI Leadership Debrief
   */
  public static generateEndGameDebrief(player: any, decisions: any[]): {
    personaTitle: string;
    summary: string;
    strengths: string[];
    blindspots: string[];
    actionableSteps: string[];
  } {
    const totalInvestments = decisions.filter(d => d.action === 'invest').length;
    const finalPoints = player.points;
    const finalInclusion = player.inclusion_score;
    const finalEquity = player.brand_equity;

    let personaTitle = 'Balanced Inclusive Strategist';
    let summary = 'You demonstrated a strategic balance between financial discipline and progressive workplace inclusion.';
    const strengths: string[] = [];
    const blindspots: string[] = [];
    const actionableSteps: string[] = [];

    if (finalInclusion >= 75 && finalPoints >= 1200) {
      personaTitle = 'Transformational Inclusion Tycoon';
      summary = 'Exceptional performance! You proved that embedding inclusive workplace policies drives superior financial returns and market equity.';
      strengths.push('High alignment of DEI initiatives with core business growth.');
      strengths.push('Robust brand equity and top talent retention rates.');
    } else if (finalInclusion < 50) {
      personaTitle = 'Short-Term Profit Maximizer';
      summary = 'You prioritized immediate cash accumulation over long-term inclusion infrastructure, leaving your firm vulnerable to systemic retention losses.';
      blindspots.push('Underinvested in pay equity and returnship programs.');
      blindspots.push('Higher risk of talent attrition in competitive markets.');
    } else {
      personaTitle = 'Pragmatic DEI Advocate';
      summary = 'Solid execution with consistent investment in employee welfare and workplace policy improvements.';
      strengths.push('Steady capital management and risk control.');
    }

    if (totalInvestments > 7) {
      strengths.push('Proactive strategic mindset across diverse investment categories.');
    } else {
      blindspots.push('Conservative investment cadence; missed opportunities to leverage high-yield inclusion cards.');
    }

    actionableSteps.push('Conduct a comprehensive internal gender pay audit across all senior bands.');
    actionableSteps.push('Establish a formal executive sponsorship program for high-potential female managers.');
    actionableSteps.push('Implement structured returnship pathways to re-engage experienced talent after career breaks.');

    return {
      personaTitle,
      summary,
      strengths,
      blindspots,
      actionableSteps
    };
  }
}
