// ============================================================
// KONTA — Application principale
// Assistant IA pour cabinets comptables
// by PrimeAxis
// ============================================================

import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AppProvider, useAppState } from './store/AppContext';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Assistant from './components/Assistant';
import Documents from './components/Documents';
import Invoices from './components/Invoices';
import DataAnalysis from './components/DataAnalysis';
import Control from './components/Control';
import DemoMode from './components/DemoMode';
import { Clients, Reports, HistoryPage, SettingsPage } from './components/Pages';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import { Monitor, X, LogOut } from 'lucide-react';

function AppContent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPageWrapper />} />
        <Route path="/auth" element={<AuthPageWrapper />} />
        <Route path="/dashboard/*" element={<DashboardWrapper />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function LandingPageWrapper() {
  const navigate = useNavigate();
  return <LandingPage onEnter={() => navigate('/auth')} />;
}

function AuthPageWrapper() {
  const navigate = useNavigate();
  return (
    <AuthPage
      onAuthenticated={() => navigate('/dashboard')}
      onBack={() => navigate('/')}
    />
  );
}

function DashboardWrapper() {
  const { state, dispatch } = useAppState();
  const navigate = useNavigate();
  const { currentPage, isPresentationMode, isDemoMode } = state;

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'assistant': return <Assistant />;
      case 'documents': return <Documents />;
      case 'invoices': return <Invoices />;
      case 'data-analysis': return <DataAnalysis />;
      case 'control': return <Control />;
      case 'clients': return <Clients />;
      case 'reports': return <Reports />;
      case 'history': return <HistoryPage />;
      case 'settings': return <SettingsPage />;
      case 'demo': return <DemoMode />;
      default: return <Dashboard />;
    }
  };

  // Presentation mode
  if (isPresentationMode) {
    return (
      <div className="min-h-screen bg-white">
        {/* Presentation header */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => dispatch({ type: 'TOGGLE_PRESENTATION_MODE' })}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 cursor-pointer shadow-lg"
          >
            <X size={14} />
            Quitter le mode présentation
          </button>
        </div>
        <div className="max-w-6xl mx-auto px-8 py-12">
          {renderPage()}
        </div>
        {/* Footer */}
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 py-3 text-center">
          <p className="text-xs text-slate-400">
            <span className="font-bold text-slate-600">KONTA</span> by PrimeAxis — Rendre autonome votre entreprise avec l'Intelligence Artificielle.
          </p>
        </footer>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 min-h-screen">
        {/* Top bar */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-blue-100 px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            {isDemoMode && (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-amber-700 text-xs font-medium shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                Mode Démo — Données fictives
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/auth')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer border border-transparent hover:border-blue-200"
            >
              <LogOut size={14} />
              Déconnexion
            </button>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_PRESENTATION_MODE' })}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer border border-transparent hover:border-blue-200"
            >
              <Monitor size={14} />
              Présentation
            </button>
          </div>
        </div>

        {/* Page content */}
        <div className="p-6">
          {currentPage === 'demo' ? <DemoMode /> : renderPage()}
        </div>

        {/* Footer */}
        <footer className="px-6 py-4 border-t border-blue-100 mt-8 bg-white/50 backdrop-blur-sm">
          <p className="text-xs text-slate-500 text-center">
            <span className="font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">KONTA</span> by PrimeAxis — Rendre autonome votre entreprise avec l'Intelligence Artificielle.
          </p>
        </footer>
      </main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
