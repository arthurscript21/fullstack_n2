
// src/pages/Tienda/DetalleProducto.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import { getCart, saveCart, getLoggedInUser, dispatchStorageUpdate } from '../../utils/localStorageHelper';
import { getProductById, obtenerNombreCategoria } from "../../data/products.js";

function DetalleProducto() {
  const { id } = useParams(); // Obtiene el ID del producto de la URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundProduct = getProductById(id);
    setProduct(foundProduct);
    setLoading(false);
    // Resetea la cantidad a 1 cada vez que cambia el producto
    setQuantity(1);
  }, [id]); // Se ejecuta cada vez que cambia el 'id' en la URL

  const handleQuantityChange = (event) => {
    let value = parseInt(event.target.value);
    if (isNaN(value) || value < 1) {
      value = 1;
    } else if (product && value > product.stock) {
      value = product.stock; // No permitir más que el stock
      alert(`Solo quedan ${product.stock} unidades en stock.`);
    }
    setQuantity(value);
  };

  const handleAddToCart = () => {
     const usuarioLogueado = getLoggedInUser();
     if (!usuarioLogueado) {
         alert('Debes iniciar sesión para agregar productos al carrito');
         navigate(`/login?redirect=/productos/${id}`); // Redirige a login guardando la página actual
         return;
     }

     if (!product) return; // Si no hay producto, no hacer nada

     let cart = getCart();
     const existingItemIndex = cart.findIndex(item => item.id === product.id);

     if (existingItemIndex > -1) {
         // Actualizar cantidad si ya existe
         const newQuantity = (cart[existingItemIndex].cantidad || 0) + quantity;
         if (newQuantity > product.stock) {
             alert(`No puedes añadir más. Solo quedan ${product.stock - (cart[existingItemIndex].cantidad || 0)} unidades en stock (ya tienes ${cart[existingItemIndex].cantidad || 0} en el carrito).`);
             cart[existingItemIndex].cantidad = product.stock; // Ajustar al máximo stock
         } else {
            cart[existingItemIndex].cantidad = newQuantity;
         }

     } else {
         // Añadir nuevo item al carrito
         cart.push({
             id: product.id,
             nombre: product.nombre,
             precio: product.precio,
             imagen: product.imagen,
             cantidad: quantity
         });
     }

     saveCart(cart);
     dispatchStorageUpdate(); // Notifica al Navbar
     alert(`${quantity} ${product.nombre} agregado(s) al carrito!`);
  };


  if (loading) {
    return <div className="container py-5 text-center">Cargando...</div>;
  }

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h2>Producto no encontrado</h2>
        <p>El producto que buscas no existe o fue removido.</p>
        <Link to="/productos" className="btn btn-primary">Volver a Productos</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        {/* Columna de Imágenes (Carousel) */}
        <div className="col-md-6 mb-4 mb-md-0">
          <div id="productCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner rounded border">
              {product.imagenes && product.imagenes.length > 0 ? (
                product.imagenes.map((img, index) => (
                  <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                    <img src={img} className="d-block w-100" alt={`${product.nombre} - Imagen ${index + 1}`} style={{ height: '400px', objectFit: 'contain' }} />
                  </div>
                ))
              ) : (
                <div className="carousel-item active">
                  <img src={product.imagen || 'https://via.placeholder.com/600x400?text=No+Imagen'} className="d-block w-100" alt={product.nombre} style={{ height: '400px', objectFit: 'contain' }}/>
                </div>
              )}
            </div>
            {/* Controles del Carousel (solo si hay más de 1 imagen) */}
            {product.imagenes && product.imagenes.length > 1 && (
              <>
                <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true" style={{ filter: 'invert(1)' }}></span>
                  <span className="visually-hidden">Anterior</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true" style={{ filter: 'invert(1)' }}></span>
                  <span className="visually-hidden">Siguiente</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Columna de Detalles */}
        <div className="col-md-6">
          <h2>{product.nombre}</h2>
          <p className="product-price fs-4 mb-3">${(product.precio || 0).toLocaleString('es-CL')} CLP</p>
          <p className="text-secondary-custom mb-4">{product.descripcion}</p>

          {product.origen && <p className="mb-2"><strong>Origen:</strong> {product.origen}</p>}
          <p className="mb-2"><strong>Stock disponible:</strong> <span className={product.stock > 0 ? 'text-success' : 'text-danger'}>{product.stock > 0 ? `${product.stock} unidades` : 'Agotado'}</span></p>
          <p className="mb-3"><strong>Categoría:</strong> <Link to={`/categoria/${product.categoria}`}>{obtenerNombreCategoria(product.categoria)}</Link></p>


          {/* Controles para añadir al carrito (solo si hay stock) */}
          {product.stock > 0 ? (
            <div className="d-flex gap-2 mb-4 align-items-center">
                <label htmlFor="quantityInput" className="form-label me-2 mb-0">Cantidad:</label>
                <input
                  type="number"
                  id="quantityInput"
                  className="form-control"
                  value={quantity}
                  min="1"
                  max={product.stock}
                  onChange={handleQuantityChange}
                  style={{ width: '80px' }}
                  aria-label="Cantidad a comprar"
                />
                <button className="btn btn-success flex-grow-1" onClick={handleAddToCart}>
                    🛒 Añadir al Carrito
                </button>
            </div>
           ) : (
             <p className="alert alert-warning">Este producto está agotado actualmente.</p>
           )}

          <div className="mt-4">
            <Link to="/productos" className="btn btn-outline-secondary">← Volver a Productos</Link>
          </div>
        </div>
      </div>

      {/* Opcional: Sección de productos relacionados */}
      {/* ... */}

    </div>
  );
}

export default DetalleProducto;
