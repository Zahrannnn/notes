import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App';
import { setupAxe } from '@/lib/setupAxe';
import '@/styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

void setupAxe();
