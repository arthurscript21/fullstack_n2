// src/layouts/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import Footer from '../components/admin/Footer';
import '../admin-styles.css';
function AdminLayout() {
  const layoutStyle = {
    display: 'flex',
    minHeight: '100vh', 
  };

  const mainContentStyle = {
    flexGrow: 1, 
    display: 'flex',
    flexDirection: 'column', 
  };

   const contentWrapperStyle = {
    padding: '2rem', 
    flexGrow: 1, 
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