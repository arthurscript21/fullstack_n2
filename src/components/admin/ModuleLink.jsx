import React from 'react';
import { Link } from 'react-router-dom';

function ModuleLink({ title, description, to }) {
  return (
    <div className="col-lg-3 col-md-6 mb-4">
      <div className="card shadow-sm h-100">
        <div className="card-body text-center d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
          </div>
          <Link to={to} className="btn btn-outline-primary stretched-link mt-2">
            Ir a {title}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ModuleLink;