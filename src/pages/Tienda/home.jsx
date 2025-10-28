// src/pages/Tienda/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import ProductCard from '../../components/store/ProductCard';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    setFeaturedProducts(shuffled.slice(0, 4));
  }, []);

  return (
    <div>
      {/* Hero Section - Ocupa todo el ancho */}
      <section className="hero-section text-white text-center mb-5" style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '10px', // Opcional
          padding: '100px 0' // Padding similar a p1
      }}>
        {/* Contenido centrado dentro del Hero */}
        <div className="container">
          <h1 className="display-4 fw-bold">Bienvenido a HuertoHogar</h1>
          <p className="lead">Frescura y calidad del campo directamente a tu puerta.</p>
          <Link to="/productos" className="btn btn-primary btn-lg mt-3">Ver Productos</Link>
        </div>
      </section>

      {/* Categorías Destacadas (Usa container interno) */}
      <section className="py-5 bg-pattern">
          <div className="container">
              <h2 className="text-center section-title mb-4">Nuestras Categorías</h2>
              <div className="row">
                  {/* Categoría Frutas */}
                  <div className="col-lg-3 col-md-6 mb-4">
                      <div className="card text-center h-100">
                          <img src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" className="card-img-top" alt="Frutas Frescas" style={{ height: '150px', objectFit: 'cover' }}/>
                          <div className="card-body d-flex flex-column"> {/* Flex column para alinear botón abajo */}
                              <h5 className="card-title">Frutas Frescas</h5>
                              <p className="card-text small text-secondary-custom">Selección directa del campo.</p>
                              <Link to="/categoria/frutas" className="btn btn-sm btn-outline-primary mt-auto">Ver Frutas</Link> {/* mt-auto empuja abajo */}
                          </div>
                      </div>
                  </div>
                  {/* Categoría Verduras */}
                  <div className="col-lg-3 col-md-6 mb-4">
                       <div className="card text-center h-100">
                          <img src="https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" className="card-img-top" alt="Verduras Orgánicas" style={{ height: '150px', objectFit: 'cover' }}/>
                          <div className="card-body d-flex flex-column">
                              <h5 className="card-title">Verduras Orgánicas</h5>
                               <p className="card-text small text-secondary-custom">Cultivadas sin pesticidas.</p>
                              <Link to="/categoria/verduras" className="btn btn-sm btn-outline-primary mt-auto">Ver Verduras</Link>
                          </div>
                      </div>
                  </div>
                  {/* Categoría Orgánicos */}
                   <div className="col-lg-3 col-md-6 mb-4">
                       <div className="card text-center h-100">
                          <img src="https://images.unsplash.com/photo-1558645832-e6a62e1e6f4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" className="card-img-top" alt="Productos Orgánicos" style={{ height: '150px', objectFit: 'cover' }}/>
                          <div className="card-body d-flex flex-column">
                              <h5 className="card-title">Productos Orgánicos</h5>
                              <p className="card-text small text-secondary-custom">Ingredientes naturales y puros.</p>
                              <Link to="/categoria/organicos" className="btn btn-sm btn-outline-primary mt-auto">Ver Orgánicos</Link>
                          </div>
                      </div>
                  </div>
                  {/* Categoría Lácteos */}
                  <div className="col-lg-3 col-md-6 mb-4">
                       <div className="card text-center h-100">
                          <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" className="card-img-top" alt="Productos Lácteos" style={{ height: '150px', objectFit: 'cover' }}/>
                          <div className="card-body d-flex flex-column">
                              <h5 className="card-title">Productos Lácteos</h5>
                              <p className="card-text small text-secondary-custom">Frescos de granjas locales.</p>
                              <Link to="/categoria/lacteos" className="btn btn-sm btn-outline-primary mt-auto">Ver Lácteos</Link>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Productos Destacados (Usa container interno) */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center section-title mb-4">Productos Destacados</h2>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {featuredProducts.length > 0 ? (
              featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-center">Cargando productos...</p>
            )}
          </div>
          <div className="text-center mt-4">
            <Link to="/productos" className="btn btn-outline-primary">Ver Todos los Productos</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;