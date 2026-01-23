import React from 'react';
import ReactDOM from 'react-dom/client';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { config } from './config/web3';
import App from './App';
import './index.css';

// Configuration QueryClient
const queryClient = new QueryClient();

// Configuration Web3Modal
const projectId = 'a90989fe98485d8df57542f1c7f59bd0'; // Project ID public pour démo

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  enableOnramp: true,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': 'hsl(158, 64%, 45%)',
    '--w3m-border-radius-master': '0.625rem'
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
