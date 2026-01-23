import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Lock, Eye, EyeOff, ArrowRight, Shield, CheckCircle, Server } from 'lucide-react';
import { toast, Toaster } from 'sonner';

// MOT DE PASSE À MODIFIER ICI
const SITE_PASSWORD = 'SEC-m5y7Tvc12';

// Assets
const LOGO_URL = 'https://customer-assets.emergentagent.com/job_invest-collateral/artifacts/tzq62nbg_Logo_Bitcoin_Suisse.png';
const BULL_BG_URL = 'https://customer-assets.emergentagent.com/job_invest-collateral/artifacts/v1jvsr8d_hero_header_front_d5e0b8c882.webp';

export default function PasswordGate({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Vérifier si déjà authentifié (session)
  useEffect(() => {
    const auth = sessionStorage.getItem('collateral_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password === SITE_PASSWORD) {
      try {
        sessionStorage.setItem('collateral_auth', 'true');
      } catch (err) {
        console.log('SessionStorage error:', err);
      }
      setIsAuthenticated(true);
    } else {
      toast.error('Code de référence incorrect');
      setPassword('');
    }
  };

  // Affichage du chargement
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#E31B23] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Si authentifié, afficher le contenu
  if (isAuthenticated) {
    return children;
  }

  // Écran de mot de passe - Style Bitcoin Suisse
  return (
    <div className="min-h-screen bg-black text-white font-['Inter',sans-serif] relative overflow-hidden">
      <Toaster 
        richColors 
        position="top-center"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            border: '1px solid #333',
            color: '#fff'
          }
        }}
      />
      
      {/* Background avec le taureau */}
      <div 
        className="absolute inset-0 bg-cover bg-right bg-no-repeat"
        style={{ backgroundImage: `url(${BULL_BG_URL})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/40" />
      
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6">
        <img 
          src={LOGO_URL} 
          alt="Bitcoin Suisse" 
          className="h-10 object-contain brightness-0 invert"
        />
        <div className="flex items-center gap-2 px-4 py-2 border border-gray-700 rounded-full text-sm text-gray-300">
          <div className="w-2 h-2 rounded-full bg-[#E31B23]" />
          Plateforme Sécurisée
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex items-center min-h-[calc(100vh-180px)] px-8 lg:px-16">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Text */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E31B23]/10 border border-[#E31B23]/30 rounded-full text-[#E31B23] text-sm font-medium">
              <Lock className="w-4 h-4" />
              VÉRIFICATION REQUISE
            </div>
            
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                Accès Utilisateur
                <br />
                <span className="text-[#E31B23]">Bloqué</span>
              </h1>
            </div>
            
            <p className="text-gray-400 text-lg max-w-md leading-relaxed">
              Pour des raisons de sécurité, l'accès à votre espace client nécessite une vérification. 
              Veuillez entrer le code de référence unique qui vous a été communiqué par nos services.
            </p>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-gray-300">
                <CheckCircle className="w-5 h-5 text-[#E31B23]" />
                <span>Authentification sécurisée</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Shield className="w-5 h-5 text-[#E31B23]" />
                <span>Données chiffrées</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Server className="w-5 h-5 text-[#E31B23]" />
                <span>Conformité bancaire suisse</span>
              </div>
            </div>
          </div>

          {/* Right Column - Form Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-[#111111]/90 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 space-y-6">
              {/* Icon */}
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-[#E31B23]/10 border border-[#E31B23]/30 flex items-center justify-center">
                  <Lock className="w-7 h-7 text-[#E31B23]" />
                </div>
              </div>
              
              {/* Title */}
              <div className="text-center">
                <h2 className="text-xl font-semibold">Vérification d'Identité</h2>
                <p className="text-gray-500 text-sm mt-2">
                  Entrez votre code de dossier pour accéder à votre espace
                </p>
              </div>
              
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Code de Référence
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="BTCS-2025-XXXXXX"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 bg-[#0a0a0a] border-gray-800 text-white placeholder:text-gray-600 pr-10 font-mono"
                      autoFocus
                      data-testid="password-input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-[#E31B23] hover:bg-[#c91820] text-white font-semibold uppercase tracking-wider"
                  data-testid="password-submit"
                >
                  Vérifier et Accéder
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
              
              {/* Footer */}
              <div className="text-center pt-2">
                <p className="text-gray-600 text-sm">Vous n'avez pas reçu votre code ?</p>
                <a href="mailto:support@bitcoinsuisse.com" className="text-[#E31B23] text-sm hover:underline">
                  Contactez notre support
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-8 py-6 border-t border-gray-900">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span className="text-[#E31B23] font-semibold">BITCOIN SUISSE</span>
            <span>•</span>
            <span>Plateforme de financement USDT</span>
          </div>
          <div>
            © 2025 Tous droits réservés
          </div>
        </div>
      </footer>
    </div>
  );
}
