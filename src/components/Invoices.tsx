// ============================================================
// KONTA — Module Factures
// ============================================================

import { useState } from 'react';
import { Upload, CheckCircle2, AlertTriangle, Eye, Check } from 'lucide-react';
import { useAppState } from '../store/AppContext';
import { DEMO_INVOICES } from '../data/demoData';
import { InvoiceExtraction } from '../types';

export default function Invoices() {
  const { state, dispatch } = useAppState();
  const { isDemoMode, invoices } = state;
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceExtraction | null>(null);

  const displayInvoices = isDemoMode ? DEMO_INVOICES : invoices;

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 0.85) return <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium">Élevée</span>;
    if (confidence >= 0.6) return <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-medium">Moyenne</span>;
    return <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-50 text-red-700 font-medium">À vérifier</span>;
  };

  const formatCurrency = (amount: number | null) => {
    if (amount === null) return 'Non détecté';
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Factures</h1>
          <p className="text-sm text-slate-500">Extraction et validation des informations</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a3a5c] text-white text-sm font-medium hover:bg-[#1a3a5c]/90 transition-colors cursor-pointer">
          <Upload size={16} />
          Importer des factures
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500">Total factures</p>
          <p className="text-2xl font-bold text-slate-900">{displayInvoices.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500">Montant total TTC</p>
          <p className="text-2xl font-bold text-slate-900">
            {formatCurrency(displayInvoices.reduce((a, i) => a + (i.total || 0), 0))}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500">Validées</p>
          <p className="text-2xl font-bold text-emerald-600">
            {displayInvoices.filter((i) => i.validated).length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500">À vérifier</p>
          <p className="text-2xl font-bold text-amber-600">
            {displayInvoices.filter((i) => i.warnings.length > 0 && !i.validated).length}
          </p>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left text-xs font-medium text-slate-500 uppercase px-4 py-3">Document</th>
              <th className="text-left text-xs font-medium text-slate-500 uppercase px-4 py-3">Fournisseur</th>
              <th className="text-left text-xs font-medium text-slate-500 uppercase px-4 py-3">N° facture</th>
              <th className="text-left text-xs font-medium text-slate-500 uppercase px-4 py-3">Date</th>
              <th className="text-right text-xs font-medium text-slate-500 uppercase px-4 py-3">HT</th>
              <th className="text-right text-xs font-medium text-slate-500 uppercase px-4 py-3">TTC</th>
              <th className="text-center text-xs font-medium text-slate-500 uppercase px-4 py-3">Confiance</th>
              <th className="text-center text-xs font-medium text-slate-500 uppercase px-4 py-3">Statut</th>
              <th className="text-center text-xs font-medium text-slate-500 uppercase px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayInvoices.map((inv) => (
              <tr key={inv.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-slate-700">{inv.documentName}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{inv.supplier || <span className="text-slate-400 italic">Non détecté</span>}</td>
                <td className="px-4 py-3 text-sm text-slate-600 font-mono">{inv.invoiceNumber || '—'}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{inv.invoiceDate || '—'}</td>
                <td className="px-4 py-3 text-sm text-slate-600 text-right font-mono">{formatCurrency(inv.subtotal)}</td>
                <td className="px-4 py-3 text-sm font-medium text-slate-900 text-right font-mono">{formatCurrency(inv.total)}</td>
                <td className="px-4 py-3 text-center">{getConfidenceBadge(inv.confidence)}</td>
                <td className="px-4 py-3 text-center">
                  {inv.validated ? (
                    <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium">
                      <CheckCircle2 size={10} /> Validée
                    </span>
                  ) : inv.warnings.length > 0 ? (
                    <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-medium">
                      <AlertTriangle size={10} /> À vérifier
                    </span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">En attente</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => setSelectedInvoice(inv)}
                    className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <Eye size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Validation Panel */}
      {selectedInvoice && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">Validation — {selectedInvoice.documentName}</h3>
            <button
              onClick={() => setSelectedInvoice(null)}
              className="text-sm text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              Fermer
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left: Document info */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-700">Informations extraites</h4>
              {[
                { label: 'Fournisseur', value: selectedInvoice.supplier },
                { label: 'Client', value: selectedInvoice.client },
                { label: 'N° facture', value: selectedInvoice.invoiceNumber },
                { label: 'Date', value: selectedInvoice.invoiceDate },
                { label: 'Échéance', value: selectedInvoice.dueDate },
                { label: 'Montant HT', value: selectedInvoice.subtotal !== null ? formatCurrency(selectedInvoice.subtotal) : null },
                { label: 'TVA', value: selectedInvoice.tax !== null ? formatCurrency(selectedInvoice.tax) : null },
                { label: 'Montant TTC', value: selectedInvoice.total !== null ? formatCurrency(selectedInvoice.total) : null },
              ].map((field, i) => (
                <div key={i} className="flex items-center gap-3">
                  <label className="text-xs text-slate-500 w-24 shrink-0">{field.label}</label>
                  <input
                    type="text"
                    defaultValue={field.value || ''}
                    placeholder="Non détecté"
                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-700 focus:border-[#1a3a5c] focus:ring-1 focus:ring-[#1a3a5c]/20 outline-none"
                  />
                </div>
              ))}
            </div>

            {/* Right: Warnings & Actions */}
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-3">Confiance & alertes</h4>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-slate-500">Niveau de confiance</span>
                  <span className="text-xs font-bold text-slate-700">{(selectedInvoice.confidence * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      selectedInvoice.confidence >= 0.85 ? 'bg-emerald-500' :
                      selectedInvoice.confidence >= 0.6 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${selectedInvoice.confidence * 100}%` }}
                  ></div>
                </div>
              </div>

              {selectedInvoice.warnings.length > 0 && (
                <div className="space-y-2 mb-4">
                  {selectedInvoice.warnings.map((w, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-amber-50 text-xs text-amber-700">
                      <AlertTriangle size={12} className="mt-0.5 shrink-0" />
                      {w}
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={() => {
                  dispatch({ type: 'UPDATE_INVOICE', id: selectedInvoice.id, updates: { validated: true, validatedAt: new Date() } });
                  setSelectedInvoice({ ...selectedInvoice, validated: true, validatedAt: new Date() });
                }}
                disabled={selectedInvoice.validated}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#1a3a5c] text-white text-sm font-medium hover:bg-[#1a3a5c]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <Check size={16} />
                {selectedInvoice.validated ? 'Validé' : 'Valider les informations'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
