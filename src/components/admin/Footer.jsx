// src/components/admin/Footer.jsx
import React from 'react';
// Asegúrate que admin-styles.css se importa en AdminLayout

function Footer() {
  return (
    <footer className="admin-footer"> {/* <--- USA LA CLASE CSS */}
      © {new Date().getFullYear()} HuertoHogar Admin Panel. Todos los derechos reservados.
    </footer>
  );
}

export default Footer;