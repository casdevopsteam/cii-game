import React, { useState, useEffect } from 'react';
import { User, Session } from '../types/game';
import { fetchApi } from '../api/client';
import {
  Users,
  Download,
  LayoutDashboard,
  Calendar,
  BarChart3,
  TrendingUp,
  FileText,
  BookOpen,
  Building2,
  ChevronDown,
  Gamepad2,
  FileCheck,
  Bell,
  LogOut,
  GraduationCap,
  Star,
  Zap,
  ArrowRight,
  MoreVertical,
  Trophy,
  MessageSquare,
  Radio,
  PlayCircle,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  Plus,
  X,
  Edit3,
  Copy,
  Square,
  CheckSquare,
  RefreshCw,
  Key,
  Mail,
  Send,
  Award,
  ClipboardList,
  Ban,
  TrendingDown,
  Target,
  PieChart,
  Briefcase,
  ThumbsUp,
  Shield,
  Bookmark,
  Maximize2,
  Eye,
  SlidersHorizontal,
  Video,
  Trash2,
  Play,
  ChevronRight,
  ChevronLeft,
  Tag,
  RotateCcw
} from 'lucide-react';

interface InstitutionalAdminViewProps {
  user: User;
  onNavigateToApp?: () => void;
  onLogout?: () => void;
}

export const InstitutionalAdminView: React.FC<InstitutionalAdminViewProps> = ({ user, onNavigateToApp, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'sessions' | 'participants' | 'live' | 'scores' | 'analytics' | 'reports' | 'learning'>('dashboard');
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);

  // Sessions Management View State
  const [selectedSessionId, setSelectedSessionId] = useState<string>('session-1');
  const [detailTab, setDetailTab] = useState<'overview' | 'participants' | 'codes' | 'liveProgress'>('overview');
  const [sessionFilterTab, setSessionFilterTab] = useState<'all' | 'active' | 'completed' | 'scheduled'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Participants & Participant Codes View State
  const [selectedParticipantId, setSelectedParticipantId] = useState<string>('part-1');
  const [participantDetailTab, setParticipantDetailTab] = useState<'overview' | 'gameProgress' | 'learning' | 'activity'>('overview');
  const [participantFilterTab, setParticipantFilterTab] = useState<'all' | 'completed' | 'inProgress' | 'notStarted'>('all');
  const [participantSearch, setParticipantSearch] = useState('');
  const [selectedSessionFilter, setSelectedSessionFilter] = useState('TCS Leadership Workshop 2026');
  const [numCodesToGenerate, setNumCodesToGenerate] = useState(50);

  // Scores & Results View State
  const [scoresSelectedParticipantId, setScoresSelectedParticipantId] = useState<string>('part-2'); // Default Priya Desai
  const [scoresDetailTab, setScoresDetailTab] = useState<'overview' | 'gameDetails' | 'learning' | 'activity'>('overview');
  const [scoresFilterTab, setScoresFilterTab] = useState<'all' | 'completed' | 'inProgress' | 'notStarted'>('all');
  const [scoresSearchQuery, setScoresSearchQuery] = useState('');
  const [scoresSortBy, setScoresSortBy] = useState('score');
  const [scoresStatusFilter, setScoresStatusFilter] = useState('all');

  // Analytics View State
  const [analyticsDateRange, setAnalyticsDateRange] = useState('Jan 2024 - Oct 2024');
  const [analyticsSessionFilter, setAnalyticsSessionFilter] = useState('all');

  // Reports View State
  const [selectedReportTemplate, setSelectedReportTemplate] = useState('summary');
  const [reportType, setReportType] = useState('Session Summary Report');
  const [reportSession, setReportSession] = useState('TCS Leadership Workshop 2026');
  const [reportDateRange, setReportDateRange] = useState('15 Oct 2024 - 15 Oct 2024');
  const [reportParticipantStatus, setReportParticipantStatus] = useState('All Participants');
  const [reportOrganization, setReportOrganization] = useState('All Organizations');
  const [reportIncludeSections, setReportIncludeSections] = useState<string[]>(['Participation', 'Scores', 'Learning Outcomes']);
  const [reportSearchQuery, setReportSearchQuery] = useState('');
  const [reportSectionsChecklist, setReportSectionsChecklist] = useState({
    executiveSummary: true,
    participationAnalysis: true,
    scoreAnalysis: true,
    learningOutcomes: true,
    inclusionImpact: true,
    participantFeedback: true,
  });

  // Learning Materials View State
  const [learningTab, setLearningTab] = useState<'all' | 'pre' | 'in' | 'post' | 'cases' | 'examples'>('all');
  const [learningSearch, setLearningSearch] = useState('');
  const [learningTypeFilter, setLearningTypeFilter] = useState('all');
  const [learningStageFilter, setLearningStageFilter] = useState('all');
  const [learningStatusFilter, setLearningStatusFilter] = useState('all');
  const [learningLangFilter, setLearningLangFilter] = useState('all');
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>('mat-1');
  const [materialDrawerTab, setMaterialDrawerTab] = useState<'overview' | 'content' | 'usage' | 'feedback'>('overview');

  // New Session form
  const [newSessionName, setNewSessionName] = useState('Tata Leadership Workshop 2026');
  const [maxTurns, setMaxTurns] = useState(10);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadAdminSessions();
  }, [user]);

  const loadAdminSessions = async () => {
    setLoading(true);
    try {
      const data: any = await fetchApi(`/analytics/admin/${user.id}`);
      setSessions(data.sessions || []);
    } catch (err) {
      console.error('Failed to load admin sessions', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSession = async () => {
    setCreating(true);
    try {
      const res: any = await fetchApi('/sessions/create', {
        method: 'POST',
        body: JSON.stringify({
          creatorId: user.id,
          playerName: `${user.name} (Host)`,
          mode: 'multi',
          numBots: 0,
          maxTurns
        })
      });
      setSessions(prev => [res.session, ...prev]);
    } catch (err) {
      console.error('Failed to create admin session', err);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-[#f8f9fd] flex font-sans text-slate-900">
      
      {/* 1. LEFT DARK SIDEBAR (MATCHES REFERENCE UI SCREENSHOT) */}
      <aside className="w-64 bg-[#0d0d2b] text-slate-300 flex flex-col shrink-0 h-full border-r border-slate-800 overflow-hidden">
        
        {/* Brand Header */}
        <div className="p-5 shrink-0 border-b border-slate-800/40">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigateToApp && onNavigateToApp()}>
            <div className="w-10 h-10 rounded-2xl bg-[#5551ff] flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
              <Trophy className="w-5 h-5 fill-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-black text-sm text-white tracking-tight">INCLUSIVE TYCOON</span>
                <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-orange-500 text-white">CII CWL</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Workplace Inclusion Strategy Game</p>
            </div>
          </div>
        </div>

        {/* Navigation Middle */}
        <nav className="flex-1 overflow-y-auto p-5 space-y-5 text-xs font-bold">
          
          {/* MAIN */}
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 px-3">MAIN</div>
            <div className="space-y-1">
              <button 
                onClick={() => setActiveTab('dashboard')} 
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-2xl transition-all ${
                  activeTab === 'dashboard' ? 'bg-[#5551ff] text-white shadow-md font-extrabold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </button>

              <button 
                onClick={() => setActiveTab('sessions')} 
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-2xl transition-all ${
                  activeTab === 'sessions' ? 'bg-[#5551ff] text-white shadow-md font-extrabold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Sessions</span>
              </button>

              <button 
                onClick={() => setActiveTab('participants')} 
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-2xl transition-all ${
                  activeTab === 'participants' ? 'bg-[#5551ff] text-white shadow-md font-extrabold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Participants</span>
              </button>

              <button 
                onClick={() => setActiveTab('live')} 
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-2xl transition-all ${
                  activeTab === 'live' ? 'bg-[#5551ff] text-white shadow-md font-extrabold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Radio className="w-4 h-4" />
                <span>Live Sessions</span>
              </button>
            </div>
          </div>

          {/* RESULTS */}
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 px-3">RESULTS</div>
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('scores')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-2xl transition-all ${
                  activeTab === 'scores' ? 'bg-[#5551ff] text-white shadow-md font-extrabold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Scores & Results</span>
              </button>
            </div>
          </div>

          {/* INSIGHTS */}
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 px-3">INSIGHTS</div>
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-2xl transition-all ${
                  activeTab === 'analytics' ? 'bg-[#5551ff] text-white shadow-md font-extrabold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Analytics</span>
              </button>

              <button
                onClick={() => setActiveTab('reports')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-2xl transition-all ${
                  activeTab === 'reports' ? 'bg-[#5551ff] text-white shadow-md font-extrabold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Reports</span>
              </button>
            </div>
          </div>

          {/* RESOURCES */}
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 px-3">RESOURCES</div>
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('learning')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-2xl transition-all ${
                  activeTab === 'learning' ? 'bg-[#5551ff] text-white shadow-md font-extrabold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Learning Materials</span>
              </button>
            </div>
          </div>

          {/* CII BRAND FOOTER CARD WITH ILLUSTRATION (MATCHES REFERENCE SCREENSHOT) */}
          <div className="mt-6 p-4 rounded-3xl bg-gradient-to-b from-[#191942] to-[#0c0c24] border border-slate-800 space-y-3 text-center">
            <div className="relative h-24 rounded-2xl overflow-hidden bg-indigo-950/60 flex items-center justify-center p-2">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80"
                alt="CII CWL Leadership"
                className="w-full h-full object-cover opacity-80 rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c24] via-transparent to-transparent"></div>
              <div className="absolute bottom-2 left-2 flex items-center space-x-1.5 bg-[#002b49] px-2 py-0.5 rounded border border-sky-400/30">
                <span className="font-black text-white text-[11px] font-serif tracking-widest">CII</span>
              </div>
            </div>

            <div>
              <div className="text-[11px] font-black text-white leading-snug">Confederation of Indian Industry</div>
              <div className="text-[10px] font-medium text-slate-400">Centre for Women Leadership (CII - CWL)</div>
            </div>
          </div>

        </nav>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        {/* Top App Header Bar */}
        <header className="bg-white border-b border-slate-200/80 h-16 px-6 flex items-center justify-end shrink-0 z-30">
          
          {/* Right Header Navigation Controls */}
          <div className="flex items-center space-x-4">

            {/* Notification Bell */}
            <div className="relative p-2 rounded-xl border border-slate-200 bg-white text-slate-600 cursor-pointer hover:bg-slate-50 transition-all">
              <Bell className="w-4.5 h-4.5" />
              <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-black absolute -top-1 -right-1 flex items-center justify-center shadow-xs">
                3
              </span>
            </div>

            {/* User Profile Badge */}
            <div className="flex items-center space-x-3 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-300">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80"
                  alt="Anita Roy (HR VP)"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs font-black text-slate-900">Anita Roy (HR VP)</span>
                  <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded border bg-purple-100 text-purple-700 border-purple-200">
                    ADMIN
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-medium">Tata Consultancy Services</div>
              </div>

              {onLogout && (
                <button
                  onClick={onLogout}
                  title="Logout"
                  className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-slate-200 transition-colors ml-2"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        </header>

        {/* Page Content Body */}
        <main className="p-8 space-y-8 overflow-y-auto flex-1 bg-[#f8f9fd]">
          
          {/* DASHBOARD VIEW (MATCHES REFERENCE UI SCREENSHOT EXACTLY) */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fadeIn pb-12">
              
              {/* 1. Header Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
                    <span>Welcome back, Anita!</span>
                    <span className="text-2xl">👋</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                    Manage your learning sessions, track participant progress, and drive inclusive leadership learning.
                  </p>
                </div>

                {/* Date Filter Dropdown */}
                <div className="flex items-center space-x-2 px-3.5 py-2 rounded-2xl border border-slate-200 bg-white text-xs font-extrabold text-slate-700 cursor-pointer shadow-xs">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Jan 2024 - Oct 2024</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>

              {/* 2. Top Stats Grid (4 Cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                
                {/* Card 1: Total Sessions */}
                <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-purple-100/70 text-[#5551ff] flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center space-x-0.5">
                      <span>↑ 20%</span>
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400">Total Sessions</div>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-3xl font-black text-slate-900">24</span>
                      <svg className="w-16 h-8 text-sky-400" viewBox="0 0 60 30" fill="none">
                        <path d="M5 25 L20 18 L35 22 L55 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="text-[11px] font-bold text-slate-500 mt-2 space-x-1.5 flex items-center">
                      <span className="text-slate-900 font-extrabold">6</span><span>Active</span>
                      <span>•</span>
                      <span className="text-slate-900 font-extrabold">14</span><span>Completed</span>
                      <span>•</span>
                      <span className="text-slate-900 font-extrabold">4</span><span>Scheduled</span>
                    </div>
                  </div>
                </div>

                {/* Card 2: Total Participants */}
                <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-blue-100/70 text-blue-600 flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center space-x-0.5">
                      <span>↑ 32%</span>
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400">Total Participants</div>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-3xl font-black text-slate-900">328</span>
                      <svg className="w-16 h-8 text-emerald-400" viewBox="0 0 60 30" fill="none">
                        <path d="M5 25 L20 20 L35 12 L55 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="text-[11px] font-bold text-slate-500 mt-2 space-x-1.5 flex items-center">
                      <span className="text-slate-900 font-extrabold">248</span><span>Completed</span>
                      <span>•</span>
                      <span className="text-slate-900 font-extrabold">80</span><span>In Progress</span>
                    </div>
                  </div>
                </div>

                {/* Card 3: Completion Rate */}
                <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-100/70 text-emerald-600 flex items-center justify-center">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center space-x-0.5">
                      <span>↑ 12%</span>
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400">Completion Rate</div>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-3xl font-black text-slate-900">76%</span>
                      <svg className="w-16 h-8 text-emerald-400" viewBox="0 0 60 30" fill="none">
                        <path d="M5 22 L20 18 L35 15 L55 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="text-[11px] font-bold text-slate-500 mt-2">
                      <span className="text-slate-900 font-extrabold">248</span> of 328 participants
                    </div>
                  </div>
                </div>

                {/* Card 4: Average Score */}
                <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-amber-100/70 text-amber-600 flex items-center justify-center">
                      <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
                    </div>
                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center space-x-0.5">
                      <span>↑ 18%</span>
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400">Average Score</div>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-3xl font-black text-slate-900">78%</span>
                      <svg className="w-16 h-8 text-orange-400" viewBox="0 0 60 30" fill="none">
                        <path d="M5 25 L20 22 L35 14 L55 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="text-[11px] font-bold text-slate-500 mt-2 space-x-1 flex items-center">
                      <span>Pre:</span> <span className="text-slate-900 font-extrabold">62%</span>
                      <span>•</span>
                      <span>Post:</span> <span className="text-slate-900 font-extrabold">80%</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* 3. Quick Actions Row (4 Action Cards) */}
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center space-x-1.5 mb-3">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Quick Actions</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  <button
                    onClick={() => setActiveTab('sessions')}
                    className="p-4 rounded-2xl bg-purple-50/70 hover:bg-purple-100/70 border border-purple-100/80 text-left transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 rounded-xl bg-purple-500 text-white shadow-xs">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-black text-slate-900">Create New Session</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-purple-600 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => setActiveTab('participants')}
                    className="p-4 rounded-2xl bg-blue-50/70 hover:bg-blue-100/70 border border-blue-100/80 text-left transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 rounded-xl bg-blue-500 text-white shadow-xs">
                        <Users className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-black text-slate-900">Generate Participant Codes</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => setActiveTab('reports')}
                    className="p-4 rounded-2xl bg-amber-50/70 hover:bg-amber-100/70 border border-amber-100/80 text-left transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 rounded-xl bg-amber-500 text-white shadow-xs">
                        <BarChart3 className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-black text-slate-900">View Scores & Results</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => setActiveTab('reports')}
                    className="p-4 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100/70 border border-emerald-100/80 text-left transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 rounded-xl bg-emerald-500 text-white shadow-xs">
                        <Download className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-black text-slate-900">Download Session Report</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                  </button>

                </div>
              </div>

              {/* 4. Middle Section Grid: Recent Sessions Table (2/3) + Right Analytics Column (1/3) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left 2/3 Column: Recent Sessions Table + Feedback & Upcoming Cards */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Recent Sessions Table */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5 text-[#5551ff]" />
                        <h3 className="text-base font-black text-slate-900">Recent Sessions</h3>
                      </div>
                      <button onClick={() => setActiveTab('sessions')} className="text-xs font-extrabold text-[#5551ff] hover:underline cursor-pointer">
                        View All
                      </button>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto mt-2">
                      <table className="w-full text-left text-xs font-medium">
                        <thead>
                          <tr className="text-[10px] font-black uppercase text-slate-400 tracking-wider border-b border-slate-100">
                            <th className="py-3 font-extrabold">SESSION NAME</th>
                            <th className="py-3 font-extrabold">DATE & TIME</th>
                            <th className="py-3 font-extrabold">PARTICIPANTS</th>
                            <th className="py-3 font-extrabold">ROUNDS</th>
                            <th className="py-3 font-extrabold">STATUS</th>
                            <th className="py-3 font-extrabold text-right">ACTIONS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {[
                            { name: 'TCS Leadership Workshop 2026', date: '15 Oct 2024\n10:00 AM', part: '48 / 50', rounds: 10, status: 'Active', statusBadge: 'bg-emerald-100 text-emerald-800', iconColor: 'bg-purple-100 text-purple-600', action: 'View' },
                            { name: 'HR & DEI Training Batch 2', date: '10 Oct 2024\n02:00 PM', part: '36 / 40', rounds: 10, status: 'Completed', statusBadge: 'bg-blue-100 text-blue-800', iconColor: 'bg-emerald-100 text-emerald-600', action: 'View' },
                            { name: 'Management Development Program', date: '05 Oct 2024\n11:00 AM', part: '42 / 45', rounds: 8, status: 'Completed', statusBadge: 'bg-blue-100 text-blue-800', iconColor: 'bg-amber-100 text-amber-600', action: 'View' },
                            { name: 'Women in Leadership Series', date: '28 Sep 2024\n10:00 AM', part: '28 / 30', rounds: 10, status: 'Completed', statusBadge: 'bg-blue-100 text-blue-800', iconColor: 'bg-rose-100 text-rose-600', action: 'View' },
                            { name: 'Inclusive Workplace Program', date: '20 Sep 2024\n03:00 PM', part: '24 / 30', rounds: 10, status: 'Scheduled', statusBadge: 'bg-amber-100 text-amber-800', iconColor: 'bg-sky-100 text-sky-600', action: 'Edit' }
                          ].map((s, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                              <td className="py-4">
                                <div className="flex items-center space-x-3">
                                  <div className={`w-8 h-8 rounded-xl ${s.iconColor} flex items-center justify-center shrink-0`}>
                                    <Users className="w-4 h-4" />
                                  </div>
                                  <span className="font-extrabold text-slate-900 text-xs">{s.name}</span>
                                </div>
                              </td>
                              <td className="py-4 font-bold text-slate-500 whitespace-pre-line text-[11px]">{s.date}</td>
                              <td className="py-4 font-extrabold text-slate-800 text-xs">{s.part}</td>
                              <td className="py-4 font-bold text-slate-600 text-xs">{s.rounds}</td>
                              <td className="py-4">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${s.statusBadge}`}>
                                  {s.status}
                                </span>
                              </td>
                              <td className="py-4 text-right">
                                <div className="flex items-center justify-end space-x-2">
                                  <button className="px-3 py-1 bg-slate-100 hover:bg-[#5551ff] text-slate-700 hover:text-white rounded-lg font-extrabold text-[11px] transition-all cursor-pointer">
                                    {s.action}
                                  </button>
                                  <button className="p-1 hover:bg-slate-200 text-slate-400 hover:text-slate-700 rounded-lg">
                                    <MoreVertical className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Bottom Row Grid (Participant Feedback + Upcoming Sessions) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    {/* Participant Feedback Card */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div className="flex items-center space-x-2">
                          <MessageSquare className="w-4 h-4 text-[#5551ff]" />
                          <h3 className="text-sm font-black text-slate-900">Participant Feedback</h3>
                        </div>
                        <button className="text-xs font-extrabold text-[#5551ff] hover:underline cursor-pointer">
                          View Details
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-2 pt-1 text-center divide-x divide-slate-100">
                        <div className="space-y-1">
                          <div className="text-xl font-black text-slate-900">4.6 / 5</div>
                          <div className="flex items-center justify-center space-x-0.5 text-amber-400">
                            {'★'.repeat(5)}
                          </div>
                        </div>
                        <div className="space-y-1 pl-2">
                          <div className="text-xl font-black text-slate-900">248</div>
                          <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Responses</div>
                        </div>
                        <div className="space-y-1 pl-2">
                          <div className="text-xl font-black text-slate-900">91%</div>
                          <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Would Recommend</div>
                        </div>
                      </div>
                    </div>

                    {/* Upcoming Sessions Card */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-[#5551ff]" />
                          <h3 className="text-sm font-black text-slate-900">Upcoming Sessions</h3>
                        </div>
                        <button onClick={() => setActiveTab('sessions')} className="text-xs font-extrabold text-[#5551ff] hover:underline cursor-pointer">
                          View All
                        </button>
                      </div>

                      <div className="space-y-3 pt-1 text-xs">
                        <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-100/80 hover:bg-slate-100/60 transition-all">
                          <div>
                            <div className="font-extrabold text-slate-900 text-xs">Inclusive Leadership Bootcamp</div>
                            <div className="text-[10px] font-semibold text-slate-400 mt-0.5">25 Oct 2024, 10:00 AM</div>
                          </div>
                          <div className="flex items-center space-x-2 text-slate-600 font-extrabold text-xs">
                            <span className="flex items-center space-x-1">
                              <Users className="w-3.5 h-3.5 text-slate-400" />
                              <span>45</span>
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-100/80 hover:bg-slate-100/60 transition-all">
                          <div>
                            <div className="font-extrabold text-slate-900 text-xs">DEI Champion Program</div>
                            <div className="text-[10px] font-semibold text-slate-400 mt-0.5">30 Oct 2024, 02:00 PM</div>
                          </div>
                          <div className="flex items-center space-x-2 text-slate-600 font-extrabold text-xs">
                            <span className="flex items-center space-x-1">
                              <Users className="w-3.5 h-3.5 text-slate-400" />
                              <span>30</span>
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>


                {/* Right 1/3 Column: Participant Progress + Learning Impact + Top Performing Sessions */}
                <div className="space-y-6">
                  
                  {/* Card 1: Participant Progress (SVG Donut Chart) */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="w-4 h-4 text-[#5551ff]" />
                        <h3 className="text-sm font-black text-slate-900">Participant Progress</h3>
                      </div>
                      <div className="flex items-center space-x-1 text-xs font-bold text-slate-400">
                        <span>This Month</span>
                        <ChevronDown className="w-3 h-3" />
                      </div>
                    </div>

                    {/* SVG Donut Chart */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                      <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="38" stroke="#f1f5f9" strokeWidth="12" fill="none" />
                          <circle cx="50" cy="50" r="38" stroke="#10b981" strokeWidth="12" strokeDasharray="181.4 238.7" strokeDashoffset="0" fill="none" strokeLinecap="round" />
                          <circle cx="50" cy="50" r="38" stroke="#3b82f6" strokeWidth="12" strokeDasharray="42.9 238.7" strokeDashoffset="-181.4" fill="none" strokeLinecap="round" />
                          <circle cx="50" cy="50" r="38" stroke="#f97316" strokeWidth="12" strokeDasharray="14.3 238.7" strokeDashoffset="-224.3" fill="none" strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                          <span className="text-xl font-black text-slate-900 leading-none">328</span>
                          <span className="text-[10px] font-extrabold text-slate-400 mt-0.5">Participants</span>
                        </div>
                      </div>

                      {/* Donut Legend */}
                      <div className="space-y-2 text-xs font-extrabold text-slate-700 w-full sm:w-auto">
                        <div className="flex items-center justify-between sm:justify-start space-x-3">
                          <div className="flex items-center space-x-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                            <span className="text-slate-600">Completed</span>
                          </div>
                          <span className="text-slate-900 font-mono">248 (76%)</span>
                        </div>

                        <div className="flex items-center justify-between sm:justify-start space-x-3">
                          <div className="flex items-center space-x-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0"></span>
                            <span className="text-slate-600">In Progress</span>
                          </div>
                          <span className="text-slate-900 font-mono">60 (18%)</span>
                        </div>

                        <div className="flex items-center justify-between sm:justify-start space-x-3">
                          <div className="flex items-center space-x-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0"></span>
                            <span className="text-slate-600">Not Started</span>
                          </div>
                          <span className="text-slate-900 font-mono">20 (6%)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Learning Impact (Vertical Bar Comparison Chart) */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="w-4 h-4 text-[#5551ff]" />
                        <h3 className="text-sm font-black text-slate-900">Learning Impact</h3>
                      </div>
                      <div className="flex items-center space-x-3 text-[10px] font-bold">
                        <span className="flex items-center space-x-1">
                          <span className="w-2 h-2 rounded-full bg-purple-300"></span>
                          <span className="text-slate-500">Pre-Game Quiz</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <span className="w-2 h-2 rounded-full bg-[#5551ff]"></span>
                          <span className="text-slate-500">Post-Game Quiz</span>
                        </span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-end justify-between h-40 px-2 pb-2 border-b border-slate-100">
                        
                        <div className="flex flex-col items-center space-y-1">
                          <div className="flex items-end space-x-1.5 h-32">
                            <div className="w-5 bg-purple-300 rounded-t-lg relative group flex justify-center" style={{ height: '62%' }}>
                              <span className="absolute -top-5 text-[9px] font-black text-slate-700">62%</span>
                            </div>
                            <div className="w-5 bg-[#5551ff] rounded-t-lg relative group flex justify-center" style={{ height: '78%' }}>
                              <span className="absolute -top-5 text-[9px] font-black text-[#5551ff]">78%</span>
                            </div>
                          </div>
                          <span className="text-[10px] font-extrabold text-slate-400 mt-2">Aug 2024</span>
                        </div>

                        <div className="flex flex-col items-center space-y-1">
                          <div className="flex items-end space-x-1.5 h-32">
                            <div className="w-5 bg-purple-300 rounded-t-lg relative group flex justify-center" style={{ height: '65%' }}>
                              <span className="absolute -top-5 text-[9px] font-black text-slate-700">65%</span>
                            </div>
                            <div className="w-5 bg-[#5551ff] rounded-t-lg relative group flex justify-center" style={{ height: '82%' }}>
                              <span className="absolute -top-5 text-[9px] font-black text-[#5551ff]">82%</span>
                            </div>
                          </div>
                          <span className="text-[10px] font-extrabold text-slate-400 mt-2">Sep 2024</span>
                        </div>

                        <div className="flex flex-col items-center space-y-1">
                          <div className="flex items-end space-x-1.5 h-32">
                            <div className="w-5 bg-purple-300 rounded-t-lg relative group flex justify-center" style={{ height: '68%' }}>
                              <span className="absolute -top-5 text-[9px] font-black text-slate-700">68%</span>
                            </div>
                            <div className="w-5 bg-[#5551ff] rounded-t-lg relative group flex justify-center" style={{ height: '84%' }}>
                              <span className="absolute -top-5 text-[9px] font-black text-[#5551ff]">84%</span>
                            </div>
                          </div>
                          <span className="text-[10px] font-extrabold text-slate-400 mt-2">Oct 2024</span>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* Card 3: Top Performing Sessions */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center space-x-2">
                        <Trophy className="w-4 h-4 text-amber-500" />
                        <h3 className="text-sm font-black text-slate-900">Top Performing Sessions</h3>
                      </div>
                      <button onClick={() => setActiveTab('sessions')} className="text-xs font-extrabold text-[#5551ff] hover:underline cursor-pointer">
                        View All
                      </button>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50/50 border border-amber-100/60">
                        <div className="flex items-center space-x-3">
                          <span className="w-6 h-6 rounded-full bg-amber-400 text-amber-950 font-black text-[11px] flex items-center justify-center shrink-0">1</span>
                          <span className="font-extrabold text-slate-900">TCS Leadership Workshop 2026</span>
                        </div>
                        <span className="font-black text-[#5551ff] text-xs">88% avg. score</span>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-2xl bg-purple-50/50 border border-purple-100/60">
                        <div className="flex items-center space-x-3">
                          <span className="w-6 h-6 rounded-full bg-purple-200 text-purple-900 font-black text-[11px] flex items-center justify-center shrink-0">2</span>
                          <span className="font-extrabold text-slate-900">Women in Leadership Series</span>
                        </div>
                        <span className="font-black text-[#5551ff] text-xs">84% avg. score</span>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="flex items-center space-x-3">
                          <span className="w-6 h-6 rounded-full bg-orange-200 text-orange-950 font-black text-[11px] flex items-center justify-center shrink-0">3</span>
                          <span className="font-extrabold text-slate-900">HR & DEI Training Batch 2</span>
                        </div>
                        <span className="font-black text-[#5551ff] text-xs">79% avg. score</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* SCORES & RESULTS TAB VIEW (MATCHES REFERENCE SCREENSHOT EXACTLY) */}
          {activeTab === 'scores' && (
            <div className="space-y-6 animate-fadeIn pb-12">
              
              {/* 1. Header Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">Scores & Results</h1>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                    View participant scores, learning outcomes, and download detailed reports.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <select
                    value={selectedSessionFilter}
                    onChange={(e) => setSelectedSessionFilter(e.target.value)}
                    className="px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-800 shadow-xs focus:outline-none"
                  >
                    <option value="TCS Leadership Workshop 2026">TCS Leadership Workshop 2026</option>
                    <option value="HR & DEI Training Batch 2">HR & DEI Training Batch 2</option>
                    <option value="Management Development Program">Management Development Program</option>
                  </select>

                  <div className="flex items-center space-x-2 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-extrabold text-slate-700 shadow-xs">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>15 Oct 2024 - 15 Oct 2024</span>
                  </div>

                  <button className="px-5 py-2.5 bg-[#5551ff] hover:bg-indigo-600 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center space-x-2 transition-all cursor-pointer">
                    <Download className="w-4 h-4" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* 2. Top Stats Bar (4 Mini Stat Cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Card 1: Total Participants */}
                <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-xs flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-purple-100/70 text-[#5551ff] flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900">48</div>
                      <div className="text-xs font-bold text-slate-400">Total Participants</div>
                      <div className="text-[10px] text-slate-400">vs previous session</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">↑ 12%</span>
                    <svg className="w-14 h-6 text-purple-400" viewBox="0 0 60 30" fill="none">
                      <path d="M5 25 L20 18 L35 22 L55 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* Card 2: Completed Games */}
                <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-xs flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-100/70 text-emerald-600 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900">36</div>
                      <div className="text-xs font-bold text-slate-400">Completed Games</div>
                      <div className="text-[10px] text-slate-400">75% completion rate</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">↑ 20%</span>
                    <svg className="w-14 h-6 text-emerald-400" viewBox="0 0 60 30" fill="none">
                      <path d="M5 25 L20 20 L35 12 L55 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* Card 3: Average Final Score */}
                <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-xs flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-100/70 text-amber-600 flex items-center justify-center shrink-0">
                      <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900">1,420</div>
                      <div className="text-xs font-bold text-slate-400">Average Final Score</div>
                      <div className="text-[10px] text-slate-400">Out of 2,000</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">↑ 18%</span>
                    <svg className="w-14 h-6 text-orange-400" viewBox="0 0 60 30" fill="none">
                      <path d="M5 25 L20 22 L35 14 L55 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* Card 4: Completion Rate */}
                <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-xs flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-teal-100/70 text-teal-600 flex items-center justify-center shrink-0">
                      <BarChart3 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900">76%</div>
                      <div className="text-xs font-bold text-slate-400">Completion Rate</div>
                      <div className="text-[10px] text-slate-400">36 of 48 participants</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">↑ 14%</span>
                    <svg className="w-14 h-6 text-teal-400" viewBox="0 0 60 30" fill="none">
                      <path d="M5 22 L20 18 L35 15 L55 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

              </div>

              {/* 3. Middle Row: 3 Visual Analytics Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Card 1: Learning Improvement Chart */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-[#5551ff]" />
                      <h3 className="text-sm font-black text-slate-900">Learning Improvement</h3>
                    </div>
                    <div className="flex items-center space-x-3 text-[10px] font-bold">
                      <span className="flex items-center space-x-1">
                        <span className="w-2 h-2 rounded-full bg-purple-300"></span>
                        <span className="text-slate-500">Pre-Game Score</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span className="w-2 h-2 rounded-full bg-[#5551ff]"></span>
                        <span className="text-slate-500">Post-Game Score</span>
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-end justify-between h-40 px-3 pb-2 border-b border-slate-100">
                      
                      <div className="flex flex-col items-center space-y-1">
                        <div className="flex items-end space-x-1.5 h-32">
                          <div className="w-5 bg-purple-300 rounded-t-lg relative flex justify-center" style={{ height: '62%' }}>
                            <span className="absolute -top-5 text-[9px] font-black text-slate-700">62%</span>
                          </div>
                          <div className="w-5 bg-[#5551ff] rounded-t-lg relative flex justify-center" style={{ height: '86%' }}>
                            <span className="absolute -top-5 text-[9px] font-black text-[#5551ff]">86%</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-extrabold text-slate-400 mt-2">All Participants</span>
                      </div>

                      <div className="flex flex-col items-center space-y-1">
                        <div className="flex items-end space-x-1.5 h-32">
                          <div className="w-5 bg-purple-300 rounded-t-lg relative flex justify-center" style={{ height: '68%' }}>
                            <span className="absolute -top-5 text-[9px] font-black text-slate-700">68%</span>
                          </div>
                          <div className="w-5 bg-[#5551ff] rounded-t-lg relative flex justify-center" style={{ height: '92%' }}>
                            <span className="absolute -top-5 text-[9px] font-black text-[#5551ff]">92%</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-extrabold text-slate-400 mt-2">Completed</span>
                      </div>

                      <div className="flex flex-col items-center space-y-1">
                        <div className="flex items-end space-x-1.5 h-32">
                          <div className="w-5 bg-purple-300 rounded-t-lg relative flex justify-center" style={{ height: '54%' }}>
                            <span className="absolute -top-5 text-[9px] font-black text-slate-700">54%</span>
                          </div>
                          <div className="w-5 bg-[#5551ff] rounded-t-lg relative flex justify-center" style={{ height: '72%' }}>
                            <span className="absolute -top-5 text-[9px] font-black text-[#5551ff]">72%</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-extrabold text-slate-400 mt-2">In Progress</span>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Card 2: Score Distribution Donut */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center space-x-2">
                      <PieChart className="w-4 h-4 text-[#5551ff]" />
                      <h3 className="text-sm font-black text-slate-900">Score Distribution</h3>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
                    <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="38" stroke="#f1f5f9" strokeWidth="12" fill="none" />
                        <circle cx="50" cy="50" r="38" stroke="#10b981" strokeWidth="12" strokeDasharray="40.5 238.7" strokeDashoffset="0" fill="none" strokeLinecap="round" />
                        <circle cx="50" cy="50" r="38" stroke="#3b82f6" strokeWidth="12" strokeDasharray="59.6 238.7" strokeDashoffset="-40.5" fill="none" strokeLinecap="round" />
                        <circle cx="50" cy="50" r="38" stroke="#f97316" strokeWidth="12" strokeDasharray="90.7 238.7" strokeDashoffset="-100.1" fill="none" strokeLinecap="round" />
                        <circle cx="50" cy="50" r="38" stroke="#ef4444" strokeWidth="12" strokeDasharray="47.7 238.7" strokeDashoffset="-190.8" fill="none" strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-xl font-black text-slate-900 leading-none">48</span>
                        <span className="text-[10px] font-extrabold text-slate-400 mt-0.5">Participants</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs font-extrabold text-slate-700 w-full sm:w-auto">
                      <div className="flex items-center justify-between sm:justify-start space-x-3">
                        <div className="flex items-center space-x-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                          <span className="text-slate-600">1800 - 2000</span>
                        </div>
                        <span className="text-slate-900 font-mono">8 (17%)</span>
                      </div>

                      <div className="flex items-center justify-between sm:justify-start space-x-3">
                        <div className="flex items-center space-x-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0"></span>
                          <span className="text-slate-600">1500 - 1800</span>
                        </div>
                        <span className="text-slate-900 font-mono">12 (25%)</span>
                      </div>

                      <div className="flex items-center justify-between sm:justify-start space-x-3">
                        <div className="flex items-center space-x-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0"></span>
                          <span className="text-slate-600">1000 - 1500</span>
                        </div>
                        <span className="text-slate-900 font-mono">18 (38%)</span>
                      </div>

                      <div className="flex items-center justify-between sm:justify-start space-x-3">
                        <div className="flex items-center space-x-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0"></span>
                          <span className="text-slate-600">Below 1000</span>
                        </div>
                        <span className="text-slate-900 font-mono">10 (20%)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 3: Top Performers Leaderboard */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-4 h-4 text-amber-500" />
                      <h3 className="text-sm font-black text-slate-900">Top Performers</h3>
                    </div>
                    <button className="text-xs font-extrabold text-[#5551ff] hover:underline cursor-pointer">
                      View All
                    </button>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    {[
                      { rank: 1, avatar: 'PD', name: 'Priya Desai', sub: 'Infosys', score: '1,940', bg: 'bg-amber-400 text-amber-950' },
                      { rank: 2, avatar: 'RA', name: 'Rahul Sharma', sub: 'Tata Consultancy Services', score: '1,850', bg: 'bg-purple-200 text-purple-900' },
                      { rank: 3, avatar: 'MK', name: 'Mohit Kapoor', sub: 'Bajaj Auto', score: '1,720', bg: 'bg-orange-200 text-orange-950' },
                      { rank: 4, avatar: 'SN', name: 'Sneha Nair', sub: 'HCL Technologies', score: '1,690', bg: 'bg-amber-100 text-amber-900' },
                      { rank: 5, avatar: 'VR', name: 'Vikram Reddy', sub: 'Tech Mahindra', score: '1,620', bg: 'bg-slate-200 text-slate-900' }
                    ].map((item) => (
                      <div key={item.rank} className="flex items-center justify-between p-2 rounded-2xl hover:bg-slate-50 transition-all">
                        <div className="flex items-center space-x-3">
                          <span className={`w-5 h-5 rounded-full font-black text-[10px] flex items-center justify-center shrink-0 ${item.bg}`}>
                            {item.rank}
                          </span>
                          <span className="w-7 h-7 rounded-full bg-purple-100 text-[#5551ff] font-extrabold text-[10px] flex items-center justify-center shrink-0">
                            {item.avatar}
                          </span>
                          <div>
                            <div className="font-extrabold text-slate-900 text-xs">{item.name}</div>
                            <div className="text-[10px] font-medium text-slate-400">{item.sub}</div>
                          </div>
                        </div>
                        <span className="font-black text-slate-900 text-xs">{item.score}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* 4. Filter & Search Bar */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-wrap items-center justify-between gap-4">
                
                {/* Filter Tabs */}
                <div className="flex items-center space-x-6 text-xs font-extrabold border-b sm:border-b-0 border-slate-100 pb-2 sm:pb-0">
                  <button
                    onClick={() => setScoresFilterTab('all')}
                    className={`pb-2 -mb-2 transition-all cursor-pointer ${
                      scoresFilterTab === 'all' ? 'text-[#5551ff] border-b-2 border-[#5551ff]' : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    All Results (48)
                  </button>
                  <button
                    onClick={() => setScoresFilterTab('completed')}
                    className={`pb-2 -mb-2 transition-all cursor-pointer ${
                      scoresFilterTab === 'completed' ? 'text-[#5551ff] border-b-2 border-[#5551ff]' : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    Completed (36)
                  </button>
                  <button
                    onClick={() => setScoresFilterTab('inProgress')}
                    className={`pb-2 -mb-2 transition-all cursor-pointer ${
                      scoresFilterTab === 'inProgress' ? 'text-[#5551ff] border-b-2 border-[#5551ff]' : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    In Progress (8)
                  </button>
                  <button
                    onClick={() => setScoresFilterTab('notStarted')}
                    className={`pb-2 -mb-2 transition-all cursor-pointer ${
                      scoresFilterTab === 'notStarted' ? 'text-[#5551ff] border-b-2 border-[#5551ff]' : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    Not Started (4)
                  </button>
                </div>

                {/* Right Controls */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={scoresSearchQuery}
                      onChange={(e) => setScoresSearchQuery(e.target.value)}
                      placeholder="Search participants..."
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#5551ff]"
                    />
                  </div>

                  <select
                    value={scoresStatusFilter}
                    onChange={(e) => setScoresStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
                  >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="inProgress">In Progress</option>
                  </select>

                  <select
                    value={scoresSortBy}
                    onChange={(e) => setScoresSortBy(e.target.value)}
                    className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
                  >
                    <option value="score">Sort by Score</option>
                    <option value="name">Sort by Name</option>
                  </select>
                </div>

              </div>

              {/* 5. Main Grid: Table (2/3) + Detail Panel (1/3) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left 2/3 Column: Results Table */}
                <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between space-y-4">
                  <div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-medium">
                        <thead>
                          <tr className="text-[10px] font-black uppercase text-slate-400 tracking-wider border-b border-slate-100">
                            <th className="py-3 px-2 w-8">
                              <Square className="w-4 h-4 text-slate-300" />
                            </th>
                            <th className="py-3 font-extrabold w-8">#</th>
                            <th className="py-3 font-extrabold">PARTICIPANT</th>
                            <th className="py-3 font-extrabold">ORGANIZATION</th>
                            <th className="py-3 font-extrabold">CODE</th>
                            <th className="py-3 font-extrabold">FINAL SCORE</th>
                            <th className="py-3 font-extrabold">ROUNDS</th>
                            <th className="py-3 font-extrabold">PRE-SCORE</th>
                            <th className="py-3 font-extrabold">POST-SCORE</th>
                            <th className="py-3 font-extrabold">IMPROVEMENT</th>
                            <th className="py-3 font-extrabold">STATUS</th>
                            <th className="py-3 font-extrabold text-right">ACTIONS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {[
                            { rank: 1, id: 'part-2', name: 'Priya Desai', avatar: 'PD', company: 'Infosys', code: 'TYC-4822', score: '1,940', rounds: '10/10', pre: '71%', post: '94%', imp: '+23%', status: 'Completed', statusBadge: 'bg-emerald-100 text-emerald-800' },
                            { rank: 2, id: 'part-1', name: 'Rahul Sharma', avatar: 'RA', company: 'Tata Consultancy Services', code: 'TYC-4821', score: '1,850', rounds: '10/10', pre: '62%', post: '86%', imp: '+24%', status: 'Completed', statusBadge: 'bg-emerald-100 text-emerald-800' },
                            { rank: 3, id: 'part-7', name: 'Mohit Kapoor', avatar: 'MK', company: 'Bajaj Auto', code: 'TYC-4827', score: '1,720', rounds: '10/10', pre: '68%', post: '90%', imp: '+22%', status: 'Completed', statusBadge: 'bg-emerald-100 text-emerald-800' },
                            { rank: 4, id: 'part-4', name: 'Sneha Nair', avatar: 'SN', company: 'HCL Technologies', code: 'TYC-4824', score: '1,690', rounds: '10/10', pre: '65%', post: '88%', imp: '+23%', status: 'Completed', statusBadge: 'bg-emerald-100 text-emerald-800' },
                            { rank: 5, id: 'part-5', name: 'Vikram Reddy', avatar: 'VR', company: 'Tech Mahindra', code: 'TYC-4825', score: '1,620', rounds: '10/10', pre: '58%', post: '82%', imp: '+24%', status: 'Completed', statusBadge: 'bg-emerald-100 text-emerald-800' },
                            { rank: 6, id: 'part-3', name: 'Amit Kumar', avatar: 'AK', company: 'Wipro', code: 'TYC-4823', score: '1,480', rounds: '8/10', pre: '54%', post: '78%', imp: '+24%', status: 'In Progress', statusBadge: 'bg-blue-100 text-blue-800' },
                            { rank: 7, id: 'part-6', name: 'Sunita Patel', avatar: 'SP', company: 'Indian Oil Corporation', code: 'TYC-4826', score: '1,320', rounds: '7/10', pre: '49%', post: '74%', imp: '+25%', status: 'In Progress', statusBadge: 'bg-blue-100 text-blue-800' },
                            { rank: 8, id: 'part-8', name: 'Aisha Khan', avatar: 'AL', company: 'Accenture', code: 'TYC-4828', score: '980', rounds: '5/10', pre: '55%', post: '72%', imp: '+17%', status: 'In Progress', statusBadge: 'bg-blue-100 text-blue-800' }
                          ].map((r) => (
                            <tr
                              key={r.id}
                              onClick={() => setScoresSelectedParticipantId(r.id)}
                              className={`cursor-pointer transition-colors ${
                                scoresSelectedParticipantId === r.id ? 'bg-indigo-50/50' : 'hover:bg-slate-50/80'
                              }`}
                            >
                              <td className="py-4 px-2">
                                <Square className="w-4 h-4 text-slate-300 hover:text-slate-500" />
                              </td>
                              <td className="py-4 font-black text-slate-700 text-xs">{r.rank}</td>
                              <td className="py-4">
                                <div className="flex items-center space-x-2.5">
                                  <span className="w-7 h-7 rounded-full bg-purple-100 text-[#5551ff] font-black text-[10px] flex items-center justify-center shrink-0">
                                    {r.avatar}
                                  </span>
                                  <span className="font-extrabold text-slate-900 text-xs">{r.name}</span>
                                </div>
                              </td>
                              <td className="py-4 font-bold text-slate-600 text-[11px]">{r.company}</td>
                              <td className="py-4 font-mono font-bold text-slate-700 text-xs">{r.code}</td>
                              <td className="py-4 font-black text-slate-900 text-xs">{r.score}</td>
                              <td className="py-4 font-bold text-slate-600 text-xs">{r.rounds}</td>
                              <td className="py-4 font-bold text-slate-700 text-xs">{r.pre}</td>
                              <td className="py-4 font-bold text-slate-700 text-xs">{r.post}</td>
                              <td className="py-4 font-black text-emerald-600 text-xs">{r.imp}</td>
                              <td className="py-4">
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${r.statusBadge}`}>
                                  {r.status}
                                </span>
                              </td>
                              <td className="py-4 text-right">
                                <div className="flex items-center justify-end space-x-2">
                                  <button className="px-3 py-1 bg-slate-100 hover:bg-[#5551ff] text-slate-700 hover:text-white rounded-lg font-extrabold text-[11px] transition-all cursor-pointer">
                                    View Result
                                  </button>
                                  <button className="p-1 hover:bg-slate-200 text-slate-400 hover:text-slate-700 rounded-lg">
                                    <MoreVertical className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Pagination Footer */}
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-slate-500">
                    <div>Showing 1-8 of 48 participants</div>
                    
                    <div className="flex items-center space-x-1.5">
                      <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100">&lt;</button>
                      <button className="w-7 h-7 rounded-lg bg-[#5551ff] text-white font-black flex items-center justify-center">1</button>
                      <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100">2</button>
                      <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100">3</button>
                      <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100">4</button>
                      <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100">5</button>
                      <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100">6</button>
                      <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100">&gt;</button>
                    </div>

                    <div className="flex items-center space-x-1">
                      <select className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-extrabold text-slate-800">
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                      </select>
                      <span>per page</span>
                    </div>
                  </div>
                </div>

                {/* Right 1/3 Column: Selected Result Detail Panel (Priya Desai) */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-5">
                  
                  {/* Header */}
                  <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-11 h-11 rounded-full bg-purple-100 text-[#5551ff] font-black text-sm flex items-center justify-center shrink-0">
                        PD
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-base font-black text-slate-900">Priya Desai</h3>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 flex items-center space-x-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            <span>Completed</span>
                          </span>
                        </div>
                        <div className="text-xs font-bold text-slate-400 mt-0.5">Infosys • TYC-4822</div>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Tabs */}
                  <div className="flex items-center space-x-4 border-b border-slate-100 text-xs font-extrabold">
                    <button
                      onClick={() => setScoresDetailTab('overview')}
                      className={`pb-2.5 -mb-px transition-all cursor-pointer ${
                        scoresDetailTab === 'overview' ? 'text-[#5551ff] border-b-2 border-[#5551ff]' : 'text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setScoresDetailTab('gameDetails')}
                      className={`pb-2.5 -mb-px transition-all cursor-pointer ${
                        scoresDetailTab === 'gameDetails' ? 'text-[#5551ff] border-b-2 border-[#5551ff]' : 'text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      Game Details
                    </button>
                    <button
                      onClick={() => setScoresDetailTab('learning')}
                      className={`pb-2.5 -mb-px transition-all cursor-pointer ${
                        scoresDetailTab === 'learning' ? 'text-[#5551ff] border-b-2 border-[#5551ff]' : 'text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      Learning
                    </button>
                    <button
                      onClick={() => setScoresDetailTab('activity')}
                      className={`pb-2.5 -mb-px transition-all cursor-pointer ${
                        scoresDetailTab === 'activity' ? 'text-[#5551ff] border-b-2 border-[#5551ff]' : 'text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      Activity
                    </button>
                  </div>

                  {/* Participant Information */}
                  <div className="space-y-2 text-xs font-medium border-b border-slate-100 pb-4">
                    <h4 className="text-xs font-black text-slate-900 flex items-center space-x-1.5 mb-2">
                      <Users className="w-3.5 h-3.5 text-[#5551ff]" />
                      <span>Participant Information</span>
                    </h4>

                    <div className="flex justify-between py-0.5">
                      <span className="text-slate-400 font-bold">Name</span>
                      <span className="font-extrabold text-slate-900">Priya Desai</span>
                    </div>

                    <div className="flex justify-between py-0.5">
                      <span className="text-slate-400 font-bold">Organization</span>
                      <span className="font-extrabold text-slate-900">Infosys</span>
                    </div>

                    <div className="flex justify-between py-0.5">
                      <span className="text-slate-400 font-bold">Email</span>
                      <span className="font-extrabold text-slate-900">priya.desai@infosys.com</span>
                    </div>

                    <div className="flex justify-between py-0.5">
                      <span className="text-slate-400 font-bold">Country</span>
                      <span className="font-extrabold text-slate-900">India</span>
                    </div>

                    <div className="flex justify-between py-0.5">
                      <span className="text-slate-400 font-bold">Joined On</span>
                      <span className="font-extrabold text-slate-900">15 Oct 2024, 10:02 AM</span>
                    </div>

                    <div className="flex justify-between py-0.5">
                      <span className="text-slate-400 font-bold">Participant Code</span>
                      <span className="font-mono font-bold text-slate-900">TYC-4822</span>
                    </div>
                  </div>

                  {/* Game Performance Card */}
                  <div className="space-y-3 border-b border-slate-100 pb-4">
                    <h4 className="text-xs font-black text-slate-900 flex items-center space-x-1.5">
                      <Trophy className="w-3.5 h-3.5 text-amber-500" />
                      <span>Game Performance</span>
                    </h4>

                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="p-2 rounded-2xl bg-amber-50 border border-amber-100">
                        <Trophy className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                        <div className="text-base font-black text-slate-900">1,940</div>
                        <div className="text-[8px] font-bold text-slate-500">Final Score</div>
                      </div>

                      <div className="p-2 rounded-2xl bg-emerald-50 border border-emerald-100">
                        <GraduationCap className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                        <div className="text-base font-black text-slate-900">10 / 10</div>
                        <div className="text-[8px] font-bold text-slate-500">Rounds Completed</div>
                      </div>

                      <div className="p-2 rounded-2xl bg-blue-50 border border-blue-100">
                        <Target className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                        <div className="text-base font-black text-slate-900">12</div>
                        <div className="text-[8px] font-bold text-slate-500">Decisions Made</div>
                      </div>

                      <div className="p-2 rounded-2xl bg-purple-50 border border-purple-100">
                        <Zap className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                        <div className="text-base font-black text-slate-900">3</div>
                        <div className="text-[8px] font-bold text-slate-500">Events Encountered</div>
                      </div>
                    </div>

                    {/* Score Breakdown Bars */}
                    <div className="space-y-2 pt-2 text-xs font-extrabold">
                      <div className="text-[11px] font-black text-slate-900">Score Breakdown</div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-slate-600">
                          <span>Business Impact</span>
                          <span className="font-mono font-black text-slate-900">680</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600" style={{ width: '85%' }}></div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-slate-600">
                          <span>Inclusion Impact</span>
                          <span className="font-mono font-black text-slate-900">520</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-sky-500" style={{ width: '70%' }}></div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-slate-600">
                          <span>Talent Impact</span>
                          <span className="font-mono font-black text-slate-900">420</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: '55%' }}></div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-slate-600">
                          <span>Brand & Reputation</span>
                          <span className="font-mono font-black text-slate-900">320</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-orange-500" style={{ width: '45%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Learning Improvement Card */}
                  <div className="space-y-3 border-b border-slate-100 pb-4">
                    <h4 className="text-xs font-black text-slate-900 flex items-center space-x-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                      <span>Learning Improvement</span>
                    </h4>

                    <div className="grid grid-cols-3 gap-2 items-center text-center">
                      <div className="p-2.5 rounded-2xl bg-purple-50 border border-purple-100">
                        <div className="text-base font-black text-slate-900">71%</div>
                        <div className="text-[9px] font-bold text-slate-500">Pre-Game Score</div>
                      </div>

                      <div className="p-2.5 rounded-2xl bg-indigo-50 border border-indigo-100">
                        <div className="text-base font-black text-slate-900">94%</div>
                        <div className="text-[9px] font-bold text-slate-500">Post-Game Score</div>
                      </div>

                      <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-100">
                        <div className="text-base font-black text-emerald-600">+23%</div>
                        <div className="text-[9px] font-bold text-emerald-700">Improvement</div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Section */}
                  <div className="space-y-2 pt-1">
                    <button className="w-full py-2.5 bg-[#5551ff] hover:bg-indigo-600 text-white rounded-xl text-xs font-black shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer">
                      <Download className="w-4 h-4" />
                      <span>Download Individual Result</span>
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button className="py-2 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-extrabold flex items-center justify-center space-x-1 cursor-pointer">
                        <BarChart3 className="w-3.5 h-3.5 text-slate-500" />
                        <span>View Game Progress</span>
                      </button>

                      <button className="py-2 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-extrabold flex items-center justify-center space-x-1 cursor-pointer">
                        <Mail className="w-3.5 h-3.5 text-slate-500" />
                        <span>Resend Code</span>
                      </button>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}
          {activeTab === 'sessions' && (
            <div className="space-y-6 animate-fadeIn pb-12">
              
              {/* 1. Header Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">Sessions Management</h1>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                    Create and manage learning sessions, generate participant codes, monitor live progress, and download results.
                  </p>
                </div>

                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-5 py-2.5 bg-[#5551ff] hover:bg-indigo-600 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center space-x-2 transition-all cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Session</span>
                </button>
              </div>

              {/* 2. Top Stats Bar (4 Mini Stat Cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Card 1: Total Sessions */}
                <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-xs flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-purple-100/70 text-[#5551ff] flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900">24</div>
                      <div className="text-xs font-bold text-slate-400">Total Sessions</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">↑ 20%</span>
                    <svg className="w-14 h-6 text-sky-400" viewBox="0 0 60 30" fill="none">
                      <path d="M5 25 L20 18 L35 22 L55 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* Card 2: Active Sessions */}
                <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-xs flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-100/70 text-blue-600 flex items-center justify-center shrink-0">
                      <PlayCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900">6</div>
                      <div className="text-xs font-bold text-slate-400">Active Sessions</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">↑ 50%</span>
                    <svg className="w-14 h-6 text-emerald-400" viewBox="0 0 60 30" fill="none">
                      <path d="M5 25 L20 20 L35 12 L55 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* Card 3: Completed Sessions */}
                <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-xs flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-100/70 text-emerald-600 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900">14</div>
                      <div className="text-xs font-bold text-slate-400">Completed Sessions</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">↑ 18%</span>
                    <svg className="w-14 h-6 text-sky-400" viewBox="0 0 60 30" fill="none">
                      <path d="M5 22 L20 18 L35 15 L55 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* Card 4: Scheduled Sessions */}
                <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-xs flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-orange-100/70 text-orange-600 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900">4</div>
                      <div className="text-xs font-bold text-slate-400">Scheduled Sessions</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className="text-xs font-black text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">↑ 0%</span>
                    <svg className="w-14 h-6 text-purple-400" viewBox="0 0 60 30" fill="none">
                      <path d="M5 25 L20 22 L35 18 L55 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

              </div>

              {/* 3. Filters & Search Bar Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                
                {/* Filter Tabs */}
                <div className="flex items-center space-x-6 border-b border-slate-100 pb-3 text-xs font-extrabold">
                  <button
                    onClick={() => setSessionFilterTab('all')}
                    className={`pb-3 -mb-3 transition-all cursor-pointer ${
                      sessionFilterTab === 'all' ? 'text-[#5551ff] border-b-2 border-[#5551ff]' : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    All Sessions (24)
                  </button>
                  <button
                    onClick={() => setSessionFilterTab('active')}
                    className={`pb-3 -mb-3 transition-all cursor-pointer ${
                      sessionFilterTab === 'active' ? 'text-[#5551ff] border-b-2 border-[#5551ff]' : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    Active (6)
                  </button>
                  <button
                    onClick={() => setSessionFilterTab('completed')}
                    className={`pb-3 -mb-3 transition-all cursor-pointer ${
                      sessionFilterTab === 'completed' ? 'text-[#5551ff] border-b-2 border-[#5551ff]' : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    Completed (14)
                  </button>
                  <button
                    onClick={() => setSessionFilterTab('scheduled')}
                    className={`pb-3 -mb-3 transition-all cursor-pointer ${
                      sessionFilterTab === 'scheduled' ? 'text-[#5551ff] border-b-2 border-[#5551ff]' : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    Scheduled (4)
                  </button>
                </div>

                {/* Controls Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  
                  <div className="flex flex-wrap items-center gap-3 flex-1 min-w-0">
                    <div className="relative w-64 min-w-[200px]">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search sessions..."
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#5551ff]"
                      />
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <span className="text-[10px] font-black uppercase text-slate-400">Session Type</span>
                      <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
                      >
                        <option value="all">All Types</option>
                        <option value="multiplayer">Multiplayer</option>
                        <option value="individual">Individual</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <span className="text-[10px] font-black uppercase text-slate-400">Status</span>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
                      >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                        <option value="scheduled">Scheduled</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-extrabold text-slate-700 cursor-pointer">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span>Jan 2024 - Oct 2024</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="px-4 py-2 bg-[#5551ff] hover:bg-indigo-600 text-white rounded-xl text-xs font-black shadow-xs flex items-center space-x-1.5 cursor-pointer">
                      <Filter className="w-3.5 h-3.5" />
                      <span>Apply Filters</span>
                    </button>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setTypeFilter('all');
                        setStatusFilter('all');
                        setSessionFilterTab('all');
                      }}
                      className="px-3 py-2 text-slate-500 hover:text-slate-900 text-xs font-extrabold cursor-pointer"
                    >
                      Reset
                    </button>
                  </div>

                </div>

              </div>

              {/* 4. Main Grid: Left Table (2/3) + Right Detail Panel (1/3) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left 2/3 Column: Sessions Table */}
                <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between space-y-4">
                  <div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-medium">
                        <thead>
                          <tr className="text-[10px] font-black uppercase text-slate-400 tracking-wider border-b border-slate-100">
                            <th className="py-3 px-2 w-8">
                              <Square className="w-4 h-4 text-slate-300" />
                            </th>
                            <th className="py-3 font-extrabold">SESSION NAME</th>
                            <th className="py-3 font-extrabold">DATE & TIME</th>
                            <th className="py-3 font-extrabold">TYPE</th>
                            <th className="py-3 font-extrabold">PARTICIPANTS</th>
                            <th className="py-3 font-extrabold">ROUNDS</th>
                            <th className="py-3 font-extrabold">STATUS</th>
                            <th className="py-3 font-extrabold text-right">ACTIONS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {[
                            { id: 'session-1', name: 'TCS Leadership Workshop 2026', sub: 'Leadership Development Program', date: '15 Oct 2024\n10:00 AM - 12:00 PM', type: 'Multiplayer', typeBadge: 'bg-purple-100 text-purple-700', part: '48 / 50', rounds: 10, status: 'Active', statusBadge: 'bg-emerald-100 text-emerald-800', dot: 'bg-emerald-500', action: 'View' },
                            { id: 'session-2', name: 'HR & DEI Training Batch 2', sub: 'DEI Awareness Program', date: '10 Oct 2024\n02:00 PM - 04:00 PM', type: 'Multiplayer', typeBadge: 'bg-purple-100 text-purple-700', part: '36 / 40', rounds: 10, status: 'Completed', statusBadge: 'bg-blue-100 text-blue-800', dot: 'bg-blue-500', action: 'View' },
                            { id: 'session-3', name: 'Management Development Program', sub: 'Inclusive Leadership', date: '05 Oct 2024\n11:00 AM - 01:00 PM', type: 'Multiplayer', typeBadge: 'bg-purple-100 text-purple-700', part: '42 / 45', rounds: 8, status: 'Completed', statusBadge: 'bg-blue-100 text-blue-800', dot: 'bg-blue-500', action: 'View' },
                            { id: 'session-4', name: 'Women in Leadership Series', sub: 'Women Leadership Initiative', date: '28 Sep 2024\n10:00 AM - 12:00 PM', type: 'Multiplayer', typeBadge: 'bg-purple-100 text-purple-700', part: '28 / 30', rounds: 10, status: 'Completed', statusBadge: 'bg-blue-100 text-blue-800', dot: 'bg-blue-500', action: 'View' },
                            { id: 'session-5', name: 'Inclusive Workplace Program', sub: 'Organization-Wide Training', date: '20 Sep 2024\n03:00 PM - 05:00 PM', type: 'Individual', typeBadge: 'bg-sky-100 text-sky-700', part: '24 / 30', rounds: 10, status: 'Scheduled', statusBadge: 'bg-orange-100 text-orange-800', dot: 'bg-orange-500', action: 'Edit' },
                            { id: 'session-6', name: 'DEI Champions Program', sub: 'HR Team Training', date: '12 Sep 2024\n11:00 AM - 01:00 PM', type: 'Multiplayer', typeBadge: 'bg-purple-100 text-purple-700', part: '30 / 30', rounds: 10, status: 'Completed', statusBadge: 'bg-blue-100 text-blue-800', dot: 'bg-blue-500', action: 'View' },
                            { id: 'session-7', name: 'Building Inclusive Culture', sub: 'Managers Training', date: '05 Sep 2024\n02:00 PM - 04:00 PM', type: 'Individual', typeBadge: 'bg-sky-100 text-sky-700', part: '18 / 20', rounds: 8, status: 'Completed', statusBadge: 'bg-blue-100 text-blue-800', dot: 'bg-blue-500', action: 'View' },
                            { id: 'session-8', name: 'Student Leadership Bootcamp', sub: 'University Program', date: '28 Aug 2024\n10:00 AM - 12:00 PM', type: 'Multiplayer', typeBadge: 'bg-purple-100 text-purple-700', part: '100 / 100', rounds: 10, status: 'Completed', statusBadge: 'bg-blue-100 text-blue-800', dot: 'bg-blue-500', action: 'View' }
                          ].map((s) => (
                            <tr
                              key={s.id}
                              onClick={() => setSelectedSessionId(s.id)}
                              className={`cursor-pointer transition-colors ${
                                selectedSessionId === s.id ? 'bg-indigo-50/50' : 'hover:bg-slate-50/80'
                              }`}
                            >
                              <td className="py-4 px-2">
                                <Square className="w-4 h-4 text-slate-300 hover:text-slate-500" />
                              </td>
                              <td className="py-4">
                                <div className="font-extrabold text-slate-900 text-xs">{s.name}</div>
                                <div className="text-[10px] font-medium text-slate-400 mt-0.5">{s.sub}</div>
                              </td>
                              <td className="py-4 font-bold text-slate-500 whitespace-pre-line text-[11px]">{s.date}</td>
                              <td className="py-4">
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${s.typeBadge}`}>
                                  {s.type}
                                </span>
                              </td>
                              <td className="py-4 font-extrabold text-slate-800 text-xs">{s.part}</td>
                              <td className="py-4 font-bold text-slate-600 text-xs">{s.rounds}</td>
                              <td className="py-4">
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black flex items-center space-x-1 w-max ${s.statusBadge}`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`}></span>
                                  <span>{s.status}</span>
                                </span>
                              </td>
                              <td className="py-4 text-right">
                                <div className="flex items-center justify-end space-x-2">
                                  <button className="px-3 py-1 bg-slate-100 hover:bg-[#5551ff] text-slate-700 hover:text-white rounded-lg font-extrabold text-[11px] transition-all cursor-pointer">
                                    {s.action}
                                  </button>
                                  <button className="p-1 hover:bg-slate-200 text-slate-400 hover:text-slate-700 rounded-lg">
                                    <MoreVertical className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Pagination Footer */}
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-slate-500">
                    <div>Showing 1-8 of 24 sessions</div>
                    
                    <div className="flex items-center space-x-1.5">
                      <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100">&lt;</button>
                      <button className="w-7 h-7 rounded-lg bg-[#5551ff] text-white font-black flex items-center justify-center">1</button>
                      <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100">2</button>
                      <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100">3</button>
                      <span className="px-1 text-slate-400">...</span>
                      <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100">&gt;</button>
                    </div>

                    <div className="flex items-center space-x-1">
                      <select className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-extrabold text-slate-800">
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                      </select>
                      <span>per page</span>
                    </div>
                  </div>
                </div>

                {/* Right 1/3 Column: Selected Session Details Panel */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-5">
                  
                  {/* Drawer Header */}
                  <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="text-base font-black text-slate-900">TCS Leadership Workshop 2026</h3>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 flex items-center space-x-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <span>Active</span>
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black border border-purple-300 text-purple-700 bg-purple-50">
                          Multiplayer Session
                        </span>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Drawer Tabs */}
                  <div className="flex items-center space-x-4 border-b border-slate-100 text-xs font-extrabold">
                    <button
                      onClick={() => setDetailTab('overview')}
                      className={`pb-2.5 -mb-px transition-all cursor-pointer ${
                        detailTab === 'overview' ? 'text-[#5551ff] border-b-2 border-[#5551ff]' : 'text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setDetailTab('participants')}
                      className={`pb-2.5 -mb-px transition-all cursor-pointer ${
                        detailTab === 'participants' ? 'text-[#5551ff] border-b-2 border-[#5551ff]' : 'text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      Participants
                    </button>
                    <button
                      onClick={() => setDetailTab('codes')}
                      className={`pb-2.5 -mb-px transition-all cursor-pointer ${
                        detailTab === 'codes' ? 'text-[#5551ff] border-b-2 border-[#5551ff]' : 'text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      Codes
                    </button>
                    <button
                      onClick={() => setDetailTab('liveProgress')}
                      className={`pb-2.5 -mb-px transition-all cursor-pointer ${
                        detailTab === 'liveProgress' ? 'text-[#5551ff] border-b-2 border-[#5551ff]' : 'text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      Live Progress
                    </button>
                  </div>

                  {/* Overview Key-Value Details */}
                  <div className="space-y-2.5 text-xs font-medium border-b border-slate-100 pb-4">
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400 font-bold flex items-center space-x-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>Session Name</span>
                      </span>
                      <span className="font-extrabold text-slate-900">TCS Leadership Workshop 2026</span>
                    </div>

                    <div className="flex justify-between py-1">
                      <span className="text-slate-400 font-bold flex items-center space-x-1.5">
                        <FileText className="w-3.5 h-3.5 text-slate-400" />
                        <span>Description</span>
                      </span>
                      <span className="font-bold text-slate-700 text-right max-w-[200px]">Leadership development program focusing on inclusive workplaces and gender parity.</span>
                    </div>

                    <div className="flex justify-between py-1">
                      <span className="text-slate-400 font-bold flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>Date & Time</span>
                      </span>
                      <span className="font-extrabold text-slate-900">15 Oct 2024, 10:00 AM - 12:00 PM</span>
                    </div>

                    <div className="flex justify-between py-1">
                      <span className="text-slate-400 font-bold flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Rounds</span>
                      </span>
                      <span className="font-extrabold text-slate-900">10 Rounds</span>
                    </div>

                    <div className="flex justify-between py-1">
                      <span className="text-slate-400 font-bold flex items-center space-x-1.5">
                        <Gamepad2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>Session Type</span>
                      </span>
                      <span className="font-extrabold text-slate-900">Multiplayer (Standard Game)</span>
                    </div>

                    <div className="flex justify-between py-1">
                      <span className="text-slate-400 font-bold flex items-center space-x-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>Participants</span>
                      </span>
                      <span className="font-extrabold text-slate-900">48 / 50</span>
                    </div>

                    <div className="flex justify-between py-1">
                      <span className="text-slate-400 font-bold flex items-center space-x-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>Created By</span>
                      </span>
                      <span className="font-extrabold text-slate-900">Anita Roy (HR VP)</span>
                    </div>

                    <div className="flex justify-between py-1">
                      <span className="text-slate-400 font-bold flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>Created On</span>
                      </span>
                      <span className="font-extrabold text-slate-900">01 Oct 2024, 04:30 PM</span>
                    </div>
                  </div>

                  {/* Participant Codes Box */}
                  <div className="space-y-3 border-b border-slate-100 pb-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black text-slate-900 flex items-center space-x-1.5">
                        <Users className="w-3.5 h-3.5 text-[#5551ff]" />
                        <span>Participant Codes</span>
                      </h4>
                      <button className="text-[11px] font-extrabold text-[#5551ff] hover:underline cursor-pointer">
                        View All
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-100 text-center">
                        <Users className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                        <div className="text-lg font-black text-slate-900">48</div>
                        <div className="text-[9px] font-bold text-slate-500">Used Codes</div>
                      </div>

                      <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center">
                        <RefreshCw className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                        <div className="text-lg font-black text-slate-900">0</div>
                        <div className="text-[9px] font-bold text-slate-500">Unused Codes</div>
                      </div>

                      <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-100 text-center">
                        <Copy className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                        <div className="text-lg font-black text-slate-900">2</div>
                        <div className="text-[9px] font-bold text-slate-500">Total Codes</div>
                      </div>
                    </div>

                    <button className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 rounded-xl text-xs font-extrabold transition-all cursor-pointer">
                      Generate More Codes
                    </button>
                  </div>

                  {/* Quick Actions Grid */}
                  <div className="space-y-3 border-b border-slate-100 pb-4">
                    <h4 className="text-xs font-black text-slate-900 flex items-center space-x-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span>Quick Actions</span>
                    </h4>

                    <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
                      <button className="p-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 text-emerald-700 flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer">
                        <PlayCircle className="w-5 h-5 text-emerald-600" />
                        <span>View Live Session</span>
                      </button>

                      <button className="p-2.5 rounded-2xl bg-purple-50 hover:bg-purple-100 border border-purple-100 text-purple-700 flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer">
                        <Edit3 className="w-5 h-5 text-purple-600" />
                        <span>Edit Session</span>
                      </button>

                      <button className="p-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-100 text-rose-700 flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer">
                        <Square className="w-5 h-5 text-rose-600 fill-rose-500" />
                        <span>End Session</span>
                      </button>

                      <button className="p-2.5 rounded-2xl bg-blue-50 hover:bg-blue-100 border border-blue-100 text-blue-700 flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer">
                        <Copy className="w-5 h-5 text-blue-600" />
                        <span>Duplicate Session</span>
                      </button>
                    </div>
                  </div>

                  {/* Download Reports Accordion */}
                  <div className="pt-1">
                    <button className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-black text-slate-800 flex items-center justify-between transition-all cursor-pointer">
                      <span className="flex items-center space-x-2">
                        <Download className="w-4 h-4 text-[#5551ff]" />
                        <span>Download Reports</span>
                      </span>
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>

                </div>

              </div>

              {/* Modal for Creating Session */}
              {showCreateModal && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h3 className="text-lg font-black text-slate-900">Create New Corporate Session</h3>
                      <button onClick={() => setShowCreateModal(false)} className="p-1 text-slate-400 hover:text-slate-700">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-4 text-xs font-bold">
                      <div>
                        <label className="block text-slate-600 mb-1">Session Title</label>
                        <input
                          type="text"
                          value={newSessionName}
                          onChange={(e) => setNewSessionName(e.target.value)}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-600 mb-1">Game Rounds</label>
                        <select
                          value={maxTurns}
                          onChange={(e) => setMaxTurns(Number(e.target.value))}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                        >
                          <option value={5}>5 Turns (Express)</option>
                          <option value={10}>10 Turns (Standard)</option>
                          <option value={15}>15 Turns (Masterclass)</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
                      <button
                        onClick={() => setShowCreateModal(false)}
                        className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-extrabold text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          handleCreateSession();
                          setShowCreateModal(false);
                        }}
                        className="px-5 py-2.5 rounded-xl bg-[#5551ff] text-white font-extrabold text-xs shadow-md"
                      >
                        {creating ? 'Creating...' : 'Create Session'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* PARTICIPANTS & PARTICIPANT CODES TAB VIEW (MATCHES REFERENCE SCREENSHOT EXACTLY) */}
          {activeTab === 'participants' && (
            <div className="space-y-6 animate-fadeIn pb-12">
              
              {/* 1. Header Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">Participants & Participant Codes</h1>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                    Manage participants, generate codes, track game progress, and monitor learning outcomes.
                  </p>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <select
                    value={selectedSessionFilter}
                    onChange={(e) => setSelectedSessionFilter(e.target.value)}
                    className="px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-800 shadow-xs focus:outline-none"
                  >
                    <option value="TCS Leadership Workshop 2026">TCS Leadership Workshop 2026</option>
                    <option value="HR & DEI Training Batch 2">HR & DEI Training Batch 2</option>
                    <option value="Management Development Program">Management Development Program</option>
                  </select>

                  <button className="px-5 py-2.5 bg-[#5551ff] hover:bg-indigo-600 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center space-x-2 transition-all cursor-pointer">
                    <Plus className="w-4 h-4" />
                    <span>Generate Codes</span>
                  </button>
                </div>
              </div>

              {/* 2. Top Stats Bar (4 Mini Stat Cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Card 1: Total Participants */}
                <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-xs flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-purple-100/70 text-[#5551ff] flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900">48</div>
                      <div className="text-xs font-bold text-slate-400">Total Participants</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">↑ 12%</span>
                    <svg className="w-14 h-6 text-purple-400" viewBox="0 0 60 30" fill="none">
                      <path d="M5 25 L20 18 L35 22 L55 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* Card 2: Completed */}
                <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-xs flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-100/70 text-emerald-600 flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900">36</div>
                      <div className="text-xs font-bold text-slate-400">Completed</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">↑ 25%</span>
                    <svg className="w-14 h-6 text-emerald-400" viewBox="0 0 60 30" fill="none">
                      <path d="M5 25 L20 20 L35 12 L55 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* Card 3: In Progress */}
                <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-xs flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-100/70 text-blue-600 flex items-center justify-center shrink-0">
                      <PlayCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900">8</div>
                      <div className="text-xs font-bold text-slate-400">In Progress</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className="text-xs font-black text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">↑ 0%</span>
                    <svg className="w-14 h-6 text-sky-400" viewBox="0 0 60 30" fill="none">
                      <path d="M5 22 L20 18 L35 15 L55 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* Card 4: Not Started */}
                <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-xs flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-orange-100/70 text-orange-600 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900">4</div>
                      <div className="text-xs font-bold text-slate-400">Not Started</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className="text-xs font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">↓ 20%</span>
                    <svg className="w-14 h-6 text-orange-400" viewBox="0 0 60 30" fill="none">
                      <path d="M5 10 L20 15 L35 22 L55 25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

              </div>

              {/* 3. Middle Generator & Sharing Cards Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Card 1: Participant Codes (Generator) */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                  <div className="flex items-start space-x-3 border-b border-slate-100 pb-3">
                    <div className="p-2.5 rounded-2xl bg-orange-100 text-orange-600 shrink-0">
                      <Key className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-900">Participant Codes</h3>
                      <p className="text-xs text-slate-400 font-medium">Generate unique codes for participants to join sessions</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                    <div className="flex items-center space-x-3">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Number of Codes</label>
                        <input
                          type="number"
                          value={numCodesToGenerate}
                          onChange={(e) => setNumCodesToGenerate(Number(e.target.value))}
                          className="w-20 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-extrabold text-slate-900 text-center"
                        />
                      </div>
                      <button className="px-5 py-2 bg-[#5551ff] hover:bg-indigo-600 text-white rounded-xl text-xs font-black shadow-xs cursor-pointer mt-4">
                        Generate Codes
                      </button>
                    </div>

                    <div className="flex items-center space-x-2 text-center text-xs">
                      <div className="px-3 py-2 rounded-2xl bg-purple-50 border border-purple-100">
                        <div className="font-black text-slate-900">48</div>
                        <div className="text-[9px] font-extrabold text-slate-400">Used Codes</div>
                      </div>
                      <div className="px-3 py-2 rounded-2xl bg-emerald-50 border border-emerald-100">
                        <div className="font-black text-slate-900">2</div>
                        <div className="text-[9px] font-extrabold text-slate-400">Unused Codes</div>
                      </div>
                      <div className="px-3 py-2 rounded-2xl bg-blue-50 border border-blue-100">
                        <div className="font-black text-slate-900">50</div>
                        <div className="text-[9px] font-extrabold text-slate-400">Total Codes</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2: Share with Participants */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                  <div className="flex items-start space-x-3 border-b border-slate-100 pb-3">
                    <div className="p-2.5 rounded-2xl bg-purple-100 text-[#5551ff] shrink-0">
                      <Send className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-900">Share with Participants</h3>
                      <p className="text-xs text-slate-400 font-medium">Share these codes with your participants</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <button className="py-2.5 px-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-black flex items-center justify-center space-x-1.5 cursor-pointer">
                      <Download className="w-4 h-4 text-slate-500" />
                      <span>Download Codes</span>
                    </button>

                    <button className="py-2.5 px-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-black flex items-center justify-center space-x-1.5 cursor-pointer">
                      <Copy className="w-4 h-4 text-slate-500" />
                      <span>Copy Codes</span>
                    </button>

                    <button className="py-2.5 px-3 rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 text-[#5551ff] text-xs font-black flex items-center justify-center space-x-1.5 cursor-pointer">
                      <Mail className="w-4 h-4 text-[#5551ff]" />
                      <span>Send via Email</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* 4. Filter & Search Bar */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-wrap items-center justify-between gap-4">
                
                {/* Filter Tabs */}
                <div className="flex items-center space-x-6 text-xs font-extrabold border-b sm:border-b-0 border-slate-100 pb-2 sm:pb-0">
                  <button
                    onClick={() => setParticipantFilterTab('all')}
                    className={`pb-2 -mb-2 transition-all cursor-pointer ${
                      participantFilterTab === 'all' ? 'text-[#5551ff] border-b-2 border-[#5551ff]' : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    All Participants (48)
                  </button>
                  <button
                    onClick={() => setParticipantFilterTab('completed')}
                    className={`pb-2 -mb-2 transition-all cursor-pointer ${
                      participantFilterTab === 'completed' ? 'text-[#5551ff] border-b-2 border-[#5551ff]' : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    Completed (36)
                  </button>
                  <button
                    onClick={() => setParticipantFilterTab('inProgress')}
                    className={`pb-2 -mb-2 transition-all cursor-pointer ${
                      participantFilterTab === 'inProgress' ? 'text-[#5551ff] border-b-2 border-[#5551ff]' : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    In Progress (8)
                  </button>
                  <button
                    onClick={() => setParticipantFilterTab('notStarted')}
                    className={`pb-2 -mb-2 transition-all cursor-pointer ${
                      participantFilterTab === 'notStarted' ? 'text-[#5551ff] border-b-2 border-[#5551ff]' : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    Not Started (4)
                  </button>
                </div>

                {/* Search & Filter Right Actions */}
                <div className="flex items-center space-x-3">
                  <div className="relative w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={participantSearch}
                      onChange={(e) => setParticipantSearch(e.target.value)}
                      placeholder="Search participants..."
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#5551ff]"
                    />
                  </div>

                  <button className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-extrabold text-slate-700 flex items-center space-x-1.5 hover:bg-slate-100 cursor-pointer">
                    <Filter className="w-3.5 h-3.5 text-slate-400" />
                    <span>Filter</span>
                  </button>

                  <button className="p-2 border border-slate-200 rounded-xl text-slate-400 hover:text-slate-700">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* 5. Main Grid: Table (2/3) + Detail Drawer (1/3) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left 2/3 Column: Participants Table */}
                <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between space-y-4">
                  <div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-medium">
                        <thead>
                          <tr className="text-[10px] font-black uppercase text-slate-400 tracking-wider border-b border-slate-100">
                            <th className="py-3 px-2 w-8">
                              <Square className="w-4 h-4 text-slate-300" />
                            </th>
                            <th className="py-3 font-extrabold">NAME</th>
                            <th className="py-3 font-extrabold">COMPANY / INSTITUTION</th>
                            <th className="py-3 font-extrabold">EMAIL</th>
                            <th className="py-3 font-extrabold">CODE</th>
                            <th className="py-3 font-extrabold">PROGRESS</th>
                            <th className="py-3 font-extrabold">PRE QUIZ</th>
                            <th className="py-3 font-extrabold">POST QUIZ</th>
                            <th className="py-3 font-extrabold">SCORE</th>
                            <th className="py-3 font-extrabold">STATUS</th>
                            <th className="py-3 font-extrabold">LAST ACTIVITY</th>
                            <th className="py-3 font-extrabold text-right">ACTIONS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {[
                            { id: 'part-1', name: 'Rahul Sharma', avatar: 'RA', bg: 'bg-purple-100 text-purple-700', company: 'Tata Consultancy Services', email: 'rahul.sharma@tcs.com', code: 'TYC-4821', prog: '10 / 10', progPct: 100, pre: '62%', post: '86%', score: '1,480', status: 'Completed', statusBadge: 'bg-emerald-100 text-emerald-800', last: '16 Oct 2024\n12:30 PM' },
                            { id: 'part-2', name: 'Priya Desai', avatar: 'PD', bg: 'bg-indigo-100 text-indigo-700', company: 'Infosys', email: 'priya.desai@infosys.com', code: 'TYC-4822', prog: '10 / 10', progPct: 100, pre: '71%', post: '94%', score: '1,620', status: 'Completed', statusBadge: 'bg-emerald-100 text-emerald-800', last: '15 Oct 2024\n12:28 PM' },
                            { id: 'part-3', name: 'Amit Kumar', avatar: 'AK', bg: 'bg-blue-100 text-blue-700', company: 'Wipro', email: 'amit.kumar@wipro.com', code: 'TYC-4823', prog: '7 / 10', progPct: 70, pre: '58%', post: '-', score: '1,120', status: 'In Progress', statusBadge: 'bg-blue-100 text-blue-800', last: '15 Oct 2024\n11:45 AM' },
                            { id: 'part-4', name: 'Sneha Nair', avatar: 'SN', bg: 'bg-emerald-100 text-emerald-700', company: 'HCL Technologies', email: 'sneha.nair@hcl.com', code: 'TYC-4824', prog: '10 / 10', progPct: 100, pre: '65%', post: '88%', score: '1,390', status: 'Completed', statusBadge: 'bg-emerald-100 text-emerald-800', last: '14 Oct 2024\n04:20 PM' },
                            { id: 'part-5', name: 'Vikram Reddy', avatar: 'VR', bg: 'bg-amber-100 text-amber-700', company: 'Tech Mahindra', email: 'vikram.reddy@techm.com', code: 'TYC-4825', prog: '3 / 10', progPct: 30, pre: '40%', post: '-', score: '620', status: 'In Progress', statusBadge: 'bg-blue-100 text-blue-800', last: '14 Oct 2024\n02:15 PM' },
                            { id: 'part-6', name: 'Sunita Patel', avatar: 'SP', bg: 'bg-rose-100 text-rose-700', company: 'Indian Oil Corporation', email: 'sunita.patel@iocl.com', code: 'TYC-4826', prog: '0 / 10', progPct: 0, pre: '-', post: '-', score: '0', status: 'Not Started', statusBadge: 'bg-orange-100 text-orange-800', last: '-' },
                            { id: 'part-7', name: 'Mohit Kapoor', avatar: 'MK', bg: 'bg-sky-100 text-sky-700', company: 'Bajaj Auto', email: 'mohit.kapoor@bajajauto.com', code: 'TYC-4827', prog: '10 / 10', progPct: 100, pre: '68%', post: '90%', score: '1,520', status: 'Completed', statusBadge: 'bg-emerald-100 text-emerald-800', last: '13 Oct 2024\n05:10 PM' },
                            { id: 'part-8', name: 'Aisha Khan', avatar: 'AL', bg: 'bg-purple-100 text-purple-700', company: 'Accenture', email: 'aisha.khan@accenture.com', code: 'TYC-4828', prog: '5 / 10', progPct: 50, pre: '55%', post: '-', score: '980', status: 'In Progress', statusBadge: 'bg-blue-100 text-blue-800', last: '13 Oct 2024\n01:25 PM' }
                          ].map((p) => (
                            <tr
                              key={p.id}
                              onClick={() => setSelectedParticipantId(p.id)}
                              className={`cursor-pointer transition-colors ${
                                selectedParticipantId === p.id ? 'bg-indigo-50/50' : 'hover:bg-slate-50/80'
                              }`}
                            >
                              <td className="py-4 px-2">
                                <Square className="w-4 h-4 text-slate-300 hover:text-slate-500" />
                              </td>
                              <td className="py-4">
                                <div className="flex items-center space-x-2.5">
                                  <span className={`w-7 h-7 rounded-full font-black text-[10px] flex items-center justify-center shrink-0 ${p.bg}`}>
                                    {p.avatar}
                                  </span>
                                  <span className="font-extrabold text-slate-900 text-xs">{p.name}</span>
                                </div>
                              </td>
                              <td className="py-4 font-bold text-slate-600 text-[11px]">{p.company}</td>
                              <td className="py-4 font-semibold text-slate-500 text-[11px]">{p.email}</td>
                              <td className="py-4 font-mono font-bold text-slate-700 text-xs">{p.code}</td>
                              <td className="py-4">
                                <div className="w-20">
                                  <div className="flex justify-between text-[10px] font-bold text-slate-600 mb-0.5">
                                    <span>{p.prog}</span>
                                  </div>
                                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                      className={`h-full ${p.progPct === 100 ? 'bg-emerald-500' : p.progPct > 0 ? 'bg-amber-400' : 'bg-slate-200'}`}
                                      style={{ width: `${p.progPct}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 font-bold text-slate-700 text-xs">{p.pre}</td>
                              <td className="py-4 font-bold text-slate-700 text-xs">{p.post}</td>
                              <td className="py-4 font-black text-slate-900 text-xs">{p.score}</td>
                              <td className="py-4">
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${p.statusBadge}`}>
                                  {p.status}
                                </span>
                              </td>
                              <td className="py-4 font-bold text-slate-500 whitespace-pre-line text-[10px]">{p.last}</td>
                              <td className="py-4 text-right">
                                <div className="flex items-center justify-end space-x-2">
                                  <button className="px-3 py-1 bg-slate-100 hover:bg-[#5551ff] text-slate-700 hover:text-white rounded-lg font-extrabold text-[11px] transition-all cursor-pointer">
                                    View
                                  </button>
                                  <button className="p-1 hover:bg-slate-200 text-slate-400 hover:text-slate-700 rounded-lg">
                                    <MoreVertical className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Pagination Footer */}
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-slate-500">
                    <div>Showing 1-8 of 48 participants</div>
                    
                    <div className="flex items-center space-x-1.5">
                      <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100">&lt;</button>
                      <button className="w-7 h-7 rounded-lg bg-[#5551ff] text-white font-black flex items-center justify-center">1</button>
                      <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100">2</button>
                      <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100">3</button>
                      <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100">4</button>
                      <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100">5</button>
                      <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100">6</button>
                      <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100">&gt;</button>
                    </div>

                    <div className="flex items-center space-x-1">
                      <select className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-extrabold text-slate-800">
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                      </select>
                      <span>per page</span>
                    </div>
                  </div>
                </div>

                {/* Right 1/3 Column: Selected Participant Detail Panel */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-5">
                  
                  {/* Participant Header */}
                  <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-11 h-11 rounded-full bg-purple-100 text-[#5551ff] font-black text-sm flex items-center justify-center shrink-0">
                        RA
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-base font-black text-slate-900">Rahul Sharma</h3>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 flex items-center space-x-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            <span>Completed</span>
                          </span>
                        </div>
                        <div className="text-xs font-bold text-slate-400 mt-0.5">Tata Consultancy Services • TYC-4821</div>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Participant Tabs */}
                  <div className="flex items-center space-x-4 border-b border-slate-100 text-xs font-extrabold">
                    <button
                      onClick={() => setParticipantDetailTab('overview')}
                      className={`pb-2.5 -mb-px transition-all cursor-pointer ${
                        participantDetailTab === 'overview' ? 'text-[#5551ff] border-b-2 border-[#5551ff]' : 'text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setParticipantDetailTab('gameProgress')}
                      className={`pb-2.5 -mb-px transition-all cursor-pointer ${
                        participantDetailTab === 'gameProgress' ? 'text-[#5551ff] border-b-2 border-[#5551ff]' : 'text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      Game Progress
                    </button>
                    <button
                      onClick={() => setParticipantDetailTab('learning')}
                      className={`pb-2.5 -mb-px transition-all cursor-pointer ${
                        participantDetailTab === 'learning' ? 'text-[#5551ff] border-b-2 border-[#5551ff]' : 'text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      Learning
                    </button>
                    <button
                      onClick={() => setParticipantDetailTab('activity')}
                      className={`pb-2.5 -mb-px transition-all cursor-pointer ${
                        participantDetailTab === 'activity' ? 'text-[#5551ff] border-b-2 border-[#5551ff]' : 'text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      Activity
                    </button>
                  </div>

                  {/* Participant Information */}
                  <div className="space-y-2.5 text-xs font-medium border-b border-slate-100 pb-4">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-xs font-black text-slate-900 flex items-center space-x-1.5">
                        <Users className="w-3.5 h-3.5 text-[#5551ff]" />
                        <span>Participant Information</span>
                      </h4>
                      <button className="text-[11px] font-extrabold text-[#5551ff] hover:underline cursor-pointer">
                        Edit
                      </button>
                    </div>

                    <div className="flex justify-between py-0.5">
                      <span className="text-slate-400 font-bold">Name</span>
                      <span className="font-extrabold text-slate-900">Rahul Sharma</span>
                    </div>

                    <div className="flex justify-between py-0.5">
                      <span className="text-slate-400 font-bold">Company</span>
                      <span className="font-extrabold text-slate-900">Tata Consultancy Services</span>
                    </div>

                    <div className="flex justify-between py-0.5">
                      <span className="text-slate-400 font-bold">Email</span>
                      <span className="font-extrabold text-slate-900">rahul.sharma@tcs.com</span>
                    </div>

                    <div className="flex justify-between py-0.5">
                      <span className="text-slate-400 font-bold">Country</span>
                      <span className="font-extrabold text-slate-900">India</span>
                    </div>

                    <div className="flex justify-between py-0.5">
                      <span className="text-slate-400 font-bold">Joined On</span>
                      <span className="font-extrabold text-slate-900">10 Oct 2024, 09:30 AM</span>
                    </div>

                    <div className="flex justify-between py-0.5">
                      <span className="text-slate-400 font-bold">Participant Code</span>
                      <span className="font-mono font-bold text-slate-900">TYC-4821</span>
                    </div>
                  </div>

                  {/* Game Progress Card */}
                  <div className="space-y-3 border-b border-slate-100 pb-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black text-slate-900 flex items-center space-x-1.5">
                        <Gamepad2 className="w-3.5 h-3.5 text-blue-600" />
                        <span>Game Progress</span>
                      </h4>
                      <span className="text-[11px] font-extrabold text-emerald-600">10 / 10 Rounds (100%)</span>
                    </div>

                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-full"></div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                      <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-100">
                        <Trophy className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                        <div className="text-base font-black text-slate-900">1,480</div>
                        <div className="text-[9px] font-bold text-slate-500">Final Score</div>
                      </div>

                      <div className="p-2.5 rounded-2xl bg-blue-50 border border-blue-100">
                        <ClipboardList className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                        <div className="text-base font-black text-slate-900">12</div>
                        <div className="text-[9px] font-bold text-slate-500">Decisions Made</div>
                      </div>

                      <div className="p-2.5 rounded-2xl bg-purple-50 border border-purple-100">
                        <Zap className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                        <div className="text-base font-black text-slate-900">3</div>
                        <div className="text-[9px] font-bold text-slate-500">Events Encountered</div>
                      </div>
                    </div>
                  </div>

                  {/* Learning Assessment Card */}
                  <div className="space-y-3 border-b border-slate-100 pb-4">
                    <h4 className="text-xs font-black text-slate-900 flex items-center space-x-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                      <span>Learning Assessment</span>
                    </h4>

                    <div className="grid grid-cols-3 gap-2 items-center text-center">
                      <div className="p-2.5 rounded-2xl bg-purple-50 border border-purple-100">
                        <BookOpen className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                        <div className="text-base font-black text-slate-900">62%</div>
                        <div className="text-[9px] font-bold text-slate-500">Pre-Game Score</div>
                      </div>

                      <div className="p-2.5 rounded-2xl bg-indigo-50 border border-indigo-100">
                        <BookOpen className="w-4 h-4 text-[#5551ff] mx-auto mb-1" />
                        <div className="text-base font-black text-slate-900">86%</div>
                        <div className="text-[9px] font-bold text-slate-500">Post-Game Score</div>
                      </div>

                      <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-100">
                        <TrendingUp className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                        <div className="text-base font-black text-emerald-600">+24%</div>
                        <div className="text-[9px] font-bold text-emerald-700">Improvement</div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity Section */}
                  <div className="space-y-2.5 border-b border-slate-100 pb-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black text-slate-900 flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Recent Activity</span>
                      </h4>
                      <button className="text-[11px] font-extrabold text-[#5551ff] hover:underline cursor-pointer">
                        View All Activity
                      </button>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span className="font-bold text-slate-800">Completed the game</span>
                        </div>
                        <span className="text-[10px] font-medium text-slate-400">15 Oct 2024, 12:30 PM</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span className="font-bold text-slate-800">Completed Round 10</span>
                        </div>
                        <span className="text-[10px] font-medium text-slate-400">15 Oct 2024, 12:25 PM</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                          <span className="font-bold text-slate-800">Made decision: Leadership Program</span>
                        </div>
                        <span className="text-[10px] font-medium text-slate-400">15 Oct 2024, 12:20 PM</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Section */}
                  <div className="space-y-2 pt-1">
                    <button className="w-full py-2.5 bg-[#5551ff] hover:bg-indigo-600 text-white rounded-xl text-xs font-black shadow-xs cursor-pointer">
                      View Full Results
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button className="py-2 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-extrabold flex items-center justify-center space-x-1 cursor-pointer">
                        <Mail className="w-3.5 h-3.5 text-slate-500" />
                        <span>Resend Code</span>
                      </button>

                      <button className="py-2 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-extrabold flex items-center justify-center space-x-1 cursor-pointer">
                        <Download className="w-3.5 h-3.5 text-slate-500" />
                        <span>Download Result</span>
                      </button>
                    </div>

                    <button className="w-full py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl text-xs font-extrabold flex items-center justify-center space-x-1 cursor-pointer">
                      <Ban className="w-3.5 h-3.5 text-rose-600" />
                      <span>Disable Code</span>
                    </button>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ANALYTICS TAB VIEW (MATCHES REFERENCE SCREENSHOT EXACTLY) */}
          {activeTab === 'analytics' && (
            <div className="space-y-6 animate-fadeIn pb-12">
              
              {/* 1. Header Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">Analytics</h1>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                    Track participation, learning outcomes, and inclusion impact across your sessions.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <div className="flex items-center space-x-2 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-extrabold text-slate-700 shadow-xs cursor-pointer">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>Jan 2024 - Oct 2024</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </div>

                  <select
                    value={analyticsSessionFilter}
                    onChange={(e) => setAnalyticsSessionFilter(e.target.value)}
                    className="px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-800 shadow-xs focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Sessions</option>
                    <option value="leadership">TCS Leadership Workshop 2026</option>
                    <option value="hrdei">HR & DEI Training Batch 2</option>
                  </select>

                  <button className="px-5 py-2.5 bg-[#5551ff] hover:bg-indigo-600 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center space-x-2 transition-all cursor-pointer">
                    <Download className="w-4 h-4" />
                    <span>Export Report</span>
                  </button>
                </div>
              </div>

              {/* 2. Top Stats Bar (4 Mini Stat Cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Card 1: Total Participants */}
                <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-xs flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-purple-100/70 text-[#5551ff] flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900">328</div>
                      <div className="text-xs font-bold text-slate-400">Total Participants</div>
                      <div className="text-[10px] text-slate-400">vs previous period</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">↑ 32%</span>
                    <svg className="w-14 h-6 text-purple-400" viewBox="0 0 60 30" fill="none">
                      <path d="M5 25 L20 18 L35 22 L55 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* Card 2: Completed Games */}
                <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-xs flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-100/70 text-emerald-600 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900">248</div>
                      <div className="text-xs font-bold text-slate-400">Completed Games</div>
                      <div className="text-[10px] text-slate-400">76% completion rate</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">↑ 28%</span>
                    <svg className="w-14 h-6 text-sky-400" viewBox="0 0 60 30" fill="none">
                      <path d="M5 25 L20 20 L35 12 L55 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* Card 3: Average Final Score */}
                <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-xs flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-100/70 text-amber-600 flex items-center justify-center shrink-0">
                      <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900">1,420</div>
                      <div className="text-xs font-bold text-slate-400">Average Final Score</div>
                      <div className="text-[10px] text-slate-400">Out of 2,000</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">↑ 18%</span>
                    <svg className="w-14 h-6 text-blue-400" viewBox="0 0 60 30" fill="none">
                      <path d="M5 25 L20 22 L35 14 L55 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* Card 4: Learning Improvement */}
                <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-xs flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-teal-100/70 text-teal-600 flex items-center justify-center shrink-0">
                      <BarChart3 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900">+24%</div>
                      <div className="text-xs font-bold text-slate-400">Learning Improvement</div>
                      <div className="text-[10px] text-slate-400">Avg. increase (Pre to Post)</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">↑ 12%</span>
                    <svg className="w-14 h-6 text-purple-400" viewBox="0 0 60 30" fill="none">
                      <path d="M5 22 L20 18 L35 15 L55 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

              </div>

              {/* 3. Middle Row 1: 3 Analytics Visual Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Card 1: Participation Trend Line Chart */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-[#5551ff]" />
                      <h3 className="text-sm font-black text-slate-900">Participation Trend</h3>
                    </div>
                    <div className="flex items-center space-x-3 text-[10px] font-bold">
                      <span className="flex items-center space-x-1">
                        <span className="w-2 h-2 rounded-full bg-[#5551ff]"></span>
                        <span className="text-slate-500">Participants</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                        <span className="text-slate-500">Completed</span>
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 relative">
                    {/* SVG Multi-line Chart with Tooltip */}
                    <div className="h-44 relative">
                      <svg className="w-full h-36 overflow-visible" viewBox="0 0 300 100" fill="none">
                        {/* Grid lines */}
                        <line x1="0" y1="20" x2="300" y2="20" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                        <line x1="0" y1="50" x2="300" y2="50" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                        <line x1="0" y1="80" x2="300" y2="80" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />

                        {/* Participants line (Purple) */}
                        <path d="M 10,80 Q 40,70 70,60 T 130,40 T 190,45 T 250,30 T 290,32" stroke="#5551ff" strokeWidth="2.5" fill="none" />
                        {/* Completed line (Blue) */}
                        <path d="M 10,90 Q 40,80 70,75 T 130,55 T 190,60 T 250,45 T 290,48" stroke="#0284c7" strokeWidth="2.5" fill="none" />

                        {/* Active point indicator on Aug */}
                        <circle cx="215" cy="38" r="4" fill="#5551ff" stroke="#ffffff" strokeWidth="2" />
                        <circle cx="215" cy="52" r="4" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
                      </svg>

                      {/* Tooltip Box over Aug 2024 */}
                      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 bg-white border border-slate-200 rounded-xl p-2 shadow-lg text-[10px] font-bold z-10 space-y-0.5">
                        <div className="text-slate-900 font-extrabold border-b border-slate-100 pb-1">Aug 2024</div>
                        <div className="flex items-center space-x-1.5 text-[#5551ff]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#5551ff]"></span>
                          <span>Participants: 68</span>
                        </div>
                        <div className="flex items-center space-x-1.5 text-sky-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                          <span>Completed: 54</span>
                        </div>
                      </div>

                      {/* X Axis Labels */}
                      <div className="flex justify-between text-[9px] font-extrabold text-slate-400 pt-2 border-t border-slate-100">
                        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2: Completion Rate by Session */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-[#5551ff]" />
                      <h3 className="text-sm font-black text-slate-900">Completion Rate by Session</h3>
                    </div>
                  </div>

                  <div className="space-y-3 pt-1 text-xs font-bold">
                    {[
                      { name: 'Leadership Workshop', pct: '92%', bg: 'bg-[#5551ff]' },
                      { name: 'HR & DEI Training', pct: '84%', bg: 'bg-blue-600' },
                      { name: 'Management Program', pct: '78%', bg: 'bg-emerald-500' },
                      { name: 'Women in Leadership', pct: '76%', bg: 'bg-orange-500' },
                      { name: 'Inclusive Workplace', pct: '68%', bg: 'bg-rose-500' },
                      { name: 'DEI Champions', pct: '60%', bg: 'bg-purple-400' }
                    ].map((item) => (
                      <div key={item.name} className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-700">{item.name}</span>
                          <span className="text-slate-900 font-mono">{item.pct}</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${item.bg}`} style={{ width: item.pct }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card 3: Average Score by Session */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4 text-[#5551ff]" />
                      <h3 className="text-sm font-black text-slate-900">Average Score by Session</h3>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-end justify-between h-44 px-2 pb-2 border-b border-slate-100">
                      {[
                        { name: 'Leadership\nWorkshop', score: '1,620', height: '85%' },
                        { name: 'HR & DEI\nTraining', score: '1,480', height: '75%' },
                        { name: 'Management\nProgram', score: '1,360', height: '68%' },
                        { name: 'Women in\nLeadership', score: '1,220', height: '60%' },
                        { name: 'Inclusive\nWorkplace', score: '1,180', height: '58%' }
                      ].map((col) => (
                        <div key={col.name} className="flex flex-col items-center space-y-1">
                          <span className="text-[10px] font-black text-[#5551ff]">{col.score}</span>
                          <div className="w-7 bg-[#5551ff] rounded-t-lg" style={{ height: col.height }}></div>
                          <span className="text-[9px] font-extrabold text-slate-400 text-center whitespace-pre-line leading-tight mt-1">{col.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* 4. Middle Row 2: 3 Analytics Visual Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Card 1: Learning Outcome Improvement */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4 text-[#5551ff]" />
                      <h3 className="text-sm font-black text-slate-900">Learning Outcome Improvement</h3>
                    </div>
                    <div className="flex items-center space-x-2 text-[9px] font-bold">
                      <span className="flex items-center space-x-1">
                        <span className="w-2 h-2 rounded-full bg-purple-300"></span>
                        <span className="text-slate-500">Pre</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span className="w-2 h-2 rounded-full bg-[#5551ff]"></span>
                        <span className="text-slate-500">Post</span>
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-end justify-between h-40 px-1 pb-2 border-b border-slate-100">
                      {[
                        { label: 'All Sessions', pre: '62%', post: '86%', hPre: '62%', hPost: '86%' },
                        { label: 'Leadership', pre: '58%', post: '84%', hPre: '58%', hPost: '84%' },
                        { label: 'HR & DEI', pre: '65%', post: '89%', hPre: '65%', hPost: '89%' },
                        { label: 'Management', pre: '61%', post: '82%', hPre: '61%', hPost: '82%' },
                        { label: 'Inclusive', pre: '55%', post: '78%', hPre: '55%', hPost: '78%' }
                      ].map((grp) => (
                        <div key={grp.label} className="flex flex-col items-center space-y-1">
                          <div className="flex items-end space-x-1 h-32">
                            <div className="w-3.5 bg-purple-300 rounded-t relative flex justify-center" style={{ height: grp.hPre }}>
                              <span className="absolute -top-4 text-[8px] font-black text-slate-700">{grp.pre}</span>
                            </div>
                            <div className="w-3.5 bg-[#5551ff] rounded-t relative flex justify-center" style={{ height: grp.hPost }}>
                              <span className="absolute -top-4 text-[8px] font-black text-[#5551ff]">{grp.post}</span>
                            </div>
                          </div>
                          <span className="text-[9px] font-extrabold text-slate-400 mt-1">{grp.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card 2: Score Distribution Donut */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center space-x-2">
                      <PieChart className="w-4 h-4 text-[#5551ff]" />
                      <h3 className="text-sm font-black text-slate-900">Score Distribution</h3>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
                    <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="38" stroke="#f1f5f9" strokeWidth="12" fill="none" />
                        <circle cx="50" cy="50" r="38" stroke="#10b981" strokeWidth="12" strokeDasharray="9.5 238.7" strokeDashoffset="0" fill="none" strokeLinecap="round" />
                        <circle cx="50" cy="50" r="38" stroke="#3b82f6" strokeWidth="12" strokeDasharray="50.1 238.7" strokeDashoffset="-9.5" fill="none" strokeLinecap="round" />
                        <circle cx="50" cy="50" r="38" stroke="#f97316" strokeWidth="12" strokeDasharray="119.3 238.7" strokeDashoffset="-59.6" fill="none" strokeLinecap="round" />
                        <circle cx="50" cy="50" r="38" stroke="#ef4444" strokeWidth="12" strokeDasharray="52.5 238.7" strokeDashoffset="-178.9" fill="none" strokeLinecap="round" />
                        <circle cx="50" cy="50" r="38" stroke="#fca5a5" strokeWidth="12" strokeDasharray="9.5 238.7" strokeDashoffset="-231.4" fill="none" strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-xl font-black text-slate-900 leading-none">328</span>
                        <span className="text-[10px] font-extrabold text-slate-400 mt-0.5">Participants</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs font-extrabold text-slate-700 w-full sm:w-auto">
                      <div className="flex items-center justify-between sm:justify-start space-x-3">
                        <div className="flex items-center space-x-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                          <span className="text-slate-600">1800 - 2000</span>
                        </div>
                        <span className="text-slate-900 font-mono">12 (4%)</span>
                      </div>

                      <div className="flex items-center justify-between sm:justify-start space-x-3">
                        <div className="flex items-center space-x-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0"></span>
                          <span className="text-slate-600">1500 - 1800</span>
                        </div>
                        <span className="text-slate-900 font-mono">68 (21%)</span>
                      </div>

                      <div className="flex items-center justify-between sm:justify-start space-x-3">
                        <div className="flex items-center space-x-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0"></span>
                          <span className="text-slate-600">1000 - 1500</span>
                        </div>
                        <span className="text-slate-900 font-mono">164 (50%)</span>
                      </div>

                      <div className="flex items-center justify-between sm:justify-start space-x-3">
                        <div className="flex items-center space-x-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0"></span>
                          <span className="text-slate-600">500 - 1000</span>
                        </div>
                        <span className="text-slate-900 font-mono">72 (22%)</span>
                      </div>

                      <div className="flex items-center justify-between sm:justify-start space-x-3">
                        <div className="flex items-center space-x-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-300 shrink-0"></span>
                          <span className="text-slate-600">Below 500</span>
                        </div>
                        <span className="text-slate-900 font-mono">12 (4%)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 3: Inclusion Impact Metrics */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4 text-[#5551ff]" />
                      <h3 className="text-sm font-black text-slate-900">Inclusion Impact Metrics</h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-100 space-y-1">
                      <div className="flex items-center justify-between">
                        <Briefcase className="w-4 h-4 text-sky-600" />
                        <span className="text-[10px] font-black text-emerald-600">↑ 18%</span>
                      </div>
                      <div className="text-[10px] font-bold text-slate-400">Business Impact</div>
                      <div className="text-xs font-bold text-slate-500">Avg. Score</div>
                      <div className="text-xl font-black text-slate-900">680</div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-1">
                      <div className="flex items-center justify-between">
                        <Users className="w-4 h-4 text-purple-600" />
                        <span className="text-[10px] font-black text-emerald-600">↑ 22%</span>
                      </div>
                      <div className="text-[10px] font-bold text-slate-400">Inclusion Impact</div>
                      <div className="text-xs font-bold text-slate-500">Avg. Score</div>
                      <div className="text-xl font-black text-slate-900">520</div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100 space-y-1">
                      <div className="flex items-center justify-between">
                        <Users className="w-4 h-4 text-amber-600" />
                        <span className="text-[10px] font-black text-emerald-600">↑ 16%</span>
                      </div>
                      <div className="text-[10px] font-bold text-slate-400">Talent Impact</div>
                      <div className="text-xs font-bold text-slate-500">Avg. Score</div>
                      <div className="text-xl font-black text-slate-900">420</div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-100 space-y-1">
                      <div className="flex items-center justify-between">
                        <Shield className="w-4 h-4 text-rose-600" />
                        <span className="text-[10px] font-black text-emerald-600">↑ 14%</span>
                      </div>
                      <div className="text-[10px] font-bold text-slate-400">Brand & Reputation</div>
                      <div className="text-xs font-bold text-slate-500">Avg. Score</div>
                      <div className="text-xl font-black text-slate-900">320</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* 5. Bottom Row: 4 Survey & Feedback Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Card 1: Participant Feedback Donut */}
                <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs space-y-4">
                  <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                    <MessageSquare className="w-4 h-4 text-[#5551ff]" />
                    <h3 className="text-xs font-black text-slate-900">Participant Feedback</h3>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="38" stroke="#f1f5f9" strokeWidth="12" fill="none" />
                        <circle cx="50" cy="50" r="38" stroke="#10b981" strokeWidth="12" strokeDasharray="114.5 238.7" strokeDashoffset="0" fill="none" />
                        <circle cx="50" cy="50" r="38" stroke="#3b82f6" strokeWidth="12" strokeDasharray="83.5 238.7" strokeDashoffset="-114.5" fill="none" />
                        <circle cx="50" cy="50" r="38" stroke="#eab308" strokeWidth="12" strokeDasharray="28.6 238.7" strokeDashoffset="-198.0" fill="none" />
                        <circle cx="50" cy="50" r="38" stroke="#f97316" strokeWidth="12" strokeDasharray="9.5 238.7" strokeDashoffset="-226.6" fill="none" />
                        <circle cx="50" cy="50" r="38" stroke="#ef4444" strokeWidth="12" strokeDasharray="2.4 238.7" strokeDashoffset="-236.1" fill="none" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-base font-black text-slate-900 leading-none">248</span>
                        <span className="text-[8px] font-bold text-slate-400">Responses</span>
                      </div>
                    </div>

                    <div className="space-y-1 text-[10px] font-extrabold text-slate-700">
                      <div className="flex items-center justify-between space-x-2">
                        <span className="flex items-center space-x-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span>Excellent</span>
                        </span>
                        <span>48%</span>
                      </div>
                      <div className="flex items-center justify-between space-x-2">
                        <span className="flex items-center space-x-1">
                          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                          <span>Good</span>
                        </span>
                        <span>35%</span>
                      </div>
                      <div className="flex items-center justify-between space-x-2">
                        <span className="flex items-center space-x-1">
                          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                          <span>Average</span>
                        </span>
                        <span>12%</span>
                      </div>
                      <div className="flex items-center justify-between space-x-2">
                        <span className="flex items-center space-x-1">
                          <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                          <span>Poor</span>
                        </span>
                        <span>4%</span>
                      </div>
                      <div className="flex items-center justify-between space-x-2">
                        <span className="flex items-center space-x-1">
                          <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                          <span>Very Poor</span>
                        </span>
                        <span>1%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2: Most Useful Aspects */}
                <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs space-y-4">
                  <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                    <ClipboardList className="w-4 h-4 text-[#5551ff]" />
                    <h3 className="text-xs font-black text-slate-900">Most Useful Aspects</h3>
                  </div>

                  <div className="space-y-2 text-[10px] font-bold">
                    {[
                      { label: 'Real-world Scenarios', pct: '86%', bg: 'bg-[#5551ff]' },
                      { label: 'Decision Consequences', pct: '78%', bg: 'bg-blue-600' },
                      { label: 'Learning Content', pct: '72%', bg: 'bg-sky-500' },
                      { label: 'Industry Examples', pct: '64%', bg: 'bg-[#5551ff]' },
                      { label: 'Game Mechanics', pct: '58%', bg: 'bg-sky-400' }
                    ].map((asp) => (
                      <div key={asp.label} className="space-y-0.5">
                        <div className="flex justify-between">
                          <span className="text-slate-700">{asp.label}</span>
                          <span className="text-slate-900 font-mono">{asp.pct}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${asp.bg}`} style={{ width: asp.pct }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card 3: Areas for Improvement */}
                <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs space-y-4">
                  <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                    <Edit3 className="w-4 h-4 text-[#5551ff]" />
                    <h3 className="text-xs font-black text-slate-900">Areas for Improvement</h3>
                  </div>

                  <div className="space-y-2 text-[10px] font-bold">
                    {[
                      { label: 'More Industry Examples', pct: '42%', bg: 'bg-[#5551ff]' },
                      { label: 'Longer Sessions', pct: '38%', bg: 'bg-blue-600' },
                      { label: 'More Scenarios', pct: '34%', bg: 'bg-sky-500' },
                      { label: 'Additional Learning...', pct: '28%', bg: 'bg-indigo-400' },
                      { label: 'Better Instructions', pct: '22%', bg: 'bg-purple-300' }
                    ].map((area) => (
                      <div key={area.label} className="space-y-0.5">
                        <div className="flex justify-between">
                          <span className="text-slate-700">{area.label}</span>
                          <span className="text-slate-900 font-mono">{area.pct}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${area.bg}`} style={{ width: area.pct }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card 4: Feedback Summary */}
                <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs space-y-4">
                  <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                    <Star className="w-4 h-4 text-amber-500" />
                    <h3 className="text-xs font-black text-slate-900">Feedback Summary</h3>
                  </div>

                  <div className="grid grid-cols-3 gap-1 pt-1 text-center divide-x divide-slate-100">
                    <div className="space-y-1">
                      <Star className="w-4 h-4 text-amber-400 mx-auto" />
                      <div className="text-base font-black text-slate-900">4.6 / 5</div>
                      <div className="text-[9px] font-extrabold text-slate-400">Average Rating</div>
                    </div>

                    <div className="space-y-1 pl-1">
                      <ThumbsUp className="w-4 h-4 text-blue-500 mx-auto" />
                      <div className="text-base font-black text-slate-900">91%</div>
                      <div className="text-[9px] font-extrabold text-slate-400">Would Recommend</div>
                    </div>

                    <div className="space-y-1 pl-1">
                      <MessageSquare className="w-4 h-4 text-purple-600 mx-auto" />
                      <div className="text-base font-black text-slate-900">248</div>
                      <div className="text-[9px] font-extrabold text-slate-400">Total Responses</div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* REPORTS TAB VIEW (MATCHES REFERENCE SCREENSHOT EXACTLY) */}
          {activeTab === 'reports' && (
            <div className="space-y-6 animate-fadeIn pb-12">
              
              {/* 1. Header Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">Reports</h1>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                    Generate and download detailed reports on participation, learning outcomes, and inclusion impact.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <div className="flex items-center space-x-2 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-extrabold text-slate-700 shadow-xs cursor-pointer">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>Jan 2024 - Oct 2024</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </div>

                  <select
                    value={reportSession}
                    onChange={(e) => setReportSession(e.target.value)}
                    className="px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-800 shadow-xs focus:outline-none cursor-pointer"
                  >
                    <option value="All Sessions">All Sessions</option>
                    <option value="TCS Leadership Workshop 2026">TCS Leadership Workshop 2026</option>
                    <option value="HR & DEI Training">HR & DEI Training</option>
                  </select>

                  <button className="px-5 py-2.5 bg-[#5551ff] hover:bg-indigo-600 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center space-x-2 transition-all cursor-pointer">
                    <Plus className="w-4 h-4" />
                    <span>Generate Report</span>
                  </button>
                </div>
              </div>

              {/* 2. Main 2-Column Layout (Left 8 cols, Right 4 cols) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* LEFT MAIN AREA (8 Cols) */}
                <div className="lg:col-span-8 space-y-6">

                  {/* Section 1: Report Templates */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-[#5551ff]" />
                        <div>
                          <h3 className="text-sm font-black text-slate-900">Report Templates</h3>
                          <p className="text-[11px] text-slate-400 font-medium">Choose a report template or create a custom report.</p>
                        </div>
                      </div>

                      <button className="px-3.5 py-1.5 rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 text-[#5551ff] text-xs font-extrabold cursor-pointer transition-colors">
                        Create Custom Report
                      </button>
                    </div>

                    {/* Template Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
                      
                      {/* Template 1: Session Summary Report */}
                      <div
                        onClick={() => setSelectedReportTemplate('summary')}
                        className={`relative rounded-2xl p-3.5 cursor-pointer transition-all ${
                          selectedReportTemplate === 'summary'
                            ? 'bg-purple-50/40 border-2 border-[#5551ff] shadow-xs'
                            : 'bg-white border border-slate-200/80 hover:border-purple-300'
                        }`}
                      >
                        {selectedReportTemplate === 'summary' && (
                          <div className="absolute top-0 right-3 bg-[#5551ff] text-white px-1.5 py-0.5 rounded-b-md text-[9px]">
                            <Bookmark className="w-3 h-3 fill-current" />
                          </div>
                        )}
                        <div className="w-9 h-9 rounded-xl bg-purple-100/80 text-[#5551ff] flex items-center justify-center mb-3">
                          <BarChart3 className="w-4 h-4" />
                        </div>
                        <h4 className="text-xs font-black text-slate-900 leading-snug">Session Summary Report</h4>
                        <p className="text-[10px] text-slate-400 font-medium mt-1 leading-relaxed">
                          Participation, scores, and learning outcomes for a specific session
                        </p>
                      </div>

                      {/* Template 2: Participant Report */}
                      <div
                        onClick={() => setSelectedReportTemplate('participant')}
                        className={`relative rounded-2xl p-3.5 cursor-pointer transition-all ${
                          selectedReportTemplate === 'participant'
                            ? 'bg-purple-50/40 border-2 border-[#5551ff] shadow-xs'
                            : 'bg-white border border-slate-200/80 hover:border-purple-300'
                        }`}
                      >
                        <div className="w-9 h-9 rounded-xl bg-emerald-100/80 text-emerald-600 flex items-center justify-center mb-3">
                          <Users className="w-4 h-4" />
                        </div>
                        <h4 className="text-xs font-black text-slate-900 leading-snug">Participant Report</h4>
                        <p className="text-[10px] text-slate-400 font-medium mt-1 leading-relaxed">
                          Individual participant performance and learning progress
                        </p>
                      </div>

                      {/* Template 3: Learning Impact Report */}
                      <div
                        onClick={() => setSelectedReportTemplate('learning')}
                        className={`relative rounded-2xl p-3.5 cursor-pointer transition-all ${
                          selectedReportTemplate === 'learning'
                            ? 'bg-purple-50/40 border-2 border-[#5551ff] shadow-xs'
                            : 'bg-white border border-slate-200/80 hover:border-purple-300'
                        }`}
                      >
                        <div className="w-9 h-9 rounded-xl bg-teal-100/80 text-teal-600 flex items-center justify-center mb-3">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <h4 className="text-xs font-black text-slate-900 leading-snug">Learning Impact Report</h4>
                        <p className="text-[10px] text-slate-400 font-medium mt-1 leading-relaxed">
                          Pre-post assessment analysis and improvement metrics
                        </p>
                      </div>

                      {/* Template 4: Inclusion Impact Report */}
                      <div
                        onClick={() => setSelectedReportTemplate('inclusion')}
                        className={`relative rounded-2xl p-3.5 cursor-pointer transition-all ${
                          selectedReportTemplate === 'inclusion'
                            ? 'bg-purple-50/40 border-2 border-[#5551ff] shadow-xs'
                            : 'bg-white border border-slate-200/80 hover:border-purple-300'
                        }`}
                      >
                        <div className="w-9 h-9 rounded-xl bg-amber-100/80 text-amber-600 flex items-center justify-center mb-3">
                          <Users className="w-4 h-4" />
                        </div>
                        <h4 className="text-xs font-black text-slate-900 leading-snug">Inclusion Impact Report</h4>
                        <p className="text-[10px] text-slate-400 font-medium mt-1 leading-relaxed">
                          Diversity, inclusion and business impact metrics
                        </p>
                      </div>

                      {/* Template 5: Organization Report */}
                      <div
                        onClick={() => setSelectedReportTemplate('organization')}
                        className={`relative rounded-2xl p-3.5 cursor-pointer transition-all ${
                          selectedReportTemplate === 'organization'
                            ? 'bg-purple-50/40 border-2 border-[#5551ff] shadow-xs'
                            : 'bg-white border border-slate-200/80 hover:border-purple-300'
                        }`}
                      >
                        <div className="w-9 h-9 rounded-xl bg-sky-100/80 text-sky-600 flex items-center justify-center mb-3">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <h4 className="text-xs font-black text-slate-900 leading-snug">Organization Report</h4>
                        <p className="text-[10px] text-slate-400 font-medium mt-1 leading-relaxed">
                          Overall performance across all departments
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* Section 2: Report Configuration */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                    <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                      <SlidersHorizontal className="w-4 h-4 text-[#5551ff]" />
                      <div>
                        <h3 className="text-sm font-black text-slate-900">Report Configuration</h3>
                        <p className="text-[11px] text-slate-400 font-medium">Customize your report parameters.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                      {/* Field 1: Report Type */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold uppercase text-slate-400">Report Type</label>
                        <select
                          value={reportType}
                          onChange={(e) => setReportType(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-800 shadow-xs focus:outline-none cursor-pointer"
                        >
                          <option value="Session Summary Report">Session Summary Report</option>
                          <option value="Participant Report">Participant Report</option>
                          <option value="Learning Impact Report">Learning Impact Report</option>
                          <option value="Inclusion Impact Report">Inclusion Impact Report</option>
                        </select>
                      </div>

                      {/* Field 2: Select Session */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold uppercase text-slate-400">Select Session</label>
                        <select
                          value={reportSession}
                          onChange={(e) => setReportSession(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-800 shadow-xs focus:outline-none cursor-pointer"
                        >
                          <option value="TCS Leadership Workshop 2026">TCS Leadership Workshop 2026</option>
                          <option value="HR & DEI Training Batch 2">HR & DEI Training Batch 2</option>
                          <option value="All Sessions">All Sessions</option>
                        </select>
                      </div>

                      {/* Field 3: Date Range */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold uppercase text-slate-400">Date Range</label>
                        <div className="relative">
                          <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                          <input
                            type="text"
                            value={reportDateRange}
                            onChange={(e) => setReportDateRange(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-800 shadow-xs focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Field 4: Participant Status */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold uppercase text-slate-400">Participant Status</label>
                        <select
                          value={reportParticipantStatus}
                          onChange={(e) => setReportParticipantStatus(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-800 shadow-xs focus:outline-none cursor-pointer"
                        >
                          <option value="All Participants">All Participants</option>
                          <option value="Completed Only">Completed Only</option>
                          <option value="In Progress">In Progress</option>
                        </select>
                      </div>

                      {/* Field 5: Organization */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold uppercase text-slate-400">Organization</label>
                        <select
                          value={reportOrganization}
                          onChange={(e) => setReportOrganization(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-800 shadow-xs focus:outline-none cursor-pointer"
                        >
                          <option value="All Organizations">All Organizations</option>
                          <option value="Tata Consultancy Services">Tata Consultancy Services</option>
                        </select>
                      </div>

                      {/* Field 6: Include Sections */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold uppercase text-slate-400">Include Sections</label>
                        <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50 border border-slate-200 rounded-xl min-h-[38px] items-center">
                          {reportIncludeSections.map((sec) => (
                            <span key={sec} className="px-2 py-0.5 rounded-lg bg-purple-100 text-[#5551ff] text-[10px] font-extrabold flex items-center space-x-1">
                              <span>{sec}</span>
                              <button
                                onClick={() => setReportIncludeSections(reportIncludeSections.filter(s => s !== sec))}
                                className="hover:text-rose-600 cursor-pointer ml-1"
                              >
                                ✕
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Generated Reports Table (12) */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-3">
                      <div className="flex items-center space-x-2">
                        <FileCheck className="w-4 h-4 text-[#5551ff]" />
                        <div>
                          <h3 className="text-sm font-black text-slate-900">Generated Reports (12)</h3>
                          <p className="text-[11px] text-slate-400 font-medium">View and download previously generated reports.</p>
                        </div>
                      </div>

                      <div className="relative w-full sm:w-64">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          placeholder="Search reports..."
                          value={reportSearchQuery}
                          onChange={(e) => setReportSearchQuery(e.target.value)}
                          className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-xs focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                            <th className="py-2 px-2 w-8">
                              <input type="checkbox" className="rounded text-[#5551ff]" />
                            </th>
                            <th className="py-2 px-3">Report Name</th>
                            <th className="py-2 px-3">Type</th>
                            <th className="py-2 px-3">Session</th>
                            <th className="py-2 px-3">Date Range</th>
                            <th className="py-2 px-3">Generated On</th>
                            <th className="py-2 px-3">Status</th>
                            <th className="py-2 px-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs">
                          {[
                            {
                              id: 'rep-1',
                              name: 'TCS Leadership Workshop 2026 Session Summary',
                              type: 'Session',
                              typeBg: 'bg-purple-100 text-purple-700',
                              session: 'TCS Leadership Workshop 2026',
                              dateRange: '15 Oct 2024',
                              generatedOn: '15 Oct 2024 04:30 PM',
                              status: 'Completed'
                            },
                            {
                              id: 'rep-2',
                              name: 'Q3 2024 Performance Report',
                              type: 'Organization',
                              typeBg: 'bg-indigo-100 text-indigo-700',
                              session: 'All Sessions',
                              dateRange: 'Jul 2024 - Sep 2024',
                              generatedOn: '01 Oct 2024 11:20 AM',
                              status: 'Completed'
                            },
                            {
                              id: 'rep-3',
                              name: 'Learning Impact Analysis',
                              type: 'Learning',
                              typeBg: 'bg-blue-100 text-blue-700',
                              session: 'All Sessions',
                              dateRange: 'Jul 2024 - Sep 2024',
                              generatedOn: '01 Oct 2024 09:15 AM',
                              status: 'Completed'
                            },
                            {
                              id: 'rep-4',
                              name: 'Inclusion Impact Report',
                              type: 'Inclusion',
                              typeBg: 'bg-amber-100 text-amber-700',
                              session: 'All Sessions',
                              dateRange: 'Jul 2024 - Sep 2024',
                              generatedOn: '30 Sep 2024 05:45 PM',
                              status: 'Completed'
                            },
                            {
                              id: 'rep-5',
                              name: 'Participant Details Report',
                              type: 'Participant',
                              typeBg: 'bg-purple-100 text-purple-700',
                              session: 'HR & DEI Training',
                              dateRange: '10 Oct 2024',
                              generatedOn: '10 Oct 2024 02:30 PM',
                              status: 'Completed'
                            }
                          ].map((rep) => (
                            <tr key={rep.id} className="hover:bg-slate-50/70 transition-colors">
                              <td className="py-3 px-2">
                                <input type="checkbox" className="rounded text-[#5551ff]" />
                              </td>
                              <td className="py-3 px-3 font-bold text-slate-900">{rep.name}</td>
                              <td className="py-3 px-3">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${rep.typeBg}`}>
                                  {rep.type}
                                </span>
                              </td>
                              <td className="py-3 px-3 text-slate-500 font-medium">{rep.session}</td>
                              <td className="py-3 px-3 text-slate-500 font-medium">{rep.dateRange}</td>
                              <td className="py-3 px-3 text-slate-500 font-medium">{rep.generatedOn}</td>
                              <td className="py-3 px-3">
                                <span className="flex items-center space-x-1.5 text-emerald-600 font-extrabold text-[11px]">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                  <span>{rep.status}</span>
                                </span>
                              </td>
                              <td className="py-3 px-3 text-right">
                                <div className="flex items-center justify-end space-x-2">
                                  <button className="px-2.5 py-1 rounded-lg border border-purple-200 bg-purple-50 hover:bg-purple-100 text-[#5551ff] text-[10px] font-extrabold flex items-center space-x-1 cursor-pointer">
                                    <Download className="w-3 h-3" />
                                    <span>Download</span>
                                  </button>
                                  <button className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                                    <MoreVertical className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>

                {/* RIGHT SIDEBAR PANEL (4 Cols) - Report Preview & Export Options */}
                <div className="lg:col-span-4 space-y-6">
                  
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-5 sticky top-6">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-[#5551ff]" />
                        <h3 className="text-sm font-black text-slate-900">Report Preview</h3>
                      </div>

                      <button className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-[10px] font-extrabold flex items-center space-x-1 cursor-pointer">
                        <Maximize2 className="w-3 h-3 text-slate-500" />
                        <span>Full Screen</span>
                      </button>
                    </div>

                    {/* Report Preview Document Component */}
                    <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80 shadow-inner space-y-4">
                      
                      {/* Document Top Header / Logo Bar */}
                      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                        <div className="flex items-center space-x-1.5">
                          <div className="w-6 h-6 rounded bg-[#0d0d2b] text-white text-[9px] font-black flex items-center justify-center">
                            CII
                          </div>
                          <div>
                            <div className="text-[8px] font-black text-slate-800 leading-tight">Confederation of Indian Industry</div>
                            <div className="text-[7px] text-slate-400 font-bold leading-tight">Centre for Women Leadership (CII - CWL)</div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-[9px] font-black text-[#5551ff]">INCLUSIVE TYCOON</div>
                          <div className="text-[7px] font-bold text-rose-500">CII CWL Workplace Inclusion Strategy Game</div>
                        </div>
                      </div>

                      {/* Main Document Title */}
                      <div className="text-center space-y-1 py-1">
                        <h2 className="text-base font-black text-slate-900 tracking-tight">Session Summary Report</h2>
                        <div className="text-xs font-extrabold text-[#5551ff]">{reportSession}</div>
                        <div className="text-[10px] text-slate-400 font-medium">15 October 2024</div>
                      </div>

                      {/* Executive Summary 4-Grid Stats inside Preview */}
                      <div className="space-y-1.5">
                        <div className="text-[10px] font-black text-slate-700">Executive Summary</div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-center space-y-0.5">
                            <Users className="w-3.5 h-3.5 text-purple-600 mx-auto" />
                            <div className="text-sm font-black text-slate-900">48</div>
                            <div className="text-[9px] font-bold text-slate-400">Participants</div>
                          </div>

                          <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-center space-y-0.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mx-auto" />
                            <div className="text-sm font-black text-slate-900">36</div>
                            <div className="text-[9px] font-bold text-slate-400">Completed (75%)</div>
                          </div>

                          <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-center space-y-0.5">
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400 mx-auto" />
                            <div className="text-sm font-black text-slate-900">1,420</div>
                            <div className="text-[9px] font-bold text-slate-400">Average Final Score</div>
                          </div>

                          <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-center space-y-0.5">
                            <BarChart3 className="w-3.5 h-3.5 text-blue-600 mx-auto" />
                            <div className="text-sm font-black text-slate-900">+24%</div>
                            <div className="text-[9px] font-bold text-slate-400">Average Learning Improvement</div>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Report Sections Checkbox List */}
                    <div className="space-y-2.5">
                      <div className="flex items-center space-x-1.5 border-b border-slate-100 pb-2">
                        <FileText className="w-3.5 h-3.5 text-[#5551ff]" />
                        <h4 className="text-xs font-black text-slate-900">Report Sections</h4>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        {[
                          { key: 'executiveSummary', label: 'Executive Summary', sub: 'Key metrics and highlights' },
                          { key: 'learningOutcomes', label: 'Learning Outcomes', sub: 'Pre-post assessment analysis' },
                          { key: 'participationAnalysis', label: 'Participation Analysis', sub: 'Attendance and completion rates' },
                          { key: 'inclusionImpact', label: 'Inclusion Impact', sub: 'Diversity and inclusion metrics' },
                          { key: 'scoreAnalysis', label: 'Score Analysis', sub: 'Performance and score distribution' },
                          { key: 'participantFeedback', label: 'Participant Feedback', sub: 'Ratings and feedback summary' }
                        ].map((sec) => (
                          <label key={sec.key} className="flex items-start space-x-2 cursor-pointer p-1 rounded-lg hover:bg-slate-50">
                            <input
                              type="checkbox"
                              checked={reportSectionsChecklist[sec.key as keyof typeof reportSectionsChecklist]}
                              onChange={(e) => setReportSectionsChecklist({
                                ...reportSectionsChecklist,
                                [sec.key]: e.target.checked
                              })}
                              className="mt-0.5 rounded text-[#5551ff]"
                            />
                            <div>
                              <div className="font-bold text-slate-800 leading-tight">{sec.label}</div>
                              <div className="text-[9px] text-slate-400 font-medium leading-tight">{sec.sub}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Export Options */}
                    <div className="space-y-3 pt-2 border-t border-slate-100">
                      <div className="flex items-center space-x-1.5">
                        <Download className="w-3.5 h-3.5 text-[#5551ff]" />
                        <h4 className="text-xs font-black text-slate-900">Export Options</h4>
                      </div>

                      <button className="w-full py-3 bg-[#5551ff] hover:bg-indigo-600 text-white rounded-xl text-xs font-black shadow-md flex items-center justify-center space-x-2 transition-all cursor-pointer">
                        <Download className="w-4 h-4" />
                        <span>Download PDF</span>
                      </button>

                      <div className="grid grid-cols-2 gap-2">
                        <button className="py-2.5 px-3 bg-purple-50 hover:bg-purple-100 text-[#5551ff] border border-purple-200 rounded-xl text-xs font-extrabold flex items-center justify-center space-x-1.5 cursor-pointer transition-colors">
                          <FileText className="w-3.5 h-3.5" />
                          <span>Export CSV</span>
                        </button>
                        <button className="py-2.5 px-3 bg-purple-50 hover:bg-purple-100 text-[#5551ff] border border-purple-200 rounded-xl text-xs font-extrabold flex items-center justify-center space-x-1.5 cursor-pointer transition-colors">
                          <Send className="w-3.5 h-3.5" />
                          <span>Send via Email</span>
                        </button>
                      </div>
                    </div>

                  </div>

                </div>

              </div>

            </div>
          )}

          {/* LIVE SESSIONS TAB VIEW */}
          {activeTab === 'live' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Live Sessions Monitoring</h1>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-black flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>1 Live Session Active</span>
                </span>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-base font-black text-slate-900">TCS Leadership Workshop 2026</h3>
                    <p className="text-xs text-slate-400 font-medium">Started at 10:00 AM • Round 4 of 10</p>
                  </div>
                  <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-black shadow-xs">
                    Join Live Monitor
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100 text-center">
                    <div className="text-2xl font-black text-slate-900">48 / 50</div>
                    <div className="text-xs font-bold text-slate-500">Active Players</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-center">
                    <div className="text-2xl font-black text-slate-900">Round 4</div>
                    <div className="text-xs font-bold text-slate-500">Current Phase</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 text-center">
                    <div className="text-2xl font-black text-slate-900">82%</div>
                    <div className="text-xs font-bold text-slate-500">Current Inclusion Score</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* LEARNING MATERIALS TAB VIEW (MATCHES REFERENCE SCREENSHOT EXACTLY) */}
          {activeTab === 'learning' && (
            <div className="space-y-6 animate-fadeIn pb-12">
              
              {/* 1. Header Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">Learning Materials</h1>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                    Manage learning content, case studies, examples, and resources for participants.
                  </p>
                </div>

                <div className="shrink-0">
                  <button className="px-5 py-2.5 bg-[#5551ff] hover:bg-indigo-600 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center space-x-2 transition-all cursor-pointer">
                    <Plus className="w-4 h-4" />
                    <span>Add New Material</span>
                  </button>
                </div>
              </div>

              {/* 2. Top Stats Bar (5 Mini Stat Cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                
                {/* Card 1: Total Materials */}
                <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-xs flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-purple-100/80 text-[#5551ff] flex items-center justify-center shrink-0">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900">36</div>
                      <div className="text-xs font-bold text-slate-400">Total Materials</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">↑ 12%</span>
                    <svg className="w-12 h-5 text-purple-400" viewBox="0 0 60 30" fill="none">
                      <path d="M5 25 L20 18 L35 22 L55 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* Card 2: Published */}
                <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-xs flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-100/80 text-emerald-600 flex items-center justify-center shrink-0">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900">12</div>
                      <div className="text-xs font-bold text-slate-400">Published</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">↑ 33%</span>
                    <svg className="w-12 h-5 text-emerald-400" viewBox="0 0 60 30" fill="none">
                      <path d="M5 25 L20 20 L35 12 L55 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* Card 3: Drafts */}
                <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-xs flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-100/80 text-amber-600 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900">8</div>
                      <div className="text-xs font-bold text-slate-400">Drafts</div>
                    </div>
                  </div>
                </div>

                {/* Card 4: Used in Sessions */}
                <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-xs flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-sky-100/80 text-sky-600 flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900">16</div>
                      <div className="text-xs font-bold text-slate-400">Used in Sessions</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">↑ 25%</span>
                    <svg className="w-12 h-5 text-sky-400" viewBox="0 0 60 30" fill="none">
                      <path d="M5 22 L20 18 L35 15 L55 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* Card 5: Average Rating */}
                <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-xs flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-purple-100/80 text-[#5551ff] flex items-center justify-center shrink-0">
                      <Star className="w-5 h-5 text-purple-600 fill-purple-200" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900">4.6 / 5</div>
                      <div className="text-xs font-bold text-slate-400">Average Rating</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">↑ 8%</span>
                    <svg className="w-12 h-5 text-purple-400" viewBox="0 0 60 30" fill="none">
                      <path d="M5 25 L20 22 L35 14 L55 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

              </div>

              {/* 3. Main 2-Column Grid Layout (Left 8 cols, Right 4 cols) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* LEFT MAIN TABLE AREA (8 Cols) */}
                <div className="lg:col-span-8 space-y-4">

                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-5">
                    
                    {/* Filter Tabs Bar */}
                    <div className="flex items-center space-x-6 border-b border-slate-100 pb-2 overflow-x-auto">
                      {[
                        { id: 'all', label: 'All Materials (36)' },
                        { id: 'pre', label: 'Pre-Game (8)' },
                        { id: 'in', label: 'In-Game (12)' },
                        { id: 'post', label: 'Post-Game (6)' },
                        { id: 'cases', label: 'Case Studies (6)' },
                        { id: 'examples', label: 'Examples (4)' }
                      ].map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setLearningTab(t.id as any)}
                          className={`text-xs font-extrabold pb-2 border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
                            learningTab === t.id
                              ? 'border-[#5551ff] text-[#5551ff]'
                              : 'border-transparent text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>

                    {/* Filter Controls Bar */}
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="relative flex-1 min-w-[180px]">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          placeholder="Search materials..."
                          value={learningSearch}
                          onChange={(e) => setLearningSearch(e.target.value)}
                          className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none shadow-xs"
                        />
                      </div>

                      <select
                        value={learningTypeFilter}
                        onChange={(e) => setLearningTypeFilter(e.target.value)}
                        className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
                      >
                        <option value="all">Content Type: All</option>
                        <option value="video">Video</option>
                        <option value="case">Case Study</option>
                        <option value="interactive">Interactive</option>
                        <option value="document">Document</option>
                      </select>

                      <select
                        value={learningStageFilter}
                        onChange={(e) => setLearningStageFilter(e.target.value)}
                        className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
                      >
                        <option value="all">Stage: All Stages</option>
                        <option value="pre">Pre-Game</option>
                        <option value="in">In-Game</option>
                        <option value="post">Post-Game</option>
                      </select>

                      <select
                        value={learningStatusFilter}
                        onChange={(e) => setLearningStatusFilter(e.target.value)}
                        className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
                      >
                        <option value="all">Status: All Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                      </select>

                      <select
                        value={learningLangFilter}
                        onChange={(e) => setLearningLangFilter(e.target.value)}
                        className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
                      >
                        <option value="all">Language: All</option>
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                      </select>

                      <button className="px-4 py-2 bg-[#5551ff] hover:bg-indigo-600 text-white font-extrabold text-xs rounded-xl shadow-xs cursor-pointer">
                        Apply Filters
                      </button>

                      <button
                        onClick={() => {
                          setLearningSearch('');
                          setLearningTypeFilter('all');
                          setLearningStageFilter('all');
                          setLearningStatusFilter('all');
                          setLearningLangFilter('all');
                        }}
                        className="text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer px-2"
                      >
                        Reset
                      </button>
                    </div>

                    {/* Materials Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                            <th className="py-2 px-2 w-8">
                              <input type="checkbox" className="rounded text-[#5551ff]" />
                            </th>
                            <th className="py-2 px-3">Title</th>
                            <th className="py-2 px-3">Type</th>
                            <th className="py-2 px-3">Stage</th>
                            <th className="py-2 px-3">Duration</th>
                            <th className="py-2 px-3">Status</th>
                            <th className="py-2 px-3">Usage</th>
                            <th className="py-2 px-3">Rating</th>
                            <th className="py-2 px-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs">
                          {[
                            {
                              id: 'mat-1',
                              title: 'Introduction to Inclusive Leadership',
                              sub: 'Why inclusion matters in modern workplaces',
                              type: 'Video',
                              typeIcon: <Video className="w-3.5 h-3.5 text-purple-600" />,
                              stage: 'Pre-Game',
                              stageBg: 'bg-purple-100 text-purple-700',
                              duration: '8 min',
                              status: 'Published',
                              usage: '18 sessions',
                              rating: '4.8',
                              thumb: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80'
                            },
                            {
                              id: 'mat-2',
                              title: 'Case Study: Digital Inclusion at TCS',
                              sub: 'Real-world example of inclusive practices',
                              type: 'Case Study',
                              typeIcon: <FileText className="w-3.5 h-3.5 text-blue-600" />,
                              stage: 'Pre-Game',
                              stageBg: 'bg-purple-100 text-purple-700',
                              duration: '12 min',
                              status: 'Published',
                              usage: '15 sessions',
                              rating: '4.6',
                              thumb: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=120&q=80'
                            },
                            {
                              id: 'mat-3',
                              title: 'Understanding Unconscious Bias',
                              sub: 'Interactive learning module',
                              type: 'Interactive',
                              typeIcon: <Gamepad2 className="w-3.5 h-3.5 text-indigo-600" />,
                              stage: 'Pre-Game',
                              stageBg: 'bg-purple-100 text-purple-700',
                              duration: '10 min',
                              status: 'Published',
                              usage: '20 sessions',
                              rating: '4.5',
                              thumb: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=120&q=80'
                            },
                            {
                              id: 'mat-4',
                              title: 'Investment Decision Guidelines',
                              sub: 'How to evaluate inclusive investments',
                              type: 'Document',
                              typeIcon: <FileText className="w-3.5 h-3.5 text-slate-600" />,
                              stage: 'In-Game',
                              stageBg: 'bg-blue-100 text-blue-700',
                              duration: '5 min',
                              status: 'Published',
                              usage: '22 sessions',
                              rating: '4.4',
                              thumb: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=120&q=80'
                            },
                            {
                              id: 'mat-5',
                              title: 'Event Scenario Examples',
                              sub: 'Sample event scenarios and outcomes',
                              type: 'Document',
                              typeIcon: <FileText className="w-3.5 h-3.5 text-slate-600" />,
                              stage: 'In-Game',
                              stageBg: 'bg-blue-100 text-blue-700',
                              duration: '7 min',
                              status: 'Published',
                              usage: '18 sessions',
                              rating: '4.3',
                              thumb: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=120&q=80'
                            },
                            {
                              id: 'mat-6',
                              title: 'Building a Diverse Workforce',
                              sub: 'Strategies for inclusive hiring',
                              type: 'Video',
                              typeIcon: <Video className="w-3.5 h-3.5 text-purple-600" />,
                              stage: 'Post-Game',
                              stageBg: 'bg-rose-100 text-rose-700',
                              duration: '9 min',
                              status: 'Published',
                              usage: '16 sessions',
                              rating: '4.7',
                              thumb: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=120&q=80'
                            },
                            {
                              id: 'mat-7',
                              title: 'Measuring Inclusion Impact',
                              sub: 'Key metrics and frameworks',
                              type: 'Document',
                              typeIcon: <FileText className="w-3.5 h-3.5 text-slate-600" />,
                              stage: 'Post-Game',
                              stageBg: 'bg-rose-100 text-rose-700',
                              duration: '6 min',
                              status: 'Draft',
                              usage: '-',
                              rating: '-',
                              thumb: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=120&q=80'
                            },
                            {
                              id: 'mat-8',
                              title: 'Success Story: Women in Tech',
                              sub: 'Inspiring journey of women leaders',
                              type: 'Case Study',
                              typeIcon: <FileText className="w-3.5 h-3.5 text-blue-600" />,
                              stage: 'Post-Game',
                              stageBg: 'bg-rose-100 text-rose-700',
                              duration: '10 min',
                              status: 'Published',
                              usage: '12 sessions',
                              rating: '4.9',
                              thumb: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=120&q=80'
                            }
                          ].map((mat) => (
                            <tr
                              key={mat.id}
                              onClick={() => setSelectedMaterialId(mat.id)}
                              className={`cursor-pointer transition-colors ${
                                selectedMaterialId === mat.id ? 'bg-purple-50/60' : 'hover:bg-slate-50/70'
                              }`}
                            >
                              <td className="py-3 px-2">
                                <input type="checkbox" className="rounded text-[#5551ff]" />
                              </td>
                              <td className="py-3 px-3">
                                <div className="flex items-center space-x-3">
                                  <img
                                    src={mat.thumb}
                                    alt={mat.title}
                                    className="w-10 h-8 rounded-lg object-cover shrink-0 border border-slate-200"
                                  />
                                  <div>
                                    <div className="font-bold text-slate-900 leading-snug">{mat.title}</div>
                                    <div className="text-[10px] text-slate-400 font-medium">{mat.sub}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-3">
                                <div className="flex items-center space-x-1 font-bold text-slate-700 text-[11px]">
                                  {mat.typeIcon}
                                  <span>{mat.type}</span>
                                </div>
                              </td>
                              <td className="py-3 px-3">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${mat.stageBg}`}>
                                  {mat.stage}
                                </span>
                              </td>
                              <td className="py-3 px-3 text-slate-500 font-medium">{mat.duration}</td>
                              <td className="py-3 px-3">
                                {mat.status === 'Published' ? (
                                  <span className="flex items-center space-x-1.5 text-emerald-600 font-extrabold text-[11px]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                    <span>Published</span>
                                  </span>
                                ) : (
                                  <span className="flex items-center space-x-1.5 text-amber-600 font-extrabold text-[11px]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                    <span>Draft</span>
                                  </span>
                                )}
                              </td>
                              <td className="py-3 px-3 text-slate-500 font-medium">{mat.usage}</td>
                              <td className="py-3 px-3">
                                {mat.rating !== '-' ? (
                                  <span className="flex items-center space-x-1 font-bold text-slate-800">
                                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                                    <span>{mat.rating}</span>
                                  </span>
                                ) : (
                                  <span className="text-slate-400">-</span>
                                )}
                              </td>
                              <td className="py-3 px-3 text-right">
                                <div className="flex items-center justify-end space-x-2">
                                  <button className="px-2.5 py-1 rounded-lg border border-purple-200 bg-purple-50 hover:bg-purple-100 text-[#5551ff] text-[10px] font-extrabold cursor-pointer">
                                    Edit
                                  </button>
                                  <button className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                                    <MoreVertical className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Footer Pagination */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-slate-100 text-xs font-bold text-slate-500">
                      <div>Showing 1-8 of 36 materials</div>

                      <div className="flex items-center space-x-1.5">
                        <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">
                          <ChevronLeft className="w-3.5 h-3.5 text-slate-400" />
                        </button>
                        <button className="w-7 h-7 rounded-lg bg-[#5551ff] text-white flex items-center justify-center font-black">1</button>
                        <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">2</button>
                        <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">3</button>
                        <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">4</button>
                        <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">5</button>
                        <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                        </button>
                      </div>

                      <div className="flex items-center space-x-2">
                        <select className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700">
                          <option value="10">10</option>
                          <option value="20">20</option>
                          <option value="50">50</option>
                        </select>
                        <span>per page</span>
                      </div>
                    </div>

                  </div>

                </div>

                {/* RIGHT SIDEBAR DRAWER PANEL (4 Cols) - Active Material Details */}
                <div className="lg:col-span-4 space-y-6">
                  
                  <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs space-y-4 sticky top-6">
                    
                    {/* Header Card with Thumbnail Banner */}
                    <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 group">
                      <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
                        alt="Material Header"
                        className="w-full h-32 object-cover opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-between p-3.5">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/90 text-white text-[9px] font-black flex items-center space-x-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                            <span>Published</span>
                          </span>

                          <button className="p-1 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 cursor-pointer">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-end justify-between">
                          <div>
                            <h3 className="text-sm font-black text-white leading-tight">Introduction to Inclusive Leadership</h3>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-[#5551ff] text-white flex items-center justify-center shrink-0 shadow-md">
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sub-Navigation Tabs inside Drawer */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-1 text-xs font-bold text-slate-400">
                      {[
                        { id: 'overview', label: 'Overview' },
                        { id: 'content', label: 'Content' },
                        { id: 'usage', label: 'Usage' },
                        { id: 'feedback', label: 'Feedback' }
                      ].map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setMaterialDrawerTab(t.id as any)}
                          className={`pb-1.5 border-b-2 cursor-pointer transition-colors ${
                            materialDrawerTab === t.id
                              ? 'border-[#5551ff] text-[#5551ff] font-extrabold'
                              : 'border-transparent text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>

                    {/* Tab 1: Overview */}
                    {materialDrawerTab === 'overview' && (
                      <div className="space-y-4">
                        
                        {/* Basic Information */}
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <div className="flex items-center space-x-1.5">
                              <FileText className="w-3.5 h-3.5 text-[#5551ff]" />
                              <h4 className="text-xs font-black text-slate-900">Basic Information</h4>
                            </div>

                            <button className="text-[11px] font-extrabold text-[#5551ff] hover:underline cursor-pointer flex items-center space-x-1">
                              <Edit3 className="w-3 h-3" />
                              <span>Edit</span>
                            </button>
                          </div>

                          <div className="space-y-2 text-xs">
                            <div>
                              <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Title</span>
                              <span className="font-bold text-slate-900">Introduction to Inclusive Leadership</span>
                            </div>

                            <div>
                              <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Description</span>
                              <p className="text-slate-600 text-[11px] font-medium leading-relaxed mt-0.5">
                                Why inclusion matters in modern workplaces and how inclusive leadership drives better business outcomes.
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-2 pt-1">
                              <div>
                                <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Type</span>
                                <div className="flex items-center space-x-1 font-bold text-purple-700 text-[11px] mt-0.5">
                                  <Video className="w-3.5 h-3.5 text-purple-600" />
                                  <span>Video</span>
                                </div>
                              </div>

                              <div>
                                <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Stage</span>
                                <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[10px] font-extrabold inline-block mt-0.5">
                                  Pre-Game
                                </span>
                              </div>

                              <div>
                                <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Duration</span>
                                <span className="font-bold text-slate-800 text-[11px] mt-0.5 block">8 minutes</span>
                              </div>

                              <div>
                                <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Language</span>
                                <span className="font-bold text-slate-800 text-[11px] mt-0.5 block">English</span>
                              </div>
                            </div>

                            <div className="pt-1">
                              <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">Tags</span>
                              <div className="flex flex-wrap gap-1">
                                <span className="px-2 py-0.5 rounded-md bg-[#5551ff]/10 text-[#5551ff] text-[10px] font-bold">Leadership</span>
                                <span className="px-2 py-0.5 rounded-md bg-sky-100 text-sky-700 text-[10px] font-bold">Inclusion</span>
                                <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 text-[10px] font-bold">Diversity</span>
                                <button className="px-2 py-0.5 rounded-md border border-dashed border-slate-300 text-slate-400 text-[10px] font-bold hover:text-slate-600">
                                  + Add Tag
                                </button>
                              </div>
                            </div>

                          </div>
                        </div>

                        {/* Content Preview */}
                        <div className="space-y-2.5 pt-2 border-t border-slate-100">
                          <div className="flex items-center space-x-1.5">
                            <Eye className="w-3.5 h-3.5 text-[#5551ff]" />
                            <h4 className="text-xs font-black text-slate-900">Content Preview</h4>
                          </div>

                          <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200">
                            <img
                              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
                              alt="Video Preview"
                              className="w-full h-36 object-cover opacity-75"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-10 h-10 rounded-full bg-white/90 text-[#5551ff] flex items-center justify-center shadow-lg hover:scale-105 cursor-pointer transition-transform">
                                <Play className="w-5 h-5 fill-current ml-0.5" />
                              </div>
                            </div>
                            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-950/80 text-white text-[9px] font-mono">
                              08:24
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
                            <span className="truncate max-w-[200px]">File: inclusive-leadership-intro.mp4</span>
                            <button className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold cursor-pointer">
                              Replace
                            </button>
                          </div>
                        </div>

                        {/* Usage Statistics */}
                        <div className="space-y-2.5 pt-2 border-t border-slate-100">
                          <div className="flex items-center space-x-1.5">
                            <BarChart3 className="w-3.5 h-3.5 text-[#5551ff]" />
                            <h4 className="text-xs font-black text-slate-900">Usage Statistics</h4>
                          </div>

                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="p-2 bg-purple-50/70 border border-purple-100 rounded-xl space-y-0.5">
                              <Users className="w-3.5 h-3.5 text-purple-600 mx-auto" />
                              <div className="text-sm font-black text-slate-900">18</div>
                              <div className="text-[9px] font-bold text-slate-400">Sessions Used</div>
                            </div>

                            <div className="p-2 bg-purple-50/70 border border-purple-100 rounded-xl space-y-0.5">
                              <Eye className="w-3.5 h-3.5 text-purple-600 mx-auto" />
                              <div className="text-sm font-black text-slate-900">842</div>
                              <div className="text-[9px] font-bold text-slate-400">Total Views</div>
                            </div>

                            <div className="p-2 bg-emerald-50/70 border border-emerald-100 rounded-xl space-y-0.5">
                              <TrendingUp className="w-3.5 h-3.5 text-emerald-600 mx-auto" />
                              <div className="text-sm font-black text-slate-900">76%</div>
                              <div className="text-[9px] font-bold text-slate-400">Completion Rate</div>
                            </div>
                          </div>
                        </div>

                        {/* Feedback Summary */}
                        <div className="space-y-2.5 pt-2 border-t border-slate-100">
                          <div className="flex items-center space-x-1.5">
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                            <h4 className="text-xs font-black text-slate-900">Feedback Summary</h4>
                          </div>

                          <div className="grid grid-cols-3 gap-1 text-center divide-x divide-slate-100">
                            <div className="space-y-0.5">
                              <div className="text-sm font-black text-slate-900">4.8 / 5</div>
                              <div className="text-[9px] font-bold text-slate-400">Average Rating</div>
                            </div>

                            <div className="space-y-0.5 pl-1">
                              <div className="text-sm font-black text-slate-900">92%</div>
                              <div className="text-[9px] font-bold text-slate-400">Would Recommend</div>
                            </div>

                            <div className="space-y-0.5 pl-1">
                              <div className="text-sm font-black text-slate-900">48</div>
                              <div className="text-[9px] font-bold text-slate-400">Total Reviews</div>
                            </div>
                          </div>
                        </div>

                        {/* Actions Footer */}
                        <div className="pt-3 border-t border-slate-100 space-y-2">
                          <div className="text-[10px] font-black uppercase text-slate-400">Actions</div>
                          <div className="grid grid-cols-3 gap-2">
                            <button className="py-2 px-2 bg-purple-50 hover:bg-purple-100 text-[#5551ff] border border-purple-200 rounded-xl text-[11px] font-extrabold flex items-center justify-center space-x-1 cursor-pointer">
                              <Play className="w-3 h-3 fill-current" />
                              <span>Preview</span>
                            </button>
                            <button className="py-2 px-2 bg-purple-50 hover:bg-purple-100 text-[#5551ff] border border-purple-200 rounded-xl text-[11px] font-extrabold flex items-center justify-center space-x-1 cursor-pointer">
                              <Copy className="w-3 h-3" />
                              <span>Duplicate</span>
                            </button>
                            <button className="py-2 px-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl text-[11px] font-extrabold flex items-center justify-center space-x-1 cursor-pointer">
                              <Trash2 className="w-3 h-3" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>

                      </div>
                    )}

                  </div>

                </div>

              </div>

            </div>
          )}
        </main>
      </div>

    </div>
  );
};
