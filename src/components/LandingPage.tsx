// ============================================================
// KONTA — Landing Page v3
// Design bleu premium avec animations spectaculaires
// ============================================================

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, FileText, BarChart3, ShieldCheck,
  MessageSquare, Minus, Plus, Sparkles, Zap, CheckCircle2, Check,
  ChevronDown
} from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  // onEnter sera appelé pour naviguer vers /auth
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-slate-900 antialiased overflow-x-hidden">
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
// NAV — Bleu premium avec background toujours visible
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
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-blue-100 shadow-md shadow-blue-500/10"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-2.5"
          whileHover={{ scale: 1.05 }}
        >
          <motion.div 
            className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-white text-sm font-bold">K</span>
          </motion.div>
          <div>
            <span className="font-bold text-slate-900 tracking-tight">Konta</span>
            <span className="text-[10px] text-blue-500 ml-2 hidden sm:inline font-medium">by PrimeAxis</span>
          </div>
        </motion.div>

        <div className="hidden md:flex items-center gap-8 text-sm text-slate-600">
          <a href="#produit" className="hover:text-blue-600 transition-colors font-medium">Produit</a>
          <a href="#features" className="hover:text-blue-600 transition-colors font-medium">Fonctionnalités</a>
          <a href="#process" className="hover:text-blue-600 transition-colors font-medium">Processus</a>
        </div>

        <motion.button
          onClick={onEnter}
          whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59,130,246,0.3)' }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all cursor-pointer shadow-lg shadow-blue-500/30"
        >
          Ouvrir Konta
        </motion.button>
      </div>
    </motion.nav>
  );
}

// ============================================================
// HERO — Image de fond avec parallax et overlay bleu
// ============================================================
function Hero({ onEnter }: { onEnter: () => void }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 via-indigo-900/80 to-purple-900/85" />
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
            className="group flex items-center gap-3 px-8 py-4 bg-white text-blue-600 text-base font-semibold rounded-xl hover:bg-blue-50 transition-all cursor-pointer shadow-2xl"
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
// FLOATING ORBS — Orbes animés en arrière-plan
// ============================================================
function FloatingOrbs() {
  const orbs = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 300 + 100,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full bg-white/5 blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
          }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 60, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            delay: orb.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ============================================================
// IMAGE SHOWCASE — Galerie avec effets spectaculaires
// ============================================================
function ImageShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      title: 'Analyse de données',
      desc: 'Visualisez vos finances en temps réel',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      title: 'Rapports automatiques',
      desc: 'Générez des rapports professionnels en un clic',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      url: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&q=80',
      title: 'Contrôle intelligent',
      desc: 'Détectez les anomalies automatiquement',
      gradient: 'from-purple-500 to-pink-500'
    },
  ];

  return (
    <section ref={ref} className="py-32 md:py-40 px-6 md:px-10 bg-white relative">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">
            Puissant. Intuitif.
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Fiable.
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Découvrez comment Konta transforme votre façon de travailler
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 80, rotateY: -30 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ delay: i * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -20, scale: 1.05, transition: { duration: 0.4 } }}
              className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-2xl hover:shadow-blue-500/20"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <motion.img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.8 }}
                />
              </div>
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-t ${img.gradient} opacity-0 group-hover:opacity-90 transition-opacity duration-500`}
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-bold mb-3">{img.title}</h3>
                <p className="text-base text-white/90">{img.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CAPABILITIES — Cards avec effets 3D
// ============================================================
function Capabilities() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const capabilities = [
    {
      icon: <FileText size={28} />,
      title: 'Extraction de factures',
      desc: 'PDF, images, scans. Fournisseur, montants, dates, TVA — extraits automatiquement. Vous validez.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <BarChart3 size={28} />,
      title: 'Analyse de données',
      desc: 'Importez vos Excel et CSV. Calculs déterministes, graphiques, tendances. Pas d\'hallucination.',
      gradient: 'from-indigo-500 to-blue-500'
    },
    {
      icon: <ShieldCheck size={28} />,
      title: 'Contrôle intelligent',
      desc: 'Doublons, montants inhabituels, dates incohérentes, données manquantes. Détectés automatiquement.',
      gradient: 'from-purple-500 to-indigo-500'
    },
    {
      icon: <MessageSquare size={28} />,
      title: 'Assistant conversationnel',
      desc: 'Posez vos questions en langage naturel. KONTA comprend le contexte de vos documents.',
      gradient: 'from-pink-500 to-purple-500'
    },
  ];

  return (
    <section id="features" ref={ref} className="py-32 md:py-40 px-6 md:px-10 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Des outils puissants conçus pour les professionnels
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, rotateX: -30 }}
              animate={isInView ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.03, rotateY: 5, transition: { duration: 0.3 } }}
              className="group relative bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 border border-blue-100"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.8 }}
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cap.gradient} flex items-center justify-center text-white mb-8 shadow-xl`}
              >
                {cap.icon}
              </motion.div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{cap.title}</h3>
              <p className="text-lg text-slate-600 leading-relaxed">{cap.desc}</p>
              <motion.div
                className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${cap.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SPLIT SECTION — Avec animations spectaculaires
// ============================================================
function SplitSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="produit" ref={ref} className="py-32 md:py-40 px-6 md:px-10 bg-white">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -100, rotateY: -30 }}
          animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative">
            <motion.img 
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80"
              alt="Team working"
              className="rounded-3xl shadow-2xl"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 50 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8, type: 'spring' }}
              whileHover={{ scale: 1.1, y: -10 }}
              className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-8 shadow-2xl border border-blue-100"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center"
                >
                  <CheckCircle2 className="text-white" size={28} />
                </motion.div>
                <div>
                  <p className="text-3xl font-black text-slate-900">107</p>
                  <p className="text-sm text-slate-600 font-medium">Transactions analysées</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
            Un espace de travail,
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              pas un chatbot.
            </span>
          </h2>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            Déposez vos documents. Konta les lit, les comprend, et vous aide
            à travailler plus vite. Pas de prompt engineering. Pas de blabla.
          </p>
          <div className="space-y-5">
            {[
              'Extraction automatique des données',
              'Calculs déterministes sans hallucination',
              'Détection d\'anomalies en temps réel',
              'Rapports professionnels instantanés'
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 group"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg"
                >
                  <Check size={16} className="text-white" />
                </motion.div>
                <span className="text-lg text-slate-700 font-medium group-hover:text-blue-600 transition-colors">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// NUMBERS — Section bleue avec compteurs animés
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
    <section ref={ref} className="py-32 md:py-40 px-6 md:px-10 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, white 0%, transparent 50%)',
              'radial-gradient(circle at 80% 70%, white 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, white 0%, transparent 50%)',
              'radial-gradient(circle at 20% 30%, white 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0"
        />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            En chiffres
          </h2>
          <p className="text-xl text-white/80">
            Des résultats concrets et mesurables
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {numbers.map((num, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6, type: 'spring' }}
              whileHover={{ scale: 1.1, y: -10, transition: { duration: 0.3 } }}
              className="text-center p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
            >
              <motion.p
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: i * 0.15 + 0.3, duration: 0.8, type: 'spring', stiffness: 200 }}
                className="text-6xl md:text-7xl font-black mb-3 bg-gradient-to-br from-white to-blue-200 bg-clip-text text-transparent"
              >
                {num.value}
              </motion.p>
              <p className="text-lg text-white font-semibold">{num.label}</p>
              <p className="text-sm text-white/60 mt-2">{num.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PROCESS — Timeline avec animations spectaculaires
// ============================================================
function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    { num: '01', title: 'Déposez', desc: 'Glissez vos documents, factures, fichiers Excel dans Konta.', icon: <Zap size={24} /> },
    { num: '02', title: 'Analyse', desc: 'Extraction automatique. Calculs déterministes. Structuration des données.', icon: <BarChart3 size={24} /> },
    { num: '03', title: 'Contrôle', desc: 'Détection d\'anomalies. Doublons. Écarts. Éléments à vérifier.', icon: <ShieldCheck size={24} /> },
    { num: '04', title: 'Restitution', desc: 'Rapports, synthèses, emails. Prêts en quelques secondes.', icon: <FileText size={24} /> },
  ];

  return (
    <section id="process" ref={ref} className="py-32 md:py-40 px-6 md:px-10 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">
            Quatre étapes.
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Toujours les mêmes.
            </span>
          </h2>
          <p className="text-xl text-slate-600">
            Un processus simple et efficace
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 hidden md:block origin-top"
          />

          <div className="space-y-16">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100, rotateZ: i % 2 === 0 ? -5 : 5 }}
                animate={isInView ? { opacity: 1, x: 0, rotateZ: 0 } : {}}
                transition={{ delay: i * 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex items-center gap-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white rounded-3xl p-10 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 border border-blue-100"
                  >
                    <div className={`inline-flex items-center gap-4 mb-6 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xl"
                      >
                        {step.icon}
                      </motion.div>
                      <span className="text-sm text-blue-500 font-mono font-bold">{step.num}</span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-3">{step.title}</h3>
                    <p className="text-lg text-slate-600">{step.desc}</p>
                  </motion.div>
                </div>

                {/* Center dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: i * 0.3 + 0.5, duration: 0.5, type: 'spring' }}
                  className="hidden md:flex w-20 h-20 rounded-full bg-white border-4 border-blue-600 items-center justify-center shrink-0 shadow-2xl z-10"
                >
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                    className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600"
                  />
                </motion.div>

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
// TESTIMONIAL — Avec image de fond bleue
// ============================================================
function Testimonial() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-32 md:py-40 px-6 md:px-10 overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
          alt="Office"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-indigo-900/90 to-purple-900/90 backdrop-blur-sm" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.blockquote
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl font-black text-white leading-tight mb-10"
        >
          « Je lui donne mon travail,
          <br />
          pas juste une question. »
        </motion.blockquote>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-xl text-white/70 font-medium"
        >
          Le principe de Konta
        </motion.p>
      </div>
    </section>
  );
}

// ============================================================
// FAQ — Avec animations fluides
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
    <section ref={ref} className="py-32 md:py-40 px-6 md:px-10 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
            Questions fréquentes
          </h2>
        </motion.div>

        <div className="space-y-5">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-blue-100"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-8 text-left cursor-pointer hover:from-blue-100 hover:to-indigo-100 transition-all"
              >
                <span className="text-xl font-bold text-slate-900 pr-6">
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center"
                >
                  {open === i ? <Minus size={20} className="text-white" /> : <Plus size={20} className="text-white" />}
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-8 pb-8 text-lg text-slate-700 leading-relaxed">{faq.a}</p>
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
// FINAL CTA — Bleu spectaculaire
// ============================================================
function FinalCTA({ onEnter }: { onEnter: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 md:py-40 px-6 md:px-10 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white relative overflow-hidden">
      <FloatingOrbs />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl font-black mb-8"
        >
          Prêt à essayer ?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-xl text-white/80 mb-12"
        >
          Une démo complète est disponible. Aucune inscription requise.
        </motion.p>
        <motion.button
          onClick={onEnter}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.1, boxShadow: '0 30px 60px rgba(255,255,255,0.3)' }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-4 px-12 py-6 bg-white text-blue-600 text-xl font-black rounded-2xl hover:bg-blue-50 transition-all cursor-pointer shadow-2xl"
        >
          Ouvrir Konta
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowUpRight size={24} />
          </motion.div>
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
    <footer className="border-t border-blue-100 py-12 px-6 md:px-10 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white text-xs font-bold">K</span>
          </div>
          <span className="text-sm text-slate-700">
            <span className="font-bold text-slate-900">Konta</span> by PrimeAxis
          </span>
        </div>
        <p className="text-sm text-slate-600 text-center font-medium">
          Rendre autonome votre entreprise avec l'Intelligence Artificielle.
        </p>
        <p className="text-sm text-slate-500">© 2026 PrimeAxis</p>
      </div>
    </footer>
  );
}
