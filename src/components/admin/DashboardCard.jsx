// src/components/Admin/DashboardCard.jsx
import React from 'react';



function DashboardCard({ title, value, icon, color = 'primary' }) {
 
  const cardClasses = `card text-white bg-${color} mb-3`;
  const textStyle = { fontSize: '2rem', fontWeight: 'bold'};

  return (
    <div className={cardClasses} style={{ maxWidth: '18rem' }}>
      <div className="card-header">{title}</div>
      <div className="card-body">
        
        {icon}
        <p className="card-text" style={textStyle}>{value}</p>
       
      </div>
    </div>
  );
}

export default DashboardCard;