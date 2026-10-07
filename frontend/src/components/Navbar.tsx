import React from 'react';
import { User } from '../types/game';
import { Trophy, BookOpen, Shield, Users, LogOut, LogIn, Gamepad2, FileText, ArrowRight } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  activeView: 'lobby' | 'game' | 'quiz' | 'resources' | 'admin' | 'superadmin';
  setActiveView: (view: 'lobby' | 'game' | 'quiz' | 'resources' | 'admin' | 'superadmin') => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  roomCode?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  activeView,
  setActiveView,
  onOpenAuth,
  onLogout,
  roomCode
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveView('lobby')}>
          <div className="w-11 h-11 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-600/20">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-black text-xl tracking-tight text-slate-900">
                INCLUSIVE <span className="text-indigo-600">TYCOON</span>
              </span>
              <span className="text-[11px] font-extrabold tracking-wide px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-600 border border-orange-200">
                CII CWL
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium hidden sm:block">
              Workplace Inclusion Strategy Game
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => setActiveView('lobby')}
            className={`flex items-center space-x-2 py-2 text-sm font-bold border-b-2 transition-all ${
              activeView === 'lobby' || activeView === 'game'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Play Game</span>
            {roomCode && (
              <span className="ml-1 px-2 py-0.5 text-[11px] bg-indigo-100 text-indigo-700 rounded-md font-mono font-bold">
                #{roomCode}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveView('quiz')}
            className={`flex items-center space-x-2 py-2 text-sm font-bold border-b-2 transition-all ${
              activeView === 'quiz'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Pre/Post Quiz</span>
          </button>

          <button
            onClick={() => setActiveView('resources')}
            className={`flex items-center space-x-2 py-2 text-sm font-bold border-b-2 transition-all ${
              activeView === 'resources'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Learning Hub</span>
          </button>

          {user && (user.role === 'admin' || user.role === 'superadmin') && (
            <button
              onClick={() => setActiveView('admin')}
              className={`flex items-center space-x-2 py-2 text-sm font-bold border-b-2 transition-all ${
                activeView === 'admin'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Partner Admin</span>
            </button>
          )}

          {user && user.role === 'superadmin' && (
            <button
              onClick={() => setActiveView('superadmin')}
              className={`flex items-center space-x-2 py-2 text-sm font-bold border-b-2 transition-all ${
                activeView === 'superadmin'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Super Admin</span>
            </button>
          )}
        </nav>

        {/* User Auth Section */}
        <div className="flex items-center space-x-3">
          {user ? (
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-extrabold text-slate-900 flex items-center justify-end space-x-1">
                  <span>{user.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono uppercase ${
                    user.role === 'superadmin' ? 'bg-rose-100 text-rose-700 border border-rose-200 font-bold' :
                    user.role === 'admin' ? 'bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold' :
                    'bg-slate-100 text-slate-700 border border-slate-200 font-bold'
                  }`}>
                    {user.role}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium">{user.company || user.email}</div>
              </div>

              <button
                onClick={onLogout}
                title="Logout"
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-rose-600 transition-colors border border-slate-200"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs shadow-lg shadow-orange-500/30 transition-all"
            >
              <span>Sign In / Register</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
