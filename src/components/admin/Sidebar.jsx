// src/components/admin/Sidebar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (confirm('¿Está seguro de que desea cerrar sesión?')) {
      // logoutUser(); // Asegúrate que tu lógica de logout real esté aquí
      console.log('Cerrando sesión...');
      navigate('/');
    }
  };

  return (
    <aside className="admin-sidebar">
      <NavLink to="/admin" className="logo-text">
        HuertoHogar
      </NavLink>
      <hr style={{ margin: '1rem 0 1.5rem 0', borderColor: '#eee' }} />
      <nav className="nav nav-pills flex-column mb-auto">
        <NavLink to="/admin" end>Dashboard</NavLink>
        <NavLink to="/admin/ordenes">Órdenes</NavLink>
        <NavLink to="/admin/productos">Productos</NavLink>
        <NavLink to="/admin/usuarios">Usuarios</NavLink>
        <NavLink to="/admin/categorias">Categorías</NavLink>
        <NavLink to="/admin/reportes">Reportes</NavLink> {/* <-- AÑADIDO AQUÍ */}
      </nav>

      <button className="sidebar-button sidebar-logout-btn" onClick={handleLogout}>
        Cerrar sesión
      </button>

      <div className="sidebar-button sidebar-profile-btn">
         <img src="https://ui-avatars.com/api/?name=Admin&background=8B4513&color=fff&size=40" alt="Perfil" className="profile-avatar" />
         <div className="profile-info">
           <span className="profile-name">Admin</span>
           <span className="profile-role">Administrador</span>
         </div>
      </div>
    </aside>
  );
}

export default Sidebar;