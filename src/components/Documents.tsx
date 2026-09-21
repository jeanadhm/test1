// ============================================================
// KONTA — Module Documents
// ============================================================

import { useState, useRef } from 'react';
import { Upload, FileText, Image, Table2, File, Search, Trash2, Eye, Loader2 } from 'lucide-react';
import { useAppState } from '../store/AppContext';
import { KontaFile } from '../types';

export default function Documents() {
  const { state, dispatch } = useAppState();
  const { files, isDemoMode } = state;
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const displayFiles = isDemoMode
    ? state.files.length > 0 ? state.files : [
        { id: 'doc-1', name: 'facture_beta_001.pdf', type: 'pdf' as const, size: 245000, status: 'analyzed' as const, uploadedAt: new Date('2026-06-01') },
        { id: 'doc-2', name: 'facture_atlantic_002.pdf', type: 'pdf' as const, size: 189000, status: 'analyzed' as const, uploadedAt: new Date('2026-06-01') },
        { id: 'doc-3', name: 'facture_nova_log_003.pdf', type: 'pdf' as const, size: 312000, status: 'analyzed' as const, uploadedAt: new Date('2026-06-01') },
        { id: 'doc-4', name: 'facture_digital_004.jpg', type: 'jpg' as const, size: 1250000, status: 'analyzed' as const, uploadedAt: new Date('2026-06-01') },
        { id: 'doc-5', name: 'facture_techplus_005.pdf', type: 'pdf' as const, size: 156000, status: 'analyzed' as const, uploadedAt: new Date('2026-06-01') },
        { id: 'doc-6', name: 'transactions_nova_2026.xlsx', type: 'xlsx' as const, size: 89000, status: 'analyzed' as const, uploadedAt: new Date('2026-06-01') },
        { id: 'doc-7', name: 'releve_bancaire_mai.xlsx', type: 'xlsx' as const, size: 67000, status: 'analyzed' as const, uploadedAt: new Date('2026-06-01') },
      ]
    : files;

  const filteredFiles = displayFiles.filter((f) => {
    if (filter !== 'all' && f.type !== filter) return false;
    if (search && !f.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    Array.from(e.target.files).forEach((file) => {
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      const typeMap: Record<string, KontaFile['type']> = {
        pdf: 'pdf', xlsx: 'xlsx', xls: 'xlsx', csv: 'csv',
        png: 'png', jpg: 'jpg', jpeg: 'jpeg', txt: 'txt',
      };
      const fileType = typeMap[ext];
      if (!fileType) return;

      dispatch({
        type: 'ADD_FILE',
        file: {
          id: `file-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          name: file.name,
          type: fileType,
          size: file.size,
          status: 'pending',
          uploadedAt: new Date(),
        },
      });
    });
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText size={18} className="text-red-500" />;
      case 'xlsx': case 'xls': return <Table2 size={18} className="text-emerald-600" />;
      case 'csv': return <Table2 size={18} className="text-emerald-600" />;
      case 'png': case 'jpg': case 'jpeg': return <Image size={18} className="text-blue-500" />;
      default: return <File size={18} className="text-slate-400" />;
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} o`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'analyzed': return <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium">Analysé</span>;
      case 'analyzing': return <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium flex items-center gap-1"><Loader2 size={8} className="animate-spin" />En cours</span>;
      case 'pending': return <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">En attente</span>;
      case 'error': return <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-50 text-red-700 font-medium">Erreur</span>;
      default: return null;
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Documents</h1>
          <p className="text-sm text-slate-500">Bibliothèque documentaire</p>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a3a5c] text-white text-sm font-medium hover:bg-[#1a3a5c]/90 transition-colors cursor-pointer"
        >
          <Upload size={16} />
          Importer
        </button>
        <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleUpload} />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-3 py-2 flex-1 max-w-xs">
          <Search size={16} className="text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher..."
            className="text-sm outline-none bg-transparent text-slate-700 placeholder:text-slate-400 flex-1"
          />
        </div>
        <div className="flex gap-1">
          {[
            { id: 'all', label: 'Tous' },
            { id: 'pdf', label: 'PDF' },
            { id: 'xlsx', label: 'Excel' },
            { id: 'csv', label: 'CSV' },
            { id: 'jpg', label: 'Images' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                filter === f.id
                  ? 'bg-[#1a3a5c] text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* File List */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Nom</th>
              <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Type</th>
              <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Taille</th>
              <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Statut</th>
              <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Date</th>
              <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFiles.map((file) => (
              <tr key={file.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {getFileIcon(file.type)}
                    <span className="text-sm font-medium text-slate-700">{file.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-slate-500 uppercase">{file.type}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{formatSize(file.size)}</td>
                <td className="px-4 py-3">{getStatusBadge(file.status)}</td>
                <td className="px-4 py-3 text-sm text-slate-500">
                  {file.uploadedAt.toLocaleDateString('fr-FR')}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer">
                      <Eye size={14} />
                    </button>
                    <button
                      onClick={() => dispatch({ type: 'REMOVE_FILE', id: file.id })}
                      className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-500 cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredFiles.length === 0 && (
          <div className="text-center py-12 text-sm text-slate-400">
            Aucun document trouvé.
          </div>
        )}
      </div>
    </div>
  );
}
