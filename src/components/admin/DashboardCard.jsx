// src/components/Admin/DashboardCard.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Puedes pasar colores como props para hacerlo reutilizable
function DashboardCard({ title, value, icon, color = 'primary' }) {
  // Define clases de Bootstrap para el fondo y texto según el color
  const cardClasses = `card text-white bg-${color} mb-3`;
  const textStyle = { fontSize: '2rem', fontWeight: 'bold'};

  return (
    <div className={cardClasses} style={{ maxWidth: '18rem' }}>
      <div className="card-header">{title}</div>
      <div className="card-body">
         {/* Aquí podrías poner un icono si usas una librería */}
        {icon}
        <p className="card-text" style={textStyle}>{value}</p>
        {/* Podrías agregar un enlace "Ver más" aquí */}
      </div>
    </div>
  );
}

export default DashboardCard;