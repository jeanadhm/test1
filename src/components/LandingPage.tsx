// ============================================================
// KONTA — Landing Page
// Animations Framer Motion avancées
// ============================================================

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Sparkles, FileText, BarChart3, ShieldCheck, MessageSquare,
  Zap, ChevronDown, Play, Check, Star, ArrowUpRight, MousePointer2
} from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <div ref={containerRef} className="bg-[#0a0f1c] text-white overflow-x-hidden">
      {/* Custom cursor glow */}
      <div
        className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-50 opacity-20 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 70%)',
          left: mousePos.x - 250,
          top: mousePos.y - 250,
          transition: 'left 0.1s ease-out, top 0.1s ease-out',
        }}
      />

      {/* Navigation */}
      <Nav onEnter={onEnter} />

      {/* Hero */}
      <Hero onEnter={onEnter} />

      {/* Problem Section */}
      <ProblemSection />

      {/* Features Bento */}
      <FeaturesBento />

      {/* How it works */}
      <HowItWorks />

      {/* Stats */}
      <StatsSection />

      {/* Demo Preview */}
      <DemoPreview onEnter={onEnter} />

      {/* Final CTA */}
      <FinalCTA onEnter={onEnter} />

      {/* Footer */}
      <Footer />
    </div>
  );
}

// ============================================================
// NAVIGATION
// ============================================================
function Nav({ onEnter }: { onEnter: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#0a0f1c]/80 backdrop-blur-xl border-b border-white/5' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-white font-bold text-sm">K</span>
          </div>
          <div>
            <span className="text-base font-bold tracking-tight">KONTA</span>
            <span className="text-[10px] text-slate-500 ml-2 uppercase tracking-widest">by PrimeAxis</span>
          </div>
        </motion.div>

        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">Fonctionnalités</a>
          <a href="#how" className="hover:text-white transition-colors">Comment ça marche</a>
          <a href="#demo" className="hover:text-white transition-colors">Démo</a>
        </div>

        <motion.button
          onClick={onEnter}
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(37,99,235,0.3)' }}
          whileTap={{ scale: 0.95 }}
          className="px-5 py-2.5 rounded-full bg-white text-[#0a0f1c] text-sm font-semibold hover:bg-blue-50 transition-colors cursor-pointer"
        >
          Accéder à KONTA
        </motion.button>
      </div>
    </motion.nav>
  );
}

// ============================================================
// HERO — Cinetic Typography + Aurora
// ============================================================
function Hero({ onEnter }: { onEnter: () => void }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const titleWords = ['L\'assistant', 'IA', 'des', 'cabinets', 'comptables'];

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#0a0f1c]" />
        <motion.div
          animate={{
            background: [
              'radial-gradient(ellipse 80% 50% at 20% 40%, rgba(37,99,235,0.15) 0%, transparent 50%)',
              'radial-gradient(ellipse 80% 50% at 80% 60%, rgba(37,99,235,0.15) 0%, transparent 50%)',
              'radial-gradient(ellipse 80% 50% at 50% 30%, rgba(99,102,241,0.15) 0%, transparent 50%)',
              'radial-gradient(ellipse 80% 50% at 20% 40%, rgba(37,99,235,0.15) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        />
        <motion.div
          animate={{
            background: [
              'radial-gradient(ellipse 60% 40% at 70% 70%, rgba(59,130,246,0.1) 0%, transparent 50%)',
              'radial-gradient(ellipse 60% 40% at 30% 30%, rgba(59,130,246,0.1) 0%, transparent 50%)',
              'radial-gradient(ellipse 60% 40% at 60% 50%, rgba(139,92,246,0.1) 0%, transparent 50%)',
              'radial-gradient(ellipse 60% 40% at 70% 70%, rgba(59,130,246,0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating particles */}
      <FloatingParticles />

      {/* Content */}
      <motion.div style={{ y, opacity, scale }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
        >
          <Sparkles size={14} className="text-blue-400" />
          <span className="text-xs text-slate-300 font-medium">Intelligence artificielle pour experts-comptables</span>
        </motion.div>

        {/* Title — Cinetic Typography */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-8">
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 80, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                delay: 0.5 + i * 0.1,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block mr-4 origin-bottom"
            >
              {word === 'IA' ? (
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  {word}
                </span>
              ) : (
                <span>{word}</span>
              )}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Déposez vos documents, factures et fichiers Excel.
          <br />
          <span className="text-slate-300">Konta analyse, extrait, contrôle et synthétise.</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={onEnter}
            whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(37,99,235,0.4)' }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-base overflow-hidden cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              Accéder au dashboard
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-4 rounded-full border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/5 transition-colors cursor-pointer"
          >
            <Play size={14} className="text-blue-400" />
            Voir la démo
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={20} className="text-slate-500" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Decorative lines */}
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-20 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1440 128">
          <motion.path
            d="M0,64 C360,128 720,0 1080,64 C1260,96 1380,80 1440,64"
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 1 }}
          />
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}

// ============================================================
// FLOATING PARTICLES
// ============================================================
function FloatingParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-blue-400/30"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ============================================================
// PROBLEM SECTION
// ============================================================
function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const problems = [
    'Des heures perdues à saisir manuellement des données',
    'Des factures à extraire une par une',
    'Des anomalies détectées trop tard',
    'Des rapports qui prennent des jours',
  ];

  return (
    <section ref={ref} className="py-32 px-6 relative">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-sm uppercase tracking-widest text-blue-400 font-medium mb-6"
        >
          Le problème
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-5xl font-bold text-white mb-12 leading-tight"
        >
          La comptabilité mérite
          <br />
          <span className="text-slate-500">mieux que des tableurs.</span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5"
            >
              <div className="w-2 h-2 rounded-full bg-red-400/60 shrink-0" />
              <span className="text-sm text-slate-400 text-left">{problem}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16"
        >
          <p className="text-xl md:text-2xl text-white font-medium">
            <span className="text-blue-400">Konta</span> change la donne.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// FEATURES BENTO GRID
// ============================================================
function FeaturesBento() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const features = [
    {
      icon: <FileText size={24} />,
      title: 'Extraction de factures',
      desc: 'PDF, images, scans. KONTA extrait fournisseur, montants, dates, TVA automatiquement.',
      size: 'large',
      gradient: 'from-blue-500/10 to-transparent',
    },
    {
      icon: <BarChart3 size={24} />,
      title: 'Analyse Excel & CSV',
      desc: 'Importez vos fichiers. Calculs déterministes, graphiques, tendances.',
      size: 'medium',
      gradient: 'from-emerald-500/10 to-transparent',
    },
    {
      icon: <ShieldCheck size={24} />,
      title: 'Contrôle intelligent',
      desc: 'Détection de doublons, montants inhabituels, dates incohérentes.',
      size: 'medium',
      gradient: 'from-amber-500/10 to-transparent',
    },
    {
      icon: <MessageSquare size={24} />,
      title: 'Assistant conversationnel',
      desc: 'Posez vos questions en langage naturel. KONTA comprend le contexte.',
      size: 'large',
      gradient: 'from-purple-500/10 to-transparent',
    },
    {
      icon: <Zap size={24} />,
      title: 'Rapports instantanés',
      desc: 'Synthèses, emails, rapports professionnels en un clic.',
      size: 'full',
      gradient: 'from-indigo-500/10 to-transparent',
    },
  ];

  return (
    <section id="features" ref={ref} className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-widest text-blue-400 font-medium mb-4">Fonctionnalités</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Tout ce dont votre cabinet a besoin.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 overflow-hidden cursor-default ${
                feature.size === 'large' ? 'md:col-span-2' : ''
              } ${feature.size === 'full' ? 'md:col-span-3' : ''}`}
            >
              {/* Gradient bg on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>

              {/* Corner glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// HOW IT WORKS
// ============================================================
function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    { num: '01', title: 'Déposez', desc: 'Glissez vos documents, factures, fichiers Excel dans KONTA.' },
    { num: '02', title: 'Analyse', desc: 'KONTA lit, extrait et structure automatiquement les informations.' },
    { num: '03', title: 'Contrôle', desc: 'Détection d\'anomalies, doublons, éléments inhabituels.' },
    { num: '04', title: 'Action', desc: 'Rapports, emails, synthèses — prêts en quelques secondes.' },
  ];

  return (
    <section id="how" ref={ref} className="py-32 px-6 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent" />

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <p className="text-sm uppercase tracking-widest text-blue-400 font-medium mb-4">Comment ça marche</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Simple. Rapide. Fiable.
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/20 via-blue-500/40 to-blue-500/20 hidden sm:block" />

          <div className="space-y-16">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                className={`flex items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <span className="text-5xl font-bold text-white/5">{step.num}</span>
                  <h3 className="text-xl font-bold text-white mt-2">{step.title}</h3>
                  <p className="text-slate-400 mt-2">{step.desc}</p>
                </div>

                {/* Center dot */}
                <div className="hidden sm:flex w-16 h-16 rounded-full bg-[#0a0f1c] border border-blue-500/30 items-center justify-center shrink-0">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                    className="w-3 h-3 rounded-full bg-blue-500"
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
// STATS SECTION
// ============================================================
function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { value: 10, suffix: 'x', label: 'Plus rapide', desc: 'que la saisie manuelle' },
    { value: 99, suffix: '%', label: 'Précision', desc: 'sur les extractions' },
    { value: 0, suffix: '', label: 'Hallucination', desc: 'calculs déterministes' },
    { value: 100, suffix: '%', label: 'Confidentiel', desc: 'données chiffrées' },
  ];

  return (
    <section ref={ref} className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {isInView && <Counter target={stat.value} />}
                <span className="text-blue-400">{stat.suffix}</span>
              </div>
              <p className="text-sm font-medium text-white">{stat.label}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (target === 0) { setCount(0); return; }
    let start = 0;
    const duration = 1500;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target]);

  return <>{count}</>;
}

// ============================================================
// DEMO PREVIEW
// ============================================================
function DemoPreview({ onEnter }: { onEnter: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="demo" ref={ref} className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.03] to-transparent" />

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-widest text-blue-400 font-medium mb-4">Démo interactive</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Voyez KONTA en action.
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Un dossier complet analysé en quelques secondes. Factures, transactions, contrôles, rapports.
          </p>
        </motion.div>

        {/* Mock interface */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl border border-white/10 bg-[#0d1321] overflow-hidden shadow-2xl shadow-blue-500/5"
        >
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
            <span className="ml-4 text-xs text-slate-500">konta.app — NOVA DISTRIBUTION SARL</span>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <MockCard label="Documents" value="7" delay={0.5} inView={isInView} />
              <MockCard label="Transactions" value="107" delay={0.7} inView={isInView} />
              <MockCard label="À vérifier" value="5" delay={0.9} inView={isInView} highlight />
            </div>

            {/* Chat preview */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2 }}
              className="rounded-xl bg-white/[0.03] border border-white/5 p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center">
                  <span className="text-[8px] font-bold text-blue-400">K</span>
                </div>
                <span className="text-xs text-slate-400">KONTA</span>
              </div>
              <TypewriterText
                text="5 éléments nécessitent votre attention. Le plus critique : une opération de 3 450 000 FCFA, 5x supérieure à la moyenne de sa catégorie."
                delay={1.5}
                inView={isInView}
              />
            </motion.div>
          </div>

          {/* Glow effect */}
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-96 h-40 bg-blue-500/10 blur-3xl rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2 }}
          className="text-center mt-8"
        >
          <motion.button
            onClick={onEnter}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm text-white font-medium hover:bg-white/10 transition-colors cursor-pointer"
          >
            <ArrowUpRight size={16} />
            Essayer maintenant
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

function MockCard({ label, value, delay, inView, highlight }: { label: string; value: string; delay: number; inView: boolean; highlight?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
      className={`p-4 rounded-xl border ${highlight ? 'bg-amber-500/5 border-amber-500/20' : 'bg-white/[0.02] border-white/5'}`}
    >
      <p className="text-xs text-slate-500">{label}</p>
      <p className={`text-2xl font-bold ${highlight ? 'text-amber-400' : 'text-white'}`}>{value}</p>
    </motion.div>
  );
}

function TypewriterText({ text, delay, inView }: { text: string; delay: number; inView: boolean }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (!inView) return;
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i <= text.length) {
          setDisplayed(text.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 20);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [inView, delay, text]);

  return <p className="text-sm text-slate-300 leading-relaxed">{displayed}<span className="animate-pulse">|</span></p>;
}

// ============================================================
// FINAL CTA
// ============================================================
function FinalCTA({ onEnter }: { onEnter: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-12 md:p-16 overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full" />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Prêt à transformer
                <br />
                votre cabinet ?
              </h2>
              <p className="text-slate-400 mb-8 max-w-md mx-auto">
                Rejoignez les cabinets comptables qui utilisent KONTA pour gagner du temps et fiabiliser leur travail.
              </p>
            </motion.div>

            <motion.button
              onClick={onEnter}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(37,99,235,0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-base cursor-pointer inline-flex items-center gap-2"
            >
              Accéder à KONTA
              <ArrowRight size={18} />
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="flex items-center justify-center gap-6 mt-8 text-xs text-slate-500"
            >
              <span className="flex items-center gap-1"><Check size={12} className="text-emerald-400" /> Gratuit</span>
              <span className="flex items-center gap-1"><Check size={12} className="text-emerald-400" /> Sans engagement</span>
              <span className="flex items-center gap-1"><Check size={12} className="text-emerald-400" /> Données sécurisées</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
            <span className="text-white font-bold text-[10px]">K</span>
          </div>
          <span className="text-sm text-slate-400">
            <span className="text-white font-semibold">KONTA</span> by PrimeAxis
          </span>
        </div>
        <p className="text-xs text-slate-600 text-center">
          Rendre autonome votre entreprise avec l'Intelligence Artificielle.
        </p>
        <div className="flex items-center gap-1 text-xs text-slate-600">
          <Star size={10} className="text-blue-400" />
          <span>© 2026 PrimeAxis</span>
        </div>
      </div>
    </footer>
  );
}
