// ============================================================
// KONTA — Assistant conversationnel
// ============================================================

import { useState, useRef, useEffect } from 'react';
import { Send, Upload, Paperclip, FileText, Loader2, Sparkles } from 'lucide-react';
import { useAppState } from '../store/AppContext';
import { Message, KontaFile, Conversation } from '../types';
import { analyzeDataset, analyzeInvoiceQuery, analyzeAnomalies, generateEmail, generateClientSummary } from '../utils/kontaAI';
import { detectAnomalies } from '../utils/anomalyDetection';
import { DEMO_TRANSACTIONS } from '../data/demoData';

export default function Assistant() {
  const { state, dispatch } = useAppState();
  const { isDemoMode, currentConversation, datasets, invoices, anomalies, clients } = state;
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize conversation
  useEffect(() => {
    if (!currentConversation) {
      const newConv: Conversation = {
        id: `conv-${Date.now()}`,
        title: 'Nouvelle conversation',
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      dispatch({ type: 'SET_CURRENT_CONVERSATION', conversation: newConv });
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConversation?.messages]);

  const getActiveTransactions = () => {
    if (isDemoMode) return DEMO_TRANSACTIONS;
    if (datasets.length > 0) return datasets[datasets.length - 1].rows;
    return [];
  };

  const handleSend = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };
    dispatch({ type: 'ADD_MESSAGE', message: userMsg });
    setInput('');
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      const response = generateResponse(messageText);
      const assistantMsg: Message = {
        id: `msg-${Date.now()}-resp`,
        role: 'assistant',
        content: response.text,
        structuredData: response.structured,
        timestamp: new Date(),
      };
      dispatch({ type: 'ADD_MESSAGE', message: assistantMsg });
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const generateResponse = (query: string) => {
    const q = query.toLowerCase();
    const transactions = getActiveTransactions();

    // Email generation
    if (q.includes('email') || q.includes('mail') || q.includes('rédige') || q.includes('prépare un')) {
      const type = q.includes('relance') ? 'relance' : q.includes('pièce') ? 'demande de pièces' : 'compte rendu';
      return generateEmail(type, query);
    }

    // Client summary
    if (q.includes('synth') && (q.includes('dossier') || q.includes('client'))) {
      const clientName = isDemoMode ? 'NOVA DISTRIBUTION SARL' : 'Client';
      return generateClientSummary(clientName, transactions, anomalies, invoices.length);
    }

    // Anomaly analysis
    if (q.includes('anomalie') || q.includes('attention') || q.includes('vérif') || q.includes('inhabituel') || q.includes('contrôle')) {
      if (isDemoMode) return analyzeAnomalies(anomalies);
      return analyzeAnomalies(detectAnomalies(transactions));
    }

    // Invoice analysis
    if (q.includes('facture') && transactions.length === 0) {
      return analyzeInvoiceQuery(invoices, query);
    }

    // Dataset analysis
    if (transactions.length > 0) {
      return analyzeDataset(transactions, query);
    }

    // Default response
    return {
      text: `Je suis prêt à vous aider. Vous pouvez :\n\n- **Téléverser des documents** (PDF, Excel, images)\n- **Importer des données** (XLSX, CSV)\n- **Me poser une question** sur vos documents\n\nQue souhaitez-vous faire ?`,
    };
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const kontFiles: KontaFile[] = files.map((f) => ({
      id: `file-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: f.name,
      type: f.name.split('.').pop()?.toLowerCase() as KontaFile['type'],
      size: f.size,
      status: 'pending',
      uploadedAt: new Date(),
    }));
    kontFiles.forEach((f) => dispatch({ type: 'ADD_FILE', file: f }));
  };

  const messages = currentConversation?.messages || [];

  const suggestions = [
    'Résume-moi la situation.',
    'Qu\'est-ce qui nécessite mon attention ?',
    'Analyse les dépenses par catégorie',
    'Détecte les doublons',
    'Prépare un rapport',
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)]">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-slate-900">Assistant KONTA</h1>
        <p className="text-sm text-slate-500">Votre espace de travail intelligent.</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="w-12 h-12 rounded-xl bg-[#1a3a5c]/10 flex items-center justify-center mx-auto mb-4">
              <Sparkles size={24} className="text-[#1a3a5c]" />
            </div>
            <p className="text-sm text-slate-500 mb-4">Posez une question ou téléversez des documents pour commencer.</p>
            <div className="flex flex-wrap gap-2 justify-center max-w-lg mx-auto">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(s)}
                  className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] rounded-xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-[#1a3a5c] text-white'
                  : 'bg-white border border-slate-200 text-slate-800'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-5 h-5 rounded bg-[#1a3a5c] flex items-center justify-center">
                    <span className="text-white text-[8px] font-bold">K</span>
                  </div>
                  <span className="text-xs font-medium text-slate-500">KONTA</span>
                </div>
              )}
              <div className="text-sm leading-relaxed whitespace-pre-wrap">
                <MarkdownLite text={msg.content} />
              </div>
              {/* Structured data */}
              {msg.structuredData && <StructuredData data={msg.structuredData} />}
              {/* Attached files */}
              {msg.files && msg.files.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {msg.files.map((f) => (
                    <span key={f.id} className="flex items-center gap-1 px-2 py-1 rounded bg-white/10 text-xs">
                      <Paperclip size={10} />
                      {f.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-xl px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Loader2 size={14} className="animate-spin" />
                <span>Konta analyse...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-slate-200 pt-4">
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2.5 focus-within:border-[#1a3a5c]/50 focus-within:ring-1 focus-within:ring-[#1a3a5c]/20">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-1.5 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <Upload size={18} />
          </button>
          <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileUpload} />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Demandez quelque chose à Konta..."
            className="flex-1 text-sm text-slate-900 placeholder:text-slate-400 outline-none bg-transparent"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="p-1.5 rounded-lg bg-[#1a3a5c] text-white hover:bg-[#1a3a5c]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function MarkdownLite({ text }: { text: string }) {
  // Simple markdown rendering
  const lines = text.split('\n');
  return (
    <>
      {lines.map((line, i) => {
        // Headers
        if (line.startsWith('## ')) return <h3 key={i} className="text-base font-bold mt-3 mb-1">{line.slice(3)}</h3>;
        if (line.startsWith('### ')) return <h4 key={i} className="text-sm font-bold mt-2 mb-1">{line.slice(4)}</h4>;
        // Bold
        const boldParts = line.split(/\*\*(.*?)\*\*/g);
        if (boldParts.length > 1) {
          return (
            <p key={i} className="mb-1">
              {boldParts.map((part, j) =>
                j % 2 === 1 ? <strong key={j}>{part}</strong> : <span key={j}>{part}</span>
              )}
            </p>
          );
        }
        // List items
        if (line.startsWith('- ')) return <p key={i} className="ml-3 mb-0.5">• {line.slice(2)}</p>;
        // Table separator
        if (line.startsWith('|---')) return null;
        // Table rows
        if (line.startsWith('|')) {
          const cells = line.split('|').filter(Boolean).map((c) => c.trim());
          return (
            <div key={i} className="flex gap-4 py-1 text-xs border-b border-slate-100">
              {cells.map((cell, j) => <span key={j} className="flex-1">{cell}</span>)}
            </div>
          );
        }
        // Separator
        if (line === '---') return <hr key={i} className="my-2 border-slate-200" />;
        // Empty line
        if (line.trim() === '') return <br key={i} />;
        // Normal text
        return <p key={i} className="mb-1">{line}</p>;
      })}
    </>
  );
}

function StructuredData({ data }: { data: NonNullable<Message['structuredData']> }) {
  if (data.type === 'kpi' && data.kpis) {
    return (
      <div className="grid grid-cols-2 gap-2 mt-3">
        {data.kpis.map((kpi, i) => (
          <div key={i} className="bg-slate-50 rounded-lg p-2.5">
            <p className="text-[10px] text-slate-500 uppercase tracking-wide">{kpi.label}</p>
            <p className="text-sm font-bold text-slate-900">{kpi.value}</p>
          </div>
        ))}
      </div>
    );
  }

  if (data.type === 'alert' && data.alerts) {
    return (
      <div className="mt-3 space-y-1.5">
        {data.alerts.map((alert, i) => (
          <div
            key={i}
            className={`flex items-start gap-2 p-2 rounded-lg text-xs ${
              alert.level === 'error' ? 'bg-red-50 text-red-700' :
              alert.level === 'warning' ? 'bg-amber-50 text-amber-700' :
              'bg-blue-50 text-blue-700'
            }`}
          >
            <span className="mt-0.5">
              {alert.level === 'error' ? '🔴' : alert.level === 'warning' ? '🟡' : '🔵'}
            </span>
            {alert.message}
          </div>
        ))}
      </div>
    );
  }

  if (data.type === 'chart' && data.chartData) {
    return (
      <div className="mt-3">
        <div className="space-y-1.5">
          {data.chartData.slice(0, 6).map((item, i) => {
            const max = Math.max(...data.chartData!.map((d) => d.value));
            const pct = (item.value / max) * 100;
            return (
              <div key={i} className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500 w-24 truncate">{item.label}</span>
                <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#1a3a5c]/70 rounded-full" style={{ width: `${pct}%` }}></div>
                </div>
                <span className="text-[10px] text-slate-600 font-mono w-20 text-right">
                  {new Intl.NumberFormat('fr-FR').format(item.value)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (data.type === 'email' && data.data) {
    return (
      <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
        <div className="flex items-center gap-2 mb-2">
          <button className="px-2 py-1 text-xs bg-white border border-slate-200 rounded hover:bg-slate-50 cursor-pointer">
            📋 Copier
          </button>
          <button className="px-2 py-1 text-xs bg-white border border-slate-200 rounded hover:bg-slate-50 cursor-pointer">
            ✏️ Modifier
          </button>
        </div>
      </div>
    );
  }

  return null;
}
