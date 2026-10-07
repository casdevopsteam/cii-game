import React from 'react';
import { Session, Player } from '../types/game';
import { Trophy, Users, HeartHandshake, Flame, CircleDollarSign, Bot } from 'lucide-react';

interface BoardViewProps {
  session: Session;
  players: Player[];
  currentPlayerId: string;
}

export const BoardView: React.FC<BoardViewProps> = ({ session, players, currentPlayerId }) => {
  const me = players.find(p => p.id === currentPlayerId) || players[0];

  return (
    <div className="w-full space-y-6">
      
      {/* Turn Tracker & Top Status Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-200 bg-white/90 shadow-sm flex flex-wrap items-center justify-between gap-4">
        
        {/* Turn Progress */}
        <div className="flex items-center space-x-3">
          <div className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-extrabold text-sm shadow-md shadow-amber-500/20 flex items-center space-x-1.5">
            <Flame className="w-4 h-4 fill-white" />
            <span>Turn {session.current_turn} of {session.max_turns}</span>
          </div>

          <div className="text-xs text-slate-500 hidden sm:block font-medium">
            Status: <span className="text-emerald-700 font-bold capitalize">{session.status}</span>
          </div>
        </div>

        {/* 10 Turn Step Indicator */}
        <div className="flex items-center space-x-1.5 overflow-x-auto py-1">
          {Array.from({ length: session.max_turns }).map((_, idx) => {
            const turnNum = idx + 1;
            const isCurrent = turnNum === session.current_turn;
            const isPast = turnNum < session.current_turn;

            return (
              <div
                key={turnNum}
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs transition-all ${
                  isCurrent
                    ? 'bg-amber-500 text-white scale-110 shadow-lg shadow-amber-500/40 ring-2 ring-amber-300'
                    : isPast
                    ? 'bg-amber-50 text-amber-800 border border-amber-300'
                    : 'bg-slate-100 text-slate-400 border border-slate-200'
                }`}
              >
                T{turnNum}
              </div>
            );
          })}
        </div>

        {/* Session Code */}
        <div className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-amber-800 font-bold">
          ROOM CODE: <span className="font-extrabold text-amber-600">{session.code}</span>
        </div>
      </div>

      {/* Main Stats Grid & Competitor Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Player Financial & DEI Dashboard */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-200 bg-white/95 shadow-md space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-600">Enterprise Dashboard</span>
              <h2 className="text-2xl font-black text-slate-900 flex items-center space-x-2">
                <span>{me ? me.player_name : 'Executive'}</span>
                {me && me.is_bot === 1 && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-700 border border-blue-200">AI Bot</span>
                )}
              </h2>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center space-x-2 shadow-sm">
              <CircleDollarSign className="w-5 h-5 text-amber-600" />
              <div>
                <div className="text-[10px] text-amber-700 font-bold uppercase">Capital Points</div>
                <div className="text-xl font-black">{me ? me.points : 1000} PTS</div>
              </div>
            </div>
          </div>

          {/* Key Metric Gauges Grid */}
          <div className="grid grid-cols-3 gap-4">
            
            {/* Inclusion Score Gauge */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                <span className="font-bold flex items-center space-x-1">
                  <HeartHandshake className="w-4 h-4 text-emerald-600" />
                  <span>Inclusion Impact</span>
                </span>
                <span className="font-mono font-black text-emerald-700">{me ? me.inclusion_score : 50}/100</span>
              </div>
              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                  style={{ width: `${me ? me.inclusion_score : 50}%` }}
                ></div>
              </div>
            </div>

            {/* Brand Equity Gauge */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                <span className="font-bold flex items-center space-x-1">
                  <Trophy className="w-4 h-4 text-amber-600" />
                  <span>Brand Equity</span>
                </span>
                <span className="font-mono font-black text-amber-700">{me ? me.brand_equity : 50}/100</span>
              </div>
              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500"
                  style={{ width: `${me ? me.brand_equity : 50}%` }}
                ></div>
              </div>
            </div>

            {/* Talent Retention Gauge */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                <span className="font-bold flex items-center space-x-1">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>Talent Retention</span>
                </span>
                <span className="font-mono font-black text-blue-700">{me ? me.talent_retained : 70}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 transition-all duration-500"
                  style={{ width: `${me ? me.talent_retained : 70}%` }}
                ></div>
              </div>
            </div>

          </div>
        </div>

        {/* Right: Live Competitor Leaderboard */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white/95 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Session Leaderboard</span>
            </h3>
            <span className="text-[11px] text-slate-500 font-semibold">{players.length} Competitors</span>
          </div>

          <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
            {players.map((p, rank) => {
              const isMe = p.id === currentPlayerId;
              return (
                <div
                  key={p.id}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                    isMe
                      ? 'bg-amber-50 border-amber-300 text-slate-900 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                      rank === 0 ? 'bg-amber-500 text-white' :
                      rank === 1 ? 'bg-slate-300 text-slate-800' :
                      rank === 2 ? 'bg-amber-700 text-white' :
                      'bg-slate-200 text-slate-600'
                    }`}>
                      {rank + 1}
                    </span>

                    <div>
                      <div className="text-xs font-extrabold flex items-center space-x-1 text-slate-900">
                        <span>{p.player_name}</span>
                        {p.is_bot === 1 && (
                          <span title={p.bot_archetype}>
                            <Bot className="w-3.5 h-3.5 text-blue-600 inline" />
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium">
                        Inc: {p.inclusion_score}/100 | Equity: {p.brand_equity}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-black font-mono text-amber-700">{p.points} PTS</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
