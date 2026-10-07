import React, { useState } from 'react';
import { User } from '../types/game';
import { fetchApi } from '../api/client';
import { 
  X, 
  Lock, 
  Mail, 
  User as UserIcon, 
  Building, 
  Globe, 
  KeyRound, 
  Trophy, 
  BookOpen, 
  BarChart3, 
  Users, 
  Eye, 
  EyeOff, 
  Gamepad2, 
  ArrowRight
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('India');
  const [role, setRole] = useState<'user' | 'admin' | 'superadmin'>('user');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPresets, setShowPresets] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const res: any = await fetchApi('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password })
        });
        localStorage.setItem('cii_token', res.token);
        onSuccess(res.user);
        onClose();
      } else {
        const res: any = await fetchApi('/auth/register', {
          method: 'POST',
          body: JSON.stringify({ name, email, password, company, country, role })
        });
        localStorage.setItem('cii_token', res.token);
        onSuccess(res.user);
        onClose();
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const fillQuickPreset = (presetRole: 'superadmin' | 'admin' | 'user') => {
    setIsLogin(true);
    setError('');
    if (presetRole === 'superadmin') {
      setEmail('admin@cii.in');
      setPassword('Admin@123456');
    } else if (presetRole === 'admin') {
      setEmail('anita.roy@tata.com');
      setPassword('Admin@123456');
    } else {
      setEmail('rahul.s@techcorp.io');
      setPassword('User@123456');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-cover bg-center bg-no-repeat flex flex-col justify-between font-sans text-slate-900 animate-fadeIn"
      style={{ backgroundImage: `url('/auth-bg.png')` }}
    >
      
      {/* Top Floating Close Button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-50 p-3 text-slate-500 hover:text-slate-900 bg-white/90 hover:bg-white rounded-full shadow-lg border border-slate-200 backdrop-blur-md transition-all cursor-pointer"
        title="Close Sign In"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Main Full Page Body Content Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-6 sm:px-10 py-8 lg:py-12 flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">

        {/* ------------------------------------------------------------- */}
        {/* LEFT COLUMN: DIRECTLY ON PAGE (NOT IN A CARD BOX) */}
        {/* ------------------------------------------------------------- */}
        <div className="w-full lg:w-[54%] flex flex-col justify-between z-10 space-y-8">
          
          {/* Top Brand Logo */}
          <div className="space-y-6">
            
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-[#5551ff] flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                <Trophy className="w-6 h-6 fill-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-black text-xl tracking-tight text-slate-900">
                    INCLUSIVE <span className="text-[#5551ff]">TYCOON</span>
                  </span>
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-[#fef3c7] text-[#d97706] border border-amber-200">
                    CII CWL
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-semibold">
                  Workplace Inclusion Strategy Game
                </p>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-3 pt-2">
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black text-slate-900 leading-[1.12] tracking-tight">
                Play. Learn. Build<br />
                <span className="relative inline-block text-slate-900">
                  Inclusive Organizations.
                  <svg className="absolute -bottom-2.5 left-0 w-full h-3.5 text-orange-500" viewBox="0 0 250 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9C50 3 150 2 247 9" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-lg pt-2">
                An interactive learning experience by CII Centre for Women Leadership (CII-CWL) to help organizations make inclusive decisions, drive change, and create lasting impact.
              </p>
            </div>

            {/* 3 Feature Bullets */}
            <div className="space-y-4 pt-2">
              
              {/* Feature 1 */}
              <div className="flex items-center space-x-4">
                <div className="w-11 h-11 rounded-2xl bg-indigo-100/90 text-[#5551ff] flex items-center justify-center shrink-0 shadow-xs border border-indigo-200/60">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">Real-world business scenarios</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Make strategic decisions on inclusion</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center space-x-4">
                <div className="w-11 h-11 rounded-2xl bg-amber-100/90 text-amber-600 flex items-center justify-center shrink-0 shadow-xs border border-amber-200/60">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">Evidence-based learning</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Powered by expert research & best practices</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center space-x-4">
                <div className="w-11 h-11 rounded-2xl bg-teal-100/90 text-teal-600 flex items-center justify-center shrink-0 shadow-xs border border-teal-200/60">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">Drive meaningful change</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Build a more equitable workplace</p>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Stats Floating Container */}
          <div className="pt-2">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/90 flex items-center justify-between max-w-xl text-slate-800">
              
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                  <Trophy className="w-4 h-4 fill-amber-500" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900">1000</div>
                  <div className="text-[10px] text-slate-400 font-medium">Starting Points</div>
                </div>
              </div>

              <div className="h-8 w-px bg-slate-200"></div>

              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <Gamepad2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900">10</div>
                  <div className="text-[10px] text-slate-400 font-medium">Strategy Turns</div>
                </div>
              </div>

              <div className="h-8 w-px bg-slate-200"></div>

              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-[#5551ff] flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900">AI Executive Coach</div>
                  <div className="text-[10px] text-slate-400 font-medium">Get real-time guidance</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ------------------------------------------------------------- */}
        {/* RIGHT COLUMN: THE ONLY WHITE CARD CONTAINER */}
        {/* ------------------------------------------------------------- */}
        <div className="w-full lg:w-[42%] max-w-md z-10">
          <div className="bg-white rounded-[2rem] p-8 sm:p-10 shadow-2xl border border-slate-100/90">
            
            {/* Segmented Tab Switcher */}
            <div className="bg-slate-100/80 p-1 rounded-2xl flex items-center mb-6">
              <button
                type="button"
                onClick={() => { setIsLogin(true); setError(''); }}
                className={`w-1/2 py-2.5 rounded-xl font-extrabold text-xs transition-all relative ${
                  isLogin ? 'bg-white text-[#5551ff] shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <span>Sign In</span>
                {isLogin && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-7 h-0.5 bg-[#5551ff] rounded-full"></span>}
              </button>
              <button
                type="button"
                onClick={() => { setIsLogin(false); setError(''); }}
                className={`w-1/2 py-2.5 rounded-xl font-extrabold text-xs transition-all relative ${
                  !isLogin ? 'bg-white text-[#5551ff] shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <span>Register</span>
                {!isLogin && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-7 h-0.5 bg-[#5551ff] rounded-full"></span>}
              </button>
            </div>

            {/* Form Header Title & Subtitle */}
            <div className="mb-6">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {isLogin ? 'Welcome Back' : 'Join Inclusive Tycoon'}
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1">
                {isLogin ? 'Sign in to continue to Inclusive Tycoon' : 'Create your account to start playing and learning'}
              </p>
            </div>

            {/* Quick Presets Dropdown Banner */}
            <div className="mb-4">
              <button
                type="button"
                onClick={() => setShowPresets(!showPresets)}
                className="w-full text-left px-3.5 py-2.5 rounded-xl bg-indigo-50/70 border border-indigo-100 text-[#5551ff] text-[11px] font-bold flex items-center justify-between hover:bg-indigo-100/60 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Quick Demo Account Logins (1-Click)</span>
                </div>
                <span className="text-[10px] underline">{showPresets ? 'Hide' : 'Show Options'}</span>
              </button>

              {showPresets && (
                <div className="mt-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => fillQuickPreset('superadmin')}
                    className="px-2 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-[11px] font-bold text-center transition-all"
                  >
                    Super Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => fillQuickPreset('admin')}
                    className="px-2 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-[11px] font-bold text-center transition-all"
                  >
                    Partner Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => fillQuickPreset('user')}
                    className="px-2 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[11px] font-bold text-center transition-all"
                  >
                    Player
                  </button>
                </div>
              )}
            </div>

            {/* Error Banner */}
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                {error}
              </div>
            )}

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                    <div className="relative">
                      <UserIcon className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50/90 border border-slate-200 focus:bg-white focus:border-[#5551ff] rounded-xl text-xs font-semibold text-slate-900 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Company</label>
                      <div className="relative">
                        <Building className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Organization"
                          className="w-full pl-10 pr-3 py-2.5 bg-slate-50/90 border border-slate-200 focus:bg-white focus:border-[#5551ff] rounded-xl text-xs font-semibold text-slate-900 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Role</label>
                      <select
                        value={role}
                        onChange={(e: any) => setRole(e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-50/90 border border-slate-200 focus:bg-white focus:border-[#5551ff] rounded-xl text-xs font-bold text-slate-900 focus:outline-none transition-all"
                      >
                        <option value="user">Participant</option>
                        <option value="admin">Partner Admin</option>
                        <option value="superadmin">Super Admin</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50/90 border border-slate-200 focus:bg-white focus:border-[#5551ff] rounded-xl text-xs font-semibold text-slate-900 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-3 bg-slate-50/90 border border-slate-200 focus:bg-white focus:border-[#5551ff] rounded-xl text-xs font-semibold text-slate-900 focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password Row */}
              {isLogin && (
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-[#5551ff] focus:ring-[#5551ff]"
                    />
                    <span className="font-semibold text-slate-700">Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setError('Password reset instructions have been sent to your email.')}
                    className="font-extrabold text-[#5551ff] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Primary Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-[#5551ff] hover:bg-[#4440ef] text-white font-extrabold text-xs shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center space-x-2 mt-2"
              >
                {loading ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>

            {/* Or continue with Separator */}
            <div className="relative my-5 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <span className="relative bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                or continue with
              </span>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => fillQuickPreset('user')}
                className="py-2.5 px-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[11px] font-extrabold text-slate-700 flex items-center justify-center space-x-1.5 transition-all shadow-xs"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span className="truncate">Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={() => fillQuickPreset('admin')}
                className="py-2.5 px-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[11px] font-extrabold text-slate-700 flex items-center justify-center space-x-1.5 transition-all shadow-xs"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 23 23">
                  <path fill="#f35325" d="M1 1h10v10H1z"/>
                  <path fill="#81bc06" d="M12 1h10v10H12z"/>
                  <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                  <path fill="#ffba08" d="M12 12h10v10H12z"/>
                </svg>
                <span className="truncate">Continue with Microsoft</span>
              </button>
            </div>

            {/* Bottom Register Link */}
            <div className="mt-6 text-center pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500 font-medium">
                {isLogin ? "Don't have an account? " : "Already registered? "}
                <button
                  type="button"
                  onClick={() => { setIsLogin(!isLogin); setError(''); }}
                  className="font-extrabold text-[#5551ff] hover:underline"
                >
                  {isLogin ? 'Register' : 'Sign In'}
                </button>
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* BOTTOM FULL-WIDTH FOOTER MATCHING SCREENSHOT EXACTLY */}
      {/* ------------------------------------------------------------- */}
      <footer className="w-full border-t border-slate-200/80 bg-white py-4 text-xs text-slate-500 font-medium z-10 shrink-0">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left CII Branding */}
          <div className="flex items-center space-x-3">
            <div className="px-2.5 py-1.5 bg-[#0d0d2b] text-white font-black tracking-tighter text-xs rounded-lg shadow-xs">
              CII
            </div>
            <div className="text-[11px] leading-tight text-slate-700">
              <span className="font-bold block text-slate-900">Confederation of Indian Industry</span>
              <span className="text-slate-500">Centre for Women Leadership (CII - CWL)</span>
            </div>
          </div>

          {/* Middle Tagline */}
          <div className="text-center text-[11px] text-slate-500 max-w-md">
            An interactive learning initiative by CII Centre for Women Leadership to inspire inclusive workplaces and stronger businesses.
          </div>

          {/* Right Nav Links */}
          <div className="flex items-center space-x-6 text-[11px]">
            <button onClick={onClose} className="hover:text-indigo-600 font-extrabold text-slate-600">
              Learning Content
            </button>
            <button onClick={onClose} className="hover:text-indigo-600 font-extrabold text-slate-600">
              Inclusion Assessment
            </button>
            <a href="mailto:support@cii.in" className="hover:text-indigo-600 font-extrabold text-slate-600">
              Support
            </a>
          </div>

        </div>
      </footer>

    </div>
  );
};
