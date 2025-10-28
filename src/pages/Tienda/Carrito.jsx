// src/pages/Tienda/Carrito.jsx
// ... (imports y lógica igual)
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCart, saveCart, clearCart, getLoggedInUser, dispatchStorageUpdate } from '../../utils/localStorageHelper';

function Carrito() {
  const [cartItems, setCartItems] = useState([]);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const navigate = useNavigate();

  useEffect(() => {
    setCartItems(getCart());
    if (!getLoggedInUser()) {
      alert('Debes iniciar sesión para ver tu carrito.');
      navigate('/login?redirect=/carrito');
    }
  }, [navigate]);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  const shippingCost = shippingMethod === 'standard' ? 2500 : 5000;
  const total = subtotal + shippingCost;

  const updateQuantity = (productId, change) => {
    const updatedCart = cartItems.map(item =>
      item.id === productId ? { ...item, cantidad: Math.max(1, item.cantidad + change) } : item
    ).filter(item => item.cantidad > 0);
    setCartItems(updatedCart); saveCart(updatedCart); dispatchStorageUpdate();
  };

  const removeItem = (productId) => {
    if (window.confirm('¿Eliminar producto?')) {
      const updatedCart = cartItems.filter(item => item.id !== productId);
      setCartItems(updatedCart); saveCart(updatedCart); dispatchStorageUpdate();
    }
  };

  const handleCheckout = () => {
     if (cartItems.length === 0) { alert('Tu carrito está vacío.'); return; }
     alert('¡Gracias por tu compra! (Simulación)');
     clearCart(); setCartItems([]); dispatchStorageUpdate(); navigate('/');
  };

  return (
    // Quitamos "container", añadimos padding horizontal (px-md-4) y vertical (py-5)
    <div className="px-md-4 py-5">
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
                    <div className="row align-items-center gy-2 gx-3">
                      <div className="col-sm-2 col-3">
                        <img src={item.imagen || 'https://via.placeholder.com/100?text=No+Imagen'} alt={item.nombre} className="img-fluid rounded" style={{ maxHeight: '70px', objectFit: 'contain' }} />
                      </div>
                      <div className="col-sm-4 col-9">
                        <h5 className="mb-1 fs-6">{item.nombre}</h5>
                        <small className="text-muted">Precio: ${item.precio.toLocaleString('es-CL')}</small>
                      </div>
                      <div className="col-sm-3 col-6 mt-2 mt-sm-0">
                        <div className="input-group input-group-sm">
                          <button className="btn btn-outline-secondary px-2" type="button" onClick={() => updateQuantity(item.id, -1)} disabled={item.cantidad <= 1}>-</button>
                          <input type="text" className="form-control text-center px-1" value={item.cantidad} readOnly style={{ maxWidth: '40px' }}/>
                          <button className="btn btn-outline-secondary px-2" type="button" onClick={() => updateQuantity(item.id, 1)}>+</button>
                        </div>
                      </div>
                       <div className="col-sm-2 col-3 mt-2 mt-sm-0 text-sm-end">
                         <span className="fw-bold fs-6">${(item.precio * item.cantidad).toLocaleString('es-CL')}</span>
                       </div>
                       <div className="col-sm-1 col-3 mt-2 mt-sm-0 text-end">
                         <button className="btn btn-danger btn-sm px-2 py-1" onClick={() => removeItem(item.id)} title="Eliminar">&times;</button>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Métodos de Envío */}
             <div className="card mb-4">
                 <div className="card-body">
                     <h5 className="card-title mb-3">Método de Envío</h5>
                     <div className="form-check">
                         <input className="form-check-input" type="radio" name="shippingMethod" id="standardShipping" value="standard" checked={shippingMethod === 'standard'} onChange={() => setShippingMethod('standard')} />
                         <label className="form-check-label" htmlFor="standardShipping">Envío estándar (3-5 días) - $2.500 CLP</label>
                     </div>
                     <div className="form-check">
                         <input className="form-check-input" type="radio" name="shippingMethod" id="expressShipping" value="express" checked={shippingMethod === 'express'} onChange={() => setShippingMethod('express')}/>
                         <label className="form-check-label" htmlFor="expressShipping">Envío express (1-2 días) - $5.000 CLP</label>
                     </div>
                 </div>
             </div>
          </div>

          {/* Columna de Resumen */}
          <div className="col-lg-4">
            <div className="card sticky-top" style={{ top: '20px' }}>
              <div className="card-body">
                <h5 className="card-title mb-3">Resumen de Compra</h5>
                <div className="d-flex justify-content-between mb-2"><span>Subtotal:</span><span>${subtotal.toLocaleString('es-CL')} CLP</span></div>
                <div className="d-flex justify-content-between mb-3"><span>Envío ({shippingMethod === 'standard' ? 'Estándar' : 'Express'}):</span><span>${shippingCost.toLocaleString('es-CL')} CLP</span></div>
                <hr />
                <div className="d-flex justify-content-between mb-4 fs-5"><strong>Total:</strong><strong className="text-primary">${total.toLocaleString('es-CL')} CLP</strong></div>
                <button className="btn btn-primary w-100" onClick={handleCheckout}>Proceder al Pago (Simulado)</button>
                <div className="text-center mt-3"><Link to="/productos" className="btn btn-sm btn-outline-secondary">← Seguir Comprando</Link></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div> // CIERRA EL DIV PRINCIPAL
  );
}

export default Carrito;