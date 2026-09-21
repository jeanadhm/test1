// ============================================================
// KONTA — Dashboard (Accueil)
// ============================================================

import { useState, useRef } from 'react';
import {
  Upload,
  Send,
  Receipt,
  BarChart3,
  FileSearch,
  AlertTriangle,
  FileText,
  FileBarChart,
  Mail,
  FileCheck,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { useAppState } from '../store/AppContext';
import { KontaFile } from '../types';

export default function Dashboard() {
  const { state, dispatch } = useAppState();
  const { isDemoMode, files, invoices, anomalies, datasets } = state;
  const [dragOver, setDragOver] = useState(false);
  const [commandValue, setCommandValue] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(Array.from(e.target.files));
    }
  };

  const processFiles = (rawFiles: File[]) => {
    rawFiles.forEach((file) => {
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      const typeMap: Record<string, KontaFile['type']> = {
        pdf: 'pdf', xlsx: 'xlsx', xls: 'xlsx', csv: 'csv',
        png: 'png', jpg: 'jpg', jpeg: 'jpeg', txt: 'txt',
      };
      const fileType = typeMap[ext];
      if (!fileType) return;

      const newFile: KontaFile = {
        id: `file-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        name: file.name,
        type: fileType,
        size: file.size,
        status: 'pending',
        uploadedAt: new Date(),
      };
      dispatch({ type: 'ADD_FILE', file: newFile });
    });
  };

  const quickActions = [
    { icon: <Receipt size={20} />, label: 'Analyser des factures', page: 'invoices' as const, color: 'text-blue-600 bg-blue-50' },
    { icon: <BarChart3 size={20} />, label: 'Analyser un fichier Excel', page: 'data-analysis' as const, color: 'text-emerald-600 bg-emerald-50' },
    { icon: <FileSearch size={20} />, label: 'Interroger un document', page: 'assistant' as const, color: 'text-purple-600 bg-purple-50' },
    { icon: <AlertTriangle size={20} />, label: 'Détecter des anomalies', page: 'control' as const, color: 'text-amber-600 bg-amber-50' },
    { icon: <FileText size={20} />, label: 'Résumer un dossier', page: 'assistant' as const, color: 'text-slate-600 bg-slate-50' },
    { icon: <FileBarChart size={20} />, label: 'Créer un rapport', page: 'reports' as const, color: 'text-indigo-600 bg-indigo-50' },
    { icon: <Mail size={20} />, label: 'Préparer un email', page: 'assistant' as const, color: 'text-rose-600 bg-rose-50' },
  ];

  // Stats
  const analyzedDocs = isDemoMode ? 7 : files.filter((f) => f.status === 'analyzed').length;
  const analysesDone = isDemoMode ? 3 : datasets.length + invoices.length;
  const toVerify = isDemoMode ? anomalies.filter((a) => a.status === 'pending').length : 0;
  const reportsGenerated = isDemoMode ? 2 : 0;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <p className="text-blue-600 text-sm font-medium mb-1">Bonjour 👋</p>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          Que souhaitez-vous confier à Konta aujourd'hui ?
        </h1>
        <p className="text-slate-500 text-sm">
          Analysez vos documents, explorez vos données et automatisez vos tâches depuis un seul espace.
        </p>
      </div>

      {/* Command Bar */}
      <div
        className={`relative rounded-xl border-2 transition-all duration-200 mb-8 ${
          dragOver
            ? 'border-blue-500 bg-blue-50/50'
            : 'border-blue-100 bg-white hover:border-blue-200'
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <div className="flex items-center gap-3 px-4 py-3.5">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-sm font-medium hover:from-blue-100 hover:to-indigo-100 transition-colors cursor-pointer shrink-0 border border-blue-200"
          >
            <Upload size={16} />
            Joindre
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.xlsx,.xls,.csv,.png,.jpg,.jpeg,.txt"
            onChange={handleFileSelect}
            className="hidden"
          />
          <input
            type="text"
            value={commandValue}
            onChange={(e) => setCommandValue(e.target.value)}
            placeholder="Demandez quelque chose à Konta..."
            className="flex-1 text-sm text-slate-900 placeholder:text-slate-400 outline-none bg-transparent"
          />
          <button
            onClick={() => {
              if (commandValue.trim()) {
                dispatch({ type: 'SET_PAGE', page: 'assistant' });
              }
            }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors cursor-pointer shrink-0 shadow-lg shadow-blue-500/30"
          >
            <Send size={16} />
            Envoyer
          </button>
        </div>
        {dragOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-blue-50/80 rounded-xl backdrop-blur-sm">
            <p className="text-sm font-medium text-blue-700">Déposez vos documents ici</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">Actions rapides</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {quickActions.map((action, i) => (
            <button
              key={i}
              onClick={() => dispatch({ type: 'SET_PAGE', page: action.page })}
              className="flex flex-col items-start gap-2 p-4 rounded-xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/30 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-150 text-left cursor-pointer"
            >
              <div className={`p-2 rounded-lg ${action.color}`}>{action.icon}</div>
              <span className="text-sm font-medium text-slate-700">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<FileCheck size={18} />} label="Documents analysés" value={analyzedDocs} color="from-blue-500 to-cyan-500" />
        <StatCard icon={<CheckCircle2 size={18} />} label="Analyses effectuées" value={analysesDone} color="from-emerald-500 to-teal-500" />
        <StatCard icon={<AlertCircle size={18} />} label="Éléments à vérifier" value={toVerify} color="from-amber-500 to-orange-500" />
        <StatCard icon={<FileBarChart size={18} />} label="Rapports générés" value={reportsGenerated} color="from-indigo-500 to-purple-500" />
      </div>

      {/* Recent Activity */}
      {isDemoMode && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-blue-100 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-blue-700 mb-3 flex items-center gap-2">
              <Clock size={16} className="text-blue-500" />
              Activité récente
            </h3>
            <div className="space-y-3">
              {[
                { action: 'Facture analysée', detail: 'facture_beta_001.pdf', time: 'Il y a 2h' },
                { action: 'Données importées', detail: 'transactions_nova_2026.xlsx', time: 'Il y a 3h' },
                { action: 'Contrôle effectué', detail: '7 éléments détectés', time: 'Il y a 3h' },
                { action: 'Facture validée', detail: 'facture_nova_log_003.pdf', time: 'Hier' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-blue-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-slate-700">{item.action}</p>
                    <p className="text-xs text-slate-400">{item.detail}</p>
                  </div>
                  <span className="text-xs text-blue-500 font-medium">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-blue-100 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-blue-700 mb-3 flex items-center gap-2">
              <TrendingUp size={16} className="text-blue-500" />
              Analyses récentes
            </h3>
            <div className="space-y-3">
              {[
                { title: 'Synthèse dossier NOVA', client: 'NOVA DISTRIBUTION', date: '10 juin 2026' },
                { title: 'Analyse factures mars', client: 'NOVA DISTRIBUTION', date: '8 juin 2026' },
                { title: 'Contrôle transactions', client: 'NOVA DISTRIBUTION', date: '5 juin 2026' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-blue-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-slate-700">{item.title}</p>
                    <p className="text-xs text-slate-400">{item.client}</p>
                  </div>
                  <span className="text-xs text-blue-500 font-medium">{item.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Upload hint */}
      {!isDemoMode && files.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-blue-200 rounded-xl bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
          <Upload size={32} className="mx-auto text-blue-400 mb-3" />
          <p className="text-sm text-slate-600">Déposez vos documents ici ou cliquez sur "Joindre"</p>
          <p className="text-xs text-slate-500 mt-1">PDF, XLSX, CSV, PNG, JPG acceptés</p>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-2">
        <div className={`p-2 rounded-lg bg-gradient-to-br ${color} text-white`}>
          {icon}
        </div>
        <span className="text-xs text-slate-500 font-medium">{label}</span>
      </div>
      <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{value}</p>
    </div>
  );
}
