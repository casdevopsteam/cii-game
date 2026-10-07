import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Download, 
  Search, 
  Mic, 
  FileText, 
  ArrowUpDown, 
  ArrowRight, 
  Quote, 
  Headphones 
} from 'lucide-react';

export const EducationalResourcesView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'guides' | 'audio' | 'frameworks'>('guides');
  const [searchQuery, setSearchQuery] = useState('');
  const [topicFilter, setTopicFilter] = useState('all');

  const guides = [
    {
      title: 'Operationalizing Gender Pay Parity',
      author: 'CII CENTRE FOR WOMEN LEADERSHIP',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      readTime: '6 min read',
      summary: 'A step-by-step guide for conducting unadjusted pay equity audits and building transparent salary band structures.',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      takeaways: [
        'Establish regular compensation audits',
        'Eliminate salary history queries during candidate hiring',
        'Normalize equal pay metrics at board level'
      ]
    },
    {
      title: 'Building High-Impact Returnship Pathways',
      author: 'MCKINSEY & CII INDUSTRY TASKFORCE',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      readTime: '8 min read',
      summary: 'How to design 6-month re-entry programs for senior women returning from career breaks with active executive mentorship.',
      thumbnail: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
      takeaways: [
        'Target high-skill technical and managerial bands',
        'Provide structured 90-day onboarding refreshers',
        'Measure cohort retention at 12 and 24 months'
      ]
    },
    {
      title: 'Proximity Bias in Hybrid & Flexible Work',
      author: 'CATALYST ORGANIZATIONAL RESEARCH',
      badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
      readTime: '5 min read',
      summary: 'Mitigating invisible bias against remote and flexible working mothers during promotion and bonus calibration reviews.',
      thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
      takeaways: [
        'Focus performance evaluation strictly on deliverable outcomes',
        'Audit promotion velocity between in-person and flexible workers',
        'Enforce core asynchronous meeting protocols'
      ]
    }
  ];

  return (
    <div className="w-full space-y-8 animate-fadeIn">
      
      {/* Top Hero Banner Section */}
      <div 
        className="w-full relative bg-cover bg-right lg:bg-center overflow-hidden py-12 px-4 sm:px-8 lg:px-12 flex items-center min-h-[380px]"
        style={{ backgroundImage: "url('/learning-hub-bg.png')" }}
      >
        <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-8 z-10">
          
          {/* Left Hero Content */}
          <div className="max-w-xl space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#5551ff]">
              CII CWL LEARNING HUB
            </span>

            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-none">
              Workplace Inclusion <br />
              <span className="text-[#5551ff]">Masterclass & Resources</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-xl">
              Practical guides, executive toolkits, and case studies to implement inclusive corporate policies.
            </p>

            {/* Search & Filter Input Bar */}
            <div className="pt-2">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2 pl-4 border border-slate-200/90 shadow-lg flex items-center justify-between max-w-xl">
                <div className="flex items-center space-x-3 flex-1">
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search guides, case studies, frameworks..."
                    className="w-full bg-transparent text-xs font-semibold text-slate-900 focus:outline-none placeholder:text-slate-400 placeholder:font-medium"
                  />
                </div>
                <select
                  value={topicFilter}
                  onChange={(e) => setTopicFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-extrabold text-slate-700 focus:outline-none cursor-pointer"
                >
                  <option value="all">All Topics</option>
                  <option value="pay-parity">Pay Parity</option>
                  <option value="returnships">Returnships</option>
                  <option value="hybrid-work">Hybrid Work</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right Section: Quote Card Overlay */}
          <div className="hidden lg:flex items-center justify-end w-1/3 relative">
            <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-white/60 shadow-xl max-w-xs space-y-3">
              <Quote className="w-8 h-8 text-[#5551ff] rotate-180 fill-[#5551ff]/20" />
              <h4 className="text-xl font-black text-slate-900 leading-snug">
                Knowledge builds inclusive leaders.
              </h4>
            </div>
          </div>

        </div>
      </div>

      {/* Main Container Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-12">
        
        {/* Navigation Tabs Bar & Sorting */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
          
          {/* Left Category Tabs */}
          <div className="flex items-center space-x-3 overflow-x-auto w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('guides')}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-2 shrink-0 ${
                activeTab === 'guides'
                  ? 'bg-[#5551ff] text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Headphones className="w-4 h-4" />
              <span>Executive Guides</span>
            </button>

            <button
              onClick={() => setActiveTab('audio')}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-2 shrink-0 ${
                activeTab === 'audio'
                  ? 'bg-[#5551ff] text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Mic className="w-4 h-4" />
              <span>Audio Summaries</span>
            </button>

            <button
              onClick={() => setActiveTab('frameworks')}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-2 shrink-0 ${
                activeTab === 'frameworks'
                  ? 'bg-[#5551ff] text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Policy Frameworks</span>
            </button>
          </div>

          {/* Right Sort Dropdown */}
          <div className="flex items-center space-x-2 shrink-0">
            <div className="bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-extrabold text-slate-700 flex items-center space-x-2 shadow-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select className="bg-transparent focus:outline-none cursor-pointer">
                <option value="latest">Latest First</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

        </div>

        {/* 3 Cards Grid matching reference image 100% */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guides.map((g, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                
                {/* Top Badge & Read Time */}
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${g.badgeColor}`}>
                    {g.author}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{g.readTime}</span>
                  </span>
                </div>

                {/* Title & Description with Right Thumbnail */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2 flex-1">
                    <h3 className="text-xl font-black text-slate-900 leading-snug tracking-tight">{g.title}</h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{g.summary}</p>
                  </div>

                  {/* Thumbnail Graphic */}
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 relative bg-indigo-50 border border-indigo-100 shadow-inner">
                    <img src={g.thumbnail} alt={g.title} className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Takeaways Container Box */}
                <div className="bg-[#fcfaff] border border-purple-100/80 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center space-x-1.5 text-xs font-extrabold text-[#ea580c]">
                    <CheckCircle2 className="w-4 h-4 text-[#ea580c]" />
                    <span>Key Corporate Takeaways</span>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-slate-700 font-medium">
                    {g.takeaways.map((t, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-slate-400 font-bold">•</span>
                        <span className="leading-snug">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Bottom Action Buttons */}
              <div className="flex items-center space-x-3 pt-2">
                <button className="flex-1 py-3 px-4 rounded-xl bg-[#5551ff] hover:bg-[#4440ff] text-white font-black text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center space-x-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button className="py-3 px-4 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-extrabold text-xs shadow-xs transition-all flex items-center space-x-1.5">
                  <Download className="w-4 h-4 text-slate-600" />
                  <span>Download PDF</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Page Footer matching reference design */}
        <footer className="w-full border-t border-slate-200 bg-white/80 backdrop-blur-md py-6 px-4 sm:px-8 mt-12">
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

    </div>
  );
};
