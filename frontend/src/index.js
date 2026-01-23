import React from 'react';
import ReactDOM from 'react-dom/client';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { config } from './config/web3';
import App from './App';
import './index.css';
import '@rainbow-me/rainbowkit/styles.css';

// Configuration QueryClient
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#E31B23',
            accentColorForeground: 'white',
            borderRadius: 'medium',
          })}
          appInfo={{
            appName: 'Bitcoin Suisse',
            learnMoreUrl: 'https://bitcoin-suisse.fr',
          }}
        >
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
