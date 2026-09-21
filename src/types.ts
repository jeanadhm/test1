// ============================================================
// KONTA — Types principaux
// ============================================================

export type Page =
  | 'dashboard'
  | 'assistant'
  | 'documents'
  | 'invoices'
  | 'data-analysis'
  | 'control'
  | 'clients'
  | 'reports'
  | 'history'
  | 'settings'
  | 'demo';

export interface KontaFile {
  id: string;
  name: string;
  type: 'pdf' | 'xlsx' | 'csv' | 'png' | 'jpg' | 'jpeg' | 'txt';
  size: number;
  clientId?: string;
  status: 'pending' | 'analyzing' | 'analyzed' | 'error';
  uploadedAt: Date;
  rawContent?: string;
  parsedData?: Record<string, unknown>[];
}

export interface InvoiceExtraction {
  id: string;
  documentId: string;
  documentName: string;
  supplier: string | null;
  client: string | null;
  invoiceNumber: string | null;
  invoiceDate: string | null;
  dueDate: string | null;
  description: string | null;
  subtotal: number | null;
  tax: number | null;
  total: number | null;
  currency: string | null;
  items: InvoiceItem[];
  confidence: number; // 0-1
  warnings: string[];
  validated: boolean;
  validatedAt?: Date;
}

export interface InvoiceItem {
  description: string;
  quantity: number | null;
  unitPrice: number | null;
  total: number | null;
}

export interface Transaction {
  date: string;
  reference: string;
  description: string;
  category: string;
  supplier: string;
  amount: number;
  type: 'income' | 'expense';
}

export interface Dataset {
  id: string;
  name: string;
  clientId?: string;
  rows: Transaction[];
  columns: string[];
  uploadedAt: Date;
}

export interface Anomaly {
  id: string;
  type: 'duplicate' | 'unusual_amount' | 'missing_data' | 'unusual_date' | 'format_error' | 'deviation';
  level: 'low' | 'moderate' | 'high';
  description: string;
  detail: string;
  transactionId?: string;
  transaction?: Transaction;
  explanation: string;
  status: 'pending' | 'verified' | 'ignored';
}

export interface Client {
  id: string;
  name: string;
  company: string;
  sector: string;
  email: string;
  phone: string;
  notes: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  files?: KontaFile[];
  structuredData?: StructuredResponse;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  title: string;
  clientId?: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface StructuredResponse {
  type: 'summary' | 'kpi' | 'table' | 'alert' | 'chart' | 'checklist' | 'email' | 'report';
  title?: string;
  data?: Record<string, unknown>;
  items?: Record<string, unknown>[];
  kpis?: { label: string; value: string; trend?: 'up' | 'down' | 'neutral' }[];
  alerts?: { level: 'info' | 'warning' | 'error'; message: string }[];
  chartData?: { label: string; value: number }[];
}

export interface Report {
  id: string;
  title: string;
  clientId?: string;
  content: string;
  createdAt: Date;
  createdBy: string;
}

export interface AuditLog {
  id: string;
  action: string;
  resourceType: string;
  resourceId: string;
  metadata: Record<string, unknown>;
  createdAt: Date;
}

export type DemoScenario = 1 | 2 | 3 | 4 | 5 | 'full';

export interface AppState {
  isDemoMode: boolean;
  isPresentationMode: boolean;
  currentPage: Page;
  selectedClientId: string | null;
  files: KontaFile[];
  datasets: Dataset[];
  invoices: InvoiceExtraction[];
  anomalies: Anomaly[];
  clients: Client[];
  conversations: Conversation[];
  currentConversation: Conversation | null;
  reports: Report[];
  auditLogs: AuditLog[];
}
