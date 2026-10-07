import React, { useState, useEffect } from 'react';
import { AssessmentQuestion } from '../types/game';
import { fetchApi } from '../api/client';
import { 
  FileText, 
  BarChart3, 
  Clock, 
  Target, 
  Lightbulb, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  CheckSquare 
} from 'lucide-react';

interface PrePostQuizModalProps {
  type: 'pre' | 'post';
  userId: string;
  sessionId?: string;
  onComplete: (score: number, total: number) => void;
  onClose?: () => void;
}

export const PrePostQuizModal: React.FC<PrePostQuizModalProps> = ({
  type,
  userId,
  sessionId,
  onComplete,
  onClose
}) => {
  const [activeQuizType, setActiveQuizType] = useState<'pre' | 'post'>(type);
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{ score: number; total: number; percentage: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuestions();
  }, [activeQuizType]);

  const loadQuestions = async () => {
    setLoading(true);
    try {
      const data: any = await fetchApi(`/assessments?type=${activeQuizType}`);
      setQuestions(data.questions || []);
    } catch (err) {
      console.error('Failed to load quiz questions', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (questionId: string | undefined, optionIndex: number) => {
    if (submitted) return;
    const qKey = questionId || String(currentIndex);
    setSelectedAnswers(prev => ({ ...prev, [qKey]: optionIndex }));
  };

  const handleSubmit = async () => {
    const answersArray = Object.entries(selectedAnswers).map(([qId, optIdx]) => ({
      questionId: qId,
      selectedOption: optIdx
    }));

    try {
      const res: any = await fetchApi('/assessments/submit', {
        method: 'POST',
        body: JSON.stringify({
          userId,
          sessionId,
          assessmentType: activeQuizType,
          answers: answersArray
        })
      });

      setResult({
        score: res.score,
        total: res.totalQuestions,
        percentage: res.percentage
      });
      setSubmitted(true);
      onComplete(res.score, res.totalQuestions);
    } catch (err) {
      console.error('Error submitting quiz', err);
    }
  };

  // Option subtitle mappings for realistic context
  const getOptionSubtitle = (optText: string, idx: number) => {
    if (optText.includes('audits')) return 'Regular audits help identify disparities and enable data-driven corrective actions.';
    if (optText.includes('negotiations')) return 'Allows employees to advocate for their own compensation based on performance.';
    if (optText.includes('bonuses')) return 'Rewards individual contribution but does not address systemic pay gaps.';
    if (optText.includes('budgets')) return 'May improve compensation but does not specifically address inequities.';
    
    // Default fallback descriptions
    const defaults = [
      'Establishes structural accountability across teams and departments.',
      'Provides flexible frameworks tailored to individual role demands.',
      'Incentivizes immediate performance outputs.',
      'Increases overall capacity without targeted allocation.'
    ];
    return defaults[idx % defaults.length];
  };

  if (loading) {
    return (
      <div className="w-full min-h-[400px] flex flex-col items-center justify-center space-y-3">
        <div className="w-10 h-10 border-3 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-extrabold text-slate-600">Loading Assessment Questions...</p>
      </div>
    );
  }

  const currentQ = questions[currentIndex] || {
    id: 'q1',
    question: 'Which action is most effective for improving pay equity across an organization?',
    options: [
      'Conducting periodic pay equity audits and addressing identified gaps',
      'Offering individual salary negotiations',
      'Providing additional performance bonuses to high performers',
      'Increasing overall salary budgets for all employees'
    ]
  };

  const totalQuestions = questions.length || 10;

  return (
    <div className="w-full min-h-screen bg-[#f8f6fe] py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn relative overflow-hidden">
      
      {/* Ambient Gradient Glows & Soft Dot Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none" 
        style={{
          backgroundImage: "radial-gradient(#9333ea 0.8px, transparent 0.8px)",
          backgroundSize: "24px 24px"
        }}
      />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-300/30 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-300/30 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

      {/* Top Centered Toggle Buttons */}
      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center space-y-3">
        <div className="bg-[#f1f3f9] p-1.5 rounded-full inline-flex items-center space-x-2 border border-slate-200/80 shadow-xs">
          <button
            onClick={() => { setActiveQuizType('pre'); setCurrentIndex(0); setSubmitted(false); }}
            className={`px-6 py-2.5 rounded-full text-xs font-extrabold transition-all flex items-center space-x-2 ${
              activeQuizType === 'pre'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Pre-Game Knowledge Quiz</span>
          </button>

          <button
            onClick={() => { setActiveQuizType('post'); setCurrentIndex(0); setSubmitted(false); }}
            className={`px-6 py-2.5 rounded-full text-xs font-extrabold transition-all flex items-center space-x-2 ${
              activeQuizType === 'post'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Post-Game Learning Assessment</span>
          </button>
        </div>

        <p className="text-xs text-slate-500 font-medium text-center">
          Take a quick quiz to assess your current knowledge before starting the simulation.
        </p>
      </div>

      {/* Main White Card Container */}
      <div className="max-w-6xl mx-auto bg-white/95 backdrop-blur-md rounded-[2.5rem] border border-slate-200/90 p-6 sm:p-8 md:p-10 shadow-2xl space-y-8">
        
        {/* Card Header Block */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-100">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-[#ede9fe] text-[#6d28d9] flex items-center justify-center shrink-0 shadow-xs">
              <FileText className="w-6 h-6 text-[#6d28d9]" />
            </div>
            <div>
              <span className="text-[10px] font-black tracking-widest text-[#6d28d9] uppercase block">
                {activeQuizType === 'pre' ? 'PRE-GAME ASSESSMENT' : 'POST-GAME ASSESSMENT'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Workplace Inclusion Knowledge Check
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Test your understanding before you begin the simulation.
              </p>
            </div>
          </div>

          {/* Checklist Graphic Icon on Right */}
          <div className="hidden sm:flex items-center space-x-2 px-4 py-3 rounded-2xl bg-purple-50/60 border border-purple-100">
            <CheckSquare className="w-7 h-7 text-[#6d28d9]" />
          </div>
        </div>

        {submitted && result ? (
          /* Result View */
          <div className="text-center py-10 space-y-6 animate-fadeIn max-w-lg mx-auto">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center mx-auto text-white shadow-xl shadow-amber-500/25">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">Assessment Completed!</h3>
              <p className="text-sm font-semibold text-slate-600">
                Your Score: <span className="text-[#5551ff] font-black text-xl">{result.score} / {result.total}</span> ({result.percentage}%)
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#f8f7ff] border border-purple-100 text-left space-y-2">
              <div className="text-xs font-black text-[#5551ff] flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#5551ff]" />
                <span>Executive Competency Summary</span>
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {result.percentage >= 80
                  ? 'Outstanding understanding of workplace inclusion metrics! You demonstrate clear grasp of pay equity, returnships, and retention trade-offs.'
                  : 'Great start! Participating in the 10 strategic turns of Inclusive Tycoon will give you hands-on feedback on organizational impact.'}
              </p>
            </div>

            <button
              onClick={() => onComplete(result.score, result.total)}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center space-x-2"
            >
              <span>Proceed to Simulation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Main 2-Column Assessment View */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Questions & Options (8 Cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Question Progress Tracker */}
              <div className="space-y-2">
                <span className="text-xs font-black text-slate-900 block">
                  Question {currentIndex + 1} of {totalQuestions}
                </span>

                {/* 10 Segment Progress Bar */}
                <div className="flex items-center space-x-2">
                  {Array.from({ length: totalQuestions }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                        idx === currentIndex
                          ? 'bg-[#5551ff]'
                          : idx < currentIndex
                          ? 'bg-[#5551ff]/50'
                          : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Question Headline */}
              <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug tracking-tight">
                {currentQ.question}
              </h3>

              {/* 4 Selectable Option Cards */}
              <div className="space-y-3.5">
                {currentQ.options.map((option: string, idx: number) => {
                  const qKey = currentQ.id || String(currentIndex);
                  const selected = selectedAnswers[qKey] === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleSelect(currentQ.id, idx)}
                      className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start space-x-4 ${
                        selected
                          ? 'bg-[#f4f3ff] border-[#5551ff] shadow-md ring-2 ring-[#5551ff]/20'
                          : 'bg-white border-slate-200/90 hover:border-slate-300'
                      }`}
                    >
                      {/* Radio Circle */}
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                        selected ? 'bg-[#5551ff] text-white ring-2 ring-[#5551ff]/30' : 'border-2 border-slate-300 bg-white'
                      }`}>
                        {selected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>

                      {/* Text Content */}
                      <div className="space-y-1 flex-1">
                        <div className={`text-xs font-black leading-snug ${selected ? 'text-indigo-950' : 'text-slate-900'}`}>
                          {option}
                        </div>
                        <div className="text-[11px] font-medium text-slate-500 leading-relaxed">
                          {getOptionSubtitle(option, idx)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Action Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex(prev => prev - 1)}
                  className="px-5 py-3 rounded-xl bg-slate-100 text-slate-400 font-extrabold text-xs disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {currentIndex === totalQuestions - 1 ? (
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs shadow-md shadow-orange-500/20 flex items-center space-x-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit Quiz</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentIndex(prev => prev + 1)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs shadow-md shadow-orange-500/20 flex items-center space-x-2"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>

            {/* Right Column: Assessment Overview Sidebar (4 Cols) */}
            <div className="lg:col-span-4 bg-[#fcfcff] border border-slate-200/80 rounded-3xl p-6 space-y-6 shadow-xs">
              
              {/* Header */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#ccfbf1] text-[#0d9488] flex items-center justify-center">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h4 className="text-base font-black text-slate-900">Assessment Overview</h4>
              </div>

              {/* Item 1: 10 Questions */}
              <div className="flex items-start space-x-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#f3e8ff] text-[#9333ea] flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900">10 Questions</div>
                  <div className="text-[11px] text-slate-400 font-medium">Multiple choice questions</div>
                </div>
              </div>

              {/* Item 2: ~ 5 Minutes */}
              <div className="flex items-start space-x-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#f3e8ff] text-[#9333ea] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900">~ 5 Minutes</div>
                  <div className="text-[11px] text-slate-400 font-medium">Estimated time to complete</div>
                </div>
              </div>

              {/* Item 3: Your score comparison */}
              <div className="flex items-start space-x-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#f3e8ff] text-[#9333ea] flex items-center justify-center shrink-0">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900">Your score will be compared before and after the game.</div>
                  <div className="text-[11px] text-slate-400 font-medium">Track your learning progress</div>
                </div>
              </div>

              {/* Bottom Why Take This Box */}
              <div className="bg-[#f5f3ff] border border-purple-100/90 rounded-2xl p-4 space-y-1.5">
                <div className="flex items-center space-x-2 text-xs font-black text-slate-900">
                  <Lightbulb className="w-4 h-4 text-[#6d28d9]" />
                  <span>Why take this assessment?</span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                  This helps us understand your current knowledge on workplace inclusion and provides a baseline to measure your learning after the game.
                </p>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* Footer matching reference image */}
      <footer className="w-full border-t border-slate-200/80 bg-white/80 backdrop-blur-md py-6 px-4 sm:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          
          {/* Left: CII CWL Branding */}
          <div className="flex items-center space-x-3">
            <div className="px-2.5 py-1 rounded bg-slate-900 text-white font-black tracking-widest text-[11px]">
              CII
            </div>
            <div>
              <div className="font-extrabold text-slate-900 text-[11px]">Confederation of Indian Industry</div>
              <div className="text-[10px] text-slate-400">Centre for Women Leadership (CII - CWL)</div>
            </div>
          </div>

          {/* Center: Mission statement */}
          <div className="text-center max-w-md text-[11px] text-slate-500">
            An interactive learning initiative by CII Centre for Women Leadership to inspire inclusive workplaces and stronger businesses.
          </div>

          {/* Right: Quick Links */}
          <div className="flex items-center space-x-6 text-[11px] font-bold text-slate-600">
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">Learning Content</span>
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">Inclusion Assessment</span>
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">Support</span>
          </div>

        </div>
      </footer>

    </div>
  );
};
