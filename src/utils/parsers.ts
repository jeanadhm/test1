// ============================================================
// KONTA — Parsing de fichiers CSV/XLSX
// ============================================================

import * as XLSX from 'xlsx';
import { Transaction } from '../types';

export interface ParsedDataset {
  rows: Record<string, unknown>[];
  columns: string[];
  rowCount: number;
  fileName: string;
}

export function parseCSV(content: string, fileName: string): ParsedDataset {
  const lines = content.trim().split('\n');
  if (lines.length < 2) {
    return { rows: [], columns: [], rowCount: 0, fileName };
  }

  const headers = parseCSVLine(lines[0]);
  const rows: Record<string, unknown>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const row: Record<string, unknown> = {};
    headers.forEach((header, idx) => {
      row[header] = values[idx] || '';
    });
    rows.push(row);
  }

  return { rows, columns: headers, rowCount: rows.length, fileName };
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else if (char === ';' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

export async function parseExcel(file: File): Promise<ParsedDataset> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target!.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet);

        const columns = jsonData.length > 0 ? Object.keys(jsonData[0]) : [];

        resolve({
          rows: jsonData,
          columns,
          rowCount: jsonData.length,
          fileName: file.name,
        });
      } catch (err) {
        reject(new Error(`Impossible de lire le fichier ${file.name}`));
      }
    };
    reader.onerror = () => reject(new Error('Erreur de lecture du fichier'));
    reader.readAsArrayBuffer(file);
  });
}

export function mapToTransactions(rows: Record<string, unknown>[]): Transaction[] {
  // Tente de mapper les colonnes vers les champs Transaction
  const transactions: Transaction[] = [];

  for (const row of rows) {
    const keys = Object.keys(row);
    const findCol = (patterns: string[]) => {
      for (const pattern of patterns) {
        const found = keys.find((k) => k.toLowerCase().includes(pattern.toLowerCase()));
        if (found) return row[found];
      }
      return null;
    };

    const date = String(findCol(['date', 'jour']) || '');
    const reference = String(findCol(['ref', 'reference', 'n°', 'numero']) || '');
    const description = String(findCol(['desc', 'libellé', 'libelle', 'description', 'objet']) || '');
    const category = String(findCol(['cat', 'categorie', 'category', 'type']) || 'Non classé');
    const supplier = String(findCol(['fourn', 'supplier', 'tiers', 'partenaire']) || 'Non renseigné');
    const amountStr = String(findCol(['montant', 'amount', 'total', 'valeur', 'prix']) || '0');
    const amount = parseAmount(amountStr);
    const typeStr = String(findCol(['sens', 'type_op', 'debit_credit']) || '').toLowerCase();

    let type: 'income' | 'expense' = 'expense';
    if (typeStr.includes('recette') || typeStr.includes('credit') || typeStr.includes('income')) {
      type = 'income';
    } else if (amount < 0) {
      type = 'expense';
    }

    transactions.push({
      date: date || 'non renseignée',
      reference: reference || `AUTO-${transactions.length + 1}`,
      description: description || '',
      category: category || 'Non classé',
      supplier: supplier || 'Non renseigné',
      amount: Math.abs(amount),
      type,
    });
  }

  return transactions;
}

function parseAmount(str: string): number {
  if (!str) return 0;
  // Remove spaces, non-breaking spaces, and handle comma as decimal separator
  const cleaned = str.replace(/\s/g, '').replace(/[^0-9.,-]/g, '');
  // If both comma and dot exist, assume dot is thousands separator
  if (cleaned.includes(',') && cleaned.includes('.')) {
    return parseFloat(cleaned.replace(/\./g, '').replace(',', '.')) || 0;
  }
  // If only comma, treat as decimal separator (French convention)
  if (cleaned.includes(',')) {
    return parseFloat(cleaned.replace(',', '.')) || 0;
  }
  return parseFloat(cleaned) || 0;
}

export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target!.result as string);
    reader.onerror = () => reject(new Error('Erreur de lecture'));
    reader.readAsText(file);
  });
}
