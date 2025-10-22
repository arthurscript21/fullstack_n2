
// src/pages/Tienda/Carrito.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCart, saveCart, clearCart, getLoggedInUser, dispatchStorageUpdate } from '../../utils/localStorageHelper';

function Carrito() {
  const [cartItems, setCartItems] = useState([]);
  const [shippingMethod, setShippingMethod] = useState('standard'); // 'standard' o 'express'
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar carrito desde localStorage al iniciar
    const loadedCart = getCart();
    setCartItems(loadedCart);

    // Verificar si el usuario está logueado, sino redirigir a login
    const user = getLoggedInUser();
    if (!user) {
      alert('Debes iniciar sesión para ver tu carrito.');
      navigate('/login?redirect=/carrito');
    }

  }, [navigate]); // navigate como dependencia por si se usa dentro del efecto

  // Calcula el subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

  // Calcula el costo de envío
  const shippingCost = shippingMethod === 'standard' ? 2500 : 5000;

  // Calcula el total
  const total = subtotal + shippingCost;

  // Función para modificar la cantidad de un item
  const updateQuantity = (productId, change) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === productId) {
        const newQuantity = item.cantidad + change;
        // Validar que la cantidad no sea menor a 1
        return { ...item, cantidad: Math.max(1, newQuantity) };
         // Aquí faltaría validar contra el stock real si tuviéramos acceso a él
      }
      return item;
    });
    setCartItems(updatedCart);
    saveCart(updatedCart);
    dispatchStorageUpdate(); // Actualiza contador navbar
  };

  // Función para eliminar un item del carrito
  const removeItem = (productId) => {
    if (window.confirm('¿Seguro que quieres eliminar este producto del carrito?')) {
      const updatedCart = cartItems.filter(item => item.id !== productId);
      setCartItems(updatedCart);
      saveCart(updatedCart);
      dispatchStorageUpdate(); // Actualiza contador navbar
    }
  };

  // Simula el procesamiento del pago
  const handleCheckout = () => {
     if (cartItems.length === 0) {
         alert('Tu carrito está vacío.');
         return;
     }
     // Aquí iría la lógica real de pago (conexión a API, etc.)
     alert('¡Gracias por tu compra! (Simulación exitosa)');
     clearCart(); // Limpia el carrito
     setCartItems([]); // Limpia el estado local
     dispatchStorageUpdate(); // Actualiza contador navbar
     navigate('/'); // Redirige a la página principal
  };


  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 section-title">Tu Carrito de Compras</h2>

      {cartItems.length === 0 ? (
        <div className="alert alert-info text-center">
          <p>Tu carrito está vacío.</p>
          <Link to="/productos" className="btn btn-primary">Ir a Productos</Link>
        </div>
      ) : (
        <div className="row">
          {/* Columna de Items y Métodos */}
          <div className="col-lg-8 mb-4 mb-lg-0">
            {/* Lista de Items */}
            <div className="mb-4">
              {cartItems.map(item => (
                <div key={item.id} className="card mb-3">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-2 col-4">
                        <img src={item.imagen || 'https://via.placeholder.com/100?text=No+Imagen'} alt={item.nombre} className="img-fluid rounded" style={{ maxHeight: '80px', objectFit: 'contain' }} />
                      </div>
                      <div className="col-md-3 col-8">
                        <h5 className="mb-1">{item.nombre}</h5>
                        <small className="text-muted">Precio: ${item.precio.toLocaleString('es-CL')}</small>
                      </div>
                      <div className="col-md-3 col-6 mt-2 mt-md-0">
                        <div className="input-group input-group-sm">
                          <button className="btn btn-outline-secondary" type="button" onClick={() => updateQuantity(item.id, -1)} disabled={item.cantidad <= 1}>-</button>
                          <input type="text" className="form-control text-center" value={item.cantidad} readOnly style={{ maxWidth: '50px' }}/>
                          <button className="btn btn-outline-secondary" type="button" onClick={() => updateQuantity(item.id, 1)}>+</button>
                        </div>
                      </div>
                       <div className="col-md-2 col-3 mt-2 mt-md-0 text-md-end">
                         <span className="fw-bold">${(item.precio * item.cantidad).toLocaleString('es-CL')}</span>
                       </div>
                       <div className="col-md-2 col-3 mt-2 mt-md-0 text-end">
                         <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.id)}>Eliminar</button>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Métodos de Envío y Pago */}
             <div className="card mb-4">
                 <div className="card-body">
                     <h5 className="card-title mb-3">Método de Envío</h5>
                     <div className="form-check">
                         <input className="form-check-input" type="radio" name="shippingMethod" id="standardShipping" value="standard" checked={shippingMethod === 'standard'} onChange={() => setShippingMethod('standard')} />
                         <label className="form-check-label" htmlFor="standardShipping">
                             Envío estándar (3-5 días) - $2.500 CLP
                         </label>
                     </div>
                     <div className="form-check">
                         <input className="form-check-input" type="radio" name="shippingMethod" id="expressShipping" value="express" checked={shippingMethod === 'express'} onChange={() => setShippingMethod('express')}/>
                         <label className="form-check-label" htmlFor="expressShipping">
                             Envío express (1-2 días) - $5.000 CLP
                         </label>
                     </div>
                 </div>
             </div>
             {/* Opcional: Añadir métodos de pago si es necesario, similar al HTML */}

          </div>

          {/* Columna de Resumen */}
          <div className="col-lg-4">
            <div className="card sticky-top" style={{ top: '20px' }}> {/* sticky-top para que siga al hacer scroll */}
              <div className="card-body">
                <h5 className="card-title mb-3">Resumen de Compra</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>${subtotal.toLocaleString('es-CL')} CLP</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Envío ({shippingMethod === 'standard' ? 'Estándar' : 'Express'}):</span>
                  <span>${shippingCost.toLocaleString('es-CL')} CLP</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4 fs-5">
                  <strong>Total:</strong>
                  <strong className="text-primary">${total.toLocaleString('es-CL')} CLP</strong>
                </div>
                <button className="btn btn-primary w-100" onClick={handleCheckout}>
                   Proceder al Pago (Simulado)
                </button>
                <div className="text-center mt-3">
                     <Link to="/productos" className="btn btn-sm btn-outline-secondary">← Seguir Comprando</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carrito;
