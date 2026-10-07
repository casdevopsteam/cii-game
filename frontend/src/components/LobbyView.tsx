import React, { useState, useEffect } from 'react';
import { User, Session, Player } from '../types/game';
import { fetchApi, initSocket } from '../api/client';
import {
  Trophy,
  Home,
  FileCheck,
  Lock,
  ClipboardList,
  Gamepad2,
  BookOpen,
  BarChart3,
  HelpCircle,
  LogOut,
  Globe,
  ChevronDown,
  Calendar,
  Clock,
  User as UserIcon,
  Sparkles,
  Lightbulb,
  Users,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Check,
  Target,
  Settings,
  Star,
  Briefcase,
  Shield,
  TrendingUp,
  HelpCircle as QuestionIcon,
  Play,
  Pause,
  Volume2,
  Maximize,
  Info,
  Key,
  X,
  Layers,
  Megaphone,
  Handshake,
  Hourglass,
  Video,
  Edit3,
  AlertTriangle,
  TrendingDown,
  Minus,
  RotateCcw,
  Coins,
  LayoutDashboard,
  Download,
  Flag,
  ExternalLink,
  XCircle,
  FileText,
  Bookmark,
  BookmarkCheck,
  Wrench
} from 'lucide-react';

interface LobbyViewProps {
  user: User | null;
  onSessionStarted: (session: Session, players: Player[]) => void;
  onOpenAuth: () => void;
  onLogout?: () => void;
  onStartQuiz?: () => void;
  onNavigateToView?: (view: string) => void;
}

export const LobbyView: React.FC<LobbyViewProps> = ({
  user,
  onSessionStarted,
  onOpenAuth,
  onLogout,
  onStartQuiz,
  onNavigateToView
}) => {
  // View mode: 'landing' (Default Landing Page) vs 'dashboard' (Player Role Dashboard)
  const [landingViewMode, setLandingViewMode] = useState<'landing' | 'dashboard'>(user ? 'dashboard' : 'landing');
  const [activeTab, setActiveTab] = useState<'home' | 'quiz' | 'game' | 'learning' | 'results' | 'post-quiz'>('post-quiz');
  const [mode, setMode] = useState<'single' | 'multi'>('single');
  const [playerName, setPlayerName] = useState(user ? user.name : 'Priya Sharma');
  const [roomCodeInput, setRoomCodeInput] = useState('');
  const [numBots, setNumBots] = useState(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  // Game Tab Workflow Step: 'tutorial' (How to Play) vs 'setup' (Set Up Your Company) vs 'round' (Round Decision Screen)
  const [gameStep, setGameStep] = useState<'tutorial' | 'setup' | 'round'>('round');
  const [selectedIndustry, setSelectedIndustry] = useState<'tech' | 'mfg' | 'fin' | 'health'>('tech');
  const [companyNameInput, setCompanyNameInput] = useState('InnovaTech Solutions');
  const [ceoNameInput, setCeoNameInput] = useState(user ? user.name : 'Priya Sharma');
  const [companySizeInput, setCompanySizeInput] = useState('500 - 1,000 Employees');

  // Decision Round State (Matches Reference Screenshot)
  const [currentRoundIndex, setCurrentRoundIndex] = useState(1);
  const [roundTimerSeconds, setRoundTimerSeconds] = useState(505); // 08:25 remaining
  const [selectedDecisionId, setSelectedDecisionId] = useState<string>('hiring'); // Default selected Option 1 ("Invest in Inclusive Hiring")
  const [showDecisionModal, setShowDecisionModal] = useState<boolean>(false); // Investment Decision Details Modal
  const [roundStage, setRoundStage] = useState<'decision' | 'outcome' | 'consequence' | 'round2'>('round2'); // Default Round 2 view matching latest BRD reference screenshot
  const [round2Decision, setRound2Decision] = useState<'diverse' | 'quick' | 'partner'>('diverse');
  const [impactAnalysisTab, setImpactAnalysisTab] = useState<'business' | 'inclusion' | 'talent' | 'brand'>('business');
  const [learningFilterTab, setLearningFilterTab] = useState<'recommended' | 'all' | 'videos' | 'articles' | 'case_studies' | 'tools'>('recommended');
  const [bookmarkedResources, setBookmarkedResources] = useState<string[]>(['res_1', 'res_4']);

  const IMPACT_ANALYSIS_DATA = {
    business: {
      title: 'Business Performance',
      badge: '↑ +10%',
      description: 'Access to a more diverse talent pool has improved innovation capabilities and accelerated product development. This is expected to drive higher revenue in the coming quarters.',
      beforeValue: '₹10.0M',
      afterValue: '₹11.0M',
      increasePercent: '+10%',
      keyDrivers: [
        'Stronger innovation pipeline',
        'Fresh perspectives',
        'Better market understanding',
        'Improved team performance',
      ]
    },
    inclusion: {
      title: 'Employee Inclusion',
      badge: '↑ +15%',
      description: 'Targeted inclusive hiring practices lowered systemic barriers and established psychological safety across departments, directly boosting team alignment.',
      beforeValue: '25%',
      afterValue: '40%',
      increasePercent: '+15%',
      keyDrivers: [
        'Fair and transparent interview rubrics',
        'Inclusive job description redesign',
        'Broadened talent network reach',
        'Higher psychological safety',
      ]
    },
    talent: {
      title: 'Talent & Retention',
      badge: '↑ +12%',
      description: 'Employees report higher pride in corporate values and greater commitment to long-term career growth, significantly reducing unwanted turnover.',
      beforeValue: '65%',
      afterValue: '77%',
      increasePercent: '+12%',
      keyDrivers: [
        'Clear career progression pathways',
        'Strong internal mentorship culture',
        'Reduced voluntary turnover rate',
        'High employee engagement scores',
      ]
    },
    brand: {
      title: 'Brand Reputation',
      badge: '↑ +10%',
      description: 'Public recognition of your DEI initiatives positioning InnovaTech Solutions as an employer of choice in international expansion markets.',
      beforeValue: '70%',
      afterValue: '80%',
      increasePercent: '+10%',
      keyDrivers: [
        'Positive media coverage & PR',
        'Enhanced employer value proposition',
        'Greater trust from international clients',
        'Industry benchmark leadership',
      ]
    }
  };

  const DECISION_DETAILS: Record<string, {
    title: string;
    recommended?: boolean;
    cost: number;
    subtitle: string;
    image: string;
    detailedDescription: string;
    whyItMatters: string;
    impacts: { label: string; change: string; type: 'high-up' | 'mod-up' | 'slight-down' | 'mod-down' }[];
    risks: string[];
  }> = {
    hiring: {
      title: 'Invest in Inclusive Hiring',
      recommended: true,
      cost: 250,
      subtitle: 'Launch a targeted inclusive hiring program to build a diverse team in the new market.',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      detailedDescription: 'Implement an inclusive hiring program to attract talent from underrepresented groups. This includes revising job descriptions, partnering with diverse talent networks, providing inclusive interview training, and setting diversity hiring targets.',
      whyItMatters: 'A more diverse workforce brings different perspectives, drives innovation, and helps you better understand and serve new markets.',
      impacts: [
        { label: 'Employee Inclusion', change: 'High Increase', type: 'high-up' },
        { label: 'Talent Retention', change: 'Moderate Increase', type: 'mod-up' },
        { label: 'Long-term Growth', change: 'Moderate Increase', type: 'mod-up' },
        { label: 'Short-term Revenue', change: 'Slight Decrease', type: 'slight-down' },
        { label: 'Employee Satisfaction', change: 'Moderate Increase', type: 'mod-up' },
        { label: 'Brand Reputation', change: 'Moderate Increase', type: 'mod-up' },
      ],
      risks: [
        'Higher initial investment',
        'May take time to see revenue impact',
        'Requires dedicated HR resources',
        'Success depends on effective execution',
      ]
    },
    marketing: {
      title: 'Focus on Marketing',
      cost: 200,
      subtitle: 'Invest heavily in aggressive marketing campaigns to rapidly boost brand recognition in the region.',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
      detailedDescription: 'Allocate the majority of budget toward digital ads, PR events, and local sponsorships to establish immediate market dominance.',
      whyItMatters: 'High market awareness drives early customer acquisition, but neglecting workforce culture can lead to long-term operational friction.',
      impacts: [
        { label: 'Short-term Revenue', change: 'High Increase', type: 'high-up' },
        { label: 'Brand Reputation', change: 'Moderate Increase', type: 'mod-up' },
        { label: 'Employee Inclusion', change: 'Slight Decrease', type: 'slight-down' },
        { label: 'Employee Satisfaction', change: 'Moderate Decrease', type: 'mod-down' },
      ],
      risks: [
        'High marketing spend with uncertain retention',
        'Ignores internal inclusion challenges',
        'Risk of public backlash if message lacks authenticity',
      ]
    },
    partner: {
      title: 'Partner with Local Firms',
      cost: 150,
      subtitle: 'Collaborate with established local companies to accelerate entry and leverage local expertise.',
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80',
      detailedDescription: 'Form joint ventures or strategic partnerships with local firms to share infrastructure, local hiring networks, and market access.',
      whyItMatters: 'Partnerships lower market entry risks but require careful alignment of corporate values and inclusion standards.',
      impacts: [
        { label: 'Long-term Growth', change: 'Moderate Increase', type: 'mod-up' },
        { label: 'Short-term Revenue', change: 'Moderate Increase', type: 'mod-up' },
        { label: 'Employee Inclusion', change: 'Moderate Increase', type: 'mod-up' },
      ],
      risks: [
        'Shared control over hiring and strategy',
        'Cultural misalignment between partners',
        'Dependency on partner reputation',
      ]
    },
    cost_cutting: {
      title: 'Take a Cost-Cutting Approach',
      cost: 100,
      subtitle: 'Minimize expenses and rely on existing internal teams with minimal localized hiring.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
      detailedDescription: 'Stretch existing resources to cover the expansion, avoiding new full-time hires or dedicated inclusion programs to maximize short-term cash retention.',
      whyItMatters: 'Protects short-term liquidity but risks burnout, high turnover, and poor local engagement in the new region.',
      impacts: [
        { label: 'Short-term Savings', change: 'High Increase', type: 'high-up' },
        { label: 'Employee Satisfaction', change: 'Moderate Decrease', type: 'mod-down' },
        { label: 'Brand Reputation', change: 'Slight Decrease', type: 'slight-down' },
        { label: 'Long-term Growth', change: 'Moderate Decrease', type: 'mod-down' },
      ],
      risks: [
        'Team burnout and high attrition',
        'Lack of local market insight',
        'Weak inclusion foundation',
      ]
    }
  };

  const currentDecision = DECISION_DETAILS[selectedDecisionId] || DECISION_DETAILS['hiring'];

  // Post-Game Quiz Tab State (Matches BRD & Reference Screenshot media__1791333700000)
  const [postQuizIndex, setPostQuizIndex] = useState(4); // Default at Q5 (Question 5 of 10)
  const [postQuizAnswers, setPostQuizAnswers] = useState<Record<number, number>>({
    0: 1,
    1: 1,
    2: 1,
    3: 0,
    4: 1 // Q5 selected Option B ("It brings different perspectives, leading to better innovation and decision-making.")
  });
  const [postQuizTimerSeconds, setPostQuizTimerSeconds] = useState(600); // 10:00 remaining
  const [isPostQuizSubmitted, setIsPostQuizSubmitted] = useState(false);

  const postQuizQuestions = [
    {
      id: 'pq1',
      question: 'What is the primary long-term business impact of investing in inclusive hiring programs?',
      options: [
        'A. It reduces short-term operational costs by limiting hiring from diverse groups.',
        'B. It brings different perspectives, leading to better innovation, talent retention, and decision-making.',
        'C. It helps the company avoid legal compliance issues only.',
        'D. It primarily improves the company\'s public image without real business impact.'
      ],
      correctAnswer: 1
    },
    {
      id: 'pq2',
      question: 'When facing budget constraints during rapid company scaling, which decision balances growth with inclusion?',
      options: [
        'A. Freezing all diversity programs to maximize short-term cash flow.',
        'B. Partnering with diverse talent networks to build a sustainable pipeline for long-term retention.',
        'C. Outsourcing core team positions without inclusion guidelines.',
        'D. Relying exclusively on fast referral hiring from existing executive networks.'
      ],
      correctAnswer: 1
    },
    {
      id: 'pq3',
      question: 'How does employee retention impact overall company performance in Inclusive Tycoon?',
      options: [
        'A. Retention has no measurable impact on company valuation.',
        'B. Higher retention reduces recruitment turnover costs and fosters stronger team innovation.',
        'C. Retention is only important for entry-level positions.',
        'D. High turnover is desirable to continually lower salary expenditures.'
      ],
      correctAnswer: 1
    },
    {
      id: 'pq4',
      question: 'What role does psychological safety play in driving team innovation?',
      options: [
        'A. It encourages employees to share unique ideas without fear of bias or unfair judgment.',
        'B. It eliminates the need for formal performance reviews.',
        'C. It focuses solely on remote work benefits.',
        'D. It replaces business strategy with social initiatives.'
      ],
      correctAnswer: 0
    },
    {
      id: 'pq5',
      question: 'What is the biggest benefit of an inclusive workplace?',
      options: [
        'A. It reduces short-term operational costs by limiting hiring from diverse groups.',
        'B. It brings different perspectives, leading to better innovation and decision-making.',
        'C. It helps the company avoid legal compliance issues only.',
        'D. It primarily improves the company\'s public image without real business impact.'
      ],
      correctAnswer: 1
    },
    {
      id: 'pq6',
      question: 'How does strong brand reputation for inclusion affect market competitiveness?',
      options: [
        'A. It attracts top-tier talent and builds customer loyalty, boosting overall revenue growth.',
        'B. It increases marketing costs without providing strategic advantage.',
        'C. It only appeals to international investors.',
        'D. It creates friction with traditional enterprise clients.'
      ],
      correctAnswer: 0
    },
    {
      id: 'pq7',
      question: 'Why is a balanced approach across business, inclusion, and retention necessary to win the game?',
      options: [
        'A. Focusing on a single metric yields maximum final points.',
        'B. Over-indexing on short-term profits without inclusion leads to high churn and brand damage.',
        'C. Strategic balance is required by government regulatory mandates only.',
        'D. Inclusion points automatically offset financial losses.'
      ],
      correctAnswer: 1
    },
    {
      id: 'pq8',
      question: 'What strategic action best mitigates bias during executive promotion reviews?',
      options: [
        'A. Using standardized performance rubrics and diverse evaluation panels.',
        'B. Allowing senior leaders to choose candidates based on gut feel.',
        'C. Promoting candidates based strictly on length of tenure.',
        'D. Eliminating performance evaluations altogether.'
      ],
      correctAnswer: 0
    },
    {
      id: 'pq9',
      question: 'How do diverse leadership teams influence company decision-making?',
      options: [
        'A. They slow down execution due to constant disagreement.',
        'B. They identify blind spots faster and evaluate broader market opportunities.',
        'C. They focus exclusively on HR policy instead of business strategy.',
        'D. They require higher executive compensation structures.'
      ],
      correctAnswer: 1
    },
    {
      id: 'pq10',
      question: 'What is the ultimate takeaway from the 10-round Inclusive Tycoon strategy game?',
      options: [
        'A. Workplace inclusion is a core business strategy that drives sustainable long-term value.',
        'B. Short-term cost cutting always beats long-term cultural investment.',
        'C. Inclusion is an optional PR exercise for large enterprise corporations.',
        'D. Financial growth and diversity goals are fundamentally incompatible.'
      ],
      correctAnswer: 0
    }
  ];

  // Quiz Tab State (Matches Reference Screenshot)
  const [quizIndex, setQuizIndex] = useState(2); // Default at Q3 (Question 3 of 10)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({
    0: 0,
    1: 0,
    2: 1 // Q3 selected Option 2 ("Ensure equal access to opportunities and information")
  });
  const [timerSeconds, setTimerSeconds] = useState(272); // 04:32 remaining

  const quizQuestions = [
    {
      id: 'q1',
      question: 'Which action is most effective for improving pay equity across an organization?',
      options: [
        'Conducting periodic pay equity audits and addressing identified gaps',
        'Offering individual salary negotiations',
        'Providing additional performance bonuses to high performers',
        'Increasing overall salary budgets for all employees'
      ]
    },
    {
      id: 'q2',
      question: 'What is a primary benefit of implementing returnship programs for talent acquisition?',
      options: [
        'Accessing an experienced talent pool re-entering the workforce',
        'Reducing overall compensation and benefits expenditure',
        'Replacing standard graduate recruitment drives',
        'Shortening mandatory team onboarding timelines'
      ]
    },
    {
      id: 'q3',
      question: 'Which of the following is the most effective way to promote inclusion in a hybrid workplace?',
      options: [
        'Allow employees to choose where they work',
        'Ensure equal access to opportunities and information',
        'Organize more social events',
        'Focus only on in-office employees'
      ]
    },
    {
      id: 'q4',
      question: 'How does inclusive leadership directly impact organizational innovation?',
      options: [
        'Encourages diverse perspectives leading to creative problem solving',
        'Reduces the frequency of required team feedback sessions',
        'Ensures all strategic decisions are made solely by executive leadership',
        'Eliminates differing opinions across project teams'
      ]
    },
    {
      id: 'q5',
      question: 'What is the primary role of structured mentorship in talent retention?',
      options: [
        'Accelerating career progression and support for underrepresented groups',
        'Replacing formal annual performance reviews',
        'Reducing leadership development budgets across executive tiers',
        'Restricting cross-departmental collaboration'
      ]
    },
    {
      id: 'q6',
      question: 'What is the primary strategic objective of transparent pay policies?',
      options: [
        'Eliminate unjustified compensation disparities and build trust',
        'Standardize all salaries regardless of role complexity',
        'Reduce overall organizational payroll expenditure',
        'Eliminate annual performance evaluations'
      ]
    },
    {
      id: 'q7',
      question: 'Which retention strategy best supports working parents and caregivers?',
      options: [
        'Flexible work arrangements and comprehensive parental support policies',
        'Higher overtime compensation rates during peak quarters',
        'Enforcing strict mandatory core office hours for all roles',
        'Performance-only annual bonuses without leave flexibility'
      ]
    },
    {
      id: 'q8',
      question: 'What key outcome does psychological safety enable within high-performing teams?',
      options: [
        'Team members feel safe to take calculated risks and speak up without fear',
        'Complete unanimous consensus on all technical decisions',
        'Absence of formal performance benchmarks',
        'Reduced individual accountability for project deliverables'
      ]
    },
    {
      id: 'q9',
      question: 'How does executive sponsorship measurably advance leadership diversity?',
      options: [
        'Sponsors actively advocate and create growth opportunities for high-potential talent',
        'Sponsors replace standard HR talent acquisition managers',
        'Sponsors eliminate annual performance evaluations',
        'Sponsors restrict cross-functional career rotations'
      ]
    },
    {
      id: 'q10',
      question: 'What is a key indicator of a genuinely inclusive corporate culture?',
      options: [
        'High retention rates and equitable promotion pipelines across all demographics',
        'Uniform educational backgrounds across all leadership levels',
        'Top-down decision making without structured employee feedback',
        'Rapid turnover rates in junior positions'
      ]
    }
  ];

  useEffect(() => {
    if (activeTab !== 'quiz') return;
    const interval = setInterval(() => {
      setTimerSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== 'post-quiz' || isPostQuizSubmitted) return;
    const interval = setInterval(() => {
      setPostQuizTimerSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [activeTab, isPostQuizSubmitted]);

  useEffect(() => {
    if (activeTab !== 'game' || gameStep !== 'round') return;
    const interval = setInterval(() => {
      setRoundTimerSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [activeTab, gameStep]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleCreateSession = async () => {
    if (!playerName.trim()) {
      setError('Please enter your participant name.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res: any = await fetchApi('/sessions/create', {
        method: 'POST',
        body: JSON.stringify({
          creatorId: user ? user.id : 'usr_guest_' + Date.now(),
          playerName,
          mode,
          numBots: mode === 'single' ? numBots : 0
        })
      });

      const socket = initSocket();
      socket.emit('join_game', { sessionId: res.session.id, playerId: res.players[0].id });

      onSessionStarted(res.session, res.players);
    } catch (err: any) {
      setError(err.message || 'Failed to initialize session');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinSession = async () => {
    if (!roomCodeInput.trim()) {
      setError('Please enter a valid 6-character room code.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res: any = await fetchApi('/sessions/join', {
        method: 'POST',
        body: JSON.stringify({
          code: roomCodeInput.toUpperCase(),
          userId: user ? user.id : 'usr_guest_' + Date.now(),
          playerName
        })
      });

      const socket = initSocket();
      const me = res.players.find((p: any) => p.player_name === playerName) || res.players[0];
      socket.emit('join_game', { sessionId: res.session.id, playerId: me.id });

      onSessionStarted(res.session, res.players);
    } catch (err: any) {
      setError(err.message || 'Failed to join room');
    } finally {
      setLoading(false);
    }
  };

  const playerDisplayName = user ? user.name : 'Priya Sharma';
  const playerOrg = user ? (user.company || (user as any).organization || 'TCS') : 'TCS';
  const playerInitials = playerDisplayName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'PR';

  // -------------------------------------------------------------
  // MODE A: DEFAULT LANDING PAGE (FOR GUEST / UNAUTHENTICATED USER)
  // -------------------------------------------------------------
  if (!user) {
    return (
      <div className="min-h-screen bg-[#f8f9fd] flex flex-col font-sans text-slate-900 animate-fadeIn">
        
        {/* Landing Page Single Header Bar */}
        <header className="bg-white border-b border-slate-200/80 h-16 px-6 sm:px-8 flex items-center justify-between shrink-0 sticky top-0 z-30 shadow-xs">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="w-10 h-10 rounded-2xl bg-[#5551ff] flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
              <Trophy className="w-5 h-5 fill-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-black text-sm text-slate-900 tracking-tight">INCLUSIVE TYCOON</span>
                <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-orange-500 text-white">CII CWL</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Workplace Inclusion Strategy Game</p>
            </div>
          </div>



          {/* Center Navigation Tabs for Landing Page */}
          <nav className="flex items-center space-x-1 sm:space-x-2 bg-slate-100/90 p-1 rounded-2xl border border-slate-200/80 shadow-2xs">
            <button
              onClick={() => {
                const el = document.getElementById('game-launcher-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3.5 py-1.5 rounded-xl text-xs font-extrabold text-slate-700 hover:text-[#5551ff] hover:bg-white transition-all cursor-pointer flex items-center space-x-1.5 shadow-2xs"
            >
              <Gamepad2 className="w-3.5 h-3.5 text-[#5551ff]" />
              <span>Play Game</span>
            </button>

            <button
              onClick={() => {
                if (onStartQuiz) onStartQuiz();
              }}
              className="px-3.5 py-1.5 rounded-xl text-xs font-extrabold text-slate-700 hover:text-[#5551ff] hover:bg-white transition-all cursor-pointer flex items-center space-x-1.5 shadow-2xs"
            >
              <FileCheck className="w-3.5 h-3.5 text-[#5551ff]" />
              <span>Pre/Post Quiz</span>
            </button>

            <button
              onClick={() => {
                setLandingViewMode('dashboard');
                setActiveTab('learning');
              }}
              className="px-3.5 py-1.5 rounded-xl text-xs font-extrabold text-slate-700 hover:text-[#5551ff] hover:bg-white transition-all cursor-pointer flex items-center space-x-1.5 shadow-2xs"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#5551ff]" />
              <span>Learning Hub</span>
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div
                className="flex items-center space-x-2.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-purple-100 text-[#5551ff] font-extrabold text-xs flex items-center justify-center">
                  {playerInitials}
                </div>
                <div className="text-left">
                  <div className="text-xs font-black text-slate-900 leading-tight">{playerDisplayName}</div>
                  <div className="text-[10px] font-bold text-slate-400 leading-tight">{playerOrg}</div>
                </div>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-5 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center space-x-1.5 cursor-pointer transition-all"
              >
                <span>Sign In / Register</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </header>

        {/* Hero Banner Section */}
        <div
          className="w-full relative bg-cover bg-right lg:bg-center overflow-hidden py-10 px-4 sm:px-8 lg:px-12 flex items-center min-h-[360px]"
          style={{ backgroundImage: "url('/hero-bg.png')" }}
        >
          <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-8 z-10">

            {/* Left Side Content */}
            <div className="max-w-xl space-y-4">

              {/* Pill Badge */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#fff4ec] border border-[#ffd8bf] text-[#ea580c] text-xs font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#f97316] fill-[#f97316]/20" />
                <span>CII CWL Interactive Strategy Simulation</span>
              </div>

              {/* Main Title: INCLUSIVE TYCOON */}
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-slate-900 tracking-tight leading-none">
                INCLUSIVE{' '}
                <span className="bg-gradient-to-r from-[#2563eb] via-[#7c3aed] via-[#d946ef] via-[#ea580c] to-[#f97316] bg-clip-text text-transparent">
                  TYCOON
                </span>
              </h1>

              {/* Subtitle & Description */}
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                  Experience the real-world business impact of workplace inclusion.
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-xl">
                  Lead your enterprise across 10 strategic turns in hiring, pay parity, retention and leadership pipelines. Make decisions, see the impact, and build a more inclusive, high-performing organization.
                </p>
              </div>

              {/* 3 Metric Stat Cards */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">

                {/* Card 1: 1000 Starting Points */}
                <div className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl px-4 py-3 flex items-center space-x-3.5 shadow-sm min-w-[145px]">
                  <div className="w-10 h-10 rounded-xl bg-[#ffedd5] flex items-center justify-center text-[#f97316]">
                    <Trophy className="w-5 h-5 text-[#f97316]" />
                  </div>
                  <div>
                    <div className="text-lg font-black text-slate-900 leading-none">1000</div>
                    <div className="text-[11px] font-semibold text-slate-400 mt-1">Starting Points</div>
                  </div>
                </div>

                {/* Card 2: 10 Strategy Turns */}
                <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl px-4 py-3 flex items-center space-x-3.5 shadow-sm min-w-[145px]">
                  <div className="w-10 h-10 rounded-xl bg-[#f3e8ff] flex items-center justify-center text-[#9333ea]">
                    <Layers className="w-5 h-5 text-[#9333ea]" />
                  </div>
                  <div>
                    <div className="text-lg font-black text-slate-900 leading-none">10</div>
                    <div className="text-[11px] font-semibold text-slate-400 mt-1">Strategy Turns</div>
                  </div>
                </div>

                {/* Card 3: AI Executive Coach */}
                <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl px-4 py-3 flex items-center space-x-3.5 shadow-sm min-w-[170px]">
                  <div className="w-10 h-10 rounded-xl bg-[#f3e8ff] flex items-center justify-center text-[#9333ea]">
                    <Users className="w-5 h-5 text-[#9333ea]" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-900 leading-tight">AI Executive Coach</div>
                    <div className="text-[11px] font-semibold text-slate-400 mt-0.5">Get real-time guidance</div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* Main Game Launcher Grid (2 Cards) */}
        <div id="game-launcher-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8">

          {error && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center space-x-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Left Card: Solo Executive Challenge */}
            <div className="bg-white border-2 border-amber-400 rounded-3xl p-8 shadow-xl relative overflow-hidden flex flex-col justify-between space-y-6">

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 border border-amber-200">
                    <UserIcon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                    SINGLE PLAYER VS AI
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Solo Executive Challenge</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                    Compete against 3–4 AI Tycoons with distinct corporate mindsets (Profit-First, DEI Pioneer, Traditionalist).
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">Your Executive Name</label>
                    <div className="relative">
                      <UserIcon className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                      <input
                        type="text"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        placeholder="e.g. Priya Sharma"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">Number of AI Competitors</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setNumBots(num)}
                          className={`py-2 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                            numBots === num
                              ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {num} AI Tycoons
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => { setMode('single'); handleCreateSession(); }}
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-orange-500/20 flex items-center justify-center space-x-2 cursor-pointer transition-all"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Launch Solo Challenge</span>
              </button>

            </div>

            {/* Right Card: Join Multiplayer Session */}
            <div className="bg-white border-2 border-indigo-200 rounded-3xl p-8 shadow-xl relative overflow-hidden flex flex-col justify-between space-y-6">

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 border border-indigo-200">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                    LIVE WORKSHOP SESSION
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Join Live Workshop</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                    Enter the 6-character room code provided by your session administrator to join your cohort.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">Session Access Code</label>
                    <div className="relative">
                      <Key className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                      <input
                        type="text"
                        value={roomCodeInput}
                        onChange={(e) => setRoomCodeInput(e.target.value.toUpperCase())}
                        placeholder="e.g. TYC-4822"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-mono font-black uppercase text-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleJoinSession}
                disabled={loading}
                className="w-full py-3.5 bg-[#5551ff] hover:bg-indigo-600 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-indigo-500/20 flex items-center justify-center space-x-2 cursor-pointer transition-all"
              >
                <Users className="w-4 h-4" />
                <span>Join Live Session</span>
              </button>

            </div>

          </div>

        </div>

      </div>
    );
  }

  // -------------------------------------------------------------
  // MODE B: PLAYER ROLE DASHBOARD (MATCHES REFERENCE SCREENSHOT)
  // -------------------------------------------------------------
  return (
    <div className="h-screen overflow-hidden bg-[#f8f9fd] flex font-sans text-slate-900">

      {/* 1. LEFT DARK SIDEBAR (NAVY #0d0d2b) */}
      <aside className="w-64 bg-[#0d0d2b] text-slate-300 flex flex-col shrink-0 h-full border-r border-slate-800 overflow-hidden">
        
        {/* Logo Brand Header */}
        <div className="p-5 shrink-0 border-b border-slate-800/40">
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="w-10 h-10 rounded-2xl bg-[#5551ff] flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
              <Trophy className="w-5 h-5 fill-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-black text-sm text-white tracking-tight">INCLUSIVE TYCOON</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Workplace Inclusion Strategy Game</p>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 overflow-y-auto p-5 space-y-6 text-xs font-bold flex flex-col justify-between">
          <div className="space-y-1.5">
            <button
              onClick={() => setActiveTab('home')}
              className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-2xl transition-all cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-[#5551ff] text-white shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-2xl transition-all cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-[#5551ff] text-white shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>Pre-Game Quiz</span>
            </button>

            <button
              onClick={() => {
                setShowJoinModal(false);
                setActiveTab('game');
              }}
              className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-2xl transition-all cursor-pointer ${
                activeTab === 'game'
                  ? 'bg-[#5551ff] text-white shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Game</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('learning');
              }}
              className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-2xl transition-all cursor-pointer ${
                activeTab === 'learning'
                  ? 'bg-[#5551ff] text-white shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Learning Hub</span>
            </button>

            <button
              onClick={() => setActiveTab('results')}
              className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-2xl transition-all cursor-pointer ${
                activeTab === 'results'
                  ? 'bg-[#5551ff] text-white shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Results</span>
            </button>

            <button
              onClick={() => setActiveTab('post-quiz')}
              className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-2xl transition-all cursor-pointer ${
                activeTab === 'post-quiz'
                  ? 'bg-[#5551ff] text-white shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <FileCheck className="w-4 h-4 text-purple-300" />
              <span>Post-Game Quiz</span>
            </button>
          </div>

          {/* CII & CWL Branding Logos */}
          <div className="pt-4 pb-2 space-y-2 border-t border-slate-800/60">
            <div className="flex items-center space-x-2.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="w-6 h-6 rounded bg-white flex items-center justify-center font-black text-[9px] text-slate-900 shrink-0 shadow-2xs">
                CII
              </div>
              <div className="text-[10px] font-extrabold text-slate-300 leading-tight">
                Confederation of Indian Industry
              </div>
            </div>

            <div className="flex items-center space-x-2.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="w-6 h-6 rounded bg-amber-400 flex items-center justify-center font-black text-[9px] text-amber-950 shrink-0 shadow-2xs">
                CWL
              </div>
              <div className="text-[10px] font-extrabold text-slate-300 leading-tight">
                Centre for Women Leadership
              </div>
            </div>
          </div>

          {/* Bottom Sidebar Controls */}
          <div className="space-y-1 pt-6 border-t border-slate-800/60">
            <button className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all cursor-pointer">
              <QuestionIcon className="w-4 h-4" />
              <span>Help</span>
            </button>

            <button
              onClick={() => {
                if (onLogout) onLogout();
                else onOpenAuth();
              }}
              className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-rose-400" />
              <span>{user ? 'Logout' : 'Login / Switch Role'}</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* 2. MAIN PLAYER CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200/80 h-16 px-8 flex items-center justify-between shrink-0 z-30">
          
          {/* Left Workshop Header Info (Shown when in Quiz/Game/Results Tab) */}
          {activeTab !== 'home' ? (
            <div className="flex items-center space-x-5 text-xs">
              <span className="font-black text-slate-900 text-sm tracking-tight">CII-CWL Leadership Workshop 2026</span>
              <div className="hidden xl:flex items-center space-x-3 text-slate-600 font-extrabold">
                <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/70">
                  <Calendar className="w-3.5 h-3.5 text-[#5551ff]" />
                  <span>15 Oct 2024</span>
                </span>
                <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/70">
                  <Clock className="w-3.5 h-3.5 text-[#5551ff]" />
                  <span>10:00 AM - 12:00 PM</span>
                </span>
                <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/70">
                  <UserIcon className="w-3.5 h-3.5 text-[#5551ff]" />
                  <span>Session Code: <strong className="text-slate-900 font-mono">TYC-4822</strong></span>
                </span>
              </div>
            </div>
          ) : (
            <div />
          )}
          
          <div className="flex items-center space-x-4">
            
            {/* Language Selector */}
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors">
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>English</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>

            {/* Player User Profile Badge */}
            <div
              onClick={() => onLogout ? onLogout() : onOpenAuth()}
              title="Click to logout or switch user"
              className="flex items-center space-x-3 pl-2 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 rounded-full bg-purple-100 text-[#5551ff] font-extrabold text-xs flex items-center justify-center border border-purple-200">
                {playerInitials}
              </div>
              <div className="text-left">
                <div className="text-xs font-black text-slate-900 leading-tight">{playerDisplayName}</div>
                <div className="text-[10px] font-bold text-slate-400 leading-tight">{playerOrg}</div>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>

          </div>
        </header>

        {/* Main Scrollable Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">

          {/* HOME TAB - PLAYER DASHBOARD */}
          {activeTab === 'home' && (
            <div className="space-y-6 animate-fadeIn pb-12">
              
              {/* Hero Welcome Banner */}
              <div 
                className="relative rounded-3xl overflow-hidden bg-[#e6e4fe] border border-purple-200/60 p-6 sm:p-8 lg:p-10 shadow-xs bg-cover bg-no-repeat bg-right lg:bg-center min-h-[260px] sm:min-h-[300px] flex items-center"
                style={{ backgroundImage: "url('/welcome-bg.png')" }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10 w-full">
                  
                  {/* Left Welcome Text */}
                  <div className="space-y-3 max-w-md">
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                      Welcome, {playerDisplayName.split(' ')[0]}!
                    </h1>
                    <div className="text-base sm:text-lg font-bold text-slate-800">
                      TCS Leadership Workshop 2026
                    </div>

                    {/* Metadata Pill Bar */}
                    <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-extrabold text-slate-700">
                      <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-xs border border-slate-200/80 shadow-2xs">
                        <Calendar className="w-3.5 h-3.5 text-purple-600" />
                        <span>15 Oct 2024</span>
                      </div>

                      <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-xs border border-slate-200/80 shadow-2xs">
                        <Clock className="w-3.5 h-3.5 text-purple-600" />
                        <span>10:00 AM - 12:00 PM</span>
                      </div>

                      <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-xs border border-slate-200/80 shadow-2xs">
                        <UserIcon className="w-3.5 h-3.5 text-purple-600" />
                        <span>Session Code: <strong className="text-slate-900 font-mono">TYC-4822</strong></span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Row 1: Your Game Journey (8 Cols) & Let's Get Started! (4 Cols) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left Card: Your Game Journey */}
                <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-6">
                  <h3 className="text-base font-black text-slate-900">Your Game Journey</h3>

                  {/* Stepper Timeline */}
                  <div className="relative pt-2 pb-4">
                    
                    {/* Connecting Horizontal Line */}
                    <div className="absolute top-7 left-8 right-8 h-0.5 bg-slate-200 -z-0"></div>

                    <div className="grid grid-cols-4 gap-2 relative z-10 text-center">
                      
                      {/* Step 1 */}
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-full bg-[#5551ff] text-white font-black text-sm flex items-center justify-center mx-auto shadow-md shadow-indigo-500/30">
                          1
                        </div>
                        <div>
                          <div className="text-xs font-black text-[#5551ff]">Pre-Game Quiz</div>
                          <div className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
                            Understand your current knowledge
                          </div>
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-slate-300 text-slate-500 font-black text-sm flex items-center justify-center mx-auto">
                          2
                        </div>
                        <div>
                          <div className="text-xs font-black text-slate-800">Game</div>
                          <div className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
                            10 Rounds • Make decisions and build your company
                          </div>
                        </div>
                      </div>

                      {/* Step 3 */}
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-slate-300 text-slate-500 font-black text-sm flex items-center justify-center mx-auto">
                          3
                        </div>
                        <div>
                          <div className="text-xs font-black text-slate-800">Post-Game Quiz</div>
                          <div className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
                            See what you've learned
                          </div>
                        </div>
                      </div>

                      {/* Step 4 */}
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-slate-300 text-slate-500 font-black text-sm flex items-center justify-center mx-auto">
                          4
                        </div>
                        <div>
                          <div className="text-xs font-black text-slate-800">Results & Certificate</div>
                          <div className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
                            View your impact and get your certificate
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Right Card: Let's Get Started! */}
                <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-base font-black text-slate-900">Let's Get Started!</h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      Complete a short quiz to assess your current understanding of inclusive leadership. This will help you see your learning progress later.
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] font-extrabold text-slate-600">
                      <span className="flex items-center space-x-1 bg-slate-100 px-2.5 py-1 rounded-lg">
                        <QuestionIcon className="w-3.5 h-3.5 text-[#5551ff]" />
                        <span>10 Questions</span>
                      </span>
                      <span className="flex items-center space-x-1 bg-slate-100 px-2.5 py-1 rounded-lg">
                        <Clock className="w-3.5 h-3.5 text-[#5551ff]" />
                        <span>5-10 Minutes</span>
                      </span>
                      <span className="flex items-center space-x-1 bg-slate-100 px-2.5 py-1 rounded-lg">
                        <BarChart3 className="w-3.5 h-3.5 text-[#5551ff]" />
                        <span>Multiple Choice</span>
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (onStartQuiz) onStartQuiz();
                      else setActiveTab('quiz');
                    }}
                    className="w-full py-3 bg-[#5551ff] hover:bg-indigo-600 text-white font-extrabold text-xs rounded-2xl shadow-md shadow-indigo-500/20 flex items-center justify-center space-x-2 transition-all cursor-pointer"
                  >
                    <span>Start Pre-Game Quiz</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Row 2: 3 Value Proposition Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Card 1 */}
                <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex items-start space-x-4">
                  <div className="w-11 h-11 rounded-2xl bg-purple-100/70 text-[#5551ff] flex items-center justify-center shrink-0">
                    <Lightbulb className="w-5 h-5 text-[#5551ff]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900">Real-world Scenarios</h4>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1">
                      Make strategic decisions in realistic workplace situations.
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex items-start space-x-4">
                  <div className="w-11 h-11 rounded-2xl bg-sky-100/70 text-sky-600 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900">Build an Inclusive Company</h4>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1">
                      Balance business performance with diversity, equity and inclusion.
                    </p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex items-start space-x-4">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-100/70 text-emerald-600 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900">See Your Impact</h4>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1">
                      Track your progress and learn how inclusive leadership drives success.
                    </p>
                  </div>
                </div>

              </div>

              {/* Row 3: What You'll Learn (8 Cols) & Quote Card (4 Cols) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left Card: What You'll Learn */}
                <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                  <h3 className="text-base font-black text-slate-900">What You'll Learn</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
                    
                    {/* Item 1 */}
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-2xl bg-purple-100/70 text-[#5551ff] flex items-center justify-center">
                        <Users className="w-5 h-5" />
                      </div>
                      <h4 className="text-xs font-black text-slate-900">Employee Inclusion</h4>
                      <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                        Create a workplace where everyone belongs
                      </p>
                    </div>

                    {/* Item 2 */}
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-100/70 text-emerald-600 flex items-center justify-center">
                        <Settings className="w-5 h-5" />
                      </div>
                      <h4 className="text-xs font-black text-slate-900">Better Decision Making</h4>
                      <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                        Understand the impact of inclusive choices
                      </p>
                    </div>

                    {/* Item 3 */}
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-2xl bg-amber-100/70 text-amber-600 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <h4 className="text-xs font-black text-slate-900">Business Performance</h4>
                      <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                        See how inclusion drives growth and innovation
                      </p>
                    </div>

                    {/* Item 4 */}
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-2xl bg-rose-100/70 text-rose-600 flex items-center justify-center">
                        <Star className="w-5 h-5" />
                      </div>
                      <h4 className="text-xs font-black text-slate-900">Real-world Insights</h4>
                      <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                        Learn from practical scenarios and examples
                      </p>
                    </div>

                  </div>
                </div>

                {/* Right Card: Quote Banner Card */}
                <div className="lg:col-span-4 bg-gradient-to-br from-purple-50/80 via-white to-indigo-50/60 rounded-3xl p-6 border border-purple-100 shadow-xs space-y-4 flex flex-col justify-between relative overflow-hidden">
                  
                  {/* Background Trend Graphic */}
                  <div className="absolute bottom-2 right-2 text-indigo-400/20">
                    <svg className="w-32 h-16" viewBox="0 0 100 50" fill="none">
                      <path d="M 10 40 L 40 30 L 70 35 L 95 10" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  <div className="space-y-3 relative z-10">
                    <div className="text-4xl text-[#5551ff] font-serif font-black leading-none">“</div>
                    <blockquote className="text-sm font-extrabold text-slate-900 leading-snug">
                      “Inclusive workplaces aren't just fairer — they perform better.”
                    </blockquote>
                    <div className="text-xs font-black text-[#5551ff]">Build. Include. Lead.</div>
                  </div>

                  <div className="flex justify-end relative z-10 pt-2">
                    <svg className="w-16 h-8 text-[#5551ff]" viewBox="0 0 60 30" fill="none">
                      <path d="M 5 25 L 25 18 L 40 22 L 55 5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M 45 5 L 55 5 L 55 15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* PRE-GAME QUIZ TAB (MATCHES REFERENCE SCREENSHOT) */}
          {activeTab === 'quiz' && (
            <div className="space-y-6 animate-fadeIn pb-12">
              
              {/* Header Title Block with Red Timer Box */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Pre-Game Quiz</h1>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    Let's assess your current understanding of inclusive leadership.
                  </p>
                </div>

                {/* Top-Right Red Countdown Box */}
                <div className="self-start px-4 py-2.5 rounded-2xl border border-rose-200 bg-rose-50/50 flex items-center space-x-3 shrink-0 shadow-2xs">
                  <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                    <Clock className="w-4 h-4 text-rose-600" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-rose-600 leading-none tracking-tight">
                      {formatTimer(timerSeconds)}
                    </div>
                    <div className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider mt-0.5">
                      Time Remaining
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Quiz Grid: 8 Cols Left (Question & Options) | 4 Cols Right (Progress & Widgets) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* LEFT 8 COLUMNS: QUESTION CARD & NAVIGATION */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Question Progress Line */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-black text-slate-900">
                        Question {quizIndex + 1} of {quizQuestions.length}
                      </span>
                      <span className="font-bold text-slate-400">
                        {Math.round(((quizIndex + 1) / quizQuestions.length) * 100)}%
                      </span>
                    </div>

                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#5551ff] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((quizIndex + 1) / quizQuestions.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Question Container Card */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs space-y-6">
                    
                    {/* Multiple Choice Badge */}
                    <div>
                      <span className="inline-block px-3 py-1 rounded-lg bg-[#f3e8ff] text-[#5551ff] text-[11px] font-extrabold tracking-wide">
                        Multiple Choice
                      </span>
                    </div>

                    {/* Question Title */}
                    <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug tracking-tight">
                      {quizQuestions[quizIndex].question}
                    </h2>

                    {/* 4 Selectable Option Radio Cards */}
                    <div className="space-y-3 pt-2">
                      {quizQuestions[quizIndex].options.map((optText, optIdx) => {
                        const isSelected = quizAnswers[quizIndex] === optIdx;
                        return (
                          <div
                            key={optIdx}
                            onClick={() => setQuizAnswers(prev => ({ ...prev, [quizIndex]: optIdx }))}
                            className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center space-x-4 ${
                              isSelected
                                ? 'bg-[#f4f0ff] border-[#5551ff] shadow-xs'
                                : 'bg-white border-slate-200/80 hover:border-slate-300'
                            }`}
                          >
                            {/* Radio Dot Circle */}
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                              isSelected ? 'border-[#5551ff] bg-[#5551ff]' : 'border-slate-300 bg-white'
                            }`}>
                              {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>

                            {/* Option Label */}
                            <span className={`text-xs sm:text-sm font-bold leading-snug ${
                              isSelected ? 'text-slate-900 font-extrabold' : 'text-slate-700'
                            }`}>
                              {optText}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                  </div>

                  {/* Bottom Navigation Buttons Bar */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      disabled={quizIndex === 0}
                      onClick={() => setQuizIndex(prev => Math.max(0, prev - 1))}
                      className="px-6 py-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-xs shadow-2xs disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-2 transition-all cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>

                    <button
                      onClick={() => {
                        if (quizIndex < quizQuestions.length - 1) {
                          setQuizIndex(prev => prev + 1);
                        } else {
                          setActiveTab('game');
                          setGameStep('tutorial');
                        }
                      }}
                      className="px-7 py-3 rounded-2xl bg-[#5551ff] hover:bg-indigo-600 text-white font-extrabold text-xs shadow-md shadow-indigo-500/20 flex items-center space-x-2 transition-all cursor-pointer"
                    >
                      <span>{quizIndex === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>

                {/* RIGHT 4 COLUMNS: PROGRESS TRACKER & AUXILIARY WIDGETS */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Card 1: Quiz Progress Widget */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black text-slate-900">Quiz Progress</h3>
                      <span className="text-xs font-bold text-slate-400">
                        {Object.keys(quizAnswers).length} / {quizQuestions.length} Questions
                      </span>
                    </div>

                    {/* 10 Circle Pills Row */}
                    <div className="flex items-center justify-between gap-1 pt-1">
                      {quizQuestions.map((_, idx) => {
                        const isAnswered = quizAnswers[idx] !== undefined;
                        const isCurrent = idx === quizIndex;

                        if (isCurrent) {
                          return (
                            <div
                              key={idx}
                              onClick={() => setQuizIndex(idx)}
                              className="w-7 h-7 rounded-full bg-[#5551ff] text-white font-black text-xs flex items-center justify-center shadow-md shadow-indigo-500/30 cursor-pointer"
                            >
                              {idx + 1}
                            </div>
                          );
                        } else if (isAnswered) {
                          return (
                            <div
                              key={idx}
                              onClick={() => setQuizIndex(idx)}
                              className="w-7 h-7 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center cursor-pointer"
                            >
                              <Check className="w-4 h-4 stroke-[3]" />
                            </div>
                          );
                        } else {
                          return (
                            <div
                              key={idx}
                              onClick={() => setQuizIndex(idx)}
                              className="w-7 h-7 rounded-full border border-slate-300 text-slate-400 font-bold text-xs flex items-center justify-center hover:bg-slate-50 cursor-pointer"
                            >
                              {idx + 1}
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>

                  {/* Card 2: Why this matters? */}
                  <div className="bg-[#f4f2ff] rounded-3xl p-5 border border-purple-100/90 space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                        <Lightbulb className="w-4 h-4 text-amber-600" />
                      </div>
                      <h4 className="text-xs font-black text-slate-900">Why this matters?</h4>
                    </div>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      Inclusion in hybrid workplaces ensures everyone has equal access to information, opportunities, and resources, regardless of their location.
                    </p>
                  </div>

                  {/* Card 3: Learning Objective */}
                  <div className="bg-[#f4f2ff] rounded-3xl p-5 border border-purple-100/90 space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-xl bg-purple-100 text-[#5551ff] flex items-center justify-center shrink-0">
                        <Target className="w-4 h-4 text-[#5551ff]" />
                      </div>
                      <h4 className="text-xs font-black text-slate-900">Learning Objective</h4>
                    </div>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      Understand practical strategies for building inclusive teams in modern workplaces.
                    </p>
                  </div>

                  {/* Card 4: Corporate Team Illustration Card */}
                  <div className="rounded-3xl overflow-hidden border border-slate-100 shadow-xs relative bg-gradient-to-b from-purple-50 to-amber-50">
                    <img
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
                      alt="Inclusive Leadership Team"
                      className="w-full h-44 object-cover"
                    />
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* HOW TO PLAY (TUTORIAL) TAB (MATCHES REFERENCE SCREENSHOT) */}
          {activeTab === 'game' && gameStep === 'tutorial' && !showJoinModal && (
            <div className="space-y-6 animate-fadeIn pb-12">
              
              {/* Top Workflow Sub-Step Navigation Pills */}
              <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80 max-w-fit">
                <button
                  onClick={() => setGameStep('tutorial')}
                  className="px-4 py-2 rounded-xl text-xs font-extrabold bg-[#5551ff] text-white shadow-xs cursor-pointer"
                >
                  1. Tutorial (How to Play)
                </button>
                <button
                  onClick={() => setGameStep('setup')}
                  className="px-4 py-2 rounded-xl text-xs font-extrabold text-slate-600 hover:text-slate-900 hover:bg-white/60 cursor-pointer transition-all"
                >
                  2. Set Up Your Company
                </button>
                <button
                  onClick={() => setGameStep('round')}
                  className="px-4 py-2 rounded-xl text-xs font-extrabold text-slate-600 hover:text-slate-900 hover:bg-white/60 cursor-pointer transition-all"
                >
                  3. In-Game Round 1
                </button>
              </div>

              {/* Header Title Block */}
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">How to Play</h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  A quick tutorial to help you understand the game, rules, and objectives.
                </p>
              </div>

              {/* Main Grid: 8 Cols Left (Video & Topics) | 4 Cols Right (Game Journey) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* LEFT 8 COLUMNS */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Interactive Video Player Card */}
                  <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-xl relative group">
                    
                    {/* Video / Thumbnail Container */}
                    <div className="relative aspect-video w-full bg-slate-950 overflow-hidden flex items-center justify-center">
                      
                      {/* Background Graphic / Image */}
                      <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80"
                        alt="Welcome to Inclusive Tycoon"
                        className="w-full h-full object-cover opacity-80"
                      />
                      
                      {/* Overlay Gradient & Title Text */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/30 flex flex-col justify-between p-6 sm:p-8">
                        
                        {/* Top Right Badges */}
                        <div className="self-end hidden sm:flex flex-col items-end space-y-1">
                          <span className="text-[10px] font-black uppercase tracking-wider text-purple-300 bg-purple-950/60 px-3 py-1 rounded-full border border-purple-500/30">
                            PEOPLE • IDEAS • INCLUSION • GROWTH
                          </span>
                        </div>

                        {/* Center Left Welcome Overlay Text */}
                        <div className="max-w-md space-y-2">
                          <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight tracking-tight">
                            Welcome to <br />
                            <span className="text-purple-300">Inclusive Tycoon</span>
                          </h2>
                          <p className="text-xs sm:text-sm text-slate-200 font-semibold leading-snug">
                            Make decisions. Build your company. Create a more inclusive workplace.
                          </p>
                        </div>

                      </div>

                      {/* Central Floating Play Button */}
                      <button
                        onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                        className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-white text-[#5551ff] hover:scale-110 shadow-2xl flex items-center justify-center transition-all cursor-pointer z-10"
                      >
                        {isPlayingVideo ? (
                          <Pause className="w-7 h-7 fill-current" />
                        ) : (
                          <Play className="w-7 h-7 fill-current ml-1" />
                        )}
                      </button>

                    </div>

                    {/* Video Player Control Bar */}
                    <div className="bg-slate-950 px-5 py-3 border-t border-slate-800/80 flex items-center justify-between text-white text-xs font-bold">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                          className="hover:text-purple-400 transition-colors"
                        >
                          {isPlayingVideo ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <span className="text-[11px] font-mono text-slate-300">
                          {isPlayingVideo ? '0:42 / 3:28' : '0:00 / 3:28'}
                        </span>
                        <div className="w-32 sm:w-48 bg-slate-800 rounded-full h-1.5 overflow-hidden cursor-pointer">
                          <div
                            className="bg-[#5551ff] h-1.5 rounded-full"
                            style={{ width: isPlayingVideo ? '20%' : '0%' }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 text-slate-400">
                        <Volume2 className="w-4 h-4 hover:text-white cursor-pointer" />
                        <span className="text-[10px] font-black px-1.5 py-0.5 border border-slate-700 rounded text-slate-300 cursor-pointer">
                          CC
                        </span>
                        <Settings className="w-4 h-4 hover:text-white cursor-pointer" />
                        <Maximize className="w-4 h-4 hover:text-white cursor-pointer" />
                      </div>
                    </div>

                  </div>

                  {/* Key Topics in This Tutorial */}
                  <div className="space-y-4 pt-2">
                    <div>
                      <h3 className="text-base font-black text-slate-900">Key Topics in This Tutorial</h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        This short video will cover everything you need to know before starting the game.
                      </p>
                    </div>

                    {/* 4 Feature Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      
                      {/* Card 1: Game Objective */}
                      <div className="bg-[#f4f2ff] rounded-2xl p-4 border border-purple-100/80 space-y-2">
                        <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#5551ff] flex items-center justify-center">
                          <Gamepad2 className="w-4 h-4 text-[#5551ff]" />
                        </div>
                        <h4 className="text-xs font-black text-slate-900">Game Objective</h4>
                        <p className="text-[11px] text-slate-500 font-medium leading-snug">
                          Understand your goal and how to win
                        </p>
                      </div>

                      {/* Card 2: Game Interface */}
                      <div className="bg-[#eff6ff] rounded-2xl p-4 border border-sky-100/80 space-y-2">
                        <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
                          <LayoutDashboard className="w-4 h-4 text-sky-600" />
                        </div>
                        <h4 className="text-xs font-black text-slate-900">Game Interface</h4>
                        <p className="text-[11px] text-slate-500 font-medium leading-snug">
                          Learn about the dashboard, rounds, and decisions
                        </p>
                      </div>

                      {/* Card 3: Decision Making */}
                      <div className="bg-[#f0fdf4] rounded-2xl p-4 border border-emerald-100/80 space-y-2">
                        <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                          <FileCheck className="w-4 h-4 text-emerald-600" />
                        </div>
                        <h4 className="text-xs font-black text-slate-900">Decision Making</h4>
                        <p className="text-[11px] text-slate-500 font-medium leading-snug">
                          See how to evaluate options and their impact
                        </p>
                      </div>

                      {/* Card 4: Scoring & Impact */}
                      <div className="bg-[#fffbeb] rounded-2xl p-4 border border-amber-100/80 space-y-2">
                        <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                          <BarChart3 className="w-4 h-4 text-amber-600" />
                        </div>
                        <h4 className="text-xs font-black text-slate-900">Scoring & Impact</h4>
                        <p className="text-[11px] text-slate-500 font-medium leading-snug">
                          Understand how your decisions affect results
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* Bottom Action Control Bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <div className="w-full sm:w-auto flex-1 bg-[#f4f2ff] border border-purple-100 rounded-2xl px-4 py-3 flex items-center space-x-2 text-xs font-bold text-slate-700">
                      <Info className="w-4 h-4 text-[#5551ff] shrink-0" />
                      <span>The tutorial is mandatory to continue to the game.</span>
                    </div>

                    <button
                      onClick={() => setGameStep('setup')}
                      className="w-full sm:w-auto px-8 py-3.5 bg-[#5551ff] hover:bg-indigo-600 text-white font-extrabold text-sm rounded-2xl shadow-md shadow-indigo-500/20 flex items-center justify-center space-x-2 cursor-pointer transition-all shrink-0"
                    >
                      <span>Continue to Company Setup</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>

                {/* RIGHT 4 COLUMNS: GAME JOURNEY WIDGET */}
                <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-5">
                  <div>
                    <h3 className="text-base font-black text-slate-900">Game Journey</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      You will go through the following steps:
                    </p>
                  </div>

                  {/* 5 Vertical Steps List */}
                  <div className="space-y-3">
                    
                    {/* Step 1: Pre-Game Quiz */}
                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                        <div>
                          <div className="text-xs font-black text-slate-900">Pre-Game Quiz</div>
                          <div className="text-[10px] text-emerald-600 font-extrabold">Completed</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">10 Questions</span>
                    </div>

                    {/* Step 2: Tutorial (How to Play) - ACTIVE */}
                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#f4f0ff] border border-purple-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-7 h-7 rounded-full bg-[#5551ff] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-md shadow-indigo-500/30">
                          2
                        </div>
                        <div>
                          <div className="text-xs font-black text-[#5551ff]">Tutorial (How to Play)</div>
                          <div className="text-[10px] text-slate-500 font-medium">Learn the game rules and features</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500">3-5 Minutes</span>
                    </div>

                    {/* Step 3: Game */}
                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-7 h-7 rounded-full border-2 border-slate-300 text-slate-500 font-bold text-xs flex items-center justify-center shrink-0">
                          3
                        </div>
                        <div>
                          <div className="text-xs font-black text-slate-800">Game</div>
                          <div className="text-[10px] text-slate-400 font-medium">Make decisions and build your company</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">10 Rounds</span>
                    </div>

                    {/* Step 4: Post-Game Quiz */}
                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-7 h-7 rounded-full border-2 border-slate-300 text-slate-500 font-bold text-xs flex items-center justify-center shrink-0">
                          4
                        </div>
                        <div>
                          <div className="text-xs font-black text-slate-800">Post-Game Quiz</div>
                          <div className="text-[10px] text-slate-400 font-medium">See what you've learned</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">10 Questions</span>
                    </div>

                    {/* Step 5: Results & Certificate */}
                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-7 h-7 rounded-full border-2 border-slate-300 text-slate-500 font-bold text-xs flex items-center justify-center shrink-0">
                          5
                        </div>
                        <div>
                          <div className="text-xs font-black text-slate-800">Results & Certificate</div>
                          <div className="text-[10px] text-slate-400 font-medium">View your impact and get your certificate</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">-</span>
                    </div>

                  </div>

                </div>

              </div>

            </div>
          )}

          {/* SET UP YOUR COMPANY TAB (MATCHES REFERENCE SCREENSHOT) */}
          {activeTab === 'game' && gameStep === 'setup' && !showJoinModal && (
            <div className="space-y-6 animate-fadeIn pb-12">
              
              {/* Top Workflow Sub-Step Navigation Pills */}
              <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80 max-w-fit">
                <button
                  onClick={() => setGameStep('tutorial')}
                  className="px-4 py-2 rounded-xl text-xs font-extrabold text-slate-600 hover:text-slate-900 hover:bg-white/60 cursor-pointer transition-all"
                >
                  1. Tutorial (How to Play)
                </button>
                <button
                  onClick={() => setGameStep('setup')}
                  className="px-4 py-2 rounded-xl text-xs font-extrabold bg-[#5551ff] text-white shadow-xs cursor-pointer"
                >
                  2. Set Up Your Company
                </button>
                <button
                  onClick={() => setGameStep('round')}
                  className="px-4 py-2 rounded-xl text-xs font-extrabold text-slate-600 hover:text-slate-900 hover:bg-white/60 cursor-pointer transition-all"
                >
                  3. In-Game Round 1
                </button>
              </div>

              {/* Header Title Block */}
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Set Up Your Company</h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  You are the CEO of a growing organization. Make strategic decisions to build a diverse, inclusive, and high-performing company.
                </p>
              </div>

              {/* Main Grid: 8 Cols Left (Industry & Profile Setup) | 4 Cols Right (Starting Point & Next Steps) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* LEFT 8 COLUMNS: STEP 1 & STEP 2 */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* STEP 1: Choose Your Company */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs space-y-6">
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-[#5551ff] text-white font-black text-sm flex items-center justify-center shrink-0 shadow-md shadow-indigo-500/30">
                        1
                      </div>
                      <div>
                        <h3 className="text-base font-black text-slate-900">Choose Your Company</h3>
                        <p className="text-xs text-slate-500 font-medium leading-tight mt-0.5">
                          Select the industry for your company. Each industry comes with unique challenges and opportunities.
                        </p>
                      </div>
                    </div>

                    {/* 4 Industry Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      
                      {/* 1. Technology */}
                      <div
                        onClick={() => {
                          setSelectedIndustry('tech');
                          setCompanyNameInput('InnovaTech Solutions');
                        }}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                          selectedIndustry === 'tech'
                            ? 'bg-[#f4f0ff] border-[#5551ff] shadow-xs'
                            : 'bg-white border-slate-200/80 hover:border-slate-300'
                        }`}
                      >
                        <div className="rounded-xl overflow-hidden h-24 bg-slate-100 border border-slate-200/60">
                          <img
                            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80"
                            alt="Technology Industry"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="space-y-1 text-center">
                          <h4 className="text-xs font-black text-slate-900">Technology</h4>
                          <p className="text-[10px] text-slate-500 font-medium leading-tight">
                            Fast-paced, innovation driven industry with global opportunities.
                          </p>
                        </div>

                        <div className="flex justify-center pt-1">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            selectedIndustry === 'tech' ? 'border-[#5551ff] bg-[#5551ff]' : 'border-slate-300 bg-white'
                          }`}>
                            {selectedIndustry === 'tech' && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                        </div>
                      </div>

                      {/* 2. Manufacturing */}
                      <div
                        onClick={() => {
                          setSelectedIndustry('mfg');
                          setCompanyNameInput('Apex Manufacturing Ltd');
                        }}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                          selectedIndustry === 'mfg'
                            ? 'bg-[#f4f0ff] border-[#5551ff] shadow-xs'
                            : 'bg-white border-slate-200/80 hover:border-slate-300'
                        }`}
                      >
                        <div className="rounded-xl overflow-hidden h-24 bg-slate-100 border border-slate-200/60">
                          <img
                            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80"
                            alt="Manufacturing Industry"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="space-y-1 text-center">
                          <h4 className="text-xs font-black text-slate-900">Manufacturing</h4>
                          <p className="text-[10px] text-slate-500 font-medium leading-tight">
                            Large workforce with diverse roles and skill sets.
                          </p>
                        </div>

                        <div className="flex justify-center pt-1">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            selectedIndustry === 'mfg' ? 'border-[#5551ff] bg-[#5551ff]' : 'border-slate-300 bg-white'
                          }`}>
                            {selectedIndustry === 'mfg' && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                        </div>
                      </div>

                      {/* 3. Financial Services */}
                      <div
                        onClick={() => {
                          setSelectedIndustry('fin');
                          setCompanyNameInput('Vanguard Financial Corp');
                        }}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                          selectedIndustry === 'fin'
                            ? 'bg-[#f4f0ff] border-[#5551ff] shadow-xs'
                            : 'bg-white border-slate-200/80 hover:border-slate-300'
                        }`}
                      >
                        <div className="rounded-xl overflow-hidden h-24 bg-slate-100 border border-slate-200/60">
                          <img
                            src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=400&q=80"
                            alt="Financial Services Industry"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="space-y-1 text-center">
                          <h4 className="text-xs font-black text-slate-900">Financial Services</h4>
                          <p className="text-[10px] text-slate-500 font-medium leading-tight">
                            Regulated industry with high focus on compliance and risk.
                          </p>
                        </div>

                        <div className="flex justify-center pt-1">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            selectedIndustry === 'fin' ? 'border-[#5551ff] bg-[#5551ff]' : 'border-slate-300 bg-white'
                          }`}>
                            {selectedIndustry === 'fin' && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                        </div>
                      </div>

                      {/* 4. Healthcare */}
                      <div
                        onClick={() => {
                          setSelectedIndustry('health');
                          setCompanyNameInput('LifeCare Health Systems');
                        }}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                          selectedIndustry === 'health'
                            ? 'bg-[#f4f0ff] border-[#5551ff] shadow-xs'
                            : 'bg-white border-slate-200/80 hover:border-slate-300'
                        }`}
                      >
                        <div className="rounded-xl overflow-hidden h-24 bg-slate-100 border border-slate-200/60">
                          <img
                            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=400&q=80"
                            alt="Healthcare Industry"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="space-y-1 text-center">
                          <h4 className="text-xs font-black text-slate-900">Healthcare</h4>
                          <p className="text-[10px] text-slate-500 font-medium leading-tight">
                            People-centric industry with critical services and high impact.
                          </p>
                        </div>

                        <div className="flex justify-center pt-1">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            selectedIndustry === 'health' ? 'border-[#5551ff] bg-[#5551ff]' : 'border-slate-300 bg-white'
                          }`}>
                            {selectedIndustry === 'health' && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>

                  {/* STEP 2: Set Your Company Profile */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs space-y-6">
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-[#5551ff] text-white font-black text-sm flex items-center justify-center shrink-0 shadow-md shadow-indigo-500/30">
                          2
                        </div>
                        <div>
                          <h3 className="text-base font-black text-slate-900">Set Your Company Profile</h3>
                          <p className="text-xs text-slate-500 font-medium leading-tight mt-0.5">
                            Your initial company details are pre-configured. You can customize your company name and CEO name.
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedIndustry('tech');
                          setCompanyNameInput('InnovaTech Solutions');
                          setCeoNameInput(user ? user.name : 'Priya Sharma');
                          setCompanySizeInput('500 - 1,000 Employees');
                        }}
                        className="px-3.5 py-1.5 rounded-xl border border-purple-200 text-[#5551ff] hover:bg-purple-50 text-xs font-extrabold flex items-center space-x-1.5 transition-colors shrink-0 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Use Default Settings</span>
                      </button>
                    </div>

                    {/* Form Fields Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                      
                      {/* Field 1: Company Name */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-black text-slate-700">Company Name</label>
                        <input
                          type="text"
                          value={companyNameInput}
                          onChange={(e) => setCompanyNameInput(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#5551ff]"
                        />
                      </div>

                      {/* Field 2: CEO Name */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-black text-slate-700">CEO Name (You)</label>
                        <input
                          type="text"
                          value={ceoNameInput}
                          onChange={(e) => setCeoNameInput(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#5551ff]"
                        />
                      </div>

                      {/* Field 3: Company Size */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-black text-slate-700">Company Size</label>
                        <select
                          value={companySizeInput}
                          onChange={(e) => setCompanySizeInput(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                        >
                          <option value="100 - 500 Employees">100 - 500 Employees</option>
                          <option value="500 - 1,000 Employees">500 - 1,000 Employees</option>
                          <option value="1,000 - 5,000 Employees">1,000 - 5,000 Employees</option>
                          <option value="5,000+ Employees">5,000+ Employees</option>
                        </select>
                      </div>

                      {/* Field 4: Initial Budget (Read-only) */}
                      <div className="space-y-1.5">
                        <div className="flex items-center space-x-1">
                          <label className="block text-xs font-black text-slate-700">Initial Budget</label>
                          <Info className="w-3.5 h-3.5 text-slate-400 cursor-pointer" />
                        </div>
                        <div className="w-full px-4 py-3 bg-slate-100/90 border border-slate-200 rounded-2xl text-xs font-bold text-slate-600 flex items-center space-x-2">
                          <Coins className="w-4 h-4 text-purple-600" />
                          <span>1,000 Points</span>
                        </div>
                      </div>

                    </div>

                  </div>

                  {/* Bottom Action Controls Bar */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => setGameStep('tutorial')}
                      className="px-6 py-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-xs shadow-2xs flex items-center space-x-2 transition-all cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Tutorial</span>
                    </button>

                    <button
                      onClick={() => {
                        setPlayerName(ceoNameInput);
                        setMode('single');
                        handleCreateSession();
                        setGameStep('round');
                        setRoundStage('decision');
                        setCurrentRoundIndex(1);
                      }}
                      className="px-8 py-3.5 bg-[#5551ff] hover:bg-indigo-600 text-white font-extrabold text-xs rounded-2xl shadow-md shadow-indigo-500/20 flex items-center space-x-2 transition-all cursor-pointer"
                    >
                      <span>Start Round 1</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>

                {/* RIGHT 4 COLUMNS: STARTING POINT & NEXT STEPS */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Card 1: Your Starting Point */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                    <h3 className="text-sm font-black text-slate-900">Your Starting Point</h3>

                    {/* Building Thumbnail Card */}
                    <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-2xs relative">
                      <img
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"
                        alt="Company Headquarters"
                        className="w-full h-36 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3.5">
                        <span className="text-xs font-black text-white tracking-tight">
                          {companyNameInput || 'InnovaTech Solutions'}
                        </span>
                      </div>
                    </div>

                    {/* 3 Summary Items */}
                    <div className="space-y-3 pt-1">
                      
                      {/* Item 1: Industry */}
                      <div className="flex items-center space-x-3 text-xs">
                        <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#5551ff] flex items-center justify-center shrink-0">
                          <Settings className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase">Industry</div>
                          <div className="font-black text-slate-900">
                            {selectedIndustry === 'tech' ? 'Technology' : selectedIndustry === 'mfg' ? 'Manufacturing' : selectedIndustry === 'fin' ? 'Financial Services' : 'Healthcare'}
                          </div>
                        </div>
                      </div>

                      {/* Item 2: Company Size */}
                      <div className="flex items-center space-x-3 text-xs">
                        <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase">Company Size</div>
                          <div className="font-black text-slate-900">{companySizeInput}</div>
                        </div>
                      </div>

                      {/* Item 3: Initial Budget */}
                      <div className="flex items-center space-x-3 text-xs">
                        <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#5551ff] flex items-center justify-center shrink-0">
                          <Coins className="w-4 h-4 text-[#5551ff]" />
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase">Initial Budget</div>
                          <div className="font-black text-slate-900">1,000 Points</div>
                        </div>
                      </div>

                    </div>

                  </div>

                  {/* Card 2: What Happens Next? */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                    <h3 className="text-sm font-black text-slate-900">What Happens Next?</h3>

                    <div className="space-y-3 text-xs font-bold text-slate-700">
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-[#5551ff] text-white font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                          1
                        </div>
                        <p className="leading-snug pt-0.5">You will start with Round 1</p>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 text-slate-600 font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                          2
                        </div>
                        <p className="leading-snug text-slate-500 font-medium pt-0.5">You will make strategic decisions using your budget points</p>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 text-slate-600 font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                          3
                        </div>
                        <p className="leading-snug text-slate-500 font-medium pt-0.5">You will face real-world events and challenges</p>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 text-slate-600 font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                          4
                        </div>
                        <p className="leading-snug text-slate-500 font-medium pt-0.5">Your decisions will impact key areas like financial performance, employee inclusion, talent retention, and brand reputation</p>
                      </div>

                    </div>
                  </div>

                  {/* Card 3: Quick Tips */}
                  <div className="bg-[#fffbeb] rounded-3xl p-5 border border-amber-100/90 space-y-2.5">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                        <Lightbulb className="w-4 h-4 text-amber-600" />
                      </div>
                      <h4 className="text-xs font-black text-slate-900">Quick Tips</h4>
                    </div>

                    <ul className="text-xs text-slate-600 font-medium leading-relaxed space-y-1 pl-1">
                      <li>• Think long-term, not just short-term gains.</li>
                      <li>• Balance business performance with inclusion.</li>
                      <li>• Each decision has trade-offs.</li>
                      <li>• Learn from the feedback after each round.</li>
                    </ul>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ROUND 1 OF 10 DECISION TAB (MATCHES REFERENCE SCREENSHOT) */}
          {activeTab === 'game' && gameStep === 'round' && !showJoinModal && (
            <div className="space-y-6 animate-fadeIn pb-12">
              
              {/* Top Workflow Sub-Step Navigation Pills */}
              <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80 max-w-fit flex-wrap gap-y-1">
                <button
                  onClick={() => setGameStep('tutorial')}
                  className="px-4 py-2 rounded-xl text-xs font-extrabold text-slate-600 hover:text-slate-900 hover:bg-white/60 cursor-pointer transition-all"
                >
                  1. Tutorial
                </button>
                <button
                  onClick={() => setGameStep('setup')}
                  className="px-4 py-2 rounded-xl text-xs font-extrabold text-slate-600 hover:text-slate-900 hover:bg-white/60 cursor-pointer transition-all"
                >
                  2. Set Up Company
                </button>
                <button
                  onClick={() => {
                    setGameStep('round');
                    setRoundStage('decision');
                    setShowDecisionModal(true);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
                    roundStage === 'decision'
                      ? 'bg-[#5551ff] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  3. Round 1 Decision & Modal
                </button>
                <button
                  onClick={() => {
                    setGameStep('round');
                    setRoundStage('outcome');
                    setShowDecisionModal(false);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
                    roundStage === 'outcome'
                      ? 'bg-[#5551ff] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  4. Event Outcome (Top Talent)
                </button>
                <button
                  onClick={() => {
                    setGameStep('round');
                    setRoundStage('consequence');
                    setShowDecisionModal(false);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
                    roundStage === 'consequence'
                      ? 'bg-[#5551ff] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  5. Consequence & Learning Feedback
                </button>
                <button
                  onClick={() => {
                    setGameStep('round');
                    setRoundStage('round2');
                    setCurrentRoundIndex(2);
                    setShowDecisionModal(false);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
                    roundStage === 'round2'
                      ? 'bg-[#5551ff] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  6. In-Game Round 2 (Scaling Team)
                </button>
              </div>
              
              {/* Header Title & Stepper with Red Timer Box */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {/* Left Round Title & Stepper */}
                <div className="space-y-3">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Round {roundStage === 'round2' ? 2 : currentRoundIndex} of 10
                  </h1>
                  
                  {/* 10 Circle Stepper */}
                  <div className="flex items-center space-x-2 relative">
                    <div className="absolute top-1/2 left-3 right-3 h-0.5 bg-slate-200 -z-0 -translate-y-1/2" />
                    {Array.from({ length: 10 }).map((_, idx) => {
                      const roundNum = idx + 1;
                      const activeRound = roundStage === 'round2' ? 2 : currentRoundIndex;
                      const isCurrent = roundNum === activeRound;
                      const isCompleted = roundNum < activeRound;
                      return (
                        <div
                          key={roundNum}
                          onClick={() => setCurrentRoundIndex(roundNum)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs relative z-10 transition-all cursor-pointer ${
                            isCurrent
                              ? 'bg-[#5551ff] text-white shadow-md shadow-indigo-500/30'
                              : isCompleted
                              ? 'bg-emerald-500 text-white'
                              : 'bg-white border-2 border-slate-300 text-slate-500 hover:border-slate-400'
                          }`}
                        >
                          {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : roundNum}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Top-Right Red Countdown Box */}
                <div className="self-start sm:self-auto px-4 py-2.5 rounded-2xl border border-rose-200 bg-rose-50/50 flex items-center space-x-3 shrink-0 shadow-2xs">
                  <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                    <Clock className="w-4 h-4 text-rose-600" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-rose-600 leading-none tracking-tight">
                      {formatTimer(roundStage === 'round2' ? 600 : roundStage === 'consequence' ? 340 : roundStage === 'outcome' ? 372 : roundTimerSeconds)}
                    </div>
                    <div className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider mt-0.5">
                      {roundStage === 'round2' ? 'Time for this Round' : 'Time Remaining'}
                    </div>
                  </div>
                </div>

              </div>

              {/* RENDER STAGE CONTENT: ROUND 2 VS CONSEQUENCE VS EVENT OUTCOME VS DECISION */}
              {roundStage === 'round2' ? (
                /* ROUND 2 IN-GAME VIEW (MATCHES BRD & REFERENCE SCREENSHOT) */
                <div className="space-y-6">
                  
                  {/* Card 1: New Scenario Hero Banner */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                    
                    {/* Left Content */}
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 rounded-lg bg-purple-100 text-[#5551ff] text-[11px] font-black border border-purple-200">
                          NEW SCENARIO
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Round 2</div>
                        <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                          Scaling Your Team in a Competitive Market
                        </h2>
                      </div>
                      
                      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-2xl">
                        Your company is experiencing rapid growth and needs to hire new team members. The market is highly competitive, and there is pressure to fill roles quickly. You must decide how to structure your hiring strategy.
                      </p>
                    </div>

                    {/* Right Graphic Card with Hiring Presentation Illustration */}
                    <div className="w-full md:w-80 h-48 rounded-2xl overflow-hidden border border-slate-100 shrink-0 shadow-2xs relative group">
                      <img
                        src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80"
                        alt="Scaling Your Team in a Competitive Market"
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent flex items-end p-3.5">
                        <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/80 text-center shadow-md">
                          <div className="text-[10px] font-black text-slate-900 uppercase">WE ARE HIRING</div>
                          <div className="text-[9px] font-extrabold text-[#5551ff]">Diverse Talent • Stronger Teams</div>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Section 2: Key Considerations (4 Cards Row) */}
                  <div className="space-y-3">
                    <h3 className="text-base font-black text-slate-900">Key Considerations</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      
                      {/* Card 1: Hiring Speed */}
                      <div className="bg-sky-50/60 border border-sky-100 p-4 rounded-2xl space-y-1.5 flex items-start space-x-3.5">
                        <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                          <Users className="w-5 h-5 text-sky-600" />
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-xs sm:text-sm font-black text-slate-900">Hiring Speed</h4>
                          <p className="text-[11px] text-slate-500 font-medium leading-snug">
                            The market is competitive and top talent is getting offers quickly.
                          </p>
                        </div>
                      </div>

                      {/* Card 2: Budget Constraints */}
                      <div className="bg-amber-50/60 border border-amber-100 p-4 rounded-2xl space-y-1.5 flex items-start space-x-3.5">
                        <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                          <Coins className="w-5 h-5 text-amber-600" />
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-xs sm:text-sm font-black text-slate-900">Budget Constraints</h4>
                          <p className="text-[11px] text-slate-500 font-medium leading-snug">
                            You need to manage costs while expanding your team.
                          </p>
                        </div>
                      </div>

                      {/* Card 3: Diversity & Inclusion */}
                      <div className="bg-emerald-50/60 border border-emerald-100 p-4 rounded-2xl space-y-1.5 flex items-start space-x-3.5">
                        <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                          <Users className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-xs sm:text-sm font-black text-slate-900">Diversity & Inclusion</h4>
                          <p className="text-[11px] text-slate-500 font-medium leading-snug">
                            Ensure diverse representation in your new hires.
                          </p>
                        </div>
                      </div>

                      {/* Card 4: Long-term Impact */}
                      <div className="bg-rose-50/60 border border-rose-100 p-4 rounded-2xl space-y-1.5 flex items-start space-x-3.5">
                        <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                          <Star className="w-5 h-5 text-rose-600" />
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-xs sm:text-sm font-black text-slate-900">Long-term Impact</h4>
                          <p className="text-[11px] text-slate-500 font-medium leading-snug">
                            Your hiring decision will affect team performance, innovation, and brand reputation.
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Section 3: Available Decisions Grid & Right Panel */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* LEFT 8 COLUMNS: YOUR AVAILABLE DECISIONS */}
                    <div className="lg:col-span-8 space-y-6">
                      
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-base font-black text-slate-900">Your Available Decisions</h3>
                          <p className="text-xs text-slate-400 font-bold">Choose one strategy to proceed with this round.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          
                          {/* Option 1: Diverse Hiring Program */}
                          <div
                            onClick={() => setRound2Decision('diverse')}
                            className={`p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                              round2Decision === 'diverse'
                                ? 'bg-[#f4f0ff] border-[#5551ff] shadow-xs ring-2 ring-[#5551ff]/20'
                                : 'bg-white border-slate-200/80 hover:border-slate-300'
                            }`}
                          >
                            <div className="space-y-3">
                              <div className="flex items-start justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                                    round2Decision === 'diverse' ? 'border-[#5551ff] bg-[#5551ff]' : 'border-slate-300 bg-white'
                                  }`}>
                                    {round2Decision === 'diverse' && <div className="w-2 h-2 rounded-full bg-white" />}
                                  </div>
                                  <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#5551ff] flex items-center justify-center">
                                    <Users className="w-5 h-5 text-[#5551ff]" />
                                  </div>
                                </div>
                                <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 text-[11px] font-black border border-rose-100">
                                  - 300 Points
                                </span>
                              </div>

                              <div>
                                <h4 className="text-xs sm:text-sm font-black text-slate-900">Diverse Hiring Program</h4>
                                <p className="text-xs text-slate-500 font-medium leading-snug mt-1">
                                  Launch a structured inclusive program with outreach to underrepresented groups.
                                </p>
                              </div>
                            </div>

                            {/* Impact Indicators */}
                            <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1 text-xs font-extrabold text-emerald-700">
                              <div>↑ + Employee Inclusion</div>
                              <div>↑ + Talent Retention</div>
                              <div>↑ + Innovation & Ideas</div>
                              <div>↑ + Brand Reputation</div>
                            </div>
                          </div>

                          {/* Option 2: Quick Hiring Drive */}
                          <div
                            onClick={() => setRound2Decision('quick')}
                            className={`p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                              round2Decision === 'quick'
                                ? 'bg-[#f4f0ff] border-[#5551ff] shadow-xs ring-2 ring-[#5551ff]/20'
                                : 'bg-white border-slate-200/80 hover:border-slate-300'
                            }`}
                          >
                            <div className="space-y-3">
                              <div className="flex items-start justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                                    round2Decision === 'quick' ? 'border-[#5551ff] bg-[#5551ff]' : 'border-slate-300 bg-white'
                                  }`}>
                                    {round2Decision === 'quick' && <div className="w-2 h-2 rounded-full bg-white" />}
                                  </div>
                                  <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
                                    <Clock className="w-5 h-5 text-rose-600" />
                                  </div>
                                </div>
                                <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 text-[11px] font-black border border-rose-100">
                                  - 200 Points
                                </span>
                              </div>

                              <div>
                                <h4 className="text-xs sm:text-sm font-black text-slate-900">Quick Hiring Drive</h4>
                                <p className="text-xs text-slate-500 font-medium leading-snug mt-1">
                                  Focus on filling roles quickly through traditional channels to meet immediate needs.
                                </p>
                              </div>
                            </div>

                            {/* Impact Indicators */}
                            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs font-extrabold">
                              <div className="text-emerald-700">↑ + Short-term Productivity</div>
                              <div className="text-emerald-700">↑ + Revenue Growth</div>
                              <div className="text-rose-600">↓ - Diversity Impact</div>
                              <div className="text-rose-600">↓ - Long-term Satisfaction</div>
                            </div>
                          </div>

                          {/* Option 3: Partner with Recruitment Firms */}
                          <div
                            onClick={() => setRound2Decision('partner')}
                            className={`p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                              round2Decision === 'partner'
                                ? 'bg-[#f4f0ff] border-[#5551ff] shadow-xs ring-2 ring-[#5551ff]/20'
                                : 'bg-white border-slate-200/80 hover:border-slate-300'
                            }`}
                          >
                            <div className="space-y-3">
                              <div className="flex items-start justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                                    round2Decision === 'partner' ? 'border-[#5551ff] bg-[#5551ff]' : 'border-slate-300 bg-white'
                                  }`}>
                                    {round2Decision === 'partner' && <div className="w-2 h-2 rounded-full bg-white" />}
                                  </div>
                                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                    <Handshake className="w-5 h-5 text-emerald-600" />
                                  </div>
                                </div>
                                <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 text-[11px] font-black border border-rose-100">
                                  - 250 Points
                                </span>
                              </div>

                              <div>
                                <h4 className="text-xs sm:text-sm font-black text-slate-900">Partner with Recruitment Firms</h4>
                                <p className="text-xs text-slate-500 font-medium leading-snug mt-1">
                                  Work with specialized firms to find qualified diverse candidates faster.
                                </p>
                              </div>
                            </div>

                            {/* Impact Indicators */}
                            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs font-extrabold">
                              <div className="text-emerald-700">↑ + Diverse Talent Access</div>
                              <div className="text-emerald-700">↑ + Faster Hiring</div>
                              <div className="text-rose-600">↓ - Higher Cost</div>
                              <div className="text-rose-600">↓ - Less Direct Control</div>
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* Bottom Navigation Buttons */}
                      <div className="flex items-center justify-between gap-4 pt-2">
                        <button
                          onClick={() => {
                            setRoundStage('consequence');
                            setCurrentRoundIndex(1);
                          }}
                          className="px-6 py-3.5 rounded-2xl border border-slate-200 text-slate-700 font-extrabold text-xs sm:text-sm bg-white hover:bg-slate-50 flex items-center space-x-2 transition-all cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back to Previous Round</span>
                        </button>

                        <button
                          onClick={() => {
                            setActiveTab('results');
                          }}
                          className="px-8 py-3.5 bg-[#5551ff] hover:bg-indigo-600 text-white font-extrabold text-sm rounded-2xl shadow-md shadow-indigo-500/20 flex items-center space-x-2 transition-all cursor-pointer"
                        >
                          <span>Confirm Decision</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>

                    </div>

                    {/* RIGHT 4 COLUMNS: YOUR COMPANY, ROUND TIMELINE, QUICK TIPS */}
                    <div className="lg:col-span-4 space-y-6">
                      
                      {/* Card 1: Your Company */}
                      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-black text-slate-900">Your Company</h3>
                          <button className="text-xs font-bold text-[#5551ff] hover:underline cursor-pointer">
                            View Details
                          </button>
                        </div>

                        {/* Building Graphic */}
                        <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-2xs relative">
                          <img
                            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"
                            alt="InnovaTech Solutions Headquarters"
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3.5">
                            <span className="text-xs font-black text-white tracking-tight">
                              {companyNameInput || 'InnovaTech Solutions'}
                            </span>
                          </div>
                        </div>

                        {/* 4 Gauges Grid */}
                        <div className="grid grid-cols-2 gap-2.5 pt-1">
                          
                          <div className="bg-purple-50/50 border border-purple-100 p-3 rounded-2xl space-y-1">
                            <div className="flex items-center space-x-1.5">
                              <Coins className="w-4 h-4 text-[#5551ff]" />
                              <span className="text-xs font-black text-slate-900">1,000</span>
                            </div>
                            <div className="text-[9px] font-extrabold text-slate-400 leading-tight">Points Remaining</div>
                            <div className="text-[10px] font-extrabold text-emerald-600">↑ +150</div>
                          </div>

                          <div className="bg-indigo-50/50 border border-indigo-100 p-3 rounded-2xl space-y-1">
                            <div className="flex items-center space-x-1.5">
                              <BarChart3 className="w-4 h-4 text-indigo-600" />
                              <span className="text-xs font-black text-slate-900">₹11.0M</span>
                            </div>
                            <div className="text-[9px] font-extrabold text-slate-400 leading-tight">Revenue</div>
                            <div className="text-[10px] font-extrabold text-emerald-600">↑ +10%</div>
                          </div>

                          <div className="bg-sky-50/50 border border-sky-100 p-3 rounded-2xl space-y-1">
                            <div className="flex items-center space-x-1.5">
                              <Users className="w-4 h-4 text-sky-600" />
                              <span className="text-xs font-black text-slate-900">40%</span>
                            </div>
                            <div className="text-[9px] font-extrabold text-slate-400 leading-tight">Inclusion Score</div>
                            <div className="text-[10px] font-extrabold text-emerald-600">↑ +15%</div>
                          </div>

                          <div className="bg-rose-50/50 border border-rose-100 p-3 rounded-2xl space-y-1">
                            <div className="flex items-center space-x-1.5">
                              <Star className="w-4 h-4 text-rose-600" />
                              <span className="text-xs font-black text-slate-900">80%</span>
                            </div>
                            <div className="text-[9px] font-extrabold text-slate-400 leading-tight">Brand Reputation</div>
                            <div className="text-[10px] font-extrabold text-emerald-600">↑ +10%</div>
                          </div>

                        </div>
                      </div>

                      {/* Card 2: Round Timeline */}
                      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-black text-slate-900">Round Timeline</h3>
                          <button className="text-xs font-bold text-[#5551ff] hover:underline cursor-pointer">
                            View All
                          </button>
                        </div>

                        <div className="space-y-4 relative pl-3 border-l-2 border-slate-100 ml-2">
                          
                          {/* Item 1 */}
                          <div className="relative space-y-0.5">
                            <div className="absolute -left-[19px] top-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-white flex items-center justify-center text-white">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                            <div className="flex items-center justify-between text-xs font-black text-slate-900">
                              <span>Round 1 Completed</span>
                              <span className="text-[10px] text-slate-400 font-bold">10 mins ago</span>
                            </div>
                            <p className="text-[11px] text-slate-500 font-medium">Invested in Inclusive Hiring</p>
                          </div>

                          {/* Item 2 */}
                          <div className="relative space-y-0.5">
                            <div className="absolute -left-[19px] top-1 w-3.5 h-3.5 rounded-full bg-[#5551ff] ring-4 ring-white text-white font-black text-[9px] flex items-center justify-center">
                              2
                            </div>
                            <div className="flex items-center justify-between text-xs font-black text-slate-900">
                              <span>Round 2 - Current</span>
                              <span className="text-[10px] text-slate-400 font-bold">Just now</span>
                            </div>
                            <p className="text-[11px] text-slate-500 font-medium">Hiring strategy scenario</p>
                          </div>

                          {/* Item 3 */}
                          <div className="relative space-y-0.5">
                            <div className="absolute -left-[19px] top-1 w-3.5 h-3.5 rounded-full bg-slate-200 ring-4 ring-white text-slate-500 font-black text-[9px] flex items-center justify-center">
                              3
                            </div>
                            <div className="flex items-center justify-between text-xs font-black text-slate-400">
                              <span>Round 3</span>
                            </div>
                            <p className="text-[11px] text-slate-400 font-medium">Expansion opportunity</p>
                          </div>

                          {/* Item 4 */}
                          <div className="relative space-y-0.5">
                            <div className="absolute -left-[19px] top-1 w-3.5 h-3.5 rounded-full bg-slate-200 ring-4 ring-white text-slate-500 font-black text-[9px] flex items-center justify-center">
                              4
                            </div>
                            <div className="flex items-center justify-between text-xs font-black text-slate-400">
                              <span>Round 4</span>
                            </div>
                            <p className="text-[11px] text-slate-400 font-medium">New market challenge</p>
                          </div>

                        </div>
                      </div>

                      {/* Card 3: Quick Tips */}
                      <div className="bg-[#f4f2ff] rounded-3xl p-6 border border-purple-100 shadow-xs space-y-3">
                        <div className="flex items-center space-x-2 text-xs font-black text-[#5551ff]">
                          <Lightbulb className="w-4 h-4 text-[#5551ff]" />
                          <span>Quick Tips</span>
                        </div>

                        <ul className="space-y-2 text-xs font-medium text-slate-700">
                          <li className="flex items-start space-x-2">
                            <span className="text-[#5551ff]">•</span>
                            <span>Consider both short-term and long-term impact</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-[#5551ff]">•</span>
                            <span>Balance business performance and inclusion</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-[#5551ff]">•</span>
                            <span>Look at the trade-offs carefully</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-[#5551ff]">•</span>
                            <span>Your decision will influence future opportunities</span>
                          </li>
                        </ul>
                      </div>

                    </div>

                  </div>

                </div>
              ) : roundStage === 'consequence' ? (
                /* CONSEQUENCE & LEARNING FEEDBACK VIEW (MATCHES BRD & REFERENCE SCREENSHOT) */
                <div className="space-y-6">
                  
                  {/* Card 1: Decision Outcome Hero Banner */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                    
                    {/* Left Content */}
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-emerald-100/80 text-emerald-800 border border-emerald-200 text-[11px] font-black">
                          <Star className="w-3.5 h-3.5 text-emerald-700 fill-emerald-600" />
                          <span>POSITIVE OUTCOME</span>
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                        Your Decision is Paying Off!
                      </h2>
                      
                      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-2xl">
                        Your investment in Inclusive Hiring has created a strong employer brand in the market. Top talent from underrepresented groups is showing interest in joining your company.
                      </p>
                    </div>

                    {/* Right Graphic Card with Building & Speech Bubble */}
                    <div className="w-full md:w-80 h-48 rounded-2xl overflow-hidden border border-slate-100 shrink-0 shadow-2xs relative group">
                      <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
                        alt="Your Decision is Paying Off!"
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/80 shadow-md flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[11px] font-black text-[#5551ff]">We want to join your team!</span>
                      </div>
                    </div>

                  </div>

                  {/* Section 2: Impact on Your Company (5 Metric Cards Row) */}
                  <div className="space-y-3">
                    <h3 className="text-base font-black text-slate-900">Impact on Your Company</h3>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      
                      {/* Points Card */}
                      <div className="bg-purple-50/50 border border-purple-100 p-4 rounded-2xl space-y-1 text-left">
                        <div className="flex items-center space-x-2">
                          <Coins className="w-5 h-5 text-[#5551ff]" />
                          <span className="text-xs font-black text-slate-900">Points</span>
                        </div>
                        <div className="text-lg font-black text-emerald-600">↑ +150</div>
                        <div className="text-[11px] font-bold text-slate-400">850 → 1,000</div>
                      </div>

                      {/* Revenue Card */}
                      <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-2xl space-y-1 text-left">
                        <div className="flex items-center space-x-2">
                          <BarChart3 className="w-5 h-5 text-indigo-600" />
                          <span className="text-xs font-black text-slate-900">Revenue</span>
                        </div>
                        <div className="text-lg font-black text-emerald-600">↑ +10%</div>
                        <div className="text-[11px] font-bold text-slate-400">₹10.0M → ₹11.0M</div>
                      </div>

                      {/* Inclusion Score Card */}
                      <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-2xl space-y-1 text-left">
                        <div className="flex items-center space-x-2">
                          <Users className="w-5 h-5 text-emerald-600" />
                          <span className="text-xs font-black text-slate-900">Inclusion Score</span>
                        </div>
                        <div className="text-lg font-black text-emerald-600">↑ +15%</div>
                        <div className="text-[11px] font-bold text-slate-400">25% → 40%</div>
                      </div>

                      {/* Employee Satisfaction Card */}
                      <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-2xl space-y-1 text-left">
                        <div className="flex items-center space-x-2">
                          <UserIcon className="w-5 h-5 text-amber-600" />
                          <span className="text-xs font-black text-slate-900">Employee Satisfaction</span>
                        </div>
                        <div className="text-lg font-black text-emerald-600">↑ +12%</div>
                        <div className="text-[11px] font-bold text-slate-400">65% → 77%</div>
                      </div>

                      {/* Brand Reputation Card */}
                      <div className="bg-rose-50/50 border border-rose-100 p-4 rounded-2xl col-span-2 sm:col-span-1 space-y-1 text-left">
                        <div className="flex items-center space-x-2">
                          <Star className="w-5 h-5 text-rose-600" />
                          <span className="text-xs font-black text-slate-900">Brand Reputation</span>
                        </div>
                        <div className="text-lg font-black text-emerald-600">↑ +10%</div>
                        <div className="text-[11px] font-bold text-slate-400">70% → 80%</div>
                      </div>

                    </div>
                  </div>

                  {/* Section 3: Detailed Impact Analysis & Right Panel */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* LEFT 8 COLUMNS: DETAILED IMPACT ANALYSIS & KEY LEARNING */}
                    <div className="lg:col-span-8 space-y-6">
                      
                      <div className="space-y-3">
                        <h3 className="text-base font-black text-slate-900">Detailed Impact Analysis</h3>
                        
                        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                          
                          {/* Vertical Tabs (4 Cols on md) */}
                          <div className="md:col-span-4 space-y-2">
                            <button
                              onClick={() => setImpactAnalysisTab('business')}
                              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-extrabold transition-all text-left cursor-pointer ${
                                impactAnalysisTab === 'business'
                                  ? 'bg-[#f4f0ff] text-[#5551ff] border border-purple-200 shadow-2xs'
                                  : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                              }`}
                            >
                              <BarChart3 className="w-4 h-4 shrink-0" />
                              <span>Business Performance</span>
                            </button>

                            <button
                              onClick={() => setImpactAnalysisTab('inclusion')}
                              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-extrabold transition-all text-left cursor-pointer ${
                                impactAnalysisTab === 'inclusion'
                                  ? 'bg-[#f4f0ff] text-[#5551ff] border border-purple-200 shadow-2xs'
                                  : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                              }`}
                            >
                              <Users className="w-4 h-4 shrink-0" />
                              <span>Employee Inclusion</span>
                            </button>

                            <button
                              onClick={() => setImpactAnalysisTab('talent')}
                              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-extrabold transition-all text-left cursor-pointer ${
                                impactAnalysisTab === 'talent'
                                  ? 'bg-[#f4f0ff] text-[#5551ff] border border-purple-200 shadow-2xs'
                                  : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                              }`}
                            >
                              <UserIcon className="w-4 h-4 shrink-0" />
                              <span>Talent & Retention</span>
                            </button>

                            <button
                              onClick={() => setImpactAnalysisTab('brand')}
                              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-extrabold transition-all text-left cursor-pointer ${
                                impactAnalysisTab === 'brand'
                                  ? 'bg-[#f4f0ff] text-[#5551ff] border border-purple-200 shadow-2xs'
                                  : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                              }`}
                            >
                              <Star className="w-4 h-4 shrink-0" />
                              <span>Brand Reputation</span>
                            </button>
                          </div>

                          {/* Right Tab Content Panel (8 Cols on md) */}
                          <div className="md:col-span-8 space-y-4">
                            
                            {/* Header with Title & Badge */}
                            <div className="flex items-center space-x-3">
                              <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#5551ff] flex items-center justify-center shrink-0">
                                <BarChart3 className="w-5 h-5 text-[#5551ff]" />
                              </div>
                              <h4 className="text-base font-black text-slate-900">
                                {IMPACT_ANALYSIS_DATA[impactAnalysisTab].title}
                              </h4>
                              <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-black border border-emerald-100">
                                {IMPACT_ANALYSIS_DATA[impactAnalysisTab].badge}
                              </span>
                            </div>

                            {/* Explanation Text */}
                            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                              {IMPACT_ANALYSIS_DATA[impactAnalysisTab].description}
                            </p>

                            {/* Before/After Bar Chart & Key Drivers Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center pt-2">
                              
                              {/* Visual Chart Box */}
                              <div className="sm:col-span-6 bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-end justify-center space-x-6 h-36 relative">
                                
                                {/* Column 1: Before */}
                                <div className="flex flex-col items-center space-y-1">
                                  <span className="text-xs font-black text-slate-700">
                                    {IMPACT_ANALYSIS_DATA[impactAnalysisTab].beforeValue}
                                  </span>
                                  <div className="w-12 h-16 bg-slate-300 rounded-t-xl" />
                                  <span className="text-[10px] font-bold text-slate-400 uppercase">Before</span>
                                </div>

                                {/* Curved Arrow with Increase Percent */}
                                <div className="flex flex-col items-center mb-6">
                                  <span className="text-xs font-black text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full shadow-2xs">
                                    {IMPACT_ANALYSIS_DATA[impactAnalysisTab].increasePercent}
                                  </span>
                                  <ArrowRight className="w-4 h-4 text-emerald-600 mt-0.5" />
                                </div>

                                {/* Column 2: After */}
                                <div className="flex flex-col items-center space-y-1">
                                  <span className="text-xs font-black text-[#5551ff]">
                                    {IMPACT_ANALYSIS_DATA[impactAnalysisTab].afterValue}
                                  </span>
                                  <div className="w-12 h-24 bg-[#5551ff] rounded-t-xl shadow-md" />
                                  <span className="text-[10px] font-black text-[#5551ff] uppercase">After</span>
                                </div>

                              </div>

                              {/* Key Drivers Box */}
                              <div className="sm:col-span-6 bg-[#f4f0ff] border border-purple-100 rounded-2xl p-4 space-y-2">
                                <div className="text-xs font-black text-[#5551ff]">Key Drivers</div>
                                <ul className="space-y-1.5 text-xs font-bold text-slate-700">
                                  {IMPACT_ANALYSIS_DATA[impactAnalysisTab].keyDrivers.map((driver, idx) => (
                                    <li key={idx} className="flex items-center space-x-2 text-slate-700">
                                      <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0" />
                                      <span>{driver}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                            </div>

                          </div>

                        </div>
                      </div>

                      {/* Bottom Key Learning & Primary CTA Bar */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
                        
                        <div className="w-full sm:w-auto flex-1 bg-[#f4f0ff] border border-purple-100 rounded-2xl p-4 flex items-start space-x-3.5">
                          <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#5551ff] flex items-center justify-center shrink-0 mt-0.5">
                            <Lightbulb className="w-5 h-5 text-[#5551ff]" />
                          </div>
                          <div className="space-y-0.5">
                            <div className="text-[10px] font-black text-[#5551ff] uppercase tracking-wider">Key Learning</div>
                            <p className="text-xs text-slate-600 font-medium leading-relaxed">
                              Investing in inclusive hiring not only improves diversity but also drives business growth by attracting high-quality talent and strengthening your company's reputation in the market.
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            if (currentRoundIndex < 10) {
                              setCurrentRoundIndex(prev => prev + 1);
                              setRoundStage('round2');
                            } else {
                              setActiveTab('results');
                            }
                          }}
                          className="w-full sm:w-auto px-8 py-4 bg-[#5551ff] hover:bg-indigo-600 text-white font-extrabold text-sm rounded-2xl shadow-md shadow-indigo-500/20 flex items-center justify-center space-x-2 cursor-pointer transition-all shrink-0"
                        >
                          <span>{currentRoundIndex >= 10 ? 'View Final Results' : `Proceed to Round ${currentRoundIndex + 1}`}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>

                      </div>

                    </div>

                    {/* RIGHT 4 COLUMNS: YOUR COMPANY, ROUND TIMELINE, WHAT'S NEXT */}
                    <div className="lg:col-span-4 space-y-6">
                      
                      {/* Card 1: Your Company */}
                      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-black text-slate-900">Your Company</h3>
                          <button className="text-xs font-bold text-[#5551ff] hover:underline cursor-pointer">
                            View Details
                          </button>
                        </div>

                        {/* Building Graphic */}
                        <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-2xs relative">
                          <img
                            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"
                            alt="InnovaTech Solutions Headquarters"
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3.5">
                            <span className="text-xs font-black text-white tracking-tight">
                              {companyNameInput || 'InnovaTech Solutions'}
                            </span>
                          </div>
                        </div>

                        {/* 4 Gauges Grid */}
                        <div className="grid grid-cols-2 gap-2.5 pt-1">
                          
                          <div className="bg-purple-50/50 border border-purple-100 p-3 rounded-2xl space-y-1">
                            <div className="flex items-center space-x-1.5">
                              <Coins className="w-4 h-4 text-[#5551ff]" />
                              <span className="text-xs font-black text-slate-900">1,000</span>
                            </div>
                            <div className="text-[9px] font-extrabold text-slate-400 leading-tight">Points</div>
                          </div>

                          <div className="bg-indigo-50/50 border border-indigo-100 p-3 rounded-2xl space-y-1">
                            <div className="flex items-center space-x-1.5">
                              <BarChart3 className="w-4 h-4 text-indigo-600" />
                              <span className="text-xs font-black text-slate-900">₹11.0M</span>
                            </div>
                            <div className="text-[9px] font-extrabold text-slate-400 leading-tight">Revenue</div>
                            <div className="text-[10px] font-extrabold text-emerald-600">↑ +10%</div>
                          </div>

                          <div className="bg-sky-50/50 border border-sky-100 p-3 rounded-2xl space-y-1">
                            <div className="flex items-center space-x-1.5">
                              <Users className="w-4 h-4 text-sky-600" />
                              <span className="text-xs font-black text-slate-900">40%</span>
                            </div>
                            <div className="text-[9px] font-extrabold text-slate-400 leading-tight">Employee Satisfaction</div>
                            <div className="text-[10px] font-extrabold text-emerald-600">↑ +15%</div>
                          </div>

                          <div className="bg-rose-50/50 border border-rose-100 p-3 rounded-2xl space-y-1">
                            <div className="flex items-center space-x-1.5">
                              <Star className="w-4 h-4 text-rose-600" />
                              <span className="text-xs font-black text-slate-900">80%</span>
                            </div>
                            <div className="text-[9px] font-extrabold text-slate-400 leading-tight">Brand Reputation</div>
                            <div className="text-[10px] font-extrabold text-emerald-600">↑ +10%</div>
                          </div>

                        </div>
                      </div>

                      {/* Card 2: Round Timeline */}
                      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-black text-slate-900">Round Timeline</h3>
                          <button className="text-xs font-bold text-[#5551ff] hover:underline cursor-pointer">
                            View All
                          </button>
                        </div>

                        <div className="space-y-4 relative pl-3 border-l-2 border-slate-100 ml-2">
                          
                          {/* Item 1 */}
                          <div className="relative space-y-0.5">
                            <div className="absolute -left-[19px] top-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-white flex items-center justify-center text-white">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                            <div className="flex items-center justify-between text-xs font-black text-slate-900">
                              <span>Event Result</span>
                              <span className="text-[10px] text-slate-400 font-bold">Just now</span>
                            </div>
                            <p className="text-[11px] text-slate-500 font-medium">Top talent shows interest in your company!</p>
                          </div>

                          {/* Item 2 */}
                          <div className="relative space-y-0.5">
                            <div className="absolute -left-[19px] top-1 w-3.5 h-3.5 rounded-full bg-[#5551ff] ring-4 ring-white text-white font-black text-[9px] flex items-center justify-center">
                              2
                            </div>
                            <div className="flex items-center justify-between text-xs font-black text-slate-900">
                              <span>Your Decision</span>
                              <span className="text-[10px] text-slate-400 font-bold">2 mins ago</span>
                            </div>
                            <p className="text-[11px] text-slate-500 font-medium">Invest in inclusive Hiring (-250 points)</p>
                          </div>

                          {/* Item 3 */}
                          <div className="relative space-y-0.5">
                            <div className="absolute -left-[19px] top-1 w-3.5 h-3.5 rounded-full bg-slate-300 ring-4 ring-white text-slate-700 font-black text-[9px] flex items-center justify-center">
                              1
                            </div>
                            <div className="flex items-center justify-between text-xs font-black text-slate-900">
                              <span>Round Started</span>
                              <span className="text-[10px] text-slate-400 font-bold">5 mins ago</span>
                            </div>
                            <p className="text-[11px] text-slate-500 font-medium">Market expansion scenario</p>
                          </div>

                        </div>
                      </div>

                      {/* Card 3: What's Next? Checkmarks */}
                      <div className="bg-[#f4f2ff] rounded-3xl p-6 border border-purple-100 shadow-xs space-y-3">
                        <div className="flex items-center space-x-2 text-xs font-black text-[#5551ff]">
                          <Target className="w-4 h-4 text-[#5551ff]" />
                          <span>What's Next?</span>
                        </div>

                        <div className="space-y-2 text-xs font-bold text-slate-700">
                          <div className="flex items-center space-x-2 text-slate-700">
                            <Check className="w-4 h-4 text-emerald-600 stroke-[3] shrink-0" />
                            <span>Proceed to Round 2</span>
                          </div>
                          <div className="flex items-center space-x-2 text-slate-700">
                            <Check className="w-4 h-4 text-emerald-600 stroke-[3] shrink-0" />
                            <span>Face a new scenario and make your next decision</span>
                          </div>
                          <div className="flex items-center space-x-2 text-slate-700">
                            <Check className="w-4 h-4 text-emerald-600 stroke-[3] shrink-0" />
                            <span>Manage your points strategically</span>
                          </div>
                          <div className="flex items-center space-x-2 text-slate-700">
                            <Check className="w-4 h-4 text-emerald-600 stroke-[3] shrink-0" />
                            <span>Build a more inclusive and successful company</span>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>
              ) : roundStage === 'outcome' ? (
                /* EVENT OUTCOME VIEW (MATCHES REFERENCE SCREENSHOT) */
                <div className="space-y-6">
                  
                  {/* Card 1: Event Hero Card */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                    
                    {/* Left Content */}
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center space-x-2.5 flex-wrap gap-y-1">
                        <span className="px-3 py-1 rounded-lg bg-amber-500 text-white text-[11px] font-black flex items-center space-x-1.5 shadow-2xs">
                          <Layers className="w-3.5 h-3.5 text-white" />
                          <span>EVENT</span>
                        </span>
                        <span className="px-3 py-1 rounded-lg bg-amber-100 text-amber-900 text-[11px] font-black border border-amber-200/60">
                          Unexpected Opportunity
                        </span>
                      </div>

                      <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                        Top Talent Shows Interest in Your Company!
                      </h2>
                      
                      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-2xl">
                        Your recent inclusive hiring initiative has attracted attention in the industry. A group of highly skilled professionals from underrepresented backgrounds is interested in joining your company.
                      </p>
                    </div>

                    {/* Right Graphic Card */}
                    <div className="w-full md:w-80 h-48 rounded-2xl overflow-hidden border border-slate-100 shrink-0 shadow-2xs relative group">
                      <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
                        alt="Top Talent Interest"
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent flex items-end p-3.5">
                        <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/60 text-[10px] font-black text-[#5551ff] tracking-wider uppercase">
                          GREAT TALENT • GREAT IMPACT
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Main Grid: 8 Cols Left (Impact Summary & Callout) | 4 Cols Right (Your Company & Timeline) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* LEFT 8 COLUMNS */}
                    <div className="lg:col-span-8 space-y-6">
                      
                      {/* Results & Key Impacts Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch">
                        
                        {/* Green Gained Points Card */}
                        <div className="sm:col-span-5 bg-emerald-50/80 border border-emerald-200/80 rounded-3xl p-5 flex flex-col justify-center space-y-2 text-left">
                          <div className="flex items-center space-x-2 text-emerald-700 font-extrabold text-xs">
                            <Star className="w-4 h-4 text-emerald-600 fill-emerald-500" />
                            <span>You gained</span>
                          </div>
                          <div className="text-3xl sm:text-4xl font-black text-emerald-600 tracking-tight">
                            +150 Points
                          </div>
                          <p className="text-[11px] font-extrabold text-emerald-700/80 leading-snug">
                            for attracting diverse talent to your organization.
                          </p>
                        </div>

                        {/* 4 Key Impacts Cards Grid */}
                        <div className="sm:col-span-7 space-y-2">
                          <div className="text-xs font-black text-slate-900 mb-1">Key Impacts</div>
                          <div className="grid grid-cols-2 gap-2.5">
                            
                            {/* Business Performance */}
                            <div className="bg-purple-50/50 border border-purple-100 p-3 rounded-2xl text-center space-y-1">
                              <div className="w-6 h-6 rounded-lg bg-purple-100 text-[#5551ff] flex items-center justify-center mx-auto">
                                <BarChart3 className="w-3.5 h-3.5" />
                              </div>
                              <div className="text-[10px] font-bold text-slate-500 leading-tight">Business Performance</div>
                              <div className="text-sm font-black text-emerald-600">↑ +10%</div>
                            </div>

                            {/* Employee Inclusion */}
                            <div className="bg-sky-50/50 border border-sky-100 p-3 rounded-2xl text-center space-y-1">
                              <div className="w-6 h-6 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center mx-auto">
                                <Users className="w-3.5 h-3.5" />
                              </div>
                              <div className="text-[10px] font-bold text-slate-500 leading-tight">Employee Inclusion</div>
                              <div className="text-sm font-black text-emerald-600">↑ +15%</div>
                            </div>

                            {/* Talent Retention */}
                            <div className="bg-amber-50/50 border border-amber-100 p-3 rounded-2xl text-center space-y-1">
                              <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                                <UserIcon className="w-3.5 h-3.5" />
                              </div>
                              <div className="text-[10px] font-bold text-slate-500 leading-tight">Talent Retention</div>
                              <div className="text-sm font-black text-emerald-600">↑ +12%</div>
                            </div>

                            {/* Brand Reputation */}
                            <div className="bg-rose-50/50 border border-rose-100 p-3 rounded-2xl text-center space-y-1">
                              <div className="w-6 h-6 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                                <Star className="w-3.5 h-3.5" />
                              </div>
                              <div className="text-[10px] font-bold text-slate-500 leading-tight">Brand Reputation</div>
                              <div className="text-sm font-black text-emerald-600">↑ +10%</div>
                            </div>

                          </div>
                        </div>

                      </div>

                      {/* What this means Callout Box */}
                      <div className="p-5 rounded-3xl bg-[#f4f0ff] border border-purple-100 flex items-start space-x-4">
                        <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#5551ff] flex items-center justify-center shrink-0 mt-0.5">
                          <Lightbulb className="w-5 h-5 text-[#5551ff]" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-black text-[#5551ff]">What this means</h4>
                          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                            Your commitment to inclusive hiring is creating a positive reputation in the market. You now have access to a larger and more diverse talent pool, which can help drive innovation and long-term growth.
                          </p>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="flex justify-end pt-2">
                        <button
                          onClick={() => {
                            setRoundStage('consequence');
                          }}
                          className="w-full sm:w-auto px-8 py-3.5 bg-[#5551ff] hover:bg-indigo-600 text-white font-extrabold text-sm rounded-2xl shadow-md shadow-indigo-500/20 flex items-center justify-center space-x-2 cursor-pointer transition-all shrink-0"
                        >
                          <span>Continue to Next Stage</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>

                    </div>

                    {/* RIGHT 4 COLUMNS: YOUR COMPANY & RECENT EVENTS TIMELINE */}
                    <div className="lg:col-span-4 space-y-6">
                      
                      {/* Card 1: Your Company */}
                      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-black text-slate-900">Your Company</h3>
                          <button className="text-xs font-bold text-[#5551ff] hover:underline cursor-pointer">
                            View Details
                          </button>
                        </div>

                        {/* Building Graphic */}
                        <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-2xs relative">
                          <img
                            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"
                            alt="InnovaTech Solutions Headquarters"
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3.5">
                            <span className="text-xs font-black text-white tracking-tight">
                              {companyNameInput || 'InnovaTech Solutions'}
                            </span>
                          </div>
                        </div>

                        {/* 4 Metrics Grid (2x2) */}
                        <div className="grid grid-cols-2 gap-2.5 pt-1">
                          
                          <div className="bg-purple-50/50 border border-purple-100 p-3 rounded-2xl space-y-1">
                            <div className="flex items-center space-x-1.5">
                              <Coins className="w-4 h-4 text-[#5551ff]" />
                              <span className="text-xs font-black text-slate-900">850</span>
                            </div>
                            <div className="text-[9px] font-extrabold text-slate-400 leading-tight">Points Remaining</div>
                            <div className="text-[10px] font-extrabold text-emerald-600">↑ +150</div>
                          </div>

                          <div className="bg-indigo-50/50 border border-indigo-100 p-3 rounded-2xl space-y-1">
                            <div className="flex items-center space-x-1.5">
                              <BarChart3 className="w-4 h-4 text-indigo-600" />
                              <span className="text-xs font-black text-slate-900">10%</span>
                            </div>
                            <div className="text-[9px] font-extrabold text-slate-400 leading-tight">Revenue Growth</div>
                            <div className="text-[10px] font-extrabold text-emerald-600">↑ +10%</div>
                          </div>

                          <div className="bg-sky-50/50 border border-sky-100 p-3 rounded-2xl space-y-1">
                            <div className="flex items-center space-x-1.5">
                              <Users className="w-4 h-4 text-sky-600" />
                              <span className="text-xs font-black text-slate-900">25%</span>
                            </div>
                            <div className="text-[9px] font-extrabold text-slate-400 leading-tight">Inclusion Score</div>
                            <div className="text-[10px] font-extrabold text-emerald-600">↑ +15%</div>
                          </div>

                          <div className="bg-rose-50/50 border border-rose-100 p-3 rounded-2xl space-y-1">
                            <div className="flex items-center space-x-1.5">
                              <Star className="w-4 h-4 text-rose-600" />
                              <span className="text-xs font-black text-slate-900">70%</span>
                            </div>
                            <div className="text-[9px] font-extrabold text-slate-400 leading-tight">Brand Reputation</div>
                            <div className="text-[10px] font-extrabold text-emerald-600">↑ +10%</div>
                          </div>

                        </div>
                      </div>

                      {/* Card 2: Recent Events Timeline */}
                      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-black text-slate-900">Recent Events</h3>
                          <button className="text-xs font-bold text-[#5551ff] hover:underline cursor-pointer">
                            View All
                          </button>
                        </div>

                        <div className="space-y-4 relative pl-3 border-l-2 border-slate-100 ml-2">
                          
                          {/* Event 1 */}
                          <div className="relative space-y-1">
                            <div className="absolute -left-[19px] top-1 w-3 h-3 rounded-full bg-amber-500 ring-4 ring-white" />
                            <div className="flex items-center justify-between">
                              <div className="text-xs font-black text-slate-900">Top Talent Shows Interest!</div>
                              <span className="text-[10px] font-extrabold text-emerald-600">+150 Points</span>
                            </div>
                            <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold">
                              <span>Round 1 • Unexpected Opportunity</span>
                              <span>2 mins ago</span>
                            </div>
                          </div>

                          {/* Event 2 */}
                          <div className="relative space-y-1">
                            <div className="absolute -left-[19px] top-1 w-3 h-3 rounded-full bg-[#5551ff] ring-4 ring-white" />
                            <div className="flex items-center justify-between">
                              <div className="text-xs font-black text-slate-900">Invested in Inclusive Hiring</div>
                              <span className="text-[10px] font-extrabold text-rose-600">-250 Points</span>
                            </div>
                            <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold">
                              <span>Round 1 • Your Decision</span>
                              <span>5 mins ago</span>
                            </div>
                          </div>

                          {/* Event 3 */}
                          <div className="relative space-y-1">
                            <div className="absolute -left-[19px] top-1 w-3 h-3 rounded-full bg-slate-300 ring-4 ring-white" />
                            <div className="text-xs font-black text-slate-900">Game Started</div>
                            <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold">
                              <span>Round 1</span>
                              <span>10 mins ago</span>
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* Card 3: What's Next? */}
                      <div className="bg-[#f4f2ff] rounded-3xl p-6 border border-purple-100 shadow-xs space-y-2">
                        <div className="flex items-center space-x-2 text-xs font-black text-[#5551ff]">
                          <Target className="w-4 h-4 text-[#5551ff]" />
                          <span>What's Next?</span>
                        </div>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">
                          Continue to see how this event impacts your company and prepare for the next round.
                        </p>
                      </div>

                    </div>

                  </div>

                </div>
              ) : (
                /* DECISION VIEW STAGE */
                <div className="space-y-6">
                  {/* Card 1: Scenario Header Card */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
                    
                    {/* Left Description Content */}
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 text-[11px] font-extrabold">
                          <Video className="w-3.5 h-3.5 text-rose-600" />
                          <span>Scenario</span>
                        </span>
                        <span className="inline-block px-3 py-1 rounded-lg bg-[#f3e8ff] text-[#5551ff] text-[11px] font-extrabold">
                          Round 1
                        </span>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                        Expanding to a New Market
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                        Your company is planning to expand into a new international market. To succeed, you need a skilled and innovative team, but there are concerns about diversity and inclusion in the new region. The decision you make now will impact your company's growth, employee satisfaction, and brand reputation.
                      </p>
                    </div>

                    {/* Right Corporate Team Illustration */}
                    <div className="w-full md:w-80 h-44 rounded-2xl overflow-hidden border border-slate-100 shrink-0 shadow-2xs">
                      <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
                        alt="Expanding to a New Market"
                        className="w-full h-full object-cover"
                      />
                    </div>

                  </div>

              {/* Main Decision Grid: 8 Cols Left (4 Decision Cards) | 4 Cols Right (Company Summary & Metrics) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* LEFT 8 COLUMNS: DECISION OPTIONS & ACTION BAR */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Section Title */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-black text-slate-900">What will you do?</h3>
                    <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                      Select one option to proceed
                    </span>
                  </div>

                  {/* 4 Decision Cards Grid (2 Cols x 2 Rows) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Option 1: Invest in Inclusive Hiring */}
                    <div
                      onClick={() => {
                        setSelectedDecisionId('hiring');
                        setShowDecisionModal(true);
                      }}
                      className={`p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                        selectedDecisionId === 'hiring'
                          ? 'bg-[#f4f0ff] border-[#5551ff] shadow-xs ring-2 ring-[#5551ff]/20'
                          : 'bg-white border-slate-200/80 hover:border-slate-300'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                              selectedDecisionId === 'hiring' ? 'border-[#5551ff] bg-[#5551ff]' : 'border-slate-300 bg-white'
                            }`}>
                              {selectedDecisionId === 'hiring' && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>
                            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#5551ff] flex items-center justify-center">
                              <Users className="w-5 h-5 text-[#5551ff]" />
                            </div>
                          </div>
                          <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 text-[11px] font-black border border-rose-100">
                            - 250 Points
                          </span>
                        </div>

                        <div>
                          <h4 className="text-xs sm:text-sm font-black text-slate-900">Invest in Inclusive Hiring</h4>
                          <p className="text-xs text-slate-500 font-medium leading-snug mt-1">
                            Launch a targeted inclusive hiring program to build a diverse team in the new market.
                          </p>
                        </div>
                      </div>

                      {/* Impact Metrics List */}
                      <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1 text-xs font-extrabold text-emerald-700">
                        <div>↑ + Employee Inclusion</div>
                        <div>↑ + Talent Retention</div>
                        <div>↑ + Long-term Growth</div>
                      </div>
                    </div>

                    {/* Option 2: Focus on Marketing */}
                    <div
                      onClick={() => {
                        setSelectedDecisionId('marketing');
                        setShowDecisionModal(true);
                      }}
                      className={`p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                        selectedDecisionId === 'marketing'
                          ? 'bg-[#f4f0ff] border-[#5551ff] shadow-xs ring-2 ring-[#5551ff]/20'
                          : 'bg-white border-slate-200/80 hover:border-slate-300'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                              selectedDecisionId === 'marketing' ? 'border-[#5551ff] bg-[#5551ff]' : 'border-slate-300 bg-white'
                            }`}>
                              {selectedDecisionId === 'marketing' && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>
                            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
                              <Megaphone className="w-5 h-5 text-amber-600" />
                            </div>
                          </div>
                          <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 text-[11px] font-black border border-rose-100">
                            - 200 Points
                          </span>
                        </div>

                        <div>
                          <h4 className="text-xs sm:text-sm font-black text-slate-900">Focus on Marketing</h4>
                          <p className="text-xs text-slate-500 font-medium leading-snug mt-1">
                            Invest more in marketing to quickly establish brand presence.
                          </p>
                        </div>
                      </div>

                      {/* Impact Metrics List */}
                      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs font-extrabold">
                        <div className="text-emerald-700">↑ - Short-term Revenue</div>
                        <div className="text-rose-600">↓ - Inclusion Impact</div>
                        <div className="text-rose-600">↓ - Employee Satisfaction</div>
                      </div>
                    </div>

                    {/* Option 3: Partner with Local Firms */}
                    <div
                      onClick={() => {
                        setSelectedDecisionId('partner');
                        setShowDecisionModal(true);
                      }}
                      className={`p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                        selectedDecisionId === 'partner'
                          ? 'bg-[#f4f0ff] border-[#5551ff] shadow-xs ring-2 ring-[#5551ff]/20'
                          : 'bg-white border-slate-200/80 hover:border-slate-300'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                              selectedDecisionId === 'partner' ? 'border-[#5551ff] bg-[#5551ff]' : 'border-slate-300 bg-white'
                            }`}>
                              {selectedDecisionId === 'partner' && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>
                            <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center">
                              <Handshake className="w-5 h-5 text-sky-600" />
                            </div>
                          </div>
                          <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 text-[11px] font-black border border-rose-100">
                            - 150 Points
                          </span>
                        </div>

                        <div>
                          <h4 className="text-xs sm:text-sm font-black text-slate-900">Partner with Local Firms</h4>
                          <p className="text-xs text-slate-500 font-medium leading-snug mt-1">
                            Collaborate with local companies to enter the market faster.
                          </p>
                        </div>
                      </div>

                      {/* Impact Metrics List */}
                      <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1 text-xs font-extrabold text-emerald-700">
                        <div>↑ - Faster Market Entry</div>
                        <div>↑ - Revenue Growth</div>
                        <div className="text-slate-500">→ - Limited Inclusion Impact</div>
                      </div>
                    </div>

                    {/* Option 4: Take a Cost-Cutting Approach */}
                    <div
                      onClick={() => {
                        setSelectedDecisionId('cost_cutting');
                        setShowDecisionModal(true);
                      }}
                      className={`p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                        selectedDecisionId === 'cost_cutting'
                          ? 'bg-[#f4f0ff] border-[#5551ff] shadow-xs ring-2 ring-[#5551ff]/20'
                          : 'bg-white border-slate-200/80 hover:border-slate-300'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                              selectedDecisionId === 'cost_cutting' ? 'border-[#5551ff] bg-[#5551ff]' : 'border-slate-300 bg-white'
                            }`}>
                              {selectedDecisionId === 'cost_cutting' && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>
                            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
                              <Coins className="w-5 h-5 text-amber-600" />
                            </div>
                          </div>
                          <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 text-[11px] font-black border border-rose-100">
                            - 100 Points
                          </span>
                        </div>

                        <div>
                          <h4 className="text-xs sm:text-sm font-black text-slate-900">Take a Cost-Cutting Approach</h4>
                          <p className="text-xs text-slate-500 font-medium leading-snug mt-1">
                            Minimize expenses and use existing team with minimal local hiring.
                          </p>
                        </div>
                      </div>

                      {/* Impact Metrics List */}
                      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs font-extrabold">
                        <div className="text-emerald-700">↑ - Short-term Savings</div>
                        <div className="text-rose-600">↓ - Employee Morale</div>
                        <div className="text-rose-600">↓ - Brand Reputation</div>
                      </div>
                    </div>

                  </div>

                  {/* Bottom Action Controls Bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <div className="w-full sm:w-auto flex-1 bg-[#f4f2ff] border border-purple-100 rounded-2xl px-5 py-3.5 flex items-center space-x-2 text-xs font-bold text-slate-700">
                      <Lightbulb className="w-4 h-4 text-[#5551ff] shrink-0" />
                      <span>Think about both short-term gains and long-term impact on your people and business.</span>
                    </div>

                    <button
                      onClick={() => setShowDecisionModal(true)}
                      className="w-full sm:w-auto px-8 py-3.5 bg-[#5551ff] hover:bg-indigo-600 text-white font-extrabold text-sm rounded-2xl shadow-md shadow-indigo-500/20 flex items-center justify-center space-x-2 cursor-pointer transition-all shrink-0"
                    >
                      <span>Confirm Decision</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>

                {/* RIGHT 4 COLUMNS: YOUR COMPANY, METRICS, EVENTS, OBJECTIVES */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Card 1: Your Company Summary & Gauges */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black text-slate-900">Your Company</h3>
                      <button
                        onClick={() => setGameStep('setup')}
                        className="text-xs font-bold text-[#5551ff] hover:underline flex items-center space-x-1 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                    </div>

                    {/* Building Image */}
                    <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-2xs relative">
                      <img
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"
                        alt="InnovaTech Solutions Headquarters"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3.5">
                        <span className="text-xs font-black text-white tracking-tight">
                          {companyNameInput || 'InnovaTech Solutions'}
                        </span>
                      </div>
                    </div>

                    {/* 3 Metric Gauges Grid */}
                    <div className="grid grid-cols-3 gap-2 text-center pt-1">
                      
                      <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-2xl space-y-1">
                        <div className="w-7 h-7 rounded-lg bg-purple-100 text-[#5551ff] flex items-center justify-center mx-auto">
                          <Coins className="w-4 h-4" />
                        </div>
                        <div className="text-sm font-black text-slate-900 leading-none">1,000</div>
                        <div className="text-[9px] font-bold text-slate-400">Points Remaining</div>
                      </div>

                      <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-2xl space-y-1">
                        <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
                          <BarChart3 className="w-4 h-4" />
                        </div>
                        <div className="text-sm font-black text-slate-900 leading-none">0</div>
                        <div className="text-[9px] font-bold text-slate-400">Total Revenue</div>
                      </div>

                      <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-2xl space-y-1">
                        <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                          <Users className="w-4 h-4" />
                        </div>
                        <div className="text-sm font-black text-slate-900 leading-none">0</div>
                        <div className="text-[9px] font-bold text-slate-400">Inclusion Score</div>
                      </div>

                    </div>
                  </div>

                  {/* Card 2: Key Metrics (Current) */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black text-slate-900">Key Metrics (Current)</h3>
                      <button className="text-xs font-bold text-[#5551ff] hover:underline cursor-pointer">
                        View Details
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      
                      {/* Revenue */}
                      <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl space-y-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                            <BarChart3 className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-500">Revenue</span>
                        </div>
                        <div className="text-sm font-black text-slate-900 leading-tight">0</div>
                        <div className="text-[10px] font-bold text-emerald-600">+0%</div>
                      </div>

                      {/* Inclusion Score */}
                      <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl space-y-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                            <Shield className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-500">Inclusion Score</span>
                        </div>
                        <div className="text-sm font-black text-slate-900 leading-tight">0</div>
                        <div className="text-[10px] font-bold text-emerald-600">+0%</div>
                      </div>

                      {/* Employee Satisfaction */}
                      <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl space-y-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-lg bg-purple-100 text-[#5551ff] flex items-center justify-center shrink-0">
                            <Users className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-500">Employee Satisfaction</span>
                        </div>
                        <div className="text-sm font-black text-slate-900 leading-tight">0</div>
                        <div className="text-[10px] font-bold text-emerald-600">+0%</div>
                      </div>

                      {/* Brand Reputation */}
                      <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl space-y-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                            <Star className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-500">Brand Reputation</span>
                        </div>
                        <div className="text-sm font-black text-slate-900 leading-tight">0</div>
                        <div className="text-[10px] font-bold text-emerald-600">+0%</div>
                      </div>

                    </div>
                  </div>

                  {/* Card 3: Recent Events */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black text-slate-900">Recent Events</h3>
                      <button className="text-xs font-bold text-[#5551ff] hover:underline cursor-pointer">
                        View All
                      </button>
                    </div>

                    <div className="py-6 text-center space-y-2 bg-slate-50 rounded-2xl border border-slate-100/80 p-4">
                      <Hourglass className="w-8 h-8 text-slate-400 mx-auto" />
                      <div className="text-xs font-black text-slate-900">No events yet</div>
                      <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                        Events and news will appear as you progress through the game.
                      </p>
                    </div>
                  </div>

                  {/* Card 4: Round Objectives */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-xl bg-purple-100 text-[#5551ff] flex items-center justify-center">
                        <Target className="w-4 h-4 text-[#5551ff]" />
                      </div>
                      <h3 className="text-sm font-black text-slate-900">Round Objectives</h3>
                    </div>

                    <div className="space-y-2.5 text-xs font-bold text-slate-700">
                      <div className="flex items-center space-x-2.5 text-emerald-700">
                        <Check className="w-4 h-4 text-emerald-600 stroke-[3] shrink-0" />
                        <span>Analyze the market expansion opportunity</span>
                      </div>
                      <div className="flex items-center space-x-2.5 text-emerald-700">
                        <Check className="w-4 h-4 text-emerald-600 stroke-[3] shrink-0" />
                        <span>Consider diversity and inclusion impact</span>
                      </div>
                      <div className="flex items-center space-x-2.5 text-emerald-700">
                        <Check className="w-4 h-4 text-emerald-600 stroke-[3] shrink-0" />
                        <span>Make a strategic decision</span>
                      </div>
                      <div className="flex items-center space-x-2.5 text-emerald-700">
                        <Check className="w-4 h-4 text-emerald-600 stroke-[3] shrink-0" />
                        <span>See the consequences of your choice</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          </div>
        )}

          {/* INVESTMENT DECISION DETAILS MODAL OVERLAY (Matches Reference Screenshot media__1791312308696) */}
          {showDecisionModal && activeTab === 'game' && gameStep === 'round' && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-slate-100 my-auto animate-fadeIn">
                
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-slate-100">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Investment Decision Details
                  </h2>
                  <button
                    onClick={() => setShowDecisionModal(false)}
                    className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-all cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Body: 2 Columns */}
                <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 max-h-[78vh] overflow-y-auto">
                  
                  {/* LEFT COLUMN: 7 COLUMNS */}
                  <div className="lg:col-span-7 space-y-5">
                    
                    {/* Option Icon, Title, and Badge */}
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-2xl bg-sky-100 text-[#5551ff] flex items-center justify-center shrink-0 shadow-xs">
                        <Users className="w-6 h-6 text-[#5551ff]" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2.5 flex-wrap gap-y-1">
                          <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                            {currentDecision.title}
                          </h3>
                          {currentDecision.recommended && (
                            <span className="px-2.5 py-0.5 rounded-lg bg-[#f4f0ff] border border-purple-200 text-[#5551ff] text-[11px] font-extrabold">
                              Recommended
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                          {currentDecision.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Banner Graphic Card with DIVERSE TALENT STRONGER BUSINESS text */}
                    <div className="w-full h-48 sm:h-52 rounded-2xl overflow-hidden border border-slate-100 relative shadow-2xs group">
                      <img
                        src={currentDecision.image}
                        alt={currentDecision.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/20 to-transparent flex items-center justify-center p-6">
                        <div className="bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/60 text-center shadow-lg transform -rotate-1">
                          <div className="text-xs sm:text-sm font-black text-[#5551ff] tracking-widest uppercase">
                            DIVERSE TALENT
                          </div>
                          <div className="text-sm sm:text-base font-black text-slate-900 tracking-wider">
                            STRONGER BUSINESS
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Description */}
                    <div className="space-y-1.5">
                      <h4 className="text-xs sm:text-sm font-black text-slate-900">Detailed Description</h4>
                      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                        {currentDecision.detailedDescription}
                      </p>
                    </div>

                    {/* Why This Matters Box */}
                    <div className="p-4 rounded-2xl bg-[#f4f0ff] border border-purple-100 flex items-start space-x-3.5">
                      <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#5551ff] flex items-center justify-center shrink-0 mt-0.5">
                        <Lightbulb className="w-5 h-5 text-[#5551ff]" />
                      </div>
                      <div className="space-y-0.5">
                        <h5 className="text-xs sm:text-sm font-black text-[#5551ff]">Why This Matters?</h5>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">
                          {currentDecision.whyItMatters}
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* RIGHT COLUMN: 5 COLUMNS */}
                  <div className="lg:col-span-5 space-y-6">
                    
                    {/* Cost Card */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/70 border border-rose-100 flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                        <Coins className="w-5 h-5 text-rose-600" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Cost</span>
                        <div className="text-2xl sm:text-3xl font-black text-rose-600 tracking-tight">
                          - {currentDecision.cost} Points
                        </div>
                        <p className="text-[11px] font-bold text-slate-400">
                          This will be deducted from your available points.
                        </p>
                      </div>
                    </div>

                    {/* Expected Impact List */}
                    <div className="space-y-3">
                      <h4 className="text-xs sm:text-sm font-black text-slate-900">Expected Impact</h4>
                      <div className="space-y-2 text-xs font-bold">
                        {currentDecision.impacts.map((imp, idx) => {
                          let badgeStyle = 'bg-emerald-50 text-emerald-700 border-emerald-100';
                          let icon = <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />;
                          if (imp.type === 'slight-down' || imp.type === 'mod-down') {
                            badgeStyle = 'bg-rose-50 text-rose-600 border-rose-100';
                            icon = <TrendingDown className="w-3.5 h-3.5 text-rose-600" />;
                          }
                          return (
                            <div key={idx} className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all">
                              <div className="flex items-center space-x-2 text-slate-700 font-extrabold">
                                <div className="w-5 h-5 rounded-md flex items-center justify-center">
                                  {icon}
                                </div>
                                <span>{imp.label}</span>
                              </div>
                              <span className={`px-2.5 py-1 rounded-lg border text-[11px] font-black ${badgeStyle}`}>
                                {imp.change}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Risk & Trade-offs Card */}
                    <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-100 space-y-2.5">
                      <div className="flex items-center space-x-2 text-xs font-black text-amber-900">
                        <div className="w-6 h-6 rounded-lg bg-amber-200/80 flex items-center justify-center text-amber-700">
                          <AlertTriangle className="w-3.5 h-3.5" />
                        </div>
                        <span>Risk & Trade-offs</span>
                      </div>
                      <ul className="space-y-1 text-xs font-medium text-amber-950 pl-1">
                        {currentDecision.risks.map((risk, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-amber-600">•</span>
                            <span>{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                </div>

                {/* Modal Footer Controls */}
                <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-t border-slate-100 bg-slate-50/50">
                  <button
                    onClick={() => setShowDecisionModal(false)}
                    className="px-6 py-3 rounded-2xl border border-slate-200 text-slate-700 font-extrabold text-xs sm:text-sm bg-white hover:bg-slate-100 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => {
                      setShowDecisionModal(false);
                      setRoundStage('outcome');
                    }}
                    className="px-6 py-3 rounded-2xl bg-[#5551ff] hover:bg-indigo-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-indigo-500/20 flex items-center space-x-2 transition-all cursor-pointer"
                  >
                    <span>Confirm This Decision</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* FINAL RESULTS & LEARNING SUMMARY DASHBOARD (MATCHES BRD & REFERENCE SCREENSHOT media__1791318000000) */}
          {activeTab === 'results' && (
            <div className="space-y-6 animate-fadeIn pb-12">
              
              {/* Main 2-Column Layout Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* LEFT COLUMN (8 Columns): Completion Hero, Performance KPIs, Score Breakdown, Dual Charts, Learning Summary */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Card 1: Completion Hero Banner */}
                  <div className="bg-gradient-to-r from-indigo-900/5 via-purple-500/5 to-amber-500/5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
                    
                    {/* Confetti Decorative Background Shapes */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-400/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

                    {/* Avatar Artwork Left */}
                    <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shrink-0 border-2 border-purple-200 shadow-md relative bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center">
                      <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
                        alt="Celebrating Player Avatar"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 right-1 bg-amber-400 text-amber-950 p-1 rounded-full text-xs font-black shadow-sm">
                        🎉
                      </div>
                    </div>

                    {/* Middle Text Content */}
                    <div className="space-y-2 flex-1 text-center sm:text-left">
                      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100/80 text-amber-800 text-[11px] font-black border border-amber-200">
                        <span>🎉</span>
                        <span className="uppercase tracking-wider">Congratulations, {playerName.split(' ')[0] || 'Priya'}!</span>
                      </div>

                      <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                        You have successfully completed the Inclusive Tycoon game!
                      </h2>
                      
                      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-xl">
                        You navigated 10 challenging rounds, made strategic decisions, and built a more inclusive and successful company.
                      </p>
                    </div>

                    {/* Golden Trophy Graphic Right */}
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-b from-amber-50 to-amber-100 border border-amber-200 flex flex-col items-center justify-center shrink-0 shadow-sm relative group overflow-hidden">
                      <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-amber-500 fill-amber-400 drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-[10px] font-black text-amber-900 uppercase tracking-widest mt-1">10/10 Rounds</span>
                    </div>

                  </div>

                  {/* Section 2: Performance KPIs (4 Cards Row) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    
                    {/* Final Score */}
                    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex items-center space-x-3.5">
                      <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                        <Trophy className="w-5 h-5 text-amber-600 fill-amber-500" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Final Score</div>
                        <div className="text-lg sm:text-xl font-black text-[#5551ff] tracking-tight">1,620 <span className="text-xs font-normal text-slate-400">/ 2,000</span></div>
                      </div>
                    </div>

                    {/* Your Rank */}
                    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex items-center space-x-3.5">
                      <div className="w-11 h-11 rounded-2xl bg-purple-100 text-[#5551ff] flex items-center justify-center shrink-0">
                        <BarChart3 className="w-5 h-5 text-[#5551ff]" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Your Rank</div>
                        <div className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">#2 <span className="text-[10px] font-normal text-slate-400">out of 24</span></div>
                      </div>
                    </div>

                    {/* Rounds Completed */}
                    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex items-center space-x-3.5">
                      <div className="w-11 h-11 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                        <Flag className="w-5 h-5 text-sky-600 fill-sky-600/20" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Rounds Completed</div>
                        <div className="flex items-center space-x-1.5">
                          <span className="text-lg sm:text-xl font-black text-slate-900">10 / 10</span>
                          <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[9px] font-black">100%</span>
                        </div>
                      </div>
                    </div>

                    {/* Total Decisions */}
                    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex items-center space-x-3.5">
                      <div className="w-11 h-11 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                        <Target className="w-5 h-5 text-rose-600" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Total Decisions</div>
                        <div className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">10 <span className="text-[10px] font-normal text-slate-400">strategic</span></div>
                      </div>
                    </div>

                  </div>

                  {/* Section 3: Score Breakdown (4 Category Cards with Progress Bars) */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm sm:text-base font-black text-slate-900">Score Breakdown</h3>
                      <Info className="w-4 h-4 text-slate-400 cursor-pointer" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      
                      {/* Business Performance */}
                      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2.5">
                            <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#5551ff] flex items-center justify-center">
                              <BarChart3 className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-black text-slate-900">Business Performance</span>
                          </div>
                        </div>
                        <div className="flex items-baseline justify-between">
                          <span className="text-lg font-black text-slate-900">420 <span className="text-xs font-normal text-slate-400">/ 500</span></span>
                          <span className="text-xs font-black text-[#5551ff]">84%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full bg-[#5551ff] rounded-full transition-all duration-500" style={{ width: '84%' }} />
                        </div>
                      </div>

                      {/* Inclusion Impact */}
                      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2.5">
                            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                              <Users className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-black text-slate-900">Inclusion Impact</span>
                          </div>
                        </div>
                        <div className="flex items-baseline justify-between">
                          <span className="text-lg font-black text-slate-900">360 <span className="text-xs font-normal text-slate-400">/ 500</span></span>
                          <span className="text-xs font-black text-emerald-600">72%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: '72%' }} />
                        </div>
                      </div>

                      {/* Talent & Retention */}
                      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2.5">
                            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                              <UserIcon className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-black text-slate-900">Talent & Retention</span>
                          </div>
                        </div>
                        <div className="flex items-baseline justify-between">
                          <span className="text-lg font-black text-slate-900">460 <span className="text-xs font-normal text-slate-400">/ 500</span></span>
                          <span className="text-xs font-black text-amber-600">92%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full transition-all duration-500" style={{ width: '92%' }} />
                        </div>
                      </div>

                      {/* Brand Reputation */}
                      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2.5">
                            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                              <Star className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-black text-slate-900">Brand Reputation</span>
                          </div>
                        </div>
                        <div className="flex items-baseline justify-between">
                          <span className="text-lg font-black text-slate-900">380 <span className="text-xs font-normal text-slate-400">/ 500</span></span>
                          <span className="text-xs font-black text-rose-600">76%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full bg-rose-500 rounded-full transition-all duration-500" style={{ width: '76%' }} />
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Section 4: Dual Chart Row (Learning Progress & Round-by-Round Performance) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Chart 1: Learning Progress (Pre-Game vs Post-Game Quiz) */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs sm:text-sm font-black text-slate-900 flex items-center space-x-2">
                          <Sparkles className="w-4 h-4 text-[#5551ff]" />
                          <span>Learning Progress</span>
                        </h4>
                        <div className="flex items-center space-x-3 text-[10px] font-bold">
                          <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-300 inline-block" /><span className="text-slate-600">Pre-Game Quiz</span></span>
                          <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#5551ff] inline-block" /><span className="text-slate-900 font-extrabold">Post-Game Quiz</span></span>
                        </div>
                      </div>

                      {/* Bar Chart Graphics */}
                      <div className="grid grid-cols-4 gap-2 items-end h-48 pt-4 text-center border-b border-slate-100 pb-2">
                        
                        {/* Pillar 1: Inclusion Fundamentals */}
                        <div className="flex flex-col items-center h-full justify-end space-y-1">
                          <div className="flex items-end space-x-1 h-36">
                            <div className="w-3.5 sm:w-4 bg-purple-200 rounded-t-sm flex flex-col justify-start items-center pt-1" style={{ height: '60%' }}>
                              <span className="text-[9px] font-extrabold text-purple-900">60%</span>
                            </div>
                            <div className="w-3.5 sm:w-4 bg-[#5551ff] rounded-t-sm flex flex-col justify-start items-center pt-1 shadow-xs" style={{ height: '85%' }}>
                              <span className="text-[9px] font-extrabold text-white">85%</span>
                            </div>
                          </div>
                          <span className="text-[9px] font-extrabold text-slate-600 leading-tight">Inclusion Fundamentals</span>
                        </div>

                        {/* Pillar 2: Diverse Leadership */}
                        <div className="flex flex-col items-center h-full justify-end space-y-1">
                          <div className="flex items-end space-x-1 h-36">
                            <div className="w-3.5 sm:w-4 bg-purple-200 rounded-t-sm flex flex-col justify-start items-center pt-1" style={{ height: '50%' }}>
                              <span className="text-[9px] font-extrabold text-purple-900">50%</span>
                            </div>
                            <div className="w-3.5 sm:w-4 bg-[#5551ff] rounded-t-sm flex flex-col justify-start items-center pt-1 shadow-xs" style={{ height: '80%' }}>
                              <span className="text-[9px] font-extrabold text-white">80%</span>
                            </div>
                          </div>
                          <span className="text-[9px] font-extrabold text-slate-600 leading-tight">Diverse Leadership</span>
                        </div>

                        {/* Pillar 3: Inclusive Decision Making */}
                        <div className="flex flex-col items-center h-full justify-end space-y-1">
                          <div className="flex items-end space-x-1 h-36">
                            <div className="w-3.5 sm:w-4 bg-purple-200 rounded-t-sm flex flex-col justify-start items-center pt-1" style={{ height: '55%' }}>
                              <span className="text-[9px] font-extrabold text-purple-900">55%</span>
                            </div>
                            <div className="w-3.5 sm:w-4 bg-[#5551ff] rounded-t-sm flex flex-col justify-start items-center pt-1 shadow-xs" style={{ height: '82%' }}>
                              <span className="text-[9px] font-extrabold text-white">82%</span>
                            </div>
                          </div>
                          <span className="text-[9px] font-extrabold text-slate-600 leading-tight">Inclusive Decision Making</span>
                        </div>

                        {/* Pillar 4: Business Impact of Inclusion */}
                        <div className="flex flex-col items-center h-full justify-end space-y-1">
                          <div className="flex items-end space-x-1 h-36">
                            <div className="w-3.5 sm:w-4 bg-purple-200 rounded-t-sm flex flex-col justify-start items-center pt-1" style={{ height: '45%' }}>
                              <span className="text-[9px] font-extrabold text-purple-900">45%</span>
                            </div>
                            <div className="w-3.5 sm:w-4 bg-[#5551ff] rounded-t-sm flex flex-col justify-start items-center pt-1 shadow-xs" style={{ height: '78%' }}>
                              <span className="text-[9px] font-extrabold text-white">78%</span>
                            </div>
                          </div>
                          <span className="text-[9px] font-extrabold text-slate-600 leading-tight">Business Impact of Inclusion</span>
                        </div>

                      </div>
                    </div>

                    {/* Chart 2: Round-by-Round Performance */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs sm:text-sm font-black text-slate-900 flex items-center space-x-2">
                          <BarChart3 className="w-4 h-4 text-[#5551ff]" />
                          <span>Round-by-Round Performance</span>
                        </h4>
                        <div className="flex items-center space-x-3 text-[10px] font-bold">
                          <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 bg-purple-300 rounded-xs" /><span className="text-slate-600">Round Score</span></span>
                          <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 bg-[#5551ff] rounded-full" /><span className="text-slate-900 font-extrabold">Cumulative Score</span></span>
                        </div>
                      </div>

                      {/* Combined Bar & Line Chart Graphic */}
                      <div className="h-48 relative flex items-end justify-between px-2 pt-4 border-b border-slate-100 pb-2">
                        <div className="absolute inset-x-0 bottom-6 top-4 flex flex-col justify-between border-b border-slate-100 text-[9px] text-slate-400 font-bold pointer-events-none">
                          <div className="border-b border-slate-100 border-dashed w-full flex justify-between"><span>2,000</span></div>
                          <div className="border-b border-slate-100 border-dashed w-full flex justify-between"><span>1,500</span></div>
                          <div className="border-b border-slate-100 border-dashed w-full flex justify-between"><span>1,000</span></div>
                          <div className="border-b border-slate-100 border-dashed w-full flex justify-between"><span>500</span></div>
                          <div>0</div>
                        </div>

                        {/* 10 Round Bars with Line Points */}
                        {Array.from({ length: 10 }).map((_, idx) => {
                          const roundNum = idx + 1;
                          const barHeights = [30, 45, 40, 55, 50, 65, 60, 75, 70, 85];
                          return (
                            <div key={roundNum} className="flex flex-col items-center space-y-1 relative z-10">
                              <div className="w-2.5 sm:w-3.5 bg-purple-400/80 hover:bg-[#5551ff] rounded-t-xs transition-all" style={{ height: `${barHeights[idx]}px` }} />
                              <span className="text-[9px] font-extrabold text-slate-600">{roundNum}</span>
                            </div>
                          );
                        })}
                        
                        {/* Cumulative Score Badge */}
                        <div className="absolute top-2 right-2 bg-[#5551ff] text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-sm flex items-center space-x-1">
                          <Trophy className="w-3 h-3 text-amber-300" />
                          <span>1,620</span>
                        </div>
                      </div>
                      <div className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">Round</div>
                    </div>

                  </div>

                  {/* Section 5: Learning Summary Grid (Key Strengths, Areas to Improve, Key Learning Insights) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    {/* Key Strengths */}
                    <div className="bg-emerald-50/70 border border-emerald-100 rounded-3xl p-5 space-y-3">
                      <div className="flex items-center space-x-2 text-xs font-black text-emerald-900">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Key Strengths</span>
                      </div>
                      <ul className="space-y-2 text-xs font-extrabold text-emerald-800/90">
                        <li className="flex items-start space-x-2"><Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0 mt-0.5" /><span>Strong focus on employee inclusion</span></li>
                        <li className="flex items-start space-x-2"><Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0 mt-0.5" /><span>Consistent long-term decision making</span></li>
                        <li className="flex items-start space-x-2"><Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0 mt-0.5" /><span>Built a strong brand reputation</span></li>
                        <li className="flex items-start space-x-2"><Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0 mt-0.5" /><span>Maintained balanced business growth</span></li>
                      </ul>
                    </div>

                    {/* Areas to Improve */}
                    <div className="bg-rose-50/70 border border-rose-100 rounded-3xl p-5 space-y-3">
                      <div className="flex items-center space-x-2 text-xs font-black text-rose-900">
                        <Target className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>Areas to Improve</span>
                      </div>
                      <ul className="space-y-2 text-xs font-extrabold text-rose-800/90">
                        <li className="flex items-start space-x-2"><span className="w-2.5 h-2.5 rounded-full border-2 border-rose-400 shrink-0 mt-1" /><span>Consider more short-term revenue opportunities</span></li>
                        <li className="flex items-start space-x-2"><span className="w-2.5 h-2.5 rounded-full border-2 border-rose-400 shrink-0 mt-1" /><span>Manage budget allocation more effectively</span></li>
                        <li className="flex items-start space-x-2"><span className="w-2.5 h-2.5 rounded-full border-2 border-rose-400 shrink-0 mt-1" /><span>Respond faster to market changes</span></li>
                        <li className="flex items-start space-x-2"><span className="w-2.5 h-2.5 rounded-full border-2 border-rose-400 shrink-0 mt-1" /><span>Explore more diverse talent partnerships</span></li>
                      </ul>
                    </div>

                    {/* Key Learning Insights */}
                    <div className="bg-purple-50/70 border border-purple-100 rounded-3xl p-5 space-y-3">
                      <div className="flex items-center space-x-2 text-xs font-black text-purple-900">
                        <Lightbulb className="w-4 h-4 text-[#5551ff] shrink-0" />
                        <span>Key Learning Insights</span>
                      </div>
                      <ul className="space-y-2 text-xs font-extrabold text-purple-800/90">
                        <li className="flex items-start space-x-2"><Check className="w-3.5 h-3.5 text-[#5551ff] stroke-[3] shrink-0 mt-0.5" /><span>Inclusive decisions can drive business growth</span></li>
                        <li className="flex items-start space-x-2"><Check className="w-3.5 h-3.5 text-[#5551ff] stroke-[3] shrink-0 mt-0.5" /><span>Diversity leads to stronger innovation</span></li>
                        <li className="flex items-start space-x-2"><Check className="w-3.5 h-3.5 text-[#5551ff] stroke-[3] shrink-0 mt-0.5" /><span>Long-term thinking creates sustainable value</span></li>
                        <li className="flex items-start space-x-2"><Check className="w-3.5 h-3.5 text-[#5551ff] stroke-[3] shrink-0 mt-0.5" /><span>A balanced approach delivers the best results</span></li>
                      </ul>
                    </div>

                  </div>

                </div>

                {/* RIGHT COLUMN (4 Columns): Your Company (Final) + Certificate */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Card 1: Your Company (Final) */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black text-slate-900">Your Company (Final)</h3>
                      <button className="text-xs font-bold text-[#5551ff] hover:underline flex items-center space-x-1 cursor-pointer">
                        <Edit3 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                    </div>

                    {/* Building Graphic */}
                    <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-2xs relative group">
                      <img
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"
                        alt="InnovaTech Solutions Headquarters"
                        className="w-full h-36 object-cover group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3.5">
                        <span className="text-xs sm:text-sm font-black text-white tracking-tight">
                          {companyNameInput || 'InnovaTech Solutions'}
                        </span>
                      </div>
                    </div>

                    {/* 4 Final Metrics Grid (2x2) */}
                    <div className="grid grid-cols-2 gap-2.5 pt-1">
                      
                      {/* Final Points */}
                      <div className="bg-purple-50/50 border border-purple-100 p-3 rounded-2xl space-y-1">
                        <div className="flex items-center space-x-1.5">
                          <Coins className="w-4 h-4 text-[#5551ff]" />
                          <span className="text-sm font-black text-slate-900">1,620</span>
                        </div>
                        <div className="text-[9px] font-extrabold text-slate-500 leading-tight">Final Points</div>
                        <div className="text-[9px] font-bold text-slate-400">out of 2,000</div>
                      </div>

                      {/* Revenue Growth */}
                      <div className="bg-indigo-50/50 border border-indigo-100 p-3 rounded-2xl space-y-1">
                        <div className="flex items-center space-x-1.5">
                          <BarChart3 className="w-4 h-4 text-indigo-600" />
                          <span className="text-sm font-black text-slate-900">+32%</span>
                        </div>
                        <div className="text-[9px] font-extrabold text-slate-500 leading-tight">Revenue Growth</div>
                      </div>

                      {/* Inclusion Score */}
                      <div className="bg-emerald-50/50 border border-emerald-100 p-3 rounded-2xl space-y-1">
                        <div className="flex items-center space-x-1.5">
                          <Users className="w-4 h-4 text-emerald-600" />
                          <span className="text-sm font-black text-slate-900">78%</span>
                        </div>
                        <div className="text-[9px] font-extrabold text-slate-500 leading-tight">Inclusion Score</div>
                        <div className="text-[10px] font-extrabold text-emerald-600">↑ +35%</div>
                      </div>

                      {/* Brand Reputation */}
                      <div className="bg-amber-50/50 border border-amber-100 p-3 rounded-2xl space-y-1">
                        <div className="flex items-center space-x-1.5">
                          <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                          <span className="text-sm font-black text-slate-900">85%</span>
                        </div>
                        <div className="text-[9px] font-extrabold text-slate-500 leading-tight">Brand Reputation</div>
                        <div className="text-[10px] font-extrabold text-emerald-600">↑ +28%</div>
                      </div>

                    </div>
                  </div>

                  {/* Card 2: Certificate Preview & Download */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black text-slate-900">Certificate</h3>
                      <button
                        onClick={() => setShowCertificateModal(true)}
                        className="text-xs font-bold text-[#5551ff] hover:underline cursor-pointer"
                      >
                        View Full Size
                      </button>
                    </div>

                    {/* Certificate Preview Frame */}
                    <div
                      onClick={() => setShowCertificateModal(true)}
                      className="border-4 border-amber-400/80 p-4 rounded-2xl bg-amber-50/40 text-center space-y-2 relative overflow-hidden shadow-2xs cursor-pointer hover:border-amber-500 transition-all"
                    >
                      <div className="text-[9px] font-black tracking-widest text-slate-800 uppercase">INCLUSIVE TYCOON</div>
                      <div className="text-[10px] font-black text-amber-800 tracking-wider">CERTIFICATE OF COMPLETION</div>
                      <div className="text-[9px] text-slate-500 font-serif italic">This is to certify that</div>
                      <div className="text-sm font-black text-slate-900 border-b border-amber-300 pb-0.5 max-w-xs mx-auto">
                        {user ? user.name : 'Priya Sharma'}
                      </div>
                      <p className="text-[9px] text-slate-500 leading-snug">
                        has successfully completed the Inclusive Tycoon Workplace Inclusion Strategy Game
                      </p>
                      <div className="text-[8px] font-bold text-slate-400 pt-1">15 October 2024</div>
                      
                      <div className="flex items-center justify-between pt-2 px-2 border-t border-amber-200/60 text-[9px] font-black text-slate-800">
                        <span className="px-1.5 py-0.5 rounded bg-slate-200">CII</span>
                        <div className="w-5 h-5 rounded-full bg-amber-400 border border-amber-500 flex items-center justify-center text-amber-900 font-bold text-[8px] shadow-2xs">★</div>
                        <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900">CII-CWL</span>
                      </div>
                    </div>

                    {/* Download Button */}
                    <button
                      onClick={() => {
                        alert('Downloading official CII-CWL Leadership Certificate for ' + (user ? user.name : 'Priya Sharma'));
                      }}
                      className="w-full py-3.5 bg-[#5551ff] hover:bg-indigo-600 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md shadow-indigo-500/20 flex items-center justify-center space-x-2 transition-all cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Certificate</span>
                    </button>
                  </div>

                </div>

              </div>

              {/* Section 5: Primary CTA Banner (Continue to Post-Game Quiz) */}
              <div className="bg-[#f4f0ff] border border-purple-200 rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xs">
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#5551ff] flex items-center justify-center shrink-0 shadow-2xs">
                    <BookOpen className="w-6 h-6 text-[#5551ff]" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-black text-slate-900">Continue Your Learning Journey</h4>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mt-0.5">
                      Now complete the post-game quiz to assess your learning and see how much you've improved.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('post-quiz');
                    setPostQuizIndex(0);
                  }}
                  className="w-full sm:w-auto px-8 py-4 bg-[#5551ff] hover:bg-indigo-600 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-indigo-500/25 flex items-center justify-center space-x-2 transition-all cursor-pointer shrink-0 hover:scale-[1.02]"
                >
                  <span>Continue to Post-Game Quiz</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>

            </div>
          )}

          {/* POST-GAME QUIZ TAB (MATCHES BRD & REFERENCE SCREENSHOTS media__1791333700000 & media__1791343700000) */}
          {activeTab === 'post-quiz' && (
            <div className="space-y-6 animate-fadeIn pb-12">
              
              {!isPostQuizSubmitted ? (
                /* 1. QUIZ QUESTION TAKING STATE (Q1..Q10) */
                <>
                  {/* Card 1: Post-Game Quiz Hero Banner */}
                  <div 
                    className="relative rounded-3xl overflow-hidden bg-[#e5e4fe] border border-purple-200/60 p-6 sm:p-8 lg:p-10 shadow-xs bg-cover bg-no-repeat bg-right lg:bg-center min-h-[220px] sm:min-h-[250px] flex items-center"
                    style={{ backgroundImage: "url('/post-quiz-taking-bg.png')" }}
                  >
                    <div className="space-y-2 max-w-md relative z-10">
                      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-xl bg-[#5551ff] text-xs font-black text-white shadow-xs">
                        <ClipboardList className="w-3.5 h-3.5 text-white" />
                        <span className="uppercase tracking-wider">Post-Game Quiz</span>
                      </div>
                      <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                        Test your learning after completing the Inclusive Tycoon game.
                      </h1>
                      <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed max-w-xl">
                        These questions help us measure what you have learned about workplace inclusion, diversity, and inclusive decision-making.
                      </p>
                    </div>
                  </div>

                  {/* Main Grid: 8 Cols Left | 4 Cols Right */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* Left Question Column (8 Columns) */}
                    <div className="lg:col-span-8 space-y-6">
                      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs space-y-6">
                        
                        {/* Header Row: Question Index & Progress Bar + Time Remaining */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                          <div className="space-y-2 flex-1 max-w-md">
                            <div className="flex items-center justify-between">
                              <div className="text-base font-black text-slate-900">
                                Question {postQuizIndex + 1} of {postQuizQuestions.length}
                              </div>
                              <span className="text-xs font-black text-slate-500">
                                {Math.round(((postQuizIndex + 1) / postQuizQuestions.length) * 100)}%
                              </span>
                            </div>
                            <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                              <div
                                className="h-full bg-[#5551ff] rounded-full transition-all duration-300"
                                style={{ width: `${((postQuizIndex + 1) / postQuizQuestions.length) * 100}%` }}
                              />
                            </div>
                          </div>

                          <div className="px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 flex items-center space-x-3 shrink-0 shadow-2xs">
                            <Clock className="w-5 h-5 text-slate-800" />
                            <div>
                              <div className="text-lg font-black text-rose-600 leading-none">
                                {formatTimer(postQuizTimerSeconds)}
                              </div>
                              <div className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider mt-0.5">
                                Time Remaining
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Question Category Badge */}
                        <div className="flex items-center space-x-2">
                          <span className="px-3 py-1 rounded-xl bg-purple-50 border border-purple-200 text-[#5551ff] text-[11px] font-extrabold flex items-center space-x-1.5">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Multiple Choice</span>
                          </span>
                        </div>

                        {/* Question Title & Subtitle */}
                        <div className="space-y-1">
                          <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug tracking-tight">
                            {postQuizQuestions[postQuizIndex].question}
                          </h2>
                          <p className="text-xs sm:text-sm text-slate-500 font-medium">
                            Select the best answer from the options below.
                          </p>
                        </div>

                        {/* Options A, B, C, D */}
                        <div className="space-y-3 pt-2">
                          {postQuizQuestions[postQuizIndex].options.map((optText, optIdx) => {
                            const isSelected = postQuizAnswers[postQuizIndex] === optIdx;
                            return (
                              <div
                                key={optIdx}
                                onClick={() => setPostQuizAnswers(prev => ({ ...prev, [postQuizIndex]: optIdx }))}
                                className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center space-x-4 ${
                                  isSelected
                                    ? 'bg-[#f4f0ff] border-[#5551ff] text-slate-900 shadow-xs'
                                    : 'bg-white border-slate-200/80 text-slate-700 hover:border-slate-300'
                                }`}
                              >
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                                  isSelected ? 'border-[#5551ff] bg-[#5551ff] text-white' : 'border-slate-300 bg-white text-slate-400'
                                }`}>
                                  {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <div className="w-2 h-2 rounded-full bg-slate-300" />}
                                </div>
                                <span className={`text-xs sm:text-sm leading-relaxed ${
                                  isSelected ? 'font-black text-slate-900' : 'font-bold text-slate-700'
                                }`}>
                                  {optText}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Navigation Row */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <button
                            disabled={postQuizIndex === 0}
                            onClick={() => setPostQuizIndex(prev => Math.max(0, prev - 1))}
                            className="px-6 py-3.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-xs sm:text-sm shadow-2xs disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-2 cursor-pointer"
                          >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Previous</span>
                          </button>

                          <button
                            onClick={() => {
                              if (postQuizIndex < postQuizQuestions.length - 1) {
                                setPostQuizIndex(prev => prev + 1);
                              } else {
                                setIsPostQuizSubmitted(true);
                              }
                            }}
                            className="px-8 py-3.5 rounded-2xl bg-[#5551ff] hover:bg-indigo-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-indigo-500/20 flex items-center space-x-2 cursor-pointer"
                          >
                            <span>{postQuizIndex === postQuizQuestions.length - 1 ? 'Submit Quiz' : 'Next Question'}</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Info Banner at Bottom */}
                      <div className="bg-blue-50/80 border border-blue-100 rounded-2xl p-4 flex items-start space-x-3 text-xs text-slate-700 font-medium leading-relaxed">
                        <Info className="w-4 h-4 text-[#5551ff] shrink-0 mt-0.5" />
                        <p>
                          Your answers will be assessed to measure your <strong>learning improvement from the pre-game to post-game quiz</strong>. You will see your detailed results after you complete all 10 questions.
                        </p>
                      </div>
                    </div>

                    {/* Right Column Widgets (4 Columns) - Matches Screenshot */}
                    <div className="lg:col-span-4 space-y-6">
                      
                      {/* Card 1: Quiz Progress */}
                      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                        <h3 className="text-base font-black text-slate-900">Quiz Progress</h3>

                        <div className="flex items-center justify-between gap-1 pt-1">
                          {postQuizQuestions.map((_, idx) => {
                            const isAnswered = postQuizAnswers[idx] !== undefined;
                            const isCurrent = idx === postQuizIndex;
                            return (
                              <div
                                key={idx}
                                onClick={() => setPostQuizIndex(idx)}
                                className={`w-8 h-8 rounded-full font-extrabold text-xs flex items-center justify-center cursor-pointer transition-all ${
                                  isCurrent
                                    ? 'bg-[#5551ff] text-white font-black ring-4 ring-indigo-100 shadow-md scale-105'
                                    : isAnswered
                                    ? 'bg-emerald-500 text-white'
                                    : 'border border-slate-300 text-slate-400 hover:bg-slate-50'
                                }`}
                              >
                                {idx + 1}
                              </div>
                            );
                          })}
                        </div>

                        {/* Legend Row */}
                        <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-[11px] font-bold text-slate-600">
                          <div className="flex items-center space-x-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                            <span>Answered</span>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#5551ff] inline-block" />
                            <span>Current</span>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <span className="w-2.5 h-2.5 rounded-full border border-slate-300 bg-white inline-block" />
                            <span>Not answered</span>
                          </div>
                        </div>
                      </div>

                      {/* Card 2: Your Learning Journey */}
                      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-black text-slate-900">Your Learning Journey</h3>
                          <button 
                            onClick={() => setActiveTab('results')}
                            className="text-xs font-bold text-[#5551ff] hover:underline cursor-pointer"
                          >
                            View Details
                          </button>
                        </div>

                        {/* Pre vs Post Comparison Boxes */}
                        <div className="grid grid-cols-11 gap-2 items-center">
                          {/* Pre-Game Quiz Box */}
                          <div className="col-span-5 bg-sky-50/70 border border-sky-100 rounded-2xl p-3.5 space-y-1">
                            <div className="flex items-center space-x-1.5 text-[#2563eb]">
                              <FileText className="w-3.5 h-3.5" />
                              <span className="text-[10px] font-black uppercase tracking-wider">Pre-Game Quiz</span>
                            </div>
                            <div className="text-xl font-black text-slate-900">62%</div>
                            <div className="text-[10px] font-bold text-slate-500">Your Score</div>
                          </div>

                          {/* Arrow Divider */}
                          <div className="col-span-1 flex items-center justify-center text-slate-400 font-black">
                            →
                          </div>

                          {/* Post-Game Quiz Box */}
                          <div className="col-span-5 bg-purple-50/70 border border-purple-100 rounded-2xl p-3.5 space-y-1">
                            <div className="flex items-center space-x-1.5 text-[#7c3aed]">
                              <BarChart3 className="w-3.5 h-3.5" />
                              <span className="text-[10px] font-black uppercase tracking-wider">Post-Game Quiz</span>
                            </div>
                            <div className="text-xl font-black text-slate-400">--</div>
                            <div className="text-[10px] font-bold text-slate-400 flex items-center space-x-1">
                              <span>To be calculated</span>
                              <Lock className="w-3 h-3 text-slate-400 inline" />
                            </div>
                          </div>
                        </div>

                        {/* Bottom Callout Banner */}
                        <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-3.5 space-y-1">
                          <div className="flex items-center space-x-2 text-emerald-800 text-xs font-black">
                            <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Complete the quiz to see how much you've improved!</span>
                          </div>
                          <p className="text-[11px] text-emerald-700 font-medium leading-relaxed pl-6">
                            Your post-game score will be compared with your pre-game score to measure learning progress.
                          </p>
                        </div>
                      </div>

                      {/* Card 3: What you learned in the game */}
                      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                        <h3 className="text-base font-black text-slate-900">What you learned in the game</h3>

                        <div className="space-y-3.5">
                          {/* Item 1: Employee Inclusion */}
                          <div className="flex items-start space-x-3.5 p-2.5 rounded-2xl bg-emerald-50/50 border border-emerald-100/60">
                            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                              <Users className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div className="space-y-0.5">
                              <h4 className="text-xs font-black text-slate-900">Employee Inclusion</h4>
                              <p className="text-[11px] text-slate-600 font-medium leading-snug">
                                Inclusive workplaces create a sense of belonging, higher engagement, and stronger teams.
                              </p>
                            </div>
                          </div>

                          {/* Item 2: Inclusive Decision Making */}
                          <div className="flex items-start space-x-3.5 p-2.5 rounded-2xl bg-purple-50/50 border border-purple-100/60">
                            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                              <Lightbulb className="w-5 h-5 text-purple-600" />
                            </div>
                            <div className="space-y-0.5">
                              <h4 className="text-xs font-black text-slate-900">Inclusive Decision Making</h4>
                              <p className="text-[11px] text-slate-600 font-medium leading-snug">
                                Diverse perspectives lead to better decisions and more innovative solutions.
                              </p>
                            </div>
                          </div>

                          {/* Item 3: Business Performance */}
                          <div className="flex items-start space-x-3.5 p-2.5 rounded-2xl bg-amber-50/50 border border-amber-100/60">
                            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                              <BarChart3 className="w-5 h-5 text-amber-600" />
                            </div>
                            <div className="space-y-0.5">
                              <h4 className="text-xs font-black text-slate-900">Business Performance</h4>
                              <p className="text-[11px] text-slate-600 font-medium leading-snug">
                                Inclusion drives innovation, productivity, and long-term financial growth.
                              </p>
                            </div>
                          </div>

                          {/* Item 4: Long-term Impact */}
                          <div className="flex items-start space-x-3.5 p-2.5 rounded-2xl bg-rose-50/50 border border-rose-100/60">
                            <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                              <Target className="w-5 h-5 text-rose-600" />
                            </div>
                            <div className="space-y-0.5">
                              <h4 className="text-xs font-black text-slate-900">Long-term Impact</h4>
                              <p className="text-[11px] text-slate-600 font-medium leading-snug">
                                Building an inclusive culture creates sustainable success for people and businesses.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                </>
              ) : (
                /* 2. POST-QUIZ COMPLETED LEARNING OUTCOME DASHBOARD (MATCHES REFERENCE SCREENSHOT media__1791343700000) */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* LEFT COLUMN (8 Columns): Hero Banner, KPI Row, Detailed Performance Bar Chart, Question Review Table */}
                  <div className="lg:col-span-8 space-y-6">
                    
                    {/* Card 1: Completion Hero Banner */}
                    <div 
                      className="rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden bg-cover bg-center min-h-[300px]"
                      style={{ backgroundImage: "url('/quiz-completed-bg.png')" }}
                    >
                      {/* Glassmorphic Center Text Card */}
                      <div className="space-y-3 max-w-xl relative z-10 bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/90 shadow-md">
                        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                          Post-Game Quiz Completed!
                        </h2>
                        <div className="text-base sm:text-lg font-black text-[#5551ff]">
                          Great job, Priya!
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                          You've successfully completed the post-game quiz. Here's how much you've learned through the Inclusive Tycoon experience.
                        </p>

                        <div className="pt-2 flex items-center justify-center space-x-3">
                          <button
                            onClick={() => {
                              setIsPostQuizSubmitted(false);
                              setPostQuizIndex(0);
                              setPostQuizAnswers({});
                              setPostQuizTimerSeconds(600);
                            }}
                            className="px-6 py-3 bg-[#5551ff] hover:bg-indigo-600 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md shadow-indigo-500/25 flex items-center space-x-2 transition-all cursor-pointer hover:scale-105"
                          >
                            <FileCheck className="w-4 h-4" />
                            <span>Retake / Start Post-Game Quiz</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Learning Improvement KPI Cards Row (4 Cards) */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      
                      {/* Pre-Game Quiz Score */}
                      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex items-center space-x-3.5">
                        <div className="w-11 h-11 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                          <FileCheck className="w-5 h-5 text-sky-600" />
                        </div>
                        <div className="space-y-0.5">
                          <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Pre-Game Quiz</div>
                          <div className="text-lg sm:text-xl font-black text-slate-900">62%</div>
                          <div className="text-[9px] font-bold text-slate-400">(6/10 correct)</div>
                        </div>
                      </div>

                      {/* Post-Game Quiz Score */}
                      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex items-center space-x-3.5">
                        <div className="w-11 h-11 rounded-2xl bg-purple-100 text-[#5551ff] flex items-center justify-center shrink-0">
                          <BarChart3 className="w-5 h-5 text-[#5551ff]" />
                        </div>
                        <div className="space-y-0.5">
                          <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Post-Game Quiz</div>
                          <div className="text-lg sm:text-xl font-black text-[#5551ff]">87%</div>
                          <div className="text-[9px] font-bold text-purple-600 font-extrabold">(9/10 correct)</div>
                        </div>
                      </div>

                      {/* Learning Improvement */}
                      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex items-center space-x-3.5">
                        <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                          <TrendingUp className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div className="space-y-0.5">
                          <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Learning Improvement</div>
                          <div className="text-lg sm:text-xl font-black text-emerald-600">+25%</div>
                          <div className="text-[9px] font-black text-emerald-700">Significant improvement!</div>
                        </div>
                      </div>

                      {/* Your Rank */}
                      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex items-center space-x-3.5">
                        <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                          <Trophy className="w-5 h-5 text-amber-600 fill-amber-400" />
                        </div>
                        <div className="space-y-0.5">
                          <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Your Rank</div>
                          <div className="text-lg sm:text-xl font-black text-slate-900">#2</div>
                          <div className="text-[9px] font-bold text-slate-400">out of 24 participants</div>
                        </div>
                      </div>

                    </div>

                    {/* Section 3: Detailed Performance Breakdown (Paired Bar Chart) */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-black text-slate-900">Detailed Performance Breakdown</h3>
                        <div className="flex items-center space-x-4 text-[10px] font-bold">
                          <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-200 inline-block" /><span className="text-slate-600">Pre-Game Quiz</span></span>
                          <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#5551ff] inline-block" /><span className="text-slate-900 font-extrabold">Post-Game Quiz</span></span>
                        </div>
                      </div>

                      {/* 4 Paired Bar Groups */}
                      <div className="grid grid-cols-4 gap-4 items-end h-48 pt-4 border-b border-slate-100 pb-3 text-center">
                        
                        {/* 1. Employee Inclusion */}
                        <div className="flex flex-col items-center h-full justify-end space-y-2">
                          <div className="flex items-end space-x-1.5 h-36">
                            <div className="w-4 sm:w-5 bg-purple-200 rounded-t-sm flex flex-col justify-start items-center pt-1" style={{ height: '60%' }}>
                              <span className="text-[9px] font-extrabold text-purple-900">60%</span>
                            </div>
                            <div className="w-4 sm:w-5 bg-[#5551ff] rounded-t-sm flex flex-col justify-start items-center pt-1 shadow-xs" style={{ height: '90%' }}>
                              <span className="text-[9px] font-extrabold text-white">90%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-center space-x-1">
                            <Users className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="text-[10px] font-extrabold text-slate-700 leading-tight">Employee Inclusion</span>
                          </div>
                        </div>

                        {/* 2. Inclusive Decision Making */}
                        <div className="flex flex-col items-center h-full justify-end space-y-2">
                          <div className="flex items-end space-x-1.5 h-36">
                            <div className="w-4 sm:w-5 bg-purple-200 rounded-t-sm flex flex-col justify-start items-center pt-1" style={{ height: '50%' }}>
                              <span className="text-[9px] font-extrabold text-purple-900">50%</span>
                            </div>
                            <div className="w-4 sm:w-5 bg-[#5551ff] rounded-t-sm flex flex-col justify-start items-center pt-1 shadow-xs" style={{ height: '85%' }}>
                              <span className="text-[9px] font-extrabold text-white">85%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-center space-x-1">
                            <Lightbulb className="w-3.5 h-3.5 text-[#5551ff] shrink-0" />
                            <span className="text-[10px] font-extrabold text-slate-700 leading-tight">Inclusive Decision Making</span>
                          </div>
                        </div>

                        {/* 3. Business Performance */}
                        <div className="flex flex-col items-center h-full justify-end space-y-2">
                          <div className="flex items-end space-x-1.5 h-36">
                            <div className="w-4 sm:w-5 bg-purple-200 rounded-t-sm flex flex-col justify-start items-center pt-1" style={{ height: '65%' }}>
                              <span className="text-[9px] font-extrabold text-purple-900">65%</span>
                            </div>
                            <div className="w-4 sm:w-5 bg-[#5551ff] rounded-t-sm flex flex-col justify-start items-center pt-1 shadow-xs" style={{ height: '88%' }}>
                              <span className="text-[9px] font-extrabold text-white">88%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-center space-x-1">
                            <BarChart3 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span className="text-[10px] font-extrabold text-slate-700 leading-tight">Business Performance</span>
                          </div>
                        </div>

                        {/* 4. Long-term Impact */}
                        <div className="flex flex-col items-center h-full justify-end space-y-2">
                          <div className="flex items-end space-x-1.5 h-36">
                            <div className="w-4 sm:w-5 bg-purple-200 rounded-t-sm flex flex-col justify-start items-center pt-1" style={{ height: '55%' }}>
                              <span className="text-[9px] font-extrabold text-purple-900">55%</span>
                            </div>
                            <div className="w-4 sm:w-5 bg-[#5551ff] rounded-t-sm flex flex-col justify-start items-center pt-1 shadow-xs" style={{ height: '85%' }}>
                              <span className="text-[9px] font-extrabold text-white">85%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-center space-x-1">
                            <Target className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                            <span className="text-[10px] font-extrabold text-slate-700 leading-tight">Long-term Impact</span>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Section 4: Question Review Table */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-black text-slate-900">Question Review</h3>
                        <button className="text-xs font-bold text-[#5551ff] hover:underline cursor-pointer">
                          View All Questions
                        </button>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-50/80 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                              <th className="py-2.5 px-3">#</th>
                              <th className="py-2.5 px-3">Question Topic</th>
                              <th className="py-2.5 px-3 text-center">Your Answer</th>
                              <th className="py-2.5 px-3 text-center">Correct Answer</th>
                              <th className="py-2.5 px-3">Result</th>
                            </tr>
                          </thead>
                          <tbody className="text-xs divide-y divide-slate-100 font-medium">
                            <tr className="hover:bg-slate-50/50">
                              <td className="py-3 px-3 font-bold text-slate-400">1</td>
                              <td className="py-3 px-3 font-bold text-slate-900">Diversity in Hiring</td>
                              <td className="py-3 px-3 text-center font-bold text-slate-700">B</td>
                              <td className="py-3 px-3 text-center font-bold text-slate-700">B</td>
                              <td className="py-3 px-3">
                                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black">
                                  <Check className="w-3 h-3 stroke-[3]" />
                                  <span>Correct</span>
                                </span>
                              </td>
                            </tr>

                            <tr className="hover:bg-slate-50/50">
                              <td className="py-3 px-3 font-bold text-slate-400">2</td>
                              <td className="py-3 px-3 font-bold text-slate-900">Inclusive Leadership</td>
                              <td className="py-3 px-3 text-center font-bold text-slate-700">C</td>
                              <td className="py-3 px-3 text-center font-bold text-slate-700">C</td>
                              <td className="py-3 px-3">
                                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black">
                                  <Check className="w-3 h-3 stroke-[3]" />
                                  <span>Correct</span>
                                </span>
                              </td>
                            </tr>

                            <tr className="hover:bg-slate-50/50">
                              <td className="py-3 px-3 font-bold text-slate-400">3</td>
                              <td className="py-3 px-3 font-bold text-slate-900">Measuring Inclusion Impact</td>
                              <td className="py-3 px-3 text-center font-bold text-rose-600">A</td>
                              <td className="py-3 px-3 text-center font-bold text-emerald-700">B</td>
                              <td className="py-3 px-3">
                                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-black">
                                  <XCircle className="w-3 h-3" />
                                  <span>Incorrect</span>
                                </span>
                              </td>
                            </tr>

                            <tr className="hover:bg-slate-50/50">
                              <td className="py-3 px-3 font-bold text-slate-400">4</td>
                              <td className="py-3 px-3 font-bold text-slate-900">Bias in Decision Making</td>
                              <td className="py-3 px-3 text-center font-bold text-slate-700">D</td>
                              <td className="py-3 px-3 text-center font-bold text-slate-700">D</td>
                              <td className="py-3 px-3">
                                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black">
                                  <Check className="w-3 h-3 stroke-[3]" />
                                  <span>Correct</span>
                                </span>
                              </td>
                            </tr>

                            <tr className="hover:bg-slate-50/50">
                              <td className="py-3 px-3 font-bold text-slate-400">5</td>
                              <td className="py-3 px-3 font-bold text-slate-900">Business Case for Inclusion</td>
                              <td className="py-3 px-3 text-center font-bold text-slate-700">B</td>
                              <td className="py-3 px-3 text-center font-bold text-slate-700">B</td>
                              <td className="py-3 px-3">
                                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black">
                                  <Check className="w-3 h-3 stroke-[3]" />
                                  <span>Correct</span>
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </div>

                  {/* RIGHT COLUMN (4 Columns): Stepper, Key Takeaways, Recommended Resources, Continue Banner */}
                  <div className="lg:col-span-4 space-y-6">
                    
                    {/* Widget 1: Your Learning Journey Stepper */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-black text-slate-900">Your Learning Journey</h3>
                        <button className="text-xs font-bold text-[#5551ff] hover:underline cursor-pointer">
                          View Journey
                        </button>
                      </div>

                      {/* Horizontal Stepper Node Timeline */}
                      <div className="flex items-center justify-between pt-2">
                        {/* Step 1 */}
                        <div className="flex flex-col items-center space-y-1 text-center">
                          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </div>
                          <span className="text-[9px] font-extrabold text-slate-600">Pre-Game<br />Quiz</span>
                        </div>
                        <div className="h-0.5 flex-1 bg-emerald-400 mx-1 mb-4" />

                        {/* Step 2 */}
                        <div className="flex flex-col items-center space-y-1 text-center">
                          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </div>
                          <span className="text-[9px] font-extrabold text-slate-600">Game<br />(10 Rounds)</span>
                        </div>
                        <div className="h-0.5 flex-1 bg-emerald-400 mx-1 mb-4" />

                        {/* Step 3 */}
                        <div className="flex flex-col items-center space-y-1 text-center">
                          <div className="w-8 h-8 rounded-full bg-[#5551ff] text-white flex items-center justify-center font-bold shadow-md shadow-indigo-500/30">
                            <Edit3 className="w-4 h-4" />
                          </div>
                          <span className="text-[9px] font-black text-[#5551ff]">Post-Game<br />Quiz</span>
                        </div>
                        <div className="h-0.5 flex-1 bg-slate-200 mx-1 mb-4" />

                        {/* Step 4 */}
                        <div className="flex flex-col items-center space-y-1 text-center">
                          <div className="w-8 h-8 rounded-full border border-slate-300 bg-slate-50 text-slate-400 flex items-center justify-center font-bold">
                            <BookOpen className="w-4 h-4" />
                          </div>
                          <span className="text-[9px] font-bold text-slate-400">Learning<br />Hub</span>
                        </div>
                      </div>
                    </div>

                    {/* Widget 2: Key Takeaways */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-black text-slate-900">Key Takeaways</h3>
                        <button
                          onClick={() => alert('Downloading Learning Summary PDF...')}
                          className="text-xs font-bold text-[#5551ff] hover:underline flex items-center space-x-1 cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download Summary</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div className="bg-emerald-50/60 border border-emerald-100 p-3 rounded-2xl space-y-1">
                          <div className="flex items-center space-x-1.5">
                            <Users className="w-4 h-4 text-emerald-600" />
                            <span className="text-xs font-black text-slate-900">Employee Inclusion</span>
                          </div>
                          <p className="text-[10px] text-slate-500 font-medium leading-tight">
                            You now understand how inclusive practices drive better team performance.
                          </p>
                        </div>

                        <div className="bg-sky-50/60 border border-sky-100 p-3 rounded-2xl space-y-1">
                          <div className="flex items-center space-x-1.5">
                            <UserIcon className="w-4 h-4 text-sky-600" />
                            <span className="text-xs font-black text-slate-900">Inclusive Decision Making</span>
                          </div>
                          <p className="text-[10px] text-slate-500 font-medium leading-tight">
                            You are better equipped to consider diverse perspectives in decisions.
                          </p>
                        </div>

                        <div className="bg-amber-50/60 border border-amber-100 p-3 rounded-2xl space-y-1">
                          <div className="flex items-center space-x-1.5">
                            <BarChart3 className="w-4 h-4 text-amber-600" />
                            <span className="text-xs font-black text-slate-900">Business Performance</span>
                          </div>
                          <p className="text-[10px] text-slate-500 font-medium leading-tight">
                            You learned how inclusion contributes to innovation, productivity, and growth.
                          </p>
                        </div>

                        <div className="bg-rose-50/60 border border-rose-100 p-3 rounded-2xl space-y-1">
                          <div className="flex items-center space-x-1.5">
                            <Target className="w-4 h-4 text-rose-600" />
                            <span className="text-xs font-black text-slate-900">Long-term Impact</span>
                          </div>
                          <p className="text-[10px] text-slate-500 font-medium leading-tight">
                            You understand the importance of building a sustainable inclusive culture.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Widget 3: Recommended Learning Resources */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                      <h3 className="text-sm font-black text-slate-900">Recommended Learning Resources</h3>

                      <div className="space-y-3">
                        
                        {/* Resource 1: Video */}
                        <div className="p-3 rounded-2xl border border-slate-100 bg-slate-50/50 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#5551ff] flex items-center justify-center shrink-0">
                              <Video className="w-5 h-5 text-[#5551ff]" />
                            </div>
                            <div>
                              <div className="text-xs font-black text-slate-900">Building an Inclusive Workplace</div>
                              <div className="text-[10px] text-slate-400 font-medium">Video • 10 mins</div>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              setActiveTab('learning');
                            }}
                            className="px-3 py-1.5 rounded-xl border border-purple-200 bg-purple-50 text-[#5551ff] hover:bg-purple-100 text-xs font-extrabold flex items-center space-x-1 cursor-pointer shrink-0"
                          >
                            <Play className="w-3 h-3 fill-[#5551ff]" />
                            <span>Watch</span>
                          </button>
                        </div>

                        {/* Resource 2: PDF Playbook */}
                        <div className="p-3 rounded-2xl border border-slate-100 bg-slate-50/50 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                              <FileText className="w-5 h-5 text-sky-600" />
                            </div>
                            <div>
                              <div className="text-xs font-black text-slate-900">Inclusive Leadership Playbook</div>
                              <div className="text-[10px] text-slate-400 font-medium">PDF • 12 pages</div>
                            </div>
                          </div>

                          <button
                            onClick={() => alert('Downloading Inclusive Leadership Playbook (PDF)...')}
                            className="px-3 py-1.5 rounded-xl border border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100 text-xs font-extrabold flex items-center space-x-1 cursor-pointer shrink-0"
                          >
                            <Download className="w-3 h-3" />
                            <span>Download</span>
                          </button>
                        </div>

                        {/* Resource 3: Article */}
                        <div className="p-3 rounded-2xl border border-slate-100 bg-slate-50/50 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                              <BookOpen className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div>
                              <div className="text-xs font-black text-slate-900">Measuring the ROI of Inclusion</div>
                              <div className="text-[10px] text-slate-400 font-medium">Article • 5 mins</div>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              setActiveTab('learning');
                            }}
                            className="px-3 py-1.5 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-extrabold flex items-center space-x-1 cursor-pointer shrink-0"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Read</span>
                          </button>
                        </div>

                      </div>
                    </div>

                    {/* Widget 4: Continue Your Learning Journey Banner */}
                    <div className="bg-[#f4f0ff] border border-purple-200 rounded-3xl p-5 space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#5551ff] flex items-center justify-center shrink-0">
                          <Lightbulb className="w-5 h-5 text-[#5551ff]" />
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-slate-900">Continue Your Learning Journey</h4>
                          <p className="text-[10px] text-slate-600 font-medium leading-tight mt-0.5">
                            Explore more resources in the Learning Hub to deepen your understanding of workplace inclusion.
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setActiveTab('learning');
                        }}
                        className="w-full py-3 bg-[#5551ff] hover:bg-indigo-600 text-white font-extrabold text-xs rounded-2xl shadow-md shadow-indigo-500/20 flex items-center justify-center space-x-2 transition-all cursor-pointer"
                      >
                        <span>Go to Learning Hub</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                </div>
              )}

            </div>
          )}

          {/* LEARNING HUB TAB (MATCHES REFERENCE SCREENSHOT) */}
          {activeTab === 'learning' && (
            <div className="space-y-6 animate-fadeIn pb-12">
              
              {/* Header / Hero Row: 8 Cols Hero | 4 Cols Learning Progress */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* HERO BANNER (8 Columns) */}
                <div 
                  className="lg:col-span-8 rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden bg-cover bg-right lg:bg-center min-h-[320px]"
                  style={{ backgroundImage: "url('/learning-hub-bg.png')" }}
                >
                  
                  {/* Left Content directly on Hero BG */}
                  <div className="space-y-3 max-w-md relative z-10">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-100/90 text-[#5551ff] text-[11px] font-black border border-purple-200/80 backdrop-blur-md">
                      <BookOpen className="w-3.5 h-3.5 text-[#5551ff]" />
                      <span className="uppercase tracking-wider">LEARNING HUB</span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                      Continue Your<br />
                      <span className="text-[#5551ff]">Learning Journey</span>
                    </h1>
                    
                    <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                      Explore curated resources to deepen your understanding of workplace inclusion and apply these learnings in real-world scenarios.
                    </p>
                  </div>

                </div>

                {/* YOUR LEARNING PROGRESS WIDGET (4 Columns) */}
                <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black text-slate-900">Your Learning Progress</h3>
                    <button className="text-xs font-bold text-[#5551ff] hover:underline cursor-pointer">
                      View Full Report
                    </button>
                  </div>

                  <div className="flex items-center space-x-5">
                    {/* SVG Donut Chart */}
                    <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-slate-100"
                          strokeWidth="3.5"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-emerald-500"
                          strokeDasharray="87, 100"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center justify-center text-center">
                        <span className="text-lg font-black text-slate-900 leading-none">87%</span>
                        <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-tight mt-0.5">Overall<br />Completion</span>
                      </div>
                    </div>

                    {/* Progress List */}
                    <div className="space-y-1.5 flex-1 text-xs font-bold">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center space-x-1.5 text-slate-600">
                          <Video className="w-3.5 h-3.5 text-purple-600" />
                          <span>Videos</span>
                        </span>
                        <span className="font-black text-slate-900">80%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center space-x-1.5 text-slate-600">
                          <FileText className="w-3.5 h-3.5 text-sky-600" />
                          <span>Articles</span>
                        </span>
                        <span className="font-black text-slate-900">90%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center space-x-1.5 text-slate-600">
                          <Briefcase className="w-3.5 h-3.5 text-teal-600" />
                          <span>Case Studies</span>
                        </span>
                        <span className="font-black text-slate-900">60%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center space-x-1.5 text-slate-600">
                          <Wrench className="w-3.5 h-3.5 text-amber-600" />
                          <span>Tools & Templates</span>
                        </span>
                        <span className="font-black text-slate-900">40%</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              {/* Resource Navigation Filter Pills */}
              <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
                <button
                  onClick={() => setLearningFilterTab('recommended')}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center space-x-2 transition-all cursor-pointer shrink-0 ${
                    learningFilterTab === 'recommended'
                      ? 'bg-[#5551ff] text-white shadow-md shadow-indigo-500/20'
                      : 'bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Star className="w-4 h-4 fill-current text-amber-300" />
                  <span>Recommended for You</span>
                </button>

                <button
                  onClick={() => setLearningFilterTab('all')}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center space-x-2 transition-all cursor-pointer shrink-0 ${
                    learningFilterTab === 'all'
                      ? 'bg-[#5551ff] text-white shadow-md shadow-indigo-500/20'
                      : 'bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>All Resources</span>
                </button>

                <button
                  onClick={() => setLearningFilterTab('videos')}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center space-x-2 transition-all cursor-pointer shrink-0 ${
                    learningFilterTab === 'videos'
                      ? 'bg-[#5551ff] text-white shadow-md shadow-indigo-500/20'
                      : 'bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Video className="w-4 h-4 text-purple-500" />
                  <span>Videos</span>
                </button>

                <button
                  onClick={() => setLearningFilterTab('articles')}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center space-x-2 transition-all cursor-pointer shrink-0 ${
                    learningFilterTab === 'articles'
                      ? 'bg-[#5551ff] text-white shadow-md shadow-indigo-500/20'
                      : 'bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <FileText className="w-4 h-4 text-sky-500" />
                  <span>Articles</span>
                </button>

                <button
                  onClick={() => setLearningFilterTab('case_studies')}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center space-x-2 transition-all cursor-pointer shrink-0 ${
                    learningFilterTab === 'case_studies'
                      ? 'bg-[#5551ff] text-white shadow-md shadow-indigo-500/20'
                      : 'bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Briefcase className="w-4 h-4 text-teal-500" />
                  <span>Case Studies</span>
                </button>

                <button
                  onClick={() => setLearningFilterTab('tools')}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center space-x-2 transition-all cursor-pointer shrink-0 ${
                    learningFilterTab === 'tools'
                      ? 'bg-[#5551ff] text-white shadow-md shadow-indigo-500/20'
                      : 'bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Wrench className="w-4 h-4 text-amber-500" />
                  <span>Tools & Templates</span>
                </button>
              </div>

              {/* Main Content Layout Grid: 8 Cols Left (Cards Grid) | 4 Cols Right (Path & Learning Areas) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* LEFT 8 COLUMNS: RECOMMENDATION CALLOUT + 6 RESOURCE CARDS */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Recommended for You Callout Banner */}
                  <div className="bg-[#f4f0ff] border border-purple-200 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
                    <div className="flex items-center space-x-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-[#5551ff] text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-500/30">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-black text-slate-900">Recommended for You</h4>
                        <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-relaxed mt-0.5">
                          Based on your game decisions and quiz performance, here are the most relevant resources to help you build a more inclusive and successful organisation.
                        </p>
                      </div>
                    </div>

                    <span className="px-3 py-1.5 rounded-xl bg-purple-200/80 text-[#5551ff] text-[11px] font-black shrink-0 border border-purple-300/60 flex items-center space-x-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#5551ff]" />
                      <span>Personalised for You</span>
                    </span>
                  </div>

                  {/* 6 Resource Cards Grid (2x3) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    
                    {/* Card 1: Building an Inclusive Workplace */}
                    <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                      <div className="space-y-3">
                        <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                          <img
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
                            alt="Building an Inclusive Workplace"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5">
                            <span className="px-2.5 py-1 rounded-lg bg-purple-950/80 backdrop-blur-md text-white text-[10px] font-black flex items-center space-x-1">
                              <Video className="w-3 h-3 text-purple-300" />
                              <span>VIDEO</span>
                            </span>
                          </div>
                          <div className="absolute top-2.5 right-2.5">
                            <span className="px-2 py-0.5 rounded-md bg-slate-950/70 backdrop-blur-md text-white text-[10px] font-bold">
                              ⏱ 10 mins
                            </span>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-[#5551ff] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                              <Play className="w-5 h-5 fill-[#5551ff] ml-0.5" />
                            </div>
                          </div>
                        </div>

                        <div className="p-4 space-y-2">
                          <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug group-hover:text-[#5551ff] transition-colors">
                            Building an Inclusive Workplace
                          </h4>
                          <p className="text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-2">
                            Learn practical strategies to create a more inclusive and equitable workplace.
                          </p>
                        </div>
                      </div>

                      <div className="px-4 pb-4 pt-2 flex items-center justify-between border-t border-slate-100/80 text-[10px] font-extrabold">
                        <div className="flex items-center space-x-1.5">
                          <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-100">Employee Inclusion</span>
                          <span className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-100">Leadership</span>
                        </div>
                        <button
                          onClick={() => {
                            setBookmarkedResources(prev =>
                              prev.includes('res_1') ? prev.filter(id => id !== 'res_1') : [...prev, 'res_1']
                            );
                          }}
                          className="text-slate-400 hover:text-[#5551ff] p-1 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer"
                        >
                          {bookmarkedResources.includes('res_1') ? (
                            <BookmarkCheck className="w-4 h-4 text-[#5551ff]" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Card 2: The Business Case for Diversity and Inclusion */}
                    <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                      <div className="space-y-3">
                        <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                          <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
                            alt="The Business Case for Diversity and Inclusion"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2.5 left-2.5">
                            <span className="px-2.5 py-1 rounded-lg bg-sky-950/80 backdrop-blur-md text-white text-[10px] font-black flex items-center space-x-1">
                              <FileText className="w-3 h-3 text-sky-300" />
                              <span>ARTICLE</span>
                            </span>
                          </div>
                          <div className="absolute top-2.5 right-2.5">
                            <span className="px-2 py-0.5 rounded-md bg-slate-950/70 backdrop-blur-md text-white text-[10px] font-bold">
                              ⏱ 8 min read
                            </span>
                          </div>
                        </div>

                        <div className="p-4 space-y-2">
                          <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug group-hover:text-[#5551ff] transition-colors">
                            The Business Case for Diversity and Inclusion
                          </h4>
                          <p className="text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-2">
                            Discover how inclusive workplaces drive innovation, productivity and long-term growth.
                          </p>
                        </div>
                      </div>

                      <div className="px-4 pb-4 pt-2 flex items-center justify-between border-t border-slate-100/80 text-[10px] font-extrabold">
                        <div className="flex items-center space-x-1.5">
                          <span className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-100">Business Performance</span>
                          <span className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-100">Case Study</span>
                        </div>
                        <button
                          onClick={() => {
                            setBookmarkedResources(prev =>
                              prev.includes('res_2') ? prev.filter(id => id !== 'res_2') : [...prev, 'res_2']
                            );
                          }}
                          className="text-slate-400 hover:text-[#5551ff] p-1 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer"
                        >
                          {bookmarkedResources.includes('res_2') ? (
                            <BookmarkCheck className="w-4 h-4 text-[#5551ff]" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Card 3: Tata: Building an Inclusive Culture */}
                    <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                      <div className="space-y-3">
                        <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                          <img
                            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"
                            alt="Tata: Building an Inclusive Culture"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2.5 left-2.5">
                            <span className="px-2.5 py-1 rounded-lg bg-teal-950/80 backdrop-blur-md text-white text-[10px] font-black flex items-center space-x-1">
                              <Briefcase className="w-3 h-3 text-teal-300" />
                              <span>CASE STUDY</span>
                            </span>
                          </div>
                          <div className="absolute top-2.5 right-2.5">
                            <span className="px-2 py-0.5 rounded-md bg-slate-950/70 backdrop-blur-md text-white text-[10px] font-bold">
                              ⏱ 12 min read
                            </span>
                          </div>
                        </div>

                        <div className="p-4 space-y-2">
                          <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug group-hover:text-[#5551ff] transition-colors">
                            Tata: Building an Inclusive Culture
                          </h4>
                          <p className="text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-2">
                            How Tata Group integrated inclusion into their business strategy and achieved measurable results.
                          </p>
                        </div>
                      </div>

                      <div className="px-4 pb-4 pt-2 flex items-center justify-between border-t border-slate-100/80 text-[10px] font-extrabold">
                        <div className="flex items-center space-x-1.5">
                          <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 border border-teal-100">Case Study</span>
                          <span className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-100">Real World Example</span>
                        </div>
                        <button
                          onClick={() => {
                            setBookmarkedResources(prev =>
                              prev.includes('res_3') ? prev.filter(id => id !== 'res_3') : [...prev, 'res_3']
                            );
                          }}
                          className="text-slate-400 hover:text-[#5551ff] p-1 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer"
                        >
                          {bookmarkedResources.includes('res_3') ? (
                            <BookmarkCheck className="w-4 h-4 text-[#5551ff]" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Card 4: Inclusive Hiring Checklist */}
                    <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                      <div className="space-y-3">
                        <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                          <img
                            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80"
                            alt="Inclusive Hiring Checklist"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2.5 left-2.5">
                            <span className="px-2.5 py-1 rounded-lg bg-amber-950/80 backdrop-blur-md text-white text-[10px] font-black flex items-center space-x-1">
                              <Wrench className="w-3 h-3 text-amber-300" />
                              <span>TOOLKIT</span>
                            </span>
                          </div>
                          <div className="absolute top-2.5 right-2.5">
                            <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-extrabold flex items-center space-x-1">
                              <Check className="w-3 h-3 stroke-[3]" />
                              <span>Template</span>
                            </span>
                          </div>
                        </div>

                        <div className="p-4 space-y-2">
                          <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug group-hover:text-[#5551ff] transition-colors">
                            Inclusive Hiring Checklist
                          </h4>
                          <p className="text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-2">
                            A practical checklist to help you implement more inclusive hiring practices.
                          </p>
                        </div>
                      </div>

                      <div className="px-4 pb-4 pt-2 flex items-center justify-between border-t border-slate-100/80 text-[10px] font-extrabold">
                        <div className="flex items-center space-x-1.5">
                          <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-100">HR & Hiring</span>
                          <span className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-100">Tools & Templates</span>
                        </div>
                        <button
                          onClick={() => alert('Downloading Inclusive Hiring Checklist Template (PDF/Word)...')}
                          className="text-slate-400 hover:text-[#5551ff] p-1 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer"
                        >
                          <Download className="w-4 h-4 text-[#5551ff]" />
                        </button>
                      </div>
                    </div>

                    {/* Card 5: Inclusive Leadership in Practice */}
                    <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                      <div className="space-y-3">
                        <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                          <img
                            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80"
                            alt="Inclusive Leadership in Practice"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2.5 left-2.5">
                            <span className="px-2.5 py-1 rounded-lg bg-purple-950/80 backdrop-blur-md text-white text-[10px] font-black flex items-center space-x-1">
                              <Video className="w-3 h-3 text-purple-300" />
                              <span>VIDEO</span>
                            </span>
                          </div>
                          <div className="absolute top-2.5 right-2.5">
                            <span className="px-2 py-0.5 rounded-md bg-slate-950/70 backdrop-blur-md text-white text-[10px] font-bold">
                              ⏱ 8 mins
                            </span>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-[#5551ff] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                              <Play className="w-5 h-5 fill-[#5551ff] ml-0.5" />
                            </div>
                          </div>
                        </div>

                        <div className="p-4 space-y-2">
                          <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug group-hover:text-[#5551ff] transition-colors">
                            Inclusive Leadership in Practice
                          </h4>
                          <p className="text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-2">
                            Learn how inclusive leaders make better decisions and build stronger teams.
                          </p>
                        </div>
                      </div>

                      <div className="px-4 pb-4 pt-2 flex items-center justify-between border-t border-slate-100/80 text-[10px] font-extrabold">
                        <div className="flex items-center space-x-1.5">
                          <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-100">Leadership</span>
                          <span className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-100">Decision Making</span>
                        </div>
                        <button
                          onClick={() => {
                            setBookmarkedResources(prev =>
                              prev.includes('res_5') ? prev.filter(id => id !== 'res_5') : [...prev, 'res_5']
                            );
                          }}
                          className="text-slate-400 hover:text-[#5551ff] p-1 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer"
                        >
                          {bookmarkedResources.includes('res_5') ? (
                            <BookmarkCheck className="w-4 h-4 text-[#5551ff]" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Card 6: From Intention to Impact */}
                    <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                      <div className="space-y-3">
                        <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                          <img
                            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80"
                            alt="From Intention to Impact"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2.5 left-2.5">
                            <span className="px-2.5 py-1 rounded-lg bg-indigo-950/80 backdrop-blur-md text-white text-[10px] font-black flex items-center space-x-1">
                              <FileText className="w-3 h-3 text-indigo-300" />
                              <span>ARTICLE</span>
                            </span>
                          </div>
                          <div className="absolute top-2.5 right-2.5">
                            <span className="px-2 py-0.5 rounded-md bg-slate-950/70 backdrop-blur-md text-white text-[10px] font-bold">
                              ⏱ 6 min.read
                            </span>
                          </div>
                        </div>

                        <div className="p-4 space-y-2">
                          <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug group-hover:text-[#5551ff] transition-colors">
                            From Intention to Impact
                          </h4>
                          <p className="text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-2">
                            A step-by-step guide to turning inclusion intentions into measurable outcomes.
                          </p>
                        </div>
                      </div>

                      <div className="px-4 pb-4 pt-2 flex items-center justify-between border-t border-slate-100/80 text-[10px] font-extrabold">
                        <div className="flex items-center space-x-1.5">
                          <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">Action Plan</span>
                          <span className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-100">Long-term Impact</span>
                        </div>
                        <button
                          onClick={() => {
                            setBookmarkedResources(prev =>
                              prev.includes('res_6') ? prev.filter(id => id !== 'res_6') : [...prev, 'res_6']
                            );
                          }}
                          className="text-slate-400 hover:text-[#5551ff] p-1 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer"
                        >
                          {bookmarkedResources.includes('res_6') ? (
                            <BookmarkCheck className="w-4 h-4 text-[#5551ff]" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                  </div>

                </div>

                {/* RIGHT 4 COLUMNS: RECOMMENDED PATH + KEY LEARNING AREAS + APPLY CTA */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Widget 1: Recommended Learning Path */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                    <h3 className="text-sm font-black text-slate-900">Recommended Learning Path</h3>

                    {/* Step Timeline */}
                    <div className="space-y-3 relative pl-2">
                      <div className="absolute top-4 bottom-4 left-5 w-0.5 bg-slate-200" />
                      
                      {/* Step 1 - Completed */}
                      <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100 relative z-10">
                        <div className="flex items-center space-x-3">
                          <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </div>
                          <div>
                            <div className="text-xs font-black text-slate-900">Building an Inclusive Workplace</div>
                            <div className="text-[10px] text-emerald-700 font-extrabold">Video • 10 mins</div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-emerald-600 shrink-0" />
                      </div>

                      {/* Step 2 - Current */}
                      <div className="flex items-center justify-between p-3 rounded-2xl bg-[#f4f0ff] border border-purple-200 relative z-10">
                        <div className="flex items-center space-x-3">
                          <div className="w-7 h-7 rounded-full bg-[#5551ff] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-md shadow-indigo-500/30">
                            2
                          </div>
                          <div>
                            <div className="text-xs font-black text-[#5551ff]">The Business Case for D&I</div>
                            <div className="text-[10px] text-slate-500 font-medium">Article • 8 mins</div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#5551ff] shrink-0" />
                      </div>

                      {/* Step 3 */}
                      <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 relative z-10">
                        <div className="flex items-center space-x-3">
                          <div className="w-7 h-7 rounded-full border-2 border-slate-300 text-slate-500 font-bold text-xs flex items-center justify-center shrink-0">
                            3
                          </div>
                          <div>
                            <div className="text-xs font-black text-slate-800">Inclusive Leadership in Practice</div>
                            <div className="text-[10px] text-slate-400 font-medium">Video • 8 mins</div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                      </div>

                      {/* Step 4 */}
                      <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 relative z-10">
                        <div className="flex items-center space-x-3">
                          <div className="w-7 h-7 rounded-full border-2 border-slate-300 text-slate-500 font-bold text-xs flex items-center justify-center shrink-0">
                            4
                          </div>
                          <div>
                            <div className="text-xs font-black text-slate-800">Inclusive Hiring Checklist</div>
                            <div className="text-[10px] text-slate-400 font-medium">Template</div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                      </div>

                    </div>
                  </div>

                  {/* Widget 2: Key Learning Areas for You */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                    <h3 className="text-sm font-black text-slate-900">Key Learning Areas for You</h3>

                    <div className="space-y-3">
                      
                      {/* Area 1 */}
                      <div className="p-3 rounded-2xl bg-purple-50/50 border border-purple-100 flex items-center justify-between group cursor-pointer hover:bg-purple-100/50 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#5551ff] flex items-center justify-center shrink-0">
                            <Users className="w-4 h-4 text-[#5551ff]" />
                          </div>
                          <div>
                            <div className="text-xs font-black text-slate-900">Employee Inclusion</div>
                            <div className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">
                              Continue building strategies for inclusive hiring and workplace practices.
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#5551ff] shrink-0 transition-colors" />
                      </div>

                      {/* Area 2 */}
                      <div className="p-3 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex items-center justify-between group cursor-pointer hover:bg-indigo-100/50 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                            <Lightbulb className="w-4 h-4 text-indigo-600" />
                          </div>
                          <div>
                            <div className="text-xs font-black text-slate-900">Inclusive Decision Making</div>
                            <div className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">
                              Learn to consider diverse perspectives in strategic decisions.
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 shrink-0 transition-colors" />
                      </div>

                      {/* Area 3 */}
                      <div className="p-3 rounded-2xl bg-amber-50/50 border border-amber-100 flex items-center justify-between group cursor-pointer hover:bg-amber-100/50 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                            <BarChart3 className="w-4 h-4 text-amber-700" />
                          </div>
                          <div>
                            <div className="text-xs font-black text-slate-900">Business Performance</div>
                            <div className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">
                              Explore how inclusion drives innovation and growth.
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-700 shrink-0 transition-colors" />
                      </div>

                      {/* Area 4 */}
                      <div className="p-3 rounded-2xl bg-rose-50/50 border border-rose-100 flex items-center justify-between group cursor-pointer hover:bg-rose-100/50 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                            <Target className="w-4 h-4 text-rose-600" />
                          </div>
                          <div>
                            <div className="text-xs font-black text-slate-900">Long-term Impact</div>
                            <div className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">
                              Understand how to build a sustainable inclusive culture.
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-rose-600 shrink-0 transition-colors" />
                      </div>

                    </div>
                  </div>

                  {/* Widget 3: Apply What You've Learned Hero CTA */}
                  <div className="bg-[#5551ff] rounded-3xl p-6 text-white space-y-4 shadow-lg shadow-indigo-500/30 relative overflow-hidden">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center shrink-0">
                        <Lightbulb className="w-5 h-5 text-amber-300" />
                      </div>
                      <div>
                        <h4 className="text-base font-black text-white">Apply What You've Learned</h4>
                        <p className="text-xs text-purple-100 font-medium leading-tight mt-0.5">
                          Take these insights back to your workplace and create meaningful change.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => alert('Initiating Workplace Action Plan for ' + (user ? user.name : 'Priya Sharma'))}
                      className="w-full py-3 bg-white hover:bg-purple-50 text-[#5551ff] font-extrabold text-xs sm:text-sm rounded-2xl shadow-md flex items-center justify-center space-x-2 transition-all cursor-pointer"
                    >
                      <span>Apply What You've Learned</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* GAME LAUNCH / JOIN MODAL & TAB */}
          {showJoinModal && (
            <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 border border-slate-100 shadow-lg space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-2">
                  <Gamepad2 className="w-5 h-5 text-[#5551ff]" />
                  <h3 className="text-lg font-black text-slate-900">Start or Join Strategy Game</h3>
                </div>
                {showJoinModal && (
                  <button onClick={() => setShowJoinModal(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Executive Name</label>
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => { setMode('single'); handleCreateSession(); }}
                    disabled={loading}
                    className="p-4 rounded-2xl border-2 border-purple-200 hover:border-[#5551ff] bg-purple-50/50 text-left space-y-1 transition-all cursor-pointer"
                  >
                    <div className="font-black text-sm text-slate-900">Solo vs AI</div>
                    <div className="text-[11px] text-slate-500">Play against 3 AI Tycoon companies</div>
                  </button>

                  <div className="p-4 rounded-2xl border-2 border-slate-200 text-left space-y-2">
                    <div className="font-black text-sm text-slate-900">Join Multiplayer</div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="6-LETTER CODE"
                        value={roomCodeInput}
                        onChange={(e) => setRoomCodeInput(e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold uppercase"
                      />
                      <button
                        onClick={handleJoinSession}
                        disabled={loading}
                        className="px-3 py-1.5 bg-[#5551ff] text-white text-xs font-bold rounded-lg cursor-pointer"
                      >
                        Join
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* CERTIFICATE FULL SIZE MODAL */}
          {showCertificateModal && (
            <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
              <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-slate-100 shadow-2xl space-y-6 relative">
                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="text-center space-y-1">
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-wider">
                    Official Award
                  </span>
                  <h3 className="text-xl font-black text-slate-900">Certificate of Completion</h3>
                </div>

                {/* High Resolution Certificate Display */}
                <div className="border-8 border-amber-400 p-6 sm:p-8 rounded-3xl bg-amber-50/50 text-center space-y-4 relative shadow-inner">
                  <div className="flex justify-between items-center border-b border-amber-300 pb-4 text-xs font-black">
                    <span className="text-slate-800 tracking-widest">CONFEDERATION OF INDIAN INDUSTRY (CII)</span>
                    <span className="text-amber-900 tracking-widest">CII-CWL</span>
                  </div>

                  <div className="space-y-2 py-4">
                    <div className="text-xs font-black tracking-widest text-slate-600 uppercase">INCLUSIVE TYCOON</div>
                    <div className="text-xl sm:text-2xl font-black text-amber-900 tracking-wider">CERTIFICATE OF COMPLETION</div>
                    <p className="text-xs text-slate-500 font-serif italic pt-2">This is to certify that</p>
                    <div className="text-xl sm:text-2xl font-black text-slate-900 border-b-2 border-amber-400 pb-1 max-w-sm mx-auto">
                      {user ? user.name : 'Priya Sharma'}
                    </div>
                    <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed pt-2">
                      has successfully completed all 10 rounds of the <strong>Inclusive Tycoon Workplace Inclusion Strategy Game</strong> with distinction, demonstrating high executive capability in fostering workplace diversity and inclusion.
                    </p>
                    <div className="text-xs font-extrabold text-slate-500 pt-3">Awarded on 15 October 2024</div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-amber-300 text-xs font-black text-slate-800">
                    <div className="text-left">
                      <div className="text-[10px] text-slate-400 uppercase">Issuing Body</div>
                      <div>CII Leadership Centre</div>
                    </div>

                    <div className="w-12 h-12 rounded-full bg-amber-400 border-2 border-amber-600 flex flex-col items-center justify-center text-amber-950 font-black text-xs shadow-md">
                      <Trophy className="w-5 h-5 text-amber-950" />
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] text-slate-400 uppercase">Session Code</div>
                      <div>TYC-4822</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-2">
                  <button
                    onClick={() => setShowCertificateModal(false)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      alert('Downloading official CII-CWL Leadership Certificate PDF');
                    }}
                    className="px-6 py-2.5 bg-[#5551ff] hover:bg-indigo-600 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center space-x-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};