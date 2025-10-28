// src/pages/Tienda/Ofertas.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products'; // Importa productos
import ProductCard from '../../components/store/ProductCard'; // Reutiliza tarjeta

function Ofertas() {
  // Filtra productos marcados como enOferta
  const productosEnOferta = products.filter(p => p.enOferta === true);

  return (
    // Usa padding
    <div className="px-md-4 px-3 py-5">
      <h2 className="text-center section-title mb-4">Ofertas Especiales</h2>

      {productosEnOferta.length > 0 ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {productosEnOferta.map(product => (
            // Considera modificar ProductCard si quieres mostrar precioOferta
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="alert alert-info text-center mt-4">
            Actualmente no hay productos en oferta. ¡Vuelve pronto!
        </div>
      )}

      <div className="text-center mt-5">
        <Link to="/productos" className="btn btn-primary">Ver todos los productos</Link>
      </div>
    </div>
  );
}
export default Ofertas;