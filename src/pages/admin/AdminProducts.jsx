// src/pages/admin/AdminProducts.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductRow from '../../components/admin/ProductRow';
import { initialProducts } from '../../data/productsData'; // Importar datos iniciales

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simular carga inicial
   useEffect(() => {
    // Intentar cargar desde localStorage o usar datos iniciales
    const storedProducts = localStorage.getItem('huertohogar_products_admin'); // Usar una clave diferente para admin si es necesario
     if (storedProducts) {
        try {
            setProducts(JSON.parse(storedProducts));
        } catch (error) {
            console.error("Error parsing products from localStorage:", error);
            setProducts(initialProducts);
            localStorage.setItem('huertohogar_products_admin', JSON.stringify(initialProducts));
        }
    } else {
        setProducts(initialProducts);
        localStorage.setItem('huertohogar_products_admin', JSON.stringify(initialProducts));
    }
    setLoading(false);
  }, []);

  // Función para guardar cambios (editar)
  const handleSaveProduct = (updatedProduct) => {
    const updatedProducts = products.map(p =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    setProducts(updatedProducts);
    localStorage.setItem('huertohogar_products_admin', JSON.stringify(updatedProducts));
    alert('Producto actualizado.');
  };

  // Función para eliminar producto
  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem('huertohogar_products_admin', JSON.stringify(updatedProducts));
    alert('Producto eliminado.');
  };

   if (loading) {
    return <p>Cargando productos...</p>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Gestión de Productos</h1>
        <Link to="/admin/productos/nuevo" className="btn btn-primary">
          Añadir Producto
        </Link>
      </div>

       {products.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
         <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Stock</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <ProductRow
                    key={product.id}
                    product={product}
                    onSave={handleSaveProduct}
                    onDelete={handleDeleteProduct}
                  />
                ))}
              </tbody>
            </table>
        </div>
       )}
    </div>
  );
}

export default AdminProducts;