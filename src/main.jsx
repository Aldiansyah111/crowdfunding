import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { WalletProvider } from './contexts/wallet';
import { CrowdfundingProvider } from './contexts/CrowdfundingContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WalletProvider>
      <CrowdfundingProvider>
        <App />
      </CrowdfundingProvider>
    </WalletProvider>
  </React.StrictMode>
);
