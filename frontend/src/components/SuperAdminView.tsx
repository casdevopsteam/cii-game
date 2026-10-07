import React, { useState, useEffect } from 'react';
import { fetchApi } from '../api/client';
import { 
  Trophy, 
  LayoutDashboard, 
  BarChart3, 
  Layers, 
  Users, 
  Gamepad2, 
  BookOpen, 
  HelpCircle, 
  FileCheck, 
  FileText, 
  Building2, 
  UserCheck, 
  ShieldCheck, 
  Award, 
  Activity, 
  FileSpreadsheet, 
  Bell, 
  Settings, 
  History, 
  Search, 
  Calendar, 
  ChevronDown, 
  Plus, 
  Target, 
  TrendingUp, 
  MoreVertical, 
  Grid, 
  List, 
  ArrowRight,
  Sparkles,
  CheckCircle2,
  PieChart,
  LogOut,
  Filter,
  Copy,
  Edit,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Check,
  Home,
  Upload,
  X,
  Clock,
  Wallet,
  Bold,
  Italic,
  Underline,
  ListOrdered,
  Link as LinkIcon,
  Lightbulb,
  Download,
  Tag,
  XCircle,
  Send,
  MessageSquare,
  Image as ImageIcon,
  Trash2,
  Eye,
  Star,
  Monitor,
  Mail,
  Key,
  Crown,
  ChevronUp,
  Lock,
  UserX,
  SlidersHorizontal,
  Palette,
  Zap,
  RotateCcw,
  RefreshCw,
  Globe,
  Database,
  MapPin,
  LogIn,
  Briefcase,
  BookMarked,
  AlertTriangle,
  Pencil
} from 'lucide-react';

interface SuperAdminViewProps {
  onNavigateToApp?: () => void;
  onLogout?: () => void;
}

export const SuperAdminView: React.FC<SuperAdminViewProps> = ({
  onNavigateToApp,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState('add-quiz-question');
  const [adminRole, setAdminRole] = useState<'superadmin' | 'partneradmin'>('superadmin');
  const [metrics, setMetrics] = useState<any>(null);
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Investment Cards Tab State
  const [selectedCardId, setSelectedCardId] = useState<number>(1);
  const [previewTab, setPreviewTab] = useState<'details' | 'learning' | 'quiz' | 'case'>('details');
  const [cardSearchQuery, setCardSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All Categories');
  const [selectedIndustryFilter, setSelectedIndustryFilter] = useState('All Industries');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All Status');
  const [selectedImpactFilter, setSelectedImpactFilter] = useState('All Levels');
  const [cardPage, setCardPage] = useState(1);

  // Add New Investment Card Form State
  const [newCardTitle, setNewCardTitle] = useState('Women Leadership Development');
  const [newCardCategory, setNewCardCategory] = useState('Leadership');
  const [newCardIndustry, setNewCardIndustry] = useState('HR');
  const [newCardShortDesc, setNewCardShortDesc] = useState('Leadership programs for high-potential women to build management skills and create future leaders.');
  const [newCardDetailedDesc, setNewCardDetailedDesc] = useState('Provide a detailed description of this investment opportunity...');
  const [newCardTags, setNewCardTags] = useState(['Women Leadership', 'Diversity', 'Workplace Inclusion', 'HR', 'Training']);
  const [newCardTagInput, setNewCardTagInput] = useState('');
  const [newCardCost, setNewCardCost] = useState('60000');
  const [newCardROI, setNewCardROI] = useState('1200000');
  const [newCardTimeline, setNewCardTimeline] = useState('6 Months');
  const [newCardImpactLevel, setNewCardImpactLevel] = useState('High');
  const [newCardInclusionScore, setNewCardInclusionScore] = useState('85');
  const [newCardInclusionArea, setNewCardInclusionArea] = useState('Leadership & Governance');
  const [newCardBeneficiaries, setNewCardBeneficiaries] = useState('Female Managers');

  const [formStep, setFormStep] = useState<'basic' | 'game' | 'learning' | 'quiz' | 'case' | 'settings'>('basic');
  const [previewMode, setPreviewMode] = useState<'game' | 'admin'>('game');

  // User Decisions Analytics Tab State
  const [selectedUserDecisionId, setSelectedUserDecisionId] = useState<number>(1);
  const [userDetailSubTab, setUserDetailSubTab] = useState<'decisions' | 'progress' | 'outcomes'>('decisions');
  const [decisionSearchQuery, setDecisionSearchQuery] = useState('');
  const [decisionTimePeriod, setDecisionTimePeriod] = useState('Jan 2024 - Oct 2024');
  const [decisionOrgFilter, setDecisionOrgFilter] = useState('All Organizations');
  const [decisionSegmentFilter, setDecisionSegmentFilter] = useState('All Segments');
  const [decisionCategoryFilter, setDecisionCategoryFilter] = useState('All Categories');
  const [decisionGameModeFilter, setDecisionGameModeFilter] = useState('All Modes');

  // User Decisions Table Data matching reference screenshot
  const userDecisionsData = [
    {
      id: 1,
      userName: 'Priya Sharma',
      userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80',
      organization: 'TCS',
      segment: 'Corporate Segment',
      card: 'Flexible Work Infrastructure',
      category: 'Flexible Work',
      categoryBadge: 'bg-indigo-50 text-[#5551ff] border-indigo-200',
      decision: 'Invested',
      decisionBadge: 'bg-emerald-100 text-emerald-700',
      impact: 'High',
      impactBadge: 'bg-emerald-100 text-emerald-700',
      dateTime: '12 Oct 2024, 10:30 AM',
      investmentsCount: 12,
      gamesCount: 8,
      inclusionScore: '76%'
    },
    {
      id: 2,
      userName: 'Rahul Mehta',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
      organization: 'Infosys',
      segment: 'Tech Lead',
      card: 'Mentorship Program',
      category: 'Leadership',
      categoryBadge: 'bg-purple-100 text-purple-700 border-purple-200',
      decision: 'Invested',
      decisionBadge: 'bg-emerald-100 text-emerald-700',
      impact: 'Medium',
      impactBadge: 'bg-amber-100 text-amber-700',
      dateTime: '12 Oct 2024, 09:15 AM',
      investmentsCount: 15,
      gamesCount: 10,
      inclusionScore: '82%'
    },
    {
      id: 3,
      userName: 'Anjali Verma',
      userAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=100&q=80',
      organization: 'Accenture',
      segment: 'HR Lead',
      card: 'Pay Equity Audit Program',
      category: 'Compensation',
      categoryBadge: 'bg-blue-100 text-blue-700 border-blue-200',
      decision: 'Skipped',
      decisionBadge: 'bg-rose-100 text-rose-700',
      impact: '-',
      impactBadge: 'text-slate-400',
      dateTime: '11 Oct 2024, 04:22 PM',
      investmentsCount: 9,
      gamesCount: 6,
      inclusionScore: '68%'
    },
    {
      id: 4,
      userName: 'Karan Gupta',
      userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
      organization: 'Wipro',
      segment: 'Operations',
      card: 'Women Leadership Training',
      category: 'Leadership',
      categoryBadge: 'bg-purple-100 text-purple-700 border-purple-200',
      decision: 'Invested',
      decisionBadge: 'bg-emerald-100 text-emerald-700',
      impact: 'High',
      impactBadge: 'bg-emerald-100 text-emerald-700',
      dateTime: '11 Oct 2024, 02:10 PM',
      investmentsCount: 18,
      gamesCount: 12,
      inclusionScore: '88%'
    },
    {
      id: 5,
      userName: 'Sneha Iyer',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      organization: 'HCL',
      segment: 'Talent Acquisition',
      card: 'Inclusive Hiring Strategy',
      category: 'Recruitment',
      categoryBadge: 'bg-rose-100 text-rose-700 border-rose-200',
      decision: 'Invested',
      decisionBadge: 'bg-emerald-100 text-emerald-700',
      impact: 'High',
      impactBadge: 'bg-emerald-100 text-emerald-700',
      dateTime: '11 Oct 2024, 11:45 AM',
      investmentsCount: 14,
      gamesCount: 9,
      inclusionScore: '80%'
    },
    {
      id: 6,
      userName: 'Amit Kumar',
      userAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&q=80',
      organization: 'Deloitte',
      segment: 'CSR Lead',
      card: 'Accessibility & Assistive Tech',
      category: 'Workplace Culture',
      categoryBadge: 'bg-blue-100 text-blue-700 border-blue-200',
      decision: 'Skipped',
      decisionBadge: 'bg-rose-100 text-rose-700',
      impact: '-',
      impactBadge: 'text-slate-400',
      dateTime: '10 Oct 2024, 03:30 PM',
      investmentsCount: 7,
      gamesCount: 5,
      inclusionScore: '64%'
    },
    {
      id: 7,
      userName: 'Neha Reddy',
      userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80',
      organization: 'IBM',
      segment: 'Engineering',
      card: 'STEM Education Partnership',
      category: 'Community Impact',
      categoryBadge: 'bg-purple-100 text-purple-700 border-purple-200',
      decision: 'Invested',
      decisionBadge: 'bg-emerald-100 text-emerald-700',
      impact: 'Medium',
      impactBadge: 'bg-amber-100 text-amber-700',
      dateTime: '10 Oct 2024, 01:05 PM',
      investmentsCount: 11,
      gamesCount: 7,
      inclusionScore: '74%'
    },
    {
      id: 8,
      userName: 'Vikram Singh',
      userAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80',
      organization: 'Capgemini',
      segment: 'Diversity Lead',
      card: 'Diverse Hiring Strategy',
      category: 'Recruitment',
      categoryBadge: 'bg-purple-100 text-purple-700 border-purple-200',
      decision: 'Invested',
      decisionBadge: 'bg-emerald-100 text-emerald-700',
      impact: 'High',
      impactBadge: 'bg-emerald-100 text-emerald-700',
      dateTime: '09 Oct 2024, 04:50 PM',
      investmentsCount: 16,
      gamesCount: 11,
      inclusionScore: '85%'
    }
  ];

  const activeUserDecision = userDecisionsData.find(d => d.id === selectedUserDecisionId) || userDecisionsData[0];

  // Game Sessions Tab State
  const [selectedSessionId, setSelectedSessionId] = useState<number>(1);
  const [sessionDetailSubTab, setSessionDetailSubTab] = useState<'participants' | 'progress' | 'outcomes' | 'analytics'>('participants');
  const [sessionSearchQuery, setSessionSearchQuery] = useState('');
  const [sessionOrgFilter, setSessionOrgFilter] = useState('All Organizations');
  const [sessionStatusFilter, setSessionStatusFilter] = useState('All Status');
  const [sessionGameModeFilter, setSessionGameModeFilter] = useState('All Modes');
  const [sessionDateRange, setSessionDateRange] = useState('Jan 2024 - Oct 2024');

  // Inclusion Metrics View State & Data
  const [inclusionSubTab, setInclusionSubTab] = useState<'overview' | 'score' | 'learning' | 'behaviour' | 'comparison' | 'demographics' | 'trends'>('overview');
  const [inclusionTimePeriod, setInclusionTimePeriod] = useState('Jan 2024 - Oct 2024');
  const [inclusionOrgFilter, setInclusionOrgFilter] = useState('All Organizations');
  const [inclusionRoleFilter, setInclusionRoleFilter] = useState('All Roles');
  const [inclusionModeFilter, setInclusionModeFilter] = useState('All Modes');
  const [inclusionCategoryFilter, setInclusionCategoryFilter] = useState('All Categories');
  const [inclusionDeptFilter, setInclusionDeptFilter] = useState('All Departments');
  const [inclusionTrendMonth, setInclusionTrendMonth] = useState('Last 10 Months');
  const [inclusionModuleFilter, setInclusionModuleFilter] = useState('All Modules');

  const topPlayersInclusionData = [
    {
      rank: 1,
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80',
      org: 'TechMind Solutions',
      score: 92,
      learning: 100,
      behaviour: 88,
      gamesCompleted: 24,
      badges: ['gold', 'blue', 'purple']
    },
    {
      rank: 2,
      name: 'Ananya Singh',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80',
      org: 'Horizon Industries',
      score: 88,
      learning: 96,
      behaviour: 82,
      gamesCompleted: 22,
      badges: ['orange', 'blue', 'pink']
    },
    {
      rank: 3,
      name: 'Meera Patel',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      org: 'Global Logistics',
      score: 86,
      learning: 92,
      behaviour: 78,
      gamesCompleted: 20,
      badges: ['gold', 'blue', 'teal']
    },
    {
      rank: 4,
      name: 'Kavya Reddy',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80',
      org: 'Sunrise Energy',
      score: 82,
      learning: 88,
      behaviour: 74,
      gamesCompleted: 18,
      badges: ['orange', 'purple', 'blue']
    },
    {
      rank: 5,
      name: 'Rohan Gupta',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
      org: 'Apex Manufacturing',
      score: 78,
      learning: 84,
      behaviour: 70,
      gamesCompleted: 16,
      badges: ['teal', 'blue', 'pink']
    }
  ];

  // Notifications View State & Data
  const [notifSubTab, setNotifSubTab] = useState<'all' | 'scheduled' | 'drafts' | 'sent'>('all');
  const [notifSearchQuery, setNotifSearchQuery] = useState('');
  const [notifTypeFilter, setNotifTypeFilter] = useState('All Types');
  const [notifAudienceFilter, setNotifAudienceFilter] = useState('All Users');
  const [notifOrgFilter, setNotifOrgFilter] = useState('All Organizations');
  const [notifStatusFilter, setNotifStatusFilter] = useState('All Status');
  const [notifDateRange, setNotifDateRange] = useState('Jan 2024 - Oct 2024');
  const [selectedNotifId, setSelectedNotifId] = useState<number>(1);
  const [selectedNotifTab, setSelectedNotifTab] = useState<'overview' | 'content' | 'audience' | 'analytics'>('overview');
  const [selectedNotifIds, setSelectedNotifIds] = useState<number[]>([1]);
  const [showSendNotifModal, setShowSendNotifModal] = useState(false);
  const [newNotifTitle, setNewNotifTitle] = useState('New Learning Module Available');
  const [newNotifType, setNewNotifType] = useState('Learning');
  const [newNotifAudience, setNewNotifAudience] = useState('All Players');
  const [newNotifMessage, setNewNotifMessage] = useState('A new learning module on Inclusive Leadership is now available. Start learning and earn points!');

  // Settings & System Configuration State
  const [settingsSubTab, setSettingsSubTab] = useState<'general' | 'game' | 'learning' | 'integrations' | 'notifications' | 'security' | 'adv-security' | 'system'>('general');
  const [platformName, setPlatformName] = useState('Inclusive Tycoon');
  const [platformTagline, setPlatformTagline] = useState('Play. Learn. Build an Inclusive Future.');
  const [platformOrg, setPlatformOrg] = useState('CII Centre for Women Leadership');
  const [platformContactEmail, setPlatformContactEmail] = useState('admin@cwl-ir.org');
  const [platformSupportEmail, setPlatformSupportEmail] = useState('support@inclusive-tycoon.org');
  const [platformWebsite, setPlatformWebsite] = useState('https://inclusive-tycoon.org');
  const [primaryColor, setPrimaryColor] = useState('#7C3AED');
  const [secondaryColor, setSecondaryColor] = useState('#2563EB');
  const [accentColor, setAccentColor] = useState('#EC4899');
  const [platformTheme, setPlatformTheme] = useState('Light');
  const [defaultLang, setDefaultLang] = useState('English');
  const [supportedLangs, setSupportedLangs] = useState(['English', 'Hindi', 'French', 'Spanish']);
  const [timezone, setTimezone] = useState('(GMT+05:30) India Standard Time');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY (05-Oct-2024)');

  const [platformPreferences, setPlatformPreferences] = useState({
    allowUserRegistration: true,
    enableGuestMode: false,
    showLeaderboardToAll: true,
    enableCertificates: true,
    enableFeedbackCollection: true,
    enableNotifications: true,
    autoAssignOrganization: false,
    enableAnalyticsTracking: true,
    enableContentRecommendations: true,
    maintenanceMode: false
  });

  // Event Cards State & Data
  const [eventCardsCategoryFilter, setEventCardsCategoryFilter] = useState('All Categories');
  const [eventCardsSearchQuery, setEventCardsSearchQuery] = useState('');
  const [selectedEventCardId, setSelectedEventCardId] = useState<number>(1);
  const [assessmentSubTab, setAssessmentSubTab] = useState<'pre-game' | 'post-game' | 'question-bank' | 'results'>('pre-game');

  const eventCardsData = [
    {
      id: 1,
      title: 'Sudden Regulatory Pay Transparency Audit',
      category: 'Regulatory & Policy',
      categoryBadge: 'bg-rose-100 text-rose-800 border-rose-200',
      probability: '20% Trigger Chance',
      triggerTurn: 'Turn 3 - 6',
      impactType: 'Risk / Crisis',
      impactBadge: 'bg-rose-50 text-rose-600 border-rose-200',
      description: 'Ministry regulations mandate an immediate gender pay gap audit across all enterprise units. Failure to comply leads to severe fines and public rating downgrade.',
      choiceA: 'Conduct Comprehensive Internal Audit & Correct Gaps (Cost: ₹50,000 | +15% Inclusion Score | +10% Employee Trust)',
      choiceB: 'Delay Audit & File Extension Request (Cost: ₹10,000 | -10% Inclusion Score | Risk of 25% Penalty)',
      activeStatus: true,
      timesTriggered: 142
    },
    {
      id: 2,
      title: 'Workforce Hybrid Diversity Surge',
      category: 'Workforce Shift',
      categoryBadge: 'bg-purple-100 text-purple-800 border-purple-200',
      probability: '35% Trigger Chance',
      triggerTurn: 'Turn 2 - 5',
      impactType: 'Positive Boost',
      impactBadge: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      description: 'Remote & flexible work policies attract high-performing female leaders from tier-2 cities, creating an unexpected talent pool boom.',
      choiceA: 'Launch Dedicated Remote Mentorship & Sponsorship Track (Cost: ₹25,000 | +18% Inclusion | +12% Retention)',
      choiceB: 'Standard Onboarding Only (Cost: ₹5,000 | +5% Inclusion | +2% Retention)',
      activeStatus: true,
      timesTriggered: 215
    },
    {
      id: 3,
      title: 'Unconscious Bias Incident in Tech Team',
      category: 'Workplace Culture Crisis',
      categoryBadge: 'bg-amber-100 text-amber-800 border-amber-200',
      probability: '15% Trigger Chance',
      triggerTurn: 'Turn 4 - 8',
      impactType: 'Risk / Crisis',
      impactBadge: 'bg-rose-50 text-rose-600 border-rose-200',
      description: 'A promotion dispute highlights microaggressions and exclusion in software engineering team leads.',
      choiceA: 'Hire External Mediator & Conduct Anti-Bias Workshop (Cost: ₹30,000 | +14% Belonging | +8% Leadership Alignment)',
      choiceB: 'Internal HR Review Only (Cost: ₹0 | -8% Team Morale | Risk of Resignations)',
      activeStatus: true,
      timesTriggered: 98
    },
    {
      id: 4,
      title: 'ESG Global Inclusion Certification Award',
      category: 'Market Dynamics',
      categoryBadge: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      probability: '25% Trigger Chance',
      triggerTurn: 'Turn 5 - 10',
      impactType: 'Positive Boost',
      impactBadge: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      description: 'Your organization qualifies for CII Women Leadership Excellence Certification, unlocking investor confidence.',
      choiceA: 'Publicize Certification & Expand Women Leadership Grant (Cost: ₹40,000 | +20% Brand Equity | +15% Inclusion Score)',
      choiceB: 'Accept Award Privately (Cost: ₹0 | +5% Brand Equity)',
      activeStatus: true,
      timesTriggered: 180
    },
    {
      id: 5,
      title: 'Supplier Diversity Compliance Mandate',
      category: 'Regulatory & Policy',
      categoryBadge: 'bg-sky-100 text-sky-800 border-sky-200',
      probability: '30% Trigger Chance',
      triggerTurn: 'Turn 3 - 7',
      impactType: 'Market Shift',
      impactBadge: 'bg-sky-50 text-sky-600 border-sky-200',
      description: 'Key institutional clients require 20% of supply chain vendors to be women-owned enterprises.',
      choiceA: 'Onboard 15 Woman-Owned Vendors Immediately (Cost: ₹35,000 | +16% Ecosystem Diversity | +10% Contract Value)',
      choiceB: 'Gradual 2-Year Transition (Cost: ₹10,000 | +4% Diversity)',
      activeStatus: true,
      timesTriggered: 126
    }
  ];

  // Audit Logs State & Data
  const [auditSearchQuery, setAuditSearchQuery] = useState('');
  const [auditUserFilter, setAuditUserFilter] = useState('All Users');
  const [auditActionFilter, setAuditActionFilter] = useState('All Actions');
  const [auditModuleFilter, setAuditModuleFilter] = useState('All Modules');
  const [auditDateRange, setAuditDateRange] = useState('Jan 2024 - Oct 2024');
  const [selectedLogId, setSelectedLogId] = useState<number>(1);
  const [selectedLogTab, setSelectedLogTab] = useState<'overview' | 'technical' | 'changes'>('overview');

  const auditLogsData = [
    {
      id: 1,
      timestamp: '15 Oct 2024, 10:30 AM',
      user: 'CII CWL Super Admin',
      userEmail: 'admin@cwl-ir.org',
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
      userRole: 'Super Admin',
      action: 'Updated',
      actionBadge: 'bg-blue-100 text-blue-700',
      module: 'Settings',
      moduleBadge: 'bg-purple-100 text-purple-700',
      details: 'Updated notification settings',
      ipAddress: '192.168.1.100',
      status: 'Success',
      sessionId: 'a8f7c2d9-4e1b-4f2d-9c8e-1a2b3c4d5e6f',
      device: 'Web Browser (Chrome 129.0)',
      location: 'Chennai, India',
      descriptionBullets: [
        'Enabled email notifications for new registrations',
        'Updated weekly summary schedule to Monday 9 AM',
        'Modified notification template for learning modules'
      ]
    },
    {
      id: 2,
      timestamp: '15 Oct 2024, 09:45 AM',
      user: 'Priya Sharma',
      userEmail: 'priya.sharma@techmind.com',
      userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80',
      userRole: 'Partner Admin',
      action: 'Created',
      actionBadge: 'bg-emerald-100 text-emerald-700',
      module: 'Quiz Management',
      moduleBadge: 'bg-emerald-100 text-emerald-700',
      details: 'Created new quiz',
      ipAddress: '192.168.1.105',
      status: 'Success',
      sessionId: 'b9f8c3e0-5f2c-5g3e-0d9f-2b3c4d5e6f7g',
      device: 'Web Browser (Firefox 131.0)',
      location: 'Bengaluru, India',
      descriptionBullets: [
        'Created quiz "Inclusive Hiring Practices"',
        'Added 5 multiple choice assessment questions',
        'Published to TechMind Solutions organization cohort'
      ]
    },
    {
      id: 3,
      timestamp: '14 Oct 2024, 08:20 PM',
      user: 'Rohan Mehta',
      userEmail: 'rohan.mehta@horizon.com',
      userAvatar: '',
      userInitials: 'RM',
      userRole: 'Individual Player',
      action: 'Logged In',
      actionBadge: 'bg-purple-100 text-purple-700',
      module: 'Authentication',
      moduleBadge: 'bg-slate-100 text-slate-700',
      details: 'Successful login',
      ipAddress: '192.168.1.110',
      status: 'Success',
      sessionId: 'c0a9d4f1-6g3d-6h4f-1e0a-3c4d5e6f7g8h',
      device: 'Mobile Safari (iOS 18.0)',
      location: 'Mumbai, India',
      descriptionBullets: [
        'User authenticated via single sign-on (SSO)',
        'Session token issued successfully'
      ]
    },
    {
      id: 4,
      timestamp: '14 Oct 2024, 04:15 PM',
      user: 'Ananya Singh',
      userEmail: 'ananya.singh@globallogistics.com',
      userAvatar: '',
      userInitials: 'AS',
      userRole: 'People Manager',
      action: 'Completed',
      actionBadge: 'bg-indigo-100 text-indigo-700',
      module: 'Learning Content',
      moduleBadge: 'bg-purple-100 text-purple-700',
      details: 'Completed module',
      ipAddress: '192.168.1.115',
      status: 'Success',
      sessionId: 'd1b0e5g2-7h4e-7i5g-2f1b-4d5e6f7g8h9i',
      device: 'Web Browser (Chrome 129.0)',
      location: 'Delhi, India',
      descriptionBullets: [
        'Completed learning module "Unconscious Bias in Performance Reviews"',
        'Achieved score 95% on post-module quiz',
        'Earned 250 inclusion points'
      ]
    },
    {
      id: 5,
      timestamp: '14 Oct 2024, 03:20 PM',
      user: 'Game System',
      userEmail: 'system@inclusive-tycoon.org',
      userAvatar: '',
      userInitials: 'GC',
      userRole: 'Automated Service',
      action: 'Sent',
      actionBadge: 'bg-sky-100 text-sky-700',
      module: 'Notifications',
      moduleBadge: 'bg-sky-100 text-sky-700',
      details: 'Sent notification',
      ipAddress: '192.168.1.120',
      status: 'Success',
      sessionId: 'e2c1f6h3-8i5f-8j6h-3g2c-5e6f7g8h9i0j',
      device: 'System Daemon (Node.js)',
      location: 'AWS Cloud Server',
      descriptionBullets: [
        'Dispatched automated push notification: "New Learning Module Available"',
        'Recipients targeted: 5,240 active players'
      ]
    },
    {
      id: 6,
      timestamp: '13 Oct 2024, 11:20 AM',
      user: 'Vikram Patel',
      userEmail: 'vikram.patel@sunrise.com',
      userAvatar: '',
      userInitials: 'VP',
      userRole: 'Partner Admin',
      action: 'Exported',
      actionBadge: 'bg-amber-100 text-amber-700',
      module: 'Reports',
      moduleBadge: 'bg-amber-100 text-amber-700',
      details: 'Exported report',
      ipAddress: '192.168.1.125',
      status: 'Success',
      sessionId: 'f3d2g7i4-9j6g-9k7i-4h3d-6f7g8h9i0j1k',
      device: 'Web Browser (Edge 128.0)',
      location: 'Hyderabad, India',
      descriptionBullets: [
        'Generated Q3 Organization Inclusion Impact Report',
        'Downloaded XLSX format file with anonymized demographic metrics'
      ]
    },
    {
      id: 7,
      timestamp: '13 Oct 2024, 10:35 AM',
      user: 'Sneha Iyer',
      userEmail: 'sneha.iyer@apex.com',
      userAvatar: '',
      userInitials: 'SN',
      userRole: 'Senior Executive',
      action: 'Updated',
      actionBadge: 'bg-blue-100 text-blue-700',
      module: 'Users',
      moduleBadge: 'bg-blue-100 text-blue-700',
      details: 'Updated profile',
      ipAddress: '192.168.1.130',
      status: 'Success',
      sessionId: 'g4e3h8j5-0k7h-0l8j-5i4e-7g8h9i0j1k2l',
      device: 'Web Browser (Chrome 129.0)',
      location: 'Pune, India',
      descriptionBullets: [
        'Updated profile avatar and department details',
        'Verified email address for notification preferences'
      ]
    },
    {
      id: 8,
      timestamp: '13 Oct 2024, 06:55 PM',
      user: 'System',
      userEmail: 'cron@inclusive-tycoon.org',
      userAvatar: '',
      userInitials: 'GS',
      userRole: 'Automated Service',
      action: 'Backup',
      actionBadge: 'bg-sky-100 text-sky-700',
      module: 'System',
      moduleBadge: 'bg-slate-100 text-slate-700',
      details: 'Automated backup',
      ipAddress: '192.168.1.135',
      status: 'Success',
      sessionId: 'h5f4i9k6-1l8i-1m9k-6j5f-8h9i0j1k2l3m',
      device: 'System Daemon (PostgreSQL Backup)',
      location: 'AWS Cloud Server',
      descriptionBullets: [
        'Executed nightly automated database backup snapshot',
        'Backup stored encrypted in S3 bucket (2.4 GB)'
      ]
    },
    {
      id: 9,
      timestamp: '12 Oct 2024, 03:20 PM',
      user: 'Meera Patel',
      userEmail: 'meera.patel@vertex.com',
      userAvatar: '',
      userInitials: 'MP',
      userRole: 'People Manager',
      action: 'Submitted',
      actionBadge: 'bg-purple-100 text-purple-700',
      module: 'Assessment',
      moduleBadge: 'bg-purple-100 text-purple-700',
      details: 'Submitted assessment',
      ipAddress: '192.168.1.140',
      status: 'Success',
      sessionId: 'i6g5j0l7-2m9j-2n0l-7k6g-9i0j1k2l3m4n',
      device: 'Web Browser (Chrome 129.0)',
      location: 'Ahmedabad, India',
      descriptionBullets: [
        'Submitted post-game inclusion self-assessment questionnaire',
        'Recorded 4 decision responses for team mentorship scenario'
      ]
    },
    {
      id: 10,
      timestamp: '12 Oct 2024, 01:10 PM',
      user: 'CII CWL Super Admin',
      userEmail: 'admin@cwl-ir.org',
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
      userRole: 'Super Admin',
      action: 'Created',
      actionBadge: 'bg-emerald-100 text-emerald-700',
      module: 'Organizations',
      moduleBadge: 'bg-emerald-100 text-emerald-700',
      details: 'Created new organization',
      ipAddress: '192.168.1.145',
      status: 'Success',
      sessionId: 'j7h6k1m8-3n0k-3o1m-8l7h-0j1k2l3m4n5o',
      device: 'Web Browser (Chrome 129.0)',
      location: 'Chennai, India',
      descriptionBullets: [
        'Onboarded new partner organization "Vertex Systems"',
        'Assigned initial license cap of 500 active player seats'
      ]
    }
  ];

  const activeAuditLog = auditLogsData.find(l => l.id === selectedLogId) || auditLogsData[0];

  const notificationsData = [
    {
      id: 1,
      title: 'New Learning Module Available',
      subtitle: 'Discover our latest module on Inclusive Leadership',
      type: 'Learning',
      typeBadge: 'bg-amber-100 text-amber-700',
      audience: 'All Players',
      sentOn: '16 Oct 2024',
      fullSentTime: '16 Oct 2024, 10:30 AM',
      status: 'Sent',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      recipients: '5,240',
      openRate: '72%',
      openedCount: '3,773',
      clickRate: '28%',
      clickedCount: '1,467',
      message: 'A new learning module on Inclusive Leadership is now available. Start learning and earn points!'
    },
    {
      id: 2,
      title: 'Inclusion Challenge Reminder',
      subtitle: 'Complete your weekly workplace inclusion challenge',
      type: 'Reminder',
      typeBadge: 'bg-pink-100 text-pink-700',
      audience: 'Active Players',
      sentOn: '14 Oct 2024',
      fullSentTime: '14 Oct 2024, 02:15 PM',
      status: 'Sent',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      recipients: '3,850',
      openRate: '68%',
      openedCount: '2,618',
      clickRate: '22%',
      clickedCount: '847',
      message: 'Your weekly inclusion challenge expires in 2 days. Complete it now to top the leaderboard!'
    },
    {
      id: 3,
      title: 'Platform Update',
      subtitle: 'New features added to the Inclusive Tycoon dashboard',
      type: 'System',
      typeBadge: 'bg-sky-100 text-sky-700',
      audience: 'All Users',
      sentOn: '12 Oct 2024',
      fullSentTime: '12 Oct 2024, 09:00 AM',
      status: 'Sent',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      recipients: '12,540',
      openRate: '74%',
      openedCount: '9,279',
      clickRate: '31%',
      clickedCount: '3,887',
      message: 'We have updated the analytics dashboard and added real-world impact metrics.'
    },
    {
      id: 4,
      title: 'Weekly Progress Summary',
      subtitle: 'Check your organization inclusion scores',
      type: 'Report',
      typeBadge: 'bg-purple-100 text-purple-700',
      audience: 'Organization Admins',
      sentOn: '10 Oct 2024',
      fullSentTime: '10 Oct 2024, 11:45 AM',
      status: 'Sent',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      recipients: '320',
      openRate: '66%',
      openedCount: '211',
      clickRate: '18%',
      clickedCount: '57',
      message: 'Your organization weekly inclusion summary is ready for download.'
    },
    {
      id: 5,
      title: 'New Quiz Available',
      subtitle: 'Test your knowledge on Unconscious Bias',
      type: 'Learning',
      typeBadge: 'bg-amber-100 text-amber-700',
      audience: 'All Players',
      sentOn: '08 Oct 2024',
      fullSentTime: '08 Oct 2024, 04:30 PM',
      status: 'Sent',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      recipients: '5,180',
      openRate: '70%',
      openedCount: '3,626',
      clickRate: '26%',
      clickedCount: '1,346',
      message: 'A new quiz on Unconscious Bias has been unlocked in your learning portal.'
    },
    {
      id: 6,
      title: 'CII Event Invitation',
      subtitle: 'Annual Women Leadership Summit 2024',
      type: 'Event',
      typeBadge: 'bg-orange-100 text-orange-700',
      audience: 'Partner Admins',
      sentOn: '06 Oct 2024',
      fullSentTime: '06 Oct 2024, 10:00 AM',
      status: 'Sent',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      recipients: '210',
      openRate: '62%',
      openedCount: '130',
      clickRate: '15%',
      clickedCount: '31',
      message: 'You are cordially invited to the CII Centre for Women Leadership Annual Summit.'
    },
    {
      id: 7,
      title: 'Achievement Congratulations',
      subtitle: 'You earned the Inclusive Champion badge!',
      type: 'Achievement',
      typeBadge: 'bg-rose-100 text-rose-700',
      audience: 'Individual Players',
      sentOn: '04 Oct 2024',
      fullSentTime: '04 Oct 2024, 03:20 PM',
      status: 'Sent',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      recipients: '1,240',
      openRate: '78%',
      openedCount: '967',
      clickRate: '34%',
      clickedCount: '421',
      message: 'Congratulations on achieving the highest inclusion impact score in your cohort!'
    },
    {
      id: 8,
      title: 'System Maintenance',
      subtitle: 'Scheduled downtime on Sunday midnight',
      type: 'System',
      typeBadge: 'bg-sky-100 text-sky-700',
      audience: 'All Users',
      sentOn: '02 Oct 2024',
      fullSentTime: '02 Oct 2024, 06:00 PM',
      status: 'Draft',
      statusBadge: 'bg-purple-100 text-purple-700',
      recipients: '-',
      openRate: '-',
      openedCount: '-',
      clickRate: '-',
      clickedCount: '-',
      message: 'Platform maintenance is scheduled for Sunday from 12 AM to 2 AM UTC.'
    },
    {
      id: 9,
      title: 'New Case Study Published',
      subtitle: 'Gender Pay Parity Framework Case Study',
      type: 'Content',
      typeBadge: 'bg-indigo-100 text-indigo-700',
      audience: 'All Players',
      sentOn: '30 Sep 2024',
      fullSentTime: '30 Sep 2024, 01:10 PM',
      status: 'Sent',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      recipients: '4,620',
      openRate: '69%',
      openedCount: '3,187',
      clickRate: '24%',
      clickedCount: '1,108',
      message: 'Explore our new real-world case study on implementing gender pay parity.'
    },
    {
      id: 10,
      title: 'Monthly Newsletter',
      subtitle: 'October Edition: Inclusion Trends & Best Practices',
      type: 'Newsletter',
      typeBadge: 'bg-teal-100 text-teal-700',
      audience: 'All Users',
      sentOn: '28 Sep 2024',
      fullSentTime: '28 Sep 2024, 09:30 AM',
      status: 'Sent',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      recipients: '12,540',
      openRate: '71%',
      openedCount: '8,903',
      clickRate: '29%',
      clickedCount: '3,636',
      message: 'Read the latest issue of CII CWL Inclusion Insights and leadership highlights.'
    }
  ];

  const activeNotif = notificationsData.find(n => n.id === selectedNotifId) || notificationsData[0];

  // Learning Content Management State
  const [selectedModuleId, setSelectedModuleId] = useState<number>(1);
  const [modulePreviewSubTab, setModulePreviewSubTab] = useState<'objectives' | 'topics' | 'preview'>('objectives');
  const [moduleSearchQuery, setModuleSearchQuery] = useState('');
  const [moduleCategoryFilter, setModuleCategoryFilter] = useState('All Categories');
  const [moduleLevelFilter, setModuleLevelFilter] = useState('All Levels');
  const [moduleStatusFilter, setModuleStatusFilter] = useState('All Status');
  const [moduleLanguageFilter, setModuleLanguageFilter] = useState('All Languages');
  // Quiz Management State
  const [selectedQuestionId, setSelectedQuestionId] = useState<number>(1);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number>(0);
  const [quizSearchQuery, setQuizSearchQuery] = useState('');
  const [quizModuleFilter, setQuizModuleFilter] = useState('All Modules');
  const [quizTypeFilter, setQuizTypeFilter] = useState('All Types');
  const [quizLevelFilter, setQuizLevelFilter] = useState('All Levels');
  const [quizStatusFilter, setQuizStatusFilter] = useState('All Status');

  // Add New Question Form State
  const [newQuestionTitle, setNewQuestionTitle] = useState('What is an inclusive workplace?');
  const [newQuestionModule, setNewQuestionModule] = useState('Introduction to Inclusive Leadership');
  const [newQuestionType, setNewQuestionType] = useState('Multiple Choice (Single Answer)');
  const [newQuestionCategory, setNewQuestionCategory] = useState('Leadership');
  const [newQuestionDifficulty, setNewQuestionDifficulty] = useState('Medium');
  const [newQuestionTime, setNewQuestionTime] = useState('1-2 minutes');
  const [newQuestionContent, setNewQuestionContent] = useState('What is an inclusive workplace?');
  const [newQuestionOptions, setNewQuestionOptions] = useState([
    'A workplace where everyone feels respected, valued, and has equal opportunities',
    'A workplace with only diverse hiring',
    'A workplace with flexible working hours',
    'A workplace focused only on women employees'
  ]);
  const [newQuestionCorrectAnswer, setNewQuestionCorrectAnswer] = useState(0);
  const [newQuestionRandomize, setNewQuestionRandomize] = useState(false);
  const [addQuestionFormStep, setAddQuestionFormStep] = useState<'basic' | 'content' | 'options' | 'explanation' | 'settings'>('basic');

  // Assessment Questions State
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<number>(1);
  const [assessmentSearchQuery, setAssessmentSearchQuery] = useState('');
  const [assessmentCompetencyFilter, setAssessmentCompetencyFilter] = useState('All Competencies');
  const [assessmentTypeFilter, setAssessmentTypeFilter] = useState('All Types');
  const [assessmentStatusFilter, setAssessmentStatusFilter] = useState('All Status');

  // Partner Admins State
  const [selectedPartnerAdminId, setSelectedPartnerAdminId] = useState<number>(1);
  const [partnerAdminSearchQuery, setPartnerAdminSearchQuery] = useState('');
  const [partnerAdminOrgFilter, setPartnerAdminOrgFilter] = useState('All Organizations');
  const [partnerAdminRoleFilter, setPartnerAdminRoleFilter] = useState('All Roles');
  const [partnerAdminStatusFilter, setPartnerAdminStatusFilter] = useState('All Status');
  const [partnerAdminDateRange, setPartnerAdminDateRange] = useState('Jan 2024 - Oct 2024');
  const [partnerAdminDetailSubTab, setPartnerAdminDetailSubTab] = useState<'overview' | 'permissions' | 'modules' | 'activity'>('overview');

  // 8 Partner Admins Dataset (Matches Reference Screenshot)
  const partnerAdminsData = [
    {
      id: 1,
      name: 'Neha Kapoor',
      email: 'neha@tcs.com',
      organization: 'TCS',
      orgCategory: 'IT Services & Consulting',
      role: 'Partner Admin',
      roleBadge: 'bg-purple-100 text-[#5551ff]',
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      moduleAccessCount: 6,
      moduleAccessTotal: 8,
      lastActive: '2 hours ago',
      dateJoined: '12 Jan 2024',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      modulesAssignedCount: 6,
      usersManaged: 240,
      gameSessions: 18,
      avgCompletionRate: 82,
      assignedModulesList: [
        { title: 'Introduction to Inclusive Leadership', assigned: true, bg: 'bg-pink-100 text-pink-600' },
        { title: 'Diversity in the Workplace', assigned: true, bg: 'bg-emerald-100 text-emerald-600' },
        { title: 'Inclusive Decision Making', assigned: true, bg: 'bg-blue-100 text-blue-600' },
        { title: 'Measuring Inclusion Impact', assigned: false, bg: 'bg-amber-100 text-amber-600' },
        { title: 'Case Study Library', assigned: true, bg: 'bg-teal-100 text-teal-600' }
      ]
    },
    {
      id: 2,
      name: 'Arjun Mehta',
      email: 'arjun@infosys.com',
      organization: 'Infosys',
      orgCategory: 'IT Services & Consulting',
      role: 'Partner Admin',
      roleBadge: 'bg-purple-100 text-[#5551ff]',
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      moduleAccessCount: 7,
      moduleAccessTotal: 8,
      lastActive: '5 hours ago',
      dateJoined: '05 Feb 2024',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
      modulesAssignedCount: 7,
      usersManaged: 310,
      gameSessions: 24,
      avgCompletionRate: 88,
      assignedModulesList: [
        { title: 'Introduction to Inclusive Leadership', assigned: true, bg: 'bg-pink-100 text-pink-600' },
        { title: 'Diversity in the Workplace', assigned: true, bg: 'bg-emerald-100 text-emerald-600' },
        { title: 'Inclusive Decision Making', assigned: true, bg: 'bg-blue-100 text-blue-600' },
        { title: 'Measuring Inclusion Impact', assigned: true, bg: 'bg-amber-100 text-amber-600' },
        { title: 'Case Study Library', assigned: true, bg: 'bg-teal-100 text-teal-600' }
      ]
    },
    {
      id: 3,
      name: 'Priya Iyer',
      email: 'priya@accenture.com',
      organization: 'Accenture',
      orgCategory: 'Management Consulting',
      role: 'Partner Admin',
      roleBadge: 'bg-purple-100 text-[#5551ff]',
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      moduleAccessCount: 5,
      moduleAccessTotal: 8,
      lastActive: '1 day ago',
      dateJoined: '18 Mar 2024',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
      modulesAssignedCount: 5,
      usersManaged: 180,
      gameSessions: 14,
      avgCompletionRate: 79,
      assignedModulesList: [
        { title: 'Introduction to Inclusive Leadership', assigned: true, bg: 'bg-pink-100 text-pink-600' },
        { title: 'Diversity in the Workplace', assigned: true, bg: 'bg-emerald-100 text-emerald-600' },
        { title: 'Inclusive Decision Making', assigned: false, bg: 'bg-blue-100 text-blue-600' },
        { title: 'Measuring Inclusion Impact', assigned: false, bg: 'bg-amber-100 text-amber-600' },
        { title: 'Case Study Library', assigned: true, bg: 'bg-teal-100 text-teal-600' }
      ]
    },
    {
      id: 4,
      name: 'Rohit Sharma',
      email: 'rohit@wipro.com',
      organization: 'Wipro',
      orgCategory: 'IT Services & Software',
      role: 'Partner Admin',
      roleBadge: 'bg-purple-100 text-[#5551ff]',
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      moduleAccessCount: 6,
      moduleAccessTotal: 8,
      lastActive: '3 hours ago',
      dateJoined: '22 Apr 2024',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      modulesAssignedCount: 6,
      usersManaged: 220,
      gameSessions: 16,
      avgCompletionRate: 84,
      assignedModulesList: [
        { title: 'Introduction to Inclusive Leadership', assigned: true, bg: 'bg-pink-100 text-pink-600' },
        { title: 'Diversity in the Workplace', assigned: true, bg: 'bg-emerald-100 text-emerald-600' },
        { title: 'Inclusive Decision Making', assigned: true, bg: 'bg-blue-100 text-blue-600' },
        { title: 'Measuring Inclusion Impact', assigned: false, bg: 'bg-amber-100 text-amber-600' },
        { title: 'Case Study Library', assigned: true, bg: 'bg-teal-100 text-teal-600' }
      ]
    },
    {
      id: 5,
      name: 'Sneha Reddy',
      email: 'sneha@deloitte.com',
      organization: 'Deloitte',
      orgCategory: 'Audit & Consulting',
      role: 'Partner Admin',
      roleBadge: 'bg-purple-100 text-[#5551ff]',
      status: 'Inactive',
      statusBadge: 'bg-red-100 text-red-600',
      moduleAccessCount: 4,
      moduleAccessTotal: 8,
      lastActive: '5 days ago',
      dateJoined: '10 May 2024',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150&q=80',
      modulesAssignedCount: 4,
      usersManaged: 150,
      gameSessions: 9,
      avgCompletionRate: 72,
      assignedModulesList: [
        { title: 'Introduction to Inclusive Leadership', assigned: true, bg: 'bg-pink-100 text-pink-600' },
        { title: 'Diversity in the Workplace', assigned: true, bg: 'bg-emerald-100 text-emerald-600' },
        { title: 'Inclusive Decision Making', assigned: false, bg: 'bg-blue-100 text-blue-600' },
        { title: 'Measuring Inclusion Impact', assigned: false, bg: 'bg-amber-100 text-amber-600' },
        { title: 'Case Study Library', assigned: false, bg: 'bg-teal-100 text-teal-600' }
      ]
    },
    {
      id: 6,
      name: 'Vikram Singh',
      email: 'vikram@hcl.com',
      organization: 'HCL',
      orgCategory: 'IT Infrastructure & Services',
      role: 'Organization Admin',
      roleBadge: 'bg-emerald-100 text-emerald-700',
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      moduleAccessCount: 5,
      moduleAccessTotal: 8,
      lastActive: '1 day ago',
      dateJoined: '14 Jun 2024',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      modulesAssignedCount: 5,
      usersManaged: 195,
      gameSessions: 15,
      avgCompletionRate: 80,
      assignedModulesList: [
        { title: 'Introduction to Inclusive Leadership', assigned: true, bg: 'bg-pink-100 text-pink-600' },
        { title: 'Diversity in the Workplace', assigned: true, bg: 'bg-emerald-100 text-emerald-600' },
        { title: 'Inclusive Decision Making', assigned: true, bg: 'bg-blue-100 text-blue-600' },
        { title: 'Measuring Inclusion Impact', assigned: false, bg: 'bg-amber-100 text-amber-600' },
        { title: 'Case Study Library', assigned: true, bg: 'bg-teal-100 text-teal-600' }
      ]
    },
    {
      id: 7,
      name: 'Ananya Gupta',
      email: 'ananya@ibm.com',
      organization: 'IBM',
      orgCategory: 'Cloud & AI Solutions',
      role: 'Partner Admin',
      roleBadge: 'bg-purple-100 text-[#5551ff]',
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      moduleAccessCount: 7,
      moduleAccessTotal: 8,
      lastActive: '2 hours ago',
      dateJoined: '01 Jul 2024',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      modulesAssignedCount: 7,
      usersManaged: 290,
      gameSessions: 22,
      avgCompletionRate: 86,
      assignedModulesList: [
        { title: 'Introduction to Inclusive Leadership', assigned: true, bg: 'bg-pink-100 text-pink-600' },
        { title: 'Diversity in the Workplace', assigned: true, bg: 'bg-emerald-100 text-emerald-600' },
        { title: 'Inclusive Decision Making', assigned: true, bg: 'bg-blue-100 text-blue-600' },
        { title: 'Measuring Inclusion Impact', assigned: true, bg: 'bg-amber-100 text-amber-600' },
        { title: 'Case Study Library', assigned: true, bg: 'bg-teal-100 text-teal-600' }
      ]
    },
    {
      id: 8,
      name: 'Karan Malhotra',
      email: 'karan@capgemini.com',
      organization: 'Capgemini',
      orgCategory: 'Digital Transformation',
      role: 'Partner Admin',
      roleBadge: 'bg-purple-100 text-[#5551ff]',
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      moduleAccessCount: 6,
      moduleAccessTotal: 8,
      lastActive: '4 hours ago',
      dateJoined: '19 Aug 2024',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      modulesAssignedCount: 6,
      usersManaged: 210,
      gameSessions: 17,
      avgCompletionRate: 83,
      assignedModulesList: [
        { title: 'Introduction to Inclusive Leadership', assigned: true, bg: 'bg-pink-100 text-pink-600' },
        { title: 'Diversity in the Workplace', assigned: true, bg: 'bg-emerald-100 text-emerald-600' },
        { title: 'Inclusive Decision Making', assigned: true, bg: 'bg-blue-100 text-blue-600' },
        { title: 'Measuring Inclusion Impact', assigned: false, bg: 'bg-amber-100 text-amber-600' },
        { title: 'Case Study Library', assigned: true, bg: 'bg-teal-100 text-teal-600' }
      ]
    }
  ];

  const activePartnerAdmin = partnerAdminsData.find(a => a.id === selectedPartnerAdminId) || partnerAdminsData[0];

  // Roles & Permissions State
  const [selectedRoleId, setSelectedRoleId] = useState<number>(1);
  const [roleSearchQuery, setRoleSearchQuery] = useState('');
  const [roleTypeFilter, setRoleTypeFilter] = useState('All Role Types');
  const [roleStatusFilter, setRoleStatusFilter] = useState('All Status');
  const [roleModuleFilter, setRoleModuleFilter] = useState('All Modules');
  const [roleDetailSubTab, setRoleDetailSubTab] = useState<'permissions' | 'users' | 'modules'>('permissions');
  const [expandedPermissionGroups, setExpandedPermissionGroups] = useState<string[]>(['dashboard', 'content', 'user', 'system']);

  // 6 Roles Dataset (Matches Reference Screenshot 100%)
  const rolesData = [
    {
      id: 1,
      name: 'Super Admin',
      iconType: 'crown',
      iconBg: 'bg-amber-100 text-amber-500',
      roleType: 'System',
      roleTypeBadge: 'bg-purple-100 text-purple-600',
      description: 'Full access to all platform features and settings',
      fullDescription: 'Full access to all platform features and settings. Can manage users, content, client, analytics, and system configuration.',
      usersAssigned: 5,
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      modulesCount: 12,
      permissionGroups: [
        {
          id: 'dashboard',
          name: 'Dashboard & Analytics',
          grantedCount: 6,
          totalCount: 6,
          permissions: [
            { name: 'View Dashboard', desc: 'Access to main dashboard', granted: true },
            { name: 'View Analytics', desc: 'Access to all analytics data', granted: true },
            { name: 'Export Reports', desc: 'Export analytics reports', granted: true },
            { name: 'View Inclusion Metrics', desc: 'Access to inclusion metrics', granted: true },
            { name: 'View Leaderboard', desc: 'Access to leaderboard data', granted: true },
            { name: 'View User Activity', desc: 'Access to user activity logs', granted: true }
          ]
        },
        {
          id: 'content',
          name: 'Content Management',
          grantedCount: 12,
          totalCount: 12,
          permissions: [
            { name: 'Manage Learning Modules', desc: 'Create, edit and delete learning modules', granted: true },
            { name: 'Manage Quiz Questions', desc: 'Create and edit assessment quizzes', granted: true },
            { name: 'Manage Case Studies', desc: 'Publish and update case studies', granted: true }
          ]
        },
        {
          id: 'user',
          name: 'User Management',
          grantedCount: 8,
          totalCount: 8,
          permissions: [
            { name: 'Manage Partner Admins', desc: 'Assign and update partner admin accounts', granted: true },
            { name: 'Manage Player Roles', desc: 'Modify player roles and permissions', granted: true }
          ]
        },
        {
          id: 'system',
          name: 'System Settings',
          grantedCount: 10,
          totalCount: 10,
          permissions: [
            { name: 'Configure Security & API', desc: 'Manage system integrations and keys', granted: true },
            { name: 'View Audit Logs', desc: 'Inspect platform activity history', granted: true }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Partner Admin',
      iconType: 'building',
      iconBg: 'bg-blue-100 text-blue-600',
      roleType: 'Organization',
      roleTypeBadge: 'bg-blue-100 text-blue-600',
      description: 'Manage organization users and content',
      fullDescription: 'Manages organization-specific players, assigns learning paths, views organization analytics, and manages partner settings.',
      usersAssigned: 24,
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      modulesCount: 8,
      permissionGroups: [
        {
          id: 'dashboard',
          name: 'Dashboard & Analytics',
          grantedCount: 4,
          totalCount: 6,
          permissions: [
            { name: 'View Dashboard', desc: 'Access to main dashboard', granted: true },
            { name: 'View Analytics', desc: 'Access to org analytics data', granted: true },
            { name: 'Export Reports', desc: 'Export analytics reports', granted: true },
            { name: 'View Inclusion Metrics', desc: 'Access to inclusion metrics', granted: true }
          ]
        },
        {
          id: 'user',
          name: 'User Management',
          grantedCount: 6,
          totalCount: 8,
          permissions: [
            { name: 'Manage Organization Players', desc: 'Add and invite org employees', granted: true }
          ]
        }
      ]
    },
    {
      id: 3,
      name: 'Player',
      iconType: 'users',
      iconBg: 'bg-emerald-100 text-emerald-600',
      roleType: 'User',
      roleTypeBadge: 'bg-emerald-100 text-emerald-700',
      description: 'Access to game, learning content and assessments',
      fullDescription: 'Standard gameplay access to play simulations, complete quizzes, view learning content, and track personal progress.',
      usersAssigned: 248,
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      modulesCount: 6,
      permissionGroups: [
        {
          id: 'game',
          name: 'Gameplay & Learning',
          grantedCount: 5,
          totalCount: 5,
          permissions: [
            { name: 'Play Game Sessions', desc: 'Join active simulation sessions', granted: true },
            { name: 'Take Quizzes', desc: 'Complete pre/post module quizzes', granted: true },
            { name: 'View Educational Resources', desc: 'Access study materials', granted: true }
          ]
        }
      ]
    },
    {
      id: 4,
      name: 'Content Manager',
      iconType: 'cap',
      iconBg: 'bg-red-100 text-red-500',
      roleType: 'System',
      roleTypeBadge: 'bg-purple-100 text-purple-600',
      description: 'Manage learning content, quizzes and case studies',
      fullDescription: 'Responsible for authoring, reviewing, and publishing learning content, assessment questions, and case studies.',
      usersAssigned: 8,
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      modulesCount: 10,
      permissionGroups: [
        {
          id: 'content',
          name: 'Content Management',
          grantedCount: 12,
          totalCount: 12,
          permissions: [
            { name: 'Manage Learning Content', desc: 'Full content authoring', granted: true },
            { name: 'Publish Case Studies', desc: 'Review and approve case studies', granted: true }
          ]
        }
      ]
    },
    {
      id: 5,
      name: 'Analyst',
      iconType: 'chart',
      iconBg: 'bg-amber-100 text-amber-600',
      roleType: 'System',
      roleTypeBadge: 'bg-purple-100 text-purple-600',
      description: 'Access to analytics and reports',
      fullDescription: 'Full read & export access to executive reports, inclusion index metrics, and platform decision analytics.',
      usersAssigned: 12,
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      modulesCount: 6,
      permissionGroups: [
        {
          id: 'dashboard',
          name: 'Dashboard & Analytics',
          grantedCount: 6,
          totalCount: 6,
          permissions: [
            { name: 'View Analytics', desc: 'Deep dive into data', granted: true },
            { name: 'Export Data', desc: 'Export CSV & PDF reports', granted: true }
          ]
        }
      ]
    },
    {
      id: 6,
      name: 'Viewer',
      iconType: 'settings',
      iconBg: 'bg-indigo-100 text-indigo-600',
      roleType: 'System',
      roleTypeBadge: 'bg-purple-100 text-purple-600',
      description: 'Read-only access to platform data',
      fullDescription: 'Read-only preview permissions across the platform without ability to modify data or configuration.',
      usersAssigned: 15,
      status: 'Inactive',
      statusBadge: 'bg-red-100 text-red-600',
      modulesCount: 4,
      permissionGroups: [
        {
          id: 'dashboard',
          name: 'Dashboard & Analytics',
          grantedCount: 2,
          totalCount: 6,
          permissions: [
            { name: 'View Dashboard', desc: 'Read-only main dashboard view', granted: true }
          ]
        }
      ]
    }
  ];

  const activeRole = rolesData.find(r => r.id === selectedRoleId) || rolesData[0];

  // Leaderboard & Inclusion Metrics State
  const [leaderboardSearchQuery, setLeaderboardSearchQuery] = useState('');
  const [leaderboardTimeFilter, setLeaderboardTimeFilter] = useState('All Time');
  const [leaderboardSubTab, setLeaderboardSubTab] = useState<'overall' | 'impact' | 'progress' | 'decision' | 'org_ranking'>('overall');
  const [selectedLeaderboardPlayerId, setSelectedLeaderboardPlayerId] = useState<number>(1);

  // 8 Players Dataset (Matches Reference Screenshot 100%)
  const leaderboardPlayersData = [
    {
      id: 1,
      rank: 1,
      name: 'Anjali Verma',
      organization: 'Accenture',
      inclusionScore: 96,
      learningProgress: 92,
      gamesPlayed: 32,
      badges: 24,
      trend: '+12%',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      badgeType: 'gold'
    },
    {
      id: 2,
      rank: 2,
      name: 'Priya Sharma',
      organization: 'TCS',
      inclusionScore: 82,
      learningProgress: 88,
      gamesPlayed: 24,
      badges: 18,
      trend: '+8%',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
      badgeType: 'silver'
    },
    {
      id: 3,
      rank: 3,
      name: 'Neha Singh',
      organization: 'Infosys',
      inclusionScore: 78,
      learningProgress: 85,
      gamesPlayed: 20,
      badges: 15,
      trend: '+5%',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150&q=80',
      badgeType: 'bronze'
    },
    {
      id: 4,
      rank: 4,
      name: 'Karan Gupta',
      organization: 'Wipro',
      inclusionScore: 76,
      learningProgress: 80,
      gamesPlayed: 18,
      badges: 12,
      trend: '+10%',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      badgeType: 'none'
    },
    {
      id: 5,
      rank: 5,
      name: 'Sneha Reddy',
      organization: 'Deloitte',
      inclusionScore: 74,
      learningProgress: 78,
      gamesPlayed: 16,
      badges: 11,
      trend: '+6%',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      badgeType: 'none'
    },
    {
      id: 6,
      rank: 6,
      name: 'Rahul Mehta',
      organization: 'Infosys',
      inclusionScore: 72,
      learningProgress: 76,
      gamesPlayed: 15,
      badges: 10,
      trend: '+4%',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
      badgeType: 'none'
    },
    {
      id: 7,
      rank: 7,
      name: 'Vikram Singh',
      organization: 'HCL',
      inclusionScore: 70,
      learningProgress: 74,
      gamesPlayed: 14,
      badges: 9,
      trend: '+3%',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      badgeType: 'none'
    },
    {
      id: 8,
      rank: 8,
      name: 'Kavya Nair',
      organization: 'Capgemini',
      inclusionScore: 68,
      learningProgress: 71,
      gamesPlayed: 12,
      badges: 8,
      trend: '+7%',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      badgeType: 'none'
    }
  ];

  // Top Organizations by Inclusion Impact (5 Orgs)
  const topOrganizationsList = [
    { rank: 1, name: 'Accenture', score: 84, badgeType: 'gold' },
    { rank: 2, name: 'TCS', score: 78, badgeType: 'silver' },
    { rank: 3, name: 'Infosys', score: 76, badgeType: 'bronze' },
    { rank: 4, name: 'Deloitte', score: 72, badgeType: 'none' },
    { rank: 5, name: 'Wipro', score: 70, badgeType: 'none' }
  ];

  // Reports & Insights State
  const [reportsSearchQuery, setReportsSearchQuery] = useState('');
  const [reportTypeFilter, setReportTypeFilter] = useState('All Reports');
  const [reportDateRange, setReportDateRange] = useState('Jan 2024 - Oct 2024');
  const [reportOrgFilter, setReportOrgFilter] = useState('All Organizations');
  const [reportRoleFilter, setReportRoleFilter] = useState('All Roles');
  const [reportGameModeFilter, setReportGameModeFilter] = useState('All Modes');

  // Generated Reports Dataset (Matches Reference Screenshot)
  const generatedReportsData = [
    {
      id: 1,
      name: 'Inclusion Impact Report',
      type: 'Inclusion Metrics',
      dateRange: 'Jan 2024 - Oct 2024',
      generatedBy: 'CII CWL Super Admin',
      createdOn: '15 Oct 2024, 10:30 AM',
      status: 'Completed',
      statusBadge: 'bg-emerald-100 text-emerald-700'
    },
    {
      id: 2,
      name: 'Learning Progress Report',
      type: 'Learning Analytics',
      dateRange: 'Sep 2024 - Oct 2024',
      generatedBy: 'Priya Sharma',
      createdOn: '14 Oct 2024, 02:15 PM',
      status: 'Completed',
      statusBadge: 'bg-emerald-100 text-emerald-700'
    },
    {
      id: 3,
      name: 'Organization Performance',
      type: 'Organization Analytics',
      dateRange: 'Jan 2024 - Oct 2024',
      generatedBy: 'CII CWL Super Admin',
      createdOn: '13 Oct 2024, 11:20 AM',
      status: 'Completed',
      statusBadge: 'bg-emerald-100 text-emerald-700'
    }
  ];

  // Top Learning Modules List (Matches Screenshot)
  const topLearningModulesList = [
    { rank: 1, title: 'Inclusive Leadership', completion: '92%', rating: 4.8 },
    { rank: 2, title: 'Diversity in Workplace', completion: '88%', rating: 4.6 },
    { rank: 3, title: 'Equal Opportunities', completion: '84%', rating: 4.5 },
    { rank: 4, title: 'Unconscious Bias', completion: '78%', rating: 4.4 },
    { rank: 5, title: 'Women in Leadership', completion: '76%', rating: 4.3 }
  ];

  // Users & Organizations State
  const [userOrgActiveSubTab, setUserOrgActiveSubTab] = useState<'users' | 'organizations'>('users');
  const [selectedUserId, setSelectedUserId] = useState<number>(1);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('All Roles');
  const [userOrgFilter, setUserOrgFilter] = useState('All Organizations');
  const [userStatusFilter, setUserStatusFilter] = useState('All Status');
  const [userDateJoinedRange, setUserDateJoinedRange] = useState('Jan 2024 - Oct 2024');
  const [userMgmtDetailSubTab, setUserMgmtDetailSubTab] = useState<'overview' | 'gameplay' | 'learning' | 'achievements'>('overview');

  // 8 Users Dataset
  const usersData = [
    {
      id: 1,
      name: 'Priya Sharma',
      email: 'priya@tcs.com',
      organization: 'TCS',
      orgCategory: 'IT Services & Consulting',
      role: 'Player',
      roleBadge: 'bg-purple-100 text-purple-700',
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      gameSessions: 12,
      completionRate: 85,
      lastActive: '2 hours ago',
      dateJoined: '15 Sep 2024',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      modulesCompleted: 24,
      quizSuccessRate: 78,
      recentActivity: [
        { type: 'check', color: 'text-emerald-500 bg-emerald-100/70', label: 'Completed module: Inclusive Leadership', time: '2 hours ago' },
        { type: 'game', color: 'text-sky-500 bg-sky-100/70', label: 'Started game session: Women Leadership Cohort 2024', time: '5 hours ago' },
        { type: 'quiz', color: 'text-purple-500 bg-purple-100/70', label: 'Completed quiz: Workplace Diversity', time: '1 day ago' },
        { type: 'doc', color: 'text-amber-500 bg-amber-100/70', label: 'Viewed case study: TCS Inclusion Journey', time: '1 day ago' }
      ]
    },
    {
      id: 2,
      name: 'Rahul Mehta',
      email: 'rahul@infosys.com',
      organization: 'Infosys',
      orgCategory: 'IT Services & Consulting',
      role: 'Player',
      roleBadge: 'bg-purple-100 text-purple-700',
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      gameSessions: 8,
      completionRate: 72,
      lastActive: '5 hours ago',
      dateJoined: '20 Aug 2024',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      modulesCompleted: 18,
      quizSuccessRate: 82,
      recentActivity: [
        { type: 'check', color: 'text-emerald-500 bg-emerald-100/70', label: 'Completed module: Unconscious Bias', time: '5 hours ago' },
        { type: 'game', color: 'text-sky-500 bg-sky-100/70', label: 'Completed session: Enterprise Diversity Simulation', time: '1 day ago' }
      ]
    },
    {
      id: 3,
      name: 'Anjali Verma',
      email: 'anjali@accenture.com',
      organization: 'Accenture',
      orgCategory: 'Management Consulting',
      role: 'Player',
      roleBadge: 'bg-purple-100 text-purple-700',
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      gameSessions: 15,
      completionRate: 90,
      lastActive: '1 day ago',
      dateJoined: '10 Jul 2024',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      modulesCompleted: 28,
      quizSuccessRate: 92,
      recentActivity: [
        { type: 'quiz', color: 'text-purple-500 bg-purple-100/70', label: 'Achieved 100% on Executive Inclusion Quiz', time: '1 day ago' }
      ]
    },
    {
      id: 4,
      name: 'Karan Gupta',
      email: 'karan@wipro.com',
      organization: 'Wipro',
      orgCategory: 'IT Services',
      role: 'Partner Admin',
      roleBadge: 'bg-sky-100 text-sky-700',
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      gameSessions: null,
      completionRate: null,
      lastActive: '2 hours ago',
      dateJoined: '01 Jun 2024',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      modulesCompleted: null,
      quizSuccessRate: null,
      recentActivity: [
        { type: 'check', color: 'text-emerald-500 bg-emerald-100/70', label: 'Updated Wipro cohort access permissions', time: '2 hours ago' }
      ]
    },
    {
      id: 5,
      name: 'Sneha Iyer',
      email: 'sneha@deloitte.com',
      organization: 'Deloitte',
      orgCategory: 'Financial Services',
      role: 'Player',
      roleBadge: 'bg-purple-100 text-purple-700',
      status: 'Inactive',
      statusBadge: 'bg-rose-100 text-rose-700',
      gameSessions: 5,
      completionRate: 40,
      lastActive: '3 days ago',
      dateJoined: '05 May 2024',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      modulesCompleted: 10,
      quizSuccessRate: 65,
      recentActivity: [
        { type: 'game', color: 'text-sky-500 bg-sky-100/70', label: 'Paused session: Inclusion Tycoon Module 2', time: '3 days ago' }
      ]
    },
    {
      id: 6,
      name: 'Amit Kumar',
      email: 'amit@hcl.com',
      organization: 'HCL',
      orgCategory: 'IT Infrastructure',
      role: 'Player',
      roleBadge: 'bg-purple-100 text-purple-700',
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      gameSessions: 10,
      completionRate: 68,
      lastActive: '1 day ago',
      dateJoined: '12 Apr 2024',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
      modulesCompleted: 16,
      quizSuccessRate: 75,
      recentActivity: [
        { type: 'check', color: 'text-emerald-500 bg-emerald-100/70', label: 'Completed module: Inclusive Decision Making', time: '1 day ago' }
      ]
    },
    {
      id: 7,
      name: 'Neha Singh',
      email: 'neha@ibm.com',
      organization: 'IBM',
      orgCategory: 'Cloud & AI Services',
      role: 'Player',
      roleBadge: 'bg-purple-100 text-purple-700',
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      gameSessions: 18,
      completionRate: 95,
      lastActive: '3 hours ago',
      dateJoined: '28 Feb 2024',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
      modulesCompleted: 30,
      quizSuccessRate: 96,
      recentActivity: [
        { type: 'quiz', color: 'text-purple-500 bg-purple-100/70', label: 'Completed Final Tycoon Leaderboard Assessment', time: '3 hours ago' }
      ]
    },
    {
      id: 8,
      name: 'Vikram Patel',
      email: 'vikram@capgemini.com',
      organization: 'Capgemini',
      orgCategory: 'Technology Services',
      role: 'Partner Admin',
      roleBadge: 'bg-sky-100 text-sky-700',
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      gameSessions: null,
      completionRate: null,
      lastActive: '6 hours ago',
      dateJoined: '14 Jan 2024',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      modulesCompleted: null,
      quizSuccessRate: null,
      recentActivity: [
        { type: 'check', color: 'text-emerald-500 bg-emerald-100/70', label: 'Created 40 new player seats for Capgemini DE&I cohort', time: '6 hours ago' }
      ]
    }
  ];

  // Case Studies State
  const [selectedCaseStudyId, setSelectedCaseStudyId] = useState<number>(1);
  const [caseStudySearchQuery, setCaseStudySearchQuery] = useState('');
  const [caseStudyCategoryFilter, setCaseStudyCategoryFilter] = useState('All Categories');
  const [caseStudyModuleFilter, setCaseStudyModuleFilter] = useState('All Modules');
  const [caseStudyLevelFilter, setCaseStudyLevelFilter] = useState('All Levels');
  const [caseStudyStatusFilter, setCaseStudyStatusFilter] = useState('All Status');
  const [caseStudyPreviewTab, setCaseStudyPreviewTab] = useState<'overview' | 'learnings' | 'discussion' | 'related'>('overview');

  // 8 Case Studies Dataset
  const caseStudiesData = [
    {
      id: 1,
      title: 'TCS: Building an Inclusive Workforce',
      subtitle: 'How TCS created a more inclusive workplace environment with structured DE&I programs.',
      organization: 'TCS',
      category: 'Leadership',
      categoryBadge: 'bg-purple-100 text-purple-700',
      level: 'Beginner',
      levelBadge: 'text-emerald-600 font-bold',
      completionRate: 82,
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      readTime: '15 min',
      rating: 4.8,
      keyTopics: [
        'Inclusive hiring practices',
        'Flexible work policies',
        'Leadership development for women',
        'Measuring inclusion impact',
        'Real employee stories and outcomes'
      ],
      keyLearnings: [
        'Leadership commitment is key to sustainable DE&I initiatives.',
        'Data-driven metrics allow tracking of inclusion goals across teams.',
        'Employee feedback loops accelerate workplace culture adaptation.'
      ],
      discussionPoints: [
        'How can middle management drive inclusion daily?',
        'What metrics best capture employee belonging in enterprise setups?'
      ],
      relatedContent: ['Introduction to Inclusive Leadership', 'Unconscious Bias Awareness'],
      bannerImg: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 2,
      title: 'Infosys: Women in Tech',
      subtitle: 'Initiatives and impact of women in tech leadership at Infosys.',
      organization: 'Infosys',
      category: 'Diversity',
      categoryBadge: 'bg-sky-100 text-sky-700',
      level: 'Beginner',
      levelBadge: 'text-emerald-600 font-bold',
      completionRate: 76,
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      readTime: '12 min',
      rating: 4.7,
      keyTopics: [
        'Women mentorship programs',
        'Skill advancement workshops',
        'Equal opportunity pathways'
      ],
      keyLearnings: ['Structured mentorship accelerates leadership readiness.'],
      discussionPoints: ['Why is early career intervention crucial for tech retention?'],
      relatedContent: ['Diversity in Leadership'],
      bannerImg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 3,
      title: 'Accenture: Equal Opportunities',
      subtitle: 'Creating an inclusive work culture with equal opportunity policies.',
      organization: 'Accenture',
      category: 'Workplace Culture',
      categoryBadge: 'bg-indigo-100 text-indigo-700',
      level: 'Intermediate',
      levelBadge: 'text-amber-600 font-bold',
      completionRate: 68,
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      readTime: '18 min',
      rating: 4.6,
      keyTopics: [
        'Equal pay auditing',
        'Inclusive workplace policies',
        'Neurodiversity in talent acquisition'
      ],
      keyLearnings: ['Transparent pay structures significantly improve retention rates.'],
      discussionPoints: ['How to conduct effective internal equity audits?'],
      relatedContent: ['Compensation Fairness'],
      bannerImg: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 4,
      title: 'Wipro: Flexible Work Success',
      subtitle: 'How flexible policies improved retention and employee satisfaction.',
      organization: 'Wipro',
      category: 'Flexible Work',
      categoryBadge: 'bg-amber-100 text-amber-700',
      level: 'Intermediate',
      levelBadge: 'text-amber-600 font-bold',
      completionRate: 75,
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      readTime: '14 min',
      rating: 4.5,
      keyTopics: [
        'Hybrid work models',
        'Work-life balance framework',
        'Remote performance evaluation'
      ],
      keyLearnings: ['Flexibility empowers employees without compromising productivity.'],
      discussionPoints: ['Balancing autonomy and team cohesion in remote teams.'],
      relatedContent: ['Flexible Work Strategies'],
      bannerImg: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 5,
      title: 'Deloitte: Leadership for Inclusion',
      subtitle: 'Developing inclusive leaders through continuous feedback and training.',
      organization: 'Deloitte',
      category: 'Leadership',
      categoryBadge: 'bg-purple-100 text-purple-700',
      level: 'Advanced',
      levelBadge: 'text-rose-600 font-bold',
      completionRate: 62,
      status: 'Draft',
      statusBadge: 'bg-amber-100 text-amber-700',
      readTime: '20 min',
      rating: 4.9,
      keyTopics: [
        'Executive sponsorship',
        'Inclusive decision making',
        'Unconscious bias mitigation'
      ],
      keyLearnings: ['Leader empathy directly correlates with psychological safety.'],
      discussionPoints: ['How executive coaching drives lasting cultural change.'],
      relatedContent: ['Inclusive Decision Making'],
      bannerImg: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 6,
      title: 'IBM: Diverse Hiring Strategy',
      subtitle: 'A data-driven approach to diversity recruitment and talent acquisition.',
      organization: 'IBM',
      category: 'Recruitment',
      categoryBadge: 'bg-purple-100 text-purple-700',
      level: 'Intermediate',
      levelBadge: 'text-amber-600 font-bold',
      completionRate: 70,
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      readTime: '16 min',
      rating: 4.6,
      keyTopics: [
        'Blind resume review',
        'Diverse candidate pipelines',
        'Hiring manager bias training'
      ],
      keyLearnings: ['Data auditing at every interview stage reduces systemic bias.'],
      discussionPoints: ['Designing objective merit-based assessment criteria.'],
      relatedContent: ['Unconscious Bias Awareness'],
      bannerImg: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 7,
      title: 'HCL: Women Returnship Program',
      subtitle: 'Enabling career comebacks for women tech professionals after breaks.',
      organization: 'HCL',
      category: 'Women Employment',
      categoryBadge: 'bg-sky-100 text-sky-700',
      level: 'Beginner',
      levelBadge: 'text-emerald-600 font-bold',
      completionRate: 88,
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      readTime: '10 min',
      rating: 4.9,
      keyTopics: [
        'Re-skilling programs',
        'Mentorship pairing',
        'Flexible onboarding schedules'
      ],
      keyLearnings: ['Returnship initiatives bridge senior talent shortages effectively.'],
      discussionPoints: ['Overcoming resume gap stigmas during executive reviews.'],
      relatedContent: ['Diversity in Leadership'],
      bannerImg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 8,
      title: 'Capgemini: Inclusive Leadership Journey',
      subtitle: 'Real stories of inclusive transformation across global enterprise units.',
      organization: 'Capgemini',
      category: 'Leadership',
      categoryBadge: 'bg-purple-100 text-purple-700',
      level: 'Advanced',
      levelBadge: 'text-rose-600 font-bold',
      completionRate: 65,
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      readTime: '22 min',
      rating: 4.7,
      keyTopics: [
        'Global DE&I frameworks',
        'Cross-cultural collaboration',
        'Employee Resource Groups (ERGs)'
      ],
      keyLearnings: ['Localizing global DE&I frameworks ensures regional relevance.'],
      discussionPoints: ['Sustaining momentum across multicultural global offices.'],
      relatedContent: ['Introduction to Inclusive Leadership'],
      bannerImg: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=150&q=80'
    }
  ];

  // 8 Assessment Questions Dataset
  const assessmentQuestionsData = [
    {
      id: 1,
      title: 'Leadership Inclusion Self-Assessment',
      subtitle: 'Evaluates personal commitment to inclusive team behaviors',
      competency: 'Inclusive Mindset',
      competencyBadge: 'bg-purple-100 text-purple-700 border-purple-200',
      type: 'Likert Scale (1-5)',
      weight: '15%',
      scoringModel: 'Cumulative Point Scale',
      avgScore: '84%',
      avgScorePercent: 84,
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      evaluations: '1,240',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      rubric: [
        'Demonstrates active listening during team discussions (Weight: 25%)',
        'Seeks input from underrepresented team members (Weight: 25%)',
        'Addresses subtle exclusion behavior constructively (Weight: 25%)',
        'Shares credit transparently across team initiatives (Weight: 25%)'
      ]
    },
    {
      id: 2,
      title: 'Unconscious Bias Mitigation Rubric',
      subtitle: 'Measures decision-making awareness during hiring and promotion',
      competency: 'Bias Awareness',
      competencyBadge: 'bg-sky-100 text-sky-700 border-sky-200',
      type: 'Behavioral Choice',
      weight: '20%',
      scoringModel: 'Weighted Competency Matrix',
      avgScore: '76%',
      avgScorePercent: 76,
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      evaluations: '980',
      thumbnail: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
      rubric: [
        'Uses blind resume screening criteria',
        'Applies objective scoring rubrics',
        'Recognizes affinity bias in candidate reviews'
      ]
    },
    {
      id: 3,
      title: 'Psychological Safety Evaluation',
      subtitle: 'Assesses team culture and freedom to share dissenting views',
      competency: 'Cultural Safety',
      competencyBadge: 'bg-amber-100 text-amber-700 border-amber-200',
      type: 'Likert Scale (1-5)',
      weight: '15%',
      scoringModel: 'Percentage Index',
      avgScore: '81%',
      avgScorePercent: 81,
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      evaluations: '1,150',
      thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
      rubric: [
        'Team members feel safe taking calculated risks',
        'Mistakes are treated as learning opportunities',
        'Dissenting opinions are welcomed and analyzed'
      ]
    },
    {
      id: 4,
      title: 'Pay Parity Governance Audit',
      subtitle: 'Evaluates manager compliance with equal pay principles',
      competency: 'Compensation Equity',
      competencyBadge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      type: 'Audit Checklist',
      weight: '25%',
      scoringModel: 'Compliance Percentage',
      avgScore: '88%',
      avgScorePercent: 88,
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      evaluations: '840',
      thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
      rubric: [
        'Regular pay audit reviews conducted',
        'Transparent salary band structures maintained',
        'Remediation budgets allocated for identified gaps'
      ]
    },
    {
      id: 5,
      title: 'Executive Allyship & Sponsorship Scorecard',
      subtitle: 'Tracks active sponsorship of high-potential diverse talent',
      competency: 'Allyship & Sponsorship',
      competencyBadge: 'bg-purple-100 text-purple-700 border-purple-200',
      type: 'Behavioral Choice',
      weight: '10%',
      scoringModel: 'Point Scale',
      avgScore: '72%',
      avgScorePercent: 72,
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      evaluations: '620',
      thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80',
      rubric: [
        'Advocates for diverse proteges in executive calibration',
        'Provides stretch project opportunities',
        'Sponsors cross-departmental exposure'
      ]
    },
    {
      id: 6,
      title: 'Flexible Work Equity Assessment',
      subtitle: 'Measures fairness in hybrid work evaluation and performance reviews',
      competency: 'Workplace Equity',
      competencyBadge: 'bg-sky-100 text-sky-700 border-sky-200',
      type: 'Likert Scale (1-5)',
      weight: '15%',
      scoringModel: 'Percentage Index',
      avgScore: '69%',
      avgScorePercent: 69,
      status: 'Draft',
      statusBadge: 'bg-amber-100 text-amber-700',
      evaluations: '410',
      thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80',
      rubric: [
        'Evaluates performance based on output, not face-time',
        'Ensures hybrid team members have equal access to promotions',
        'Provides ergonomic home office equipment allowances'
      ]
    },
    {
      id: 7,
      title: 'Supplier Diversity Program Evaluation',
      subtitle: 'Evaluates procurement alignment with diverse enterprise vendors',
      competency: 'External Impact',
      competencyBadge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      type: 'Audit Checklist',
      weight: '10%',
      scoringModel: 'Compliance Percentage',
      avgScore: '79%',
      avgScorePercent: 79,
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      evaluations: '530',
      thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80',
      rubric: [
        'Tracks diverse vendor procurement spend ratio',
        'Mentors women-owned supplier enterprises',
        'Conducts fair bidding processes'
      ]
    },
    {
      id: 8,
      title: 'Inclusive Conflict Resolution Assessment',
      subtitle: 'Evaluates leadership capability in resolving workplace friction inclusively',
      competency: 'Leadership Capability',
      competencyBadge: 'bg-purple-100 text-purple-700 border-purple-200',
      type: 'Behavioral Choice',
      weight: '15%',
      scoringModel: 'Weighted Competency Matrix',
      avgScore: '83%',
      avgScorePercent: 83,
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      evaluations: '790',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      rubric: [
        'De-escalates tension neutrally',
        'Ensures all parties present their perspective without interruption',
        'Agrees on mutually respectful resolutions'
      ]
    }
  ];

  const activeAssessmentQuestion = assessmentQuestionsData.find(a => a.id === selectedAssessmentId) || assessmentQuestionsData[0];
  const activeCaseStudy = caseStudiesData.find(c => c.id === selectedCaseStudyId) || caseStudiesData[0];
  const activeUser = usersData.find(u => u.id === selectedUserId) || usersData[0];

  // 8 Quiz Questions matching reference screenshot
  const quizQuestionsData = [
    {
      id: 1,
      question: 'What is an inclusive workplace?',
      subtitle: 'Select the best definition of an inclusive workplace.',
      module: 'Introduction to Inclusive Leadership',
      moduleBadge: 'bg-purple-100 text-purple-700 border-purple-200',
      type: 'MCQ',
      difficulty: 'Easy',
      difficultyBadge: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      successRate: '82%',
      successPercent: 82,
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      attempts: '420',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      options: [
        'A workplace where everyone feels respected, valued, and has equal opportunities',
        'A workplace with only diverse hiring',
        'A workplace with flexible working hours',
        'A workplace focused only on women employees'
      ],
      correctAnswer: 0
    },
    {
      id: 2,
      question: 'Which of the following is an example of unconscious bias?',
      subtitle: 'Identify an example of unconscious bias in evaluation.',
      module: 'Unconscious Bias Awareness',
      moduleBadge: 'bg-sky-100 text-sky-700 border-sky-200',
      type: 'MCQ',
      difficulty: 'Medium',
      difficultyBadge: 'bg-amber-50 text-amber-600 border-amber-200',
      successRate: '68%',
      successPercent: 68,
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      attempts: '385',
      thumbnail: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
      options: [
        'Assuming a candidate from a similar background is automatically more competent',
        'Using standardized evaluation rubrics for all candidate interviews',
        'Conducting structured blind resume reviews',
        'Asking identical behavioral questions to all job applicants'
      ],
      correctAnswer: 0
    },
    {
      id: 3,
      question: 'True or False: Gender diversity directly improves innovation outcomes.',
      subtitle: 'Evaluate the impact of gender diversity on R&D effectiveness.',
      module: 'Diversity in Leadership',
      moduleBadge: 'bg-purple-100 text-purple-700 border-purple-200',
      type: 'True/False',
      difficulty: 'Easy',
      difficultyBadge: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      successRate: '91%',
      successPercent: 91,
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      attempts: '510',
      thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
      options: [
        'True - Diverse teams produce wider problem-solving perspectives and higher innovation revenue',
        'False - Gender diversity has no measurable business impact'
      ],
      correctAnswer: 0
    },
    {
      id: 4,
      question: 'Match the following terms with their correct definitions.',
      subtitle: 'Match each inclusion term with its correct definition.',
      module: 'Inclusive Decision Making',
      moduleBadge: 'bg-amber-100 text-amber-700 border-amber-200',
      type: 'Matching',
      difficulty: 'Medium',
      difficultyBadge: 'bg-amber-50 text-amber-600 border-amber-200',
      successRate: '63%',
      successPercent: 63,
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      attempts: '310',
      thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80',
      options: [
        'Allyship <-> Active support and advocacy for underrepresented groups',
        'Psychological Safety <-> Belief that one will not be punished for mistakes',
        'Microaggression <-> Subtle, indirect, or unintentional discrimination'
      ],
      correctAnswer: 0
    },
    {
      id: 5,
      question: 'Which strategy best promotes workplace flexibility?',
      subtitle: 'Choose the most effective strategy for hybrid workplace equity.',
      module: 'Flexible Work Strategies',
      moduleBadge: 'bg-sky-100 text-sky-700 border-sky-200',
      type: 'MCQ',
      difficulty: 'Hard',
      difficultyBadge: 'bg-rose-50 text-rose-600 border-rose-200',
      successRate: '52%',
      successPercent: 52,
      status: 'Draft',
      statusBadge: 'bg-amber-100 text-amber-700',
      attempts: '190',
      thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80',
      options: [
        'Establishing core collaboration hours while empowering flexible scheduling',
        'Requiring mandatory 5-day office presence for all employees',
        'Eliminating all scheduled syncs and team meetings',
        'Restricting flexible work options exclusively to senior managers'
      ],
      correctAnswer: 0
    },
    {
      id: 6,
      question: 'Arrange the steps for building an inclusive team in order.',
      subtitle: 'Put the steps in the correct order to foster team inclusion.',
      module: 'Building Inclusive Teams',
      moduleBadge: 'bg-purple-100 text-purple-700 border-purple-200',
      type: 'Sequence',
      difficulty: 'Medium',
      difficultyBadge: 'bg-amber-50 text-amber-600 border-amber-200',
      successRate: '70%',
      successPercent: 70,
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      attempts: '295',
      thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
      options: [
        '1. Establish psychological safety baseline across all team members',
        '2. Define transparent team communication norms and meeting rules',
        '3. Implement periodic inclusion retrospectives and feedback loops'
      ],
      correctAnswer: 0
    },
    {
      id: 7,
      question: 'Select all that apply: Benefits of measuring inclusion.',
      subtitle: 'Choose all correct options regarding inclusion metrics.',
      module: 'Measuring Inclusion Impact',
      moduleBadge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      type: 'Multi-Select',
      difficulty: 'Medium',
      difficultyBadge: 'bg-amber-50 text-amber-600 border-amber-200',
      successRate: '66%',
      successPercent: 66,
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      attempts: '340',
      thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80',
      options: [
        'Higher employee retention rates across diverse demographics',
        'Improved team decision quality and problem-solving speed',
        'Increased overall employee engagement and productivity scores',
        'Clearer visibility into equity gaps for targeted intervention'
      ],
      correctAnswer: 0
    },
    {
      id: 8,
      question: 'Scenario: You notice a colleague being interrupted repeatedly in a meeting.',
      subtitle: 'What should you do in this situation as an active ally?',
      module: 'Case Study Assessment',
      moduleBadge: 'bg-sky-100 text-sky-700 border-sky-200',
      type: 'Scenario',
      difficulty: 'Hard',
      difficultyBadge: 'bg-rose-50 text-rose-600 border-rose-200',
      successRate: '48%',
      successPercent: 48,
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      attempts: '410',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      options: [
        'Intervene respectfully by saying: "I would love to hear the rest of [Colleague]\'s point."',
        'Remain silent during the meeting and message them privately afterwards',
        'Confront the interrupter aggressively in front of the team',
        'Leave the meeting in protest without saying anything'
      ],
      correctAnswer: 0
    }
  ];

  const activeQuizQuestion = quizQuestionsData.find(q => q.id === selectedQuestionId) || quizQuestionsData[0];

  // 8 Learning Modules matching reference screenshot
  const learningModulesData = [
    {
      id: 1,
      title: 'Introduction to Inclusive Leadership',
      subtitle: 'Core concepts and importance of inclusive leadership',
      category: 'Leadership',
      categoryBadge: 'bg-purple-100 text-purple-700 border-purple-200',
      level: 'Beginner',
      levelBadge: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      duration: '15 min',
      completionRate: '78%',
      completionPercent: 78,
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      rating: '4.6',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      description: 'Learn the fundamentals of inclusive leadership and how it drives organizational success and workplace equity.',
      objectives: [
        'Understand the concept of inclusive leadership',
        'Recognize the benefits of inclusive workplaces',
        'Identify key behaviors of inclusive leaders',
        'Apply inclusive leadership principles in real-world scenarios'
      ]
    },
    {
      id: 2,
      title: 'Gender Equity in the Workplace',
      subtitle: 'Understanding bias and barriers faced by women',
      category: 'Diversity',
      categoryBadge: 'bg-sky-100 text-sky-700 border-sky-200',
      level: 'Beginner',
      levelBadge: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      duration: '20 min',
      completionRate: '65%',
      completionPercent: 65,
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      rating: '4.7',
      thumbnail: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
      description: 'Deep dive into gender equity dynamics, structural barriers, and strategies to foster equal opportunities.',
      objectives: [
        'Identify systemic gender biases',
        'Promote pay and career equity',
        'Implement gender-inclusive policies',
        'Measure gender diversity metrics'
      ]
    },
    {
      id: 3,
      title: 'Building Inclusive Teams',
      subtitle: 'Strategies for creating psychological safety',
      category: 'Workplace Culture',
      categoryBadge: 'bg-amber-100 text-amber-700 border-amber-200',
      level: 'Intermediate',
      levelBadge: 'bg-amber-50 text-amber-600 border-amber-200',
      duration: '25 min',
      completionRate: '72%',
      completionPercent: 72,
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      rating: '4.5',
      thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
      description: 'Practical framework for team leaders to cultivate trust, psychological safety, and active inclusion.',
      objectives: [
        'Foster psychological safety in team meetings',
        'Encourage diverse perspectives',
        'Mitigate groupthink and unconscious bias',
        'Resolve conflicts inclusively'
      ]
    },
    {
      id: 4,
      title: 'Unconscious Bias Awareness',
      subtitle: 'Identify and mitigate unconscious biases',
      category: 'Diversity',
      categoryBadge: 'bg-sky-100 text-sky-700 border-sky-200',
      level: 'Beginner',
      levelBadge: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      duration: '18 min',
      completionRate: '68%',
      completionPercent: 68,
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      rating: '4.8',
      thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80',
      description: 'Explore common cognitive biases in recruitment, evaluation, and daily workplace interactions.',
      objectives: [
        'Recognize affinity and confirmation bias',
        'Implement structured evaluation rubrics',
        'Apply counter-stereotype strategies',
        'Develop self-awareness habits'
      ]
    },
    {
      id: 5,
      title: 'Inclusive Decision Making',
      subtitle: 'Techniques for fair and transparent choices',
      category: 'Leadership',
      categoryBadge: 'bg-purple-100 text-purple-700 border-purple-200',
      level: 'Intermediate',
      levelBadge: 'bg-amber-50 text-amber-600 border-amber-200',
      duration: '22 min',
      completionRate: '75%',
      completionPercent: 75,
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      rating: '4.4',
      thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80',
      description: 'Methods to ensure strategic decisions incorporate diverse stakeholder voices and equitable criteria.',
      objectives: [
        'Structure inclusive brainstorming sessions',
        'Audit decision criteria for bias',
        'Engage underrepresented groups',
        'Communicate transparent rationales'
      ]
    },
    {
      id: 6,
      title: 'Measuring Inclusion Impact',
      subtitle: 'Learn how to measure and track inclusion',
      category: 'Impact Measurement',
      categoryBadge: 'bg-rose-100 text-rose-700 border-rose-200',
      level: 'Advanced',
      levelBadge: 'bg-rose-50 text-rose-600 border-rose-200',
      duration: '30 min',
      completionRate: '62%',
      completionPercent: 62,
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      rating: '4.9',
      thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
      description: 'Metrics, dashboards, and evaluation frameworks to quantify organizational inclusion progress.',
      objectives: [
        'Define inclusion Key Performance Indicators',
        'Design inclusion climate surveys',
        'Analyze demographic representation data',
        'Report progress to executive leadership'
      ]
    },
    {
      id: 7,
      title: 'Creating Equitable Opportunities',
      subtitle: 'Practical steps for workplace equity',
      category: 'Workplace Culture',
      categoryBadge: 'bg-amber-100 text-amber-700 border-amber-200',
      level: 'Intermediate',
      levelBadge: 'bg-amber-50 text-amber-600 border-amber-200',
      duration: '25 min',
      completionRate: '70%',
      completionPercent: 70,
      status: 'Draft',
      statusBadge: 'bg-amber-100 text-amber-700',
      rating: '4.3',
      thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80',
      description: 'Guidelines for fair promotions, stretch assignments, and career advancement programs.',
      objectives: [
        'Audit promotion criteria for equity',
        'Establish transparent career pathways',
        'Implement mentorship matching',
        'Track high-potential talent progress'
      ]
    },
    {
      id: 8,
      title: 'Case Study: Successful Inclusion',
      subtitle: 'Real-world examples and insights',
      category: 'Case Study',
      categoryBadge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      level: 'Beginner',
      levelBadge: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      duration: '20 min',
      completionRate: '80%',
      completionPercent: 80,
      status: 'Active',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      rating: '4.6',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      description: 'Analysis of industry-leading inclusion transformations and business impact outcomes.',
      objectives: [
        'Analyze corporate inclusion case studies',
        'Extract key success factors',
        'Avoid common implementation pitfalls',
        'Adapt strategies to organizational context'
      ]
    }
  ];

  const activeLearningModule = learningModulesData.find(m => m.id === selectedModuleId) || learningModulesData[0];

  // Game Sessions Table Data matching reference UI screenshot
  const gameSessionsData = [
    {
      id: 1,
      name: 'Women Leadership Cohort 2024',
      organization: 'TCS',
      mode: 'Standard',
      modeBadge: 'bg-purple-100 text-purple-700 border-purple-200',
      participants: '45 / 50',
      participantsCount: 45,
      maxParticipants: 50,
      progressPercent: 90,
      status: 'In Progress',
      statusBadge: 'bg-sky-100 text-sky-700',
      startDate: '12 Oct 2024, 10:00 AM',
      duration: '2h 15m',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      description: 'A simulation session focused on building strategic leadership skills and exploring inclusive workplace practices.'
    },
    {
      id: 2,
      name: 'Inclusive Culture Workshop',
      organization: 'Infosys',
      mode: 'Standard',
      modeBadge: 'bg-purple-100 text-purple-700 border-purple-200',
      participants: '32 / 40',
      participantsCount: 32,
      maxParticipants: 40,
      progressPercent: 80,
      status: 'Completed',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      startDate: '10 Oct 2024, 02:00 PM',
      duration: '2h 30m',
      thumbnail: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
      description: 'Interactive session exploring workplace culture, allyship, and inclusive behavior.'
    },
    {
      id: 3,
      name: 'Diversity Hiring Simulation',
      organization: 'Accenture',
      mode: 'Custom',
      modeBadge: 'bg-orange-100 text-orange-700 border-orange-200',
      participants: '28 / 30',
      participantsCount: 28,
      maxParticipants: 30,
      progressPercent: 93,
      status: 'Completed',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      startDate: '08 Oct 2024, 11:00 AM',
      duration: '1h 45m',
      thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
      description: 'Hands-on simulation on diverse recruitment, unbiased screening, and candidate evaluation.'
    },
    {
      id: 4,
      name: 'STEM Education Initiative',
      organization: 'Wipro',
      mode: 'Standard',
      modeBadge: 'bg-purple-100 text-purple-700 border-purple-200',
      participants: '50 / 50',
      participantsCount: 50,
      maxParticipants: 50,
      progressPercent: 100,
      status: 'Completed',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      startDate: '05 Oct 2024, 09:30 AM',
      duration: '2h 20m',
      thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80',
      description: 'Empowering CSR teams to design effective STEM mentorship and education partnerships.'
    },
    {
      id: 5,
      name: 'Flexible Work Strategy',
      organization: 'HCL',
      mode: 'Standard',
      modeBadge: 'bg-purple-100 text-purple-700 border-purple-200',
      participants: '25 / 30',
      participantsCount: 25,
      maxParticipants: 30,
      progressPercent: 83,
      status: 'In Progress',
      statusBadge: 'bg-sky-100 text-sky-700',
      startDate: '04 Oct 2024, 03:00 PM',
      duration: '2h 10m',
      thumbnail: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
      description: 'Exploring hybrid work arrangements, remote team inclusion, and productivity frameworks.'
    },
    {
      id: 6,
      name: 'Pay Equity Assessment',
      organization: 'Deloitte',
      mode: 'Custom',
      modeBadge: 'bg-orange-100 text-orange-700 border-orange-200',
      participants: '38 / 40',
      participantsCount: 38,
      maxParticipants: 40,
      progressPercent: 95,
      status: 'Completed',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      startDate: '01 Oct 2024, 10:00 AM',
      duration: '2h 45m',
      thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
      description: 'Analyzing compensation parity, pay gap auditing strategies, and equal pay governance.'
    },
    {
      id: 7,
      name: 'Mentorship Program Design',
      organization: 'IBM',
      mode: 'Standard',
      modeBadge: 'bg-purple-100 text-purple-700 border-purple-200',
      participants: '42 / 45',
      participantsCount: 42,
      maxParticipants: 45,
      progressPercent: 93,
      status: 'Completed',
      statusBadge: 'bg-emerald-100 text-emerald-700',
      startDate: '28 Sep 2024, 11:30 AM',
      duration: '2h 05m',
      thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80',
      description: 'Building structured executive sponsorship and cross-departmental mentorship networks.'
    },
    {
      id: 8,
      name: 'Inclusive Hiring Strategy',
      organization: 'Capgemini',
      mode: 'Custom',
      modeBadge: 'bg-orange-100 text-orange-700 border-orange-200',
      participants: '30 / 35',
      participantsCount: 30,
      maxParticipants: 35,
      progressPercent: 85,
      status: 'Scheduled',
      statusBadge: 'bg-amber-100 text-amber-700',
      startDate: '15 Oct 2024, 02:00 PM',
      duration: '-',
      thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80',
      description: 'Upcoming simulation session on talent acquisition practices and inclusive job postings.'
    }
  ];

  const activeSession = gameSessionsData.find(s => s.id === selectedSessionId) || gameSessionsData[0];

  const sessionParticipantsList = [
    { id: 1, name: 'Priya Sharma', org: 'TCS', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80', progress: 80, status: 'Active', statusBadge: 'bg-emerald-100 text-emerald-700' },
    { id: 2, name: 'Rahul Mehta', org: 'TCS', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', progress: 60, status: 'Active', statusBadge: 'bg-emerald-100 text-emerald-700' },
    { id: 3, name: 'Anjali Verma', org: 'TCS', avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=100&q=80', progress: 100, status: 'Completed', statusBadge: 'bg-emerald-100 text-emerald-700' },
    { id: 4, name: 'Karan Gupta', org: 'TCS', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', progress: 75, status: 'Active', statusBadge: 'bg-emerald-100 text-emerald-700' },
    { id: 5, name: 'Sneha Iyer', org: 'TCS', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80', progress: 40, status: 'Active', statusBadge: 'bg-emerald-100 text-emerald-700' }
  ];

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newCardTagInput.trim()) {
      e.preventDefault();
      if (!newCardTags.includes(newCardTagInput.trim())) {
        setNewCardTags([...newCardTags, newCardTagInput.trim()]);
      }
      setNewCardTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNewCardTags(newCardTags.filter(t => t !== tagToRemove));
  };

  // New Card Modal State
  const [showAddCard, setShowAddCard] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('COMPENSATION');
  const [cost, setCost] = useState(50000);
  const [yieldPoints, setYieldPoints] = useState(180);
  const [inclusionImpact, setInclusionImpact] = useState(85);
  const [description, setDescription] = useState('');

  // 12 Investment Cards matching reference UI screenshot
  const investmentCardsList = [
    {
      id: 1,
      title: 'Pay Equity Audit Program',
      description: 'Conduct regular pay equity audits to identify and address compensation gaps across genders.',
      category: 'Compensation',
      categoryBadge: 'bg-purple-100 text-purple-700 border-purple-200',
      industry: 'HR',
      cost: '₹50,000',
      rawCost: 50000,
      impact: 'High',
      impactLevel: 'high',
      inclusionScore: '85%',
      status: 'Active',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      createdOn: '12 Aug 2024',
      lastUpdated: '20 Sep 2024'
    },
    {
      id: 2,
      title: 'Flexible Work Infrastructure',
      description: 'Invest in digital tools and policies to support flexible and hybrid work arrangements.',
      category: 'Flexible Work',
      categoryBadge: 'bg-[#eeedff] text-[#5551ff] border-indigo-200',
      industry: 'Operations',
      cost: '₹75,000',
      rawCost: 75000,
      impact: 'High',
      impactLevel: 'high',
      inclusionScore: '78%',
      status: 'Active',
      thumbnail: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
      createdOn: '15 Jul 2024',
      lastUpdated: '18 Aug 2024'
    },
    {
      id: 3,
      title: 'Women Leadership Development',
      description: 'Leadership programs for high-potential female employees to build senior executive pipeline.',
      category: 'Leadership',
      categoryBadge: 'bg-purple-100 text-purple-700 border-purple-200',
      industry: 'HR',
      cost: '₹60,000',
      rawCost: 60000,
      impact: 'High',
      impactLevel: 'high',
      inclusionScore: '90%',
      status: 'Active',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      createdOn: '01 Jun 2024',
      lastUpdated: '05 Sep 2024'
    },
    {
      id: 4,
      title: 'Inclusive Culture Campaign',
      description: 'Awareness and culture-building initiatives across the entire workforce.',
      category: 'Workplace Culture',
      categoryBadge: 'bg-blue-100 text-blue-700 border-blue-200',
      industry: 'People',
      cost: '₹30,000',
      rawCost: 30000,
      impact: 'Medium',
      impactLevel: 'medium',
      inclusionScore: '72%',
      status: 'Active',
      thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
      createdOn: '20 May 2024',
      lastUpdated: '12 Aug 2024'
    },
    {
      id: 5,
      title: 'Accessibility & Assistive Tech',
      description: 'Provide assistive technologies and accessible office infrastructure for all staff.',
      category: 'Accessibility',
      categoryBadge: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      industry: 'Facilities',
      cost: '₹80,000',
      rawCost: 80000,
      impact: 'High',
      impactLevel: 'high',
      inclusionScore: '88%',
      status: 'Active',
      thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80',
      createdOn: '10 Apr 2024',
      lastUpdated: '30 Jul 2024'
    },
    {
      id: 6,
      title: 'Diverse Hiring Strategy',
      description: 'Implement inclusive recruitment practices, blind resume screening, and diverse interview panels.',
      category: 'Recruitment',
      categoryBadge: 'bg-purple-100 text-purple-700 border-purple-200',
      industry: 'HR',
      cost: '₹40,000',
      rawCost: 40000,
      impact: 'High',
      impactLevel: 'high',
      inclusionScore: '82%',
      status: 'Active',
      thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
      createdOn: '05 Mar 2024',
      lastUpdated: '14 Jun 2024'
    },
    {
      id: 7,
      title: 'STEM Education Partnership',
      description: 'Partner with educational institutions to foster young female STEM talent and scholarships.',
      category: 'Community Impact',
      categoryBadge: 'bg-purple-100 text-purple-700 border-purple-200',
      industry: 'CSR',
      cost: '₹90,000',
      rawCost: 90000,
      impact: 'Medium',
      impactLevel: 'medium',
      inclusionScore: '75%',
      status: 'Draft',
      thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80',
      createdOn: '18 Feb 2024',
      lastUpdated: '01 Aug 2024'
    },
    {
      id: 8,
      title: 'Supplier Diversity Program',
      description: 'Increase procurement from women-owned and underrepresented business enterprises.',
      category: 'Supply Chain',
      categoryBadge: 'bg-purple-100 text-purple-700 border-purple-200',
      industry: 'Procurement',
      cost: '₹70,000',
      rawCost: 70000,
      impact: 'Medium',
      impactLevel: 'medium',
      inclusionScore: '74%',
      status: 'Active',
      thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80',
      createdOn: '02 Feb 2024',
      lastUpdated: '25 May 2024'
    },
    {
      id: 9,
      title: 'Maternity & Parental Support',
      description: 'Comprehensive parental leave support, childcare stipends, and structured re-onboarding.',
      category: 'Compensation',
      categoryBadge: 'bg-purple-100 text-purple-700 border-purple-200',
      industry: 'HR',
      cost: '₹65,000',
      rawCost: 65000,
      impact: 'High',
      impactLevel: 'high',
      inclusionScore: '92%',
      status: 'Active',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      createdOn: '14 Jan 2024',
      lastUpdated: '10 Aug 2024'
    },
    {
      id: 10,
      title: 'Unconscious Bias Training',
      description: 'Interactive workshops to identify and eliminate subtle biases in decision-making.',
      category: 'Workplace Culture',
      categoryBadge: 'bg-blue-100 text-blue-700 border-blue-200',
      industry: 'People',
      cost: '₹25,000',
      rawCost: 25000,
      impact: 'Medium',
      impactLevel: 'medium',
      inclusionScore: '79%',
      status: 'Active',
      thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
      createdOn: '10 Jan 2024',
      lastUpdated: '04 Jun 2024'
    },
    {
      id: 11,
      title: 'Mentorship & Allyship Network',
      description: 'Cross-departmental sponsorship program linking senior executive mentors with diverse proteges.',
      category: 'Leadership',
      categoryBadge: 'bg-purple-100 text-purple-700 border-purple-200',
      industry: 'HR',
      cost: '₹35,000',
      rawCost: 35000,
      impact: 'High',
      impactLevel: 'high',
      inclusionScore: '86%',
      status: 'Active',
      thumbnail: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
      createdOn: '05 Jan 2024',
      lastUpdated: '20 Jul 2024'
    },
    {
      id: 12,
      title: 'Mental Health & Wellness Stipend',
      description: 'Dedicated wellness budget and confidential counseling services for all team members.',
      category: 'Flexible Work',
      categoryBadge: 'bg-[#eeedff] text-[#5551ff] border-indigo-200',
      industry: 'Operations',
      cost: '₹55,000',
      rawCost: 55000,
      impact: 'Medium',
      impactLevel: 'medium',
      inclusionScore: '81%',
      status: 'Draft',
      thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80',
      createdOn: '01 Jan 2024',
      lastUpdated: '15 Jun 2024'
    }
  ];

  const handleResetFilters = () => {
    setCardSearchQuery('');
    setSelectedCategoryFilter('All Categories');
    setSelectedIndustryFilter('All Industries');
    setSelectedStatusFilter('All Status');
    setSelectedImpactFilter('All Levels');
  };

  const filteredCards = investmentCardsList.filter((card) => {
    const matchesSearch =
      card.title.toLowerCase().includes(cardSearchQuery.toLowerCase()) ||
      card.description.toLowerCase().includes(cardSearchQuery.toLowerCase());
    const matchesCategory =
      selectedCategoryFilter === 'All Categories' || card.category === selectedCategoryFilter;
    const matchesIndustry =
      selectedIndustryFilter === 'All Industries' || card.industry === selectedIndustryFilter;
    const matchesStatus =
      selectedStatusFilter === 'All Status' || card.status === selectedStatusFilter;
    const matchesImpact =
      selectedImpactFilter === 'All Levels' || card.impact === selectedImpactFilter;
    return matchesSearch && matchesCategory && matchesIndustry && matchesStatus && matchesImpact;
  });

  const activeCard = investmentCardsList.find(c => c.id === selectedCardId) || investmentCardsList[0];

  useEffect(() => {
    loadSuperAdminData();
  }, []);

  const loadSuperAdminData = async () => {
    setLoading(true);
    try {
      const data: any = await fetchApi('/analytics/superadmin');
      const cardsRes: any = await fetchApi('/cards/investment');
      setMetrics(data.metrics || {
        totalCards: 12,
        totalPlayers: '8,245',
        avgInclusionScore: '76%',
        completedSimulations: '62%'
      });
      setCards(cardsRes.cards || []);
    } catch (err) {
      console.error('Failed to load super admin data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCard = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetchApi('/cards/investment', {
        method: 'POST',
        body: JSON.stringify({
          title,
          category,
          cost,
          yield_points: yieldPoints,
          inclusion_impact: inclusionImpact,
          description
        })
      });
      setShowAddCard(false);
      loadSuperAdminData();
    } catch (err) {
      console.error('Error adding card', err);
    }
  };

  // 4 Main Investment Card Mock Data matching reference screenshot exactly
  const displayCards = [
    {
      id: 'card-1',
      title: 'Pay Equity Audit Program',
      category: 'COMPENSATION',
      categoryBadge: 'bg-purple-100 text-purple-700 border-purple-200',
      description: 'Conduct regular pay equity audits to identify and address compensation gaps.',
      cost: '₹50,000',
      yield: 'High',
      inclusion: '85%',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'card-2',
      title: 'Hybrid Work Infrastructure',
      category: 'FLEXIBLE WORK',
      categoryBadge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      description: 'Invest in tools and policies to support flexible and hybrid work arrangements.',
      cost: '₹75,000',
      yield: 'Medium',
      inclusion: '78%',
      thumbnail: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'card-3',
      title: 'Women Leadership Development',
      category: 'LEADERSHIP',
      categoryBadge: 'bg-orange-100 text-orange-700 border-orange-200',
      description: 'Build a structured leadership pipeline for high-potential women employees.',
      cost: '₹60,000',
      yield: 'High',
      inclusion: '90%',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'card-4',
      title: 'Inclusive Culture Campaign',
      category: 'WORKPLACE CULTURE',
      categoryBadge: 'bg-rose-100 text-rose-700 border-rose-200',
      description: 'Run organization-wide campaigns to build awareness and inclusion mindset.',
      cost: '₹30,000',
      yield: 'Medium',
      inclusion: '72%',
      thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80'
    }
  ];

  // Heatmap rows data matching reference screenshot
  const heatmapCategories = [
    { name: 'Leadership & Governance', values: [10, 45, 15, 10, 25, 20, 15, 30, 20, 15] },
    { name: 'Recruitment & Hiring', values: [20, 70, 30, 20, 30, 25, 15, 20, 25, 20] },
    { name: 'Compensation & Benefits', values: [15, 25, 45, 30, 85, 20, 25, 15, 40, 20] },
    { name: 'Learning & Development', values: [25, 30, 20, 35, 30, 20, 75, 25, 30, 20] },
    { name: 'Workplace Culture', values: [40, 35, 15, 25, 30, 35, 20, 25, 20, 15] },
    { name: 'Flexible Work', values: [15, 20, 25, 30, 25, 40, 30, 20, 25, 70] },
    { name: 'Safety & Wellbeing', values: [20, 40, 30, 25, 20, 75, 35, 25, 30, 25] },
    { name: 'Community & External Impact', values: [15, 25, 20, 30, 25, 30, 25, 20, 25, 20] }
  ];

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#0c0c24] flex items-center justify-center text-white space-y-3 flex-col">
        <div className="w-10 h-10 border-3 border-[#5551ff] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-bold tracking-wider uppercase text-slate-400">Loading CII CWL Admin Engine...</p>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-[#f8f9fd] flex font-sans text-slate-900">
      
      {/* 1. Left Dark Sidebar */}
      <aside className="w-64 bg-[#0d0d2b] text-slate-300 flex flex-col shrink-0 h-full border-r border-slate-800 overflow-hidden">
        
        {/* Brand Header - FIXED TOP */}
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
              <p className="text-[10px] text-slate-400 font-medium">CII Centre for Women Leadership</p>
            </div>
          </div>
        </div>

        {/* Nav Categories - SCROLLABLE MIDDLE */}
        <nav className="flex-1 overflow-y-auto p-5 space-y-5 text-xs font-bold">
          
          {/* SUPER ADMIN SIDEBAR MENU */}
          {adminRole === 'superadmin' && (
            <>
              {/* 1. MAIN */}
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
                    onClick={() => setActiveTab('analytics')} 
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-2xl transition-all ${
                      activeTab === 'analytics' ? 'bg-[#5551ff] text-white shadow-md font-extrabold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span>Analytics</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab('game-sessions')} 
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-2xl transition-all ${
                      (activeTab === 'game-sessions' || activeTab === 'user-decisions') ? 'bg-[#5551ff] text-white shadow-md font-extrabold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <Gamepad2 className="w-4 h-4" />
                    <span>Game Sessions</span>
                  </button>
                </div>
              </div>

              {/* 2. GAME MANAGEMENT */}
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 px-3">GAME MANAGEMENT</div>
                <div className="space-y-1">
                  <button 
                    onClick={() => setActiveTab('investment-cards')} 
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-2xl transition-all ${
                      (activeTab === 'investment-cards' || activeTab === 'add-investment-card') ? 'bg-[#5551ff] text-white shadow-md font-extrabold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <Layers className="w-4 h-4" />
                    <span>Investment Cards</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab('event-cards')} 
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl transition-all ${
                      (activeTab === 'event-cards' || activeTab === 'add-event-card') ? 'bg-[#5551ff] text-white shadow-md font-extrabold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Event Cards</span>
                    </div>
                    <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">NEW</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab('business-scenarios')} 
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-2xl transition-all ${
                      activeTab === 'business-scenarios' ? 'bg-[#5551ff] text-white shadow-md font-extrabold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>Business Scenarios</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab('rules-tutorials')} 
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-2xl transition-all ${
                      activeTab === 'rules-tutorials' ? 'bg-[#5551ff] text-white shadow-md font-extrabold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <BookMarked className="w-4 h-4" />
                    <span>Rules & Tutorial</span>
                  </button>
                </div>
              </div>

              {/* 3. LEARNING & CONTENT */}
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 px-3">LEARNING & CONTENT</div>
                <div className="space-y-1">
                  <button
                    onClick={() => setActiveTab('learning-content')}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-2xl transition-all ${
                      activeTab === 'learning-content' ? 'bg-[#5551ff] text-white shadow-md font-extrabold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Learning Content</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('assessments')}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-2xl transition-all ${
                      (activeTab === 'assessments' || activeTab === 'pre-game-quiz' || activeTab === 'post-game-quiz' || activeTab === 'quiz-management' || activeTab === 'add-quiz-question' || activeTab === 'assessment-questions') ? 'bg-[#5551ff] text-white shadow-md font-extrabold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <FileCheck className="w-4 h-4" />
                    <span>Assessments</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('case-studies')}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-2xl transition-all ${
                      activeTab === 'case-studies' ? 'bg-[#5551ff] text-white shadow-md font-extrabold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>Case Studies</span>
                  </button>
                </div>
              </div>

              {/* 4. USER MANAGEMENT */}
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 px-3">USER MANAGEMENT</div>
                <div className="space-y-1">
                  <button
                    onClick={() => setActiveTab('users-organizations')}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-2xl transition-all ${
                      (activeTab === 'users-organizations' || activeTab === 'users' || activeTab === 'organizations') ? 'bg-[#5551ff] text-white shadow-md font-extrabold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Users & Organizations</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('partner-admins')}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-2xl transition-all ${
                      activeTab === 'partner-admins' ? 'bg-[#5551ff] text-white shadow-md font-extrabold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Partner Admins</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('roles-permissions')}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-2xl transition-all ${
                      activeTab === 'roles-permissions' ? 'bg-[#5551ff] text-white shadow-md font-extrabold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Roles & Permissions</span>
                  </button>
                </div>
              </div>

              {/* 5. INSIGHTS & REPORTING */}
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 px-3">INSIGHTS & REPORTING</div>
                <div className="space-y-1">
                  <button
                    onClick={() => setActiveTab('leaderboard')}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-2xl transition-all ${
                      activeTab === 'leaderboard' ? 'bg-[#5551ff] text-white shadow-md font-extrabold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <Award className="w-4 h-4" />
                    <span>Leaderboard</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('inclusion-metrics')}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-2xl transition-all ${
                      activeTab === 'inclusion-metrics' ? 'bg-[#5551ff] text-white shadow-md font-extrabold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <Activity className="w-4 h-4" />
                    <span>Inclusion Metrics</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('reports')}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-2xl transition-all ${
                      activeTab === 'reports' ? 'bg-[#5551ff] text-white shadow-md font-extrabold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Reports</span>
                  </button>
                </div>
              </div>

              {/* 6. SYSTEM */}
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 px-3">SYSTEM</div>
                <div className="space-y-1">
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl transition-all ${
                      activeTab === 'notifications' ? 'bg-[#5551ff] text-white shadow-md font-extrabold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Bell className="w-4 h-4" />
                      <span>Notifications</span>
                    </div>
                    <span className="w-4 h-4 rounded-full bg-rose-500 text-white font-black text-[10px] flex items-center justify-center">3</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-2xl transition-all ${
                      activeTab === 'settings' ? 'bg-[#5551ff] text-white shadow-md font-extrabold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('audit-logs')}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-2xl transition-all ${
                      activeTab === 'audit-logs' ? 'bg-[#5551ff] text-white shadow-md font-extrabold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <History className="w-4 h-4" />
                    <span>Audit Logs</span>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* PARTNER ADMIN SIDEBAR MENU (MATCHES REFERENCE UI SCREENSHOT) */}
          {adminRole === 'partneradmin' && (
            <>
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
                    onClick={() => setActiveTab('game-sessions')} 
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-2xl transition-all ${
                      activeTab === 'game-sessions' ? 'bg-[#5551ff] text-white shadow-md font-extrabold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Sessions</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab('participant-codes')} 
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-2xl transition-all ${
                      activeTab === 'participant-codes' ? 'bg-[#5551ff] text-white shadow-md font-extrabold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>Participants</span>
                  </button>
                </div>
              </div>

              {/* RESULTS */}
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 px-3">RESULTS</div>
                <div className="space-y-1">
                  <button
                    onClick={() => setActiveTab('reports')}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-2xl transition-all ${
                      activeTab === 'reports' ? 'bg-[#5551ff] text-white shadow-md font-extrabold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
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
                    onClick={() => setActiveTab('learning-content')}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-2xl transition-all ${
                      activeTab === 'learning-content' ? 'bg-[#5551ff] text-white shadow-md font-extrabold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
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
            </>
          )}

        </nav>

        {/* Sidebar Footer User Profile - FIXED BOTTOM */}
        <div className="p-4 border-t border-slate-800/80 bg-[#0a0a22] shrink-0 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-9 h-9 rounded-full text-white font-black text-xs flex items-center justify-center border border-white/20 ${
              adminRole === 'superadmin' ? 'bg-[#5551ff]' : 'bg-amber-500'
            }`}>
              {adminRole === 'superadmin' ? 'SA' : 'PA'}
            </div>
            <div>
              <div className="text-xs font-black text-white leading-tight">
                {adminRole === 'superadmin' ? 'CII CWL Super Admin' : 'TechMind Partner Admin'}
              </div>
              <div className="text-[10px] text-amber-400 font-bold">
                {adminRole === 'superadmin' ? 'Super Admin (Global)' : 'Partner Admin (Institutional)'}
              </div>
            </div>
          </div>
          {onLogout && (
            <button
              onClick={onLogout}
              title="Logout"
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors border border-slate-700/60"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>

      </aside>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        {/* Top App Header Bar (MATCHES REFERENCE UI SCREENSHOT) */}
        <header className="bg-white border-b border-slate-200/80 h-16 px-6 flex items-center justify-between shrink-0 z-30">
          
          {/* Left Side: Search or Partner Org Switcher */}
          {adminRole === 'superadmin' ? (
            <div className="relative w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search investment cards, users, sessions..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100/80 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500"
              />
            </div>
          ) : (
            <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-xl cursor-pointer hover:bg-slate-100 transition-all">
              <div className="p-1.5 rounded-lg bg-indigo-50 text-[#5551ff]">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider leading-none">Partner Admin</div>
                <div className="text-xs font-black text-slate-900 leading-tight mt-0.5 flex items-center space-x-1">
                  <span>Tata Consultancy Services</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </div>
              </div>
            </div>
          )}

          {/* Right Controls */}
          <div className="flex items-center space-x-4">
            
            {/* Partner Admin Quick Action Header Links */}
            {adminRole === 'partneradmin' && (
              <div className="hidden md:flex items-center space-x-2 text-xs font-extrabold text-slate-700">
                <button
                  onClick={() => onNavigateToApp && onNavigateToApp()}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-[#5551ff] transition-all cursor-pointer"
                >
                  <Gamepad2 className="w-4 h-4 text-[#5551ff]" />
                  <span>Play Game</span>
                </button>

                <button
                  onClick={() => setActiveTab('assessments')}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-[#5551ff] transition-all cursor-pointer"
                >
                  <FileCheck className="w-4 h-4 text-[#5551ff]" />
                  <span>Pre/Post Quiz</span>
                </button>

                <button
                  onClick={() => setActiveTab('learning-content')}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-[#5551ff] transition-all cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-[#5551ff]" />
                  <span>Learning Hub</span>
                </button>
              </div>
            )}

            {/* Notification Bell */}
            <div className="relative p-2 rounded-xl border border-slate-200 bg-white text-slate-600 cursor-pointer hover:bg-slate-50 transition-all">
              <Bell className="w-4.5 h-4.5" />
              <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-black absolute -top-1 -right-1 flex items-center justify-center shadow-xs">
                3
              </span>
            </div>


            {/* Admin Profile Badge */}
            <div className="flex items-center space-x-3 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-300">
                <img
                  src={adminRole === 'superadmin'
                    ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80"
                    : "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80"
                  }
                  alt={adminRole === 'superadmin' ? "Super Admin" : "Anita Roy (HR VP)"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs font-black text-slate-900">
                    {adminRole === 'superadmin' ? 'CII CWL Super Admin' : 'Anita Roy (HR VP)'}
                  </span>
                  <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded border ${
                    adminRole === 'superadmin'
                      ? 'bg-rose-100 text-rose-700 border-rose-200'
                      : 'bg-purple-100 text-purple-700 border-purple-200'
                  }`}>
                    {adminRole === 'superadmin' ? 'SUPERADMIN' : 'ADMIN'}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-medium">
                  {adminRole === 'superadmin' ? 'CII Centre for Women Leadership' : 'Tata Consultancy Services'}
                </div>
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
          
          {/* ------------------------------------------------------------- */}
          {/* PLATFORM ANALYTICS TAB VIEW (MATCHES REFERENCE SCREENSHOT) */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'analytics' && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Header Title Banner with Top Right Badges */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">Platform Analytics</h1>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                    Deep insights into player behavior, learning outcomes, and inclusion impact.
                  </p>
                </div>

                {/* Top Right Hero Pill Badges */}
                <div className="flex items-center space-x-3 shrink-0">
                  <div className="bg-purple-50/80 border border-purple-100 px-3.5 py-2 rounded-2xl flex items-center space-x-2 text-xs font-black text-[#5551ff] shadow-xs">
                    <BarChart3 className="w-4 h-4 text-[#5551ff]" />
                    <span>Data Insights</span>
                  </div>
                  <div className="bg-blue-50/80 border border-blue-100 px-3.5 py-2 rounded-2xl flex items-center space-x-2 text-xs font-black text-blue-600 shadow-xs">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>User Behavior</span>
                  </div>
                  <div className="bg-emerald-50/80 border border-emerald-100 px-3.5 py-2 rounded-2xl flex items-center space-x-2 text-xs font-black text-emerald-600 shadow-xs">
                    <Target className="w-4 h-4 text-emerald-600" />
                    <span>Impact Analytics</span>
                  </div>
                </div>
              </div>

              {/* Filter Bar Row (5 Select Dropdowns + Apply Filters CTA) */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-4 shadow-xs flex items-center justify-between gap-3 flex-wrap">
                
                <div className="flex items-center space-x-3 flex-wrap gap-2 flex-1">
                  
                  {/* Time Period */}
                  <div className="flex items-center space-x-2 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 cursor-pointer">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Jan 2024 - Oct 2024</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </div>

                  {/* Player Segment */}
                  <div className="flex items-center space-x-2 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 cursor-pointer">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>All Segments</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </div>

                  {/* Organization */}
                  <div className="flex items-center space-x-2 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 cursor-pointer">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>All Organizations</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </div>

                  {/* Investment Card Category */}
                  <div className="flex items-center space-x-2 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 cursor-pointer">
                    <Layers className="w-3.5 h-3.5 text-slate-400" />
                    <span>All Categories</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </div>

                  {/* Game Mode */}
                  <div className="flex items-center space-x-2 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 cursor-pointer">
                    <Gamepad2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>All Modes</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </div>

                </div>

                {/* Apply Filters Button */}
                <button className="py-2.5 px-5 rounded-xl bg-[#5551ff] hover:bg-[#4440ef] text-white font-extrabold text-xs shadow-md shadow-indigo-600/20 flex items-center space-x-2 shrink-0">
                  <Sparkles className="w-4 h-4" />
                  <span>Apply Filters</span>
                </button>

              </div>

              {/* 6 Metric Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                
                {/* 1. Total Players */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#5551ff] flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">↑ 12%</span>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900">8,245</div>
                    <div className="text-[10px] font-bold text-slate-400 mt-0.5">Total Players</div>
                  </div>
                </div>

                {/* 2. Active Players */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <BarChart3 className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">↑ 18%</span>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900">3,120</div>
                    <div className="text-[10px] font-bold text-slate-400 mt-0.5">Active Players</div>
                  </div>
                </div>

                {/* 3. Avg. Inclusion Score */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                      <BarChart3 className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">↑ 6%</span>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900">76%</div>
                    <div className="text-[10px] font-bold text-slate-400 mt-0.5">Avg. Inclusion Score</div>
                  </div>
                </div>

                {/* 4. Completed Simulations */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                      <Gamepad2 className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">↑ 9%</span>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900">62%</div>
                    <div className="text-[10px] font-bold text-slate-400 mt-0.5">Completed Simulations</div>
                  </div>
                </div>

                {/* 5. Learning Modules */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">↑ 14%</span>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900">2,450</div>
                    <div className="text-[10px] font-bold text-slate-400 mt-0.5">Learning Modules</div>
                  </div>
                </div>

                {/* 6. Assessment Pass Rate */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#5551ff] flex items-center justify-center">
                      <Target className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">↑ 5%</span>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900">89%</div>
                    <div className="text-[10px] font-bold text-slate-400 mt-0.5">Assessment Pass Rate</div>
                  </div>
                </div>

              </div>

              {/* Middle Charts Row (Player Growth Trend, Player Segments, Inclusion Score by Segment) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Player Growth Trend (5 Cols) */}
                <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-black text-slate-900">Player Growth Trend</h3>
                    <div className="flex items-center space-x-4 text-xs font-bold">
                      <div className="flex items-center space-x-1.5 text-slate-600">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#5551ff]"></span>
                        <span>New Players</span>
                      </div>
                      <div className="flex items-center space-x-1.5 text-slate-600">
                        <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                        <span>Active Players</span>
                      </div>
                    </div>
                  </div>

                  <div className="h-52 w-full pt-4">
                    <svg className="w-full h-full" viewBox="0 0 400 180" fill="none">
                      <line x1="30" y1="30" x2="380" y2="30" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="30" y1="70" x2="380" y2="70" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="30" y1="110" x2="380" y2="110" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="30" y1="150" x2="380" y2="150" stroke="#f1f5f9" strokeWidth="1" />

                      <text x="5" y="34" className="text-[9px] font-semibold fill-slate-400">2,000</text>
                      <text x="5" y="74" className="text-[9px] font-semibold fill-slate-400">1,500</text>
                      <text x="5" y="114" className="text-[9px] font-semibold fill-slate-400">1,000</text>
                      <text x="12" y="154" className="text-[9px] font-semibold fill-slate-400">0</text>

                      <path d="M40 130 L 80 115 L 120 100 L 160 90 L 200 75 L 240 68 L 280 60 L 320 48 L 370 38" stroke="#f97316" strokeWidth="3" strokeLinecap="round" fill="none"/>
                      <circle cx="370" cy="38" r="4" fill="#f97316" />

                      <path d="M40 145 L 80 135 L 120 120 L 160 110 L 200 98 L 240 88 L 280 78 L 320 70 L 370 58" stroke="#5551ff" strokeWidth="3" strokeLinecap="round" fill="none"/>
                      <circle cx="370" cy="58" r="4" fill="#5551ff" />

                      <text x="35" y="172" className="text-[9px] font-bold fill-slate-400">Jan</text>
                      <text x="75" y="172" className="text-[9px] font-bold fill-slate-400">Feb</text>
                      <text x="115" y="172" className="text-[9px] font-bold fill-slate-400">Mar</text>
                      <text x="155" y="172" className="text-[9px] font-bold fill-slate-400">Apr</text>
                      <text x="195" y="172" className="text-[9px] font-bold fill-slate-400">May</text>
                      <text x="235" y="172" className="text-[9px] font-bold fill-slate-400">Jun</text>
                      <text x="275" y="172" className="text-[9px] font-bold fill-slate-400">Jul</text>
                      <text x="315" y="172" className="text-[9px] font-bold fill-slate-400">Aug</text>
                      <text x="355" y="172" className="text-[9px] font-bold fill-slate-400">Sep</text>
                    </svg>
                  </div>
                </div>

                {/* Player Segments (3.5 Cols) */}
                <div className="lg:col-span-3 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
                  <h3 className="text-base font-black text-slate-900">Player Segments</h3>

                  <div className="flex items-center justify-between py-4">
                    <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path stroke="#f1f5f9" strokeWidth="4.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path stroke="#5551ff" strokeWidth="4.5" strokeDasharray="42, 100" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path stroke="#818cf8" strokeWidth="4.5" strokeDasharray="28, 100" strokeDashoffset="-42" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path stroke="#f97316" strokeWidth="4.5" strokeDasharray="18, 100" strokeDashoffset="-70" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path stroke="#38bdf8" strokeWidth="4.5" strokeDasharray="8, 100" strokeDashoffset="-88" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path stroke="#34d399" strokeWidth="4.5" strokeDasharray="4, 100" strokeDashoffset="-96" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      </svg>
                      <div className="absolute text-center">
                        <div className="text-base font-black text-slate-900 leading-none">8,245</div>
                        <div className="text-[10px] text-slate-400 font-bold mt-0.5">Players</div>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs font-bold pl-2">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#5551ff]"></span>
                        <span className="text-slate-600 text-[11px]">Corporate</span>
                        <span className="text-slate-900 ml-auto font-black text-[11px]">42%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#818cf8]"></span>
                        <span className="text-slate-600 text-[11px]">Academic</span>
                        <span className="text-slate-900 ml-auto font-black text-[11px]">28%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                        <span className="text-slate-600 text-[11px]">Non-Profit</span>
                        <span className="text-slate-900 ml-auto font-black text-[11px]">18%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                        <span className="text-slate-600 text-[11px]">Government</span>
                        <span className="text-slate-900 ml-auto font-black text-[11px]">8%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                        <span className="text-slate-600 text-[11px]">Others</span>
                        <span className="text-slate-900 ml-auto font-black text-[11px]">4%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inclusion Score by Segment Bar Chart (3.5 Cols) */}
                <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-black text-slate-900">Inclusion Score by Segment</h3>
                    <select className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-[11px] font-bold text-slate-700">
                      <option>Inclusion Score</option>
                    </select>
                  </div>

                  <div className="h-44 flex items-end justify-between px-2 pt-4 border-b border-slate-100">
                    <div className="flex flex-col items-center space-y-2 group">
                      <span className="text-xs font-black text-slate-900">78</span>
                      <div className="w-8 bg-[#5551ff] rounded-t-xl h-28"></div>
                      <span className="text-[9px] font-bold text-slate-500">Corporate</span>
                    </div>

                    <div className="flex flex-col items-center space-y-2 group">
                      <span className="text-xs font-black text-slate-900">62</span>
                      <div className="w-8 bg-sky-400 rounded-t-xl h-20"></div>
                      <span className="text-[9px] font-bold text-slate-500">Academic</span>
                    </div>

                    <div className="flex flex-col items-center space-y-2 group">
                      <span className="text-xs font-black text-slate-900">54</span>
                      <div className="w-8 bg-orange-400 rounded-t-xl h-16"></div>
                      <span className="text-[9px] font-bold text-slate-500">Non-Profit</span>
                    </div>

                    <div className="flex flex-col items-center space-y-2 group">
                      <span className="text-xs font-black text-slate-900">68</span>
                      <div className="w-8 bg-blue-500 rounded-t-xl h-24"></div>
                      <span className="text-[9px] font-bold text-slate-500">Government</span>
                    </div>

                    <div className="flex flex-col items-center space-y-2 group">
                      <span className="text-xs font-black text-slate-900">71</span>
                      <div className="w-8 bg-emerald-400 rounded-t-xl h-25"></div>
                      <span className="text-[9px] font-bold text-slate-500">Others</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom 3 Cards Row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Card A: Top Performing Investment Cards (4 Cols) */}
                <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-black text-slate-900">Top Performing Investment Cards</h3>
                    <button className="text-xs font-bold text-[#5551ff] hover:underline flex items-center space-x-1">
                      <span>View All</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    
                    {/* Item 1 */}
                    <div className="flex items-center justify-between p-2 rounded-2xl border border-slate-100 hover:bg-slate-50">
                      <div className="flex items-center space-x-2.5">
                        <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 font-black text-[10px] flex items-center justify-center shrink-0">1</span>
                        <img src={displayCards[0].thumbnail} alt="Card 1" className="w-9 h-9 rounded-xl object-cover shrink-0" />
                        <div>
                          <div className="text-xs font-black text-slate-900 leading-tight">{displayCards[0].title}</div>
                          <div className="text-[10px] font-bold text-purple-600">{displayCards[0].category}</div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs font-black text-slate-900">85%</div>
                        <div className="text-[10px] font-black text-emerald-600">↑ 12%</div>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-center justify-between p-2 rounded-2xl border border-slate-100 hover:bg-slate-50">
                      <div className="flex items-center space-x-2.5">
                        <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 font-black text-[10px] flex items-center justify-center shrink-0">2</span>
                        <img src={displayCards[1].thumbnail} alt="Card 2" className="w-9 h-9 rounded-xl object-cover shrink-0" />
                        <div>
                          <div className="text-xs font-black text-slate-900 leading-tight">{displayCards[1].title}</div>
                          <div className="text-[10px] font-bold text-emerald-600">{displayCards[1].category}</div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs font-black text-slate-900">78%</div>
                        <div className="text-[10px] font-black text-emerald-600">↑ 9%</div>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex items-center justify-between p-2 rounded-2xl border border-slate-100 hover:bg-slate-50">
                      <div className="flex items-center space-x-2.5">
                        <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 font-black text-[10px] flex items-center justify-center shrink-0">3</span>
                        <img src={displayCards[2].thumbnail} alt="Card 3" className="w-9 h-9 rounded-xl object-cover shrink-0" />
                        <div>
                          <div className="text-xs font-black text-slate-900 leading-tight">{displayCards[2].title}</div>
                          <div className="text-[10px] font-bold text-orange-600">{displayCards[2].category}</div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs font-black text-slate-900">72%</div>
                        <div className="text-[10px] font-black text-emerald-600">↑ 14%</div>
                      </div>
                    </div>

                    {/* Item 4 */}
                    <div className="flex items-center justify-between p-2 rounded-2xl border border-slate-100 hover:bg-slate-50">
                      <div className="flex items-center space-x-2.5">
                        <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 font-black text-[10px] flex items-center justify-center shrink-0">4</span>
                        <img src={displayCards[3].thumbnail} alt="Card 4" className="w-9 h-9 rounded-xl object-cover shrink-0" />
                        <div>
                          <div className="text-xs font-black text-slate-900 leading-tight">{displayCards[3].title}</div>
                          <div className="text-[10px] font-bold text-rose-600">{displayCards[3].category}</div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs font-black text-slate-900">68%</div>
                        <div className="text-[10px] font-black text-emerald-600">↑ 7%</div>
                      </div>
                    </div>

                    {/* Item 5 */}
                    <div className="flex items-center justify-between p-2 rounded-2xl border border-slate-100 hover:bg-slate-50">
                      <div className="flex items-center space-x-2.5">
                        <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 font-black text-[10px] flex items-center justify-center shrink-0">5</span>
                        <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=100&q=80" alt="Card 5" className="w-9 h-9 rounded-xl object-cover shrink-0" />
                        <div>
                          <div className="text-xs font-black text-slate-900 leading-tight">Diversity Hiring Strategy</div>
                          <div className="text-[10px] font-bold text-blue-600">Recruitment</div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs font-black text-slate-900">65%</div>
                        <div className="text-[10px] font-black text-emerald-600">↑ 6%</div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Card B: User Engagement Heatmap (4.5 Cols) */}
                <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-black text-slate-900">User Engagement Heatmap</h3>
                    <select className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-[11px] font-bold text-slate-700">
                      <option>Selection Frequency</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    {heatmapCategories.map((cat, rowIdx) => (
                      <div key={rowIdx} className="flex items-center space-x-2">
                        <span className="w-28 text-[10px] font-bold text-slate-500 truncate text-right">{cat.name}</span>
                        <div className="flex-1 grid grid-cols-10 gap-1">
                          {cat.values.map((val, colIdx) => {
                            const bgOpacity = 
                              val >= 80 ? 'bg-[#5551ff]' :
                              val >= 60 ? 'bg-[#6366f1]/80' :
                              val >= 40 ? 'bg-[#818cf8]/60' :
                              val >= 25 ? 'bg-[#c084fc]/40' : 'bg-[#f3e8ff]/60';

                            return (
                              <div key={colIdx} className={`h-6 rounded-md ${bgOpacity}`} title={`${cat.name} ${val}%`} />
                            );
                          })}
                        </div>
                      </div>
                    ))}

                    <div className="flex items-center space-x-2 pt-2">
                      <div className="w-28"></div>
                      <div className="flex-1 grid grid-cols-10 gap-1 text-center text-[9px] font-bold text-slate-400">
                        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 pt-3 px-2">
                      <span>Low</span>
                      <div className="h-2 flex-1 mx-4 rounded-full bg-gradient-to-r from-[#f3e8ff] via-[#818cf8] to-[#5551ff]"></div>
                      <span>High</span>
                    </div>
                  </div>
                </div>

                {/* Card C: Learning Outcome Insights & Recent Activities (3.5 Cols) */}
                <div className="lg:col-span-3 space-y-6">
                  
                  {/* Learning Outcome Insights */}
                  <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black text-slate-900">Learning Outcome Insights</h3>
                      <button className="text-[11px] font-bold text-[#5551ff] hover:underline flex items-center space-x-0.5">
                        <span>View All</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                        <div className="flex items-center justify-between">
                          <BookOpen className="w-4 h-4 text-emerald-600" />
                          <span className="text-[10px] font-black text-emerald-600">↑ 10%</span>
                        </div>
                        <div className="text-lg font-black text-slate-900 mt-2">75%</div>
                        <div className="text-[10px] font-bold text-slate-500">Content Completion</div>
                      </div>

                      <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-100">
                        <div className="flex items-center justify-between">
                          <HelpCircle className="w-4 h-4 text-[#5551ff]" />
                          <span className="text-[10px] font-black text-emerald-600">↑ 5%</span>
                        </div>
                        <div className="text-lg font-black text-slate-900 mt-2">89%</div>
                        <div className="text-[10px] font-bold text-slate-500">Quiz Pass Rate</div>
                      </div>

                      <div className="p-3 rounded-2xl bg-orange-50/70 border border-orange-100">
                        <div className="flex items-center justify-between">
                          <TrendingUp className="w-4 h-4 text-orange-600" />
                          <span className="text-[10px] font-black text-emerald-600">↑ 8%</span>
                        </div>
                        <div className="text-lg font-black text-slate-900 mt-2">68%</div>
                        <div className="text-[10px] font-bold text-slate-500">Knowledge Retention</div>
                      </div>

                      <div className="p-3 rounded-2xl bg-sky-50/70 border border-sky-100">
                        <div className="flex items-center justify-between">
                          <Target className="w-4 h-4 text-sky-600" />
                          <span className="text-[10px] font-black text-emerald-600">↑ 11%</span>
                        </div>
                        <div className="text-lg font-black text-slate-900 mt-2">72%</div>
                        <div className="text-[10px] font-bold text-slate-500">Real-world Application</div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activities */}
                  <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black text-slate-900">Recent Activities</h3>
                      <button className="text-[11px] font-bold text-[#5551ff] hover:underline flex items-center space-x-0.5">
                        <span>View All</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Building2 className="w-3.5 h-3.5 text-orange-500" />
                          <span className="font-bold text-slate-900 truncate">New org registered</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium shrink-0">2 min ago</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Layers className="w-3.5 h-3.5 text-[#5551ff]" />
                          <span className="font-bold text-slate-900 truncate">Investment card updated</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium shrink-0">15 min ago</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Gamepad2 className="w-3.5 h-3.5 text-blue-500" />
                          <span className="font-bold text-slate-900 truncate">New player joined</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium shrink-0">32 min ago</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                          <span className="font-bold text-slate-900 truncate">Quiz question added</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium shrink-0">1 hour ago</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* DASHBOARD TAB VIEW (SUPER ADMIN VS PARTNER ADMIN) */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'dashboard' && adminRole === 'partneradmin' && (
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
                    onClick={() => setActiveTab('game-sessions')}
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
                    onClick={() => setActiveTab('participant-codes')}
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
                
                {/* Left 2/3 Column: Recent Sessions Table */}
                <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5 text-[#5551ff]" />
                        <h3 className="text-base font-black text-slate-900">Recent Sessions</h3>
                      </div>
                      <button onClick={() => setActiveTab('game-sessions')} className="text-xs font-extrabold text-[#5551ff] hover:underline cursor-pointer">
                        View All
                      </button>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto mt-2">
                      <table className="w-full text-left text-xs font-medium">
                        <thead>
                          <tr className="text-[10px] font-black uppercase text-slate-400 tracking-wider border-b border-slate-100">
                            <th className="py-3 font-extrabold">SESSION NAME</th>
                            <th className="py-3 font-extrabold">DATE</th>
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
                      <button onClick={() => setActiveTab('game-sessions')} className="text-xs font-extrabold text-[#5551ff] hover:underline cursor-pointer">
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

          {activeTab === 'dashboard' && adminRole === 'superadmin' && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Greeting Header */}
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
                  <span>Good Morning, Super Admin</span>
                  <span className="text-xl">👋</span>
                </h1>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Here's an overview of the Inclusive Tycoon platform.
                </p>
              </div>

          {/* 1. Top 4 Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Investment Cards */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-purple-100 text-[#5551ff] flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <div className="flex items-center space-x-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-xs font-black">
                  <span>↑ 2</span>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-black text-slate-900 tracking-tight">12</div>
                  <div className="text-xs font-bold text-slate-400 mt-0.5">Investment Cards</div>
                </div>
                {/* Purple Sparkline SVG */}
                <svg className="w-16 h-8 text-[#5551ff]" viewBox="0 0 60 30" fill="none">
                  <path d="M5 25 L20 18 L35 22 L55 5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Card 2: Total Players */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div className="flex items-center space-x-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-xs font-black">
                  <span>↑ 12%</span>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-black text-slate-900 tracking-tight">8,245</div>
                  <div className="text-xs font-bold text-slate-400 mt-0.5">Total Players</div>
                </div>
                {/* Green Sparkline SVG */}
                <svg className="w-16 h-8 text-emerald-500" viewBox="0 0 60 30" fill="none">
                  <path d="M5 22 L20 20 L35 12 L55 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Card 3: Avg. Inclusion Score */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div className="flex items-center space-x-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-xs font-black">
                  <span>↑ 6%</span>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-black text-slate-900 tracking-tight">76%</div>
                  <div className="text-xs font-bold text-slate-400 mt-0.5">Avg. Inclusion Score</div>
                </div>
                {/* Orange Sparkline SVG */}
                <svg className="w-16 h-8 text-orange-500" viewBox="0 0 60 30" fill="none">
                  <path d="M5 25 L20 22 L35 15 L55 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Card 4: Completed Simulations */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="flex items-center space-x-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-xs font-black">
                  <span>↑ 9%</span>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-black text-slate-900 tracking-tight">62%</div>
                  <div className="text-xs font-bold text-slate-400 mt-0.5">Completed Simulations</div>
                </div>
                {/* Blue Sparkline SVG */}
                <svg className="w-16 h-8 text-blue-500" viewBox="0 0 60 30" fill="none">
                  <path d="M5 24 L20 18 L35 12 L55 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

          </div>

          {/* 2. Platform Analytics Hero Banner */}
          <div className="relative rounded-[2rem] p-8 border border-purple-100/90 bg-gradient-to-r from-purple-100/80 via-indigo-50/70 to-blue-50/60 shadow-xs overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Banner Left Info */}
            <div className="max-w-xl space-y-3 z-10">
              <div className="inline-block">
                <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-rose-100 text-rose-700 border border-rose-200">
                  CII CWL SUPER ADMIN
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                Platform Analytics & Content Engine
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Manage investment cards, analyze user decisions, and track learning outcomes across the Inclusive Tycoon simulation.
              </p>
            </div>

            {/* Banner Center Photo */}
            <div className="relative w-full lg:w-72 h-40 rounded-2xl overflow-hidden shadow-md shrink-0 border border-white">
              <img src="/auth-bg.png" alt="Platform Engine" className="w-full h-full object-cover" />
            </div>

            {/* Banner Right Key Points List */}
            <div className="space-y-3 shrink-0 z-10">
              <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/80 text-xs font-black text-slate-800 shadow-xs">
                <BarChart3 className="w-4 h-4 text-pink-500" />
                <span>Data-Driven Insights</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/80 text-xs font-black text-slate-800 shadow-xs">
                <Users className="w-4 h-4 text-blue-600" />
                <span>Track Inclusion Outcomes</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/80 text-xs font-black text-slate-800 shadow-xs">
                <BookOpen className="w-4 h-4 text-orange-500" />
                <span>Manage Learning Content</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/80 text-xs font-black text-slate-800 shadow-xs">
                <Target className="w-4 h-4 text-rose-500" />
                <span>Drive Meaningful Change</span>
              </div>
            </div>

          </div>


          {/* 3. Middle Charts Row (Session Activity, Game Funnel, Org Leaderboard) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Chart A: Session Activity Timeline (5 Cols) */}
            <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-slate-900">Session Activity</h3>
                <div className="flex items-center space-x-3 text-xs font-bold">
                  <div className="flex items-center space-x-1.5 text-slate-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#5551ff]"></span>
                    <span>Sessions</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-slate-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span>Completions</span>
                  </div>
                </div>
              </div>

              {/* Area Chart SVG */}
              <div className="h-52 w-full pt-2">
                <svg className="w-full h-full" viewBox="0 0 400 180" fill="none">
                  <line x1="30" y1="30" x2="380" y2="30" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="30" y1="70" x2="380" y2="70" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="30" y1="110" x2="380" y2="110" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="30" y1="150" x2="380" y2="150" stroke="#f1f5f9" strokeWidth="1" />

                  <text x="5" y="34" className="text-[9px] font-semibold fill-slate-400">500</text>
                  <text x="5" y="74" className="text-[9px] font-semibold fill-slate-400">375</text>
                  <text x="5" y="114" className="text-[9px] font-semibold fill-slate-400">250</text>
                  <text x="12" y="154" className="text-[9px] font-semibold fill-slate-400">0</text>

                  {/* Sessions Purple Area */}
                  <path d="M40 120 L80 100 L120 110 L160 85 L200 70 L240 55 L280 65 L320 45 L370 35 L370 150 L40 150 Z" fill="#5551ff" opacity="0.08" />
                  <path d="M40 120 L80 100 L120 110 L160 85 L200 70 L240 55 L280 65 L320 45 L370 35" stroke="#5551ff" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                  <circle cx="370" cy="35" r="4" fill="#5551ff" />

                  {/* Completions Green Area */}
                  <path d="M40 140 L80 130 L120 135 L160 118 L200 105 L240 95 L280 100 L320 80 L370 68 L370 150 L40 150 Z" fill="#10b981" opacity="0.08" />
                  <path d="M40 140 L80 130 L120 135 L160 118 L200 105 L240 95 L280 100 L320 80 L370 68" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                  <circle cx="370" cy="68" r="4" fill="#10b981" />

                  <text x="30" y="172" className="text-[9px] font-bold fill-slate-400">Mon</text>
                  <text x="75" y="172" className="text-[9px] font-bold fill-slate-400">Tue</text>
                  <text x="120" y="172" className="text-[9px] font-bold fill-slate-400">Wed</text>
                  <text x="165" y="172" className="text-[9px] font-bold fill-slate-400">Thu</text>
                  <text x="210" y="172" className="text-[9px] font-bold fill-slate-400">Fri</text>
                  <text x="255" y="172" className="text-[9px] font-bold fill-slate-400">Sat</text>
                  <text x="300" y="172" className="text-[9px] font-bold fill-slate-400">Sun</text>
                  <text x="345" y="172" className="text-[9px] font-bold fill-slate-400">Today</text>
                </svg>
              </div>
            </div>

            {/* Chart B: Game Completion Funnel (3 Cols) */}
            <div className="lg:col-span-3 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-4">
              <h3 className="text-base font-black text-slate-900">Game Funnel</h3>

              <div className="space-y-3 flex-1 flex flex-col justify-center">
                {/* Stage 1 */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">Registered</span>
                    <span className="font-black text-slate-900">8,245</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#5551ff] rounded-full" style={{width: '100%'}}></div>
                  </div>
                </div>

                {/* Stage 2 */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">Started Game</span>
                    <span className="font-black text-slate-900">5,890</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-400 rounded-full" style={{width: '71%'}}></div>
                  </div>
                </div>

                {/* Stage 3 */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">Completed 5+ Turns</span>
                    <span className="font-black text-slate-900">3,420</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-400 rounded-full" style={{width: '41%'}}></div>
                  </div>
                </div>

                {/* Stage 4 */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">Finished Simulation</span>
                    <span className="font-black text-slate-900">2,115</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{width: '26%'}}></div>
                  </div>
                </div>

                {/* Stage 5 */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">Post-Quiz Done</span>
                    <span className="font-black text-slate-900">1,640</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-400 rounded-full" style={{width: '20%'}}></div>
                  </div>
                </div>
              </div>

              <div className="text-[10px] font-bold text-slate-400 text-center">Overall Conversion: <span className="text-emerald-600 font-black">20%</span></div>
            </div>

            {/* Chart C: Organization Leaderboard (4 Cols) */}
            <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-slate-900">Organization Leaderboard</h3>
                <button className="text-xs font-bold text-[#5551ff] hover:underline flex items-center space-x-1">
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3 flex-1">
                {/* Org 1 */}
                <div className="flex items-center justify-between p-2.5 rounded-2xl border border-amber-100 bg-amber-50/40 hover:bg-amber-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-full bg-amber-400 text-white font-black text-[10px] flex items-center justify-center shrink-0">🥇</span>
                    <div>
                      <div className="text-xs font-black text-slate-900 leading-tight">Tata Consultancy Services</div>
                      <div className="text-[10px] font-bold text-slate-400">245 players</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-black text-slate-900">92%</div>
                    <div className="text-[10px] text-emerald-600 font-black">↑ 8%</div>
                  </div>
                </div>

                {/* Org 2 */}
                <div className="flex items-center justify-between p-2.5 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-full bg-slate-300 text-white font-black text-[10px] flex items-center justify-center shrink-0">🥈</span>
                    <div>
                      <div className="text-xs font-black text-slate-900 leading-tight">Infosys Limited</div>
                      <div className="text-[10px] font-bold text-slate-400">198 players</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-black text-slate-900">87%</div>
                    <div className="text-[10px] text-emerald-600 font-black">↑ 5%</div>
                  </div>
                </div>

                {/* Org 3 */}
                <div className="flex items-center justify-between p-2.5 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-full bg-orange-300 text-white font-black text-[10px] flex items-center justify-center shrink-0">🥉</span>
                    <div>
                      <div className="text-xs font-black text-slate-900 leading-tight">Wipro Technologies</div>
                      <div className="text-[10px] font-bold text-slate-400">176 players</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-black text-slate-900">81%</div>
                    <div className="text-[10px] text-emerald-600 font-black">↑ 3%</div>
                  </div>
                </div>

                {/* Org 4 */}
                <div className="flex items-center justify-between p-2.5 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 font-black text-[10px] flex items-center justify-center shrink-0">4</span>
                    <div>
                      <div className="text-xs font-black text-slate-900 leading-tight">HCL Technologies</div>
                      <div className="text-[10px] font-bold text-slate-400">152 players</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-black text-slate-900">79%</div>
                    <div className="text-[10px] text-emerald-600 font-black">↑ 2%</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* 4. Bottom Grid Row (Platform Health, Upcoming Milestones, Card Distribution) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Card A: Platform Health Status (4 Cols) */}
            <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-slate-900">Platform Health</h3>
                <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">All Systems Online</span>
              </div>

              <div className="space-y-3.5">
                {/* Status 1 */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs font-bold text-slate-700">API Server</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-emerald-600">99.98%</span>
                    <span className="text-[10px] text-slate-400 font-medium ml-1">uptime</span>
                  </div>
                </div>

                {/* Status 2 */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs font-bold text-slate-700">WebSocket Engine</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-emerald-600">99.95%</span>
                    <span className="text-[10px] text-slate-400 font-medium ml-1">uptime</span>
                  </div>
                </div>

                {/* Status 3 */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs font-bold text-slate-700">Database</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-emerald-600">99.99%</span>
                    <span className="text-[10px] text-slate-400 font-medium ml-1">uptime</span>
                  </div>
                </div>

                {/* Status 4 */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                    <span className="text-xs font-bold text-slate-700">AI Advisor Service</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-amber-600">98.5%</span>
                    <span className="text-[10px] text-slate-400 font-medium ml-1">uptime</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card B: Upcoming Milestones & Goals (4 Cols) */}
            <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-slate-900">Upcoming Milestones</h3>
                <button className="text-xs font-bold text-[#5551ff] hover:underline flex items-center space-x-1">
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Milestone 1 */}
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#5551ff] flex items-center justify-center shrink-0 mt-0.5">
                    <Target className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-black text-slate-900">10,000 Players Milestone</div>
                    <div className="text-[10px] font-medium text-slate-400 mt-0.5">1,755 players away</div>
                    <div className="w-full h-2 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                      <div className="h-full bg-[#5551ff] rounded-full" style={{width: '82%'}}></div>
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-[#5551ff] shrink-0">82%</span>
                </div>

                {/* Milestone 2 */}
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-black text-slate-900">80% Avg. Inclusion Score</div>
                    <div className="text-[10px] font-medium text-slate-400 mt-0.5">Currently at 76%</div>
                    <div className="w-full h-2 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                      <div className="h-full bg-orange-400 rounded-full" style={{width: '95%'}}></div>
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-orange-600 shrink-0">95%</span>
                </div>

                {/* Milestone 3 */}
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-black text-slate-900">50 Partner Organizations</div>
                    <div className="text-[10px] font-medium text-slate-400 mt-0.5">Currently at 38 orgs</div>
                    <div className="w-full h-2 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{width: '76%'}}></div>
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-emerald-600 shrink-0">76%</span>
                </div>

                {/* Milestone 4 */}
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-black text-slate-900">100 Learning Modules</div>
                    <div className="text-[10px] font-medium text-slate-400 mt-0.5">Currently at 62 modules</div>
                    <div className="w-full h-2 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{width: '62%'}}></div>
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-blue-600 shrink-0">62%</span>
                </div>
              </div>
            </div>

            {/* Card C: Investment Card Distribution (4 Cols) */}
            <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-slate-900">Card Distribution</h3>
                <button onClick={() => setActiveTab('analytics')} className="text-xs font-bold text-[#5551ff] hover:underline flex items-center space-x-1">
                  <span>Deep Dive</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Category Rows */}
              <div className="space-y-3.5">
                {/* Cat 1 */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                      <span className="font-bold text-slate-700">Compensation & Benefits</span>
                    </div>
                    <span className="font-black text-slate-900">4 cards</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{width: '33%'}}></div>
                  </div>
                </div>

                {/* Cat 2 */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      <span className="font-bold text-slate-700">Flexible Work</span>
                    </div>
                    <span className="font-black text-slate-900">3 cards</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{width: '25%'}}></div>
                  </div>
                </div>

                {/* Cat 3 */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                      <span className="font-bold text-slate-700">Leadership & Governance</span>
                    </div>
                    <span className="font-black text-slate-900">3 cards</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full" style={{width: '25%'}}></div>
                  </div>
                </div>

                {/* Cat 4 */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                      <span className="font-bold text-slate-700">Workplace Culture</span>
                    </div>
                    <span className="font-black text-slate-900">2 cards</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{width: '17%'}}></div>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-500">Total Investment Cards</span>
                <span className="text-lg font-black text-slate-900">12</span>
              </div>
            </div>

          </div>
            </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* INVESTMENT CARDS MANAGEMENT TAB VIEW (MATCHES REFERENCE IMAGE) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'investment-cards' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Header Title & Action Banner */}
            <div className="bg-gradient-to-r from-white via-indigo-50/40 to-purple-50/60 border border-slate-200/80 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
              <div className="relative z-10">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Investment Card Management</h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  Create, edit, and manage investment cards used in the simulation game.
                </p>
              </div>

              {/* Decorative Banner Illustration */}
              <div className="absolute right-36 top-1/2 -translate-y-1/2 opacity-15 pointer-events-none hidden lg:block">
                <div className="w-40 h-28 bg-[#5551ff] rounded-2xl rotate-6 blur-md"></div>
              </div>

              <div className="relative z-10 shrink-0">
                <button
                  onClick={() => setActiveTab('add-investment-card')}
                  className="bg-[#5551ff] hover:bg-[#4440ee] text-white font-extrabold px-5 py-3 rounded-2xl shadow-lg shadow-indigo-500/25 flex items-center space-x-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Plus className="w-4.5 h-4.5" />
                  <span className="text-xs tracking-wide">Add Investment Card</span>
                </button>
              </div>
            </div>

            {/* 4 Stat Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* Stat 1: Total Investment Cards */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100/80 text-[#5551ff] flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900 tracking-tight">12</div>
                    <div className="text-xs font-bold text-slate-400 mt-0.5">Total Investment Cards</div>
                  </div>
                </div>
                <span className="bg-emerald-50 text-emerald-600 font-bold px-2.5 py-1 rounded-full text-xs flex items-center space-x-0.5">
                  <span>↑ 2</span>
                </span>
              </div>

              {/* Stat 2: Categories */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100/80 text-blue-600 flex items-center justify-center shrink-0">
                    <Grid className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900 tracking-tight">4</div>
                    <div className="text-xs font-bold text-slate-400 mt-0.5">Categories</div>
                  </div>
                </div>
                <span className="bg-slate-100 text-slate-500 font-bold px-3 py-1 rounded-full text-xs">
                  -
                </span>
              </div>

              {/* Stat 3: Times Selected */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-100/80 text-[#5551ff] flex items-center justify-center shrink-0">
                    <Gamepad2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900 tracking-tight">8,245</div>
                    <div className="text-xs font-bold text-slate-400 mt-0.5">Times Selected</div>
                  </div>
                </div>
                <span className="bg-emerald-50 text-emerald-600 font-bold px-2.5 py-1 rounded-full text-xs">
                  ↑ 18%
                </span>
              </div>

              {/* Stat 4: Inclusion Impact (Avg.) */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 text-emerald-600 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900 tracking-tight">76%</div>
                    <div className="text-xs font-bold text-slate-400 mt-0.5">Inclusion Impact (Avg.)</div>
                  </div>
                </div>
                <span className="bg-emerald-50 text-emerald-600 font-bold px-2.5 py-1 rounded-full text-xs">
                  ↑ 6%
                </span>
              </div>

            </div>

            {/* Filter Controls Bar */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-wrap lg:flex-nowrap items-center justify-between gap-3">
              
              {/* Search Field */}
              <div className="relative flex-1 min-w-[220px]">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  value={cardSearchQuery}
                  onChange={(e) => setCardSearchQuery(e.target.value)}
                  placeholder="Search by title, description..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[#5551ff] focus:bg-white transition-all"
                />
              </div>

              {/* Dropdown Filters */}
              <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold text-slate-700">
                
                {/* Category Dropdown */}
                <div className="relative">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Category</label>
                  <select
                    value={selectedCategoryFilter}
                    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                  >
                    <option value="All Categories">All Categories</option>
                    <option value="Compensation">Compensation</option>
                    <option value="Flexible Work">Flexible Work</option>
                    <option value="Leadership">Leadership</option>
                    <option value="Workplace Culture">Workplace Culture</option>
                    <option value="Accessibility">Accessibility</option>
                    <option value="Recruitment">Recruitment</option>
                    <option value="Community Impact">Community Impact</option>
                    <option value="Supply Chain">Supply Chain</option>
                  </select>
                </div>

                {/* Industry Dropdown */}
                <div className="relative">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Industry</label>
                  <select
                    value={selectedIndustryFilter}
                    onChange={(e) => setSelectedIndustryFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                  >
                    <option value="All Industries">All Industries</option>
                    <option value="HR">HR</option>
                    <option value="Operations">Operations</option>
                    <option value="People">People</option>
                    <option value="Facilities">Facilities</option>
                    <option value="CSR">CSR</option>
                    <option value="Procurement">Procurement</option>
                  </select>
                </div>

                {/* Status Dropdown */}
                <div className="relative">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Status</label>
                  <select
                    value={selectedStatusFilter}
                    onChange={(e) => setSelectedStatusFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                  >
                    <option value="All Status">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>

                {/* Impact Level Dropdown */}
                <div className="relative">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Impact Level</label>
                  <select
                    value={selectedImpactFilter}
                    onChange={(e) => setSelectedImpactFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                  >
                    <option value="All Levels">All Levels</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 shrink-0 self-end">
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all"
                >
                  Reset
                </button>
                <button
                  className="px-4 py-2 bg-[#5551ff] hover:bg-[#4440ee] text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-xs transition-all"
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>Apply Filters</span>
                </button>
              </div>

            </div>

            {/* Main Content Grid: Left Table (2 cols) + Right Preview Card (1 col) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              {/* Left Column: Investment Cards Table */}
              <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
                
                {/* Section Title */}
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-900">
                    Investment Cards ({filteredCards.length})
                  </h3>
                </div>

                {/* Table Container */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    
                    {/* Header Row */}
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                        <th className="pb-3 px-2 w-8">
                          <input type="checkbox" className="rounded border-slate-300 text-[#5551ff] focus:ring-0 cursor-pointer" />
                        </th>
                        <th className="pb-3 px-2 w-8">#</th>
                        <th className="pb-3 px-3">TITLE</th>
                        <th className="pb-3 px-3">CATEGORY</th>
                        <th className="pb-3 px-3">INDUSTRY</th>
                        <th className="pb-3 px-3">COST</th>
                        <th className="pb-3 px-3">INCLUSION IMPACT</th>
                        <th className="pb-3 px-3">STATUS</th>
                        <th className="pb-3 px-3 text-right">ACTIONS</th>
                      </tr>
                    </thead>

                    {/* Table Body Rows */}
                    <tbody className="divide-y divide-slate-100">
                      {filteredCards.slice(0, 8).map((card, idx) => {
                        const isSelected = card.id === activeCard.id;
                        return (
                          <tr
                            key={card.id}
                            onClick={() => setSelectedCardId(card.id)}
                            className={`cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-indigo-50/50 border-l-4 border-[#5551ff]'
                                : 'hover:bg-slate-50/70'
                            }`}
                          >
                            {/* Checkbox */}
                            <td className="py-3.5 px-2">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => setSelectedCardId(card.id)}
                                className="rounded border-slate-300 text-[#5551ff] focus:ring-0 cursor-pointer"
                              />
                            </td>

                            {/* Index */}
                            <td className="py-3.5 px-2 font-bold text-slate-400 text-xs">
                              {idx + 1}
                            </td>

                            {/* Title & Thumbnail */}
                            <td className="py-3.5 px-3">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={card.thumbnail}
                                  alt={card.title}
                                  className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                                />
                                <div>
                                  <div className="font-extrabold text-slate-900 text-xs line-clamp-1">
                                    {card.title}
                                  </div>
                                  <div className="text-[10px] text-slate-400 font-medium line-clamp-1 max-w-[180px]">
                                    {card.description}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Category Pill */}
                            <td className="py-3.5 px-3">
                              <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold border ${card.categoryBadge}`}>
                                {card.category}
                              </span>
                            </td>

                            {/* Industry */}
                            <td className="py-3.5 px-3 font-bold text-slate-700">
                              {card.industry}
                            </td>

                            {/* Cost */}
                            <td className="py-3.5 px-3 font-black text-slate-900">
                              {card.cost}
                            </td>

                            {/* Inclusion Impact (Signal Bars) */}
                            <td className="py-3.5 px-3">
                              <div className="flex items-center space-x-2">
                                <div className="flex items-end space-x-0.5 h-3.5">
                                  <span className={`w-1 rounded-sm ${card.impact === 'High' ? 'h-2 bg-emerald-500' : 'h-2 bg-amber-500'}`}></span>
                                  <span className={`w-1 rounded-sm ${card.impact === 'High' ? 'h-3 bg-emerald-500' : 'h-3 bg-amber-500'}`}></span>
                                  <span className={`w-1 rounded-sm ${card.impact === 'High' ? 'h-3.5 bg-emerald-500' : 'h-1.5 bg-slate-300'}`}></span>
                                </div>
                                <span className={`font-bold text-xs ${card.impact === 'High' ? 'text-slate-800' : 'text-slate-800'}`}>
                                  {card.impact}
                                </span>
                              </div>
                            </td>

                            {/* Status */}
                            <td className="py-3.5 px-3">
                              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                                card.status === 'Active'
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : 'bg-amber-100 text-amber-700'
                              }`}>
                                {card.status}
                              </span>
                            </td>

                            {/* Actions */}
                            <td className="py-3.5 px-3 text-right">
                              <div className="flex items-center justify-end space-x-2" onClick={(e) => e.stopPropagation()}>
                                <button
                                  onClick={() => setSelectedCardId(card.id)}
                                  className="text-xs font-extrabold text-[#5551ff] hover:underline"
                                >
                                  Edit
                                </button>
                                <button className="p-1 hover:bg-slate-200 rounded-md text-slate-400 hover:text-slate-600 transition-colors">
                                  <MoreVertical className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer / Pagination Controls */}
                <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-slate-100 text-xs font-semibold text-slate-500 gap-3">
                  <div>
                    Showing 1-8 of {filteredCards.length} cards
                  </div>

                  <div className="flex items-center space-x-3">
                    {/* Pagination Numbers */}
                    <div className="flex items-center space-x-1.5">
                      <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-slate-700">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button className="w-7 h-7 rounded-lg bg-[#5551ff] text-white font-black flex items-center justify-center">
                        1
                      </button>
                      <button className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center">
                        2
                      </button>
                      <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-slate-700">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Per Page Select */}
                    <select className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-700">
                      <option>8 per page</option>
                      <option>12 per page</option>
                      <option>24 per page</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Right Column: Card Preview Panel */}
              <div className="lg:col-span-1 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-5 sticky top-6">
                
                {/* Panel Header */}
                <h3 className="text-base font-black text-slate-900">Card Preview</h3>

                {/* Card Header Image with Floating Pill */}
                <div className="relative rounded-2xl overflow-hidden h-44 border border-slate-200 shadow-sm group">
                  <img
                    src={activeCard.thumbnail}
                    alt={activeCard.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
                  <span className={`absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-black shadow-sm ${activeCard.categoryBadge}`}>
                    {activeCard.category}
                  </span>
                </div>

                {/* Card Title & Description */}
                <div>
                  <h4 className="text-lg font-black text-slate-900 tracking-tight">
                    {activeCard.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                    {activeCard.description}
                  </p>
                </div>

                {/* 3 Metric Pills Grid */}
                <div className="grid grid-cols-3 gap-2.5">
                  
                  {/* Box 1: Cost */}
                  <div className="bg-orange-50/70 border border-orange-100 rounded-2xl p-3 text-center space-y-0.5">
                    <div className="w-6 h-6 rounded-lg bg-orange-100 text-orange-600 mx-auto flex items-center justify-center">
                      <Trophy className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-xs font-black text-slate-900">{activeCard.cost}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Cost</div>
                  </div>

                  {/* Box 2: Impact */}
                  <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-3 text-center space-y-0.5">
                    <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                      <Activity className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-xs font-black text-slate-900">{activeCard.impact}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Impact</div>
                  </div>

                  {/* Box 3: Inclusion Score */}
                  <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-3 text-center space-y-0.5">
                    <div className="w-6 h-6 rounded-lg bg-purple-100 text-[#5551ff] mx-auto flex items-center justify-center">
                      <Target className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-xs font-black text-slate-900">{activeCard.inclusionScore}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Inclusion Score</div>
                  </div>

                </div>

                {/* Sub-tabs Navigation */}
                <div className="border-b border-slate-100 flex items-center space-x-4 text-xs font-bold text-slate-400 pt-1">
                  <button
                    onClick={() => setPreviewTab('details')}
                    className={`pb-2 border-b-2 transition-all ${
                      previewTab === 'details'
                        ? 'border-[#5551ff] text-[#5551ff] font-extrabold'
                        : 'border-transparent hover:text-slate-600'
                    }`}
                  >
                    Details
                  </button>
                  <button
                    onClick={() => setPreviewTab('learning')}
                    className={`pb-2 border-b-2 transition-all ${
                      previewTab === 'learning'
                        ? 'border-[#5551ff] text-[#5551ff] font-extrabold'
                        : 'border-transparent hover:text-slate-600'
                    }`}
                  >
                    Learning Links
                  </button>
                  <button
                    onClick={() => setPreviewTab('quiz')}
                    className={`pb-2 border-b-2 transition-all ${
                      previewTab === 'quiz'
                        ? 'border-[#5551ff] text-[#5551ff] font-extrabold'
                        : 'border-transparent hover:text-slate-600'
                    }`}
                  >
                    Quiz Links
                  </button>
                  <button
                    onClick={() => setPreviewTab('case')}
                    className={`pb-2 border-b-2 transition-all ${
                      previewTab === 'case'
                        ? 'border-[#5551ff] text-[#5551ff] font-extrabold'
                        : 'border-transparent hover:text-slate-600'
                    }`}
                  >
                    Case Studies
                  </button>
                </div>

                {/* Sub-tab Content: Details Grid */}
                {previewTab === 'details' && (
                  <div className="space-y-3 text-xs font-medium text-slate-600">
                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 pt-1">
                      <div>
                        <span className="text-[11px] text-slate-400 font-bold block mb-1">Category</span>
                        <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-bold ${activeCard.categoryBadge}`}>
                          {activeCard.category}
                        </span>
                      </div>

                      <div>
                        <span className="text-[11px] text-slate-400 font-bold block mb-1">Industry</span>
                        <span className="font-extrabold text-slate-800">{activeCard.industry}</span>
                      </div>

                      <div>
                        <span className="text-[11px] text-slate-400 font-bold block mb-1">Game Impact</span>
                        <span className="font-extrabold text-slate-800">{activeCard.impact}</span>
                      </div>

                      <div>
                        <span className="text-[11px] text-slate-400 font-bold block mb-1">Status</span>
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          activeCard.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {activeCard.status}
                        </span>
                      </div>

                      <div>
                        <span className="text-[11px] text-slate-400 font-bold block mb-1">Created On</span>
                        <span className="font-bold text-slate-700">{activeCard.createdOn}</span>
                      </div>

                      <div>
                        <span className="text-[11px] text-slate-400 font-bold block mb-1">Last Updated</span>
                        <span className="font-bold text-slate-700">{activeCard.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                )}

                {previewTab !== 'details' && (
                  <div className="py-6 text-center text-xs font-bold text-slate-400 space-y-2 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <BookOpen className="w-5 h-5 mx-auto text-slate-400" />
                    <p>Associated {previewTab} available in simulation engine.</p>
                  </div>
                )}

                {/* Bottom Action Buttons */}
                <div className="flex items-center space-x-3 pt-2">
                  <button
                    className="flex-1 py-3 px-4 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-extrabold text-xs flex items-center justify-center space-x-2 transition-all shadow-xs"
                  >
                    <Copy className="w-4 h-4 text-slate-500" />
                    <span>Duplicate</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('add-investment-card')}
                    className="flex-1 py-3 px-4 rounded-2xl bg-[#5551ff] hover:bg-[#4440ee] text-white font-extrabold text-xs flex items-center justify-center space-x-2 transition-all shadow-md shadow-indigo-500/20"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit Card</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* ADD NEW INVESTMENT CARD FORM TAB VIEW (MATCHES REFERENCE IMAGE) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'add-investment-card' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Breadcrumb & Header Title with Action Buttons */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Left Breadcrumb & Titles */}
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-400">
                  <button onClick={() => setActiveTab('dashboard')} className="hover:text-slate-600 transition-colors">
                    <Home className="w-3.5 h-3.5" />
                  </button>
                  <span>/</span>
                  <button onClick={() => setActiveTab('investment-cards')} className="hover:text-[#5551ff] transition-colors">
                    Investment Cards
                  </button>
                  <span>/</span>
                  <span className="text-slate-900 font-black px-2 py-0.5 rounded-md bg-slate-200/60">
                    Add New Investment Card
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Add New Investment Card
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Create a new investment card to be used in the Inclusive Tycoon simulation game.
                </p>
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center space-x-3 shrink-0 self-start md:self-auto">
                <button
                  onClick={() => setActiveTab('investment-cards')}
                  className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-extrabold text-xs rounded-2xl flex items-center space-x-2 shadow-xs transition-all"
                >
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span>Save as Draft</span>
                </button>
                <button
                  onClick={() => setActiveTab('investment-cards')}
                  className="px-5 py-2.5 bg-[#5551ff] hover:bg-[#4440ee] text-white font-extrabold text-xs rounded-2xl flex items-center space-x-2 shadow-lg shadow-indigo-500/25 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Publish Card</span>
                </button>
              </div>

            </div>

            {/* Steps Navigation Bar */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-2 shadow-xs overflow-x-auto flex items-center space-x-2 text-xs font-bold text-slate-500">
              <button
                onClick={() => setFormStep('basic')}
                className={`px-4 py-2.5 rounded-xl flex items-center space-x-2 whitespace-nowrap transition-all ${
                  formStep === 'basic'
                    ? 'bg-indigo-50 text-[#5551ff] font-extrabold shadow-xs'
                    : 'hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Basic Information</span>
              </button>

              <button
                onClick={() => setFormStep('game')}
                className={`px-4 py-2.5 rounded-xl flex items-center space-x-2 whitespace-nowrap transition-all ${
                  formStep === 'game'
                    ? 'bg-indigo-50 text-[#5551ff] font-extrabold shadow-xs'
                    : 'hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <Gamepad2 className="w-4 h-4" />
                <span>Game Details</span>
              </button>

              <button
                onClick={() => setFormStep('learning')}
                className={`px-4 py-2.5 rounded-xl flex items-center space-x-2 whitespace-nowrap transition-all ${
                  formStep === 'learning'
                    ? 'bg-indigo-50 text-[#5551ff] font-extrabold shadow-xs'
                    : 'hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Learning Content</span>
              </button>

              <button
                onClick={() => setFormStep('quiz')}
                className={`px-4 py-2.5 rounded-xl flex items-center space-x-2 whitespace-nowrap transition-all ${
                  formStep === 'quiz'
                    ? 'bg-indigo-50 text-[#5551ff] font-extrabold shadow-xs'
                    : 'hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>Quiz & Assessment</span>
              </button>

              <button
                onClick={() => setFormStep('case')}
                className={`px-4 py-2.5 rounded-xl flex items-center space-x-2 whitespace-nowrap transition-all ${
                  formStep === 'case'
                    ? 'bg-indigo-50 text-[#5551ff] font-extrabold shadow-xs'
                    : 'hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Case Studies</span>
              </button>

              <button
                onClick={() => setFormStep('settings')}
                className={`px-4 py-2.5 rounded-xl flex items-center space-x-2 whitespace-nowrap transition-all ${
                  formStep === 'settings'
                    ? 'bg-indigo-50 text-[#5551ff] font-extrabold shadow-xs'
                    : 'hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>

            {/* 2 Column Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              {/* Left Column: Form Sections (2 cols) */}
              <div className="lg:col-span-2 space-y-8 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs">
                
                {/* 1. Basic Information Section */}
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-base font-black text-slate-900">1. Basic Information</h3>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">Enter the core details of the investment card.</p>
                  </div>

                  {/* Row 1: Title, Category, Industry */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-slate-700">
                    
                    {/* Card Title */}
                    <div>
                      <label className="block text-slate-800 font-extrabold mb-1.5">
                        Card Title <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={newCardTitle}
                          onChange={(e) => setNewCardTitle(e.target.value)}
                          placeholder="Enter a clear and concise title"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#5551ff] focus:bg-white transition-all"
                        />
                        <span className="text-[10px] text-slate-400 font-bold absolute right-2.5 -bottom-4">
                          {newCardTitle.length}/100
                        </span>
                      </div>
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-slate-800 font-extrabold mb-1.5">
                        Category <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={newCardCategory}
                        onChange={(e) => setNewCardCategory(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                      >
                        <option value="Select category">Select category</option>
                        <option value="Leadership">Leadership</option>
                        <option value="Compensation">Compensation</option>
                        <option value="Flexible Work">Flexible Work</option>
                        <option value="Workplace Culture">Workplace Culture</option>
                        <option value="Accessibility">Accessibility</option>
                        <option value="Recruitment">Recruitment</option>
                      </select>
                    </div>

                    {/* Industry */}
                    <div>
                      <label className="block text-slate-800 font-extrabold mb-1.5">
                        Industry <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={newCardIndustry}
                        onChange={(e) => setNewCardIndustry(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                      >
                        <option value="Select industry">Select industry</option>
                        <option value="HR">HR</option>
                        <option value="Operations">Operations</option>
                        <option value="People">People</option>
                        <option value="Facilities">Facilities</option>
                        <option value="CSR">CSR</option>
                        <option value="Procurement">Procurement</option>
                      </select>
                    </div>

                  </div>

                  {/* Row 2: Short Description & Detailed Description */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-700 pt-2">
                    
                    {/* Short Description */}
                    <div>
                      <label className="block text-slate-800 font-extrabold mb-1.5">
                        Short Description <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <textarea
                          rows={4}
                          value={newCardShortDesc}
                          onChange={(e) => setNewCardShortDesc(e.target.value)}
                          placeholder="Brief description shown in the game (2–3 lines)"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs font-medium text-slate-900 focus:outline-none focus:border-[#5551ff] focus:bg-white transition-all resize-none"
                        />
                        <span className="text-[10px] text-slate-400 font-bold absolute right-2.5 -bottom-4">
                          {newCardShortDesc.length}/200
                        </span>
                      </div>
                    </div>

                    {/* Detailed Description */}
                    <div>
                      <label className="block text-slate-800 font-extrabold mb-1.5">
                        Detailed Description
                      </label>
                      <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                        {/* Rich Text Toolbar Header */}
                        <div className="bg-white border-b border-slate-200 px-3 py-1.5 flex items-center space-x-3 text-slate-500">
                          <button type="button" className="font-black text-xs hover:text-slate-900">B</button>
                          <button type="button" className="italic text-xs font-bold hover:text-slate-900">I</button>
                          <button type="button" className="underline text-xs font-bold hover:text-slate-900">U</button>
                          <span className="h-3 w-px bg-slate-200"></span>
                          <button type="button" className="hover:text-slate-900"><List className="w-3.5 h-3.5" /></button>
                          <button type="button" className="hover:text-slate-900"><ListOrdered className="w-3.5 h-3.5" /></button>
                          <button type="button" className="hover:text-slate-900"><LinkIcon className="w-3.5 h-3.5" /></button>
                        </div>
                        <div className="relative">
                          <textarea
                            rows={3}
                            value={newCardDetailedDesc}
                            onChange={(e) => setNewCardDetailedDesc(e.target.value)}
                            placeholder="Provide a detailed description of this investment opportunity..."
                            className="w-full bg-transparent p-3 text-xs font-medium text-slate-900 focus:outline-none resize-none"
                          />
                          <span className="text-[10px] text-slate-400 font-bold absolute right-2.5 bottom-1">
                            {newCardDetailedDesc.length}/1000
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Row 3: Card Image Upload & Tags */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-700 pt-2">
                    
                    {/* Card Image Dropzone */}
                    <div>
                      <label className="block text-slate-800 font-extrabold mb-1.5">
                        Card Image <span className="text-rose-500">*</span>
                      </label>
                      <div className="border-2 border-dashed border-indigo-200 bg-indigo-50/30 rounded-2xl p-4 text-center flex flex-col items-center justify-center space-y-2 hover:bg-indigo-50/60 transition-all cursor-pointer">
                        <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-[#5551ff] flex items-center justify-center">
                          <Upload className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-extrabold text-slate-800">Upload card image</p>
                          <p className="text-[10px] text-slate-400 font-medium">PNG, JPG (Max 2MB)</p>
                        </div>
                        <button
                          type="button"
                          className="px-3.5 py-1.5 bg-[#5551ff] text-white rounded-xl text-xs font-bold shadow-xs hover:bg-[#4440ee] transition-all"
                        >
                          Upload Image
                        </button>
                      </div>
                    </div>

                    {/* Tags / Keywords */}
                    <div>
                      <label className="block text-slate-800 font-extrabold mb-1.5">
                        Tags / Keywords
                      </label>
                      <div className="space-y-2.5">
                        <input
                          type="text"
                          value={newCardTagInput}
                          onChange={(e) => setNewCardTagInput(e.target.value)}
                          onKeyDown={handleAddTag}
                          placeholder="Add tag and press Enter..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#5551ff] focus:bg-white transition-all"
                        />

                        {/* Tag Pills List */}
                        <div className="flex flex-wrap gap-1.5">
                          {newCardTags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-indigo-50 text-[#5551ff] border border-indigo-100 text-[11px] font-extrabold"
                            >
                              <span>{tag}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveTag(tag)}
                                className="hover:text-rose-500"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

                {/* 2. Investment Details Section */}
                <div className="space-y-4 pt-2">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-base font-black text-slate-900">2. Investment Details</h3>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">Define how the financial and operational aspects of this investment behave.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-semibold text-slate-700">
                    
                    {/* Investment Cost */}
                    <div>
                      <label className="block text-slate-800 font-extrabold mb-1.5">
                        Investment Cost <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-2.5 text-slate-400 font-black text-xs">₹</span>
                        <input
                          type="text"
                          value={newCardCost}
                          onChange={(e) => setNewCardCost(e.target.value)}
                          placeholder="Enter amount"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3.5 py-2.5 text-xs font-black text-slate-900 focus:outline-none focus:border-[#5551ff] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    {/* Expected ROI / Benefit */}
                    <div>
                      <label className="block text-slate-800 font-extrabold mb-1.5">
                        Expected ROI / Benefit
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-2.5 text-slate-400 font-black text-xs">₹</span>
                        <input
                          type="text"
                          value={newCardROI}
                          onChange={(e) => setNewCardROI(e.target.value)}
                          placeholder="Enter expected benefit"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3.5 py-2.5 text-xs font-black text-slate-900 focus:outline-none focus:border-[#5551ff] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    {/* Implementation Timeline */}
                    <div>
                      <label className="block text-slate-800 font-extrabold mb-1.5">
                        Implementation Timeline
                      </label>
                      <select
                        value={newCardTimeline}
                        onChange={(e) => setNewCardTimeline(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                      >
                        <option value="Select timeline">Select timeline</option>
                        <option value="1 Month">1 Month</option>
                        <option value="3 Months">3 Months</option>
                        <option value="6 Months">6 Months</option>
                        <option value="12 Months">12 Months</option>
                      </select>
                    </div>

                    {/* Impact Level */}
                    <div>
                      <label className="block text-slate-800 font-extrabold mb-1.5">
                        Impact Level <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={newCardImpactLevel}
                        onChange={(e) => setNewCardImpactLevel(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                      >
                        <option value="Select impact level">Select impact level</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>

                  </div>
                </div>

                {/* 3. Inclusion Impact Section */}
                <div className="space-y-4 pt-2">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-base font-black text-slate-900">3. Inclusion Impact</h3>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">Define how this investment contributes to inclusion goals.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-slate-700">
                    
                    {/* Inclusion Score */}
                    <div>
                      <label className="block text-slate-800 font-extrabold mb-1.5">
                        Inclusion Score (1-100) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={newCardInclusionScore}
                        onChange={(e) => setNewCardInclusionScore(e.target.value)}
                        placeholder="Enter score (e.g., 85)"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-black text-slate-900 focus:outline-none focus:border-[#5551ff] focus:bg-white transition-all"
                      />
                    </div>

                    {/* Primary Inclusion Area */}
                    <div>
                      <label className="block text-slate-800 font-extrabold mb-1.5">
                        Primary Inclusion Area <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={newCardInclusionArea}
                        onChange={(e) => setNewCardInclusionArea(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                      >
                        <option value="Select inclusion area">Select inclusion area</option>
                        <option value="Leadership & Governance">Leadership & Governance</option>
                        <option value="Compensation & Equal Pay">Compensation & Equal Pay</option>
                        <option value="Workplace Diversity">Workplace Diversity</option>
                        <option value="Accessibility & Tech">Accessibility & Tech</option>
                      </select>
                    </div>

                    {/* Target Beneficiaries */}
                    <div>
                      <label className="block text-slate-800 font-extrabold mb-1.5">
                        Target Beneficiaries
                      </label>
                      <select
                        value={newCardBeneficiaries}
                        onChange={(e) => setNewCardBeneficiaries(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                      >
                        <option value="Select beneficiaries">Select beneficiaries</option>
                        <option value="Female Managers">Female Managers</option>
                        <option value="All Employees">All Employees</option>
                        <option value="Underrepresented Groups">Underrepresented Groups</option>
                        <option value="Senior Leadership">Senior Leadership</option>
                      </select>
                    </div>

                  </div>
                </div>

              </div>

              {/* Right Column: Live Card Preview Panel (1 col) */}
              <div className="lg:col-span-1 space-y-5 sticky top-6">
                
                {/* Header Title with View Mode Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    <h3 className="text-base font-black text-slate-900">Card Preview</h3>
                  </div>

                  <div className="bg-slate-100 p-1 rounded-xl flex items-center space-x-1 text-[11px] font-bold">
                    <button
                      onClick={() => setPreviewMode('game')}
                      className={`px-3 py-1 rounded-lg transition-all ${
                        previewMode === 'game'
                          ? 'bg-[#5551ff] text-white shadow-xs'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      Game View
                    </button>
                    <button
                      onClick={() => setPreviewMode('admin')}
                      className={`px-3 py-1 rounded-lg transition-all ${
                        previewMode === 'admin'
                          ? 'bg-[#5551ff] text-white shadow-xs'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      Admin View
                    </button>
                  </div>
                </div>

                {/* Preview Container */}
                <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs space-y-4">
                  
                  {/* Hero Cover Image */}
                  <div className="relative rounded-2xl overflow-hidden h-48 border border-slate-200 shadow-sm">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
                      alt={newCardTitle}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
                    <span className="absolute top-3 left-3 bg-[#eeedff] text-[#5551ff] font-black text-xs px-3 py-1 rounded-full shadow-xs border border-indigo-200">
                      {newCardCategory || 'Leadership'}
                    </span>
                  </div>

                  {/* Title & Impact Badge Header */}
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-lg font-black text-slate-900 tracking-tight leading-snug">
                        {newCardTitle || 'Women Leadership Development'}
                      </h4>
                      <span className="bg-emerald-50 text-emerald-700 font-extrabold text-[10px] px-2.5 py-1 rounded-full border border-emerald-200 flex items-center space-x-1 shrink-0">
                        <Activity className="w-3 h-3 text-emerald-600" />
                        <span>{newCardImpactLevel || 'High'} Impact</span>
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 font-medium mt-1.5 leading-relaxed">
                      {newCardShortDesc || 'Leadership programs for high-potential women to build management skills and create future leaders.'}
                    </p>
                  </div>

                  {/* 3 Metric Pills Grid */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    
                    {/* Cost */}
                    <div className="bg-orange-50/70 border border-orange-100 rounded-2xl p-2.5">
                      <div className="w-5 h-5 rounded-md bg-orange-100 text-orange-600 mx-auto flex items-center justify-center mb-1">
                        <Wallet className="w-3 h-3" />
                      </div>
                      <div className="text-xs font-black text-slate-900">
                        ₹{Number(newCardCost).toLocaleString() || '60,000'}
                      </div>
                      <div className="text-[9px] font-extrabold text-slate-400 uppercase">Investment Cost</div>
                    </div>

                    {/* Benefit */}
                    <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-2.5">
                      <div className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-1">
                        <Activity className="w-3 h-3" />
                      </div>
                      <div className="text-xs font-black text-slate-900">
                        ₹{Number(newCardROI).toLocaleString() || '1,20,000'}
                      </div>
                      <div className="text-[9px] font-extrabold text-slate-400 uppercase">Expected Benefit</div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-2.5">
                      <div className="w-5 h-5 rounded-md bg-blue-100 text-blue-600 mx-auto flex items-center justify-center mb-1">
                        <Clock className="w-3 h-3" />
                      </div>
                      <div className="text-xs font-black text-slate-900">
                        {newCardTimeline || '6 Months'}
                      </div>
                      <div className="text-[9px] font-extrabold text-slate-400 uppercase">Timeline</div>
                    </div>

                  </div>

                  {/* Inclusion Impact Detail Ring Box */}
                  <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center space-x-2 text-xs font-black text-[#5551ff]">
                      <Users className="w-4 h-4 text-[#5551ff]" />
                      <span>Inclusion Impact</span>
                    </div>

                    <div className="flex items-center space-x-4">
                      {/* Donut Score Ring */}
                      <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="text-indigo-200/60"
                            strokeWidth="4"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className="text-[#5551ff]"
                            strokeDasharray={`${newCardInclusionScore || 85}, 100`}
                            strokeWidth="4"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <span className="absolute text-base font-black text-slate-900">
                          {newCardInclusionScore || 85}
                        </span>
                      </div>

                      {/* Checklist Items */}
                      <div className="space-y-1.5 text-[11px] font-semibold text-slate-700">
                        <div className="flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#5551ff] shrink-0" />
                          <span>Increases women in leadership roles</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#5551ff] shrink-0" />
                          <span>Builds a diverse leadership pipeline</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#5551ff] shrink-0" />
                          <span>Creates long-term workplace equity</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Bottom Simulation Button */}
                  <button className="w-full py-3 rounded-2xl bg-[#5551ff] hover:bg-[#4440ee] text-white font-extrabold text-xs flex items-center justify-center space-x-2 shadow-md shadow-indigo-500/20 transition-all">
                    <Gamepad2 className="w-4 h-4" />
                    <span>View in Game Simulation</span>
                  </button>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* USER DECISION ANALYTICS TAB VIEW (MATCHES REFERENCE IMAGE) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'user-decisions' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Header Title Banner with Top Right Callout Card */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  User Decision Analytics
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  Track and analyze investment decisions made by players across all organizations.
                </p>
              </div>

              {/* Callout Insight Box */}
              <div className="bg-indigo-50/80 border border-indigo-100 p-3.5 rounded-2xl flex items-center space-x-3 text-xs font-bold text-slate-700 shadow-xs shrink-0 max-w-md">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-[#5551ff] flex items-center justify-center shrink-0">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <p className="text-[11px] text-slate-600 font-medium leading-tight">
                  Understand how players make decisions and what drives inclusion impact.
                </p>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-wrap lg:flex-nowrap items-center justify-between gap-3 text-xs font-semibold text-slate-700">
              
              <div className="flex flex-wrap items-center gap-3 flex-1">
                
                {/* Time Period */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Time Period</label>
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                    <select
                      value={decisionTimePeriod}
                      onChange={(e) => setDecisionTimePeriod(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                    >
                      <option value="Jan 2024 - Oct 2024">Jan 2024 - Oct 2024</option>
                      <option value="Last 30 Days">Last 30 Days</option>
                      <option value="Last 90 Days">Last 90 Days</option>
                    </select>
                  </div>
                </div>

                {/* Organization */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Organization</label>
                  <div className="relative">
                    <Building2 className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                    <select
                      value={decisionOrgFilter}
                      onChange={(e) => setDecisionOrgFilter(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                    >
                      <option value="All Organizations">All Organizations</option>
                      <option value="TCS">TCS</option>
                      <option value="Infosys">Infosys</option>
                      <option value="Wipro">Wipro</option>
                      <option value="HCL">HCL</option>
                      <option value="Accenture">Accenture</option>
                    </select>
                  </div>
                </div>

                {/* Player Segment */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Player Segment</label>
                  <div className="relative">
                    <Users className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                    <select
                      value={decisionSegmentFilter}
                      onChange={(e) => setDecisionSegmentFilter(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                    >
                      <option value="All Segments">All Segments</option>
                      <option value="Corporate Segment">Corporate Segment</option>
                      <option value="Tech Leads">Tech Leads</option>
                      <option value="HR Leads">HR Leads</option>
                    </select>
                  </div>
                </div>

                {/* Investment Card Category */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Investment Card Category</label>
                  <div className="relative">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                    <select
                      value={decisionCategoryFilter}
                      onChange={(e) => setDecisionCategoryFilter(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                    >
                      <option value="All Categories">All Categories</option>
                      <option value="Compensation">Compensation</option>
                      <option value="Flexible Work">Flexible Work</option>
                      <option value="Leadership">Leadership</option>
                      <option value="Workplace Culture">Workplace Culture</option>
                    </select>
                  </div>
                </div>

                {/* Game Mode */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Game Mode</label>
                  <div className="relative">
                    <Gamepad2 className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                    <select
                      value={decisionGameModeFilter}
                      onChange={(e) => setDecisionGameModeFilter(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                    >
                      <option value="All Modes">All Modes</option>
                      <option value="Single Player">Single Player</option>
                      <option value="Team Challenge">Team Challenge</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Apply Filters Button */}
              <button className="px-5 py-2.5 bg-[#5551ff] hover:bg-[#4440ee] text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-xs transition-all shrink-0 self-end">
                <Filter className="w-3.5 h-3.5" />
                <span>Apply Filters</span>
              </button>

            </div>

            {/* 5 Stat Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              
              {/* Stat 1: Total Decisions */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#5551ff] flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 font-bold px-2 py-0.5 rounded-full text-xs">
                    ↑ 18%
                  </span>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 tracking-tight">8,245</div>
                  <div className="text-[11px] font-bold text-slate-400 mt-0.5">Total Decisions</div>
                </div>
                {/* Mini Sparkline with Smooth Fill */}
                <div className="h-7 w-full overflow-hidden">
                  <svg className="w-full h-full text-[#5551ff]" viewBox="0 0 100 30" fill="none">
                    <defs>
                      <linearGradient id="ud-grad-1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#5551ff" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#5551ff" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,24 Q25,18 50,15 T80,9 T100,4 L100,30 L0,30 Z" fill="url(#ud-grad-1)" />
                    <path d="M0,24 Q25,18 50,15 T80,9 T100,4" stroke="#5551ff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              </div>

              {/* Stat 2: Unique Cards Chosen */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#5551ff] flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 font-bold px-2 py-0.5 rounded-full text-xs">
                    ↑ 12%
                  </span>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 tracking-tight">546</div>
                  <div className="text-[11px] font-bold text-slate-400 mt-0.5">Unique Cards Chosen</div>
                </div>
                <div className="h-7 w-full overflow-hidden">
                  <svg className="w-full h-full text-emerald-500" viewBox="0 0 100 30" fill="none">
                    <defs>
                      <linearGradient id="ud-grad-2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,26 Q25,20 50,14 T80,10 T100,5 L100,30 L0,30 Z" fill="url(#ud-grad-2)" />
                    <path d="M0,26 Q25,20 50,14 T80,10 T100,5" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              </div>

              {/* Stat 3: Avg. Decision Success */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5" />
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 font-bold px-2 py-0.5 rounded-full text-xs">
                    ↑ 6%
                  </span>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 tracking-tight">76%</div>
                  <div className="text-[11px] font-bold text-slate-400 mt-0.5">Avg. Decision Success</div>
                </div>
                <div className="h-7 w-full overflow-hidden">
                  <svg className="w-full h-full text-orange-500" viewBox="0 0 100 30" fill="none">
                    <defs>
                      <linearGradient id="ud-grad-3" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f97316" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,24 Q30,21 60,13 T100,6 L100,30 L0,30 Z" fill="url(#ud-grad-3)" />
                    <path d="M0,24 Q30,21 60,13 T100,6" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              </div>

              {/* Stat 4: Active Players */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 font-bold px-2 py-0.5 rounded-full text-xs">
                    ↑ 18%
                  </span>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 tracking-tight">3,120</div>
                  <div className="text-[11px] font-bold text-slate-400 mt-0.5">Active Players</div>
                </div>
                <div className="h-7 w-full overflow-hidden">
                  <svg className="w-full h-full text-emerald-500" viewBox="0 0 100 30" fill="none">
                    <defs>
                      <linearGradient id="ud-grad-4" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,25 Q20,15 50,17 T100,5 L100,30 L0,30 Z" fill="url(#ud-grad-4)" />
                    <path d="M0,25 Q20,15 50,17 T100,5" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              </div>

              {/* Stat 5: Inclusion Positive Decisions */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 font-bold px-2 py-0.5 rounded-full text-xs">
                    ↑ 9%
                  </span>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 tracking-tight">68%</div>
                  <div className="text-[11px] font-bold text-slate-400 mt-0.5">Inclusion Positive Decisions</div>
                </div>
                <div className="h-7 w-full overflow-hidden">
                  <svg className="w-full h-full text-amber-500" viewBox="0 0 100 30" fill="none">
                    <defs>
                      <linearGradient id="ud-grad-5" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,25 Q30,17 60,19 T100,7 L100,30 L0,30 Z" fill="url(#ud-grad-5)" />
                    <path d="M0,25 Q30,17 60,19 T100,7" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              </div>

            </div>

            {/* 3 Analytics Charts Grid (4 cols each) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              
              {/* Chart 1: Decision Trend Line Chart (4 cols) */}
              <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between space-y-4">
                
                {/* Header with Legend */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-sm font-black text-slate-900">Decision Trend</h3>
                  <div className="flex items-center space-x-3 text-[10px] font-bold">
                    <span className="flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-[#5551ff]"></span>
                      <span className="text-slate-600">Total</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                      <span className="text-slate-600">Successful</span>
                    </span>
                  </div>
                </div>

                {/* SVG Line Chart */}
                <div className="relative h-48 w-full pt-4">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between text-[9px] text-slate-300 font-medium">
                    <div className="border-b border-slate-100 flex items-center justify-between"><span className="-mt-3 text-slate-400">2,000</span></div>
                    <div className="border-b border-slate-100 flex items-center justify-between"><span className="-mt-3 text-slate-400">1,500</span></div>
                    <div className="border-b border-slate-100 flex items-center justify-between"><span className="-mt-3 text-slate-400">1,000</span></div>
                    <div className="border-b border-slate-100 flex items-center justify-between"><span className="-mt-3 text-slate-400">500</span></div>
                    <div className="border-b border-slate-200 flex items-center justify-between"><span className="-mt-3 text-slate-400">0</span></div>
                  </div>

                  {/* SVG Curves */}
                  <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 500 180" preserveAspectRatio="none">
                    <path
                      d="M20,140 Q75,120 130,105 T240,80 T350,50 T480,25"
                      fill="none"
                      stroke="#5551ff"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <path
                      d="M20,160 Q75,145 130,130 T240,105 T350,80 T480,50"
                      fill="none"
                      stroke="#fb923c"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <circle cx="20" cy="140" r="4" fill="#5551ff" />
                    <circle cx="130" cy="105" r="4" fill="#5551ff" />
                    <circle cx="240" cy="80" r="4" fill="#5551ff" />
                    <circle cx="350" cy="50" r="4" fill="#5551ff" />
                    <circle cx="480" cy="25" r="4" fill="#5551ff" />

                    <circle cx="20" cy="160" r="4" fill="#fb923c" />
                    <circle cx="130" cy="130" r="4" fill="#fb923c" />
                    <circle cx="240" cy="105" r="4" fill="#fb923c" />
                    <circle cx="350" cy="80" r="4" fill="#fb923c" />
                    <circle cx="480" cy="50" r="4" fill="#fb923c" />
                  </svg>
                </div>

                {/* X-Axis Months */}
                <div className="flex justify-between text-[9px] font-bold text-slate-400 pt-2 border-t border-slate-100">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                  <span>Sep</span>
                  <span>Oct</span>
                </div>

              </div>

              {/* Chart 2: Decisions by Investment Category Donut Chart (4 cols) */}
              <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between space-y-3">
                
                <h3 className="text-sm font-black text-slate-900">Decisions by Category</h3>

                <div className="flex flex-col xl:flex-row items-center justify-between gap-4 py-1">
                  {/* Donut Chart Ring */}
                  <div className="relative w-32 h-32 shrink-0 flex items-center justify-center mx-auto xl:mx-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path strokeWidth="4.5" stroke="#38bdf8" fill="none" strokeDasharray="22, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path strokeWidth="4.5" stroke="#5551ff" fill="none" strokeDasharray="18, 100" strokeDashoffset="-22" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path strokeWidth="4.5" stroke="#fb923c" fill="none" strokeDasharray="20, 100" strokeDashoffset="-40" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path strokeWidth="4.5" stroke="#f43f5e" fill="none" strokeDasharray="15, 100" strokeDashoffset="-60" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path strokeWidth="4.5" stroke="#0ea5e9" fill="none" strokeDasharray="13, 100" strokeDashoffset="-75" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path strokeWidth="4.5" stroke="#10b981" fill="none" strokeDasharray="12, 100" strokeDashoffset="-88" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <div className="absolute text-center">
                      <div className="text-sm font-black text-slate-900 leading-tight">8,245</div>
                      <div className="text-[9px] font-bold text-slate-400 uppercase">Decisions</div>
                    </div>
                  </div>

                  {/* Legend List */}
                  <div className="space-y-1 text-[11px] font-semibold text-slate-700 w-full flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-1.5 truncate">
                        <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0"></span>
                        <span className="truncate">Compensation</span>
                      </span>
                      <span className="font-black text-slate-900 ml-1">22%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-1.5 truncate">
                        <span className="w-2 h-2 rounded-full bg-[#5551ff] shrink-0"></span>
                        <span className="truncate">Flexible Work</span>
                      </span>
                      <span className="font-black text-slate-900 ml-1">18%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-1.5 truncate">
                        <span className="w-2 h-2 rounded-full bg-orange-400 shrink-0"></span>
                        <span className="truncate">Leadership</span>
                      </span>
                      <span className="font-black text-slate-900 ml-1">20%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-1.5 truncate">
                        <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
                        <span className="truncate">Workplace Culture</span>
                      </span>
                      <span className="font-black text-slate-900 ml-1">15%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-1.5 truncate">
                        <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0"></span>
                        <span className="truncate">Recruitment</span>
                      </span>
                      <span className="font-black text-slate-900 ml-1">13%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-1.5 truncate">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                        <span className="truncate">Others</span>
                      </span>
                      <span className="font-black text-slate-900 ml-1">12%</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Chart 3: Inclusion Impact of Decisions Bar Chart (4 cols) */}
              <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between space-y-4">
                
                <h3 className="text-sm font-black text-slate-900">Inclusion Impact of Decisions</h3>

                <div className="h-44 flex items-end justify-around px-2 pt-4 border-b border-slate-100">
                  
                  {/* High Impact */}
                  <div className="flex flex-col items-center space-y-2 group">
                    <span className="text-xs font-black text-slate-900">42%</span>
                    <div className="w-8 sm:w-10 bg-[#5551ff] rounded-t-xl h-32 transition-transform group-hover:scale-105"></div>
                    <span className="text-[10px] font-bold text-slate-500">High Impact</span>
                  </div>

                  {/* Medium Impact */}
                  <div className="flex flex-col items-center space-y-2 group">
                    <span className="text-xs font-black text-slate-900">36%</span>
                    <div className="w-8 sm:w-10 bg-sky-400 rounded-t-xl h-28 transition-transform group-hover:scale-105"></div>
                    <span className="text-[10px] font-bold text-slate-500">Medium Impact</span>
                  </div>

                  {/* Low Impact */}
                  <div className="flex flex-col items-center space-y-2 group">
                    <span className="text-xs font-black text-slate-900">18%</span>
                    <div className="w-8 sm:w-10 bg-orange-400 rounded-t-xl h-14 transition-transform group-hover:scale-105"></div>
                    <span className="text-[10px] font-bold text-slate-500">Low Impact</span>
                  </div>

                  {/* No Impact */}
                  <div className="flex flex-col items-center space-y-2 group">
                    <span className="text-xs font-black text-slate-900">4%</span>
                    <div className="w-8 sm:w-10 bg-slate-300 rounded-t-xl h-4 transition-transform group-hover:scale-105"></div>
                    <span className="text-[10px] font-bold text-slate-500">No Impact</span>
                  </div>

                </div>

              </div>

            </div>

            {/* Main Section: User Decisions Table + Player Detail Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              {/* Left Column: User Decisions Table (2 cols) */}
              <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
                
                {/* Table Header Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h3 className="text-base font-black text-slate-900">
                    User Decisions ({userDecisionsData.length > 0 ? '8,245' : '0'})
                  </h3>

                  <div className="flex items-center space-x-3">
                    {/* Export Button */}
                    <button className="px-3.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-xs transition-all">
                      <Download className="w-3.5 h-3.5 text-slate-500" />
                      <span>Export</span>
                    </button>

                    {/* Search Field */}
                    <div className="relative w-60">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        value={decisionSearchQuery}
                        onChange={(e) => setDecisionSearchQuery(e.target.value)}
                        placeholder="Search users, cards, organizations..."
                        className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[#5551ff] focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Decisions Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                        <th className="pb-3 px-2 w-8">#</th>
                        <th className="pb-3 px-3">USER NAME</th>
                        <th className="pb-3 px-3">ORGANIZATION</th>
                        <th className="pb-3 px-3">INVESTMENT CARD</th>
                        <th className="pb-3 px-3">CATEGORY</th>
                        <th className="pb-3 px-3">DECISION</th>
                        <th className="pb-3 px-3">INCLUSION IMPACT</th>
                        <th className="pb-3 px-3">DATE & TIME</th>
                        <th className="pb-3 px-3 text-right">ACTIONS</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {userDecisionsData.map((row, idx) => {
                        const isSelected = row.id === activeUserDecision.id;
                        return (
                          <tr
                            key={row.id}
                            onClick={() => setSelectedUserDecisionId(row.id)}
                            className={`cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-indigo-50/50 border-l-4 border-[#5551ff]'
                                : 'hover:bg-slate-50/70'
                            }`}
                          >
                            <td className="py-3.5 px-2 font-bold text-slate-400 text-xs">
                              {idx + 1}
                            </td>

                            {/* User Avatar & Name */}
                            <td className="py-3.5 px-3">
                              <div className="flex items-center space-x-2.5">
                                <img
                                  src={row.userAvatar}
                                  alt={row.userName}
                                  className="w-7 h-7 rounded-full object-cover border border-slate-200 shrink-0"
                                />
                                <span className="font-extrabold text-slate-900 text-xs whitespace-nowrap">
                                  {row.userName}
                                </span>
                              </div>
                            </td>

                            {/* Organization */}
                            <td className="py-3.5 px-3 font-bold text-slate-700">
                              {row.organization}
                            </td>

                            {/* Investment Card Title */}
                            <td className="py-3.5 px-3 font-bold text-slate-900 max-w-[160px] truncate">
                              {row.card}
                            </td>

                            {/* Category Pill */}
                            <td className="py-3.5 px-3">
                              <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-extrabold border ${row.categoryBadge}`}>
                                {row.category}
                              </span>
                            </td>

                            {/* Decision Badge */}
                            <td className="py-3.5 px-3">
                              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${row.decisionBadge}`}>
                                {row.decision}
                              </span>
                            </td>

                            {/* Inclusion Impact Badge */}
                            <td className="py-3.5 px-3">
                              <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${row.impactBadge}`}>
                                {row.impact}
                              </span>
                            </td>

                            {/* Date & Time */}
                            <td className="py-3.5 px-3 text-slate-400 font-semibold text-[11px] whitespace-nowrap">
                              {row.dateTime}
                            </td>

                            {/* Action Button */}
                            <td className="py-3.5 px-3 text-right">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedUserDecisionId(row.id);
                                }}
                                className="px-3 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-[#5551ff] text-slate-600 rounded-lg text-xs font-extrabold transition-all"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer / Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-slate-100 text-xs font-semibold text-slate-500 gap-3">
                  <div>
                    Showing 1-8 of 8,245 decisions
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1.5">
                      <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-slate-700">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button className="w-7 h-7 rounded-lg bg-[#5551ff] text-white font-black flex items-center justify-center">
                        1
                      </button>
                      <button className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center">
                        2
                      </button>
                      <button className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center">
                        3
                      </button>
                      <span className="text-slate-400 font-bold">...</span>
                      <button className="px-2.5 h-7 rounded-lg hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs">
                        1,031
                      </button>
                      <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-slate-700">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <select className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-700">
                      <option>8 per page</option>
                      <option>16 per page</option>
                      <option>32 per page</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Right Column: User Decision Details Panel (1 col) */}
              <div className="lg:col-span-1 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-5 sticky top-6">
                
                {/* Panel Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-black text-slate-900">User Decision Details</h3>
                  <button className="text-xs font-extrabold text-[#5551ff] hover:underline flex items-center space-x-1">
                    <span>View Full Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Active User Card Header */}
                <div className="flex items-center space-x-3.5 bg-slate-50/70 border border-slate-200/60 rounded-2xl p-4">
                  <img
                    src={activeUserDecision.userAvatar}
                    alt={activeUserDecision.userName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs shrink-0"
                  />
                  <div>
                    <h4 className="text-sm font-black text-slate-900 leading-snug">
                      {activeUserDecision.userName}
                    </h4>
                    <div className="flex items-center space-x-2 mt-0.5">
                      <span className="text-xs font-bold text-slate-600">{activeUserDecision.organization}</span>
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                        {activeUserDecision.segment}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3 User Metric Pill Boxes */}
                <div className="grid grid-cols-3 gap-2.5 text-center">
                  
                  <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-2.5">
                    <div className="text-base font-black text-slate-900">{activeUserDecision.investmentsCount}</div>
                    <div className="text-[10px] font-bold text-slate-400">Investments</div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-2.5">
                    <div className="text-base font-black text-slate-900">{activeUserDecision.gamesCount}</div>
                    <div className="text-[10px] font-bold text-slate-400">Completed Games</div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-2.5">
                    <div className="text-base font-black text-emerald-600">{activeUserDecision.inclusionScore}</div>
                    <div className="text-[10px] font-bold text-slate-400">Inclusion Score</div>
                  </div>

                </div>

                {/* Sub-tabs Navigation */}
                <div className="border-b border-slate-100 flex items-center space-x-4 text-xs font-bold text-slate-400 pt-1">
                  <button
                    onClick={() => setUserDetailSubTab('decisions')}
                    className={`pb-2 border-b-2 transition-all ${
                      userDetailSubTab === 'decisions'
                        ? 'border-[#5551ff] text-[#5551ff] font-extrabold'
                        : 'border-transparent hover:text-slate-600'
                    }`}
                  >
                    Recent Decisions
                  </button>
                  <button
                    onClick={() => setUserDetailSubTab('progress')}
                    className={`pb-2 border-b-2 transition-all ${
                      userDetailSubTab === 'progress'
                        ? 'border-[#5551ff] text-[#5551ff] font-extrabold'
                        : 'border-transparent hover:text-slate-600'
                    }`}
                  >
                    Game Progress
                  </button>
                  <button
                    onClick={() => setUserDetailSubTab('outcomes')}
                    className={`pb-2 border-b-2 transition-all ${
                      userDetailSubTab === 'outcomes'
                        ? 'border-[#5551ff] text-[#5551ff] font-extrabold'
                        : 'border-transparent hover:text-slate-600'
                    }`}
                  >
                    Learning Outcomes
                  </button>
                </div>

                {/* Sub-tab Content: Recent Decisions Timeline List */}
                {userDetailSubTab === 'decisions' && (
                  <div className="space-y-3 text-xs font-medium relative">
                    
                    {/* Item 1 */}
                    <div className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <Users className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-extrabold text-slate-900 text-xs truncate">
                          Invested in Flexible Work Infrastructure
                        </div>
                        <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-bold mt-0.5">
                          <span className="text-emerald-600 font-extrabold">High Impact</span>
                          <span>•</span>
                          <span>12 Oct 2024, 10:30 AM</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 shrink-0 self-center" />
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer">
                      <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                        <XCircle className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-extrabold text-slate-900 text-xs truncate">
                          Skipped Pay Equity Audit Program
                        </div>
                        <div className="text-[10px] text-slate-400 font-bold mt-0.5">
                          12 Oct 2024, 09:15 AM
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 shrink-0 self-center" />
                    </div>

                    {/* Item 3 */}
                    <div className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <Users className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-extrabold text-slate-900 text-xs truncate">
                          Invested in Mentorship Program
                        </div>
                        <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-bold mt-0.5">
                          <span className="text-amber-600 font-extrabold">Medium Impact</span>
                          <span>•</span>
                          <span>10 Oct 2024, 04:22 PM</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 shrink-0 self-center" />
                    </div>

                    {/* Item 4 */}
                    <div className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <Users className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-extrabold text-slate-900 text-xs truncate">
                          Invested in Women Leadership Training
                        </div>
                        <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-bold mt-0.5">
                          <span className="text-emerald-600 font-extrabold">High Impact</span>
                          <span>•</span>
                          <span>09 Oct 2024, 11:10 AM</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 shrink-0 self-center" />
                    </div>

                  </div>
                )}

                {userDetailSubTab !== 'decisions' && (
                  <div className="py-6 text-center text-xs font-bold text-slate-400 space-y-2 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <Activity className="w-5 h-5 mx-auto text-slate-400" />
                    <p>Detailed {userDetailSubTab} available for {activeUserDecision.userName}.</p>
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* GAME SESSIONS MANAGEMENT TAB VIEW (MATCHES REFERENCE IMAGE) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'game-sessions' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Header Title & Action Banner */}
            <div className="bg-gradient-to-r from-white via-indigo-50/40 to-purple-50/60 border border-slate-200/80 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
              <div className="relative z-10 flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Game Sessions Management
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  Create, monitor, and manage simulation game sessions across organizations and user groups.
                </p>
              </div>

              {/* Right Side: Hero Image & Create Button Container */}
              <div className="relative z-10 flex items-center space-x-4 shrink-0">
                {/* Hero Team Photo Banner from Reference Image */}
                <div className="hidden lg:block w-72 h-24 rounded-2xl overflow-hidden border border-slate-200/60 shadow-xs relative">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
                    alt="Corporate Team"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/10 via-transparent to-transparent"></div>
                </div>

                <button
                  onClick={() => setShowAddCard(true)}
                  className="bg-[#5551ff] hover:bg-[#4440ee] text-white font-extrabold px-5 py-3 rounded-2xl shadow-lg shadow-indigo-500/25 flex items-center space-x-2 transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
                >
                  <Plus className="w-4.5 h-4.5" />
                  <span className="text-xs tracking-wide">Create New Session</span>
                </button>
              </div>
            </div>

            {/* 4 Stat Cards Row with SVG Sparklines */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* Stat 1: Total Sessions */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-purple-100/80 text-[#5551ff] flex items-center justify-center shrink-0">
                      <Gamepad2 className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900 tracking-tight">128</div>
                      <div className="text-xs font-bold text-slate-400">Total Sessions</div>
                    </div>
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 font-black px-2 py-0.5 rounded-full text-xs">
                    ↑ 18%
                  </span>
                </div>
                {/* SVG Sparkline */}
                <div className="h-6 w-full overflow-hidden pt-1">
                  <svg className="w-full h-full text-[#5551ff]" viewBox="0 0 100 25" fill="none">
                    <path d="M0,20 Q25,5 50,15 T100,5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              </div>

              {/* Stat 2: Total Participants */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-100/80 text-emerald-600 flex items-center justify-center shrink-0">
                      <Users className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900 tracking-tight">3,120</div>
                      <div className="text-xs font-bold text-slate-400">Total Participants</div>
                    </div>
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 font-black px-2 py-0.5 rounded-full text-xs">
                    ↑ 22%
                  </span>
                </div>
                {/* SVG Sparkline */}
                <div className="h-6 w-full overflow-hidden pt-1">
                  <svg className="w-full h-full text-emerald-500" viewBox="0 0 100 25" fill="none">
                    <path d="M0,22 Q30,12 60,18 T100,4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              </div>

              {/* Stat 3: Completion Rate */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-orange-100/80 text-orange-600 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900 tracking-tight">86%</div>
                      <div className="text-xs font-bold text-slate-400">Completion Rate</div>
                    </div>
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 font-black px-2 py-0.5 rounded-full text-xs">
                    ↑ 8%
                  </span>
                </div>
                {/* SVG Sparkline */}
                <div className="h-6 w-full overflow-hidden pt-1">
                  <svg className="w-full h-full text-orange-500" viewBox="0 0 100 25" fill="none">
                    <path d="M0,18 Q35,8 70,16 T100,6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              </div>

              {/* Stat 4: Avg. Session Duration */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-blue-100/80 text-blue-600 flex items-center justify-center shrink-0">
                      <Clock className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900 tracking-tight">4.2 hrs</div>
                      <div className="text-xs font-bold text-slate-400">Avg. Session Duration</div>
                    </div>
                  </div>
                  <span className="bg-rose-50 text-rose-600 font-black px-2 py-0.5 rounded-full text-xs">
                    ↓ 6%
                  </span>
                </div>
                {/* SVG Sparkline */}
                <div className="h-6 w-full overflow-hidden pt-1">
                  <svg className="w-full h-full text-sky-500" viewBox="0 0 100 25" fill="none">
                    <path d="M0,6 Q30,18 60,10 T100,22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              </div>

            </div>

            {/* Filter Controls Bar */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-wrap lg:flex-nowrap items-center justify-between gap-3 text-xs font-semibold text-slate-700">
              
              <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[240px]">
                
                {/* Search */}
                <div className="relative flex-1 min-w-[200px]">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Search</label>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3.5 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      value={sessionSearchQuery}
                      onChange={(e) => setSessionSearchQuery(e.target.value)}
                      placeholder="Search by session name, organization..."
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[#5551ff] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Organization */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Organization</label>
                  <select
                    value={sessionOrgFilter}
                    onChange={(e) => setSessionOrgFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                  >
                    <option value="All Organizations">All Organizations</option>
                    <option value="TCS">TCS</option>
                    <option value="Infosys">Infosys</option>
                    <option value="Accenture">Accenture</option>
                    <option value="Wipro">Wipro</option>
                    <option value="HCL">HCL</option>
                  </select>
                </div>

                {/* Session Status */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Session Status</label>
                  <select
                    value={sessionStatusFilter}
                    onChange={(e) => setSessionStatusFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                  >
                    <option value="All Status">All Status</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Scheduled">Scheduled</option>
                  </select>
                </div>

                {/* Game Mode */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Game Mode</label>
                  <select
                    value={sessionGameModeFilter}
                    onChange={(e) => setSessionGameModeFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                  >
                    <option value="All Modes">All Modes</option>
                    <option value="Standard">Standard</option>
                    <option value="Custom">Custom</option>
                  </select>
                </div>

                {/* Date Range */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Date Range</label>
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                    <select
                      value={sessionDateRange}
                      onChange={(e) => setSessionDateRange(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                    >
                      <option value="Jan 2024 - Oct 2024">Jan 2024 - Oct 2024</option>
                      <option value="Last 30 Days">Last 30 Days</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 shrink-0 self-end">
                <button
                  onClick={() => {
                    setSessionSearchQuery('');
                    setSessionOrgFilter('All Organizations');
                    setSessionStatusFilter('All Status');
                    setSessionGameModeFilter('All Modes');
                  }}
                  className="px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all"
                >
                  Reset
                </button>
                <button className="px-5 py-2 bg-[#5551ff] hover:bg-[#4440ee] text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-xs transition-all">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Apply Filters</span>
                </button>
              </div>

            </div>

            {/* Main Content Grid: Left Table (2 cols) + Right Details Panel (1 col) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              {/* Left Column: Game Sessions Table */}
              <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
                
                {/* Table Header Row */}
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-900">
                    Game Sessions (128)
                  </h3>
                  <button className="px-3.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-xs transition-all">
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Export</span>
                  </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                        <th className="pb-3 px-2 w-8">#</th>
                        <th className="pb-3 px-3">SESSION NAME</th>
                        <th className="pb-3 px-3">ORGANIZATION</th>
                        <th className="pb-3 px-3">GAME MODE</th>
                        <th className="pb-3 px-3">PARTICIPANTS</th>
                        <th className="pb-3 px-3">STATUS</th>
                        <th className="pb-3 px-3">START DATE</th>
                        <th className="pb-3 px-3">DURATION</th>
                        <th className="pb-3 px-3 text-right">ACTIONS</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {gameSessionsData.map((session, idx) => {
                        const isSelected = session.id === activeSession.id;
                        return (
                          <tr
                            key={session.id}
                            onClick={() => setSelectedSessionId(session.id)}
                            className={`cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-indigo-50/50 border-l-4 border-[#5551ff]'
                                : 'hover:bg-slate-50/70'
                            }`}
                          >
                            <td className="py-3.5 px-2 font-bold text-slate-400 text-xs">
                              {idx + 1}
                            </td>

                            {/* Session Name & Thumbnail */}
                            <td className="py-3.5 px-3">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={session.thumbnail}
                                  alt={session.name}
                                  className="w-9 h-9 rounded-xl object-cover border border-slate-200 shrink-0"
                                />
                                <span className="font-extrabold text-slate-900 text-xs line-clamp-1 max-w-[160px]">
                                  {session.name}
                                </span>
                              </div>
                            </td>

                            {/* Organization */}
                            <td className="py-3.5 px-3 font-bold text-slate-700">
                              {session.organization}
                            </td>

                            {/* Game Mode */}
                            <td className="py-3.5 px-3">
                              <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-extrabold border ${session.modeBadge}`}>
                                {session.mode}
                              </span>
                            </td>

                            {/* Participants Progress Bar */}
                            <td className="py-3.5 px-3">
                              <div className="space-y-1 w-24">
                                <div className="flex justify-between text-[11px] font-black text-slate-900">
                                  <span>{session.participants}</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-[#5551ff] rounded-full"
                                    style={{ width: `${session.progressPercent}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>

                            {/* Status */}
                            <td className="py-3.5 px-3">
                              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${session.statusBadge}`}>
                                {session.status}
                              </span>
                            </td>

                            {/* Start Date */}
                            <td className="py-3.5 px-3 text-slate-500 font-semibold text-[11px] whitespace-nowrap">
                              {session.startDate}
                            </td>

                            {/* Duration */}
                            <td className="py-3.5 px-3 font-bold text-slate-700 text-xs">
                              {session.duration}
                            </td>

                            {/* Actions */}
                            <td className="py-3.5 px-3 text-right">
                              <div className="flex items-center justify-end space-x-1.5" onClick={(e) => e.stopPropagation()}>
                                <button
                                  onClick={() => setSelectedSessionId(session.id)}
                                  className="px-3 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-[#5551ff] text-slate-600 rounded-lg text-xs font-extrabold transition-all"
                                >
                                  View
                                </button>
                                <button className="p-1 hover:bg-slate-200 rounded-md text-slate-400 hover:text-slate-600 transition-colors">
                                  <MoreVertical className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer / Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-slate-100 text-xs font-semibold text-slate-500 gap-3">
                  <div>Showing 1-8 of 128 sessions</div>

                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1.5">
                      <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-400">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button className="w-7 h-7 rounded-lg bg-[#5551ff] text-white font-black flex items-center justify-center">
                        1
                      </button>
                      <button className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center">
                        2
                      </button>
                      <button className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center">
                        3
                      </button>
                      <span className="text-slate-400 font-bold">...</span>
                      <button className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center">
                        16
                      </button>
                      <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-400">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <select className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-700">
                      <option>8 per page</option>
                      <option>16 per page</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Right Column: Session Details Panel */}
              <div className="lg:col-span-1 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-5 sticky top-6">
                
                {/* Header with Status Badge */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-black text-slate-900">Session Details</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${activeSession.statusBadge}`}>
                    {activeSession.status}
                  </span>
                </div>

                {/* Session Cover Image */}
                <div className="relative rounded-2xl overflow-hidden h-40 border border-slate-200 shadow-xs">
                  <img
                    src={activeSession.thumbnail}
                    alt={activeSession.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
                </div>

                {/* Session Title & Info */}
                <div>
                  <h4 className="text-base font-black text-slate-900 tracking-tight leading-snug">
                    {activeSession.name}
                  </h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs font-bold text-slate-600">{activeSession.organization}</span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${activeSession.modeBadge}`}>
                      {activeSession.mode} Mode
                    </span>
                  </div>
                </div>

                {/* 3 Metric Boxes */}
                <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
                  
                  <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-2.5 space-y-0.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500 mx-auto" />
                    <div className="font-extrabold text-slate-900 text-[11px] truncate">{activeSession.startDate.split(',')[0]}</div>
                    <div className="text-[9px] font-bold text-slate-400 uppercase">Start Time</div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-2.5 space-y-0.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500 mx-auto" />
                    <div className="font-extrabold text-slate-900 text-[11px]">{activeSession.duration}</div>
                    <div className="text-[9px] font-bold text-slate-400 uppercase">Duration</div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-2.5 space-y-0.5">
                    <Users className="w-3.5 h-3.5 text-slate-500 mx-auto" />
                    <div className="font-extrabold text-slate-900 text-[11px]">{activeSession.participants}</div>
                    <div className="text-[9px] font-bold text-slate-400 uppercase">Participants</div>
                  </div>

                </div>

                {/* Extra Metric Card: Completed Modules */}
                <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-3 flex items-center justify-between text-xs font-bold">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-lg bg-indigo-100 text-[#5551ff] flex items-center justify-center">
                      <Trophy className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-black text-slate-900 text-xs">3 / 5</div>
                      <div className="text-[10px] text-slate-400 font-bold">Completed Modules</div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-extrabold block mb-1">Description</label>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    {activeSession.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3 pt-1">
                  <button className="flex-1 py-2.5 px-3 rounded-2xl bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 font-extrabold text-xs transition-all shadow-xs">
                    End Session
                  </button>
                  <button className="flex-1 py-2.5 px-3 rounded-2xl bg-[#5551ff] hover:bg-[#4440ee] text-white font-extrabold text-xs transition-all shadow-md shadow-indigo-500/20">
                    View Live Session
                  </button>
                </div>

                {/* Sub-tabs */}
                <div className="border-b border-slate-100 flex items-center space-x-3 text-xs font-bold text-slate-400 pt-1 overflow-x-auto">
                  <button
                    onClick={() => setSessionDetailSubTab('participants')}
                    className={`pb-2 border-b-2 whitespace-nowrap transition-all ${
                      sessionDetailSubTab === 'participants'
                        ? 'border-[#5551ff] text-[#5551ff] font-extrabold'
                        : 'border-transparent hover:text-slate-600'
                    }`}
                  >
                    Participants (45)
                  </button>
                  <button
                    onClick={() => setSessionDetailSubTab('progress')}
                    className={`pb-2 border-b-2 whitespace-nowrap transition-all ${
                      sessionDetailSubTab === 'progress'
                        ? 'border-[#5551ff] text-[#5551ff] font-extrabold'
                        : 'border-transparent hover:text-slate-600'
                    }`}
                  >
                    Game Progress
                  </button>
                  <button
                    onClick={() => setSessionDetailSubTab('outcomes')}
                    className={`pb-2 border-b-2 whitespace-nowrap transition-all ${
                      sessionDetailSubTab === 'outcomes'
                        ? 'border-[#5551ff] text-[#5551ff] font-extrabold'
                        : 'border-transparent hover:text-slate-600'
                    }`}
                  >
                    Learning Outcomes
                  </button>
                  <button
                    onClick={() => setSessionDetailSubTab('analytics')}
                    className={`pb-2 border-b-2 whitespace-nowrap transition-all ${
                      sessionDetailSubTab === 'analytics'
                        ? 'border-[#5551ff] text-[#5551ff] font-extrabold'
                        : 'border-transparent hover:text-slate-600'
                    }`}
                  >
                    Session Analytics
                  </button>
                </div>

                {/* Participants Sub-tab Content Table */}
                {sessionDetailSubTab === 'participants' && (
                  <div className="space-y-3">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-[11px]">
                        <thead>
                          <tr className="border-b border-slate-100 text-[9px] font-black uppercase text-slate-400 tracking-wider">
                            <th className="pb-2 px-1">#</th>
                            <th className="pb-2 px-2">NAME</th>
                            <th className="pb-2 px-2">ORGANIZATION</th>
                            <th className="pb-2 px-2">PROGRESS</th>
                            <th className="pb-2 px-2 text-right">STATUS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {sessionParticipantsList.map((p, pIdx) => (
                            <tr key={p.id} className="hover:bg-slate-50">
                              <td className="py-2 px-1 font-bold text-slate-400">{pIdx + 1}</td>
                              <td className="py-2 px-2">
                                <div className="flex items-center space-x-2">
                                  <img src={p.avatar} alt={p.name} className="w-5 h-5 rounded-full object-cover shrink-0" />
                                  <span className="font-extrabold text-slate-900 truncate max-w-[90px]">{p.name}</span>
                                </div>
                              </td>
                              <td className="py-2 px-2 font-bold text-slate-600">{p.org}</td>
                              <td className="py-2 px-2">
                                <div className="flex items-center space-x-1.5">
                                  <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#5551ff] rounded-full" style={{ width: `${p.progress}%` }}></div>
                                  </div>
                                  <span className="font-extrabold text-slate-800 text-[10px]">{p.progress}%</span>
                                </div>
                              </td>
                              <td className="py-2 px-2 text-right">
                                <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${p.statusBadge}`}>
                                  {p.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Bottom Link */}
                    <div className="text-right pt-1">
                      <button className="text-xs font-extrabold text-[#5551ff] hover:underline flex items-center space-x-1 ml-auto">
                        <span>View All Participants</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {sessionDetailSubTab !== 'participants' && (
                  <div className="py-6 text-center text-xs font-bold text-slate-400 space-y-2 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <Activity className="w-5 h-5 mx-auto text-slate-400" />
                    <p>Detailed {sessionDetailSubTab} available in session telemetry.</p>
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* LEARNING CONTENT MANAGEMENT TAB VIEW (MATCHES REFERENCE IMAGE) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'learning-content' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Header Title & Action Banner */}
            <div className="bg-gradient-to-r from-white via-indigo-50/40 to-purple-50/60 border border-slate-200/80 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
              <div className="relative z-10 flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Learning Content Management
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  Create, edit, and organize learning modules to educate players on inclusion, leadership, and workplace equity.
                </p>
              </div>

              {/* Right Side: Hero Image & Create Button Container */}
              <div className="relative z-10 flex items-center space-x-4 shrink-0">
                {/* Hero Graphic matching reference screenshot */}
                <div className="hidden lg:block w-72 h-24 rounded-2xl overflow-hidden border border-slate-200/60 shadow-xs relative bg-indigo-900/10">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80"
                    alt="Learning Hub"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-transparent to-transparent"></div>
                </div>

                <button
                  onClick={() => setShowAddCard(true)}
                  className="bg-[#5551ff] hover:bg-[#4440ee] text-white font-extrabold px-5 py-3 rounded-2xl shadow-lg shadow-indigo-500/25 flex items-center space-x-2 transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
                >
                  <Plus className="w-4.5 h-4.5" />
                  <span className="text-xs tracking-wide">Add Learning Module</span>
                </button>
              </div>
            </div>

            {/* 4 Stat Cards Row with SVG Sparklines */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* Stat 1: Total Modules */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-rose-100/80 text-rose-600 flex items-center justify-center shrink-0">
                      <BookOpen className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900 tracking-tight">24</div>
                      <div className="text-xs font-bold text-slate-400">Total Modules</div>
                    </div>
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 font-black px-2 py-0.5 rounded-full text-xs">
                    ↑ 20%
                  </span>
                </div>
                {/* SVG Sparkline */}
                <div className="h-6 w-full overflow-hidden pt-1">
                  <svg className="w-full h-full text-[#5551ff]" viewBox="0 0 100 25" fill="none">
                    <path d="M0,20 Q25,5 50,15 T100,5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              </div>

              {/* Stat 2: Total Learners */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-sky-100/80 text-sky-600 flex items-center justify-center shrink-0">
                      <Users className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900 tracking-tight">3,120</div>
                      <div className="text-xs font-bold text-slate-400">Total Learners</div>
                    </div>
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 font-black px-2 py-0.5 rounded-full text-xs">
                    ↑ 18%
                  </span>
                </div>
                {/* SVG Sparkline */}
                <div className="h-6 w-full overflow-hidden pt-1">
                  <svg className="w-full h-full text-emerald-500" viewBox="0 0 100 25" fill="none">
                    <path d="M0,22 Q30,12 60,18 T100,4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              </div>

              {/* Stat 3: Avg. Completion Rate */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-purple-100/80 text-[#5551ff] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900 tracking-tight">68%</div>
                      <div className="text-xs font-bold text-slate-400">Avg. Completion Rate</div>
                    </div>
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 font-black px-2 py-0.5 rounded-full text-xs">
                    ↑ 12%
                  </span>
                </div>
                {/* SVG Sparkline */}
                <div className="h-6 w-full overflow-hidden pt-1">
                  <svg className="w-full h-full text-orange-500" viewBox="0 0 100 25" fill="none">
                    <path d="M0,18 Q35,8 70,16 T100,6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              </div>

              {/* Stat 4: Avg. Rating */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0">
                      <BarChart3 className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900 tracking-tight">4.5</div>
                      <div className="text-xs font-bold text-slate-400">Avg. Rating</div>
                    </div>
                  </div>
                  <span className="bg-rose-50 text-rose-600 font-black px-2 py-0.5 rounded-full text-xs">
                    ↓ 8%
                  </span>
                </div>
                {/* SVG Sparkline */}
                <div className="h-6 w-full overflow-hidden pt-1">
                  <svg className="w-full h-full text-orange-400" viewBox="0 0 100 25" fill="none">
                    <path d="M0,8 Q35,18 70,10 T100,22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              </div>

            </div>

            {/* Filter Controls Bar */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-wrap lg:flex-nowrap items-center justify-between gap-3 text-xs font-semibold text-slate-700">
              
              <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[240px]">
                
                {/* Search */}
                <div className="relative flex-1 min-w-[200px]">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Search</label>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3.5 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      value={moduleSearchQuery}
                      onChange={(e) => setModuleSearchQuery(e.target.value)}
                      placeholder="Search by title, description..."
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[#5551ff] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Module Category */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Module Category</label>
                  <select
                    value={moduleCategoryFilter}
                    onChange={(e) => setModuleCategoryFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                  >
                    <option value="All Categories">All Categories</option>
                    <option value="Leadership">Leadership</option>
                    <option value="Diversity">Diversity</option>
                    <option value="Workplace Culture">Workplace Culture</option>
                    <option value="Impact Measurement">Impact Measurement</option>
                    <option value="Case Study">Case Study</option>
                  </select>
                </div>

                {/* Difficulty Level */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Difficulty Level</label>
                  <select
                    value={moduleLevelFilter}
                    onChange={(e) => setModuleLevelFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                  >
                    <option value="All Levels">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Status</label>
                  <select
                    value={moduleStatusFilter}
                    onChange={(e) => setModuleStatusFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                  >
                    <option value="All Status">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>

                {/* Language */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Language</label>
                  <select
                    value={moduleLanguageFilter}
                    onChange={(e) => setModuleLanguageFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                  >
                    <option value="All Languages">All Languages</option>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Tamil">Tamil</option>
                  </select>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 shrink-0 self-end">
                <button
                  onClick={() => {
                    setModuleSearchQuery('');
                    setModuleCategoryFilter('All Categories');
                    setModuleLevelFilter('All Levels');
                    setModuleStatusFilter('All Status');
                    setModuleLanguageFilter('All Languages');
                  }}
                  className="px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all"
                >
                  Reset
                </button>
                <button className="px-5 py-2 bg-[#5551ff] hover:bg-[#4440ee] text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-xs transition-all">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Apply Filters</span>
                </button>
              </div>

            </div>

            {/* Main Content Grid: Left Table (2 cols) + Right Details Panel (1 col) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              {/* Left Column: Learning Modules Table */}
              <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
                
                {/* Table Header Row */}
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-900">
                    Learning Modules (24)
                  </h3>
                  <button className="px-3.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-xs transition-all">
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Export</span>
                  </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                        <th className="pb-3 px-2 w-8">#</th>
                        <th className="pb-3 px-3">MODULE TITLE</th>
                        <th className="pb-3 px-3">CATEGORY</th>
                        <th className="pb-3 px-3">LEVEL</th>
                        <th className="pb-3 px-3">DURATION</th>
                        <th className="pb-3 px-3">COMPLETION RATE</th>
                        <th className="pb-3 px-3">STATUS</th>
                        <th className="pb-3 px-3 text-right">ACTIONS</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {learningModulesData.map((mod, idx) => {
                        const isSelected = mod.id === activeLearningModule.id;
                        return (
                          <tr
                            key={mod.id}
                            onClick={() => setSelectedModuleId(mod.id)}
                            className={`cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-indigo-50/50 border-l-4 border-[#5551ff]'
                                : 'hover:bg-slate-50/70'
                            }`}
                          >
                            <td className="py-3.5 px-2 font-bold text-slate-400 text-xs">
                              {idx + 1}
                            </td>

                            {/* Module Title & Subtitle */}
                            <td className="py-3.5 px-3">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={mod.thumbnail}
                                  alt={mod.title}
                                  className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                                />
                                <div className="max-w-[200px]">
                                  <div className="font-extrabold text-slate-900 text-xs truncate">
                                    {mod.title}
                                  </div>
                                  <div className="text-[10px] text-slate-400 font-medium truncate mt-0.5">
                                    {mod.subtitle}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Category Badge */}
                            <td className="py-3.5 px-3">
                              <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-extrabold border ${mod.categoryBadge}`}>
                                {mod.category}
                              </span>
                            </td>

                            {/* Level Pill */}
                            <td className="py-3.5 px-3">
                              <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold ${mod.levelBadge}`}>
                                {mod.level}
                              </span>
                            </td>

                            {/* Duration */}
                            <td className="py-3.5 px-3 font-semibold text-slate-600 text-xs whitespace-nowrap">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3.5 h-3.5 text-slate-400" />
                                <span>{mod.duration}</span>
                              </div>
                            </td>

                            {/* Completion Rate Progress Bar */}
                            <td className="py-3.5 px-3">
                              <div className="space-y-1 w-24">
                                <div className="text-[11px] font-black text-slate-900">
                                  {mod.completionRate}
                                </div>
                                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-[#5551ff] rounded-full"
                                    style={{ width: `${mod.completionPercent}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>

                            {/* Status Badge */}
                            <td className="py-3.5 px-3">
                              <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase ${mod.statusBadge}`}>
                                {mod.status}
                              </span>
                            </td>

                            {/* Actions */}
                            <td className="py-3.5 px-3 text-right">
                              <div className="flex items-center justify-end space-x-1.5" onClick={(e) => e.stopPropagation()}>
                                <button
                                  onClick={() => setSelectedModuleId(mod.id)}
                                  className="px-3 py-1 bg-indigo-50 hover:bg-[#5551ff] text-[#5551ff] hover:text-white rounded-lg text-xs font-extrabold transition-all"
                                >
                                  Edit
                                </button>
                                <button className="p-1 hover:bg-slate-200 rounded-md text-slate-400 hover:text-slate-600 transition-colors">
                                  <MoreVertical className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer / Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-slate-100 text-xs font-semibold text-slate-500 gap-3">
                  <div>Showing 1-8 of 24 modules</div>

                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1.5">
                      <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-400">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button className="w-7 h-7 rounded-lg bg-[#5551ff] text-white font-black flex items-center justify-center">
                        1
                      </button>
                      <button className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center">
                        2
                      </button>
                      <button className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center">
                        3
                      </button>
                      <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-400">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <select className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-700">
                      <option>8 per page</option>
                      <option>16 per page</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Right Column: Module Preview Panel */}
              <div className="lg:col-span-1 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-5 sticky top-6">
                
                {/* Panel Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-black text-slate-900">Module Preview</h3>
                  <button className="px-3 py-1 border border-indigo-200 bg-indigo-50/70 hover:bg-[#5551ff] text-[#5551ff] hover:text-white rounded-full text-[11px] font-bold flex items-center space-x-1 transition-all">
                    <span>View in Game</span>
                  </button>
                </div>

                {/* Banner Graphic Card */}
                <div className="relative rounded-2xl overflow-hidden h-40 border border-slate-200 shadow-xs">
                  <img
                    src={activeLearningModule.thumbnail}
                    alt={activeLearningModule.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                  
                  {/* Category Pill overlay on photo top-left */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#5551ff] text-white shadow-xs">
                      {activeLearningModule.category}
                    </span>
                  </div>

                  {/* Title overlay on bottom-right of photo */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h4 className="text-sm font-black tracking-tight leading-snug drop-shadow-md">
                      Inclusive Leadership for Stronger Workplaces
                    </h4>
                  </div>
                </div>

                {/* Module Title & Description */}
                <div>
                  <h4 className="text-base font-black text-slate-900 tracking-tight leading-snug">
                    {activeLearningModule.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">
                    {activeLearningModule.description}
                  </p>
                </div>

                {/* 4 Key Metric Boxes */}
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  
                  <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-2 space-y-0.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500 mx-auto" />
                    <div className="font-extrabold text-slate-900 text-[11px]">{activeLearningModule.duration}</div>
                    <div className="text-[9px] font-bold text-slate-400">Duration</div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-2 space-y-0.5">
                    <BarChart3 className="w-3.5 h-3.5 text-slate-500 mx-auto" />
                    <div className="font-extrabold text-slate-900 text-[11px] truncate">{activeLearningModule.level}</div>
                    <div className="text-[9px] font-bold text-slate-400">Level</div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-2 space-y-0.5">
                    <Users className="w-3.5 h-3.5 text-slate-500 mx-auto" />
                    <div className="font-extrabold text-slate-900 text-[11px]">{activeLearningModule.completionRate}</div>
                    <div className="text-[9px] font-bold text-slate-400">Completion</div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-2 space-y-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 mx-auto" />
                    <div className="font-extrabold text-slate-900 text-[11px]">{activeLearningModule.rating}</div>
                    <div className="text-[9px] font-bold text-slate-400">Rating</div>
                  </div>

                </div>

                {/* Sub-tabs */}
                <div className="border-b border-slate-100 flex items-center space-x-3 text-xs font-bold text-slate-400 pt-1 overflow-x-auto">
                  <button
                    onClick={() => setModulePreviewSubTab('objectives')}
                    className={`pb-2 border-b-2 whitespace-nowrap transition-all ${
                      modulePreviewSubTab === 'objectives'
                        ? 'border-[#5551ff] text-[#5551ff] font-extrabold'
                        : 'border-transparent hover:text-slate-600'
                    }`}
                  >
                    Learning Objectives
                  </button>
                  <button
                    onClick={() => setModulePreviewSubTab('topics')}
                    className={`pb-2 border-b-2 whitespace-nowrap transition-all ${
                      modulePreviewSubTab === 'topics'
                        ? 'border-[#5551ff] text-[#5551ff] font-extrabold'
                        : 'border-transparent hover:text-slate-600'
                    }`}
                  >
                    Topics Covered
                  </button>
                  <button
                    onClick={() => setModulePreviewSubTab('preview')}
                    className={`pb-2 border-b-2 whitespace-nowrap transition-all ${
                      modulePreviewSubTab === 'preview'
                        ? 'border-[#5551ff] text-[#5551ff] font-extrabold'
                        : 'border-transparent hover:text-slate-600'
                    }`}
                  >
                    Preview Content
                  </button>
                </div>

                {/* Sub-tab Content */}
                {modulePreviewSubTab === 'objectives' && (
                  <div className="space-y-2.5 text-xs text-slate-700 font-medium">
                    {activeLearningModule.objectives.map((obj, oIdx) => (
                      <div key={oIdx} className="flex items-start space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#5551ff] shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </div>
                    ))}
                  </div>
                )}

                {modulePreviewSubTab !== 'objectives' && (
                  <div className="py-6 text-center text-xs font-bold text-slate-400 space-y-2 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <BookOpen className="w-5 h-5 mx-auto text-slate-400" />
                    <p>Detailed {modulePreviewSubTab} available for {activeLearningModule.title}.</p>
                  </div>
                )}

                {/* Bottom Action Buttons */}
                <div className="flex items-center space-x-3 pt-2">
                  <button className="flex-1 py-2.5 px-3 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-extrabold text-xs transition-all shadow-xs flex items-center justify-center space-x-1.5">
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Duplicate Module</span>
                  </button>
                  <button className="flex-1 py-2.5 px-3 rounded-2xl bg-[#5551ff] hover:bg-[#4440ee] text-white font-extrabold text-xs transition-all shadow-md shadow-indigo-500/20 flex items-center justify-center space-x-1.5">
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit Module</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* QUIZ MANAGEMENT TAB VIEW (MATCHES REFERENCE IMAGE) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'quiz-management' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Header Title & Action Banner */}
            <div className="bg-gradient-to-r from-white via-indigo-50/40 to-purple-50/60 border border-slate-200/80 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
              <div className="relative z-10 flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Quiz Management
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  Create, edit, and manage quiz questions to assess and reinforce learning outcomes.
                </p>
              </div>

              {/* Right Side: Hero Graphic & Action Button Container */}
              <div className="relative z-10 flex items-center space-x-4 shrink-0">
                {/* Quiz Graphic from Reference Image */}
                <div className="hidden lg:block w-72 h-24 rounded-2xl overflow-hidden border border-slate-200/60 shadow-xs relative bg-indigo-900/10">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
                    alt="Quiz Engine"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-transparent to-transparent"></div>
                </div>

                <button
                  onClick={() => setActiveTab('add-quiz-question')}
                  className="bg-[#5551ff] hover:bg-[#4440ee] text-white font-extrabold px-5 py-3 rounded-2xl shadow-lg shadow-indigo-500/25 flex items-center space-x-2 transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
                >
                  <Plus className="w-4.5 h-4.5" />
                  <span className="text-xs tracking-wide">Add Quiz Question</span>
                </button>
              </div>
            </div>

            {/* 4 Stat Cards Row with SVG Sparklines */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* Stat 1: Total Questions */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-purple-100/80 text-[#5551ff] flex items-center justify-center shrink-0">
                      <HelpCircle className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900 tracking-tight">420</div>
                      <div className="text-xs font-bold text-slate-400">Total Questions</div>
                    </div>
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 font-black px-2 py-0.5 rounded-full text-xs">
                    ↑ 18%
                  </span>
                </div>
                {/* SVG Sparkline */}
                <div className="h-6 w-full overflow-hidden pt-1">
                  <svg className="w-full h-full text-[#5551ff]" viewBox="0 0 100 25" fill="none">
                    <path d="M0,20 Q25,5 50,15 T100,5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              </div>

              {/* Stat 2: Quizzes */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-sky-100/80 text-sky-600 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900 tracking-tight">24</div>
                      <div className="text-xs font-bold text-slate-400">Quizzes</div>
                    </div>
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 font-black px-2 py-0.5 rounded-full text-xs">
                    ↑ 12%
                  </span>
                </div>
                {/* SVG Sparkline */}
                <div className="h-6 w-full overflow-hidden pt-1">
                  <svg className="w-full h-full text-emerald-500" viewBox="0 0 100 25" fill="none">
                    <path d="M0,22 Q30,12 60,18 T100,4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              </div>

              {/* Stat 3: Avg. Success Rate */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-orange-100/80 text-orange-600 flex items-center justify-center shrink-0">
                      <Target className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900 tracking-tight">76%</div>
                      <div className="text-xs font-bold text-slate-400">Avg. Success Rate</div>
                    </div>
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 font-black px-2 py-0.5 rounded-full text-xs">
                    ↑ 8%
                  </span>
                </div>
                {/* SVG Sparkline */}
                <div className="h-6 w-full overflow-hidden pt-1">
                  <svg className="w-full h-full text-orange-500" viewBox="0 0 100 25" fill="none">
                    <path d="M0,18 Q35,8 70,16 T100,6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              </div>

              {/* Stat 4: Total Attempts */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0">
                      <Users className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900 tracking-tight">3,120</div>
                      <div className="text-xs font-bold text-slate-400">Total Attempts</div>
                    </div>
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 font-black px-2 py-0.5 rounded-full text-xs">
                    ↑ 25%
                  </span>
                </div>
                {/* SVG Sparkline */}
                <div className="h-6 w-full overflow-hidden pt-1">
                  <svg className="w-full h-full text-sky-500" viewBox="0 0 100 25" fill="none">
                    <path d="M0,20 Q25,8 50,16 T100,4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              </div>

            </div>

            {/* Filter Controls Bar */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-wrap lg:flex-nowrap items-center justify-between gap-3 text-xs font-semibold text-slate-700">
              
              <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[240px]">
                
                {/* Search */}
                <div className="relative flex-1 min-w-[200px]">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Search</label>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3.5 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      value={quizSearchQuery}
                      onChange={(e) => setQuizSearchQuery(e.target.value)}
                      placeholder="Search by question, quiz, topic..."
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[#5551ff] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Quiz / Module */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Quiz / Module</label>
                  <select
                    value={quizModuleFilter}
                    onChange={(e) => setQuizModuleFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                  >
                    <option value="All Modules">All Modules</option>
                    <option value="Introduction to Inclusive Leadership">Introduction to Inclusive Leadership</option>
                    <option value="Unconscious Bias Awareness">Unconscious Bias Awareness</option>
                    <option value="Diversity in Leadership">Diversity in Leadership</option>
                    <option value="Inclusive Decision Making">Inclusive Decision Making</option>
                    <option value="Flexible Work Strategies">Flexible Work Strategies</option>
                    <option value="Building Inclusive Teams">Building Inclusive Teams</option>
                  </select>
                </div>

                {/* Question Type */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Question Type</label>
                  <select
                    value={quizTypeFilter}
                    onChange={(e) => setQuizTypeFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                  >
                    <option value="All Types">All Types</option>
                    <option value="MCQ">MCQ</option>
                    <option value="True/False">True/False</option>
                    <option value="Matching">Matching</option>
                    <option value="Sequence">Sequence</option>
                    <option value="Multi-Select">Multi-Select</option>
                    <option value="Scenario">Scenario</option>
                  </select>
                </div>

                {/* Difficulty Level */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Difficulty Level</label>
                  <select
                    value={quizLevelFilter}
                    onChange={(e) => setQuizLevelFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                  >
                    <option value="All Levels">All Levels</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Status</label>
                  <select
                    value={quizStatusFilter}
                    onChange={(e) => setQuizStatusFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                  >
                    <option value="All Status">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 shrink-0 self-end">
                <button
                  onClick={() => {
                    setQuizSearchQuery('');
                    setQuizModuleFilter('All Modules');
                    setQuizTypeFilter('All Types');
                    setQuizLevelFilter('All Levels');
                    setQuizStatusFilter('All Status');
                  }}
                  className="px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all"
                >
                  Reset
                </button>
                <button className="px-5 py-2 bg-[#5551ff] hover:bg-[#4440ee] text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-xs transition-all">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Apply Filters</span>
                </button>
              </div>

            </div>

            {/* Main Content Grid: Left Table (2 cols) + Right Details Panel (1 col) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              {/* Left Column: Quiz Questions Table */}
              <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
                
                {/* Table Header Row */}
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-900">
                    Quiz Questions (420)
                  </h3>
                  <button className="px-3.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-xs transition-all">
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Export</span>
                  </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                        <th className="pb-3 px-2 w-6">
                          <input type="checkbox" className="rounded border-slate-300 text-[#5551ff] focus:ring-[#5551ff]" />
                        </th>
                        <th className="pb-3 px-2 w-6">#</th>
                        <th className="pb-3 px-3">QUESTION</th>
                        <th className="pb-3 px-3">QUIZ / MODULE</th>
                        <th className="pb-3 px-3">TYPE</th>
                        <th className="pb-3 px-3">DIFFICULTY</th>
                        <th className="pb-3 px-3">SUCCESS RATE</th>
                        <th className="pb-3 px-3">STATUS</th>
                        <th className="pb-3 px-3 text-right">ACTIONS</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {quizQuestionsData.map((item, idx) => {
                        const isSelected = item.id === activeQuizQuestion.id;
                        return (
                          <tr
                            key={item.id}
                            onClick={() => {
                              setSelectedQuestionId(item.id);
                              setSelectedQuizOption(0);
                            }}
                            className={`cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-indigo-50/50 border-l-4 border-[#5551ff]'
                                : 'hover:bg-slate-50/70'
                            }`}
                          >
                            <td className="py-3.5 px-2" onClick={(e) => e.stopPropagation()}>
                              <input type="checkbox" className="rounded border-slate-300 text-[#5551ff] focus:ring-[#5551ff]" />
                            </td>

                            <td className="py-3.5 px-2 font-bold text-slate-400 text-xs">
                              {idx + 1}
                            </td>

                            {/* Question Title & Subtitle */}
                            <td className="py-3.5 px-3">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={item.thumbnail}
                                  alt="Question"
                                  className="w-9 h-9 rounded-xl object-cover border border-slate-200 shrink-0"
                                />
                                <div className="max-w-[200px]">
                                  <div className="font-extrabold text-slate-900 text-xs truncate">
                                    {item.question}
                                  </div>
                                  <div className="text-[10px] text-slate-400 font-medium truncate mt-0.5">
                                    {item.subtitle}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Quiz / Module Badge */}
                            <td className="py-3.5 px-3">
                              <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-extrabold border ${item.moduleBadge} max-w-[150px] truncate`}>
                                {item.module}
                              </span>
                            </td>

                            {/* Type */}
                            <td className="py-3.5 px-3 font-extrabold text-slate-700 text-xs whitespace-nowrap">
                              {item.type}
                            </td>

                            {/* Difficulty Level Pill */}
                            <td className="py-3.5 px-3">
                              <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold ${item.difficultyBadge}`}>
                                {item.difficulty}
                              </span>
                            </td>

                            {/* Success Rate Progress Bar */}
                            <td className="py-3.5 px-3">
                              <div className="space-y-1 w-24">
                                <div className="text-[11px] font-black text-slate-900">
                                  {item.successRate}
                                </div>
                                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-[#5551ff] rounded-full"
                                    style={{ width: `${item.successPercent}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>

                            {/* Status Badge */}
                            <td className="py-3.5 px-3">
                              <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase ${item.statusBadge}`}>
                                {item.status}
                              </span>
                            </td>

                            {/* Actions */}
                            <td className="py-3.5 px-3 text-right">
                              <div className="flex items-center justify-end space-x-1.5" onClick={(e) => e.stopPropagation()}>
                                <button
                                  onClick={() => setSelectedQuestionId(item.id)}
                                  className="px-3 py-1 bg-indigo-50 hover:bg-[#5551ff] text-[#5551ff] hover:text-white rounded-lg text-xs font-extrabold transition-all"
                                >
                                  Edit
                                </button>
                                <button className="p-1 hover:bg-slate-200 rounded-md text-slate-400 hover:text-slate-600 transition-colors">
                                  <MoreVertical className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer / Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-slate-100 text-xs font-semibold text-slate-500 gap-3">
                  <div>Showing 1-8 of 420 questions</div>

                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1.5">
                      <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-400">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button className="w-7 h-7 rounded-lg bg-[#5551ff] text-white font-black flex items-center justify-center">
                        1
                      </button>
                      <button className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center">
                        2
                      </button>
                      <button className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center">
                        3
                      </button>
                      <span className="text-slate-400 font-bold">...</span>
                      <button className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center">
                        53
                      </button>
                      <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-400">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <select className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-700">
                      <option>8 per page</option>
                      <option>16 per page</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Right Column: Question Preview Panel */}
              <div className="lg:col-span-1 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-5 sticky top-6">
                
                {/* Panel Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-black text-slate-900">Question Preview</h3>
                  <button className="px-3 py-1 border border-indigo-200 bg-indigo-50/70 hover:bg-[#5551ff] text-[#5551ff] hover:text-white rounded-full text-[11px] font-bold flex items-center space-x-1 transition-all">
                    <span>Preview in Game</span>
                  </button>
                </div>

                {/* Badges Row */}
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-50 text-[#5551ff] border border-indigo-100">
                    {activeQuizQuestion.type === 'MCQ' ? 'Multiple Choice' : activeQuizQuestion.type}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${activeQuizQuestion.difficultyBadge}`}>
                    {activeQuizQuestion.difficulty}
                  </span>
                </div>

                {/* Question Title & Subtitle */}
                <div>
                  <h4 className="text-base font-black text-slate-900 tracking-tight leading-snug">
                    {activeQuizQuestion.question}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">
                    {activeQuizQuestion.subtitle}
                  </p>
                </div>

                {/* Options List */}
                <div className="space-y-2.5">
                  {activeQuizQuestion.options.map((optionText, oIdx) => {
                    const isSelectedOption = oIdx === selectedQuizOption;
                    return (
                      <div
                        key={oIdx}
                        onClick={() => setSelectedQuizOption(oIdx)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center space-x-3 text-xs font-semibold ${
                          isSelectedOption
                            ? 'bg-indigo-50/70 border-[#5551ff] text-slate-900 shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        {/* Radio Check Circle */}
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all ${
                            isSelectedOption
                              ? 'bg-[#5551ff] text-white shadow-xs'
                              : 'border-2 border-slate-300'
                          }`}
                        >
                          {isSelectedOption && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="leading-snug">{optionText}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Question Details Grid */}
                <div className="border-t border-slate-100 pt-4 space-y-3">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Question Details</h4>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold">Quiz / Module</div>
                      <div className="font-extrabold text-[#5551ff] bg-indigo-50 px-2 py-1 rounded-md text-[11px] truncate mt-0.5 border border-indigo-100">
                        {activeQuizQuestion.module}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] text-slate-400 font-bold">Question Type</div>
                      <div className="font-extrabold text-slate-800 bg-slate-50 px-2 py-1 rounded-md text-[11px] mt-0.5 border border-slate-200">
                        {activeQuizQuestion.type === 'MCQ' ? 'Multiple Choice' : activeQuizQuestion.type}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] text-slate-400 font-bold">Difficulty Level</div>
                      <div className={`font-extrabold px-2 py-1 rounded-md text-[11px] mt-0.5 border inline-block ${activeQuizQuestion.difficultyBadge}`}>
                        {activeQuizQuestion.difficulty}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] text-slate-400 font-bold">Status</div>
                      <div className={`font-extrabold px-2 py-1 rounded-md text-[11px] mt-0.5 border inline-block ${activeQuizQuestion.statusBadge}`}>
                        {activeQuizQuestion.status}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] text-slate-400 font-bold">Success Rate</div>
                      <div className="font-black text-slate-900 text-sm mt-0.5 flex items-center space-x-1.5">
                        <span>{activeQuizQuestion.successRate}</span>
                        <span className="text-[10px] text-emerald-600 font-extrabold">↑ 12%</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] text-slate-400 font-bold">Total Attempts</div>
                      <div className="font-black text-slate-900 text-sm mt-0.5 flex items-center space-x-1.5">
                        <span>{activeQuizQuestion.attempts}</span>
                        <span className="text-[10px] text-emerald-600 font-extrabold">↑ 25%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="flex items-center space-x-3 pt-2">
                  <button className="flex-1 py-2.5 px-3 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-extrabold text-xs transition-all shadow-xs flex items-center justify-center space-x-1.5">
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Duplicate Question</span>
                  </button>
                  <button className="flex-1 py-2.5 px-3 rounded-2xl bg-[#5551ff] hover:bg-[#4440ee] text-white font-extrabold text-xs transition-all shadow-md shadow-indigo-500/20 flex items-center justify-center space-x-1.5">
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit Question</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* ADD NEW ASSESSMENT QUESTION FORM (MATCHES REFERENCE IMAGE) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'add-quiz-question' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Top Breadcrumb & Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                {/* Breadcrumb Navigation */}
                <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400 mb-1">
                  <button onClick={() => setActiveTab('quiz-management')} className="hover:text-slate-700 transition-colors">
                    <Home className="w-3.5 h-3.5" />
                  </button>
                  <ChevronRight className="w-3 h-3 text-slate-300" />
                  <button onClick={() => setActiveTab('quiz-management')} className="hover:text-[#5551ff] transition-colors">
                    Quiz Management
                  </button>
                  <ChevronRight className="w-3 h-3 text-slate-300" />
                  <span className="text-slate-900 font-extrabold">Add New Question</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Add New Assessment Question
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  Create a new question to assess player learning and reinforce inclusion concepts.
                </p>
              </div>

              {/* Action Buttons Top Right */}
              <div className="flex items-center space-x-3 shrink-0">
                <button
                  onClick={() => setActiveTab('quiz-management')}
                  className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-extrabold text-xs rounded-2xl flex items-center space-x-2 shadow-xs transition-all"
                >
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span>Save as Draft</span>
                </button>
                <button
                  onClick={() => setActiveTab('quiz-management')}
                  className="px-5 py-2.5 bg-[#5551ff] hover:bg-[#4440ee] text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-indigo-500/25 flex items-center space-x-2 transition-all hover:scale-[1.02]"
                >
                  <Send className="w-4 h-4" />
                  <span>Publish Question</span>
                </button>
              </div>
            </div>

            {/* Form Step Tabs Bar (5 Steps) */}
            <div className="bg-white border border-slate-200/80 rounded-2xl px-6 py-1 shadow-xs flex items-center space-x-8 text-xs font-bold text-slate-400 overflow-x-auto">
              <button
                onClick={() => setAddQuestionFormStep('basic')}
                className={`py-3.5 border-b-2 transition-all flex items-center space-x-2 whitespace-nowrap ${
                  addQuestionFormStep === 'basic'
                    ? 'border-[#5551ff] text-[#5551ff] font-extrabold'
                    : 'border-transparent hover:text-slate-600'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>1. Basic Information</span>
              </button>

              <button
                onClick={() => setAddQuestionFormStep('content')}
                className={`py-3.5 border-b-2 transition-all flex items-center space-x-2 whitespace-nowrap ${
                  addQuestionFormStep === 'content'
                    ? 'border-[#5551ff] text-[#5551ff] font-extrabold'
                    : 'border-transparent hover:text-slate-600'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>2. Question Content</span>
              </button>

              <button
                onClick={() => setAddQuestionFormStep('options')}
                className={`py-3.5 border-b-2 transition-all flex items-center space-x-2 whitespace-nowrap ${
                  addQuestionFormStep === 'options'
                    ? 'border-[#5551ff] text-[#5551ff] font-extrabold'
                    : 'border-transparent hover:text-slate-600'
                }`}
              >
                <List className="w-4 h-4" />
                <span>3. Answer Options</span>
              </button>

              <button
                onClick={() => setAddQuestionFormStep('explanation')}
                className={`py-3.5 border-b-2 transition-all flex items-center space-x-2 whitespace-nowrap ${
                  addQuestionFormStep === 'explanation'
                    ? 'border-[#5551ff] text-[#5551ff] font-extrabold'
                    : 'border-transparent hover:text-slate-600'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>4. Explanation & Feedback</span>
              </button>

              <button
                onClick={() => setAddQuestionFormStep('settings')}
                className={`py-3.5 border-b-2 transition-all flex items-center space-x-2 whitespace-nowrap ${
                  addQuestionFormStep === 'settings'
                    ? 'border-[#5551ff] text-[#5551ff] font-extrabold'
                    : 'border-transparent hover:text-slate-600'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>5. Settings</span>
              </button>
            </div>

            {/* Main Form Layout: Left Inputs (2 cols) + Right Live Preview (1 col) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              {/* Left Column: Form Fields Card (2 cols) */}
              <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-8">
                
                {/* 1. Basic Information Section */}
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-base font-black text-slate-900">1. Basic Information</h3>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">Define the core details for this question.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-slate-700">
                    
                    {/* Question Title */}
                    <div>
                      <label className="block mb-1 font-bold">
                        Question Title <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={newQuestionTitle}
                        onChange={(e) => setNewQuestionTitle(e.target.value)}
                        placeholder="Enter a clear and concise title"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[#5551ff] focus:bg-white transition-all"
                      />
                      <div className="text-[10px] text-slate-400 font-bold text-right mt-1">0/100</div>
                    </div>

                    {/* Related Learning Module */}
                    <div>
                      <label className="block mb-1 font-bold">
                        Related Learning Module <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={newQuestionModule}
                        onChange={(e) => setNewQuestionModule(e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                      >
                        <option value="">Select learning module</option>
                        <option value="Introduction to Inclusive Leadership">Introduction to Inclusive Leadership</option>
                        <option value="Unconscious Bias Awareness">Unconscious Bias Awareness</option>
                        <option value="Diversity in Leadership">Diversity in Leadership</option>
                        <option value="Inclusive Decision Making">Inclusive Decision Making</option>
                        <option value="Flexible Work Strategies">Flexible Work Strategies</option>
                      </select>
                    </div>

                    {/* Question Type */}
                    <div>
                      <label className="block mb-1 font-bold">
                        Question Type <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={newQuestionType}
                        onChange={(e) => setNewQuestionType(e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                      >
                        <option value="Multiple Choice (Single Answer)">Multiple Choice (Single Answer)</option>
                        <option value="True / False">True / False</option>
                        <option value="Matching">Matching</option>
                        <option value="Sequence">Sequence</option>
                        <option value="Multi-Select">Multi-Select</option>
                      </select>
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block mb-1 font-bold">
                        Category <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={newQuestionCategory}
                        onChange={(e) => setNewQuestionCategory(e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                      >
                        <option value="">Select category</option>
                        <option value="Leadership">Leadership</option>
                        <option value="Diversity">Diversity</option>
                        <option value="Workplace Culture">Workplace Culture</option>
                        <option value="Compensation">Compensation</option>
                      </select>
                    </div>

                    {/* Difficulty Level */}
                    <div>
                      <label className="block mb-1 font-bold">
                        Difficulty Level <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={newQuestionDifficulty}
                        onChange={(e) => setNewQuestionDifficulty(e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                      >
                        <option value="">Select difficulty level</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </div>

                    {/* Estimated Time */}
                    <div>
                      <label className="block mb-1 font-bold">
                        Estimated Time <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={newQuestionTime}
                        onChange={(e) => setNewQuestionTime(e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                      >
                        <option value="">Select time (e.g., 1-2 min)</option>
                        <option value="1-2 minutes">1-2 minutes</option>
                        <option value="2-3 minutes">2-3 minutes</option>
                        <option value="3-5 minutes">3-5 minutes</option>
                      </select>
                    </div>

                  </div>
                </div>

                {/* 2. Question Content Section */}
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-base font-black text-slate-900">2. Question Content</h3>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">Write the question that will be shown to players.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                    
                    {/* Rich-Text Editor Box (2 cols) */}
                    <div className="md:col-span-2 space-y-1">
                      <label className="block mb-1 font-bold text-xs text-slate-700">
                        Question <span className="text-rose-500">*</span>
                      </label>

                      <div className="border border-slate-200 rounded-2xl overflow-hidden focus-within:border-[#5551ff] transition-all bg-white">
                        {/* Editor Toolbar */}
                        <div className="bg-slate-50 border-b border-slate-200 px-3 py-2 flex items-center space-x-3 text-slate-600 text-xs font-bold">
                          <button className="p-1 hover:bg-slate-200 rounded font-black transition-colors">B</button>
                          <button className="p-1 hover:bg-slate-200 rounded italic font-serif transition-colors">I</button>
                          <button className="p-1 hover:bg-slate-200 rounded underline transition-colors">U</button>
                          <div className="h-4 w-[1px] bg-slate-200"></div>
                          <button className="p-1 hover:bg-slate-200 rounded transition-colors"><List className="w-3.5 h-3.5" /></button>
                          <button className="p-1 hover:bg-slate-200 rounded transition-colors"><ListOrdered className="w-3.5 h-3.5" /></button>
                          <button className="p-1 hover:bg-slate-200 rounded transition-colors"><LinkIcon className="w-3.5 h-3.5" /></button>
                        </div>

                        {/* Editor Textarea */}
                        <textarea
                          rows={4}
                          value={newQuestionContent}
                          onChange={(e) => setNewQuestionContent(e.target.value)}
                          placeholder="Enter the question here..."
                          className="w-full p-3.5 text-xs text-slate-900 font-medium focus:outline-none resize-none"
                        ></textarea>
                      </div>

                      <div className="text-[10px] text-slate-400 font-bold text-right">0/500</div>
                    </div>

                    {/* Image Upload Dropzone (1 col) */}
                    <div className="space-y-1 flex flex-col justify-between">
                      <label className="block mb-1 font-bold text-xs text-slate-700">Add Image (Optional)</label>
                      
                      <div className="border-2 border-dashed border-indigo-200/80 rounded-2xl p-4 text-center space-y-2 bg-indigo-50/20 hover:bg-indigo-50/40 transition-all flex flex-col items-center justify-center flex-1 min-h-[140px]">
                        <div className="w-9 h-9 rounded-2xl bg-indigo-100/60 text-[#5551ff] flex items-center justify-center">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                        <div className="text-xs text-slate-700 font-bold">
                          Upload question image <br />
                          <span className="text-[10px] text-slate-400 font-normal">PNG, JPG (Max 2MB)</span>
                        </div>
                        <button className="px-4 py-1.5 bg-[#5551ff] hover:bg-[#4440ee] text-white text-xs font-extrabold rounded-xl transition-all shadow-xs">
                          Upload Image
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

                {/* 3. Answer Options Section */}
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-base font-black text-slate-900">3. Answer Options</h3>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">Provide answer choices for this question.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    
                    {/* Option Input Rows (2 cols) */}
                    <div className="md:col-span-2 space-y-3">
                      {newQuestionOptions.map((optText, optIdx) => {
                        const letters = ['A', 'B', 'C', 'D', 'E'];
                        const letter = letters[optIdx] || `${optIdx + 1}`;
                        const isCorrect = newQuestionCorrectAnswer === optIdx;

                        return (
                          <div key={optIdx} className="flex items-center space-x-3">
                            {/* Radio Check Circle with Badge */}
                            <button
                              type="button"
                              onClick={() => setNewQuestionCorrectAnswer(optIdx)}
                              className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-extrabold shrink-0 transition-all ${
                                isCorrect
                                  ? 'border-[#5551ff] bg-[#5551ff] text-white'
                                  : 'border-slate-300 text-slate-400 hover:border-slate-400 bg-white'
                              }`}
                            >
                              {letter}
                            </button>

                            {/* Option Text Input */}
                            <input
                              type="text"
                              value={optText}
                              onChange={(e) => {
                                const updated = [...newQuestionOptions];
                                updated[optIdx] = e.target.value;
                                setNewQuestionOptions(updated);
                              }}
                              placeholder={`Enter option ${letter}`}
                              className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[#5551ff] focus:bg-white transition-all"
                            />

                            {/* Trash Delete Icon */}
                            <button
                              type="button"
                              onClick={() => {
                                if (newQuestionOptions.length > 2) {
                                  setNewQuestionOptions(newQuestionOptions.filter((_, i) => i !== optIdx));
                                }
                              }}
                              className="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}

                      {/* Add Another Option Button */}
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (newQuestionOptions.length < 5) {
                              setNewQuestionOptions([...newQuestionOptions, '']);
                            }
                          }}
                          className="px-4 py-2 border border-indigo-200 text-[#5551ff] hover:bg-indigo-50/60 rounded-xl text-xs font-extrabold flex items-center space-x-1.5 transition-all"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Another Option</span>
                        </button>
                      </div>
                    </div>

                    {/* Right Controls: Correct Answer Dropdown & Randomize Checkbox (1 col) */}
                    <div className="space-y-4 bg-slate-50/50 border border-slate-200/60 rounded-2xl p-4 text-xs">
                      <div>
                        <label className="block mb-1 font-bold text-slate-700">
                          Correct Answer <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={newQuestionCorrectAnswer}
                          onChange={(e) => setNewQuestionCorrectAnswer(Number(e.target.value))}
                          className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                        >
                          <option value="">Select correct answer</option>
                          {newQuestionOptions.map((_, i) => {
                            const letters = ['A', 'B', 'C', 'D', 'E'];
                            return (
                              <option key={i} value={i}>
                                Option {letters[i] || i + 1}
                              </option>
                            );
                          })}
                        </select>
                      </div>

                      <div className="flex items-start space-x-2 pt-1">
                        <input
                          type="checkbox"
                          id="randomize"
                          checked={newQuestionRandomize}
                          onChange={(e) => setNewQuestionRandomize(e.target.checked)}
                          className="rounded border-slate-300 text-[#5551ff] focus:ring-[#5551ff] mt-0.5"
                        />
                        <div>
                          <label htmlFor="randomize" className="font-bold text-slate-800 cursor-pointer block text-xs">
                            Randomize Options
                          </label>
                          <p className="text-[10px] text-slate-400 font-medium">Show answer options in random order to players.</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

              {/* Right Column: Live Question Preview & Details Panel (1 col) */}
              <div className="lg:col-span-1 space-y-6 sticky top-6">
                
                {/* 1. Question Preview Panel */}
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-5">
                  
                  {/* Panel Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center space-x-2 text-slate-900 font-black text-base">
                      <Eye className="w-5 h-5 text-[#5551ff]" />
                      <h3>Question Preview</h3>
                    </div>
                    <button className="px-3 py-1 border border-indigo-200 bg-indigo-50/50 hover:bg-[#5551ff] text-[#5551ff] hover:text-white rounded-lg text-xs font-extrabold flex items-center space-x-1.5 transition-all">
                      <Trophy className="w-3.5 h-3.5" />
                      <span>Player View</span>
                    </button>
                  </div>

                  {/* Question Title & Content */}
                  <div className="space-y-4">
                    {/* Badges Row */}
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 rounded-lg text-xs font-bold bg-indigo-100/70 text-[#5551ff]">
                        {newQuestionCategory || 'Leadership'}
                      </span>
                      <span className="px-3 py-1 rounded-lg text-xs font-bold bg-amber-100/70 text-amber-700">
                        {newQuestionDifficulty || 'Medium'}
                      </span>
                    </div>

                    {/* Question Header Text */}
                    <h4 className="text-base font-black text-slate-900 leading-snug">
                      {newQuestionContent || newQuestionTitle || 'What is an inclusive workplace?'}
                    </h4>

                    {/* Options List Preview */}
                    <div className="space-y-2.5 pt-1">
                      {newQuestionOptions.map((opt, i) => {
                        const letters = ['A', 'B', 'C', 'D', 'E'];
                        const isCorrect = i === newQuestionCorrectAnswer;
                        return (
                          <div
                            key={i}
                            className={`p-3 rounded-2xl border text-xs font-semibold flex items-center space-x-3 transition-all ${
                              isCorrect
                                ? 'bg-purple-50/40 border-[#5551ff] text-slate-900'
                                : 'bg-white border-slate-200 text-slate-700'
                            }`}
                          >
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 ${
                                isCorrect ? 'bg-[#5551ff] text-white' : 'border border-slate-300 text-slate-500'
                              }`}
                            >
                              {letters[i] || i + 1}
                            </div>
                            <span className="leading-snug flex-1 font-medium">{opt || `Option ${letters[i]}`}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Submit Button Preview */}
                    <div className="flex justify-end pt-2">
                      <button className="px-6 py-2.5 bg-[#5551ff] text-white font-extrabold text-xs rounded-xl shadow-md shadow-indigo-500/20">
                        Submit Answer
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. Question Details Summary Card */}
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
                  <div className="flex items-center space-x-2 text-slate-900 font-black text-base border-b border-slate-100 pb-3">
                    <FileText className="w-5 h-5 text-[#5551ff]" />
                    <h3>Question Details</h3>
                  </div>

                  <div className="space-y-3 text-xs font-semibold">
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-slate-400">Learning Module</span>
                      <span className="text-slate-900 text-right truncate max-w-[180px] font-bold">
                        {newQuestionModule || 'Introduction to Inclusive Leadership'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-slate-400">Category</span>
                      <span className="text-slate-900 font-bold">{newQuestionCategory || 'Leadership'}</span>
                    </div>

                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-slate-400">Question Type</span>
                      <span className="text-slate-900 font-bold">{newQuestionType || 'Multiple Choice (Single Answer)'}</span>
                    </div>

                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-slate-400">Difficulty Level</span>
                      <span className="text-slate-900 font-bold">{newQuestionDifficulty || 'Medium'}</span>
                    </div>

                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-slate-400">Estimated Time</span>
                      <span className="text-slate-900 font-bold">{newQuestionTime || '1-2 minutes'}</span>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                      <span className="text-slate-400">Status</span>
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-extrabold">
                        Active
                      </span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* ASSESSMENT QUESTIONS TAB VIEW (MATCHES DESIGN SYSTEM) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'assessment-questions' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Header Title & Action Banner */}
            <div className="bg-gradient-to-r from-white via-indigo-50/40 to-purple-50/60 border border-slate-200/80 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
              <div className="relative z-10 flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Assessment Questions Management
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  Manage behavioral assessment rubrics, competency weights, and evaluation metrics across simulations.
                </p>
              </div>

              {/* Right Side: Hero Graphic & Action Button Container */}
              <div className="relative z-10 flex items-center space-x-4 shrink-0">
                <div className="hidden lg:block w-72 h-24 rounded-2xl overflow-hidden border border-slate-200/60 shadow-xs relative bg-indigo-900/10">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
                    alt="Assessment Engine"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-transparent to-transparent"></div>
                </div>

                <button
                  onClick={() => setShowAddCard(true)}
                  className="bg-[#5551ff] hover:bg-[#4440ee] text-white font-extrabold px-5 py-3 rounded-2xl shadow-lg shadow-indigo-500/25 flex items-center space-x-2 transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
                >
                  <Plus className="w-4.5 h-4.5" />
                  <span className="text-xs tracking-wide">Add Assessment Item</span>
                </button>
              </div>
            </div>

            {/* 4 Stat Cards Row with SVG Sparklines */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* Stat 1: Total Assessment Items */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-purple-100/80 text-[#5551ff] flex items-center justify-center shrink-0">
                      <FileCheck className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900 tracking-tight">150</div>
                      <div className="text-xs font-bold text-slate-400">Total Items</div>
                    </div>
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 font-black px-2 py-0.5 rounded-full text-xs">
                    ↑ 15%
                  </span>
                </div>
                {/* SVG Sparkline */}
                <div className="h-6 w-full overflow-hidden pt-1">
                  <svg className="w-full h-full text-[#5551ff]" viewBox="0 0 100 25" fill="none">
                    <path d="M0,20 Q25,5 50,15 T100,5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              </div>

              {/* Stat 2: Competencies Covered */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-sky-100/80 text-sky-600 flex items-center justify-center shrink-0">
                      <Target className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900 tracking-tight">8</div>
                      <div className="text-xs font-bold text-slate-400">Competencies</div>
                    </div>
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 font-black px-2 py-0.5 rounded-full text-xs">
                    ↑ 100%
                  </span>
                </div>
                {/* SVG Sparkline */}
                <div className="h-6 w-full overflow-hidden pt-1">
                  <svg className="w-full h-full text-emerald-500" viewBox="0 0 100 25" fill="none">
                    <path d="M0,22 Q30,12 60,18 T100,4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              </div>

              {/* Stat 3: Avg Competency Score */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-orange-100/80 text-orange-600 flex items-center justify-center shrink-0">
                      <Award className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900 tracking-tight">78%</div>
                      <div className="text-xs font-bold text-slate-400">Avg Score</div>
                    </div>
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 font-black px-2 py-0.5 rounded-full text-xs">
                    ↑ 9%
                  </span>
                </div>
                {/* SVG Sparkline */}
                <div className="h-6 w-full overflow-hidden pt-1">
                  <svg className="w-full h-full text-orange-500" viewBox="0 0 100 25" fill="none">
                    <path d="M0,18 Q35,8 70,16 T100,6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              </div>

              {/* Stat 4: Total Evaluations */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0">
                      <Users className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900 tracking-tight">3,120</div>
                      <div className="text-xs font-bold text-slate-400">Evaluations</div>
                    </div>
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 font-black px-2 py-0.5 rounded-full text-xs">
                    ↑ 24%
                  </span>
                </div>
                {/* SVG Sparkline */}
                <div className="h-6 w-full overflow-hidden pt-1">
                  <svg className="w-full h-full text-sky-500" viewBox="0 0 100 25" fill="none">
                    <path d="M0,20 Q25,8 50,16 T100,4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              </div>

            </div>

            {/* Filter Controls Bar */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-wrap lg:flex-nowrap items-center justify-between gap-3 text-xs font-semibold text-slate-700">
              
              <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[240px]">
                
                {/* Search */}
                <div className="relative flex-1 min-w-[200px]">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Search</label>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3.5 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      value={assessmentSearchQuery}
                      onChange={(e) => setAssessmentSearchQuery(e.target.value)}
                      placeholder="Search by assessment title, competency..."
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[#5551ff] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Competency Filter */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Competency</label>
                  <select
                    value={assessmentCompetencyFilter}
                    onChange={(e) => setAssessmentCompetencyFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                  >
                    <option value="All Competencies">All Competencies</option>
                    <option value="Inclusive Mindset">Inclusive Mindset</option>
                    <option value="Bias Awareness">Bias Awareness</option>
                    <option value="Cultural Safety">Cultural Safety</option>
                    <option value="Compensation Equity">Compensation Equity</option>
                    <option value="Allyship & Sponsorship">Allyship & Sponsorship</option>
                  </select>
                </div>

                {/* Assessment Type */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Assessment Type</label>
                  <select
                    value={assessmentTypeFilter}
                    onChange={(e) => setAssessmentTypeFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                  >
                    <option value="All Types">All Types</option>
                    <option value="Likert Scale (1-5)">Likert Scale (1-5)</option>
                    <option value="Behavioral Choice">Behavioral Choice</option>
                    <option value="Audit Checklist">Audit Checklist</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Status</label>
                  <select
                    value={assessmentStatusFilter}
                    onChange={(e) => setAssessmentStatusFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                  >
                    <option value="All Status">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 shrink-0 self-end">
                <button
                  onClick={() => {
                    setAssessmentSearchQuery('');
                    setAssessmentCompetencyFilter('All Competencies');
                    setAssessmentTypeFilter('All Types');
                    setAssessmentStatusFilter('All Status');
                  }}
                  className="px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all"
                >
                  Reset
                </button>
                <button className="px-5 py-2 bg-[#5551ff] hover:bg-[#4440ee] text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-xs transition-all">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Apply Filters</span>
                </button>
              </div>

            </div>

            {/* Main Content Grid: Left Table (2 cols) + Right Details Panel (1 col) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              {/* Left Column: Assessment Questions Table */}
              <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
                
                {/* Table Header Row */}
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-900">
                    Assessment Questions (150)
                  </h3>
                  <button className="px-3.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-xs transition-all">
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Export</span>
                  </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                        <th className="pb-3 px-2 w-8">#</th>
                        <th className="pb-3 px-3">TITLE & PURPOSE</th>
                        <th className="pb-3 px-3">COMPETENCY</th>
                        <th className="pb-3 px-3">TYPE</th>
                        <th className="pb-3 px-3">WEIGHT</th>
                        <th className="pb-3 px-3">AVG SCORE</th>
                        <th className="pb-3 px-3">STATUS</th>
                        <th className="pb-3 px-3 text-right">ACTIONS</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {assessmentQuestionsData.map((item, idx) => {
                        const isSelected = item.id === activeAssessmentQuestion.id;
                        return (
                          <tr
                            key={item.id}
                            onClick={() => setSelectedAssessmentId(item.id)}
                            className={`cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-indigo-50/50 border-l-4 border-[#5551ff]'
                                : 'hover:bg-slate-50/70'
                            }`}
                          >
                            <td className="py-3.5 px-2 font-bold text-slate-400 text-xs">
                              {idx + 1}
                            </td>

                            {/* Title & Subtitle */}
                            <td className="py-3.5 px-3">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={item.thumbnail}
                                  alt="Assessment"
                                  className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                                />
                                <div className="max-w-[200px]">
                                  <div className="font-extrabold text-slate-900 text-xs truncate">
                                    {item.title}
                                  </div>
                                  <div className="text-[10px] text-slate-400 font-medium truncate mt-0.5">
                                    {item.subtitle}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Competency Badge */}
                            <td className="py-3.5 px-3">
                              <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-extrabold border ${item.competencyBadge}`}>
                                {item.competency}
                              </span>
                            </td>

                            {/* Type */}
                            <td className="py-3.5 px-3 font-semibold text-slate-700 text-xs whitespace-nowrap">
                              {item.type}
                            </td>

                            {/* Weight */}
                            <td className="py-3.5 px-3 font-extrabold text-[#5551ff] text-xs">
                              {item.weight}
                            </td>

                            {/* Avg Score Progress Bar */}
                            <td className="py-3.5 px-3">
                              <div className="space-y-1 w-24">
                                <div className="text-[11px] font-black text-slate-900">
                                  {item.avgScore}
                                </div>
                                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-[#5551ff] rounded-full"
                                    style={{ width: `${item.avgScorePercent}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>

                            {/* Status Badge */}
                            <td className="py-3.5 px-3">
                              <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase ${item.statusBadge}`}>
                                {item.status}
                              </span>
                            </td>

                            {/* Actions */}
                            <td className="py-3.5 px-3 text-right">
                              <div className="flex items-center justify-end space-x-1.5" onClick={(e) => e.stopPropagation()}>
                                <button
                                  onClick={() => setSelectedAssessmentId(item.id)}
                                  className="px-3 py-1 bg-indigo-50 hover:bg-[#5551ff] text-[#5551ff] hover:text-white rounded-lg text-xs font-extrabold transition-all"
                                >
                                  View
                                </button>
                                <button className="p-1 hover:bg-slate-200 rounded-md text-slate-400 hover:text-slate-600 transition-colors">
                                  <MoreVertical className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer / Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-slate-100 text-xs font-semibold text-slate-500 gap-3">
                  <div>Showing 1-8 of 150 assessment items</div>

                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1.5">
                      <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-400">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button className="w-7 h-7 rounded-lg bg-[#5551ff] text-white font-black flex items-center justify-center">
                        1
                      </button>
                      <button className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center">
                        2
                      </button>
                      <button className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center">
                        3
                      </button>
                      <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-400">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <select className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-700">
                      <option>8 per page</option>
                      <option>16 per page</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Right Column: Assessment Details & Competency Rubric Panel */}
              <div className="lg:col-span-1 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-5 sticky top-6">
                
                {/* Panel Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-black text-slate-900">Competency Rubric</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${activeAssessmentQuestion.statusBadge}`}>
                    {activeAssessmentQuestion.status}
                  </span>
                </div>

                {/* Active Assessment Title & Description */}
                <div>
                  <h4 className="text-base font-black text-slate-900 tracking-tight leading-snug">
                    {activeAssessmentQuestion.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">
                    {activeAssessmentQuestion.subtitle}
                  </p>
                </div>

                {/* 3 Key Metric Boxes */}
                <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
                  
                  <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-2.5 space-y-0.5">
                    <Target className="w-3.5 h-3.5 text-[#5551ff] mx-auto" />
                    <div className="font-extrabold text-slate-900 text-[11px] truncate">{activeAssessmentQuestion.competency}</div>
                    <div className="text-[9px] font-bold text-slate-400 uppercase">Competency</div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-2.5 space-y-0.5">
                    <Award className="w-3.5 h-3.5 text-emerald-600 mx-auto" />
                    <div className="font-extrabold text-slate-900 text-[11px]">{activeAssessmentQuestion.weight}</div>
                    <div className="text-[9px] font-bold text-slate-400 uppercase">Weight</div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-2.5 space-y-0.5">
                    <Users className="w-3.5 h-3.5 text-sky-600 mx-auto" />
                    <div className="font-extrabold text-slate-900 text-[11px]">{activeAssessmentQuestion.evaluations}</div>
                    <div className="text-[9px] font-bold text-slate-400 uppercase">Evaluations</div>
                  </div>

                </div>

                {/* Rubric Evaluation Criteria List */}
                <div className="space-y-3 pt-1">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Evaluation Rubric Criteria</h4>
                  
                  <div className="space-y-2 text-xs text-slate-700 font-medium">
                    {activeAssessmentQuestion.rubric.map((criterion, cIdx) => (
                      <div key={cIdx} className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-start space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{criterion}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="flex items-center space-x-3 pt-2">
                  <button className="flex-1 py-2.5 px-3 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-extrabold text-xs transition-all shadow-xs flex items-center justify-center space-x-1.5">
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Duplicate Item</span>
                  </button>
                  <button className="flex-1 py-2.5 px-3 rounded-2xl bg-[#5551ff] hover:bg-[#4440ee] text-white font-extrabold text-xs transition-all shadow-md shadow-indigo-500/20 flex items-center justify-center space-x-1.5">
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit Rubric</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* CASE STUDIES MANAGEMENT TAB VIEW (MATCHES REFERENCE IMAGE) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'case-studies' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Header Title & Action Banner */}
            <div className="bg-gradient-to-r from-white via-indigo-50/40 to-purple-50/60 border border-slate-200/80 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
              <div className="relative z-10 flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Case Study Management
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  Create, edit, and manage real-world case studies to inspire and educate players.
                </p>
              </div>

              {/* Right Side: Hero Graphic & Action Button Container */}
              <div className="relative z-10 flex items-center space-x-4 shrink-0">
                <div className="hidden lg:block w-72 h-24 rounded-2xl overflow-hidden border border-slate-200/60 shadow-xs relative bg-indigo-900/10">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
                    alt="Case Studies Management"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-transparent to-transparent"></div>
                </div>

                <button
                  onClick={() => setShowAddCard(true)}
                  className="bg-[#5551ff] hover:bg-[#4440ee] text-white font-extrabold px-5 py-3 rounded-2xl shadow-lg shadow-indigo-500/25 flex items-center space-x-2 transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
                >
                  <Plus className="w-4.5 h-4.5" />
                  <span className="text-xs tracking-wide">Add Case Study</span>
                </button>
              </div>
            </div>

            {/* 4 Stat Metric Cards (With SVG Sparklines) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Stat 1: Total Case Studies */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-rose-100/80 text-rose-600 flex items-center justify-center shrink-0">
                      <BookOpen className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900 tracking-tight">36</div>
                      <div className="text-xs font-bold text-slate-400">Total Case Studies</div>
                    </div>
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 font-black px-2 py-0.5 rounded-full text-xs">
                    ↑ 20%
                  </span>
                </div>
                {/* SVG Sparkline */}
                <div className="h-6 w-full overflow-hidden pt-1">
                  <svg className="w-full h-full text-[#5551ff]" viewBox="0 0 100 25" fill="none">
                    <path d="M0,20 Q25,5 50,15 T100,5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              </div>

              {/* Stat 2: Total Views */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-sky-100/80 text-sky-600 flex items-center justify-center shrink-0">
                      <Users className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900 tracking-tight">3,120</div>
                      <div className="text-xs font-bold text-slate-400">Total Views</div>
                    </div>
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 font-black px-2 py-0.5 rounded-full text-xs">
                    ↑ 18%
                  </span>
                </div>
                {/* SVG Sparkline */}
                <div className="h-6 w-full overflow-hidden pt-1">
                  <svg className="w-full h-full text-emerald-500" viewBox="0 0 100 25" fill="none">
                    <path d="M0,18 Q30,8 60,16 T100,6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              </div>

              {/* Stat 3: Completion Rate */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-100/80 text-[#5551ff] flex items-center justify-center shrink-0">
                      <GraduationCap className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900 tracking-tight">86%</div>
                      <div className="text-xs font-bold text-slate-400">Completion Rate</div>
                    </div>
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 font-black px-2 py-0.5 rounded-full text-xs">
                    ↑ 12%
                  </span>
                </div>
                {/* SVG Sparkline */}
                <div className="h-6 w-full overflow-hidden pt-1">
                  <svg className="w-full h-full text-orange-500" viewBox="0 0 100 25" fill="none">
                    <path d="M0,16 Q35,6 70,18 T100,8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              </div>

              {/* Stat 4: Avg. Rating */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-amber-100/80 text-amber-500 flex items-center justify-center shrink-0">
                      <Star className="w-5.5 h-5.5 fill-amber-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900 tracking-tight">4.6</div>
                      <div className="text-xs font-bold text-slate-400">Avg. Rating</div>
                    </div>
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 font-black px-2 py-0.5 rounded-full text-xs">
                    ↑ 8%
                  </span>
                </div>
                {/* SVG Sparkline */}
                <div className="h-6 w-full overflow-hidden pt-1">
                  <svg className="w-full h-full text-sky-500" viewBox="0 0 100 25" fill="none">
                    <path d="M0,22 Q25,10 50,18 T100,6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              </div>

            </div>

            {/* Filter Controls Bar */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-wrap lg:flex-nowrap items-center justify-between gap-3 text-xs font-semibold text-slate-700">
              
              <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[240px]">
                
                {/* Search */}
                <div className="relative flex-1 min-w-[200px]">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Search</label>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3.5 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      value={caseStudySearchQuery}
                      onChange={(e) => setCaseStudySearchQuery(e.target.value)}
                      placeholder="Search by title, organization, topic..."
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[#5551ff] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Category</label>
                  <select
                    value={caseStudyCategoryFilter}
                    onChange={(e) => setCaseStudyCategoryFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                  >
                    <option value="All Categories">All Categories</option>
                    <option value="Leadership">Leadership</option>
                    <option value="Diversity">Diversity</option>
                    <option value="Workplace Culture">Workplace Culture</option>
                    <option value="Flexible Work">Flexible Work</option>
                    <option value="Recruitment">Recruitment</option>
                    <option value="Women Employment">Women Employment</option>
                  </select>
                </div>

                {/* Related Module Filter */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Related Module</label>
                  <select
                    value={caseStudyModuleFilter}
                    onChange={(e) => setCaseStudyModuleFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                  >
                    <option value="All Modules">All Modules</option>
                    <option value="Introduction to Inclusive Leadership">Introduction to Inclusive Leadership</option>
                    <option value="Unconscious Bias Awareness">Unconscious Bias Awareness</option>
                    <option value="Diversity in Leadership">Diversity in Leadership</option>
                    <option value="Flexible Work Strategies">Flexible Work Strategies</option>
                  </select>
                </div>

                {/* Difficulty Level Filter */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Difficulty Level</label>
                  <select
                    value={caseStudyLevelFilter}
                    onChange={(e) => setCaseStudyLevelFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                  >
                    <option value="All Levels">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Status</label>
                  <select
                    value={caseStudyStatusFilter}
                    onChange={(e) => setCaseStudyStatusFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                  >
                    <option value="All Status">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 shrink-0 pt-3 lg:pt-0">
                <button
                  onClick={() => {
                    setCaseStudySearchQuery('');
                    setCaseStudyCategoryFilter('All Categories');
                    setCaseStudyModuleFilter('All Modules');
                    setCaseStudyLevelFilter('All Levels');
                    setCaseStudyStatusFilter('All Status');
                  }}
                  className="px-3.5 py-2 text-slate-500 hover:text-slate-900 font-bold text-xs hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Reset
                </button>

                <button className="px-4 py-2 bg-[#5551ff] hover:bg-[#4440ee] text-white text-xs font-extrabold rounded-xl shadow-md shadow-indigo-500/20 flex items-center space-x-1.5 transition-all">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Apply Filters</span>
                </button>
              </div>

            </div>

            {/* Main Content Layout: Table (2 cols) + Right Detail Panel (1 col) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              {/* Left Column: Case Studies Table Card (2 cols) */}
              <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
                
                {/* Table Header Row */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-base font-black text-slate-900">Case Studies (36)</h3>
                  </div>

                  <button className="px-3 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-xs transition-all">
                    <Download className="w-3.5 h-3.5 text-[#5551ff]" />
                    <span>Export</span>
                  </button>
                </div>

                {/* Data Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                        <th className="py-3 px-2 w-8">
                          <input type="checkbox" className="rounded border-slate-300 text-[#5551ff] focus:ring-[#5551ff]" />
                        </th>
                        <th className="py-3 px-2 w-8">#</th>
                        <th className="py-3 px-3">TITLE</th>
                        <th className="py-3 px-3">ORGANIZATION</th>
                        <th className="py-3 px-3">CATEGORY</th>
                        <th className="py-3 px-3">LEVEL</th>
                        <th className="py-3 px-3">COMPLETION RATE</th>
                        <th className="py-3 px-3">STATUS</th>
                        <th className="py-3 px-3 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700 font-semibold">
                      {caseStudiesData.map((item, index) => {
                        const isSelected = item.id === activeCaseStudy.id;

                        return (
                          <tr
                            key={item.id}
                            onClick={() => setSelectedCaseStudyId(item.id)}
                            className={`cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-purple-50/40 border-l-4 border-[#5551ff]'
                                : 'hover:bg-slate-50/80'
                            }`}
                          >
                            <td className="py-3.5 px-2" onClick={(e) => e.stopPropagation()}>
                              <input type="checkbox" className="rounded border-slate-300 text-[#5551ff] focus:ring-[#5551ff]" />
                            </td>

                            <td className="py-3.5 px-2 font-bold text-slate-400">
                              {index + 1}
                            </td>

                            <td className="py-3.5 px-3 min-w-[220px]">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={item.thumbnail}
                                  alt={item.title}
                                  className="w-10 h-10 rounded-xl object-cover shrink-0 border border-slate-200/80 shadow-2xs"
                                />
                                <div>
                                  <div className="font-extrabold text-slate-900 leading-tight hover:text-[#5551ff] transition-colors">
                                    {item.title}
                                  </div>
                                  <div className="text-[10px] text-slate-400 font-medium truncate max-w-[170px] mt-0.5">
                                    {item.subtitle}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="py-3.5 px-3 font-bold text-slate-900">
                              {item.organization}
                            </td>

                            <td className="py-3.5 px-3">
                              <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold whitespace-nowrap ${item.categoryBadge}`}>
                                {item.category}
                              </span>
                            </td>

                            <td className="py-3.5 px-3">
                              <span className={`text-[11px] ${item.levelBadge}`}>
                                {item.level}
                              </span>
                            </td>

                            <td className="py-3.5 px-3 min-w-[120px]">
                              <div className="space-y-1">
                                <div className="text-slate-900 font-extrabold text-[11px]">{item.completionRate}%</div>
                                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                  <div
                                    className="bg-[#5551ff] h-1.5 rounded-full"
                                    style={{ width: `${item.completionRate}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>

                            <td className="py-3.5 px-3">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase whitespace-nowrap ${item.statusBadge}`}>
                                {item.status}
                              </span>
                            </td>

                            <td className="py-3.5 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-end space-x-1">
                                <button className="px-2.5 py-1 text-[#5551ff] hover:bg-purple-100/60 rounded-lg text-xs font-extrabold transition-colors">
                                  Edit
                                </button>
                                <button className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                                  <MoreVertical className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer / Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-slate-100 text-xs font-semibold text-slate-500 gap-3">
                  <div>Showing 1-8 of 36 case studies</div>

                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1.5">
                      <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-400">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button className="w-7 h-7 rounded-lg bg-[#5551ff] text-white font-black flex items-center justify-center">
                        1
                      </button>
                      <button className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center">
                        2
                      </button>
                      <button className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center">
                        3
                      </button>
                      <span className="text-slate-400 px-1 font-bold">...</span>
                      <button className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center">
                        5
                      </button>
                      <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-400">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <select className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-700">
                      <option>8 per page</option>
                      <option>16 per page</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Right Column: Case Study Detail Preview Panel */}
              <div className="lg:col-span-1 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-5 sticky top-6">
                
                {/* Panel Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-black text-slate-900">Case Study Preview</h3>
                  <button className="px-3 py-1 border border-indigo-200 bg-indigo-50/60 hover:bg-[#5551ff] text-[#5551ff] hover:text-white rounded-lg text-xs font-extrabold flex items-center space-x-1.5 transition-all">
                    <Monitor className="w-3.5 h-3.5" />
                    <span>View in Game</span>
                  </button>
                </div>

                {/* Featured Banner Image */}
                <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs group">
                  <img
                    src={activeCaseStudy.bannerImg}
                    alt={activeCaseStudy.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent flex items-end p-4">
                    <div className="text-white font-black text-sm drop-shadow-md">
                      <div className="text-xs uppercase tracking-widest text-sky-300 font-extrabold">{activeCaseStudy.organization}</div>
                      <div className="leading-tight">{activeCaseStudy.title.split(':')[1] || activeCaseStudy.title}</div>
                    </div>
                  </div>
                </div>

                {/* Case Study Title & Category */}
                <div className="space-y-2">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold ${activeCaseStudy.categoryBadge}`}>
                    {activeCaseStudy.category}
                  </span>

                  <h4 className="text-base font-black text-slate-900 tracking-tight leading-snug">
                    {activeCaseStudy.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    Explore how {activeCaseStudy.organization} has implemented inclusive policies and practices to create a more equitable and diverse workplace.
                  </p>
                </div>

                {/* 4 Metric Highlights Bar */}
                <div className="grid grid-cols-4 gap-2 bg-slate-50/80 border border-slate-200/60 rounded-2xl p-3 text-center text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-center text-[#5551ff]">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="font-extrabold text-slate-900 text-[11px]">{activeCaseStudy.readTime}</div>
                    <div className="text-[9px] text-slate-400 font-bold">Read Time</div>
                  </div>

                  <div className="space-y-0.5 border-l border-slate-200/60">
                    <div className="flex items-center justify-center text-emerald-500">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div className="font-extrabold text-slate-900 text-[11px]">{activeCaseStudy.level}</div>
                    <div className="text-[9px] text-slate-400 font-bold">Level</div>
                  </div>

                  <div className="space-y-0.5 border-l border-slate-200/60">
                    <div className="flex items-center justify-center text-sky-500">
                      <Users className="w-4 h-4" />
                    </div>
                    <div className="font-extrabold text-slate-900 text-[11px]">{activeCaseStudy.completionRate}%</div>
                    <div className="text-[9px] text-slate-400 font-bold">Completion Rate</div>
                  </div>

                  <div className="space-y-0.5 border-l border-slate-200/60">
                    <div className="flex items-center justify-center text-amber-500">
                      <Star className="w-4 h-4 fill-amber-500" />
                    </div>
                    <div className="font-extrabold text-slate-900 text-[11px]">{activeCaseStudy.rating}</div>
                    <div className="text-[9px] text-slate-400 font-bold">Rating</div>
                  </div>
                </div>

                {/* Detail Sub-Tabs (Overview, Key Learnings, Discussion Points, Related Content) */}
                <div className="space-y-3">
                  <div className="border-b border-slate-100 flex items-center space-x-4 text-xs font-bold text-slate-400">
                    <button
                      onClick={() => setCaseStudyPreviewTab('overview')}
                      className={`pb-2 border-b-2 transition-all ${
                        caseStudyPreviewTab === 'overview'
                          ? 'border-[#5551ff] text-[#5551ff] font-extrabold'
                          : 'border-transparent hover:text-slate-600'
                      }`}
                    >
                      Overview
                    </button>

                    <button
                      onClick={() => setCaseStudyPreviewTab('learnings')}
                      className={`pb-2 border-b-2 transition-all ${
                        caseStudyPreviewTab === 'learnings'
                          ? 'border-[#5551ff] text-[#5551ff] font-extrabold'
                          : 'border-transparent hover:text-slate-600'
                      }`}
                    >
                      Key Learnings
                    </button>

                    <button
                      onClick={() => setCaseStudyPreviewTab('discussion')}
                      className={`pb-2 border-b-2 transition-all ${
                        caseStudyPreviewTab === 'discussion'
                          ? 'border-[#5551ff] text-[#5551ff] font-extrabold'
                          : 'border-transparent hover:text-slate-600'
                      }`}
                    >
                      Discussion Points
                    </button>

                    <button
                      onClick={() => setCaseStudyPreviewTab('related')}
                      className={`pb-2 border-b-2 transition-all ${
                        caseStudyPreviewTab === 'related'
                          ? 'border-[#5551ff] text-[#5551ff] font-extrabold'
                          : 'border-transparent hover:text-slate-600'
                      }`}
                    >
                      Related Content
                    </button>
                  </div>

                  {/* Sub-Tab Content */}
                  <div className="space-y-3">
                    {caseStudyPreviewTab === 'overview' && (
                      <div className="space-y-2.5">
                        <h5 className="text-xs font-black text-slate-900">Key Topics Covered</h5>
                        <div className="space-y-2">
                          {activeCaseStudy.keyTopics.map((topic, tIdx) => (
                            <div key={tIdx} className="flex items-start space-x-2.5 text-xs text-slate-700 font-semibold">
                              <CheckCircle2 className="w-4 h-4 text-[#5551ff] shrink-0 mt-0.5" />
                              <span className="leading-snug">{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {caseStudyPreviewTab === 'learnings' && (
                      <div className="space-y-2.5">
                        <h5 className="text-xs font-black text-slate-900">Strategic Learnings</h5>
                        <div className="space-y-2">
                          {activeCaseStudy.keyLearnings.map((learning, lIdx) => (
                            <div key={lIdx} className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-700 font-medium leading-relaxed">
                              {learning}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {caseStudyPreviewTab === 'discussion' && (
                      <div className="space-y-2.5">
                        <h5 className="text-xs font-black text-slate-900">Player Discussion Prompts</h5>
                        <div className="space-y-2">
                          {activeCaseStudy.discussionPoints.map((point, pIdx) => (
                            <div key={pIdx} className="p-3 bg-purple-50/50 border border-purple-100 rounded-xl text-xs text-slate-800 font-semibold leading-snug">
                              💬 "{point}"
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {caseStudyPreviewTab === 'related' && (
                      <div className="space-y-2.5">
                        <h5 className="text-xs font-black text-slate-900">Linked Modules</h5>
                        <div className="flex flex-wrap gap-2">
                          {activeCaseStudy.relatedContent.map((rel, rIdx) => (
                            <span key={rIdx} className="px-3 py-1.5 bg-slate-100 rounded-xl text-xs font-bold text-slate-700 border border-slate-200/60">
                              📚 {rel}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="flex items-center space-x-3 pt-2">
                  <button className="flex-1 py-2.5 px-3 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-extrabold text-xs transition-all shadow-xs flex items-center justify-center space-x-1.5">
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Duplicate Case Study</span>
                  </button>
                  <button className="flex-1 py-2.5 px-3 rounded-2xl bg-[#5551ff] hover:bg-[#4440ee] text-white font-extrabold text-xs transition-all shadow-md shadow-indigo-500/20 flex items-center justify-center space-x-1.5">
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit Case Study</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* REPORTS & INSIGHTS TAB VIEW (MATCHES REFERENCE IMAGE) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'reports' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Header Title & Action Banner */}
            <div className="bg-gradient-to-r from-white via-indigo-50/40 to-purple-50/60 border border-slate-200/80 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
              <div className="relative z-10 flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Reports & Insights
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  Comprehensive analytics and reports to measure learning outcomes, inclusion impact, and platform engagement.
                </p>
              </div>

              <div className="relative z-10 flex items-center space-x-3 shrink-0">
                <button className="bg-[#5551ff] text-white flex items-center space-x-2 px-4 py-2.5 rounded-2xl shadow-md text-xs font-bold hover:bg-[#4440ee] transition-all">
                  <Plus className="w-4 h-4" />
                  <span>Generate Custom Report</span>
                </button>
              </div>

              {/* Decorative top-right graphic illustration background */}
              <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none bg-gradient-to-l from-indigo-500/30 to-transparent" />
            </div>

            {/* Metric Stat Cards (Row of 5) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Stat 1: Total Players */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-4 shadow-xs flex items-center justify-between transition-all hover:shadow-md">
                <div className="flex items-center space-x-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-purple-100/80 text-[#5551ff] flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-slate-900 tracking-tight">3,120</div>
                    <div className="text-[11px] font-bold text-slate-400">Total Players</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[11px] font-black text-emerald-600">↑ 22%</span>
                  <svg className="w-10 h-4 text-purple-500 mt-1" viewBox="0 0 50 20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M0 16 Q 20 10, 35 14 T 50 4" />
                  </svg>
                </div>
              </div>

              {/* Stat 2: Learning Completion */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-4 shadow-xs flex items-center justify-between transition-all hover:shadow-md">
                <div className="flex items-center space-x-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-blue-100/80 text-blue-600 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-slate-900 tracking-tight">86%</div>
                    <div className="text-[11px] font-bold text-slate-400">Learning Completion</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[11px] font-black text-emerald-600">↑ 18%</span>
                  <svg className="w-10 h-4 text-emerald-500 mt-1" viewBox="0 0 50 20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M0 15 Q 15 12, 30 14 T 50 5" />
                  </svg>
                </div>
              </div>

              {/* Stat 3: Avg Inclusion Score */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-4 shadow-xs flex items-center justify-between transition-all hover:shadow-md">
                <div className="flex items-center space-x-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-red-100/80 text-red-500 flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-slate-900 tracking-tight">78%</div>
                    <div className="text-[11px] font-bold text-slate-400">Avg. Inclusion Score</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[11px] font-black text-emerald-600">↑ 12%</span>
                  <svg className="w-10 h-4 text-amber-500 mt-1" viewBox="0 0 50 20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M0 14 Q 20 8, 35 12 T 50 6" />
                  </svg>
                </div>
              </div>

              {/* Stat 4: Organizations */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-4 shadow-xs flex items-center justify-between transition-all hover:shadow-md">
                <div className="flex items-center space-x-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-blue-100/80 text-blue-500 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-slate-900 tracking-tight">52</div>
                    <div className="text-[11px] font-bold text-slate-400">Organizations</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[11px] font-black text-emerald-600">↑ 15%</span>
                  <svg className="w-10 h-4 text-blue-500 mt-1" viewBox="0 0 50 20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M0 16 Q 15 10, 30 13 T 50 2" />
                  </svg>
                </div>
              </div>

              {/* Stat 5: Total Game Sessions */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-4 shadow-xs flex items-center justify-between transition-all hover:shadow-md">
                <div className="flex items-center space-x-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-purple-100/80 text-[#5551ff] flex items-center justify-center shrink-0">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-slate-900 tracking-tight">1,248</div>
                    <div className="text-[11px] font-bold text-slate-400">Total Game Sessions</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[11px] font-black text-emerald-600">↑ 28%</span>
                  <svg className="w-10 h-4 text-purple-500 mt-1" viewBox="0 0 50 20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M0 18 Q 12 12, 30 8 T 50 2" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Filter Control Bar */}
            <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 flex-1 min-w-0">
                
                {/* Report Type */}
                <div className="relative min-w-[140px]">
                  <span className="block text-[9px] font-black text-slate-400 uppercase mb-0.5">Report Type</span>
                  <select
                    value={reportTypeFilter}
                    onChange={(e) => setReportTypeFilter(e.target.value)}
                    className="w-full appearance-none pl-3 pr-7 py-1.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:border-[#5551ff]"
                  >
                    <option value="All Reports">All Reports</option>
                    <option value="Inclusion Metrics">Inclusion Metrics</option>
                    <option value="Learning Analytics">Learning Analytics</option>
                    <option value="Organization Analytics">Organization Analytics</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2.5 bottom-2 text-slate-400 pointer-events-none" />
                </div>

                {/* Date Range */}
                <div className="relative min-w-[150px]">
                  <span className="block text-[9px] font-black text-slate-400 uppercase mb-0.5">Date Range</span>
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select
                      value={reportDateRange}
                      onChange={(e) => setReportDateRange(e.target.value)}
                      className="w-full appearance-none pl-8 pr-7 py-1.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:border-[#5551ff]"
                    >
                      <option value="Jan 2024 - Oct 2024">Jan 2024 - Oct 2024</option>
                      <option value="Last 30 Days">Last 30 Days</option>
                      <option value="Last 90 Days">Last 90 Days</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Organization */}
                <div className="relative min-w-[140px]">
                  <span className="block text-[9px] font-black text-slate-400 uppercase mb-0.5">Organization</span>
                  <select
                    value={reportOrgFilter}
                    onChange={(e) => setReportOrgFilter(e.target.value)}
                    className="w-full appearance-none pl-3 pr-7 py-1.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:border-[#5551ff]"
                  >
                    <option value="All Organizations">All Organizations</option>
                    <option value="TCS">TCS</option>
                    <option value="Accenture">Accenture</option>
                    <option value="Infosys">Infosys</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2.5 bottom-2 text-slate-400 pointer-events-none" />
                </div>

                {/* User Role */}
                <div className="relative min-w-[120px]">
                  <span className="block text-[9px] font-black text-slate-400 uppercase mb-0.5">User Role</span>
                  <select
                    value={reportRoleFilter}
                    onChange={(e) => setReportRoleFilter(e.target.value)}
                    className="w-full appearance-none pl-3 pr-7 py-1.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:border-[#5551ff]"
                  >
                    <option value="All Roles">All Roles</option>
                    <option value="Player">Player</option>
                    <option value="Partner Admin">Partner Admin</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2.5 bottom-2 text-slate-400 pointer-events-none" />
                </div>

                {/* Game Mode */}
                <div className="relative min-w-[120px]">
                  <span className="block text-[9px] font-black text-slate-400 uppercase mb-0.5">Game Mode</span>
                  <select
                    value={reportGameModeFilter}
                    onChange={(e) => setReportGameModeFilter(e.target.value)}
                    className="w-full appearance-none pl-3 pr-7 py-1.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:border-[#5551ff]"
                  >
                    <option value="All Modes">All Modes</option>
                    <option value="Single Player">Single Player</option>
                    <option value="Multiplayer">Multiplayer</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2.5 bottom-2 text-slate-400 pointer-events-none" />
                </div>

              </div>

              <div className="flex items-center space-x-2 shrink-0 pt-3">
                <button
                  onClick={() => {
                    setReportTypeFilter('All Reports');
                    setReportDateRange('Jan 2024 - Oct 2024');
                    setReportOrgFilter('All Organizations');
                    setReportRoleFilter('All Roles');
                    setReportGameModeFilter('All Modes');
                  }}
                  className="px-3 py-1.5 text-xs font-extrabold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Reset
                </button>
                <button className="bg-[#5551ff] text-white flex items-center space-x-1.5 px-4 py-2 rounded-2xl shadow-xs text-xs font-bold hover:bg-[#4440ee] transition-all">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Apply Filters</span>
                </button>
              </div>

            </div>

            {/* Grid Row 1 (3 Analytics Cards) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Card 1: Learning Progress Report (Dual Bar Chart) */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#5551ff] flex items-center justify-center shrink-0">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-900 leading-tight">Learning Progress Report</h3>
                      <p className="text-[10px] text-slate-400 font-medium">Track module completion and learning outcomes across organizations.</p>
                    </div>
                  </div>
                  <button className="text-[11px] text-[#5551ff] font-extrabold hover:underline shrink-0">View Details</button>
                </div>

                {/* SVG Dual Bar Chart */}
                <div className="pt-2">
                  <div className="h-44 w-full relative">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 300 120" preserveAspectRatio="none">
                      {/* Horizontal Grid lines */}
                      <line x1="0" y1="0" x2="300" y2="0" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="0" y1="30" x2="300" y2="30" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="0" y1="60" x2="300" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="0" y1="90" x2="300" y2="90" stroke="#f1f5f9" strokeWidth="1" />

                      {/* Y-axis Labels */}
                      <text x="-5" y="5" className="text-[8px] fill-slate-400 font-bold" textAnchor="end">100%</text>
                      <text x="-5" y="35" className="text-[8px] fill-slate-400 font-bold" textAnchor="end">75%</text>
                      <text x="-5" y="65" className="text-[8px] fill-slate-400 font-bold" textAnchor="end">50%</text>
                      <text x="-5" y="95" className="text-[8px] fill-slate-400 font-bold" textAnchor="end">25%</text>
                      <text x="-5" y="120" className="text-[8px] fill-slate-400 font-bold" textAnchor="end">0%</text>

                      {/* Bars for 10 months */}
                      {[
                        { month: 'Jan', started: 25, completed: 15 },
                        { month: 'Feb', started: 35, completed: 22 },
                        { month: 'Mar', started: 52, completed: 35 },
                        { month: 'Apr', started: 62, completed: 45 },
                        { month: 'May', started: 68, completed: 50 },
                        { month: 'Jun', started: 72, completed: 55 },
                        { month: 'Jul', started: 78, completed: 60 },
                        { month: 'Aug', started: 82, completed: 66 },
                        { month: 'Sep', started: 88, completed: 72 },
                        { month: 'Oct', started: 95, completed: 82 }
                      ].map((d, i) => {
                        const x = i * 30 + 10;
                        const startH = (d.started / 100) * 120;
                        const compH = (d.completed / 100) * 120;
                        return (
                          <g key={i}>
                            {/* Started Bar (Light Purple) */}
                            <rect x={x} y={120 - startH} width="10" height={startH} rx="2" fill="#c7d2fe" />
                            {/* Completed Bar (Solid Purple) */}
                            <rect x={x + 11} y={120 - compH} width="10" height={compH} rx="2" fill="#5551ff" />
                            {/* X Month Label */}
                            <text x={x + 10} y="132" className="text-[8px] fill-slate-400 font-bold" textAnchor="middle">{d.month}</text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Chart Legend */}
                  <div className="flex items-center justify-center space-x-6 text-[10px] font-bold text-slate-500 pt-5">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#c7d2fe]" />
                      <span>Modules Started</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#5551ff]" />
                      <span>Modules Completed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Inclusion Impact Analysis (Multi-Line Chart) */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-xl bg-red-100 text-red-500 flex items-center justify-center shrink-0">
                      <Target className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-900 leading-tight">Inclusion Impact Analysis</h3>
                      <p className="text-[10px] text-slate-400 font-medium">Measure inclusion awareness and behavioral change.</p>
                    </div>
                  </div>
                  <button className="text-[11px] text-[#5551ff] font-extrabold hover:underline shrink-0">View Details</button>
                </div>

                {/* Multi-Line Chart SVG */}
                <div className="pt-2">
                  <div className="h-44 w-full relative">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 300 120" preserveAspectRatio="none">
                      <line x1="0" y1="0" x2="300" y2="0" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="0" y1="30" x2="300" y2="30" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="0" y1="60" x2="300" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="0" y1="90" x2="300" y2="90" stroke="#f1f5f9" strokeWidth="1" />

                      <text x="-5" y="5" className="text-[8px] fill-slate-400 font-bold" textAnchor="end">100%</text>
                      <text x="-5" y="35" className="text-[8px] fill-slate-400 font-bold" textAnchor="end">75%</text>
                      <text x="-5" y="65" className="text-[8px] fill-slate-400 font-bold" textAnchor="end">50%</text>
                      <text x="-5" y="95" className="text-[8px] fill-slate-400 font-bold" textAnchor="end">25%</text>
                      <text x="-5" y="120" className="text-[8px] fill-slate-400 font-bold" textAnchor="end">0%</text>

                      {/* Overall Line (Purple) */}
                      <path d="M 0,70 Q 30,62 60,52 T 120,42 T 180,32 T 240,25 T 300,20" fill="none" stroke="#5551ff" strokeWidth="2" />
                      {/* Gender Equality (Blue) */}
                      <path d="M 0,80 Q 30,72 60,60 T 120,50 T 180,40 T 240,32 T 300,26" fill="none" stroke="#3b82f6" strokeWidth="2" />
                      {/* Diversity & Inclusion (Emerald) */}
                      <path d="M 0,90 Q 30,82 60,72 T 120,62 T 180,52 T 240,45 T 300,38" fill="none" stroke="#10b981" strokeWidth="2" />
                      {/* Equal Opportunities (Amber) */}
                      <path d="M 0,100 Q 30,92 60,84 T 120,74 T 180,68 T 240,60 T 300,55" fill="none" stroke="#f59e0b" strokeWidth="2" />

                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'].map((m, i) => (
                        <text key={i} x={i * 30 + 10} y="132" className="text-[8px] fill-slate-400 font-bold" textAnchor="middle">{m}</text>
                      ))}
                    </svg>
                  </div>

                  {/* Multi-line Legend */}
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-500 pt-5">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#5551ff]" />
                      <span>Overall</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]" />
                      <span>Gender Equality</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                      <span>Diversity & Inclusion</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                      <span>Equal Opportunities</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Organization Performance (Horizontal Bar Chart) */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-900 leading-tight">Organization Performance</h3>
                      <p className="text-[10px] text-slate-400 font-medium">Compare performance across partner organizations.</p>
                    </div>
                  </div>
                  <button className="text-[11px] text-[#5551ff] font-extrabold hover:underline shrink-0">View Details</button>
                </div>

                {/* Horizontal Bar Chart */}
                <div className="space-y-2.5 pt-1">
                  <div className="flex justify-end text-[9px] font-bold text-slate-400 uppercase pr-1">Avg. Inclusion Score</div>
                  {[
                    { name: 'Accenture', score: 84 },
                    { name: 'TCS', score: 78 },
                    { name: 'Infosys', score: 76 },
                    { name: 'Deloitte', score: 72 },
                    { name: 'Wipro', score: 70 },
                    { name: 'HCL', score: 68 },
                    { name: 'IBM', score: 65 },
                    { name: 'Capgemini', score: 62 }
                  ].map((org, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs">
                      <div className="w-5 h-5 rounded-lg bg-purple-100 text-[#5551ff] flex items-center justify-center shrink-0 font-bold text-[10px]">
                        {org.name[0]}
                      </div>
                      <span className="font-bold text-slate-700 w-16 truncate">{org.name}</span>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#5551ff] rounded-full" style={{ width: `${org.score}%` }} />
                      </div>
                      <span className="font-extrabold text-slate-900 text-[11px] w-7 text-right">{org.score}%</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Grid Row 2 (Middle 3 Analytics Cards) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Card 1: Game Session Analytics (2x2 Mini Stats) */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#5551ff] flex items-center justify-center shrink-0">
                      <Gamepad2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-900 leading-tight">Game Session Analytics</h3>
                      <p className="text-[10px] text-slate-400 font-medium">Analyze game participation and engagement patterns.</p>
                    </div>
                  </div>
                  <button className="text-[11px] text-[#5551ff] font-extrabold hover:underline shrink-0">View Details</button>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-3 flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Gamepad2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-base font-black text-slate-900 leading-tight">1,248</div>
                      <div className="text-[9px] font-bold text-slate-400">Total Sessions</div>
                      <span className="text-[9px] font-bold text-emerald-600">↑ 28%</span>
                    </div>
                  </div>

                  <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-3 flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-base font-black text-slate-900 leading-tight">32 min</div>
                      <div className="text-[9px] font-bold text-slate-400">Avg. Duration</div>
                      <span className="text-[9px] font-bold text-emerald-600">↑ 12%</span>
                    </div>
                  </div>

                  <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-3 flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-base font-black text-slate-900 leading-tight">24</div>
                      <div className="text-[9px] font-bold text-slate-400">Avg. Participants</div>
                      <span className="text-[9px] font-bold text-emerald-600">↑ 8%</span>
                    </div>
                  </div>

                  <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-3 flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                      <Trophy className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-base font-black text-slate-900 leading-tight">86%</div>
                      <div className="text-[9px] font-bold text-slate-400">Completion Rate</div>
                      <span className="text-[9px] font-bold text-emerald-600">↑ 15%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: User Engagement Funnel (SVG Trapezoid) */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                      <Filter className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-900 leading-tight">User Engagement Funnel</h3>
                      <p className="text-[10px] text-slate-400 font-medium">Track user journey from registration to completion.</p>
                    </div>
                  </div>
                  <button className="text-[11px] text-[#5551ff] font-extrabold hover:underline shrink-0">View Details</button>
                </div>

                {/* Funnel Layout Visual */}
                <div className="flex items-center space-x-4 pt-1">
                  <div className="w-32 h-40 relative">
                    <svg className="w-full h-full" viewBox="0 0 100 120" preserveAspectRatio="none">
                      {/* Trapezoid 1 (Registered) */}
                      <polygon points="0,0 100,0 90,22 10,22" fill="#5551ff" />
                      {/* Trapezoid 2 (Started Game) */}
                      <polygon points="10,24 90,24 80,46 20,46" fill="#3b82f6" />
                      {/* Trapezoid 3 (Completed Modules) */}
                      <polygon points="20,48 80,48 70,70 30,70" fill="#06b6d4" />
                      {/* Trapezoid 4 (Finished Assessment) */}
                      <polygon points="30,72 70,72 60,94 40,94" fill="#10b981" />
                      {/* Trapezoid 5 (Active Users) */}
                      <polygon points="40,96 60,96 55,118 45,118" fill="#f59e0b" />
                    </svg>
                  </div>

                  <div className="flex-1 space-y-2 text-xs font-semibold">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#5551ff]" />
                        <span className="text-slate-700 text-[11px]">3,120 Registered</span>
                      </div>
                      <span className="font-extrabold text-slate-900 text-[11px]">100%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#3b82f6]" />
                        <span className="text-slate-700 text-[11px]">2,850 Started Game</span>
                      </div>
                      <span className="font-extrabold text-slate-900 text-[11px]">91%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#06b6d4]" />
                        <span className="text-slate-700 text-[11px]">2,420 Completed Modules</span>
                      </div>
                      <span className="font-extrabold text-slate-900 text-[11px]">78%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                        <span className="text-slate-700 text-[11px]">1,860 Finished Assessment</span>
                      </div>
                      <span className="font-extrabold text-slate-900 text-[11px]">60%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                        <span className="text-slate-700 text-[11px]">1,520 Active Users</span>
                      </div>
                      <span className="font-extrabold text-slate-900 text-[11px]">49%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Top Learning Modules Table */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#5551ff] flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-900 leading-tight">Top Learning Modules</h3>
                      <p className="text-[10px] text-slate-400 font-medium">Most completed and highest rated modules.</p>
                    </div>
                  </div>
                  <button className="text-[11px] text-[#5551ff] font-extrabold hover:underline shrink-0">View All</button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-wider">
                        <th className="pb-2 px-1 w-6">#</th>
                        <th className="pb-2 px-2">MODULE</th>
                        <th className="pb-2 px-2">COMPLETION RATE</th>
                        <th className="pb-2 px-1 text-right">AVG. RATING</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {topLearningModulesList.map((mod) => (
                        <tr key={mod.rank} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-2.5 px-1 font-bold text-slate-400">{mod.rank}</td>
                          <td className="py-2.5 px-2 font-bold text-slate-900 truncate max-w-[120px]">{mod.title}</td>
                          <td className="py-2.5 px-2 font-extrabold text-slate-700">{mod.completion}</td>
                          <td className="py-2.5 px-1 text-right font-bold text-slate-900">
                            <div className="flex items-center justify-end space-x-1">
                              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                              <span>{mod.rating}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* Grid Row 3 (Generated Reports Table) */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs space-y-4">
              
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#5551ff] flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-black text-slate-900 tracking-tight">
                    Generated Reports (24)
                  </h3>
                </div>

                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={reportsSearchQuery}
                      onChange={(e) => setReportsSearchQuery(e.target.value)}
                      placeholder="Search reports..."
                      className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#5551ff]"
                    />
                  </div>

                  <button className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-[#5551ff] hover:bg-purple-50 text-xs font-extrabold transition-all shrink-0">
                    <Download className="w-3.5 h-3.5" />
                    <span>Export</span>
                  </button>
                </div>
              </div>

              {/* Table Component */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                      <th className="pb-3 px-2 w-8"><input type="checkbox" className="rounded border-slate-300" /></th>
                      <th className="pb-3 px-2 w-8">#</th>
                      <th className="pb-3 px-3">REPORT NAME</th>
                      <th className="pb-3 px-3">REPORT TYPE</th>
                      <th className="pb-3 px-3">DATE RANGE</th>
                      <th className="pb-3 px-3">GENERATED BY</th>
                      <th className="pb-3 px-3">CREATED ON</th>
                      <th className="pb-3 px-3">STATUS</th>
                      <th className="pb-3 px-2 text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {generatedReportsData.map((rep) => (
                      <tr key={rep.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-2">
                          <input type="checkbox" className="rounded border-slate-300" />
                        </td>
                        <td className="py-3.5 px-2 text-slate-400 font-bold">{rep.id}</td>

                        {/* Report Name + Icon */}
                        <td className="py-3.5 px-3">
                          <div className="flex items-center space-x-2.5">
                            <div className="w-7 h-7 rounded-xl bg-purple-100 text-[#5551ff] flex items-center justify-center shrink-0">
                              <FileText className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-slate-900 truncate">{rep.name}</span>
                          </div>
                        </td>

                        {/* Report Type */}
                        <td className="py-3.5 px-3 text-slate-600 font-semibold">
                          {rep.type}
                        </td>

                        {/* Date Range */}
                        <td className="py-3.5 px-3 text-slate-500 font-medium">
                          {rep.dateRange}
                        </td>

                        {/* Generated By */}
                        <td className="py-3.5 px-3 text-slate-700 font-semibold">
                          {rep.generatedBy}
                        </td>

                        {/* Created On */}
                        <td className="py-3.5 px-3 text-slate-500 font-medium">
                          {rep.createdOn}
                        </td>

                        {/* Status Badge */}
                        <td className="py-3.5 px-3">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${rep.statusBadge}`}>
                            {rep.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-2 text-right">
                          <div className="flex items-center justify-end space-x-1.5">
                            <button className="flex items-center space-x-1 text-[#5551ff] font-extrabold text-[11px] hover:underline">
                              <Download className="w-3.5 h-3.5" />
                              <span>Download</span>
                            </button>
                            <button className="p-1 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
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
        )}

        {/* ------------------------------------------------------------- */}
        {/* LEADERBOARD & INCLUSION METRICS TAB VIEW (MATCHES REFERENCE IMAGE) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Header Title & Action Banner */}
            <div className="bg-gradient-to-r from-white via-indigo-50/40 to-purple-50/60 border border-slate-200/80 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
              <div className="relative z-10 flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Leaderboard & Inclusion Metrics
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  Track player performance, inclusion impact, and learning progress across all game sessions.
                </p>
              </div>

              <div className="relative z-10 flex items-center space-x-3 shrink-0">
                <button className="bg-[#5551ff] text-white flex items-center space-x-2 px-4 py-2.5 rounded-2xl shadow-md text-xs font-bold hover:bg-[#4440ee] transition-all">
                  <Download className="w-4 h-4" />
                  <span>Export Report</span>
                </button>
              </div>

              {/* Decorative top-right graphic illustration background */}
              <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none bg-gradient-to-l from-indigo-500/30 to-transparent" />
            </div>

            {/* Metric Stat Cards (Row of 4) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Stat 1: Total Players */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs flex items-center justify-between transition-all hover:shadow-md">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100/80 text-orange-500 flex items-center justify-center shrink-0">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900 tracking-tight">3,120</div>
                    <div className="text-xs font-bold text-slate-400">Total Players</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-black text-emerald-600 flex items-center space-x-0.5">
                    <span>↑ 22%</span>
                  </span>
                  <svg className="w-12 h-5 text-purple-500 mt-1" viewBox="0 0 50 20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M0 16 Q 20 10, 35 14 T 50 4" />
                  </svg>
                </div>
              </div>

              {/* Stat 2: Organizations */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs flex items-center justify-between transition-all hover:shadow-md">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100/80 text-blue-500 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900 tracking-tight">52</div>
                    <div className="text-xs font-bold text-slate-400">Organizations</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-black text-emerald-600 flex items-center space-x-0.5">
                    <span>↑ 15%</span>
                  </span>
                  <svg className="w-12 h-5 text-emerald-500 mt-1" viewBox="0 0 50 20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M0 15 Q 15 12, 30 14 T 50 5" />
                  </svg>
                </div>
              </div>

              {/* Stat 3: Avg Inclusion Score */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs flex items-center justify-between transition-all hover:shadow-md">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-red-100/80 text-red-500 flex items-center justify-center shrink-0">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900 tracking-tight">78%</div>
                    <div className="text-xs font-bold text-slate-400">Avg. Inclusion Score</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-black text-emerald-600 flex items-center space-x-0.5">
                    <span>↑ 12%</span>
                  </span>
                  <svg className="w-12 h-5 text-amber-500 mt-1" viewBox="0 0 50 20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M0 14 Q 20 8, 35 12 T 50 6" />
                  </svg>
                </div>
              </div>

              {/* Stat 4: Learning Completion */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs flex items-center justify-between transition-all hover:shadow-md">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100/80 text-blue-600 flex items-center justify-center shrink-0">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900 tracking-tight">86%</div>
                    <div className="text-xs font-bold text-slate-400">Learning Completion</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-black text-emerald-600 flex items-center space-x-0.5">
                    <span>↑ 18%</span>
                  </span>
                  <svg className="w-12 h-5 text-blue-500 mt-1" viewBox="0 0 50 20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M0 16 Q 15 10, 30 13 T 50 2" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Main Content Grid (8 cols left + 4 cols right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column (Top Performers Podium + Full Table - 8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Top Performers Podium Card Container */}
                <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs space-y-4">
                  
                  {/* Podium Header Bar */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-black text-slate-900 tracking-tight">
                      Top Performers
                    </h3>
                    <div className="relative min-w-[110px]">
                      <select
                        value={leaderboardTimeFilter}
                        onChange={(e) => setLeaderboardTimeFilter(e.target.value)}
                        className="w-full appearance-none pl-3 pr-7 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-[#5551ff]"
                      >
                        <option value="All Time">All Time</option>
                        <option value="This Month">This Month</option>
                        <option value="This Quarter">This Quarter</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Leaderboard Category Sub-Tabs */}
                  <div className="flex items-center border-b border-slate-100 text-xs font-bold text-slate-400 space-x-6 overflow-x-auto pb-1">
                    {[
                      { id: 'overall', label: 'Overall Leaderboard', icon: Trophy },
                      { id: 'impact', label: 'Inclusion Impact', icon: Target },
                      { id: 'progress', label: 'Learning Progress', icon: BarChart3 },
                      { id: 'decision', label: 'Decision Making', icon: Target },
                      { id: 'org_ranking', label: 'Organization Ranking', icon: Users }
                    ].map((tab) => {
                      const IconComp = tab.icon;
                      const isActive = leaderboardSubTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setLeaderboardSubTab(tab.id as any)}
                          className={`pb-2.5 flex items-center space-x-1.5 shrink-0 transition-all relative ${
                            isActive ? 'text-[#5551ff] font-black' : 'hover:text-slate-700'
                          }`}
                        >
                          <IconComp className="w-3.5 h-3.5" />
                          <span>{tab.label}</span>
                          {isActive && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5551ff] rounded-full" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Top 3 Podium Cards (Rank 2, Rank 1 center elevated, Rank 3) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    
                    {/* Rank 2 (Silver - Priya Sharma) */}
                    <div className="bg-slate-50/70 border border-slate-200/80 rounded-3xl p-4 flex flex-col items-center text-center space-y-3 relative hover:shadow-md transition-all">
                      <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 font-black text-xs flex items-center justify-center shadow-xs border border-white absolute -top-3 left-1/2 -translate-x-1/2">
                        2
                      </div>
                      <img
                        src={leaderboardPlayersData[1].avatar}
                        alt={leaderboardPlayersData[1].name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-slate-200 shadow-xs mt-1"
                      />
                      <div>
                        <div className="font-black text-slate-900 text-sm">{leaderboardPlayersData[1].name}</div>
                        <div className="text-[11px] font-bold text-slate-400">{leaderboardPlayersData[1].organization}</div>
                      </div>

                      <div className="w-full grid grid-cols-3 gap-1 pt-2 border-t border-slate-200/60 text-center">
                        <div>
                          <div className="text-xs font-black text-slate-900">{leaderboardPlayersData[1].inclusionScore}%</div>
                          <div className="text-[9px] font-bold text-slate-400 uppercase">Inclusion Score</div>
                        </div>
                        <div>
                          <div className="text-xs font-black text-slate-900">{leaderboardPlayersData[1].gamesPlayed}</div>
                          <div className="text-[9px] font-bold text-slate-400 uppercase">Games Played</div>
                        </div>
                        <div>
                          <div className="text-xs font-black text-slate-900">{leaderboardPlayersData[1].badges}</div>
                          <div className="text-[9px] font-bold text-slate-400 uppercase">Badges</div>
                        </div>
                      </div>
                    </div>

                    {/* Rank 1 (Gold - Anjali Verma Center Elevated) */}
                    <div className="bg-amber-50/40 border-2 border-amber-200/80 rounded-3xl p-4 flex flex-col items-center text-center space-y-3 relative shadow-md hover:shadow-lg transition-all transform sm:-translate-y-1">
                      <div className="w-8 h-8 rounded-full bg-amber-400 text-amber-950 font-black text-xs flex items-center justify-center shadow-md border-2 border-white absolute -top-4 left-1/2 -translate-x-1/2">
                        1
                      </div>
                      <img
                        src={leaderboardPlayersData[0].avatar}
                        alt={leaderboardPlayersData[0].name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-amber-400 shadow-sm mt-1"
                      />
                      <div>
                        <div className="font-black text-slate-900 text-base">{leaderboardPlayersData[0].name}</div>
                        <div className="text-[11px] font-bold text-amber-700/80">{leaderboardPlayersData[0].organization}</div>
                      </div>

                      <div className="w-full grid grid-cols-3 gap-1 pt-2 border-t border-amber-200/60 text-center">
                        <div>
                          <div className="text-sm font-black text-slate-900">{leaderboardPlayersData[0].inclusionScore}%</div>
                          <div className="text-[9px] font-bold text-slate-400 uppercase">Inclusion Score</div>
                        </div>
                        <div>
                          <div className="text-sm font-black text-slate-900">{leaderboardPlayersData[0].gamesPlayed}</div>
                          <div className="text-[9px] font-bold text-slate-400 uppercase">Games Played</div>
                        </div>
                        <div>
                          <div className="text-sm font-black text-slate-900">{leaderboardPlayersData[0].badges}</div>
                          <div className="text-[9px] font-bold text-slate-400 uppercase">Badges</div>
                        </div>
                      </div>
                    </div>

                    {/* Rank 3 (Bronze - Neha Singh) */}
                    <div className="bg-slate-50/70 border border-slate-200/80 rounded-3xl p-4 flex flex-col items-center text-center space-y-3 relative hover:shadow-md transition-all">
                      <div className="w-7 h-7 rounded-full bg-amber-700/20 text-amber-800 font-black text-xs flex items-center justify-center shadow-xs border border-white absolute -top-3 left-1/2 -translate-x-1/2">
                        3
                      </div>
                      <img
                        src={leaderboardPlayersData[2].avatar}
                        alt={leaderboardPlayersData[2].name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-amber-600/40 shadow-xs mt-1"
                      />
                      <div>
                        <div className="font-black text-slate-900 text-sm">{leaderboardPlayersData[2].name}</div>
                        <div className="text-[11px] font-bold text-slate-400">{leaderboardPlayersData[2].organization}</div>
                      </div>

                      <div className="w-full grid grid-cols-3 gap-1 pt-2 border-t border-slate-200/60 text-center">
                        <div>
                          <div className="text-xs font-black text-slate-900">{leaderboardPlayersData[2].inclusionScore}%</div>
                          <div className="text-[9px] font-bold text-slate-400 uppercase">Inclusion Score</div>
                        </div>
                        <div>
                          <div className="text-xs font-black text-slate-900">{leaderboardPlayersData[2].gamesPlayed}</div>
                          <div className="text-[9px] font-bold text-slate-400 uppercase">Games Played</div>
                        </div>
                        <div>
                          <div className="text-xs font-black text-slate-900">{leaderboardPlayersData[2].badges}</div>
                          <div className="text-[9px] font-bold text-slate-400 uppercase">Badges</div>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Leaderboard Table Section */}
                <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs space-y-4">
                  
                  {/* Table Header & Search Input */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <h3 className="text-base font-black text-slate-900 tracking-tight">
                      Leaderboard (3,120 players)
                    </h3>

                    <div className="flex items-center space-x-2 w-full sm:w-auto">
                      <div className="relative flex-1 sm:w-56">
                        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          value={leaderboardSearchQuery}
                          onChange={(e) => setLeaderboardSearchQuery(e.target.value)}
                          placeholder="Search players..."
                          className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#5551ff]"
                        />
                      </div>
                      <button className="p-1.5 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors">
                        <Filter className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Table Component */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                          <th className="pb-3 px-2 w-8"><input type="checkbox" className="rounded border-slate-300" /></th>
                          <th className="pb-3 px-2 w-8">#</th>
                          <th className="pb-3 px-3">PLAYER</th>
                          <th className="pb-3 px-3">ORGANIZATION</th>
                          <th className="pb-3 px-3">INCLUSION SCORE</th>
                          <th className="pb-3 px-3">LEARNING PROGRESS</th>
                          <th className="pb-3 px-3">GAMES PLAYED</th>
                          <th className="pb-3 px-3">BADGES</th>
                          <th className="pb-3 px-3">TREND</th>
                          <th className="pb-3 px-2 text-right">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {leaderboardPlayersData.map((player) => {
                          const isSelected = player.id === selectedLeaderboardPlayerId;
                          return (
                            <tr
                              key={player.id}
                              onClick={() => setSelectedLeaderboardPlayerId(player.id)}
                              className={`cursor-pointer transition-colors ${
                                isSelected
                                  ? 'bg-purple-50/50 border-l-4 border-l-[#5551ff]'
                                  : 'hover:bg-slate-50/80'
                              }`}
                            >
                              <td className="py-3 px-2">
                                <input type="checkbox" checked={isSelected} onChange={() => {}} className="rounded border-slate-300" />
                              </td>
                              <td className="py-3 px-2">
                                {player.badgeType === 'gold' && (
                                  <span className="w-5 h-5 rounded-full bg-amber-400 text-amber-950 font-black text-[10px] flex items-center justify-center">1</span>
                                )}
                                {player.badgeType === 'silver' && (
                                  <span className="w-5 h-5 rounded-full bg-slate-300 text-slate-700 font-black text-[10px] flex items-center justify-center">2</span>
                                )}
                                {player.badgeType === 'bronze' && (
                                  <span className="w-5 h-5 rounded-full bg-amber-700/30 text-amber-900 font-black text-[10px] flex items-center justify-center">3</span>
                                )}
                                {player.badgeType === 'none' && (
                                  <span className="text-slate-400 font-bold pl-1">{player.rank}</span>
                                )}
                              </td>

                              {/* Player Avatar + Name */}
                              <td className="py-3 px-3">
                                <div className="flex items-center space-x-2.5">
                                  <img
                                    src={player.avatar}
                                    alt={player.name}
                                    className="w-7 h-7 rounded-full object-cover shrink-0 border border-slate-200"
                                  />
                                  <span className="font-bold text-slate-900 truncate">{player.name}</span>
                                </div>
                              </td>

                              {/* Organization */}
                              <td className="py-3 px-3 text-slate-600 font-semibold">
                                {player.organization}
                              </td>

                              {/* Inclusion Score + Bar */}
                              <td className="py-3 px-3">
                                <div className="flex items-center space-x-2">
                                  <span className="font-bold text-slate-900 text-xs w-7">{player.inclusionScore}%</span>
                                  <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#5551ff] rounded-full" style={{ width: `${player.inclusionScore}%` }} />
                                  </div>
                                </div>
                              </td>

                              {/* Learning Progress + Bar */}
                              <td className="py-3 px-3">
                                <div className="flex items-center space-x-2">
                                  <span className="font-bold text-slate-900 text-xs w-7">{player.learningProgress}%</span>
                                  <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${player.learningProgress}%` }} />
                                  </div>
                                </div>
                              </td>

                              {/* Games Played */}
                              <td className="py-3 px-3 font-bold text-slate-800">
                                {player.gamesPlayed}
                              </td>

                              {/* Badges */}
                              <td className="py-3 px-3">
                                <div className="flex items-center space-x-1 font-bold text-slate-800">
                                  <Trophy className="w-3.5 h-3.5 text-amber-500" />
                                  <span>{player.badges}</span>
                                </div>
                              </td>

                              {/* Trend */}
                              <td className="py-3 px-3">
                                <span className="text-emerald-600 font-extrabold text-[11px]">
                                  ↑ {player.trend}
                                </span>
                              </td>

                              {/* Actions */}
                              <td className="py-3 px-2 text-right">
                                <button className="px-2.5 py-1 rounded-lg bg-slate-100 text-[#5551ff] font-extrabold hover:bg-purple-100 text-[11px] transition-colors">
                                  View
                                </button>
                              </td>

                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Table Footer Pagination */}
                  <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
                    <div>Showing 1-8 of 3,120 players</div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1 font-extrabold">
                        <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-100">&lt;</button>
                        <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#5551ff] text-white">1</button>
                        <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-100">2</button>
                        <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-100">3</button>
                        <span className="px-1 text-slate-400">...</span>
                        <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-100">390</button>
                        <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-100">&gt;</button>
                      </div>

                      <select className="bg-slate-50 border border-slate-200 rounded-xl px-2 py-1 text-xs font-bold text-slate-700">
                        <option>8 per page</option>
                        <option>16 per page</option>
                        <option>32 per page</option>
                      </select>
                    </div>
                  </div>

                </div>

              </div>

              {/* Right Column (Inclusion Metrics Cards - 4 cols) */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Card 1: Inclusion Metrics Overview (Donut Chart) */}
                <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs space-y-4">
                  
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-black text-slate-900 tracking-tight">
                      Inclusion Metrics Overview
                    </h3>
                    <select className="bg-slate-50 border border-slate-200 rounded-xl px-2 py-1 text-[11px] font-bold text-slate-700">
                      <option>All Organizations</option>
                      <option>TCS</option>
                      <option>Accenture</option>
                    </select>
                  </div>

                  {/* Donut Chart Visual */}
                  <div className="flex items-center space-x-4 pt-2">
                    <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-slate-100"
                          strokeWidth="4"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-emerald-400"
                          strokeWidth="4"
                          strokeDasharray="78, 100"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-xl font-black text-slate-900">78%</span>
                        <span className="text-[9px] font-bold text-slate-400 leading-tight px-2">Avg. Inclusion Score</span>
                      </div>
                    </div>

                    {/* Donut Legend List */}
                    <div className="space-y-1.5 text-xs font-semibold flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                          <span className="text-slate-600 text-[11px]">Gender Equality</span>
                        </div>
                        <span className="font-bold text-slate-900 text-[11px]">82%</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                          <span className="text-slate-600 text-[11px]">Diversity & Inclusion</span>
                        </div>
                        <span className="font-bold text-slate-900 text-[11px]">76%</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                          <span className="text-slate-600 text-[11px]">Equal Opportunities</span>
                        </div>
                        <span className="font-bold text-slate-900 text-[11px]">79%</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                          <span className="text-slate-600 text-[11px]">Leadership Support</span>
                        </div>
                        <span className="font-bold text-slate-900 text-[11px]">74%</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                          <span className="text-slate-600 text-[11px]">Workplace Culture</span>
                        </div>
                        <span className="font-bold text-slate-900 text-[11px]">81%</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Card 2: Inclusion Score Trend (Line Chart) */}
                <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs space-y-4">
                  
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-black text-slate-900 tracking-tight">
                      Inclusion Score Trend
                    </h3>
                    <select className="bg-slate-50 border border-slate-200 rounded-xl px-2 py-1 text-[11px] font-bold text-slate-700">
                      <option>Monthly</option>
                      <option>Weekly</option>
                    </select>
                  </div>

                  {/* Smooth Line Chart Graphic */}
                  <div className="pt-2">
                    <div className="h-32 w-full relative">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
                        {/* Grid lines */}
                        <line x1="0" y1="20" x2="300" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="0" y1="50" x2="300" y2="50" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="0" y1="80" x2="300" y2="80" stroke="#f1f5f9" strokeWidth="1" />

                        {/* Gradient Area Fill */}
                        <defs>
                          <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#5551ff" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#5551ff" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 0,65 Q 30,60 60,55 T 120,48 T 180,40 T 240,32 T 300,28 L 300,100 L 0,100 Z"
                          fill="url(#trendGradient)"
                        />

                        {/* Trend Stroke Line */}
                        <path
                          d="M 0,65 Q 30,60 60,55 T 120,48 T 180,40 T 240,32 T 300,28"
                          fill="none"
                          stroke="#5551ff"
                          strokeWidth="3"
                        />

                        {/* Data Points */}
                        {[
                          { x: 0, y: 65 }, { x: 30, y: 60 }, { x: 60, y: 55 },
                          { x: 90, y: 52 }, { x: 120, y: 48 }, { x: 150, y: 44 },
                          { x: 180, y: 40 }, { x: 210, y: 36 }, { x: 240, y: 32 },
                          { x: 270, y: 30 }, { x: 300, y: 28 }
                        ].map((pt, i) => (
                          <circle key={i} cx={pt.x} cy={pt.y} r="3" fill="#5551ff" stroke="#ffffff" strokeWidth="1.5" />
                        ))}
                      </svg>
                    </div>

                    {/* Months Axis */}
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 pt-2">
                      <span>Jan</span>
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Apr</span>
                      <span>May</span>
                      <span>Jun</span>
                      <span>Jul</span>
                      <span>Aug</span>
                      <span>Sep</span>
                      <span>Oct</span>
                    </div>
                  </div>

                </div>

                {/* Card 3: Top Organizations by Inclusion Impact */}
                <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs space-y-4">
                  
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-black text-slate-900 tracking-tight">
                      Top Organizations by Inclusion Impact
                    </h3>
                    <button className="text-[11px] text-[#5551ff] font-extrabold hover:underline">
                      View All
                    </button>
                  </div>

                  <div className="space-y-3">
                    {topOrganizationsList.map((org) => (
                      <div key={org.rank} className="flex items-center space-x-3 text-xs">
                        <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[10px] text-slate-600 shrink-0">
                          {org.rank === 1 && <span className="text-amber-500 font-black">1</span>}
                          {org.rank === 2 && <span className="text-slate-500 font-black">2</span>}
                          {org.rank === 3 && <span className="text-amber-800 font-black">3</span>}
                          {org.rank > 3 && <span>{org.rank}</span>}
                        </div>

                        <div className="w-6 h-6 rounded-lg bg-purple-100 text-[#5551ff] flex items-center justify-center shrink-0 font-bold text-[10px]">
                          {org.name[0]}
                        </div>

                        <span className="font-bold text-slate-900 w-20 truncate">{org.name}</span>

                        <div className="flex-1 flex items-center space-x-2">
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-[#5551ff] rounded-full" style={{ width: `${org.score}%` }} />
                          </div>
                          <span className="font-extrabold text-slate-900 text-xs w-8 text-right">{org.score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* ROLES & PERMISSIONS MANAGEMENT TAB VIEW (MATCHES REFERENCE IMAGE) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'roles-permissions' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Header Title & Action Banner */}
            <div className="bg-gradient-to-r from-white via-indigo-50/40 to-purple-50/60 border border-slate-200/80 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
              <div className="relative z-10 flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Roles & Permissions
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  Manage user roles, assign permissions, and control access to platform features.
                </p>
              </div>

              <div className="relative z-10 flex items-center space-x-3 shrink-0">
                <button className="bg-[#5551ff] text-white flex items-center space-x-2 px-4 py-2.5 rounded-2xl shadow-md text-xs font-bold hover:bg-[#4440ee] transition-all">
                  <Plus className="w-4 h-4" />
                  <span>Create New Role</span>
                </button>
              </div>

              {/* Decorative top-right graphic illustration background */}
              <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none bg-gradient-to-l from-indigo-500/30 to-transparent" />
            </div>

            {/* Metric Stat Cards (Row of 4) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Stat 1: Total Roles */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs flex items-center justify-between transition-all hover:shadow-md">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100/80 text-[#5551ff] flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900 tracking-tight">6</div>
                    <div className="text-xs font-bold text-slate-400">Total Roles</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-black text-emerald-600 flex items-center space-x-0.5">
                    <span>↑ 0%</span>
                  </span>
                  <svg className="w-12 h-5 text-purple-500 mt-1" viewBox="0 0 50 20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M0 12 Q 25 8, 50 12" />
                  </svg>
                </div>
              </div>

              {/* Stat 2: Total Permissions */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs flex items-center justify-between transition-all hover:shadow-md">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100/80 text-orange-500 flex items-center justify-center shrink-0">
                    <Key className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900 tracking-tight">48</div>
                    <div className="text-xs font-bold text-slate-400">Total Permissions</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-black text-emerald-600 flex items-center space-x-0.5">
                    <span>↑ 12%</span>
                  </span>
                  <svg className="w-12 h-5 text-emerald-500 mt-1" viewBox="0 0 50 20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M0 16 Q 20 12, 35 14 T 50 4" />
                  </svg>
                </div>
              </div>

              {/* Stat 3: Role Assignments */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs flex items-center justify-between transition-all hover:shadow-md">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100/80 text-blue-500 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900 tracking-tight">312</div>
                    <div className="text-xs font-bold text-slate-400">Role Assignments</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-black text-emerald-600 flex items-center space-x-0.5">
                    <span>↑ 18%</span>
                  </span>
                  <svg className="w-12 h-5 text-emerald-500 mt-1" viewBox="0 0 50 20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M0 15 Q 15 10, 30 14 T 50 3" />
                  </svg>
                </div>
              </div>

              {/* Stat 4: Platform Modules */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs flex items-center justify-between transition-all hover:shadow-md">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100/80 text-amber-600 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900 tracking-tight">12</div>
                    <div className="text-xs font-bold text-slate-400">Platform Modules</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-black text-emerald-600 flex items-center space-x-0.5">
                    <span>↑ 0%</span>
                  </span>
                  <svg className="w-12 h-5 text-blue-500 mt-1" viewBox="0 0 50 20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M0 14 Q 25 10, 50 14" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Filter Control Bar */}
            <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 flex-1 min-w-0">
                
                {/* Search Input */}
                <div className="relative min-w-[220px] flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={roleSearchQuery}
                    onChange={(e) => setRoleSearchQuery(e.target.value)}
                    placeholder="Search roles, permissions, modules..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#5551ff] focus:ring-1 focus:ring-[#5551ff]"
                  />
                </div>

                {/* Role Type Select Dropdown */}
                <div className="relative min-w-[150px]">
                  <select
                    value={roleTypeFilter}
                    onChange={(e) => setRoleTypeFilter(e.target.value)}
                    className="w-full appearance-none pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:border-[#5551ff]"
                  >
                    <option value="All Role Types">All Role Types</option>
                    <option value="System">System</option>
                    <option value="Organization">Organization</option>
                    <option value="User">User</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>

                {/* Status Select Dropdown */}
                <div className="relative min-w-[120px]">
                  <select
                    value={roleStatusFilter}
                    onChange={(e) => setRoleStatusFilter(e.target.value)}
                    className="w-full appearance-none pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:border-[#5551ff]"
                  >
                    <option value="All Status">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>

                {/* Module Select Dropdown */}
                <div className="relative min-w-[150px]">
                  <select
                    value={roleModuleFilter}
                    onChange={(e) => setRoleModuleFilter(e.target.value)}
                    className="w-full appearance-none pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:border-[#5551ff]"
                  >
                    <option value="All Modules">All Modules</option>
                    <option value="Dashboard & Analytics">Dashboard & Analytics</option>
                    <option value="Content Management">Content Management</option>
                    <option value="User Management">User Management</option>
                    <option value="System Settings">System Settings</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>

              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => {
                    setRoleSearchQuery('');
                    setRoleTypeFilter('All Role Types');
                    setRoleStatusFilter('All Status');
                    setRoleModuleFilter('All Modules');
                  }}
                  className="px-3 py-2 text-xs font-extrabold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Reset
                </button>
                <button className="bg-[#5551ff] text-white flex items-center space-x-1.5 px-4 py-2 rounded-2xl shadow-xs text-xs font-bold hover:bg-[#4440ee] transition-all">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Apply Filters</span>
                </button>
              </div>

            </div>

            {/* Main Content Split (Table + Role Details Panel) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column (Table Section - 8 cols) */}
              <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs space-y-4">
                
                {/* Table Top Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-900 tracking-tight">
                    Roles (6)
                  </h3>
                  <button className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-[#5551ff] hover:bg-purple-50 text-xs font-extrabold transition-all">
                    <Download className="w-3.5 h-3.5" />
                    <span>Export</span>
                  </button>
                </div>

                {/* Table Element */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                        <th className="pb-3 px-2 w-8"><input type="checkbox" className="rounded border-slate-300" /></th>
                        <th className="pb-3 px-2 w-8">#</th>
                        <th className="pb-3 px-3">ROLE NAME</th>
                        <th className="pb-3 px-3">ROLE TYPE</th>
                        <th className="pb-3 px-3">DESCRIPTION</th>
                        <th className="pb-3 px-3">USERS ASSIGNED</th>
                        <th className="pb-3 px-3">STATUS</th>
                        <th className="pb-3 px-2 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {rolesData.map((role) => {
                        const isSelected = role.id === selectedRoleId;
                        return (
                          <tr
                            key={role.id}
                            onClick={() => setSelectedRoleId(role.id)}
                            className={`cursor-pointer transition-colors ${
                              isSelected
                                ? 'bg-purple-50/50 border-l-4 border-l-[#5551ff]'
                                : 'hover:bg-slate-50/80'
                            }`}
                          >
                            <td className="py-3.5 px-2">
                              <input type="checkbox" checked={isSelected} onChange={() => {}} className="rounded border-slate-300" />
                            </td>
                            <td className="py-3.5 px-2 text-slate-400 font-bold">{role.id}</td>
                            
                            {/* Role Name + Icon */}
                            <td className="py-3.5 px-3">
                              <div className="flex items-center space-x-2.5">
                                <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${role.iconBg}`}>
                                  {role.iconType === 'crown' && <Crown className="w-4 h-4" />}
                                  {role.iconType === 'building' && <Building2 className="w-4 h-4" />}
                                  {role.iconType === 'users' && <Users className="w-4 h-4" />}
                                  {role.iconType === 'cap' && <GraduationCap className="w-4 h-4" />}
                                  {role.iconType === 'chart' && <BarChart3 className="w-4 h-4" />}
                                  {role.iconType === 'settings' && <Settings className="w-4 h-4" />}
                                </div>
                                <span className="font-bold text-slate-900 truncate">{role.name}</span>
                              </div>
                            </td>

                            {/* Role Type Badge */}
                            <td className="py-3.5 px-3">
                              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${role.roleTypeBadge}`}>
                                {role.roleType}
                              </span>
                            </td>

                            {/* Description */}
                            <td className="py-3.5 px-3 text-slate-500 font-medium max-w-[200px] truncate">
                              {role.description}
                            </td>

                            {/* Users Assigned */}
                            <td className="py-3.5 px-3 font-bold text-slate-800">
                              {role.usersAssigned}
                            </td>

                            {/* Status Badge */}
                            <td className="py-3.5 px-3">
                              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${role.statusBadge}`}>
                                {role.status}
                              </span>
                            </td>

                            {/* Actions */}
                            <td className="py-3.5 px-2 text-right">
                              <div className="flex items-center justify-end space-x-1">
                                <button className="px-2.5 py-1 rounded-lg bg-slate-100 text-[#5551ff] font-extrabold hover:bg-purple-100 text-[11px] transition-colors">
                                  Edit
                                </button>
                                <button className="p-1 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                                  <MoreVertical className="w-4 h-4" />
                                </button>
                              </div>
                            </td>

                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer Pagination */}
                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
                  <div>Showing 1-6 of 6 roles</div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1 font-extrabold">
                      <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-100">&lt;</button>
                      <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#5551ff] text-white">1</button>
                      <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-100">&gt;</button>
                    </div>

                    <select className="bg-slate-50 border border-slate-200 rounded-xl px-2 py-1 text-xs font-bold text-slate-700">
                      <option>10 per page</option>
                      <option>20 per page</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Right Column (Role Details Panel - 4 cols) */}
              <div className="lg:col-span-4 bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs space-y-5 sticky top-24">
                
                {/* Header Title + Edit Link */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-black text-slate-900 tracking-tight">
                    Role Details
                  </h3>
                  <button className="flex items-center space-x-1 text-xs font-extrabold text-[#5551ff] hover:underline">
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit Role</span>
                  </button>
                </div>

                {/* Profile / Role Header */}
                <div className="flex items-start space-x-3.5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100 shadow-xs ${activeRole.iconBg}`}>
                    {activeRole.iconType === 'crown' && <Crown className="w-7 h-7" />}
                    {activeRole.iconType === 'building' && <Building2 className="w-7 h-7" />}
                    {activeRole.iconType === 'users' && <Users className="w-7 h-7" />}
                    {activeRole.iconType === 'cap' && <GraduationCap className="w-7 h-7" />}
                    {activeRole.iconType === 'chart' && <BarChart3 className="w-7 h-7" />}
                    {activeRole.iconType === 'settings' && <Settings className="w-7 h-7" />}
                  </div>
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                      <h4 className="text-base font-black text-slate-900 truncate">
                        {activeRole.name}
                      </h4>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${activeRole.roleTypeBadge}`}>
                        {activeRole.roleType} Role
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${activeRole.statusBadge}`}>
                        {activeRole.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 font-medium pt-1 leading-relaxed">
                      {activeRole.fullDescription}
                    </p>
                  </div>
                </div>

                {/* Navigation Sub-Tabs */}
                <div className="flex items-center border-b border-slate-200 text-xs font-bold text-slate-400 space-x-4">
                  {(['permissions', 'users', 'modules'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setRoleDetailSubTab(tab)}
                      className={`pb-2.5 capitalize transition-all relative ${
                        roleDetailSubTab === tab
                          ? 'text-[#5551ff] font-black'
                          : 'hover:text-slate-700'
                      }`}
                    >
                      {tab === 'permissions' ? 'Permissions' : tab === 'users' ? `Users (${activeRole.usersAssigned})` : `Modules (${activeRole.modulesCount})`}
                      {roleDetailSubTab === tab && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5551ff] rounded-full" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Sub-Tab Content (`Permissions`) */}
                {roleDetailSubTab === 'permissions' && (
                  <div className="space-y-4">
                    
                    {/* Permission Search Bar & Add Button */}
                    <div className="flex items-center space-x-2">
                      <div className="relative flex-1">
                        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Search permissions..."
                          className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#5551ff]"
                        />
                      </div>
                      <button className="bg-[#5551ff] text-white flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-[#4440ee] transition-all shrink-0">
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Permissions</span>
                      </button>
                    </div>

                    {/* Permission Accordion Groups */}
                    <div className="space-y-3">
                      {activeRole.permissionGroups.map((group) => {
                        const isExpanded = expandedPermissionGroups.includes(group.id);
                        return (
                          <div key={group.id} className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                            
                            {/* Group Header */}
                            <button
                              onClick={() => {
                                if (isExpanded) {
                                  setExpandedPermissionGroups(expandedPermissionGroups.filter(g => g !== group.id));
                                } else {
                                  setExpandedPermissionGroups([...expandedPermissionGroups, group.id]);
                                }
                              }}
                              className="w-full p-3 bg-slate-50/70 hover:bg-slate-100/60 flex items-center justify-between transition-colors text-xs"
                            >
                              <div className="flex items-center space-x-2 font-black text-slate-900">
                                <LayoutDashboard className="w-4 h-4 text-[#5551ff]" />
                                <span>{group.name}</span>
                              </div>

                              <div className="flex items-center space-x-2">
                                <span className="font-bold text-slate-500 text-[11px]">
                                  {group.grantedCount}/{group.totalCount}
                                </span>
                                {isExpanded ? (
                                  <ChevronUp className="w-4 h-4 text-slate-400" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 text-slate-400" />
                                )}
                              </div>
                            </button>

                            {/* Group Body (Permissions Table / List) */}
                            {isExpanded && (
                              <div className="divide-y divide-slate-100 border-t border-slate-100">
                                {group.permissions.map((perm, pIdx) => (
                                  <div key={pIdx} className="p-3 flex items-center justify-between hover:bg-slate-50/50 transition-colors text-xs">
                                    <div className="flex items-start space-x-2.5 min-w-0 flex-1">
                                      <div className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                                        <Check className="w-3 h-3 stroke-[3]" />
                                      </div>
                                      <div className="min-w-0">
                                        <div className="font-bold text-slate-900 truncate">{perm.name}</div>
                                        <div className="text-[10px] text-slate-400 truncate">{perm.desc}</div>
                                      </div>
                                    </div>

                                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-extrabold text-[10px] shrink-0 ml-2">
                                      Granted
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}

                          </div>
                        );
                      })}
                    </div>

                  </div>
                )}

                {roleDetailSubTab !== 'permissions' && (
                  <div className="p-6 text-center text-xs text-slate-400 font-medium border border-dashed border-slate-200 rounded-2xl">
                    Detailed assignment records and module settings for {roleDetailSubTab}.
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* PARTNER ADMIN MANAGEMENT TAB VIEW (MATCHES REFERENCE IMAGE) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'partner-admins' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Header Title & Action Banner */}
            <div className="bg-gradient-to-r from-white via-indigo-50/40 to-purple-50/60 border border-slate-200/80 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
              <div className="relative z-10 flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Partner Admin Management
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  Manage partner organization admins, their permissions, and platform access.
                </p>
              </div>

              <div className="relative z-10 flex items-center space-x-3 shrink-0">
                <button className="bg-[#5551ff] text-white flex items-center space-x-2 px-4 py-2.5 rounded-2xl shadow-md text-xs font-bold hover:bg-[#4440ee] transition-all">
                  <Plus className="w-4 h-4" />
                  <span>Add Partner Admin</span>
                </button>
              </div>

              {/* Decorative top-right graphic illustration background */}
              <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none bg-gradient-to-l from-indigo-500/30 to-transparent" />
            </div>

            {/* Metric Stat Cards (Row of 4) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Stat 1: Partner Admins */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs flex items-center justify-between transition-all hover:shadow-md">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100/80 text-orange-500 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900 tracking-tight">64</div>
                    <div className="text-xs font-bold text-slate-400">Partner Admins</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-black text-emerald-600 flex items-center space-x-0.5">
                    <span>↑ 18%</span>
                  </span>
                  <svg className="w-12 h-5 text-emerald-500 mt-1" viewBox="0 0 50 20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M0 15 Q 12 5, 25 12 T 50 3" />
                  </svg>
                </div>
              </div>

              {/* Stat 2: Partner Organizations */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs flex items-center justify-between transition-all hover:shadow-md">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100/80 text-blue-500 flex items-center justify-center shrink-0">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900 tracking-tight">52</div>
                    <div className="text-xs font-bold text-slate-400">Partner Organizations</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-black text-emerald-600 flex items-center space-x-0.5">
                    <span>↑ 15%</span>
                  </span>
                  <svg className="w-12 h-5 text-purple-500 mt-1" viewBox="0 0 50 20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M0 16 Q 15 10, 28 14 T 50 4" />
                  </svg>
                </div>
              </div>

              {/* Stat 3: Active Accounts */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs flex items-center justify-between transition-all hover:shadow-md">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 text-emerald-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900 tracking-tight">96%</div>
                    <div className="text-xs font-bold text-slate-400">Active Accounts</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-black text-emerald-600 flex items-center space-x-0.5">
                    <span>↑ 8%</span>
                  </span>
                  <svg className="w-12 h-5 text-emerald-500 mt-1" viewBox="0 0 50 20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M0 14 Q 10 16, 25 8 T 50 5" />
                  </svg>
                </div>
              </div>

              {/* Stat 4: Avg Modules Assigned */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs flex items-center justify-between transition-all hover:shadow-md">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100/80 text-[#5551ff] flex items-center justify-center shrink-0">
                    <Key className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900 tracking-tight">5</div>
                    <div className="text-xs font-bold text-slate-400">Avg. Modules Assigned</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-black text-emerald-600 flex items-center space-x-0.5">
                    <span>↑ 25%</span>
                  </span>
                  <svg className="w-12 h-5 text-blue-500 mt-1" viewBox="0 0 50 20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M0 18 Q 12 12, 30 8 T 50 2" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Filter Control Bar */}
            <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 flex-1 min-w-0">
                
                {/* Search Input */}
                <div className="relative min-w-[220px] flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={partnerAdminSearchQuery}
                    onChange={(e) => setPartnerAdminSearchQuery(e.target.value)}
                    placeholder="Search by name, email, organization..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#5551ff] focus:ring-1 focus:ring-[#5551ff]"
                  />
                </div>

                {/* Organization Select Dropdown */}
                <div className="relative min-w-[150px]">
                  <select
                    value={partnerAdminOrgFilter}
                    onChange={(e) => setPartnerAdminOrgFilter(e.target.value)}
                    className="w-full appearance-none pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:border-[#5551ff]"
                  >
                    <option value="All Organizations">All Organizations</option>
                    <option value="TCS">TCS</option>
                    <option value="Infosys">Infosys</option>
                    <option value="Accenture">Accenture</option>
                    <option value="Wipro">Wipro</option>
                    <option value="Deloitte">Deloitte</option>
                    <option value="HCL">HCL</option>
                    <option value="IBM">IBM</option>
                    <option value="Capgemini">Capgemini</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>

                {/* Role Select Dropdown */}
                <div className="relative min-w-[130px]">
                  <select
                    value={partnerAdminRoleFilter}
                    onChange={(e) => setPartnerAdminRoleFilter(e.target.value)}
                    className="w-full appearance-none pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:border-[#5551ff]"
                  >
                    <option value="All Roles">All Roles</option>
                    <option value="Partner Admin">Partner Admin</option>
                    <option value="Organization Admin">Organization Admin</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>

                {/* Status Select Dropdown */}
                <div className="relative min-w-[120px]">
                  <select
                    value={partnerAdminStatusFilter}
                    onChange={(e) => setPartnerAdminStatusFilter(e.target.value)}
                    className="w-full appearance-none pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:border-[#5551ff]"
                  >
                    <option value="All Status">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>

                {/* Date Added Select */}
                <div className="relative min-w-[150px]">
                  <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select
                    value={partnerAdminDateRange}
                    onChange={(e) => setPartnerAdminDateRange(e.target.value)}
                    className="w-full appearance-none pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:border-[#5551ff]"
                  >
                    <option value="Jan 2024 - Oct 2024">Jan 2024 - Oct 2024</option>
                    <option value="Last 30 Days">Last 30 Days</option>
                    <option value="Last 90 Days">Last 90 Days</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>

              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => {
                    setPartnerAdminSearchQuery('');
                    setPartnerAdminOrgFilter('All Organizations');
                    setPartnerAdminRoleFilter('All Roles');
                    setPartnerAdminStatusFilter('All Status');
                  }}
                  className="px-3 py-2 text-xs font-extrabold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Reset
                </button>
                <button className="bg-[#5551ff] text-white flex items-center space-x-1.5 px-4 py-2 rounded-2xl shadow-xs text-xs font-bold hover:bg-[#4440ee] transition-all">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Apply Filters</span>
                </button>
              </div>

            </div>

            {/* Main Content Split (Table + Admin Details Panel) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column (Table Section - 8 cols) */}
              <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs space-y-4">
                
                {/* Table Top Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-900 tracking-tight">
                    Partner Admins (64)
                  </h3>
                  <button className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-[#5551ff] hover:bg-purple-50 text-xs font-extrabold transition-all">
                    <Download className="w-3.5 h-3.5" />
                    <span>Export</span>
                  </button>
                </div>

                {/* Table Element */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                        <th className="pb-3 px-2 w-8"><input type="checkbox" className="rounded border-slate-300" /></th>
                        <th className="pb-3 px-2 w-8">#</th>
                        <th className="pb-3 px-3">ADMIN</th>
                        <th className="pb-3 px-3">ORGANIZATION</th>
                        <th className="pb-3 px-3">ROLE</th>
                        <th className="pb-3 px-3">STATUS</th>
                        <th className="pb-3 px-3">MODULE ACCESS</th>
                        <th className="pb-3 px-3">LAST ACTIVE</th>
                        <th className="pb-3 px-2 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {partnerAdminsData.map((admin) => {
                        const isSelected = admin.id === selectedPartnerAdminId;
                        return (
                          <tr
                            key={admin.id}
                            onClick={() => setSelectedPartnerAdminId(admin.id)}
                            className={`cursor-pointer transition-colors ${
                              isSelected
                                ? 'bg-purple-50/50 border-l-4 border-l-[#5551ff]'
                                : 'hover:bg-slate-50/80'
                            }`}
                          >
                            <td className="py-3 px-2">
                              <input type="checkbox" checked={isSelected} onChange={() => {}} className="rounded border-slate-300" />
                            </td>
                            <td className="py-3 px-2 text-slate-400 font-bold">{admin.id}</td>
                            
                            {/* Admin Avatar + Name + Email */}
                            <td className="py-3 px-3">
                              <div className="flex items-center space-x-2.5">
                                <img
                                  src={admin.avatar}
                                  alt={admin.name}
                                  className="w-8 h-8 rounded-full object-cover shrink-0 border border-slate-200"
                                />
                                <div className="min-w-0">
                                  <div className="font-bold text-slate-900 truncate">{admin.name}</div>
                                  <div className="text-[10px] text-slate-400 truncate">{admin.email}</div>
                                </div>
                              </div>
                            </td>

                            {/* Organization */}
                            <td className="py-3 px-3 font-semibold text-slate-600">
                              {admin.organization}
                            </td>

                            {/* Role Badge */}
                            <td className="py-3 px-3">
                              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${admin.roleBadge}`}>
                                {admin.role}
                              </span>
                            </td>

                            {/* Status Badge */}
                            <td className="py-3 px-3">
                              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${admin.statusBadge}`}>
                                {admin.status}
                              </span>
                            </td>

                            {/* Module Access Progress */}
                            <td className="py-3 px-3">
                              <div className="flex items-center space-x-2">
                                <span className="font-bold text-slate-700 text-xs">
                                  {admin.moduleAccessCount}/{admin.moduleAccessTotal}
                                </span>
                                <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-[#5551ff] rounded-full"
                                    style={{ width: `${(admin.moduleAccessCount / admin.moduleAccessTotal) * 100}%` }}
                                  />
                                </div>
                              </div>
                            </td>

                            {/* Last Active */}
                            <td className="py-3 px-3 text-slate-500 font-medium">
                              {admin.lastActive}
                            </td>

                            {/* Actions */}
                            <td className="py-3 px-2 text-right">
                              <button className="p-1 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </td>

                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer Pagination */}
                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
                  <div>Showing 1-8 of 64 partner admins</div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1 font-extrabold">
                      <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-100">&lt;</button>
                      <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#5551ff] text-white">1</button>
                      <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-100">2</button>
                      <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-100">3</button>
                      <span className="px-1 text-slate-400">...</span>
                      <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-100">8</button>
                      <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-100">&gt;</button>
                    </div>

                    <select className="bg-slate-50 border border-slate-200 rounded-xl px-2 py-1 text-xs font-bold text-slate-700">
                      <option>8 per page</option>
                      <option>16 per page</option>
                      <option>32 per page</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Right Column (Admin Details Panel - 4 cols) */}
              <div className="lg:col-span-4 bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs space-y-5 sticky top-24">
                
                {/* Header Title + Edit Link */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-black text-slate-900 tracking-tight">
                    Admin Details
                  </h3>
                  <button className="flex items-center space-x-1 text-xs font-extrabold text-[#5551ff] hover:underline">
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit Admin</span>
                  </button>
                </div>

                {/* Profile Header */}
                <div className="flex items-start space-x-3.5">
                  <img
                    src={activePartnerAdmin.avatar}
                    alt={activePartnerAdmin.name}
                    className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-slate-200 shadow-xs"
                  />
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                      <h4 className="text-base font-black text-slate-900 truncate">
                        {activePartnerAdmin.name}
                      </h4>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${activePartnerAdmin.roleBadge}`}>
                        {activePartnerAdmin.role}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${activePartnerAdmin.statusBadge}`}>
                        {activePartnerAdmin.status}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs text-slate-500 font-medium pt-1">
                      <div className="flex items-center space-x-2 truncate">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{activePartnerAdmin.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 truncate">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{activePartnerAdmin.organization}</span>
                      </div>
                      <div className="flex items-center space-x-2 truncate">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>Joined on {activePartnerAdmin.dateJoined}</span>
                      </div>
                      <div className="flex items-center space-x-2 truncate">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>Last active {activePartnerAdmin.lastActive}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation Sub-Tabs */}
                <div className="flex items-center border-b border-slate-200 text-xs font-bold text-slate-400 space-x-4">
                  {(['overview', 'permissions', 'modules', 'activity'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setPartnerAdminDetailSubTab(tab)}
                      className={`pb-2.5 capitalize transition-all relative ${
                        partnerAdminDetailSubTab === tab
                          ? 'text-[#5551ff] font-black'
                          : 'hover:text-slate-700'
                      }`}
                    >
                      {tab === 'modules' ? 'Assigned Modules' : tab}
                      {partnerAdminDetailSubTab === tab && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5551ff] rounded-full" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Sub-Tab Content */}
                {partnerAdminDetailSubTab === 'overview' && (
                  <div className="space-y-4">
                    
                    {/* 4 Stat Mini Cards (2x2 Grid) */}
                    <div className="grid grid-cols-2 gap-3">
                      
                      <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-3 flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-base font-black text-slate-900 leading-tight">
                            {activePartnerAdmin.modulesAssignedCount}
                          </div>
                          <div className="text-[10px] font-bold text-slate-400">Modules Assigned</div>
                        </div>
                      </div>

                      <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-3 flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-base font-black text-slate-900 leading-tight">
                            {activePartnerAdmin.usersManaged}
                          </div>
                          <div className="text-[10px] font-bold text-slate-400">Users Managed</div>
                        </div>
                      </div>

                      <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-3 flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#5551ff] flex items-center justify-center shrink-0">
                          <Gamepad2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-base font-black text-slate-900 leading-tight">
                            {activePartnerAdmin.gameSessions}
                          </div>
                          <div className="text-[10px] font-bold text-slate-400">Game Sessions</div>
                        </div>
                      </div>

                      <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-3 flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-red-100 text-red-500 flex items-center justify-center shrink-0">
                          <BarChart3 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-base font-black text-slate-900 leading-tight">
                            {activePartnerAdmin.avgCompletionRate}%
                          </div>
                          <div className="text-[10px] font-bold text-slate-400">Avg. Completion Rate</div>
                        </div>
                      </div>

                    </div>

                    {/* Organization Details Box */}
                    <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-3.5 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Organization Details
                          </div>
                          <div className="text-xs font-black text-slate-900">
                            {activePartnerAdmin.organization}
                          </div>
                          <div className="text-[11px] text-slate-500 font-medium">
                            {activePartnerAdmin.orgCategory}
                          </div>
                        </div>
                      </div>

                      <button className="px-3 py-1.5 border border-purple-200 text-[#5551ff] hover:bg-purple-50 font-extrabold text-xs rounded-xl transition-colors shrink-0">
                        View Organization
                      </button>
                    </div>

                    {/* Assigned Modules Section */}
                    <div className="space-y-3 pt-1">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-black text-slate-900">Assigned Modules</h5>
                        <button className="text-[11px] text-[#5551ff] font-extrabold hover:underline">
                          View All
                        </button>
                      </div>

                      <div className="space-y-2">
                        {activePartnerAdmin.assignedModulesList.map((mod, modIdx) => (
                          <div
                            key={modIdx}
                            className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-white hover:bg-slate-50/60 transition-colors text-xs"
                          >
                            <div className="flex items-center space-x-2.5 min-w-0 flex-1">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold text-[10px] ${mod.bg}`}>
                                {modIdx + 1}
                              </div>
                              <span className="font-semibold text-slate-800 truncate">
                                {mod.title}
                              </span>
                            </div>

                            <span className={`text-[11px] font-bold shrink-0 ml-2 ${mod.assigned ? 'text-slate-400' : 'text-red-500'}`}>
                              {mod.assigned ? 'Assigned' : 'Not Assigned'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {partnerAdminDetailSubTab !== 'overview' && (
                  <div className="p-6 text-center text-xs text-slate-400 font-medium border border-dashed border-slate-200 rounded-2xl">
                    Additional information and detailed logs for {partnerAdminDetailSubTab}.
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* USERS & ORGANIZATIONS MANAGEMENT TAB VIEW (MATCHES REFERENCE IMAGE) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'users-organizations' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Header Title & Action Banner */}
            <div className="bg-gradient-to-r from-white via-indigo-50/40 to-purple-50/60 border border-slate-200/80 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
              <div className="relative z-10 flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Users & Organizations Management
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  Manage players, organizations, partner admins, and their access levels across the Inclusive Tycoon platform.
                </p>
              </div>

              {/* Right Side: Hero Graphic & Top Action Buttons */}
              <div className="relative z-10 flex items-center space-x-3 shrink-0">
                <div className="hidden lg:block w-72 h-24 rounded-2xl overflow-hidden border border-slate-200/60 shadow-xs relative bg-indigo-900/10 mr-2">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
                    alt="Users & Organizations"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-transparent to-transparent"></div>
                </div>

                <button
                  onClick={() => setShowAddCard(true)}
                  className="px-4 py-2.5 bg-white border border-indigo-200/80 hover:bg-indigo-50/60 text-[#5551ff] font-extrabold text-xs rounded-2xl shadow-xs flex items-center space-x-1.5 transition-all"
                >
                  <Plus className="w-4 h-4 text-[#5551ff]" />
                  <span>Add User</span>
                </button>

                <button
                  onClick={() => setShowAddCard(true)}
                  className="px-5 py-2.5 bg-[#5551ff] hover:bg-[#4440ee] text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-indigo-500/25 flex items-center space-x-1.5 transition-all hover:scale-[1.02]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Organization</span>
                </button>
              </div>
            </div>

            {/* 4 Stat Metric Cards (With SVG Sparklines) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Stat 1: Total Users */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-sky-100/80 text-sky-600 flex items-center justify-center shrink-0">
                      <Users className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900 tracking-tight">3,120</div>
                      <div className="text-xs font-bold text-slate-400">Total Users</div>
                    </div>
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 font-black px-2 py-0.5 rounded-full text-xs">
                    ↑ 22%
                  </span>
                </div>
                {/* SVG Sparkline */}
                <div className="h-6 w-full overflow-hidden pt-1">
                  <svg className="w-full h-full text-[#5551ff]" viewBox="0 0 100 25" fill="none">
                    <path d="M0,20 Q25,8 50,15 T100,5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              </div>

              {/* Stat 2: Organizations */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-100/80 text-emerald-600 flex items-center justify-center shrink-0">
                      <Building2 className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900 tracking-tight">52</div>
                      <div className="text-xs font-bold text-slate-400">Organizations</div>
                    </div>
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 font-black px-2 py-0.5 rounded-full text-xs">
                    ↑ 15%
                  </span>
                </div>
                {/* SVG Sparkline */}
                <div className="h-6 w-full overflow-hidden pt-1">
                  <svg className="w-full h-full text-emerald-500" viewBox="0 0 100 25" fill="none">
                    <path d="M0,18 Q30,10 60,16 T100,6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              </div>

              {/* Stat 3: Active Players */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-orange-100/80 text-orange-600 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900 tracking-tight">2,480</div>
                      <div className="text-xs font-bold text-slate-400">Active Players</div>
                    </div>
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 font-black px-2 py-0.5 rounded-full text-xs">
                    ↑ 28%
                  </span>
                </div>
                {/* SVG Sparkline */}
                <div className="h-6 w-full overflow-hidden pt-1">
                  <svg className="w-full h-full text-orange-500" viewBox="0 0 100 25" fill="none">
                    <path d="M0,16 Q35,5 70,18 T100,8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              </div>

              {/* Stat 4: Partner Admins */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-100/80 text-[#5551ff] flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900 tracking-tight">64</div>
                      <div className="text-xs font-bold text-slate-400">Partner Admins</div>
                    </div>
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 font-black px-2 py-0.5 rounded-full text-xs">
                    ↑ 12%
                  </span>
                </div>
                {/* SVG Sparkline */}
                <div className="h-6 w-full overflow-hidden pt-1">
                  <svg className="w-full h-full text-sky-500" viewBox="0 0 100 25" fill="none">
                    <path d="M0,22 Q25,12 50,18 T100,6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              </div>

            </div>

            {/* Sub-Tabs Bar (Users / Organizations) */}
            <div className="flex items-center space-x-4 border-b border-slate-200/80 px-2 text-xs font-bold text-slate-400">
              <button
                onClick={() => setUserOrgActiveSubTab('users')}
                className={`pb-3.5 border-b-2 transition-all flex items-center space-x-2 whitespace-nowrap ${
                  userOrgActiveSubTab === 'users'
                    ? 'border-[#5551ff] text-[#5551ff] font-extrabold'
                    : 'border-transparent hover:text-slate-600'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Users (3,120)</span>
              </button>

              <button
                onClick={() => setUserOrgActiveSubTab('organizations')}
                className={`pb-3.5 border-b-2 transition-all flex items-center space-x-2 whitespace-nowrap ${
                  userOrgActiveSubTab === 'organizations'
                    ? 'border-[#5551ff] text-[#5551ff] font-extrabold'
                    : 'border-transparent hover:text-slate-600'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Organizations (52)</span>
              </button>
            </div>

            {/* Filter Controls Bar */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-wrap lg:flex-nowrap items-center justify-between gap-3 text-xs font-semibold text-slate-700">
              
              <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[240px]">
                
                {/* Search */}
                <div className="relative flex-1 min-w-[200px]">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Search</label>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3.5 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      value={userSearchQuery}
                      onChange={(e) => setUserSearchQuery(e.target.value)}
                      placeholder="Search by name, email, organization..."
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[#5551ff] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Role Filter */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Role</label>
                  <select
                    value={userRoleFilter}
                    onChange={(e) => setUserRoleFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                  >
                    <option value="All Roles">All Roles</option>
                    <option value="Player">Player</option>
                    <option value="Partner Admin">Partner Admin</option>
                    <option value="Super Admin">Super Admin</option>
                  </select>
                </div>

                {/* Organization Filter */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Organization</label>
                  <select
                    value={userOrgFilter}
                    onChange={(e) => setUserOrgFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                  >
                    <option value="All Organizations">All Organizations</option>
                    <option value="TCS">TCS</option>
                    <option value="Infosys">Infosys</option>
                    <option value="Accenture">Accenture</option>
                    <option value="Wipro">Wipro</option>
                    <option value="Deloitte">Deloitte</option>
                    <option value="HCL">HCL</option>
                    <option value="IBM">IBM</option>
                    <option value="Capgemini">Capgemini</option>
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Status</label>
                  <select
                    value={userStatusFilter}
                    onChange={(e) => setUserStatusFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#5551ff] cursor-pointer"
                  >
                    <option value="All Status">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>

                {/* Date Joined Filter */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5 px-1">Date Joined</label>
                  <button className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 flex items-center space-x-2 focus:outline-none focus:border-[#5551ff]">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{userDateJoinedRange}</span>
                  </button>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 shrink-0 pt-3 lg:pt-0">
                <button
                  onClick={() => {
                    setUserSearchQuery('');
                    setUserRoleFilter('All Roles');
                    setUserOrgFilter('All Organizations');
                    setUserStatusFilter('All Status');
                  }}
                  className="px-3.5 py-2 text-slate-500 hover:text-slate-900 font-bold text-xs hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Reset
                </button>

                <button className="px-4 py-2 bg-[#5551ff] hover:bg-[#4440ee] text-white text-xs font-extrabold rounded-xl shadow-md shadow-indigo-500/20 flex items-center space-x-1.5 transition-all">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Apply Filters</span>
                </button>
              </div>

            </div>

            {/* Main Content Layout: Table (2 cols) + Right Detail Panel (1 col) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              {/* Left Column: Users Table Card (2 cols) */}
              <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
                
                {/* Table Header Row */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-base font-black text-slate-900">Users (3,120)</h3>
                  </div>

                  <button className="px-3 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-xs transition-all">
                    <Download className="w-3.5 h-3.5 text-[#5551ff]" />
                    <span>Export</span>
                  </button>
                </div>

                {/* Data Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                        <th className="py-3 px-2 w-8">
                          <input type="checkbox" className="rounded border-slate-300 text-[#5551ff] focus:ring-[#5551ff]" />
                        </th>
                        <th className="py-3 px-2 w-8">#</th>
                        <th className="py-3 px-3">USER</th>
                        <th className="py-3 px-3">ORGANIZATION</th>
                        <th className="py-3 px-3">ROLE</th>
                        <th className="py-3 px-3">STATUS</th>
                        <th className="py-3 px-3">GAME SESSIONS</th>
                        <th className="py-3 px-3">COMPLETION RATE</th>
                        <th className="py-3 px-3">LAST ACTIVE</th>
                        <th className="py-3 px-3 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700 font-semibold">
                      {usersData.map((user, index) => {
                        const isSelected = user.id === activeUser.id;

                        return (
                          <tr
                            key={user.id}
                            onClick={() => setSelectedUserId(user.id)}
                            className={`cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-purple-50/40 border-l-4 border-[#5551ff]'
                                : 'hover:bg-slate-50/80'
                            }`}
                          >
                            <td className="py-3.5 px-2" onClick={(e) => e.stopPropagation()}>
                              <input type="checkbox" className="rounded border-slate-300 text-[#5551ff] focus:ring-[#5551ff]" />
                            </td>

                            <td className="py-3.5 px-2 font-bold text-slate-400">
                              {index + 1}
                            </td>

                            <td className="py-3.5 px-3 min-w-[200px]">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={user.avatar}
                                  alt={user.name}
                                  className="w-9 h-9 rounded-xl object-cover shrink-0 border border-slate-200/80 shadow-2xs"
                                />
                                <div>
                                  <div className="font-extrabold text-slate-900 leading-tight hover:text-[#5551ff] transition-colors">
                                    {user.name}
                                  </div>
                                  <div className="text-[10px] text-slate-400 font-medium truncate max-w-[150px]">
                                    {user.email}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="py-3.5 px-3 font-bold text-slate-900">
                              {user.organization}
                            </td>

                            <td className="py-3.5 px-3">
                              <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold whitespace-nowrap ${user.roleBadge}`}>
                                {user.role}
                              </span>
                            </td>

                            <td className="py-3.5 px-3">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase whitespace-nowrap ${user.statusBadge}`}>
                                {user.status}
                              </span>
                            </td>

                            <td className="py-3.5 px-3 font-bold text-slate-900">
                              {user.gameSessions !== null ? user.gameSessions : '-'}
                            </td>

                            <td className="py-3.5 px-3 min-w-[120px]">
                              {user.completionRate !== null ? (
                                <div className="space-y-1">
                                  <div className="text-slate-900 font-extrabold text-[11px]">{user.completionRate}%</div>
                                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                    <div
                                      className="bg-[#5551ff] h-1.5 rounded-full"
                                      style={{ width: `${user.completionRate}%` }}
                                    ></div>
                                  </div>
                                </div>
                              ) : (
                                <span className="text-slate-400 font-bold">-</span>
                              )}
                            </td>

                            <td className="py-3.5 px-3 text-slate-500 font-medium whitespace-nowrap text-[11px]">
                              {user.lastActive}
                            </td>

                            <td className="py-3.5 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                              <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer / Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-slate-100 text-xs font-semibold text-slate-500 gap-3">
                  <div>Showing 1-8 of 3,120 users</div>

                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1.5">
                      <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-400">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button className="w-7 h-7 rounded-lg bg-[#5551ff] text-white font-black flex items-center justify-center">
                        1
                      </button>
                      <button className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center">
                        2
                      </button>
                      <button className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center">
                        3
                      </button>
                      <span className="text-slate-400 px-1 font-bold">...</span>
                      <button className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center">
                        390
                      </button>
                      <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-400">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <select className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-700">
                      <option>8 per page</option>
                      <option>16 per page</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Right Column: User Details Panel */}
              <div className="lg:col-span-1 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-5 sticky top-6">
                
                {/* Panel Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-black text-slate-900">User Details</h3>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 border border-indigo-200 bg-indigo-50/60 hover:bg-[#5551ff] text-[#5551ff] hover:text-white rounded-lg text-xs font-extrabold flex items-center space-x-1.5 transition-all">
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit User</span>
                    </button>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${activeUser.statusBadge}`}>
                      {activeUser.status}
                    </span>
                  </div>
                </div>

                {/* User Profile Header Card */}
                <div className="flex items-start space-x-4">
                  <img
                    src={activeUser.avatar}
                    alt={activeUser.name}
                    className="w-16 h-16 rounded-2xl object-cover border border-slate-200/80 shadow-xs shrink-0"
                  />
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-base font-black text-slate-900">{activeUser.name}</h4>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${activeUser.roleBadge}`}>
                        {activeUser.role}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1.5 text-slate-500 font-medium">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{activeUser.email}</span>
                    </div>

                    <div className="flex items-center space-x-1.5 text-slate-500 font-medium">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{activeUser.organization}</span>
                    </div>

                    <div className="flex items-center space-x-1.5 text-slate-400 text-[11px] font-medium pt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Joined on {activeUser.dateJoined}</span>
                    </div>

                    <div className="flex items-center space-x-1.5 text-slate-400 text-[11px] font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Last active {activeUser.lastActive}</span>
                    </div>
                  </div>
                </div>

                {/* Detail Sub-Tabs (Overview, Game Activity, Learning Progress, Achievements) */}
                <div className="space-y-4 pt-1">
                  <div className="border-b border-slate-100 flex items-center space-x-4 text-xs font-bold text-slate-400">
                    <button
                      onClick={() => setUserMgmtDetailSubTab('overview')}
                      className={`pb-2 border-b-2 transition-all ${
                        userMgmtDetailSubTab === 'overview'
                          ? 'border-[#5551ff] text-[#5551ff] font-extrabold'
                          : 'border-transparent hover:text-slate-600'
                      }`}
                    >
                      Overview
                    </button>

                    <button
                      onClick={() => setUserMgmtDetailSubTab('gameplay')}
                      className={`pb-2 border-b-2 transition-all ${
                        userMgmtDetailSubTab === 'gameplay'
                          ? 'border-[#5551ff] text-[#5551ff] font-extrabold'
                          : 'border-transparent hover:text-slate-600'
                      }`}
                    >
                      Game Activity
                    </button>

                    <button
                      onClick={() => setUserMgmtDetailSubTab('learning')}
                      className={`pb-2 border-b-2 transition-all ${
                        userMgmtDetailSubTab === 'learning'
                          ? 'border-[#5551ff] text-[#5551ff] font-extrabold'
                          : 'border-transparent hover:text-slate-600'
                      }`}
                    >
                      Learning Progress
                    </button>

                    <button
                      onClick={() => setUserMgmtDetailSubTab('achievements')}
                      className={`pb-2 border-b-2 transition-all ${
                        userMgmtDetailSubTab === 'achievements'
                          ? 'border-[#5551ff] text-[#5551ff] font-extrabold'
                          : 'border-transparent hover:text-slate-600'
                      }`}
                    >
                      Achievements
                    </button>
                  </div>

                  {/* Sub-Tab Content: Overview */}
                  {userMgmtDetailSubTab === 'overview' && (
                    <div className="space-y-4">
                      
                      {/* 4 Metric Highlights Grid (2x2) */}
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        
                        <div className="p-3 bg-slate-50/80 border border-slate-200/60 rounded-2xl flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-xl bg-indigo-100/80 text-[#5551ff] flex items-center justify-center shrink-0">
                            <Gamepad2 className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-base font-black text-slate-900">{activeUser.gameSessions !== null ? activeUser.gameSessions : 0}</div>
                            <div className="text-[10px] text-slate-400 font-bold">Game Sessions</div>
                          </div>
                        </div>

                        <div className="p-3 bg-slate-50/80 border border-slate-200/60 rounded-2xl flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-xl bg-amber-100/80 text-amber-500 flex items-center justify-center shrink-0">
                            <Trophy className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-base font-black text-slate-900">{activeUser.completionRate !== null ? `${activeUser.completionRate}%` : 'N/A'}</div>
                            <div className="text-[10px] text-slate-400 font-bold">Completion Rate</div>
                          </div>
                        </div>

                        <div className="p-3 bg-slate-50/80 border border-slate-200/60 rounded-2xl flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-xl bg-sky-100/80 text-sky-600 flex items-center justify-center shrink-0">
                            <BookOpen className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-base font-black text-slate-900">{activeUser.modulesCompleted !== null ? activeUser.modulesCompleted : 0}</div>
                            <div className="text-[10px] text-slate-400 font-bold">Modules Completed</div>
                          </div>
                        </div>

                        <div className="p-3 bg-slate-50/80 border border-slate-200/60 rounded-2xl flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-xl bg-rose-100/80 text-rose-500 flex items-center justify-center shrink-0">
                            <Target className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-base font-black text-slate-900">{activeUser.quizSuccessRate !== null ? `${activeUser.quizSuccessRate}%` : 'N/A'}</div>
                            <div className="text-[10px] text-slate-400 font-bold">Quiz Success Rate</div>
                          </div>
                        </div>

                      </div>

                      {/* Organization Details Box */}
                      <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#5551ff] flex items-center justify-center shrink-0 border border-indigo-100">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-[10px] uppercase font-bold text-slate-400">Organization Details</div>
                            <div className="text-sm font-black text-slate-900">{activeUser.organization}</div>
                            <div className="text-[10px] text-slate-500 font-medium">{activeUser.orgCategory}</div>
                          </div>
                        </div>

                        <button className="px-3 py-1.5 text-[#5551ff] hover:bg-purple-50 font-extrabold text-xs rounded-xl transition-colors">
                          View Organization
                        </button>
                      </div>

                      {/* Recent Activity Timeline */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs font-black text-slate-900">Recent Activity</h5>
                          <button className="text-[11px] text-[#5551ff] font-extrabold hover:underline">View All</button>
                        </div>

                        <div className="space-y-2.5">
                          {activeUser.recentActivity.map((act, actIdx) => (
                            <div key={actIdx} className="flex items-start space-x-3 text-xs font-semibold">
                              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${act.color}`}>
                                {act.type === 'check' && <CheckCircle2 className="w-4 h-4" />}
                                {act.type === 'game' && <Gamepad2 className="w-4 h-4" />}
                                {act.type === 'quiz' && <HelpCircle className="w-4 h-4" />}
                                {act.type === 'doc' && <FileText className="w-4 h-4" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-slate-800 leading-snug font-medium truncate">{act.label}</div>
                                <div className="text-[10px] text-slate-400 font-bold mt-0.5">{act.time}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}

                  {userMgmtDetailSubTab !== 'overview' && (
                    <div className="p-6 text-center text-xs text-slate-400 font-medium border border-dashed border-slate-200 rounded-2xl">
                      Additional user records and history details for {userMgmtDetailSubTab}.
                    </div>
                  )}

                </div>

              </div>

            </div>

          </div>
        )}

        {/* INCLUSION METRICS TAB VIEW */}
        {activeTab === 'inclusion-metrics' && (
          <div className="space-y-6 pb-12">
            {/* Top Header Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Inclusion Metrics</h1>
                <p className="text-sm font-medium text-slate-500 mt-1">
                  Measure, analyze, and track real-world inclusion impact through learning, decisions, and behaviour change.
                </p>
              </div>
              <button className="flex items-center space-x-2 px-5 py-2.5 rounded-xl border border-indigo-200 bg-white text-[#5551ff] font-extrabold hover:bg-indigo-50 shadow-sm transition-all self-start lg:self-auto">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>

            {/* 5 Key Stat Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* Card 1: Total Players */}
              <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-indigo-50 text-[#5551ff]">
                    <Users className="w-6 h-6" />
                  </div>
                  <div className="flex items-center space-x-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    <span>↑ 18%</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-black text-slate-900">12,540</div>
                  <div className="text-xs font-bold text-slate-400 mt-0.5">Total Players</div>
                </div>
                <div className="mt-3 h-6 w-full">
                  <svg className="w-full h-full text-emerald-500 overflow-visible" viewBox="0 0 100 24" fill="none">
                    <path d="M 0 18 Q 25 12 50 15 T 100 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Card 2: Organizations */}
              <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div className="flex items-center space-x-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    <span>↑ 25%</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-black text-slate-900">52</div>
                  <div className="text-xs font-bold text-slate-400 mt-0.5">Organizations</div>
                </div>
                <div className="mt-3 h-6 w-full">
                  <svg className="w-full h-full text-emerald-500 overflow-visible" viewBox="0 0 100 24" fill="none">
                    <path d="M 0 20 Q 25 16 50 10 T 100 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Card 3: Avg Inclusion Score */}
              <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-rose-50 text-rose-500">
                    <Target className="w-6 h-6" />
                  </div>
                  <div className="flex items-center space-x-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    <span>↑ 12%</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-black text-slate-900">78%</div>
                  <div className="text-xs font-bold text-slate-400 mt-0.5">Avg. Inclusion Score</div>
                </div>
                <div className="mt-3 h-6 w-full">
                  <svg className="w-full h-full text-rose-500 overflow-visible" viewBox="0 0 100 24" fill="none">
                    <path d="M 0 18 Q 30 14 60 16 T 100 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Card 4: Learning Completion */}
              <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-sky-50 text-sky-600">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="flex items-center space-x-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    <span>↑ 15%</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-black text-slate-900">86%</div>
                  <div className="text-xs font-bold text-slate-400 mt-0.5">Learning Completion</div>
                </div>
                <div className="mt-3 h-6 w-full">
                  <svg className="w-full h-full text-sky-500 overflow-visible" viewBox="0 0 100 24" fill="none">
                    <path d="M 0 19 Q 35 15 65 8 T 100 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Card 5: Behaviour Changes */}
              <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-amber-50 text-amber-600">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="flex items-center space-x-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    <span>↑ 28%</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-black text-slate-900">6,240</div>
                  <div className="text-xs font-bold text-slate-400 mt-0.5">Behaviour Changes</div>
                </div>
                <div className="mt-3 h-6 w-full">
                  <svg className="w-full h-full text-amber-500 overflow-visible" viewBox="0 0 100 24" fill="none">
                    <path d="M 0 20 Q 20 18 50 12 T 100 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Sub Navigation Bar */}
            <div className="flex items-center space-x-2 border-b border-slate-200 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'overview', label: 'Overview', icon: SlidersHorizontal },
                { id: 'score', label: 'Inclusion Score', icon: Target },
                { id: 'learning', label: 'Learning Progress', icon: GraduationCap },
                { id: 'behaviour', label: 'Behaviour Change', icon: Activity },
                { id: 'comparison', label: 'Organization Comparison', icon: Building2 },
                { id: 'demographics', label: 'Demographics', icon: Users },
                { id: 'trends', label: 'Trends & Analysis', icon: TrendingUp }
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = inclusionSubTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setInclusionSubTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-4 py-3 text-xs font-extrabold transition-all border-b-2 whitespace-nowrap ${
                      isActive
                        ? 'border-[#5551ff] text-[#5551ff]'
                        : 'border-transparent text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Filter Control Bar */}
            <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-3 flex-1">
                {/* Time Period Filter */}
                <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-bold">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-[11px] text-slate-400 font-medium">Time Period</span>
                  <select
                    value={inclusionTimePeriod}
                    onChange={(e) => setInclusionTimePeriod(e.target.value)}
                    className="bg-transparent font-extrabold focus:outline-none text-slate-900 cursor-pointer"
                  >
                    <option value="Jan 2024 - Oct 2024">Jan 2024 - Oct 2024</option>
                    <option value="Q3 2024">Q3 2024</option>
                    <option value="Q2 2024">Q2 2024</option>
                    <option value="Full Year 2024">Full Year 2024</option>
                  </select>
                </div>

                {/* Organization Filter */}
                <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-bold">
                  <span className="text-[11px] text-slate-400 font-medium">Organization</span>
                  <select
                    value={inclusionOrgFilter}
                    onChange={(e) => setInclusionOrgFilter(e.target.value)}
                    className="bg-transparent font-extrabold focus:outline-none text-slate-900 cursor-pointer"
                  >
                    <option value="All Organizations">All Organizations</option>
                    <option value="TechMind Solutions">TechMind Solutions</option>
                    <option value="Horizon Industries">Horizon Industries</option>
                    <option value="Global Logistics">Global Logistics</option>
                    <option value="Sunrise Energy">Sunrise Energy</option>
                    <option value="Apex Manufacturing">Apex Manufacturing</option>
                  </select>
                </div>

                {/* User Role Filter */}
                <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-bold">
                  <span className="text-[11px] text-slate-400 font-medium">User Role</span>
                  <select
                    value={inclusionRoleFilter}
                    onChange={(e) => setInclusionRoleFilter(e.target.value)}
                    className="bg-transparent font-extrabold focus:outline-none text-slate-900 cursor-pointer"
                  >
                    <option value="All Roles">All Roles</option>
                    <option value="Senior Executive">Senior Executive</option>
                    <option value="People Manager">People Manager</option>
                    <option value="Individual Contributor">Individual Contributor</option>
                  </select>
                </div>

                {/* Game Mode Filter */}
                <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-bold">
                  <span className="text-[11px] text-slate-400 font-medium">Game Mode</span>
                  <select
                    value={inclusionModeFilter}
                    onChange={(e) => setInclusionModeFilter(e.target.value)}
                    className="bg-transparent font-extrabold focus:outline-none text-slate-900 cursor-pointer"
                  >
                    <option value="All Modes">All Modes</option>
                    <option value="Single Player">Single Player</option>
                    <option value="Multiplayer Lobby">Multiplayer Lobby</option>
                    <option value="Tournament">Tournament</option>
                  </select>
                </div>

                {/* Module Category */}
                <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-bold">
                  <span className="text-[11px] text-slate-400 font-medium">Module Category</span>
                  <select
                    value={inclusionCategoryFilter}
                    onChange={(e) => setInclusionCategoryFilter(e.target.value)}
                    className="bg-transparent font-extrabold focus:outline-none text-slate-900 cursor-pointer"
                  >
                    <option value="All Categories">All Categories</option>
                    <option value="Leadership">Leadership</option>
                    <option value="Flexible Work">Flexible Work</option>
                    <option value="Workplace Culture">Workplace Culture</option>
                  </select>
                </div>

                {/* Department */}
                <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-bold">
                  <span className="text-[11px] text-slate-400 font-medium">Department</span>
                  <select
                    value={inclusionDeptFilter}
                    onChange={(e) => setInclusionDeptFilter(e.target.value)}
                    className="bg-transparent font-extrabold focus:outline-none text-slate-900 cursor-pointer"
                  >
                    <option value="All Departments">All Departments</option>
                    <option value="Engineering">Engineering</option>
                    <option value="HR & Admin">HR & Admin</option>
                    <option value="Sales & Mktg">Sales & Mktg</option>
                  </select>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setInclusionTimePeriod('Jan 2024 - Oct 2024');
                    setInclusionOrgFilter('All Organizations');
                    setInclusionRoleFilter('All Roles');
                    setInclusionModeFilter('All Modes');
                    setInclusionCategoryFilter('All Categories');
                    setInclusionDeptFilter('All Departments');
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-extrabold transition-all"
                >
                  Reset
                </button>
                <button className="flex items-center space-x-2 px-5 py-2 bg-[#5551ff] hover:bg-[#4440ee] text-white rounded-xl font-extrabold shadow-md transition-all">
                  <Filter className="w-4 h-4" />
                  <span>Apply Filters</span>
                </button>
              </div>
            </div>

            {/* Main Grid Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Card 1: Inclusion Score Trend (4 cols) */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1.5">
                      <h2 className="text-base font-black text-slate-900">Inclusion Score Trend</h2>
                      <span className="text-slate-400 cursor-pointer hover:text-slate-600 text-xs bg-slate-100 w-4 h-4 rounded-full flex items-center justify-center font-bold">i</span>
                    </div>
                    <select
                      value={inclusionTrendMonth}
                      onChange={(e) => setInclusionTrendMonth(e.target.value)}
                      className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 focus:outline-none cursor-pointer"
                    >
                      <option value="Last 10 Months">Last 10 Months</option>
                      <option value="Last 6 Months">Last 6 Months</option>
                      <option value="Last Year">Last Year</option>
                    </select>
                  </div>

                  {/* Line Chart Container */}
                  <div className="relative h-56 w-full mt-2">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 350 180" fill="none">
                      {/* Grid lines */}
                      {[0, 36, 72, 108, 144].map((y, idx) => (
                        <g key={idx}>
                          <line x1="30" y1={y + 10} x2="340" y2={y + 10} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                          <text x="5" y={y + 14} fill="#94a3b8" fontSize="9" fontWeight="700">{100 - idx * 20}</text>
                        </g>
                      ))}

                      {/* X Axis Months */}
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'].map((m, i) => (
                        <text key={i} x={35 + i * 31} y="172" fill="#94a3b8" fontSize="8" fontWeight="700">{m}</text>
                      ))}

                      {/* Trend Lines */}
                      {/* Line 1: Overall (Purple) */}
                      <path
                        d="M 35 120 C 65 110, 95 95, 125 80 C 155 70, 185 62, 215 55 C 245 48, 275 45, 314 40"
                        stroke="#5551ff"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      {/* Line 2: Gender Equality (Sky Blue) */}
                      <path
                        d="M 35 135 C 65 128, 95 115, 125 100 C 155 90, 185 82, 215 72 C 245 64, 275 60, 314 54"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />

                      {/* Line 3: Diversity & Inclusion (Green) */}
                      <path
                        d="M 35 145 C 65 138, 95 125, 125 115 C 155 105, 185 96, 215 88 C 245 80, 275 74, 314 68"
                        stroke="#10b981"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />

                      {/* Line 4: Equal Opportunities (Orange) */}
                      <path
                        d="M 35 160 C 65 152, 95 142, 125 132 C 155 124, 185 116, 215 108 C 245 102, 275 96, 314 90"
                        stroke="#f97316"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Legend */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#5551ff]"></span>
                    <span className="text-slate-700">Overall</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]"></span>
                    <span className="text-slate-700">Gender Equality</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
                    <span className="text-slate-700">Diversity & Inclusion</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f97316]"></span>
                    <span className="text-slate-700">Equal Opportunities</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Inclusion Score by Organization (4 cols) */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1.5">
                      <h2 className="text-base font-black text-slate-900">Inclusion Score by Organization</h2>
                      <span className="text-slate-400 cursor-pointer hover:text-slate-600 text-xs bg-slate-100 w-4 h-4 rounded-full flex items-center justify-center font-bold">i</span>
                    </div>
                    <button className="text-xs font-black text-[#5551ff] hover:underline">View All</button>
                  </div>

                  {/* Vertical Bar Chart */}
                  <div className="h-60 w-full flex items-end justify-between px-2 pt-6">
                    {[
                      { name: 'TechMind Solutions', score: 92, height: '92%' },
                      { name: 'Horizon Industries', score: 88, height: '88%' },
                      { name: 'Global Logistics', score: 84, height: '84%' },
                      { name: 'Sunrise Energy', score: 78, height: '78%' },
                      { name: 'Apex Manufacturing', score: 72, height: '72%' },
                      { name: 'Vertex Systems', score: 68, height: '68%' }
                    ].map((org, i) => (
                      <div key={i} className="flex flex-col items-center flex-1 space-y-2 group">
                        <span className="text-[11px] font-black text-slate-800">{org.score}</span>
                        <div className="w-7 bg-slate-100 rounded-t-xl overflow-hidden h-40 flex items-end">
                          <div
                            style={{ height: org.height }}
                            className={`w-full rounded-t-xl transition-all duration-500 ${
                              i < 3
                                ? 'bg-gradient-to-t from-[#5551ff] to-indigo-400 shadow-md group-hover:brightness-110'
                                : 'bg-indigo-200 group-hover:bg-indigo-300'
                            }`}
                          />
                        </div>
                        <span className="text-[9px] font-bold text-slate-500 truncate max-w-[50px] text-center leading-tight">
                          {org.name.split(' ')[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 3: Key Inclusion Metrics (4 cols) */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-1.5 mb-6">
                    <h2 className="text-base font-black text-slate-900">Key Inclusion Metrics</h2>
                    <span className="text-slate-400 cursor-pointer hover:text-slate-600 text-xs bg-slate-100 w-4 h-4 rounded-full flex items-center justify-center font-bold">i</span>
                  </div>

                  <div className="space-y-4">
                    {[
                      { label: 'Gender Equality', pct: 82, color: 'bg-gradient-to-r from-purple-600 to-indigo-500' },
                      { label: 'Equal Opportunities', pct: 76, color: 'bg-gradient-to-r from-sky-500 to-blue-600' },
                      { label: 'Inclusive Leadership', pct: 68, color: 'bg-gradient-to-r from-emerald-500 to-teal-500' },
                      { label: 'Diversity & Belonging', pct: 71, color: 'bg-gradient-to-r from-amber-500 to-orange-500' },
                      { label: 'Bias Awareness', pct: 85, color: 'bg-gradient-to-r from-pink-500 to-rose-500' }
                    ].map((m, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs font-extrabold text-slate-700">
                          <span>{m.label}</span>
                          <span className="text-slate-900">{m.pct}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5">
                          <div
                            className={`h-full rounded-full ${m.color} transition-all duration-700`}
                            style={{ width: `${m.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Grid Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Card 1: Behaviour Change Impact (4 cols) */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-1.5 mb-4">
                    <h2 className="text-base font-black text-slate-900">Behaviour Change Impact</h2>
                    <span className="text-slate-400 cursor-pointer hover:text-slate-600 text-xs bg-slate-100 w-4 h-4 rounded-full flex items-center justify-center font-bold">i</span>
                  </div>

                  <div className="h-60 w-full flex items-end justify-between px-2 pt-6">
                    {[
                      { name: 'More Inclusive Decisions', val: '1,840', pct: 92, color: 'bg-[#5551ff]' },
                      { name: 'Bias Reduction', val: '1,520', pct: 76, color: 'bg-sky-400' },
                      { name: 'Support Diverse Teams', val: '1,210', pct: 60, color: 'bg-emerald-400' },
                      { name: 'Inclusive Policies', val: '960', pct: 48, color: 'bg-amber-400' },
                      { name: 'Mentorship Initiatives', val: '690', pct: 34, color: 'bg-pink-400' }
                    ].map((b, i) => (
                      <div key={i} className="flex flex-col items-center flex-1 space-y-2 group">
                        <span className="text-[10px] font-black text-slate-800">{b.val}</span>
                        <div className="w-8 bg-slate-100 rounded-t-xl overflow-hidden h-40 flex items-end">
                          <div
                            style={{ height: `${b.pct}%` }}
                            className={`w-full rounded-t-xl ${b.color} group-hover:brightness-110 transition-all duration-500`}
                          />
                        </div>
                        <span className="text-[9px] font-bold text-slate-500 truncate max-w-[55px] text-center leading-tight">
                          {b.name.split(' ')[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 2: Module-wise Inclusion Improvement (4 cols) */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1.5">
                      <h2 className="text-base font-black text-slate-900">Module-wise Inclusion Improvement</h2>
                      <span className="text-slate-400 cursor-pointer hover:text-slate-600 text-xs bg-slate-100 w-4 h-4 rounded-full flex items-center justify-center font-bold">i</span>
                    </div>
                    <select
                      value={inclusionModuleFilter}
                      onChange={(e) => setInclusionModuleFilter(e.target.value)}
                      className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 focus:outline-none cursor-pointer"
                    >
                      <option value="All Modules">All Modules</option>
                      <option value="Inclusive Leadership">Inclusive Leadership</option>
                      <option value="Bias Reduction">Bias Reduction</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-center space-x-4 my-2">
                    {/* SVG Donut */}
                    <div className="relative w-40 h-40 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-slate-100"
                          strokeWidth="3.8"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          strokeDasharray="42, 100"
                          className="text-[#5551ff]"
                          strokeWidth="3.8"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          strokeDasharray="24, 100"
                          strokeDashoffset="-42"
                          className="text-sky-400"
                          strokeWidth="3.8"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          strokeDasharray="18, 100"
                          strokeDashoffset="-66"
                          className="text-emerald-400"
                          strokeWidth="3.8"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          strokeDasharray="10, 100"
                          strokeDashoffset="-84"
                          className="text-amber-400"
                          strokeWidth="3.8"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          strokeDasharray="6, 100"
                          strokeDashoffset="-94"
                          className="text-rose-400"
                          strokeWidth="3.8"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-xl font-black text-emerald-600">+34%</span>
                        <span className="text-[9px] font-bold text-slate-400 leading-tight">Avg. Improvement</span>
                      </div>
                    </div>

                    {/* Legend List */}
                    <div className="space-y-1.5 text-[11px] font-bold">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#5551ff]"></span>
                        <span className="text-slate-700">Inclusive Leadership</span>
                        <span className="text-slate-900 font-black ml-auto">42%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                        <span className="text-slate-700">Gender Equality</span>
                        <span className="text-slate-900 font-black ml-auto">24%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                        <span className="text-slate-700">Diversity & Belonging</span>
                        <span className="text-slate-900 font-black ml-auto">18%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                        <span className="text-slate-700">Equal Opportunities</span>
                        <span className="text-slate-900 font-black ml-auto">10%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                        <span className="text-slate-700">Bias Awareness</span>
                        <span className="text-slate-900 font-black ml-auto">6%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Player Distribution by Inclusion Level (4 cols) */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-1.5 mb-4">
                    <h2 className="text-base font-black text-slate-900">Player Distribution by Inclusion Level</h2>
                    <span className="text-slate-400 cursor-pointer hover:text-slate-600 text-xs bg-slate-100 w-4 h-4 rounded-full flex items-center justify-center font-bold">i</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {/* High Card */}
                    <div className="p-3.5 bg-emerald-50/60 border border-emerald-100 rounded-2xl flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg">
                          <UserCheck className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-black text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">High</span>
                      </div>
                      <div className="mt-3">
                        <div className="text-lg font-black text-slate-900">4,820</div>
                        <div className="text-[10px] font-bold text-slate-400">Players</div>
                      </div>
                      <div className="mt-2 text-xs font-black text-emerald-600">38%</div>
                    </div>

                    {/* Medium Card */}
                    <div className="p-3.5 bg-sky-50/60 border border-sky-100 rounded-2xl flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <div className="p-1.5 bg-sky-100 text-sky-600 rounded-lg">
                          <Users className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-black text-sky-700 bg-sky-100/70 px-2 py-0.5 rounded-full">Medium</span>
                      </div>
                      <div className="mt-3">
                        <div className="text-lg font-black text-slate-900">5,640</div>
                        <div className="text-[10px] font-bold text-slate-400">Players</div>
                      </div>
                      <div className="mt-2 text-xs font-black text-sky-600">45%</div>
                    </div>

                    {/* Developing Card */}
                    <div className="p-3.5 bg-amber-50/60 border border-amber-100 rounded-2xl flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <div className="p-1.5 bg-amber-100 text-amber-600 rounded-lg">
                          <Award className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-black text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-full">Developing</span>
                      </div>
                      <div className="mt-3">
                        <div className="text-lg font-black text-slate-900">1,680</div>
                        <div className="text-[10px] font-bold text-slate-400">Players</div>
                      </div>
                      <div className="mt-2 text-xs font-black text-amber-600">13%</div>
                    </div>

                    {/* Needs Support Card */}
                    <div className="p-3.5 bg-rose-50/60 border border-rose-100 rounded-2xl flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <div className="p-1.5 bg-rose-100 text-rose-600 rounded-lg">
                          <UserX className="w-4 h-4 text-rose-500" />
                        </div>
                        <span className="text-xs font-black text-rose-700 bg-rose-100/70 px-2 py-0.5 rounded-full">Needs Support</span>
                      </div>
                      <div className="mt-3">
                        <div className="text-lg font-black text-slate-900">400</div>
                        <div className="text-[10px] font-bold text-slate-400">Players</div>
                      </div>
                      <div className="mt-2 text-xs font-black text-rose-600">4%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Table Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-1.5">
                  <h2 className="text-base font-black text-slate-900">Top Players by Inclusion Impact</h2>
                  <span className="text-slate-400 cursor-pointer hover:text-slate-600 text-xs bg-slate-100 w-4 h-4 rounded-full flex items-center justify-center font-bold">i</span>
                </div>
                <button className="text-xs font-black text-[#5551ff] hover:underline">View All</button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                      <th className="pb-3 pl-2">#</th>
                      <th className="pb-3">Player</th>
                      <th className="pb-3">Organization</th>
                      <th className="pb-3">Inclusion Score</th>
                      <th className="pb-3">Learning Completion</th>
                      <th className="pb-3">Behaviour Impact</th>
                      <th className="pb-3">Games Completed</th>
                      <th className="pb-3">Badges</th>
                      <th className="pb-3 text-right pr-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {topPlayersInclusionData.map((player) => (
                      <tr key={player.rank} className="hover:bg-slate-50/80 transition-all">
                        <td className="py-4 pl-2 font-black">
                          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-black ${
                            player.rank === 1 ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                            player.rank === 2 ? 'bg-slate-200 text-slate-700' :
                            player.rank === 3 ? 'bg-amber-700/10 text-amber-800' :
                            'text-slate-500'
                          }`}>
                            {player.rank}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center space-x-3">
                            <img src={player.avatar} alt={player.name} className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-sm" />
                            <span className="font-extrabold text-slate-900">{player.name}</span>
                          </div>
                        </td>
                        <td className="py-4 font-bold text-slate-600">{player.org}</td>
                        <td className="py-4">
                          <div className="flex items-center space-x-3">
                            <span className="font-black text-emerald-600 w-8">{player.score}%</span>
                            <div className="w-28 bg-slate-100 rounded-full h-2 overflow-hidden">
                              <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${player.score}%` }} />
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center space-x-3">
                            <span className="font-black text-[#5551ff] w-8">{player.learning}%</span>
                            <div className="w-28 bg-slate-100 rounded-full h-2 overflow-hidden">
                              <div className="bg-[#5551ff] h-full rounded-full" style={{ width: `${player.learning}%` }} />
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center space-x-3">
                            <span className="font-black text-sky-600 w-8">{player.behaviour}%</span>
                            <div className="w-28 bg-slate-100 rounded-full h-2 overflow-hidden">
                              <div className="bg-sky-500 h-full rounded-full" style={{ width: `${player.behaviour}%` }} />
                            </div>
                          </div>
                        </td>
                        <td className="py-4 font-extrabold text-slate-800">{player.gamesCompleted}</td>
                        <td className="py-4">
                          <div className="flex items-center space-x-1">
                            <span className="p-1 rounded-full bg-amber-100 text-amber-600"><Star className="w-3.5 h-3.5 fill-amber-400" /></span>
                            <span className="p-1 rounded-full bg-indigo-100 text-[#5551ff]"><Award className="w-3.5 h-3.5" /></span>
                            <span className="p-1 rounded-full bg-emerald-100 text-emerald-600"><CheckCircle2 className="w-3.5 h-3.5" /></span>
                          </div>
                        </td>
                        <td className="py-4 text-right pr-2">
                          <button className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-700 transition-all">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* NOTIFICATIONS TAB VIEW */}
        {activeTab === 'notifications' && (
          <div className="space-y-6 pb-12">
            {/* Top Header Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Notifications</h1>
                <p className="text-sm font-medium text-slate-500 mt-1">
                  Send and manage notifications to players, organizations, and partner admins.
                </p>
              </div>
              <button
                onClick={() => setShowSendNotifModal(true)}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#5551ff] hover:bg-[#4440ee] text-white font-extrabold shadow-md transition-all self-start lg:self-auto cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Notification</span>
              </button>
            </div>

            {/* 6 Key Stat Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {/* Card 1: Total Notifications */}
              <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-2xl bg-indigo-50 text-[#5551ff]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex items-center space-x-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <span>↑ 12%</span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-black text-slate-900">48</div>
                  <div className="text-[11px] font-bold text-slate-400 mt-0.5">Total Notifications</div>
                </div>
                <div className="mt-2 h-5 w-full">
                  <svg className="w-full h-full text-indigo-500 overflow-visible" viewBox="0 0 100 24" fill="none">
                    <path d="M 0 18 Q 30 12 60 14 T 100 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Card 2: Total Recipients */}
              <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-2xl bg-pink-50 text-pink-600">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="flex items-center space-x-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <span>↑ 18%</span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-black text-slate-900">12,540</div>
                  <div className="text-[11px] font-bold text-slate-400 mt-0.5">Total Recipients</div>
                </div>
                <div className="mt-2 h-5 w-full">
                  <svg className="w-full h-full text-pink-500 overflow-visible" viewBox="0 0 100 24" fill="none">
                    <path d="M 0 20 Q 25 15 50 10 T 100 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Card 3: Open Rate */}
              <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600">
                    <Target className="w-5 h-5" />
                  </div>
                  <div className="flex items-center space-x-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <span>↑ 6%</span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-black text-slate-900">68%</div>
                  <div className="text-[11px] font-bold text-slate-400 mt-0.5">Open Rate</div>
                </div>
                <div className="mt-2 h-5 w-full">
                  <svg className="w-full h-full text-emerald-500 overflow-visible" viewBox="0 0 100 24" fill="none">
                    <path d="M 0 19 Q 35 16 65 11 T 100 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Card 4: Click Rate */}
              <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600">
                    <LinkIcon className="w-5 h-5" />
                  </div>
                  <div className="flex items-center space-x-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <span>↑ 4%</span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-black text-slate-900">24%</div>
                  <div className="text-[11px] font-bold text-slate-400 mt-0.5">Click Rate</div>
                </div>
                <div className="mt-2 h-5 w-full">
                  <svg className="w-full h-full text-amber-500 overflow-visible" viewBox="0 0 100 24" fill="none">
                    <path d="M 0 18 Q 30 14 60 12 T 100 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Card 5: Sent Notifications */}
              <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-2xl bg-sky-50 text-sky-600">
                    <Send className="w-5 h-5" />
                  </div>
                  <div className="flex items-center space-x-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <span>↑ 20%</span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-black text-slate-900">42</div>
                  <div className="text-[11px] font-bold text-slate-400 mt-0.5">Sent Notifications</div>
                </div>
                <div className="mt-2 h-5 w-full">
                  <svg className="w-full h-full text-sky-500 overflow-visible" viewBox="0 0 100 24" fill="none">
                    <path d="M 0 20 Q 25 14 50 8 T 100 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Card 6: Scheduled */}
              <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-2xl bg-purple-50 text-purple-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex items-center space-x-1 text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    <span>0%</span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-black text-slate-900">6</div>
                  <div className="text-[11px] font-bold text-slate-400 mt-0.5">Scheduled</div>
                </div>
                <div className="mt-2 h-5 w-full">
                  <svg className="w-full h-full text-slate-400 overflow-visible" viewBox="0 0 100 24" fill="none">
                    <path d="M 0 12 L 100 12" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Sub Navigation Bar */}
            <div className="flex items-center space-x-6 border-b border-slate-200">
              {[
                { id: 'all', label: 'All Notifications (48)' },
                { id: 'scheduled', label: 'Scheduled (6)' },
                { id: 'drafts', label: 'Drafts (4)' },
                { id: 'sent', label: 'Sent (38)' }
              ].map(tab => {
                const isActive = notifSubTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setNotifSubTab(tab.id as any)}
                    className={`py-3 text-xs font-extrabold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'border-[#5551ff] text-[#5551ff]'
                        : 'border-transparent text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Filter Control Bar */}
            <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-3 flex-1">
                {/* Search Bar */}
                <div className="relative min-w-[220px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search notifications..."
                    value={notifSearchQuery}
                    onChange={(e) => setNotifSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-[#5551ff]"
                  />
                </div>

                {/* Type Filter */}
                <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-bold">
                  <span className="text-[11px] text-slate-400 font-medium">Notification Type</span>
                  <select
                    value={notifTypeFilter}
                    onChange={(e) => setNotifTypeFilter(e.target.value)}
                    className="bg-transparent font-extrabold focus:outline-none text-slate-900 cursor-pointer"
                  >
                    <option value="All Types">All Types</option>
                    <option value="Learning">Learning</option>
                    <option value="Reminder">Reminder</option>
                    <option value="System">System</option>
                    <option value="Report">Report</option>
                    <option value="Event">Event</option>
                    <option value="Achievement">Achievement</option>
                  </select>
                </div>

                {/* Audience Filter */}
                <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-bold">
                  <span className="text-[11px] text-slate-400 font-medium">Audience</span>
                  <select
                    value={notifAudienceFilter}
                    onChange={(e) => setNotifAudienceFilter(e.target.value)}
                    className="bg-transparent font-extrabold focus:outline-none text-slate-900 cursor-pointer"
                  >
                    <option value="All Users">All Users</option>
                    <option value="All Players">All Players</option>
                    <option value="Active Players">Active Players</option>
                    <option value="Organization Admins">Organization Admins</option>
                    <option value="Partner Admins">Partner Admins</option>
                  </select>
                </div>

                {/* Organization Filter */}
                <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-bold">
                  <span className="text-[11px] text-slate-400 font-medium">Organization</span>
                  <select
                    value={notifOrgFilter}
                    onChange={(e) => setNotifOrgFilter(e.target.value)}
                    className="bg-transparent font-extrabold focus:outline-none text-slate-900 cursor-pointer"
                  >
                    <option value="All Organizations">All Organizations</option>
                    <option value="TechMind Solutions">TechMind Solutions</option>
                    <option value="Horizon Industries">Horizon Industries</option>
                  </select>
                </div>

                {/* Status Filter */}
                <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-bold">
                  <span className="text-[11px] text-slate-400 font-medium">Status</span>
                  <select
                    value={notifStatusFilter}
                    onChange={(e) => setNotifStatusFilter(e.target.value)}
                    className="bg-transparent font-extrabold focus:outline-none text-slate-900 cursor-pointer"
                  >
                    <option value="All Status">All Status</option>
                    <option value="Sent">Sent</option>
                    <option value="Draft">Draft</option>
                    <option value="Scheduled">Scheduled</option>
                  </select>
                </div>

                {/* Date Range */}
                <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-bold">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <select
                    value={notifDateRange}
                    onChange={(e) => setNotifDateRange(e.target.value)}
                    className="bg-transparent font-extrabold focus:outline-none text-slate-900 cursor-pointer"
                  >
                    <option value="Jan 2024 - Oct 2024">Jan 2024 - Oct 2024</option>
                    <option value="Last 30 Days">Last 30 Days</option>
                  </select>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setNotifSearchQuery('');
                    setNotifTypeFilter('All Types');
                    setNotifAudienceFilter('All Users');
                    setNotifOrgFilter('All Organizations');
                    setNotifStatusFilter('All Status');
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-extrabold transition-all cursor-pointer"
                >
                  Reset
                </button>
                <button className="flex items-center space-x-2 px-5 py-2 bg-[#5551ff] hover:bg-[#4440ee] text-white rounded-xl font-extrabold shadow-md transition-all cursor-pointer">
                  <Filter className="w-4 h-4" />
                  <span>Apply Filters</span>
                </button>
              </div>
            </div>

            {/* Split Screen Panel Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Panel: Table View (8 cols) */}
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                        <th className="pb-3 pl-2 w-8">
                          <input
                            type="checkbox"
                            checked={selectedNotifIds.length === notificationsData.length}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedNotifIds(notificationsData.map(n => n.id));
                              } else {
                                setSelectedNotifIds([]);
                              }
                            }}
                            className="rounded border-slate-300 text-[#5551ff] focus:ring-[#5551ff]"
                          />
                        </th>
                        <th className="pb-3 w-8">#</th>
                        <th className="pb-3">TITLE</th>
                        <th className="pb-3">TYPE</th>
                        <th className="pb-3">AUDIENCE</th>
                        <th className="pb-3">SENT ON</th>
                        <th className="pb-3">STATUS</th>
                        <th className="pb-3">RECIPIENTS</th>
                        <th className="pb-3">OPEN RATE</th>
                        <th className="pb-3">CLICK RATE</th>
                        <th className="pb-3 text-center">ACTIONS</th>
                        <th className="pb-3 text-right pr-2">
                          <Edit className="w-3.5 h-3.5 text-slate-400 inline-block" />
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {notificationsData.map((notif, index) => {
                        const isSelected = selectedNotifId === notif.id;
                        const isChecked = selectedNotifIds.includes(notif.id);
                        return (
                          <tr
                            key={notif.id}
                            onClick={() => setSelectedNotifId(notif.id)}
                            className={`cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-indigo-50/70 border-l-4 border-l-[#5551ff]'
                                : 'hover:bg-slate-50/80'
                            }`}
                          >
                            <td className="py-4 pl-2" onClick={(e) => e.stopPropagation()}>
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedNotifIds([...selectedNotifIds, notif.id]);
                                  } else {
                                    setSelectedNotifIds(selectedNotifIds.filter(id => id !== notif.id));
                                  }
                                }}
                                className="rounded border-slate-300 text-[#5551ff] focus:ring-[#5551ff]"
                              />
                            </td>
                            <td className="py-4 font-bold text-slate-400">{index + 1}</td>
                            <td className="py-4 font-extrabold text-slate-900 max-w-[200px] truncate">
                              {notif.title}
                            </td>
                            <td className="py-4">
                              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${notif.typeBadge}`}>
                                {notif.type}
                              </span>
                            </td>
                            <td className="py-4 font-bold text-slate-600">{notif.audience}</td>
                            <td className="py-4 font-medium text-slate-500 whitespace-nowrap">{notif.sentOn}</td>
                            <td className="py-4">
                              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${notif.statusBadge}`}>
                                {notif.status}
                              </span>
                            </td>
                            <td className="py-4 font-extrabold text-slate-800">{notif.recipients}</td>
                            <td className="py-4 font-black text-indigo-600">{notif.openRate}</td>
                            <td className="py-4 font-black text-slate-800">{notif.clickRate}</td>
                            <td className="py-4 text-center">
                              <button className="text-slate-400 hover:text-slate-700 font-black">...</button>
                            </td>
                            <td className="py-4 text-right pr-2">
                              <button className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-700">
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100 text-xs font-extrabold text-slate-500">
                  <div>Showing 1-10 of 48 notifications</div>
                  <div className="flex items-center space-x-1">
                    <button className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600">&lt;</button>
                    <button className="px-3 py-1 rounded-lg bg-[#5551ff] text-white">1</button>
                    <button className="px-3 py-1 rounded-lg hover:bg-slate-100 text-slate-600">2</button>
                    <button className="px-3 py-1 rounded-lg hover:bg-slate-100 text-slate-600">3</button>
                    <button className="px-3 py-1 rounded-lg hover:bg-slate-100 text-slate-600">4</button>
                    <button className="px-3 py-1 rounded-lg hover:bg-slate-100 text-slate-600">5</button>
                    <button className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600">&gt;</button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <select className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 font-extrabold text-slate-700">
                      <option>10 per page</option>
                      <option>25 per page</option>
                      <option>50 per page</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Right Panel: Notification Preview Drawer (4 cols) */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-5 sticky top-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h2 className="text-base font-black text-slate-900">Notification Preview</h2>
                  <button className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Status Badges & Date */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${activeNotif.typeBadge}`}>
                      {activeNotif.type}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${activeNotif.statusBadge}`}>
                      {activeNotif.status}
                    </span>
                  </div>
                  <span className="text-[11px] font-extrabold text-slate-400">{activeNotif.fullSentTime}</span>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-lg font-black text-slate-900 leading-snug">{activeNotif.title}</h3>
                  <p className="text-xs font-medium text-slate-500 mt-1">{activeNotif.subtitle}</p>
                </div>

                {/* Preview Inner Sub Tabs */}
                <div className="flex items-center space-x-4 border-b border-slate-100 text-xs font-extrabold">
                  {['overview', 'content', 'audience', 'analytics'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setSelectedNotifTab(tab as any)}
                      className={`pb-2 capitalize transition-all cursor-pointer ${
                        selectedNotifTab === tab
                          ? 'border-b-2 border-[#5551ff] text-[#5551ff]'
                          : 'text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Media Graphic Banner */}
                <div className="relative rounded-2xl bg-gradient-to-br from-[#4440ee] via-[#5551ff] to-purple-600 text-white p-5 shadow-lg overflow-hidden flex items-center justify-between">
                  <div className="relative z-10 space-y-1 max-w-[200px]">
                    <div className="text-base font-black leading-tight">New Learning Module Now Available!</div>
                  </div>
                  <div className="relative z-10 bg-white/20 p-2.5 rounded-2xl backdrop-blur-md">
                    <Sparkles className="w-8 h-8 text-amber-300" />
                  </div>
                  <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
                </div>

                {/* Detail Metadata Items */}
                <div className="space-y-3.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-slate-500 font-bold">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span>Audience Type</span>
                    </div>
                    <span className="font-black text-slate-900">{activeNotif.audience}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-slate-500 font-bold">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span>Sent On</span>
                    </div>
                    <span className="font-extrabold text-slate-900">{activeNotif.fullSentTime}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-slate-500 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-slate-400" />
                      <span>Status</span>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${activeNotif.statusBadge}`}>
                      {activeNotif.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-slate-500 font-bold">
                      <Eye className="w-4 h-4 text-slate-400" />
                      <span>Open Rate</span>
                    </div>
                    <span className="font-black text-slate-900">
                      {activeNotif.openRate} <span className="text-slate-400 font-medium">({activeNotif.openedCount} opened)</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-slate-500 font-bold">
                      <LinkIcon className="w-4 h-4 text-slate-400" />
                      <span>Click Rate</span>
                    </div>
                    <span className="font-black text-slate-900">
                      {activeNotif.clickRate} <span className="text-slate-400 font-medium">({activeNotif.clickedCount} clicked)</span>
                    </span>
                  </div>

                  <div className="space-y-1 pt-1">
                    <div className="flex items-center space-x-2 text-slate-500 font-bold">
                      <FileText className="w-4 h-4 text-slate-400" />
                      <span>Message</span>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-700 leading-relaxed">
                      {activeNotif.message}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="grid grid-cols-3 gap-2">
                    <button className="flex items-center justify-center space-x-1 py-2 px-2 border border-slate-200 hover:bg-slate-50 rounded-xl font-extrabold text-slate-700 text-xs transition-all cursor-pointer">
                      <Edit className="w-3.5 h-3.5 text-slate-500" />
                      <span>Edit</span>
                    </button>
                    <button className="flex items-center justify-center space-x-1 py-2 px-2 border border-slate-200 hover:bg-slate-50 rounded-xl font-extrabold text-slate-700 text-xs transition-all cursor-pointer">
                      <Copy className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Duplicate</span>
                    </button>
                    <button className="flex items-center justify-center space-x-1 py-2 px-2 border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100 text-[#5551ff] rounded-xl font-extrabold text-xs transition-all cursor-pointer">
                      <Send className="w-3.5 h-3.5" />
                      <span>Resend</span>
                    </button>
                  </div>

                  <button className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 border border-indigo-200 text-[#5551ff] hover:bg-indigo-50 rounded-xl font-extrabold text-xs shadow-sm transition-all cursor-pointer">
                    <BarChart3 className="w-4 h-4" />
                    <span>View Analytics</span>
                  </button>

                  <button className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 border border-rose-200 text-rose-600 hover:bg-rose-50 rounded-xl font-extrabold text-xs transition-all cursor-pointer">
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Notification</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS & SYSTEM CONFIGURATION TAB VIEW */}
        {activeTab === 'settings' && (
          <div className="space-y-6 pb-12">
            {/* Top Header Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Settings & System Configuration</h1>
                <p className="text-sm font-medium text-slate-500 mt-1">
                  Manage platform settings, configurations, integrations, and system preferences.
                </p>
              </div>

              {/* Search Bar & Date */}
              <div className="flex items-center space-x-3">
                <div className="relative min-w-[260px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search settings, configurations, users, integrations..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold focus:outline-none focus:border-[#5551ff]"
                  />
                </div>
                <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-bold whitespace-nowrap">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Jan 2024 - Oct 2024</span>
                </div>
              </div>
            </div>

            {/* 4 Key Stat Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: System Modules */}
              <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-indigo-50 text-[#5551ff]">
                    <Settings className="w-6 h-6" />
                  </div>
                  <div className="flex items-center space-x-1 text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                    <span>↑ 0%</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-black text-slate-900">12</div>
                  <div className="text-xs font-bold text-slate-400 mt-0.5">System Modules</div>
                </div>
                <div className="mt-3 h-6 w-full">
                  <svg className="w-full h-full text-indigo-500 overflow-visible" viewBox="0 0 100 24" fill="none">
                    <path d="M 0 16 Q 25 12 50 14 T 100 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Card 2: Integrations */}
              <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="flex items-center space-x-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    <span>↑ 25%</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-black text-slate-900">8</div>
                  <div className="text-xs font-bold text-slate-400 mt-0.5">Integrations</div>
                </div>
                <div className="mt-3 h-6 w-full">
                  <svg className="w-full h-full text-emerald-500 overflow-visible" viewBox="0 0 100 24" fill="none">
                    <path d="M 0 20 Q 25 15 50 10 T 100 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Card 3: Environments */}
              <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-amber-50 text-amber-600">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div className="flex items-center space-x-1 text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                    <span>↑ 0%</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-black text-slate-900">3</div>
                  <div className="text-xs font-bold text-slate-400 mt-0.5">Environments</div>
                </div>
                <div className="mt-3 h-6 w-full">
                  <svg className="w-full h-full text-amber-500 overflow-visible" viewBox="0 0 100 24" fill="none">
                    <path d="M 0 18 Q 30 14 60 16 T 100 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Card 4: Notification Channels */}
              <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-sky-50 text-sky-600">
                    <Bell className="w-6 h-6" />
                  </div>
                  <div className="flex items-center space-x-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    <span>↑ 20%</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-black text-slate-900">5</div>
                  <div className="text-xs font-bold text-slate-400 mt-0.5">Notification Channels</div>
                </div>
                <div className="mt-3 h-6 w-full">
                  <svg className="w-full h-full text-sky-500 overflow-visible" viewBox="0 0 100 24" fill="none">
                    <path d="M 0 19 Q 35 15 65 9 T 100 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Sub Navigation Bar */}
            <div className="flex items-center space-x-2 border-b border-slate-200 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'general', label: 'General Settings', icon: Settings },
                { id: 'game', label: 'Game Configuration', icon: Gamepad2 },
                { id: 'learning', label: 'Learning & Content', icon: BookOpen },
                { id: 'integrations', label: 'Integrations', icon: LinkIcon },
                { id: 'notifications', label: 'Notifications', icon: Bell },
                { id: 'security', label: 'Security', icon: ShieldCheck },
                { id: 'adv-security', label: 'Security', icon: ShieldCheck },
                { id: 'system', label: 'System', icon: Layers }
              ].map((tab, i) => {
                const Icon = tab.icon;
                const isActive = settingsSubTab === tab.id && i === (settingsSubTab === 'adv-security' ? 6 : ['general', 'game', 'learning', 'integrations', 'notifications', 'security', 'adv-security', 'system'].indexOf(settingsSubTab));
                return (
                  <button
                    key={`${tab.id}-${i}`}
                    onClick={() => setSettingsSubTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-4 py-3 text-xs font-extrabold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'border-[#5551ff] text-[#5551ff]'
                        : 'border-transparent text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Split Screen Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Panel: Settings Form (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                {/* Form Section 1: Platform Information */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-lg font-black text-slate-900">General Settings</h2>
                      <p className="text-xs font-medium text-slate-500 mt-0.5">
                        Configure basic platform information, branding, and general preferences.
                      </p>
                    </div>
                    <button className="flex items-center space-x-1.5 px-5 py-2 bg-[#5551ff] hover:bg-[#4440ee] text-white rounded-xl font-extrabold text-xs shadow-md transition-all cursor-pointer">
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                  </div>

                  {/* Section Title */}
                  <div className="flex items-center space-x-2 text-xs font-black text-slate-900">
                    <Building2 className="w-4 h-4 text-[#5551ff]" />
                    <span>Platform Information</span>
                  </div>

                  {/* Fields Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium">
                    <div>
                      <label className="block text-slate-700 mb-1 font-bold">Platform Name</label>
                      <input
                        type="text"
                        value={platformName}
                        onChange={(e) => setPlatformName(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-[#5551ff]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 mb-1 font-bold">Tagline</label>
                      <input
                        type="text"
                        value={platformTagline}
                        onChange={(e) => setPlatformTagline(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-[#5551ff]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 mb-1 font-bold">Organization</label>
                      <input
                        type="text"
                        value={platformOrg}
                        onChange={(e) => setPlatformOrg(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-[#5551ff]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 mb-1 font-bold">Contact Email</label>
                      <input
                        type="email"
                        value={platformContactEmail}
                        onChange={(e) => setPlatformContactEmail(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[#5551ff] font-bold focus:outline-none focus:border-[#5551ff]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 mb-1 font-bold">Support Email</label>
                      <input
                        type="email"
                        value={platformSupportEmail}
                        onChange={(e) => setPlatformSupportEmail(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[#5551ff] font-bold focus:outline-none focus:border-[#5551ff]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 mb-1 font-bold">Website</label>
                      <input
                        type="text"
                        value={platformWebsite}
                        onChange={(e) => setPlatformWebsite(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[#5551ff] font-bold focus:outline-none focus:border-[#5551ff]"
                      />
                    </div>
                  </div>
                </div>

                {/* Form Section 2: Branding & Appearance */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-5">
                  <div className="flex items-center space-x-2 text-xs font-black text-slate-900">
                    <Palette className="w-4 h-4 text-[#5551ff]" />
                    <span>Branding & Appearance</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-xs font-medium items-end">
                    {/* Platform Logo */}
                    <div className="md:col-span-2 space-y-1">
                      <label className="block text-slate-700 font-bold">Platform Logo</label>
                      <div className="flex items-center space-x-3 bg-slate-50 p-2.5 border border-slate-200 rounded-2xl">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#5551ff] to-purple-600 text-white flex items-center justify-center font-black text-xs">
                            <Trophy className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-black text-slate-900 leading-tight text-[11px]">INCLUSIVE TYCOON</div>
                            <div className="text-[8px] font-bold text-slate-400">Play for a Fairer Future</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-auto">
                          <button className="px-3 py-1 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-700 font-extrabold text-[11px] transition-all">
                            Change Logo
                          </button>
                          <button className="p-1 text-rose-500 hover:bg-rose-50 rounded-lg">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Primary Color */}
                    <div>
                      <label className="block text-slate-700 mb-1 font-bold">Primary Color</label>
                      <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl p-1.5">
                        <span className="w-6 h-6 rounded-lg bg-[#7C3AED] inline-block shadow-sm"></span>
                        <input
                          type="text"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="bg-transparent font-extrabold text-slate-900 w-full focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Secondary Color */}
                    <div>
                      <label className="block text-slate-700 mb-1 font-bold">Secondary Color</label>
                      <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl p-1.5">
                        <span className="w-6 h-6 rounded-lg bg-[#2563EB] inline-block shadow-sm"></span>
                        <input
                          type="text"
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                          className="bg-transparent font-extrabold text-slate-900 w-full focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Accent Color */}
                    <div>
                      <label className="block text-slate-700 mb-1 font-bold">Accent Color</label>
                      <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl p-1.5">
                        <span className="w-6 h-6 rounded-lg bg-[#EC4899] inline-block shadow-sm"></span>
                        <input
                          type="text"
                          value={accentColor}
                          onChange={(e) => setAccentColor(e.target.value)}
                          className="bg-transparent font-extrabold text-slate-900 w-full focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Section 3: Language & Region */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-5">
                  <div className="flex items-center space-x-2 text-xs font-black text-slate-900">
                    <Globe className="w-4 h-4 text-[#5551ff]" />
                    <span>Language & Region</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-medium">
                    {/* Default Language */}
                    <div>
                      <label className="block text-slate-700 mb-1 font-bold">Default Language</label>
                      <select
                        value={defaultLang}
                        onChange={(e) => setDefaultLang(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-[#5551ff]"
                      >
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                      </select>
                    </div>

                    {/* Supported Languages */}
                    <div className="md:col-span-2">
                      <label className="block text-slate-700 mb-1 font-bold">Supported Languages</label>
                      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-50 border border-slate-200 rounded-xl">
                        {supportedLangs.map((lang, idx) => (
                          <span key={idx} className="flex items-center space-x-1 px-2.5 py-1 bg-white border border-slate-200 text-[#5551ff] font-extrabold rounded-lg text-[11px] shadow-sm">
                            <span>{lang}</span>
                            <button
                              type="button"
                              onClick={() => setSupportedLangs(supportedLangs.filter(l => l !== lang))}
                              className="text-slate-400 hover:text-slate-700 ml-1"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                        <button className="flex items-center space-x-1 px-2.5 py-1 bg-white border border-dashed border-indigo-300 text-[#5551ff] font-extrabold rounded-lg text-[11px] hover:bg-indigo-50 transition-all">
                          <Plus className="w-3 h-3" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>

                    {/* Timezone */}
                    <div>
                      <label className="block text-slate-700 mb-1 font-bold">Timezone</label>
                      <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-[#5551ff]"
                      >
                        <option value="(GMT+05:30) India Standard Time">(GMT+05:30) India Standard Time</option>
                        <option value="(GMT+00:00) UTC">(GMT+00:00) UTC</option>
                        <option value="(GMT-05:00) Eastern Time">(GMT-05:00) Eastern Time</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Form Section 4: Platform Preferences (Toggles Grid) */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-5">
                  <div className="flex items-center space-x-2 text-xs font-black text-slate-900">
                    <SlidersHorizontal className="w-4 h-4 text-[#5551ff]" />
                    <span>Platform Preferences</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                    {/* Toggle Items */}
                    {[
                      {
                        key: 'allowUserRegistration',
                        label: 'Allow User Registration',
                        desc: 'Enable new organization and player signups'
                      },
                      {
                        key: 'enableNotifications',
                        label: 'Enable Notifications',
                        desc: 'Send email and in-app notifications'
                      },
                      {
                        key: 'enableGuestMode',
                        label: 'Enable Guest Mode',
                        desc: 'Allow non-registered users to try demo content'
                      },
                      {
                        key: 'autoAssignOrganization',
                        label: 'Auto-Assign Organization',
                        desc: 'Automatically assign org on registration'
                      },
                      {
                        key: 'showLeaderboardToAll',
                        label: 'Show Leaderboard to All',
                        desc: 'Display leaderboard to all users'
                      },
                      {
                        key: 'enableAnalyticsTracking',
                        label: 'Enable Analytics Tracking',
                        desc: 'Track user engagement and behaviour'
                      },
                      {
                        key: 'enableCertificates',
                        label: 'Enable Certificates',
                        desc: 'Allow certificate generation'
                      },
                      {
                        key: 'enableContentRecommendations',
                        label: 'Enable Content Recommendations',
                        desc: 'Show personalized learning recommendations'
                      },
                      {
                        key: 'enableFeedbackCollection',
                        label: 'Enable Feedback Collection',
                        desc: 'Collect user feedback after games'
                      },
                      {
                        key: 'maintenanceMode',
                        label: 'Maintenance Mode',
                        desc: 'Temporarily disable platform access'
                      }
                    ].map((pref) => {
                      const isChecked = (platformPreferences as any)[pref.key];
                      return (
                        <div key={pref.key} className="flex items-start justify-between space-x-3">
                          <button
                            type="button"
                            onClick={() =>
                              setPlatformPreferences({
                                ...platformPreferences,
                                [pref.key]: !isChecked
                              })
                            }
                            className={`w-11 h-6 flex items-center rounded-full p-1 transition-all duration-300 cursor-pointer flex-shrink-0 mt-0.5 ${
                              isChecked ? 'bg-[#5551ff] justify-end' : 'bg-slate-300 justify-start'
                            }`}
                          >
                            <span className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
                          </button>
                          <div className="flex-1 min-w-0">
                            <div className="font-extrabold text-slate-900 leading-tight">{pref.label}</div>
                            <div className="text-[11px] font-medium text-slate-400 mt-0.5">{pref.desc}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Panel: System Status & Quick Actions (4 cols) */}
              <div className="lg:col-span-4 space-y-6 sticky top-6">
                {/* Card 1: System Status */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h2 className="text-base font-black text-slate-900">System Status</h2>
                    <button className="px-3 py-1 text-xs font-extrabold text-[#5551ff] border border-indigo-200 hover:bg-indigo-50 rounded-xl transition-all">
                      View Status
                    </button>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-xs font-black text-emerald-600">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>All Systems Operational</span>
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 pl-4">Last checked 15 Oct 2024, 10:30 AM</div>
                  </div>

                  <div className="space-y-3 text-xs pt-1">
                    {[
                      { name: 'Platform API', status: 'Operational' },
                      { name: 'Database', status: 'Operational' },
                      { name: 'Game Engine', status: 'Operational' },
                      { name: 'File Storage', status: 'Operational' },
                      { name: 'Email Service', status: 'Operational' }
                    ].map((svc, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 font-bold text-slate-700">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span>{svc.name}</span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-extrabold text-[10px]">
                          {svc.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card 2: Environment Configuration */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-5">
                  <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                    <Layers className="w-4 h-4 text-[#5551ff]" />
                    <h2 className="text-base font-black text-slate-900">Environment Configuration</h2>
                  </div>

                  <div className="space-y-3.5 text-xs font-medium">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-bold">Current Environment</span>
                      <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-700 font-extrabold text-xs">
                        Production ▾
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-bold">Version</span>
                      <span className="font-black text-slate-900">v2.1.0</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-bold">Last Deployment</span>
                      <span className="font-extrabold text-slate-900">12 Oct 2024, 06:45 PM</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-bold">Deployed By</span>
                      <span className="font-black text-[#5551ff]">CII CWL Super Admin</span>
                    </div>
                  </div>
                </div>

                {/* Card 3: Quick Actions */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
                  <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <h2 className="text-base font-black text-slate-900">Quick Actions</h2>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex flex-col items-center justify-center p-3.5 border border-slate-200 hover:bg-slate-50 rounded-2xl space-y-2 text-xs font-extrabold text-slate-700 transition-all cursor-pointer">
                      <RotateCcw className="w-5 h-5 text-rose-500" />
                      <span>Clear Cache</span>
                    </button>

                    <button className="flex flex-col items-center justify-center p-3.5 border border-slate-200 hover:bg-slate-50 rounded-2xl space-y-2 text-xs font-extrabold text-slate-700 transition-all cursor-pointer">
                      <Database className="w-5 h-5 text-[#5551ff]" />
                      <span>Backup Data</span>
                    </button>

                    <button className="flex flex-col items-center justify-center p-3.5 border border-slate-200 hover:bg-slate-50 rounded-2xl space-y-2 text-xs font-extrabold text-slate-700 transition-all cursor-pointer">
                      <Download className="w-5 h-5 text-sky-500" />
                      <span>Export Logs</span>
                    </button>

                    <button className="flex flex-col items-center justify-center p-3.5 border border-slate-200 hover:bg-slate-50 rounded-2xl space-y-2 text-xs font-extrabold text-slate-700 transition-all cursor-pointer">
                      <RefreshCw className="w-5 h-5 text-emerald-500" />
                      <span>Restart Services</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AUDIT LOGS TAB VIEW */}
        {activeTab === 'audit-logs' && (
          <div className="space-y-6 pb-12">
            {/* Top Header Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Audit Logs</h1>
                <p className="text-sm font-medium text-slate-500 mt-1">
                  Track and monitor all system activities, user actions, and platform changes.
                </p>
              </div>

              {/* Search Bar & Date */}
              <div className="flex items-center space-x-3">
                <div className="relative min-w-[260px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search audit logs, users, actions, modules..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold focus:outline-none focus:border-[#5551ff]"
                  />
                </div>
                <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-bold whitespace-nowrap">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Jan 2024 - Oct 2024</span>
                </div>
              </div>
            </div>

            {/* 4 Key Stat Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Total Activities */}
              <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-indigo-50 text-[#5551ff]">
                    <FileSpreadsheet className="w-6 h-6" />
                  </div>
                  <div className="flex items-center space-x-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    <span>↑ 18%</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-black text-slate-900">12,540</div>
                  <div className="text-xs font-bold text-slate-400 mt-0.5">Total Activities</div>
                </div>
                <div className="mt-3 h-6 w-full">
                  <svg className="w-full h-full text-indigo-500 overflow-visible" viewBox="0 0 100 24" fill="none">
                    <path d="M 0 18 Q 25 12 50 14 T 100 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Card 2: Unique Users */}
              <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-[#eef2ff] text-indigo-600">
                    <Users className="w-6 h-6" />
                  </div>
                  <div className="flex items-center space-x-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    <span>↑ 12%</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-black text-slate-900">1,280</div>
                  <div className="text-xs font-bold text-slate-400 mt-0.5">Unique Users</div>
                </div>
                <div className="mt-3 h-6 w-full">
                  <svg className="w-full h-full text-emerald-500 overflow-visible" viewBox="0 0 100 24" fill="none">
                    <path d="M 0 20 Q 25 14 50 10 T 100 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Card 3: Admin Actions */}
              <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-rose-50 text-rose-500">
                    <Settings className="w-6 h-6" />
                  </div>
                  <div className="flex items-center space-x-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    <span>↑ 8%</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-black text-slate-900">326</div>
                  <div className="text-xs font-bold text-slate-400 mt-0.5">Admin Actions</div>
                </div>
                <div className="mt-3 h-6 w-full">
                  <svg className="w-full h-full text-rose-500 overflow-visible" viewBox="0 0 100 24" fill="none">
                    <path d="M 0 18 Q 30 14 60 16 T 100 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Card 4: System Uptime */}
              <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-sky-50 text-sky-600">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="flex items-center space-x-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    <span>↑ 0.2%</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-black text-slate-900">99.9%</div>
                  <div className="text-xs font-bold text-slate-400 mt-0.5">System Uptime</div>
                </div>
                <div className="mt-3 h-6 w-full">
                  <svg className="w-full h-full text-sky-500 overflow-visible" viewBox="0 0 100 24" fill="none">
                    <path d="M 0 19 Q 35 15 65 11 T 100 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Filter Control Bar */}
            <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-3 flex-1">
                {/* Search Bar */}
                <div className="relative min-w-[200px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search logs..."
                    value={auditSearchQuery}
                    onChange={(e) => setAuditSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-[#5551ff]"
                  />
                </div>

                {/* User Filter */}
                <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-bold">
                  <span className="text-[11px] text-slate-400 font-medium">User</span>
                  <select
                    value={auditUserFilter}
                    onChange={(e) => setAuditUserFilter(e.target.value)}
                    className="bg-transparent font-extrabold focus:outline-none text-slate-900 cursor-pointer"
                  >
                    <option value="All Users">All Users</option>
                    <option value="CII CWL Super Admin">CII CWL Super Admin</option>
                    <option value="Priya Sharma">Priya Sharma</option>
                    <option value="Rohan Mehta">Rohan Mehta</option>
                  </select>
                </div>

                {/* Action Type Filter */}
                <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-bold">
                  <span className="text-[11px] text-slate-400 font-medium">Action Type</span>
                  <select
                    value={auditActionFilter}
                    onChange={(e) => setAuditActionFilter(e.target.value)}
                    className="bg-transparent font-extrabold focus:outline-none text-slate-900 cursor-pointer"
                  >
                    <option value="All Actions">All Actions</option>
                    <option value="Created">Created</option>
                    <option value="Updated">Updated</option>
                    <option value="Logged In">Logged In</option>
                    <option value="Exported">Exported</option>
                    <option value="Backup">Backup</option>
                  </select>
                </div>

                {/* Module Filter */}
                <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-bold">
                  <span className="text-[11px] text-slate-400 font-medium">Module</span>
                  <select
                    value={auditModuleFilter}
                    onChange={(e) => setAuditModuleFilter(e.target.value)}
                    className="bg-transparent font-extrabold focus:outline-none text-slate-900 cursor-pointer"
                  >
                    <option value="All Modules">All Modules</option>
                    <option value="Settings">Settings</option>
                    <option value="Quiz Management">Quiz Management</option>
                    <option value="Authentication">Authentication</option>
                    <option value="Reports">Reports</option>
                  </select>
                </div>

                {/* Date Range */}
                <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-bold">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <select
                    value={auditDateRange}
                    onChange={(e) => setAuditDateRange(e.target.value)}
                    className="bg-transparent font-extrabold focus:outline-none text-slate-900 cursor-pointer"
                  >
                    <option value="Jan 2024 - Oct 2024">Jan 2024 - Oct 2024</option>
                    <option value="Last 30 Days">Last 30 Days</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-2 px-5 py-2 bg-[#5551ff] hover:bg-[#4440ee] text-white rounded-xl font-extrabold shadow-md transition-all cursor-pointer">
                  <Filter className="w-4 h-4" />
                  <span>Apply Filters</span>
                </button>

                <button
                  onClick={() => {
                    setAuditSearchQuery('');
                    setAuditUserFilter('All Users');
                    setAuditActionFilter('All Actions');
                    setAuditModuleFilter('All Modules');
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-extrabold transition-all cursor-pointer"
                >
                  Reset
                </button>

                <button className="flex items-center space-x-2 px-4 py-2 border border-[#5551ff] text-[#5551ff] hover:bg-indigo-50 rounded-xl font-extrabold transition-all cursor-pointer">
                  <Download className="w-4 h-4" />
                  <span>Export Logs</span>
                </button>
              </div>
            </div>

            {/* Split Screen Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Panel: Audit Logs Table (8 cols) */}
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                        <th className="pb-3 pl-2">TIMESTAMP ↓</th>
                        <th className="pb-3">USER</th>
                        <th className="pb-3">ACTION</th>
                        <th className="pb-3">MODULE</th>
                        <th className="pb-3">DETAILS</th>
                        <th className="pb-3">IP ADDRESS</th>
                        <th className="pb-3 text-right pr-2">...</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {auditLogsData.map((log) => {
                        const isSelected = selectedLogId === log.id;
                        return (
                          <tr
                            key={log.id}
                            onClick={() => setSelectedLogId(log.id)}
                            className={`cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-indigo-50/70 border-l-4 border-l-[#5551ff]'
                                : 'hover:bg-slate-50/80'
                            }`}
                          >
                            {/* Timestamp */}
                            <td className="py-4 pl-2 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <div className="p-1.5 rounded-lg bg-indigo-50 text-[#5551ff]">
                                  {log.action === 'Created' && <Plus className="w-3.5 h-3.5 text-emerald-600" />}
                                  {log.action === 'Updated' && <FileText className="w-3.5 h-3.5 text-[#5551ff]" />}
                                  {log.action === 'Logged In' && <LogIn className="w-3.5 h-3.5 text-purple-600" />}
                                  {log.action === 'Completed' && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                                  {log.action === 'Sent' && <Send className="w-3.5 h-3.5 text-sky-600" />}
                                  {log.action === 'Exported' && <Download className="w-3.5 h-3.5 text-amber-600" />}
                                  {log.action === 'Backup' && <Database className="w-3.5 h-3.5 text-slate-600" />}
                                  {log.action === 'Submitted' && <BarChart3 className="w-3.5 h-3.5 text-purple-600" />}
                                </div>
                                <span className="font-bold text-slate-600">{log.timestamp}</span>
                              </div>
                            </td>

                            {/* User */}
                            <td className="py-4 font-bold text-slate-900 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                {log.userAvatar ? (
                                  <img src={log.userAvatar} alt={log.user} className="w-6 h-6 rounded-full object-cover" />
                                ) : (
                                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-extrabold text-[10px] flex items-center justify-center">
                                    {log.userInitials}
                                  </div>
                                )}
                                <span>{log.user}</span>
                              </div>
                            </td>

                            {/* Action */}
                            <td className="py-4">
                              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${log.actionBadge}`}>
                                {log.action}
                              </span>
                            </td>

                            {/* Module */}
                            <td className="py-4">
                              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${log.moduleBadge}`}>
                                {log.module}
                              </span>
                            </td>

                            {/* Details */}
                            <td className="py-4 font-extrabold text-slate-800 max-w-[200px] truncate">
                              {log.details}
                            </td>

                            {/* IP Address */}
                            <td className="py-4 font-mono text-slate-400 font-bold text-[11px]">
                              {log.ipAddress}
                            </td>

                            {/* Action */}
                            <td className="py-4 text-right pr-2">
                              <button className="text-slate-400 hover:text-slate-700 font-black">...</button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100 text-xs font-extrabold text-slate-500">
                  <div>Showing 1-10 of 12,540 entries</div>
                  <div className="flex items-center space-x-1">
                    <button className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600">&lt;</button>
                    <button className="px-3 py-1 rounded-lg bg-[#5551ff] text-white">1</button>
                    <button className="px-3 py-1 rounded-lg hover:bg-slate-100 text-slate-600">2</button>
                    <button className="px-3 py-1 rounded-lg hover:bg-slate-100 text-slate-600">3</button>
                    <button className="px-3 py-1 rounded-lg hover:bg-slate-100 text-slate-600">4</button>
                    <button className="px-3 py-1 rounded-lg hover:bg-slate-100 text-slate-600">5</button>
                    <span className="px-1 text-slate-400">...</span>
                    <button className="px-3 py-1 rounded-lg hover:bg-slate-100 text-slate-600">1,254</button>
                    <button className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600">&gt;</button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <select className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 font-extrabold text-slate-700">
                      <option>10 per page</option>
                      <option>25 per page</option>
                      <option>50 per page</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Right Panel: Log Details Drawer (4 cols) */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-5 sticky top-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h2 className="text-base font-black text-slate-900">Log Details</h2>
                  <button className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Activity Badge & Date */}
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center space-x-1.5 text-xs font-black text-[#5551ff] bg-indigo-50 px-3 py-1 rounded-full">
                    <Activity className="w-3.5 h-3.5" />
                    <span>System Activity</span>
                  </span>
                  <span className="text-[11px] font-extrabold text-slate-400">{activeAuditLog.timestamp}</span>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-lg font-black text-slate-900 leading-snug">{activeAuditLog.details}</h3>
                  <p className="text-xs font-medium text-slate-500 mt-1">
                    {activeAuditLog.user} updated system notification settings
                  </p>
                </div>

                {/* Sub-Tabs */}
                <div className="flex items-center space-x-5 border-b border-slate-100 text-xs font-extrabold">
                  {['overview', 'technical', 'changes'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setSelectedLogTab(tab as any)}
                      className={`pb-2 capitalize transition-all cursor-pointer ${
                        selectedLogTab === tab
                          ? 'border-b-2 border-[#5551ff] text-[#5551ff]'
                          : 'text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      {tab === 'technical' ? 'Technical Details' : tab}
                    </button>
                  ))}
                </div>

                {/* Detail Metadata Items */}
                <div className="space-y-3.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-slate-500 font-bold">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span>User</span>
                    </div>
                    <div className="flex items-center space-x-2 text-right">
                      {activeAuditLog.userAvatar ? (
                        <img src={activeAuditLog.userAvatar} alt={activeAuditLog.user} className="w-6 h-6 rounded-full object-cover" />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-extrabold text-[10px] flex items-center justify-center">
                          {activeAuditLog.userInitials}
                        </div>
                      )}
                      <div>
                        <div className="font-black text-slate-900 leading-tight">{activeAuditLog.user}</div>
                        <div className="text-[10px] text-slate-400 font-medium">{activeAuditLog.userEmail}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-slate-500 font-bold">
                      <FileText className="w-4 h-4 text-slate-400" />
                      <span>Action Type</span>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${activeAuditLog.actionBadge}`}>
                      {activeAuditLog.action}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-slate-500 font-bold">
                      <Layers className="w-4 h-4 text-slate-400" />
                      <span>Module</span>
                    </div>
                    <span className="font-black text-slate-900">{activeAuditLog.module}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-slate-500 font-bold">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span>Date & Time</span>
                    </div>
                    <span className="font-extrabold text-slate-900">{activeAuditLog.timestamp} (GMT+05:30)</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-slate-500 font-bold">
                      <Globe className="w-4 h-4 text-slate-400" />
                      <span>IP Address</span>
                    </div>
                    <span className="font-mono font-bold text-slate-700">{activeAuditLog.ipAddress}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-slate-500 font-bold">
                      <ShieldCheck className="w-4 h-4 text-slate-400" />
                      <span>User Role</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-rose-100 text-rose-700">
                      {activeAuditLog.userRole}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-slate-500 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-slate-400" />
                      <span>Status</span>
                    </div>
                    <span className="font-extrabold text-emerald-600">{activeAuditLog.status}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-slate-500 font-bold">
                      <Key className="w-4 h-4 text-slate-400" />
                      <span>Session ID</span>
                    </div>
                    <span className="font-mono text-[10px] text-indigo-600 font-medium truncate max-w-[180px]">
                      {activeAuditLog.sessionId}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-slate-500 font-bold">
                      <Monitor className="w-4 h-4 text-slate-400" />
                      <span>Device</span>
                    </div>
                    <span className="font-extrabold text-slate-900">{activeAuditLog.device}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-slate-500 font-bold">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span>Location</span>
                    </div>
                    <span className="font-extrabold text-slate-900">{activeAuditLog.location}</span>
                  </div>
                </div>

                {/* Activity Description Box */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center space-x-2 text-xs font-black text-slate-900">
                    <FileText className="w-4 h-4 text-[#5551ff]" />
                    <span>Activity Description</span>
                  </div>

                  <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-4 text-xs font-medium text-slate-700 space-y-1.5 leading-relaxed">
                    <div className="font-bold text-slate-900 mb-1">Updated the following notification settings:</div>
                    {activeAuditLog.descriptionBullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start space-x-1.5 text-slate-600">
                        <span className="text-[#5551ff] font-bold">•</span>
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PARTNER ADMIN: PARTICIPANT ACCESS CODES TAB VIEW */}
        {activeTab === 'participant-codes' && (
          <div className="space-y-6 pb-12">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                    Partner Admin Portal
                  </span>
                </div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1">Participant Access Codes</h1>
                <p className="text-sm font-medium text-slate-500 mt-1">
                  Generate participant access room codes, configure game duration rounds, and download batch invites.
                </p>
              </div>

              <button className="flex items-center space-x-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-white rounded-xl font-extrabold text-xs shadow-md transition-all cursor-pointer">
                <Plus className="w-4 h-4" />
                <span>Generate New Room Code</span>
              </button>
            </div>

            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-amber-50 text-amber-600">
                    <Key className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Active</span>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-black text-slate-900">28</div>
                  <div className="text-xs font-bold text-slate-400 mt-0.5">Active Room Codes</div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Total Seats</span>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-black text-slate-900">1,450</div>
                  <div className="text-xs font-bold text-slate-400 mt-0.5">Generated Access Seats</div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">77% Claimed</span>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-black text-slate-900">1,120</div>
                  <div className="text-xs font-bold text-slate-400 mt-0.5">Used Participant Codes</div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-sky-50 text-sky-600">
                    <Gamepad2 className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2 py-1 rounded-full">Duration Config</span>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-black text-slate-900">10 Turns</div>
                  <div className="text-xs font-bold text-slate-400 mt-0.5">Default Workshop Rounds</div>
                </div>
              </div>
            </div>

            {/* Code Generator Form */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-black text-slate-900">Generate Participant Access Room Code</h2>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">
                    Set workshop parameters, round duration, seat caps, and instant join link.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-medium">
                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Workshop Title / Batch Name</label>
                  <input
                    type="text"
                    defaultValue="TechMind Inclusion Masterclass 2026 - Batch A"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Organization Cohort</label>
                  <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-amber-500">
                    <option>TechMind Solutions - Leadership Cohort</option>
                    <option>Horizon Industries - Executive Cohort</option>
                    <option>Global Logistics - Managers Cohort</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Game Duration / Round Limit</label>
                  <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-amber-500">
                    <option value="5">5 Turns (Express 15-min Workshop)</option>
                    <option value="10" selected>10 Turns (Standard Full Game)</option>
                    <option value="15">15 Turns (Executive Masterclass)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Seat Cap / Max Participants</label>
                  <input
                    type="number"
                    defaultValue={50}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Instant Generated Code Result Box */}
              <div className="bg-gradient-to-r from-amber-50 via-indigo-50 to-purple-50 p-5 rounded-2xl border border-amber-200 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-amber-500 text-white rounded-2xl shadow-md">
                    <Key className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[11px] font-extrabold uppercase text-slate-500 tracking-wider">Latest Generated Room Code</div>
                    <div className="flex items-center space-x-3 mt-0.5">
                      <span className="text-2xl font-black text-slate-900 font-mono tracking-wider">TM-2026-X89</span>
                      <span className="px-2.5 py-0.5 bg-white border border-amber-300 rounded-lg text-xs font-mono font-extrabold text-amber-800">
                        PIN: 4921
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-xl font-extrabold text-xs shadow-sm flex items-center space-x-1.5 transition-all">
                    <Copy className="w-3.5 h-3.5 text-amber-600" />
                    <span>Copy Join Link</span>
                  </button>

                  <button className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-white rounded-xl font-extrabold text-xs shadow-md flex items-center space-x-1.5 transition-all">
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Participant Codes (CSV)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Active Participant Codes Table */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-black text-slate-900">Active Workshop Room Codes</h2>
                <span className="text-xs font-extrabold text-slate-400">Showing 4 Active Workshops</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-medium">
                  <thead>
                    <tr className="border-b border-slate-100 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                      <th className="pb-3">ROOM CODE</th>
                      <th className="pb-3">WORKSHOP TITLE</th>
                      <th className="pb-3">ROUNDS</th>
                      <th className="pb-3">SEATS CLAIMED</th>
                      <th className="pb-3">STATUS</th>
                      <th className="pb-3">CREATED</th>
                      <th className="pb-3 text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { code: 'TM-2026-X89', title: 'TechMind Inclusion Masterclass 2026', turns: '10 Turns', claimed: '42 / 50', status: 'Live', date: '15 Oct 2024' },
                      { code: 'HZ-2026-B12', title: 'Horizon Executive Diversity Workshop', turns: '15 Turns', claimed: '25 / 30', status: 'Live', date: '14 Oct 2024' },
                      { code: 'GL-2026-C45', title: 'Global Logistics Express Workshop', turns: '5 Turns', claimed: '50 / 50', status: 'Completed', date: '12 Oct 2024' },
                      { code: 'SE-2026-D88', title: 'Sunrise Energy People Managers Cohort', turns: '10 Turns', claimed: '18 / 40', status: 'Live', date: '10 Oct 2024' }
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-all">
                        <td className="py-4 font-mono font-black text-slate-900">{row.code}</td>
                        <td className="py-4 font-bold text-slate-800">{row.title}</td>
                        <td className="py-4 font-bold text-slate-600">{row.turns}</td>
                        <td className="py-4 font-extrabold text-amber-600">{row.claimed}</td>
                        <td className="py-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                            row.status === 'Live' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="py-4 font-bold text-slate-500">{row.date}</td>
                        <td className="py-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <button className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-extrabold text-[11px]" title="Copy Join Link">
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-extrabold text-[11px]" title="Download CSV">
                              <Download className="w-3.5 h-3.5" />
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
        )}

        {/* EVENT CARDS TAB VIEW (GAME CHANCE & WILDCARD EVENTS) */}
        {activeTab === 'event-cards' && (
          <div className="space-y-6 pb-12">
            {/* Header Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    <span>Chance & Luck Mechanics</span>
                  </span>
                </div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1">Event Cards Management</h1>
                <p className="text-sm font-medium text-slate-500 mt-1">
                  Configure wildcard event cards, market dynamics, regulatory changes, and workplace crisis scenarios triggering during player turns.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setActiveTab('add-event-card')}
                  className="flex items-center space-x-2 px-5 py-2.5 bg-[#5551ff] hover:bg-[#4440ee] text-white rounded-xl font-extrabold text-xs shadow-md transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Event Card</span>
                </button>
              </div>
            </div>

            {/* 4 Stat Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-amber-50 text-amber-600">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">100% Active</span>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-black text-slate-900">24</div>
                  <div className="text-xs font-bold text-slate-400 mt-0.5">Total Event Cards</div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600">
                    <Zap className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">50% Boosts</span>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-black text-slate-900">12</div>
                  <div className="text-xs font-bold text-slate-400 mt-0.5">Positive Boost Events</div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-rose-50 text-rose-600">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-full">33% Crises</span>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-black text-slate-900">8</div>
                  <div className="text-xs font-bold text-slate-400 mt-0.5">Risk & Crisis Events</div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-sky-50 text-sky-600">
                    <Globe className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2 py-1 rounded-full">17% Policy</span>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-black text-slate-900">4</div>
                  <div className="text-xs font-bold text-slate-400 mt-0.5">Regulatory & Market Shifts</div>
                </div>
              </div>
            </div>

            {/* Filter Control Bar */}
            <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-3 flex-1">
                {/* Search */}
                <div className="relative min-w-[240px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search event cards by title, category, trigger..."
                    value={eventCardsSearchQuery}
                    onChange={(e) => setEventCardsSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-[#5551ff]"
                  />
                </div>

                {/* Category Dropdown */}
                <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-bold">
                  <span className="text-[11px] text-slate-400 font-medium">Category</span>
                  <select
                    value={eventCardsCategoryFilter}
                    onChange={(e) => setEventCardsCategoryFilter(e.target.value)}
                    className="bg-transparent font-extrabold focus:outline-none text-slate-900 cursor-pointer"
                  >
                    <option value="All Categories">All Categories</option>
                    <option value="Regulatory & Policy">Regulatory & Policy</option>
                    <option value="Workforce Shift">Workforce Shift</option>
                    <option value="Workplace Culture Crisis">Workplace Culture Crisis</option>
                    <option value="Market Dynamics">Market Dynamics</option>
                  </select>
                </div>
              </div>

              <button className="flex items-center space-x-2 px-4 py-2 border border-[#5551ff] text-[#5551ff] hover:bg-indigo-50 rounded-xl font-extrabold transition-all cursor-pointer">
                <Filter className="w-4 h-4" />
                <span>Filter Events</span>
              </button>
            </div>

            {/* Event Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventCardsData.map((card) => (
                <div
                  key={card.id}
                  className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {/* Top Category & Chance Badge */}
                    <div className="flex items-center justify-between text-xs">
                      <span className={`px-2.5 py-0.5 rounded-full font-extrabold text-[11px] ${card.categoryBadge}`}>
                        {card.category}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono font-extrabold text-[10px]">
                        ⚡ {card.probability}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-black text-slate-900 leading-snug">{card.title}</h3>

                    {/* Trigger Window & Impact */}
                    <div className="flex items-center space-x-3 text-xs font-bold text-slate-500">
                      <span className="flex items-center space-x-1 text-slate-700">
                        <Gamepad2 className="w-3.5 h-3.5 text-[#5551ff]" />
                        <span>{card.triggerTurn}</span>
                      </span>
                      <span>•</span>
                      <span className={`px-2 py-0.5 rounded-md font-extrabold text-[10px] ${card.impactBadge}`}>
                        {card.impactType}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 font-medium leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      {card.description}
                    </p>

                    {/* Choice Options */}
                    <div className="space-y-2 text-xs">
                      <div className="p-3 bg-indigo-50/60 border border-indigo-100 rounded-xl space-y-1">
                        <div className="font-extrabold text-indigo-900 text-[11px]">Choice A Response</div>
                        <div className="text-slate-700 font-medium text-[11px]">{card.choiceA}</div>
                      </div>

                      <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                        <div className="font-extrabold text-slate-800 text-[11px]">Choice B Response</div>
                        <div className="text-slate-600 font-medium text-[11px]">{card.choiceB}</div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400">
                    <div>Triggered {card.timesTriggered} times</div>
                    <div className="flex items-center space-x-2">
                      <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600" title="Edit Event Card">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 hover:bg-rose-50 rounded-lg text-rose-500" title="Delete">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BUSINESS SCENARIOS TAB VIEW */}
        {activeTab === 'business-scenarios' && (
          <div className="space-y-6 pb-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Business Scenarios</h1>
                <p className="text-sm font-medium text-slate-500 mt-1">
                  Manage strategic corporate scenarios, leadership dilemmas, and decision trees.
                </p>
              </div>
              <button className="flex items-center space-x-2 px-5 py-2.5 bg-[#5551ff] text-white rounded-xl font-extrabold text-xs shadow-md">
                <Plus className="w-4 h-4" />
                <span>Create Business Scenario</span>
              </button>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-center space-y-3">
              <Briefcase className="w-12 h-12 text-[#5551ff] mx-auto" />
              <h3 className="text-lg font-black text-slate-900">Corporate Business Scenarios Engine</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Includes 16 active strategic scenarios covering Executive Succession, Inclusive Product Launch, Equal Pay Restructuring, and Remote Workforce Integration.
              </p>
            </div>
          </div>
        )}

        {/* RULES & TUTORIALS TAB VIEW */}
        {activeTab === 'rules-tutorials' && (
          <div className="space-y-6 pb-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Rules & Game Tutorials</h1>
                <p className="text-sm font-medium text-slate-500 mt-1">
                  Configure turn rules, scoring algorithms, wildcard trigger probabilities, and onboarding tutorial slides.
                </p>
              </div>
              <button className="flex items-center space-x-2 px-5 py-2.5 bg-[#5551ff] text-white rounded-xl font-extrabold text-xs shadow-md">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Save Mechanic Settings</span>
              </button>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-center space-y-3">
              <BookMarked className="w-12 h-12 text-[#5551ff] mx-auto" />
              <h3 className="text-lg font-black text-slate-900">Interactive Game Mechanics & Onboarding Rules</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Configure turn limits (5, 10, 15 rounds), inclusion index multipliers, and interactive onboarding slides.
              </p>
            </div>
          </div>
        )}

        {/* UNIFIED ASSESSMENTS MODULE (MERGED PRE-GAME, POST-GAME, QUESTION BANK, RESULTS) */}
        {(activeTab === 'assessments' || activeTab === 'pre-game-quiz' || activeTab === 'post-game-quiz') && (
          <div className="space-y-6 pb-12">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Assessments Engine</h1>
                <p className="text-sm font-medium text-slate-500 mt-1">
                  Manage baseline pre-game quizzes, post-simulation knowledge evaluations, question bank pool, and compliance scoring.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setActiveTab('add-quiz-question')}
                  className="flex items-center space-x-2 px-5 py-2.5 bg-[#5551ff] hover:bg-[#4440ee] text-white rounded-xl font-extrabold text-xs shadow-md transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Question</span>
                </button>
              </div>
            </div>

            {/* Sub-Navigation Pill Bar */}
            <div className="bg-white p-2 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-2 text-xs font-black">
              {[
                { id: 'pre-game', label: 'Pre-Game Quiz (Baseline)', badge: '12 Questions' },
                { id: 'post-game', label: 'Post-Game Quiz (Evaluation)', badge: '10 Questions' },
                { id: 'question-bank', label: 'Question Bank Pool', badge: '48 Total' },
                { id: 'results', label: 'Assessment Results & Scores', badge: '1,420 Completed' }
              ].map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setAssessmentSubTab(sub.id as any)}
                  className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center space-x-2 ${
                    assessmentSubTab === sub.id
                      ? 'bg-[#5551ff] text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>{sub.label}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                    assessmentSubTab === sub.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {sub.badge}
                  </span>
                </button>
              ))}
            </div>

            {/* SUB-VIEW 1: PRE-GAME QUIZ */}
            {assessmentSubTab === 'pre-game' && (
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-base font-black text-slate-900">Pre-Game Baseline Assessment Pool</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Administered prior to Turn 1 to establish baseline inclusion index scores.</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Active Baseline</span>
                </div>

                <div className="space-y-3 text-xs">
                  {[
                    { id: 1, q: 'How do you evaluate gender equality in performance reviews?', cat: 'Performance Evaluation', weight: '10 pts', type: 'Multiple Choice' },
                    { id: 2, q: 'What steps ensure inclusive hiring during candidate interviews?', cat: 'Recruitment & Hiring', weight: '15 pts', type: 'Scenario Based' },
                    { id: 3, q: 'How is pay transparency communicated within your organization unit?', cat: 'Compensation Policy', weight: '10 pts', type: 'Likert Scale' }
                  ].map((item) => (
                    <div key={item.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between hover:bg-slate-100/60 transition-all">
                      <div>
                        <div className="font-extrabold text-slate-900">{item.id}. {item.q}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">Category: {item.cat} • Weight: {item.weight}</div>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-[#5551ff] text-[10px] font-extrabold">{item.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUB-VIEW 2: POST-GAME QUIZ */}
            {assessmentSubTab === 'post-game' && (
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-base font-black text-slate-900">Post-Game Knowledge Retention Quiz</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Administered post-simulation to measure behavioral change and learning retention.</p>
                  </div>
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Active Assessment</span>
                </div>

                <div className="space-y-3 text-xs">
                  {[
                    { id: 1, q: 'Based on your decisions, what investment yields the highest long-term ROI for inclusion?', cat: 'Leadership ROI', weight: '20 pts', type: 'Decision Evaluation' },
                    { id: 2, q: 'How did your response to the pay transparency audit impact overall employee trust?', cat: 'Crisis Management', weight: '15 pts', type: 'Reflective Choice' }
                  ].map((item) => (
                    <div key={item.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between hover:bg-slate-100/60 transition-all">
                      <div>
                        <div className="font-extrabold text-slate-900">{item.id}. {item.q}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">Category: {item.cat} • Weight: {item.weight}</div>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 text-[10px] font-extrabold">{item.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUB-VIEW 3: QUESTION BANK */}
            {assessmentSubTab === 'question-bank' && (
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-900">Central Assessment Question Bank</h3>
                  <span className="text-xs font-extrabold text-slate-400">48 Question Items</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600 font-medium">
                  Searchable master pool containing 48 validated questions across 8 CII CWL Inclusion Dimensions.
                </div>
              </div>
            )}

            {/* SUB-VIEW 4: RESULTS */}
            {assessmentSubTab === 'results' && (
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-900">Assessment Completion & Score Analytics</h3>
                  <span className="text-xs font-extrabold text-emerald-600">86% Avg Retention Rate</span>
                </div>
                <div className="p-4 bg-emerald-50/60 border border-emerald-100 rounded-2xl text-xs text-slate-700 font-medium">
                  1,420 total participants completed pre-game baseline and post-game assessments across 52 corporate partners.
                </div>
              </div>
            )}
          </div>
        )}

        {/* USERS TAB VIEW */}
        {activeTab === 'users' && (
          <div className="space-y-6 pb-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Users Management</h1>
                <p className="text-sm font-medium text-slate-500 mt-1">
                  Manage individual players, managers, and system user profiles across organizations.
                </p>
              </div>
              <button className="flex items-center space-x-2 px-5 py-2.5 bg-[#5551ff] text-white rounded-xl font-extrabold text-xs shadow-md">
                <Plus className="w-4 h-4" />
                <span>Add New User</span>
              </button>
            </div>
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-slate-900">Registered Users (12,540 Active Accounts)</h3>
                <span className="text-xs font-extrabold text-slate-400">Page 1 of 1,254</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-medium">
                  <thead>
                    <tr className="border-b border-slate-100 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                      <th className="pb-3">NAME</th>
                      <th className="pb-3">EMAIL</th>
                      <th className="pb-3">ORGANIZATION</th>
                      <th className="pb-3">ROLE</th>
                      <th className="pb-3">STATUS</th>
                      <th className="pb-3 text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { name: 'Priya Sharma', email: 'priya.sharma@techmind.com', org: 'TechMind Solutions', role: 'Partner Admin', status: 'Active' },
                      { name: 'Rohan Mehta', email: 'rohan.mehta@horizon.com', org: 'Horizon Industries', role: 'Individual Player', status: 'Active' },
                      { name: 'Ananya Singh', email: 'ananya.singh@globallogistics.com', org: 'Global Logistics', role: 'People Manager', status: 'Active' }
                    ].map((u, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-4 font-bold text-slate-900">{u.name}</td>
                        <td className="py-4 text-slate-500 font-medium">{u.email}</td>
                        <td className="py-4 font-bold text-slate-700">{u.org}</td>
                        <td className="py-4"><span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-extrabold">{u.role}</span></td>
                        <td className="py-4"><span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-extrabold">{u.status}</span></td>
                        <td className="py-4 text-right"><button className="text-slate-400 hover:text-slate-700 font-black">...</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ORGANIZATIONS TAB VIEW */}
        {activeTab === 'organizations' && (
          <div className="space-y-6 pb-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Organizations</h1>
                <p className="text-sm font-medium text-slate-500 mt-1">
                  Onboard partner organizations, assign license caps, and monitor institutional inclusion scores.
                </p>
              </div>
              <button className="flex items-center space-x-2 px-5 py-2.5 bg-[#5551ff] text-white rounded-xl font-extrabold text-xs shadow-md">
                <Building2 className="w-4 h-4" />
                <span>Onboard Organization</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'TechMind Solutions', industry: 'Information Technology', players: '450 / 500', score: '92% Avg Score', tier: 'Enterprise Tier' },
                { name: 'Horizon Industries', industry: 'Manufacturing & Energy', players: '380 / 400', score: '88% Avg Score', tier: 'Enterprise Tier' },
                { name: 'Global Logistics', industry: 'Supply Chain & Freight', players: '210 / 250', score: '84% Avg Score', tier: 'Standard Tier' }
              ].map((org, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-indigo-50 text-[#5551ff] rounded-2xl">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-black rounded-full">{org.tier}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">{org.name}</h3>
                    <p className="text-xs text-slate-400 font-medium">{org.industry}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600">
                    <div>Seats: <span className="text-slate-900 font-extrabold">{org.players}</span></div>
                    <div className="text-indigo-600 font-extrabold">{org.score}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        </main>
      </div>

      {/* Send Notification Modal */}
      {showSendNotifModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-xl bg-indigo-50 text-[#5551ff]">
                  <Send className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black text-slate-900">Send New Notification</h3>
              </div>
              <button
                onClick={() => setShowSendNotifModal(false)}
                className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowSendNotifModal(false);
              }}
              className="space-y-4 text-xs font-medium"
            >
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Notification Title</label>
                <input
                  type="text"
                  required
                  value={newNotifTitle}
                  onChange={(e) => setNewNotifTitle(e.target.value)}
                  placeholder="e.g. New Learning Module Available"
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-[#5551ff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Type</label>
                  <select
                    value={newNotifType}
                    onChange={(e) => setNewNotifType(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-[#5551ff]"
                  >
                    <option value="Learning">Learning</option>
                    <option value="Reminder">Reminder</option>
                    <option value="System">System</option>
                    <option value="Report">Report</option>
                    <option value="Event">Event</option>
                    <option value="Achievement">Achievement</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Target Audience</label>
                  <select
                    value={newNotifAudience}
                    onChange={(e) => setNewNotifAudience(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-[#5551ff]"
                  >
                    <option value="All Players">All Players</option>
                    <option value="Active Players">Active Players</option>
                    <option value="Organization Admins">Organization Admins</option>
                    <option value="Partner Admins">Partner Admins</option>
                    <option value="All Users">All Users</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Message Content</label>
                <textarea
                  required
                  rows={4}
                  value={newNotifMessage}
                  onChange={(e) => setNewNotifMessage(e.target.value)}
                  placeholder="Write your notification message..."
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-[#5551ff] leading-relaxed"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowSendNotifModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-[#5551ff] hover:bg-[#4440ee] text-white font-extrabold shadow-md transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Now</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Card Modal */}
      {showAddCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-xl font-black text-slate-900">Create New Investment Card</h3>
            
            <form onSubmit={handleCreateCard} className="space-y-3 text-xs font-medium">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Card Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Executive Mentorship Framework"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold"
                  >
                    <option value="COMPENSATION">COMPENSATION</option>
                    <option value="LEADERSHIP">LEADERSHIP</option>
                    <option value="FLEXIBLE WORK">FLEXIBLE WORK</option>
                    <option value="WORKPLACE CULTURE">WORKPLACE CULTURE</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Cost (₹)</label>
                  <input
                    type="number"
                    value={cost}
                    onChange={(e) => setCost(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the real-world business impact..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 h-20 font-medium"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCard(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-extrabold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#5551ff] text-white font-extrabold shadow-md"
                >
                  Save Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
