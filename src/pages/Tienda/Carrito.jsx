// src/pages/Tienda/Carrito.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCart, saveCart, getLoggedInUser, dispatchStorageUpdate } from '../../utils/localStorageHelper'; // Quitamos clearCart

function Carrito() {
  const [cartItems, setCartItems] = useState([]);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const navigate = useNavigate();

  useEffect(() => { /* ... (lógica igual) ... */
    const loadedCart=getCart(); setCartItems(loadedCart); if(!getLoggedInUser()){alert('Debes iniciar sesión.');navigate('/login?redirect=/carrito');}
  }, [navigate]);

  // --- CALCULA SUBTOTAL USANDO precioActual ---
  const subtotal = cartItems.reduce((sum, item) => {
    // Usa el precioActual guardado en el carrito, o el precio normal si falta
    const priceToUse = item.precioActual || item.precio || 0;
    return sum + (priceToUse * (item.cantidad || 0));
  }, 0);
  // -----------------------------------------
  const shippingCost = shippingMethod === 'standard' ? 2500 : 5000;
  const total = subtotal + shippingCost;

  const updateQuantity = (productId, change) => { /* ... (lógica igual) ... */
     const uC=cartItems.map(i=>i.id===productId?{...i,cantidad:Math.max(1,i.cantidad+change)}:i).filter(i=>i.cantidad>0); setCartItems(uC); saveCart(uC); dispatchStorageUpdate();
  };
  const removeItem = (productId) => { /* ... (lógica igual) ... */
     if(window.confirm('¿Eliminar?')){const uC=cartItems.filter(i=>i.id!==productId); setCartItems(uC); saveCart(uC); dispatchStorageUpdate();}
  };
  const handleCheckout = () => { /* ... (navega a checkout) ... */
     if (cartItems.length === 0) { alert('Carrito vacío.'); return; } navigate('/checkout');
  };

  // Función formatear precios
  const formatPrice = (price) => { if(typeof price!=='number'||isNaN(price)) return '$???'; return new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP',minimumFractionDigits:0}).format(price); };

  return (
    // Sin container, con padding
    <div className="px-md-4 px-3 py-5">
      <h2 className="text-center mb-4 section-title">Tu Carrito</h2>

      {cartItems.length === 0 ? ( /* ... (carrito vacío igual) ... */
        <div className="alert alert-info text-center"><p>Tu carrito está vacío.</p><Link to="/productos" className="btn btn-primary">Ir a Productos</Link></div>
      ) : (
        <div className="row">
          {/* Columna Items y Métodos */}
          <div className="col-lg-8 mb-4 mb-lg-0">
            {/* Lista de Items */}
            <div className="mb-4">
              {cartItems.map(item => (
                <div key={item.id} className="card mb-3">
                  <div className="card-body">
                    <div className="row align-items-center gy-2 gx-3">
                      <div className="col-sm-2 col-3"><img src={item.imagen||'./ph.png'} alt={item.nombre} className="img-fluid rounded" style={{maxHeight:'70px',objectFit:'contain'}}/></div>
                      <div className="col-sm-4 col-9">
                        <h5 className="mb-1 fs-6">{item.nombre}</h5>
                        {/* --- MUESTRA PRECIO OFERTA SI APLICA --- */}
                        {item.enOferta && typeof item.precioOferta === 'number' ? (
                          <small className="text-muted">
                            <span className="text-danger fw-bold">{formatPrice(item.precioOferta)}</span>{' '}
                            <span className="text-decoration-line-through">{formatPrice(item.precio)}</span>
                          </small>
                        ) : (
                          <small className="text-muted">Precio: {formatPrice(item.precio)}</small>
                        )}
                        {/* --------------------------------------- */}
                      </div>
                      <div className="col-sm-3 col-6 mt-2 mt-sm-0"> {/* Input cantidad */}
                        <div className="input-group input-group-sm"><button className="btn btn-outline-secondary px-2" type="button" onClick={()=>updateQuantity(item.id, -1)} disabled={item.cantidad<=1}>-</button><input type="text" className="form-control text-center px-1" value={item.cantidad} readOnly style={{maxWidth:'40px'}}/><button className="btn btn-outline-secondary px-2" type="button" onClick={()=>updateQuantity(item.id, 1)}>+</button></div>
                      </div>
                       <div className="col-sm-2 col-3 mt-2 mt-sm-0 text-sm-end">
                         {/* --- SUBTOTAL USA precioActual --- */}
                         <span className="fw-bold fs-6">{formatPrice((item.precioActual || item.precio || 0) * (item.cantidad || 0))}</span>
                         {/* ------------------------------- */}
                       </div>
                       <div className="col-sm-1 col-3 mt-2 mt-sm-0 text-end">{/* Botón eliminar */}
                         <button className="btn btn-danger btn-sm px-2 py-1" onClick={()=>removeItem(item.id)} title="Eliminar">&times;</button>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Métodos de Envío (sin cambios) */}
            <div className="card mb-4"><div className="card-body"><h5 className="card-title mb-3">Envío</h5>{/* ... radios ... */}</div></div>
          </div>
          {/* Columna Resumen (subtotal y total ya usan el cálculo correcto) */}
          <div className="col-lg-4">
            <div className="card shadow-sm"><div className="card-body">
              <h5 className="card-title mb-3">Resumen</h5>
              <div className="d-flex justify-content-between mb-2"><span>Subtotal:</span><span>{formatPrice(subtotal)}</span></div>
              <div className="d-flex justify-content-between mb-3"><span>Envío:</span><span>{formatPrice(shippingCost)}</span></div><hr />
              <div className="d-flex justify-content-between mb-4 fs-5"><strong>Total:</strong><strong className="text-primary">{formatPrice(total)}</strong></div>
              <button className="btn btn-primary w-100" onClick={handleCheckout}>Ir a Pagar</button>
              <div className="text-center mt-3"><Link to="/productos" className="btn btn-sm btn-outline-secondary">← Seguir Comprando</Link></div>
            </div></div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Carrito;