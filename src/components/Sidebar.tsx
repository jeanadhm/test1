// ============================================================
// KONTA — Sidebar
// ============================================================

import {
  Home,
  MessageSquare,
  FileText,
  Receipt,
  BarChart3,
  ShieldCheck,
  Users,
  FileBarChart,
  History,
  Settings,
  Play,
  Monitor,
  ChevronLeft,
  User,
} from 'lucide-react';
import { useAppState } from '../store/AppContext';
import { Page } from '../types';

interface NavItem {
  id: Page;
  label: string;
  icon: React.ReactNode;
}

const mainNav: NavItem[] = [
  { id: 'dashboard', label: 'Accueil', icon: <Home size={18} /> },
  { id: 'assistant', label: 'Assistant KONTA', icon: <MessageSquare size={18} /> },
  { id: 'documents', label: 'Documents', icon: <FileText size={18} /> },
  { id: 'invoices', label: 'Factures', icon: <Receipt size={18} /> },
  { id: 'data-analysis', label: 'Analyse de données', icon: <BarChart3 size={18} /> },
  { id: 'control', label: 'Contrôle intelligent', icon: <ShieldCheck size={18} /> },
  { id: 'clients', label: 'Clients', icon: <Users size={18} /> },
  { id: 'reports', label: 'Rapports', icon: <FileBarChart size={18} /> },
  { id: 'history', label: 'Historique', icon: <History size={18} /> },
];

export default function Sidebar() {
  const { state, dispatch } = useAppState();
  const { currentPage, isPresentationMode, isDemoMode } = state;

  if (isPresentationMode) return null;

  return (
    <aside className="w-64 bg-white border-r border-blue-100 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-blue-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="text-white font-bold text-sm tracking-tight">K</span>
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">KONTA</h1>
            <p className="text-[10px] text-blue-500 font-medium tracking-wide uppercase">by PrimeAxis</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="space-y-0.5">
          {mainNav.map((item) => (
            <button
              key={item.id}
              onClick={() => dispatch({ type: 'SET_PAGE', page: item.id })}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer ${
                currentPage === item.id
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 shadow-sm'
                  : 'text-slate-600 hover:bg-blue-50/50 hover:text-blue-700 border border-transparent'
              }`}
            >
              <span className={currentPage === item.id ? 'text-blue-600' : 'text-slate-400'}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </div>

        {/* Separator */}
        <div className="my-4 border-t border-blue-100"></div>

        {/* Demo Mode */}
        <button
          onClick={() => dispatch({ type: 'TOGGLE_DEMO_MODE' })}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer ${
            isDemoMode
              ? 'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-200 shadow-sm'
              : 'text-slate-600 hover:bg-amber-50/50 border border-transparent'
          }`}
        >
          <Play size={18} className={isDemoMode ? 'text-amber-500' : 'text-slate-400'} />
          Mode Démo
          {isDemoMode && (
            <span className="ml-auto text-[10px] bg-gradient-to-r from-amber-400 to-orange-400 text-white px-1.5 py-0.5 rounded-full font-semibold">
              ON
            </span>
          )}
        </button>

        <button
          onClick={() => dispatch({ type: 'TOGGLE_PRESENTATION_MODE' })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all duration-150 cursor-pointer border border-transparent"
        >
          <Monitor size={18} className="text-slate-400" />
          Mode Présentation
        </button>
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-blue-100 space-y-0.5">
        <button
          onClick={() => dispatch({ type: 'SET_PAGE', page: 'settings' })}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer ${
            currentPage === 'settings'
              ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 shadow-sm'
              : 'text-slate-600 hover:bg-blue-50/50'
          }`}
        >
          <Settings size={18} className="text-slate-400" />
          Paramètres
        </button>
        <div className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-500">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
            <User size={14} className="text-white" />
          </div>
          <span className="text-xs font-medium text-slate-700">Comptable Démo</span>
        </div>
      </div>

      {/* Demo banner */}
      {isDemoMode && (
        <div className="px-4 py-2 bg-amber-50 border-t border-amber-100">
          <p className="text-[10px] text-amber-700 font-medium text-center">
            Données fictives — démonstration
          </p>
        </div>
      )}
    </aside>
  );
}
