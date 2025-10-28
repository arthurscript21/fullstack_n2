// src/pages/Tienda/Categorias.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { products, obtenerNombreCategoria } from '../../data/products'; // Necesitamos las categorías de los productos

function Categorias() {
  // Obtenemos las categorías únicas de los productos
  const categoriasUnicas = [...new Set(products.map(p => p.categoria))];

  // Puedes definir imágenes específicas para cada categoría si quieres
  const imagenesCategoria = {
    frutas: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    verduras: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    organicos: 'https://images.unsplash.com/photo-1558645832-e6a62e1e6f4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    lacteos: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    default: 'https://via.placeholder.com/500x300?text=Categoría' // Imagen por defecto
  };

  return (
    // Sin container, con padding
    <div className="px-md-4 px-3 py-5">
      <h2 className="text-center section-title mb-4">Explora por Categoría</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {categoriasUnicas.map(catKey => (
          <div key={catKey} className="col">
            <div className="card text-center h-100 shadow-sm">
              <img
                src={imagenesCategoria[catKey] || imagenesCategoria.default}
                className="card-img-top"
                alt={obtenerNombreCategoria(catKey)}
                style={{ height: '150px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{obtenerNombreCategoria(catKey)}</h5>
                <Link
                  to={`/categoria/${catKey}`}
                  className="btn btn-sm btn-outline-primary mt-auto"
                >
                  Ver Productos
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
       <div className="text-center mt-4">
            <Link to="/productos" className="btn btn-primary">Ver Todos los Productos</Link>
       </div>
    </div>
  );
}

export default Categorias;