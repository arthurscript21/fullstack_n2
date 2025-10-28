// src/pages/Tienda/DetalleBlog.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostById } from '../../data/blogData'; // Importa la función

function DetalleBlog() {
  const { id } = useParams(); // Obtiene el 'id' del post desde la URL
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Busca el post correspondiente al ID
    const foundPost = getPostById(id);
    setPost(foundPost);
  }, [id]); // Se ejecuta si el id cambia

  // Muestra mensaje si el post no se encuentra
  if (!post) {
    return (
      <div className="px-md-4 px-3 py-5 text-center">
        <h2>Artículo no encontrado</h2>
        <p>El artículo que buscas no existe.</p>
        <Link to="/blog" className="btn btn-primary mt-3">Volver al Blog</Link>
      </div>
    );
  }

  // Función para renderizar HTML (¡Ojo con la seguridad!)
  const createMarkup = (htmlString) => ({ __html: htmlString || '' });

  return (
    // Usa padding
    <div className="px-md-4 px-3 py-5">
      {/* Container interno para centrar contenido */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-9 col-xl-8">
            <h1 className="mb-3 display-5">{post.titulo}</h1>
            <p className="text-muted small mb-3">
              Publicado el {new Date(post.fecha).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })} por {post.autor}
            </p>
            <img src={post.imagen} alt={post.titulo} className="img-fluid rounded mb-4 shadow-sm" style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }} />
            {/* Contenido HTML */}
            <div className="blog-content" dangerouslySetInnerHTML={createMarkup(post.contenido)} />
            <hr className="my-4" />
            <div className="text-center">
                <Link to="/blog" className="btn btn-outline-secondary">← Volver al Blog</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DetalleBlog;