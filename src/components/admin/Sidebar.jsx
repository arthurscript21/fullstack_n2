// src/components/admin/Sidebar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// Asegúrate que admin-styles.css se importa en AdminLayout o aquí si prefieres

function Sidebar() {
  const navigate = useNavigate();
  // ... (handleLogout y otras lógicas) ...

  const handleLogout = () => {
    if (confirm('¿Está seguro de que desea cerrar sesión?')) {
      console.log('Cerrando sesión...');
      navigate('/');
    }
  };

  return (
    // Usa la clase CSS principal del sidebar
    <aside className="admin-sidebar">
      {/* Usa la clase CSS para el logo */}
      <NavLink to="/admin" className="logo-text">
        HuertoHogar
      </NavLink>
      <hr style={{ margin: '1rem 0 1.5rem 0', borderColor: '#eee' }} />
      <nav className="nav nav-pills flex-column mb-auto">
        {/* NavLink ya aplica la clase 'active' automáticamente */}
        <NavLink to="/admin" end>Dashboard</NavLink>
        <NavLink to="/admin/productos">Productos</NavLink>
        <NavLink to="/admin/usuarios">Usuarios</NavLink>
        {/* ... otros links ... */}
      </nav>

      {/* Botón Logout */}
      <button className="sidebar-button sidebar-logout-btn" onClick={handleLogout}>
        {/* Icono opcional */}
        Cerrar sesión
      </button>

      {/* Perfil del Admin */}
      <div className="sidebar-button sidebar-profile-btn">
         <img
            src="https://ui-avatars.com/api/?name=Admin&background=8B4513&color=fff&size=40"
            alt="Perfil"
            className="profile-avatar"
          />
          <div className="profile-info">
            <span className="profile-name">Admin</span>
            <span className="profile-role">Administrador</span>
          </div>
      </div>
    </aside>
  );
}

export default Sidebar;