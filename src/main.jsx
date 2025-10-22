import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

// Importar Bootstrap CSS (requerido para estilos y responsividad) [cite: 41]
import 'bootstrap/dist/css/bootstrap.min.css';
// Importar estilos globales (incluye el tema de fullstack_p1)
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* Habilita el enrutamiento */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);