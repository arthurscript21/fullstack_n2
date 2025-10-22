import React from 'react';
import { Link } from 'react-router-dom';
 // Importaremos un CSS para los estilos

function Sidebar() {
  return (
    <aside className="sidebar-container">
      <nav>
        <ul>
          <li>
            {/* Usamos Link de react-router-dom para la navegación */}
            <Link to="/admin/home">
              Home
            </Link>
          </li>
          <li>
            <Link to="/admin/categoria">
              Categoría
            </Link>
          </li>
          <li>
            <Link to="/admin/reporte">
              Reporte
            </Link>
          </li>
          <li>
            <Link to="/admin/perfil">
              Perfil
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;