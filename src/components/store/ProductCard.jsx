// src/components/store/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { getCart, saveCart, getLoggedInUser, dispatchStorageUpdate } from '../../utils/localStorageHelper';
import { products as allProducts } from '../../data/products'; // Importa la lista completa para buscar el producto

function ProductCard({ product }) {

  const handleAddToCart = () => {
    const usuarioLogueado = getLoggedInUser();
    if (!usuarioLogueado) {
        alert('Debes iniciar sesión para agregar productos al carrito');
        // Opcional: redirigir a login, pasando la página actual para volver
        // navigate(`/login?redirect=${location.pathname}`);
        return;
    }

    // Busca el producto completo por si acaso 'product' prop no tiene todos los detalles necesarios
    const productToAdd = allProducts.find(p => p.id === product.id);
    if (!productToAdd) return; // Seguridad por si el producto no se encuentra

    let cart = getCart();
    const existingItemIndex = cart.findIndex(item => item.id === productToAdd.id);

    if (existingItemIndex > -1) {
        // Incrementar cantidad si ya existe
        cart[existingItemIndex].cantidad = (cart[existingItemIndex].cantidad || 0) + 1;
    } else {
        // Añadir nuevo item al carrito
        cart.push({
            id: productToAdd.id,
            nombre: productToAdd.nombre,
            precio: productToAdd.precio,
            imagen: productToAdd.imagen, // Usar la imagen principal
            cantidad: 1
        });
    }

    saveCart(cart); // Guardar el carrito actualizado en localStorage
    dispatchStorageUpdate(); // Disparar evento para actualizar la UI (ej: contador navbar)
    alert(`${productToAdd.nombre} agregado al carrito!`);
  };

  // Seguridad por si product es null o undefined
  if (!product) {
    return null; // O mostrar un placeholder/error
  }

  return (
    <div className="col mb-4"> {/* Asegura que funcione bien dentro de un row de Bootstrap */}
      <div className="card product-card h-100">
        <img
          src={product.imagen || 'https://via.placeholder.com/300x200?text=No+Imagen'} // Placeholder si no hay imagen
          className="card-img-top"
          alt={product.nombre}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="card-body d-flex flex-column"> {/* Flex column para empujar botones abajo */}
          <h5 className="card-title">{product.nombre}</h5>
          <p className="card-text product-price">${(product.precio || 0).toLocaleString('es-CL')} CLP</p>
          {product.descripcion && (
            <p className="card-text text-secondary-custom small mb-3">
              {product.descripcion.substring(0, 60)}...
            </p>
          )}
          {/* Botones al final usando mt-auto */}
          <div className="mt-auto d-flex justify-content-between">
            <Link to={`/productos/${product.id}`} className="btn btn-outline-primary btn-sm">
              Ver Detalle
            </Link>
            <button className="btn btn-success btn-sm" onClick={handleAddToCart}>
              + Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;