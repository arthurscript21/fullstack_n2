// src/layouts/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import Footer from '../components/admin/Footer';

function AdminLayout() {
  const layoutStyle = {
    display: 'flex',
    minHeight: '100vh', // Ocupa toda la altura
  };

  const mainContentStyle = {
    flexGrow: 1, // Ocupa el espacio restante
    display: 'flex',
    flexDirection: 'column', // Para que el footer se quede abajo
  };

   const contentWrapperStyle = {
    padding: '2rem', // Espacio alrededor del contenido
    flexGrow: 1, // Empuja el footer hacia abajo
  };


  return (
    <div style={layoutStyle}>
      <Sidebar />
      <div style={mainContentStyle}>
        <main style={contentWrapperStyle}>
          {/* Aquí se renderizará el contenido específico de cada ruta */}
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default AdminLayout;