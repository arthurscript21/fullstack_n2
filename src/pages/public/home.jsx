import React from 'react';
// 1. Importa 'Link' de react-router-dom
import { Link } from 'react-router-dom';

function Home() {
  return (
    // 2. Necesitamos un 'Fragment' (<>...</>) o un <div> 
    //    para agrupar el título y el nuevo botón.
    <div style={{ padding: '20px' }}>
      <h1>Página de Inicio (Pública)</h1>

      {/* 3. Usa el componente 'Link' */}
      <Link 
        to="src/pages/admin/AdminDashboard.jsx" 
        className="btn btn-primary" // 4. Clases de Bootstrap para que parezca botón
      >
        Ir al Panel de Administrador
      </Link>
    </div>
  );
}

export default Home;