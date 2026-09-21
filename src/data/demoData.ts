// ============================================================
// KONTA — Données de démonstration
// Entreprise fictive : NOVA DISTRIBUTION SARL
// ============================================================

import { Client, Transaction, InvoiceExtraction, Anomaly } from '../types';

export const DEMO_CLIENT: Client = {
  id: 'demo-client-1',
  name: 'NOVA DISTRIBUTION',
  company: 'NOVA DISTRIBUTION SARL',
  sector: 'Distribution & Commerce',
  email: 'contact@nova-distribution-demo.example',
  phone: '+225 07 00 00 00',
  notes: 'Dossier fictif de démonstration. Aucune donnée réelle.',
  createdAt: new Date('2026-01-15'),
};

export const DEMO_SUPPLIERS = [
  'BETA SERVICES SARL',
  'ATLANTIC FOURNITURES',
  'NOVA LOGISTICS',
  'DIGITAL OFFICE',
  'SARL TECH PLUS',
  'OUEST DISTRIBUTION',
];

export const DEMO_CATEGORIES = [
  'Fournitures bureau',
  'Transport & Logistique',
  'Services informatiques',
  'Loyer',
  'Énergie',
  'Télécommunications',
  'Marketing',
  'Formation',
  'Maintenance',
  'Ventes produits',
];

// ~100 transactions sur plusieurs mois avec anomalies volontaires
export const DEMO_TRANSACTIONS: Transaction[] = generateDemoTransactions();

function generateDemoTransactions(): Transaction[] {
  const transactions: Transaction[] = [];
  const months = ['2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06'];

  let refCounter = 1000;

  months.forEach((month, monthIdx) => {
    // Revenus (ventes)
    for (let i = 0; i < 8; i++) {
      const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
      transactions.push({
        date: `${month}-${day}`,
        reference: `VNT-${refCounter++}`,
        description: `Vente produits — Lot ${i + 1}`,
        category: 'Ventes produits',
        supplier: 'Client divers',
        amount: Math.floor(Math.random() * 2000000) + 500000,
        type: 'income',
      });
    }

    // Dépenses
    for (let i = 0; i < 10; i++) {
      const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
      const category = DEMO_CATEGORIES[Math.floor(Math.random() * (DEMO_CATEGORIES.length - 1))];
      const supplier = DEMO_SUPPLIERS[Math.floor(Math.random() * DEMO_SUPPLIERS.length)];
      const amount = Math.floor(Math.random() * 800000) + 50000;

      // 3 descriptions vides volontaires
      const description = (monthIdx === 2 && i === 3) || (monthIdx === 4 && i === 7) || (monthIdx === 5 && i === 2)
        ? ''
        : `${category} — ${supplier}`;

      transactions.push({
        date: `${month}-${day}`,
        reference: `DEP-${refCounter++}`,
        description,
        category,
        supplier,
        amount,
        type: 'expense',
      });
    }
  });

  // ANOMALIE 1 : Montant exceptionnellement élevé (3 450 000)
  transactions.push({
    date: '2026-04-18',
    reference: 'DEP-2001',
    description: 'Services informatiques — BETA SERVICES SARL',
    category: 'Services informatiques',
    supplier: 'BETA SERVICES SARL',
    amount: 3450000,
    type: 'expense',
  });

  // ANOMALIE 2 & 3 : Doublons
  transactions.push({
    date: '2026-03-12',
    reference: 'DEP-2002',
    description: 'Fournitures bureau — DIGITAL OFFICE',
    category: 'Fournitures bureau',
    supplier: 'DIGITAL OFFICE',
    amount: 175000,
    type: 'expense',
  });
  transactions.push({
    date: '2026-03-12',
    reference: 'DEP-2002',
    description: 'Fournitures bureau — DIGITAL OFFICE',
    category: 'Fournitures bureau',
    supplier: 'DIGITAL OFFICE',
    amount: 175000,
    type: 'expense',
  });

  // ANOMALIE 4 : Date inhabituelle
  transactions.push({
    date: '2026-02-30',
    reference: 'DEP-2003',
    description: 'Maintenance — ATLANTIC FOURNITURES',
    category: 'Maintenance',
    supplier: 'ATLANTIC FOURNITURES',
    amount: 320000,
    type: 'expense',
  });

  return transactions;
}

export const DEMO_INVOICES: InvoiceExtraction[] = [
  {
    id: 'inv-1',
    documentId: 'doc-1',
    documentName: 'facture_beta_001.pdf',
    supplier: 'BETA SERVICES SARL',
    client: 'NOVA DISTRIBUTION SARL',
    invoiceNumber: 'BS-2026-0042',
    invoiceDate: '2026-03-14',
    dueDate: '2026-04-14',
    description: 'Prestation de maintenance informatique',
    subtotal: 350000,
    tax: 63000,
    total: 413000,
    currency: 'FCFA',
    items: [
      { description: 'Maintenance préventive serveurs', quantity: 1, unitPrice: 200000, total: 200000 },
      { description: 'Remplacement disque dur', quantity: 1, unitPrice: 150000, total: 150000 },
    ],
    confidence: 0.92,
    warnings: [],
    validated: false,
  },
  {
    id: 'inv-2',
    documentId: 'doc-2',
    documentName: 'facture_atlantic_002.pdf',
    supplier: 'ATLANTIC FOURNITURES',
    client: 'NOVA DISTRIBUTION SARL',
    invoiceNumber: 'AF-2026-0118',
    invoiceDate: '2026-03-22',
    dueDate: '2026-04-22',
    description: 'Fournitures de bureau',
    subtotal: 125000,
    tax: 22500,
    total: 147500,
    currency: 'FCFA',
    items: [
      { description: 'Ramettes papier A4 x50', quantity: 1, unitPrice: 75000, total: 75000 },
      { description: 'Consommables imprimante', quantity: 1, unitPrice: 50000, total: 50000 },
    ],
    confidence: 0.88,
    warnings: [],
    validated: false,
  },
  {
    id: 'inv-3',
    documentId: 'doc-3',
    documentName: 'facture_nova_log_003.pdf',
    supplier: 'NOVA LOGISTICS',
    client: 'NOVA DISTRIBUTION SARL',
    invoiceNumber: 'NL-2026-0076',
    invoiceDate: '2026-04-05',
    dueDate: '2026-05-05',
    description: 'Transport et livraison',
    subtotal: 280000,
    tax: 50400,
    total: 330400,
    currency: 'FCFA',
    items: [
      { description: 'Livraison zone urbaine', quantity: 12, unitPrice: 15000, total: 180000 },
      { description: 'Livraison zone périurbaine', quantity: 5, unitPrice: 20000, total: 100000 },
    ],
    confidence: 0.95,
    warnings: [],
    validated: true,
    validatedAt: new Date('2026-04-10'),
  },
  {
    id: 'inv-4',
    documentId: 'doc-4',
    documentName: 'facture_digital_004.jpg',
    supplier: 'DIGITAL OFFICE',
    client: null, // Non détecté
    invoiceNumber: 'DO-2026-0331',
    invoiceDate: '2026-04-18',
    dueDate: null, // Non détecté
    description: 'Licences logiciels',
    subtotal: 450000,
    tax: 81000,
    total: 531000,
    currency: 'FCFA',
    items: [
      { description: 'Licence annuelle suite bureautique', quantity: 15, unitPrice: 30000, total: 450000 },
    ],
    confidence: 0.61,
    warnings: [
      'Nom du client non détecté sur le document',
      'Date d\'échéance non identifiable',
      'Qualité de l\'image faible — extraction partielle',
    ],
    validated: false,
  },
  {
    id: 'inv-5',
    documentId: 'doc-5',
    documentName: 'facture_techplus_005.pdf',
    supplier: null, // Non détecté — à vérifier
    client: 'NOVA DISTRIBUTION SARL',
    invoiceNumber: null,
    invoiceDate: '2026-05-02',
    dueDate: '2026-06-02',
    description: 'Consulting',
    subtotal: 750000,
    tax: 135000,
    total: 885000,
    currency: 'FCFA',
    items: [
      { description: 'Audit et recommandations', quantity: 1, unitPrice: 750000, total: 750000 },
    ],
    confidence: 0.45,
    warnings: [
      'Fournisseur non identifiable — document partiellement illisible',
      'Numéro de facture absent',
      'Vérification manuelle recommandée',
    ],
    validated: false,
  },
];

export const DEMO_ANOMALIES: Anomaly[] = [
  {
    id: 'anomaly-1',
    type: 'unusual_amount',
    level: 'high',
    description: 'Montant inhabituellement élevé',
    detail: 'DEP-2001 — 3 450 000 FCFA (Services informatiques)',
    transactionId: 'DEP-2001',
    explanation: 'Cette opération est significativement supérieure aux autres opérations de la même catégorie sur la période analysée. La moyenne des dépenses en services informatiques est de 620 000 FCFA.',
    status: 'pending',
  },
  {
    id: 'anomaly-2',
    type: 'duplicate',
    level: 'moderate',
    description: 'Doublon détecté',
    detail: 'DEP-2002 — 175 000 FCFA enregistré deux fois le 12/03/2026',
    transactionId: 'DEP-2002',
    explanation: 'Deux opérations identiques (même référence, même montant, même date) ont été trouvées. Il peut s\'agir d\'une saisie en double.',
    status: 'pending',
  },
  {
    id: 'anomaly-3',
    type: 'unusual_date',
    level: 'moderate',
    description: 'Date incohérente',
    detail: 'DEP-2003 — Date du 30 février 2026 (date inexistante)',
    transactionId: 'DEP-2003',
    explanation: 'La date du 30 février n\'existe pas. Il s\'agit probablement d\'une erreur de saisie. Vérifier la date correcte.',
    status: 'pending',
  },
  {
    id: 'anomaly-4',
    type: 'missing_data',
    level: 'low',
    description: 'Descriptions manquantes',
    detail: '3 opérations sans description',
    explanation: 'Trois opérations ne contiennent aucune description. Cela rend le suivi et l\'audit plus difficiles.',
    status: 'pending',
  },
  {
    id: 'anomaly-5',
    type: 'deviation',
    level: 'low',
    description: 'Écart de catégorie',
    detail: 'Catégorie "Marketing" en hausse de 45% en mai',
    explanation: 'Les dépenses en marketing ont augmenté de 45% par rapport à la moyenne des mois précédents. Cette variation peut être justifiée mais mérite vérification.',
    status: 'pending',
  },
];

export const DEMO_CONVERSATIONS = [
  {
    id: 'conv-demo-1',
    title: 'Synthèse dossier NOVA DISTRIBUTION',
    clientId: 'demo-client-1',
    createdAt: new Date('2026-06-10'),
  },
  {
    id: 'conv-demo-2',
    title: 'Analyse factures mars 2026',
    clientId: 'demo-client-1',
    createdAt: new Date('2026-06-08'),
  },
];
