// ============================================================
// KONTA — Module Analyse de données
// ============================================================

import { useState, useRef } from 'react';
import { Upload, BarChart3, Loader2, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useAppState } from '../store/AppContext';
import { Transaction, Dataset } from '../types';
import { parseCSV, parseExcel, mapToTransactions, readFileAsText } from '../utils/parsers';
import {
  sumAmounts, countTransactions, averageAmount, formatCurrency,
  getTotalsByCategory, getTotalsBySupplier, getMonthlyEvolution,
} from '../utils/calculations';
import { analyzeDataset } from '../utils/kontaAI';
import { DEMO_TRANSACTIONS } from '../data/demoData';

export default function DataAnalysis() {
  const { state, dispatch } = useAppState();
  const { isDemoMode, datasets } = state;
  const [currentData, setCurrentData] = useState<Transaction[]>(isDemoMode ? DEMO_TRANSACTIONS : []);
  const [analysis, setAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [query, setQuery] = useState('');
  const [dataLoaded, setDataLoaded] = useState(isDemoMode);
  const [fileInfo, setFileInfo] = useState<{ name: string; rows: number; cols: number } | null>(
    isDemoMode ? { name: 'transactions_nova_2026.xlsx', rows: DEMO_TRANSACTIONS.length, cols: 7 } : null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      let parsed;
      if (file.name.endsWith('.csv')) {
        const text = await readFileAsText(file);
        parsed = parseCSV(text, file.name);
      } else {
        parsed = await parseExcel(file);
      }

      const transactions = mapToTransactions(parsed.rows);
      setCurrentData(transactions);
      setDataLoaded(true);
      setFileInfo({ name: file.name, rows: parsed.rowCount, cols: parsed.columns.length });

      dispatch({
        type: 'ADD_DATASET',
        dataset: {
          id: `ds-${Date.now()}`,
          name: file.name,
          rows: transactions,
          columns: parsed.columns,
          uploadedAt: new Date(),
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const runAnalysis = (q: string) => {
    if (currentData.length === 0) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      const result = analyzeDataset(currentData, q);
      setAnalysis(result.text);
      setIsAnalyzing(false);
    }, 600);
  };

  const incomes = currentData.filter((t) => t.type === 'income');
  const expenses = currentData.filter((t) => t.type === 'expense');
  const totalIncome = sumAmounts(incomes);
  const totalExpense = sumAmounts(expenses);
  const topCategories = getTotalsByCategory(expenses).slice(0, 6);
  const topSuppliers = getTotalsBySupplier(expenses).slice(0, 6);
  const monthlyEvo = getMonthlyEvolution(currentData);

  const suggestions = [
    'Analyse générale',
    'Principales dépenses',
    'Principaux fournisseurs',
    'Évolution mensuelle',
    'Doublons',
    'Montants inhabituels',
    'Données manquantes',
    'Comparer deux périodes',
  ];

  const monthNames: Record<string, string> = {
    '01': 'Jan', '02': 'Fév', '03': 'Mar', '04': 'Avr', '05': 'Mai', '06': 'Jun',
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Analyse de données</h1>
          <p className="text-sm text-slate-500">Importez et analysez vos fichiers Excel ou CSV</p>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a3a5c] text-white text-sm font-medium hover:bg-[#1a3a5c]/90 transition-colors cursor-pointer"
        >
          <Upload size={16} />
          Importer un fichier
        </button>
        <input ref={fileInputRef} type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={handleFileUpload} />
      </div>

      {!dataLoaded ? (
        <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-xl">
          <BarChart3 size={40} className="mx-auto text-slate-300 mb-4" />
          <p className="text-sm text-slate-500 mb-2">Importez un fichier Excel ou CSV pour commencer</p>
          <p className="text-xs text-slate-400">Formats supportés : XLSX, XLS, CSV</p>
        </div>
      ) : (
        <>
          {/* File info */}
          {fileInfo && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <BarChart3 size={20} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">{fileInfo.name}</p>
                  <p className="text-xs text-slate-400">{fileInfo.rows} lignes × {fileInfo.cols} colonnes</p>
                </div>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 font-medium">Chargé</span>
            </div>
          )}

          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-500">Opérations</p>
              <p className="text-xl font-bold text-slate-900">{countTransactions(currentData)}</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-500">Revenus</p>
              <p className="text-xl font-bold text-emerald-600">{formatCurrency(totalIncome)}</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-500">Dépenses</p>
              <p className="text-xl font-bold text-red-600">{formatCurrency(totalExpense)}</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-500">Solde</p>
              <p className={`text-xl font-bold ${totalIncome - totalExpense >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {formatCurrency(totalIncome - totalExpense)}
              </p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Monthly evolution */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="text-sm font-semibold text-slate-700 mb-4">Évolution mensuelle</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyEvo.map((m) => ({
                    month: monthNames[m.month.split('-')[1]] || m.month,
                    revenus: m.income,
                    dépenses: m.expense,
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                    <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                    <Line type="monotone" dataKey="revenus" stroke="#059669" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="dépenses" stroke="#dc2626" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="text-sm font-semibold text-slate-700 mb-4">Dépenses par catégorie</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topCategories.map((c) => ({ name: c.category.substring(0, 12), total: c.total }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                    <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                    <Bar dataKey="total" fill="#1a3a5c" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Query section */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Que voulez-vous savoir ?</h3>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && runAnalysis(query)}
                placeholder="Posez une question sur vos données..."
                className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-[#1a3a5c] focus:ring-1 focus:ring-[#1a3a5c]/20"
              />
              <button
                onClick={() => runAnalysis(query)}
                disabled={!query.trim() || isAnalyzing}
                className="px-4 py-2 rounded-lg bg-[#1a3a5c] text-white text-sm font-medium hover:bg-[#1a3a5c]/90 disabled:opacity-50 cursor-pointer"
              >
                {isAnalyzing ? <Loader2 size={16} className="animate-spin" /> : 'Analyser'}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => { setQuery(s); runAnalysis(s); }}
                  className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Analysis result */}
          {analysis && (
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-slate-700">Résultat de l'analyse</h3>
                <button className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer flex items-center gap-1">
                  <Download size={12} /> Exporter
                </button>
              </div>
              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                {analysis.split('\n').map((line, i) => {
                  if (line.startsWith('## ')) return <h3 key={i} className="text-base font-bold mt-3 mb-1">{line.slice(3)}</h3>;
                  if (line.startsWith('### ')) return <h4 key={i} className="text-sm font-bold mt-2 mb-1">{line.slice(4)}</h4>;
                  if (line.startsWith('- ')) return <p key={i} className="ml-3 mb-0.5">• {line.slice(2)}</p>;
                  if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="font-bold">{line.slice(2, -2)}</p>;
                  if (line.trim() === '') return <br key={i} />;
                  // Handle inline bold
                  const parts = line.split(/\*\*(.*?)\*\*/g);
                  if (parts.length > 1) {
                    return (
                      <p key={i} className="mb-1">
                        {parts.map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : <span key={j}>{part}</span>)}
                      </p>
                    );
                  }
                  return <p key={i} className="mb-1">{line}</p>;
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
