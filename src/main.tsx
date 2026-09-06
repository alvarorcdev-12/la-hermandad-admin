import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LaHermandadAdminApp } from './LaHermandadAdminApp.tsx';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LaHermandadAdminApp />
  </StrictMode>,
);
