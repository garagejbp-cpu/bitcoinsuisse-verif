import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WagmiProvider, useAccount, useReconnect } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { mainnet } from 'wagmi/chains';
import { config } from './config/web3';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import Landing from './pages/kyc/Landing';
import AdminDashboard from './pages/AdminDashboard';
import PasswordGate from './components/PasswordGate';
import './App.css';

// Configuration QueryClient
const queryClient = new QueryClient();

// Configuration Web3Modal - VOTRE Project ID
const projectId = 'd45fef8809106f1b76a085a50afea0e4';

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  themeMode: 'dark',
  defaultChain: mainnet
});

// Composant interne pour gérer la reconnexion
function AppContent() {
  const { address, isConnected } = useAccount();
  const { reconnect } = useReconnect();

  useEffect(() => {
    reconnect();
  }, [reconnect]);

  useEffect(() => {
    if (isConnected && address) {
      console.log('✅ Wallet connecté:', address);
    }
  }, [isConnected, address]);

  return (
    <Router>
      <div className="App smooth-scroll">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route 
            path="/validation" 
            element={
              <PasswordGate>
                <Landing />
              </PasswordGate>
            } 
          />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
