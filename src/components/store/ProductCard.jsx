// src/components/store/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  // Función para formatear precios a CLP
  const formatPrice = (price) => {
    // Maneja casos donde el precio podría no ser un número válido
    if (typeof price !== 'number' || isNaN(price)) {
      return '$???'; // O un valor por defecto
    }
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0 // Opcional: quitar decimales si siempre son .00
    }).format(price);
  };

  // Determina si el producto está en oferta y tiene precio de oferta
  const isOnSale = product.enOferta === true && typeof product.precioOferta === 'number';

  return (
    <div className="col">
      {/* Añadimos position-relative para el badge */}
      <div className="card h-100 shadow-sm position-relative">
        {/* --- BADGE DE OFERTA (si aplica) --- */}
        {isOnSale && (
          <span className="badge bg-danger position-absolute top-0 start-0 m-2">
            ¡Oferta!
          </span>
        )}
        {/* ----------------------------------- */}

        <Link to={`/productos/${product.id}`}>
            <img
            src={product.imagen || 'https://via.placeholder.com/300x200?text=No+Imagen'}
            className="card-img-top"
            alt={product.nombre}
            style={{ height: '200px', objectFit: 'cover' }} // Mantenemos object-fit
            />
        </Link>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title fs-6 mb-1">{product.nombre}</h5> {/* Título un poco más pequeño */}
          <p className="card-text text-secondary-custom small mb-2">
            {/* Muestra categoría capitalizada */}
            {product.categoria ? product.categoria.charAt(0).toUpperCase() + product.categoria.slice(1) : ''}
          </p>

          {/* --- LÓGICA DE PRECIOS --- */}
          {isOnSale ? (
            // Si está en oferta
            <div>
              <span className="product-price fs-5 fw-bold text-danger me-2"> {/* Precio oferta destacado en rojo */}
                {formatPrice(product.precioOferta)}
              </span>
              <span className="text-muted text-decoration-line-through small"> {/* Precio original tachado */}
                {formatPrice(product.precio)}
              </span>
            </div>
          ) : (
            // Si NO está en oferta
            <p className="product-price fs-5 fw-bold text-success mb-3"> {/* Precio normal en verde */}
              {formatPrice(product.precio)}
            </p>
          )}
          {/* ------------------------- */}

          <Link
            to={`/productos/${product.id}`}
            className="btn btn-sm btn-outline-primary mt-auto align-self-start" // Botón más pequeño y alineado
          >
            Ver Detalles
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;