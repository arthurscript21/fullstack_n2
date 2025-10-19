import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function AdminLayout() {
  return (
    <div style={{ display: 'flex' }}>
      
      {/* --- 1. Tu Menú Lateral (Sidebar) --- */}
      {/* (Este es un sidebar muy simple, luego lo puedes hacer un componente) */}
      <div style={{ 
        width: '250px', 
        background: '#f8f9fa', 
        minHeight: '100vh', 
        padding: '15px' 
      }}>
        <h3 style={{ fontWeight: 'bold' }}>ADMIN</h3>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          <li><Link to="/admin">Dashboard</Link></li>
          <li><Link to="/admin/productos">Productos</Link></li>
          <li><Link to="/admin/usuarios">Usuarios</Link></li>
          <li><Link to="/admin/ordenes">Órdenes</Link></li>
          {/* Agrega los otros links de la Figura 10 aquí */}
        </ul>
      </div>

      {/* --- 2. El Contenido Principal de la Página --- */}
      <main style={{ flexGrow: 1, padding: '20px' }}>
        {/* <Outlet /> renderizará tu AdminDashboard.jsx aquí */}
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;