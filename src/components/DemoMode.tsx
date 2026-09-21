// ============================================================
// KONTA — Mode Démo (scénarios de présentation)
// ============================================================

import { useState } from 'react';
import {
  Play, ArrowRight, Receipt, BarChart3, ShieldCheck, MessageSquare, Mail,
  FileText, CheckCircle2, AlertCircle, AlertTriangle, Info, Loader2, Sparkles, ChevronRight,
} from 'lucide-react';
import { useAppState } from '../store/AppContext';
import { DEMO_TRANSACTIONS, DEMO_INVOICES, DEMO_ANOMALIES, DEMO_CLIENT } from '../data/demoData';
import {
  sumAmounts, countTransactions, formatCurrency, getTotalsByCategory,
  getMonthlyEvolution, averageAmount,
} from '../utils/calculations';
import { analyzeDataset, analyzeAnomalies, generateEmail, generateClientSummary } from '../utils/kontaAI';

type DemoStep = 'menu' | 'scenario1' | 'scenario2' | 'scenario3' | 'scenario4' | 'scenario5' | 'full';
type FullStep = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export default function DemoMode() {
  const { dispatch } = useAppState();
  const [activeScenario, setActiveScenario] = useState<DemoStep>('menu');
  const [fullStep, setFullStep] = useState<FullStep>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([]);
  const [chatInput, setChatInput] = useState('');

  const scenarios = [
    {
      id: 'scenario1' as DemoStep,
      icon: <Receipt size={24} />,
      title: 'KONTA lit vos factures',
      desc: 'Analyser 5 factures et extraire les informations clés',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      id: 'scenario2' as DemoStep,
      icon: <BarChart3 size={24} />,
      title: 'KONTA comprend vos données',
      desc: 'Analyser un fichier Excel de 100+ transactions',
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      id: 'scenario3' as DemoStep,
      icon: <ShieldCheck size={24} />,
      title: 'KONTA attire votre attention',
      desc: 'Détecter doublons, montants inhabituels et données manquantes',
      color: 'bg-amber-50 text-amber-600',
    },
    {
      id: 'scenario4' as DemoStep,
      icon: <MessageSquare size={24} />,
      title: 'Interrogez votre dossier',
      desc: 'Poser des questions en langage naturel sur un dossier client',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      id: 'scenario5' as DemoStep,
      icon: <Mail size={24} />,
      title: 'De l\'analyse à l\'action',
      desc: 'Générer un email professionnel à partir d\'une analyse',
      color: 'bg-rose-50 text-rose-600',
    },
  ];

  const simulateLoading = (text: string, duration: number): Promise<void> => {
    return new Promise((resolve) => {
      setIsLoading(true);
      setLoadingText(text);
      setTimeout(() => {
        setIsLoading(false);
        setLoadingText('');
        resolve();
      }, duration);
    });
  };

  const runScenario1 = async () => {
    await simulateLoading('KONTA lit vos factures...', 1500);
    setActiveScenario('scenario1');
  };

  const runScenario2 = async () => {
    await simulateLoading('KONTA analyse vos données...', 1500);
    setActiveScenario('scenario2');
  };

  const runScenario3 = async () => {
    await simulateLoading('Recherche des éléments inhabituels...', 1500);
    setActiveScenario('scenario3');
  };

  const runScenario4 = async () => {
    await simulateLoading('Préparation de la synthèse...', 1200);
    setChatMessages([
      { role: 'assistant', content: 'Voici la synthèse du dossier **NOVA DISTRIBUTION SARL** :\n\n- **18 documents** dans le dossier\n- **107 transactions** analysées\n- **Revenus** : ' + formatCurrency(sumAmounts(DEMO_TRANSACTIONS.filter(t => t.type === 'income'))) + '\n- **Dépenses** : ' + formatCurrency(sumAmounts(DEMO_TRANSACTIONS.filter(t => t.type === 'expense'))) + '\n- **5 éléments** nécessitent votre attention\n\nQue souhaitez-vous savoir de plus ?' },
    ]);
    setActiveScenario('scenario4');
  };

  const runScenario5 = async () => {
    await simulateLoading('Préparation de l\'email...', 1000);
    setActiveScenario('scenario5');
  };

  const runFullDemo = async () => {
    setFullStep(0);
    setActiveScenario('full');
  };

  const advanceFullDemo = async (step: FullStep) => {
    const loadingTexts = [
      '',
      'KONTA lit vos documents...',
      'Extraction des informations...',
      'Analyse des données...',
      'Recherche des éléments inhabituels...',
      'Préparation des résultats...',
      '',
    ];
    if (loadingTexts[step]) {
      await simulateLoading(loadingTexts[step], 1200 + Math.random() * 800);
    }
    setFullStep(step);
  };

  const handleChatSend = (text?: string) => {
    const msg = text || chatInput.trim();
    if (!msg) return;
    setChatMessages((prev) => [...prev, { role: 'user', content: msg }]);
    setChatInput('');

    setTimeout(() => {
      const q = msg.toLowerCase();
      let response = '';

      if (q.includes('résum') || q.includes('situation')) {
        response = `## Situation actuelle\n\n**NOVA DISTRIBUTION SARL** — Dossier en cours de traitement.\n\n- **107 transactions** sur 6 mois (janvier à juin 2026)\n- **Revenus** : ${formatCurrency(sumAmounts(DEMO_TRANSACTIONS.filter(t => t.type === 'income')))}\n- **Dépenses** : ${formatCurrency(sumAmounts(DEMO_TRANSACTIONS.filter(t => t.type === 'expense')))}\n- **Solde positif** : ${formatCurrency(sumAmounts(DEMO_TRANSACTIONS.filter(t => t.type === 'income')) - sumAmounts(DEMO_TRANSACTIONS.filter(t => t.type === 'expense')))}\n\n5 éléments nécessitent votre attention, dont 1 montant exceptionnel de 3 450 000 FCFA.`;
      } else if (q.includes('attention') || q.includes('vérif')) {
        response = `## Éléments nécessitant votre attention\n\n🔴 **Montant inhabituel** — DEP-2001 : 3 450 000 FCFA en services informatiques (moyenne : 620 000 FCFA)\n\n🟡 **Doublon** — DEP-2002 : 175 000 FCFA enregistré deux fois le 12/03/2026\n\n🟡 **Date incohérente** — DEP-2003 : date du 30 février 2026 (inexistante)\n\n🔵 **Descriptions manquantes** — 3 opérations sans description\n\n🔵 **Écart catégorie** — Marketing en hausse de 45% en mai`;
      } else if (q.includes('3 450') || q.includes('expliqu')) {
        response = `## Opération de 3 450 000 FCFA\n\n**Référence** : DEP-2001\n**Date** : 18 avril 2026\n**Catégorie** : Services informatiques\n**Fournisseur** : BETA SERVICES SARL\n\nCette opération est **5,5 fois supérieure** à la moyenne des dépenses en services informatiques (620 000 FCFA).\n\n**Recommandation** : Vérifier qu'il s'agit bien d'une prestation exceptionnelle et non d'une erreur de saisie. Demander la facture détaillée correspondante.`;
      } else if (q.includes('rapport')) {
        response = `## Rapport pour le responsable du cabinet\n\n**Dossier** : NOVA DISTRIBUTION SARL\n**Période** : Janvier — Juin 2026\n**Date du rapport** : 15 juin 2026\n\n### Résumé exécutif\nLe dossier présente un solde positif de ${formatCurrency(sumAmounts(DEMO_TRANSACTIONS.filter(t => t.type === 'income')) - sumAmounts(DEMO_TRANSACTIONS.filter(t => t.type === 'expense')))}. Les revenus couvrent les dépenses.\n\n### Indicateurs clés\n- 107 transactions analysées\n- 5 factures traitées\n- 5 éléments à vérifier\n\n### Observations\n- Un montant exceptionnel de 3 450 000 FCFA nécessite vérification\n- Un doublon potentiel a été identifié\n- Une date incohérente (30 février) doit être corrigée\n\n### Recommandations\n1. Demander la facture détaillée pour l'opération de 3 450 000 FCFA\n2. Confirmer ou annuler la saisie en double\n3. Corriger la date de l'opération DEP-2003`;
      } else if (q.includes('mail') || q.includes('email')) {
        response = `## Email préparé\n\n**Objet** : Demande de pièces complémentaires — Dossier NOVA DISTRIBUTION\n\n---\n\nBonjour,\n\nDans le cadre du traitement de votre dossier comptable pour la période janvier-juin 2026, nous aurions besoin des éléments suivants :\n\n1. **Facture détaillée** pour l'opération de 3 450 000 FCFA du 18/04/2026 (BETA SERVICES SARL)\n2. **Confirmation** concernant la saisie en double du 12/03/2026 (175 000 FCFA — DIGITAL OFFICE)\n3. **Date correcte** pour l'opération DEP-2003 (date actuelle : 30/02/2026, invalide)\n\nMerci de nous transmettre ces éléments dans les meilleurs délais.\n\nCordialement,\nVotre cabinet comptable\n\n---\n\n*Vous pouvez copier et modifier ce message.*`;
      } else {
        response = 'Je suis prêt à analyser le dossier. Que souhaitez-vous savoir ?';
      }

      setChatMessages((prev) => [...prev, { role: 'assistant', content: response }]);
    }, 800);
  };

  // Loading overlay
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="w-16 h-16 rounded-2xl bg-[#1a3a5c]/10 flex items-center justify-center mb-4">
          <Loader2 size={28} className="text-[#1a3a5c] animate-spin" />
        </div>
        <p className="text-sm text-slate-600 font-medium">{loadingText}</p>
      </div>
    );
  }

  // Menu
  if (activeScenario === 'menu') {
    return (
      <div>
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium mb-4">
            <Sparkles size={12} />
            Données fictives — démonstration
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Mode Démo</h1>
          <p className="text-sm text-slate-500">Découvrez les capacités de KONTA à travers des scénarios réels</p>
        </div>

        {/* Full demo button */}
        <div className="bg-gradient-to-r from-[#1a3a5c] to-[#2a5a8c] rounded-xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold mb-1">Lancer la démo complète</h2>
              <p className="text-sm text-white/70">Une expérience guidée qui raconte l'histoire de KONTA</p>
            </div>
            <button
              onClick={runFullDemo}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-[#1a3a5c] text-sm font-bold hover:bg-white/90 transition-colors cursor-pointer"
            >
              <Play size={16} />
              Démarrer
            </button>
          </div>
        </div>

        {/* Scenarios */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                switch (s.id) {
                  case 'scenario1': runScenario1(); break;
                  case 'scenario2': runScenario2(); break;
                  case 'scenario3': runScenario3(); break;
                  case 'scenario4': runScenario4(); break;
                  case 'scenario5': runScenario5(); break;
                }
              }}
              className="flex flex-col items-start p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm transition-all text-left cursor-pointer group"
            >
              <div className={`p-3 rounded-xl ${s.color} mb-3`}>{s.icon}</div>
              <h3 className="text-sm font-bold text-slate-800 mb-1">{s.title}</h3>
              <p className="text-xs text-slate-500 mb-3">{s.desc}</p>
              <span className="text-xs font-medium text-[#1a3a5c] flex items-center gap-1 group-hover:gap-2 transition-all">
                Lancer <ArrowRight size={12} />
              </span>
            </button>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => dispatch({ type: 'TOGGLE_DEMO_MODE' })}
            className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            ← Retour au mode normal
          </button>
        </div>
      </div>
    );
  }

  // Full Demo
  if (activeScenario === 'full') {
    return <FullDemoView step={fullStep} advance={advanceFullDemo} chatMessages={chatMessages} setChatMessages={setChatMessages} chatInput={chatInput} setChatInput={setChatInput} onSend={handleChatSend} onBack={() => setActiveScenario('menu')} />;
  }

  // Scenario views
  if (activeScenario === 'scenario1') return <Scenario1View onBack={() => setActiveScenario('menu')} />;
  if (activeScenario === 'scenario2') return <Scenario2View onBack={() => setActiveScenario('menu')} />;
  if (activeScenario === 'scenario3') return <Scenario3View onBack={() => setActiveScenario('menu')} />;
  if (activeScenario === 'scenario4') return <Scenario4View chatMessages={chatMessages} chatInput={chatInput} setChatInput={setChatInput} onSend={handleChatSend} onBack={() => setActiveScenario('menu')} />;
  if (activeScenario === 'scenario5') return <Scenario5View onBack={() => setActiveScenario('menu')} />;

  return null;
}

// ============================================================
// Full Demo View
// ============================================================
function FullDemoView({ step, advance, chatMessages, setChatMessages, chatInput, setChatInput, onSend, onBack }: {
  step: FullStep;
  advance: (step: FullStep) => void;
  chatMessages: { role: string; content: string }[];
  setChatMessages: React.Dispatch<React.SetStateAction<{ role: string; content: string }[]>>;
  chatInput: string;
  setChatInput: (v: string) => void;
  onSend: (text?: string) => void;
  onBack: () => void;
}) {
  const steps = [
    { title: 'Nouveau dossier reçu', icon: <FileText size={20} /> },
    { title: 'Lecture des documents', icon: <Loader2 size={20} /> },
    { title: 'Extraction', icon: <Receipt size={20} /> },
    { title: 'Analyse', icon: <BarChart3 size={20} /> },
    { title: 'Contrôle', icon: <ShieldCheck size={20} /> },
    { title: 'Résultats', icon: <CheckCircle2 size={20} /> },
    { title: 'Demandez à KONTA', icon: <MessageSquare size={20} /> },
  ];

  return (
    <div>
      <button onClick={onBack} className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer mb-4">
        ← Retour au menu démo
      </button>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              i <= step ? 'bg-[#1a3a5c] text-white' : 'bg-slate-100 text-slate-400'
            }`}>
              {i < step ? '✓' : i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 ${i < step ? 'bg-[#1a3a5c]' : 'bg-slate-100'}`}></div>
            )}
          </div>
        ))}
      </div>

      {/* Step 0: New dossier */}
      {step === 0 && (
        <div className="text-center py-8">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Nouveau dossier reçu</h2>
          <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-md mx-auto mb-6">
            <h3 className="font-bold text-slate-800 mb-3">{DEMO_CLIENT.company}</h3>
            <div className="space-y-2 text-sm text-slate-600">
              <p>📄 5 factures</p>
              <p>📊 1 fichier Excel (107 transactions)</p>
              <p>🏦 1 relevé bancaire</p>
            </div>
          </div>
          <button onClick={() => advance(1)} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1a3a5c] text-white text-sm font-medium hover:bg-[#1a3a5c]/90 cursor-pointer mx-auto">
            Analyser avec KONTA <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Steps 1-4: Loading states */}
      {step >= 1 && step <= 4 && (
        <div className="text-center py-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">{steps[step].title}</h2>
          <div className="max-w-md mx-auto">
            <div className="space-y-3">
              {step >= 1 && <p className="text-sm text-slate-600 flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Lecture des documents terminée</p>}
              {step >= 2 && <p className="text-sm text-slate-600 flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Extraction des informations terminée</p>}
              {step >= 3 && <p className="text-sm text-slate-600 flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Analyse des données terminée</p>}
              {step >= 4 && <p className="text-sm text-slate-600 flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Contrôle intelligent terminé</p>}
              {step < 5 && <p className="text-sm text-slate-400 flex items-center gap-2"><Loader2 size={14} className="animate-spin" /> {steps[step].title}...</p>}
            </div>
          </div>
          {step < 5 && (
            <button onClick={() => advance((step + 1) as FullStep)} className="mt-6 text-xs text-[#1a3a5c] hover:underline cursor-pointer">
              Passer à l'étape suivante →
            </button>
          )}
        </div>
      )}

      {/* Step 5: Results */}
      {step === 5 && (
        <div className="py-4">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Résultats</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-500">Documents analysés</p>
              <p className="text-2xl font-bold text-slate-900">7</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-500">Transactions</p>
              <p className="text-2xl font-bold text-slate-900">{DEMO_TRANSACTIONS.length}</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-500">Montant total</p>
              <p className="text-lg font-bold text-slate-900">{formatCurrency(sumAmounts(DEMO_TRANSACTIONS))}</p>
            </div>
            <div className="bg-white rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-xs text-amber-700">Éléments à vérifier</p>
              <p className="text-2xl font-bold text-amber-700">{DEMO_ANOMALIES.length}</p>
            </div>
          </div>
          <button onClick={() => advance(6)} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1a3a5c] text-white text-sm font-medium hover:bg-[#1a3a5c]/90 cursor-pointer">
            Demandez à KONTA <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Step 6: Interactive chat */}
      {step === 6 && (
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">Demandez à KONTA</h2>
          <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 min-h-[200px] max-h-[400px] overflow-y-auto">
            {chatMessages.length === 0 && (
              <div className="text-center py-8">
                <p className="text-sm text-slate-500 mb-3">Essayez ces questions :</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['Résume-moi la situation.', 'Qu\'est-ce qui nécessite mon attention ?', 'Explique-moi l\'opération de 3 450 000 FCFA.', 'Prépare un rapport pour le responsable.', 'Rédige le mail à envoyer au client.'].map((q, i) => (
                    <button key={i} onClick={() => onSend(q)} className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 hover:bg-slate-100 cursor-pointer">
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {chatMessages.map((msg, i) => (
              <div key={i} className={`mb-3 ${msg.role === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block max-w-[80%] rounded-xl px-4 py-2.5 text-sm text-left ${
                  msg.role === 'user' ? 'bg-[#1a3a5c] text-white' : 'bg-slate-50 text-slate-700 border border-slate-200'
                }`}>
                  <div className="whitespace-pre-wrap">{msg.content.split('\n').map((line, j) => {
                    if (line.startsWith('## ')) return <h3 key={j} className="font-bold text-base mb-1">{line.slice(3)}</h3>;
                    if (line.startsWith('🔴') || line.startsWith('🟡') || line.startsWith('🔵')) return <p key={j} className="mb-1">{line}</p>;
                    if (line.startsWith('- ')) return <p key={j} className="ml-2">• {line.slice(2)}</p>;
                    const boldParts = line.split(/\*\*(.*?)\*\*/g);
                    if (boldParts.length > 1) return <p key={j}>{boldParts.map((p, k) => k % 2 === 1 ? <strong key={k}>{p}</strong> : <span key={k}>{p}</span>)}</p>;
                    if (line.trim() === '') return <br key={j} />;
                    return <p key={j}>{line}</p>;
                  })}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSend()}
              placeholder="Posez une question à KONTA..."
              className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 text-sm outline-none focus:border-[#1a3a5c]"
            />
            <button onClick={() => onSend()} className="px-4 py-2.5 rounded-lg bg-[#1a3a5c] text-white text-sm font-medium cursor-pointer">
              Envoyer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// Scenario Views
// ============================================================
function Scenario1View({ onBack }: { onBack: () => void }) {
  const totalTTC = DEMO_INVOICES.reduce((a, i) => a + (i.total || 0), 0);
  return (
    <div>
      <button onClick={onBack} className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer mb-4">← Retour</button>
      <h2 className="text-xl font-bold text-slate-900 mb-1">KONTA lit vos factures</h2>
      <p className="text-sm text-slate-500 mb-6">5 factures analysées — extraction automatique</p>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-xs text-slate-500">Total TTC</p><p className="text-xl font-bold">{formatCurrency(totalTTC)}</p></div>
        <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-xs text-slate-500">Validées</p><p className="text-xl font-bold text-emerald-600">{DEMO_INVOICES.filter(i => i.validated).length}/5</p></div>
        <div className="bg-white rounded-xl border border-amber-200 bg-amber-50 p-4"><p className="text-xs text-amber-700">À vérifier</p><p className="text-xl font-bold text-amber-700">{DEMO_INVOICES.filter(i => i.warnings.length > 0 && !i.validated).length}</p></div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-slate-100"><th className="text-left px-4 py-2 text-xs text-slate-500">Document</th><th className="text-left px-4 py-2 text-xs text-slate-500">Fournisseur</th><th className="text-right px-4 py-2 text-xs text-slate-500">TTC</th><th className="text-center px-4 py-2 text-xs text-slate-500">Confiance</th></tr></thead>
          <tbody>
            {DEMO_INVOICES.map((inv) => (
              <tr key={inv.id} className="border-b border-slate-50">
                <td className="px-4 py-2.5 font-medium">{inv.documentName}</td>
                <td className="px-4 py-2.5 text-slate-600">{inv.supplier || <span className="italic text-slate-400">Non détecté</span>}</td>
                <td className="px-4 py-2.5 text-right font-mono">{inv.total ? formatCurrency(inv.total) : '—'}</td>
                <td className="px-4 py-2.5 text-center"><span className={`text-xs px-2 py-0.5 rounded-full ${inv.confidence >= 0.85 ? 'bg-emerald-50 text-emerald-700' : inv.confidence >= 0.6 ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'}`}>{(inv.confidence * 100).toFixed(0)}%</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Scenario2View({ onBack }: { onBack: () => void }) {
  const incomes = DEMO_TRANSACTIONS.filter(t => t.type === 'income');
  const expenses = DEMO_TRANSACTIONS.filter(t => t.type === 'expense');
  const topCats = getTotalsByCategory(expenses).slice(0, 5);
  return (
    <div>
      <button onClick={onBack} className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer mb-4">← Retour</button>
      <h2 className="text-xl font-bold text-slate-900 mb-1">KONTA comprend vos données</h2>
      <p className="text-sm text-slate-500 mb-6">transactions_nova_2026.xlsx — {DEMO_TRANSACTIONS.length} transactions</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-xs text-slate-500">Revenus</p><p className="text-lg font-bold text-emerald-600">{formatCurrency(sumAmounts(incomes))}</p></div>
        <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-xs text-slate-500">Dépenses</p><p className="text-lg font-bold text-red-600">{formatCurrency(sumAmounts(expenses))}</p></div>
        <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-xs text-slate-500">Solde</p><p className="text-lg font-bold">{formatCurrency(sumAmounts(incomes) - sumAmounts(expenses))}</p></div>
        <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-xs text-slate-500">Moyenne/dépense</p><p className="text-lg font-bold">{formatCurrency(averageAmount(expenses))}</p></div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Principales catégories de dépenses</h3>
        {topCats.map((c, i) => {
          const max = topCats[0].total;
          return (
            <div key={i} className="flex items-center gap-3 mb-2">
              <span className="text-xs text-slate-500 w-32 truncate">{c.category}</span>
              <div className="flex-1 h-5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#1a3a5c]/70 rounded-full" style={{ width: `${(c.total / max) * 100}%` }}></div>
              </div>
              <span className="text-xs text-slate-600 font-mono w-28 text-right">{formatCurrency(c.total)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Scenario3View({ onBack }: { onBack: () => void }) {
  return (
    <div>
      <button onClick={onBack} className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer mb-4">← Retour</button>
      <h2 className="text-xl font-bold text-slate-900 mb-1">KONTA attire votre attention</h2>
      <p className="text-sm text-slate-500 mb-6">{DEMO_ANOMALIES.length} éléments détectés</p>
      <div className="space-y-3">
        {DEMO_ANOMALIES.map((a) => (
          <div key={a.id} className={`p-4 rounded-xl border ${a.level === 'high' ? 'border-red-200 bg-red-50' : a.level === 'moderate' ? 'border-amber-200 bg-amber-50' : 'border-blue-200 bg-blue-50'}`}>
            <div className="flex items-center gap-2 mb-1">
              {a.level === 'high' ? <AlertCircle size={16} className="text-red-500" /> : a.level === 'moderate' ? <AlertTriangle size={16} className="text-amber-500" /> : <Info size={16} className="text-blue-500" />}
              <span className="text-sm font-medium text-slate-800">{a.description}</span>
            </div>
            <p className="text-xs text-slate-600 ml-6">{a.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Scenario4View({ chatMessages, chatInput, setChatInput, onSend, onBack }: {
  chatMessages: { role: string; content: string }[];
  chatInput: string;
  setChatInput: (v: string) => void;
  onSend: (text?: string) => void;
  onBack: () => void;
}) {
  return (
    <div>
      <button onClick={onBack} className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer mb-4">← Retour</button>
      <h2 className="text-xl font-bold text-slate-900 mb-1">Interrogez votre dossier</h2>
      <p className="text-sm text-slate-500 mb-6">NOVA DISTRIBUTION SARL — Posez vos questions</p>
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 min-h-[200px] max-h-[350px] overflow-y-auto">
        {chatMessages.map((msg, i) => (
          <div key={i} className={`mb-3 ${msg.role === 'user' ? 'text-right' : ''}`}>
            <div className={`inline-block max-w-[80%] rounded-xl px-4 py-2.5 text-sm ${msg.role === 'user' ? 'bg-[#1a3a5c] text-white' : 'bg-slate-50 text-slate-700 border border-slate-200'}`}>
              <div className="whitespace-pre-wrap">{msg.content.split('\n').map((line, j) => {
                if (line.startsWith('## ')) return <h3 key={j} className="font-bold mb-1">{line.slice(3)}</h3>;
                if (line.startsWith('- ')) return <p key={j} className="ml-2">• {line.slice(2)}</p>;
                const boldParts = line.split(/\*\*(.*?)\*\*/g);
                if (boldParts.length > 1) return <p key={j}>{boldParts.map((p, k) => k % 2 === 1 ? <strong key={k}>{p}</strong> : <span key={k}>{p}</span>)}</p>;
                if (line.trim() === '') return <br key={j} />;
                return <p key={j}>{line}</p>;
              })}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && onSend()} placeholder="Posez une question..." className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 text-sm outline-none focus:border-[#1a3a5c]" />
        <button onClick={() => onSend()} className="px-4 py-2.5 rounded-lg bg-[#1a3a5c] text-white text-sm font-medium cursor-pointer">Envoyer</button>
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {['Quels éléments nécessitent mon attention ?', 'Résume-moi la situation.'].map((q, i) => (
          <button key={i} onClick={() => onSend(q)} className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 hover:bg-slate-100 cursor-pointer">{q}</button>
        ))}
      </div>
    </div>
  );
}

function Scenario5View({ onBack }: { onBack: () => void }) {
  const email = generateEmail('demande de pièces', '1. Facture détaillée pour DEP-2001 (3 450 000 FCFA)\n2. Confirmation du doublon DEP-2002\n3. Date correcte pour DEP-2003');
  return (
    <div>
      <button onClick={onBack} className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer mb-4">← Retour</button>
      <h2 className="text-xl font-bold text-slate-900 mb-1">De l'analyse à l'action</h2>
      <p className="text-sm text-slate-500 mb-6">Email généré automatiquement à partir de l'analyse</p>
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="mb-4 pb-4 border-b border-slate-100">
          <p className="text-xs text-slate-500 mb-1">Objet</p>
          <p className="text-sm font-medium text-slate-800">{(email.structured?.data as any)?.subject}</p>
        </div>
        <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
          {(email.structured?.data as any)?.body}
        </div>
        <div className="flex gap-2 mt-6 pt-4 border-t border-slate-100">
          <button className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 cursor-pointer">📋 Copier</button>
          <button className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 cursor-pointer">✏️ Modifier</button>
        </div>
      </div>
    </div>
  );
}
