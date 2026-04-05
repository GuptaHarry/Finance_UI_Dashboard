import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import App from './App.tsx';
import { UIProvider } from './Context/UIProvider.tsx';
import { TransactionsProvider } from './Context/TransactionProvider.jsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UIProvider>
      <TransactionsProvider>
        <App />
      </TransactionsProvider>
    </UIProvider>
  </StrictMode>,
);

