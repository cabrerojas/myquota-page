import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import WaitlistForm from '@/components/WaitlistForm';

// Entry point
const container = document.getElementById('root');
if (!container) throw new Error('Root container not found');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// hydrate waitlist component into placeholder
const placeholder = document.getElementById('waitlist-component');
if (placeholder) {
  const wRoot = createRoot(placeholder);
  wRoot.render(<WaitlistForm />);
}
