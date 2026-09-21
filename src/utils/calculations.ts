// ============================================================
// KONTA — Calculs déterministes
// Les calculs ne sont JAMAIS faits par le LLM
// ============================================================

import { Transaction } from '../types';

export function sumAmounts(transactions: Transaction[]): number {
  return transactions.reduce((acc, t) => acc + t.amount, 0);
}

export function countTransactions(transactions: Transaction[]): number {
  return transactions.length;
}

export function averageAmount(transactions: Transaction[]): number {
  if (transactions.length === 0) return 0;
  return sumAmounts(transactions) / transactions.length;
}

export function minAmount(transactions: Transaction[]): number {
  if (transactions.length === 0) return 0;
  return Math.min(...transactions.map((t) => t.amount));
}

export function maxAmount(transactions: Transaction[]): number {
  if (transactions.length === 0) return 0;
  return Math.max(...transactions.map((t) => t.amount));
}

export function medianAmount(transactions: Transaction[]): number {
  if (transactions.length === 0) return 0;
  const sorted = [...transactions].sort((a, b) => a.amount - b.amount);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid].amount
    : (sorted[mid - 1].amount + sorted[mid].amount) / 2;
}

export function groupBy<T>(items: T[], keyFn: (item: T) => string): Record<string, T[]> {
  return items.reduce((acc, item) => {
    const key = keyFn(item);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

export function groupByCategory(transactions: Transaction[]): Record<string, Transaction[]> {
  return groupBy(transactions, (t) => t.category);
}

export function groupBySupplier(transactions: Transaction[]): Record<string, Transaction[]> {
  return groupBy(transactions, (t) => t.supplier);
}

export function groupByMonth(transactions: Transaction[]): Record<string, Transaction[]> {
  return groupBy(transactions, (t) => t.date.substring(0, 7));
}

export function getTotalsByCategory(transactions: Transaction[]): { category: string; total: number; count: number }[] {
  const grouped = groupByCategory(transactions);
  return Object.entries(grouped)
    .map(([category, txs]) => ({
      category,
      total: sumAmounts(txs),
      count: txs.length,
    }))
    .sort((a, b) => b.total - a.total);
}

export function getTotalsBySupplier(transactions: Transaction[]): { supplier: string; total: number; count: number }[] {
  const grouped = groupBySupplier(transactions);
  return Object.entries(grouped)
    .map(([supplier, txs]) => ({
      supplier,
      total: sumAmounts(txs),
      count: txs.length,
    }))
    .sort((a, b) => b.total - a.total);
}

export function getMonthlyEvolution(transactions: Transaction[]): { month: string; income: number; expense: number }[] {
  const grouped = groupByMonth(transactions);
  return Object.entries(grouped)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, txs]) => ({
      month,
      income: sumAmounts(txs.filter((t) => t.type === 'income')),
      expense: sumAmounts(txs.filter((t) => t.type === 'expense')),
    }));
}

export function findDuplicates(transactions: Transaction[]): Transaction[][] {
  const seen = new Map<string, Transaction[]>();
  transactions.forEach((t) => {
    const key = `${t.reference}|${t.amount}|${t.date}`;
    if (!seen.has(key)) seen.set(key, []);
    seen.get(key)!.push(t);
  });
  return Array.from(seen.values()).filter((group) => group.length > 1);
}

export function findMissingDescriptions(transactions: Transaction[]): Transaction[] {
  return transactions.filter((t) => !t.description || t.description.trim() === '');
}

export function findUnusualAmounts(transactions: Transaction[], threshold = 2.5): Transaction[] {
  const amounts = transactions.map((t) => t.amount);
  const mean = averageAmount(transactions);
  const stdDev = Math.sqrt(
    amounts.reduce((acc, a) => acc + Math.pow(a - mean, 2), 0) / amounts.length
  );
  return transactions.filter((t) => Math.abs(t.amount - mean) > threshold * stdDev);
}

export function calculateVariation(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

export function formatCurrency(amount: number, currency = 'FCFA'): string {
  return new Intl.NumberFormat('fr-FR').format(Math.round(amount)) + ' ' + currency;
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('fr-FR').format(n);
}
