// src/components/Admin/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar Bootstrap

function Sidebar() {
  const navLinkStyle = ({ isActive }) => {
    return {
      color: isActive ? '#fff' : '#adb5bd',
      backgroundColor: isActive ? '#0d6efd' : 'transparent',
      display: 'block',
      padding: '0.5rem 1rem',
      borderRadius: '0.25rem',
      textDecoration: 'none',
      marginBottom: '0.25rem'
    };
  };

  const profileStyle = {
    marginTop: 'auto', // Empuja el perfil hacia abajo
    paddingTop: '1rem',
    borderTop: '1px solid #495057' // Separador visual
  }

  return (
    <aside className="d-flex flex-column vh-100 p-3 text-white bg-dark" style={{ width: '280px' }}>
      <a href="/admin" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        {/* Puedes poner un logo o nombre aquí */}
        <span className="fs-4">Panel Admin</span>
      </a>
      <hr />
      <nav className="nav nav-pills flex-column mb-auto">
        {/* Links basados en Figura 10 del PDF [cite: 310]*/}
        <NavLink to="/admin" style={navLinkStyle} end>
          {/* Icono (ejemplo, necesitarías una librería como react-icons) */}
          Dashboard
        </NavLink>
        <NavLink to="/admin/ordenes" style={navLinkStyle}>
          Órdenes/Boletas
        </NavLink>
        <NavLink to="/admin/productos" style={navLinkStyle}>
          Producto
        </NavLink>
         <NavLink to="/admin/categorias" style={navLinkStyle}>
          Categoría
        </NavLink>
        <NavLink to="/admin/usuarios" style={navLinkStyle}>
          Usuario
        </NavLink>
        <NavLink to="/admin/reportes" style={navLinkStyle}>
          Reportes
        </NavLink>
        {/* Agrega más NavLinks según sea necesario */}
      </nav>
      <hr />
      {/* Perfil del Admin [cite: 280, 305] */}
      <div style={profileStyle}>
         {/* Aquí iría la info del perfil */}
        <strong>Admin User</strong>
        {/* Podrías añadir un botón de logout */}
      </div>
    </aside>
  );
}

export default Sidebar;