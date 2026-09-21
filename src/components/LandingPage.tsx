// ============================================================
// KONTA — Landing Page
// Design éditorial, premium, anti-cliché IA
// ============================================================

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, FileText, BarChart3, ShieldCheck,
  MessageSquare, Check, Minus, Plus
} from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  return (
    <div className="bg-stone-50 text-stone-900 antialiased">
      <Nav onEnter={onEnter} />
      <Hero onEnter={onEnter} />
      <Marquee />
      <ProductShowcase />
      <Capabilities />
      <Numbers />
      <Process />
      <Testimonial />
      <FAQ />
      <FinalCTA onEnter={onEnter} />
      <Footer />
    </div>
  );
}

// ============================================================
// NAV — Minimal, éditorial
// ============================================================
function Nav({ onEnter }: { onEnter: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-stone-50/90 backdrop-blur-md border-b border-stone-200/60' : ''
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-stone-900 rounded-md flex items-center justify-center">
            <span className="text-white text-[11px] font-bold tracking-tight">K</span>
          </div>
          <span className="font-semibold text-stone-900 tracking-tight">Konta</span>
          <span className="text-[11px] text-stone-400 font-medium hidden sm:inline">by PrimeAxis</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-[13px] text-stone-500">
          <a href="#produit" className="hover:text-stone-900 transition-colors">Produit</a>
          <a href="#capabilities" className="hover:text-stone-900 transition-colors">Fonctionnalités</a>
          <a href="#process" className="hover:text-stone-900 transition-colors">Comment ça marche</a>
        </div>

        <motion.button
          onClick={onEnter}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 bg-stone-900 text-white text-[13px] font-medium rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
        >
          Ouvrir Konta
        </motion.button>
      </div>
    </motion.nav>
  );
}

// ============================================================
// HERO — Typographie massive, pas de gradient, pas de glow
// ============================================================
function Hero({ onEnter }: { onEnter: () => void }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  return (
    <section ref={ref} className="relative pt-32 pb-20 md:pt-44 md:pb-32 px-6 md:px-10 overflow-hidden">
      <motion.div style={{ opacity, y }} className="max-w-[1400px] mx-auto">
        {/* Surtitle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="h-px w-8 bg-stone-300" />
          <span className="text-[13px] text-stone-500 font-medium tracking-wide">
            Pour les cabinets comptables
          </span>
        </motion.div>

        {/* Titre */}
        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.5rem,8vw,7rem)] font-semibold leading-[0.9] tracking-[-0.03em] text-stone-900"
          >
            Votre travail,<br />
            <span className="text-stone-400">accéléré.</span>
          </motion.h1>
        </div>

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-lg md:text-xl text-stone-500 max-w-xl leading-relaxed mb-12"
        >
          Konta lit vos factures, analyse vos fichiers Excel, détecte les anomalies
          et prépare vos rapports. Vous gardez le contrôle.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start gap-4"
        >
          <motion.button
            onClick={onEnter}
            whileHover={{ x: 4 }}
            className="group flex items-center gap-3 px-6 py-3.5 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Accéder au dashboard
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <span className="text-[13px] text-stone-400 self-center">
            Démo interactive incluse
          </span>
        </motion.div>
      </motion.div>

      {/* Ligne décorative fine */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 h-px bg-stone-200 origin-left"
      />
    </section>
  );
}

// ============================================================
// MARQUEE — Bandeau de confiance discret
// ============================================================
function Marquee() {
  const items = [
    'Extraction de factures',
    'Analyse Excel & CSV',
    'Détection d\'anomalies',
    'Rapports automatiques',
    'Assistant conversationnel',
    'Contrôle intelligent',
    'Synthèses client',
    'Emails professionnels',
  ];

  return (
    <div className="py-8 border-b border-stone-200 overflow-hidden">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="flex gap-12 whitespace-nowrap"
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-sm text-stone-400 font-medium flex items-center gap-12">
            {item}
            <span className="text-stone-300">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ============================================================
// PRODUCT SHOWCASE — Le produit en action, pas d'abstraction
// ============================================================
function ProductShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="produit" ref={ref} className="py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-[13px] text-stone-400 font-medium uppercase tracking-wider mb-4"
          >
            Le produit
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl md:text-4xl font-semibold tracking-tight text-stone-900 mb-4"
          >
            Un espace de travail,<br />pas un chatbot.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-stone-500 text-lg leading-relaxed"
          >
            Déposez vos documents. Konta les lit, les comprend, et vous aide
            à travailler plus vite. Pas de prompt engineering. Pas de blabla.
          </motion.p>
        </div>

        {/* Product mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl border border-stone-200 bg-white shadow-sm overflow-hidden"
        >
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-stone-100 bg-stone-50/50">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-stone-200" />
              <div className="w-2.5 h-2.5 rounded-full bg-stone-200" />
              <div className="w-2.5 h-2.5 rounded-full bg-stone-200" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-[11px] text-stone-400 font-medium">konta.app</span>
            </div>
          </div>

          {/* App content */}
          <div className="flex min-h-[400px] md:min-h-[500px]">
            {/* Sidebar mock */}
            <div className="hidden md:block w-56 border-r border-stone-100 p-4 bg-stone-50/30">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-stone-900 rounded flex items-center justify-center">
                  <span className="text-white text-[8px] font-bold">K</span>
                </div>
                <span className="text-xs font-semibold text-stone-700">Konta</span>
              </div>
              {['Accueil', 'Assistant', 'Documents', 'Factures', 'Analyse', 'Contrôle'].map((item, i) => (
                <div
                  key={i}
                  className={`px-3 py-2 rounded-md text-xs mb-0.5 ${
                    i === 1 ? 'bg-stone-900 text-white font-medium' : 'text-stone-500'
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Main area */}
            <div className="flex-1 p-6 md:p-8">
              <div className="mb-6">
                <p className="text-xs text-stone-400 mb-1">NOVA DISTRIBUTION SARL</p>
                <h3 className="text-base font-semibold text-stone-800">Synthèse du dossier</h3>
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                  { label: 'Documents', value: '7' },
                  { label: 'Transactions', value: '107' },
                  { label: 'Revenus', value: '38.2M' },
                  { label: 'À vérifier', value: '5', highlight: true },
                ].map((kpi, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className={`p-3 rounded-lg border ${
                      kpi.highlight ? 'border-amber-200 bg-amber-50/50' : 'border-stone-100 bg-stone-50/50'
                    }`}
                  >
                    <p className="text-[10px] text-stone-400 uppercase tracking-wide">{kpi.label}</p>
                    <p className={`text-lg font-semibold ${kpi.highlight ? 'text-amber-700' : 'text-stone-800'}`}>
                      {kpi.value}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Chat mock */}
              <div className="rounded-lg border border-stone-100 bg-stone-50/30 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded bg-stone-900 flex items-center justify-center">
                    <span className="text-white text-[7px] font-bold">K</span>
                  </div>
                  <span className="text-[11px] text-stone-500 font-medium">Konta</span>
                </div>
                <div className="text-sm text-stone-600 leading-relaxed space-y-2">
                  <p><strong className="text-stone-800">5 éléments</strong> nécessitent votre attention.</p>
                  <p className="text-stone-500 text-xs">
                    Le plus critique : une opération de 3 450 000 FCFA en services informatiques,
                    significativement supérieure à la moyenne de sa catégorie.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// CAPABILITIES — Liste éditoriale, pas de cards flashy
// ============================================================
function Capabilities() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const capabilities = [
    {
      icon: <FileText size={18} />,
      title: 'Extraction de factures',
      desc: 'PDF, images, scans. Fournisseur, montants, dates, TVA — extraits automatiquement. Vous validez.',
    },
    {
      icon: <BarChart3 size={18} />,
      title: 'Analyse de données',
      desc: 'Importez vos Excel et CSV. Calculs déterministes, graphiques, tendances. Pas d\'hallucination.',
    },
    {
      icon: <ShieldCheck size={18} />,
      title: 'Contrôle intelligent',
      desc: 'Doublons, montants inhabituels, dates incohérentes, données manquantes. Détectés automatiquement.',
    },
    {
      icon: <MessageSquare size={18} />,
      title: 'Assistant conversationnel',
      desc: 'Posez vos questions en langage naturel. KONTA comprend le contexte de vos documents.',
    },
  ];

  return (
    <section id="capabilities" ref={ref} className="py-24 md:py-32 px-6 md:px-10 border-t border-stone-200">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-12 gap-12">
          {/* Left — sticky header */}
          <div className="md:col-span-4">
            <div className="md:sticky md:top-24">
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                className="text-[13px] text-stone-400 font-medium uppercase tracking-wider mb-4"
              >
                Fonctionnalités
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-semibold tracking-tight text-stone-900"
              >
                Ce que Konta<br />fait pour vous.
              </motion.h2>
            </div>
          </div>

          {/* Right — list */}
          <div className="md:col-span-8">
            <div className="divide-y divide-stone-200">
              {capabilities.map((cap, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="py-8 first:pt-0 group"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600 shrink-0 group-hover:bg-stone-900 group-hover:text-white transition-colors duration-300">
                      {cap.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-stone-900 mb-1.5">{cap.title}</h3>
                      <p className="text-stone-500 leading-relaxed">{cap.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// NUMBERS — Chiffres concrets, pas de bullshit
// ============================================================
function Numbers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const numbers = [
    { value: '107', label: 'transactions analysées', sub: 'en une seule fois' },
    { value: '< 3s', label: 'extraction d\'une facture', sub: 'PDF ou image' },
    { value: '0', label: 'hallucination', sub: 'calculs déterministes' },
    { value: '5', label: 'scénarios démo', sub: 'prêts à présenter' },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-10 bg-stone-900 text-white">
      <div className="max-w-[1400px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-[13px] text-stone-500 font-medium uppercase tracking-wider mb-12"
        >
          En chiffres
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {numbers.map((num, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <p className="text-4xl md:text-5xl font-semibold tracking-tight mb-2">{num.value}</p>
              <p className="text-sm text-stone-300">{num.label}</p>
              <p className="text-xs text-stone-500 mt-1">{num.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PROCESS — Timeline sobre
// ============================================================
function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    { num: '01', title: 'Déposez', desc: 'Glissez vos documents, factures, fichiers Excel dans Konta.' },
    { num: '02', title: 'Analyse', desc: 'Extraction automatique. Calculs déterministes. Structuration des données.' },
    { num: '03', title: 'Contrôle', desc: 'Détection d\'anomalies. Doublons. Écarts. Éléments à vérifier.' },
    { num: '04', title: 'Restitution', desc: 'Rapports, synthèses, emails. Prêts en quelques secondes.' },
  ];

  return (
    <section id="process" ref={ref} className="py-24 md:py-32 px-6 md:px-10 border-t border-stone-200">
      <div className="max-w-[1400px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-[13px] text-stone-400 font-medium uppercase tracking-wider mb-4"
        >
          Processus
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-semibold tracking-tight text-stone-900 mb-16 max-w-xl"
        >
          Quatre étapes.<br />Toujours les mêmes.
        </motion.h2>

        <div className="grid md:grid-cols-4 gap-px bg-stone-200 rounded-2xl overflow-hidden border border-stone-200">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-stone-50 p-8 hover:bg-white transition-colors duration-300"
            >
              <span className="text-xs text-stone-400 font-mono">{step.num}</span>
              <h3 className="text-lg font-semibold text-stone-900 mt-4 mb-2">{step.title}</h3>
              <p className="text-sm text-stone-500 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TESTIMONIAL — Citation éditoriale
// ============================================================
function Testimonial() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-10 border-t border-stone-200">
      <div className="max-w-3xl mx-auto text-center">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-medium text-stone-800 leading-snug tracking-tight mb-8"
        >
          « Je lui donne mon travail,<br />
          pas juste une question. »
        </motion.blockquote>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="text-sm text-stone-400"
        >
          Le principe de Konta
        </motion.p>
      </div>
    </section>
  );
}

// ============================================================
// FAQ — Accordéon sobre
// ============================================================
function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Konta invente-t-il des données ?',
      a: 'Non. Les calculs sont déterministes (sommes, moyennes, détections). L\'interprétation est clairement distinguée des faits. Si une information n\'est pas dans le document, Konta l\'indique.',
    },
    {
      q: 'Mes données sont-elles sécurisées ?',
      a: 'Les documents sont chiffrés. L\'isolation entre cabinets est garantie au niveau base de données (RLS). L\'API OpenAI est appelée uniquement côté serveur.',
    },
    {
      q: 'Quels formats sont supportés ?',
      a: 'PDF, images (PNG, JPG), Excel (XLSX, XLS), CSV, TXT. Les factures sont extraites automatiquement. Les données sont analysées avec des calculs précis.',
    },
    {
      q: 'Puis-je utiliser Konta pour une présentation ?',
      a: 'Oui. Un mode démo complet est intégré avec des données fictives cohérentes (NOVA DISTRIBUTION SARL). 5 scénarios sont prêts à être présentés.',
    },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-10 border-t border-stone-200">
      <div className="max-w-2xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-[13px] text-stone-400 font-medium uppercase tracking-wider mb-4 text-center"
        >
          Questions
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl font-semibold tracking-tight text-stone-900 mb-12 text-center"
        >
          Ce qu'on nous demande.
        </motion.h2>

        <div className="divide-y divide-stone-200">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.05 }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
              >
                <span className="text-[15px] font-medium text-stone-800 group-hover:text-stone-900 pr-4">
                  {faq.q}
                </span>
                <span className="shrink-0 text-stone-400">
                  {open === i ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-stone-500 leading-relaxed pb-5">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FINAL CTA
// ============================================================
function FinalCTA({ onEnter }: { onEnter: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-10 border-t border-stone-200">
      <div className="max-w-2xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-semibold tracking-tight text-stone-900 mb-4"
        >
          Prêt à essayer ?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-stone-500 mb-8"
        >
          Une démo complète est disponible. Aucune inscription requise.
        </motion.p>
        <motion.button
          onClick={onEnter}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
        >
          Ouvrir Konta
          <ArrowUpRight size={16} />
        </motion.button>
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  return (
    <footer className="border-t border-stone-200 py-10 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-stone-900 rounded flex items-center justify-center">
            <span className="text-white text-[8px] font-bold">K</span>
          </div>
          <span className="text-sm text-stone-500">
            <span className="text-stone-800 font-medium">Konta</span> by PrimeAxis
          </span>
        </div>
        <p className="text-xs text-stone-400 text-center">
          Rendre autonome votre entreprise avec l'Intelligence Artificielle.
        </p>
        <p className="text-xs text-stone-400">© 2026 PrimeAxis</p>
      </div>
    </footer>
  );
}
