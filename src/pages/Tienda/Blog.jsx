// src/pages/Tienda/Blog.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Blog() {
  // Lógica futura: obtener posts del blog (de un archivo JS o API)

  return (
    // Sin container, con padding
    <div className="px-md-4 px-3 py-5 text-center">
      <h2 className="section-title mb-4">Nuestro Blog</h2>
      <p>Próximamente encontrarás aquí artículos sobre vida sana, recetas y más.</p>
      {/* Aquí mostrarías los posts del blog */}
      <div className="mt-4">
        <Link to="/" className="btn btn-outline-secondary">Volver al inicio</Link>
      </div>
    </div>
  );
}

export default Blog;