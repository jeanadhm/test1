// ============================================================
// KONTA — Détection d'anomalies
// ============================================================

import { Transaction, Anomaly } from '../types';
import {
  findDuplicates,
  findMissingDescriptions,
  findUnusualAmounts,
  averageAmount,
  groupByCategory,
  sumAmounts,
  calculateVariation,
} from './calculations';

export function detectAnomalies(transactions: Transaction[]): Anomaly[] {
  const anomalies: Anomaly[] = [];
  let idCounter = 1;

  // 1. Doublons
  const duplicates = findDuplicates(transactions);
  for (const group of duplicates) {
    const t = group[0];
    anomalies.push({
      id: `anomaly-${idCounter++}`,
      type: 'duplicate',
      level: 'moderate',
      description: 'Doublon détecté',
      detail: `${t.reference} — ${formatAmount(t.amount)} enregistré ${group.length} fois`,
      transaction: t,
      explanation: `Deux opérations identiques (même référence, même montant, même date) ont été trouvées. Il peut s'agir d'une saisie en double.`,
      status: 'pending',
    });
  }

  // 2. Montants inhabituels
  const unusual = findUnusualAmounts(transactions);
  for (const t of unusual) {
    const mean = averageAmount(transactions);
    const ratio = t.amount / mean;
    anomalies.push({
      id: `anomaly-${idCounter++}`,
      type: 'unusual_amount',
      level: ratio > 4 ? 'high' : 'moderate',
      description: 'Montant inhabituellement élevé',
      detail: `${t.reference} — ${formatAmount(t.amount)} (${t.category})`,
      transaction: t,
      explanation: `Cette opération est significativement supérieure à la moyenne des opérations (${formatAmount(mean)}). Le montant représente ${ratio.toFixed(1)}x la moyenne.`,
      status: 'pending',
    });
  }

  // 3. Descriptions manquantes
  const missing = findMissingDescriptions(transactions);
  if (missing.length > 0) {
    anomalies.push({
      id: `anomaly-${idCounter++}`,
      type: 'missing_data',
      level: 'low',
      description: 'Descriptions manquantes',
      detail: `${missing.length} opération(s) sans description`,
      explanation: `${missing.length} opérations ne contiennent aucune description. Cela rend le suivi et l'audit plus difficiles.`,
      status: 'pending',
    });
  }

  // 4. Dates inhabituelles
  for (const t of transactions) {
    if (isValidDate(t.date)) continue;
    anomalies.push({
      id: `anomaly-${idCounter++}`,
      type: 'unusual_date',
      level: 'moderate',
      description: 'Date incohérente',
      detail: `${t.reference} — Date "${t.date}" invalide`,
      transaction: t,
      explanation: `La date "${t.date}" n'est pas une date valide. Il s'agit probablement d'une erreur de saisie. Vérifier la date correcte.`,
      status: 'pending',
    });
  }

  // 5. Écarts par catégorie entre mois
  const byCategory = groupByCategory(transactions.filter((t) => t.type === 'expense'));
  const months = [...new Set(transactions.map((t) => t.date.substring(0, 7)))].sort();

  if (months.length >= 2) {
    for (const [category, txs] of Object.entries(byCategory)) {
      const monthlyTotals: Record<string, number> = {};
      for (const t of txs) {
        const month = t.date.substring(0, 7);
        monthlyTotals[month] = (monthlyTotals[month] || 0) + t.amount;
      }

      const values = Object.values(monthlyTotals);
      if (values.length < 2) continue;
      const avg = values.reduce((a, b) => a + b, 0) / values.length;

      for (const [month, total] of Object.entries(monthlyTotals)) {
        const variation = calculateVariation(total, avg);
        if (Math.abs(variation) > 40 && avg > 0) {
          anomalies.push({
            id: `anomaly-${idCounter++}`,
            type: 'deviation',
            level: Math.abs(variation) > 80 ? 'moderate' : 'low',
            description: `Écart de catégorie — ${category}`,
            detail: `${category} : ${variation > 0 ? '+' : ''}${variation.toFixed(0)}% en ${formatMonth(month)}`,
            explanation: `Les dépenses en "${category}" ont ${variation > 0 ? 'augmenté' : 'diminué'} de ${Math.abs(variation).toFixed(0)}% par rapport à la moyenne mensuelle (${formatAmount(avg)}). Cette variation peut être justifiée mais mérite vérification.`,
            status: 'pending',
          });
        }
      }
    }
  }

  // 6. Formats incorrects
  for (const t of transactions) {
    if (t.reference && !/^[A-Za-z0-9\-_]+$/.test(t.reference)) {
      anomalies.push({
        id: `anomaly-${idCounter++}`,
        type: 'format_error',
        level: 'low',
        description: 'Format de référence inhabituel',
        detail: `Référence "${t.reference}" — format non standard`,
        transaction: t,
        explanation: `La référence de cette opération contient des caractères inhabituels. Vérifier qu'il ne s'agit pas d'une erreur de saisie.`,
        status: 'pending',
      });
    }
  }

  return anomalies;
}

function isValidDate(dateStr: string): boolean {
  if (!dateStr || dateStr === 'non renseignée') return true;
  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return false;
  const [, year, month, day] = match.map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

function formatAmount(amount: number): string {
  return new Intl.NumberFormat('fr-FR').format(Math.round(amount)) + ' FCFA';
}

function formatMonth(month: string): string {
  const [year, m] = month.split('-');
  const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  return `${months[parseInt(m) - 1]} ${year}`;
}
