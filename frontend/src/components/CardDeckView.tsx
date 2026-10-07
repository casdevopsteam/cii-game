import React, { useState } from 'react';
import { InvestmentCard, Player } from '../types/game';
import { CheckCircle2, TrendingUp, HeartHandshake, Award, HelpCircle } from 'lucide-react';

interface CardDeckViewProps {
  cards: InvestmentCard[];
  player: Player;
  onMakeDecision: (cardId: string | null, action: 'invest' | 'pass') => void;
  disabled: boolean;
}

export const CardDeckView: React.FC<CardDeckViewProps> = ({
  cards,
  player,
  onMakeDecision,
  disabled
}) => {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(cards.length > 0 ? cards[0].id : null);
  const selectedCard = cards.find(c => c.id === selectedCardId) || cards[0];

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700">Turn Investment Selection</span>
          <h3 className="text-xl font-black text-slate-900">Strategic Investment Cards</h3>
        </div>

        <button
          onClick={() => onMakeDecision(null, 'pass')}
          disabled={disabled}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-bold text-xs border border-slate-300 transition-all flex items-center space-x-1.5 shadow-sm"
        >
          <span>Pass Turn (Conserve Points)</span>
        </button>
      </div>

      {/* Main Card Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Scrollable Card Deck */}
        <div className="lg:col-span-5 space-y-3 max-h-[520px] overflow-y-auto pr-1">
          {cards.map(card => {
            const isSelected = card.id === selectedCardId;
            const canAfford = player.points >= card.cost;

            return (
              <div
                key={card.id}
                onClick={() => setSelectedCardId(card.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-white border-amber-500 shadow-lg ring-2 ring-amber-500/30'
                    : 'bg-white/90 border-slate-200 hover:border-slate-300 hover:bg-white shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-amber-700 border border-slate-200">
                      {card.category.replace('_', ' ')}
                    </span>
                    <h4 className="text-sm font-extrabold text-slate-900 mt-1.5">{card.title}</h4>
                  </div>

                  <div className="text-right">
                    <span className={`text-xs font-black font-mono px-2 py-1 rounded-lg ${
                      canAfford ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}>
                      {card.cost} PTS
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-center space-x-4 text-[11px] text-slate-600 font-semibold">
                  <span className="flex items-center space-x-1 text-emerald-700">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+{card.yield_points} Yield</span>
                  </span>
                  <span className="flex items-center space-x-1 text-teal-700">
                    <HeartHandshake className="w-3.5 h-3.5" />
                    <span>+{card.inclusion_impact} Inc</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Detailed Card Case Study & Action */}
        <div className="lg:col-span-7">
          {selectedCard ? (
            <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white/95 shadow-md space-y-6 animate-fadeIn">
              
              {/* Card Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-200">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-700">
                    Category: {selectedCard.category.replace('_', ' ')}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">{selectedCard.title}</h3>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Cost</div>
                  <div className="text-2xl font-black text-amber-600 font-mono">{selectedCard.cost} PTS</div>
                </div>
              </div>

              {/* Impact Metrics Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-[10px] text-slate-500 font-bold">Financial Return</div>
                  <div className="text-base font-black text-emerald-700 font-mono">+{selectedCard.yield_points} PTS</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-[10px] text-slate-500 font-bold">Inclusion Score</div>
                  <div className="text-base font-black text-teal-700 font-mono">+{selectedCard.inclusion_impact} Index</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-[10px] text-slate-500 font-bold">Brand Equity</div>
                  <div className="text-base font-black text-amber-700 font-mono">+{selectedCard.equity_impact} Index</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Strategic Overview</h5>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200 font-medium">
                  {selectedCard.description}
                </p>
              </div>

              {/* Real World Case Study */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 shadow-sm">
                <div className="flex items-center space-x-2 text-amber-800 font-bold text-xs mb-1">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Real-World Benchmark Case</span>
                </div>
                <p className="text-xs text-amber-900 leading-relaxed font-medium">
                  {selectedCard.real_world_case}
                </p>
              </div>

              {/* Learning Insight */}
              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 shadow-sm">
                <div className="flex items-center space-x-2 text-indigo-800 font-bold text-xs mb-1">
                  <HelpCircle className="w-4 h-4 text-indigo-600" />
                  <span>CII CWL Executive Takeaway</span>
                </div>
                <p className="text-xs text-indigo-900 leading-relaxed font-medium">
                  {selectedCard.learning_insight}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onMakeDecision(selectedCard.id, 'invest')}
                disabled={disabled || player.points < selectedCard.cost}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 text-white font-extrabold text-xs shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center space-x-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {player.points < selectedCard.cost
                    ? `Insufficient Points (${selectedCard.cost} required)`
                    : `Invest ${selectedCard.cost} Points in ${selectedCard.title}`}
                </span>
              </button>

            </div>
          ) : (
            <div className="p-12 text-center text-slate-500">
              Select a card from the deck to review strategic metrics.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
