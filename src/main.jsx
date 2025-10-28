// src/main.jsx
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

// Estilos (Ya deberías tener estas líneas)
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// --- AÑADE ESTA LÍNEA para la funcionalidad de Bootstrap ---
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// ---------------------------------------------------------

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);