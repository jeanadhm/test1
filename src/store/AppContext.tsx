// ============================================================
// KONTA — Store global (React Context)
// ============================================================

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, Page, KontaFile, Dataset, InvoiceExtraction, Anomaly, Client, Conversation, Report, AuditLog, Message } from '../types';
import { DEMO_CLIENT, DEMO_TRANSACTIONS, DEMO_INVOICES, DEMO_ANOMALIES } from '../data/demoData';

type Action =
  | { type: 'SET_PAGE'; page: Page }
  | { type: 'TOGGLE_DEMO_MODE' }
  | { type: 'TOGGLE_PRESENTATION_MODE' }
  | { type: 'ADD_FILE'; file: KontaFile }
  | { type: 'REMOVE_FILE'; id: string }
  | { type: 'UPDATE_FILE'; id: string; updates: Partial<KontaFile> }
  | { type: 'ADD_DATASET'; dataset: Dataset }
  | { type: 'ADD_INVOICE'; invoice: InvoiceExtraction }
  | { type: 'UPDATE_INVOICE'; id: string; updates: Partial<InvoiceExtraction> }
  | { type: 'SET_ANOMALIES'; anomalies: Anomaly[] }
  | { type: 'UPDATE_ANOMALY'; id: string; status: 'pending' | 'verified' | 'ignored' }
  | { type: 'SET_CLIENTS'; clients: Client[] }
  | { type: 'ADD_CLIENT'; client: Client }
  | { type: 'SET_CONVERSATIONS'; conversations: Conversation[] }
  | { type: 'SET_CURRENT_CONVERSATION'; conversation: Conversation | null }
  | { type: 'ADD_MESSAGE'; message: Message }
  | { type: 'ADD_REPORT'; report: Report }
  | { type: 'ADD_AUDIT_LOG'; log: AuditLog }
  | { type: 'SET_SELECTED_CLIENT'; clientId: string | null }
  | { type: 'LOAD_DEMO_DATA' };

const initialState: AppState = {
  isDemoMode: false,
  isPresentationMode: false,
  currentPage: 'dashboard',
  selectedClientId: null,
  files: [],
  datasets: [],
  invoices: [],
  anomalies: [],
  clients: [],
  conversations: [],
  currentConversation: null,
  reports: [],
  auditLogs: [],
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_PAGE':
      return { ...state, currentPage: action.page };
    case 'TOGGLE_DEMO_MODE':
      return { ...state, isDemoMode: !state.isDemoMode };
    case 'TOGGLE_PRESENTATION_MODE':
      return { ...state, isPresentationMode: !state.isPresentationMode };
    case 'ADD_FILE':
      return { ...state, files: [...state.files, action.file] };
    case 'REMOVE_FILE':
      return { ...state, files: state.files.filter((f) => f.id !== action.id) };
    case 'UPDATE_FILE':
      return {
        ...state,
        files: state.files.map((f) => (f.id === action.id ? { ...f, ...action.updates } : f)),
      };
    case 'ADD_DATASET':
      return { ...state, datasets: [...state.datasets, action.dataset] };
    case 'ADD_INVOICE':
      return { ...state, invoices: [...state.invoices, action.invoice] };
    case 'UPDATE_INVOICE':
      return {
        ...state,
        invoices: state.invoices.map((i) => (i.id === action.id ? { ...i, ...action.updates } : i)),
      };
    case 'SET_ANOMALIES':
      return { ...state, anomalies: action.anomalies };
    case 'UPDATE_ANOMALY':
      return {
        ...state,
        anomalies: state.anomalies.map((a) => (a.id === action.id ? { ...a, status: action.status } : a)),
      };
    case 'SET_CLIENTS':
      return { ...state, clients: action.clients };
    case 'ADD_CLIENT':
      return { ...state, clients: [...state.clients, action.client] };
    case 'SET_CONVERSATIONS':
      return { ...state, conversations: action.conversations };
    case 'SET_CURRENT_CONVERSATION':
      return { ...state, currentConversation: action.conversation };
    case 'ADD_MESSAGE':
      if (!state.currentConversation) return state;
      return {
        ...state,
        currentConversation: {
          ...state.currentConversation,
          messages: [...state.currentConversation.messages, action.message],
          updatedAt: new Date(),
        },
      };
    case 'ADD_REPORT':
      return { ...state, reports: [...state.reports, action.report] };
    case 'ADD_AUDIT_LOG':
      return { ...state, auditLogs: [...state.auditLogs, action.log] };
    case 'SET_SELECTED_CLIENT':
      return { ...state, selectedClientId: action.clientId };
    case 'LOAD_DEMO_DATA':
      return {
        ...state,
        isDemoMode: true,
        clients: [DEMO_CLIENT],
        invoices: DEMO_INVOICES,
        anomalies: DEMO_ANOMALIES,
        datasets: [
          {
            id: 'demo-dataset-1',
            name: 'transactions_nova_2026.xlsx',
            clientId: 'demo-client-1',
            rows: DEMO_TRANSACTIONS,
            columns: ['date', 'reference', 'description', 'category', 'supplier', 'amount', 'type'],
            uploadedAt: new Date('2026-06-01'),
          },
        ],
        files: [
          { id: 'doc-1', name: 'facture_beta_001.pdf', type: 'pdf', size: 245000, clientId: 'demo-client-1', status: 'analyzed', uploadedAt: new Date('2026-06-01') },
          { id: 'doc-2', name: 'facture_atlantic_002.pdf', type: 'pdf', size: 189000, clientId: 'demo-client-1', status: 'analyzed', uploadedAt: new Date('2026-06-01') },
          { id: 'doc-3', name: 'facture_nova_log_003.pdf', type: 'pdf', size: 312000, clientId: 'demo-client-1', status: 'analyzed', uploadedAt: new Date('2026-06-01') },
          { id: 'doc-4', name: 'facture_digital_004.jpg', type: 'jpg', size: 1250000, clientId: 'demo-client-1', status: 'analyzed', uploadedAt: new Date('2026-06-01') },
          { id: 'doc-5', name: 'facture_techplus_005.pdf', type: 'pdf', size: 156000, clientId: 'demo-client-1', status: 'analyzed', uploadedAt: new Date('2026-06-01') },
          { id: 'doc-6', name: 'transactions_nova_2026.xlsx', type: 'xlsx', size: 89000, clientId: 'demo-client-1', status: 'analyzed', uploadedAt: new Date('2026-06-01') },
          { id: 'doc-7', name: 'releve_bancaire_mai.xlsx', type: 'xlsx', size: 67000, clientId: 'demo-client-1', status: 'analyzed', uploadedAt: new Date('2026-06-01') },
        ],
      };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppState must be used within AppProvider');
  return ctx;
}
