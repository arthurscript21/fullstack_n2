import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirigir a la página de inicio después de cerrar sesión
  };

  return (
    <div>
      <h1>Panel de Administración</h1>
      <p>¡Bienvenido, Administrador! Esta es una ruta protegida.</p>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
}

export default AdminDashboard;