// src/pages/Tienda/Blog.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../../data/blogData'; // Importa los datos del blog

function Blog() {
  return (
    // Usa padding para dar espacio
    <div className="px-md-4 px-3 py-5">
      <h2 className="text-center section-title mb-5">Nuestro Blog</h2>

      {blogPosts.length > 0 ? (
        // Container interno para centrar las tarjetas
        <div className="container">
            <div className="row row-cols-1 row-cols-md-2 g-4 justify-content-center">
              {blogPosts.map(post => (
                <div key={post.id} className="col">
                  {/* Tarjeta de Bootstrap para cada post */}
                  <div className="card h-100 shadow-sm overflow-hidden">
                    {/* Enlace en la imagen */}
                    <Link to={`/blog/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <img
                        src={post.imagen}
                        className="card-img-top"
                        alt={post.titulo}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                    </Link>
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{post.titulo}</h5>
                      <p className="card-text text-muted small mb-2">
                        {new Date(post.fecha).toLocaleDateString('es-CL')} - {post.autor}
                      </p>
                      <p className="card-text flex-grow-1">{post.resumen}</p> {/* flex-grow para empujar botón abajo */}
                      {/* Enlace en el botón */}
                      <Link to={`/blog/${post.id}`} className="btn btn-outline-primary mt-auto align-self-start">Leer Más</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </div>
      ) : (
        // Mensaje si no hay posts
        <div className="alert alert-secondary text-center">
            Aún no hay artículos publicados. ¡Estamos trabajando en ello!
        </div>
      )}
    </div>
  );
}
export default Blog;