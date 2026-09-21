// ============================================================
// KONTA — Pages secondaires (Clients, Rapports, Historique, Paramètres)
// ============================================================

import { useAppState } from '../store/AppContext';
import { DEMO_CLIENT, DEMO_TRANSACTIONS, DEMO_ANOMALIES } from '../data/demoData';
import { formatCurrency, sumAmounts, countTransactions } from '../utils/calculations';
import { Users, FileBarChart, History, Settings, Shield, Database, Trash2 } from 'lucide-react';

// ============================================================
// Clients
// ============================================================
export function Clients() {
  const { state } = useAppState();
  const { isDemoMode } = state;
  const client = isDemoMode ? DEMO_CLIENT : null;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Clients</h1>
        <p className="text-sm text-slate-500">Gestion des dossiers clients</p>
      </div>

      {isDemoMode && client ? (
        <div>
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">{client.company}</h2>
                <p className="text-sm text-slate-500">{client.sector}</p>
                <div className="flex gap-4 mt-3 text-xs text-slate-500">
                  <span>✉️ {client.email}</span>
                  <span>📞 {client.phone}</span>
                </div>
              </div>
              <span className="text-[10px] px-2 py-1 rounded-full bg-amber-50 text-amber-700 font-medium">Données fictives</span>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-500">Documents</p>
              <p className="text-2xl font-bold text-slate-900">7</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-500">Analyses</p>
              <p className="text-2xl font-bold text-slate-900">3</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-500">Rapports</p>
              <p className="text-2xl font-bold text-slate-900">2</p>
            </div>
            <div className="bg-white rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-xs text-amber-700">À vérifier</p>
              <p className="text-2xl font-bold text-amber-700">{DEMO_ANOMALIES.filter(a => a.status === 'pending').length}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Checklist documentaire</h3>
            <div className="space-y-2">
              {[
                { name: 'Factures fournisseurs', status: 'present' },
                { name: 'Relevé bancaire', status: 'present' },
                { name: 'Fichier transactions', status: 'present' },
                { name: 'Grand livre', status: 'missing' },
                { name: 'Balance', status: 'missing' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-1.5">
                  <span className={item.status === 'present' ? 'text-emerald-500' : 'text-amber-500'}>
                    {item.status === 'present' ? '✓' : '⚠'}
                  </span>
                  <span className={`text-sm ${item.status === 'present' ? 'text-slate-700' : 'text-amber-700 font-medium'}`}>
                    {item.name}
                  </span>
                  {item.status === 'missing' && <span className="text-xs text-amber-600 ml-auto">Non fourni</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
          <Users size={40} className="mx-auto text-slate-300 mb-3" />
          <p className="text-sm text-slate-500">Aucun client enregistré.</p>
          <p className="text-xs text-slate-400 mt-1">Activez le mode démo pour voir un exemple.</p>
        </div>
      )}
    </div>
  );
}

// ============================================================
// Rapports
// ============================================================
export function Reports() {
  const { state } = useAppState();
  const { isDemoMode } = state;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Rapports</h1>
          <p className="text-sm text-slate-500">Rapports générés avec Konta</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a3a5c] text-white text-sm font-medium hover:bg-[#1a3a5c]/90 cursor-pointer">
          <FileBarChart size={16} />
          Générer un rapport
        </button>
      </div>

      {isDemoMode ? (
        <div className="space-y-4">
          {[
            { title: 'Synthèse dossier NOVA DISTRIBUTION', date: '10 juin 2026', client: 'NOVA DISTRIBUTION SARL' },
            { title: 'Analyse des dépenses — T1 2026', date: '5 juin 2026', client: 'NOVA DISTRIBUTION SARL' },
          ].map((report, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-slate-800">{report.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{report.client} — {report.date}</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 hover:bg-slate-100 cursor-pointer">Voir</button>
                <button className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 hover:bg-slate-100 cursor-pointer">PDF</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
          <FileBarChart size={40} className="mx-auto text-slate-300 mb-3" />
          <p className="text-sm text-slate-500">Aucun rapport généré.</p>
          <p className="text-xs text-slate-400 mt-1">Lancez une analyse puis générez un rapport.</p>
        </div>
      )}
    </div>
  );
}

// ============================================================
// Historique
// ============================================================
export function HistoryPage() {
  const { state } = useAppState();
  const { isDemoMode } = state;

  const demoHistory = [
    { date: '10 juin 2026', user: 'Comptable Démo', client: 'NOVA DISTRIBUTION', action: 'Analyse complète', document: '7 documents' },
    { date: '8 juin 2026', user: 'Comptable Démo', client: 'NOVA DISTRIBUTION', action: 'Extraction factures', document: '5 factures' },
    { date: '5 juin 2026', user: 'Comptable Démo', client: 'NOVA DISTRIBUTION', action: 'Contrôle intelligent', document: 'transactions.xlsx' },
    { date: '1 juin 2026', user: 'Comptable Démo', client: 'NOVA DISTRIBUTION', action: 'Import données', document: 'transactions_nova_2026.xlsx' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Historique</h1>
        <p className="text-sm text-slate-500">Journal des analyses et actions</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left text-xs font-medium text-slate-500 uppercase px-4 py-3">Date</th>
              <th className="text-left text-xs font-medium text-slate-500 uppercase px-4 py-3">Utilisateur</th>
              <th className="text-left text-xs font-medium text-slate-500 uppercase px-4 py-3">Client</th>
              <th className="text-left text-xs font-medium text-slate-500 uppercase px-4 py-3">Action</th>
              <th className="text-left text-xs font-medium text-slate-500 uppercase px-4 py-3">Document</th>
            </tr>
          </thead>
          <tbody>
            {(isDemoMode ? demoHistory : []).map((item, i) => (
              <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50">
                <td className="px-4 py-3 text-sm text-slate-600">{item.date}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{item.user}</td>
                <td className="px-4 py-3 text-sm font-medium text-slate-700">{item.client}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{item.action}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{item.document}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!isDemoMode && (
          <div className="text-center py-8 text-sm text-slate-400">
            Aucun historique. Activez le mode démo pour voir des exemples.
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// Paramètres
// ============================================================
export function SettingsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Paramètres</h1>
        <p className="text-sm text-slate-500">Configuration de KONTA</p>
      </div>

      <div className="space-y-6">
        {/* General */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <Settings size={16} />
            Général
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-700">Nom du cabinet</p>
                <p className="text-xs text-slate-400">Affiché dans les rapports</p>
              </div>
              <input type="text" defaultValue="Cabinet Démo" className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm w-48 outline-none focus:border-[#1a3a5c]" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-700">Devise par défaut</p>
                <p className="text-xs text-slate-400">Utilisée dans les rapports</p>
              </div>
              <select className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm outline-none">
                <option>FCFA</option>
                <option>EUR</option>
                <option>USD</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <Database size={16} />
            Gestion des données
          </h3>
          <div className="space-y-3">
            <p className="text-xs text-slate-500">Supprimez les données que vous ne souhaitez plus conserver.</p>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 hover:bg-slate-100 cursor-pointer">
                Supprimer un document
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 hover:bg-slate-100 cursor-pointer">
                Supprimer une conversation
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600 hover:bg-red-100 cursor-pointer">
                Supprimer un dossier client
              </button>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <Shield size={16} />
            Sécurité & Confidentialité
          </h3>
          <div className="space-y-3 text-sm text-slate-600">
            <p>• Les documents sont stockés de manière chiffrée</p>
            <p>• Les données sont isolées par organisation (RLS)</p>
            <p>• L'API OpenAI est utilisée uniquement côté serveur</p>
            <p>• Aucune donnée comptable n'est rendue publique</p>
          </div>
        </div>

        {/* Confidentiality notice */}
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500">
            Assurez-vous que vous êtes autorisé à traiter les documents téléversés.
            Les décisions professionnelles restent sous votre responsabilité.
          </p>
        </div>
      </div>
    </div>
  );
}
