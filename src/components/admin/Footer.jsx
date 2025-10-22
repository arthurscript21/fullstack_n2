// src/components/Admin/Footer.jsx
import React from 'react';

function Footer() {
  const footerStyle = {
    padding: '1rem',
    marginTop: 'auto', // Asegura que se quede abajo si el contenido es corto
    backgroundColor: '#f8f9fa', // Un color claro
    borderTop: '1px solid #dee2e6',
    textAlign: 'center',
    color: '#6c757d'
  };

  return (
    <footer style={footerStyle}>
      © {new Date().getFullYear()} Mi Tienda Admin Panel
      {/* Los botones de acción (Agregar, Editar, Eliminar) usualmente
          se colocan dentro de las tablas o vistas específicas,
          no en un footer genérico del layout. */}
    </footer>
  );
}

export default Footer;