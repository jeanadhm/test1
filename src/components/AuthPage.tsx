// ============================================================
// KONTA — Page d'authentification
// Connexion / Inscription
// ============================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mail, Lock, User, Eye, EyeOff, ArrowLeft, Sparkles } from 'lucide-react';

interface AuthPageProps {
  onAuthenticated: () => void;
  onBack: () => void;
}

type AuthMode = 'login' | 'register';

export default function AuthPage({ onAuthenticated, onBack }: AuthPageProps) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [cabinet, setCabinet] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation basique
    if (!email.includes('@')) {
      setError('Veuillez entrer une adresse email valide.');
      return;
    }
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }
    if (mode === 'register' && !name.trim()) {
      setError('Veuillez entrer votre nom.');
      return;
    }

    // Simulation d'authentification
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onAuthenticated();
    }, 1200);
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-5xl grid md:grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl shadow-blue-500/10 overflow-hidden border border-blue-100/50">
        {/* Left panel — Branding */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white"
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute bottom-20 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          </div>

          <div className="relative z-10">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors mb-12 cursor-pointer"
            >
              <ArrowLeft size={16} />
              Retour à l'accueil
            </button>

            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white/15 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                <span className="text-white text-lg font-bold">K</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">Konta</h2>
                <p className="text-xs text-white/70">by PrimeAxis</p>
              </div>
            </div>

            <h1 className="text-4xl font-black leading-tight mb-4">
              Votre cabinet,
              <br />
              <span className="text-amber-200">réinventé.</span>
            </h1>
            <p className="text-white/80 text-base leading-relaxed">
              Rejoignez les cabinets comptables qui utilisent Konta pour automatiser leurs tâches et fiabiliser leur travail.
            </p>
          </div>

          <div className="relative z-10 space-y-4">
            {[
              'Extraction automatique des factures',
              'Détection d\'anomalies en temps réel',
              'Rapports professionnels instantanés',
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.15 }}
                className="flex items-center gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles size={12} className="text-amber-200" />
                </div>
                <span className="text-sm text-white/90">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right panel — Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          {/* Mobile back button */}
          <button
            onClick={onBack}
            className="md:hidden flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors mb-6 cursor-pointer"
          >
            <ArrowLeft size={16} />
            Retour à l'accueil
          </button>

          {/* Mode switcher */}
          <div className="flex gap-1 p-1 bg-slate-100 rounded-xl mb-8">
            <button
              onClick={() => switchMode('login')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Connexion
            </button>
            <button
              onClick={() => switchMode('register')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                mode === 'register'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Inscription
            </button>
          </div>

          {/* Title */}
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
                {mode === 'login' ? 'Bon retour 👋' : 'Créer un compte'}
              </h2>
              <p className="text-sm text-slate-500 mb-8">
                {mode === 'login'
                  ? 'Connectez-vous pour accéder à votre espace Konta.'
                  : 'Commencez à utiliser Konta pour votre cabinet.'}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {mode === 'register' && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Nom complet
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jean Dupont"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {mode === 'register' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Nom du cabinet <span className="text-slate-400 font-normal">(optionnel)</span>
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={cabinet}
                    onChange={(e) => setCabinet(e.target.value)}
                    placeholder="Cabinet Dupont & Associés"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Adresse email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@cabinet.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-slate-700">
                  Mot de passe
                </label>
                {mode === 'login' && (
                  <button type="button" className="text-xs text-blue-600 hover:text-blue-700 font-medium cursor-pointer">
                    Mot de passe oublié ?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all cursor-pointer shadow-lg shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Connexion en cours...
                </>
              ) : (
                <>
                  {mode === 'login' ? 'Se connecter' : 'Créer mon compte'}
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer note */}
          <p className="text-xs text-slate-400 text-center mt-6 leading-relaxed">
            {mode === 'login' ? (
              <>
                Pas encore de compte ?{' '}
                <button
                  onClick={() => switchMode('register')}
                  className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                >
                  Créer un compte
                </button>
              </>
            ) : (
              <>
                En créant un compte, vous acceptez nos{' '}
                <span className="text-blue-600 cursor-pointer">conditions d'utilisation</span>.
              </>
            )}
          </p>

          {/* Demo hint */}
          <div className="mt-6 p-3 bg-blue-50 border border-blue-100 rounded-xl">
            <p className="text-xs text-blue-700 text-center">
              💡 <strong>Mode démo</strong> — Entrez n'importe quel email et mot de passe (6+ caractères) pour accéder au dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
