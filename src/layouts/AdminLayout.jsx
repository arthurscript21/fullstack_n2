// src/layouts/AdminLayout.jsx
import React from 'react';
// 1. Importa Outlet y NavLink (en lugar de Link)
import { Outlet, NavLink } from 'react-router-dom';

// --- Aquí definimos nuestros estilos en línea ---

const sidebarStyle = {
  width: '260px',
  minHeight: '100vh',
  backgroundColor: '#f8f9fa',
  boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
  padding: '1.5rem',
};

const sidebarTitleStyle = {
  fontWeight: '700',
  fontSize: '1.5rem',
  marginBottom: '1.5rem',
  color: '#333',
};

const contentStyle = {
  flexGrow: 1,
  padding: '2rem',
  overflowY: 'auto',
};

// --- Estilos para los <NavLink> ---
// Esta función revisa si el link está activo y cambia el estilo

const getNavLinkStyle = ({ isActive }) => {
  return {
    color: isActive ? 'white' : '#555',
    backgroundColor: isActive ? '#0d6efd' : 'transparent',
    padding: '0.75rem 1rem',
    marginBottom: '0.25rem',
    borderRadius: '8px',
    fontWeight: isActive ? '600' : '500',
    textDecoration: 'none', // Quita el subrayado de los links
    display: 'block', // Hace que el link ocupe todo el ancho
  };
};

// --- Componente principal ---

function AdminLayout() {
  return (
    // Usamos 'd-flex' de Bootstrap para el layout principal
    <div className="d-flex">
      
      {/* --- 1. Tu Menú Lateral (Sidebar) --- */}
      <aside style={sidebarStyle}>
        
        <h3 style={sidebarTitleStyle}>ADMIN</h3>

        {/* Usamos 'nav' y 'flex-column' de Bootstrap */}
        <nav className="nav flex-column">
          
          {/* Usamos <NavLink> y le pasamos nuestra función de estilo.
            React Router automáticamente sabrá si el link está "activo".
          */}
          <NavLink to="/admin" style={getNavLinkStyle} end>
            Dashboard
          </NavLink>

          <NavLink to="/admin/productos" style={getNavLinkStyle}>
            Productos
          </NavLink>

          <NavLink to="/admin/usuarios" style={getNavLinkStyle}>
            Usuarios
          </NavLink>

          <NavLink to="/admin/ordenes" style={getNavLinkStyle}>
            Órdenes
          </NavLink>

          {/* (Agrega los otros links de la Figura 10 aquí) */}

        </nav>
      </aside>

      {/* --- 2. El Contenido Principal de la Página --- */}
      <main style={contentStyle}>
        {/* Outlet sigue siendo el "agujero" para el contenido */}
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;