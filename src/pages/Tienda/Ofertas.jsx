// src/pages/Tienda/Ofertas.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Ofertas() {
  // Lógica futura: filtrar productos en oferta
  // const productosEnOferta = products.filter(p => p.enOferta === true);

  return (
    // Sin container, con padding
    <div className="px-md-4 px-3 py-5 text-center">
      <h2 className="section-title mb-4">Ofertas Especiales</h2>
      <p>Actualmente no hay ofertas disponibles.</p>
      {/* Aquí mostrarías los productos en oferta cuando implementes la lógica */}
      {/* <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4"> */}
      {/* {productosEnOferta.map(product => <ProductCard key={product.id} product={product} />)} */}
      {/* </div> */}
      <div className="mt-4">
        <Link to="/productos" className="btn btn-primary">Ver todos los productos</Link>
      </div>
    </div>
  );
}

export default Ofertas;