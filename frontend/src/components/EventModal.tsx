import React from 'react';
import { EventCard } from '../types/game';
import { Zap } from 'lucide-react';

interface EventModalProps {
  eventCard: EventCard | null;
  onClose: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({ eventCard, onClose }) => {
  if (!eventCard) return null;

  const isPositive = eventCard.points_effect >= 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className={`relative w-full max-w-lg rounded-3xl p-6 shadow-2xl border bg-white ${
        isPositive
          ? 'border-amber-300 ring-2 ring-amber-500/20'
          : 'border-rose-300 ring-2 ring-rose-500/20'
      }`}>
        
        {/* Top Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold ${
            isPositive ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-rose-100 text-rose-800 border border-rose-300'
          }`}>
            <Zap className="w-3.5 h-3.5" />
            <span>CHANCE CORPORATE EVENT</span>
          </div>

          <span className="text-xs font-mono uppercase text-slate-500 font-bold">
            {eventCard.category.replace('_', ' ')}
          </span>
        </div>

        {/* Event Title */}
        <h3 className="text-2xl font-black text-slate-900 tracking-tight">
          {eventCard.title}
        </h3>

        {/* Narrative */}
        <p className="text-xs text-slate-700 mt-3 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200 font-medium">
          {eventCard.narrative}
        </p>

        {/* Impact Numbers */}
        <div className="grid grid-cols-3 gap-3 my-4">
          <div className={`p-3 rounded-xl border text-center ${
            eventCard.points_effect >= 0 ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}>
            <div className="text-[10px] font-bold uppercase opacity-80">Points Impact</div>
            <div className="text-lg font-black font-mono">
              {eventCard.points_effect >= 0 ? `+${eventCard.points_effect}` : eventCard.points_effect} PTS
            </div>
          </div>

          <div className={`p-3 rounded-xl border text-center ${
            eventCard.equity_effect >= 0 ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}>
            <div className="text-[10px] font-bold uppercase opacity-80">Brand Equity</div>
            <div className="text-lg font-black font-mono">
              {eventCard.equity_effect >= 0 ? `+${eventCard.equity_effect}` : eventCard.equity_effect} Index
            </div>
          </div>

          <div className={`p-3 rounded-xl border text-center ${
            eventCard.inclusion_effect >= 0 ? 'bg-teal-50 border-teal-200 text-teal-800' : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}>
            <div className="text-[10px] font-bold uppercase opacity-80">Inclusion Impact</div>
            <div className="text-lg font-black font-mono">
              {eventCard.inclusion_effect >= 0 ? `+${eventCard.inclusion_effect}` : eventCard.inclusion_effect} Index
            </div>
          </div>
        </div>

        {/* Takeaway */}
        <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-800 mb-6 font-medium">
          <span className="font-bold text-amber-700 block mb-1">💡 Executive Lesson:</span>
          {eventCard.takeaway}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-500/25"
        >
          Acknowledge & Continue
        </button>

      </div>
    </div>
  );
};
