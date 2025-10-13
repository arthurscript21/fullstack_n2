import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Página de Inicio Pública</h1>
      <p>Cualquiera puede ver esta página.</p>
      <nav>
        <Link to="/login">Ir a Iniciar Sesión</Link> | <Link to="/admin">Ir al Panel de Admin (protegido)</Link>
      </nav>
    </div>
  );
}

export default HomePage;