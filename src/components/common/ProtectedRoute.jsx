import React from 'react';

// Por ahora, este componente solo muestra a los "hijos" (children).
// Más adelante, aquí pondrás la lógica para ver si el usuario
// ha iniciado sesión o no.
function ProtectedRoute({ children }) {
  // Lógica de autenticación (ej. ¿está logueado?) irá aquí
  const isAuth = true; // Cambia a 'false' para probar

  if (!isAuth) {
    // Si no está logueado, lo envías al Login
    // (Necesitarás importar <Navigate> de 'react-router-dom')
    // return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;