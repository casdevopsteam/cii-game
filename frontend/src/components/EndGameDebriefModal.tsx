import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Player, AiDebrief } from '../types/game';
import { fetchApi } from '../api/client';
import { Trophy, Award, CheckCircle2, AlertTriangle, ArrowRight, FileSpreadsheet } from 'lucide-react';

interface EndGameDebriefModalProps {
  sessionId: string;
  players: Player[];
  currentPlayerId: string;
  onRestart: () => void;
}

export const EndGameDebriefModal: React.FC<EndGameDebriefModalProps> = ({
  sessionId,
  players,
  currentPlayerId,
  onRestart
}) => {
  const [debrief, setDebrief] = useState<AiDebrief | null>(null);
  const [loading, setLoading] = useState(true);

  const winner = players[0];
  const me = players.find(p => p.id === currentPlayerId) || players[0];

  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });

    loadDebrief();
  }, []);

  const loadDebrief = async () => {
    try {
      const res: any = await fetchApi('/ai/debrief', {
        method: 'POST',
        body: JSON.stringify({ sessionId, playerId: me.id })
      });
      setDebrief(res.debrief);
    } catch (err) {
      console.error('Failed to load end game debrief', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCertificate = () => {
    const userId = me.user_id || me.id;
    window.open(`/api/analytics/certificate/${sessionId}/${userId}`, '_blank');
  };

  const handleDownloadCsv = () => {
    window.open(`/api/analytics/export/csv/${sessionId}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl my-8 bg-white border border-amber-300 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-500/20">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">SIMULATION COMPLETED</h2>
          <p className="text-xs text-amber-700 font-extrabold uppercase tracking-widest mt-1">
            Winner: {winner ? winner.player_name : 'Executive Tycoon'} ({winner ? winner.points : 0} PTS)
          </p>
        </div>

        {/* Final Leaderboard Table */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-200 bg-slate-50">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Final Leaderboard Standings</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {players.map((p, idx) => (
              <div
                key={p.id}
                className={`p-2.5 rounded-xl flex items-center justify-between text-xs font-semibold ${
                  p.id === me.id ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-white text-slate-800 border border-slate-200'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-700">
                    {idx + 1}
                  </span>
                  <span>{p.player_name} {p.id === me.id ? '(You)' : ''}</span>
                </div>
                <div className="flex items-center space-x-4 font-mono">
                  <span>Inc: {p.inclusion_score}</span>
                  <span className="text-amber-800 font-extrabold">{p.points} PTS</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Leadership Debrief */}
        {loading ? (
          <div className="text-center py-6 text-slate-500 text-xs font-semibold">
            Generating AI Executive Performance Debrief...
          </div>
        ) : debrief ? (
          <div className="space-y-4 animate-fadeIn">
            
            {/* Archetype Title */}
            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-center">
              <span className="text-[10px] uppercase font-bold text-indigo-700 tracking-wider">Your Executive Leadership Persona</span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">{debrief.personaTitle}</h3>
              <p className="text-xs text-indigo-900 font-medium mt-1">{debrief.summary}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Strengths */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-medium">
                <div className="font-bold text-emerald-800 flex items-center space-x-1 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Strategic Strengths</span>
                </div>
                <ul className="space-y-1 text-slate-800 list-disc list-inside">
                  {debrief.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              {/* Blindspots */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs font-medium">
                <div className="font-bold text-amber-800 flex items-center space-x-1 mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Growth & Blindspots</span>
                </div>
                <ul className="space-y-1 text-slate-800 list-disc list-inside">
                  {debrief.blindspots.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Actionable Steps */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium">
              <div className="font-bold text-teal-800 mb-2">📋 Recommended Organizational Interventions:</div>
              <ol className="space-y-1 text-slate-800 list-decimal list-inside">
                {debrief.actionableSteps.map((act, i) => (
                  <li key={i}>{act}</li>
                ))}
              </ol>
            </div>

          </div>
        ) : null}

        {/* Action Buttons: Certificate PDF, CSV, Play Again */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200">
          <button
            onClick={handleDownloadCertificate}
            className="py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-extrabold text-xs shadow-md shadow-amber-500/20 flex items-center justify-center space-x-1.5"
          >
            <Award className="w-4 h-4" />
            <span>Download PDF Certificate</span>
          </button>

          <button
            onClick={handleDownloadCsv}
            className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 flex items-center justify-center space-x-1.5"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Export Results CSV</span>
          </button>

          <button
            onClick={onRestart}
            className="py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 flex items-center justify-center space-x-1.5"
          >
            <ArrowRight className="w-4 h-4" />
            <span>Start New Game</span>
          </button>
        </div>

      </div>
    </div>
  );
};
