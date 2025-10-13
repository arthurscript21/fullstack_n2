import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Si el usuario no está autenticado, redirige a la página de login
    return <Navigate to="/login" />;
  }

  // Si está autenticado, muestra el contenido de la ruta
  return children;
}

export default ProtectedRoute;