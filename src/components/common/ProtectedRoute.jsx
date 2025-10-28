import React from 'react';
// (Más adelante aquí importarás <Navigate> de 'react-router-dom')

function ProtectedRoute({ children }) {
 
  // ¡REVISA ESTA LÍNEA!
  const isAuth = true; // Esto está perfecto para probar

  if (!isAuth) {
    // Si isAuth es false, te estará intentando redirigir a "/login"
    // return <Navigate to="/login" />;
    return null; // O simplemente no muestra nada (pantalla en blanco)
  }

  return children; // Solo muestra el AdminLayout si isAuth es true
}

// ¡Te faltaba esta línea!
export default ProtectedRoute;