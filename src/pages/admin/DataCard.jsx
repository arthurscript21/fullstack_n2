import React from 'react';

function DataCard({ title, value, colorClass = "text-bg-light" }) {
  return (
    <div className={`card ${colorClass} shadow-sm mb-4`}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text fs-3 fw-bold">{value}</p>
      </div>
    </div>
  );
}

export default DataCard;