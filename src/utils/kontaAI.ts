// ============================================================
// KONTA — Moteur d'analyse local (remplace l'IA pour le MVP)
// Architecture : données → calculs → interprétation structurée
// ============================================================

import { Transaction, Message, StructuredResponse, Anomaly, InvoiceExtraction } from '../types';
import {
  sumAmounts,
  countTransactions,
  averageAmount,
  formatCurrency,
  getTotalsByCategory,
  getTotalsBySupplier,
  getMonthlyEvolution,
  findDuplicates,
  findMissingDescriptions,
  findUnusualAmounts,
} from './calculations';
import { detectAnomalies } from './anomalyDetection';

export interface AnalysisResult {
  text: string;
  structured?: StructuredResponse;
}

export function analyzeDataset(transactions: Transaction[], query: string): AnalysisResult {
  const q = query.toLowerCase();

  // Router vers la bonne analyse
  if (q.includes('résum') || q.includes('synth') || q.includes('general') || q.includes('globale')) {
    return generalSummary(transactions);
  }
  if (q.includes('dépense') || q.includes('depense') || q.includes('charge')) {
    return expenseAnalysis(transactions);
  }
  if (q.includes('revenu') || q.includes('recette') || q.includes('vente')) {
    return revenueAnalysis(transactions);
  }
  if (q.includes('fournisseur')) {
    return supplierAnalysis(transactions);
  }
  if (q.includes('catégorie') || q.includes('categorie')) {
    return categoryAnalysis(transactions);
  }
  if (q.includes('évolution') || q.includes('evolution') || q.includes('mensuel') || q.includes('tendance')) {
    return evolutionAnalysis(transactions);
  }
  if (q.includes('doublon')) {
    return duplicateAnalysis(transactions);
  }
  if (q.includes('inhabituel') || q.includes('anomalie') || q.includes('exceptionnel')) {
    return unusualAnalysis(transactions);
  }
  if (q.includes('manquant') || q.includes('missing') || q.includes('vide')) {
    return missingDataAnalysis(transactions);
  }
  if (q.includes('compar')) {
    return comparisonAnalysis(transactions);
  }

  // Par défaut : résumé général
  return generalSummary(transactions);
}

function generalSummary(transactions: Transaction[]): AnalysisResult {
  const incomes = transactions.filter((t) => t.type === 'income');
  const expenses = transactions.filter((t) => t.type === 'expense');
  const totalIncome = sumAmounts(incomes);
  const totalExpense = sumAmounts(expenses);
  const balance = totalIncome - totalExpense;
  const topCategories = getTotalsByCategory(expenses).slice(0, 5);
  const topSuppliers = getTotalsBySupplier(expenses).slice(0, 5);

  const text = `## Synthèse du jeu de données

**${countTransactions(transactions)} opérations** analysées.

- **Revenus totaux** : ${formatCurrency(totalIncome)}
- **Dépenses totales** : ${formatCurrency(totalExpense)}
- **Solde** : ${formatCurrency(balance)}
- **Dépense moyenne** : ${formatCurrency(averageAmount(expenses))}

### Principales catégories de dépenses
${topCategories.map((c) => `- ${c.category} : ${formatCurrency(c.total)} (${c.count} opérations)`).join('\n')}

### Principaux fournisseurs
${topSuppliers.map((s) => `- ${s.supplier} : ${formatCurrency(s.total)}`).join('\n')}
`;

  return {
    text,
    structured: {
      type: 'kpi',
      title: 'Indicateurs clés',
      kpis: [
        { label: 'Opérations', value: countTransactions(transactions).toString() },
        { label: 'Revenus', value: formatCurrency(totalIncome) },
        { label: 'Dépenses', value: formatCurrency(totalExpense) },
        { label: 'Solde', value: formatCurrency(balance), trend: balance >= 0 ? 'up' : 'down' },
      ],
    },
  };
}

function expenseAnalysis(transactions: Transaction[]): AnalysisResult {
  const expenses = transactions.filter((t) => t.type === 'expense');
  const topCategories = getTotalsByCategory(expenses).slice(0, 7);

  const text = `## Analyse des dépenses

**${countTransactions(expenses)} dépenses** pour un total de **${formatCurrency(sumAmounts(expenses))}**.

### Répartition par catégorie
${topCategories.map((c) => `- **${c.category}** : ${formatCurrency(c.total)} (${c.count} opérations)`).join('\n')}

### Observation
La catégorie "${topCategories[0]?.category || 'N/A'}" représente la part la plus importante des dépenses avec ${formatCurrency(topCategories[0]?.total || 0)}.
`;

  return {
    text,
    structured: {
      type: 'chart',
      title: 'Dépenses par catégorie',
      chartData: topCategories.map((c) => ({ label: c.category, value: c.total })),
    },
  };
}

function revenueAnalysis(transactions: Transaction[]): AnalysisResult {
  const incomes = transactions.filter((t) => t.type === 'income');
  const total = sumAmounts(incomes);
  const avg = averageAmount(incomes);

  const text = `## Analyse des revenus

**${countTransactions(incomes)} opérations de revenu** pour un total de **${formatCurrency(total)}**.

- Revenu moyen : ${formatCurrency(avg)}
- Plus grande opération : ${formatCurrency(Math.max(...incomes.map((t) => t.amount)))}
- Plus petite opération : ${formatCurrency(Math.min(...incomes.map((t) => t.amount)))}
`;

  return { text };
}

function supplierAnalysis(transactions: Transaction[]): AnalysisResult {
  const expenses = transactions.filter((t) => t.type === 'expense');
  const topSuppliers = getTotalsBySupplier(expenses).slice(0, 8);

  const text = `## Analyse par fournisseur

### Principaux fournisseurs (par montant total)
${topSuppliers.map((s, i) => `${i + 1}. **${s.supplier}** — ${formatCurrency(s.total)} (${s.count} opérations)`).join('\n')}

Le fournisseur "${topSuppliers[0]?.supplier || 'N/A'}" représente le volume d'achat le plus important.
`;

  return {
    text,
    structured: {
      type: 'chart',
      title: 'Dépenses par fournisseur',
      chartData: topSuppliers.map((s) => ({ label: s.supplier, value: s.total })),
    },
  };
}

function categoryAnalysis(transactions: Transaction[]): AnalysisResult {
  const expenses = transactions.filter((t) => t.type === 'expense');
  const categories = getTotalsByCategory(expenses);
  const total = sumAmounts(expenses);

  const text = `## Répartition par catégorie

${categories.map((c) => `- **${c.category}** : ${formatCurrency(c.total)} (${((c.total / total) * 100).toFixed(1)}% — ${c.count} opérations)`).join('\n')}
`;

  return {
    text,
    structured: {
      type: 'chart',
      title: 'Répartition des dépenses',
      chartData: categories.map((c) => ({ label: c.category, value: c.total })),
    },
  };
}

function evolutionAnalysis(transactions: Transaction[]): AnalysisResult {
  const evolution = getMonthlyEvolution(transactions);

  const text = `## Évolution mensuelle

${evolution.map((m) => {
    const monthNames: Record<string, string> = { '01': 'Janvier', '02': 'Février', '03': 'Mars', '04': 'Avril', '05': 'Mai', '06': 'Juin' };
    const monthName = monthNames[m.month.split('-')[1]] || m.month;
    return `- **${monthName}** : Revenus ${formatCurrency(m.income)} / Dépenses ${formatCurrency(m.expense)}`;
  }).join('\n')}
`;

  return {
    text,
    structured: {
      type: 'chart',
      title: 'Évolution mensuelle',
      chartData: evolution.map((m) => ({
        label: m.month.split('-')[1] + '/' + m.month.split('-')[0].slice(2),
        value: m.expense,
      })),
    },
  };
}

function duplicateAnalysis(transactions: Transaction[]): AnalysisResult {
  const duplicates = findDuplicates(transactions);

  if (duplicates.length === 0) {
    return { text: '✅ Aucun doublon détecté dans les données.' };
  }

  const text = `## ⚠️ Doublons détectés

**${duplicates.length} groupe(s) de doublons** identifié(s) :

${duplicates.map((group, i) => {
    const t = group[0];
    return `${i + 1}. **${t.reference}** — ${formatCurrency(t.amount)} le ${t.date} (${group.length} occurrences)`;
  }).join('\n')}

Ces opérations nécessitent une vérification manuelle.
`;

  return {
    text,
    structured: {
      type: 'alert',
      title: 'Doublons détectés',
      alerts: duplicates.map((group) => ({
        level: 'warning' as const,
        message: `${group[0].reference} — ${formatCurrency(group[0].amount)} (${group.length} occurrences)`,
      })),
    },
  };
}

function unusualAnalysis(transactions: Transaction[]): AnalysisResult {
  const unusual = findUnusualAmounts(transactions);

  if (unusual.length === 0) {
    return { text: '✅ Aucune opération inhabituelle détectée.' };
  }

  const text = `## ⚠️ Opérations inhabituelles

**${unusual.length} opération(s)** avec un montant significativement différent de la moyenne :

${unusual.map((t, i) => `${i + 1}. **${t.reference}** — ${formatCurrency(t.amount)} (${t.category}, ${t.date})`).join('\n')}

La moyenne des opérations est de ${formatCurrency(averageAmount(transactions))}. Ces montants s'en écartent fortement.
`;

  return {
    text,
    structured: {
      type: 'alert',
      title: 'Opérations inhabituelles',
      alerts: unusual.map((t) => ({
        level: 'warning' as const,
        message: `${t.reference} — ${formatCurrency(t.amount)} (${t.category})`,
      })),
    },
  };
}

function missingDataAnalysis(transactions: Transaction[]): AnalysisResult {
  const missing = findMissingDescriptions(transactions);

  if (missing.length === 0) {
    return { text: '✅ Toutes les opérations contiennent une description.' };
  }

  const text = `## ⚠️ Données manquantes

**${missing.length} opération(s)** sans description :

${missing.slice(0, 10).map((t, i) => `${i + 1}. **${t.reference}** — ${formatCurrency(t.amount)} le ${t.date}`).join('\n')}
${missing.length > 10 ? `\n...et ${missing.length - 10} autres opérations.` : ''}
`;

  return { text };
}

function comparisonAnalysis(transactions: Transaction[]): AnalysisResult {
  const evolution = getMonthlyEvolution(transactions);
  if (evolution.length < 2) {
    return { text: 'Pas assez de données pour effectuer une comparaison.' };
  }

  const last = evolution[evolution.length - 1];
  const prev = evolution[evolution.length - 2];
  const incomeVar = prev.income > 0 ? ((last.income - prev.income) / prev.income * 100).toFixed(1) : 'N/A';
  const expenseVar = prev.expense > 0 ? ((last.expense - prev.expense) / prev.expense * 100).toFixed(1) : 'N/A';

  const text = `## Comparaison des derniers mois

| Indicateur | Mois précédent | Dernier mois | Variation |
|---|---|---|---|
| Revenus | ${formatCurrency(prev.income)} | ${formatCurrency(last.income)} | ${incomeVar}% |
| Dépenses | ${formatCurrency(prev.expense)} | ${formatCurrency(last.expense)} | ${expenseVar}% |
`;

  return { text };
}

// Analyse de facture (simulation d'extraction)
export function analyzeInvoiceQuery(invoices: InvoiceExtraction[], query: string): AnalysisResult {
  const q = query.toLowerCase();

  if (q.includes('résum') || q.includes('synth') || q.includes('facture')) {
    const total = invoices.reduce((acc, inv) => acc + (inv.total || 0), 0);
    const validated = invoices.filter((i) => i.validated).length;
    const toVerify = invoices.filter((i) => i.warnings.length > 0).length;

    return {
      text: `## Synthèse des factures

**${invoices.length} factures** analysées.

- **Montant total TTC** : ${formatCurrency(total)}
- **Validées** : ${validated}/${invoices.length}
- **À vérifier** : ${toVerify}

### Détail par facture
${invoices.map((inv) => `- **${inv.documentName}** — ${inv.supplier || 'Fournisseur inconnu'} — ${inv.total ? formatCurrency(inv.total) : 'Non détecté'} (confiance: ${(inv.confidence * 100).toFixed(0)}%)`).join('\n')}
`,
      structured: {
        type: 'kpi',
        title: 'Factures',
        kpis: [
          { label: 'Factures', value: invoices.length.toString() },
          { label: 'Total TTC', value: formatCurrency(total) },
          { label: 'Validées', value: `${validated}/${invoices.length}` },
          { label: 'À vérifier', value: toVerify.toString() },
        ],
      },
    };
  }

  return { text: 'Voici les informations extraites des factures. Que souhaitez-vous savoir de plus ?' };
}

// Analyse des anomalies
export function analyzeAnomalies(anomalies: Anomaly[]): AnalysisResult {
  const high = anomalies.filter((a) => a.level === 'high');
  const moderate = anomalies.filter((a) => a.level === 'moderate');
  const low = anomalies.filter((a) => a.level === 'low');

  const text = `## Contrôle intelligent

**${anomalies.length} éléments** nécessitent votre attention.

${high.length > 0 ? `### 🔴 Priorité élevée (${high.length})\n${high.map((a) => `- ${a.description} : ${a.detail}`).join('\n')}\n` : ''}
${moderate.length > 0 ? `### 🟡 Priorité modérée (${moderate.length})\n${moderate.map((a) => `- ${a.description} : ${a.detail}`).join('\n')}\n` : ''}
${low.length > 0 ? `### 🔵 À vérifier (${low.length})\n${low.map((a) => `- ${a.description} : ${a.detail}`).join('\n')}\n` : ''}

Chaque élément peut être vérifié, ignoré ou marqué comme conforme après validation.
`;

  return {
    text,
    structured: {
      type: 'alert',
      title: 'Éléments à vérifier',
      alerts: anomalies.map((a) => ({
        level: a.level === 'high' ? 'error' as const : a.level === 'moderate' ? 'warning' as const : 'info' as const,
        message: `${a.description} — ${a.detail}`,
      })),
    },
  };
}

// Générer un email
export function generateEmail(type: string, context: string): AnalysisResult {
  const templates: Record<string, { subject: string; body: string }> = {
    'demande de pièces': {
      subject: 'Demande de pièces complémentaires — Dossier comptable',
      body: `Bonjour,

Dans le cadre du traitement de votre dossier comptable, nous aurions besoin des pièces complémentaires suivantes :

${context || '- Factures manquantes\n- Relevés bancaires du dernier trimestre\n- Pièces justificatives des opérations exceptionnelles'}

Merci de nous transmettre ces éléments dans les meilleurs délais.

Cordialement,
Votre cabinet comptable`,
    },
    'relance': {
      subject: 'Relance — Documents en attente',
      body: `Bonjour,

Nous nous permettons de vous relancer concernant les documents demandés précédemment pour votre dossier comptable.

Pourriez-vous nous les transmettre dès que possible afin que nous puissions poursuivre le traitement dans les délais ?

Nous restons à votre disposition pour toute question.

Cordialement,
Votre cabinet comptable`,
    },
    'compte rendu': {
      subject: 'Compte rendu d\'analyse — Dossier comptable',
      body: `Bonjour,

Veuillez trouver ci-dessous le compte rendu de notre analyse récente :

${context || 'L\'analyse du dossier a été effectuée avec succès. Les principaux éléments sont en conformité. Quelques points nécessitent toutefois votre attention.'}

N'hésitez pas à nous contacter pour échanger sur ces résultats.

Cordialement,
Votre cabinet comptable`,
    },
    'transmission': {
      subject: 'Transmission de rapport d\'analyse',
      body: `Bonjour,

Veuillez trouver en pièce jointe le rapport d'analyse relatif à votre dossier.

Ce document synthétise les résultats de notre travail et inclut nos recommandations.

Nous restons à votre disposition pour toute précision.

Cordialement,
Votre cabinet comptable`,
    },
  };

  const template = templates[type] || templates['compte rendu'];

  return {
    text: `## Email préparé

**Objet** : ${template.subject}

---

${template.body}

---

*Vous pouvez copier et modifier ce message avant envoi.*`,
    structured: {
      type: 'email',
      title: template.subject,
      data: { subject: template.subject, body: template.body },
    },
  };
}

// Générer un résumé pour un dossier client
export function generateClientSummary(
  clientName: string,
  transactions: Transaction[],
  anomalies: Anomaly[],
  invoiceCount: number
): AnalysisResult {
  const incomes = transactions.filter((t) => t.type === 'income');
  const expenses = transactions.filter((t) => t.type === 'expense');

  const text = `## Dossier ${clientName}

### Vue d'ensemble
- **Transactions** : ${countTransactions(transactions)} opérations
- **Revenus** : ${formatCurrency(sumAmounts(incomes))}
- **Dépenses** : ${formatCurrency(sumAmounts(expenses))}
- **Solde** : ${formatCurrency(sumAmounts(incomes) - sumAmounts(expenses))}
- **Factures** : ${invoiceCount}
- **Éléments à vérifier** : ${anomalies.filter((a) => a.status === 'pending').length}

### Points d'attention
${anomalies.filter((a) => a.status === 'pending').slice(0, 5).map((a) => `- ${a.description}`).join('\n') || 'Aucun élément particulier.'}

### Recommandation
${anomalies.filter((a) => a.level === 'high').length > 0
    ? 'Des éléments prioritaires nécessitent une vérification rapide.'
    : anomalies.length > 0
      ? 'Quelques points méritent attention mais aucun ne semble bloquant.'
      : 'Le dossier semble en bon état. Aucune anomalie significative détectée.'
  }
`;

  return { text };
}
