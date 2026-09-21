// ============================================================
// KONTA — Module Contrôle intelligent
// ============================================================

import { useState } from 'react';
import { ShieldCheck, AlertTriangle, AlertCircle, Info, CheckCircle2, XCircle, Eye } from 'lucide-react';
import { useAppState } from '../store/AppContext';
import { Anomaly } from '../types';
import { detectAnomalies } from '../utils/anomalyDetection';
import { DEMO_TRANSACTIONS, DEMO_ANOMALIES } from '../data/demoData';

export default function Control() {
  const { state, dispatch } = useAppState();
  const { isDemoMode, anomalies, datasets } = state;
  const [selectedAnomaly, setSelectedAnomaly] = useState<Anomaly | null>(null);

  const displayAnomalies = isDemoMode
    ? anomalies.length > 0 ? anomalies : DEMO_ANOMALIES
    : anomalies.length > 0 ? anomalies : (datasets.length > 0 ? detectAnomalies(datasets[datasets.length - 1].rows) : []);

  const pendingCount = displayAnomalies.filter((a) => a.status === 'pending').length;
  const highCount = displayAnomalies.filter((a) => a.level === 'high' && a.status === 'pending').length;
  const moderateCount = displayAnomalies.filter((a) => a.level === 'moderate' && a.status === 'pending').length;
  const lowCount = displayAnomalies.filter((a) => a.level === 'low' && a.status === 'pending').length;

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'high': return <AlertCircle size={16} className="text-red-500" />;
      case 'moderate': return <AlertTriangle size={16} className="text-amber-500" />;
      case 'low': return <Info size={16} className="text-blue-500" />;
      default: return null;
    }
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'high': return <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-50 text-red-700 font-medium">Élevé</span>;
      case 'moderate': return <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-medium">Modéré</span>;
      case 'low': return <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">Faible</span>;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">À vérifier</span>;
      case 'verified': return <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium">Vérifié</span>;
      case 'ignored': return <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-50 text-slate-400 font-medium">Ignoré</span>;
      default: return null;
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck size={22} className="text-[#1a3a5c]" />
          Contrôle intelligent
        </h1>
        <p className="text-sm text-slate-500">Détection automatique d'anomalies et d'éléments à vérifier</p>
      </div>

      {/* Summary */}
      {pendingCount > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <p className="text-sm font-medium text-amber-800">
            <strong>{pendingCount} élément{pendingCount > 1 ? 's' : ''}</strong> nécessitent votre attention.
          </p>
          <div className="flex gap-4 mt-2">
            {highCount > 0 && <span className="text-xs text-red-700">🔴 {highCount} priorité élevée</span>}
            {moderateCount > 0 && <span className="text-xs text-amber-700">🟡 {moderateCount} priorité modérée</span>}
            {lowCount > 0 && <span className="text-xs text-blue-700">🔵 {lowCount} à vérifier</span>}
          </div>
        </div>
      )}

      {pendingCount === 0 && displayAnomalies.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
          <ShieldCheck size={40} className="mx-auto text-slate-300 mb-3" />
          <p className="text-sm text-slate-500">Aucune anomalie détectée.</p>
          <p className="text-xs text-slate-400 mt-1">Importez des données pour lancer le contrôle.</p>
        </div>
      )}

      {/* Anomalies table */}
      {displayAnomalies.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left text-xs font-medium text-slate-500 uppercase px-4 py-3">Type</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase px-4 py-3">Opération</th>
                <th className="text-center text-xs font-medium text-slate-500 uppercase px-4 py-3">Niveau</th>
                <th className="text-center text-xs font-medium text-slate-500 uppercase px-4 py-3">Statut</th>
                <th className="text-right text-xs font-medium text-slate-500 uppercase px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayAnomalies.map((anomaly) => (
                <tr key={anomaly.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {getLevelIcon(anomaly.level)}
                      <span className="text-sm font-medium text-slate-700">{anomaly.description}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{anomaly.detail}</td>
                  <td className="px-4 py-3 text-center">{getLevelBadge(anomaly.level)}</td>
                  <td className="px-4 py-3 text-center">{getStatusBadge(anomaly.status)}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedAnomaly(anomaly)}
                        className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
                        title="Voir l'explication"
                      >
                        <Eye size={14} />
                      </button>
                      {anomaly.status === 'pending' && (
                        <>
                          <button
                            onClick={() => dispatch({ type: 'UPDATE_ANOMALY', id: anomaly.id, status: 'verified' })}
                            className="p-1.5 rounded hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 cursor-pointer"
                            title="Marquer comme vérifié"
                          >
                            <CheckCircle2 size={14} />
                          </button>
                          <button
                            onClick={() => dispatch({ type: 'UPDATE_ANOMALY', id: anomaly.id, status: 'ignored' })}
                            className="p-1.5 rounded hover:bg-slate-50 text-slate-400 hover:text-slate-500 cursor-pointer"
                            title="Ignorer"
                          >
                            <XCircle size={14} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Explanation Panel */}
      {selectedAnomaly && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">Pourquoi Konta me montre cela ?</h3>
            <button
              onClick={() => setSelectedAnomaly(null)}
              className="text-sm text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              Fermer
            </button>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
              <p className="text-xs text-slate-500 mb-1">Élément détecté</p>
              <p className="text-sm font-medium text-slate-800">{selectedAnomaly.detail}</p>
            </div>

            <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
              <p className="text-xs text-blue-600 mb-1 font-medium">Explication</p>
              <p className="text-sm text-slate-700 leading-relaxed">{selectedAnomaly.explanation}</p>
            </div>

            <div className="flex gap-2">
              {selectedAnomaly.status === 'pending' && (
                <>
                  <button
                    onClick={() => {
                      dispatch({ type: 'UPDATE_ANOMALY', id: selectedAnomaly.id, status: 'verified' });
                      setSelectedAnomaly({ ...selectedAnomaly, status: 'verified' });
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a3a5c] text-white text-sm font-medium hover:bg-[#1a3a5c]/90 cursor-pointer"
                  >
                    <CheckCircle2 size={16} />
                    Marquer comme vérifié
                  </button>
                  <button
                    onClick={() => {
                      dispatch({ type: 'UPDATE_ANOMALY', id: selectedAnomaly.id, status: 'ignored' });
                      setSelectedAnomaly({ ...selectedAnomaly, status: 'ignored' });
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-600 text-sm font-medium hover:bg-slate-200 cursor-pointer"
                  >
                    <XCircle size={16} />
                    Ignorer
                  </button>
                </>
              )}
              {selectedAnomaly.status !== 'pending' && (
                <span className={`text-sm font-medium ${selectedAnomaly.status === 'verified' ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {selectedAnomaly.status === 'verified' ? '✓ Vérifié' : 'Ignoré'}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
