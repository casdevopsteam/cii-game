import React from 'react';
import { Sparkles, Bot, AlertTriangle, Lightbulb } from 'lucide-react';

interface AiAdvisorPanelProps {
  latestAdvice: string | null;
  turnNumber: number;
  inclusionScore: number;
}

export const AiAdvisorPanel: React.FC<AiAdvisorPanelProps> = ({
  latestAdvice,
  turnNumber,
  inclusionScore
}) => {
  return (
    <div className="glass-panel p-5 rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50/80 via-white to-amber-50/50 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700 border border-indigo-200">
            <Sparkles className="w-4 h-4 animate-pulse text-indigo-600" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-1.5">
              <span>AI Tycoon Executive Advisor</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold">REAL-TIME</span>
            </h4>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-700 leading-relaxed shadow-sm font-medium">
        {latestAdvice ? (
          <div className="flex items-start space-x-2.5">
            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="font-semibold text-slate-800">{latestAdvice}</p>
          </div>
        ) : (
          <div className="flex items-start space-x-2.5 text-slate-600">
            <Bot className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <p>
              Turn {turnNumber} is active. Review investment cards carefully. Balancing financial return with workplace inclusion will maximize your overall enterprise valuation score.
            </p>
          </div>
        )}
      </div>

      {inclusionScore < 40 && (
        <div className="mt-3 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2 font-medium">
          <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>Risk Alert: Low Inclusion Index ({inclusionScore}/100). Higher probability of talent flight in upcoming turns!</span>
        </div>
      )}
    </div>
  );
};
