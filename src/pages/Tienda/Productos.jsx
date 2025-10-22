
// src/pages/Tienda/Productos.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { products as allProducts, obtenerNombreCategoria } from '../../data/products';
import ProductCard from '../../components/store/ProductCard';

function Productos() {
  const { categoryName } = useParams(); // Obtiene el nombre de categoría de la URL (:categoryName)
  const [searchParams] = useSearchParams(); // Para leer parámetros de búsqueda (?q=...)
  const searchTerm = searchParams.get('q') || ''; // Obtiene el término de búsqueda

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(categoryName || '');
  const [currentSearch, setCurrentSearch] = useState(searchTerm);

  useEffect(() => {
    // Obtener lista única de categorías
    const uniqueCategories = [...new Set(allProducts.map(p => p.categoria))];
    setCategories(uniqueCategories);

    // Filtrar productos basado en categoría de URL y término de búsqueda
    filterProducts(categoryName, searchTerm);
    setCurrentCategory(categoryName || ''); // Actualiza el estado de la categoría seleccionada
    setCurrentSearch(searchTerm); // Actualiza el estado del término de búsqueda

  }, [categoryName, searchTerm]); // Ejecuta cuando cambie la categoría en URL o el término de búsqueda

  // Función para filtrar productos
  const filterProducts = (category = currentCategory, search = currentSearch) => {
     let productsToFilter = allProducts;

     // Filtrar por categoría
     if (category) {
         productsToFilter = productsToFilter.filter(p => p.categoria === category);
     }

     // Filtrar por término de búsqueda (nombre o descripción)
     if (search) {
         const lowerSearch = search.toLowerCase();
         productsToFilter = productsToFilter.filter(p =>
             p.nombre.toLowerCase().includes(lowerSearch) ||
             (p.descripcion && p.descripcion.toLowerCase().includes(lowerSearch))
         );
     }
     setFilteredProducts(productsToFilter);
  };

  // Manejador para el cambio de categoría en el <select>
  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setCurrentCategory(newCategory);
    filterProducts(newCategory, currentSearch);
  };

  // Manejador para el cambio en el input de búsqueda
   const handleSearchChange = (event) => {
       const newSearch = event.target.value;
       setCurrentSearch(newSearch);
       filterProducts(currentCategory, newSearch);
   };


  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 section-title">
        {currentCategory ? `Productos - ${obtenerNombreCategoria(currentCategory)}` : 'Todos Nuestros Productos'}
      </h2>

      {/* Filtros y Búsqueda */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar productos..."
            value={currentSearch}
            onChange={handleSearchChange}
          />
        </div>
        <div className="col-md-6 mb-3">
          <select className="form-select" value={currentCategory} onChange={handleCategoryChange}>
            <option value="">Todas las categorías</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {obtenerNombreCategoria(cat)}
              </option>
            ))}
          </select>
        </div>
        {/* Se quita el botón Filtrar, ahora filtra en tiempo real */}
      </div>

      {/* Lista de Productos */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <h4>No se encontraron productos</h4>
            <p>Intenta con otros filtros o términos de búsqueda.</p>
            {currentCategory || currentSearch ? (
                <Link to="/productos" className="btn btn-outline-primary mt-2" onClick={() => { setCurrentCategory(''); setCurrentSearch(''); filterProducts('', ''); }}>
                    Mostrar Todos los Productos
                </Link>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default Productos;
