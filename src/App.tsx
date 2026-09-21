import { useState, useEffect } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [installed, setInstalled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate installation progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setInstalled(true);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-md bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-lg shadow-lg shadow-purple-500/30">
              UI
            </div>
            <div>
              <h1 className="text-lg font-bold">UI UX Pro Max</h1>
              <p className="text-xs text-purple-300">Design Intelligence Skill</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {installed ? (
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-sm">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                Installé
              </span>
            ) : (
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-sm">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                Installation...
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Installation Progress */}
      {!installed && (
        <div className="relative z-10 max-w-2xl mx-auto px-4 pt-8">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-purple-300">Installation du skill...</span>
              <span className="text-sm font-mono text-purple-400">{progress}%</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="mt-4 font-mono text-xs text-slate-400 space-y-1">
              {progress > 10 && <p className="animate-fade-in">✓ npm install -g ui-ux-pro-max-cli</p>}
              {progress > 30 && <p className="animate-fade-in">✓ Téléchargement des assets de design...</p>}
              {progress > 50 && <p className="animate-fade-in">✓ Configuration des 79 styles UI</p>}
              {progress > 70 && <p className="animate-fade-in">✓ Chargement de 192 palettes de couleurs</p>}
              {progress > 85 && <p className="animate-fade-in">✓ Installation des 192 règles de raisonnement</p>}
              {progress > 95 && <p className="animate-fade-in">✓ Finalisation...</p>}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {installed && (
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm mb-6">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Skill installé avec succès !
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              UI UX Pro Max
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Intelligence de design pour construire des interfaces UI/UX professionnelles
              sur toutes les plateformes et frameworks.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { value: '79', label: 'Styles UI', icon: '🎨' },
              { value: '192', label: 'Palettes de couleurs', icon: '🌈' },
              { value: '192', label: 'Règles de raisonnement', icon: '🧠' },
              { value: '22', label: 'Stacks supportés', icon: '⚡' },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {[
              { id: 'overview', label: 'Vue d\'ensemble' },
              { id: 'styles', label: 'Styles UI' },
              { id: 'stacks', label: 'Stacks' },
              { id: 'features', label: 'Fonctionnalités' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-purple-500/30 border border-purple-500/50 text-white shadow-lg shadow-purple-500/20'
                    : 'bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 sm:p-8">
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'styles' && <StylesTab />}
            {activeTab === 'stacks' && <StacksTab />}
            {activeTab === 'features' && <FeaturesTab />}
          </div>

          {/* Installation Details */}
          <div className="mt-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="text-green-400">✓</span> Fichiers installés
            </h3>
            <div className="font-mono text-sm space-y-2 text-slate-300">
              <div className="flex items-center gap-2">
                <span className="text-green-400">📦</span>
                <span>node_modules/ui-ux-pro-max-cli/</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">📄</span>
                <span className="text-slate-400">data/styles.csv — 79 styles UI</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">📄</span>
                <span className="text-slate-400">data/colors.csv — 192 palettes</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">📄</span>
                <span className="text-slate-400">data/typography.csv — 74 paires de polices</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">📄</span>
                <span className="text-slate-400">data/products.csv — 192 types de produits</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">📄</span>
                <span className="text-slate-400">scripts/search.py — Moteur de recherche BM25</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">📄</span>
                <span className="text-slate-400">scripts/design_system.py — Générateur de design system</span>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-slate-500">
          <p>UI UX Pro Max v2.15.0 — MIT License</p>
          <p className="mt-1">
            <a href="https://github.com/nextlevelbuilder/ui-ux-pro-max-skill" className="text-purple-400 hover:text-purple-300 transition-colors">
              github.com/nextlevelbuilder/ui-ux-pro-max-skill
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-bold mb-3">🚀 Génération de Design System</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Le moteur de raisonnement IA analyse les exigences de votre projet et génère
            un système de design complet en quelques secondes : patterns, styles, couleurs,
            typographie, effets et anti-patterns.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-3">🔍 Recherche Intelligente</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Moteur de recherche BM25 intégré pour trouver les styles, couleurs et typographies
            les plus adaptés à votre projet. Supporte la recherche par domaine : style,
            typographie, couleurs, charts, UX et icônes.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-3">📐 192 Règles de Raisonnement</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Règles spécialisées par industrie : Tech & SaaS, Finance, Healthcare, E-commerce,
            Services, Creative, Lifestyle et Emerging Tech. Chaque règle inclut patterns
            recommandés, priorités de style et anti-patterns.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-3">🌍 Multi-Plateforme</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Supporte 22 stacks technologiques : React, Next.js, Vue, Nuxt, Svelte, Astro,
            Angular, SwiftUI, Jetpack Compose, React Native, Flutter, Three.js, et plus encore.
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
        <h4 className="font-bold text-purple-300 mb-2">💡 Comment utiliser</h4>
        <p className="text-sm text-slate-300">
          Le skill s'active automatiquement lorsque vous demandez un travail UI/UX.
          Dites simplement : <code className="px-2 py-0.5 rounded bg-white/10 text-purple-300">"Build a landing page for my SaaS product"</code>
        </p>
      </div>
    </div>
  );
}

function StylesTab() {
  const styles = [
    { name: 'Glassmorphism', status: 'active', desc: 'Transparence, flou, effets de verre' },
    { name: 'Neumorphism', status: 'active', desc: 'Ombres douces, relief subtil' },
    { name: 'Brutalism', status: 'active', desc: 'Bold, raw, typographie expressive' },
    { name: 'Minimalism', status: 'active', desc: 'Espace blanc, simplicité, clarté' },
    { name: 'Bento Grid', status: 'active', desc: 'Grille modulaire, cartes organisées' },
    { name: 'Dark Mode', status: 'active', desc: 'Thème sombre, contrastes élevés' },
    { name: 'AI-Native UI', status: 'active', desc: 'Interfaces conversationnelles, chat' },
    { name: 'Claymorphism', status: 'active', desc: '3D doux, formes arrondies, playful' },
    { name: 'Aurora UI', status: 'active', desc: 'Gradients fluides, effets lumineux' },
    { name: 'Retro/Y2K', status: 'supplemental', desc: 'Nostalgie digitale, pixel art' },
    { name: 'Material 3', status: 'active', desc: 'Design system Google' },
    { name: 'Fluent 2', status: 'active', desc: 'Design system Microsoft' },
  ];

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">79 Styles UI Recherchables</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {styles.map((style, i) => (
          <div
            key={i}
            className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-sm">{style.name}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  style.status === 'active'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}
              >
                {style.status}
              </span>
            </div>
            <p className="text-xs text-slate-400">{style.desc}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-slate-500 mt-4">
        + 67 autres styles disponibles (50 actifs, 29 supplémentaires)
      </p>
    </div>
  );
}

function StacksTab() {
  const stacks = [
    { category: 'Web (HTML)', items: ['HTML + Tailwind'] },
    { category: 'React Ecosystem', items: ['React', 'Next.js', 'shadcn/ui'] },
    { category: 'Vue Ecosystem', items: ['Vue', 'Nuxt.js', 'Nuxt UI'] },
    { category: 'Autres Web', items: ['Svelte', 'Astro', 'Angular', 'Three.js', 'Laravel'] },
    { category: 'Desktop', items: ['JavaFX', 'WPF', 'WinUI 3', 'Avalonia', 'Uno Platform', 'UWP'] },
    { category: 'Mobile', items: ['SwiftUI (iOS)', 'Jetpack Compose (Android)'] },
    { category: 'Cross-Platform', items: ['React Native', 'Flutter'] },
  ];

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">22 Stacks Technologiques Supportés</h3>
      <div className="space-y-4">
        {stacks.map((group, i) => (
          <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h4 className="font-medium text-purple-300 mb-2">{group.category}</h4>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item, j) => (
                <span
                  key={j}
                  className="px-3 py-1 rounded-lg bg-white/10 text-sm text-slate-300 border border-white/5"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeaturesTab() {
  const features = [
    {
      icon: '🎯',
      title: 'Génération de Design System',
      desc: 'Génère automatiquement un système de design complet basé sur votre type de produit.',
    },
    {
      icon: '🎨',
      title: '79 Styles UI',
      desc: 'Glassmorphism, Neumorphism, Brutalism, Bento Grid, Dark Mode, AI-Native UI et plus.',
    },
    {
      icon: '🌈',
      title: '192 Palettes de Couleurs',
      desc: 'Palettes spécifiques par industrie, alignées avec les 192 types de produits.',
    },
    {
      icon: '🔤',
      title: '74 Paires de Typographie',
      desc: 'Combinaisons de polices curatorisées avec imports Google Fonts.',
    },
    {
      icon: '📊',
      title: '25 Types de Charts',
      desc: 'Recommandations pour dashboards et analyses de données.',
    },
    {
      icon: '📋',
      title: '119 Guidelines UX',
      desc: 'Bonnes pratiques, anti-patterns, règles d\'accessibilité, layout résilient.',
    },
    {
      icon: '🧠',
      title: '192 Règles de Raisonnement',
      desc: 'Règles spécifiques par industrie pour la génération de design system.',
    },
    {
      icon: '🔍',
      title: 'Moteur BM25',
      desc: 'Recherche intelligente pour trouver les recommandations les plus pertinentes.',
    },
  ];

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Fonctionnalités Complètes</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {features.map((feature, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200"
          >
            <div className="text-2xl mb-2">{feature.icon}</div>
            <h4 className="font-medium mb-1">{feature.title}</h4>
            <p className="text-sm text-slate-400">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
