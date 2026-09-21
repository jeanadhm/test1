// ============================================================
// KONTA — Landing Page v2
// Design premium avec images et animations avancées
// ============================================================

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, FileText, BarChart3, ShieldCheck,
  MessageSquare, Minus, Plus, Sparkles, Zap, CheckCircle2, Check
} from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  return (
    <div className="bg-stone-50 text-stone-900 antialiased overflow-x-hidden">
      <Nav onEnter={onEnter} />
      <Hero onEnter={onEnter} />
      <ImageShowcase />
      <Capabilities />
      <SplitSection />
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
// NAV
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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-stone-200/60 shadow-sm' : ''
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-2.5"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-8 h-8 bg-stone-900 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white text-xs font-bold">K</span>
          </div>
          <div>
            <span className="font-bold text-stone-900 tracking-tight">Konta</span>
            <span className="text-[10px] text-stone-400 ml-2 hidden sm:inline">by PrimeAxis</span>
          </div>
        </motion.div>

        <div className="hidden md:flex items-center gap-8 text-sm text-stone-600">
          <a href="#produit" className="hover:text-stone-900 transition-colors">Produit</a>
          <a href="#features" className="hover:text-stone-900 transition-colors">Fonctionnalités</a>
          <a href="#process" className="hover:text-stone-900 transition-colors">Processus</a>
        </div>

        <motion.button
          onClick={onEnter}
          whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}
          whileTap={{ scale: 0.95 }}
          className="px-5 py-2.5 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-all cursor-pointer shadow-md"
        >
          Ouvrir Konta
        </motion.button>
      </div>
    </motion.nav>
  );
}

// ============================================================
// HERO — Avec image de fond et parallax
// ============================================================
function Hero({ onEnter }: { onEnter: () => void }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80"
          alt="Office desk"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 via-stone-900/60 to-stone-50" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
        >
          <Sparkles size={14} className="text-amber-300" />
          <span className="text-sm text-white/90 font-medium">Pour les cabinets comptables</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tight mb-6"
        >
          Votre travail,
          <br />
          <span className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
            accéléré.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Konta lit vos factures, analyse vos fichiers Excel, détecte les anomalies
          et prépare vos rapports. Vous gardez le contrôle.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={onEnter}
            whileHover={{ scale: 1.05, boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-3 px-8 py-4 bg-white text-stone-900 text-base font-semibold rounded-xl hover:bg-stone-50 transition-all cursor-pointer shadow-2xl"
          >
            Accéder au dashboard
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <span className="text-sm text-white/60">
            Démo interactive incluse
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-white/60 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================
// IMAGE SHOWCASE — Galerie avec hover effects
// ============================================================
function ImageShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      title: 'Analyse de données',
      desc: 'Visualisez vos finances en temps réel'
    },
    {
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      title: 'Rapports automatiques',
      desc: 'Générez des rapports professionnels en un clic'
    },
    {
      url: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&q=80',
      title: 'Contrôle intelligent',
      desc: 'Détectez les anomalies automatiquement'
    },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-10 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-stone-900 mb-4">
            Puissant. Intuitif. Fiable.
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Découvrez comment Konta transforme votre façon de travailler
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <motion.img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-2">{img.title}</h3>
                <p className="text-sm text-white/80">{img.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CAPABILITIES — Avec icônes animées
// ============================================================
function Capabilities() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const capabilities = [
    {
      icon: <FileText size={24} />,
      title: 'Extraction de factures',
      desc: 'PDF, images, scans. Fournisseur, montants, dates, TVA — extraits automatiquement. Vous validez.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <BarChart3 size={24} />,
      title: 'Analyse de données',
      desc: 'Importez vos Excel et CSV. Calculs déterministes, graphiques, tendances. Pas d\'hallucination.',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: <ShieldCheck size={24} />,
      title: 'Contrôle intelligent',
      desc: 'Doublons, montants inhabituels, dates incohérentes, données manquantes. Détectés automatiquement.',
      color: 'from-amber-500 to-amber-600'
    },
    {
      icon: <MessageSquare size={24} />,
      title: 'Assistant conversationnel',
      desc: 'Posez vos questions en langage naturel. KONTA comprend le contexte de vos documents.',
      color: 'from-purple-500 to-purple-600'
    },
  ];

  return (
    <section id="features" ref={ref} className="py-24 md:py-32 px-6 md:px-10 bg-stone-50">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-stone-900 mb-4">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Des outils puissants conçus pour les professionnels
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cap.color} flex items-center justify-center text-white mb-6 shadow-lg`}
              >
                {cap.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">{cap.title}</h3>
              <p className="text-stone-600 leading-relaxed">{cap.desc}</p>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-stone-100 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SPLIT SECTION — Image + Texte
// ============================================================
function SplitSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="produit" ref={ref} className="py-24 md:py-32 px-6 md:px-10 bg-white">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80"
              alt="Team working"
              className="rounded-2xl shadow-2xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -bottom-6 -right-6 bg-white rounded-xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="text-emerald-600" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-stone-900">107</p>
                  <p className="text-sm text-stone-600">Transactions analysées</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6 leading-tight">
            Un espace de travail,<br />pas un chatbot.
          </h2>
          <p className="text-lg text-stone-600 mb-8 leading-relaxed">
            Déposez vos documents. Konta les lit, les comprend, et vous aide
            à travailler plus vite. Pas de prompt engineering. Pas de blabla.
          </p>
          <div className="space-y-4">
            {[
              'Extraction automatique des données',
              'Calculs déterministes sans hallucination',
              'Détection d\'anomalies en temps réel',
              'Rapports professionnels instantanés'
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-stone-900 flex items-center justify-center flex-shrink-0">
                  <Check size={14} className="text-white" />
                </div>
                <span className="text-stone-700">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// NUMBERS — Section sombre avec compteurs
// ============================================================
function Numbers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const numbers = [
    { value: '10x', label: 'Plus rapide', sub: 'que la saisie manuelle' },
    { value: '99%', label: 'Précision', sub: 'sur les extractions' },
    { value: '0', label: 'Hallucination', sub: 'calculs déterministes' },
    { value: '5', label: 'Scénarios démo', sub: 'prêts à présenter' },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-10 bg-stone-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            En chiffres
          </h2>
          <p className="text-lg text-stone-400">
            Des résultats concrets et mesurables
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {numbers.map((num, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <motion.p
                initial={{ scale: 0.5 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: i * 0.1 + 0.3, duration: 0.5, type: 'spring' }}
                className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-br from-white to-stone-400 bg-clip-text text-transparent"
              >
                {num.value}
              </motion.p>
              <p className="text-base text-stone-300 font-medium">{num.label}</p>
              <p className="text-xs text-stone-500 mt-1">{num.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PROCESS — Timeline animée
// ============================================================
function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    { num: '01', title: 'Déposez', desc: 'Glissez vos documents, factures, fichiers Excel dans Konta.', icon: <Zap size={20} /> },
    { num: '02', title: 'Analyse', desc: 'Extraction automatique. Calculs déterministes. Structuration des données.', icon: <BarChart3 size={20} /> },
    { num: '03', title: 'Contrôle', desc: 'Détection d\'anomalies. Doublons. Écarts. Éléments à vérifier.', icon: <ShieldCheck size={20} /> },
    { num: '04', title: 'Restitution', desc: 'Rapports, synthèses, emails. Prêts en quelques secondes.', icon: <FileText size={20} /> },
  ];

  return (
    <section id="process" ref={ref} className="py-24 md:py-32 px-6 md:px-10 bg-stone-50">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-stone-900 mb-4">
            Quatre étapes. Toujours les mêmes.
          </h2>
          <p className="text-lg text-stone-600">
            Un processus simple et efficace
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-stone-300 via-stone-400 to-stone-300 hidden md:block" />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className={`relative flex items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                    <div className={`inline-flex items-center gap-3 mb-4 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      <div className="w-12 h-12 rounded-xl bg-stone-900 flex items-center justify-center text-white">
                        {step.icon}
                      </div>
                      <span className="text-xs text-stone-400 font-mono">{step.num}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-stone-900 mb-2">{step.title}</h3>
                    <p className="text-stone-600">{step.desc}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex w-16 h-16 rounded-full bg-white border-4 border-stone-900 items-center justify-center shrink-0 shadow-lg z-10">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                    className="w-4 h-4 rounded-full bg-stone-900"
                  />
                </div>

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TESTIMONIAL — Avec image de fond
// ============================================================
function Testimonial() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-24 md:py-32 px-6 md:px-10 overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
          alt="Office"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-900/80 backdrop-blur-sm" />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-4xl font-medium text-white leading-snug mb-8"
        >
          « Je lui donne mon travail,
          <br />
          pas juste une question. »
        </motion.blockquote>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="text-lg text-white/60"
        >
          Le principe de Konta
        </motion.p>
      </div>
    </section>
  );
}

// ============================================================
// FAQ
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
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-10 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
            Questions fréquentes
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="bg-stone-50 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left cursor-pointer hover:bg-stone-100 transition-colors"
              >
                <span className="text-lg font-medium text-stone-900 pr-4">
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0"
                >
                  {open === i ? <Minus size={20} /> : <Plus size={20} />}
                </motion.div>
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
                    <p className="px-6 pb-6 text-stone-600 leading-relaxed">{faq.a}</p>
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
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-10 bg-stone-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-5xl font-bold mb-6"
        >
          Prêt à essayer ?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-lg text-stone-400 mb-10"
        >
          Une démo complète est disponible. Aucune inscription requise.
        </motion.p>
        <motion.button
          onClick={onEnter}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05, boxShadow: '0 20px 50px rgba(255,255,255,0.2)' }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 px-8 py-4 bg-white text-stone-900 text-lg font-semibold rounded-xl hover:bg-stone-50 transition-all cursor-pointer shadow-2xl"
        >
          Ouvrir Konta
          <ArrowUpRight size={20} />
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
    <footer className="border-t border-stone-200 py-10 px-6 md:px-10 bg-white">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-stone-900 rounded flex items-center justify-center">
            <span className="text-white text-[9px] font-bold">K</span>
          </div>
          <span className="text-sm text-stone-600">
            <span className="font-semibold text-stone-900">Konta</span> by PrimeAxis
          </span>
        </div>
        <p className="text-xs text-stone-500 text-center">
          Rendre autonome votre entreprise avec l'Intelligence Artificielle.
        </p>
        <p className="text-xs text-stone-500">© 2026 PrimeAxis</p>
      </div>
    </footer>
  );
}
