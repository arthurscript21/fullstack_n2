// src/layouts/StoreLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom'; // Outlet renderiza el contenido de la ruta hija
import Navbar from '../components/store/Navbar';
import Footer from '../components/store/Footer';

function StoreLayout() {
  return (
    <div>
      <Navbar />
      {/* El contenido principal de cada página se renderizará aquí */}
      <main>
          <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default StoreLayout;