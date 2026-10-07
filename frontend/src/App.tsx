import React, { useState, useEffect } from 'react';
import { User, Session, Player, InvestmentCard, EventCard } from './types/game';
import { fetchApi, initSocket } from './api/client';
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { PrePostQuizModal } from './components/PrePostQuizModal';
import { LobbyView } from './components/LobbyView';
import { BoardView } from './components/BoardView';
import { CardDeckView } from './components/CardDeckView';
import { AiAdvisorPanel } from './components/AiAdvisorPanel';
import { EventModal } from './components/EventModal';
import { EndGameDebriefModal } from './components/EndGameDebriefModal';
import { InstitutionalAdminView } from './components/InstitutionalAdminView';
import { SuperAdminView } from './components/SuperAdminView';
import { EducationalResourcesView } from './components/EducationalResourcesView';

export function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<'lobby' | 'game' | 'quiz' | 'resources' | 'admin' | 'superadmin'>(() => {
    const saved = localStorage.getItem('cii_active_view');
    if (saved && ['lobby', 'game', 'quiz', 'resources', 'admin', 'superadmin'].includes(saved)) {
      return saved as any;
    }
    return 'lobby';
  });
  const [showAuthModal, setShowAuthModal] = useState(false);

  const changeActiveView = (view: 'lobby' | 'game' | 'quiz' | 'resources' | 'admin' | 'superadmin') => {
    setActiveView(view);
    localStorage.setItem('cii_active_view', view);
  };

  // Active Game State
  const [session, setSession] = useState<Session | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerId, setCurrentPlayerId] = useState<string>('');
  const [investmentCards, setInvestmentCards] = useState<InvestmentCard[]>([]);
  const [latestAdvice, setLatestAdvice] = useState<string | null>(null);
  const [drawnEventCard, setDrawnEventCard] = useState<EventCard | null>(null);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [makingMove, setMakingMove] = useState(false);

  // Quiz Modal State
  const [quizType, setQuizType] = useState<'pre' | 'post'>('pre');
  const [showQuizModal, setShowQuizModal] = useState(false);

  useEffect(() => {
    checkAuth();
    loadInvestmentCards();
    setupSockets();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('cii_token');
    if (!token) return;

    try {
      const data: any = await fetchApi('/auth/me');
      setUser(data.user);
      const savedView = localStorage.getItem('cii_active_view');
      if (!savedView && data.user?.role === 'superadmin') {
        changeActiveView('superadmin');
      }
    } catch (err) {
      localStorage.removeItem('cii_token');
    }
  };

  const loadInvestmentCards = async () => {
    try {
      const data: any = await fetchApi('/cards/investment');
      setInvestmentCards(data.cards || []);
    } catch (err) {
      console.error('Failed to load investment cards', err);
    }
  };

  const setupSockets = () => {
    const socket = initSocket();

    socket.on('session_updated', ({ session: s, players: p }) => {
      setSession(s);
      setPlayers(p);
    });

    socket.on('game_started', ({ session: s, players: p }) => {
      setSession(s);
      setPlayers(p);
      changeActiveView('game');
    });

    socket.on('turn_completed', ({ session: s, players: p, aiAdvice, eventCard, isGameFinished: finished }) => {
      setSession(s);
      setPlayers(p);
      setMakingMove(false);

      if (aiAdvice) setLatestAdvice(aiAdvice);
      if (eventCard) setDrawnEventCard(eventCard);
      if (finished) setIsGameFinished(true);
    });
  };

  const handleSessionStarted = (newSession: Session, newPlayers: Player[]) => {
    setSession(newSession);
    setPlayers(newPlayers);
    setCurrentPlayerId(newPlayers[0].id);
    changeActiveView('game');
  };

  const handleMakeDecision = (cardId: string | null, action: 'invest' | 'pass') => {
    if (!session || !currentPlayerId || makingMove) return;

    setMakingMove(true);
    const socket = initSocket();

    socket.emit('make_turn', {
      sessionId: session.id,
      playerId: currentPlayerId,
      cardId,
      action
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('cii_token');
    localStorage.removeItem('cii_active_view');
    setUser(null);
    setSession(null);
    setPlayers([]);
    setCurrentPlayerId('');
    changeActiveView('lobby');
    setShowAuthModal(true);
  };

  const me = players.find(p => p.id === currentPlayerId) || players[0];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900 selection:bg-amber-500 selection:text-white">
      
      {/* Top Navbar (Rendered only for standalone views like quiz or resources) */}
      {activeView !== 'superadmin' && activeView !== 'admin' && activeView !== 'lobby' && (
        <Navbar
          user={user}
          activeView={activeView}
          setActiveView={changeActiveView}
          onOpenAuth={() => setShowAuthModal(true)}
          onLogout={handleLogout}
          roomCode={session?.code}
        />
      )}

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {activeView === 'lobby' && (
          <LobbyView
            user={user}
            onSessionStarted={handleSessionStarted}
            onOpenAuth={() => setShowAuthModal(true)}
            onLogout={handleLogout}
            onStartQuiz={() => {
              setQuizType('pre');
              changeActiveView('quiz');
            }}
            onNavigateToView={(view) => changeActiveView(view as any)}
          />
        )}

        {activeView === 'game' && session && (
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 animate-fadeIn">
            
            {/* Top Board & Gauges View */}
            <BoardView
              session={session}
              players={players}
              currentPlayerId={currentPlayerId}
            />

            {/* Middle Grid: AI Advisor Panel */}
            <AiAdvisorPanel
              latestAdvice={latestAdvice}
              turnNumber={session.current_turn}
              inclusionScore={me ? me.inclusion_score : 50}
            />

            {/* Bottom Grid: Card Deck Selection */}
            <CardDeckView
              cards={investmentCards}
              player={me || { points: 1000, inclusion_score: 50, brand_equity: 50, talent_retained: 70 }}
              onMakeDecision={handleMakeDecision}
              disabled={makingMove || session.status === 'completed'}
            />

          </div>
        )}

        {activeView === 'quiz' && (
          <PrePostQuizModal
            type={quizType}
            userId={user ? user.id : 'guest_' + Date.now()}
            sessionId={session?.id}
            onComplete={(score, total) => {
              if (quizType === 'pre') {
                changeActiveView('lobby');
              }
            }}
          />
        )}

        {activeView === 'resources' && <EducationalResourcesView />}

        {activeView === 'admin' && user && (
          <InstitutionalAdminView
            user={user}
            onNavigateToApp={() => changeActiveView('lobby')}
            onLogout={handleLogout}
          />
        )}

        {activeView === 'superadmin' && (
          <SuperAdminView
            onNavigateToApp={() => changeActiveView('lobby')}
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={(u) => {
          setUser(u);
          if (u.role === 'admin') {
            changeActiveView('admin');
          } else if (u.role === 'superadmin') {
            changeActiveView('superadmin');
          } else {
            changeActiveView('lobby');
          }
        }}
      />

      {/* Chance Event Pop-up */}
      <EventModal
        eventCard={drawnEventCard}
        onClose={() => setDrawnEventCard(null)}
      />

      {/* End Game Debrief & Certificate Modal */}
      {isGameFinished && session && (
        <EndGameDebriefModal
          sessionId={session.id}
          players={players}
          currentPlayerId={currentPlayerId}
          onRestart={() => {
            setIsGameFinished(false);
            setSession(null);
            changeActiveView('lobby');
          }}
        />
      )}

      {/* Footer matching reference image (Hidden in superadmin, admin, or logged-in player view) */}
      {activeView !== 'superadmin' && activeView !== 'admin' && !(activeView === 'lobby' && user) && (
        <footer className="w-full border-t border-slate-200 bg-white py-6 text-xs text-slate-500 font-medium">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Left CII Branding */}
            <div className="flex items-center space-x-3">
              <div className="px-2.5 py-1 bg-indigo-900 text-white font-black tracking-tighter text-sm rounded">
                CII
              </div>
              <div className="text-[11px] leading-tight text-slate-700">
                <span className="font-bold block">Confederation of Indian Industry</span>
                <span className="text-slate-500">Centre for Women Leadership (CII - CWL)</span>
              </div>
            </div>

            {/* Middle Subtitle */}
            <div className="text-center text-[11px] text-slate-500 max-w-md">
              An interactive learning initiative by CII Centre for Women Leadership to inspire inclusive workplaces and stronger businesses.
            </div>

            {/* Right Links */}
            <div className="flex items-center space-x-4 text-[11px]">
              <button onClick={() => changeActiveView('resources')} className="hover:text-indigo-600 font-bold">
                Learning Content
              </button>
              <button onClick={() => changeActiveView('quiz')} className="hover:text-indigo-600 font-bold">
                Inclusion Assessment
              </button>
              <a href="mailto:support@cii.in" className="hover:text-indigo-600 font-bold">
                Support
              </a>
            </div>

          </div>
        </footer>
      )}

    </div>
  );
}
export default App;
