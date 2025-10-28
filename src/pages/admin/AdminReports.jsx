// src/pages/admin/AdminReports.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importar Link por si lo necesitas más adelante
import { initialProducts } from '../../data/productsData'; // Datos iniciales como fallback

const STOCK_CRITICO_UMBRAL = 10; // Define el umbral para stock bajo

function AdminReports() {
  const [criticalProducts, setCriticalProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar productos desde localStorage (igual que en AdminProducts.jsx)
    let allProducts = [];
    const storedProducts = localStorage.getItem('huertohogar_products_admin');
    if (storedProducts) {
      try {
        allProducts = JSON.parse(storedProducts);
      } catch (error) {
        console.error("Error parsing products from localStorage:", error);
        allProducts = initialProducts; // Usar iniciales si hay error
      }
    } else {
      allProducts = initialProducts; // Usar iniciales si no hay nada guardado
    }

    // Filtrar productos con stock bajo o igual al umbral
    const lowStockProducts = allProducts.filter(
      product => product.stock <= STOCK_CRITICO_UMBRAL
    );

    // Ordenar por stock (opcional, de menor a mayor)
    lowStockProducts.sort((a, b) => a.stock - b.stock);

    setCriticalProducts(lowStockProducts);
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Generando reportes...</p>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Reportes</h1>
        {/* Aquí podrías añadir botones para otros reportes en el futuro */}
      </div>

      {/* Reporte de Productos Críticos */}
      <section>
        <h4 className="mb-3">Productos con Stock Crítico (≤ {STOCK_CRITICO_UMBRAL} unidades)</h4>
        {criticalProducts.length === 0 ? (
          <div className="alert alert-success">
            ¡Buenas noticias! No hay productos con stock crítico actualmente.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered">
              <thead className="table-light">
                <tr>
                  <th>Imagen</th>
                  <th>Nombre Producto</th>
                  <th>Stock Actual</th>
                  <th>Precio Unitario</th>
                  {/* Podrías añadir un enlace para editar el producto */}
                  {/* <th>Acciones</th> */}
                </tr>
              </thead>
              <tbody>
                {criticalProducts.map(product => (
                  <tr key={product.id}>
                    <td>
                      <img
                        src={product.imagen || 'https://via.placeholder.com/50'}
                        alt={product.nombre}
                        style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                    </td>
                    <td>{product.nombre}</td>
                    <td>
                      <span className="badge bg-danger">{product.stock}</span> {/* Resaltar stock bajo */}
                    </td>
                    <td>${(product.precio || 0).toLocaleString('es-CL')}</td>
                    {/* <td>
                      <Link to={`/admin/productos/editar/${product.id}`} className="btn btn-sm btn-outline-warning">
                        Gestionar
                      </Link>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Aquí podrías añadir otras secciones para futuros reportes */}

    </div>
  );
}

export default AdminReports;