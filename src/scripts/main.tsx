import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { LoadingProvider } from './splash/SceneContext.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LoadingProvider>
      <App />
    </LoadingProvider>
  </React.StrictMode>
);
