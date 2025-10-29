import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { CreatorProvider } from './context/CreatorContext';
import { ThemeProvider } from './context/ThemeContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <CreatorProvider>
        <App />
      </CreatorProvider>
    </ThemeProvider>
  </StrictMode>
);
