// src/pages/Tienda/Productos.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { products as allProducts, obtenerNombreCategoria } from '../../data/products';
import ProductCard from '../../components/store/ProductCard';

function Productos() {
  const { categoryName } = useParams();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('q') || '';

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(categoryName || '');
  const [currentSearch, setCurrentSearch] = useState(searchTerm);

  useEffect(() => {
    const uniqueCategories = [...new Set(allProducts.map(p => p.categoria))];
    setCategories(uniqueCategories);
    filterProducts(categoryName, searchTerm);
    setCurrentCategory(categoryName || '');
    setCurrentSearch(searchTerm);
  }, [categoryName, searchTerm]);

  const filterProducts = (category = currentCategory, search = currentSearch) => {
     let productsToFilter = allProducts;
     if (category) {
         productsToFilter = productsToFilter.filter(p => p.categoria === category);
     }
     if (search) {
         const lowerSearch = search.toLowerCase();
         productsToFilter = productsToFilter.filter(p =>
             p.nombre.toLowerCase().includes(lowerSearch) ||
             (p.descripcion && p.descripcion.toLowerCase().includes(lowerSearch))
         );
     }
     setFilteredProducts(productsToFilter);
  };

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setCurrentCategory(newCategory);
    filterProducts(newCategory, currentSearch);
  };

   const handleSearchChange = (event) => {
       const newSearch = event.target.value;
       setCurrentSearch(newSearch);
       filterProducts(currentCategory, newSearch);
   };

  return (
    // Quitamos la clase "container", añadimos padding horizontal (px-md-4) y vertical (py-5)
    <div className="px-md-4 py-5">
      <h2 className="text-center mb-4 section-title">
        {currentCategory ? `Productos - ${obtenerNombreCategoria(currentCategory)}` : 'Todos Nuestros Productos'}
      </h2>

      {/* Filtros y Búsqueda */}
      <div className="row mb-4">
        {/* Usamos col-md-6 para que en pantallas medianas ocupen la mitad */}
        <div className="col-md-6 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar productos..."
            value={currentSearch}
            onChange={handleSearchChange}
            aria-label="Buscar productos"
          />
        </div>
        <div className="col-md-6 mb-3">
          <select
            className="form-select"
            value={currentCategory}
            onChange={handleCategoryChange}
            aria-label="Filtrar por categoría"
            >
            <option value="">Todas las categorías</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {obtenerNombreCategoria(cat)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de Productos */}
      {/* Mantenemos row-cols-* para la cuadrícula responsiva */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <h4>No se encontraron productos</h4>
            <p>Intenta con otros filtros o términos de búsqueda.</p>
            {(currentCategory || currentSearch) && (
                <Link
                  to="/productos"
                  className="btn btn-outline-primary mt-2"
                  onClick={() => {
                      setCurrentCategory('');
                      setCurrentSearch('');
                      filterProducts('', '');
                  }}>
                    Mostrar Todos los Productos
                </Link>
            )}
          </div>
        )}
      </div>
    </div> // CIERRA EL DIV PRINCIPAL
  );
}

export default Productos;