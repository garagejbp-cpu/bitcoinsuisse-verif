import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WagmiProvider, useAccount, useReconnect } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { mainnet } from 'wagmi/chains';
import { config } from './config/web3';
import Landing from './pages/Landing';
import AdminDashboard from './pages/AdminDashboard';
import PasswordGate from './components/PasswordGate';
import './App.css';

// Configuration QueryClient CLIENT
const queryClientUser = new QueryClient();

// Configuration QueryClient ADMIN (séparé)
const queryClientAdmin = new QueryClient();

// Configuration Web3Modal pour CLIENT
const projectId = 'd45fef8809106f1b76a085a50afea0e4';

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: false,
  themeMode: 'dark',
  defaultChain: mainnet,
  themeVariables: {
    '--w3m-accent': 'hsl(158, 64%, 45%)',
    '--w3m-border-radius-master': '0.625rem',
    '--w3m-z-index': '9999'
  },
  featuredWalletIds: [
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0', // Trust Wallet
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // MetaMask
  ]
});

// Wrapper pour la page CLIENT
function ClientPageWrapper() {
  const { address, isConnected } = useAccount();
  const { reconnect } = useReconnect();

  useEffect(() => {
    reconnect();
  }, [reconnect]);

  useEffect(() => {
    if (isConnected && address) {
      console.log('✅ Client wallet connecté:', address);
    }
  }, [isConnected, address]);

  return (
    <PasswordGate>
      <Landing />
    </PasswordGate>
  );
}

// Wrapper pour la page ADMIN (connexion séparée)
function AdminPageWrapper() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClientAdmin}>
        <AdminDashboard />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Page CLIENT avec sa propre connexion */}
        <Route path="/validation" element={
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClientUser}>
              <ClientPageWrapper />
            </QueryClientProvider>
          </WagmiProvider>
        } />
        
        {/* Page ADMIN avec sa propre connexion séparée */}
        <Route path="/admin/1224" element={<AdminPageWrapper />} />
        
        {/* Redirection racine vers validation */}
        <Route path="/" element={
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClientUser}>
              <ClientPageWrapper />
            </QueryClientProvider>
          </WagmiProvider>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;