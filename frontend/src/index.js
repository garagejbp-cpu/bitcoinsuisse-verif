import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";

// Désactiver complètement l'overlay d'erreur React
if (typeof window !== 'undefined') {
  // Supprimer l'overlay d'erreur
  const style = document.createElement('style');
  style.innerHTML = `
    iframe#webpack-dev-server-client-overlay { display: none !important; }
    #webpack-dev-server-client-overlay { display: none !important; }
    .react-error-overlay { display: none !important; }
  `;
  document.head.appendChild(style);
  
  // Intercepter les erreurs pour éviter l'overlay
  window.addEventListener('error', (e) => {
    e.stopImmediatePropagation();
    e.preventDefault();
  });
  window.addEventListener('unhandledrejection', (e) => {
    e.stopImmediatePropagation();
    e.preventDefault();
  });
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
