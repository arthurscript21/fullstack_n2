// src/pages/Tienda/Nosotros.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Nosotros() {
  return (
    // Quitamos "container", añadimos padding horizontal (px-md-4) y vertical (py-5)
    <div className="px-md-4 py-5">
      {/* Usamos container aquí para centrar el contenido específico */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h2 className="section-title mb-4">Sobre HuertoHogar</h2>
            <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Campo de cultivo"
                className="img-fluid rounded mb-4 shadow"
                style={{ maxHeight: '300px', width: '100%', objectFit: 'cover'}}
            />
            <p className="lead mb-4">
              En HuertoHogar, conectamos a las familias chilenas con la frescura y calidad de productos
              directamente desde el campo hasta su puerta... {/* Texto completo */}
            </p>
            <h4 className="mb-3">Nuestra Misión</h4>
            <p className="text-secondary-custom">
              Proporcionar productos frescos y de calidad, apoyando prácticas agrícolas sostenibles... {/* Texto completo */}
            </p>
            <h4 className="mt-4 mb-3">Nuestra Visión</h4>
            <p className="text-secondary-custom">
              Ser la tienda online líder en Chile para productos frescos y naturales... {/* Texto completo */}
            </p>
            <div className="mt-5">
              <Link to="/productos" className="btn btn-primary me-2">Ver Nuestros Productos</Link>
              <Link to="/contacto" className="btn btn-outline-secondary">Contáctanos</Link>
            </div>
          </div>
        </div>
      </div>
    </div> // CIERRA EL DIV PRINCIPAL
  );
}

export default Nosotros;